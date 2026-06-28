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
  Network,
  Share2,
  Boxes,
  Binary,
  ListChecks,
  GitBranch,
  Database,
  ScrollText,
  Workflow,
  Lightbulb,
  Target,
  Layers,
  Search,
  Calendar,
  Terminal,
  Code2,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
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

/* Sembolik gösterim / kod penceresi */
function CodeWindow({
  title,
  icon: Icon = Code2,
  children,
}: {
  title: string;
  icon?: LucideIcon;
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
          <Icon className="w-3.5 h-3.5" />
          <span>{title}</span>
        </div>
      </div>
      <div className="uyz-code">{children}</div>
    </motion.div>
  );
}

/* Semantik ağ — bir kuş örneği üzerinden is-a / has-a ilişkileri */
function SemanticNet() {
  const node = (
    label: string,
    variant: "" | "class" | "instance",
    delay: number,
  ) => (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      className={`uyz-node ${
        variant === "class"
          ? "uyz-node-class"
          : variant === "instance"
          ? "uyz-node-instance"
          : ""
      }`}
    >
      {label}
    </motion.span>
  );

  const edge = (label: string, delay: number) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      className="flex flex-col items-center text-gray-600"
    >
      <span className="uyz-edge-label">{label}</span>
      <span className="text-lg leading-none">↓</span>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="uyz-card rounded-2xl p-8 flex flex-col items-center gap-2 max-w-md mx-auto"
    >
      {node("Hayvan", "class", 0.3)}
      {edge("is-a", 0.45)}
      {node("Kuş", "class", 0.55)}
      <div className="flex items-center gap-10">
        <div className="flex flex-col items-center gap-2">
          {edge("is-a", 0.7)}
          {node("Penguen", "instance", 0.8)}
        </div>
        <div className="flex flex-col items-center gap-2">
          {edge("has-a", 0.7)}
          {node("Kanat", "", 0.8)}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mt-3 text-[11px] text-gray-500 text-center"
      >
        &ldquo;Kuş uçar&rdquo; özelliği <span className="text-white">kalıtımla</span> Penguen&apos;e geçer
        — ama istisna (penguen uçmaz) ayrıca tanımlanmalıdır.
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ─────────────────  1 · KAPAK  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 1203 · 13. Hafta</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]"
        >
          <span className="uyz-shimmer">Yapay Zekâda</span>
          <br />
          <span className="uyz-shimmer">Bilgi Gösterimi</span>
        </motion.h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Bir makine &ldquo;bildiğini&rdquo; nasıl saklar? Mantık, kural, semantik ağ,
          ontoloji ve bilgi grafikleriyle dünyayı temsil etmenin yolları.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Binary}
            title="Sembolik Gösterim"
            desc="Mantık, kurallar, semantik ağlar ve çerçeveler (frames)."
            delay={0.3}
            accent="#a855f7"
          />
          <FeatureCard
            icon={Share2}
            title="Bilgi Grafikleri"
            desc="Özne–yüklem–nesne üçlüleri, ontolojiler ve RDF."
            delay={0.45}
            accent="#3b82f6"
          />
          <FeatureCard
            icon={Brain}
            title="LLM ile Köprü"
            desc="Üretken modelleri bilgiyle dayandırma (grounding) ve RAG."
            delay={0.6}
            accent="#22c55e"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-10 text-[11px] font-mono text-gray-600 uppercase tracking-widest"
        >
          MCBÜ MYO · BVA 1203 · Per 15:20 – 17:00 · Amfi 1
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2 · KÖPRÜ / HEDEF  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 12. haftadan 13. haftaya</Eyebrow>
      <H2>Üreten modelden bilen modele.</H2>
      <Sub className="mt-3 mb-10 max-w-3xl">
        Geçen hafta modellerin nasıl <span className="text-white">olası</span> cümleler
        ürettiğini gördük. Bu hafta farklı bir soru soruyoruz: bir yapay zekâ bir
        bilgiyi <span className="text-white">açıkça</span> nasıl tutar, üzerinde nasıl
        akıl yürütür?
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="uyz-card rounded-2xl p-7"
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: "#3b82f622", border: "1px solid #3b82f655" }}
            >
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Örtük bilgi (LLM)</h3>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Bilgi milyarlarca parametrenin içine <span className="text-white">dağılmış</span>.
            Ne tam olarak nerede durduğunu görebilir, ne de tek tek
            düzenleyebilirsin. Doğrulanması güçtür.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="uyz-card-violet rounded-2xl p-7"
          style={{ boxShadow: "0 0 40px rgba(168,85,247,0.2)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: `${ACCENT}22`, border: `1px solid ${ACCENT}66` }}
            >
              <Network className="w-5 h-5" style={{ color: ACCENT_SOFT }} />
            </div>
            <h3 className="text-lg font-semibold text-white">Açık bilgi (Bilgi gösterimi)</h3>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Bilgi <span className="text-white">okunabilir semboller</span> hâlinde
            tutulur: kurallar, üçlüler, ontolojiler. İncelenebilir, sorgulanabilir,
            güncellenebilir; üzerinde mantıkla akıl yürütülür.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-6 text-center text-sm text-gray-500"
      >
        Bugünün hedefi: bilgi gösteriminin <span className="text-white">temel biçimlerini</span> tanımak
        ve bunların üretken YZ ile nasıl birleştiğini görmek.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  3 · BÖLÜM HARİTASI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: semboller → grafikler → LLM köprüsü</H2>
      <Sub className="mt-3 mb-10 max-w-3xl">
        Önce klasik sembolik gösterimleri kuruyoruz; sonra bunları bilgi
        grafiklerinde ölçeklendiriyoruz; en sonunda üretken modellerle nasıl
        birleştiğini görüyoruz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            range: "01",
            title: "Sembolik Gösterim",
            items: ["Önermeler & yüklem mantığı", "Üretim kuralları (IF-THEN)", "Semantik ağlar & çerçeveler"],
            icon: Binary,
            accent: "#a855f7",
          },
          {
            range: "02",
            title: "Bilgi Grafikleri",
            items: ["Özne–yüklem–nesne üçlüsü", "Ontoloji & RDF / OWL", "SPARQL ile sorgulama"],
            icon: Share2,
            accent: "#3b82f6",
          },
          {
            range: "03",
            title: "Üretken YZ ile Köprü",
            items: ["Halüsinasyon & dayanak sorunu", "RAG ile dış bilgi", "Graf destekli üretim (GraphRAG)"],
            icon: Brain,
            accent: "#22c55e",
          },
        ].map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="uyz-card rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${g.accent}18`, border: `1px solid ${g.accent}55` }}
              >
                <g.icon className="w-5 h-5" style={{ color: g.accent }} />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: g.accent }}>
                  Durak {g.range}
                </div>
                <div className="text-lg font-semibold text-white">{g.title}</div>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-400">
              {g.items.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <ChevronRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: g.accent }} />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  4 · DIVIDER 1/3  ───────────────── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Sembolik Gösterim"
      subtitle="Bilgiyi insan da makine de okuyabilen sembollerle yazmak: mantık, kurallar, semantik ağlar ve çerçeveler."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #6d28d9 100%)"
      shadow="0 0 80px rgba(168, 85, 247, 0.55)"
      icon={<Binary className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  5 · MANTIK GÖSTERİMİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sembolik · 1/3</Eyebrow>
      <H2 className="mb-2">Mantık: bilgiyi önerme olarak yazmak</H2>
      <Sub className="max-w-3xl mb-6">
        Yüklem mantığı (predicate logic), nesneler ve aralarındaki ilişkileri
        kesin sembollerle ifade eder. Olgular ve kurallar yazılır; bir
        çıkarım motoru bunlardan yeni sonuçlar <span className="text-white">türetir</span>.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <CodeWindow title="aile.pl — Prolog bilgi tabanı" icon={Terminal}>
          <div><span className="uyz-code-dim">% Olgular (gerçekler)</span></div>
          <div>
            <span className="uyz-code-key">ebeveyn</span>(
            <span className="uyz-code-atom">ahmet</span>,{" "}
            <span className="uyz-code-atom">ayse</span>).
          </div>
          <div>
            <span className="uyz-code-key">ebeveyn</span>(
            <span className="uyz-code-atom">ahmet</span>,{" "}
            <span className="uyz-code-atom">mehmet</span>).
          </div>
          <div>
            <span className="uyz-code-key">ebeveyn</span>(
            <span className="uyz-code-atom">ayse</span>,{" "}
            <span className="uyz-code-atom">deniz</span>).
          </div>
          <div className="mt-2"><span className="uyz-code-dim">% Kural: dedebabaanne tanımı</span></div>
          <div>
            <span className="uyz-code-key">dede_nine</span>(
            <span className="uyz-code-var">X</span>,{" "}
            <span className="uyz-code-var">Z</span>){" "}
            <span className="uyz-code-op">:-</span>
          </div>
          <div className="pl-6">
            <span className="uyz-code-key">ebeveyn</span>(
            <span className="uyz-code-var">X</span>,{" "}
            <span className="uyz-code-var">Y</span>),{" "}
            <span className="uyz-code-key">ebeveyn</span>(
            <span className="uyz-code-var">Y</span>,{" "}
            <span className="uyz-code-var">Z</span>).
          </div>
          <div className="mt-3"><span className="uyz-code-dim">% Sorgu</span></div>
          <div>
            <span className="uyz-code-op">?-</span>{" "}
            <span className="uyz-code-key">dede_nine</span>(
            <span className="uyz-code-atom">ahmet</span>,{" "}
            <span className="uyz-code-var">Torun</span>).
          </div>
          <div>
            <span className="uyz-code-ok">Torun = deniz.</span>
          </div>
        </CodeWindow>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4"
        >
          <div className="uyz-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <ScrollText className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
              <div className="text-sm font-semibold text-white">Olgu vs kural</div>
            </div>
            <p className="text-sm text-gray-400">
              Olgu doğrudan bir gerçektir. Kural ise &ldquo;eğer ... ise ...&rdquo;
              biçiminde yeni bilgi üretir. Sistem ikisini birleştirip cevaba ulaşır.
            </p>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Workflow className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
              <div className="text-sm font-semibold text-white">Çıkarım (inference)</div>
            </div>
            <p className="text-sm text-gray-400">
              Değişkenler (büyük harfle yazılır) sorguya göre eşleştirilir;
              motor geriye dönük arama ile <span className="text-white">tüm uygun değerleri</span> bulur.
            </p>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
              <div className="text-sm font-semibold text-white">Güçlü yan</div>
            </div>
            <p className="text-sm text-gray-400">
              Her adım <span className="text-white">izlenebilir ve açıklanabilir</span>.
              Sonuca nasıl varıldığını sembol sembol gösterebilirsin.
            </p>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  6 · ÜRETİM KURALLARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sembolik · 2/3</Eyebrow>
      <H2 className="mb-2">Üretim kuralları: uzman sistemlerin motoru</H2>
      <Sub className="max-w-3xl mb-6">
        Bilgi, &ldquo;EĞER koşul DOĞRUYSA O HALDE sonuç&rdquo; biçiminde kurallarla
        yazılır. Bir çıkarım motoru kuralları çalışma belleğindeki olgularla
        eşleştirir ve zincirleme akıl yürütür.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        <div className="md:col-span-3">
          <CodeWindow title="kurallar.txt — basit arıza teşhisi" icon={ListChecks}>
            <div><span className="uyz-code-dim"># Çalışma belleğindeki olgular</span></div>
            <div>
              <span className="uyz-code-atom">cihaz_acilmiyor = doğru</span>
            </div>
            <div>
              <span className="uyz-code-atom">guc_lambasi_yaniyor = yanlış</span>
            </div>
            <div className="mt-3"><span className="uyz-code-dim"># Kurallar</span></div>
            <div>
              <span className="uyz-code-key">EĞER</span> cihaz_acilmiyor{" "}
              <span className="uyz-code-op">VE</span> guc_lambasi_yaniyor=yanlış
            </div>
            <div className="pl-4">
              <span className="uyz-code-key">O HALDE</span> sorun ={" "}
              <span className="uyz-code-ok">güç_kaynağı</span>
            </div>
            <div className="mt-2">
              <span className="uyz-code-key">EĞER</span> sorun=güç_kaynağı
            </div>
            <div className="pl-4">
              <span className="uyz-code-key">O HALDE</span> öner ={" "}
              <span className="uyz-code-ok">&quot;adaptörü ve prizi kontrol et&quot;</span>
            </div>
            <div className="mt-3"><span className="uyz-code-dim"># Sonuç (ileri zincirleme)</span></div>
            <div>
              <span className="uyz-code-ok">→ Öneri: adaptörü ve prizi kontrol et</span>
            </div>
          </CodeWindow>
        </div>

        <div className="md:col-span-2 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="uyz-card rounded-xl p-4"
          >
            <div className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: ACCENT_SOFT }}>
              İleri zincirleme
            </div>
            <p className="text-sm text-gray-300">
              Olgulardan başlanır, kurallar uygulanarak sonuca doğru ilerlenir.
              Veriden hedefe.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="uyz-card rounded-xl p-4"
          >
            <div className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: ACCENT_SOFT }}>
              Geri zincirleme
            </div>
            <p className="text-sm text-gray-300">
              Bir hedeften başlanır, onu doğrulayacak koşullar geriye doğru
              aranır. Hedeften veriye.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="rounded-xl p-4"
            style={{
              background: "rgba(245, 158, 11, 0.08)",
              border: "1px solid rgba(245, 158, 11, 0.25)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <div className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Sınır
              </div>
            </div>
            <div className="text-sm text-gray-300">
              Kurallar elle yazılır; binlerce kural birikince yönetmek zorlaşır.
              Buna &ldquo;bilgi edinme darboğazı&rdquo; denir.
            </div>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  7 · SEMANTİK AĞLAR & ÇERÇEVELER  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sembolik · 3/3</Eyebrow>
      <H2 className="mb-2">Semantik ağlar ve çerçeveler</H2>
      <Sub className="max-w-3xl mb-6">
        Semantik ağ, kavramları düğüm, ilişkileri ok olarak çizer. Çerçeve
        (frame) ise bir nesneyi <span className="text-white">slot–değer</span>{" "}
        çiftleriyle tanımlar — nesne tabanlı programlamanın atası.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <SemanticNet />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="uyz-card rounded-2xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-wider mb-4" style={{ color: ACCENT_SOFT }}>
            Çerçeve (frame) — Penguen
          </div>
          <div className="font-mono text-sm space-y-2">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">tür</span>
              <span className="text-blue-300">: Kuş</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">kanat_sayısı</span>
              <span className="text-green-300">: 2</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">uçabilir</span>
              <span className="text-pink-300">: hayır (istisna)</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">yaşam_alanı</span>
              <span className="text-violet-300">: kutup</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">beslenme</span>
              <span className="text-violet-300">: balık</span>
            </div>
          </div>
          <div className="mt-4 text-[11px] text-gray-500">
            Tanımlanmayan slotlar üst sınıftan (Kuş) <span className="text-white">miras alınır</span>.
            Çerçeveler, bugünkü nesne ve ontoloji modellerinin temelini attı.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  8 · DIVIDER 2/3  ───────────────── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Bilgi Grafikleri"
      subtitle="Milyonlarca olguyu ölçeklenebilir biçimde tutmak: özne–yüklem–nesne üçlüleri, ontolojiler ve sorgulanabilir grafikler."
      bgGradient="linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)"
      shadow="0 0 80px rgba(59, 130, 246, 0.55)"
      icon={<Share2 className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  9 · ÜÇLÜ (TRIPLE)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bilgi grafiği · temel birim</Eyebrow>
      <H2 className="mb-2">Her şey bir üçlü: özne → yüklem → nesne</H2>
      <Sub className="max-w-3xl mb-8">
        Bilgi grafikleri tek bir basit yapı üzerine kuruludur. Bu üçlüler
        birleşince devasa, gezilebilir bir bilgi ağı oluşur — Google, Wikidata
        ve birçok arama motorunun arkasındaki yapı budur.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch mb-6">
        {[
          { role: "Özne", value: "Manisa", color: "#a855f7", icon: Boxes },
          { role: "Yüklem", value: "bağlı_olduğu_ülke", color: "#3b82f6", icon: GitBranch },
          { role: "Nesne", value: "Türkiye", color: "#22c55e", icon: Boxes },
        ].map((t, i) => (
          <motion.div
            key={t.role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            className="relative uyz-card rounded-2xl p-6 text-center"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
              style={{ background: `${t.color}1f`, border: `1px solid ${t.color}55` }}
            >
              <t.icon className="w-6 h-6" style={{ color: t.color }} />
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: t.color }}>
              {t.role}
            </div>
            <div className="text-lg font-semibold text-white font-mono">{t.value}</div>
            {i < 2 && (
              <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full items-center justify-center" style={{ background: "#0a0414", border: "1px solid rgba(168,85,247,0.3)" }}>
                <ChevronRight className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <CodeWindow title="manisa.ttl — RDF / Turtle gösterimi" icon={Database}>
        <div>
          <span className="uyz-code-key">@prefix</span> ex:{" "}
          <span className="uyz-code-atom">&lt;http://ornek.org/&gt;</span> .
        </div>
        <div className="mt-2">
          ex:<span className="uyz-code-atom">Manisa</span>{" "}
          ex:<span className="uyz-code-op">bagliOlduguUlke</span>{" "}
          ex:<span className="uyz-code-ok">Turkiye</span> ;
        </div>
        <div className="pl-12">
          ex:<span className="uyz-code-op">turu</span>{" "}
          ex:<span className="uyz-code-atom">Sehir</span> ;
        </div>
        <div className="pl-12">
          ex:<span className="uyz-code-op">nufus</span>{" "}
          <span className="uyz-code-var">&quot;1500000&quot;</span> .
        </div>
        <div className="mt-2 uyz-code-dim">% Üç olgu, tek özne — graf büyür</div>
      </CodeWindow>
    </SlideShell>
  ),

  /* ─────────────────  10 · ONTOLOJİ & SPARQL  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bilgi grafiği · anlam &amp; sorgu</Eyebrow>
      <H2 className="mb-2">Ontoloji şemayı verir, SPARQL sorar</H2>
      <Sub className="max-w-3xl mb-6">
        Ontoloji (RDFS/OWL), grafiğin <span className="text-white">kurallarını</span>{" "}
        tanımlar: hangi sınıflar var, hangi ilişkiler geçerli, neyden ne çıkarılır.
        SPARQL ise grafiğe SQL benzeri sorular sorar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="uyz-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs font-mono uppercase tracking-wider text-gray-400">
              Ontoloji — sınıf hiyerarşisi
            </div>
          </div>
          <div className="space-y-2.5">
            {[
              { label: "Varlık", indent: 0, color: "#a855f7" },
              { label: "Yerleşim", indent: 1, color: "#8b5cf6" },
              { label: "Şehir  ⊑  Yerleşim", indent: 2, color: "#3b82f6" },
              { label: "Başkent  ⊑  Şehir", indent: 3, color: "#22c55e" },
            ].map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                className="rounded-lg px-4 py-2.5 font-mono text-sm"
                style={{
                  background: `${c.color}12`,
                  border: `1px solid ${c.color}40`,
                  marginLeft: `${c.indent * 18}px`,
                  color: "#e5e7eb",
                }}
              >
                {c.label}
              </motion.div>
            ))}
          </div>
          <div className="mt-4 text-[11px] text-gray-500">
            &ldquo;Başkent bir Şehirdir, Şehir bir Yerleşimdir&rdquo; — bu yüzden
            bir başkent sorulan her şehir sorgusunda da otomatik döner (çıkarım).
          </div>
        </motion.div>

        <CodeWindow title="sorgu.rq — Türkiye&apos;deki şehirler" icon={Search}>
          <div>
            <span className="uyz-code-key">SELECT</span>{" "}
            <span className="uyz-code-var">?sehir</span>
          </div>
          <div>
            <span className="uyz-code-key">WHERE</span> {"{"}
          </div>
          <div className="pl-4">
            <span className="uyz-code-var">?sehir</span> ex:turu ex:
            <span className="uyz-code-atom">Sehir</span> .
          </div>
          <div className="pl-4">
            <span className="uyz-code-var">?sehir</span> ex:bagliOlduguUlke ex:
            <span className="uyz-code-atom">Turkiye</span> .
          </div>
          <div>{"}"}</div>
          <div className="mt-3 uyz-code-dim">→ Sonuç</div>
          <div><span className="uyz-code-ok">?sehir = Manisa, İzmir, Ankara, ...</span></div>
        </CodeWindow>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  11 · SEMBOLİK vs ALT-SEMBOLİK TABLO  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Karşılaştırma</Eyebrow>
      <H2>İki dünya: sembolik &amp; alt-sembolik</H2>
      <Sub className="mt-3 mb-6 max-w-3xl">
        Bilgi gösterimi (sembolik) ile sinir ağları (alt-sembolik) zıt değil,
        tamamlayıcı. Modern sistemler ikisini birleştirir (nöro-sembolik YZ).
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="uyz-card rounded-xl p-1"
      >
        <table className="uyz-tbl">
          <thead>
            <tr>
              <th style={{ width: "22%" }}>Ölçüt</th>
              <th style={{ width: "39%" }}>Sembolik (bilgi gösterimi)</th>
              <th>Alt-sembolik (sinir ağı / LLM)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Bilgi nerede?</td>
              <td>Açık kurallar, üçlüler, ontolojiler.</td>
              <td>Ağırlıklara dağılmış, örtük.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Açıklanabilirlik</td>
              <td><span className="text-green-300">Yüksek</span> — her adım izlenir.</td>
              <td><span className="text-amber-300">Düşük</span> — kara kutu eğilimi.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Belirsizlikle başa çıkma</td>
              <td>Zayıf — kesin, kırılgan kurallar.</td>
              <td><span className="text-green-300">Güçlü</span> — gürültülü veriye dayanıklı.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Güncelleme</td>
              <td>Bir olguyu tek tek ekle/sil.</td>
              <td>Çoğunlukla yeniden eğitim gerekir.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Tipik kullanım</td>
              <td>Uzman sistem, kural motoru, grafik DB.</td>
              <td>Dil, görsel, ses üretimi.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-5 text-center text-sm text-gray-500"
      >
        Eğilim: <span className="text-white">nöro-sembolik</span> — LLM&apos;in
        esnekliğini, bilgi grafiğinin doğruluğu ve izlenebilirliğiyle birleştirmek.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  12 · DIVIDER 3/3  ───────────────── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Üretken YZ ile Köprü"
      subtitle="Bir LLM&apos;e güvenilir bilgi nasıl verilir? Bilgi gösterimi, halüsinasyonu azaltıp cevapları dayanaklandırmanın anahtarıdır."
      bgGradient="linear-gradient(135deg, #22c55e 0%, #15803d 100%)"
      shadow="0 0 80px rgba(34, 197, 94, 0.55)"
      icon={<Brain className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  13 · RAG / GROUNDING  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · dayanaklandırma</Eyebrow>
      <H2 className="mb-2">RAG: modeli dış bilgiyle besle</H2>
      <Sub className="max-w-3xl mb-8">
        LLM&apos;in kendi belleği donmuş ve örtüktür. RAG (Retrieval-Augmented
        Generation), soruyla ilgili olguları bir bilgi kaynağından{" "}
        <span className="text-white">çekip</span> prompt&apos;a ekler — model artık
        uydurmak yerine verilen kaynaktan cevaplar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-stretch">
        {[
          { n: "01", icon: Search, title: "Soru", desc: "Kullanıcı bir soru sorar.", accent: "#a855f7" },
          { n: "02", icon: Database, title: "Getir (Retrieve)", desc: "İlgili olgular bilgi grafiği veya belgelerden çekilir.", accent: "#3b82f6" },
          { n: "03", icon: Layers, title: "Birleştir", desc: "Çekilen bilgi prompt&apos;a bağlam olarak eklenir.", accent: "#ec4899" },
          { n: "04", icon: Sparkles, title: "Üret", desc: "Model cevabı kaynağa dayanarak üretir.", accent: "#22c55e" },
        ].map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            className="relative uyz-card rounded-2xl p-5"
          >
            <div
              className="absolute -top-3 left-5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold"
              style={{ background: step.accent, color: "#fff", boxShadow: `0 0 20px ${step.accent}55` }}
            >
              {step.n}
            </div>
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 mt-2"
              style={{ background: `${step.accent}1f`, border: `1px solid ${step.accent}55` }}
            >
              <step.icon className="w-5 h-5" style={{ color: step.accent }} />
            </div>
            <h3 className="text-base font-semibold text-white mb-1">{step.title}</h3>
            <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
            {i < 3 && (
              <div className="hidden md:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full items-center justify-center" style={{ background: "#0a0414", border: "1px solid rgba(168,85,247,0.3)" }}>
                <ChevronRight className="w-3.5 h-3.5" style={{ color: ACCENT_SOFT }} />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-8 uyz-card rounded-xl p-5 flex items-center gap-4"
      >
        <Network className="w-8 h-8 shrink-0" style={{ color: ACCENT_SOFT }} />
        <div className="text-sm text-gray-400">
          <span className="text-white font-semibold">GraphRAG:</span>{" "}
          bilgiyi düz metin yerine bir bilgi grafiğinden çekmek. Böylece model
          yalnızca ilgili belgeyi değil, varlıklar arasındaki <span className="text-white">ilişkileri</span> de görür —
          çok adımlı sorular için daha güvenilir.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  14 · UYGULAMALI LAB  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı alıştırma</Eyebrow>
      <H2>Küçük bir bilgi tabanı kur ve sorgula</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Hedef: kendi seçtiğin bir konuda (örn. bir şehir, bir film evreni, bir
        ürün katalogu) en az 10 olgu içeren küçük bir bilgi tabanı yazıp üzerinde
        en az iki çıkarım yaptırmak.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: Boxes, title: "Varlıkları belirle", desc: "Konunun 4-6 temel kavramını ve örneklerini listele (sınıf ve örnek ayrımıyla).", accent: "#a855f7" },
          { icon: GitBranch, title: "Üçlüleri yaz", desc: "Her ilişkiyi özne–yüklem–nesne olarak yaz: en az 10 olgu. RDF/Turtle ya da Prolog olgusu serbest.", accent: "#3b82f6" },
          { icon: ScrollText, title: "Bir kural ekle", desc: "Var olan olgulardan yeni bilgi türeten en az bir kural tanımla (örn. dolaylı bir ilişki).", accent: "#ec4899" },
          { icon: Search, title: "İki sorgu çalıştır", desc: "Biri doğrudan olgu, biri kural üzerinden çıkarım gerektiren iki soru sor; sonucu kaydet.", accent: "#22c55e" },
        ].map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
            className="uyz-card uyz-card-hover rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${t.accent}18`, border: `1px solid ${t.accent}55` }}
            >
              <t.icon className="w-5 h-5" style={{ color: t.accent }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono">
                  {i + 1}
                </span>
                <h3 className="text-base font-semibold text-white">{t.title}</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{t.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-6 uyz-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT_SOFT }} />
        <span>
          <span className="text-white">Araç önerisi:</span> tarayıcıda SWI-Prolog
          (swish.swi-prolog.org) ya da düz bir metin dosyasıyla RDF/Turtle.
          Kurulum gerektirmeyen seçenekler yeterli — odak gösterimde, araçta değil.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · SONRAKİ HAFTA + KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{
            background: "linear-gradient(135deg, #a855f7, #6d28d9)",
            boxShadow: "0 0 60px rgba(168,85,247,0.5)",
          }}
        >
          <Network className="w-12 h-12 text-white" />
        </motion.div>

        <Eyebrow>13. hafta tamamlandı · sıradaki: Akıl Yürütme &amp; Çıkarım</Eyebrow>
        <H1>
          <span className="uyz-shimmer">Bilgiden Karara</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta bilgiyi <span className="text-white">nasıl sakladığımızı</span> gördük.
          14. haftada o bilginin üzerinde nasıl <span className="text-white">akıl yürütüldüğünü</span> işleyeceğiz:
          çıkarım kuralları, arama ve belirsizlik altında karar.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="uyz-card rounded-xl p-5">
            <Calendar className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Perşembe</div>
            <div className="text-sm text-gray-400">15:20 – 17:00 · Amfi 1</div>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <Target className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">Bilgi tabanı</div>
            <div className="text-sm text-gray-400">10 olgu + 1 kural getir</div>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <ListChecks className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">İki sorgu sonucu</div>
            <div className="text-sm text-gray-400">olgu + çıkarım örneği</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
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
          BVA 1203 · 13. Hafta · Bilgi Gösterimi
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
