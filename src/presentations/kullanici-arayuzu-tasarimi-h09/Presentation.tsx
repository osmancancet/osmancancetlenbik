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
  Pencil,
  PenTool,
  Layers,
  Layout as LayoutIcon,
  Frame,
  Square,
  Image as ImageIcon,
  Type,
  MousePointer2,
  Hand,
  Zap,
  Gauge,
  Boxes,
  GitBranch,
  Workflow,
  ListChecks,
  ClipboardCheck,
  Eye,
  Clock,
  DollarSign,
  Users,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Maximize2,
  Minimize2,
  Keyboard,
  Sparkles,
  Calendar,
  Smartphone,
  Search,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import "./styles.css";

/* ============================================================
   PRIMITIVES  (h01 ile birebir aynı)
   ============================================================ */

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
        <div className="absolute inset-0 katas-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#ec4899]"
    >
      <span className="w-8 h-px bg-[#ec4899]" />
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
  accent = "#ec4899",
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
      className="katas-card katas-card-hover rounded-xl p-6 transition-all"
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={{
          background: `${accent}15`,
          border: `1px solid ${accent}40`,
        }}
      >
        <Icon className="w-6 h-6" style={{ color: accent }} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
  source,
  delay = 0,
  accent = "#ec4899",
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  source?: string;
  delay?: number;
  accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="katas-card rounded-xl p-5"
    >
      <Icon className="w-6 h-6 mb-3" style={{ color: accent }} />
      <div className="text-3xl md:text-4xl font-bold text-white">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
      {source && (
        <div className="text-[9px] text-gray-600 mt-2 font-mono">{source}</div>
      )}
    </motion.div>
  );
}

function FigmaFrameMockup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="katas-window-chrome w-full"
    >
      <div className="katas-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-semibold flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d0d0d", color: "#f9a8d4" }}
        >
          <span className="w-5 h-5 rounded-sm katas-f-tile flex items-center justify-center text-[11px]">F</span>
          <span>{title}</span>
        </div>
      </div>
      <div className="p-0">{children}</div>
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
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 katas-pulse"
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
   TOPIC-SPECIFIC MOCKUPS  (bu hafta: wireframe & low-fi)
   ============================================================ */

/* Bir telefon ekranını low-fi wireframe olarak çizer:
   gri bloklar, çapraz taralı görsel alanı, gri metin çizgileri. */
function LowFiWirePhone() {
  return (
    <div className="katas-wire w-[200px] p-3 mx-auto shadow-xl">
      {/* status bar — sadece gri çubuklar */}
      <div className="flex items-center justify-between mb-3">
        <span className="katas-wire-line w-8" />
        <div className="flex gap-1">
          <span className="katas-wire-box w-2 h-2 rounded-full" />
          <span className="katas-wire-box w-2 h-2 rounded-full" />
        </div>
      </div>
      {/* başlık placeholder */}
      <div className="katas-wire-box h-5 w-2/3 mb-2" />
      <div className="katas-wire-line w-1/2 mb-4" />
      {/* görsel alanı (çapraz tarama + X) */}
      <div className="katas-wire-image h-24 mb-4 flex items-center justify-center">
        <ImageIcon className="w-7 h-7 text-stone-400" />
      </div>
      {/* liste satırları */}
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-2 mb-2.5">
          <span className="katas-wire-box w-7 h-7 rounded" />
          <div className="flex-1">
            <span className="katas-wire-line w-3/4 mb-1.5 block" />
            <span className="katas-wire-line katas-wire-box-soft w-1/2 block" />
          </div>
        </div>
      ))}
      {/* buton placeholder */}
      <div className="katas-wire-box h-9 w-full mt-3 flex items-center justify-center">
        <span className="katas-wire-line w-1/3 bg-stone-400" />
      </div>
    </div>
  );
}

