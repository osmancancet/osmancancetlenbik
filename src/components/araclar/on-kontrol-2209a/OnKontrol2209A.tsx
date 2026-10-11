"use client";

import Link from "next/link";
import { useCallback, useEffect, useReducer, useRef } from "react";
import type { Finding, TextKey, WorkPackage } from "@/lib/araclar/on-kontrol-2209a/engine/types";
import { contributionSum, emptyDraft } from "@/lib/araclar/on-kontrol-2209a/engine/text";
import { formatReport, scoreBand } from "@/lib/araclar/on-kontrol-2209a/engine/report";
import { rules2209a2026 as RULES } from "@/lib/araclar/on-kontrol-2209a/rules/2209a-2026";
import { SAMPLE_DRAFT } from "@/lib/araclar/on-kontrol-2209a/sample";
import { initialState, reducer } from "./state";
import { useDraft } from "./hooks/useDraft";
import { useEvaluation } from "./hooks/useEvaluation";
import { SectionField } from "./SectionField";
import { WorkPackageTable } from "./WorkPackageTable";
import { Gantt } from "./Gantt";
import { ReportPanel } from "./ReportPanel";
import { CopyReport } from "./CopyReport";
import { ClearButton } from "./ClearButton";
import { referrerKind, track } from "./analytics";
import s from "./OnKontrol.module.css";
import tk from "./tokens.module.css";

const RELATED_TOOLS = [
  { name: "Atıf denetleyici", path: "/araclar/atif-denetleyici" },
  { name: "Kaynakça biçimlendirici", path: "/araclar/kaynakca-bicimlendirici" },
  { name: "Anonimleştirici", path: "/araclar/anonimlestirici" },
] as const;

const L = RULES.limits;

