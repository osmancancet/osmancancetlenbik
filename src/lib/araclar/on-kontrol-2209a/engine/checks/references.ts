import type { Issue, Rule } from "../types";
import { citations, hasDoi, refLines, refMatches } from "../citations";
import { BODY_KEYS, list } from "../text";

const NA = { applies: false, issues: [] as Issue[] };

export function referenceRules(): Rule[] {
  return [
    {
      id: "cite-11", sec: "bilimsel", sev: "warn", title: "1.1'de literatüre atıf var", source: "Bilgi notu · sezgisel tespit",
      run: (s) => {
        if (!s.text.bilimsel.trim()) return NA;
        const ct = citations(s.text.bilimsel);
        return { applies: true, issues: ct.numeric.length || ct.ay.length ? [] : [{ msg: "1.1 bölümünde tanınabilir bir atıf yok.", hint: "Bilgi notu konunun önemini literatüre atıfla açıklamanı istiyor." }] };
      },
    },
    {
      id: "refs-match", sec: "kaynak", sev: "warn", title: "Kaynakça ile metin içi atıflar eşleşiyor", source: "Bilgi notu · sezgisel tespit",
      run: (s) => {
        const refs = refLines(s.text.kaynak);
        if (!refs.length) return NA;
        const body = BODY_KEYS.map((k) => s.text[k]).join("\n");
        const ct = citations(body);
        const issues: Issue[] = [];
        if (ct.numeric.length) {
          const cited = new Set(ct.numeric);
          const missing = [...cited].filter((n) => n < 1 || n > refs.length).sort((a, b) => a - b);
          const uncited = refs.map((_, i) => i + 1).filter((n) => !cited.has(n));
          if (missing.length) issues.push({ msg: `Kaynakçada karşılığı olmayan atıflar: ${list(missing.map((n) => `[${n}]`))}.`, hint: "Atıf numaralarını kaynakça sırasıyla eşleştir." });
          if (uncited.length) issues.push({ msg: `Metinde atıf yapılmamış kaynaklar: ${list(uncited.map((n) => `${n}. satır`))}.`, hint: "Bilgi notuna göre listedeki tüm kaynaklara metinde atıf yapılmalı." });
        } else if (!ct.ay.length) {
          issues.push({ msg: "Kaynakça var ama metinde tanınabilir atıf yok.", hint: "Atıfları (Soyad, Yıl) ya da [1] biçiminde yaz." });
        } else {
          const unmatched = [...new Set(ct.ay.filter((a) => !refs.some((r) => refMatches(r, a))).map((a) => `${a.s}, ${a.y}`))];
          const uncited = refs.map((r, i) => (ct.ay.some((a) => refMatches(r, a)) ? 0 : i + 1)).filter(Boolean);
          if (unmatched.length) issues.push({ msg: `Kaynakçada bulunamayan atıflar: ${list(unmatched)}.`, hint: "Soyadı ve yılın kaynakçayla aynı yazıldığını kontrol et." });
          if (uncited.length) issues.push({ msg: `Metinde atıf yapılmamış görünen kaynaklar: ${list(uncited.map((n) => `${n}. satır`))}.`, hint: "Bilgi notuna göre listedeki tüm kaynaklara metinde atıf yapılmalı." });
        }
        return { applies: true, issues };
      },
    },
    {
      id: "refs-doi", sec: "kaynak", sev: "warn", title: "DOI'si olan kaynaklarda DOI eklenmiş", source: "Bilgi notu · sezgisel tespit",
      run: (s) => {
        const refs = refLines(s.text.kaynak);
        if (!refs.length) return NA;
        const no = refs.map((r, i) => (hasDoi(r) ? 0 : i + 1)).filter(Boolean);
        return { applies: true, issues: no.length ? [{ msg: `${refs.length} kaynaktan ${no.length} tanesinde DOI yok: ${list(no.map((n) => `${n}. satır`))}.`, hint: "DOI'si olan kaynaklara DOI eklemek zorunlu. Kitap ve raporların DOI'si yoksa sorun değil." }] : [] };
      },
    },
  ];
}
