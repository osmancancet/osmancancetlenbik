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
  BarChart3,
  Activity,
  Code2,
  Database,
  Globe,
  Layers,
  Grid3x3,
  Table2,
  MousePointerClick,
  Terminal,
  Cloud,
  DollarSign,
  Lock,
  Unlock,
  GitBranch,
  Check,
  Download,
  Calendar,
  Target,
  Brain,
  Sparkles,
  GraduationCap,
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
        <div className="absolute inset-0 vg-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#ef4444]"
    >
      <span className="w-8 h-px bg-[#ef4444]" />
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
  accent = "#ef4444",
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
      className="vg-card vg-card-hover rounded-xl p-6 transition-all"
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
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 vg-pulse"
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
   TOPIC MOCKUPS
   ============================================================ */

function WindowChrome({
  title,
  children,
  badge,
}: {
  title: string;
  children: ReactNode;
  badge?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="vg-window-chrome w-full"
    >
      <div className="vg-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-semibold flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d0d0d", color: "#fca5a5" }}
        >
          <span className="w-5 h-5 rounded-sm vg-tool-tile flex items-center justify-center text-[11px]">
            {badge ?? "V"}
          </span>
          <span>{title}</span>
        </div>
      </div>
      <div className="p-4 bg-[#0a0a0a]">{children}</div>
    </motion.div>
  );
}

type ToolKind = {
  name: string;
  short: string;
  color: string;
  cat: string;
  desc: string;
  icon: LucideIcon;
};

function LogoTile({ short, color, size = 44 }: { short: string; color: string; size?: number }) {
  return (
    <span
      className="vg-logo-tile"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.32,
        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
        boxShadow: `0 8px 24px -10px ${color}aa`,
      }}
    >
      {short}
    </span>
  );
}

function ToolCard({ tool, delay = 0 }: { tool: ToolKind; delay?: number }) {
  const Icon = tool.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="vg-card vg-card-hover rounded-xl p-5 transition-all"
    >
      <div className="flex items-center gap-3 mb-3">
        <LogoTile short={tool.short} color={tool.color} />
        <div>
          <div className="text-base font-semibold text-white">{tool.name}</div>
          <div
            className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider mt-0.5"
            style={{ color: tool.color }}
          >
            <Icon className="w-3 h-3" />
            {tool.cat}
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 leading-relaxed">{tool.desc}</p>
    </motion.div>
  );
}

