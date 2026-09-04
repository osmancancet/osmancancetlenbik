"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, BarChart3, Download } from "lucide-react";
import {
  OLCEKLER,
  csvUret,
  ozetle,
  tabloAyristir,
  trSayi,
  type Olcek,
} from "./istatistik";

/**
 * Likert özetleyici arayüzü.
 *
 * Bütün hesap tarayıcıda, `istatistik.ts` içindeki saf işlevlerle yapılıyor;
 * anket verisi hiçbir yere gönderilmiyor. Katılımcı yanıtı çoğu zaman etik
 * kurul kapsamında olduğu için bu ayrım önemli.
 *
 * Ölçek ve ters kodlama değiştikçe her şey yeniden hesaplanıyor; ara sonuç
 * saklanmıyor ki ekrandaki sayı ile ayarlar hiçbir anda çelişmesin.
 */

const ORNEK = `Madde 1,Madde 2,Madde 3
5,4,5
4,4,3
3,2,3
5,5,4
2,3,2`;

export function LikertOzetleyiciClient() {
  const [girdi, setGirdi] = useState("");
  const [basliklarVar, setBasliklarVar] = useState(true);
  const [olcekAnahtari, setOlcekAnahtari] = useState(OLCEKLER[0].anahtar);
  const [tersler, setTersler] = useState<number[]>([]);

  const olcek: Olcek =
    OLCEKLER.find((o) => o.anahtar === olcekAnahtari)?.olcek ?? OLCEKLER[0].olcek;

  const tablo = useMemo(
    () => tabloAyristir(girdi, basliklarVar, olcek),
    [girdi, basliklarVar, olcek]
  );

  const ozet = useMemo(
    () => ozetle(tablo, olcek, new Set(tersler)),
    [tablo, olcek, tersler]
  );

  const veriVar = tablo.veri.length > 0 && tablo.basliklar.length > 0;
  const secenekler = ozet.maddeler[0]?.dagilim.map((d) => d.deger) ?? [];

  function tersDegistir(indis: number, acik: boolean) {
    setTersler((önceki) =>
      acik ? [...önceki, indis] : önceki.filter((i) => i !== indis)
    );
  }

  function csvIndir() {
    const blob = new Blob([csvUret(ozet, olcek)], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "likert-ozet.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-8">
      {/* 1 — Veri */}
      <section className="space-y-3">
        <label
          htmlFor="likert-veri"
          className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)]"
        >
          Anket verisi
        </label>
        <textarea
          id="likert-veri"
          value={girdi}
          onChange={(e) => setGirdi(e.target.value)}
          rows={9}
          placeholder={`Verinizi elektronik tablodan kopyalayıp yapıştırın.\nAyraç (virgül, noktalı virgül, sekme) kendiliğinden bulunur.\n\nÖrnek:\n${ORNEK}`}
          className="w-full px-4 py-3 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm font-mono leading-relaxed focus:outline-none focus:border-[var(--accent)]"
        />
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="basliklar-var"
              checked={basliklarVar}
              onChange={(e) => setBasliklarVar(e.target.checked)}
              className="w-4 h-4 accent-[var(--accent)]"
            />
            <label
              htmlFor="basliklar-var"
              className="text-sm text-[var(--fg)] cursor-pointer"
            >
              İlk satır madde başlıkları
            </label>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="olcek" className="text-sm text-[var(--fg-muted)]">
              Ölçek
            </label>
            <select
              id="olcek"
              value={olcekAnahtari}
              onChange={(e) => setOlcekAnahtari(e.target.value)}
              className="px-2 py-1 text-sm rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
            >
              {OLCEKLER.map((o) => (
                <option key={o.anahtar} value={o.anahtar}>
                  {o.ad}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setGirdi(ORNEK)}
            className="text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
          >
            Örnek doldur
          </button>
          {tablo.veri.length > 0 && (
            <span className="text-xs text-[var(--fg-subtle)]">
              Ayraç:{" "}
              {tablo.ayrac === "\t"
                ? "sekme"
                : tablo.ayrac === ";"
                  ? "noktalı virgül"
                  : "virgül"}
            </span>
          )}
        </div>
      </section>

      {/* 2 — Ters kodlama */}
      {veriVar && (
        <section className="space-y-3">
          <h2 className="text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
            Ters kodlanacak maddeler
          </h2>
          <p className="text-sm text-[var(--fg-muted)]">
            Olumsuz yazılmış maddeleri işaretleyin; değerleri{" "}
            <code>
              ({olcek.min} + {olcek.max}) − değer
            </code>{" "}
            ile çevrilir ve hem madde istatistiklerine hem alfaya böyle girer.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {ozet.maddeler.map((m) => (
              <div key={m.indis} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`ters-${m.indis}`}
                  checked={m.ters}
                  onChange={(e) => tersDegistir(m.indis, e.target.checked)}
                  className="w-4 h-4 accent-[var(--accent)]"
                />
                <label
                  htmlFor={`ters-${m.indis}`}
                  className="text-sm text-[var(--fg)] cursor-pointer"
                >
                  {m.indis}. {m.baslik}
                </label>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3 — Genel özet */}
      {veriVar && (
        <section className="space-y-3">
          <h2 className="text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
            Genel
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Kutu etiket="Katılımcı" deger={String(ozet.katilimci)} />
            <Kutu etiket="Madde" deger={String(ozet.maddeSayisi)} />
            <Kutu
              etiket="Ölçek ortalaması"
              deger={trSayi(ozet.olcekOrtalamasi)}
            />
            <Kutu
              etiket="Cronbach α"
              deger={ozet.alfa === null ? "—" : trSayi(ozet.alfa, 3)}
              uyari={ozet.alfa !== null && ozet.alfa < 0.7}
            />
          </div>

          {ozet.alfa !== null && ozet.alfa < 0.7 && (
            <div className="border-s-[3px] border-yellow-500 bg-yellow-500/10 rounded-e-md px-5 py-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-yellow-500" />
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
                  <strong className="text-[var(--fg)]">
                    Cronbach α = {trSayi(ozet.alfa, 3)}, yaygın kabul gören 0,70
                    eşiğinin altında.
                  </strong>{" "}
                  Ölçeğin iç tutarlılığı düşük görünüyor. Ters kodlanması
                  gereken bir maddeyi işaretlemeyi unutmuş olabilirsiniz; madde
                  sayısı az olduğunda da alfa düşük çıkar.
                </p>
              </div>
            </div>
          )}

          {ozet.alfa === null && ozet.alfaNotu && (
            <p className="text-sm text-[var(--fg-muted)]">
              Cronbach α hesaplanamadı: {ozet.alfaNotu}
            </p>
          )}

          {ozet.alfaKatilimci < ozet.katilimci && ozet.alfa !== null && (
            <p className="text-xs text-[var(--fg-subtle)]">
              Alfa, tüm maddeleri dolu {ozet.alfaKatilimci} katılımcıyla
              hesaplandı ({ozet.katilimci} katılımcının{" "}
              {ozet.katilimci - ozet.alfaKatilimci} tanesinde eksik hücre var).
            </p>
          )}

          {(ozet.eksikSayisi > 0 || ozet.gecersizSayisi > 0) && (
            <div className="border-s-[3px] border-yellow-500 bg-yellow-500/10 rounded-e-md px-5 py-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-yellow-500" />
                <div className="text-sm text-[var(--fg-muted)] leading-relaxed">
                  <strong className="text-[var(--fg)]">
                    {ozet.eksikSayisi} boş, {ozet.gecersizSayisi} geçersiz hücre
                    var.
                  </strong>{" "}
                  Bu hücreler hesaba katılmadı — 0 sayılmadı. Geçersiz hücre,
                  sayı olmayan ya da {olcek.min}–{olcek.max} aralığı dışında
                  kalan değer demektir.
                  <ul className="mt-2 space-y-0.5 font-mono text-xs">
                    {ozet.sorunlar.slice(0, 12).map((s, i) => (
                      <li key={`${s.satir}-${s.madde}-${i}`}>
                        {s.satir}. satır, {s.madde}. madde:{" "}
                        {s.tur === "eksik" ? "boş" : `"${s.ham}"`}
                      </li>
                    ))}
                    {ozet.sorunlar.length > 12 && (
                      <li>… ve {ozet.sorunlar.length - 12} tane daha</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 4 — Madde tablosu */}
      {veriVar && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
              Madde istatistikleri
            </h2>
            <button
              onClick={csvIndir}
              aria-label="Özeti CSV olarak indir"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-[var(--border-strong)] text-[var(--fg-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              CSV indir
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <caption className="sr-only">
                Her madde için geçerli yanıt sayısı, ortalama, standart sapma,
                medyan ve mod
              </caption>
              <thead>
                <tr className="text-[var(--fg-subtle)] text-xs uppercase tracking-wider">
                  <th scope="col" className="text-start font-medium py-2 pe-3">
                    Madde
                  </th>
                  <th scope="col" className="text-end font-medium py-2 px-3">
                    n
                  </th>
                  <th scope="col" className="text-end font-medium py-2 px-3">
                    Ortalama
                  </th>
                  <th scope="col" className="text-end font-medium py-2 px-3">
                    SS
                  </th>
                  <th scope="col" className="text-end font-medium py-2 px-3">
                    Medyan
                  </th>
                  <th scope="col" className="text-end font-medium py-2 ps-3">
                    Mod
                  </th>
                </tr>
              </thead>
              <tbody>
                {ozet.maddeler.map((m) => (
                  <tr key={m.indis} className="border-t border-[var(--border)]">
                    <th
                      scope="row"
                      className="text-start font-normal text-[var(--fg)] py-2 pe-3"
                    >
                      {m.indis}. {m.baslik}
                      {m.ters && (
                        <span className="ms-2 text-[11px] uppercase tracking-wider text-[var(--accent)]">
                          ters
                        </span>
                      )}
                    </th>
                    <td className="text-end py-2 px-3 text-[var(--fg-muted)] tabular-nums">
                      {m.n}
                      {m.eksik > 0 && (
                        <span className="text-[var(--fg-subtle)]">
                          {" "}
                          (−{m.eksik})
                        </span>
                      )}
                    </td>
                    <td className="text-end py-2 px-3 text-[var(--fg)] tabular-nums">
                      {trSayi(m.ortalama)}
                    </td>
                    <td className="text-end py-2 px-3 text-[var(--fg-muted)] tabular-nums">
                      {trSayi(m.ss)}
                    </td>
                    <td className="text-end py-2 px-3 text-[var(--fg-muted)] tabular-nums">
                      {trSayi(m.medyan, 1)}
                    </td>
                    <td className="text-end py-2 ps-3 text-[var(--fg-muted)] tabular-nums">
                      {m.mod.join(" / ") || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--fg-subtle)]">
            SS: örneklem standart sapması (n−1). n sütunundaki (−x), o maddede
            hesaba katılmayan hücre sayısıdır.
          </p>
        </section>
      )}

      {/* 5 — Dağılım */}
      {veriVar && (
        <section className="space-y-3">
          <h2 className="text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
            Yanıt dağılımı
          </h2>

          {/* Gösterge: çubuk renkleri koyudan açığa ölçek sırasını izliyor. */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--fg-muted)]">
            {secenekler.map((deger, i) => (
              <span key={deger} className="inline-flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-sm bg-[var(--accent)]"
                  style={{ opacity: dilimOpakligi(i, secenekler.length) }}
                />
                {deger}
              </span>
            ))}
          </div>

          <ul className="space-y-3">
            {ozet.maddeler.map((m) => (
              <li key={m.indis}>
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <span className="text-sm text-[var(--fg)]">
                    {m.indis}. {m.baslik}
                  </span>
                  <span className="text-xs text-[var(--fg-subtle)] tabular-nums shrink-0">
                    n = {m.n}
                  </span>
                </div>
                {m.n === 0 ? (
                  <p className="text-xs text-[var(--fg-subtle)]">
                    Geçerli yanıt yok
                  </p>
                ) : (
                  <>
                    <div
                      className="flex h-6 w-full rounded-md overflow-hidden border border-[var(--border)]"
                      aria-hidden="true"
                    >
                      {m.dagilim.map((d, i) => (
                        <div
                          key={d.deger}
                          style={{
                            width: `${d.yuzde}%`,
                            opacity: dilimOpakligi(i, m.dagilim.length),
                          }}
                          title={`${d.deger}: ${d.sayi} kişi (%${trSayi(d.yuzde, 1)})`}
                          className="bg-[var(--accent)] h-full"
                        />
                      ))}
                    </div>
                    {/* Çubuk görsel; sayılar ekran okuyucu için de metin olarak. */}
                    <p className="mt-1 text-xs text-[var(--fg-subtle)] tabular-nums">
                      {m.dagilim
                        .map(
                          (d) =>
                            `${d.deger}: ${d.sayi} (%${trSayi(d.yuzde, 1)})`
                        )
                        .join("  ·  ")}
                    </p>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {!veriVar && girdi.trim() && (
        <p className="text-sm text-[var(--fg-muted)] border border-[var(--border-strong)] rounded-md px-4 py-3">
          Veri okunamadı. En az bir katılımcı satırı olmalı; ilk satırı başlık
          saydıysanız altında yanıt satırları da bulunmalı.
        </p>
      )}

      {!girdi.trim() && (
        <p className="text-sm text-[var(--fg-muted)] border border-[var(--border-strong)] rounded-md px-4 py-3 flex items-start gap-3">
          <BarChart3 className="w-4 h-4 mt-0.5 shrink-0 text-[var(--accent)]" />
          Veriniz tarayıcıdan çıkmıyor. Her satır bir katılımcı, her sütun bir
          madde olacak biçimde yapıştırın.
        </p>
      )}
    </div>
  );
}

/**
 * Dilim rengi: tek bir vurgu rengi saydamlıkla koyudan açığa açılıyor.
 * Kütüphane kullanmadan, ölçek sırasını gözle izlenebilir kılan en basit yol.
 */
function dilimOpakligi(sira: number, toplam: number): number {
  if (toplam <= 1) return 1;
  return 0.3 + (0.7 * sira) / (toplam - 1);
}

function Kutu({
  etiket,
  deger,
  uyari = false,
}: {
  etiket: string;
  deger: string;
  uyari?: boolean;
}) {
  return (
    <div className="card rounded-lg px-4 py-3 text-center">
      <div
        className={`text-2xl font-semibold tabular-nums ${
          uyari ? "text-yellow-500" : "text-[var(--fg)]"
        }`}
      >
        {deger || "—"}
      </div>
      <div className="text-[11px] uppercase tracking-wider text-[var(--fg-subtle)] mt-0.5">
        {etiket}
      </div>
    </div>
  );
}
