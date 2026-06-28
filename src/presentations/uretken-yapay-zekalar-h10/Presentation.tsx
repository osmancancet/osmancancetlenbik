"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Brain,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  Hash,
  Type,
  MessageSquare,
  FileText,
  Languages,
  Tag,
  Search,
  Database,
  Cpu,
  Code2,
  Calendar,
  ListChecks,
  Target,
  BookOpen,
  Sliders,
  Layers,
  ArrowRight,
  Quote,
  ScanText,
  Bot,
  type LucideIcon,
} from "lucide-react";
import "./styles.css";

/* ============================================================
   PRIMITIVES
   ============================================================ */

const ACCENT = "#a855f7";
const ACCENT_SOFT = "#c084fc";

function SlideShell({
  children,
  bgPattern = true,
}: {
  children: ReactNode;
  bgPattern?: boolean;
}) {
  return (
    <div className="relative w-full h-full flex items-center justify-center px-12 py-16">
      {bgPattern && (
        <div className="absolute inset-0 uyz-grid-bg pointer-events-none" />
      )}
      <div className="relative z-10 w-full max-w-6xl">{children}</div>
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em]"
      style={{ color: ACCENT_SOFT }}
    >
      <span className="w-8 h-px" style={{ background: ACCENT_SOFT }} />
      {children}
    </motion.div>
  );
}

