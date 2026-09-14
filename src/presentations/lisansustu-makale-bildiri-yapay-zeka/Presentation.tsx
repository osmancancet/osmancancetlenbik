"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Ban,
  BookMarked,
  BookOpen,
  Bot,
  Braces,
  Calculator,
  Check,
  ClipboardList,
  Compass,
  Database,
  Eye,
  FileSearch,
  FileText,
  FlaskConical,
  Gauge,
  Globe,
  GraduationCap,
  History,
  Languages,
  Lightbulb,
  Link2,
  ListChecks,
  Lock,
  MessageSquare,
  Network,
  NotebookPen,
  PenLine,
  Quote,
  Scale,
  Search,
  ShieldCheck,
  Table2,
  Target,
  Users,
  X,
} from "lucide-react";
import { EmbeddedTool } from "../_shared/deck/EmbeddedTool";
import {
  BigStat,
  CompareBars,
  DecisionTree,
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
import {
  ClaudeProject,
  DeepLWrite,
  GeminiResearch,
  KDenseByok,
  KDenseWeb,
  NotebookLM,
} from "./Mockups";
import "./styles.css";

/**
 * Makale ve Bildiri Yazarken Yapay Zekâ — lisansüstüne yeni başlayanlar için.
 *
 * KİTLE: İlk makalesini ya da ilk bildirisini yazacak yüksek lisans /
 * doktora öğrencisi. Alan varsayımı yok; örnekler sosyal bilimden
 * mühendisliğe kadar genel tutuldu.
 *
 * KURGU: Sunum bir makalenin yazılma sırasını izliyor — konu, literatür,
 * okuma, yazma, kaynakça, gönderim. Her aşamada "araç ne yapar / siz ne
 * yaparsınız" ayrımı korunuyor. Halüsinasyon bölümü en uzun bölüm, çünkü
 * lisansüstü öğrencinin en pahalıya ödediği hata bu.
 *
 * İÇERİK KURALI: Her sayı, oran ve kural kaynağıyla birlikte slaydın altında.
 * Araç fiyatları sık değiştiği ve kaynaklar birbirini tutmadığı için bu
 * sunumda fiyat yazılmıyor; "ücretsiz katmanı var / yok" bilgisiyle
 * yetinildi. Halüsinasyon anlatan bir sunum kendi içinde uydurma sayı
 * taşımamalı.
 *
 * Erişim tarihi: 14 Eylül 2026.
 */

const ACCENT = "#4fc3a1";

/* ─── Yapı taşları ─────────────────────────────────────────────── */

function Grid() {
  return <div className="absolute inset-0 lz-grid-bg pointer-events-none" />;
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
    <div className="lz-card p-5 h-full">
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
  num?: string;
  title: string;
  subtitle: string;
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

/** Yan yana karşılaştırma — "böyle sorma / böyle sor". */
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
        <div className="lz-card p-5 h-full">
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
        <div className="lz-card p-5 h-full">
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
function Steps({ items }: { items: Array<{ t: string; d: string }> }) {
  return (
    <div className="space-y-2.5">
      {items.map((s, i) => (
        <Fade key={s.t} delay={0.06 * i}>
          <div className="lz-card px-5 py-3.5 flex items-start gap-4">
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

/** Etiketli küçük başlık — kartların üstünde. */
function Tag({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return (
    <div
      className="font-mono text-[11px] uppercase tracking-[0.18em] mb-2.5"
      style={{ color: muted ? "rgba(255,255,255,0.4)" : ACCENT }}
    >
      {children}
    </div>
  );
}


/** Araç arayüzü + numaralı adımlar. Çizimdeki işaretler sağdaki listeyle
 *  eşleşiyor; okuyan kişi "hangi düğme" sorusunu sormadan takip edebiliyor. */
function ScreenSlide({
  eyebrow,
  title,
  sub,
  mock,
  steps,
  note,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  mock: ReactNode;
  steps: Array<[string, string]>;
  note?: string;
}) {
  return (
    <Slide>
      <Eyebrow>{eyebrow}</Eyebrow>
      <H2>{title}</H2>
      {sub && <Sub>{sub}</Sub>}
      <div className="mt-6 grid md:grid-cols-[1.45fr_1fr] gap-6 items-start">
        <div>{mock}</div>
        <div className="space-y-2.5">
          {steps.map(([t, d], i) => (
            <Fade key={t} delay={0.25 + 0.07 * i}>
              <div className="flex items-start gap-3">
                <span
                  className="grid place-items-center w-5 h-5 shrink-0 mt-0.5 rounded-full font-mono text-[10px] font-semibold text-black"
                  style={{ background: ACCENT }}
                >
                  {i + 1}
                </span>
                <div>
                  <div className="text-white font-medium text-sm">{t}</div>
                  <div className="text-[13px] text-white/50 leading-relaxed mt-0.5">{d}</div>
                </div>
              </div>
            </Fade>
          ))}
          {note && (
            <Fade delay={0.6}>
              <p className="pt-2 text-[12px] text-white/40 leading-relaxed">{note}</p>
            </Fade>
          )}
        </div>
      </div>
    </Slide>
  );
}

/* ─── Slaytlar ─────────────────────────────────────────────────── */

const slides: Array<(active: boolean) => ReactNode> = [
  /* 01 · Kapak */
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
              Lisansüstüne yeni başlayanlar için · Eylül 2026
            </div>
          </Fade>

          <Fade delay={0.08}>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.03]">
              Makale ve bildiri yazarken
              <br />
              <span style={{ color: ACCENT }}>yapay zekâ</span>
            </h1>
          </Fade>

          <Fade delay={0.16}>
            <p className="lz-slogan mt-9 ps-6 py-1 text-2xl md:text-[2rem] font-medium text-white leading-snug">
              Araç arasın, siz karar verin.
            </p>
          </Fade>

          <Fade delay={0.24}>
            <p className="mt-8 text-lg text-white/50 leading-relaxed max-w-2xl">
              Konu bulmaktan kaynakçayı teslim etmeye kadar: hangi aşamada
              hangi aracı nasıl kullanırsınız, K-Dense&apos;i ve NotebookLM&apos;i
              adım adım nasıl çalıştırırsınız, uydurma kaynağı dergiye gitmeden
              nasıl yakalarsınız. Her sayının kaynağı slaydın altında.
            </p>
          </Fade>
        </div>

        <Fade delay={0.32}>
          <div className="flex md:flex-col gap-9 md:gap-6 md:border-s md:border-white/10 md:ps-9">
            {[
              [String(slides.length), "slayt"],
              ["10", "bölüm"],
              ["15", "istem kalıbı"],
              [`~${Math.round(slides.length * 0.4)} dk`, "okuma"],
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

  /* 02 · Kim için, ne var ne yok */
  () => (
    <Slide>
      <Eyebrow>Baştan netleştirelim</Eyebrow>
      <H1>İlk makaleniz için yazıldı.</H1>
      <Sub>
        Yüksek lisansa ya da doktoraya yeni başladınız; önünüzde ilk bildiri
        ya da ilk makale var. Bu sunum &ldquo;yapay zekâ ne kadar güçlü&rdquo;
        anlatmıyor; hangi işi hangi araca verip hangisini kendinize
        saklayacağınızı anlatıyor.
      </Sub>
      <div className="mt-8">
        <Versus
          left={{
            label: "Bulamayacağınız şeyler",
            items: [
              "“Makalenizi yapay zekâya yazdırın” tavsiyesi",
              "Tespit araçlarından kaçma yöntemi",
              "Kaynağı belirsiz istatistik",
              "Sık değişen ve doğrulanamayan fiyat bilgisi",
            ],
          }}
          right={{
            label: "Bulacağınız şeyler",
            items: [
              "K-Dense, NotebookLM, Gemini ve Claude'un ekran ekran kullanımı",
              "Kopyalayıp uyarlayabileceğiniz on beş istem kalıbı",
              "Uydurma kaynağı yakalamanın nesnel yöntemi",
              "Yayıncıların, YÖK'ün ve TÜBİTAK'ın beyan kuralları",
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
        Sunumun geri kalanı bu altı kelimeye dayanıyor. Biliyorsanız atlayın.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-x-8 gap-y-4">
        {[
          ["Büyük dil modeli", "ChatGPT, Claude, Gemini gibi araçların arkasındaki sistem. Metni, bir sonraki kelimeyi tahmin ederek üretiyor — bir veritabanına bakarak değil."],
          ["İstem (prompt)", "Modele yazdığınız yönerge. Sonucun kalitesini en çok belirleyen şey bu; sunumda on beş hazır kalıp var."],
          ["Halüsinasyon", "Modelin, doğruymuş gibi görünen ama var olmayan bilgi üretmesi: uydurma makale, uydurma sayı, uydurma alıntı. Lisansüstü öğrenciyi en çok yakan hata."],
          ["Kaynağa bağlı arama", "K-Dense, NotebookLM, Semantic Scholar gibi araçların yaptığı şey: cevabı önce gerçek belgeleri bulup onlara dayandırmak. Halüsinasyonu azaltan en önemli teknik."],
          ["Bağlam penceresi", "Modelin aynı anda aklında tutabildiği metin miktarı. Uzun bir tez ya da 40 makalelik bir literatür bu pencereye sığmayabilir."],
          ["Beyan", "Makale ya da tezde yapay zekâyı hangi aşamada, hangi araçla kullandığınızı yazdığınız cümle. Yayıncıların, YÖK'ün ve TÜBİTAK'ın istediği şey."],
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
      <H2>On bölüm — bir makalenin sırasıyla.</H2>
      <div className="mt-8 grid md:grid-cols-2 gap-2.5">
        {[
          ["1 · İlke", "Neyi devredersiniz, neyi asla — trafik ışığı"],
          ["2 · Araç haritası", "Sohbet modelleri, literatür araçları, hangisini seçmeli"],
          ["3 · Konu ve soru", "Araştırma sorusunu keskinleştirmek"],
          ["4 · Literatür", "K-Dense adım adım, kartopu, üç katmanlı strateji, Türkçe literatür"],
          ["5 · Okuma", "PDF ile çalışmak, NotebookLM, kaynakçayı DOI'den üretmek"],
          ["6 · Yazma", "Bölüm bölüm iş bölümü, İngilizce, bildiri özeti"],
          ["7 · Uçtan uca bir akış", "Yazarın kendi süreci: Gemini + NotebookLM → Claude → model eğitimi → yönetimli taslak → DeepL"],
          ["8 · Halüsinasyon", "Neden olur, nerede olur, nasıl yakalanır — en uzun bölüm"],
          ["9 · Kurallar", "Yayıncı beyanı, YÖK, TÜBİTAK, KVKK, tez"],
          ["10 · Uygulama", "Kontrol listesi, araçlar, ilk makale planı"],
        ].map(([t, d], i) => (
          <Fade key={t} delay={0.05 * i}>
            <div className="lz-card px-5 py-3 h-full">
              <div
                className="font-mono text-[11px] uppercase tracking-[0.18em] mb-1"
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

  /* ═══ Bölüm 1 · İlke ═══ */
  () => (
    <Divider
      num="1"
      title="İlke"
      subtitle="Aracı kullanmadan önce üç cümlelik bir çerçeve. Geri kalan her şey buna dayanıyor."
      icerik={["Yazar olamaz", "Trafik ışığı", "Makale süreci"]}
    />
  ),

  /* Yazar olamaz */
  () => (
    <Slide>
      <Eyebrow>Dört kurum, tek cevap</Eyebrow>
      <H1>Yapay zekâ yazar olamaz.</H1>
      <Sub>
        Elsevier, Springer Nature, IEEE ve COPE hemfikir; YÖK rehberi de aynı
        cümleyi kuruyor. Gerekçe ortak: yazarlık sorumluluk demektir ve bir
        araç sorumluluk üstlenemez. Bu, sunumun geri kalanındaki her kuralın
        kaynağı.
      </Sub>
      <Fade delay={0.2}>
        <div className="lz-card mt-8 px-7 py-6">
          <Quote className="w-5 h-5 mb-3 text-white/30" />
          <p className="text-lg text-white/70 leading-relaxed italic">
            &ldquo;Üretken yapay zekâ, bir çalışmanın nihai halinin
            sorumluluğunu bir araştırmacı gibi alamayacağı için bilimsel
            çalışmalarda yazar olarak yer alamaz.&rdquo;
          </p>
          <p className="mt-3 font-mono text-[11px] text-white/35">
            YÖK — Üretken Yapay Zekâ Kullanımına Dair Etik Rehber, Mayıs 2024
          </p>
        </div>
      </Fade>
      <Fade delay={0.3}>
        <p className="mt-6 text-white/50 leading-relaxed max-w-3xl">
          Pratik sonucu: makaleye imzayı siz atıyorsunuz. Aracın ürettiği her
          cümle, her sayı, her atıf gönderildiği anda sizin iddianız oluyor.
        </p>
      </Fade>
      <Source>
        proje.yok.gov.tr — Etik Rehber, Mayıs 2024 · elsevier.com generative-ai-policies
        (Haziran 2026) · group.springernature.com AI guidance · open.ieee.org
        (16 Nisan 2024) · publicationethics.org (13 Şubat 2023)
      </Source>
    </Slide>
  ),

  /* Trafik ışığı */
  () => (
    <Slide>
      <Eyebrow>Neyi devredebilirsiniz</Eyebrow>
      <H2>Üç renk, üç kural.</H2>
      <Sub>
        Yayıncı politikalarının ve YÖK rehberinin ortak paydası bu üç
        kümeye indirgenebiliyor. Bir işe başlamadan önce hangi renkte
        olduğuna bakın.
      </Sub>
      <div className="mt-7 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <div className="lz-card lz-light-green p-5 h-full">
            <Tag>Serbest</Tag>
            <ul className="space-y-1.5 text-sm text-white/60 leading-relaxed">
              <li>· Dil ve yazım düzeltmesi</li>
              <li>· Kendi yazdığınız paragrafı sıkılaştırma</li>
              <li>· Literatür arama ve eleme</li>
              <li>· Kavram açıklatma, öğrenme</li>
              <li>· Kendi metninizi eleştirtme</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="lz-card lz-light-amber p-5 h-full">
            <Tag>Beyanla serbest</Tag>
            <ul className="space-y-1.5 text-sm text-white/60 leading-relaxed">
              <li>· Taslak metin üretimi</li>
              <li>· Kod yazdırma ve veri analizi</li>
              <li>· Makale özetletme</li>
              <li>· Türkçe → İngilizce çeviri</li>
              <li>· Kavramsal şema ve şekil taslağı</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.24}>
          <div className="lz-card lz-light-red p-5 h-full">
            <Tag muted>Asla</Tag>
            <ul className="space-y-1.5 text-sm text-white/60 leading-relaxed">
              <li>· Doğrulamadığınız atıf kullanmak</li>
              <li>· Veri ya da katılımcı yanıtı üretmek</li>
              <li>· Araştırma görseli üretmek</li>
              <li>· Tespit aracını aşmaya çalışmak</li>
              <li>· Yazar ya da hakem olarak kullanmak</li>
            </ul>
          </div>
        </Fade>
      </div>
      <Source>
        Kümeleme, Elsevier · Springer Nature · IEEE politikaları ile YÖK
        (Mayıs 2024) ve TÜBİTAK (Ocak 2026) rehberlerinin ortak maddelerinden
        çıkarıldı. Derginizin ve enstitünüzün özel kuralı bunun üstüne gelir.
      </Source>
    </Slide>
  ),

  /* Makale süreci — sekiz adım 2×4 kart olarak; dikey akış 900px'lik
     ekrana sığmıyordu. */
  () => (
    <Slide>
      <Eyebrow>Bir makalenin sırası</Eyebrow>
      <H2>Sekiz aşama, her birinde iş bölümü.</H2>
      <div className="mt-6 grid md:grid-cols-4 gap-3">
        {[
          ["Konu ve soru", "Soruyu keskinleştirir, alternatif sorar", "Soruyu seçersiniz; danışmanla konuşursunuz"],
          ["Literatür tarama", "K-Dense ile ilk 30 makaleyi bulur", "Scholar ve TR Dizin'de doğrular, elersiniz"],
          ["Okuma ve not", "PDF'i özetler, sorunuza cevap arar", "Atıf yapacağınız makaleyi kendiniz okursunuz"],
          ["Tasarım ve veri", "Analiz kodu yazar, yöntem seçeneği sunar", "Veriyi toplarsınız; sonucu doğrularsınız"],
          ["Yazma", "Sizin taslağınızı eleştirir, sıkılaştırır", "İlk taslağı siz yazarsınız"],
          ["Kaynakça", "BibTeX'i DOI'den üretir", "Her DOI'yi açıp kontrol edersiniz"],
          ["Dil düzeltme", "İngilizceyi akıcılaştırır", "Anlam kaymadı mı diye okursunuz"],
          ["Gönderim", "Beyan metnini taslaklar", "Beyanı yazar, imzayı atarsınız"],
        ].map(([t, ai, you], i) => (
          <Fade key={t} delay={0.05 * i}>
            <div className="lz-card px-4 py-4 h-full flex flex-col">
              <div className="flex items-center gap-2.5 mb-3">
                <span
                  className="grid place-items-center w-6 h-6 rounded-full font-mono text-[11px] text-black shrink-0"
                  style={{ background: ACCENT }}
                >
                  {i + 1}
                </span>
                <span className="text-white font-semibold text-sm">{t}</span>
              </div>
              <div
                className="font-mono text-[10px] uppercase tracking-[0.16em] mb-1"
                style={{ color: ACCENT }}
              >
                Yapay zekâ
              </div>
              <div className="text-[13px] text-white/55 leading-relaxed">{ai}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40 mt-3 mb-1">
                Siz
              </div>
              <div className="text-[13px] text-white/70 leading-relaxed">{you}</div>
            </div>
          </Fade>
        ))}
      </div>
    </Slide>
  ),

  /* ═══ Bölüm 2 · Araç haritası ═══ */
  () => (
    <Divider
      num="2"
      title="Araç haritası"
      subtitle="Onlarca araç var; hepsi aynı işi yapmıyor. Dört kategori ve her birinde nereden başlanacağı."
      icerik={["Dört kategori", "Sohbet modelleri", "Literatür araçları", "Hangisini seçmeli"]}
    />
  ),

  /* Dört kategori */
  () => (
    <Slide>
      <Eyebrow>Genel görünüm</Eyebrow>
      <H2>Dört kategori — ve en kritik ayrım.</H2>
      <Sub>
        Araçları ikiye ayıran soru şu: cevabı{" "}
        <strong className="text-white/80">gerçek belgelere bakarak mı</strong>{" "}
        üretiyor, yoksa{" "}
        <strong className="text-white/80">ezberinden mi</strong>? Halüsinasyon
        riskinin tamamı bu ayrımda saklı.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.06}>
          <Card icon={MessageSquare} title="Sohbet modelleri">
            ChatGPT · Claude · Gemini · Copilot. Her şeyi yapar, hiçbirinde
            uzman değil. Web araması kapalıyken ezberinden konuşur — atıf
            için en riskli kategori.
          </Card>
        </Fade>
        <Fade delay={0.12}>
          <Card icon={Search} title="Literatür arama">
            K-Dense · Semantic Scholar · Research Rabbit · Connected Papers
            · Scite. Cevabı gerçek makalelerden kurar;
            uydurma kaynak üretmez, ama yanlış yorumlayabilir.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={BookOpen} title="Okuma ve not">
            NotebookLM · sohbet modellerine PDF yükleme. Verdiğiniz
            belgenin içinde kalır; belgede olmayan şeyi söylemesi için
            zorlamadıkça güvenli.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Languages} title="Dil ve biçim">
            DeepL Write · Paperpal · Grammarly · DOI&apos;den künye üreten
            araçlar. Yeni içerik üretmez; sizin yazdığınızı düzeltir.
            Dürüstlük riski en düşük kategori.
          </Card>
        </Fade>
      </div>
    </Slide>
  ),

  /* Sohbet modelleri */
  () => (
    <Slide>
      <Eyebrow>Kategori · sohbet modelleri</Eyebrow>
      <H2>Dördü de ücretsiz başlıyor.</H2>
      <div className="mt-6 overflow-x-auto">
        <table className="lz-table table-fixed">
          <thead>
            <tr>
              <th className="w-[18%]">Araç</th>
              <th className="w-[42%]">Lisansüstü için öne çıkan</th>
              <th className="w-[40%]">Dikkat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ChatGPT</td>
              <td>En yaygın; web araması ve dosya yükleme ücretsizde var</td>
              <td>Arama kapalıyken atıf ister misiniz? Uydurur. Aramayı açık tutun.</td>
            </tr>
            <tr>
              <td>Claude</td>
              <td>Uzun belgeyle çalışmada güçlü; Projects ile makale başına çalışma alanı</td>
              <td>Derin araştırma kipi ücretli planlarda</td>
            </tr>
            <tr>
              <td>Gemini</td>
              <td>Google hesabıyla gelir; NotebookLM ile aynı ekosistem</td>
              <td>Google Scholar ile bütünleşik değil — ayrı ayrı arayın</td>
            </tr>
            <tr>
              <td>Copilot</td>
              <td>Word&apos;ün içinde çalışır; üniversite Microsoft lisansı varsa hazır</td>
              <td>Kurum hesabıyla veri ayarları farklıdır; BT birimine sorun</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Fade delay={0.3}>
        <div className="lz-warn mt-5 px-5 py-3.5">
          <p className="text-sm text-white/70 leading-relaxed">
            <strong className="text-white">Tek kural:</strong>{" "}Hangisini
            kullanırsanız kullanın, kaynak isteyeceğiniz her soruda web
            aramasının açık olduğundan emin olun. Arama kapalı model, sizin
            için makale <em>bulmuyor</em>; makaleye <em>benzeyen</em> bir
            künye yazıyor.
          </p>
        </div>
      </Fade>
      <Source>
        openai.com/chatgpt/pricing · claude.com/pricing · gemini.google ·
        microsoft.com/copilot — erişim 14 Eylül 2026. Ücretsiz katman
        sınırları sık değiştiği için sayı yazılmadı.
      </Source>
    </Slide>
  ),

  /* Literatür araçları tablosu */
  () => (
    <Slide>
      <Eyebrow>Kategori · literatür</Eyebrow>
      <H2>Alanı taramak ve haritalamak.</H2>
      <div className="mt-5 overflow-x-auto">
        <table className="lz-table table-fixed">
          <thead>
            <tr>
              <th className="w-[20%]">Araç</th>
              <th className="w-[46%]">Ne yapar</th>
              <th className="w-[34%]">Ücretsiz katman</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>K-Dense</td>
              <td>Araştırma ajanı: taramayı planlar, eler, tablo çıkarır, atıfları doğrular, PDF yazar</td>
              <td>Web'de Instant düzeyi ücretsiz; BYOK ve Skills açık kaynak</td>
            </tr>
            <tr>
              <td>Semantic Scholar</td>
              <td>200M+ makale; her makaleye tek cümlelik TLDR; atıf bağlamı</td>
              <td>Tamamen ücretsiz</td>
            </tr>
            <tr>
              <td>Research Rabbit</td>
              <td>Seçtiğiniz makalelerden ağ haritası ve benzer makale önerisi</td>
              <td>Tamamen ücretsiz</td>
            </tr>
            <tr>
              <td>Connected Papers</td>
              <td>Tek makaleden benzerlik grafiği — kartopu için</td>
              <td>Var — ayda birkaç grafik</td>
            </tr>
            <tr>
              <td>Scite</td>
              <td>Atfın destekleyici mi çelişkili mi olduğunu etiketler</td>
              <td>Yok — ücretli</td>
            </tr>
            <tr>
              <td>Google Scholar</td>
              <td>En geniş kapsam; Türkçe literatür ve tezler burada</td>
              <td>Tamamen ücretsiz</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Source>
        k-dense.ai/pricing · semanticscholar.org · researchrabbit.ai ·
        connectedpapers.com · scite.ai/pricing — erişim
        14 Eylül 2026. Katman sınırları değiştiği için sayılar yazılmadı;
        güncel hâli için ilgili sayfaya bakın.
      </Source>
    </Slide>
  ),

  /* Hangisini seçmeli — karar ağacı */
  () => (
    <Slide>
      <Eyebrow>Karar</Eyebrow>
      <H2>Hangi araca gitmeli?</H2>
      <Sub>Elinizdeki soruya göre başlangıç noktası.</Sub>
      <div className="mt-6">
        <DecisionTree
          nodes={[
            {
              question: "Alanı hiç bilmiyorum, nereden başlayacağımı bilmiyorum",
              branches: [
                { answer: "→", result: "K-Dense (Instant düzeyi)", detail: "Görevi kısıtlarıyla yazın; planı onaylayın; ilk 30 makaleyi görün" },
              ],
            },
            {
              question: "Elimde 3–5 iyi makale var, çevresini görmek istiyorum",
              branches: [
                { answer: "→", result: "Connected Papers / Research Rabbit", detail: "Kartopu: kimi alıntılamış, kim alıntılamış" },
              ],
            },
            {
              question: "Bir makalenin gerçekten söylediğini anlamak istiyorum",
              branches: [
                { answer: "→", result: "NotebookLM ya da PDF yükleme", detail: "Belgeyle sohbet — belgeden alıntı isteyin" },
              ],
            },
            {
              question: "Türkçe tez ve makale arıyorum",
              branches: [
                { answer: "→", result: "YÖK Tez Merkezi + DergiPark + Scholar", detail: "Yapay zekâ araçları buraya girmiyor; elle" },
              ],
            },
            {
              question: "Yazdığım paragrafı düzeltmek istiyorum",
              branches: [
                { answer: "→", result: "Sohbet modeli ya da DeepL Write", detail: "“Anlamı değiştirme, değişiklikleri listele”" },
              ],
            },
          ]}
        />
      </div>
    </Slide>
  ),

  /* ═══ Bölüm 3 · Konu ve soru ═══ */
  () => (
    <Divider
      num="3"
      title="Konu ve soru"
      subtitle="Yapay zekâ konu bulmaz; sizin bulanık konunuzu keskin bir soruya çevirmenize yardım eder."
      icerik={["Soru keskinleştirme", "Boşluk iddiası", "Danışman"]}
    />
  ),

  /* Soru keskinleştirme */
  () => (
    <Slide>
      <Eyebrow>İstem 1 · soruyu keskinleştirme</Eyebrow>
      <H2>&ldquo;Konum X&rdquo; demekle başlamayın.</H2>
      <Sub>
        Konu bir alan, araştırma sorusu ise bir iddiadır. Aradaki mesafeyi
        kapatmak lisansüstünün ilk zor işi; araç burada iyi bir tartışma
        partneri.
      </Sub>
      <div className="mt-6">
        <Prompt>{`Yüksek lisans tezi için konu arıyorum. Alanım: [ALAN].
İlgimi çeken konu: [KONU, 2–3 cümle].
Erişebildiğim veri/ortam: [ör. anket, kurum verisi, açık veri seti].
Süre: [ay].

Bana bu konudan çıkabilecek 5 farklı araştırma sorusu yaz.
Her soru için: (a) bağımlı ve bağımsız değişken, (b) hangi
yöntemle cevaplanır, (c) neden bu sürede yapılabilir ya da
yapılamaz. Literatürden makale adı VERME — sadece soruları
tartış.`}</Prompt>
      </div>
      <Fade delay={0.2}>
        <p className="mt-5 text-sm text-white/50 leading-relaxed max-w-3xl">
          Son cümle bilerek var: bu aşamada makale adı istemek, uydurma
          künyeleri sürecin en başına sokar. Literatürü bir sonraki bölümdeki
          kaynağa bağlı araçlarla yapacaksınız.
        </p>
      </Fade>
    </Slide>
  ),

  /* Boşluk iddiası */
  () => (
    <Slide>
      <Eyebrow>Tuzak</Eyebrow>
      <H2>&ldquo;Bu konuda literatürde boşluk var&rdquo; — kim diyor?</H2>
      <Sub>
        Sohbet modeline &ldquo;boşluk bul&rdquo; derseniz ikna edici bir boşluk
        yazar. Yazması, boşluğun var olduğu anlamına gelmez; model
        literatürü taramadı, taramış gibi cümle kurdu.
      </Sub>
      <div className="mt-7">
        <Versus
          left={{
            label: "Modelin iddiası",
            items: [
              "“Türkiye bağlamında bu ilişkiyi inceleyen çalışma yok”",
              "“Bu iki değişken birlikte hiç ele alınmamış”",
              "“Son beş yılda bu yöntemle çalışma yapılmamış”",
            ],
          }}
          right={{
            label: "Sizin yapacağınız",
            items: [
              "Aynı iddiayı K-Dense'e tarama görevi olarak verin — gerçek makale listesi çıksın",
              "Google Scholar'da Türkçe ve İngilizce anahtar kelimeyle arayın",
              "YÖK Tez Merkezi'nde aynı konuyu tarayın — tezler dergilerden önce gelir",
              "Boşluk hâlâ duruyorsa, bunu makalenizde ‘taramamızda … bulunamamıştır’ diye yazın, ‘hiç yok’ diye değil",
            ],
          }}
        />
      </div>
    </Slide>
  ),

  /* Danışman */
  () => (
    <Slide>
      <Eyebrow>Yerine değil, öncesinde</Eyebrow>
      <H2>Araç, danışmana gitmeden önceki prova.</H2>
      <Sub>
        Danışman toplantısı kıt ve pahalı bir kaynak. Yapay zekâ o toplantıyı
        değiştirmez; sizi o toplantıya hazırlar.
      </Sub>
      <div className="mt-7 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={Lightbulb} title="Toplantı öncesi">
            Sorunuzu araca anlatın, &ldquo;bir danışman buna hangi itirazları
            yapar&rdquo; diye sorun. Toplantıya itirazların cevabıyla gidin.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={Users} title="Toplantı sırasında">
            Aracı kapatın. Danışmanın söylediğini not alın; kayıt almadan önce
            izin isteyin.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={ClipboardList} title="Toplantı sonrası">
            Notlarınızı araca verip &ldquo;bunu yapılacaklar listesine
            çevir&rdquo; deyin. Bir sonraki toplantıya bu listeyle gidin.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <div className="lz-warn mt-6 px-5 py-3.5">
          <p className="text-sm text-white/70 leading-relaxed">
            Danışmanınıza yapay zekâ kullandığınızı söyleyin — ilk günden.
            Sonradan öğrenilen kullanım, aynı kullanımın açık hâlinden çok
            daha kötü karşılanıyor.
          </p>
        </div>
      </Fade>
    </Slide>
  ),

  /* ═══ Bölüm 4 · Literatür ═══ */
  () => (
    <Divider
      num="4"
      title="Literatür"
      subtitle="Sunumun en pratik bölümü: K-Dense'i ilk açtığınız andan itibaren ne yapacaksınız — üç sürümüyle."
      icerik={["K-Dense nedir", "Yedi aşama", "Web · BYOK · Skills", "Kartopu", "Üç katmanlı strateji", "Türkçe literatür"]}
    />
  ),

  /* K-Dense nedir */
  () => (
    <Slide>
      <Eyebrow>K-Dense · ne yapar</Eyebrow>
      <H2>Arama motoru değil, araştırma ajanı.</H2>
      <Sub>
        k-dense.ai — &ldquo;Kady&rdquo; adlı ajan, verdiğiniz görevi
        aşamalara böler, veritabanlarını tarar, eler, tablo çıkarır, sentez
        yazar, atıfları doğrular ve PDF üretir. Arama motoru gibi tek soruya
        liste vermez; bir literatür taramasının tamamını uçtan uca yürütür.
        Fark bu — ve risk de bu.
      </Sub>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={Globe} title="K-Dense Web">
            Barındırılan sürüm, app.k-dense.ai. 250+ veritabanına erişim.
            Üç çaba düzeyi: <strong className="text-white/80">Instant ücretsiz</strong>,
            Standard koşu başına en fazla 9 USD, Pro 29 USD. Abonelik
            gerekmiyor.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={Lock} title="K-Dense BYOK">
            Ücretsiz, açık kaynak (MIT), masaüstü. Kendi API anahtarınızla
            (Anthropic, OpenAI, Gemini…) ya da Ollama ile tamamen yerel
            çalışır. Lisansüstü öğrenci için asıl yol bu.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Braces} title="Scientific Agent Skills">
            165 beceri, MIT. Claude Code ya da Cursor&apos;a takılır;
            &ldquo;literature-review&rdquo; becerisi yedi aşamalı taramayı
            terminalden yürütür. Kod yazan öğrenci için.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <p className="mt-5 text-sm text-white/45 leading-relaxed max-w-3xl">
          Akademik laboratuvarlar Team planını %90 indirimle alabiliyor;
          bireysel öğrenci indirimi sayfada yok. Ücretsiz iki yol (BYOK ve
          Skills) çoğu makale için yeterli.
        </p>
      </Fade>
      <Source>
        k-dense.ai · k-dense.ai/pricing · github.com/K-Dense-AI/k-dense-byok ·
        github.com/K-Dense-AI/scientific-agent-skills — erişim 14 Eylül 2026
      </Source>
    </Slide>
  ),

  /* K-Dense · yedi aşama */
  () => (
    <Slide>
      <Eyebrow>K-Dense · literatür taraması nasıl işler</Eyebrow>
      <H2>Yedi aşama — ve her birinde sizin yeriniz.</H2>
      <div className="mt-6 grid md:grid-cols-4 gap-3">
        {[
          ["Planlama ve kapsam", "Soru, dahil/hariç ölçütleri, yıl aralığı", "Ölçütleri SİZ yazarsınız; Kady'nin önerdiği planı düzenleyip onaylarsınız"],
          ["Tarama", "Birden çok veritabanı: web araması, PubMed, arXiv, bioRxiv…", "Türkçe kaynaklar dışarıda — DergiPark ve Tez Merkezi'ni elle ekleyin"],
          ["Eleme", "Başlık ve özete göre dahil / hariç", "Hariç tutulanların listesini isteyin; yanlış elenen olur"],
          ["Veri çıkarımı", "Örneklem, yöntem, bulgu tablosu (CSV)", "Rastgele beş hücreyi PDF'te bulun"],
          ["Sentez", "Tematik gruplama, çelişkiler, boşluklar", "Boşluk iddiasını Scholar'da sınayın"],
          ["Atıf doğrulama", "verify_citations: her DOI CrossRef'te sorgulanır", "İşaretlenen künyeleri silin; geçenler de kaynakçaya elle girer"],
          ["Belge", "Markdown + PDF, kaynakça, şekil", "Belgeyi makaleye kopyalamayın; okuma notu olarak kullanın"],
        ].map(([t, ne, siz], i) => (
          <Fade key={t} delay={0.05 * i}>
            <div className="lz-card px-4 py-3.5 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="grid place-items-center w-5 h-5 rounded-full font-mono text-[10px] text-black shrink-0"
                  style={{ background: ACCENT }}
                >
                  {i + 1}
                </span>
                <span className="text-white font-semibold text-[13px]">{t}</span>
              </div>
              <div className="text-[12px] text-white/50 leading-relaxed">{ne}</div>
              <div className="mt-2 pt-2 border-t border-white/10 text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                {siz}
              </div>
            </div>
          </Fade>
        ))}
        <Fade delay={0.4}>
          <div className="lz-warn px-4 py-3.5 h-full flex items-center">
            <p className="text-[12px] text-white/70 leading-relaxed">
              Altıncı aşama K-Dense&apos;i sohbet modellerinden ayıran şey:
              uydurma DOI&apos;yi kendisi yakalıyor. Ama &ldquo;kaynak gerçek,
              iddia sahte&rdquo; türünü yakalamıyor — o hâlâ sizin.
            </p>
          </div>
        </Fade>
      </div>
      <Source>
        github.com/K-Dense-AI/scientific-agent-skills — skills/literature-review/SKILL.md,
        erişim 14 Eylül 2026
      </Source>
    </Slide>
  ),

  /* K-Dense · adım adım (Web) */
  () => (
    <Slide>
      <Eyebrow>K-Dense Web · adım adım</Eyebrow>
      <H2>İlk taramanız — altı adım.</H2>
      <div className="mt-6">
        <Steps
          items={[
            { t: "app.k-dense.ai'de proje açın", d: "Makale başına bir proje. Dosyalar (rapor, BibTeX, CSV) projede birikir; sonraki görevler öncekini görür." },
            { t: "Görevi kısıtlarıyla yazın", d: "“[KONU] üzerine [YIL–YIL] literatür taraması. Yalnızca hakemli ve DOI'li kaynak. Dahil: … Hariç: … Türkçe çalışmaları ayrı listele.” Kısıt yazmazsanız Kady kendi kapsamını seçer." },
            { t: "Çaba düzeyini seçin", d: "İlk denemede Instant (ücretsiz): kapsamın doğru olup olmadığını görürsünüz. Standard'a ancak kapsam oturunca geçin — her koşu ücretli." },
            { t: "Planı okuyun, düzenleyin, onaylayın", d: "Kady yedi aşamalı plan gösterir. Veritabanı listesine bakın; eksik ölçütü ekleyin. Onaylamadan koşmaz." },
            { t: "Çıktıları açın — PDF'i değil, CSV ve BibTeX'i", d: "extraction_table.csv literatür matrisiniz; references.bib kaynakçanız. PDF raporu okuma notu olarak kullanın, makaleye taşımayın." },
            { t: "Atıf doğrulama sonucunu işleyin", d: "İşaretli DOI'leri silin. Geçenleri de Atıf Denetleyici'den bir kez daha geçirin — iki bağımsız kontrol, bir kontrolden iyidir." },
          ]}
        />
      </div>
    </Slide>
  ),

  /* K-Dense Web · ekranda */
  () => (
    <ScreenSlide
      eyebrow="K-Dense Web · ekranda"
      title="Kady ile bir tarama koşusu."
      mock={<KDenseWeb />}
      steps={[
        ["Görev kutusu", "Soru değil, görev: kapsam, yıl aralığı, dahil/hariç ölçütü, çıktı biçimi. Ne kadar kısıt, o kadar az sürpriz."],
        ["Plan ve ilerleme", "Yedi aşama, tamamlananlar işaretli. Her aşamanın çıktısına tıklayıp bakabilirsiniz — beşinci aşamada durdurup elemeyi kendiniz yapmak mümkün."],
        ["Çaba düzeyi", "Instant ücretsiz; Standard ve Pro ücretli ve koşu başına üst sınırlı. Kapsamı Instant'ta oturtun."],
        ["Dosyalar", "Markdown, PDF, references.bib, extraction_table.csv, şekil. BibTeX'i kaynakça aracınıza alın."],
        ["Atıf doğrulama", "Kaç DOI geçti, kaçı işaretli. İşaretlileri silmek yetmez; geçenler için de “makale o şeyi söylüyor mu” sorusu sizde."],
      ]}
      note="Çizim şematik; arayüz değişebilir. Değişmeyen parçalar: görev, plan, çaba düzeyi, dosyalar, doğrulama."
    />
  ),

  /* K-Dense BYOK · ekranda */
  () => (
    <ScreenSlide
      eyebrow="K-Dense BYOK · ekranda"
      title="Ücretsiz yol: kendi anahtarınızla, kendi bilgisayarınızda."
      mock={<KDenseByok />}
      steps={[
        ["Sağlayıcı seçin", "Anthropic, OpenAI, Gemini, OpenRouter… ya da Ollama ile tamamen yerel model. Yerel model yavaş ama ücretsiz ve veri dışarı çıkmıyor — KVKK açısından en temiz seçenek."],
        ["API anahtarı", "Sağlayıcının sitesinden alınır; kullandıkça sağlayıcıya ödersiniz (bir tarama genellikle birkaç dolar). Anahtarı kimseyle paylaşmayın; .env dosyasında durur."],
        ["Kady ile çalışın", "Web sürümüyle aynı ajan. PDF klasörünü verip tablo çıkartabilir, taramayı yerelde yürütebilirsiniz."],
        ["Veri nerede", "Dosyalar bilgisayarınızda; yalnızca sohbet metni seçtiğiniz sağlayıcıya gider. Ollama seçtiyseniz hiçbir şey çıkmaz."],
      ]}
      note="Kurulum: git clone → cp .env.example .env → ./start.sh (Windows: start.cmd). macOS, Linux, Windows 10/11."
    />
  ),

  /* K-Dense · Skills (terminal) */
  () => (
    <Slide>
      <Eyebrow>K-Dense · Claude Code içinde</Eyebrow>
      <H2>Kod yazıyorsanız: beceri olarak takın.</H2>
      <Sub>
        Scientific Agent Skills, Claude Code ya da Cursor&apos;a eklenen
        beceri paketi. Literatür taraması, veri analizi, şekil üretimi ve
        makale yazımı becerileri var; ajan, göreve uygun beceriyi kendisi
        seçiyor.
      </Sub>
      <div className="mt-5 grid md:grid-cols-[1.2fr_1fr] gap-4">
        <Fade delay={0.08}>
          <Prompt>{`$ npx skills add K-Dense-AI/scientific-agent-skills
$ claude

> Uzaktan çalışma ve tükenmişlik üzerine 2019–2026
  sistematik literatür taraması yap. literature-review
  becerisini kullan. Dahil: hakemli, İngilizce/Türkçe,
  DOI'li. Hariç: ön baskı, tez. Bitince
  verify_citations çalıştır ve işaretlileri listele.`}</Prompt>
        </Fade>
        <Fade delay={0.16}>
          <div className="space-y-2.5">
            {[
              ["Önce SKILL.md'yi okuyun", "Deponun kendi uyarısı: “Skills can execute code… Review what you install.” Beceri, ajanın davranışını değiştiriyor; ne yaptığını bilmeden takmayın."],
              ["Ücretsiz — model hariç", "Beceriler MIT; ödediğiniz şey Claude Code'un kullandığı model. Claude Pro aboneliği ya da API anahtarı gerekir."],
              ["Çıktı yerelde", "Markdown, PDF, references.bib çalışma klasörünüze yazılır. Sürüm kontrolüne (git) koyun; jüriye göstereceğiniz iz bu."],
            ].map(([t, d]) => (
              <div key={t} className="lz-card px-4 py-3">
                <div className="text-white font-semibold text-sm">{t}</div>
                <div className="text-[13px] text-white/50 leading-relaxed mt-0.5">{d}</div>
              </div>
            ))}
          </div>
        </Fade>
      </div>
      <Source>
        github.com/K-Dense-AI/scientific-agent-skills (README ve
        skills/literature-review/SKILL.md) — erişim 14 Eylül 2026
      </Source>
    </Slide>
  ),

  /* K-Dense sınırları */
  () => (
    <Slide>
      <Eyebrow>K-Dense · sınırları</Eyebrow>
      <H2>Ajan hızlı; sorumluluk hâlâ yavaş.</H2>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.06}>
          <Card icon={AlertTriangle} title="Otomatik eleme, otomatik hata">
            Kady yüzlerce makaleyi başlık ve özetten eliyor. İyi bir makale
            özeti kötü yazıldığı için elenebilir. Hariç listesini isteyip
            göz gezdirin.
          </Card>
        </Fade>
        <Fade delay={0.12}>
          <Card icon={Globe} title="Kapsam İngilizce ve fen ağırlıklı">
            Veritabanı listesi PubMed, arXiv, bioRxiv gibi kaynaklara
            yaslanıyor; sosyal bilim ve Türkçe literatür zayıf. Üçüncü katman
            (Scholar, TR Dizin, Tez Merkezi) yine şart.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={FileSearch} title="Doğrulama DOI'de bitiyor">
            verify_citations künyenin var olduğunu söyler; makalenin
            sentezdeki iddiayı söylediğini söylemez. Dört adımlı protokolün
            üçüncü adımı devrede.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Scale} title="Beyan ve şekil">
            Beceri, her taramaya yapay zekâ üretimi şekil ekliyor. Bu şekiller
            makaleye giremez (Springer Nature, Elsevier). Taramayı beyan
            edin: “literatür taramasında K-Dense [sürüm] kullanılmıştır.”
          </Card>
        </Fade>
      </div>
      <Source>
        skills/literature-review/SKILL.md (“Every literature review MUST include
        at least 1-2 AI-generated figures”) · group.springernature.com AI
        guidance · elsevier.com generative-ai-policies
      </Source>
    </Slide>
  ),

  /* Kartopu — Connected Papers, Research Rabbit, Scite */
  () => (
    <Slide>
      <Eyebrow>Kartopu</Eyebrow>
      <H2>Beş iyi makaleden elli makaleye.</H2>
      <Sub>
        Anahtar kelime araması alanın haritasını vermez. Bulduğunuz en iyi
        birkaç makaleyi tohum olarak kullanıp çevresini görmek, klasik
        &ldquo;kartopu&rdquo; yönteminin araçlı hâli.
      </Sub>
      <div className="mt-7 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={Network} title="Connected Papers">
            Tek makale girersiniz; benzer makalelerden bir grafik çizer.
            &ldquo;Prior works&rdquo; alanın temel metinlerini,
            &ldquo;derivative works&rdquo; en yenileri gösterir. Ücretsizde
            ayda sınırlı grafik.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={BookMarked} title="Research Rabbit">
            Birden fazla makaleyle koleksiyon kurarsınız; koleksiyona
            benzeyen yeni makaleleri önerir. Tamamen ücretsiz.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Scale} title="Scite">
            Bir makaleye yapılan atıfların onu{" "}
            <em>destekleyip</em> desteklemediğini etiketler. Çok atıf alan
            ama çürütülmüş bir çalışmaya dayanmadan önce tek bakış. Ücretli.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed max-w-3xl">
          Bu üç araç halüsinasyon üretmez — hepsi var olan atıf ağının
          üstünde çalışıyor. Yanlış olabilecek tek şey &ldquo;benzerlik&rdquo;
          yargısı; onu da okuyunca fark edersiniz.
        </p>
      </Fade>
      <Source>
        connectedpapers.com · researchrabbit.ai · scite.ai — erişim 14 Eylül 2026
      </Source>
    </Slide>
  ),

  /* Üç katmanlı strateji */
  () => (
    <Slide>
      <Eyebrow>Strateji</Eyebrow>
      <H2>Üç katman — her biri farklı işe yarıyor.</H2>
      <div className="mt-7 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <div className="lz-card p-5 h-full">
            <Tag>1 · Keşif</Tag>
            <div className="text-white font-semibold mb-2">K-Dense</div>
            <p className="text-sm text-white/55 leading-relaxed">
              Alanı hiç bilmezken. Soruyu yazın, ilk 30 makaleyi görün,
              alanın kelime dağarcığını öğrenin. Bir–iki saat.
            </p>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="lz-card p-5 h-full">
            <Tag>2 · Genişletme</Tag>
            <div className="text-white font-semibold mb-2">Connected Papers · Research Rabbit</div>
            <p className="text-sm text-white/55 leading-relaxed">
              Beş tohum makaleden çevreye. Temel metinleri ve en yenileri
              yakalayın. Yarım gün.
            </p>
          </div>
        </Fade>
        <Fade delay={0.24}>
          <div className="lz-card p-5 h-full">
            <Tag>3 · Doğrulama ve tamamlama</Tag>
            <div className="text-white font-semibold mb-2">Scholar · Scopus/WoS · TR Dizin · Tez Merkezi</div>
            <p className="text-sm text-white/55 leading-relaxed">
              Yapay zekâ araçlarının kaçırdığını burada bulursunuz. Yeniden
              üretilebilir sorgu dizisini yazıp yöntem bölümüne koyun.
            </p>
          </div>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <div className="lz-warn mt-6 px-5 py-3.5">
          <p className="text-sm text-white/70 leading-relaxed">
            Sıra önemli: 3. katmanı atlarsanız literatürünüz İngilizce ve
            açık erişimli olana çarpık kalır. 1. katmanı atlarsanız haftalarca
            yanlış anahtar kelimeyle ararsınız.
          </p>
        </div>
      </Fade>
    </Slide>
  ),

  /* Türkçe literatür */
  () => (
    <Slide>
      <Eyebrow>Türkçe literatür</Eyebrow>
      <H2>Yapay zekâ araçları buraya girmiyor.</H2>
      <Sub>
        K-Dense ve benzerleri büyük ölçüde İngilizce ve
        uluslararası dizinlerde yer alan makaleleri kapsıyor. Türkiye
        bağlamındaki bir çalışma için üç kaynağı elle taramak zorundasınız.
      </Sub>
      <div className="mt-7 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={GraduationCap} title="YÖK Ulusal Tez Merkezi">
            tez.yok.gov.tr — Türkiye&apos;deki bütün tezler. Konunuz daha
            önce tez olarak çalışıldıysa burada görürsünüz; dergiye
            dönüşmemiş çalışmalar dahil.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={FileText} title="DergiPark">
            dergipark.org.tr — Türkiye&apos;deki hakemli dergilerin büyük
            çoğunluğu. Tam metin genellikle açık.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={ListChecks} title="TR Dizin">
            trdizin.gov.tr — ULAKBİM&apos;in dizini; akademik teşvik ve
            doçentlik için &ldquo;TR Dizin&apos;de taranan&rdquo; ayrımı
            önemli.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed max-w-3xl">
          Pratik ipucu: Türkçe taramada bulduğunuz makalelerin özetlerini
          bir sohbet modeline verip &ldquo;bu 15 özeti tema başlıklarına göre
          grupla, her temaya hangi makalelerin girdiğini yaz&rdquo; demek,
          araçların kapsam eksiğini kapatan iyi bir ara yol.
        </p>
      </Fade>
    </Slide>
  ),

  /* ═══ Bölüm 5 · Okuma ═══ */
  () => (
    <Divider
      num="5"
      title="Okuma"
      subtitle="Kırk makaleyi bulmak kolay; kırk makaleyi okumak değil. Araç okumanın yerine geçmez, hangisini ne kadar okuyacağınızı söyler."
      icerik={["PDF ile sohbet", "NotebookLM", "Özet tuzağı", "Kaynakça"]}
    />
  ),

  /* PDF ile sohbet */
  () => (
    <Slide>
      <Eyebrow>PDF ile çalışmak</Eyebrow>
      <H2>Belgeyi verin, belgeden çıkmasını isteyin.</H2>
      <Sub>
        Sohbet modeline PDF yüklemek halüsinasyonu ciddi ölçüde azaltıyor:
        artık ezberinden değil, önündeki belgeden konuşuyor. Ama iki koşulla.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="lz-card p-5">
            <Tag>Koşul 1 · alıntı isteyin</Tag>
            <p className="text-sm text-white/55 leading-relaxed">
              &ldquo;Her iddian için belgeden birebir alıntı ver, sayfa
              numarasıyla.&rdquo; Alıntı bulamıyorsa iddia belgede yoktur —
              model tamamlamıştır.
            </p>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="lz-card p-5">
            <Tag>Koşul 2 · dışarı çıkmasını yasaklayın</Tag>
            <p className="text-sm text-white/55 leading-relaxed">
              &ldquo;Yalnızca bu belgeye dayan; belgede olmayan bir şeyi
              sorarsam &lsquo;belgede yok&rsquo; de.&rdquo; Bunu yazmazsanız
              model boşluğu genel bilgisiyle doldurur ve belgeye
              aitmiş gibi sunar.
            </p>
          </div>
        </Fade>
      </div>
      <div className="mt-5">
        <Prompt>{`Ekteki makaleyi yalnızca kendi metnine dayanarak incele.
1. Araştırma sorusu tek cümleyle.
2. Örneklem, veri toplama aracı, analiz yöntemi.
3. Ana bulgu — yazarların kendi cümlesiyle, sayfa numarasıyla.
4. Yazarların belirttiği sınırlılıklar.
5. Benim sorum: [SORU]. Bu makale buna cevap veriyor mu?
Belgede olmayan hiçbir şeyi ekleme; bulamadığını "belgede yok"
diye işaretle.`}</Prompt>
      </div>
    </Slide>
  ),

  /* NotebookLM */
  () => (
    <Slide>
      <Eyebrow>NotebookLM</Eyebrow>
      <H2>Kırk makaleyi tek defterde.</H2>
      <Sub>
        notebooklm.google — Google&apos;ın ücretsiz aracı. Yüklediğiniz
        PDF&apos;lerin dışına çıkmıyor; her cevaba hangi kaynağın hangi
        pasajından geldiğini numarayla iliştiriyor. Literatürünüzü topluca
        sorgulamak için tasarlanmış tek araç bu.
      </Sub>
      <div className="mt-7 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={Database} title="Ne yapar">
            Makaleleri yüklersiniz; &ldquo;hangi makaleler hangi ölçeği
            kullanmış&rdquo;, &ldquo;bulgular nerede çelişiyor&rdquo; gibi
            sorulara kaynak numaralı cevap verir.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={ShieldCheck} title="Neden güvenli">
            Kaynak dışına çıkmıyor. Sorduğunuz şey defterde yoksa bunu
            söylüyor. Uydurma atıf üretmesi tasarım gereği zor.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={AlertTriangle} title="Yine de">
            Pasajı doğru bulur, yorumu yanlış yapabilir. Numaraya tıklayıp
            pasajı okuyun. Özellikle sayısal bulgularda.
          </Card>
        </Fade>
      </div>
      <Source>
        notebooklm.google · support.google.com/notebooklm — kaynak ve defter
        sınırları sık güncelleniyor; güncel hâli için destek sayfasına bakın.
        Erişim 14 Eylül 2026
      </Source>
    </Slide>
  ),

  /* NotebookLM · ekranda */
  () => (
    <ScreenSlide
      eyebrow="NotebookLM · ekranda"
      title="Üç panel: kaynak, sohbet, not."
      mock={<NotebookLM />}
      steps={[
        ["Kaynaklar", "PDF'leri buraya yükleyin (K-Dense'in bulduklarını klasörden sürükleyin). Kutucukla hangi kaynakların cevaba gireceğini seçersiniz — bir soruyu yalnızca üç makaleye sormak mümkün."],
        ["Kaynak numaralı cevap", "Her cümlenin yanındaki küçük numara, o bilginin geldiği kaynak ve pasaj. Tıklayınca pasaj açılır. Numarasız cümleye güvenmeyin."],
        ["Soru kutusu", "Sorular karşılaştırmalı olsun: “hangi kaynak hangi ölçeği kullanmış”, “bulgular nerede çelişiyor”. Tek makale sorusu için PDF'i doğrudan sohbet modeline vermek de yeter."],
        ["Notlar", "İşe yarayan cevabı nota kaydedin; kapsam notu bu notlardan derlenir. Not, NotebookLM'in değil sizin cümlenizle yazılmalı."],
      ]}
    />
  ),

  /* Özet tuzağı */
  () => (
    <Slide>
      <Eyebrow>Sınır</Eyebrow>
      <H2>Özetini okumak, makaleyi okumak değil.</H2>
      <Sub>
        En yaygın lisansüstü hatası: kırk makalenin yapay zekâ özetini
        okuyup kırkına da atıf yapmak. Hakem, atıf yaptığınız makaleyi
        okumuş olabilir. Siz okumadıysanız bu tartışmada kaybedersiniz.
      </Sub>
      <div className="mt-7 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <div className="lz-card p-5 h-full">
            <Tag>Özetle yetinebilirsiniz</Tag>
            <p className="text-sm text-white/55 leading-relaxed">
              Eleme aşamasında: bu makale konuma giriyor mu, girmiyor mu.
              Kırk makaleden yirmisini burada elersiniz.
            </p>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="lz-card p-5 h-full">
            <Tag>Yöntem ve bulguları okuyun</Tag>
            <p className="text-sm text-white/55 leading-relaxed">
              Literatür tablosuna girecek her makale için. Özet neyi
              bulduğunu söyler; yöntem bölümü ne kadar güvenileceğini.
            </p>
          </div>
        </Fade>
        <Fade delay={0.24}>
          <div className="lz-card p-5 h-full">
            <Tag>Baştan sona okuyun</Tag>
            <p className="text-sm text-white/55 leading-relaxed">
              Tartışma bölümünde karşılaştıracağınız, yönteminizi
              dayandıracağınız beş–on makale. Bunlar sizin çalışmanızın
              omurgası.
            </p>
          </div>
        </Fade>
      </div>
    </Slide>
  ),

  /* Kaynakça — DOI'den künye */
  () => (
    <Slide>
      <Eyebrow>Kaynakça yönetimi</Eyebrow>
      <H2>Künyeyi elle yazmayın; DOI&apos;den üretin.</H2>
      <Sub>
        Sohbet modeline &ldquo;bunu APA&apos;ya çevir&rdquo; demek işe yarar
        gibi görünür; ama künyedeki yanlışı düzeltmek yerine onu güzelce
        biçimlendirir. Doğru sıra: DOI → gerçek kayıt → biçim.
      </Sub>
      <div className="mt-7 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <div className="lz-card p-5 h-full">
            <Tag>1 · K-Dense&apos;ten gelen</Tag>
            <p className="text-sm text-white/55 leading-relaxed">
              references.bib zaten DOI doğrulamasından geçmiş. Yine de
              işaretli künyeleri silin; dosyayı olduğu gibi Word&apos;e
              yapıştırmayın.
            </p>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="lz-card p-5 h-full">
            <Tag>2 · Elle bulduğunuz</Tag>
            <p className="text-sm text-white/55 leading-relaxed">
              DOI&apos;yi osmancancetlenbik.com/araclar&apos;daki BibTeX
              Üretici&apos;ye yapıştırın; künye CrossRef kaydından gelir.
              DOI&apos;siz kaynak (kitap, tez) için derginin/kütüphanenin
              kendi künyesini kopyalayın.
            </p>
          </div>
        </Fade>
        <Fade delay={0.24}>
          <div className="lz-card p-5 h-full">
            <Tag>3 · Göndermeden önce</Tag>
            <p className="text-sm text-white/55 leading-relaxed">
              Tüm kaynakçayı Atıf Denetleyici&apos;den geçirin; Kaynakça
              Biçimlendirici ile derginin stiline çevirin. Word&apos;ün kendi
              kaynak yöneticisi de işi görür.
            </p>
          </div>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <div className="mt-5">
          <EmbeddedTool
            slug="bibtex-uretici"
            title="BibTeX Üretici"
            hint="Bir DOI yapıştırın; künye gerçek kayıttan gelsin."
          />
        </div>
      </Fade>
    </Slide>
  ),

  /* ═══ Bölüm 6 · Yazma ═══ */
  () => (
    <Divider
      num="6"
      title="Yazma"
      subtitle="İlk taslağı siz yazarsınız; araç ikinci okuyucudur. Bölüm bölüm kim ne yapar."
      icerik={["Sıra", "Bölüm bölüm", "Beş istem", "İngilizce", "Bildiri özeti", "Kod ve veri"]}
    />
  ),

  /* Sıra — yönetimsiz / yönetimli */
  () => (
    <Slide>
      <Eyebrow>İki yol</Eyebrow>
      <H2>Araç yazabilir — yönetirseniz.</H2>
      <Sub>
        &ldquo;Bana giriş bölümü yaz&rdquo; deyip çıkanı kabul etmekle,
        iskeleti ve kaynak listesini siz verip bölüm bölüm yazdırıp her
        iddiayı doğrulamak aynı iş değil. İlki yazarlığı devreder; ikincisi
        yazmayı devreder, yazarlık sizde kalır. Bölüm 7&apos;de ikinci yolun
        tamamı var.
      </Sub>
      <div className="mt-7">
        <Versus
          left={{
            label: "Yönetimsiz",
            items: [
              "“Şu konuda bir giriş bölümü yaz” → çıkanı düzenlemek",
              "Kaynakları aracın bulmasına izin vermek",
              "Tartışma ve yorumu araca bırakmak",
              "Beyan etmemek — “nasılsa anlaşılmaz”",
            ],
          }}
          right={{
            label: "Yönetimli",
            items: [
              "İskeleti ve her bölümün iddiasını siz yazarsınız; araç doldurur",
              "Yalnızca sizin verdiğiniz kaynak listesinden — DOI'siz iddia yok",
              "Her paragrafı siz yeniden yazarsınız; tartışma ve sınırlılık sizindir",
              "Beyan: hangi araç, hangi aşama, sorumluluk sizde",
            ],
          }}
        />
      </div>
    </Slide>
  ),

  /* Bölüm bölüm */
  () => (
    <Slide>
      <Eyebrow>Bölüm bölüm</Eyebrow>
      <H2>Makalenin her bölümünde araca düşen pay farklı.</H2>
      <div className="mt-5 overflow-x-auto">
        <table className="lz-table table-fixed">
          <thead>
            <tr>
              <th className="w-[16%]">Bölüm</th>
              <th className="w-[42%]">Araç ne yapabilir</th>
              <th className="w-[42%]">Sizde kalan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Özet</td>
              <td>Yazdığınız makaleden özet taslağı çıkarır; kelime sınırına indirir</td>
              <td>Makale bitmeden özet yazılmaz; sayıların metinle tutması</td>
            </tr>
            <tr>
              <td>Giriş</td>
              <td>Taslağınızın mantık sırasını eleştirir; “boşluk” cümlenizi sorgular</td>
              <td>Boşluk iddiası ve katkı cümlesi — sizin tezinizin kalbi</td>
            </tr>
            <tr>
              <td>Literatür</td>
              <td>Notlarınızı temaya göre gruplar; tekrarları bulur</td>
              <td>Hangi makalenin neden önemli olduğu; sentez</td>
            </tr>
            <tr>
              <td>Yöntem</td>
              <td>Eksik bilgi var mı diye kontrol listesiyle bakar (örneklem, ölçek, etik onay)</td>
              <td>Yöntemin kendisi; yeniden üretilebilirlik</td>
            </tr>
            <tr>
              <td>Bulgular</td>
              <td>Tablo başlığı, şekil altyazısı taslağı; analiz kodu</td>
              <td>Sayıların doğruluğu — kodu çalıştıran ve sonucu okuyan sizsiniz</td>
            </tr>
            <tr>
              <td>Tartışma</td>
              <td>“Bu yorumu hangi bulgu destekliyor?” diye sorgular</td>
              <td>Yorum, sınırlılık, gelecek çalışma — devredilemez</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Source>
        YÖK rehberi (Mayıs 2024) hipotez geliştirme, tartışma, yorumlama ve
        uygulama aşamalarını açıkça kapsam dışı sayıyor; tablo bu ayrıma göre
        kuruldu.
      </Source>
    </Slide>
  ),

  /* Beş istem — eleştirme */
  () => (
    <Slide>
      <Eyebrow>İstem 2 · hakem gözüyle</Eyebrow>
      <H2>Yazdırmayın, eleştirtin.</H2>
      <Sub>
        Sunumdaki en değerli istem bu. Aracı yazar değil, sert bir hakem
        olarak kullanıyorsunuz. Metin sizin kalıyor; araç yalnızca zayıf
        noktayı gösteriyor.
      </Sub>
      <div className="mt-6">
        <Prompt>{`Aşağıdaki bölüm [DERGİ/KONFERANS] için hazırladığım
makalenin [GİRİŞ / TARTIŞMA] bölümü. Sen bu alandan deneyimli
ve titiz bir hakemsin.

Metni YENİDEN YAZMA. Yalnızca şunları listele:
1. Kanıtsız kalan iddialar (cümleyi alıntıla)
2. Mantık sırasında kopukluk
3. Aşırı genelleme ya da bulguların ötesine geçen yorum
4. Hakemin ilk soracağı üç soru
Her madde için hangi paragraf olduğunu belirt.

[METİN]`}</Prompt>
      </div>
      <Fade delay={0.2}>
        <p className="mt-5 text-sm text-white/50 leading-relaxed max-w-3xl">
          &ldquo;Yeniden yazma&rdquo; kısıtı önemli: kısıt yoksa model
          eleştirmek yerine kendi versiyonunu yazar, siz de farkında olmadan
          onu kabul edersiniz.
        </p>
      </Fade>
    </Slide>
  ),

  /* İstem 3 — sıkılaştırma */
  () => (
    <Slide>
      <Eyebrow>İstem 3 · paragraf sıkılaştırma</Eyebrow>
      <H2>Anlamı değiştirmeden kısaltma.</H2>
      <Sub>
        Kelime sınırı olan bildiri özetleri ve dergi makaleleri için. Kritik
        kısıt, değişiklik listesi: model neyi değiştirdiğini söylemek
        zorunda kalınca anlam kaymasını siz yakalarsınız.
      </Sub>
      <div className="mt-6">
        <Prompt>{`Aşağıdaki paragrafı %25 kısalt.
Kurallar:
- Anlamı, iddiayı ve nüansı değiştirme
- Yeni bilgi ekleme, sayı değiştirme
- Teknik terimleri koru
- Benim üslubumu koru; "moreover", "delve", "in today's
  rapidly evolving" gibi kalıp ifadeler ekleme
Sonra, yaptığın her değişikliği eski → yeni biçiminde listele.

[PARAGRAF]`}</Prompt>
      </div>
      <Fade delay={0.2}>
        <div className="lz-warn mt-5 px-5 py-3.5">
          <p className="text-sm text-white/70 leading-relaxed">
            Kalıp ifade listesi bilinçli: hakemler ve editörler yapay zekâ
            kokan metni bu kelimelerden tanıyor. Yasaklamak hem metni
            iyileştiriyor hem de gereksiz şüpheyi engelliyor.
          </p>
        </div>
      </Fade>
    </Slide>
  ),

  /* İngilizce */
  () => (
    <Slide>
      <Eyebrow>İstem 4 · İngilizce yazarken</Eyebrow>
      <H2>Çeviri değil, İngilizce yazmak.</H2>
      <Sub>
        Türkçe yazıp çevirtmek en yaygın yol ve en kötü sonuç veren yol:
        cümle yapısı Türkçe kalıyor, hakem ilk paragrafta anlıyor. İki daha
        iyi yol var.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="lz-card p-5 h-full">
            <Tag>Yol A · bozuk İngilizce yazın, düzelttirin</Tag>
            <p className="text-sm text-white/55 leading-relaxed mb-3">
              Kendi İngilizcenizle yazın — hatalı da olsa. Sonra:
            </p>
            <Prompt>{`Bu metin ana dili İngilizce olmayan bir
araştırmacı tarafından yazıldı. Dilbilgisi ve
akıcılığı düzelt; içeriği, iddiaları ve terimleri
değiştirme. Değişiklikleri listele.`}</Prompt>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="lz-card p-5 h-full">
            <Tag>Yol B · Türkçe not, İngilizce taslak</Tag>
            <p className="text-sm text-white/55 leading-relaxed mb-3">
              Paragrafın söyleyeceğini Türkçe madde madde yazın; İngilizce
              paragrafı kendiniz kurun. Bu, dil değil yapı egzersizi —
              çeviri kokusu böyle gidiyor.
            </p>
            <p className="text-sm text-white/45 leading-relaxed">
              DeepL Write ve Paperpal bu aşamada iyi: yeni içerik üretmeden
              yalnızca sizin cümlenizi akıcılaştırıyorlar; beyan yükü en
              düşük araçlar.
            </p>
          </div>
        </Fade>
      </div>
      <Source>
        Dil düzeltme çoğu yayıncıda beyan gerektirmiyor (Elsevier, Springer
        Nature, IEEE); yine de dergi yönergesini kontrol edin.
      </Source>
    </Slide>
  ),

  /* Bildiri özeti */
  () => (
    <Slide>
      <Eyebrow>İstem 5 · bildiri</Eyebrow>
      <H2>Bildiri özeti: 250 kelime, dört soru.</H2>
      <Sub>
        Konferans çağrılarının çoğu önce yalnızca özet istiyor; kabul kararı
        o 250 kelimeye göre veriliyor. Yapay zekâ özeti yazmasın; özetin
        dört zorunlu parçasını taşıyıp taşımadığını denetlesin.
      </Sub>
      <div className="mt-6">
        <Prompt>{`Aşağıdaki bildiri özetini [KONFERANS] çağrısına göre
denetle. Kelime sınırı: [N].
Şu dört soruya her biri için özetten cümle alıntılayarak
cevap ver; cevap yoksa "EKSİK" yaz:
1. Problem ve neden önemli?
2. Ne yapıldı — yöntem, veri, örneklem?
3. Ne bulundu — somut sonuç, mümkünse sayı?
4. Katkı — literatüre / uygulamaya ne ekliyor?
Ardından çağrı metnindeki konu başlıklarından hangisine
girdiğini söyle. Özeti yeniden yazma.

[ÇAĞRI METNİ]
[ÖZET]`}</Prompt>
      </div>
      <Fade delay={0.2}>
        <p className="mt-5 text-sm text-white/45 leading-relaxed max-w-3xl">
          Sunum günü için de aynı mantık: slaytları araç hazırlamasın;
          &ldquo;bu 12 dakikalık sunumda hangi slaytta ne fazla&rdquo; diye
          sorun. Konferansta sizi dinleyen kişi soruyu slaytlara değil, size
          soruyor.
        </p>
      </Fade>
    </Slide>
  ),

  /* Kod ve veri */
  () => (
    <Slide>
      <Eyebrow>Kod ve veri analizi</Eyebrow>
      <H2>Kodu yazdırabilirsiniz. Sonucu doğrulamak sizde.</H2>
      <Sub>
        SPSS çıktısını yorumlatmak, R ya da Python&apos;da analiz kodu
        yazdırmak — beyanla serbest ve gerçekten zaman kazandırıyor. Üç
        koşulla.
      </Sub>
      <div className="mt-7 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={Braces} title="Kodu isteyin, sayıyı değil">
            &ldquo;Bu tablonun ortalamasını hesapla&rdquo; demeyin; model
            kafadan hesaplar ve yanılır. &ldquo;Hesaplayan kodu yaz&rdquo;
            deyin, kodu siz çalıştırın.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={Calculator} title="Bir sonucu elle doğrulayın">
            Kodun ürettiği on sonuçtan birini Excel&apos;de ya da elle
            yeniden hesaplayın. Tutuyorsa diğer dokuza güvenin; tutmuyorsa
            hiçbirine.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Ban} title="Veri ürettirmeyin">
            Eksik anket katılımcısını &ldquo;tamamlatmak&rdquo;, örnek veri
            &ldquo;sentezlemek&rdquo; — YÖK rehberi bunu açıkça yasaklıyor;
            yayıncılar için uydurma (fabrication) sayılıyor.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <div className="lz-warn mt-6 px-5 py-3.5">
          <p className="text-sm text-white/70 leading-relaxed">
            Veriyi araca vermeden önce anonimleştirin: ad, TC kimlik, öğrenci
            numarası, e-posta. KVKK yurt dışındaki bir araca kişisel veri
            girmeyi &ldquo;yurt dışına aktarım&rdquo; sayıyor. Bölüm 9&apos;da
            ayrıntı var.
          </p>
        </div>
      </Fade>
      <Source>
        proje.yok.gov.tr — Etik Rehber, Mayıs 2024 (“anketlerde gerçek
        katılımcılar yerine yapay zekâ kullanılamaz”) · kvkk.gov.tr Yayın No
        113, Kasım 2025
      </Source>
    </Slide>
  ),

  /* ═══ Bölüm 7 · Uçtan uca bir akış ═══ */
  () => (
    <Divider
      num="7"
      title="Uçtan uca bir akış"
      subtitle="Kendi makale sürecim: dört araç, beş aşama. Yapay zekâ metni yazabilir — imzayı atan ve sorumluluğu alan siz olduğunuz sürece."
      icerik={["Yazar değil, yazan", "Gemini + NotebookLM", "Claude ile yapı", "Model eğitimi", "Yönetimli taslak", "DeepL ve %0"]}
    />
  ),

  /* Yazar değil, yazan */
  () => (
    <Slide>
      <Eyebrow>Çerçeve</Eyebrow>
      <H1>
        Yazar olamaz.
        <br />
        <span style={{ color: ACCENT }}>Yazan olabilir.</span>
      </H1>
      <Sub>
        Yayıncıların ve YÖK&apos;ün &ldquo;yazar olamaz&rdquo; cümlesi
        imzayla ilgili: sorumluluk üstlenemez, çıkar çatışması beyan edemez,
        hakeme cevap veremez. Metni üretmek başka iş. Dört koşulu siz
        sağlıyorsanız metni araç yazabilir — ve bunu yazmaktan çekinmeden
        beyan edebilirsiniz.
      </Sub>
      <div className="mt-7 grid md:grid-cols-4 gap-3">
        {[
          ["Yapı sizin", "Bölümler, her bölümün iddiası, tablo ve şekil listesi sizden çıkar. Araç boşluğu doldurur, iskeleti kurmaz."],
          ["Kaynak listesi sizin", "Araç yalnızca sizin bulup doğruladığınız kaynaklardan yazar. Liste dışına çıkması yasak."],
          ["Doğrulama sizin", "Her paragraf, her sayı, her atıf dört adımlı protokolden geçer. Sonra paragrafı kendi cümlenizle yeniden yazarsınız."],
          ["Beyan sizin", "Hangi araç, hangi aşama, hangi bölüm — yöntem bölümüne ya da derginin istediği yere yazılır."],
        ].map(([t, d], i) => (
          <Fade key={t} delay={0.06 * i}>
            <div className="lz-card px-4 py-4 h-full">
              <div
                className="font-mono text-[11px] uppercase tracking-[0.16em] mb-2"
                style={{ color: ACCENT }}
              >
                {i + 1}
              </div>
              <div className="text-white font-semibold text-sm mb-1.5">{t}</div>
              <div className="text-[13px] text-white/50 leading-relaxed">{d}</div>
            </div>
          </Fade>
        ))}
      </div>
      <Source>
        YÖK rehberi (Mayıs 2024) ve Elsevier (Haziran 2026) yazarlığı
        sorumlulukla tanımlıyor; taslak üretimini beyan koşuluyla serbest
        bırakıyor. Sınır, tartışma ve yorum bölümleri: YÖK bunları açıkça
        kapsam dışı sayıyor.
      </Source>
    </Slide>
  ),

  /* Akışın tamamı */
  () => (
    <Slide>
      <Eyebrow>Beş aşama</Eyebrow>
      <H2>Hangi araç, hangi aşamada, ne çıkarır.</H2>
      <div className="mt-6 grid md:grid-cols-5 gap-3">
        {[
          ["Kapsam", "Gemini + NotebookLM", "Alanın haritası, 20–40 doğrulanmış kaynak, bir sayfalık kapsam notu"],
          ["Yapı", "Claude", "Bölüm iskeleti, her bölümün iddiası, tablo/şekil listesi, eksik bilgi soruları"],
          ["Deney", "Claude + siz", "Varsa model eğitimi: kod araçtan, çalıştırma ve sonuç sizden"],
          ["Taslak", "Claude — yönetimli", "Bölüm bölüm, yalnızca kaynak listesinden, her iddia alıntılı; sonra sizin kaleminiz"],
          ["Dil ve beyan", "DeepL Write + siz", "Kendi cümlenizin akıcı hâli; beyan metni; gönderim"],
        ].map(([t, arac, cikti], i) => (
          <Fade key={t} delay={0.06 * i}>
            <div className="lz-card px-4 py-4 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="grid place-items-center w-6 h-6 rounded-full font-mono text-[11px] text-black shrink-0"
                  style={{ background: ACCENT }}
                >
                  {i + 1}
                </span>
                <span className="text-white font-semibold text-sm">{t}</span>
              </div>
              <div
                className="font-mono text-[10px] uppercase tracking-[0.14em] mb-2"
                style={{ color: ACCENT }}
              >
                {arac}
              </div>
              <div className="text-[13px] text-white/50 leading-relaxed">{cikti}</div>
            </div>
          </Fade>
        ))}
      </div>
      <Fade delay={0.35}>
        <div className="lz-warn mt-5 px-5 py-3.5">
          <p className="text-sm text-white/70 leading-relaxed">
            Her aşamanın çıktısı bir sonrakinin girdisi — ama aradaki geçişte
            hep siz varsınız. Kapsam notunu siz onaylamadan yapı çıkmaz;
            iskeleti siz onaylamadan taslak yazılmaz. Aracı araca
            bağlamıyorsunuz; aracı size bağlıyorsunuz.
          </p>
        </div>
      </Fade>
    </Slide>
  ),

  /* Aşama 1 · Gemini + NotebookLM */
  () => (
    <Slide>
      <Eyebrow>Aşama 1 · kapsam</Eyebrow>
      <H2>Gemini haritayı çizer, NotebookLM kaynağa bağlar.</H2>
      <Sub>
        İkisi aynı işi yapmıyor. Gemini&apos;nin derin araştırma kipi web&apos;i
        tarayıp alanın genel görünümünü verir — kaynaklı ama doğrulanmamış.
        NotebookLM ise yalnızca yüklediğiniz PDF&apos;lerden konuşur.
        Sıra: önce harita, sonra kaynak.
      </Sub>
      <div className="mt-5 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div>
            <Tag>Gemini · derin araştırma</Tag>
            <Prompt>{`[KONU] üzerine yüksek lisans makalesi yazacağım.
Web'i tarayarak kaynaklı bir rapor hazırla:
1. Alandaki 5 ana tartışma başlığı
2. Her başlık için en çok atıf alan 3 çalışma
   (yazar, yıl, dergi, DOI)
3. Son 3 yılda öne çıkan yöntemler
4. Türkiye bağlamında yapılmış çalışmalar
DOI'sini bulamadığın çalışmayı yazma; "bulunamadı" de.`}</Prompt>
            <p className="mt-2.5 text-[13px] text-white/45 leading-relaxed">
              Rapordaki her DOI dört adımlı protokolden geçer; geçenler
              kaynakçaya, PDF&apos;leri NotebookLM&apos;e gider.
            </p>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div>
            <Tag>NotebookLM · kapsam notu</Tag>
            <Prompt>{`Defterdeki kaynaklara dayanarak:
1. Hangi kaynak hangi veri setini ve yöntemi
   kullanmış — tablo
2. Bulguların birbiriyle çeliştiği noktalar
3. Yazarların "gelecek çalışma" diye bıraktığı sorular
4. Benim sorumun ([SORU]) hangi kaynaklarda doğrudan,
   hangilerinde dolaylı ele alındığı
Her madde için kaynak numarası ver; defterde olmayan
bilgiyi ekleme.`}</Prompt>
            <p className="mt-2.5 text-[13px] text-white/45 leading-relaxed">
              Çıktı: bir sayfalık kapsam notu — ne içeride, ne dışarıda, boşluk
              nerede. Bunu siz yazarsınız; NotebookLM malzemeyi verir.
            </p>
          </div>
        </Fade>
      </div>
      <Source>
        gemini.google · notebooklm.google — derin araştırma kipinin ücretsiz
        katmandaki sınırı sık değişiyor; güncel hâli için destek sayfasına
        bakın. Erişim 14 Eylül 2026
      </Source>
    </Slide>
  ),

  /* Gemini · ekranda */
  () => (
    <ScreenSlide
      eyebrow="Gemini · ekranda"
      title="Derin araştırma kipi."
      mock={<GeminiResearch />}
      steps={[
        ["Kipi seçin", "Soruyu yazmadan önce “Deep Research” seçili olmalı; yoksa sıradan sohbet cevabı alırsınız — ezberden, kaynaksız."],
        ["Planı düzenleyin", "Gemini önce bir araştırma planı gösterir. Eksik adımı ekleyin (“Türkiye bağlamı”), gereksizi silin; sonra başlatın. Plan, sizin kapsam kararınız."],
        ["Rapor ve kaynaklar", "Dakikalar sonra kaynak bağlantılı rapor gelir. Bu bir harita, kaynakça değil: her DOI'yi açın, açılmayanı silin, açılanın PDF'ini indirin. Raporun cümlelerini makaleye taşımayın."],
      ]}
      note="Derin araştırma kipinin ücretsiz katmandaki sınırı değişiyor; Google'ın destek sayfasına bakın."
    />
  ),

  /* Aşama 2 · Claude ile yapı */
  () => (
    <Slide>
      <Eyebrow>Aşama 2 · yapı</Eyebrow>
      <H2>Claude&apos;a iskeleti çıkartın — metni değil.</H2>
      <Sub>
        Claude&apos;da makale için bir Proje açın; kapsam notunu, NotebookLM
        tablolarını ve hedef derginin yazım kurallarını yükleyin. Uzun
        bağlamla çalışmak bu aşamada işe yarıyor: kırk kaynağın özeti tek
        seferde önünde duruyor.
      </Sub>
      <div className="mt-5">
        <Prompt>{`Ekteki kapsam notuna ve kaynak tablosuna dayanarak [DERGİ]
için makale iskeleti çıkar:
- Bölüm başlıkları; her bölüm için tek cümlelik iddia
- Her bölümde hangi kaynakların kullanılacağı — yalnızca
  ekteki listeden, kaynak numarasıyla
- Tablo ve şekil listesi (başlık + hangi veriden)
- Yöntem bölümü için eksik bilgiler — bana soru olarak
- Hakemin bu iskelete yapacağı ilk üç itiraz
Metin yazma; yalnızca iskelet. Listede olmayan kaynak
önerme.`}</Prompt>
      </div>
      <Fade delay={0.2}>
        <div className="mt-4 grid md:grid-cols-3 gap-3 text-[13px] leading-relaxed">
          <div className="lz-card px-4 py-3">
            <span className="text-white font-semibold">İskeleti siz onaylarsınız. </span>
            <span className="text-white/50">Her bölümün iddia cümlesini okuyun; katılmadığınızı değiştirin. Bu cümleler makalenin omurgası.</span>
          </div>
          <div className="lz-card px-4 py-3">
            <span className="text-white font-semibold">Eksik bilgi soruları altın. </span>
            <span className="text-white/50">Araç &ldquo;örneklem büyüklüğü nedir&rdquo; diye soruyorsa yöntem bölümünde o boşluk var demektir.</span>
          </div>
          <div className="lz-card px-4 py-3">
            <span className="text-white font-semibold">Danışmana bu hâliyle gidin. </span>
            <span className="text-white/50">Bir sayfalık iskelet üstünde tartışmak, otuz sayfalık taslak üstünde tartışmaktan ucuz.</span>
          </div>
        </div>
      </Fade>
    </Slide>
  ),

  /* Claude Projects · ekranda */
  () => (
    <ScreenSlide
      eyebrow="Claude · ekranda"
      title="Makale başına bir Proje."
      mock={<ClaudeProject />}
      steps={[
        ["Proje bilgisi", "Kapsam notu, kaynak tablosu (K-Dense CSV), NotebookLM çıktıları, derginin yazım kuralları. Projedeki her sohbet bu dosyaları görür; her seferinde yeniden yüklemezsiniz."],
        ["Talimatlar", "Projeye kalıcı kural: “Yalnızca proje dosyalarındaki kaynakları kullan; listede olmayan çalışma önerme; emin değilsen sor.” Bu kutu, halüsinasyona karşı en ucuz sigorta."],
        ["İskelet çıktısı", "Bölüm, iddia cümlesi, kaynak numaraları, tablo listesi — ve size sorular. Soruları cevaplayıp iskeleti onaylamadan taslağa geçmeyin."],
      ]}
      note="Ücretsiz katmanda sınırlı sayıda proje açılabiliyor; bir makale için bir proje yeterli."
    />
  ),

  /* Aşama 3 · Model eğitimi */
  () => (
    <Slide>
      <Eyebrow>Aşama 3 · deney</Eyebrow>
      <H2>Makine öğrenmesi varsa: kod araçtan, sonuç sizden.</H2>
      <Sub>
        Makalede eğitilecek bir model varsa Claude kodu yazar; veriyi siz
        verirsiniz, kodu siz çalıştırırsınız, sonucu siz okursunuz. Aracın
        &ldquo;sonuç&rdquo; yazdığı hiçbir sayı makaleye girmez.
      </Sub>
      <div className="mt-5 grid md:grid-cols-[1.2fr_1fr] gap-4">
        <Fade delay={0.08}>
          <Prompt>{`Veri: [SATIR SAYISI, ÖZELLİKLER, HEDEF DEĞİŞKEN].
Görev: [SINIFLANDIRMA / REGRESYON / ...]. Model: [MODEL].
Python kodu yaz:
- Katmanlı train/val/test ayrımı, sabit tohum
- Ön işleme yalnızca eğitim verisiyle fit edilsin
  (test verisi sızmasın)
- Eğitim döngüsü, erken durdurma, hiperparametre tablosu
- Metrikler: [...]; sonuçları CSV'ye ve karışıklık
  matrisini PNG'ye yaz
Her bloğu yorumla. Sonuç sayısı uydurma — kodu ben
çalıştıracağım. Sonra: "bu kodda veri sızıntısı
olabilecek yerler" diye kendi kodunu denetle.`}</Prompt>
        </Fade>
        <Fade delay={0.16}>
          <div className="space-y-2.5">
            {[
              ["Sızıntı denetimi", "En yaygın hata: ölçekleme ya da özellik seçimi tüm veriyle yapılıyor. Araca kendi kodunu denetletin; sonra siz de bakın."],
              ["Bir metriği elle", "Karışıklık matrisinden doğruluğu elle hesaplayın; kodun yazdığıyla tutmalı."],
              ["Yeniden üretilebilirlik", "Tohum, kütüphane sürümleri, hiperparametreler yöntem bölümüne. Kod deposunu paylaşın."],
              ["Beyan", "“Model eğitim kodu [ARAÇ] yardımıyla yazılmış, yazar tarafından gözden geçirilip çalıştırılmıştır.”"],
            ].map(([t, d]) => (
              <div key={t} className="lz-card px-4 py-3">
                <div className="text-white font-semibold text-sm">{t}</div>
                <div className="text-[13px] text-white/50 leading-relaxed mt-0.5">{d}</div>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </Slide>
  ),

  /* Aşama 4 · Yönetimli taslak */
  () => (
    <Slide>
      <Eyebrow>Aşama 4 · taslak</Eyebrow>
      <H2>Yönetimli yazdırma: bölüm bölüm, listeden, alıntılı.</H2>
      <Sub>
        İskelet onaylandı, sonuçlar elde. Şimdi araç yazabilir — üç kısıtla:
        tek seferde tek bölüm, yalnızca sizin kaynak listeniz, her iddiaya
        kaynak numarası ve birebir alıntı. Sonra her paragrafı siz yeniden
        yazarsınız.
      </Sub>
      <div className="mt-5 grid md:grid-cols-[1.2fr_1fr] gap-4">
        <Fade delay={0.08}>
          <Prompt>{`Onaylı iskeletin [BÖLÜM] bölümünü yaz.
Kısıtlar:
- Yalnızca ekteki kaynak listesinden atıf yap; her atıf
  için kaynak numarası ve o kaynaktan birebir bir cümle
  (tırnak içinde) ver
- Listede olmayan hiçbir çalışmaya, sayıya ya da iddiaya
  yer verme; gerekiyorsa [KAYNAK GEREKLİ] yaz
- Bölümün iddia cümlesinin dışına çıkma
- Yorum ve değerlendirme yazma; onları ben yazacağım
- Kelime sınırı: [N]
Bitince, hangi cümlelerin kaynaklardan, hangilerinin
senin bağlantı cümlen olduğunu işaretle.`}</Prompt>
        </Fade>
        <Fade delay={0.16}>
          <div className="space-y-2.5">
            {[
              ["Tartışma ve sınırlılık hariç", "Bu iki bölümü araca yazdırmayın. YÖK rehberi açıkça kapsam dışı sayıyor; hakem de tam burada sizi sınıyor."],
              ["Her alıntıyı açın", "Aracın verdiği tırnak içi cümle kaynakta o hâliyle var mı? Ctrl+F. Yoksa paragraf çöpe."],
              ["Kendi kaleminizden geçirin", "Her paragrafı kapatıp kendi cümlenizle yeniden yazın. Ses sizin olur; sonraki aşamada saklayacak bir şey kalmaz."],
              ["Beyan", "“Taslak metin [ARAÇ] ile üretilmiş, yazar tarafından doğrulanıp yeniden yazılmıştır.”"],
            ].map(([t, d]) => (
              <div key={t} className="lz-card px-4 py-3">
                <div className="text-white font-semibold text-sm">{t}</div>
                <div className="text-[13px] text-white/50 leading-relaxed mt-0.5">{d}</div>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </Slide>
  ),

  /* Aşama 5 · DeepL — gidiş-dönüş */
  () => (
    <Slide>
      <Eyebrow>Aşama 5 · dil</Eyebrow>
      <H2>DeepL &ldquo;gidiş-dönüş&rdquo;: ne yapıyor, neden bırakıyorum.</H2>
      <Sub>
        Yaygın yöntem şu: bitmiş İngilizce metni DeepL ile Türkçeye, sonra
        tekrar İngilizceye çevirmek. Tespit aracı genellikle %0 gösteriyor.
        Ben de denedim; işe yarar gibi görünüyor. Dört sebeple bu sunumda
        tavsiye olarak değil, uyarı olarak duruyor.
      </Sub>
      <div className="mt-5 grid md:grid-cols-2 gap-3">
        {[
          [Scale, "Kural açık", "Ankara Üniversitesi yönergesi tespit aracını aşmaya yönelik kullanımı ihlal sayıyor; yayıncılar “humanizer” araçlarını aynı kategoriye koyuyor. Amaç saklamaksa, yöntem ne olursa olsun kategori bu."],
          [Target, "Yanlış soruyu çözüyor", "Metni araç yazdıysa sorun tespit değil, yazarlık — Aşama 4 bunun cevabı. Metni siz yazdıysanız saklayacak bir şey yok; beyan edip geçin."],
          [Languages, "Metni bozuyor", "İki çeviri terimi kaydırır: “effect size” → “etki boyutu” → “impact size”. Tırnak içi alıntı değişir, 1.5 ile 1,5 yer değiştirir, hedge ifadeleri (“may suggest”) kesinleşir."],
          [Gauge, "%0 hiçbir şey demek değil", "Tespit araçları olasılık verir, kanıt değil. Liang vd. (2023) ana dili İngilizce olmayanların kendi metnini bile işaretlediğini gösterdi; sayı her iki yönde güvenilmez."],
        ].map(([Icon, t, d], i) => {
          const I = Icon as React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
          return (
            <Fade key={String(t)} delay={0.06 * i}>
              <div className="flex items-start gap-3 lz-card px-4 py-3.5 h-full">
                <I className="w-4 h-4 shrink-0 mt-1" style={{ color: ACCENT }} />
                <div>
                  <div className="text-white font-medium text-sm">{String(t)}</div>
                  <div className="text-[13px] text-white/50 leading-relaxed mt-0.5">{String(d)}</div>
                </div>
              </div>
            </Fade>
          );
        })}
      </div>
      <Fade delay={0.3}>
        <div className="lz-warn mt-4 px-5 py-3.5">
          <p className="text-sm text-white/70 leading-relaxed">
            <strong className="text-white">Yerine yaptığım:</strong>{" "}Aşama
            4&apos;te her paragrafı kendi cümlemle yeniden yazıyorum; sonra
            DeepL Write ile yalnızca akıcılığı düzelttiriyorum ve beyana
            &ldquo;DeepL Write, dil düzeltmesi&rdquo; yazıyorum. Tespit aracına
            hiç bakmıyorum — savunmam günlük, taslaklar ve doğrulanmış kaynakça.
          </p>
        </div>
      </Fade>
      <Source>
        Ankara Üniversitesi — Yükseköğretimde Üretken Yapay Zekâ Kullanımına
        İlişkin Yönerge · Liang W. vd. (2023). Patterns — PMID 37521038 ·
        deepl.com/write — erişim 14 Eylül 2026
      </Source>
    </Slide>
  ),

  /* DeepL Write · ekranda */
  () => (
    <ScreenSlide
      eyebrow="DeepL Write · ekranda"
      title="Çeviri değil, düzeltme sekmesi."
      mock={<DeepLWrite />}
      steps={[
        ["Write sekmesi ve üslup", "“Translate” değil “Write”. Üslubu “Academic” seçin; gündelik ifadeleri akademik karşılığıyla değiştirir."],
        ["Sizin metniniz", "Kendi yazdığınız İngilizce — hatalı da olsa. Paragraf paragraf yapıştırın; tek seferde tüm makaleyi değil, çünkü her değişikliği okuyacaksınız."],
        ["Düzeltilmiş metin", "Vurgulu yerler değişen kelimeler. Her birine tıklayıp alternatifi görün; terimi değiştirdiyse (“RCT” → “randomised controlled trial” gibi) derginin tercihine göre geri alın."],
        ["Değişiklik sayısı ve kopyalama", "Üçten fazla değişiklik olan paragrafı bir daha okuyun: anlam kaymış olabilir. Beyana “DeepL Write — dil düzeltmesi” yazın; bu kadar."],
      ]}
      note="Hesapsız kullanımda karakter sınırı var; paragraf paragraf çalışmak zaten doğru yöntem."
    />
  ),

  /* %0 */
  () => (
    <Slide>
      <Eyebrow>Sayının anlamı</Eyebrow>
      <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-12 items-center">
        <BigStat
          value="%0"
          label="Tespit aracının verdiği sayı"
          detail="Metnin sizin olduğunu kanıtlamaz; olmadığını da. Olasılık tahmini — ve yanlı bir tahmin."
        />
        <div>
          <H2>Savunma sayı değil, iz.</H2>
          <Sub>
            Editör ya da jüri &ldquo;bunu siz mi yazdınız&rdquo; diye
            sorduğunda tespit puanı göstermek işe yaramıyor; iki taraf da o
            puanın ne kadar güvenilmez olduğunu biliyor. İşe yarayan dört şey:
          </Sub>
          <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2">
            {[
              "Tarihli taslaklar — sürüm geçmişi",
              "Kullanım günlüğü — araç, sürüm, aşama",
              "Her DOI'si açılan bir kaynakça",
              "Beyan metni — baştan yazılmış",
            ].map((t) => (
              <div key={t} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: ACCENT }} />
                <span className="text-sm text-white/65 leading-relaxed">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  ),

  /* ═══ Bölüm 8 · Halüsinasyon ═══ */
  () => (
    <Divider
      num="8"
      title="Halüsinasyon"
      subtitle="Sunumun en uzun bölümü. Çünkü lisansüstü öğrencinin bir makalede yapabileceği en pahalı hata bu — ve tamamen önlenebilir."
      icerik={["Neden olur", "Sayılar", "Nerede olur", "Anatomisi", "Azaltma", "Doğrulama protokolü", "Araç"]}
    />
  ),

  /* Neden olur */
  () => (
    <Slide>
      <Eyebrow>Neden olur</Eyebrow>
      <H2>Model bilmiyor; tamamlıyor.</H2>
      <Sub>
        Büyük dil modeli bir veritabanına bakmıyor. Şimdiye kadarki metne
        göre &ldquo;sonraki kelime ne olabilir&rdquo; sorusuna cevap veriyor.
        Bir künye istediğinizde, künyeye benzeyen en olası kelime dizisini
        yazıyor. Gerçek bir makaleye denk gelmesi olasılık meselesi.
      </Sub>
      <div className="mt-7 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={Bot} title="Bilmediğini bilmiyor">
            Emin olduğu ve uydurduğu cümle aynı tonda çıkıyor. Metindeki
            özgüven, doğruluk hakkında hiçbir şey söylemiyor.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={Compass} title="Parçalar gerçek, bütün değil">
            Gerçek bir yazar, gerçek bir dergi, makul bir yıl, makul bir
            başlık — dört gerçek parça, var olmayan bir bileşim.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Target} title="Sizin istediğinizi verir">
            &ldquo;X&apos;in Y&apos;yi artırdığını gösteren makale bul&rdquo;
            derseniz, bulur — olmasa bile. İstemin yönü, uydurmanın yönünü
            belirler.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed max-w-3xl">
          Web araması ve kaynağa bağlı araçlar bu mekanizmayı değiştiriyor:
          model önce gerçek belgeyi buluyor, sonra ondan konuşuyor. Bu yüzden
          bölümün geri kalanındaki ilk tavsiye hep aynı: aramayı açın.
        </p>
      </Fade>
    </Slide>
  ),

  /* Sayılar */
  () => (
    <Slide>
      <Eyebrow>Sayılar</Eyebrow>
      <H2>Ne kadar sık? Ölçüldü.</H2>
      <Sub>
        Üç hakemli çalışma, sohbet modellerine literatür özeti yazdırıp
        çıkan kaynakları tek tek kontrol etti.
      </Sub>
      <div className="mt-7">
        <CompareBars
          unit="%"
          items={[
            { label: "Bard — Chelli vd. 2024, sistematik derleme soruları", value: 91.4, caption: "104 kaynağın 95'i uydurma. Aynı çalışmada hiçbir gerçek makaleyi doğru getiremedi." },
            { label: "GPT-3.5 — Walters & Wilder 2023, 42 konu, 636 künye", value: 55, caption: "Gerçek olan künyelerin de %43'ünde ciddi hata (yanlış yıl, cilt, sayfa)." },
            { label: "GPT-3.5 — Bhattacharyya vd. 2023, tıp", value: 47, caption: "Kaynakların %47'si uydurma; gerçek ama hatalı olanlar da eklenince yalnızca %7'si tam doğru." },
            { label: "GPT-4 — Walters & Wilder 2023", value: 18, muted: true, caption: "Model geliştikçe düşüyor — ama sıfır değil. Beş künyeden biri hâlâ uydurma." },
          ]}
        />
      </div>
      <Source>
        Walters W.H., Wilder E.I. (2023). Scientific Reports 13, 14045 —
        doi:10.1038/s41598-023-41032-5 · Chelli M. vd. (2024). J Med Internet
        Res 26:e53164 — doi:10.2196/53164 · Bhattacharyya M. vd. (2023). Cureus
        15(5):e39238 — doi:10.7759/cureus.39238. Ölçümler web araması KAPALI
        modellerle yapıldı; bugünkü modellerde ve arama açıkken oran daha
        düşük, ama sıfır değil.
      </Source>
    </Slide>
  ),

  /* Sıfır değil */
  () => (
    <Slide>
      <Eyebrow>Sonuç</Eyebrow>
      <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-12 items-center">
        <BigStat
          value="1/5"
          label="GPT-4'ün ürettiği künyelerden uydurma olanı"
          detail="Walters & Wilder 2023. Yeni modeller daha iyi — ama ‘daha iyi’ ile ‘kontrol etmeye gerek yok’ arasında büyük mesafe var."
        />
        <div>
          <H2>Oran düşüyor. Kural değişmiyor.</H2>
          <Sub>
            Bir kaynakçada 40 künye varsa, %5&apos;lik hata oranı bile iki
            uydurma kaynak demek. Hakem birini bulursa geri kalan 38&apos;ine
            de güvenmez; makale reddedilir, kimi dergilerde yazar kara
            listeye girer.
          </Sub>
          <Fade delay={0.2}>
            <div className="lz-warn mt-6 px-5 py-3.5">
              <p className="text-sm text-white/70 leading-relaxed">
                Kural: <strong className="text-white">yapay zekâdan gelen hiçbir
                künye, DOI&apos;si açılıp başlığı ve yazarı eşleşmeden kaynakçaya
                girmez.</strong>{" "}İstisnası yok; aracın adı ne olursa olsun.
              </p>
            </div>
          </Fade>
        </div>
      </div>
    </Slide>
  ),

  /* Nerede olur */
  () => (
    <Slide>
      <Eyebrow>Nerede olur</Eyebrow>
      <H2>Yalnızca atıfta değil.</H2>
      <Sub>
        Uydurma künye en görüneni; ama akademik metinde beş ayrı yerde
        karşınıza çıkıyor ve bazıları çok daha zor fark ediliyor.
      </Sub>
      <div className="mt-6 grid md:grid-cols-2 gap-x-6 gap-y-3">
        {[
          [FileSearch, "Uydurma künye", "Var olmayan makale; gerçek yazarla uydurma başlık. En kolay yakalanan: DOI açılmıyor."],
          [Link2, "Gerçek kaynak, yanlış iddia", "Makale var ama o şeyi söylemiyor. En tehlikeli tür — DOI açılıyor, hakem okuyunca ortaya çıkıyor."],
          [Calculator, "Uydurma sayı", "“Katılımcıların %73'ü…”, “etki büyüklüğü 0,42” — hiçbir makalede olmayan, ikna edici rakam."],
          [Quote, "Uydurma alıntı", "Gerçek bir yazara, hiç kurmadığı tırnak içi cümle. Özellikle kuramsal çerçeve bölümünde."],
          [History, "Yanlış tarih ve kişi", "Kuramı yanlış kişiye, ölçeği yanlış yıla bağlamak. Alanı yeni öğrenen biri fark edemiyor."],
          [FlaskConical, "Uydurma yöntem detayı", "Makalede geçmeyen örneklem büyüklüğü, ölçek adı, analiz tekniği. Özet istediğinizde boşlukları doldurur."],
        ].map(([Icon, t, d], i) => {
          const I = Icon as React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
          return (
            <Fade key={String(t)} delay={0.05 * i}>
              <div className="flex items-start gap-3 lz-card px-4 py-3.5">
                <I className="w-4 h-4 shrink-0 mt-1" style={{ color: ACCENT }} />
                <div>
                  <div className="text-white font-medium text-sm">{String(t)}</div>
                  <div className="text-sm text-white/50 leading-relaxed mt-0.5">{String(d)}</div>
                </div>
              </div>
            </Fade>
          );
        })}
      </div>
    </Slide>
  ),

  /* Anatomisi */
  () => (
    <Slide>
      <Eyebrow>Anatomisi</Eyebrow>
      <H2>Uydurma bir künye böyle görünüyor.</H2>
      <Sub>
        Bu künye bu slayt için uyduruldu; kimseye ait değil. İşi zor yapan
        şu: parçaların çoğu gerçek. Yalnızca ikisi uydurma ve tam da onlar
        göze çarpmıyor.
      </Sub>
      <Fade delay={0.15}>
        <div className="lz-card mt-6 px-6 py-5 font-mono text-[15px] leading-[1.9]">
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
            [true, "Computers & Education", "Gerçek dergi, gerçek cilt numarası. Modelin en sağlam bildiği parça — ve künyeye güvenilirliğini veren de bu."],
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
    </Slide>
  ),

  /* Mata v. Avianca */
  () => (
    <Slide>
      <Eyebrow>Gerçek bir olay</Eyebrow>
      <H2>Mahkemeye altı uydurma karar sunuldu.</H2>
      <Sub>
        2023, New York. İki avukat, ChatGPT&apos;nin ürettiği altı emsal
        kararı dilekçeye koydu — kararlar, alıntılar ve gerekçeler
        tamamen uydurmaydı. Mahkeme 5.000 dolar para cezası verdi ve
        avukatları, adına sahte karar atfedilen her hâkime mektup yazmaya
        mahkûm etti.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.1}>
          <div className="lz-card p-5">
            <Tag>Avukat neden yakalandı</Tag>
            <p className="text-sm text-white/55 leading-relaxed">
              Karşı taraf kararları aradı, bulamadı. Avukat ChatGPT&apos;ye
              &ldquo;bu kararlar gerçek mi&rdquo; diye sordu; araç
              &ldquo;evet&rdquo; dedi. Tek kaynağı kendisine doğrulatmak,
              doğrulama değil.
            </p>
          </div>
        </Fade>
        <Fade delay={0.18}>
          <div className="lz-card p-5">
            <Tag>Akademideki karşılığı</Tag>
            <p className="text-sm text-white/55 leading-relaxed">
              Hakem bir künyeyi arar, bulamaz. Makale reddedilir; yayımlandıysa
              geri çekilir (retraction) ve geri çekme kaydı adınızla kalıcı
              olarak dizinlenir. Bir doktora öğrencisi için bu, kariyerin
              ilk satırı olur.
            </p>
          </div>
        </Fade>
      </div>
      <Source>
        Mata v. Avianca, Inc., 1:22-cv-01461 (S.D.N.Y.), 22 Haziran 2023
        tarihli yaptırım kararı — law.justia.com
      </Source>
    </Slide>
  ),

  /* Azaltma teknikleri */
  () => (
    <Slide>
      <Eyebrow>Azaltma · istem düzeyinde</Eyebrow>
      <H2>Altı teknik — hiçbiri sıfırlamaz, hepsi azaltır.</H2>
      <div className="mt-7 grid md:grid-cols-3 gap-4">
        <Fade delay={0.06}>
          <Card icon={Globe} title="1 · Aramayı açın">
            En etkili tek adım. Arama açıkken model gerçek sayfayı bulup
            ondan alıntılıyor; bağlantıyı da veriyor. Bağlantı yoksa iddia da
            yok sayın.
          </Card>
        </Fade>
        <Fade delay={0.12}>
          <Card icon={Database} title="2 · Kaynağa bağlı araç seçin">
            Atıf sorusu için sohbet modeli değil K-Dense / Semantic
            Scholar. Bu araçlar var olmayan makaleyi listeleyemiyor.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={MessageSquare} title="3 · Bilmiyorum demesine izin verin">
            &ldquo;Emin değilsen &lsquo;bilmiyorum&rsquo; yaz; kaynak
            uydurma.&rdquo; Modeli, cevap vermeye zorlayan varsayılan
            davranıştan kurtarıyor.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Quote} title="4 · Alıntı ve DOI isteyin">
            &ldquo;Her iddia için DOI ve makaleden birebir cümle.&rdquo;
            Uydurmak zorlaşıyor; uydurduğunda da denetlemek kolaylaşıyor.
          </Card>
        </Fade>
        <Fade delay={0.3}>
          <Card icon={FileText} title="5 · Belgeyi kendiniz verin">
            Makaleyi yükleyin; &ldquo;yalnızca bu belgeye dayan&rdquo; deyin.
            Model artık hafızasından değil, önündeki metinden konuşuyor.
          </Card>
        </Fade>
        <Fade delay={0.36}>
          <Card icon={Eye} title="6 · Bulmasını değil, seçmesini isteyin">
            Kendi bulduğunuz 20 künyeyi verin: &ldquo;bu listeden şu iddiayı
            destekleyenleri seç.&rdquo; Liste dışına çıkamaz; uydurma
            ihtimali yapısal olarak kapanır.
          </Card>
        </Fade>
      </div>
    </Slide>
  ),

  /* İstem 6 — kaynaklı cevap */
  () => (
    <Slide>
      <Eyebrow>İstem 6 · kaynaklı literatür sorusu</Eyebrow>
      <H2>Sohbet modeline atıf soracaksanız, böyle sorun.</H2>
      <Sub>
        K-Dense daha güvenli; ama sohbet modeline soracaksanız
        istem, altı tekniğin dördünü birden içermeli.
      </Sub>
      <div className="mt-6">
        <Prompt>{`Web aramasını kullanarak şu soruya cevap ver: [SORU].

Kurallar:
- Yalnızca gerçekten bulup açtığın hakemli makalelere dayan.
- Her makale için: yazarlar, yıl, dergi, DOI ve makaleden
  birebir bir cümle (tırnak içinde).
- DOI'sini bulamadığın makaleyi listeye ALMA.
- Emin olmadığın her noktada "doğrulanamadı" yaz.
- Sonunda, cevabının hangi kısmının makalelerden geldiğini,
  hangi kısmının senin sentezin olduğunu ayır.`}</Prompt>
      </div>
      <Fade delay={0.2}>
        <p className="mt-5 text-sm text-white/50 leading-relaxed max-w-3xl">
          Bu istem bile denetimi kaldırmıyor: gelen her DOI&apos;yi yine
          açacaksınız. Yaptığı şey, açınca boş çıkan DOI sayısını düşürmek.
        </p>
      </Fade>
    </Slide>
  ),

  /* Doğrulama protokolü */
  () => (
    <Slide>
      <Eyebrow>Doğrulama protokolü</Eyebrow>
      <H2>Dört adım, her künye için.</H2>
      <Sub>
        Sırası önemli: birinci adımda elenen künye için diğerlerine bakmaya
        gerek yok; dördüncü adıma kadar gelen künye kaynakçaya girebilir.
      </Sub>
      <div className="mt-6">
        <Steps
          items={[
            { t: "DOI'yi açın", d: "doi.org/<numara> adresine gidin. Açılmıyorsa künye yoktur; tartışma bitti. DOI'siz kaynak (kitap, bildiri) için Google Scholar'da başlığı tırnak içinde arayın." },
            { t: "Başlık, yazar, yıl, dergi eşleşiyor mu", d: "DOI açıldı ama başka bir makaleye gitti — bu da uydurmadır. Dördü de birebir tutmalı; 'yaklaşık' yok." },
            { t: "Makale gerçekten o şeyi söylüyor mu", d: "En çok atlanan adım. Makaleyi açın, atıf yaptığınız iddiayı bulun. Bulamıyorsanız, kaynak gerçek ama atıf sahte." },
            { t: "Sayfa ve sayı tutuyor mu", d: "Doğrudan alıntı yapıyorsanız sayfa numarası; sayı veriyorsanız o sayı makalede aynen geçiyor mu. Yuvarlamayı bile kontrol edin." },
          ]}
        />
      </div>
    </Slide>
  ),

  /* Atıf denetleyici */
  () => (
    <Slide>
      <Eyebrow>Araç</Eyebrow>
      <H2>Birinci ve ikinci adımı otomatikleştirin.</H2>
      <Sub>
        Kırk künyeyi tek tek doi.org&apos;a yapıştırmak yorucu.
        osmancancetlenbik.com/araclar adresindeki Atıf Denetleyici,
        kaynakçanızdaki her DOI&apos;yi CrossRef veritabanında sorgulayıp
        gerçek kaydı yanınıza koyuyor. Ücretsiz, üyeliksiz.
      </Sub>
      <Fade delay={0.2}>
        <div className="mt-6">
          <EmbeddedTool
            slug="atif-denetleyici"
            title="Atıf Denetleyici"
            hint="Kaynakçanızı yapıştırıp burada deneyin — sunumdan çıkmanıza gerek yok."
          />
        </div>
      </Fade>
      <Fade delay={0.3}>
        <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm text-white/45 leading-relaxed">
          <p>
            Var olmayan kaynak kırmızıyla işaretlenir; var olanın gerçek
            başlığı ve yazarı gösterilir — sizin künyenizle karşılaştırın.
          </p>
          <p>
            Yalnızca DOI&apos;li kaynakları denetler; üçüncü adımı (makale o
            şeyi söylüyor mu) hiçbir araç yapmıyor. Orası sizin.
          </p>
        </div>
      </Fade>
    </Slide>
  ),

  /* Gerçek kaynak yanlış iddia */
  () => (
    <Slide>
      <Eyebrow>En tehlikeli tür</Eyebrow>
      <H2>Kaynak gerçek, iddia sahte.</H2>
      <Sub>
        DOI açılıyor, başlık tutuyor, dergi saygın. Ama makale sizin
        atfettiğiniz şeyi söylemiyor — ya tam tersini söylüyor ya da o
        konuya hiç girmiyor. Atıf denetleyicileri bunu yakalayamıyor;
        hakem yakalıyor.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="lz-card p-5">
            <Tag>Nasıl oluşuyor</Tag>
            <ul className="space-y-1.5 text-sm text-white/60 leading-relaxed">
              <li>· Model gerçek bir makaleyi hatırlıyor, içeriğini uyduruyor</li>
              <li>· Özet aracı makalenin sınırlılığını atlıyor, bulguyu abartıyor</li>
              <li>· Siz ikinci elden alıntı yapıyorsunuz: A, B&apos;ye atıf yapmış; siz B&apos;yi okumadan A&apos;nın cümlesini B&apos;ye yazıyorsunuz</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="lz-card p-5">
            <Tag>Tek çözüm</Tag>
            <ul className="space-y-1.5 text-sm text-white/60 leading-relaxed">
              <li>· Atıf yaptığınız cümleyi makalede bulun — Ctrl+F ile</li>
              <li>· Bulamıyorsanız makaleyi verip sorun: &ldquo;Bu makale şu iddiayı destekliyor mu? Destekliyorsa cümleyi alıntıla&rdquo;</li>
              <li>· &ldquo;Aktaran&rdquo; atıfı dürüstçe yazın: (Demir, 2019, akt. Yılmaz, 2023)</li>
            </ul>
          </div>
        </Fade>
      </div>
    </Slide>
  ),

  /* Sayı halüsinasyonu */
  () => (
    <Slide>
      <Eyebrow>Sayılar</Eyebrow>
      <H2>&ldquo;Çalışmaların %68&apos;i&rdquo; — hangi çalışmalar?</H2>
      <Sub>
        Rakam içeren cümle daha bilimsel görünüyor; model de bunu biliyor.
        Kaynağını sormadığınız her yüzde, oran ve etki büyüklüğü varsayılan
        olarak uydurmadır.
      </Sub>
      <div className="mt-7 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={Calculator} title="Literatürden gelen sayı">
            &ldquo;Meta-analizde etki büyüklüğü d = 0,42&rdquo; — hangi
            meta-analiz, hangi tablo, hangi satır? Üçü yoksa sayı yok.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={Table2} title="Kendi verinizden gelen sayı">
            Modele tabloyu verip &ldquo;ortalama kaç&rdquo; demek risk;
            uzun tabloda yanılıyor. Kod yazdırın, kendiniz çalıştırın.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={AlertTriangle} title="Yuvarlak sayılar">
            &ldquo;Yaklaşık %70&rdquo;, &ldquo;binlerce çalışma&rdquo;,
            &ldquo;çoğu araştırmacı&rdquo; — makalede yeri olmayan
            ifadeler. Ya sayı ve kaynak, ya da cümle çıkar.
          </Card>
        </Fade>
      </div>
    </Slide>
  ),

  /* Kendini doğrulatma yanılgısı */
  () => (
    <Slide>
      <Eyebrow>Yanılgı</Eyebrow>
      <H2>&ldquo;Bu kaynaklar gerçek mi?&rdquo; diye araca sormayın.</H2>
      <Sub>
        Avianca davasındaki avukatın yaptığı buydu. Aynı model, kendi
        uydurduğu künyeye &ldquo;evet, gerçek&rdquo; diyor; çünkü künye ona
        gerçek gibi geliyor — üretmesinin sebebi de zaten bu.
      </Sub>
      <div className="mt-7">
        <Versus
          left={{
            label: "Doğrulama sayılmaz",
            items: [
              "Aynı araca “emin misin?” diye sormak",
              "Başka bir sohbet modeline sormak (aynı hatayı yapabilir)",
              "Künyenin biçiminin düzgün olması",
              "Derginin ve yazarın gerçek olması",
            ],
          }}
          right={{
            label: "Doğrulama sayılır",
            items: [
              "doi.org'da DOI'nin açılması ve başlığın eşleşmesi",
              "Google Scholar / Scopus / WoS'ta kaydın görülmesi",
              "Derginin kendi sitesinde cilt-sayı-sayfanın tutması",
              "Makaleyi açıp atfettiğiniz cümleyi bulmanız",
            ],
          }}
        />
      </div>
    </Slide>
  ),

  /* ═══ Bölüm 9 · Kurallar ═══ */
  () => (
    <Divider
      num="9"
      title="Kurallar"
      subtitle="Yayıncı ne istiyor, YÖK ve TÜBİTAK ne diyor, tezde nasıl beyan edilir, veri nereye gider."
      icerik={["Yayıncı beyanı", "Beyan metni", "YÖK", "TÜBİTAK", "KVKK", "Tez ve enstitü", "Tespit araçları"]}
    />
  ),

  /* Beyan nereye */
  () => (
    <Slide>
      <Eyebrow>Yayıncılar</Eyebrow>
      <H2>Beyan zorunlu — yeri her yayıncıda farklı.</H2>
      <Sub>
        Yapay zekâ kullandıysanız bunu bildirmek zorundasınız. Nereye
        yazacağınız yayıncıya göre değişiyor; dergi yönergesi bunun üstüne
        kendi kuralını ekleyebiliyor.
      </Sub>
      <div className="mt-6 overflow-x-auto">
        <table className="lz-table table-fixed">
          <thead>
            <tr>
              <th className="w-[30%]">Kurum</th>
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
            <tr>
              <td>YÖK rehberi (tez ve ulusal dergi)</td>
              <td>Yöntem bölümü — araç adı, sürüm ve aşama ile</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Fade delay={0.3}>
        <p className="mt-5 text-sm text-white/45 leading-relaxed max-w-3xl">
          Ortak istisna: temel dilbilgisi ve yazım denetimi genellikle beyan
          gerektirmiyor. Ortak yasak: hakem, değerlendirdiği makaleyi hiçbir
          araca yükleyemez; araştırma görseli üretilemez.
        </p>
      </Fade>
      <Source>
        elsevier.com generative-ai-policies (Haziran 2026) ·
        group.springernature.com AI guidance · open.ieee.org author guidelines
        (16 Nisan 2024) · publicationethics.org (13 Şubat 2023) · proje.yok.gov.tr
        (Mayıs 2024)
      </Source>
    </Slide>
  ),

  /* Beyan metni */
  () => (
    <Slide>
      <Eyebrow>Kopyalayıp uyarlayın</Eyebrow>
      <H2>Beyan metni nasıl yazılır?</H2>
      <Sub>
        Elsevier&apos;in kendi önerdiği kalıp ve Türkçe karşılığı. Üç şeyi
        söylüyor: hangi araç, ne için, sorumluluk kimde.
      </Sub>
      <div className="mt-5">
        <Prompt>{`Declaration of generative AI and AI-assisted
technologies in the manuscript preparation process

During the preparation of this work the author(s)
used [ARAÇ ADI] in order to [SEBEP]. After using
this tool/service, the author(s) reviewed and
edited the content as needed and take(s) full
responsibility for the content of the publication.`}</Prompt>
      </div>
      <Fade delay={0.18}>
        <div className="mt-4">
          <Prompt>{`Bu çalışmanın hazırlanma sürecinde [ARAÇ ADI, SÜRÜM]
[HANGİ AŞAMA — ör. literatür taramasında ön eleme ve
İngilizce dil düzeltmesi] amacıyla kullanılmıştır. Aracın
çıktıları yazar(lar) tarafından gözden geçirilmiş ve
düzenlenmiştir; içeriğin bilimsel ve etik sorumluluğunun
tamamı yazar(lar)a aittir.`}</Prompt>
        </div>
      </Fade>
      <Fade delay={0.26}>
        <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm leading-relaxed">
          <div className="lz-card px-4 py-3">
            <span className="text-white font-semibold">İyi sebep: </span>
            <span className="text-white/55">&ldquo;to improve the readability and language of the manuscript&rdquo; — somut ve sınırlı.</span>
          </div>
          <div className="lz-card px-4 py-3">
            <span className="text-white font-semibold">Kötü sebep: </span>
            <span className="text-white/55">&ldquo;to write the introduction&rdquo; — bu beyan değil, yazarlık sorunu.</span>
          </div>
        </div>
      </Fade>
      <Source>
        elsevier.com — generative AI policies for journals (Haziran 2026).
        Türkçe kalıp, YÖK rehberinin istediği üçlüye göre: araç adı, sürüm,
        aşama.
      </Source>
    </Slide>
  ),

  /* YÖK */
  () => (
    <Slide>
      <Eyebrow>YÖK · Mayıs 2024</Eyebrow>
      <H2>Rehber lisansüstü öğrenci için ne diyor?</H2>
      <Sub>
        &ldquo;Yükseköğretim Kurumları Bilimsel Araştırma ve Yayın
        Faaliyetlerinde Üretken Yapay Zekâ Kullanımına Dair Etik
        Rehber&rdquo; — yönetmelik değil, rehber; ama son maddesi disiplin
        sorumluluğuna bağlıyor.
      </Sub>
      <div className="mt-6 space-y-2.5">
        {[
          ["Yazarlık", "Yapay zekâ yazar olamaz; nihai hâlin sorumluluğu araştırmacıda."],
          ["Kapsam dışı aşamalar", "Hipotez geliştirme, tartışma, yorumlama ve uygulama — üst düzey uzmanlık gerektiren işler araca verilmez."],
          ["Beyan", "Kullanılan bölümler yöntem kısmında açıklanır: aracın adı, sürümü, hangi aşamada kullanıldığı."],
          ["Etik kurul", "Başvuruda yapay zekâ kullanımı hakkında kurula bilgi verilir."],
          ["Veri", "Anketlerde gerçek katılımcı yerine yapay zekâ kullanılamaz."],
        ].map(([k, v], i) => (
          <Fade key={k} delay={0.06 * i}>
            <div className="lz-card px-5 py-3.5 grid md:grid-cols-[10rem_1fr] gap-4">
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
      <Source>
        proje.yok.gov.tr — Üretken Yapay Zekâ Kullanımına Dair Etik Rehber,
        Mayıs 2024. Rehberin kendi uyarısı: “Bu hususların göz ardı edilmesi
        … disiplin sorumluluğuna yol açacaktır.”
      </Source>
    </Slide>
  ),

  /* TÜBİTAK */
  () => (
    <Slide>
      <Eyebrow>TÜBİTAK · Ocak 2026</Eyebrow>
      <H2>Burs ve proje başvurusunda beyan zorunlu.</H2>
      <Sub>
        Lisansüstü öğrencinin TÜBİTAK&apos;la ilk teması genellikle burs ya
        da 1002/2209 gibi proje başvurusu. Rehberin dördüncü sürümü bu
        başvurularda yapay zekâ kullanımını ayrı bir beyan bölümüne
        bağlıyor.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.1}>
          <div className="lz-card p-5">
            <Tag>Başvuru sahibi olarak</Tag>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>· Aracın adı, sürümü, hangi aşamada ve nasıl kullanıldığı</li>
              <li>· Ara, gelişme ve sonuç raporlarını da kapsıyor</li>
              <li>· Sahte referans üretmek &ldquo;uydurma&rdquo; etik ihlali</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.18}>
          <div className="lz-card p-5">
            <Tag muted>İleride hakem olduğunuzda</Tag>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>· Değerlendirici için &ldquo;herhangi bir amaçla&rdquo; kullanım yasak</li>
              <li>· GPT, Gemini, Claude isim isim sayılıyor</li>
              <li>· Uluslararası yayıncıların hakem yasağıyla örtüşüyor</li>
            </ul>
          </div>
        </Fade>
      </div>
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
      <H2>Veriyi araca girmek &ldquo;yurt dışına aktarım&rdquo; sayılıyor.</H2>
      <Sub>
        Araçların sunucuları çoğunlukla yurt dışında. KVKK rehberine göre
        yurt dışındaki bir hizmet üzerinden kişisel veri işlemek Kanun&apos;un
        9. maddesine tabi; yeterlilik kararı ve uygun güvence yoksa açık
        rıza bile tek başına yetmiyor.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-x-8 gap-y-3">
        {[
          "Anket katılımcılarının ham yanıtları — ad, e-posta, kurum",
          "Görüşme ses kayıtları ve deşifreleri",
          "Öğrenci notu, kimlik bilgisi, sağlık verisi",
          "Etik kurul onayı alınmış ama anonimleştirilmemiş veri",
          "Danışmanınızın ya da hakemlik yaptığınız yayımlanmamış metni",
          "Gizlilik sözleşmeli sanayi projesi verisi",
        ].map((t, i) => (
          <Fade key={t} delay={0.06 * i}>
            <div className="flex items-start gap-3">
              <Ban className="w-4 h-4 shrink-0 mt-1 text-white/35" />
              <span className="text-white/65 leading-relaxed text-sm">{t}</span>
            </div>
          </Fade>
        ))}
      </div>
      <Fade delay={0.4}>
        <div className="lz-warn mt-6 px-5 py-3.5">
          <p className="text-sm text-white/70 leading-relaxed">
            Çözüm basit: araca vermeden önce kimliksizleştirin. Ad, TC kimlik,
            öğrenci numarası, e-posta ve telefonu silen ücretsiz bir araç
            osmancancetlenbik.com/araclar adresinde — metin
            bilgisayarınızdan çıkmıyor.
          </p>
        </div>
      </Fade>
      <Source>
        kvkk.gov.tr — Üretken Yapay Zekâ ve Kişisel Verilerin Korunması Rehberi
        (15 Soruda), Yayın No 113, Kasım 2025 · 6698 sayılı KVKK md. 9
      </Source>
    </Slide>
  ),

  /* Tez ve enstitü */
  () => (
    <Slide>
      <Eyebrow>Tez</Eyebrow>
      <H2>Enstitünüzün yönergesi var mı? Önce onu bulun.</H2>
      <Sub>
        Ankara, Doğuş ve Özyeğin gibi üniversiteler kendi senato kararlarını
        yayımladı; çoğu üniversitede henüz yok. Yönerge varsa YÖK
        rehberinin üstüne gelir; yoksa YÖK rehberi geçerli.
      </Sub>
      <div className="mt-7 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={FileSearch} title="1 · Yönergeyi arayın">
            Enstitü sitesi → &ldquo;yönergeler&rdquo;; bulamazsanız enstitü
            sekreterliğine yazılı sorun. Cevabı saklayın.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={Users} title="2 · Danışmanla yazılı anlaşın">
            Hangi aşamada hangi aracı kullanacağınızı bir e-postayla
            danışmana yazın; onayını alın. Savunmada jüri sorarsa bu
            e-posta var.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={History} title="3 · Kullanım günlüğü tutun">
            Tarih, araç, sürüm, ne için, ne çıktı, ne kadarını kullandınız.
            Beyan metni bu günlükten iki dakikada yazılıyor; jüri sorusu da
            buradan cevaplanıyor.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed max-w-3xl">
          Tez savunmasında intihal raporu zaten zorunlu; yapay zekâ beyanı
          henüz her enstitüde standart değil. Sorulmasa da tezin yöntem
          bölümüne yazın — sorulduğunda hazır olur.
        </p>
      </Fade>
      <Source>
        Ankara Üniversitesi üretken yapay zekâ yönergesi · dogus.edu.tr ·
        ozyegin.edu.tr ilkeler — erişim 4 Eylül 2026 · Lisansüstü Eğitim ve
        Öğretim Yönetmeliği, tez savunması maddeleri
      </Source>
    </Slide>
  ),

  /* Tespit araçları */
  () => (
    <Slide>
      <Eyebrow>Tespit araçları</Eyebrow>
      <H2>&ldquo;Yapay zekâ tespit edildi&rdquo; ne anlama geliyor?</H2>
      <Sub>
        Hem az hem çok. Tespit araçları olasılık veriyor, kanıt değil; ve
        ana dili İngilizce olmayan yazarların metnini haksız yere
        işaretleme eğilimi ölçülmüş durumda.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="lz-card p-5">
            <Tag>Sizin için anlamı</Tag>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>· Kendi yazdığınız İngilizce metin işaretlenebilir — panik yapmayın, taslaklarınızı ve günlüğünüzü gösterin</li>
              <li>· Tespit puanı düşürmek için metni &ldquo;insanlaştıran&rdquo; araç kullanmayın; bu, kullanımın kendisinden daha ağır bir ihlal</li>
              <li>· Beyan etmek, işaretlenmekten korur; gizlemek korumaz</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="lz-card p-5">
            <Tag muted>Araştırmanın söylediği</Tag>
            <p className="text-sm text-white/55 leading-relaxed">
              Liang vd. (2023): yaygın GPT tespit araçları, ana dili İngilizce
              olmayan yazarların insan eliyle yazdığı metinleri belirgin
              biçimde daha yüksek oranda &ldquo;yapay zekâ&rdquo; olarak
              işaretledi. Yazarlar araçların yüksek riskli değerlendirmede
              kullanılmamasını öneriyor.
            </p>
          </div>
        </Fade>
      </div>
      <Source>
        Liang W., Yuksekgonul M., Mao Y., Wu E., Zou J. (2023). GPT detectors
        are biased against non-native English writers. Patterns, Cell Press —
        PMID 37521038 · Ankara Üniversitesi yönergesi tespit aracını aşmaya
        yönelik kullanımı açıkça ihlal sayıyor
      </Source>
    </Slide>
  ),

  /* ═══ Bölüm 10 · Uygulama ═══ */
  () => (
    <Divider
      num="10"
      title="Uygulama"
      subtitle="Göndermeden önceki kontrol listesi, ücretsiz araçlar ve ilk makale için sekiz haftalık plan."
      icerik={["Kontrol listesi", "Araçlar", "Sekiz hafta", "On kural"]}
    />
  ),

  /* Kontrol listesi */
  () => (
    <Slide>
      <Eyebrow>Göndermeden önce</Eyebrow>
      <H2>On maddelik kontrol listesi.</H2>
      <div className="mt-7 grid md:grid-cols-2 gap-x-8 gap-y-2.5">
        {[
          "Kaynakçadaki her DOI açıldı; başlık-yazar-yıl eşleşti",
          "Atıf yaptığım her makalede atfettiğim cümleyi buldum",
          "Metindeki her sayı ve yüzdenin kaynağı ya kendi verim ya da açık bir künye",
          "İlk taslağı ben yazdım; araç eleştirdi ve düzeltti — tersi değil",
          "Tartışma ve yorum bölümünde araca yazdırılmış cümle yok",
          "Kişisel veri araca girmeden önce anonimleştirildi",
          "Beyan metni yazıldı: araç, sürüm, aşama, sorumluluk",
          "Beyan derginin istediği yere kondu (kaynakçadan önce / teşekkür / yöntem)",
          "Danışman ya da eş yazarlar hangi aracı nerede kullandığımı biliyor",
          "Kullanım günlüğü var; jüri ya da editör sorarsa gösterebilirim",
        ].map((t, i) => (
          <Fade key={t} delay={0.05 * i}>
            <div className="flex items-start gap-3">
              <span
                className="w-5 h-5 shrink-0 mt-0.5 rounded border grid place-items-center"
                style={{ borderColor: "color-mix(in srgb, var(--deck-accent) 55%, transparent)" }}
              >
                <Check className="w-3 h-3" style={{ color: ACCENT }} />
              </span>
              <span className="text-sm text-white/65 leading-relaxed">{t}</span>
            </div>
          </Fade>
        ))}
      </div>
    </Slide>
  ),

  /* Araçlar */
  () => (
    <Slide>
      <Eyebrow>Ücretsiz, üyeliksiz</Eyebrow>
      <H2>Bu sunumdaki işler için yazılmış araçlar.</H2>
      <Sub>
        osmancancetlenbik.com/araclar — hepsi tarayıcıda çalışıyor;
        metniniz ve dosyanız bilgisayarınızdan çıkmıyor (Atıf Denetleyici
        yalnızca DOI numaralarını sorguluyor).
      </Sub>
      <div className="mt-6 grid md:grid-cols-3 gap-3">
        {[
          ["Atıf Denetleyici", "Kaynakçadaki her DOI'yi CrossRef'te sorgular; olmayanı işaretler"],
          ["BibTeX Üretici", "DOI'den doğru BibTeX kaydı — elle yazılmış künye hatası biter"],
          ["Kaynakça Biçimlendirici", "APA / IEEE / Chicago arasında dönüştürme"],
          ["Anonimleştirici", "Ad, TC kimlik, e-posta, telefon ve öğrenci numarasını temizler"],
          ["Metin İstatistikleri", "Kelime sayısı, cümle uzunluğu, okunabilirlik — özet sınırı için"],
          ["Türkçe Düzeltici", "Türkçe metinde yaygın yazım ve noktalama hataları"],
        ].map(([t, d], i) => (
          <Fade key={t} delay={0.05 * i}>
            <div className="lz-card px-4 py-4 h-full">
              <div className="text-white font-semibold text-sm mb-1.5">{t}</div>
              <div className="text-[13px] text-white/50 leading-relaxed">{d}</div>
            </div>
          </Fade>
        ))}
      </div>
      <Fade delay={0.34}>
        <div className="mt-5 grid md:grid-cols-2 gap-4">
          <EmbeddedTool
            slug="bibtex-uretici"
            title="BibTeX Üretici"
            hint="Bir DOI yapıştırın; künye gerçek kayıttan gelsin."
          />
          <EmbeddedTool
            slug="anonimlestirici"
            title="Anonimleştirici"
            hint="Metninizi yapıştırıp temizlenmiş hâlini görün."
          />
        </div>
      </Fade>
    </Slide>
  ),

  /* Sekiz hafta */
  () => (
    <Slide>
      <Eyebrow>İlk makale</Eyebrow>
      <H2>Sekiz haftalık plan.</H2>
      <Sub>
        Ders yükü olan bir yüksek lisans öğrencisi için, haftada 8–10 saat
        varsayımıyla. Hangi haftada hangi aracın devreye girdiği yazılı.
      </Sub>
      <div className="mt-6 grid md:grid-cols-4 gap-3">
        {[
          ["1–2", "Soru", "Sohbet modeliyle soruyu keskinleştirin (İstem 1); danışmanla onaylayın; K-Dense BYOK kurun."],
          ["3–4", "Literatür", "K-Dense ile tarama (Instant, sonra Standard); Connected Papers ile kartopu; Scholar ve Tez Merkezi'nde doğrulama. 30–40 makale klasörde, references.bib hazır."],
          ["5", "Okuma", "NotebookLM'e yükleyin; tema sorularını sorun. 10 makaleyi baştan sona okuyun. Literatür matrisi bitsin."],
          ["6–7", "Yazma", "Her bölümü siz yazın; her bölüm için İstem 2 (hakem gözü). Bulgular için kod yazdırın, sonucu elle doğrulayın."],
        ].map(([h, t, d], i) => (
          <Fade key={h} delay={0.06 * i}>
            <div className="lz-card px-4 py-4 h-full">
              <div
                className="font-mono text-[11px] uppercase tracking-[0.16em] mb-1"
                style={{ color: ACCENT }}
              >
                Hafta {h}
              </div>
              <div className="text-white font-semibold text-sm mb-1.5">{t}</div>
              <div className="text-[13px] text-white/50 leading-relaxed">{d}</div>
            </div>
          </Fade>
        ))}
      </div>
      <Fade delay={0.3}>
        <div className="lz-card mt-3 px-5 py-4 grid md:grid-cols-[6rem_1fr] gap-4 items-start">
          <div
            className="font-mono text-[11px] uppercase tracking-[0.16em] pt-0.5"
            style={{ color: ACCENT }}
          >
            Hafta 8
          </div>
          <div className="text-[13px] text-white/55 leading-relaxed">
            <span className="text-white font-semibold">Denetim ve gönderim.</span>{" "}
            Atıf Denetleyici&apos;den geçirin; dört adımlı protokolü her künyeye
            uygulayın; İngilizceyi İstem 4 ile düzeltin; beyan metnini yazın;
            on maddelik listeyi işaretleyin. Danışmana son okuma.
          </div>
        </div>
      </Fade>
    </Slide>
  ),

  /* On kural */
  () => (
    <Slide>
      <Eyebrow>Tek slaytta</Eyebrow>
      <H2>On kural.</H2>
      <div className="mt-7 grid md:grid-cols-2 gap-x-10 gap-y-3">
        {[
          "Yapay zekâ yazar olamaz; imza sizin.",
          "Atıf sorusu sohbet modeline değil, kaynağa bağlı araca sorulur.",
          "Web araması kapalı modelden gelen künye, varsayılan olarak uydurmadır.",
          "Her DOI açılır; her atıf makalede bulunur. İstisna yok.",
          "İlk taslağı siz yazarsınız; araç eleştirir.",
          "Tartışma ve yorum devredilmez — YÖK de öyle diyor.",
          "Sayıyı değil, sayıyı hesaplayan kodu isteyin.",
          "Kişisel veri araca girmeden önce anonimleştirilir.",
          "Kullandığınız her aracı beyan edin: ad, sürüm, aşama.",
          "Günlük tutun. Sorulduğunda gösterin.",
        ].map((t, i) => (
          <Fade key={t} delay={0.05 * i}>
            <div className="flex items-start gap-4">
              <span
                className="font-mono text-sm shrink-0 pt-0.5 tabular-nums"
                style={{ color: ACCENT }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-white/75 leading-relaxed">{t}</span>
            </div>
          </Fade>
        ))}
      </div>
    </Slide>
  ),

  /* İletişim */
  () => (
    <Slide>
      <Eyebrow>Soru, düzeltme, öneri</Eyebrow>
      <H2>Bir yerde hata bulursanız yazın.</H2>
      <Sub>
        Araç fiyatları ve katman sınırları aylık değişiyor; yayıncı
        politikaları yılda birkaç kez güncelleniyor. Bu sunumda tarihi geçmiş
        bir bilgi görürseniz haber verin; kaynağıyla birlikte düzeltirim.
      </Sub>
      <Fade delay={0.2}>
        <div className="mt-9 lz-card px-7 py-6 flex flex-wrap items-center justify-between gap-5">
          <div>
            <div className="text-white/45 text-sm mb-1.5">
              Genellikle iki iş günü içinde dönüş yapıyorum.
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

  /* Kapanış */
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
            Araç arasın.
            <br />
            <span style={{ color: ACCENT }}>Siz karar verin.</span>
          </h2>
        </Fade>
        <Fade delay={0.15}>
          <p className="mt-7 text-lg text-white/55 leading-relaxed">
            Yapay zekâ literatürü bulur, metni düzeltir, kodu yazar. Hangi
            makalenin önemli olduğuna, bulgunun ne anlama geldiğine ve
            kaynakçadaki her satırın gerçek olduğuna karar veren sizsiniz.
            İlk makalenizde bu ayrımı korursanız, sonrakilerde kendiliğinden
            gelir.
          </p>
        </Fade>
        <Fade delay={0.28}>
          <div className="mt-10 lz-card inline-block px-7 py-5">
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
            Faydalı bulduysanız aynı dönemde başlayan arkadaşınıza gönderin.
          </p>
        </Fade>
      </div>
    </div>
  ),
];

export default function Presentation() {
  return (
    <DeckShell
      label="Makale ve Bildiri Yazarken Yapay Zekâ · Lisansüstü"
      accent={ACCENT}
      slides={slides}
    />
  );
}
