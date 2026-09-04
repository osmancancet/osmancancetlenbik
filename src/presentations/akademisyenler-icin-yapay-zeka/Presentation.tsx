"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Ban,
  BookOpen,
  Check,
  ClipboardList,
  Compass,
  FileSearch,
  FileText,
  FlaskConical,
  GraduationCap,
  Languages,
  Layers,
  Link2,
  Lock,
  MessageSquare,
  Minus,
  PenLine,
  Quote,
  Scale,
  ShieldCheck,
  Sparkles,
  Table2,
  Target,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { EmbeddedTool } from "../_shared/deck/EmbeddedTool";
import { PlatformInstall } from "../_shared/deck/PlatformInstall";
import {
  CompareBars,
  DecisionTree,
  FlowSteps,
  Timeline,
} from "../_shared/deck/Diagrams";
import {
  DeckShell,
  Slide,
  Eyebrow,
  H1,
  H2,
  Sub,
  Source,
} from "../_shared/deck/DeckShell";
import "./styles.css";

/**
 * Akademisyenler için Yapay Zekâ — Claude ile günlük akademik iş.
 *
 * KULLANIM BİÇİMİ: Bu sunum LinkedIn'de tek başına okunmak üzere kurgulandı.
 * Anlatan biri olmadığı için her slayt kendi başına tamamlanıyor; "birazdan
 * göreceğiz", "burada anlatacağım" gibi sunucuya bağlı ifade yok.
 *
 * İÇERİK KURALI: Her sayı, tarih ve kapsam iddiası Anthropic'in resmî
 * sayfalarından ya da yayıncıların kendi politika metinlerinden alındı ve
 * slaydın altında kaynağı yazıyor. Doğrulanamayan hiçbir iddia girmedi —
 * özellikle "akademisyenlere ücretsiz Pro" söylentisi, gerçekte ABD'deki
 * K-12 öğretmenlerine yönelik bir program olduğu için düzeltilerek anlatıldı.
 *
 * Erişim tarihi: 4 Eylül 2026.
 */

const ACCENT = "#d97757";

/* ─── Yapı taşları ─────────────────────────────────────────────── */

function Grid() {
  return <div className="absolute inset-0 ai-grid-bg pointer-events-none" />;
}

