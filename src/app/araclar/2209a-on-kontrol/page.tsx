import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import OnKontrol2209A from "@/components/araclar/on-kontrol-2209a/OnKontrol2209A";
import { Countdown } from "@/components/araclar/on-kontrol-2209a/Countdown";
import { Hazirlayan } from "@/components/araclar/on-kontrol-2209a/Hazirlayan";
import t from "@/components/araclar/on-kontrol-2209a/tokens.module.css";
import w from "@/components/araclar/on-kontrol-2209a/Window.module.css";
import { rules2209a2026 as RULES } from "@/lib/araclar/on-kontrol-2209a/rules/2209a-2026";
import { getTool } from "@/data/tools";
import { profile } from "@/data/profile";
import { seoMeta } from "@/lib/seo/metadata";
import { absoluteUrl } from "@/lib/site";
import { CATALOG, FAQ } from "./content";
import s from "./page.module.css";

const SLUG = "2209a-on-kontrol";
const tool = getTool(SLUG)!;

export const dynamic = "force-static";

export const metadata: Metadata = seoMeta({
  path: `/araclar/${SLUG}`,
  title: `${tool.title} — TÜBİTAK 2209-A Başvuru Kontrolü`,
  description: tool.description,
  keywords: tool.keywords,
});

const LVL = { bad: "Düzelt", warn: "Gözden geçir", tip: "İpucu" } as const;
const VERIFIED = new Date(RULES.verifiedOn).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Istanbul" });

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: tool.title,
      url: absoluteUrl(`/araclar/${SLUG}`),
      description: tool.description,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      inLanguage: "tr",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "TRY" },
      author: { "@type": "Person", name: profile.name, jobTitle: "Öğretim Görevlisi", url: absoluteUrl("/") },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function Page() {
  return (
    <ToolShell slug={SLUG} wide>
      <div className={`${t.tokens} ${s.page}`}>
        <div className={s.intro}>
          <ol className={s.steps} aria-label="Nasıl kullanılır">
            <li><strong>Örneği incele</strong>Sayfa, içinde bilerek hata bırakılmış bir örnek başvuruyla açılır.</li>
            <li><strong>Kendi metnini yapıştır</strong>“Formu temizle” de, bölümleri TYBS sırasıyla doldur. Bulguya tıklayınca ilgili alana gidersin.</li>
            <li><strong>Raporu danışmanına gönder</strong>Raporu kopyala ya da .txt indir; WhatsApp ya da e-postayla paylaş.</li>
          </ol>
          <div className={w.window} aria-label="Başvuru penceresi">
            <div className={w.head}><strong>Son başvuruya kalan</strong><span>11 Kasım 2026, 17.30</span></div>
            <Countdown deadline={RULES.deadline} opened={RULES.callOpened} />
            <p className={w.note}>Kurum e-imzası için son gün 23 Kasım 2026. Son günlerde TYBS yavaşlayabilir; erken gönder.</p>
          </div>
        </div>

        <OnKontrol2209A />

        <section className={s.section} id="kontroller" aria-labelledby="kontroller-h">
          <div className={s.head}>
            <span className="eyebrow">Kural kaynağı · 2209-A Başvuru İçeriği Bilgi Notu (2026)</span>
            <h2 id="kontroller-h">Ne kontrol ediliyor?</h2>
            <p>18 kural puana sayılır. “Düzelt” yalnızca bilgi notunda yazan kurallar içindir. Sezgisel tespitler “Gözden geçir” ya da puana sayılmayan “İpucu” olarak gösterilir.</p>
          </div>
          <div className={s.catalog}>
            {CATALOG.map((c) => (
              <div key={c.title} className={`${s.card} ${s.cat}`}>
                <h3><span className="mono">{c.tag}</span>{c.title}</h3>
                <ul>
                  {c.items.map((it) => (
                    <li key={it.text}><span>{it.text}<span className={s.src}>{it.src}</span></span><span className={`${s.lvl} ${s[it.lvl]}`}>{LVL[it.lvl]}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className={s.section} id="gizlilik" aria-labelledby="gizlilik-h">
          <div className={s.head}>
            <span className="eyebrow">Gizlilik</span>
            <h2 id="gizlilik-h">Metnin bu tarayıcıda kalır</h2>
            <p>Araç sunucusuz çalışır. Kontrollerin hepsi senin bilgisayarında yapılır.</p>
          </div>
          <div className={s.privacy}>
            <div className={s.card}><span className={s.big}>0 bayt</span><h3>Sunucuya giden metin</h3><p>Başvuru metni hiçbir sunucuya, analitiğe ya da üçüncü tarafa gönderilmez. Sayfanın güvenlik politikası da dışarıya veri gönderimini engeller.</p></div>
            <div className={s.card}><span className={s.big}>Yerel</span><h3>Taslak saklama</h3><p>Taslağın yalnızca bu tarayıcıda saklanır; ertesi gün kaldığın yerden devam edersin. “Formu temizle” ile silinir.</p></div>
            <div className={s.card}><span className={s.big}>Yok</span><h3>Çerez ve hesap</h3><p>Giriş, hesap ya da çerez yok. Kişisel veri bulunursa raporda bile maskelenmiş gösterilir.</p></div>
          </div>
        </section>

        <section className={s.section} id="sss" aria-labelledby="sss-h">
          <div className={s.head}>
            <span className="eyebrow">Sık sorulanlar</span>
            <h2 id="sss-h">Sorular</h2>
          </div>
          <div className={s.faq}>
            {FAQ.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </div>
        </section>

        <Hazirlayan />

        <footer className={s.footer}>
          <p>
            Kurallar {RULES.sources.slice(0, 2).map((src, i) => (
              <span key={src.url}>{i > 0 && " ve "}<a href={src.url} target="_blank" rel="noopener">{src.name}</a></span>
            ))} belgelerine göre hazırlandı. Son doğrulama: {VERIFIED}. Yapay zekâ kullandıysan <a href={RULES.sources[2].url} target="_blank" rel="noopener">{RULES.sources[2].name}</a>ne göre beyan et.
          </p>
          <p>Bu araç TÜBİTAK'ın resmî aracı değildir ve TÜBİTAK ile bağlantısı yoktur. Kontroller otomatik ve sezgiseldir; başvurunun kabul edileceğini göstermez. Karakter sayımı boşluklar dahil yapılır; TYBS'nin sayımı farklı olabilir, sınıra yakınsan pay bırak.</p>
          <p>Metnin hiçbir sunucuya gönderilmez. Taslağın yalnızca bu tarayıcıda saklanır.</p>
        </footer>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </ToolShell>
  );
}