function H1({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-white ${className}`}
    >
      {children}
    </motion.h1>
  );
}

function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`text-3xl md:text-5xl font-semibold tracking-tight text-white ${className}`}
    >
      {children}
    </motion.h2>
  );
}

function Sub({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`text-lg md:text-xl text-gray-400 leading-relaxed ${className}`}
    >
      {children}
    </motion.p>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
  delay = 0,
  accent = ACCENT,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  delay?: number;
  accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="uyz-card uyz-card-hover rounded-xl p-6 transition-all"
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={{
          background: `${accent}1f`,
          border: `1px solid ${accent}55`,
        }}
      >
        <Icon className="w-6 h-6" style={{ color: accent }} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function QuoteSlide({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <SlideShell>
      <div className="text-center max-w-4xl mx-auto">
        <Quote className="w-16 h-16 mx-auto mb-8" style={{ color: `${ACCENT}66` }} />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-light text-white leading-snug"
        >
          &ldquo;{quote}&rdquo;
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10"
        >
          <div className="text-lg font-semibold" style={{ color: ACCENT_SOFT }}>{author}</div>
          <div className="text-sm text-gray-500 mt-1">{role}</div>
        </motion.div>
      </div>
    </SlideShell>
  );
}

function SectionDivider({
  num,
  total,
  title,
  subtitle,
  bgGradient,
  shadow,
  icon,
}: {
  num: string;
  total: string;
  title: string;
  subtitle: string;
  bgGradient: string;
  shadow: string;
  icon: ReactNode;
}) {
  return (
    <SlideShell bgPattern={false}>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 uyz-pulse"
          style={{
            background: bgGradient,
            boxShadow: shadow,
          }}
        >
          {icon}
        </motion.div>
        <Eyebrow>
          Bölüm {num} / {total}
        </Eyebrow>
        <H1>{title}</H1>
        <Sub className="mt-6 max-w-2xl mx-auto">{subtitle}</Sub>
      </div>
    </SlideShell>
  );
}

/* ============================================================
   TOPIC-SPECIFIC MOCKUPS
   ============================================================ */

/* Renkli token kutuları (tokenizasyon görseli) */
function TokenBox({
  tokens,
}: {
  tokens: Array<{ text: string; tone: 1 | 2 | 3 | 4 | 5 }>;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 justify-center">
      {tokens.map((t, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 + i * 0.12 }}
          className={`uyz-token uyz-token-${t.tone}`}
        >
          {t.text}
        </motion.span>
      ))}
    </div>
  );
}

/* Olasılık çubukları (decoding / sonraki token) */
function ProbabilityBars({
  candidates,
}: {
  candidates: Array<{ token: string; prob: number; highlight?: boolean }>;
}) {
  const max = Math.max(...candidates.map((c) => c.prob));
  return (
    <div className="space-y-3">
      {candidates.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
          className="flex items-center gap-4"
        >
          <div
            className={`w-28 text-right font-mono text-sm ${
              c.highlight ? "text-white font-semibold" : "text-gray-400"
            }`}
          >
            {c.token}
          </div>
          <div className="uyz-bar-track">
            <motion.div
              className="uyz-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(c.prob / max) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={
                c.highlight
                  ? undefined
                  : { background: "linear-gradient(90deg, #6b21a8, #a855f7)", opacity: 0.6 }
              }
            />
          </div>
          <div
            className={`w-16 font-mono text-sm ${
              c.highlight ? "text-violet-300 font-semibold" : "text-gray-500"
            }`}
          >
            {c.prob}%
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* NLP boru hattı — yatay düğümler */
function NlpPipeline() {
  const steps = [
    { icon: Type, label: "Ham metin", sub: "&quot;Manisa&apos;da hava güzel.&quot;", color: "#a855f7" },
    { icon: Hash, label: "Tokenizasyon", sub: "alt-kelime parçaları", color: "#ec4899" },
    { icon: Layers, label: "Gömme (embedding)", sub: "her token → vektör", color: "#3b82f6" },
    { icon: Cpu, label: "Model", sub: "Transformer katmanları", color: "#22c55e" },
    { icon: MessageSquare, label: "Çözümleme (decode)", sub: "sonraki token", color: "#fbbf24" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-col md:flex-row items-stretch gap-3"
    >
      {steps.map((s, i) => (
        <div key={s.label} className="flex items-center gap-3 flex-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
            className="uyz-card rounded-xl p-4 flex-1 text-center"
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center mx-auto mb-3"
              style={{ background: `${s.color}1f`, border: `1px solid ${s.color}55` }}
            >
              <s.icon className="w-5 h-5" style={{ color: s.color }} />
            </div>
            <div className="text-sm font-semibold text-white">{s.label}</div>
            <div
              className="text-[11px] text-gray-500 mt-1 font-mono"
              dangerouslySetInnerHTML={{ __html: s.sub }}
            />
          </motion.div>
          {i < steps.length - 1 && (
            <ArrowRight className="uyz-flow-arrow w-5 h-5 hidden md:block" />
          )}
        </div>
      ))}
    </motion.div>
  );
}

/* Kod penceresi — API ile metin üretimi çağrısı */
function CodeWindow({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="uyz-window-chrome w-full"
    >
      <div className="uyz-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-mono flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d0314", color: ACCENT_SOFT }}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>{title}</span>
        </div>
      </div>
      <div className="uyz-code p-5">{children}</div>
    </motion.div>
  );
}

/* Etiketlenmiş cümle — Varlık İsmi Tanıma (NER) örneği */
function NerSentence() {
  const parts: Array<{ text: string; tag?: string; color?: string }> = [
    { text: "Mustafa Kemal Atatürk", tag: "KİŞİ", color: "#c084fc" },
    { text: " " },
    { text: "1919", tag: "TARİH", color: "#fbbf24" },
    { text: "&apos;da" },
    { text: " " },
    { text: "Samsun", tag: "YER", color: "#34d399" },
    { text: "&apos;a çıktı; " },
    { text: "Türkiye Büyük Millet Meclisi", tag: "KURUM", color: "#60a5fa" },
    { text: " " },
    { text: "1920", tag: "TARİH", color: "#fbbf24" },
    { text: "&apos;de açıldı." },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="uyz-card rounded-xl p-7 text-lg md:text-2xl leading-loose"
    >
      {parts.map((p, i) =>
        p.tag ? (
          <span
            key={i}
            className="uyz-tag mx-0.5 align-middle"
            style={{ color: p.color, background: `${p.color}1a` }}
          >
            <span
              className="text-white"
              dangerouslySetInnerHTML={{ __html: p.text }}
            />
            <span className="text-[10px] opacity-90">{p.tag}</span>
          </span>
        ) : (
          <span
            key={i}
            className="text-gray-300 align-middle"
            dangerouslySetInnerHTML={{ __html: p.text }}
          />
        )
      )}
    </motion.div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ───── 1 · KAPAK ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 1203 · 10. Hafta</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.04]"
        >
          <span className="uyz-shimmer">Metin Üretimi &amp;</span>
          <br />
          <span className="uyz-shimmer">Doğal Dil İşleme</span>
        </motion.h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Makineler dili nasıl parçalar, anlar ve yeniden yazar?
          <br />
          <span className="text-gray-500 text-base">
            Tokenizasyondan çözümleme stratejilerine, NLP&apos;nin gerçek uygulamalarına.
          </span>
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={ScanText}
            title="NLP Temelleri"
            desc="Tokenizasyon, gömme (embedding) ve klasik NLP görevleri."
            delay={0.3}
            accent="#a855f7"
          />
          <FeatureCard
            icon={MessageSquare}
            title="Metin Üretimi"
            desc="Çözümleme (decoding) stratejileri ve üretim parametreleri."
            delay={0.45}
            accent="#ec4899"
          />
          <FeatureCard
            icon={Target}
            title="Uygulamalar"
            desc="Özetleme, çeviri, NER, soru-cevap ve RAG."
            delay={0.6}
            accent="#22c55e"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-10 inline-flex items-center gap-2 text-[11px] font-mono text-gray-600 uppercase tracking-widest"
        >
          <Calendar className="w-3.5 h-3.5" />
          MCBÜ MYO · BVA 1203 · Perşembe 15:20 – 17:00 · Amfi 1
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2 · KÖPRÜ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 9. haftadan 10. haftaya</Eyebrow>
      <H2>LLM&apos;in içini gördük; şimdi onu dile uyguluyoruz.</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta büyük dil modellerinin (LLM) mimarisini ve &ldquo;sonraki token&rdquo;
        tahmininin nasıl çalıştığını konuştuk. Bu hafta o mekanizmayı somut NLP
        görevlerine bağlıyoruz: metni nasıl işliyoruz, nasıl üretiyoruz ve
        gerçek uygulamalarda nasıl kullanıyoruz?
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="uyz-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3" style={{ color: ACCENT_SOFT }}>
            <BookOpen className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Geçen hafta öğrendik</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT_SOFT }} />Transformer ve dikkat (attention) mekanizması.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT_SOFT }} />Model harf değil, token üzerinden çalışır.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT_SOFT }} />Her adımda olasılık dağılımı üretilir.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="uyz-card-violet rounded-xl p-6"
          style={{ boxShadow: "0 0 40px rgba(168,85,247,0.18)" }}
        >
          <div className="flex items-center gap-2 mb-3" style={{ color: ACCENT_SOFT }}>
            <Target className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta hedef</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT_SOFT }} />NLP boru hattını uçtan uca tanımak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT_SOFT }} />Çözümleme parametrelerini kontrol etmek.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT_SOFT }} />Üretimi gerçek görevlere uygulamak.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3 · BÖLÜM 1 ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Doğal Dil İşleme Temelleri"
      subtitle="Bir model dili işlemeden önce metin sayıya çevrilmeli. Tokenizasyon, gömme ve klasik NLP görevlerini netleştiriyoruz."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #6d28d9 100%)"
      shadow="0 0 80px rgba(168, 85, 247, 0.55)"
      icon={<ScanText className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 4 · NLP BORU HATTI ───── */
  () => (
    <SlideShell>
      <Eyebrow>NLP boru hattı</Eyebrow>
      <H2 className="mb-2">Ham metinden modele giden yol</H2>
      <Sub className="max-w-3xl mb-8">
        Bir cümle modele doğrudan girmez. Önce token&apos;lara bölünür, her token
        bir sayı dizisine (vektöre) çevrilir; model bu vektörlerle çalışır ve
        çıkışta tekrar metne çözülür. Her adım ayrı bir mühendislik kararı.
      </Sub>
      <NlpPipeline />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        className="mt-8 uyz-card rounded-xl p-4 max-w-4xl mx-auto flex items-center gap-3"
      >
        <Hash className="w-5 h-5 shrink-0" style={{ color: ACCENT_SOFT }} />
        <div className="text-sm text-gray-400">
          Aynı boru hattı hem <span className="text-white">anlama</span> (sınıflandırma,
          NER) hem de <span className="text-white">üretme</span> (özetleme, çeviri,
          sohbet) için geçerli — fark, son adımda çıkışın etiket mi yoksa yeni metin mi olduğudur.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 5 · NLP GÖREVLERİ TABLOSU ───── */
  () => (
    <SlideShell>
      <Eyebrow>NLP görevleri · genel bakış</Eyebrow>
      <H2>Tek bir &ldquo;NLP&rdquo; yok — bir görevler ailesi var</H2>
      <Sub className="mt-3 max-w-3xl">
        Klasik NLP görevleri iki büyük gruba ayrılır: metni
        <span className="text-white"> anlama</span> (girdiyi etikete/yapıya çevirir) ve
        <span className="text-white"> üretme</span> (girdiden yeni metin çıkarır).
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 uyz-card rounded-xl overflow-hidden"
      >
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs font-mono uppercase tracking-wider" style={{ color: ACCENT_SOFT, background: "#0d0314" }}>
              <th className="px-4 py-3" style={{ width: "26%" }}>Görev</th>
              <th className="px-4 py-3" style={{ width: "14%" }}>Tür</th>
              <th className="px-4 py-3">Örnek</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {[
              { task: "Metin sınıflandırma", type: "Anlama", ex: "Yorum olumlu mu olumsuz mu (duygu analizi)?" },
              { task: "Varlık ismi tanıma (NER)", type: "Anlama", ex: "Metinden kişi, yer, tarih, kurum çıkar." },
              { task: "Özetleme", type: "Üretme", ex: "5 sayfalık raporu 5 cümleye indir." },
              { task: "Makine çevirisi", type: "Üretme", ex: "Türkçe bir paragrafı İngilizceye çevir." },
              { task: "Soru-cevap", type: "Üretme", ex: "Verilen belgeden sorunun yanıtını üret." },
              { task: "Diyalog / sohbet", type: "Üretme", ex: "Bağlamı koruyarak çok turlu yanıt ver." },
            ].map((r, i) => (
              <tr key={r.task} className={i % 2 === 1 ? "bg-white/[0.02]" : undefined}>
                <td className="px-4 py-3 text-white font-medium">{r.task}</td>
                <td className="px-4 py-3">
                  <span
                    className="px-2 py-0.5 rounded text-[11px] font-mono"
                    style={
                      r.type === "Anlama"
                        ? { background: "#3b82f61f", color: "#60a5fa" }
                        : { background: `${ACCENT}1f`, color: ACCENT_SOFT }
                    }
                  >
                    {r.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400">{r.ex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 6 · GÖMME (EMBEDDING) ───── */
  () => (
    <SlideShell>
      <Eyebrow>Temel kavram · gömme (embedding)</Eyebrow>
      <H2 className="mb-2">Kelimeler sayıya, anlam ise mesafeye dönüşür</H2>
      <Sub className="max-w-3xl mb-8">
        Her token, yüzlerce boyutlu bir vektöre çevrilir. Benzer anlamlı kelimeler
        bu uzayda birbirine yakın durur. Böylece model &ldquo;anlam&rdquo;ı geometrik
        bir yakınlık olarak işleyebilir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="uyz-card rounded-2xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-4">
            Yakınlık (benzerlik)
          </div>
          <div className="space-y-3">
            {[
              { pair: "kral ↔ kraliçe", sim: 92, note: "anlamca yakın" },
              { pair: "kral ↔ tahta", sim: 71, note: "ilişkili" },
              { pair: "kral ↔ elma", sim: 9, note: "alakasız" },
            ].map((r, i) => (
              <motion.div
                key={r.pair}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="flex items-center gap-3"
              >
                <div className="w-32 font-mono text-sm text-gray-300">{r.pair}</div>
                <div className="uyz-bar-track">
                  <div className="uyz-bar-fill" style={{ width: `${r.sim}%` }} />
                </div>
                <div className="w-10 font-mono text-xs" style={{ color: ACCENT_SOFT }}>{r.sim}%</div>
              </motion.div>
            ))}
          </div>
          <div className="text-[11px] text-gray-500 mt-4 font-mono">
            kosinüs benzerliği · 0 = alakasız, 1 = aynı yön
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="uyz-card-violet rounded-2xl p-6"
          style={{ boxShadow: "0 0 40px rgba(168,85,247,0.15)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs font-mono uppercase tracking-wider" style={{ color: ACCENT_SOFT }}>
              Vektör aritmetiği
            </div>
          </div>
          <div
            className="rounded-lg p-5 font-mono text-base text-gray-200 leading-relaxed"
            style={{ background: "#0d0314", border: "1px solid rgba(168,85,247,0.2)" }}
          >
            <span style={{ color: ACCENT_SOFT }}>vektör</span>(&quot;kral&quot;) − <span style={{ color: ACCENT_SOFT }}>vektör</span>(&quot;erkek&quot;)
            <br />
            <span className="text-gray-500">+</span> <span style={{ color: ACCENT_SOFT }}>vektör</span>(&quot;kadın&quot;)
            <br />
            <span className="text-gray-500">≈</span> <span className="text-white font-semibold">vektör(&quot;kraliçe&quot;)</span>
          </div>
          <p className="text-sm text-gray-400 mt-4 leading-relaxed">
            Gömmeler dildeki ilişkileri yön ve mesafe olarak yakalar. Bu, arama,
            öneri ve RAG (geri-getirme) sistemlerinin de temelidir.
          </p>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 7 · BÖLÜM 2 ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Metin Üretimi: Çözümleme"
      subtitle="Model bir olasılık dağılımı verir — ama hangi token&apos;ı seçeceğine biz karar veririz. İşte üretimin kalbi: decoding stratejileri."
      bgGradient="linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)"
      shadow="0 0 80px rgba(109, 40, 217, 0.6)"
      icon={<MessageSquare className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 8 · ÇÖZÜMLEME STRATEJİLERİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Çözümleme (decoding) · 1/2</Eyebrow>
      <H2 className="mb-2">Aynı dağılım, farklı seçim stratejileri</H2>
      <Sub className="max-w-3xl mb-8">
        Model her adımda binlerce token için olasılık üretir. &ldquo;Bir varmış, bir
        ____&rdquo; örneğinde en olası adayları seçme biçimimiz, çıktının ne kadar
        tutarlı ya da yaratıcı olacağını belirler.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="uyz-card rounded-xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-wider mb-4" style={{ color: ACCENT_SOFT }}>
            &ldquo;Bir varmış, bir ___&rdquo; → adaylar
          </div>
          <ProbabilityBars
            candidates={[
              { token: "yokmuş", prob: 89, highlight: true },
              { token: "zamanda", prob: 5 },
              { token: "köyde", prob: 3 },
              { token: "kuş", prob: 1 },
            ]}
          />
          <div className="mt-5 pt-4 border-t border-white/5 text-xs text-gray-500 flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5" style={{ color: ACCENT_SOFT }} />
            Sıcaklık (temperature) bu olasılıkları yumuşatır ya da keskinleştirir.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="space-y-3"
        >
          {[
            { name: "Greedy (açgözlü)", desc: "Her adımda en yüksek olasılıklı token. Tutarlı ama tekdüze; bazen döngüye girer.", color: "#60a5fa" },
            { name: "Top-k", desc: "En olası k aday arasından örnekleme yapar (örn. k=40). Çeşitliliği sınırlı tutar.", color: "#ec4899" },
            { name: "Top-p (nucleus)", desc: "Olasılığı toplamda p&apos;yi (örn. 0.9) dolduran en küçük aday kümesinden seçer.", color: "#a855f7" },
          ].map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.12 }}
              className="uyz-card rounded-xl p-4 flex items-start gap-3"
            >
              <span
                className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
                style={{ background: s.color }}
              />
              <div>
                <div className="text-sm font-semibold text-white">{s.name}</div>
                <p
                  className="text-xs text-gray-400 mt-0.5 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: s.desc }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 9 · ÜRETİM PARAMETRELERİ + KOD ───── */
  () => (
    <SlideShell>
      <Eyebrow>Çözümleme (decoding) · 2/2 · parametreler</Eyebrow>
      <H2 className="mb-2">Üretimi parametrelerle yönetmek</H2>
      <Sub className="max-w-3xl mb-6">
        Bir API çağrısında bu parametreler çıktının karakterini doğrudan belirler.
        Sağdaki tablo en sık kullanılan üçü; soldaki çağrı bunların gerçek bir
        istekte nasıl göründüğünü gösterir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        <div className="md:col-span-3">
          <CodeWindow title="metin-uret.py — Sohbet Tamamlama API&apos;si">
            <div><span className="uyz-code-com"># İstemci kur ve modeli çağır</span></div>
            <div><span className="uyz-code-kw">from</span> sdk <span className="uyz-code-kw">import</span> Client</div>
            <div className="mt-1">client <span className="text-gray-500">=</span> Client()</div>
            <div className="mt-2">yanit <span className="text-gray-500">=</span> client.generate(</div>
            <div>&nbsp;&nbsp;model<span className="text-gray-500">=</span><span className="uyz-code-str">&quot;metin-modeli&quot;</span>,</div>
            <div>&nbsp;&nbsp;prompt<span className="text-gray-500">=</span><span className="uyz-code-str">&quot;Manisa için 3 cümlelik tanıtım yaz.&quot;</span>,</div>
            <div>&nbsp;&nbsp;temperature<span className="text-gray-500">=</span><span className="uyz-code-out">0.7</span>,&nbsp;&nbsp;<span className="uyz-code-com"># yaratıcılık</span></div>
            <div>&nbsp;&nbsp;top_p<span className="text-gray-500">=</span><span className="uyz-code-out">0.9</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="uyz-code-com"># çekirdek örnekleme</span></div>
            <div>&nbsp;&nbsp;max_tokens<span className="text-gray-500">=</span><span className="uyz-code-out">120</span>,&nbsp;&nbsp;<span className="uyz-code-com"># çıktı uzunluğu sınırı</span></div>
            <div>)</div>
            <div className="mt-2"><span className="uyz-code-kw">print</span>(yanit.text)</div>
            <div className="mt-2 text-gray-600">────────────────────────</div>
            <div className="uyz-code-out">Manisa, Ege&apos;nin köklü kültür şehirlerinden biridir...</div>
          </CodeWindow>
        </div>
        <div className="md:col-span-2 space-y-3">
          {[
            { p: "temperature", v: "0 – 2", d: "Düşük = kararlı/tekrarlı, yüksek = çeşitli/yaratıcı." },
            { p: "top_p", v: "0 – 1", d: "Olasılık kütlesinin yalnızca üst kısmından örnekler." },
            { p: "max_tokens", v: "tam sayı", d: "Üretilecek azami token sayısı; maliyeti de sınırlar." },
          ].map((r, i) => (
            <motion.div
              key={r.p}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.12 }}
              className="uyz-card rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-sm" style={{ color: ACCENT_SOFT }}>{r.p}</span>
                <span className="font-mono text-[11px] text-gray-500">{r.v}</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{r.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 10 · TOKENİZASYON HATIRLATMA ───── */
  () => (
    <SlideShell>
      <Eyebrow>Hatırlatma · tokenizasyon</Eyebrow>
      <H2 className="mb-2">Üretim de token token ilerler</H2>
      <Sub className="max-w-3xl mb-8">
        Hem girdiyi okurken hem çıktıyı üretirken model token üzerinde çalışır.
        Aynı cümle farklı dillerde farklı sayıda token&apos;a bölünür — bu hız ve
        maliyeti doğrudan etkiler.
      </Sub>
      <div className="space-y-8">
        <div className="text-center">
          <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: ACCENT_SOFT }}>
            &quot;Doğal dil işleme öğreniyoruz.&quot;
          </div>
          <TokenBox
            tokens={[
              { text: "Doğal", tone: 1 },
              { text: "dil", tone: 2 },
              { text: "iş", tone: 3 },
              { text: "leme", tone: 4 },
              { text: "öğren", tone: 5 },
              { text: "iyor", tone: 1 },
              { text: "uz", tone: 2 },
              { text: ".", tone: 3 },
            ]}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          {[
            { icon: Languages, t: "Dil etkisi", d: "Türkçe&apos;nin eklemeli yapısı, sözcükleri İngilizce&apos;den daha çok token&apos;a böler." },
            { icon: Hash, t: "Bağlam penceresi", d: "Model bir seferde işleyebileceği token sayısıyla (örn. on binlerce) sınırlıdır." },
            { icon: Database, t: "Maliyet", d: "Çoğu API token başına ücretlendirir; girdi + çıktı birlikte sayılır." },
          ].map((c, i) => (
            <div key={i} className="uyz-card rounded-xl p-4">
              <c.icon className="w-5 h-5 mb-2" style={{ color: ACCENT_SOFT }} />
              <div className="text-sm font-semibold text-white mb-1">{c.t}</div>
              <p
                className="text-xs text-gray-400 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: c.d }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 11 · BÖLÜM 3 ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="NLP Uygulamaları"
      subtitle="Teori sahaya iner: özetleme, çeviri, varlık tanıma, soru-cevap ve modeli güncel veriyle besleyen RAG."
      bgGradient="linear-gradient(135deg, #22c55e 0%, #15803d 100%)"
      shadow="0 0 80px rgba(34, 197, 94, 0.5)"
      icon={<Target className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 12 · UYGULAMA KARTLARI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Gerçek dünya · NLP uygulamaları</Eyebrow>
      <H2>Üretken metin nereye dokunuyor?</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Aynı temel teknoloji — token tahmini — farklı görevlere göre kurgulanınca
        çok farklı ürünlere dönüşüyor. Dördü yaygın olarak karşımıza çıkar.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FeatureCard
          icon={FileText}
          title="Özetleme"
          desc="Uzun rapor, e-posta yığını veya toplantı dökümü saniyeler içinde maddelenmiş özete iner. Çıktı her zaman kaynakla karşılaştırılmalı."
          accent="#a855f7"
          delay={0.1}
        />
        <FeatureCard
          icon={Languages}
          title="Makine çevirisi"
          desc="Bağlam-duyarlı çeviri; deyim ve ton korunmaya çalışılır. Hukuki/tıbbi metinlerde insan revizyonu hâlâ şart."
          accent="#ec4899"
          delay={0.22}
        />
        <FeatureCard
          icon={Tag}
          title="Bilgi çıkarımı (NER)"
          desc="Sözleşme, fatura veya haber metninden kişi, tarih, tutar, kurum gibi alanları yapısal olarak çıkarır."
          accent="#3b82f6"
          delay={0.34}
        />
        <FeatureCard
          icon={Bot}
          title="Soru-cevap & sohbet"
          desc="Belge tabanlı yardım masaları ve asistanlar; bağlamı koruyarak çok turlu yanıt üretir."
          accent="#22c55e"
          delay={0.46}
        />
      </div>
    </SlideShell>
  ),

  /* ───── 13 · NER ÖRNEĞİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Uygulama yakından · NER</Eyebrow>
      <H2 className="mb-2">Varlık ismi tanıma: metni yapıya çevirmek</H2>
      <Sub className="max-w-3xl mb-8">
        Bilgi çıkarımının temel taşı NER&apos;dir. Model, serbest metindeki anlamlı
        birimleri (kişi, yer, tarih, kurum) işaretler. Çıktı artık aranabilir,
        filtrelenebilir bir veridir.
      </Sub>
      <NerSentence />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono"
      >
        {[
          { label: "KİŞİ", color: "#c084fc" },
          { label: "TARİH", color: "#fbbf24" },
          { label: "YER", color: "#34d399" },
          { label: "KURUM", color: "#60a5fa" },
        ].map((l) => (
          <span key={l.label} className="flex items-center gap-2 text-gray-400">
            <span className="w-3 h-3 rounded-sm" style={{ background: l.color }} />
            {l.label}
          </span>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-6 text-center text-sm text-gray-500"
      >
        Bu yapısal çıktı; arama motorları, otomatik dosyalama ve RAG&apos;de
        <span className="text-white"> dizinleme</span> için kullanılır.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 14 · RAG / TEMELLENDİRME ───── */
  () => (
    <SlideShell>
      <Eyebrow>Güncel veriyle üretmek · RAG</Eyebrow>
      <H2 className="mb-2">Modeli kendi belgenle besle</H2>
      <Sub className="max-w-3xl mb-8">
        LLM&apos;in bilgisi belli bir tarihte donar ve özel belgelerini bilmez.
        Geri-getirmeli üretim (RAG), soruyu önce belgelerinde arar, bulduğu
        ilgili parçaları modele bağlam olarak verir; böylece yanıt güncel ve
        kaynağa dayalı olur.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-stretch">
        {[
          { icon: MessageSquare, n: "01", t: "Soru", d: "Kullanıcı bir soru sorar.", color: "#a855f7" },
          { icon: Search, n: "02", t: "Getir", d: "Soru, belge gömmeleriyle eşleştirilip ilgili parçalar bulunur.", color: "#3b82f6" },
          { icon: Layers, n: "03", t: "Birleştir", d: "Bulunan parçalar + soru tek bir prompt&apos;ta toplanır.", color: "#ec4899" },
          { icon: Check, n: "04", t: "Üret", d: "Model yanıtı bu bağlama dayanarak üretir, kaynak gösterebilir.", color: "#22c55e" },
        ].map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            className="relative uyz-card rounded-2xl p-5"
          >
            <div
              className="absolute -top-3 left-5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold"
              style={{ background: s.color, color: "#fff", boxShadow: `0 0 16px ${s.color}55` }}
            >
              {s.n}
            </div>
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center mb-3 mt-2"
              style={{ background: `${s.color}1f`, border: `1px solid ${s.color}55` }}
            >
              <s.icon className="w-5 h-5" style={{ color: s.color }} />
            </div>
            <div className="text-sm font-semibold text-white mb-1">{s.t}</div>
            <p
              className="text-xs text-gray-400 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: s.d }}
            />
            {i < 3 && (
              <div className="hidden md:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full items-center justify-center" style={{ background: "#0a0414", border: "1px solid rgba(168,85,247,0.3)" }}>
                <ChevronRight className="w-3.5 h-3.5" style={{ color: ACCENT_SOFT }} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-6 uyz-card rounded-xl p-4 flex items-start gap-3 max-w-4xl mx-auto"
      >
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
        <div className="text-sm text-gray-400">
          RAG halüsinasyonu <span className="text-white">azaltır ama bitirmez</span>:
          model, getirilen bağlamı yanlış yorumlayabilir. Yanıtın gösterilen
          kaynakla tutarlı olduğunu yine de denetlemek gerekir.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 15 · UYGULAMALI LAB ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı çalışma</Eyebrow>
      <H2>Aynı görevi parametrelerle karşılaştır</H2>
      <Sub className="mt-3 max-w-3xl">
        Bir sohbet aracında (ChatGPT, Claude veya Gemini) dört adımı uygula,
        sonuçları kısa bir notla kaydet. Önümüzdeki derste karşılaştıracağız.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: FileText, title: "Bir metni özetlet", desc: "Bir haber/makaleyi yapıştır, &ldquo;5 madde halinde özetle&rdquo; de. Çıktıyı kaynakla karşılaştır.", accent: "#a855f7" },
          { icon: Sliders, title: "Sıcaklığı değiştir", desc: "Aynı yaratıcı istemi (örn. kısa şiir) bir kez &ldquo;kararlı&rdquo;, bir kez &ldquo;yaratıcı&rdquo; modunda dene; farkı yaz.", accent: "#ec4899" },
          { icon: Tag, title: "Varlık çıkar (NER)", desc: "Bir paragraftan &ldquo;tüm kişi, yer ve tarihleri tablo halinde listele&rdquo; iste; doğruluğunu denetle.", accent: "#3b82f6" },
          { icon: ListChecks, title: "Bir hata yakala", desc: "Modeli özel bir belgeye dayanmadan zorla; uydurma (halüsinasyon) bir çıktı bul ve not al.", accent: "#22c55e" },
        ].map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="uyz-card uyz-card-hover rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${t.accent}1f`, border: `1px solid ${t.accent}55` }}
            >
              <t.icon className="w-5 h-5" style={{ color: t.accent }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono">{i + 1}</span>
                <h3 className="text-base font-semibold text-white">{t.title}</h3>
              </div>
              <p
                className="text-sm text-gray-400 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t.desc }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 uyz-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT_SOFT }} />
        <span>
          <span className="text-white">Teslim:</span> dört adımın çıktısı ve her biri için
          1–2 cümlelik gözlem. Değerlendirmeye girmiyor; ama gelecek hafta tartışma için temel olacak.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 16 · SIRADAKİ HAFTA + KAPANIŞ ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8 uyz-pulse"
          style={{ background: "linear-gradient(135deg, #a855f7, #6d28d9)", boxShadow: "0 0 60px rgba(168,85,247,0.5)" }}
        >
          <Sparkles className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>10. hafta tamamlandı · sıradaki: Görsel Üretim</Eyebrow>
        <H1>
          <span className="uyz-shimmer">Metinden Görsele</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta dili işledik ve ürettik. Hafta 11&apos;de modalite değişiyor:
          cümleden görüntü üreten diffusion modellerine ve görsel istem (prompt)
          mühendisliğine geçiyoruz.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="uyz-card rounded-xl p-5">
            <BookOpen className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Gelecek konu</div>
            <div className="text-white font-semibold">Diffusion modelleri</div>
            <div className="text-sm text-gray-400">gürültüden görüntüye</div>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <Target className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">Lab notların</div>
            <div className="text-sm text-gray-400">4 adımı tamamlamış gel</div>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <Brain className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Bağ kuracağız</div>
            <div className="text-white font-semibold">Prompt → çıktı</div>
            <div className="text-sm text-gray-400">metin ile aynı sezgi</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-[11px] font-mono text-gray-600 uppercase tracking-widest"
        >
          BVA 1203 · Üretken Yapay Zekalar · MCBÜ Manisa Meslek Yüksekokulu
        </motion.div>
      </div>
    </SlideShell>
  ),
];