function Fade({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Card({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="ai-card p-5 h-full">
      <span
        className="inline-grid place-items-center w-9 h-9 rounded-lg mb-3"
        style={{ background: "color-mix(in srgb, var(--deck-accent) 16%, transparent)" }}
      >
        <Icon className="w-4 h-4" />
      </span>
      <h3 className="text-base font-semibold text-white mb-1.5">{title}</h3>
      <div className="text-sm leading-relaxed text-white/55">{children}</div>
    </div>
  );
}

function Divider({
  num,
  title,
  subtitle,
  icerik,
}: {
  /** Numarasız bırakılabilir: kapanış bloğu bir bölüm değil, sunumun
   *  kuyruğu — yol haritasındaki sekiz bölüm sayımına girmiyor. */
  num?: string;
  title: string;
  subtitle: string;
  /** Bölümde ne anlatıldığı. Okuyucu ne geleceğini baştan görsün diye —
   *  LinkedIn'de kaydıran kişi bölümü atlayıp atlamayacağına burada karar
   *  veriyor. */
  icerik?: string[];
}) {
  return (
    <div className="relative w-full h-full flex items-center justify-center px-10">
      <Grid />
      <div className="relative text-center max-w-4xl">
        <Fade>
          <div
            className="font-mono text-[11px] uppercase tracking-[0.3em] mb-5"
            style={{ color: ACCENT }}
          >
            {num ? `Bölüm ${num}` : "Son"}
          </div>
        </Fade>
        <Fade delay={0.08}>
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.05]">
            {title}
          </h2>
        </Fade>
        <Fade delay={0.16}>
          <p className="mt-5 text-lg text-white/50 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </Fade>
        {icerik && icerik.length > 0 && (
          <Fade delay={0.26}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
              {icerik.map((x, i) => (
                <span key={x} className="flex items-center gap-3">
                  {i > 0 && (
                    <span className="text-white/20" aria-hidden>
                      ·
                    </span>
                  )}
                  <span className="text-sm text-white/45">{x}</span>
                </span>
              ))}
            </div>
          </Fade>
        )}
      </div>
    </div>
  );
}

/** Yan yana karşılaştırma — "böyle sorma / böyle sor" gibi. */
function Versus({
  left,
  right,
}: {
  left: { label: string; items: ReactNode[] };
  right: { label: string; items: ReactNode[] };
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Fade delay={0.08}>
        <div className="ai-card p-5 h-full">
          <div className="flex items-center gap-2 mb-3">
            <X className="w-4 h-4 text-white/35" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
              {left.label}
            </span>
          </div>
          <ul className="space-y-2 text-sm text-white/50 leading-relaxed">
            {left.items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </div>
      </Fade>
      <Fade delay={0.16}>
        <div className="ai-card p-5 h-full">
          <div className="flex items-center gap-2 mb-3">
            <Check className="w-4 h-4" style={{ color: ACCENT }} />
            <span
              className="font-mono text-[11px] uppercase tracking-[0.18em]"
              style={{ color: ACCENT }}
            >
              {right.label}
            </span>
          </div>
          <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
            {right.items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </div>
      </Fade>
    </div>
  );
}

/** Numaralı adım listesi. */
function Steps({
  items,
}: {
  items: Array<{ t: string; d: string }>;
}) {
  return (
    <div className="space-y-2.5">
      {items.map((s, i) => (
        <Fade key={s.t} delay={0.06 * i}>
          <div className="ai-card px-5 py-3.5 flex items-start gap-4">
            <span
              className="font-mono text-sm shrink-0 pt-0.5"
              style={{ color: ACCENT }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="text-white font-medium">{s.t}</div>
              <div className="text-sm text-white/50 mt-0.5 leading-relaxed">{s.d}</div>
            </div>
          </div>
        </Fade>
      ))}
    </div>
  );
}

/** Kopyalanabilir istem örneği. */
function Prompt({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-lg px-5 py-4 font-mono text-[13px] leading-relaxed text-white/75 whitespace-pre-wrap"
      style={{
        background: "rgba(255,255,255,0.04)",
        borderInlineStart: `3px solid ${ACCENT}`,
      }}
    >
      {children}
    </div>
  );
}

const Yes = () => <Check className="w-4 h-4 ai-yes" aria-label="var" />;
const No = () => <Minus className="w-4 h-4 ai-no" aria-label="yok" />;

/* ─── Slaytlar ─────────────────────────────────────────────────── */

const slides: Array<(active: boolean) => ReactNode> = [
  /* 01 · Kapak
     LinkedIn akışında görünen tek kare bu — okuyucunun durup durmama kararı
     burada veriliyor. Ortalanmış klasik kapak yerine sola hizalı editoryal
     düzen: slogan kendi bloğunda duruyor, sağdaki künye sunumun ne kadar iş
     olduğunu tek bakışta gösteriyor.

     Sayılar elle yazılmıyor, `slides` dizisinden okunuyor. Slayt eklendiğinde
     kapaktaki sayı kendiliğinden güncelleniyor — daha önce elle tutulurken
     üç kez sapmıştı. */
  () => (
    <div className="relative w-full h-full flex items-center px-12 md:px-20 pb-32">
      <Grid />
      <div
        aria-hidden
        className="absolute w-[44rem] h-[44rem] blur-[150px] pointer-events-none"
        style={{
          insetInlineStart: "-10rem",
          top: "50%",
          transform: "translateY(-50%)",
          background: `radial-gradient(circle, ${ACCENT}26, transparent 65%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-y-16 w-px pointer-events-none"
        style={{
          insetInlineStart: 0,
          background: `linear-gradient(180deg, transparent, ${ACCENT}, transparent)`,
        }}
      />

      <div className="relative w-full grid md:grid-cols-[1fr_auto] gap-14 items-end">
        <div className="max-w-3xl">
          <Fade>
            <div
              className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.26em] mb-8"
              style={{ color: ACCENT }}
            >
              <span className="w-8 h-px" style={{ background: ACCENT }} />
              Akademisyenler için rehber · Eylül 2026
            </div>
          </Fade>

          <Fade delay={0.08}>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.03]">
              Akademisyenler için
              <br />
              <span style={{ color: ACCENT }}>yapay zekâ</span>
            </h1>
          </Fade>

          <Fade delay={0.16}>
            <p className="ai-slogan mt-9 ps-6 py-1 text-2xl md:text-[2rem] font-medium text-white leading-snug">
              Zamanınızı geri alın, imzanızı değil.
            </p>
          </Fade>

          <Fade delay={0.24}>
            <p className="mt-8 text-lg text-white/50 leading-relaxed max-w-2xl">
              Ders hazırlamaktan hakem yanıtı yazmaya: akademik işin hangi
              kısmını devredebilirsiniz, hangisini asla devredemezsiniz. Dışarıdan
              alınan her sayının, tarihin ve kuralın kaynağı slaydın altında yazılı.
            </p>
          </Fade>
        </div>

        <Fade delay={0.32}>
          <div className="flex md:flex-col gap-9 md:gap-6 md:border-s md:border-white/10 md:ps-9">
            {[
              [String(slides.length), "slayt"],
              ["12", "ücretsiz araç"],
              // Slaytlardaki <Source> sayısı. Elle tutuluyor — JSX'in içinde
              // olduğu için çalışma anında sayılamıyor. Kaynak ekleyince
              // güncelleyin: grep -c "<Source>" Presentation.tsx
              ["41", "kaynakça"],
              [`~${Math.round(slides.length * 0.37)} dk`, "okuma"],
            ].map(([sayi, etiket]) => (
              <div key={etiket}>
                <div
                  className="text-2xl font-semibold tabular-nums"
                  style={{ color: ACCENT }}
                >
                  {sayi}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35 mt-1">
                  {etiket}
                </div>
              </div>
            ))}
          </div>
        </Fade>
      </div>

      <Fade delay={0.4}>
        <div className="absolute bottom-24 inset-x-12 md:inset-x-20 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 pt-5 border-t border-white/10">
          <div className="text-sm text-white/70">
            Öğr. Gör. Osman Can Çetlenbik
            <span className="text-white/30">
              {" "}
              · Manisa Celal Bayar Üniversitesi
            </span>
          </div>
          <div className="font-mono text-xs text-white/25">
            osmancancetlenbik.com
          </div>
        </div>
      </Fade>
    </div>
  ),

  /* 02 · Bu sunum ne, ne değil */
  () => (
    <Slide>
      <Eyebrow>Baştan netleştirelim</Eyebrow>
      <H1>Bu sunumda abartı yok.</H1>
      <Sub>
        Yapay zekâ anlatan içeriklerin çoğu vaatle dolu. Buradaki her sayı,
        tarih ve kapsam bilgisi üreticinin kendi resmî sayfasından ya da
        yayıncının kendi politika metninden alındı; kaynağı da slaytın altında
        duruyor. Doğrulayamadığım hiçbir şey bu sunuma girmedi.
      </Sub>
      <div className="mt-8">
        <Versus
          left={{
            label: "Bulamayacağınız şeyler",
            items: [
              "“Yapay zekâ makalenizi yazsın” tavsiyesi",
              "Doğrulanmamış kampanya duyurusu",
              "Aracı sihirli bir kutu gibi gösteren örnekler",
              "Kaynağı belirsiz istatistik",
            ],
          }}
          right={{
            label: "Bulacağınız şeyler",
            items: [
              "Neyin ücretsiz olduğu — tam kapsamıyla",
              "Kopyalayıp kullanabileceğiniz istem kalıpları",
              "Dört büyük yayın kuruluşunun beyan kuralları",
              "Verinizin nereye gittiği ve ne kadar durduğu",
            ],
          }}
        />
      </div>
    </Slide>
  ),

  /* 03 · Sözlük */
  () => (
    <Slide>
      <Eyebrow>Önce ortak dil</Eyebrow>
      <H2>Altı terim, altı cümle.</H2>
      <Sub>
        Konuşmanın geri kalanı bu altı kelimeye dayanıyor. Zaten biliyorsanız
        atlayın.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-x-8 gap-y-4">
        {[
          ["Model", "Metni üreten sistemin kendisi. Claude'un Opus, Sonnet, Haiku ve Fable diye farklı güç, hız ve maliyet seviyeleri var."],
          ["İstem (prompt)", "Modele yazdığınız yönerge. Sonucun kalitesini en çok belirleyen şey."],
          ["Bağlam penceresi", "Modelin aynı anda “aklında tutabildiği” metin miktarı. Uzun bir tez bu pencereye sığmayabilir."],
          ["Halüsinasyon", "Modelin, doğruymuş gibi görünen ama gerçekte var olmayan bilgi üretmesi. Akademisyeni en çok yakan hata türü."],
          ["Proje (Projects)", "Tek bir iş için ayrılmış çalışma alanı: bir ders, bir makale, bir tez. Yüklediğiniz dosyalar ve verdiğiniz talimat o alanın içinde kalıcı olur."],
          ["Beyan", "Makale ya da tezde yapay zekâyı hangi aşamada, hangi araçla kullandığınızı yazdığınız cümle. Yayıncıların ve YÖK'ün istediği şey bu."],
        ].map(([t, d], i) => (
          <Fade key={t} delay={0.05 * i}>
            <div>
              <div className="text-white font-semibold mb-1">{t}</div>
              <div className="text-sm text-white/50 leading-relaxed">{d}</div>
            </div>
          </Fade>
        ))}
      </div>
    </Slide>
  ),

  /* 04 · Yol haritası */
  () => (
    <Slide>
      <Eyebrow>İçindekiler</Eyebrow>
      <H2>Sekiz bölüm.</H2>
      <div className="mt-8 grid md:grid-cols-2 gap-x-8 gap-y-3">
        {[
          ["1 · Manzara", "Hangi araçlar var, hangileri bedava, ne ödersiniz ve nasıl ödersiniz"],
          ["2 · Nasıl sorulur", "Model seçimi, istem yazma tekniği ve kopyalanabilir hazır kalıplar"],
          ["3 · Akademik iş", "Literatürden hakem yanıtına yedi somut iş akışı"],
          ["4 · Alanınıza göre", "Altı alan için ayrı ayrı fırsatlar ve riskler"],
          ["5 · Öğrenci", "Ödevi yasaklamadan kurgulamak, derste kullanmak, tespit araçlarının gerçeği"],
          ["6 · Sınırlar", "Yayıncı kuralları, uydurma atıf, veri gizliliği"],
          ["7 · Türkiye'de durum", "YÖK, TÜBİTAK, KVKK ve üniversite yönergeleri — doğrulanmış"],
          ["8 · Araçlar ve uygulama", "Size yazdığım on iki ücretsiz araç ve otuz günlük plan"],
        ].map(([t, d], i) => (
          <Fade key={t} delay={0.05 * i}>
            <div className="ai-card px-5 py-4">
              <div
                className="font-mono text-[11px] uppercase tracking-[0.18em] mb-1.5"
                style={{ color: ACCENT }}
              >
                {t}
              </div>
              <div className="text-sm text-white/55 leading-relaxed">{d}</div>
            </div>
          </Fade>
        ))}
      </div>
    </Slide>
  ),

  /* Bölüm 1 · Manzara */
  () => (
    <Divider
      num="1"
      title="Manzara"
      subtitle="Hangi araçlar var, hangileri gerçekten ücretsiz, siz hangisini almalısınız."
      icerik={[
        "Yedi kategori",
        "Bedava olanlar",
        "Ücretsiz programlar",
        "Plan ve bütçe",
        "Ödeme ve fatura",
        "İlk on dakika",
      ]}
    />
  ),

  /* Manzara */
  () => (
    <Slide>
      <Eyebrow>Genel görünüm</Eyebrow>
      <H2>Yedi kategori, onlarca araç.</H2>
      <Sub>
        Hepsini kullanmanız gerekmiyor. Kendi iş akışınızda hangi adımın
        tıkandığını bulup oraya bir araç koyun — “herkes kullanıyor” diye
        başlayan denemeler bırakılıyor.
      </Sub>
      <div className="mt-7 grid md:grid-cols-3 gap-3">
        {[
          ["Literatür", "Elicit · Consensus · Connected Papers · Semantic Scholar · Scite", "Elicit — sorunuzu makale tablosuna çeviriyor"],
          ["Okuma ve not", "NotebookLM · SciSpace · Zotero", "NotebookLM — ücretsiz, verdiğiniz PDF dışına çıkmıyor"],
          ["Yazma ve dil", "DeepL Write · Paperpal · Writefull · Grammarly", "DeepL Write — Türkçeden çevrilmiş İngilizceyi en çok toparlayan"],
          ["Deşifre ve ses", "Whisper · otomatik altyazı araçları", "Whisper — görüşme ve ders kaydını yazıya çeviriyor"],
          ["Veri ve kod", "GitHub Copilot · kod yorumlayıcılar", "GitHub Copilot — akademik kadroya ücretsiz"],
          ["Görsel ve sunum", "BioRender · Napkin · Gamma", "Gamma — taslak metinden slayt iskeleti çıkarıyor"],
        ].map(([t, d, b], i) => (
          <Fade key={t} delay={0.05 * i}>
            <div className="ai-card px-4 py-4 h-full flex flex-col">
              <div
                className="font-mono text-[11px] uppercase tracking-[0.16em] mb-2"
                style={{ color: ACCENT }}
              >
                {t}
              </div>
              <div className="text-[13px] text-white/45 leading-relaxed flex-1">{d}</div>
              <div className="mt-2.5 pt-2.5 border-t border-white/10 text-[12px] text-white/65 leading-relaxed">
                {b}
              </div>
            </div>
          </Fade>
        ))}
      </div>
      <Fade delay={0.35}>
        <div className="ai-card px-5 py-4 mt-3">
          <div
            className="font-mono text-[11px] uppercase tracking-[0.16em] mb-2"
            style={{ color: ACCENT }}
          >
            Sohbet modelleri
          </div>
          <div className="text-[13px] text-white/45 leading-relaxed">
            Claude · ChatGPT · Gemini · Copilot · Mistral
          </div>
          <div className="mt-2.5 pt-2.5 border-t border-white/10 text-[12px] text-white/65 leading-relaxed">
            Yedinci kategori diğer altısının çoğunu zaten yapabildiği için bu
            sunumun geri kalanı buraya odaklanıyor — örnekler Claude üzerinden,
            ama teknikler hepsinde çalışıyor.
          </div>
        </div>
      </Fade>
      <Source>
        Fiyat ve kapsam bilgileri araçların resmî sayfalarından, 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* Literatür araçları */
  () => (
    <Slide>
      <Eyebrow>Kategori · literatür</Eyebrow>
      <H2>Alanı taramak ve haritalamak.</H2>
      <div className="mt-6 overflow-x-auto">
        <table className="ai-table table-fixed">
          <thead>
            <tr>
              <th className="w-[22%]">Araç</th>
              <th className="w-[44%]">Ne yapar</th>
              <th className="w-[34%]">Ücretsizde ne var</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Elicit</td>
              <td>138M+ makalede arama, tablo hâlinde veri çıkarımı</td>
              <td>Sınırsız arama, özet ve makaleyle sohbet · Pro 49 USD/ay</td>
            </tr>
            <tr>
              <td>Consensus</td>
              <td>Bilimsel soru–cevap; bulgularda uzlaşı derecesi</td>
              <td>Temel arama · Pro 20 USD/ay</td>
            </tr>
            <tr>
              <td>Research Rabbit</td>
              <td>Seçtiğiniz makalelerden ağ haritası ve öneri</td>
              <td>Sınırsız arama ve koleksiyon, 50 başlangıç makalesi</td>
            </tr>
            <tr>
              <td>Connected Papers</td>
              <td>Tek makaleden benzerlik grafiği</td>
              <td>Ayda 5 grafik</td>
            </tr>
            <tr>
              <td>Scite</td>
              <td>Atfın destekleyici mi çelişkili mi olduğunu etiketler</td>
              <td>Platform erişimi yok · Basic 20 USD/ay</td>
            </tr>
            <tr>
              <td>Litmaps</td>
              <td>Literatür haritası + yeni makale uyarısı</td>
              <td>2 harita, harita başına 100 makale · Pro 10 USD/ay</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Fade delay={0.3}>
        <p className="mt-5 text-sm text-white/45 leading-relaxed max-w-3xl">
          Scite&apos;ın yaptığı şey diğerlerinde yok: bir makaleye yapılan
          atfın onu destekleyip desteklemediğini gösteriyor. Atıf sayısına
          değil atıf niteliğine bakmak isteyen için tek seçenek.
        </p>
      </Fade>
      <Source>
        elicit.com/pricing · help.consensus.app · researchrabbit.ai/pricing ·
        scite.ai/pricing · litmaps.com/pricing — 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* Yazma ve dil araçları */
  () => (
    <Slide>
      <Eyebrow>Kategori · yazma ve dil</Eyebrow>
      <H2>İngilizce yazarken.</H2>
      <Sub>
        Ana dili Türkçe olan bir araştırmacı için en yüksek pratik değer bu
        kategoride. Ama aralarında akademik dürüstlük açısından ciddi fark var.
      </Sub>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={Languages} title="DeepL Write">
            Çeviri değil, kendi yazdığınız İngilizceyi akıcılaştırma. Yeni
            içerik üretmediği için dürüstlük riski en düşük olan. Hesapsız
            kullanımda seferde 1.500 karakter.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={PenLine} title="Paperpal">
            Akademik metne özel; Word, Overleaf ve Google Docs içinde çalışıyor.
            Ücretsizde ayda 200 dil önerisi · Prime 25 USD/ay.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Check} title="Grammarly">
            Genel amaçlı dil düzeltme. Öğrenci ve eğitmene doğrulama ile
            yüzde 50&apos;ye varan indirim veriyor · Pro 12 USD/ay.
          </Card>
        </Fade>
      </div>
      <Source>
        deepl.com · paperpal.com/pricing · grammarly.com/plans — 4 Eylül 2026.
        DeepL&apos;in tam plan tablosu resmî sayfadan doğrulanamadı.
      </Source>
    </Slide>
  ),

  /* Dürüstlük riski olan araçlar */
  () => (
    <Slide>
      <Eyebrow>Dikkat</Eyebrow>
      <H2>Bir kategori var ki kullanmadan önce düşünün.</H2>
      <Sub>
        Metni “başka sözcüklerle yeniden yazan” araçlar (paraphrase araçları)
        yaygın. Kendini <strong className="text-white/80">“AI humanizer”</strong>,
        <strong className="text-white/80"> “bypass AI detection”</strong>{" "}ya da
        “yapay zekâ metnini insanlaştırma” diye pazarlayan her araç bu
        kategoride. İki ayrı sorun taşıyorlar.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <div className="flex items-center gap-2 mb-2.5">
              <AlertTriangle className="w-4 h-4" style={{ color: ACCENT }} />
              <span className="text-white font-semibold">Kaynak gösterme sorunu</span>
            </div>
            <p className="text-sm text-white/55 leading-relaxed">
              Başkasının cümlesini yeniden yazmak, kaynak göstermediğiniz
              sürece intihaldir. Aracın yeniden yazması bunu değiştirmiyor.
              Ankara Üniversitesi yönergesi tespit araçlarını aşmaya yönelik
              kullanımı açıkça ihlal sayıyor.
            </p>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <div className="flex items-center gap-2 mb-2.5">
              <Ban className="w-4 h-4" style={{ color: ACCENT }} />
              <span className="text-white font-semibold">
                Tespitten kaçınma özelliği
              </span>
            </div>
            <p className="text-sm text-white/55 leading-relaxed">
              Bu araçların bir kısmı metni “insanlaştırma” adı altında yapay
              zekâ tespitinden kaçırmayı pazarlıyor. Bir özelliğin varlık
              sebebi denetimden kaçmaksa, kullanımı da savunulamaz.
            </p>
          </div>
        </Fade>
      </div>
      <Fade delay={0.26}>
        <p className="mt-7 text-white/50 leading-relaxed max-w-3xl">
          Dil düzeltmesi ile yeniden yazım arasındaki sınır burada. Kendi
          cümlenizi düzeltmek meşru; başkasının cümlesini tanınmaz hâle
          getirmek değil.
        </p>
      </Fade>
      <Source>
        Ankara Üniversitesi — Yükseköğretimde Üretken Yapay Zekâ Kullanımına
        İlişkin Yönerge
      </Source>
    </Slide>
  ),

  /* Görsel araçlar ve tuzak */
  () => (
    <Slide>
      <Eyebrow>Kategori · görsel</Eyebrow>
      <H2>Şekil çizmek — ve bir tuzak.</H2>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <h3 className="text-white font-semibold mb-2">
              BioRender — yaşam bilimleri
            </h3>
            <p className="text-sm text-white/55 leading-relaxed mb-3">
              Yayın kalitesinde bilimsel şema çizimi. Akademik bireysel plan
              yıllık ödemede aylık 35 dolar.
            </p>
            <div
              className="text-sm leading-relaxed px-3 py-2 rounded"
              style={{
                background: "color-mix(in srgb, var(--deck-accent) 10%, transparent)",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              <strong className="text-white">Tuzak:</strong>{" "}Ücretsiz katmanda
              ürettiğiniz şeklin <strong className="text-white">yayın hakkı
              yok</strong>. Makalenize koyamazsınız.
            </div>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <h3 className="text-white font-semibold mb-2">Napkin — diyagram</h3>
            <p className="text-sm text-white/55 leading-relaxed mb-3">
              Yazdığınız metinden otomatik diyagram üretiyor. Haftada 500
              kredi ücretsiz, sınırsız PNG ve PDF dışa aktarma.
            </p>
            <p className="text-sm text-white/45 leading-relaxed">
              Ücretsiz katmanda görsele Napkin logosu işleniyor — sunumda
              sorun değil, yayında olabilir.
            </p>
          </div>
        </Fade>
      </div>
      <Source>biorender.com/pricing · napkin.ai/pricing — 4 Eylül 2026</Source>
    </Slide>
  ),

  /* Gerçekten ücretsiz olanlar */
  () => (
    <Slide>
      <Eyebrow>Para gerektirmeyenler</Eyebrow>
      <H2>Tek kuruş ödemeden kullanabilecekleriniz.</H2>
      <Sub>
        Aşağıdakiler ücretsiz deneme değil, kalıcı olarak ücretsiz. Bütçe
        istemeden bugün başlayabilirsiniz.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.06}>
          <Card icon={FlaskConical} title="Whisper — ses deşifresi">
            Açık kaynak, MIT lisanslı, <strong className="text-white/80">kendi
            bilgisayarınızda</strong>{" "}çalışıyor. Görüşme, odak grubu ve ders
            kaydını yazıya çevirir. Ses buluta gitmediği için etik kurul
            açısından en temiz seçenek.
          </Card>
        </Fade>
        <Fade delay={0.12}>
          <Card icon={BookOpen} title="Zotero — kaynak yönetimi">
            Yazılım tamamen ücretsiz, 300 MB depolama dahil. Sınırsız depolama
            isterseniz yılda 120 dolar. Diğer araçların bağlandığı omurga.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={FileSearch} title="Semantic Scholar">
            200 milyondan fazla makalelik dizin ve açık API. Tamamen ücretsiz,
            anahtar bile gerekmiyor.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Layers} title="NotebookLM — ücretsiz katman">
            100 not defteri, defter başına 50 kaynak, günde 50 soru. En güçlü
            yanı: yalnızca yüklediğiniz kaynaklara bağlı kalıyor.
          </Card>
        </Fade>
      </div>
      <Source>
        github.com/openai/whisper · zotero.org/storage ·
        semanticscholar.org/product/api · support.google.com/notebooklm —
        4 Eylül 2026. NotebookLM limitleri 2 Eylül 2026&apos;da güncellendi;
        okuduğunuz tarihte tekrar bakın.
      </Source>
    </Slide>
  ),

  /* Akademisyene ücretsiz — Copilot */
  () => (
    <Slide>
      <Eyebrow>Doğrulanmış · en değerli bulgu</Eyebrow>
      <H1>
        GitHub Copilot
        <br />
        <span style={{ color: ACCENT }}>öğretim üyelerine ücretsiz.</span>
      </H1>
      <Sub>
        Doğrulanmış öğretmen ve öğretim üyeleri <strong className="text-white">tam
        Copilot Pro&apos;yu</strong>{" "}ücretsiz kullanıyor. Öğrenciler için ayrı
        bir “Copilot Student” katmanı var, o da ücretsiz. Normal fiyatı ayda 10
        dolar.
      </Sub>
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <Fade delay={0.1}>
          <div className="ai-card p-5">
            <div className="text-white font-semibold mb-2">Kimin işine yarar</div>
            <p className="text-sm text-white/55 leading-relaxed">
              R, Python, Stata ya da MATLAB kullanan herkes. Nicel araştırma
              yapıyorsanız doğrudan üretkenlik kazancı — üstelik bedava.
            </p>
          </div>
        </Fade>
        <Fade delay={0.18}>
          <div className="ai-card p-5">
            <div className="text-white font-semibold mb-2">Bilinmesi gereken</div>
            <p className="text-sm text-white/55 leading-relaxed">
              Uygunluk her ay yeniden değerlendiriliyor. Kurum e-postanız ve
              gerekirse görev belgesi isteniyor. Başvuru kabulünün açık olup
              olmadığını başvurmadan önce kontrol edin.
            </p>
          </div>
        </Fade>
      </div>
      <Fade delay={0.28}>
        <div className="ai-warn mt-5 px-5 py-3.5">
          <p className="text-sm text-white/70 leading-relaxed">
            <strong className="text-white">Nereden başvurulur:</strong>{" "}
            GitHub hesabınızla github.com/education adresine girip{" "}
            <strong className="text-white">Teacher Benefits</strong>{" "}bölümünden
            başvuruyorsunuz. Onaydan sonra Copilot&apos;u hesap ayarlarınızdan
            kendiniz etkinleştiriyorsunuz — kendiliğinden açılmıyor.
          </p>
        </div>
      </Fade>
      <Source>
        docs.github.com/copilot — “Get free access to Copilot Pro” ·
        github.com/education/teachers — 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* 06 · Ücretsiz planda ne var */
  () => (
    <Slide>
      <Eyebrow>Ücretsiz plan · 0 USD</Eyebrow>
      <H2>Tek kuruş ödemeden neler yapabilirsiniz?</H2>
      <Sub>
        Akademik işin önemli bir kısmı ücretsiz planda zaten dönüyor. Ödeme
        yapmadan önce buranın sınırına gerçekten çarpıp çarpmadığınıza bakın.
      </Sub>
      <div className="mt-7 grid md:grid-cols-3 gap-4">
        <Fade delay={0.06}>
          <Card icon={Sparkles} title="Sonnet ve Haiku">
            Günlük yazışma, özetleme, çeviri ve kod için iki model.
          </Card>
        </Fade>
        <Fade delay={0.12}>
          <Card icon={Layers} title="Artifacts">
            Doküman, görselleştirme ve tek dosyalık web uygulaması üretip
            yayımlayabilirsiniz — yayımlama ücretsiz planda da açık.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={Link2} title="Bağlayıcılar, web araması">
            Drive, GitHub, Slack gibi kaynaklara bağlanma ve web araması
            ücretsiz planda açık.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={FileText} title="Beş proje">
            Ayrı bağlamlar: bir ders, bir makale, bir proje. Ücretsizde en
            fazla beş tane.
          </Card>
        </Fade>
        <Fade delay={0.3}>
          <Card icon={BookOpen} title="Dosya yükleme ve hafıza">
            Belge yükleyip üzerinde konuşmak ve önceki konuşmaları hatırlaması
            ücretsiz planda da var.
          </Card>
        </Fade>
        <Fade delay={0.36}>
          <Card icon={MessageSquare} title="Sesli mod ve Skills">
            Konuşarak kullanım ve hazır beceri paketleri ücretsiz planda da var.
          </Card>
        </Fade>
      </div>
      <Source>
        claude.com/pricing · support.claude.com “What are Projects”, “What are
        Artifacts” — erişim 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* 07 · Pro ne ekliyor */
  () => (
    <Slide>
      <Eyebrow>Pro · aylık 20 USD, yıllık ödemede 17 USD/ay</Eyebrow>
      <H2>Ücret neyi satın alıyor?</H2>
      <div className="mt-7 overflow-x-auto">
        <table className="ai-table table-fixed">
          <thead>
            <tr>
              <th className="w-[40%]">Özellik</th>
              <th className="w-[30%]">Ücretsiz</th>
              <th className="w-[30%]">Pro</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Modeller</td>
              <td>Sonnet · Haiku</td>
              <td>Opus · Sonnet · Haiku (+ sınırlı Fable)</td>
            </tr>
            <tr>
              <td>Kullanım hacmi</td>
              <td>5 saatlik pencere</td>
              <td>Aynı pencerede en az 5 kat</td>
            </tr>
            <tr>
              <td>Proje sayısı</td>
              <td>5</td>
              <td>Sınırsız + genişletilmiş bilgi tabanı</td>
            </tr>
            <tr>
              <td>Research — atıflı rapor</td>
              <td><No /></td>
              <td><Yes /></td>
            </tr>
            <tr>
              <td>Claude for Excel</td>
              <td><No /></td>
              <td><Yes /></td>
            </tr>
            <tr>
              <td>Chrome uzantısı</td>
              <td><No /></td>
              <td><Yes /></td>
            </tr>
            <tr>
              <td>
                Claude Science
                <div className="text-[12px] text-white/35 mt-0.5">
                  Literatür, veri ve laboratuvar araçlarını tek yerde toplayan
                  araştırma kipi
                </div>
              </td>
              <td><No /></td>
              <td><Yes /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="ai-warn mt-5 px-5 py-3">
        <p className="text-sm text-white/70 leading-relaxed">
          <strong className="text-white">Beş saatlik pencere ne demek?</strong>{" "}
          Kullanım, her beş saatte bir sıfırlanan bir kotayla ölçülüyor. Kota
          dolunca pencere yenilenene kadar bekliyorsunuz. Kaç mesaj ettiği
          sabit değil — uzun belge yükleyip uzun cevap istediğinizde kota daha
          hızlı iniyor.
        </p>
      </div>
      <div className="ai-warn mt-3 px-5 py-3">
        <p className="text-sm text-white/70 leading-relaxed">
          <strong className="text-white">Sık karıştırılan nokta:</strong>{" "}Pro
          aboneliği <strong className="text-white">API erişimi içermez</strong>.
          Claude'u kendi uygulamanıza bağlayacaksanız API ayrı ücretlendirilir.
        </p>
      </div>
      <Source>
        claude.com/pricing · support.claude.com “What is the Pro plan” — erişim
        4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* 08 · Söylentinin aslı */
  () => (
    <Slide>
      <Eyebrow>Çok dolaşan bir iddia</Eyebrow>
      <H2>“Akademisyenlere ücretsiz veriliyor” — kime, hangi koşulla?</H2>
      <Sub>
        İki ayrı program var ve ikisi de belirli bir kitleye açık. Hangisinin
        size uyduğunu bilmek, yanlış bir umuda kapılmaktan iyidir.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5 h-full">
            <div
              className="font-mono text-[11px] uppercase tracking-[0.18em] mb-2.5"
              style={{ color: ACCENT }}
            >
              Claude for Teachers
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-3">
              Ücretsiz premium erişim. Son başvuru 30 Haziran 2027.
            </p>
            <ul className="space-y-1.5 text-sm text-white/50 leading-relaxed">
              <li>· Yalnızca <strong className="text-white/80">ABD&apos;deki K-12</strong>{" "}öğretmenleri</li>
              <li>· Üniversite akademisyenleri kapsam dışı</li>
              <li>· Türkiye kapsam dışı</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div
            className="ai-card p-5 h-full"
            style={{
              borderColor: "color-mix(in srgb, var(--deck-accent) 55%, transparent)",
              background: "color-mix(in srgb, var(--deck-accent) 7%, transparent)",
            }}
          >
            <div
              className="font-mono text-[11px] uppercase tracking-[0.18em] mb-2.5"
              style={{ color: ACCENT }}
            >
              Bilim insanları için Team planı
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-3">
              27 Ağustos 2026&apos;da açıldı. <strong className="text-white">Dünya
              geneline</strong>{" "}10.000 ücretsiz koltuk.
            </p>
            <ul className="space-y-1.5 text-sm text-white/60 leading-relaxed">
              <li>· Akredite kurumda <strong className="text-white/80">araştırma grubu yürüten</strong>{" "}akademisyenler</li>
              <li>· Türkiye desteklenen ülkeler arasında</li>
            </ul>
          </div>
        </Fade>
      </div>
      <Source>
        anthropic.com/news/claude-for-teachers (14 Temmuz 2026) ·
        anthropic.com/news/expanding-support-for-scientists (27 Ağustos 2026)
      </Source>
    </Slide>
  ),

  /* 08b · Bilim insanları için Team planı */
  () => (
    <Slide>
      <Eyebrow>Doğrulanmış · Türkiye&apos;den başvurulabilir</Eyebrow>
      <H1>
        Araştırma grubu yürütüyorsanız
        <br />
        <span style={{ color: ACCENT }}>Claude Team ücretsiz.</span>
      </H1>
      <Sub>
        Anthropic 27 Ağustos 2026&apos;da dünya genelindeki bilim insanlarına
        10.000 ücretsiz koltuk açtı. Standart koltuk normalde ayda 20 dolar —
        bu programda 12 ay boyunca sıfır. Onaylanan yürütücü kendi grubuna
        1–25 koltuk ekleyebiliyor: doktora öğrencisi, doktora sonrası
        araştırmacı, ekip üyesi.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.1}>
          <div className="ai-card p-5">
            <div className="flex items-center gap-2 mb-2.5">
              <Check className="w-4 h-4" style={{ color: ACCENT }} />
              <span
                className="font-mono text-[11px] uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                Kim başvurabilir
              </span>
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>· Akredite akademik ya da kâr amacı gütmeyen kurumda araştırma grubu yürütenler</li>
              <li>· Doğa bilimleri, matematik, bilgisayar bilimi, mühendislik ve ilgili alanlar</li>
              <li>· Türkiye, Anthropic&apos;in desteklenen ülkeler listesinde</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.18}>
          <div className="ai-card p-5">
            <div className="flex items-center gap-2 mb-2.5">
              <AlertTriangle className="w-4 h-4 text-white/40" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                Kapsam dışı
              </span>
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>· Araştırma grubu yürütmeyen öğretim elemanları</li>
              <li>· Sosyal bilimler, beşeri bilimler, eğitim fakülteleri</li>
              <li>· Şirketler ve endüstri Ar-Ge ekipleri</li>
            </ul>
          </div>
        </Fade>
      </div>
      <div className="ai-warn mt-5 px-5 py-3.5">
        <p className="text-sm text-white/70 leading-relaxed">
          Başvuruda kurum e-postanız, kurumsal sayfanızdaki araştırma grubu
          bağlantısı ve kısa bir araştırma özeti isteniyor. Program sayfasının
          kendi uyarısı: koltuk sayısı sınırlı ve tahsis garanti değil.
          Kurumsal aidiyet doğrulaması yaklaşık 5–7 iş günü sürüyor —
          uygunsanız beklemeden başvurun.
        </p>
      </div>
      <Source>
        claude.com/programs/team-plan-for-scientists ·
        support.claude.com “Claude Team plan for scientists” · Türkiye için:
        anthropic.com/supported-countries — erişim 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* 09 · .edu gerçeği */
  () => (
    <Slide>
      <Eyebrow>Peki .edu adresim?</Eyebrow>
      <H2>Tek başına hiçbir şey kazandırmıyor.</H2>
      <Sub>
        Bilim insanları için Team planı dışında, resmî fiyat sayfasında bireysel
        akademisyen ya da öğrenci indirimi diye bir kalem yok.
        <code className="text-white/80"> .edu</code>{" "}adresiniz tek başına bir
        şey kazandırmıyor; ancak kurumunuz Claude for Education sözleşmesi
        imzaladıysa okul hesabınızla girip kurumun sağladığı erişimi
        kullanırsınız.
      </Sub>
      <div className="mt-7 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={GraduationCap} title="Kurumsal plan">
            Claude for Education üniversitenin tamamını kapsıyor: öğrenci,
            akademisyen ve idari personel. Bireysel başvuru yok.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={Wallet} title="İlan edilmiş fiyat yok">
            Anlaşma kuruma özel. Resmî sayfalarda koltuk başı bir rakam
            yayımlanmıyor.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Users} title="Partner kurumlar">
            LSE, Northeastern, Syracuse, Dartmouth, Virginia, Pittsburgh,
            Champlain, Northumbria, San Francisco.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed max-w-3xl">
          Resmî sayfada Türkiye'den listelenen bir kurum bulunmuyor. Bu, “Türk
          üniversiteleri başvuramaz” demek değil; sadece ilan edilmiş bir örnek
          olmadığı anlamına geliyor.
        </p>
      </Fade>
      <Source>
        claude.com/pricing · claude.com/solutions/education ·
        support.claude.com “Use Claude for Education at your university”
      </Source>
    </Slide>
  ),

  /* Öğrencilere ücretsiz */
  () => (
    <Slide>
      <Eyebrow>Öğrencilerinize söyleyin</Eyebrow>
      <H2>Google&apos;dan 12 ay ücretsiz yapay zekâ planı.</H2>
      <Sub>
        18 yaş üstü üniversite öğrencilerine 12 ay ücretsiz Google AI planı
        veriliyor. Son başvuru 31 Aralık 2026. Amerika&apos;da AI Pro,
        Amerika dışındaki 140&apos;tan fazla pazarda AI Plus olarak.
      </Sub>
      <Fade delay={0.2}>
        <div className="ai-warn mt-8 px-6 py-5">
          <div className="flex items-start gap-4">
            <AlertTriangle
              className="w-5 h-5 shrink-0 mt-0.5"
              style={{ color: ACCENT }}
            />
            <div className="text-white/70 leading-relaxed space-y-2">
              <p>
                <strong className="text-white">İki uyarı.</strong>{" "}Birincisi:
                kayıt sırasında geçerli bir ödeme yöntemi isteniyor ve süre
                bitince <strong className="text-white">otomatik yenileniyor</strong>.
                Öğrencinize bunu mutlaka söyleyin.
              </p>
              <p>
                İkincisi: Türkiye&apos;nin uygun pazarlar listesinde olup
                olmadığını resmî sayfada doğrulayamadım. “Türk öğrenciler de
                alabiliyor” demeden önce öğrencinizin kendi hesabından kontrol
                etmesini isteyin.
              </p>
            </div>
          </div>
        </div>
      </Fade>
      <Source>
        blog.google — student offer · support.google.com/gemini, 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* 10 · Campus Program */
  () => (
    <Slide>
      <Eyebrow>Öğrencilerinize söyleyin</Eyebrow>
      <H1>
        Campus Program:
        <br />
        <span style={{ color: ACCENT }}>3.600 dolar</span>{" "}destek.
      </H1>
      <Sub>
        Başvuru dünya çapına açık. Üç ayrı kulvar var ve{" "}
        <strong className="text-white">seçilen her öğrenciye 3.600 dolar</strong>{" "}
        nakit destek veriliyor — toplam havuz değil, kişi başı. Danışmanlığını
        yaptığınız öğrenciye söyleyebileceğiniz en somut şey bu.
      </Sub>
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={Users} title="Builder Club · Lisans">
            Kampüste yapay zekâ topluluğu kuran lisans öğrencileri.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={MessageSquare} title="Campus Conversations · Y. Lisans">
            Kampüste tartışma ve etkinlik yürüten yüksek lisans öğrencileri.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={FlaskConical} title="Science Workshops · Doktora">
            Doktora ve doktora sonrası araştırmacılar için atölyeler.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <p className="mt-6 text-sm text-white/45">
          Koşul: 18 yaş üstü ve öğrenim görülen ülkede çalışma izni.
        </p>
      </Fade>
      <Fade delay={0.4}>
        <div className="ai-warn mt-5 px-5 py-3.5">
          <p className="text-sm text-white/70 leading-relaxed">
            <strong className="text-white">Takvim:</strong>{" "}Başvurular 1 Eylül
            2026&apos;da açıldı ve{" "}
            <strong className="text-white">
              12 Eylül 2026, 23:59 (Pasifik saati)
            </strong>{" "}
            kapanıyor. Program Eylül 2026 – Haziran 2027 akademik yılını
            kapsıyor. Bu sunumu okuduğunuz gün pencere açıksa öğrencinize bugün
            söyleyin — gelecek yıla kadar tekrarı yok.
          </p>
        </div>
      </Fade>
      <Source>claude.com/programs/campus — erişim 4 Eylül 2026</Source>
    </Slide>
  ),

  /* 11 · Hangi planı almalı */
  () => (
    <Slide>
      <Eyebrow>Karar</Eyebrow>
      <H2>Hangi planı almalısınız?</H2>
      <div className="mt-7 space-y-3">
        {[
          {
            t: "Ücretsiz kalın",
            d: "Ara sıra özet, çeviri ve fikir alıyorsanız. Beş saatlik pencereye haftada bir iki kez çarpıyorsanız acele etmeyin.",
          },
          {
            t: "Pro'ya geçin",
            d: "Haftada birkaç saat yoğun kullanıyorsanız; literatür taraması, Excel'de veri analizi ya da uzun belge işi yapıyorsanız. Limit uyarısını sık görüyorsanız karar zaten verilmiş demektir.",
          },
          {
            t: "Kurumsal konuşun",
            d: "Bölüm ya da fakülte olarak kullanacaksanız. Kurumsal planlar tüketici veri politikasının dışında — etik kurul ve bilgi işlem için belirleyici fark bu.",
          },
        ].map((s, i) => (
          <Fade key={s.t} delay={0.1 * i}>
            <div className="ai-card px-6 py-4">
              <div className="text-white font-semibold text-lg mb-1">{s.t}</div>
              <div className="text-sm text-white/55 leading-relaxed">{s.d}</div>
            </div>
          </Fade>
        ))}
      </div>
      <Fade delay={0.4}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed">
          Yıllık ödeme aylıktan ucuz: 20 USD/ay yerine 17 USD/ay. Ama önce bir
          ay aylık deneyip gerçekten kullanıp kullanmadığınızı görün.
        </p>
      </Fade>
      <Source>claude.com/pricing — erişim 4 Eylül 2026</Source>
    </Slide>
  ),

  /* Bütçeye göre seçim */
  () => (
    <Slide>
      <Eyebrow>Seçim rehberi</Eyebrow>
      <H2>Bütçenize göre ne alırsınız?</H2>
      <Sub>
        Sıralama önemli: üstteki katman işinizi görüyorsa alttakine geçmeyin.
        Çoğu akademisyen ikinci satırda duruyor.
      </Sub>
      <div className="mt-6 overflow-x-auto">
        <table className="ai-table">
          <thead>
            <tr>
              <th style={{ width: "16%" }}>Aylık</th>
              <th style={{ width: "30%" }}>Ne alırsınız</th>
              <th style={{ width: "54%" }}>Ne zaman değer</th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "0 USD",
                "Whisper · Zotero · NotebookLM · Semantic Scholar",
                "Her koşulda. Deşifre, kaynak yönetimi, kaynağa bağlı özetleme ve literatür dizini — dördü birlikte günlük işin çoğunu karşılıyor. Akademik kadrodaysanız GitHub Copilot da ücretsiz.",
              ],
              [
                "~20 USD",
                "Bir sohbet modeli aboneliği",
                "Haftada birkaç saat yoğun kullanıyorsanız. Uzun belge, veri analizi ve günlük yazı işi burada açılıyor. Çoğu akademisyen için gereken tek harcama bu.",
              ],
              [
                "~20 USD",
                "Scite",
                "Yalnızca atıf niteliği sizin için belirleyiciyse: bir atfın destekleyici mi çelişkili mi olduğunu gösteren tek araç. Genel literatür taraması için gerekmiyor.",
              ],
              [
                "~50 USD",
                "Elicit Pro",
                "Sistematik derleme yapıyorsanız tarama ve veri çıkarımını gerçekten ölçeklendiriyor. Tek bir makale için karşılığı yok.",
              ],
            ].map(([b, a, d]) => (
              <tr key={a}>
                <td className="font-mono whitespace-nowrap" style={{ color: ACCENT }}>
                  {b}
                </td>
                <td>{a}</td>
                <td>{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Source>
        claude.com/pricing · scite.ai/pricing · elicit.com/pricing — 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* Parayı kim öder */
  () => (
    <Slide>
      <Eyebrow>Fiyatı gördünüz — peki ödeme</Eyebrow>
      <H2>Yirmi doları kim, nasıl öder?</H2>
      <Sub>
        Türkiye&apos;den bakan bir akademisyenin ilk takıldığı yer fiyat değil,
        ödemenin kendisi. Dört yol var ve üçü çoğu kişinin haberi olmadan
        kapalı kalıyor.
      </Sub>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <Card icon={Wallet} title="Bireysel kart">
            En hızlı yol. Kartınızda yurt dışı ve internetten alışveriş izni
            kapalıysa ödeme sessizce reddediliyor — bankanızın uygulamasından
            açtıktan sonra tekrar deneyin.
          </Card>
        </Fade>
        <Fade delay={0.14}>
          <Card icon={FileText} title="Kurumsal geri ödeme">
            Fatura isteyecekseniz vergi numaranızı{" "}
            <strong className="text-white/80">ilk ödemeden önce</strong>{" "}girin:
            Ayarlar → Faturalandırma → ödeme yöntemini güncelle. Geçmiş
            faturalar geriye dönük düzeltilemiyor.
          </Card>
        </Fade>
        <Fade delay={0.2}>
          <Card icon={FlaskConical} title="Proje ya da BAP bütçesi">
            Yurt dışı yazılım/hizmet aboneliğinin hangi bütçe kaleminden
            karşılanabileceği üniversiteden üniversiteye değişiyor. BAP
            koordinatörlüğüne bu ifadeyle sorun; cevap “hayır” olsa bile beş
            dakikanızı alır.
          </Card>
        </Fade>
        <Fade delay={0.26}>
          <Card icon={Users} title="Bölüm ya da fakülte">
            Birden çok kişi kullanacaksa tek tek Pro almak yerine Team
            konuşun. Fiyattan bağımsız asıl fark şu: kurumsal planlar tüketici
            veri politikasının dışında.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.34}>
        <p className="mt-5 text-sm text-white/45 leading-relaxed max-w-3xl">
          Fiyatlar vergi hariç gösteriliyor; hangi verginin ekleneceğini
          fatura adresiniz belirliyor. Ödeme sayfasındaki son tutara bakın,
          ilan edilen rakama değil.
        </p>
      </Fade>
      <Source>
        support.claude.com — “Add or update your paid Claude account&apos;s tax
        or VAT ID” ve “Understanding your billing address and tax calculation”,
        4 Eylül 2026. Bütçe kalemi bilgisi kurumdan kuruma değişir; tek
        bağlayıcı cevap kendi BAP biriminizden gelir.
      </Source>
    </Slide>
  ),

  /* İlk 10 dakika */
  () => (
    <Slide>
      <Eyebrow>Hiç kullanmadıysanız</Eyebrow>
      <H2>İlk on dakika.</H2>
      <Sub>
        Hesap açmadan önce ne yapacağınızı bilin. Aşağıdaki dört adım,
        aracın işinize yarayıp yaramayacağını on dakikada gösterir.
      </Sub>
      <div className="mt-6">
        <Steps
          items={[
            {
              t: "Ücretsiz hesap açın · 1 dakika",
              d: "claude.ai — e-posta yeterli. Kart istemiyor. Ayarlar → Gizlilik’ten model eğitimi tercihinizi hemen belirleyin.",
            },
            {
              t: "Kendi metninizi verin · 3 dakika",
              d: "Yazdığınız bir paragrafı yapıştırıp “bunu hakem gözüyle eleştir, düzeltme yazma” deyin. Aracın alanınızı ne kadar anladığını burada görürsünüz.",
            },
            {
              t: "Bir PDF yükleyin · 3 dakika",
              d: "Okumaya vaktiniz olmayan bir makaleyi yükleyip “ana bulgu ne, yöntemin zayıf yanı ne” diye sorun. Sonra makaleye bakıp doğruluğunu kontrol edin.",
            },
            {
              t: "Bilerek zorlayın · 3 dakika",
              d: "Alanınızda cevabını kesin bildiğiniz zor bir soru sorun. Yanıldığı yeri görmek, ona ne kadar güveneceğinizi belirler — bu adımı atlamayın.",
            },
          ]}
        />
      </div>
      <Fade delay={0.4}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed max-w-3xl">
          Dördüncü adım en önemlisi. Aracın nerede yanıldığını kendi alanınızda
          bir kez gören akademisyen, ona bir daha körü körüne güvenmiyor —
          ve asıl doğru kullanım bu.
        </p>
      </Fade>
    </Slide>
  ),

  /* Zaman kazancı */
  () => (
    <Slide>
      <Eyebrow>Somut karşılık</Eyebrow>
      <H2>Hangi iş ne kadar kısalıyor?</H2>
      <Sub>
        Aşağıdaki süreler kesin ölçüm değil, kendi kullanımımdan çıkan kaba
        tahminler — sizinki farklı olabilir. Amaç bir şey göstermek: kazanç,
        “her işi yaptırmak”ta değil, doğru işi seçmekte.
      </Sub>
      <div className="mt-6 flex items-center gap-2.5">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.16em] px-2 py-1 rounded"
          style={{
            color: ACCENT,
            background: "color-mix(in srgb, var(--deck-accent) 14%, transparent)",
          }}
        >
          Kaynak: yazarın kendi kullanımı
        </span>
        <span className="text-[12px] text-white/35">Ölçüm değil, tahmin</span>
      </div>
      <div className="mt-3 overflow-x-auto">
        <table className="ai-table table-fixed">
          <thead>
            <tr>
              <th className="w-[38%]">İş</th>
              <th className="w-[20%]">Önce</th>
              <th className="w-[20%]">Sonra</th>
              <th className="w-[22%]">Ne değişiyor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Görüşme deşifresi (60 dk kayıt)</td>
              <td>4–6 saat</td>
              <td>15 dakika</td>
              <td>Düzeltme size kalıyor</td>
            </tr>
            <tr>
              <td>Haftalık quiz hazırlama</td>
              <td>60–90 dakika</td>
              <td>15–20 dakika</td>
              <td>Soru seçimi sizde</td>
            </tr>
            <tr>
              <td>Hakem raporuna cevap taslağı</td>
              <td>3–4 saat</td>
              <td>1 saat</td>
              <td>Kararlar yine sizin</td>
            </tr>
            <tr>
              <td>İngilizce dil düzeltmesi</td>
              <td>2–3 saat</td>
              <td>30 dakika</td>
              <td>Anlam denetimi şart</td>
            </tr>
            <tr>
              <td>Literatüre hızlı giriş</td>
              <td>1–2 gün</td>
              <td>2–3 saat</td>
              <td>Her kaynak doğrulanmalı</td>
            </tr>
            <tr>
              <td>Makalenin kendisini yazmak</td>
              <td>haftalar</td>
              <td>haftalar</td>
              <td>Kısalmıyor — kısalmamalı</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Fade delay={0.35}>
        <p className="mt-6 text-white/50 leading-relaxed max-w-3xl">
          Son satır bilerek orada. Yapay zekâ düşünme süresini kısaltmıyor;
          düşünmeye ayıracağınız zamanı açıyor. İkisini karıştıran akademisyen
          hem zaman kazanmıyor hem de yazdığına sahip çıkamıyor.
        </p>
      </Fade>
    </Slide>
  ),

  /* Bölüm 2 · Nasıl sorulur */
  () => (
    <Divider
      num="2"
      title="Nasıl sorulur"
      subtitle="Aynı araç, iki farklı istem, iki farklı sonuç. Fark tekniğin kendisinde."
      icerik={[
        "İyi ve kötü istem",
        "Model seçimi",
        "İstem anatomisi",
        "İleri teknikler",
        "Uzun belgeler",
        "Hazır kalıplar",
        "Türkçe performansı",
      ]}
    />
  ),

  /* 13 · Kötü istem / iyi istem */
  () => (
    <Slide>
      <Eyebrow>En büyük fark burada</Eyebrow>
      <H2>Aynı soru, iki farklı sorulma biçimi.</H2>
      <Sub>
        “İşe yaramıyor” diyenlerin çoğu aslında bağlam vermiyor. Modelin sizin
        dersinizi, öğrencinizi ve amacınızı bilmesi mümkün değil — söylemezseniz
        ortalama bir cevap alırsınız.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <X className="w-4 h-4 text-white/35" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
                Ortalama cevap getirir
              </span>
            </div>
            <Prompt>Veri yapıları konusunda quiz hazırla.</Prompt>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Check className="w-4 h-4" style={{ color: ACCENT }} />
              <span
                className="font-mono text-[11px] uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                Kullanılabilir cevap getirir
              </span>
            </div>
            <Prompt>{`Önlisans 1. sınıf Programlama Temelleri dersi için
10 soruluk quiz hazırla.

Konu: listeler ve döngüler (yalnızca bu ikisi).
Öğrenciler 6 haftadır Python görüyor, fonksiyon
konusunu henüz görmediler — fonksiyon kullanma.

Format: 6 çoktan seçmeli, 4 kısa kod okuma.
Her sorunun altına doğru cevabı ve bir cümlelik
gerekçesini yaz.
Zorluk: 7 kolay, 3 ayırt edici.`}</Prompt>
          </div>
        </Fade>
      </div>
      <Fade delay={0.26}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed max-w-3xl">
          Uzun istem yazmak zahmetli görünüyor ama bir kez yazıp saklarsınız.
          İkinci hafta aynı kalıba konuyu değiştirip yapıştırmanız yeterli.
        </p>
      </Fade>
    </Slide>
  ),

  /* Hangi model, ne zaman */
  () => (
    <Slide>
      <Eyebrow>Teknik · model seçimi</Eyebrow>
      <H2>Hangi modeli ne zaman seçmeli?</H2>
      <Sub>
        Sohbet kutusunun üstündeki model seçici çoğu kişide hiç
        dokunulmadan duruyor. Oysa aynı isteme farklı modeller belirgin
        biçimde farklı cevaplar veriyor.
      </Sub>
      <div className="mt-6 overflow-x-auto">
        <table className="ai-table">
          <thead>
            <tr>
              <th style={{ width: "14%" }}>Model</th>
              <th style={{ width: "42%" }}>Akademik karşılığı</th>
              <th style={{ width: "44%" }}>Resmî tanımı</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Haiku", "Kısa ve çok sayıda işlem: kaynakça satırlarını düzene sokmak, kırk sınav sorusunu biçimlendirmek, hızlı çeviri.", "“En hızlı, en düşük maliyetli model.” Ücretsiz plan dâhil her planda."],
              ["Sonnet", "Günlük işin çoğu: özet, dil düzeltme, ders planı, e-posta, veri tablosu üzerinde konuşma.", "Tüm ücretli planlarda sunuluyor."],
              ["Opus", "Uzun akıl yürütme ve eleştiri: hakem gözüyle metin eleştirisi, yöntem tasarımını sınama, uzun tez bölümü.", "“Karmaşık ajan tabanlı kodlama ve kurumsal iş için ideal.” Pro ve üstü."],
              ["Fable", "Kendi başına ilerleyen, çok adımlı ve uzun süren işler.", "“Uzun süre çalışan ajanlar için yeni nesil zekâ.” Pro, Team ve Enterprise."],
            ].map(([m, akademik, resmi]) => (
              <tr key={m}>
                <td className="font-mono whitespace-nowrap" style={{ color: ACCENT }}>
                  {m}
                </td>
                <td>{akademik}</td>
                <td className="text-white/40">{resmi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="ai-warn mt-5 px-5 py-3">
        <p className="text-sm text-white/70 leading-relaxed">
          <strong className="text-white">Pratik kural:</strong>{" "}Sonnet&apos;te
          kalın. Cevap yüzeysel geldiyse{" "}
          <strong className="text-white">istemi hiç değiştirmeden</strong>{" "}aynı
          şeyi Opus&apos;a sorun. Eksikliğin modelden mi istemden mi geldiğini
          ancak böyle ayırt edersiniz — ikisini aynı anda değiştirirseniz
          hiçbir şey öğrenmiş olmuyorsunuz.
        </p>
      </div>
      <Source>claude.com/pricing — model tanımları, erişim 4 Eylül 2026</Source>
    </Slide>
  ),

  /* 14 · Bağlam vermenin yolları */
  () => (
    <Slide>
      <Eyebrow>Bağlam</Eyebrow>
      <H2>Modelin bilmediği dört şeyi söyleyin.</H2>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.06}>
          <Card icon={Users} title="Kim için">
            Önlisans mı doktora mı, hangi bölüm, hangi ön bilgiye sahip.
            “Öğrenciler türev görmedi” cümlesi çıktıyı kökten değiştirir.
          </Card>
        </Fade>
        <Fade delay={0.12}>
          <Card icon={Target} title="Ne amaçla">
            Sınav sorusu mu, ders içi tartışma mı, ödev yönergesi mi? Aynı
            konu, üç farklı metin demektir.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={ClipboardList} title="Hangi biçimde">
            Kaç madde, kaç kelime, tablo mu düz metin mi, kaynakça istiyor
            musunuz. Söylemezseniz kendi kararını verir.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Ban} title="Neyi yapmasın">
            “Fonksiyon kullanma”, “İngilizce terim kullanma”, “örnekleri
            Türkiye'den seç”. Yasaklar en az istekler kadar iş görür.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <div className="ai-warn mt-6 px-5 py-3.5">
          <p className="text-sm text-white/70 leading-relaxed">
            Belge yükleyebiliyorsanız anlatmak yerine gösterin. İzlencenizi
            yüklemek, izlenceyi tarif etmekten hem hızlı hem doğru.
          </p>
        </div>
      </Fade>
    </Slide>
  ),

  /* İstem anatomisi */
  () => (
    <Slide>
      <Eyebrow>Teknik · anatomi</Eyebrow>
      <H2>İyi bir istemin altı parçası.</H2>
      <Sub>
        Hepsini her seferinde yazmanız gerekmiyor. Ama sonuç beklediğiniz gibi
        çıkmadıysa, eksik olan büyük ihtimalle bu altısından biridir.
      </Sub>
      <div className="mt-7 space-y-2.5">
        {[
          ["Rol", "“Bu alanda 20 yıllık bir hakem gibi davran.”", "Aynı soruya hakem, öğrenci ve editör üç farklı cevap verir; hangisini istediğinizi siz seçin."],
          ["Bağlam", "“Önlisans 1. sınıf, 6 haftadır Python görüyorlar.”", "Modelin bilmediği tek şey sizin durumunuz."],
          ["Görev", "“10 soruluk quiz hazırla.”", "Tek bir eylem olmalı; iki iş varsa iki istem yazın."],
          ["Biçim", "“6 çoktan seçmeli, 4 kod okuma. Cevap anahtarı altta.”", "Belirtmezseniz uzunluğu ve düzeni kendi seçer; iki denemede iki farklı biçim gelir."],
          ["Kısıt", "“Fonksiyon kullanma, İngilizce terim kullanma.”", "Bir şeyi istememek, istemek kadar bilgi taşır — çıktının yarısını bu satır eler."],
          ["Örnek", "İstediğiniz çıktıdan bir tane yapıştırın.", "Tek bir örnek, üç paragraflık biçim tarifinden daha net anlaşılıyor."],
        ].map(([k, ornek, neden], i) => (
          <Fade key={k} delay={0.06 * i}>
            <div className="ai-card px-5 py-3.5 grid md:grid-cols-[5.5rem_1fr_1fr] gap-4 items-start">
              <span
                className="font-mono text-[11px] uppercase tracking-[0.16em] pt-0.5"
                style={{ color: ACCENT }}
              >
                {k}
              </span>
              <span className="text-sm text-white/70 leading-relaxed">{ornek}</span>
              <span className="text-sm text-white/40 leading-relaxed">{neden}</span>
            </div>
          </Fade>
        ))}
      </div>
    </Slide>
  ),

  /* İleri teknikler */
  () => (
    <Slide>
      <Eyebrow>Teknik · ileri</Eyebrow>
      <H2>Sonucu değiştiren altı teknik.</H2>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <Fade delay={0.06}>
          <Card icon={Layers} title="Örnekle öğretme">
            İki üç örnek verip “aynı biçimde devam et” demek, kuralı tarif
            etmekten daha güvenilir. Özellikle biçimsel işlerde.
          </Card>
        </Fade>
        <Fade delay={0.12}>
          <Card icon={Compass} title="Adım adım düşündürme">
            “Önce planını yaz, sonra uygula.” Uzun ve çok adımlı işlerde hata
            oranını belirgin biçimde düşürüyor.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={ShieldCheck} title="Kendini denetletme">
            “Yazdığını hakem gözüyle eleştir, sonra düzelt.” Tek istemde iki
            aşama yaptırmak kaliteyi yükseltiyor.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Ban} title="Olumsuz kısıt">
            “Kaynak uydurma, emin değilsen bilmiyorum de.” Halüsinasyonu
            tamamen bitirmez ama azaltır.
          </Card>
        </Fade>
        <Fade delay={0.3}>
          <Card icon={ClipboardList} title="Çıktı iskeleti dayatma">
            İstediğiniz tabloyu ya da başlık yapısını boş hâliyle verip
            “doldur” demek, biçim tartışmasını bitirir.
          </Card>
        </Fade>
        <Fade delay={0.36}>
          <Card icon={PenLine} title="Turlayarak daraltma">
            İlk cevabı beğenmediyseniz baştan yazmayın: “şu kısmı daha somut
            yaz, şu örneği çıkar” deyin. Bağlam korunur.
          </Card>
        </Fade>
      </div>
    </Slide>
  ),

  /* Sunum üretme istemi */
  () => (
    <Slide>
      <Eyebrow>Teknik · sunum üretme</Eyebrow>
      <H2>Sunum hazırlatmanın istemi.</H2>
      <Sub>
        “Bana sunum hazırla” demek işe yaramıyor; ortalama bir slayt yığını
        çıkıyor. İşe yarayan istem, sunumun kısıtlarını baştan söylüyor.
      </Sub>
      <div className="mt-6">
        <Prompt>{`[KONU] üzerine [SÜRE] dakikalık bir sunum hazırlıyorum.
Dinleyici: [KİTLE — ör. alan dışı akademisyenler].
Amacım: [dinleyici çıkarken şunu bilsin / şunu yapsın].

Önce sadece bölüm başlıklarını ve her bölüme kaç
dakika ayrılacağını çıkar. Slayt yazma — önce akışı
onaylayacağım.`}</Prompt>
      </div>
      <Fade delay={0.2}>
        <p className="mt-5 text-sm text-white/50 leading-relaxed">
          Akışı onayladıktan sonra ikinci istem:
        </p>
      </Fade>
      <Fade delay={0.28}>
        <div className="mt-3">
          <Prompt>{`Şimdi [BÖLÜM ADI] için slaytları yaz. Her slaytta:
başlık (en fazla 8 kelime), en fazla 3 madde
(her biri tek satır) ve altına benim okuyacağım
2-3 cümlelik konuşma notu.

Slayta paragraf yazma. Dinleyici slaydı okurken
beni dinleyemez.`}</Prompt>
        </div>
      </Fade>
      <Fade delay={0.36}>
        <p className="mt-5 text-sm text-white/45 leading-relaxed max-w-3xl">
          İki istemden önce bir adım daha var: makalenizi, veri tablonuzu ve
          varsa bildiri şablonunu bir projeye yükleyin — model sizin
          sayılarınızla çalışsın. Son kısıt da önemli: model, istemezseniz
          slaytları paragrafla doldurmaya meyilli. “Slayta paragraf yazma”
          cümlesi sunumun okunabilirliğini tek başına kurtarıyor.
        </p>
      </Fade>
    </Slide>
  ),

  /* Uzun belgeyle çalışma */
  () => (
    <Slide>
      <Eyebrow>Teknik · uzun belgeler</Eyebrow>
      <H2>Tez, rapor ve kitap boyutunda metinler.</H2>
      <Sub>
        Uzun belgelerde en sık yapılan hata, tamamını yükleyip genel bir soru
        sormak. Sonuç yüzeysel çıkıyor. Dört adımda çözülüyor.
      </Sub>
      <div className="mt-6">
        <Steps
          items={[
            {
              t: "Önce haritasını çıkarttırın",
              d: "“Bu belgenin bölüm başlıklarını ve her bölümün ne yaptığını tek cümleyle yaz.” Neyin nerede olduğunu görürsünüz.",
            },
            {
              t: "Sonra tek bölüme odaklanın",
              d: "“Yalnızca 3. bölüme bak” deyin. Kapsamı daraltmak derinliği artırıyor.",
            },
            {
              t: "Alıntı isteyin",
              d: "“Her iddian için belgeden birebir alıntı ver.” Uydurmayı böyle yakalarsınız; alıntı bulamıyorsa iddia da yoktur.",
            },
            {
              t: "Görsel gerekiyorsa bölün",
              d: "Şekilleri incelemesi gerekiyorsa 100 sayfanın altına inin — üstünde yalnızca metin okunuyor.",
            },
            {
              t: "Konu değişince yeni sohbet açın",
              d: "Şişmiş bir sohbet eski talimatları taşımaya devam eder: giriş bölümü için verdiğiniz üslup kuralı, yöntem bölümünü de biçimlendirir. Yeni bölüme geçerken yeni sohbet açıp belgeyi tekrar yükleyin — kalite geri geliyor.",
            },
          ]}
        />
      </div>
      <Fade delay={0.35}>
        <p className="mt-5 text-sm text-white/45 leading-relaxed max-w-3xl">
          Belirti şu: cevaplar giderek genelleşiyor, sorduğunuz şeye değil bir
          önceki soruya benzer çıkıyor. Bu, modelin “unutması” değil — tam
          tersi, fazla şey hatırlıyor.
        </p>
      </Fade>
    </Slide>
  ),

  /* İstem hataları */
  () => (
    <Slide>
      <Eyebrow>Teknik · sık yapılan hatalar</Eyebrow>
      <H2>İstemi bozan beş alışkanlık.</H2>
      <div className="mt-6">
        <Versus
          left={{
            label: "Bozan",
            items: [
              "Tek istemde üç ayrı iş istemek",
              "“İyi bir metin yaz” gibi ölçülemeyen istek",
              "Bağlamı vermeden “bunu düzelt” demek",
              "Beğenmeyince baştan, sıfır bağlamla yazmak",
              "Kaynak isteyip doğrulamamak",
            ],
          }}
          right={{
            label: "Düzelten",
            items: [
              "Her istemde tek iş; sırayla ilerlemek",
              "“En fazla 150 kelime, üç madde” gibi ölçülebilir kısıt",
              "Belgeyi yükleyip “bu bağlamda” demek",
              "Aynı sohbette “şurayı değiştir” diye daraltmak",
              "Her DOI'yi açıp kontrol etmek",
            ],
          }}
        />
      </div>
      <Fade delay={0.28}>
        <div className="ai-warn mt-6 px-5 py-3.5">
          <p className="text-sm text-white/70 leading-relaxed">
            Pratik ölçü: istediğiniz şeyi bir asistana anlatsanız o kişi ne
            sorardı? O soruların cevabını baştan yazarsanız istem hazırdır.
          </p>
        </div>
      </Fade>
    </Slide>
  ),

  /* 15b · Kopyalanabilir istem kütüphanesi */
  () => (
    <Slide>
      <Eyebrow>Kütüphane · 1</Eyebrow>
      <H2>Hazır istemler — ders için.</H2>
      <Sub>
        Köşeli parantezleri kendi dersinizle değiştirip kullanın. Bir kez
        kaydedin, her hafta aynı kalıba yeni konuyu yazın.
      </Sub>
      <div className="mt-6 space-y-4">
        <Fade delay={0.08}>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2">
              Anlaşılmayan konuyu yeniden anlatmak
            </div>
            <Prompt>{`[KONU] konusunu [SEVİYE] öğrencilere anlatıyorum ve
sınıfın yarısı anlamadı. Aynı konuyu tamamen farklı
bir benzetmeyle, günlük hayattan bir örnek üzerinden
yeniden anlat. Teknik terim kullanma; terimi ancak
kavram oturduktan sonra tanıt.`}</Prompt>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2">
              Yanlış anlamaları önceden görmek
            </div>
            <Prompt>{`[KONU] konusunda öğrencilerin en sık düştüğü beş
kavram yanılgısını yaz. Her biri için: yanlış düşünce
nedir, neden mantıklı geliyor, hangi örnekle
kırılır?`}</Prompt>
          </div>
        </Fade>
        <Fade delay={0.24}>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2">
              Ödev yönergesi ve değerlendirme ölçütü
            </div>
            <Prompt>{`[ÖDEV KONUSU] için yönerge ve dereceli puanlama
anahtarı (rubrik) yaz. Rubrik dört ölçüt içersin,
her ölçüt için 4/3/2/1 düzeyinin ne anlama geldiği
tek cümleyle açıklansın. Öğrencinin okuyup ne
beklendiğini anlayacağı sadelikte olsun.`}</Prompt>
          </div>
        </Fade>
      </div>
    </Slide>
  ),

  /* 15c · Kopyalanabilir istem kütüphanesi 2 */
  () => (
    <Slide>
      <Eyebrow>Kütüphane · 2</Eyebrow>
      <H2>Hazır istemler — araştırma için.</H2>
      <div className="mt-6 space-y-4">
        <Fade delay={0.08}>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2">
              Kendi metninizi eleştirtmek
            </div>
            <Prompt>{`Bu bölümü [HEDEF DERGİ] hakemi gözüyle oku.
Üç başlıkta yaz: (1) hangi iddiam kanıtsız kalmış,
(2) hangi cümle veriden fazlasını söylüyor,
(3) hangi bölüm gereksiz uzun. Düzeltme önerme,
yalnızca sorunları listele.`}</Prompt>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2">
              Yöntemi sınamak
            </div>
            <Prompt>{`Çalışmamda [YÖNTEM] kullanıyorum, örneklem
[N] kişi, değişkenler [X, Y]. Bu tasarımın
gözden kaçırdığım zayıf noktaları neler?
Hangi alternatif açıklamalar sonucumu
geçersiz kılabilir?`}</Prompt>
          </div>
        </Fade>
        <Fade delay={0.24}>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2">
              Sunum ve savunma provası
            </div>
            <Prompt>{`Bu çalışmayı [SÜRE] dakikada anlatacağım.
Dinleyici [KİTLE]. Bana bu sunumdan sonra
sorulabilecek en zor beş soruyu yaz ve her biri
için hangi veriye dayanarak cevap vermem
gerektiğini söyle.`}</Prompt>
          </div>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed max-w-3xl">
          Dikkat edin: bu istemlerin hiçbiri “benim yerime yaz” demiyor.
          Hepsi <strong className="text-white/70">eleştirmesini</strong>{" "}
          istiyor. En çok değer getiren kullanım biçimi bu.
        </p>
      </Fade>
    </Slide>
  ),

  /* Türkçe performansı */
  () => (
    <Slide>
      <Eyebrow>Türkçe</Eyebrow>
      <H2>Türkçede ne kadar iyi?</H2>
      <Sub>
        Dürüst cevap: kesin bilmiyoruz. Ne Anthropic&apos;in ne de
        OpenAI&apos;ın resmî çok dillilik karşılaştırma tablosunda Türkçe yer
        alıyor — o tablolarda on dört dil var ve Türkçe onlardan biri değil.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <div
              className="font-mono text-[11px] uppercase tracking-[0.18em] mb-2.5"
              style={{ color: ACCENT }}
            >
              Elimizdeki tek ölçüm
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              TR-MMLU: 6.200 çoktan seçmeli soru, 62 bölüm, 39 model. 2025
              tarihli bağımsız bir çalışma. Ölçtüğü model sürümleri bugünkü
              nesilden eski — sonuçları güncel sıralama olarak okumayın.
            </p>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2.5">
              Türkçeye özgü zorluk
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Çalışmanın tespiti: eklemeli yapı ve karmaşık morfoloji yüzünden
              Türkçe metin daha fazla parçaya bölünüyor. Bu hem maliyeti hem
              hata payını artırıyor.
            </p>
          </div>
        </Fade>
      </div>
      <Fade delay={0.26}>
        <p className="mt-6 text-white/50 leading-relaxed max-w-3xl">
          Pratik sonuç: Türkçe çıktıyı her zaman okuyun. Genel yazışmada
          iyi çalışıyor; alan terminolojisinde, eski dilli metinlerde ve
          hukuk dilinde belirgin biçimde zayıflıyor. Çeviri kokan cümleleri
          kendiniz düzeltmeden bırakmayın.
        </p>
      </Fade>
      <Source>
        Bayram M. A. ve diğerleri (2025). TR-MMLU. arXiv:2508.13044 · SIU 2025 ·
        claude.com ve openai.com çok dillilik dokümantasyonu — erişim 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* Bölüm 3 · Akademik iş */
  () => (
    <Divider
      num="3"
      title="Akademik iş"
      subtitle="Literatürden hakem yanıtına, izlenceden veri analizine: adım adım akışlar."
      icerik={[
        "Süreç haritası",
        "Projeler ve dosya limitleri",
        "Yedi iş akışı",
        "Gerçek sınırlar",
      ]}
    />
  ),

  /* 17b · Araştırma sürecinde nereye giriyor */
  () => (
    <Slide>
      <Eyebrow>Genel bakış</Eyebrow>
      <H2>Araştırma sürecinin neresine giriyor?</H2>
      <Sub>
        Her adımda yapay zekânın yaptığı iş ile sizin yapmanız gereken iş
        farklı. Karışırsa ya değer kaybediyorsunuz ya da sorumluluk.
      </Sub>
      <div className="mt-8">
        <FlowSteps
          steps={[
            {
              label: "Soru belirleme",
              ai: "Alandaki tartışmaları haritalar, benzer soruları gösterir.",
              you: "Hangi sorunun sorulmaya değer olduğuna karar verirsiniz.",
            },
            {
              label: "Literatür",
              ai: "Kaynak bulur, özetler, karşılaştırma tablosu çıkarır.",
              you: "Her kaynağı açıp doğrular, boşluğu siz tespit edersiniz.",
            },
            {
              label: "Yöntem",
              ai: "Zayıf noktaları ve alternatif açıklamaları sorar.",
              you: "Tasarımı kurar, etik kurul sorumluluğunu taşırsınız.",
            },
            {
              label: "Analiz",
              ai: "Kod yazar, dönüştürür, grafik üretir.",
              you: "Sayının doğruluğunu ve yorumunu siz üstlenirsiniz.",
            },
            {
              label: "Yazım",
              ai: "Taslak iskeleti, dil düzeltmesi, biçim uyarlama.",
              you: "İddiayı, katkıyı ve sınırlılıkları siz yazarsınız.",
            },
            {
              label: "Gönderim",
              ai: "Derginin biçim kurallarına uydurur, özet önerir.",
              you: "Beyanı yazar, kaynakçayı doğrular, imzayı atarsınız.",
            },
          ]}
        />
      </div>
    </Slide>
  ),

  /* 18 · Projects */
  () => (
    <Slide>
      <Eyebrow>Projects</Eyebrow>
      <H2>Her ders ve her makale için ayrı bir oda.</H2>
      <Sub>
        Proje, kendi belge havuzu ve kendi sohbet geçmişi olan bağımsız bir
        çalışma alanı. Belgeleri bir kez yüklersiniz; o projedeki her konuşma
        bu bağlamı bilir. Her sohbette baştan anlatmak zorunda kalmazsınız.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <h3 className="text-white font-semibold mb-2.5">
              Ders projesine ne koyarsınız
            </h3>
            <ul className="space-y-1.5 text-sm text-white/55 leading-relaxed">
              <li>· İzlence ve haftalık plan</li>
              <li>· Ders kitabının ilgili bölümleri</li>
              <li>· Geçen yılki sınav soruları</li>
              <li>· Öğrenci seviyesine dair kendi notunuz</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <h3 className="text-white font-semibold mb-2.5">
              Makale projesine ne koyarsınız
            </h3>
            <ul className="space-y-1.5 text-sm text-white/55 leading-relaxed">
              <li>· Okuduğunuz temel kaynaklar</li>
              <li>· Kendi taslağınız ve notlarınız</li>
              <li>· Hedef derginin yazım kılavuzu</li>
              <li>· Varsa hakem raporları</li>
            </ul>
          </div>
        </Fade>
      </div>
      <Source>
        support.claude.com “What are Projects” — ücretsizde 5 proje, ücretli
        planlarda sınırsız ve genişletilmiş bilgi tabanı
      </Source>
    </Slide>
  ),

  /* 19 · Dosya limitleri */
  () => (
    <Slide>
      <Eyebrow>Dosya analizi</Eyebrow>
      <H2>Gerçek sınırlar — tahmin değil.</H2>
      <Sub>
        “PDF yükleyebiliyor” demek yetmiyor. Sınırı bilmezseniz işin ortasında
        tıkanırsınız. Resmî limitler şöyle.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-3">
              Sohbete yüklerken
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>· Dosya başına <strong className="text-white">500 MB</strong></li>
              <li>· Sohbet başına <strong className="text-white">20 dosya</strong></li>
              <li>· PDF üst sınırı <strong className="text-white">1000 sayfa</strong></li>
              <li>
                · Grafik ve görseller yalnızca{" "}
                <strong className="text-white">100 sayfaya kadar</strong>{" "}
                analiz edilir; üstünde sadece metin çıkarılır
              </li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-3">
              Projeye yüklerken
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>· Dosya başına <strong className="text-white">30 MB</strong></li>
              <li>· Dosya sayısı bağlam penceresiyle sınırlı</li>
              <li>· PDF'lerden yalnızca metin çıkarılır</li>
            </ul>
          </div>
        </Fade>
      </div>
      <Fade delay={0.24}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed max-w-3xl">
          Pratik sonuç: 300 sayfalık bir tezin şekillerini incelemesini
          istiyorsanız ilgili bölümü ayırıp ayrı yüklemeniz gerekir. Tamamını
          atarsanız şekilleri değil yalnızca metni görür.
        </p>
      </Fade>
      <Source>
        support.claude.com “Upload files to Claude” — erişim 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* 20 · Literatür taraması */
  () => (
    <Slide>
      <Eyebrow>İş akışı · literatür</Eyebrow>
      <H2>Alana hızlı giriş.</H2>
      <Sub>
        Research özelliği birbirini besleyen çok sayıda arama yapıp atıflı bir
        rapor üretiyor. Ücretli planlarda var ve çok kaynak çektiği için
        kullanım limitini normal sohbetten hızlı tüketiyor.
      </Sub>
      <div className="mt-6">
        <Steps
          items={[
            {
              t: "Soruyu daraltın",
              d: "“Makine öğrenmesi” değil; “2020 sonrası, Türkçe metinlerde duygu analizi, transformer tabanlı yaklaşımlar”.",
            },
            {
              t: "Haritayı çıkarttırın",
              d: "Hangi ekoller var, kim kime cevap veriyor, hangi tartışma açık kalmış.",
            },
            {
              t: "Her kaynağı açın",
              d: "Rapordaki atıfları tek tek doğrulayın. Bu adımı atlarsanız bütün iş çöker.",
            },
            {
              t: "Boşluğu kendiniz bulun",
              d: "“Literatürde ne eksik” sorusunun cevabı sizden gelmeli. Model kalıp görür, siz alanı bilirsiniz.",
            },
          ]}
        />
      </div>
      <div className="ai-warn mt-5 px-5 py-3">
        <p className="text-sm text-white/70 leading-relaxed">
          Sistematik derleme yerine geçmez. PRISMA akışını, dahil etme
          ölçütlerini ve tarama günlüğünü siz kurarsınız.
        </p>
      </div>
      <Source>
        support.claude.com “Use Research on Claude” — Pro, Max, Team,
        Enterprise
      </Source>
    </Slide>
  ),

  /* 21 · Makale yazımı */
  () => (
    <Slide>
      <Eyebrow>İş akışı · makale</Eyebrow>
      <H2>Nerede yardım eder, nerede etmez.</H2>
      <div className="mt-7">
        <Versus
          left={{
            label: "Devretmeyin",
            items: [
              "Bulguların yorumu — alanı siz biliyorsunuz",
              "Katkı iddiası — “bu çalışma neden önemli”",
              "Sınırlılıklar bölümü — dürüstlük gerektirir",
              "Kaynakça — uydurma atıf riski burada",
            ],
          }}
          right={{
            label: "Rahatça devredin",
            items: [
              "Dağınık notlardan ilk taslak iskeleti",
              "Aynı şeyi tekrar eden paragrafları bulma",
              "Derginin biçim kurallarına uydurma",
              "Özet ve anahtar kelime önerisi",
              "Dil düzeltmesi ve akıcılık",
            ],
          }}
        />
      </div>
      <Fade delay={0.26}>
        <div className="mt-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2.5">
            Hakemin bir sonraki hamlesini görmek
          </div>
          <Prompt>{`Bu bölümde hangi cümleler için hakem
“kanıt yok” diyecek? Her biri için, hakemin
büyük ihtimalle hangi ek analizi ya da hangi
ek kaynağı isteyeceğini de yaz.

Metni düzeltme. Cümle — beklenen itiraz —
istenecek ek çalışma biçiminde tablo yap.`}</Prompt>
        </div>
      </Fade>
    </Slide>
  ),

  /* 22 · Hakem yanıtı */
  () => (
    <Slide>
      <Eyebrow>İş akışı · hakem yanıtı</Eyebrow>
      <H2>Herkesin en çok ertelediği iş.</H2>
      <Sub>
        Hakem raporuna cevap yazmak duygusal olarak zor ve biçimsel olarak
        yorucu. Burada gerçekten hızlandırıcı — ama önemli bir sınırla.
      </Sub>
      <div className="mt-6">
        <Steps
          items={[
            {
              t: "Eleştirileri maddeleyin",
              d: "Raporu yapıştırıp “her eleştiriyi ayrı madde olarak çıkar, tekrar edenleri birleştir” deyin.",
            },
            {
              t: "Her maddeye ne yapacağınıza siz karar verin",
              d: "Kabul mü, kısmen kabul mü, gerekçeli ret mi. Bu karar sizin; model sizin yerinize veremez.",
            },
            {
              t: "Cevap taslağını yazdırın",
              d: "“Kararım şu” diyerek verin. Kibar, savunmacı olmayan, madde madde bir taslak çıkarsın.",
            },
            {
              t: "Tonunu siz ayarlayın",
              d: "Editöre giden metin sizin sesinizle olmalı. Fazla resmî ya da fazla özür dileyen tonu düzeltin.",
            },
          ]}
        />
      </div>
      <div className="ai-warn mt-5 px-5 py-3">
        <p className="text-sm text-white/70 leading-relaxed">
          <strong className="text-white">Dikkat:</strong>{" "}Bu, kendi makalenize
          gelen rapor için geçerli. Kendiniz hakemlik yapıyorsanız
          değerlendirdiğiniz makaleyi yükleyemezsiniz. Ayrıntısı “Sınırlar”
          bölümünde; TÜBİTAK&apos;ın aynı yasağı “Türkiye&apos;de durum”
          bölümünde.
        </p>
      </div>
    </Slide>
  ),

  /* 24 · İzlence */
  () => (
    <Slide>
      <Eyebrow>İş akışı · ders</Eyebrow>
      <H2>İzlenceden haftalık plana.</H2>
      <Sub>
        Yeni bir ders açarken en çok vakit alan kısım, öğrenme çıktılarıyla
        haftalık konuları tutarlı biçimde eşlemek. Burada gerçekten hızlanır.
      </Sub>
      <div className="mt-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2.5">
          Kopyalanabilir istem
        </div>
        <Prompt>{`Önlisans 2. sınıf "Veri Görselleştirme" dersi için
14 haftalık plan hazırla.

Ders 3 saat/hafta, laboratuvarlı. Öğrenciler
Python biliyor, istatistik görmediler.

Her hafta için: konu başlığı, o haftanın öğrenme
çıktısı, laboratuvar etkinliği ve ön okuma.
8. hafta ara sınav, 15. hafta final.

Öğrenme çıktılarını Bloom taksonomisine göre
etiketle (hatırlama / uygulama / analiz / değerlendirme).`}</Prompt>
      </div>
      <Fade delay={0.25}>
        <p className="mt-5 text-sm text-white/45 leading-relaxed max-w-3xl">
          Çıkan planı olduğu gibi kullanmayın. Bölümünüzün müfredat komisyonu
          kuralları ve ders saatinin gerçek temposu ancak sizde var.
        </p>
      </Fade>
    </Slide>
  ),

  /* 25 · Sınav sorusu */
  () => (
    <Slide>
      <Eyebrow>İş akışı · ölçme</Eyebrow>
      <H2>Ezberle geçilemeyen soru yazmak.</H2>
      <Sub>
        Soru üretmek kolay; <em>ayırt edici</em>{" "}soru üretmek zor. İkincisini
        istemek için ne istediğinizi açıkça söylemeniz gerekiyor.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <Card icon={PenLine} title="Çeldirici isteyin">
            “Her şıkkın yanına, o şıkkı işaretleyen öğrencinin hangi kavramı
            yanlış anladığını yaz.” Bu tek cümle soru kalitesini değiştirir.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={Layers} title="Seviye dağıtın">
            “Üç soru hatırlama, dört soru uygulama, üç soru analiz düzeyinde
            olsun.” Yoksa hepsi aynı zorlukta çıkar.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={FileSearch} title="Kod okutun">
            Programlama derslerinde “şu kod ne yazdırır” tipi sorular ezberle
            geçilemez. Hatalı kod verip hatayı buldurmak daha da iyidir.
          </Card>
        </Fade>
        <Fade delay={0.32}>
          <Card icon={ShieldCheck} title="Kendi sorunuzu denetletin">
            Yazdığınız soruyu verip “bu soru belirsiz mi, birden fazla doğru
            cevabı var mı” diye sorun. Sınavdan önce yakalamak iyidir.
          </Card>
        </Fade>
      </div>
    </Slide>
  ),

  /* 26 · Veri analizi */
  () => (
    <Slide>
      <Eyebrow>İş akışı · veri</Eyebrow>
      <H2>Excel içinde veri setiyle konuşmak.</H2>
      <Sub>
        Claude for Excel, Excel'in içinde kenar çubuğu olarak çalışıyor:
        çalışma kitabını okuyor, hücre düzeyinde atıf vererek cevap veriyor,
        formül ilişkilerini bozmadan değer güncelliyor. Anket verisi, sınav
        sonucu ya da ölçüm tablosuyla çalışan herkesi doğrudan ilgilendiriyor.{" "}
        <strong className="text-white">Pro ve üstü planlarda</strong>, Excel
        eklentisi olarak kuruluyor — ayrı bir program indirmiyorsunuz.
      </Sub>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <h3 className="text-white font-semibold mb-2.5">Yaptıkları</h3>
            <ul className="space-y-1.5 text-sm text-white/55 leading-relaxed">
              <li>· Hata kök nedeni bulma (#REF!, #DIV/0)</li>
              <li>· Pivot ve koşullu biçimlendirme</li>
              <li>· Model ve şablon üretme</li>
              <li>· Formül ilişkilerini bozmadan güncelleme</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <h3 className="text-white font-semibold mb-2.5">Çalışmadığı yerler</h3>
            <ul className="space-y-1.5 text-sm text-white/55 leading-relaxed">
              <li>· Excel 2016 / 2019 kalıcı sürümler</li>
              <li>· iPad ve Android</li>
              <li>· Makro ve VBA</li>
            </ul>
          </div>
        </Fade>
      </div>
      <div className="ai-warn mt-5 px-5 py-3">
        <p className="text-sm text-white/70 leading-relaxed">
          <strong className="text-white">Güvenlik notu:</strong>{" "}Yalnızca
          güvendiğiniz dosyalarla kullanın. Dışarıdan gelen bir tabloya
          gizlenmiş yönerge, aracı istemediğiniz bir işe yönlendirebilir.
        </p>
      </div>
      <Source>claude.com/docs/office-agents/excel — erişim 4 Eylül 2026</Source>
    </Slide>
  ),

  /* 27 · Dil ve çeviri */
  () => (
    <Slide>
      <Eyebrow>İş akışı · dil</Eyebrow>
      <H2>İngilizce yazarken en çok işe yarayan yer.</H2>
      <Sub>
        Ana dili İngilizce olmayan bir araştırmacı için en somut fayda burada.
        İyi haber: temel dil ve yazım düzeltmesi çoğu yayıncıda beyan
        gerektirmiyor.
      </Sub>
      <div className="mt-7 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={Languages} title="Akademik ton">
            “Bu paragrafı akademik İngilizceye çevir, iddia düzeyini
            değiştirme” demek çeviri hatasını azaltır.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={PenLine} title="Aynı anlam, daha kısa">
            Dergi kelime sınırına takıldığınızda “anlamı koruyarak %20 kısalt”
            en pratik istektir.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={AlertTriangle} title="Anlam kayması">
            Çeviride iddianızın gücü değişebilir: “suggests” ile “proves”
            arasındaki fark size aittir. Çeviriyi mutlaka okuyun.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed max-w-3xl">
          Elsevier ve Springer Nature, temel dilbilgisi/okunabilirlik
          düzeltmesini beyan zorunluluğunun dışında tutuyor; IEEE beyanı
          “önerilir” diyor. Yine de kapsam genişlediyse beyan edin.
        </p>
      </Fade>
      <Source>
        elsevier.com generative-ai-policies (Haziran 2026) ·
        group.springernature.com AI guidance · open.ieee.org author guidelines
        (16 Nisan 2024) · publicationethics.org (13 Şubat 2023)
      </Source>
    </Slide>
  ),

  /* Bölüm 4 · Alanınıza göre */
  () => (
    <Divider
      num="4"
      title="Alanınıza göre"
      subtitle="Aynı araç, farklı alanlarda farklı riskler taşıyor. Altı alan için pratik notlar."
      icerik={[
        "Sosyal bilimler",
        "Mühendislik",
        "Sağlık",
        "Beşeri bilimler",
        "Uygulamalı alanlar",
        "İdari görevler",
      ]}
    />
  ),

  /* Alan · sosyal bilimler ve eğitim */
  () => (
    <Slide>
      <Eyebrow>Alanınıza göre · 1</Eyebrow>
      <H2>Sosyal bilimler ve eğitim.</H2>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <div
              className="font-mono text-[11px] uppercase tracking-[0.18em] mb-2.5"
              style={{ color: ACCENT }}
            >
              En çok değer getiren
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>· Görüşme deşifresini yazıya çevirme (Whisper, ücretsiz)</li>
              <li>· Açık uçlu anket yanıtlarını ön gruplama</li>
              <li>· Ölçek maddelerini dil açısından sadeleştirme</li>
              <li>· Ders materyali ve etkinlik tasarımı</li>
              <li>· Kuramsal çerçeve için karşıt görüşleri listeleme</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2.5">
              Dikkat edilecek
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>
                · <strong className="text-white">Nitel kodlamada ikinci
                kodlayıcı sayılamaz.</strong>{" "}Kodlayıcılar arası güvenirlik
                hesabına katmak yöntemsel olarak savunulamaz.
              </li>
              <li>· Katılımcı alıntıları yüklenmeden önce anonimleştirilmeli</li>
              <li>· Kültüre özgü kavramlarda Batı merkezli yorum üretebiliyor</li>
            </ul>
          </div>
        </Fade>
      </div>
      <Fade delay={0.26}>
        <div className="mt-5">
          <Prompt>{`Şu görüşme deşifresini oku. Katılımcının tekrar eden
temalarını çıkar, her tema için deşifreden birebir
alıntı ver. Yorum yapma — sadece metinde geçen
ifadelere dayan. Bulamadığın temayı uydurma.`}</Prompt>
        </div>
      </Fade>
    </Slide>
  ),

  /* Alan · mühendislik ve fen */
  () => (
    <Slide>
      <Eyebrow>Alanınıza göre · 2</Eyebrow>
      <H2>Mühendislik, fen ve bilişim.</H2>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <div
              className="font-mono text-[11px] uppercase tracking-[0.18em] mb-2.5"
              style={{ color: ACCENT }}
            >
              En çok değer getiren
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>· Analiz kodu yazma ve hata ayıklama — en güçlü olduğu iş</li>
              <li>· Veri temizleme ve biçim dönüştürme</li>
              <li>· Grafik üretimi ve yayın kalitesine getirme</li>
              <li>· Simülasyon parametrelerini tarama</li>
              <li>· LaTeX tablo ve denklem düzenleme</li>
            </ul>
            <p className="mt-3 text-xs text-white/40 leading-relaxed">
              Öğretim üyesiyseniz GitHub Copilot ücretsiz — bu alanda en
              somut kazanç orada.
            </p>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2.5">
              Dikkat edilecek
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>
                · <strong className="text-white">Türetilmiş formülleri
                doğrulayın.</strong>{" "}İkna edici görünen yanlış türetme
                üretebiliyor.
              </li>
              <li>· Birim dönüşümlerinde sessiz hata yapabiliyor</li>
              <li>· Kütüphane sürümü eskiyse çalışmayan kod önerebiliyor</li>
              <li>· Sanayi iş birliği verisi gizlilik sözleşmesine tabidir</li>
            </ul>
          </div>
        </Fade>
      </div>
      <Fade delay={0.26}>
        <div className="mt-5">
          <Prompt>{`Bu Python fonksiyonu beklediğim sonucu vermiyor.
Önce ne yaptığını satır satır açıkla, sonra hatanın
nerede olduğunu söyle. Düzeltilmiş kodu en son ver —
önce anlamak istiyorum.`}</Prompt>
        </div>
      </Fade>
    </Slide>
  ),

  /* Alan · sağlık */
  () => (
    <Slide>
      <Eyebrow>Alanınıza göre · 3</Eyebrow>
      <H2>Sağlık ve yaşam bilimleri.</H2>
      <Sub>
        Kazancın en yüksek, riskin de en yüksek olduğu alan. Sınır çok net
        çizilmeli.
      </Sub>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <div
              className="font-mono text-[11px] uppercase tracking-[0.18em] mb-2.5"
              style={{ color: ACCENT }}
            >
              Yapılabilir
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>· Literatür taraması (her kaynak PubMed&apos;den doğrulanarak)</li>
              <li>· İstatistik yöntemi seçimini tartışma</li>
              <li>· Hasta bilgilendirme metnini sadeleştirme</li>
              <li>· Şekil ve şema çizimi (BioRender)</li>
              <li>· Etik kurul başvuru metninin dil düzeltmesi</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <div className="flex items-center gap-2 mb-2.5">
              <Ban className="w-4 h-4 text-white/40" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                Yapılmaz
              </span>
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>
                · <strong className="text-white">Hasta verisi hiçbir koşulda
                genel amaçlı araca girmez.</strong>{" "}Anonimleştirilmiş olsa bile
                kurum politikanızı kontrol edin.
              </li>
              <li>· Tanı ya da tedavi önerisi üretilmez</li>
              <li>· Görüntü verisi (MR, patoloji) yüklenmez</li>
            </ul>
          </div>
        </Fade>
      </div>
      <Fade delay={0.26}>
        <p className="mt-5 text-sm text-white/45 leading-relaxed max-w-3xl">
          Deşifre gerekiyorsa Whisper&apos;ı kendi bilgisayarınızda çalıştırın —
          ses kaydı buluta hiç çıkmaz. Bu, etik kurul başvurusunda
          yazabileceğiniz somut bir güvence.
        </p>
      </Fade>
    </Slide>
  ),

  /* Alan · hukuk, ilahiyat, beşeri */
  () => (
    <Slide>
      <Eyebrow>Alanınıza göre · 4</Eyebrow>
      <H2>Hukuk, ilahiyat, edebiyat ve tarih.</H2>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <div
              className="font-mono text-[11px] uppercase tracking-[0.18em] mb-2.5"
              style={{ color: ACCENT }}
            >
              En çok değer getiren
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>· Uzun metinden argüman haritası çıkarma</li>
              <li>· Karşıt görüşü en güçlü hâliyle kurdurma</li>
              <li>· Eski dilli metni günümüz Türkçesine yaklaştırma (taslak olarak)</li>
              <li>· Ders okuma listesi ve tartışma sorusu hazırlama</li>
              <li>· Çeviri karşılaştırması: aynı pasajın farklı okumaları</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2.5">
              Dikkat edilecek
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>
                · <strong className="text-white">Mevzuat ve içtihat
                uydurabiliyor.</strong>{" "}Madde numarası ve karar tarihi
                kesinlikle kaynağından doğrulanmalı.
              </li>
              <li>· Metin yorumunda yüzeysel kalıyor; okumanızın yerini tutmaz</li>
              <li>· Osmanlıca ve Arapça çeviride ciddi hata payı var</li>
              <li>· Kanonik olmayan kaynaklarda hafızası zayıf</li>
            </ul>
          </div>
        </Fade>
      </div>
      <Fade delay={0.26}>
        <div className="mt-5">
          <Prompt>{`Bu metindeki ana savı ve onu destekleyen üç
gerekçeyi çıkar. Sonra bu sava yöneltilebilecek en
güçlü itirazı yaz — beni ikna etmeye çalışma,
karşı tarafın en iyi argümanını görmek istiyorum.`}</Prompt>
        </div>
      </Fade>
    </Slide>
  ),

  /* Alan · uygulamalı ve tasarım alanları */
  () => (
    <Slide>
      <Eyebrow>Alanınıza göre · 5</Eyebrow>
      <H2>Ziraat, veteriner, mimarlık, güzel sanatlar, spor.</H2>
      <Sub>
        Uygulamalı alanlarda iş, masa başında bitmiyor. Yapay zekânın katkısı
        da bu yüzden dar ama net bir yerde duruyor.
      </Sub>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <div
              className="font-mono text-[11px] uppercase tracking-[0.18em] mb-2.5"
              style={{ color: ACCENT }}
            >
              İşe yarayan yerler
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>· Saha ölçüm verisini tabloya dökme ve betimleyici analiz</li>
              <li>· Deneme deseni kurarken alternatifleri tartışma</li>
              <li>· Şartname, proje raporu ve teknik metin taslağı</li>
              <li>· Literatürdeki yöntem çeşitliliğini haritalama</li>
              <li>· Uygulama dersleri için değerlendirme ölçütü yazma</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2.5">
              İşe yaramayan yerler
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>· Saha gözlemi, hayvan davranışı, malzeme hissi — yerini tutmaz</li>
              <li>· Tasarım yargısı ve estetik karar sizde kalır</li>
              <li>· Ürettiği görsel, yayında araştırma görseli sayılmaz</li>
              <li>· Yerel iklim, toprak ve mevzuat verisinde güvenilmez</li>
            </ul>
          </div>
        </Fade>
      </div>
      <Fade delay={0.26}>
        <div className="mt-5">
          <Prompt>{`Şu deneme desenini kuruyorum: [TASARIM, tekerrür sayısı,
faktörler]. Bu desenin gözden kaçırdığım zayıf yanları
neler? Hangi karıştırıcı değişken sonucumu geçersiz
kılabilir? Alternatif bir desen önerirsen gerekçesiyle
birlikte yaz.`}</Prompt>
        </div>
      </Fade>
    </Slide>
  ),

  /* Alan · idari ve yönetsel */
  () => (
    <Slide>
      <Eyebrow>Alanınıza değil, rolünüze göre</Eyebrow>
      <H2>Bölüm başkanı, koordinatör, komisyon üyesi.</H2>
      <Sub>
        Akademisyenliğin görünmeyen kısmı: yazışma, rapor, akreditasyon
        dosyası. Buradaki kazanç, araştırmadakinden daha büyük olabiliyor.
      </Sub>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={ClipboardList} title="Akreditasyon dosyası">
            Öğrenme çıktılarını program çıktılarıyla eşleme tablosu, kanıt
            listesi taslağı. Biçimsel ama çok zaman alan iş.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={PenLine} title="Kurumsal yazışma">
            Resmî yazı taslağı, toplantı tutanağı düzenleme, duyuru metni.
            Tonu siz ayarlarsınız, iskeleti o kurar.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Table2} title="Rapor ve özet">
            Uzun komisyon raporundan yönetici özeti; sayısal ekleri tabloya
            çevirme.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <div className="ai-warn mt-5 px-5 py-3.5">
          <p className="text-sm text-white/70 leading-relaxed">
            Personel dosyası, disiplin evrakı ve öğrenci not bilgisi bu işlerin
            dışında tutulmalı. Anonimleştirici ile temizlemeden yüklemeyin.
          </p>
        </div>
      </Fade>
    </Slide>
  ),

  /* Bölüm 5 · Öğrenci */
  () => (
    <Divider
      num="5"
      title="Öğrenci"
      subtitle="Yasaklayamıyorsunuz. Ama nasıl kullanacağını biçimlendirebilirsiniz."
      icerik={[
        "Learning Mode",
        "Dayanıklı ödev",
        "Derste canlı kullanım",
        "Sınıf politikası",
        "Okuryazarlık",
        "Lisansüstü danışmanlık",
        "Tespit araçları",
      ]}
    />
  ),

  /* 29 · Learning Mode */
  () => (
    <Slide>
      <Eyebrow>Cevabı vermeyen mod</Eyebrow>
      <H2>Learning Mode.</H2>
      <Sub>
        Öğrenciye doğrudan cevap vermek yerine soru sorarak cevabı kendisinin
        bulmasını sağlıyor. Resmî tanımı şöyle: “iyi bir özel ders hocası gibi
        çalışır — cevapları kendiniz bulmanıza yardım eden sorular sorar.”
      </Sub>
      <Fade delay={0.2}>
        <div className="ai-warn mt-9 px-6 py-5">
          <Quote className="w-5 h-5 mb-3" style={{ color: ACCENT }} />
          <p className="text-lg text-white/75 leading-relaxed">
            Öğrencinin yapay zekâ kullanmasını engelleyemezsiniz. Ama
            <strong className="text-white"> nasıl kullandığını </strong>
            biçimlendirebilirsiniz. Ödevi “yapay zekâ ile çöz, sonra nerede
            yanıldığını göster” diye kurgulamak, yasaklamaktan daha çok
            öğretiyor.
          </p>
        </div>
      </Fade>
      <Fade delay={0.32}>
        <div className="mt-5 grid md:grid-cols-2 gap-4">
          <div className="ai-card p-5">
            <div className="text-white font-semibold mb-2">Nasıl açılıyor</div>
            <p className="text-sm text-white/55 leading-relaxed">
              Sohbet kutusundaki stil/mod seçicisinden. Ücretsiz planda da var
              — öğrencinizin abonelik almasına gerek yok. Her sohbet için ayrı
              seçiliyor, kalıcı bir ayar değil.
            </p>
          </div>
          <div className="ai-card p-5">
            <div className="text-white font-semibold mb-2">
              Öğrenciye söyleyeceğiniz cümle
            </div>
            <p className="text-sm text-white/55 leading-relaxed">
              “Bu dersin ödevlerinde soruyu sormadan önce Learning Mode&apos;u
              aç. Cevabı sana vermeyecek; nereden takıldığını sen göreceksin.”
            </p>
          </div>
        </div>
      </Fade>
      <Source>claude.com/solutions/education — erişim 4 Eylül 2026</Source>
    </Slide>
  ),

  /* 30 · Dayanıklı ödev tasarımı */
  () => (
    <Slide>
      <Eyebrow>Ödev tasarımı</Eyebrow>
      <H2>Yapay zekânın tek başına yapamadığı ödevler.</H2>
      <Sub>
        “Ödevi yapay zekâ yapmış” sorununun çözümü denetim değil, tasarım.
        Aşağıdaki beş kurgu, aracın erişemediği şeyleri işin merkezine koyuyor.
      </Sub>
      <div className="mt-6">
        <Steps
          items={[
            {
              t: "Süreci isteyin, ürünü değil",
              d: "Taslak, düzeltme geçmişi, kaynak notları. Yalnızca son metin istenirse süreç görünmez olur.",
            },
            {
              t: "Yerel ve güncel veri kullandırın",
              d: "Kendi topladığı anket, kendi mahallesinin verisi, bu haftaki bir olay. Modelin eğitim verisinde yok.",
            },
            {
              t: "Derste savunma isteyin",
              d: "Beş dakikalık sözlü savunma, yazının kime ait olduğunu kısa sürede belli eder.",
            },
            {
              t: "Yapay zekâyı ödevin parçası yapın",
              d: "“Aracın verdiği cevabı ekle, yanlış olan üç yerini işaretle ve düzelt.” Eleştirel okuma ölçülür.",
            },
            {
              t: "Kendi deneyimine bağlayın",
              d: "“Staj yerinde gördüğün bir örnekle ilişkilendir.” Kişisel gözlemi model üretemez.",
            },
          ]}
        />
      </div>
    </Slide>
  ),

  /* Derste canlı kullanım */
  () => (
    <Slide>
      <Eyebrow>Sınıfın içinde</Eyebrow>
      <H2>Yasaklamak yerine birlikte kullanmak.</H2>
      <Sub>
        Bu bölümün geri kalanı ödevi ve denetimi konuşuyor. Ama en çok
        öğreten kullanım dersin içinde, projeksiyonda oluyor — öğrenci aracın
        nerede yanıldığını sizin yanınızda görüyor.
      </Sub>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <Card icon={FileSearch} title="Canlı kaynak denetimi">
            Konuyla ilgili beş kaynak isteyin, çıkan DOI&apos;leri sınıfta
            doi.org&apos;da tek tek açın. Bir tanesi açılmadığında ders
            anlatmanıza gerek kalmıyor.
          </Card>
        </Fade>
        <Fade delay={0.14}>
          <Card icon={PenLine} title="İstemi öğrenci yazsın">
            Aynı soruyu iki öğrenci iki farklı istemle yazsın, ikisini de siz
            çalıştırın. Sonucun istemle ne kadar değiştiğini anlatarak değil
            göstererek öğretiyorsunuz.
          </Card>
        </Fade>
        <Fade delay={0.2}>
          <Card icon={Scale} title="İki cevabı karşılaştırın">
            Aynı soruyu iki farklı araca sorun, cevapları yan yana koyun.
            “Hangisi doğru, nereden bileceğiz?” sorusu tek başına bir ders
            saati doldurur.
          </Card>
        </Fade>
        <Fade delay={0.26}>
          <Card icon={ClipboardList} title="Kendi ödevinizi çözdürün">
            Vereceğiniz ödevi derste araca çözdürün. Yapabildiği kısım ödevin
            ölçmediği kısımdır; kalan kısım ödevin gerçek katkısı. Sınav
            haftasından önce öğrenmek daha iyi.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.34}>
        <p className="mt-5 text-sm text-white/45 leading-relaxed max-w-3xl">
          Bunların hiçbiri hazırlık istemiyor ve hiçbiri öğrencinin hesabına
          ihtiyaç duymuyor — sizin ekranınızda çalışıyor.
        </p>
      </Fade>
    </Slide>
  ),

  /* 31 · Öğrenciye ne söylemeli */
  () => (
    <Slide>
      <Eyebrow>Sınıf politikası</Eyebrow>
      <H2>İzlenceye koyabileceğiniz üç cümle.</H2>
      <Sub>
        Belirsiz kural, hem öğrenciyi hem sizi zor durumda bırakıyor. Net bir
        politika, dönem başında yazıldığında tartışmayı bitiriyor.
      </Sub>
      <div className="mt-7 space-y-3">
        {[
          {
            t: "Serbest",
            d: "“Fikir üretme, kaynak bulma ve dil düzeltmede yapay zekâ kullanabilirsiniz; beyan etmenize gerek yok.”",
          },
          {
            t: "Beyanla serbest",
            d: "“Ödev metninin herhangi bir bölümünde kullandıysanız, hangi araçla ne yaptığınızı ödevin sonuna bir paragrafla yazın.”",
          },
          {
            t: "Yasak",
            d: "“Bu ödev sizin yazma becerinizi ölçüyor; yapay zekâ kullanımı kopya sayılır.” — Yasaklıyorsanız gerekçesini yazın, kural o zaman anlaşılır oluyor.",
          },
        ].map((s, i) => (
          <Fade key={s.t} delay={0.1 * i}>
            <div className="ai-card px-6 py-4">
              <div
                className="font-mono text-[11px] uppercase tracking-[0.18em] mb-1.5"
                style={{ color: ACCENT }}
              >
                {s.t}
              </div>
              <div className="text-white/65 leading-relaxed">{s.d}</div>
            </div>
          </Fade>
        ))}
      </div>
      <Fade delay={0.4}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed max-w-3xl">
          Üçü de geçerli. Yanlış olan, hiçbirini söylememek ve sonra ödev
          gelince karar vermek.
        </p>
      </Fade>
    </Slide>
  ),

  /* 31b · Yapay zekâ okuryazarlığı */
  () => (
    <Slide>
      <Eyebrow>Öğretilmesi gereken beceri</Eyebrow>
      <H2>Öğrenciye asıl öğretilecek şey araç değil, denetim.</H2>
      <Sub>
        Öğrenci aracı zaten kullanıyor. Eksik olan, çıktının doğru olup
        olmadığını anlama becerisi. Bunu derse dört adımda katabilirsiniz.
      </Sub>
      <div className="mt-6">
        <Steps
          items={[
            {
              t: "Yanlış çıktıyı sınıfta gösterin",
              d: "Kendi alanınızda bir soru sorup ürettiği hatayı tahtaya yansıtın. Bir kez görmek, on kez uyarmaktan etkili.",
            },
            {
              t: "Kaynak doğrulatın",
              d: "Ürettiği kaynakçayı verip “hangileri gerçek” diye arattırın. Uydurma atıfı kendi eliyle bulan öğrenci bir daha unutmaz.",
            },
            {
              t: "Karşılaştırma yaptırın",
              d: "Aynı soruyu iki farklı araca sordurup çelişkileri buldurun. Aracın tek doğru olmadığını böyle öğrenir.",
            },
            {
              t: "Beyan alışkanlığı kazandırın",
              d: "Her ödevin sonunda “nerede, ne için kullandım” paragrafı isteyin. Yayın hayatına hazırlığın en gerçekçi provası.",
            },
          ]}
        />
      </div>
    </Slide>
  ),

  /* Lisansüstü danışmanlık */
  () => (
    <Slide>
      <Eyebrow>Danışmanlık</Eyebrow>
      <H2>Tez öğrencinizle sınırı baştan çizin.</H2>
      <Sub>
        Lisans ödevinden farkı şu: tezde sorumluluk danışmana da yansıyor.
        Sınır dönem başında konuşulmazsa, jüri masasında konuşuluyor.
      </Sub>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <div
              className="font-mono text-[11px] uppercase tracking-[0.18em] mb-2.5"
              style={{ color: ACCENT }}
            >
              Serbest bırakabileceğiniz
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>· İngilizce dil düzeltmesi ve akıcılık</li>
              <li>· Analiz kodu yazımı ve hata ayıklama</li>
              <li>· Literatürde ilk keşif — her kaynak doğrulanmak şartıyla</li>
              <li>· Sunum ve poster metni taslağı</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2.5">
              Sınırlamanız gereken
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>· Bulguların yorumu ve tartışma bölümü</li>
              <li>· Yöntem seçiminin gerekçesi</li>
              <li>· Kuramsal çerçevenin kurulması</li>
              <li>· Ham katılımcı verisinin araca girmesi</li>
            </ul>
          </div>
        </Fade>
      </div>
      <Fade delay={0.26}>
        <div className="ai-warn mt-5 px-5 py-4">
          <p className="text-sm text-white/70 leading-relaxed">
            <strong className="text-white">Pratik öneri:</strong>{" "}ilk
            görüşmede öğrencinizden tez boyunca tuttuğu bir kullanım kaydı
            isteyin — hangi aşamada hangi aracı ne için kullandı. Tez sonunda
            beyan yazmak beş dakikaya iniyor, ayrıca jüriye karşı en güçlü
            savunma bu oluyor.
          </p>
        </div>
      </Fade>
    </Slide>
  ),

  /* Tespit araçları — araştırma */
  () => (
    <Slide>
      <Eyebrow>En önemli slayt</Eyebrow>
      <H2>Yapay zekâ tespit araçları sizi de vurabilir.</H2>
      <Sub>
        Stanford&apos;dan Liang ve arkadaşlarının 2023&apos;te{" "}
        <em>Patterns</em>{" "}dergisinde yayımladığı çalışma, yedi ticari tespit
        aracını insan eliyle yazılmış metinlerle sınadı. Sonuç, ana dili
        İngilizce olmayan herkesi doğrudan ilgilendiriyor.
      </Sub>
      <div className="mt-8">
        <CompareBars
          unit="%"
          items={[
            {
              label: "TOEFL denemeleri — ana dili İngilizce olmayanlar",
              value: 61.3,
              caption:
                "İnsan eliyle yazılmış bu denemelerin ortalama yüzde 61,3'ü “yapay zekâ üretimi” diye yanlış etiketlendi.",
            },
            {
              label: "Kelime dağarcığı zenginleştirildikten sonra",
              value: 11.6,
              muted: true,
              caption:
                "Aynı denemeler daha zengin bir dille yeniden yazılınca yanlış etiketleme yüzde 11,6'ya düştü. Yani araç yapay zekâyı değil, sade dili yakalıyor.",
            },
          ]}
        />
      </div>
      <Fade delay={0.5}>
        <p className="mt-7 text-white/60 leading-relaxed">
          91 denemenin 18&apos;i{" "}
          <strong className="text-white">yedi aracın tamamı</strong>{" "}
          tarafından oybirliğiyle yapay zekâ sayıldı.
          89&apos;u en az bir araç tarafından işaretlendi.
        </p>
      </Fade>
      <Source>
        Liang W., Yuksekgonul M., Mao Y., Wu E., Zou J. (2023). GPT detectors
        are biased against non-native English writers. Patterns, Cell Press.
        PMID 37521038 · arXiv:2304.02819
      </Source>
    </Slide>
  ),

  /* Tespit araçları — kurumlar ne yaptı */
  () => (
    <Slide>
      <Eyebrow>Üniversiteler ne yaptı</Eyebrow>
      <H2>Bazıları tespit aracını kapattı.</H2>
      <div className="mt-7 space-y-3">
        <Fade delay={0.08}>
          <div className="ai-card px-6 py-5">
            <div className="text-white font-semibold mb-2">
              Vanderbilt University — 16 Ağustos 2023
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-3">
              Turnitin&apos;in yapay zekâ dedektörünü resmen devre dışı
              bıraktı. Gerekçelerinden biri, kendi rakamlarıyla: yılda 75.000
              ödev teslim ediliyor; üreticinin beyan ettiği yüzde 1 yanlış
              pozitif oranı bile <strong className="text-white">yaklaşık 750
              ödevin haksız yere işaretlenmesi</strong>{" "}demek.
            </p>
            <p className="text-sm text-white/45 leading-relaxed italic">
              “Yapay zekâ tespit yazılımının kullanılması gereken etkili bir
              araç olduğuna inanmıyoruz.”
            </p>
          </div>
        </Fade>
        <Fade delay={0.18}>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              ["UC San Diego Extended Studies", "2025 baharından itibaren yapay zekâ tespitini kapattı; intihal denetimi sürüyor."],
              ["Penn State", "Dedektörlerin “akademik dürüstlük süreçlerinde belirleyici kullanım için doğruluk ölçütlerini karşılamadığı” yönünde yönerge."],
              ["Michigan State", "Skorun tek başına öğrenciye yaptırım gerekçesi olamayacağını kurumsal yönergeye aldı."],
            ].map(([k, d]) => (
              <div key={k} className="ai-card p-4">
                <div className="text-white text-sm font-semibold mb-1.5">{k}</div>
                <div className="text-[13px] text-white/50 leading-relaxed">{d}</div>
              </div>
            ))}
          </div>
        </Fade>
      </div>
      <Source>
        vanderbilt.edu/brightspace (16 Ağustos 2023) ·
        extensionhelpcenter.ucsd.edu · integrity.psu.edu · help.d2l.msu.edu —
        erişim 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* Tespit araçları · ne yapmalı */
  () => (
    <Slide>
      <Eyebrow>Peki ne yapmalı</Eyebrow>
      <H2>Skor bir iddiadır, süreç kanıttır.</H2>
      <Sub>
        Tespit aracının verdiği yüzde bir olasılık tahminidir; sorduğunuzda
        araç size neden öyle düşündüğünü gösteremiyor. Elinizde bir skor varsa
        izleyeceğiniz sıra şu.
      </Sub>
      <div className="mt-6">
        <Steps
          items={[
            {
              t: "Hangi skoru okuduğunuzu ayırt edin",
              d: "Benzerlik oranı ile yapay zekâ tespit skoru aynı şey değil. Benzerlik oranı metnin başka kaynaklarla örtüşmesini ölçer ve doğrulanabilir — örtüşen kaynağı gösterir. Yapay zekâ skoru hiçbir kaynak gösteremez; yalnızca bir tahmindir.",
            },
            {
              t: "Skoru tek başına dosyaya koymayın",
              d: "Ankara Üniversitesi yönergesi tespit aracı raporunu tek başına kanıt saymıyor. Lisansüstü yönetmeliği de kararı yazılıma değil jüriye bırakıyor: rapordaki verileri jüri üyeleri değerlendiriyor.",
            },
            {
              t: "Suçlamadan önce sorun",
              d: "“Bu bölümü nasıl yazdın, hangi kaynaklara baktın, şu cümleyi neden böyle kurdun?” Çoğu öğrenci kullandığını zaten söylüyor; mesele kuralı baştan koymamış olmak.",
            },
            {
              t: "Kanıtı dosyanın kendisinden alın",
              d: "Google Docs sürüm geçmişi, Word değişiklik kaydı, taslak dosyalarının tarihleri. Metnin nasıl büyüdüğünü gösteren kayıt, hiçbir skorun veremeyeceği bilgidir.",
            },
            {
              t: "Görüşmeyi yazıya geçirin",
              d: "Tarih, katılanlar, öğrencinin açıklaması ve vardığınız sonuç. Süreç disipline giderse dayanağınız bu tutanak olur, ekran görüntüsü değil.",
            },
          ]}
        />
      </div>
      <Fade delay={0.4}>
        <div className="ai-warn mt-6 px-5 py-3.5">
          <p className="text-sm text-white/70 leading-relaxed">
            Bir öğrenciyi tespit aracının skoruna dayanarak suçlamak, ana dili
            Türkçe olan bir öğrencinin İngilizce metnini cezalandırmakla
            sonuçlanabilir. Liang ve arkadaşlarının 2023 tarihli çalışması tam
            olarak bunu gösteriyor.
          </p>
        </div>
      </Fade>
      <Source>
        Lisansüstü Eğitim ve Öğretim Yönetmeliği — tez savunması maddeleri
        (“Enstitü … intihal yazılım programı raporunu alarak jüri üyelerine
        gönderir”) · Ankara Üniversitesi üretken yapay zekâ yönergesi
      </Source>
    </Slide>
  ),

  /* Bölüm 6 · Sınırlar */
  () => (
    <Divider
      num="6"
      title="Sınırlar"
      subtitle="Yayıncılar ne istiyor, uydurma atıf nasıl yakalanır, veriniz nereye gidiyor."
      icerik={[
        "Yayıncı kuralları",
        "Beyan metni",
        "Halüsinasyon",
        "Veri gizliliği",
      ]}
    />
  ),

  /* 16 · Nerede yanılır */
  () => (
    <Slide>
      <Eyebrow>Sınır</Eyebrow>
      <H2>Nerede güvenmemelisiniz?</H2>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.06}>
          <Card icon={FileSearch} title="Atıf ve kaynak">
            Var olmayan makale, yanlış cilt/sayfa, gerçek yazarla uydurma
            başlık birleşimi üretebilir. Her kaynağı açıp bakın.
          </Card>
        </Fade>
        <Fade delay={0.12}>
          <Card icon={Table2} title="Sayısal kesinlik">
            Uzun hesap zincirlerinde ve büyük tablolarda hata yapar. Kritik
            sayıyı kendiniz doğrulayın ya da hesabı koda yaptırın.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={Compass} title="Çok yeni gelişmeler">
            Eğitim verisinin bittiği tarihten sonrasını bilmez. Web araması
            açık değilse güncel bir yönetmeliği bilmesini beklemeyin.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Scale} title="Yerel mevzuat ve kurum kuralı">
            YÖK yönetmeliği, üniversitenizin yönergesi, derginizin özel kuralı
            — bunları kaynağından okuyun.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <div className="ai-warn mt-6 px-5 py-3.5">
          <p className="text-sm text-white/70 leading-relaxed">
            Pratik kural: <strong className="text-white">doğruluğunu
            denetleyebildiğiniz işlerde</strong>{" "}kullanın. Denetleyemeyeceğiniz
            bir alanda ürettiği metne güvenmek, bilmediğiniz bir dilde imza
            atmaya benzer.
          </p>
        </div>
      </Fade>
    </Slide>
  ),

  /* 33 · Yazar olamaz */
  () => (
    <Slide>
      <Eyebrow>Dört kurum, tek cevap</Eyebrow>
      <H1>Yapay zekâ yazar olamaz.</H1>
      <Sub>
        Elsevier, Springer Nature, IEEE ve COPE bu konuda hemfikir. Gerekçe
        ortak: yazarlık sorumluluk demektir, bir araç sorumluluk üstlenemez,
        çıkar çatışması beyan edemez, telif anlaşması imzalayamaz.
      </Sub>
      <Fade delay={0.2}>
        <div className="ai-card mt-9 px-7 py-6">
          <Quote className="w-5 h-5 mb-3 text-white/30" />
          <p className="text-lg text-white/70 leading-relaxed italic">
            “Yazarlık, yalnızca insanlara atfedilebilen ve insanlar tarafından
            yerine getirilebilen sorumluluklar ve görevler içerir.”
          </p>
          <p className="mt-3 font-mono text-[11px] text-white/35">
            Elsevier — Haziran 2026
          </p>
        </div>
      </Fade>
      <Source>
        elsevier.com generative-ai-policies (Haziran 2026) ·
        group.springernature.com AI guidance · open.ieee.org author guidelines
        (16 Nisan 2024) · publicationethics.org (13 Şubat 2023)
      </Source>
    </Slide>
  ),

  /* 34 · Beyan nereye */
  () => (
    <Slide>
      <Eyebrow>Çoğu kişinin bilmediği ayrıntı</Eyebrow>
      <H2>Beyan zorunlu — ama yeri her yayıncıda farklı.</H2>
      <Sub>
        Yapay zekâ kullandıysanız bunu bildirmek zorundasınız. Nereye
        yazacağınız ise yayıncıya göre değişiyor.
      </Sub>
      <div className="mt-7 overflow-x-auto">
        <table className="ai-table table-fixed">
          <thead>
            <tr>
              <th className="w-[34%]">Kurum</th>
              <th>Beyan nereye yazılır</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Elsevier</td>
              <td>Kaynakçadan önce ayrı bir başlık altında</td>
            </tr>
            <tr>
              <td>Springer Nature</td>
              <td>Introduction ya da Acknowledgements</td>
            </tr>
            <tr>
              <td>IEEE</td>
              <td>Acknowledgments</td>
            </tr>
            <tr>
              <td>COPE</td>
              <td>Materials and Methods (ya da muadili)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Fade delay={0.3}>
        <p className="mt-5 text-sm text-white/45 leading-relaxed max-w-3xl">
          Ortak istisna: temel dilbilgisi ve yazım denetimi genellikle beyan
          gerektirmiyor. IEEE bunu “önerilir” diyerek daha yumuşak ifade ediyor.
        </p>
      </Fade>
      <Source>
        elsevier.com generative-ai-policies (Haziran 2026) ·
        group.springernature.com AI guidance · open.ieee.org author guidelines
        (16 Nisan 2024) · publicationethics.org (13 Şubat 2023)
      </Source>
    </Slide>
  ),

  /* 35 · Beyan nasıl yazılır */
  () => (
    <Slide>
      <Eyebrow>Kopyalayıp uyarlayın</Eyebrow>
      <H2>Beyan metni nasıl yazılır?</H2>
      <Sub>
        Elsevier'in kendi önerdiği kalıp aşağıda. Üç şeyi söylüyor: hangi araç,
        ne için, ve sorumluluğun kimde olduğu.
      </Sub>
      <div className="mt-6">
        <Prompt>{`Declaration of generative AI and AI-assisted
technologies in the manuscript preparation process

During the preparation of this work the author(s)
used [ARAÇ ADI] in order to [SEBEP]. After using
this tool/service, the author(s) reviewed and
edited the content as needed and take(s) full
responsibility for the content of the publication.`}</Prompt>
      </div>
      <Fade delay={0.18}>
        <div className="mt-5">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2.5">
            Türkçe karşılığı — tez ve DergiPark dergileri için
          </div>
          <Prompt>{`Bu çalışmanın hazırlanma sürecinde [ARAÇ ADI,
SÜRÜM] [HANGİ AŞAMA — ör. dil ve anlatım
düzeltmesi] amacıyla kullanılmıştır. Aracın
çıktıları yazar(lar) tarafından gözden geçirilmiş
ve düzenlenmiştir; içeriğin bilimsel ve etik
sorumluluğunun tamamı yazar(lar)a aittir.`}</Prompt>
        </div>
      </Fade>
      <Fade delay={0.25}>
        <div className="mt-5 grid md:grid-cols-2 gap-4">
          <div className="ai-card p-5">
            <div className="text-white font-semibold mb-2">İyi bir sebep ifadesi</div>
            <p className="text-sm text-white/55 leading-relaxed">
              “to improve the readability and language of the manuscript” —
              somut ve sınırlı.
            </p>
          </div>
          <div className="ai-card p-5">
            <div className="text-white font-semibold mb-2">Kaçınılması gereken</div>
            <p className="text-sm text-white/55 leading-relaxed">
              “to write the paper” — bu ifade beyan değil, yazarlık sorunudur.
            </p>
          </div>
        </div>
      </Fade>
      <Source>
        elsevier.com — generative AI policies for journals (Haziran 2026).
        Türkçe kalıp, YÖK rehberinin istediği üçlüye göre yazıldı: araç adı,
        sürüm ve kullanıldığı aşama.
      </Source>
    </Slide>
  ),

  /* 36 · Hakem yasağı */
  () => (
    <Slide>
      <Eyebrow>Hakemlik yapıyorsanız</Eyebrow>
      <H1>
        Değerlendirdiğiniz makaleyi
        <br />
        <span style={{ color: ACCENT }}>yapay zekâya yükleyemezsiniz.</span>
      </H1>
      <Sub>
        Hem Elsevier hem Springer Nature açıkça yasaklıyor: hakem, kendisine
        gönderilen yayımlanmamış makaleyi ya da bir bölümünü yapay zekâ aracına
        yükleyemez. Gerekçe gizlilik ve yazarın mülkiyet hakkı.
      </Sub>
      <Fade delay={0.25}>
        <div className="ai-warn mt-9 px-6 py-5">
          <div className="flex items-start gap-4">
            <Lock className="w-5 h-5 shrink-0 mt-0.5" style={{ color: ACCENT }} />
            <p className="text-white/70 leading-relaxed">
              Hakem raporunuzu yazarken dil desteği aldıysanız bunu şeffafça
              beyan edin — ama makalenin kendisi araca girmemeli. Özet bile
              yüklememeniz gerekiyor.
            </p>
          </div>
        </div>
      </Fade>
      <Source>
        elsevier.com generative-ai-policies (Haziran 2026) ·
        group.springernature.com AI guidance
      </Source>
    </Slide>
  ),

  /* 37 · Görsel yasağı */
  () => (
    <Slide>
      <Eyebrow>Şekiller ve görseller</Eyebrow>
      <H2>Araştırma görseli üretilemez.</H2>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <h3 className="text-white font-semibold mb-2.5">Elsevier</h3>
            <p className="text-sm text-white/55 leading-relaxed">
              Birincil araştırma görselleri — mikroskopi, western blot, tarama,
              hasta görüntüsü — yapay zekâ ile üretilemez veya değiştirilemez.
            </p>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <h3 className="text-white font-semibold mb-2.5">Springer Nature</h3>
            <p className="text-sm text-white/55 leading-relaxed">
              Üretken yapay zekâ görselleri kural olarak yayımlanamıyor.
              Sınırlı istisnalar açıkça “AI-generated” etiketiyle
              işaretlenmek zorunda.
            </p>
          </div>
        </Fade>
      </div>
      <Fade delay={0.26}>
        <p className="mt-6 text-white/50 leading-relaxed max-w-3xl">
          Kavramsal şema, akış diyagramı ve sunum görseli başka; veriyi temsil
          eden şekil başka. Bu ayrımı korumak, iyi niyetli bir kullanımın
          suistimal gibi görünmesini engelliyor.
        </p>
      </Fade>
      <Source>
        elsevier.com generative-ai-policies · group.springernature.com AI
        guidance
      </Source>
    </Slide>
  ),

  /* 38 · Halüsinasyon */
  () => (
    <Slide>
      <Eyebrow>En çok yakan hata</Eyebrow>
      <H2>Uydurma atıf nasıl anlaşılır?</H2>
      <Sub>
        Model, gerçek yazar adlarıyla var olmayan bir makale başlığını
        birleştirebiliyor. Sonuç ikna edici görünüyor ve dergiye gönderilene
        kadar fark edilmiyor. Dört hızlı denetim:
      </Sub>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <Fade delay={0.06}>
          <Card icon={FileSearch} title="DOI'yi açın">
            Her DOI doi.org/&lt;numara&gt; adresinde açılmalı. Açılmıyorsa o
            kaynak yok demektir. En hızlı denetim budur.
          </Card>
        </Fade>
        <Fade delay={0.12}>
          <Card icon={AlertTriangle} title="Fazla uygun başlıklara dikkat">
            İhtiyacınız olan şeyi tam olarak söyleyen, aradığınız yılda
            yayımlanmış bir makale — fazla iyi görünüyorsa iki kez bakın.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={Table2} title="Cilt, sayı, sayfa tutuyor mu">
            Dergi gerçek ama cilt/sayfa uydurma olabilir. Derginin kendi
            sayfasından karşılaştırın.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={ShieldCheck} title="Yazarı sorgulayın">
            Yazar gerçek ama o konuda çalışmıyorsa, başlık büyük olasılıkla
            uydurmadır.
          </Card>
        </Fade>
      </div>
      <div className="ai-warn mt-5 px-5 py-3">
        <p className="text-sm text-white/70 leading-relaxed">
          Bu denetimi elle yapmak yorucu. osmancancetlenbik.com/araclar
          adresinde, kaynakçanızdaki her DOI&apos;yi tek tek sorgulayıp gerçekten
          var olup olmadığını gösteren ücretsiz bir araç var.
        </p>
      </div>
    </Slide>
  ),

  /* 38b · Uydurma künye — sökülmüş hâli */
  () => (
    <Slide>
      <Eyebrow>Neye benzediğini görün</Eyebrow>
      <H2>Uydurma bir künye böyle görünüyor.</H2>
      <Sub>
        Aşağıdaki künye bu slayt için uyduruldu; kimseye ait değil. İşi zor
        yapan şey şu: parçaların çoğu gerçek. Yalnızca ikisi uydurma ve tam da
        onlar göze çarpmıyor.
      </Sub>
      <Fade delay={0.15}>
        <div className="ai-card mt-6 px-6 py-5 font-mono text-[15px] leading-[1.9]">
          <span className="text-white/75">Yılmaz, A., &amp; Demir, K. (2021).</span>{" "}
          <span style={{ color: ACCENT }}>
            Artificial intelligence literacy in higher education: A systematic
            review.
          </span>{" "}
          <span className="text-white/75">Computers &amp; Education, 168</span>,{" "}
          <span style={{ color: ACCENT }}>104&ndash;119</span>.{" "}
          <span style={{ color: ACCENT }}>
            https://doi.org/10.1016/j.compedu.2021.104187
          </span>
        </div>
      </Fade>
      <Fade delay={0.28}>
        <div className="mt-5 grid md:grid-cols-2 gap-x-8 gap-y-2.5">
          {[
            [true, "Computers & Education", "Gerçek dergi, gerçek cilt numarası. Modelin en sağlam bildiği parça bu — ve künyeye güvenilirliğini veren de bu."],
            [true, "Yılmaz, A., & Demir, K.", "Gerçek olabilecek adlar. Var olan bir araştırmacının adı, hiç yazmadığı bir makaleye iliştirilebiliyor."],
            [false, "Makale başlığı", "Böyle bir makale yok. Aradığınız şeyi fazlasıyla tam söylemesi ilk şüphe sebebi."],
            [false, "DOI ve sayfa aralığı", "doi.org adresinde açılmıyor. Biçim kusursuz, karşılığı yok. Belirleyici tek denetim bu."],
          ].map(([gercek, baslik, aciklama]) => (
            <div key={String(baslik)} className="flex gap-3">
              <span className="shrink-0 pt-0.5">
                {gercek ? (
                  <Check className="w-4 h-4 text-white/30" aria-label="gerçek" />
                ) : (
                  <X className="w-4 h-4" style={{ color: ACCENT }} aria-label="uydurma" />
                )}
              </span>
              <span>
                <span className="text-white/85 text-sm font-semibold">{baslik}</span>
                <span className="block text-sm text-white/50 leading-relaxed mt-0.5">
                  {aciklama}
                </span>
              </span>
            </div>
          ))}
        </div>
      </Fade>
      <Fade delay={0.42}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed max-w-3xl">
          Gözle ayıklamaya çalışmayın — dört parçadan üçü tutuyorken insan
          gözü dördüncüyü atlıyor. Tek güvenilir yol DOI&apos;yi açmak.
        </p>
      </Fade>
    </Slide>
  ),

  /* 39 · Veri gizliliği */
  () => (
    <Slide>
      <Eyebrow>Veriniz nereye gidiyor</Eyebrow>
      <H2>Bir ayar, iki çok farklı sonuç.</H2>
      <Sub>
        Ücretsiz, Pro ve Max planlarında sohbetlerinizin modeli geliştirmek
        için kullanılmasına izin verip vermemek sizin elinizde. Seçiminiz
        saklama süresini kökten değiştiriyor.
      </Sub>
      <div className="mt-8">
        <CompareBars
          unit=" gün"
          items={[
            {
              label: "Model eğitimine izin verirseniz",
              value: 1825,
              caption:
                "Beş yıl. Yeni ve devam ettirilen sohbetler kimliksizleştirilmiş biçimde saklanıyor ve model eğitiminde kullanılıyor.",
            },
            {
              label: "İzin vermezseniz",
              value: 30,
              muted: true,
              caption:
                "Otuz gün. Eğitimde hiç kullanılmıyor. Ayarı istediğiniz zaman değiştirebiliyorsunuz.",
            },
          ]}
        />
      </div>
      <div className="ai-warn mt-5 px-5 py-3">
        <p className="text-sm text-white/70 leading-relaxed">
          <strong className="text-white">Kapsam dışı planlar:</strong>{" "}Team,
          Enterprise, Government, Education ve API. Bunlar ticari şartlara tabi
          ve bu değişikliğin dışında — etik kurul başvurusunda bu ayrım
          belirleyici olabiliyor.
        </p>
      </div>
      <Source>
        anthropic.com/news/updates-to-our-consumer-terms (28 Ağustos 2025) ·
        privacy.claude.com (güncelleme 1 Temmuz 2026)
      </Source>
    </Slide>
  ),

  /* 40 · Neyi vermezsiniz */
  () => (
    <Slide>
      <Eyebrow>Kontrol listesi</Eyebrow>
      <H2>Araca yüklemeden önce durun.</H2>
      <Sub>
        Aşağıdakiler, kurum politikanız ne olursa olsun iki kez düşünmeniz
        gereken içerikler.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-x-8 gap-y-3">
        {[
          "Hakemliğini yaptığınız yayımlanmamış makale",
          "Etik kurul onayına bağlı ham katılımcı verisi",
          "Öğrenci kimlik bilgisi, notu, sağlık raporu",
          "Henüz yayımlanmamış tez ve patent başvurusu",
          "Gizlilik sözleşmesi olan sanayi projesi verisi",
          "Kurum içi yazışma ve personel dosyası",
        ].map((t, i) => (
          <Fade key={t} delay={0.06 * i}>
            <div className="flex items-start gap-3">
              <Ban className="w-4 h-4 shrink-0 mt-1 text-white/35" />
              <span className="text-white/65 leading-relaxed">{t}</span>
            </div>
          </Fade>
        ))}
      </div>
      <Fade delay={0.4}>
        <div className="ai-warn mt-7 px-5 py-3.5">
          <p className="text-sm text-white/70 leading-relaxed">
            Kişisel veri içeren bir belgeyle çalışmanız gerekiyorsa, önce
            adları ve numaraları temizleyin. osmancancetlenbik.com/araclar
            adresinde bunu tarayıcıda yapan ücretsiz bir araç var — metin
            bilgisayarınızdan çıkmıyor.
          </p>
        </div>
      </Fade>
    </Slide>
  ),

  /* 41 · Devredemeyecekleriniz */
  () => (
    <Slide>
      <Eyebrow>Değişmeyen kısım</Eyebrow>
      <H2>Devredemeyeceğiniz dört şey.</H2>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.06}>
          <Card icon={ShieldCheck} title="Sorumluluk">
            Elsevier&apos;in beyan kalıbı size “içeriğin tüm sorumluluğunu
            üstlenirim” cümlesini imzalatıyor. “Yapay zekâ yazdı” savunması
            o imzadan sonra hükümsüz.
          </Card>
        </Fade>
        <Fade delay={0.12}>
          <Card icon={FileSearch} title="Doğrulama">
            Ölçüt tek ve nesnel: DOI açılıyor mu. Açılmıyorsa künye uydurmadır
            — ne kadar inandırıcı göründüğünün önemi yok.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={FlaskConical} title="Yorum">
            Yayıncıların yazarlığı insana bağlama gerekçesi tam olarak bu:
            bulguyu savunmak, sınırlılığını söylemek ve eleştiriye cevap
            vermek bir araçtan istenemiyor.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Users} title="Etik karar">
            KVKK, kişisel veriyi yurt dışına aktarmayı 9. madde koşullarına
            bağlıyor ve açık rıza tek başına yetmiyor. Neyin araca
            girmeyeceğine karar vermek devredilebilir bir iş değil.
          </Card>
        </Fade>
      </div>
      <Source>
        elsevier.com generative-ai-policies (Haziran 2026) · 6698 sayılı KVKK
        md. 9
      </Source>
    </Slide>
  ),

  /* Bölüm 7 · Türkiye'de durum */
  () => (
    <Divider
      num="7"
      title="Türkiye'de durum"
      subtitle="Uluslararası yayıncıların kuralları bir yana — burada sizi bağlayan dört ayrı belge var."
      icerik={[
        "YÖK rehberi",
        "TÜBİTAK kuralları",
        "KVKK ve veri",
        "Üniversite yönergeleri",
        "Yönerge yoksa ne yapmalı",
      ]}
    />
  ),

  /* Dört belge */
  () => (
    <Slide>
      <Eyebrow>Genel harita</Eyebrow>
      <H2>Yapay zekâ kanunu yok — ama dört belge var.</H2>
      <Sub>
        Türkiye&apos;de yapay zekâyı doğrudan düzenleyen bir kanun
        bulunmuyor. Yerine dört ayrı belge işliyor ve her biri farklı bir
        aşamada karşınıza çıkıyor.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.06}>
          <Card icon={GraduationCap} title="YÖK · Mayıs 2024">
            Üretken yapay zekâ etik rehberi. Bağlayıcı yönetmelik değil,
            rehber — ama tüm üniversitelere gönderildi ve disiplin
            sorumluluğuna atıf yapıyor.
          </Card>
        </Fade>
        <Fade delay={0.12}>
          <Card icon={FlaskConical} title="TÜBİTAK · Ocak 2026">
            Destek süreçlerinde kullanım rehberi, dördüncü sürüm. Proje
            başvurusunda beyan zorunlu, hakemlikte kullanım tamamen yasak.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={Lock} title="KVKK · Kasım 2025">
            Üretken yapay zekâ ve kişisel verilerin korunması rehberi.
            Yurt dışındaki bir araca veri girmek “yurt dışına aktarım”
            sayılıyor.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={ClipboardList} title="Üniversite yönergeleri">
            Ankara, Doğuş ve Özyeğin kendi senato kararlarını yayımladı.
            Üçü de yasaklamıyor — beyan ve koşul temelli serbestlik getiriyor.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed max-w-3xl">
          Dikkat: <strong className="text-white/70">TR Dizin ve ÜAK</strong>{" "}
          bu alanda henüz kural yayımlamadı. TR Dizin kriterlerinde yapay zekâ
          maddesi yok; beyan zorunluluğu dergi düzeyinde uygulanıyor.
        </p>
      </Fade>
      <Source>
        proje.yok.gov.tr · tubitak.gov.tr ÜYZ Rehberi v04 · kvkk.gov.tr
        Yayın No 113 · trdizin.gov.tr/kriterler · uak.gov.tr — erişim 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* YÖK rehberi */
  () => (
    <Slide>
      <Eyebrow>YÖK · Mayıs 2024</Eyebrow>
      <H2>Rehber ne diyor?</H2>
      <Sub>
        “Yükseköğretim Kurumları Bilimsel Araştırma ve Yayın Faaliyetlerinde
        Üretken Yapay Zekâ Kullanımına Dair Etik Rehber.” Yönetmelik değil,
        rehber — ama son maddedeki uyarı ciddi.
      </Sub>
      <div className="mt-6 space-y-2.5">
        {[
          ["Yazarlık", "“Üretken yapay zekâ, bir çalışmanın nihai halinin sorumluluğunu bir araştırmacı gibi alamayacağı için bilimsel çalışmalarda yazar olarak yer alamaz.”"],
          ["Nerede kullanılmamalı", "Hipotez geliştirme, tartışma, yorumlama ve uygulama gibi üst düzey uzmanlık gerektiren aşamalar kapsam dışı."],
          ["Nereye yazılır", "Kullanılan bölümler yöntem kısmında açıklanmalı; aracın adı, versiyonu ve hangi aşamada kullanıldığı belirtilmeli."],
          ["Etik kurul", "Başvuruda yapay zekâ kullanımı konusunda kurula bilgi verilmeli."],
          ["Anketler", "Gerçek katılımcılar yerine yapay zekâ kullanılamaz."],
        ].map(([k, v], i) => (
          <Fade key={k} delay={0.06 * i}>
            <div className="ai-card px-5 py-3.5 grid md:grid-cols-[9rem_1fr] gap-4">
              <span
                className="font-mono text-[11px] uppercase tracking-[0.16em] pt-0.5"
                style={{ color: ACCENT }}
              >
                {k}
              </span>
              <span className="text-sm text-white/60 leading-relaxed">{v}</span>
            </div>
          </Fade>
        ))}
      </div>
      <div className="ai-warn mt-5 px-5 py-3.5">
        <p className="text-sm text-white/70 leading-relaxed">
          Rehberin kendi cümlesi:{" "}
          <em>“Bu hususların göz ardı edilmesi, şartları çerçevesinde disiplin
          sorumluluğuna yol açacaktır.”</em>{" "}Yani bağlayıcı bir yönetmelik
          olmasa da sonucu var.
        </p>
      </div>
      <Source>
        proje.yok.gov.tr — Üretken Yapay Zekâ Kullanımına Dair Etik Rehber,
        Mayıs 2024. Not: YÖK Yayın Etiği Yönergesi 28/8/2025&apos;te
        güncellendi ama yapay zekâ maddesi eklenmedi.
      </Source>
    </Slide>
  ),

  /* TÜBİTAK */
  () => (
    <Slide>
      <Eyebrow>TÜBİTAK · Ocak 2026 · en katı kurallar</Eyebrow>
      <H1>
        Hakemlik yapıyorsanız
        <br />
        <span style={{ color: ACCENT }}>kullanımı kesinlikle yasak.</span>
      </H1>
      <Sub>
        TÜBİTAK rehberi değerlendiricilere ait bölümde araçları isim vererek
        sayıyor — GPT, Gemini ve Claude dahil. Yasak; metni özetlemeyi, güçlü
        ve zayıf yön belirlemeyi, rapor taslağı yazdırmayı, hatta
        değerlendirmeyle ilgili e-posta taslağı hazırlatmayı kapsıyor.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.1}>
          <div className="ai-card p-5">
            <div
              className="font-mono text-[11px] uppercase tracking-[0.18em] mb-2.5"
              style={{ color: ACCENT }}
            >
              Başvuru sahibi olarak
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>· <strong className="text-white">Beyan zorunlu</strong>{" "}— başvuru sisteminde ayrı bölümde</li>
              <li>· Aracın adı, versiyonu, hangi aşamada ve nasıl kullanıldığı</li>
              <li>· Ara, gelişme ve sonuç raporlarını da kapsıyor</li>
              <li>· Sahte referans üretmek “uydurma” etik ihlali sayılıyor</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.18}>
          <div className="ai-card p-5">
            <div className="flex items-center gap-2 mb-2.5">
              <Ban className="w-4 h-4 text-white/40" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                Değerlendirici olarak
              </span>
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>· Hakem, panelist ve izleyiciler için <strong className="text-white">tam yasak</strong></li>
              <li>· “Herhangi bir amaçla” kullanım yasak</li>
              <li>· Gerekçe: KVKK 9. madde ve görevi kötüye kullanma</li>
              <li>· İhlalde etik kurul yaptırımları uygulanıyor</li>
            </ul>
          </div>
        </Fade>
      </div>
      <Fade delay={0.28}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed max-w-3xl">
          Uluslararası yayıncıların hakem yasağıyla birebir örtüşüyor. Fark şu:
          TÜBİTAK bunu isim vererek ve yaptırım maddesine bağlayarak yazmış.
        </p>
      </Fade>
      <Source>
        tubitak.gov.tr — Destek Süreçlerinde Üretken Yapay Zekânın Sorumlu ve
        Güvenilir Kullanımı Rehberi, v04, Ocak 2026
      </Source>
    </Slide>
  ),

  /* KVKK */
  () => (
    <Slide>
      <Eyebrow>KVKK · Kasım 2025</Eyebrow>
      <H2>Veriyi araca girmek “yurt dışına aktarım” sayılıyor.</H2>
      <Sub>
        Kullandığınız araçların sunucuları çoğunlukla yurt dışında. KVKK
        rehberi bu duruma özel bir başlık ayırmış: Türkiye&apos;de faaliyet
        gösteren bir veri sorumlusunun, yurt dışında yerleşik bir hizmet
        üzerinden kişisel veri işlemesi, Kanun&apos;un 9. maddesine tabi.
      </Sub>
      <Fade delay={0.2}>
        <div className="ai-warn mt-8 px-6 py-5">
          <p className="text-white/75 leading-relaxed text-lg">
            Bunun akademisyen için tek cümlelik karşılığı şu: yeterlilik kararı
            olmayan bir ülkeye ya da uygun güvenceler sağlanmadan yapılacak
            aktarım,{" "}
            <strong className="text-white">açık rıza olsa bile</strong>{" "}hukuka
            aykırı olabiliyor.
          </p>
        </div>
      </Fade>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <Fade delay={0.28}>
          <Card icon={ShieldCheck} title="Pratik sonuç">
            Katılımcı verisini araca vermeden önce anonimleştirin. Kimliksiz
            veri kişisel veri sayılmaz.
          </Card>
        </Fade>
        <Fade delay={0.34}>
          <Card icon={FlaskConical} title="Yerelde çalıştırın">
            Deşifre için Whisper&apos;ı kendi bilgisayarınızda çalıştırmak bu
            sorunu tamamen ortadan kaldırıyor.
          </Card>
        </Fade>
        <Fade delay={0.4}>
          <Card icon={ClipboardList} title="Etik kurula yazın">
            Hangi aracı hangi veriyle kullanacağınızı başvuruda belirtin. YÖK
            rehberi bunu zaten istiyor.
          </Card>
        </Fade>
      </div>
      <Source>
        kvkk.gov.tr — Üretken Yapay Zekâ ve Kişisel Verilerin Korunması
        Rehberi (15 Soruda), Yayın No 113, Kasım 2025 · KVKK m.9 ve
        10.07.2024 tarihli Yurt Dışına Aktarım Yönetmeliği
      </Source>
    </Slide>
  ),

  /* Üniversite yönergeleri */
  () => (
    <Slide>
      <Eyebrow>Üniversiteler ne yaptı</Eyebrow>
      <H2>Üçü de yasaklamadı.</H2>
      <Sub>
        Kendi yönergesini yayımlayan üniversitelerin ortak yaklaşımı aynı:
        yasak değil, beyan ve koşul temelli serbestlik. Kurumunuzun yönergesi
        yoksa bunlar iyi bir başlangıç noktası.
      </Sub>
      <div className="mt-6 overflow-x-auto">
        <table className="ai-table table-fixed">
          <thead>
            <tr>
              <th className="w-[26%]">Üniversite</th>
              <th className="w-[26%]">Karar</th>
              <th className="w-[48%]">Yaklaşım</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ankara Üniversitesi</td>
              <td>Senato · 20.08.2026</td>
              <td>Lisansüstü çalışmalar için beyanlı serbestlik + altı maddelik kesin yasak listesi</td>
            </tr>
            <tr>
              <td>Doğuş Üniversitesi</td>
              <td>Senato · 21.05.2026</td>
              <td>Üç kademe: yasaklı, koşullu ve serbest kullanım</td>
            </tr>
            <tr>
              <td>Özyeğin Üniversitesi</td>
              <td>Yürürlük · 01.01.2025</td>
              <td>Ders bazında öğretim üyesi takdiri: serbest, sınırlı ya da yasak</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Fade delay={0.3}>
        <div className="ai-warn mt-6 px-5 py-4">
          <p className="text-sm text-white/70 leading-relaxed">
            Ankara Üniversitesi yönergesinden iki cümle özellikle önemli:
            yapay zekâ tabanlı tespit araçlarından alınan raporlar{" "}
            <strong className="text-white">tek başına kanıt sayılamaz</strong>;
            ve benzerlik oranını düşürmek ya da tespit araçlarını aşmak açıkça
            yasak. Yasak kullanımlar{" "}
            <strong className="text-white">beyan edilse dahi</strong>{" "}
            sorumluluğu ortadan kaldırmıyor.
          </p>
        </div>
      </Fade>
      <Source>
        sosbilens.ankara.edu.tr · dogus.edu.tr yönergeler ·
        ozyegin.edu.tr ilkeler ve politikalar — erişim 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* Kurumunuzda yönerge yoksa */
  () => (
    <Slide>
      <Eyebrow>Uygulama</Eyebrow>
      <H2>Kurumunuzda yönerge yoksa ne yapmalı?</H2>
      <Sub>
        Üniversitelerin büyük kısmının henüz kendi yönergesi yok. Beklemek
        yerine bölüm düzeyinde bir sayfa yazmak, hem sizi hem öğrencinizi
        koruyor. Yönergesi olan üç üniversitenin ortak omurgası şu.
      </Sub>
      <div className="mt-6">
        <Steps
          items={[
            {
              t: "Kapsamı yazın",
              d: "Hangi çalışmalar için geçerli: lisans ödevi, lisansüstü tez, yayın, proje başvurusu. Kapsam belirsizse kural işlemiyor.",
            },
            {
              t: "Üç kademe tanımlayın",
              d: "Serbest (dil düzeltme, fikir üretme), beyanla serbest (taslak, kod, analiz), yasak (uydurma kaynak, veri üretme, tespit aracını aşma).",
            },
            {
              t: "Beyanın nereye yazılacağını söyleyin",
              d: "YÖK rehberi yöntem bölümünü işaret ediyor. Tez için ayrı bir beyan formu eklemek en temizi.",
            },
            {
              t: "Veri sınırını çizin",
              d: "Kişisel veri, gizli proje verisi ve yayımlanmamış çalışma dışarıda. KVKK gerekçesini bir cümleyle yazın.",
            },
            {
              t: "Tespit araçlarına ne kadar güvenileceğini yazın",
              d: "Ankara Üniversitesi yönergesindeki hüküm örnek alınabilir: dedektör raporu tek başına kanıt sayılmaz.",
            },
          ]}
        />
      </div>
      <Fade delay={0.42}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed max-w-3xl">
          Bu beş madde bir sayfaya sığıyor ve bölüm kurulundan geçirilebilir.
          Mükemmel bir yönerge beklerken kuralsız kalmak, ikisinin de en
          kötüsü.
        </p>
      </Fade>
    </Slide>
  ),

  /* Bölüm 8 · Araçlar ve uygulama */
  () => (
    <Divider
      num="8"
      title="Araçlar ve uygulama"
      subtitle="Anlattığım riskleri çözen ücretsiz araçlar ve bu hafta atabileceğiniz adımlar."
      icerik={[
        "On iki web aracı",
        "Slaytta çalışıyor",
        "Masaüstüne kurulum",
        "Otuz günlük plan",
        "Ekip ve kurum",
      ]}
    />
  ),

  /* 43 · Neden bu araçlar */
  () => (
    <Slide>
      <Eyebrow>Neden yaptım</Eyebrow>
      <H2>Anlatmak yetmiyor, kolaylaştırmak gerekiyor.</H2>
      <Sub>
        “Her atıfı doğrulayın”, “PDF'i 100 sayfanın altına bölün”, “kişisel
        veriyi temizleyin” demek kolay. Bunları elle yapmak yorucu olduğu için
        kimse yapmıyor. O yüzden yapan araçları yazdım — şu an on iki tane.
      </Sub>
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={ShieldCheck} title="Ücretsiz ve üyeliksiz">
            Hesap açmanız gerekmiyor, hiçbir şey ödemiyorsunuz.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={Lock} title="Dosyanız bilgisayarınızdan çıkmıyor">
            Çoğu araç tamamen tarayıcıda çalışıyor. Sunucuya yükleme yok.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Compass} title="Masaüstüne kurulabiliyor">
            Mac ve Windows'ta uygulama olarak kurulup internetsiz de
            çalışıyor.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <p
          className="mt-8 font-mono text-lg"
          style={{ color: ACCENT }}
        >
          osmancancetlenbik.com/araclar
        </p>
      </Fade>
    </Slide>
  ),

  /* 44 · Atıf denetleyici */
  () => (
    <Slide>
      <Eyebrow>Araç 1</Eyebrow>
      <H2>Atıf Denetleyici.</H2>
      <Sub>
        Kaynakçanızı yapıştırın; içindeki her DOI CrossRef veritabanında
        sorgulanır. Var olmayan kaynak kırmızıyla işaretlenir. Uydurma atıfı
        dergiye göndermeden önce yakalamanın en hızlı yolu.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <div
              className="font-mono text-[11px] uppercase tracking-[0.18em] mb-2.5"
              style={{ color: ACCENT }}
            >
              Ne gösterir
            </div>
            <ul className="space-y-1.5 text-sm text-white/55 leading-relaxed">
              <li>· Kaynağın gerçekten var olup olmadığını</li>
              <li>· Gerçek başlığı, yazarları, dergiyi ve yılı</li>
              <li>· Künyenizle kayıt arasındaki uyuşmazlığı</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2.5">
              Bilinmesi gereken
            </div>
            <ul className="space-y-1.5 text-sm text-white/55 leading-relaxed">
              <li>· Yalnızca DOI'si olan kaynakları denetler</li>
              <li>· Kitap ve bildirilerin çoğunda DOI yok</li>
              <li>· Bulunamayan kaynak illa uydurma değildir — elle bakın</li>
            </ul>
          </div>
        </Fade>
      </div>
      <Fade delay={0.26}>
        <div className="mt-6">
          <EmbeddedTool
            slug="atif-denetleyici"
            title="Atıf Denetleyici"
            hint="Kendi kaynakçanızı yapıştırıp burada deneyin — sunumdan çıkmanıza gerek yok."
          />
        </div>
      </Fade>
      <Fade delay={0.34}>
        <p className="mt-4 text-sm text-white/45">
          Metniniz hiçbir yere gönderilmiyor; yalnızca bulunan DOI numaraları
          sorgulanıyor.
        </p>
      </Fade>
    </Slide>
  ),

  /* 45 · PDF bölücü ve anonimleştirici */
  () => (
    <Slide>
      <Eyebrow>Araç 2 ve 3</Eyebrow>
      <H2>PDF Bölücü ve Anonimleştirici.</H2>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-6">
            <h3 className="text-white font-semibold text-lg mb-2">PDF Bölücü</h3>
            <p className="text-sm text-white/55 leading-relaxed mb-3">
              Büyük bir PDF'i sayfa aralığına ya da eşit parçalara böler.
              Varsayılan parça boyutu 100 sayfa — çünkü yapay zekâ araçları
              bunun üstünde görselleri okumuyor, yalnızca metni çıkarıyor.
            </p>
            <p className="text-xs text-white/40 leading-relaxed">
              Dosya tarayıcıdan hiç çıkmıyor. 400 sayfalık bir tez, dört
              parçaya bölünüp şekilleriyle birlikte incelenebilir hale geliyor.
            </p>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-6">
            <h3 className="text-white font-semibold text-lg mb-2">
              Anonimleştirici
            </h3>
            <p className="text-sm text-white/55 leading-relaxed mb-3">
              Metindeki e-posta, telefon, TC kimlik, öğrenci numarası, IBAN ve
              verdiğiniz isimleri temizler. Belgeyi bir araca vermeden önceki
              son adım.
            </p>
            <p className="text-xs text-white/40 leading-relaxed">
              Etik kurul başvurusu ve KVKK açısından somut karşılığı var:
              kişisel veri hiçbir zaman üçüncü tarafa gitmiyor.
            </p>
          </div>
        </Fade>
      </div>
      <Fade delay={0.26}>
        <div className="mt-5 grid md:grid-cols-2 gap-4">
          <EmbeddedTool
            slug="pdf-bolucu"
            title="PDF Bölücü"
            hint="Bir PDF seçip burada bölün, parçaları buradan indirin."
          />
          <EmbeddedTool
            slug="anonimlestirici"
            title="Anonimleştirici"
            hint="Metninizi yapıştırıp temizlenmiş hâlini görün."
          />
        </div>
      </Fade>
      <Fade delay={0.34}>
        <p className="mt-4 text-sm text-white/45 leading-relaxed">
          İkisi de tamamen tarayıcınızda çalışıyor — dosyanız bu sayfadan hiç
          çıkmıyor. İnternet bağlantınızı kesip de kullanabilirsiniz.
        </p>
      </Fade>
    </Slide>
  ),

  /* 46 · Diğer araçlar */
  () => (
    <Slide>
      <Eyebrow>Araç 4 – 12</Eyebrow>
      <H2>Her dönem lazım olanlar.</H2>
      <div className="mt-6 grid md:grid-cols-3 gap-3">
        {[
          ["Kaynakça Biçimlendirici", "DOI listesinden APA 7, IEEE ve Vancouver kaynakça üretir. Dergi değiştirince elle çevirmekten kurtarır."],
          ["BibTeX Üretici", "DOI'lerden LaTeX için hazır .bib dosyası. Anahtarlar Türkçe karakterlerden arındırılıyor, kısaltmalar korunuyor."],
          ["Türkçe Karakter Düzeltici", "“GÃ¶sterimler” gibi bozulmuş metni onarır. Dışa aktarılan CSV'lerde sık görülen sorun."],
          ["Metin İstatistikleri", "Kelime, karakter, okuma süresi. Dergi kelime sınırını takip eder; kaynakçayı sayım dışı bırakabilir."],
          ["PDF Birleştirici", "Birden çok PDF'i tek dosyada birleştirir, sırayı siz belirlersiniz. Başvuru dosyaları için."],
          ["Not Hesaplayıcı", "Ağırlıklı ortalama, harf notu dağılımı, çan eğrisi. Excel'in bozmadığı CSV olarak indirir."],
          ["Sınav Karıştırıcı", "Soru listesinden A/B/C formları ve cevap anahtarları. Aynı tohumla aynı sınav yeniden üretilebilir."],
          ["Yayın Listesi Düzenleyici", "Yayınları türe ve yıla göre gruplayıp numaralandırır. Akademik başvuru dosyaları için."],
          ["Likert Anket Özetleyici", "Madde bazında ortalama, standart sapma, dağılım ve Cronbach alfa. Ters kodlamayı destekler."],
        ].map(([t, d], i) => (
          <Fade key={t} delay={0.04 * i}>
            <div className="ai-card px-4 py-4 h-full">
              <div className="text-white text-sm font-semibold mb-1.5">{t}</div>
              <div className="text-[13px] text-white/50 leading-relaxed">{d}</div>
            </div>
          </Fade>
        ))}
      </div>
      <Fade delay={0.45}>
        <p className="mt-5 text-sm text-white/45">
          Onu tamamen tarayıcınızda çalışıyor; Atıf Denetleyici, Kaynakça
          Biçimlendirici ve BibTeX Üretici yalnızca DOI numarasını dışarıya
          sorguluyor — metniniz gitmiyor.
        </p>
      </Fade>
      <Fade delay={0.5}>
        <a
          href="/araclar"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold"
          style={{ background: ACCENT, color: "#000" }}
        >
          On iki aracın hepsini aç
        </a>
      </Fade>
    </Slide>
  ),

  /* 47 · Nasıl kurulur */
  () => (
    <Slide>
      <Eyebrow>Kurulum</Eyebrow>
      <H2>Masaüstünüze indirin.</H2>
      <Sub>
        Araçlar tarayıcıda açılıyor ama orada kalmak zorunda değil. Kurunca
        kendi penceresinde açılıyor, Dock&apos;a ya da görev çubuğuna iniyor
        ve internet olmadan da çalışıyor.
      </Sub>
      <div className="mt-7">
        <PlatformInstall />
      </div>
    </Slide>
  ),

  /* 49 · Üç adım */
  () => (
    <Slide>
      <Eyebrow>Bu hafta</Eyebrow>
      <H2>Üç adım.</H2>
      <div className="mt-8">
        <Steps
          items={[
            {
              t: "Gizlilik ayarınızı açıp bakın",
              d: "Ayarlar → Gizlilik. Model eğitimi tercihinizi bilinçli seçin. Beş yıl ile otuz gün arasındaki fark burada belirleniyor.",
            },
            {
              t: "Bir dersiniz için proje açın",
              d: "İzlence, kaynak ve geçen yılın sınavı. Sonra “bu haftanın quizini hazırla” deyin. Ücretsiz planda beş proje hakkınız var.",
            },
            {
              t: "Hedef derginizin politikasını okuyun",
              d: "Beyanın nereye yazılacağı dergiye göre değişiyor. Makaleyi göndermeden önce değil, yazmaya başlamadan önce bakın.",
            },
          ]}
        />
      </div>
    </Slide>
  ),

  /* 49b · 30 günlük plan */
  () => (
    <Slide>
      <Eyebrow>Dört hafta</Eyebrow>
      <H2>Alışkanlık hâline getirmenin planı.</H2>
      <Sub>
        Bir aracı bir kez denemek işe yaramıyor; iş akışınıza girmesi gerekiyor.
        Haftada bir yeni şey ekleyerek ilerleyin.
      </Sub>
      <div className="mt-8">
        <Timeline
          items={[
            {
              when: "1. hafta",
              title: "Sadece özet ve eleştiri",
              detail:
                "Okuduğunuz makaleleri özetletin, kendi paragraflarınızı eleştirtin. Hiçbir şey ürettirmeyin — önce nasıl düşündüğünü görün.",
            },
            {
              when: "2. hafta",
              title: "Bir ders projesi",
              detail:
                "En çok emek verdiğiniz dersi projeye taşıyın. Quiz ve örnek üretin, kaliteyi kendi standardınızla karşılaştırın.",
            },
            {
              when: "3. hafta",
              title: "Araştırma tarafı",
              detail:
                "Literatür taraması yaptırın ve her kaynağı doğrulayın. Kaç tanesinin gerçek olduğunu sayın — bu sayı güven ölçünüz.",
            },
            {
              when: "4. hafta",
              title: "Kendi kalıplarınız",
              detail:
                "En çok işe yarayan üç istemi kaydedin. Asıl kazanç burada başlıyor: her seferinde sıfırdan yazmıyorsunuz.",
            },
          ]}
        />
      </div>
    </Slide>
  ),

  /* 49c · Ekip ve laboratuvar */
  () => (
    <Slide>
      <Eyebrow>Tek başınıza değilseniz</Eyebrow>
      <H2>Laboratuvar ya da araştırma grubu için.</H2>
      <Sub>
        Bir ekipte herkesin kendi başına deneme yapması, hem tekrar hem de
        tutarsız kalite üretiyor. Dört basit kural bunu düzeltiyor.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.06}>
          <Card icon={ClipboardList} title="Ortak istem defteri">
            İşe yarayan istemleri paylaşılan bir belgede toplayın. Aynı işi
            beş kişinin beş farklı kalitede yapması engellensin.
          </Card>
        </Fade>
        <Fade delay={0.12}>
          <Card icon={Lock} title="Neyin yüklenmeyeceği yazılı olsun">
            Ham veri, hasta kaydı, yayımlanmamış tez. Sözlü kural
            unutuluyor; tek sayfalık yazılı kural unutulmuyor.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={PenLine} title="Beyan sorumlusu belirleyin">
            Ortak yazarlı makalede beyanı kimin yazacağı baştan belli olsun.
            Sonradan “ben kullanmadım” tartışması çıkmasın.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={FileSearch} title="Kim neyi doğruladı, yazılsın">
            Ortak yazarlı makalede kaynakçayı kimin açıp kontrol ettiği,
            sayıları kimin yeniden hesapladığı kayıtlı olsun. Uydurma bir atıf
            çıktığında “ben o bölümü yazmadım” cevabı hiçbir yayıncıda
            geçerli değil.
          </Card>
        </Fade>
      </div>
    </Slide>
  ),

  /* 50 · Sık yapılan hatalar */
  () => (
    <Slide>
      <Eyebrow>Kaçının</Eyebrow>
      <H2>En sık yapılan beş hata.</H2>
      <div className="mt-7 space-y-2.5">
        {[
          {
            t: "Atıfları doğrulamadan kullanmak",
            d: "En pahalı hata. Dergiye gidince geri dönüşü olmuyor ve itibar kaybı yaratıyor.",
          },
          {
            t: "Tek cümlelik istem yazıp “işe yaramıyor” demek",
            d: "Bağlam vermeden ortalama cevap gelir. Sorun araçta değil, istemde.",
          },
          {
            t: "İlk cevabı son cevap sanmak",
            d: "İlk çıktı taslaktır. İkinci ve üçüncü turda kaliteyi siz belirlersiniz.",
          },
          {
            t: "Gizli belgeyi araca yüklemek",
            d: "Hakemliğini yaptığınız makale, ham katılımcı verisi, öğrenci dosyası. Önce anonimleştirin ya da hiç yüklemeyin.",
          },
          {
            t: "Beyan etmeyi unutmak",
            d: "Kullanmak sorun değil; saklamak sorun. Beyan, işin en kolay ve en koruyucu kısmı.",
          },
        ].map((s, i) => (
          <Fade key={s.t} delay={0.07 * i}>
            <div className="ai-card px-5 py-3.5 flex items-start gap-4">
              <X className="w-4 h-4 shrink-0 mt-1 text-white/30" />
              <div>
                <div className="text-white font-medium">{s.t}</div>
                <div className="text-sm text-white/50 mt-0.5 leading-relaxed">
                  {s.d}
                </div>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </Slide>
  ),

  /* 51 · Kurumsal adım */
  () => (
    <Slide>
      <Eyebrow>Kurumsal</Eyebrow>
      <H2>Üniversitenizde konuşmak isterseniz.</H2>
      <Sub>
        Claude for Education bireysel değil kurumsal bir anlaşma. Rektörlüğe ya
        da bilgi işleme götürülecek bir öneri, şu üç soruya cevap verdiğinde
        ciddiye alınıyor.
      </Sub>
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={Users} title="Kimi kapsayacak">
            Bir bölüm mü, tüm kampüs mü? Öğrenci dahil mi? Kapsam, fiyatı
            belirleyen ilk değişken.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={Lock} title="Veri nereye gidecek">
            Kurumsal planlar tüketici veri politikasının dışında. Bilgi
            işlemin ilk sorusu bu olacak.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Table2} title="Başarı nasıl ölçülecek">
            Kaç ders kullandı, hangi işi kısalttı? Ölçüsü olmayan pilot ikinci
            yıl bütçe bulamıyor.
          </Card>
        </Fade>
      </div>
      <Source>
        claude.com/contact-sales/education-plan — kurumlar Anthropic eğitim
        ekibiyle iletişime geçiyor
      </Source>
    </Slide>
  ),

  /* Kapanış bloğu */
  () => (
    <Divider
      title="Kapanış"
      subtitle="Anlatılanların tek slaytlık özeti, sık sorulanlar ve kaynakça."
      icerik={[
        "Tek slaytta özet",
        "Sık sorulan altı soru",
        "Kaynakça",
        "Birlikte çalışmak",
      ]}
    />
  ),

  /* 52 · Tek slaytta özet */
  () => (
    <Slide>
      <Eyebrow>Özet</Eyebrow>
      <H2>Hatırlanması gereken on şey.</H2>
      <div className="mt-7 grid md:grid-cols-2 gap-x-8 gap-y-3">
        {[
          "Ücretsiz plan sandığınızdan çok şey yapıyor — önce sınırına çarpın.",
          "Pro 20 USD/ay, yıllıkta 17. API bu fiyata dahil değil.",
          "Araştırma grubu yürüten fen/mühendislik akademisyenlerine ücretsiz Claude Team koltuğu var — dünya geneline açık, 10.000 koltuk.",
          "Öğrencilerinize Campus Program'ı söyleyin: 3.600 dolar, dünya çapına açık.",
          "İstem kalitesi = sonuç kalitesi. Bağlam vermeden ortalama cevap gelir.",
          "Her atıfı açıp doğrulayın. Uydurma kaynak en pahalı hatadır.",
          "Beyan zorunlu, yeri yayıncıya göre değişiyor. Hakem makaleyi yükleyemez.",
          "Gizlilik ayarınız 5 yıl ile 30 gün arasındaki farkı belirliyor.",
          "Türkiye'de dört belge işliyor: YÖK rehberi, TÜBİTAK kuralları, KVKK ve üniversite yönergeleri.",
          "TÜBİTAK hakemlikte yapay zekâ kullanımını isim vererek yasaklıyor.",
        ].map((t, i) => (
          <Fade key={t} delay={0.05 * i}>
            <div className="flex items-start gap-3">
              <span
                className="font-mono text-xs shrink-0 pt-1"
                style={{ color: ACCENT }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-white/65 leading-relaxed">{t}</span>
            </div>
          </Fade>
        ))}
      </div>
    </Slide>
  ),

  /* Sık sorulanlar */
  () => (
    <Slide>
      <Eyebrow>Sık sorulanlar</Eyebrow>
      <H2>En çok sorulan altı soru.</H2>
      <div className="mt-6 grid md:grid-cols-2 gap-x-8 gap-y-5">
        {[
          [
            "“Öğrencilerim tembelleşmez mi?”",
            "Hesap makinesi de aynı endişeyle karşılandı. Sorun araçta değil, ölçmede: ezberi ölçen ödev tembelleştirir, düşünmeyi ölçen ödev güçlendirir.",
          ],
          [
            "“Ben yazmayı seviyorum, neden kullanayım?”",
            "Kullanmayın. Ama biçim uyarlama, kaynakça çevirme ve deşifre gibi işleri de sevdiğinizden emin olun — kazanç orada.",
          ],
          [
            "“Verdiğim veri başkasına gider mi?”",
            "Ücretsiz ve Pro planlarda ayarınıza bağlı. Kapatırsanız eğitimde kullanılmıyor ve 30 günde siliniyor. Kurumsal planlar zaten kapsam dışı.",
          ],
          [
            "“Yazdığımı yapay zekâ mı sanacaklar?”",
            "Tespit araçları ana dili İngilizce olmayanları yanlışlıkla işaretliyor. Korunma yolu: taslaklarınızı ve düzeltme geçmişinizi saklayın.",
          ],
          [
            "“Bu bir moda değil mi?”",
            "Olabilir. Ama dört büyük yayın kuruluşu buna göre kural yazdı ve üniversiteler yönerge çıkarıyor. Moda olsa bile kuralları bilmek gerekiyor.",
          ],
          [
            "“Türkçede iyi mi?”",
            "Genel yazışmada iyi; alan terminolojisinde ve eski dilli metinlerde zayıf. Türkçe çıktıyı mutlaka okuyun, İngilizceden çeviri kokusu kalabiliyor.",
          ],
        ].map(([q, a], i) => (
          <Fade key={q} delay={0.05 * i}>
            <div>
              <div className="text-white font-medium mb-1.5">{q}</div>
              <div className="text-sm text-white/50 leading-relaxed">{a}</div>
            </div>
          </Fade>
        ))}
      </div>
    </Slide>
  ),

  /* 53 · Kaynaklar */
  () => (
    <Slide>
      <Eyebrow>Kaynaklar</Eyebrow>
      <H2>Her şeyi kendiniz doğrulayın.</H2>
      <Sub>
        Bu sunumdaki bilgiler 4 Eylül 2026&apos;da erişilen resmî sayfalardan
        alındı. Yapay zekâ tarafında kurallar hızlı değişiyor — okuduğunuz
        tarihte tekrar bakın.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-x-10 gap-y-2 font-mono text-[13px] text-white/45">
        {[
          "claude.com/pricing",
          "claude.com/solutions/education",
          "claude.com/programs/campus",
          "claude.com/programs/team-plan-for-scientists",
          "anthropic.com/supported-countries",
          "anthropic.com/news/claude-for-teachers",
          "anthropic.com/news/updates-to-our-consumer-terms",
          "privacy.claude.com",
          "support.claude.com — Projects, Artifacts, dosya limitleri",
          "claude.com/docs/office-agents/excel",
          "elsevier.com — generative AI policies",
          "group.springernature.com — AI guidance",
          "open.ieee.org — author guidelines",
          "publicationethics.org — authorship and AI tools",
          "proje.yok.gov.tr — YÖK üretken yapay zekâ etik rehberi",
          "tubitak.gov.tr — ÜYZ Rehberi v04, Ocak 2026",
          "kvkk.gov.tr — Üretken Yapay Zekâ Rehberi, Yayın No 113",
          "arxiv.org/abs/2508.13044 — TR-MMLU",
        ].map((u, i) => (
          <Fade key={u} delay={0.03 * i}>
            <div className="flex items-baseline gap-2.5">
              <span style={{ color: ACCENT }}>·</span>
              <span>{u}</span>
            </div>
          </Fade>
        ))}
      </div>
    </Slide>
  ),

  /* 53b · Birlikte çalışalım */
  () => (
    <Slide>
      <Eyebrow>Birlikte çalışalım</Eyebrow>
      <H1>Bu işi kurumunuza taşıyalım mı?</H1>
      <Sub>
        Bu sunumu okurken “bizim bölümde de böyle bir oturum olsa” diye
        düşündüyseniz, konuşalım. Aynı içeriği kurumunuzun alanına ve
        ihtiyacına göre yeniden kurgulayabiliriz.
      </Sub>
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={Users} title="Kuruma özel seminer">
            Fakültenize ya da bölümünüze özel, alanınızın örnekleriyle
            hazırlanmış yerinde ya da çevrimiçi oturum.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={ClipboardList} title="Atölye ve uygulama">
            Katılımcıların kendi makalesi ve kendi dersiyle çalıştığı,
            sonunda elinde somut çıktıyla ayrıldığı uygulamalı atölye.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={FlaskConical} title="Ortak araştırma">
            Yapay zekâ, doğal dil işleme ve siber güvenlik alanlarında ortak
            yayın, proje başvurusu ve tez eş danışmanlığı.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.34}>
        <div className="mt-9 ai-card px-7 py-6 flex flex-wrap items-center justify-between gap-5">
          <div>
            <div className="text-white/45 text-sm mb-1.5">
              Yazmanız yeterli — genellikle iki iş günü içinde dönüş yapıyorum.
            </div>
            <div
              className="font-mono text-xl md:text-2xl"
              style={{ color: ACCENT }}
            >
              osman.cetlenbik@cbu.edu.tr
            </div>
          </div>
          <div className="font-mono text-sm text-white/40 leading-relaxed">
            Öğr. Gör. Osman Can Çetlenbik
            <br />
            Manisa Celal Bayar Üniversitesi
            <br />
            osmancancetlenbik.com
          </div>
        </div>
      </Fade>
    </Slide>
  ),

  /* 54 · Kapanış */
  () => (
    <div className="relative w-full h-full flex items-center justify-center px-10">
      <Grid />
      <div
        aria-hidden
        className="absolute -inset-x-40 top-1/3 h-96 blur-[140px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${ACCENT}22, transparent 70%)` }}
      />
      <div className="relative text-center max-w-3xl">
        <Fade>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white leading-[1.1]">
            Araç iyi.
            <br />
            <span style={{ color: ACCENT }}>Sorumluluk hâlâ sizde.</span>
          </h2>
        </Fade>
        <Fade delay={0.15}>
          <p className="mt-7 text-lg text-white/55 leading-relaxed">
            Yapay zekâ akademisyenin işini bitirmiyor; sıkıcı kısmını kısaltıp
            düşünmeye vakit bırakıyor. Hangi kısmın sıkıcı, hangi kısmın işin
            kendisi olduğuna karar vermek de akademisyenliğin bir parçası.
          </p>
        </Fade>
        <Fade delay={0.28}>
          <div className="mt-10 ai-card inline-block px-7 py-5">
            <div className="text-white/45 text-sm mb-2">
              Sunumdaki araçlar — ücretsiz, üyeliksiz:
            </div>
            <div className="font-mono text-lg" style={{ color: ACCENT }}>
              osmancancetlenbik.com/araclar
            </div>
          </div>
        </Fade>
        <Fade delay={0.42}>
          <p className="mt-11 text-sm text-white/35 leading-relaxed">
            Zamanınızı geri almak için buradaki her şeyi kullanın.
            <br />
            İmzanız hâlâ sizin — orası devredilmiyor.
          </p>
        </Fade>
        <Fade delay={0.52}>
          <p className="mt-6 text-sm text-white/25 leading-relaxed">
            Faydalı bulduysanız paylaşın; meslektaşınızın da işine yarar.
          </p>
        </Fade>
      </div>
    </div>
  ),
];

export default function Presentation() {
  return (
    <DeckShell
      label="Akademisyenler için Yapay Zekâ · Claude"
      accent={ACCENT}
      slides={slides}
    />
  );
}