/* Tableau Public benzeri sürükle-bırak arayüz iskeleti */
function DragDropMock() {
  const dims = ["Bölge", "Kategori", "Ürün", "Sipariş Tarihi"];
  const measures = ["Satış", "Kâr", "Adet", "İndirim"];
  return (
    <WindowChrome title="Tableau Public · Sayfa 1" badge="T">
      <div className="grid grid-cols-12 gap-2" style={{ minHeight: 300 }}>
        {/* Sol veri paneli */}
        <div className="col-span-3 vg-dash-tile">
          <div className="text-[10px] font-semibold text-gray-300 uppercase tracking-wider mb-2">
            Veri
          </div>
          <div className="text-[9px] text-[#67e8f9] uppercase mb-1">Boyutlar</div>
          {dims.map((d) => (
            <div
              key={d}
              className="flex items-center gap-1.5 text-[11px] text-gray-300 py-1 px-1.5 rounded hover:bg-white/5"
            >
              <span className="w-2 h-2 rounded-sm" style={{ background: "#3b82f6" }} />
              {d}
            </div>
          ))}
          <div className="text-[9px] text-[#86efac] uppercase mt-3 mb-1">Ölçüler</div>
          {measures.map((m) => (
            <div
              key={m}
              className="flex items-center gap-1.5 text-[11px] text-gray-300 py-1 px-1.5 rounded hover:bg-white/5"
            >
              <span className="w-2 h-2 rounded-full" style={{ background: "#22c55e" }} />
              {m}
            </div>
          ))}
        </div>

        {/* Sağ kanvas */}
        <div className="col-span-9 flex flex-col gap-2">
          {/* Raf satırları (shelves) */}
          <div className="flex gap-2">
            <div className="flex-1 vg-dash-tile flex items-center gap-2">
              <span className="text-[9px] text-gray-500 uppercase">Sütunlar</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#3b82f6]/20 text-[#93c5fd] font-mono">
                Bölge
              </span>
            </div>
            <div className="flex-1 vg-dash-tile flex items-center gap-2">
              <span className="text-[9px] text-gray-500 uppercase">Satırlar</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#22c55e]/20 text-[#86efac] font-mono">
                SUM(Satış)
              </span>
            </div>
          </div>
          {/* Grafik alanı */}
          <div className="flex-1 vg-dash-tile flex items-end justify-around gap-2 pt-4">
            {[
              { l: "Marmara", v: 0.95 },
              { l: "Ege", v: 0.72 },
              { l: "İç An.", v: 0.5 },
              { l: "Akdeniz", v: 0.61 },
              { l: "Karadeniz", v: 0.34 },
              { l: "D. An.", v: 0.22 },
            ].map((b) => (
              <div key={b.l} className="flex flex-col items-center gap-1 flex-1">
                <div
                  className="w-full rounded-t"
                  style={{ height: `${b.v * 180}px`, background: "#ef4444" }}
                />
                <span className="text-[8px] text-gray-500">{b.l}</span>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-gray-500 font-mono flex items-center gap-2">
            <MousePointerClick className="w-3 h-3 text-[#fca5a5]" />
            Alan sürükle, rafa bırak — kod yazmadan grafik. Hesaplama: çift tıkla.
          </div>
        </div>
      </div>
    </WindowChrome>
  );
}

/* Python ekosistemi kod örneği — pandas + seaborn */
function PythonEcosystemCode() {
  return (
    <div className="vg-code">
      <div>
        <span className="cm"># Aynı grafik — pandas + seaborn (kod tabanlı)</span>
      </div>
      <div>
        <span className="kw">import</span> pandas <span className="kw">as</span> pd
      </div>
      <div>
        <span className="kw">import</span> seaborn <span className="kw">as</span> sns
      </div>
      <div className="mt-2">
        df <span className="op">=</span> pd.<span className="fn">read_csv</span>(
        <span className="str">&quot;satis.csv&quot;</span>)
      </div>
      <div className="mt-2">
        sns.<span className="fn">barplot</span>(
      </div>
      <div>
        {"  "}data<span className="op">=</span>df, x<span className="op">=</span>
        <span className="str">&quot;bolge&quot;</span>, y<span className="op">=</span>
        <span className="str">&quot;satis&quot;</span>,
      </div>
      <div>
        {"  "}estimator<span className="op">=</span><span className="str">&quot;sum&quot;</span>,
        color<span className="op">=</span><span className="str">&quot;#ef4444&quot;</span>,
      </div>
      <div>)</div>
    </div>
  );
}

/* Kurulum / lisans karşılaştırma terminali */
function InstallMock() {
  return (
    <WindowChrome title="kurulum & lisans — özet" badge="$">
      <div className="font-mono text-[12px] leading-relaxed">
        <div className="text-gray-500"># Masaüstü — indir, kur, hesap aç</div>
        <div className="text-gray-300">
          <span className="text-[#86efac]">Tableau Public</span> · ücretsiz · public.tableau.com
        </div>
        <div className="text-gray-300">
          <span className="text-[#86efac]">Power BI Desktop</span> · ücretsiz (Windows) · Microsoft Store
        </div>
        <div className="text-gray-300">
          <span className="text-[#86efac]">Looker Studio</span> · ücretsiz · tarayıcıda (Google hesabı)
        </div>
        <div className="mt-3 text-gray-500"># Açık kaynak — paket yöneticisiyle</div>
        <div className="text-gray-300">
          <span className="text-[#67e8f9]">$</span> pip install pandas matplotlib seaborn plotly
        </div>
        <div className="text-gray-300">
          <span className="text-[#67e8f9]">$</span> docker run -p 3000:3000 metabase/metabase
        </div>
        <div className="mt-3 text-gray-500"># Web / kod</div>
        <div className="text-gray-300">
          <span className="text-[#67e8f9]">$</span> npm install d3 plotly.js
        </div>
      </div>
    </WindowChrome>
  );
}

/* Basit karar ağacı düğümü */
function DecisionNode({
  q,
  yes,
  no,
  accent = "#ef4444",
}: {
  q: string;
  yes: string;
  no: string;
  accent?: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="vg-node text-center max-w-xs">
        <div className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: accent }}>
          Soru
        </div>
        <div className="text-sm text-white font-semibold leading-snug">{q}</div>
      </div>
      <div className="flex gap-8 mt-3">
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-mono text-[#86efac] mb-1">EVET →</span>
          <div className="vg-node text-center text-xs text-gray-200">{yes}</div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-mono text-[#fca5a5] mb-1">HAYIR →</span>
          <div className="vg-node text-center text-xs text-gray-200">{no}</div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ───── 1. KAPAK ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2107 · 2. Hafta</Eyebrow>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.04]">
          <span className="vg-shimmer">Popüler Görselleştirme Araçları</span>
        </h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          İlkeleri 1. haftada konuştuk; şimdi onları hayata geçiren araç dünyasına bakıyoruz.
          BI panoları, kod tabanlı kütüphaneler ve web grafikleri.
        </Sub>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { name: "Tableau", desc: "Sürükle-bırak BI", short: "T", color: "#1f6fb2" },
            { name: "Power BI", desc: "Microsoft ekosistemi", short: "P", color: "#f2c811" },
            { name: "Python", desc: "matplotlib · seaborn", short: "Py", color: "#3776ab" },
            { name: "D3.js", desc: "Web · tam kontrol", short: "D3", color: "#f9a03c" },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="vg-card rounded-xl p-4"
            >
              <div className="mx-auto mb-2 flex justify-center">
                <LogoTile short={t.short} color={t.color} size={40} />
              </div>
              <div className="text-white font-semibold text-sm">{t.name}</div>
              <div className="text-[11px] text-gray-400 mt-1">{t.desc}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-xs font-mono text-gray-500">
          Manisa CBÜ MYO · Bilgisayar Programcılığı · 2025-2026 Bahar
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. KÖPRÜ · GEÇEN HAFTADAN ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 1. haftadan 2. haftaya</Eyebrow>
      <H2>İlkeleri biliyoruz; şimdi onları çizecek araç lazım</H2>
      <Sub className="mt-3 max-w-3xl">
        1. hafta &quot;neden ve nasıl&quot; sorusuna baktık: Anscombe, Tufte&apos;nin data-ink
        oranı, Gestalt, renk ve erişilebilirlik. Bu hafta &quot;neyle&quot; sorusu: aynı ilkeleri
        farklı araçlar farklı yollarla uygular. Önce manzaranın tamamını görelim.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fca5a5]">
            <Check className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">1. hafta · sahip olduğumuz</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />Grafik türü seçimi: bar, line, scatter, pie.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />Tasarım ilkeleri: data-ink, chartjunk, Gestalt.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />Renk paletleri ve renk körlüğü farkındalığı.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fcd34d]">
            <Target className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">2. hafta · hedef</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />Araç ailelerini tanımak: BI, kod tabanlı, web.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />Her aracın güçlü/zayıf yanını ve fiyatını görmek.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />Karar ağacıyla &quot;hangi iş → hangi araç&quot;.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. DERSİN AKIŞI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: aile · derinlik · seçim</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce araçları üç büyük aileye ayırıyoruz; sonra her aileden temsilci araçlara yakından
        bakıyoruz; en son hangi işte hangisini seçeceğimizi bir karar ağacıyla netleştiriyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "BI Araçları",
            items: ["Tableau · Power BI", "Looker Studio · Metabase", "Sürükle-bırak panolar"],
            icon: BarChart3,
            accent: "#ef4444",
          },
          {
            range: "02",
            title: "Kod Tabanlı",
            items: ["Python: matplotlib/seaborn", "plotly · interaktif", "R: ggplot2"],
            icon: Code2,
            accent: "#f59e0b",
          },
          {
            range: "03",
            title: "Web & Seçim",
            items: ["D3.js · tam kontrol", "Excel · hızlı bakış", "Karar ağacı"],
            icon: Globe,
            accent: "#fbbf24",
          },
        ].map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="vg-card rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${g.accent}18`, border: `1px solid ${g.accent}55` }}
              >
                <g.icon className="w-5 h-5" style={{ color: g.accent }} />
              </div>
              <div>
                <div
                  className="text-[10px] font-mono uppercase tracking-widest"
                  style={{ color: g.accent }}
                >
                  Durak {g.range}
                </div>
                <div className="text-lg font-semibold text-white">{g.title}</div>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-400">
              {g.items.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <ChevronRight
                    className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                    style={{ color: g.accent }}
                  />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 4. ARAÇ MANZARASI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Manzara</Eyebrow>
      <H2>Üç eksen: kolaylık · esneklik · kanal</H2>
      <Sub className="mt-3 max-w-3xl">
        Araçları konumlandırmanın pratik bir yolu: ne kadar kolay başlanır, ne kadar
        özelleştirilebilir ve çıktı nereye gider (pano, rapor, web sayfası).
      </Sub>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="vg-card rounded-xl p-5"
        >
          <MousePointerClick className="w-6 h-6 text-[#ef4444] mb-3" />
          <div className="text-white font-semibold mb-1">Sürükle-bırak (BI)</div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Hızlı başlangıç, kod yok. Esneklik aracın sunduğu kadar. Tableau, Power BI,
            Looker Studio, Metabase.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="vg-card rounded-xl p-5"
        >
          <Terminal className="w-6 h-6 text-[#f59e0b] mb-3" />
          <div className="text-white font-semibold mb-1">Kod tabanlı</div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Öğrenme eğrisi var ama sınır yok; tekrarlanabilir ve sürüm kontrolüne girer.
            Python (matplotlib, seaborn, plotly), R (ggplot2).
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="vg-card rounded-xl p-5"
        >
          <Globe className="w-6 h-6 text-[#fbbf24] mb-3" />
          <div className="text-white font-semibold mb-1">Web kütüphaneleri</div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Tarayıcıda tam kontrollü, etkileşimli görseller. Daha çok kod ister.
            D3.js, Chart.js, ECharts, plotly.js.
          </p>
        </motion.div>
      </div>
      <p className="mt-6 text-xs text-gray-500 text-center font-mono">
        Genel kural: kolaylık arttıkça esneklik azalır · esneklik arttıkça emek artar.
      </p>
    </SlideShell>
  ),

  /* ───── 5. BÖLÜM 1 — BI ───── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="BI Araçları"
      subtitle="Sürükle-bırak ile kod yazmadan pano kuran ticari ekosistem. En yaygın kurumsal seçenek."
      bgGradient="linear-gradient(135deg, #ef4444, #b91c1c)"
      shadow="0 25px 60px -15px rgba(239, 68, 68, 0.6)"
      icon={<BarChart3 className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 6. BI ARAÇLARI KARTLARI ───── */
  () => (
    <SlideShell>
      <Eyebrow>BI · sürükle-bırak ailesi</Eyebrow>
      <H2>Dört yaygın BI aracı</H2>
      <Sub className="mt-3 max-w-3xl">
        Hepsi veri kaynağına bağlanır, alanları rafa sürükler ve etkileşimli pano üretir.
        Fark; ekosistem, fiyat ve hedef kullanıcıdadır.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-4">
        {(
          [
            {
              name: "Tableau",
              short: "T",
              color: "#1f6fb2",
              cat: "Lider BI",
              desc: "Güçlü görsel motor, geniş topluluk. Tableau Public ücretsiz (çalışman herkese açık olur).",
              icon: BarChart3,
            },
            {
              name: "Power BI",
              short: "P",
              color: "#f2c811",
              cat: "Microsoft",
              desc: "Excel/Office 365 ile sıkı entegre, uygun fiyatlı. Desktop sürümü Windows'ta ücretsiz.",
              icon: Activity,
            },
            {
              name: "Looker Studio",
              short: "L",
              color: "#4285f4",
              cat: "Google · web",
              desc: "Tamamen tarayıcıda, ücretsiz. Google Sheets/Analytics/BigQuery ile doğal bağlantı.",
              icon: Globe,
            },
            {
              name: "Metabase",
              short: "M",
              color: "#509ee3",
              cat: "Açık kaynak",
              desc: "Self-hosted (Docker) BI; SQL bilmeden soru sorma. Topluluk sürümü ücretsiz.",
              icon: Database,
            },
          ] as ToolKind[]
        ).map((t, i) => (
          <ToolCard key={t.name} tool={t} delay={0.08 * i} />
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 7. TABLEAU SÜRÜKLE-BIRAK MOCKUP ───── */
  () => (
    <SlideShell>
      <Eyebrow>Tableau Public · arayüz</Eyebrow>
      <H2 className="mb-2">Kod yok: alanı sürükle, rafa bırak</H2>
      <Sub className="max-w-3xl mb-6">
        BI araçlarının ortak mantığı: solda veri alanları (boyutlar/ölçüler), üstte raflar
        (Sütunlar/Satırlar), ortada otomatik çizilen grafik. &quot;Bölge&quot;yi sütuna,
        &quot;Satış&quot;ı satıra atınca grafik kendiliğinden oluşur.
      </Sub>
      <DragDropMock />
    </SlideShell>
  ),

  /* ───── 8. BÖLÜM 2 — KOD TABANLI ───── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Kod Tabanlı Araçlar"
      subtitle="Python ve R: öğrenme eğrisi karşılığında tam kontrol, tekrarlanabilirlik ve sınırsız özelleştirme."
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 25px 60px -15px rgba(245, 158, 11, 0.6)"
      icon={<Code2 className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 9. PYTHON EKOSİSTEMİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Python · görselleştirme yığını</Eyebrow>
      <H2>Bir dil, katman katman kütüphane</H2>
      <Sub className="mt-3 max-w-3xl">
        Python tek bir grafik aracı değil; her biri farklı seviyede çalışan bir kütüphane
        ailesi. Çoğu açık kaynak ve ücretsiz.
      </Sub>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <FeatureCard
          icon={BarChart3}
          title="matplotlib"
          desc="Temel ve en esnek katman. Her şeyi tek tek kontrol edersin; biraz uzun kod."
          delay={0.05}
        />
        <FeatureCard
          icon={Sparkles}
          title="seaborn"
          desc="matplotlib üzerine kurulu; istatistiksel grafikleri kısa kodla, güzel varsayılanlarla."
          delay={0.12}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Activity}
          title="plotly"
          desc="Etkileşimli (zoom, hover, filtre) grafikler; web'e gömülebilir, dashboard'a (Dash) uzanır."
          delay={0.19}
        />
        <FeatureCard
          icon={Grid3x3}
          title="pandas .plot()"
          desc="DataFrame üzerinden hızlı keşif grafiği; arka planda matplotlib'i çağırır."
          delay={0.26}
          accent="#f59e0b"
        />
      </div>
      <p className="mt-6 text-xs text-gray-500 text-center font-mono">
        R tarafında karşılığı: ggplot2 (Grammar of Graphics) · shiny (etkileşimli uygulama).
      </p>
    </SlideShell>
  ),

  /* ───── 10. KOD ÖRNEĞİ + ÇIKTI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Aynı grafik · iki yol</Eyebrow>
      <H2 className="mb-2">Sürükle-bırak vs birkaç satır kod</H2>
      <Sub className="max-w-3xl mb-6">
        7. slayttaki Tableau panosuyla aynı bar grafiğini Python ile dört-beş satırda üretiriz.
        BI&apos;da fareyle, kodda metinle aynı sonuca varırız; fark tekrarlanabilirlik ve kontrolde.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <PythonEcosystemCode />
        <div className="vg-card rounded-xl p-5">
          <div className="text-[10px] text-gray-500 font-mono uppercase mb-3 text-center">
            → çalıştırınca üretilen grafik
          </div>
          <div className="flex items-end justify-around gap-2 h-44">
            {[
              { l: "Marmara", v: 0.95 },
              { l: "Ege", v: 0.7 },
              { l: "İç An.", v: 0.5 },
              { l: "Akdeniz", v: 0.6 },
              { l: "Kara.", v: 0.34 },
              { l: "D. An.", v: 0.22 },
            ].map((b) => (
              <div key={b.l} className="flex flex-col items-center gap-1 flex-1">
                <div
                  className="w-full rounded-t"
                  style={{ height: `${b.v * 150}px`, background: "#ef4444" }}
                />
                <span className="text-[8px] text-gray-500">{b.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-5 text-xs text-gray-500 text-center">
        Kod bir dosyada durur: aynı script&apos;i yarın yeni veriyle çalıştırınca grafik
        otomatik güncellenir. 13. haftada Python&apos;ı derinlemesine işleyeceğiz.
      </p>
    </SlideShell>
  ),

  /* ───── 11. BÖLÜM 3 — WEB & SEÇİM ───── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Web Araçları & Seçim"
      subtitle="Tarayıcıda tam kontrollü grafikler ve hepsini bağlayan asıl soru: hangi iş için hangi araç?"
      bgGradient="linear-gradient(135deg, #ef4444, #f59e0b)"
      shadow="0 25px 60px -15px rgba(239, 68, 68, 0.55)"
      icon={<Globe className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 12. WEB KÜTÜPHANELERİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Web · tarayıcıda görsel</Eyebrow>
      <H2>Sayfaya gömülen etkileşimli grafikler</H2>
      <Sub className="mt-3 max-w-3xl">
        Web kütüphaneleri JavaScript ile çalışır; çıktı doğrudan bir web sayfasına girer.
        Spektrumun bir ucu hazır grafikler, diğer ucu her pikseli sen çizersin.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-4">
        {(
          [
            {
              name: "D3.js",
              short: "D3",
              color: "#f9a03c",
              cat: "Tam kontrol",
              desc: "Veriyi DOM'a bağlar; en esnek ama en zor. Özgün, sıra dışı görseller için.",
              icon: GitBranch,
            },
            {
              name: "Chart.js",
              short: "Cj",
              color: "#ff6384",
              cat: "Hazır grafik",
              desc: "Bar, line, pie gibi standart grafikleri az kodla, canvas üzerinde hızlıca üretir.",
              icon: BarChart3,
            },
            {
              name: "ECharts",
              short: "E",
              color: "#aa314d",
              cat: "Zengin · açık kaynak",
              desc: "Apache projesi; büyük veri ve çok çeşitli grafik tipiyle güçlü, hazır temalı.",
              icon: Activity,
            },
            {
              name: "plotly.js",
              short: "Pl",
              color: "#3f4f75",
              cat: "Etkileşimli",
              desc: "Python plotly'nin JS tarafı; zoom/hover hazır gelir, bilim ve panoda yaygın.",
              icon: Layers,
            },
          ] as ToolKind[]
        ).map((t, i) => (
          <ToolCard key={t.name} tool={t} delay={0.08 * i} />
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 13. KARŞILAŞTIRMA TABLOSU ───── */
  () => (
    <SlideShell>
      <Eyebrow>Karşılaştırma</Eyebrow>
      <H2>Hangi araç · ne zaman?</H2>
      <Sub className="mt-3 max-w-3xl">
        Tek doğru cevap yok. Ekip becerisi, bütçe ve çıktının nereye gideceği seçimi belirler.
      </Sub>
      <div className="mt-8 vg-card rounded-xl p-4">
        <table className="vg-table">
          <thead>
            <tr>
              <th>Araç</th>
              <th>Tip</th>
              <th>Kolaylık</th>
              <th>Esneklik</th>
              <th>Fiyat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-white">Tableau</td>
              <td>BI · masaüstü/web</td>
              <td><span className="vg-pill vg-pill-good">Yüksek</span></td>
              <td><span className="vg-pill vg-pill-mid">Orta</span></td>
              <td><span className="vg-pill vg-pill-bad">Ücretli</span> · Public ücretsiz</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Power BI</td>
              <td>BI · Microsoft</td>
              <td><span className="vg-pill vg-pill-good">Yüksek</span></td>
              <td><span className="vg-pill vg-pill-mid">Orta</span></td>
              <td><span className="vg-pill vg-pill-mid">Desktop ücretsiz</span></td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Looker Studio</td>
              <td>BI · web</td>
              <td><span className="vg-pill vg-pill-good">Yüksek</span></td>
              <td><span className="vg-pill vg-pill-bad">Sınırlı</span></td>
              <td><span className="vg-pill vg-pill-good">Ücretsiz</span></td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Python (matplotlib/seaborn/plotly)</td>
              <td>Kod · kütüphane</td>
              <td><span className="vg-pill vg-pill-bad">Düşük</span> · kod gerekir</td>
              <td><span className="vg-pill vg-pill-good">Çok yüksek</span></td>
              <td><span className="vg-pill vg-pill-good">Ücretsiz</span></td>
            </tr>
            <tr>
              <td className="font-semibold text-white">D3.js</td>
              <td>Web · JS</td>
              <td><span className="vg-pill vg-pill-bad">Düşük</span></td>
              <td><span className="vg-pill vg-pill-good">En yüksek</span></td>
              <td><span className="vg-pill vg-pill-good">Ücretsiz</span></td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Excel / Sheets</td>
              <td>Tablo · hızlı bakış</td>
              <td><span className="vg-pill vg-pill-good">Çok yüksek</span></td>
              <td><span className="vg-pill vg-pill-bad">Sınırlı</span></td>
              <td><span className="vg-pill vg-pill-mid">Lisansla / Sheets ücretsiz</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-xs text-gray-500 text-center font-mono">
        Fiyat planları sık değişir; satın almadan önce resmi sayfadan güncel ücreti doğrulayın.
      </div>
    </SlideShell>
  ),

  /* ───── 14. KURULUM & LİSANS ───── */
  () => (
    <SlideShell>
      <Eyebrow>Kurulum · lisans · barınma</Eyebrow>
      <H2 className="mb-2">Başlamak için ne gerekiyor?</H2>
      <Sub className="max-w-3xl mb-6">
        Çoğu araca para harcamadan başlanır. Üçü tek tıkla masaüstüne kurulur, ücretsiz
        kütüphaneler paket yöneticisiyle gelir, BI&apos;ın açık kaynak temsilcisi Docker ile çalışır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <InstallMock />
        <div className="space-y-3">
          <div className="vg-card rounded-lg p-4 flex items-start gap-3">
            <Download className="w-5 h-5 text-[#86efac] mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-300">
              <span className="text-white font-semibold">Ücretsiz başlangıç:</span> Tableau Public,
              Power BI Desktop (Windows), Looker Studio (tarayıcı).
            </div>
          </div>
          <div className="vg-card rounded-lg p-4 flex items-start gap-3">
            <Unlock className="w-5 h-5 text-[#67e8f9] mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-300">
              <span className="text-white font-semibold">Açık kaynak:</span> Python kütüphaneleri,
              R/ggplot2, Metabase, D3.js — kaynak kod ve kullanım ücretsiz.
            </div>
          </div>
          <div className="vg-card rounded-lg p-4 flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#fca5a5] mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-300">
              <span className="text-white font-semibold">Dikkat:</span> Tableau Public&apos;te
              çalışman herkese açık yayınlanır; gizli/kişisel veriyle kullanmayın.
            </div>
          </div>
          <div className="vg-card rounded-lg p-4 flex items-start gap-3">
            <Cloud className="w-5 h-5 text-[#fcd34d] mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-300">
              <span className="text-white font-semibold">Barınma:</span> Bazıları bulutta hazır
              (Looker Studio), bazıları kendi sunucunda (Metabase, self-hosted).
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 15. KARAR AĞACI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Seçim · karar ağacı</Eyebrow>
      <H2 className="mb-2">İş → araç: birkaç soruyla daralt</H2>
      <Sub className="max-w-3xl mb-8">
        Mükemmel araç yok; göreve uygun araç var. Bu üç soru, çoğu durumda doğru aileye yönlendirir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <DecisionNode
            q="Kod yazabiliyor musun?"
            yes="Python / R"
            no="BI aracı"
            accent="#ef4444"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <DecisionNode
            q="Çıktı bir web sayfası mı?"
            yes="D3 / plotly.js"
            no="BI panosu / PDF"
            accent="#f59e0b"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <DecisionNode
            q="Bütçe / lisans sıfır mı?"
            yes="Looker · Python · Metabase"
            no="Tableau · Power BI Pro"
            accent="#fbbf24"
          />
        </motion.div>
      </div>
      <div className="mt-8 vg-card rounded-lg p-4 flex items-center gap-3 max-w-4xl mx-auto">
        <Table2 className="w-5 h-5 text-[#ef4444] flex-shrink-0" />
        <span className="text-sm text-gray-300">
          Çoğu kurum birden çok aracı birlikte kullanır: keşif için Python, paylaşılan pano için
          BI, özel web grafiği için D3. Araçlar rakip değil, tamamlayıcıdır.
        </span>
      </div>
    </SlideShell>
  ),

  /* ───── 16. UYGULAMALI LAB ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Aynı veriyi iki araçla görselleştir</H2>
      <Sub className="mt-3 max-w-3xl">
        Amaç araçları kıyaslamak: küçük bir CSV&apos;yi hem bir BI aracında hem de bir kod/web
        aracında bar grafiğe çevir, sonra deneyimleri karşılaştır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          {
            icon: Download,
            title: "Tableau Public'i kur, veriyi yükle",
            desc: "6 satırlık bölge/satış CSV'sini içe aktar; alanları rafa sürükleyip bar grafik çiz.",
            accent: "#ef4444",
          },
          {
            icon: MousePointerClick,
            title: "Looker Studio'da aynısını yap",
            desc: "Aynı CSV'yi (veya Google Sheets) bağla; tarayıcıda kod yazmadan ikinci grafiği üret.",
            accent: "#f59e0b",
          },
          {
            icon: Terminal,
            title: "İsteğe bağlı · Python ile çiz",
            desc: "pip install ile pandas + matplotlib kur; df.plot(kind='bar') ile aynı grafiği üret.",
            accent: "#fbbf24",
          },
          {
            icon: GitBranch,
            title: "Karşılaştır ve raporla",
            desc: "Hangisi daha hızlıydı, hangisi daha esnek? 3-4 cümlede notunu ekran görüntüsüyle yaz.",
            accent: "#fb923c",
          },
        ].map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="vg-card vg-card-hover rounded-xl p-5 flex items-start gap-4"
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
        transition={{ delay: 0.7 }}
        className="mt-6 vg-card rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <DollarSign className="w-4 h-4 text-[#86efac] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Tamamı ücretsiz araçlarla yapılabilir.</span> Hiçbir lisans
          satın almanız gerekmez; Tableau Public ile Looker Studio yeterli.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 17. SIRADAKİ HAFTA + KAPANIŞ ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{
            background: "linear-gradient(135deg, #ef4444, #b91c1c)",
            boxShadow: "0 30px 80px -20px rgba(239,68,68,0.6)",
          }}
        >
          <BarChart3 className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>2. hafta tamamlandı · sıradaki: Tableau Temelleri</Eyebrow>
        <H1>
          <span className="vg-shimmer-amber">Tableau&apos;ya Derin Dalış</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta araç manzarasını gördük. 3. haftada bir BI aracını seçip içine giriyoruz:
          Tableau&apos;da veri bağlama, alanlar, raflar, ilk pano ve yayınlama adım adım.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="vg-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#ef4444] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">
              Ders saati
            </div>
            <div className="text-white font-semibold">Cuma</div>
            <div className="text-sm text-gray-400">11:45 — 15:10</div>
          </div>
          <div className="vg-card rounded-xl p-5">
            <Target className="w-5 h-5 text-[#f59e0b] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">
              Hazırlık
            </div>
            <div className="text-white font-semibold">Tableau Public</div>
            <div className="text-sm text-gray-400">kurulu getir</div>
          </div>
          <div className="vg-card rounded-xl p-5">
            <Brain className="w-5 h-5 text-[#fbbf24] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">
              Teslim
            </div>
            <div className="text-white font-semibold">Lab notu</div>
            <div className="text-sm text-gray-400">2 araç + karşılaştırma</div>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center gap-3 text-xs font-mono text-gray-500">
          <GraduationCap className="w-4 h-4" />
          <span>MCBÜ MYO · BVA 2107 · Veri Görselleştirme · 2025-2026 Bahar</span>
        </div>
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
            background: "linear-gradient(90deg, #ef4444, #f87171, #ef4444)",
            boxShadow: "0 0 16px rgba(239,68,68,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#ef4444]/70">
          BVA 2107 · 2. Hafta · Popüler Araçlar
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#ef4444]/50">
            <span className="text-[#ef4444]">
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
            className="p-1.5 text-gray-500 hover:text-[#ef4444] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#ef4444] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#ef4444]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(239,68,68,0.6)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#ef4444] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