const TOTAL = slides.length;

/* ============================================================
   PRESENTATION ROOT
   ============================================================ */

export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFs, setIsFs] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => Math.min(c + 1, TOTAL - 1));
  }, []);
  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => Math.max(c - 1, 0));
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key.toLowerCase() === "f") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen?.();
        } else {
          document.exitFullscreen?.();
        }
      } else if (e.key === "Home") {
        setDirection(-1);
        setCurrent(0);
      } else if (e.key === "End") {
        setDirection(1);
        setCurrent(TOTAL - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  useEffect(() => {
    function onFs() {
      setIsFs(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const touch = useRef<{ x: number } | null>(null);

  const slideContent = slides[current](true);
  const progress = ((current + 1) / TOTAL) * 100;

  return (
    <div
      className="fixed inset-0 bg-black overflow-hidden text-white"
      onTouchStart={(e) => {
        touch.current = { x: e.touches[0].clientX };
      }}
      onTouchEnd={(e) => {
        if (!touch.current) return;
        const dx = e.changedTouches[0].clientX - touch.current.x;
        if (Math.abs(dx) > 60) (dx > 0 ? prev : next)();
        touch.current = null;
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/5 z-50">
        <motion.div
          className="h-full"
          style={{
            background: "linear-gradient(90deg, #a855f7, #c084fc, #a855f7)",
            boxShadow: "0 0 16px rgba(168,85,247,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div style={{ color: "rgba(192,132,252,0.7)" }}>
          BVA 1203 · 10. Hafta · Metin Üretimi &amp; NLP
        </div>
        <div className="flex items-center gap-3">
          <div style={{ color: "rgba(192,132,252,0.5)" }}>
            <span style={{ color: ACCENT_SOFT }}>
              {String(current + 1).padStart(2, "0")}
            </span>
            <span className="mx-1">/</span>
            {String(TOTAL).padStart(2, "0")}
          </div>
          <button
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen?.();
              } else {
                document.exitFullscreen?.();
              }
            }}
            className="p-1.5 text-gray-500 transition-colors"
            style={{ color: "#6b7280" }}
            aria-label="Tam ekran"
          >
            {isFs ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 30 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {slideContent}
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prev}
        disabled={current === 0}
        aria-label="Önceki slayt"
        className="absolute left-0 top-12 bottom-16 w-[12%] z-30 cursor-w-resize disabled:cursor-default opacity-0"
      />
      <button
        onClick={next}
        disabled={current === TOTAL - 1}
        aria-label="Sonraki slayt"
        className="absolute right-0 top-12 bottom-16 w-[12%] z-30 cursor-e-resize disabled:cursor-default opacity-0"
      />

      <div className="absolute bottom-0 left-0 right-0 z-40 px-8 py-4 flex items-center justify-between border-t border-white/5 bg-black/60 backdrop-blur">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
          style={{ color: current === 0 ? undefined : "#9ca3af" }}
        >
          <ChevronLeft className="w-4 h-4" />
          Önceki
        </button>
        <div className="flex items-center gap-1 max-w-[60%] overflow-hidden">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              aria-label={`Slayt ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === current
                  ? "w-5"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? {
                      background: ACCENT,
                      boxShadow: "0 0 10px rgba(168,85,247,0.6)",
                    }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          Sonraki
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="absolute bottom-3 right-8 text-[9px] font-mono text-gray-700 z-50 hidden md:flex items-center gap-2">
        <Keyboard className="w-3 h-3" />
        <span>← → · F · Esc</span>
      </div>
    </div>
  );
}