export default function OnKontrol2209A() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { draft, isSample, newRow } = state;
  useDraft(state, dispatch);
  const { evaluation, summary } = useEvaluation(draft);
  const edited = useRef(false);

  useEffect(() => { track("sayfa_gorundu", referrerKind(document.referrer)); }, []);

  const firstEdit = () => {
    if (!edited.current) { edited.current = true; track("ilk_duzenleme"); }
  };
  const onText = useCallback((key: TextKey, value: string) => {
    dispatch({ type: "text", key, value });
    if (!edited.current) { edited.current = true; track("ilk_duzenleme"); }
  }, []);
  const onWp = (i: number, field: keyof WorkPackage, value: string) => { dispatch({ type: "wp", i, field, value }); firstEdit(); };

  const openFinding = (f: Finding) => {
    if (!f.sec) return;
    const field = document.getElementById(`f-${f.sec}`);
    if (!field) return;
    track("bulguya_tiklandi", f.ruleId);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    field.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    field.classList.remove(s.flash); void field.offsetWidth; field.classList.add(s.flash);
    window.setTimeout(() => field.classList.remove(s.flash), 1400);
    const input = field.querySelector<HTMLElement>("textarea, input");
    if (input) window.setTimeout(() => input.focus({ preventScroll: true }), 300);
  };

  const clear = () => {
    dispatch({ type: "load", draft: emptyDraft(), sample: false });
    track("ornek_temizlendi");
    window.setTimeout(() => document.getElementById("ozet")?.focus(), 0);
  };

  const t = draft.text;
  const sec = RULES.sections;

  return (
    <section className={`${tk.tokens} ${s.tool}`} id="arac" aria-label="2209-A Ön Kontrol aracı">
      <div className={s.notice}>
        <span>
          {isSample
            ? "Örnek bir başvuru yüklü; içinde bilerek bırakılmış hatalar var. Kendi metnini yazınca taslağın bu tarayıcıda saklanır."
            : "Taslağın yalnızca bu tarayıcıda saklanıyor. Metnin hiçbir yere gönderilmiyor."}
        </span>
        <span className={s.sideActions}>
          <button type="button" onClick={() => dispatch({ type: "load", draft: SAMPLE_DRAFT, sample: true })}>Örneği yükle</button>
          <ClearButton onConfirm={clear} />
        </span>
      </div>

      <div className={s.layout}>
        <form className={s.form} autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <SectionField id="ozet" label="Özet" rule="25–450 kelime · en son yazılması önerilir" limit={L.ozet} value={t.ozet} onChange={onText} />

          <div className={s.groupTitle}><span className={s.num}>1</span><h2>Araştırma önerisinin bilimsel niteliği</h2></div>
          <SectionField id="bilimsel" label="1.1 Konunun önemi ve bilimsel nitelik" rule="en az 350 karakter" help="Kapsam, literatürdeki eksiklik, araştırma sorusu ya da hipotez; literatüre atıfla." limit={L.bilimsel} value={t.bilimsel} onChange={onText} />
          <SectionField id="amac" label="1.2 Amaç ve hedefler" rule="en az 350 karakter" help="Açık, ölçülebilir, gerçekçi ve ulaşılabilir hedefler." limit={L.amac} value={t.amac} onChange={onText} />

          <div className={s.groupTitle}><span className={s.num}>2</span><h2>Yöntem</h2></div>
          <SectionField id="yontem" label="2. Yöntem" rule="en az 350 karakter" help="Araştırma tasarımı, bağımlı ve bağımsız değişkenler, istatistiksel yöntemler; yöntemleri çalışma takvimiyle ilişkilendir." limit={L.yontem} value={t.yontem} onChange={onText} />

          <div className={s.groupTitle}><span className={s.num}>3</span><h2>Proje yönetimi</h2></div>
          <div className={s.field} id="f-takvim">
            <div className={s.fieldHead}><span className={s.label}>3.1 Çalışma takvimi</span><span className={s.rule}>en fazla {RULES.maxMonths} ay · katkı toplamı {RULES.contributionTotal}</span></div>
            <p className={s.help}>Literatür taraması, sonuç raporu hazırlama, sonuçların paylaşımı ve malzeme alımı ayrı iş adımı olarak yazılmaz.</p>
            <WorkPackageTable
              wp={draft.wp}
              newRow={newRow}
              total={RULES.contributionTotal}
              sum={contributionSum(draft)}
              onChange={onWp}
              onAdd={() => { dispatch({ type: "addWp" }); firstEdit(); }}
              onDelete={(i) => { dispatch({ type: "delWp", i }); firstEdit(); }}
            />
            <Gantt wp={draft.wp} months={RULES.maxMonths} />
          </div>
          <SectionField id="risk" label="3.2 Risk yönetimi" rule="riskler ve B planları" value={t.risk} onChange={onText} />
          <SectionField id="olanak" label="3.3 Araştırma olanakları" rule="altyapı ve ekipman" value={t.olanak} onChange={onText} />

          <div className={s.groupTitle}><span className={s.num}>4</span><h2>Yaygın etki</h2></div>
          <SectionField id="etki" label="4. Yaygın etki" rule="ölçülebilir, gerçekçi çıktılar" value={t.etki} onChange={onText} />

          <div className={s.groupTitle}><h2>Kaynaklar</h2></div>
          <SectionField id="kaynak" label="Kaynakça" rule="her satıra bir kaynak · DOI varsa zorunlu" help="Listedeki her kaynağa metinde atıf yapılmalı. (Soyad, 2023) ve [1] biçimindeki atıflar tanınır." value={t.kaynak} tall onChange={onText} />
        </form>

        <div className={s.sideCol}>
          <ReportPanel
            summary={summary}
            evaluation={evaluation}
            sections={sec}
            onOpen={openFinding}
            actions={
              <CopyReport
                getText={() => formatReport(evaluation, RULES)}
                onCopied={() => track("rapor_kopyalandi", scoreBand(summary.passed))}
                onDownloaded={() => track("rapor_indirildi", scoreBand(summary.passed))}
              />
            }
          />
          <div className={`${s.card} ${s.promo}`}>
            <strong>Kaynakçan için de araç var</strong>
            <span>Atıflarını ve kaynakça biçimini ayrıca denetlemek istersen diğer ücretsiz araçlara bak.</span>
            <span className={s.promoLinks}>
              {RELATED_TOOLS.map((r) => <Link key={r.path} href={r.path}>{r.name} →</Link>)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