/* Aynı ekranın "yüksek çözünürlük" hâli — renkli, gerçek tipografili */
function HiFiPhone() {
  return (
    <div className="katas-phone w-[200px] h-[400px] p-2 mx-auto">
      <div className="katas-phone-screen w-full h-full flex flex-col">
        <div className="flex items-center justify-between px-3 py-1.5 text-[8px] text-gray-700 font-semibold">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <span className="w-3 h-1.5 rounded-sm border border-gray-700" />
          </span>
        </div>
        <div className="px-3 py-2">
          <div className="text-[15px] font-bold text-gray-900">Keşfet</div>
          <div className="text-[9px] text-gray-500">Sana özel öneriler</div>
        </div>
        <div
          className="mx-3 my-1 h-24 rounded-lg flex items-end p-2"
          style={{ background: "linear-gradient(135deg, #ec4899, #be185d)" }}
        >
          <div className="text-[11px] font-bold text-white">Haftanın seçkisi</div>
        </div>
        <div className="px-3 mt-2 space-y-1.5">
          {[
            { t: "Minimal arayüzler", c: "#f472b6" },
            { t: "Renk teorisi", c: "#a855f7" },
            { t: "Tipografi 101", c: "#3b82f6" },
          ].map((r) => (
            <div key={r.t} className="flex items-center gap-2 py-1.5 px-2 bg-white rounded shadow-sm">
              <span className="w-6 h-6 rounded" style={{ background: r.c }} />
              <div>
                <div className="text-[9px] text-gray-800 font-semibold">{r.t}</div>
                <div className="text-[7px] text-gray-400">12 ders</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-auto p-3">
          <div className="text-center py-2 rounded-lg text-[10px] font-bold text-white" style={{ background: "#ec4899" }}>
            Tümünü gör
          </div>
        </div>
      </div>
    </div>
  );
}

/* Fidelity (sadakat) spektrumu: eskiz → wireframe → mockup → prototip */
function FidelitySpectrum() {
  const steps = [
    { label: "Kağıt eskiz", desc: "Saniyeler · kalem", icon: Pencil, color: "#94a3b8" },
    { label: "Wireframe", desc: "Gri kutular · düzen", icon: LayoutIcon, color: "#ec4899" },
    { label: "Mockup", desc: "Renk · tipografi", icon: PenTool, color: "#a855f7" },
    { label: "Prototip", desc: "Tıklanabilir akış", icon: Workflow, color: "#3b82f6" },
  ];
  return (
    <div className="relative w-full max-w-5xl mx-auto py-8">
      <div className="absolute top-[52px] left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-slate-400 via-pink-500 to-blue-500 opacity-50" />
      <div className="grid grid-cols-4 gap-4 relative z-10">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="flex flex-col items-center text-center"
          >
            <div
              className="w-[88px] h-[88px] rounded-full flex items-center justify-center mb-4"
              style={{
                background: `linear-gradient(135deg, ${s.color}, ${s.color}aa)`,
                boxShadow: `0 0 28px ${s.color}55`,
              }}
            >
              <s.icon className="w-9 h-9 text-white" />
            </div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="text-sm font-bold text-white">{s.label}</div>
            <div className="text-[11px] text-gray-400 mt-1">{s.desc}</div>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between max-w-5xl mx-auto px-2 text-[11px] font-mono text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-400" /> Düşük çözünürlük
        </span>
        <ArrowRight className="w-4 h-4 text-gray-600" />
        <span className="flex items-center gap-1.5">
          Yüksek çözünürlük <span className="w-2 h-2 rounded-full bg-blue-500" />
        </span>
      </div>
    </div>
  );
}

/* Figma içinde bir wireframe çalışma alanı — katmanlar gri kutular */
function WireframeWorkspace() {
  return (
    <FigmaFrameMockup title="ders-h09-wireframe.fig — Low-fi">
      <div className="flex h-[420px] bg-[#1e1e1e]">
        {/* Sol: katmanlar */}
        <div className="katas-figma-panel w-[180px] flex flex-col border-r border-black/30">
          <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-gray-500 font-semibold border-b border-black/30">
            Layers
          </div>
          <div className="p-2 space-y-0.5 text-[10px]">
            <div className="katas-figma-row">
              <Frame className="w-3 h-3 text-pink-400" />
              <span className="font-semibold">Wireframe · Home</span>
            </div>
            <div className="katas-figma-row pl-5">
              <Square className="w-3 h-3 text-gray-400" />
              <span>Header (placeholder)</span>
            </div>
            <div className="katas-figma-row pl-5 katas-figma-row-active">
              <ImageIcon className="w-3 h-3" />
              <span>Image box</span>
            </div>
            <div className="katas-figma-row pl-5">
              <Type className="w-3 h-3 text-gray-400" />
              <span>Text lines</span>
            </div>
            <div className="katas-figma-row pl-5">
              <Layers className="w-3 h-3 text-gray-400" />
              <span>List ×3</span>
            </div>
            <div className="katas-figma-row pl-5">
              <Square className="w-3 h-3 text-gray-400" />
              <span>Button</span>
            </div>
            <div className="katas-figma-divider" />
            <div className="katas-figma-row">
              <Boxes className="w-3 h-3 text-purple-400" />
              <span className="font-semibold">Wireframe kit</span>
            </div>
            <div className="katas-figma-row pl-5">
              <span className="w-2 h-2 rounded-sm bg-purple-500" />
              <span>Gray block</span>
            </div>
            <div className="katas-figma-row pl-5">
              <span className="w-2 h-2 rounded-sm bg-purple-500" />
              <span>Placeholder text</span>
            </div>
          </div>
        </div>
        {/* Orta: canvas + wireframe telefon */}
        <div className="flex-1 katas-figma-canvas flex items-center justify-center relative">
          <div className="absolute top-2 left-2 text-[9px] text-gray-500 font-mono">
            Home — 390 × 844 · Low-fi
          </div>
          <div className="absolute top-2 right-2 text-[9px] text-pink-400 font-mono">
            grayscale
          </div>
          <LowFiWirePhone />
          <div className="absolute bottom-3 left-3 flex gap-1.5">
            {[MousePointer2, Frame, Square, Type, PenTool, Hand].map((Ic, i) => (
              <div key={i} className={`w-7 h-7 rounded flex items-center justify-center ${i === 1 ? "bg-pink-500" : "bg-[#2c2c2c]"}`}>
                <Ic className="w-3.5 h-3.5 text-white" />
              </div>
            ))}
          </div>
        </div>
        {/* Sağ: özellikler — low-fi kısıtları */}
        <div className="katas-figma-panel w-[200px] flex flex-col border-l border-black/30">
          <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-gray-500 font-semibold border-b border-black/30">
            Design · Low-fi kuralı
          </div>
          <div className="p-3 space-y-3 text-[10px]">
            <div>
              <div className="text-gray-500 mb-1">Fill</div>
              <div className="bg-[#1a1a1a] px-2 py-1 rounded flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-stone-400" />
                <span className="text-gray-300">D6D3D1 · sadece gri</span>
              </div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Typography</div>
              <div className="bg-[#1a1a1a] px-2 py-1 rounded text-gray-300">Placeholder · çizgi</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Auto Layout</div>
              <div className="bg-pink-500/20 text-pink-300 px-2 py-1.5 rounded flex items-center justify-between">
                <span>Vertical · 16px</span>
                <Check className="w-3 h-3" />
              </div>
            </div>
            <div className="katas-codeline">
              kural: renk yok · gerçek metin yok · sadece düzen
            </div>
          </div>
        </div>
      </div>
    </FigmaFrameMockup>
  );
}

/* Low-fi vs Hi-fi karşılaştırma kartları */
function LoFiVsHiFi() {
  return (
    <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="katas-card rounded-2xl p-6 flex flex-col items-center"
      >
        <span className="katas-fidelity-badge bg-pink-500/15 text-pink-300 mb-4">
          Düşük çözünürlük
        </span>
        <LowFiWirePhone />
        <ul className="mt-5 space-y-1.5 text-xs text-gray-400 self-stretch">
          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Dakikalar içinde çizilir</li>
          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Düzen ve hiyerarşiye odak</li>
          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Eleştirilmesi kolay, değiştirmesi ucuz</li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="katas-card-rose rounded-2xl p-6 flex flex-col items-center"
      >
        <span className="katas-fidelity-badge bg-purple-500/15 text-purple-300 mb-4">
          Yüksek çözünürlük
        </span>
        <HiFiPhone />
        <ul className="mt-5 space-y-1.5 text-xs text-gray-400 self-stretch">
          <li className="flex items-center gap-2"><X className="w-3.5 h-3.5 text-red-400" /> Hazırlaması uzun sürer</li>
          <li className="flex items-center gap-2"><X className="w-3.5 h-3.5 text-red-400" /> Renk/yazı tartışması düzeni gölgeler</li>
          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Son aşamada, sunum ve geliştirme için ideal</li>
        </ul>
      </motion.div>
    </div>
  );
}

/* Annotated wireframe — bir wireframe + ok ile işaretli açıklamalar */
function AnnotatedWireframe() {
  const notes = [
    { n: "1", t: "Görsel placeholder", d: "Çapraz tarama = &quot;buraya görsel gelecek&quot;." },
    { n: "2", t: "Metin çizgisi", d: "Gerçek metin yerine gri çubuk; göz içeriğe değil düzene baksın." },
    { n: "3", t: "Birincil eylem", d: "Ekrandaki tek vurgulu blok; kullanıcının asıl yapması gereken." },
  ];
  return (
    <div className="grid grid-cols-2 gap-10 max-w-4xl mx-auto items-center">
      <div className="relative">
        <LowFiWirePhone />
        <span className="absolute top-[78px] -left-3 w-6 h-6 rounded-full bg-pink-500 text-white text-[11px] font-bold flex items-center justify-center shadow-lg">1</span>
        <span className="absolute top-[170px] -left-3 w-6 h-6 rounded-full bg-pink-500 text-white text-[11px] font-bold flex items-center justify-center shadow-lg">2</span>
        <span className="absolute bottom-[18px] -right-3 w-6 h-6 rounded-full bg-pink-500 text-white text-[11px] font-bold flex items-center justify-center shadow-lg">3</span>
      </div>
      <div className="space-y-3">
        {notes.map((nt, i) => (
          <motion.div
            key={nt.n}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.12 }}
            className="katas-card rounded-lg p-4 flex items-start gap-3"
          >
            <span className="w-6 h-6 rounded-full bg-pink-500/20 border border-pink-500/50 text-pink-300 text-[11px] font-bold flex items-center justify-center flex-shrink-0">
              {nt.n}
            </span>
            <div>
              <div className="text-sm font-semibold text-white">{nt.t}</div>
              <div
                className="text-xs text-gray-400 mt-0.5 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: nt.d }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ───── 01 · KAPAK ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2245 · 9. Hafta · Bahar Dönemi</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          <span className="katas-shimmer">Wireframe &amp; Mockup</span>
          <br />
          <span className="text-white">ile Prototipleme</span>
        </motion.h1>
        <Sub className="mt-6 max-w-3xl mx-auto">
          Düşük çözünürlükle başla. Gri kutular ve eskizlerle fikri ucuza dene;
          renge ve piksele en sonda geç.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Pencil}
            title="Düşük çözünürlük"
            desc="Eskiz ve wireframe ile düzeni hızlı keşfet; detaya henüz girme."
            delay={0.3}
            accent="#ec4899"
          />
          <FeatureCard
            icon={LayoutIcon}
            title="Wireframe"
            desc="Gri bloklarla yapı ve hiyerarşi; içerik değil iskelet."
            delay={0.45}
            accent="#a855f7"
          />
          <FeatureCard
            icon={Workflow}
            title="Prototip"
            desc="Ekranları bağla, akışı tıklayarak test et."
            delay={0.6}
            accent="#3b82f6"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Cuma · 15:20 — 17:00 · Uygulamalı (Figma)
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 02 · GEÇEN HAFTADAN KÖPRÜ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · bu haftanın hedefi</Eyebrow>
      <H2>Bilgi mimarisini ekrana indiriyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Önceki haftalarda kullanıcıyı tanıdık, akışları ve bilgi mimarisini kurduk.
        Şimdi o yapıyı ilk kez somut ekranlara döküyoruz — ama özellikle
        düşük çözünürlükle, ucuz ve hızlı olacak şekilde.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="katas-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-pink-300">
            <GitBranch className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Elimizde olan</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-pink-400 flex-shrink-0" />Persona ve kullanıcı senaryoları</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-pink-400 flex-shrink-0" />Bilgi mimarisi (site/uygulama haritası)</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-pink-400 flex-shrink-0" />Kullanıcı akışları (user flow)</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="katas-card-rose rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-purple-300">
            <Pencil className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta üreteceğimiz</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0" />Kağıt eskizler (hızlı varyasyonlar)</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0" />Düşük çözünürlüklü wireframe&apos;ler</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0" />Tıklanabilir düşük-fi prototip</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 03 · NEDEN DÜŞÜK ÇÖZÜNÜRLÜK · SAYILAR ───── */
  () => (
    <SlideShell>
      <Eyebrow>Neden düşük çözünürlük?</Eyebrow>
      <H2>Ucuz hata, erken öğrenme</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Düşük çözünürlüklü prototipin tek amacı var: fikri pahalı hale gelmeden,
        yani kod yazılmadan önce sınamak. Hata ne kadar erken bulunursa o kadar ucuza düzelir.
      </Sub>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Clock}
          value="Dakikalar"
          label="Bir ekran eskizinin tipik çizim süresi (saatler/günler değil)"
          delay={0}
          accent="#ec4899"
        />
        <StatCard
          icon={DollarSign}
          value="En düşük"
          label="Değişiklik maliyeti tasarım aşamasında en küçüktür; geliştirmede katlanır"
          source="genel mühendislik ilkesi"
          delay={0.1}
          accent="#a855f7"
        />
        <StatCard
          icon={Users}
          value="≈ 5"
          label="Çoğu kullanılabilirlik sorununu ortaya çıkarmaya yeten test kullanıcısı sayısı"
          source="Nielsen Norman Group, temkinli"
          delay={0.2}
          accent="#3b82f6"
        />
        <StatCard
          icon={Gauge}
          value="Yüksek"
          label="Renk olmadığında geri bildirim düzene ve akışa odaklanır"
          delay={0.3}
          accent="#10b981"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 katas-card-rose rounded-xl p-5 flex items-start gap-3"
      >
        <Eye className="w-5 h-5 text-pink-300 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-300 leading-relaxed">
          Cilalı bir tasarım gösterirsen kullanıcı &quot;bitmiş&quot; sanar ve nazik davranır.
          Gri bir wireframe gösterirsen &quot;taslak&quot; olduğunu anlar ve
          <strong className="text-pink-300"> düzen hakkında dürüstçe konuşur</strong>.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 04 · TERİM SÖZLÜĞÜ TABLOSU ───── */
  () => (
    <SlideShell>
      <Eyebrow>Kavramlar · terimleri karıştırmayalım</Eyebrow>
      <H2>Eskiz · Wireframe · Mockup · Prototip</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu dört kelime sık karıştırılır. İkisi <strong className="text-white">çözünürlük</strong>
        (ne kadar detaylı), ikisi <strong className="text-white">artefakt türü</strong> (ne ürettiğin) hakkındadır.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 katas-card rounded-xl overflow-hidden"
      >
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-[11px] font-mono uppercase tracking-wider text-pink-300 border-b border-pink-500/20">
              <th className="px-4 py-3" style={{ width: "18%" }}>Terim</th>
              <th className="px-4 py-3" style={{ width: "26%" }}>Nedir?</th>
              <th className="px-4 py-3" style={{ width: "20%" }}>Çözünürlük</th>
              <th className="px-4 py-3">Hangi soruyu yanıtlar?</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            <tr className="border-b border-white/5">
              <td className="px-4 py-3 font-semibold text-white">Eskiz (sketch)</td>
              <td className="px-4 py-3">Elle, kağıda hızlı çizim</td>
              <td className="px-4 py-3 text-pink-300">Çok düşük</td>
              <td className="px-4 py-3">Bu fikir genel olarak işe yarar mı?</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="px-4 py-3 font-semibold text-white">Wireframe</td>
              <td className="px-4 py-3">Gri bloklarla ekran iskeleti</td>
              <td className="px-4 py-3 text-pink-300">Düşük</td>
              <td className="px-4 py-3">İçerik nerede, hiyerarşi doğru mu?</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="px-4 py-3 font-semibold text-white">Mockup</td>
              <td className="px-4 py-3">Renk, tipografi, gerçek görselle statik ekran</td>
              <td className="px-4 py-3 text-purple-300">Yüksek</td>
              <td className="px-4 py-3">Görsel olarak nasıl görünecek?</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold text-white">Prototip</td>
              <td className="px-4 py-3">Ekranların tıklanabilir, bağlı hâli</td>
              <td className="px-4 py-3 text-blue-300">Düşük veya yüksek</td>
              <td className="px-4 py-3">Akış gerçekten çalışıyor mu?</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-[11px] text-gray-500 font-mono"
      >
        Dikkat: &quot;prototip&quot; bir çözünürlük değil; hem düşük hem yüksek çözünürlükte olabilir — onu prototip yapan
        <span className="text-pink-300"> tıklanabilir/etkileşimli</span> olmasıdır.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 05 · BÖLÜM 1 ───── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Fidelity Spektrumu"
      subtitle="Çözünürlük bir açma-kapama düğmesi değil, bir kayar ölçektir. Doğru aşamada doğru çözünürlüğü seçmek tasarımcının işidir."
      bgGradient="linear-gradient(135deg, #ec4899 0%, #be185d 100%)"
      shadow="0 0 60px rgba(236, 72, 153, 0.5)"
      icon={<Gauge className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 06 · FIDELITY SPEKTRUMU ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sadakat (fidelity) ölçeği</Eyebrow>
      <H2 className="mb-2">Eskizden tıklanabilir prototipe</H2>
      <Sub className="max-w-3xl mb-2">
        Soldan sağa detay artar, hız azalır, değiştirme maliyeti yükselir.
        Bu hafta sol uçtayız: kağıt eskiz ve wireframe.
      </Sub>
      <FidelitySpectrum />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-2 text-center text-xs text-gray-500 max-w-2xl mx-auto"
      >
        Kural: Bir fikre ne kadar emin değilsen o kadar düşük çözünürlükte kal.
        Emin oldukça çözünürlüğü artır.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 07 · LOW-FI vs HI-FI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Karşılaştırma · aynı ekran, iki çözünürlük</Eyebrow>
      <H2 className="mb-2">Düşük çözünürlük vs yüksek çözünürlük</H2>
      <Sub className="mb-6 max-w-3xl">
        Solda gri wireframe sadece düzeni anlatır; sağda renkli mockup görünümü tamamlar.
        Hangisini ne zaman kullanacağın, sorunun ne olduğuna bağlıdır.
      </Sub>
      <LoFiVsHiFi />
    </SlideShell>
  ),

  /* ───── 08 · BÖLÜM 2 ───── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Wireframe Anatomisi"
      subtitle="Düşük çözünürlüklü bir wireframe&apos;i &quot;iyi&quot; yapan birkaç basit kural var. Renk yok, gerçek metin yok — sadece düzen ve hiyerarşi."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #ec4899 100%)"
      shadow="0 0 60px rgba(168, 85, 247, 0.5)"
      icon={<LayoutIcon className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 09 · WIREFRAME KURALLARI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Düşük çözünürlük · altın kurallar</Eyebrow>
      <H2>Bir wireframe&apos;i wireframe yapan ne?</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Bu üç kısıt, ekibin dikkatini görsel detaydan yapıya çeker. Kısıt burada bir
        özelliktir, eksik değil.
      </Sub>
      <div className="grid grid-cols-3 gap-4">
        <FeatureCard
          icon={Square}
          title="Renk yok, sadece gri"
          desc="Gri tonlar dikkati renk seçimine değil yerleşime odaklar. Tek istisna: birincil eylemi belirtmek için bir vurgu tonu."
          delay={0}
          accent="#ec4899"
        />
        <FeatureCard
          icon={Type}
          title="Gerçek metin yok"
          desc="Başlık ve metinler gri çizgilerle temsil edilir. Amaç içeriği değil, içeriğin kapladığı alanı görmek."
          delay={0.1}
          accent="#a855f7"
        />
        <FeatureCard
          icon={ImageIcon}
          title="Görsel = çapraz kutu"
          desc="Fotoğraflar çapraz taralı bir kutuyla işaretlenir. &quot;Buraya görsel gelecek&quot; demek yeterli."
          delay={0.2}
          accent="#3b82f6"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 katas-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <AlertTriangle className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
        <span>
          Sık hata: Wireframe&apos;e erkenden renk ve gerçek metin eklemek. O an artık wireframe değil yarım kalmış bir mockup&apos;tır;
          geri bildirim de düzenden uzaklaşıp renge kayar.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 10 · İŞARETLİ WIREFRAME ───── */
  () => (
    <SlideShell>
      <Eyebrow>Anatomide gezinti · annotated wireframe</Eyebrow>
      <H2 className="mb-2">Aynı ekran, üç işaretli bölge</H2>
      <Sub className="mb-8 max-w-3xl">
        Wireframe&apos;ler çoğu zaman küçük notlarla (annotation) birlikte sunulur.
        Bu notlar her bloğun ne olduğunu ve neden orada durduğunu açıklar.
      </Sub>
      <AnnotatedWireframe />
    </SlideShell>
  ),

  /* ───── 11 · FIGMA WIREFRAME WORKSPACE ───── */
  () => (
    <SlideShell>
      <Eyebrow>Araçta · Figma ile wireframe</Eyebrow>
      <H2 className="mb-2">Dijital wireframe: gri kutu kütüphanesi</H2>
      <Sub className="mb-6 max-w-3xl">
        Kağıt eskizden sonra düzeni Figma&apos;ya taşırız. Hazır gri bileşenler (wireframe kit)
        ve Auto Layout, ekranı hızlıca kurmayı sağlar — yine de sadece gri kalır.
      </Sub>
      <WireframeWorkspace />
    </SlideShell>
  ),

  /* ───── 12 · BÖLÜM 3 ───── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Wireframe&apos;den Akışa"
      subtitle="Tek ekran bir hikâye anlatmaz. Ekranları birbirine bağlayıp düşük çözünürlüklü bir prototip kurarak akışı test edebiliriz."
      bgGradient="linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)"
      shadow="0 0 60px rgba(59, 130, 246, 0.5)"
      icon={<Workflow className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 13 · WIREFRAME → PROTOTİP AKIŞI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Ekranları bağlamak · low-fi prototip</Eyebrow>
      <H2 className="mb-2">Üç wireframe, bir akış</H2>
      <Sub className="mb-8 max-w-3xl">
        Tek tek ekranlar yerine bağlantılarıyla düşünürüz. Her gri ekran bir adımdır;
        oklar tıklamayla geçişi temsil eder. Bu, hâlâ düşük çözünürlüklü bir prototiptir.
      </Sub>
      <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap max-w-5xl mx-auto">
        {[
          { label: "Liste" },
          { label: "Detay" },
          { label: "Onay" },
        ].map((s, i, arr) => (
          <div key={s.label} className="flex items-center gap-3 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.18 }}
              className="text-center"
            >
              <div className="origin-top scale-75">
                <LowFiWirePhone />
              </div>
              <div className="text-xs font-mono text-pink-300 mt-1">
                {String(i + 1).padStart(2, "0")} · {s.label}
              </div>
            </motion.div>
            {i < arr.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.18 }}
                className="flex flex-col items-center text-pink-400"
              >
                <ArrowRight className="w-7 h-7" />
                <span className="text-[9px] font-mono text-gray-500 mt-1">tıkla</span>
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-center text-xs text-gray-500 max-w-2xl mx-auto"
      >
        Figma&apos;da: her butona <span className="font-mono text-pink-300">Prototype → On click → Navigate to</span> bağlantısı kurulur.
        Akış kullanıcının önünde, gerçek bir kullanım gibi tıklanabilir hale gelir.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 14 · UYGULAMALI / ALIŞTIRMA ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı alıştırma</Eyebrow>
      <H2>Kendi düşük-fi prototipini kur</H2>
      <Sub className="mt-3 max-w-3xl">
        Seçtiğin uygulama için bir görevin (örn. &quot;ürün ekleme&quot;) üç ekranını
        düşük çözünürlükte tasarla ve bağla. Sonraki derse getir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Pencil, title: "Önce kağıtta eskizle", desc: "Üç ekranı 5 dakikada elle çiz. Birden fazla varyasyon dene, en iyisini seç.", accent: "#ec4899" },
          { icon: LayoutIcon, title: "Figma&apos;da gri wireframe", desc: "Eskizi gri bloklarla dijitalleştir. Renk ve gerçek metin YOK; sadece düzen.", accent: "#a855f7" },
          { icon: Workflow, title: "Ekranları bağla", desc: "Prototype sekmesinde butonlara &quot;Navigate to&quot; ekleyip akışı tıklanabilir yap.", accent: "#3b82f6" },
          { icon: ClipboardCheck, title: "Bir kişiye test ettir", desc: "Bir arkadaşına görevi yaptır, sus ve izle. Takıldığı yeri tek cümleyle not al.", accent: "#10b981" },
        ].map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="katas-card katas-card-hover rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${t.accent}18`, border: `1px solid ${t.accent}55` }}
            >
              <t.icon className="w-5 h-5" style={{ color: t.accent }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono">{i + 1}</span>
                <h3 className="text-base font-semibold text-white" dangerouslySetInnerHTML={{ __html: t.title }} />
              </div>
              <p className="text-sm text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.desc }} />
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 katas-card-rose rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <ListChecks className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Teslim:</span> Figma dosyasının paylaşım bağlantısı + testte gözlemlediğin
          en az iki sorun. Henüz renk veya gerçek tipografi beklenmiyor; bu, gelecek haftaların işi.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 15 · SIRADAKİ HAFTA + KAPANIŞ ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", boxShadow: "0 0 60px rgba(168,85,247,0.5)" }}
        >
          <PenTool className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>9. hafta tamamlandı · sıradaki: yüksek çözünürlük</Eyebrow>
        <H1>
          <span className="katas-shimmer">Mockup &amp; Yüksek-fi Prototip</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta gri iskeleti kurduk. Gelecek hafta o wireframe&apos;lere renk, tipografi
          ve gerçek içerik giydirip yüksek çözünürlüklü, sunuma hazır prototip yapacağız.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <FeatureCard
            icon={Type}
            title="Tipografi & renk"
            desc="Wireframe&apos;deki gri çizgiler gerçek başlık ve metne dönüşür."
            accent="#ec4899"
            delay={0.1}
          />
          <FeatureCard
            icon={Smartphone}
            title="Gerçek içerik"
            desc="Çapraz kutular yerine gerçek görseller ve veriler gelir."
            accent="#a855f7"
            delay={0.2}
          />
          <FeatureCard
            icon={Search}
            title="Kullanıcı testi"
            desc="Yüksek-fi prototiple daha gerçekçi kullanılabilirlik testi."
            accent="#3b82f6"
            delay={0.3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="katas-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-pink-400 mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Cuma</div>
            <div className="text-sm text-gray-400">15:20 — 17:00</div>
          </div>
          <div className="katas-card rounded-xl p-5">
            <CheckCircle2 className="w-5 h-5 text-purple-400 mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">3 ekran wireframe</div>
            <div className="text-sm text-gray-400">bağlı ve test edilmiş</div>
          </div>
          <div className="katas-card rounded-xl p-5">
            <XCircle className="w-5 h-5 text-blue-400 mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Henüz değil</div>
            <div className="text-white font-semibold">Renk / gerçek metin</div>
            <div className="text-sm text-gray-400">gelecek hafta eklenecek</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Önce düzen, sonra cila · düşük çözünürlükte cesur ol</span>
        </motion.div>
      </div>
    </SlideShell>
  ),
];

const TOTAL = slides.length;

/* ============================================================
   PRESENTATION ROOT  (h01 ile birebir aynı)
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
            background: "linear-gradient(90deg, #ec4899, #f472b6, #ec4899)",
            boxShadow: "0 0 16px rgba(236,72,153,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#ec4899]/70">
          BVA 2245 · 9. Hafta · Wireframe &amp; Düşük Çözünürlük
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#ec4899]/50">
            <span className="text-[#ec4899]">
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
            className="p-1.5 text-gray-500 hover:text-[#ec4899] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#ec4899] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#ec4899]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(236,72,153,0.6)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#ec4899] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
