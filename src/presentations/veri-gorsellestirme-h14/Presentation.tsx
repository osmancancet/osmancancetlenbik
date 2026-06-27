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
  MousePointer2,
  Sparkles,
  Hand,
  Filter,
  ZoomIn,
  Layers,
  Code2,
  Boxes,
  Globe,
  Workflow,
  GitBranch,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  Calendar,
  Target,
  Brain,
  Rocket,
  Share2,
  Gauge,
  SlidersHorizontal,
  Server,
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
   TOPIC MOCKUPS — etkileşimli görselleştirme
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

/* Statik grafik — fareyle etkileşim yok */
function StaticChart({ width = 240, height = 150 }: { width?: number; height?: number }) {
  const values = [32, 48, 26, 60, 41, 53];
  const labels = ["Oca", "Şub", "Mar", "Nis", "May", "Haz"];
  const pad = 22;
  const max = Math.max(...values);
  const bw = (width - 2 * pad) / values.length - 6;
  return (
    <div className="vg-chart-frame">
      <div className="text-[10px] text-gray-400 mb-1 font-mono">PNG · statik (matplotlib.savefig)</div>
      <svg width={width} height={height} className="block">
        <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#475569" />
        {values.map((v, i) => {
          const h = ((height - 2 * pad) * v) / max;
          return (
            <g key={i}>
              <rect
                x={pad + i * (bw + 6)}
                y={height - pad - h}
                width={bw}
                height={h}
                fill="#94a3b8"
                rx={2}
              />
              <text
                x={pad + i * (bw + 6) + bw / 2}
                y={height - pad + 11}
                fill="#64748b"
                fontSize={8}
                textAnchor="middle"
              >
                {labels[i]}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="text-[10px] text-gray-600 mt-1">Fare üzerinde: hiçbir tepki yok.</div>
    </div>
  );
}

/* Etkileşimli grafik — hover tooltip + vurgu */
function InteractiveChart({ width = 240, height = 150 }: { width?: number; height?: number }) {
  const values = [32, 48, 26, 60, 41, 53];
  const labels = ["Oca", "Şub", "Mar", "Nis", "May", "Haz"];
  const pad = 22;
  const max = Math.max(...values);
  const bw = (width - 2 * pad) / values.length - 6;
  const hi = 3; // Nisan vurgulu
  return (
    <div className="vg-chart-frame relative">
      <div className="text-[10px] text-gray-400 mb-1 font-mono">HTML/SVG · etkileşimli (Plotly)</div>
      <svg width={width} height={height} className="block">
        <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#475569" />
        {values.map((v, i) => {
          const h = ((height - 2 * pad) * v) / max;
          return (
            <g key={i}>
              <rect
                x={pad + i * (bw + 6)}
                y={height - pad - h}
                width={bw}
                height={h}
                fill={i === hi ? "#ef4444" : "#7f1d1d"}
                rx={2}
              />
              <text
                x={pad + i * (bw + 6) + bw / 2}
                y={height - pad + 11}
                fill="#94a3b8"
                fontSize={8}
                textAnchor="middle"
              >
                {labels[i]}
              </text>
            </g>
          );
        })}
        <MousePointer2Glyph x={pad + hi * (bw + 6) + bw / 2 + 6} y={height - pad - ((height - 2 * pad) * values[hi]) / max + 24} />
      </svg>
      <div
        className="vg-tooltip"
        style={{ top: 18, left: pad + hi * (bw + 6) + bw + 4 }}
      >
        Nisan · 60 ▲
      </div>
    </div>
  );
}

function MousePointer2Glyph({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path d="M0 0 L0 14 L4 10 L7 16 L9 15 L6 9 L11 9 Z" fill="#ffffff" stroke="#0a0a0a" strokeWidth={0.6} />
    </g>
  );
}

/* Plotly Python kod bloğu */
function PlotlyCodeBlock() {
  return (
    <div className="vg-code">
      <div><span className="cm"># Etkileşimli scatter — Plotly Express</span></div>
      <div><span className="kw">import</span> plotly.express <span className="kw">as</span> px</div>
      <div className="mt-2">df <span className="op">=</span> px.data.<span className="fn">gapminder</span>()</div>
      <div className="mt-2">fig <span className="op">=</span> px.<span className="fn">scatter</span>(</div>
      <div>{"  "}df.<span className="fn">query</span>(<span className="str">&quot;year == 2007&quot;</span>),</div>
      <div>{"  "}x<span className="op">=</span><span className="str">&quot;gdpPercap&quot;</span>, y<span className="op">=</span><span className="str">&quot;lifeExp&quot;</span>,</div>
      <div>{"  "}size<span className="op">=</span><span className="str">&quot;pop&quot;</span>, color<span className="op">=</span><span className="str">&quot;continent&quot;</span>,</div>
      <div>{"  "}hover_name<span className="op">=</span><span className="str">&quot;country&quot;</span>, log_x<span className="op">=</span><span className="kw">True</span>,</div>
      <div>)</div>
      <div className="mt-2">fig.<span className="fn">write_html</span>(<span className="str">&quot;rapor.html&quot;</span>)</div>
      <div>fig.<span className="fn">show</span>()  <span className="cm"># tarayıcıda hover + zoom</span></div>
    </div>
  );
}

/* D3 JS kod bloğu */
function D3CodeBlock() {
  return (
    <div className="vg-code">
      <div><span className="cm">// D3 — veriyi DOM&apos;a bağla (data join)</span></div>
      <div><span className="kw">const</span> svg <span className="op">=</span> d3.<span className="fn">select</span>(<span className="str">&quot;#chart&quot;</span>)</div>
      <div>{"  "}.<span className="fn">append</span>(<span className="str">&quot;svg&quot;</span>)</div>
      <div>{"  "}.<span className="fn">attr</span>(<span className="str">&quot;width&quot;</span>, <span className="num">640</span>).<span className="fn">attr</span>(<span className="str">&quot;height&quot;</span>, <span className="num">400</span>);</div>
      <div className="mt-2">svg.<span className="fn">selectAll</span>(<span className="str">&quot;rect&quot;</span>)</div>
      <div>{"  "}.<span className="fn">data</span>(veri)        <span className="cm">// veri ↔ eleman</span></div>
      <div>{"  "}.<span className="fn">join</span>(<span className="str">&quot;rect&quot;</span>)     <span className="cm">// enter/update/exit</span></div>
      <div>{"  "}.<span className="fn">attr</span>(<span className="str">&quot;x&quot;</span>, (d, i) <span className="op">=&gt;</span> x(i))</div>
      <div>{"  "}.<span className="fn">attr</span>(<span className="str">&quot;height&quot;</span>, (d) <span className="op">=&gt;</span> y(d.deger))</div>
      <div>{"  "}.<span className="fn">on</span>(<span className="str">&quot;mouseover&quot;</span>, vurgula);</div>
    </div>
  );
}

/* Etkileşim türleri için mini gösterim ikonları */
function InteractionMini({ kind }: { kind: "hover" | "zoom" | "filter" | "select" }) {
  const W = 150;
  const H = 84;
  return (
    <div className="vg-chart-frame relative">
      <svg width={W} height={H} className="block">
        {kind === "hover" && (
          <>
            {[20, 45, 70, 95, 120].map((cx, i) => (
              <circle key={i} cx={cx} cy={50 - (i % 3) * 10} r={5} fill={i === 2 ? "#ef4444" : "#7f1d1d"} />
            ))}
            <MousePointer2Glyph x={66} y={34} />
          </>
        )}
        {kind === "zoom" && (
          <>
            <rect x={20} y={20} width={110} height={44} fill="none" stroke="#475569" strokeWidth={1} />
            <rect x={45} y={28} width={40} height={28} fill="none" stroke="#ef4444" strokeWidth={1.5} strokeDasharray="4 3" />
            <text x={50} y={45} fill="#fca5a5" fontSize={9} fontFamily="monospace">zoom</text>
          </>
        )}
        {kind === "filter" && (
          <>
            {[28, 50, 72].map((y, i) => (
              <g key={i}>
                <rect x={20} y={y} width={i === 1 ? 100 : 60} height={10} rx={3} fill={i === 1 ? "#ef4444" : "#334155"} />
              </g>
            ))}
            <circle cx={120} cy={33} r={5} fill="#fbbf24" />
          </>
        )}
        {kind === "select" && (
          <>
            <path d="M25 25 L120 25 L120 60 L25 60 Z" fill="rgba(239,68,68,0.12)" stroke="#ef4444" strokeWidth={1} strokeDasharray="3 3" />
            {[35, 55, 75, 95, 110].map((cx, i) => (
              <circle key={i} cx={cx} cy={42} r={4} fill={cx < 120 && cx > 25 ? "#ef4444" : "#475569"} />
            ))}
          </>
        )}
      </svg>
    </div>
  );
}

/* Plotly dispersiyon / kabarcık panosu mockup */
function PlotlyDashboardMock() {
  const bubbles = [
    { cx: 70, cy: 120, r: 10, c: "#ef4444" },
    { cx: 130, cy: 90, r: 16, c: "#f59e0b" },
    { cx: 200, cy: 70, r: 22, c: "#fbbf24" },
    { cx: 270, cy: 100, r: 13, c: "#fb923c" },
    { cx: 330, cy: 55, r: 26, c: "#ef4444" },
    { cx: 400, cy: 80, r: 12, c: "#f59e0b" },
    { cx: 160, cy: 140, r: 9, c: "#fbbf24" },
    { cx: 360, cy: 130, r: 14, c: "#fb923c" },
  ];
  return (
    <WindowChrome title="Plotly · rapor.html (tarayıcıda açılır)" badge="P">
      <div className="vg-dash p-3" style={{ minHeight: 300 }}>
        {/* mod çubuğu (modebar) */}
        <div className="flex items-center justify-end gap-2 mb-2">
          {[ZoomIn, Hand, Filter, Share2].map((Icon, i) => (
            <span key={i} className="w-6 h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center">
              <Icon className="w-3.5 h-3.5 text-gray-400" />
            </span>
          ))}
        </div>
        <div className="text-[10px] text-gray-400 mb-1">Kişi başı GSYİH × Yaşam beklentisi · daire = nüfus</div>
        <svg width="100%" viewBox="0 0 460 180" className="block">
          <line x1={40} y1={160} x2={450} y2={160} stroke="#475569" />
          <line x1={40} y1={20} x2={40} y2={160} stroke="#475569" />
          {bubbles.map((b, i) => (
            <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill={b.c} opacity={0.75} stroke="#0a0a0a" strokeWidth={1} />
          ))}
          <g transform="translate(330,55)">
            <MousePointer2Glyph x={26} y={2} />
          </g>
        </svg>
        <div className="vg-tooltip" style={{ position: "static", display: "inline-block", marginTop: 6 }}>
          ülke: Türkiye · nüfus: 70.8M · yaşam: 71.8
        </div>
      </div>
    </WindowChrome>
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
        <Eyebrow>BVA 2107 · 14. Hafta</Eyebrow>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.04]">
          <span className="vg-shimmer">Etkileşimli Görselleştirme</span>
          <br />
          <span className="text-white/90 text-4xl md:text-6xl">Plotly &amp; D3&apos;e Giriş</span>
        </h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Statik resmi bırakıp, kullanıcının üzerine gelip yakınlaştırabildiği, filtreleyebildiği
          web tabanlı grafiklere geçiyoruz.
        </Sub>
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { name: "Plotly", desc: "Python / JS · hızlı etkileşim", icon: Boxes },
            { name: "D3.js", desc: "Tam kontrol · veriye dayalı DOM", icon: Code2 },
            { name: "Tarayıcı", desc: "HTML · SVG · Canvas çıktısı", icon: Globe },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="vg-card rounded-xl p-4"
            >
              <div className="w-10 h-10 mx-auto mb-2 rounded-md vg-tool-tile flex items-center justify-center">
                <t.icon className="w-5 h-5" />
              </div>
              <div className="text-white font-semibold text-sm">{t.name}</div>
              <div className="text-[11px] text-gray-400 mt-1">{t.desc}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-xs font-mono text-gray-500">
          MCBÜ MYO · Bilgisayar Programcılığı · Veri Görselleştirme
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. KÖPRÜ / HEDEF ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 13. haftadan 14. haftaya</Eyebrow>
      <H2>Statik grafiği çizdik; şimdi onu &quot;canlandırıyoruz&quot;</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta Python ile (matplotlib/seaborn) statik PNG grafikler ürettik. Bu hafta amaç,
        kullanıcının grafikle <span className="text-[#ef4444]">konuşabildiği</span> etkileşimli görselleri tanımak: hover,
        zoom, filtre ve seçim. İki temel araçla başlıyoruz: yüksek seviyeli Plotly ve düşük seviyeli D3.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-6">
        <StaticChart />
        <InteractiveChart />
      </div>
      <p className="mt-6 text-sm text-gray-500 max-w-3xl">
        Aynı veri, iki farklı deneyim. Sağdaki grafik üzerine geldiğinizde değeri gösterir, bir bölgeyi
        seçtiğinizde yakınlaşır. Bu hafta o &quot;canlılığı&quot; nasıl ekleyeceğimizi konuşuyoruz.
      </p>
    </SlideShell>
  ),

  /* ───── 3. DERSİN AKIŞI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: etkileşim · Plotly · D3</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce etkileşim neden işe yarar ve hangi temel hareketleri içerir; sonra hızlı sonuç veren
        Plotly; en son tam kontrol sunan D3. Sonunda küçük bir uygulamalı görev.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Etkileşim İlkeleri", items: ["Statik vs etkileşimli", "Hover · zoom · filtre · seç", "Shneiderman mantrası"], icon: MousePointer2, accent: "#ef4444" },
          { range: "02", title: "Plotly", items: ["Plotly Express ile hızlı grafik", "HTML çıktısı & Dash", "Hover, modebar, callback"], icon: Boxes, accent: "#f59e0b" },
          { range: "03", title: "D3.js", items: ["Data join (veri ↔ DOM)", "Ölçek & eksen", "Tam kontrol, dik öğrenme"], icon: Code2, accent: "#fbbf24" },
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
                <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: g.accent }}>Durak {g.range}</div>
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

  /* ───── 4. BÖLÜM 1 — ETKİLEŞİM ───── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Neden Etkileşim?"
      subtitle="Tek bir statik görsel her soruya cevap veremez. Etkileşim, aynı grafiği birçok soruya cevap verebilen bir araca dönüştürür."
      bgGradient="linear-gradient(135deg, #ef4444, #b91c1c)"
      shadow="0 25px 60px -15px rgba(239, 68, 68, 0.6)"
      icon={<MousePointer2 className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 5. ETKİLEŞİM TÜRLERİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Temel etkileşim hareketleri</Eyebrow>
      <H2>Dört temel hareket</H2>
      <Sub className="mt-3 max-w-3xl">
        Karmaşık panolar bile genelde bu dört temel hareketin birleşimidir. Her birini bir araçta
        ararken &quot;bunu nasıl yaparım?&quot; diye sorabilmek için önce adlarını koyalım.
      </Sub>
      <div className="mt-8 grid grid-cols-4 gap-4">
        {[
          { k: "hover" as const, icon: MousePointer2, t: "Hover (üzerine gelme)", d: "Üzerine gelince tam değer / etiket gösterir (tooltip).", a: "#ef4444" },
          { k: "zoom" as const, icon: ZoomIn, t: "Zoom & Pan", d: "Bir bölgeyi büyütüp kaydırarak detaya iner.", a: "#f59e0b" },
          { k: "filter" as const, icon: Filter, t: "Filter (filtreleme)", d: "Slider / menü ile veriyi daraltır, gürültüyü atar.", a: "#fbbf24" },
          { k: "select" as const, icon: Hand, t: "Select (seçim)", d: "Noktaları kutuyla seçer; bağlı grafikler güncellenir.", a: "#fb923c" },
        ].map((g, i) => (
          <motion.div
            key={g.k}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="vg-card rounded-xl p-4"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
              style={{ background: `${g.a}18`, border: `1px solid ${g.a}55` }}
            >
              <g.icon className="w-5 h-5" style={{ color: g.a }} />
            </div>
            <InteractionMini kind={g.k} />
            <div className="mt-2 text-sm font-semibold text-white">{g.t}</div>
            <div className="text-[11px] text-gray-400 mt-0.5 leading-snug">{g.d}</div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 6. SHNEIDERMAN MANTRASI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Tasarım çerçevesi · 1996</Eyebrow>
      <H2 className="mb-2">Shneiderman&apos;ın Görsel Bilgi Arama Mantrası</H2>
      <Sub className="max-w-3xl mb-8">
        Etkileşimli bir görselin akışını tarif eden klasik kural. Bir panoyu tasarlarken
        bu üç adımı sırayla desteklediğinizden emin olun.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { n: "1", title: "Overview first", tr: "Önce genel bakış", desc: "Kullanıcı tüm veriyi tek ekranda görsün; bütünü kavrasın.", icon: Layers, accent: "#ef4444" },
          { n: "2", title: "Zoom & filter", tr: "Yakınlaş ve filtrele", desc: "İlgilendiği bölgeye in, alakasız olanı ele. Gürültü azalsın.", icon: Filter, accent: "#f59e0b" },
          { n: "3", title: "Details on demand", tr: "İstenince detay", desc: "Tek bir öğeye tıkla/üzerine gel; tam değeri ancak o an göster.", icon: MousePointer2, accent: "#fbbf24" },
        ].map((p, i) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="vg-card rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
                style={{ background: `${p.accent}18`, color: p.accent, border: `1px solid ${p.accent}55` }}
              >
                {p.n}
              </span>
              <p.icon className="w-5 h-5" style={{ color: p.accent }} />
            </div>
            <div className="font-mono text-sm" style={{ color: p.accent }}>{p.title}</div>
            <div className="text-base font-semibold text-white mt-0.5">{p.tr}</div>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed border-t border-white/5 pt-3">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 7. BÖLÜM 2 — PLOTLY ───── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Plotly — Hızlı Etkileşim"
      subtitle="Birkaç satırla, tarayıcıda zoom ve hover yapabildiğin grafikler. Python, R ve JavaScript&apos;te aynı çekirdek."
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 25px 60px -15px rgba(245, 158, 11, 0.6)"
      icon={<Boxes className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 8. PLOTLY NEDİR ───── */
  () => (
    <SlideShell>
      <Eyebrow>Plotly · genel bakış</Eyebrow>
      <H2>Açık kaynak, çok dilli, web tabanlı</H2>
      <Sub className="mt-3 max-w-3xl">
        Plotly, altta JavaScript (plotly.js) çalıştıran ama Python, R ve JS&apos;ten kullanılabilen bir
        kütüphanedir. Çıktısı bir HTML/SVG grafiktir; etkileşim &quot;ücretsiz&quot; gelir.
      </Sub>
      <div className="mt-8 grid grid-cols-3 gap-4">
        <FeatureCard
          icon={Rocket}
          title="Plotly Express"
          desc="Yüksek seviyeli API. Tek satırda scatter, line, bar, harita, kutu grafiği."
          delay={0.05}
        />
        <FeatureCard
          icon={Globe}
          title="HTML çıktısı"
          desc="write_html ile tek bir .html dosyası; sunucu gerektirmeden paylaşılır."
          delay={0.1}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={SlidersHorizontal}
          title="Dash"
          desc="Plotly üzerine pano çatısı; slider ve menülerle tam web uygulaması."
          delay={0.15}
        />
        <FeatureCard
          icon={MousePointer2}
          title="Yerleşik hover"
          desc="hover_name / hover_data ile her noktanın detayı otomatik tooltip."
          delay={0.2}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Gauge}
          title="Modebar"
          desc="Zoom, pan, kutu-seçim, PNG indirme araç çubuğu her grafikte hazır gelir."
          delay={0.25}
        />
        <FeatureCard
          icon={Server}
          title="Notebook uyumu"
          desc="Jupyter / Colab içinde doğrudan etkileşimli render edilir."
          delay={0.3}
          accent="#f59e0b"
        />
      </div>
    </SlideShell>
  ),

  /* ───── 9. PLOTLY KOD + ÇIKTI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Plotly Express · kod</Eyebrow>
      <H2>On satır kod, etkileşimli kabarcık grafiği</H2>
      <Sub className="mt-3 max-w-3xl">
        Aşağıdaki kod ünlü Gapminder verisinden kıtalara göre renklenmiş, nüfusa göre boyutlanmış
        bir scatter üretir. Çıktı bir HTML dosyası; tarayıcıda hover ve zoom çalışır.
      </Sub>
      <div className="mt-7 grid grid-cols-2 gap-6 items-start">
        <PlotlyCodeBlock />
        <div>
          <div className="text-xs text-gray-500 mb-2 text-center font-mono">→ tarayıcıda etkileşimli çıktı</div>
          <PlotlyDashboardMock />
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 10. BÖLÜM 3 — D3 ───── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="D3.js — Tam Kontrol"
      subtitle="Hazır grafik tipi vermez; veriyi doğrudan ekran öğelerine bağlamanı sağlar. Esnekliği en yüksek, öğrenme eğrisi en dik araç."
      bgGradient="linear-gradient(135deg, #ef4444, #f59e0b)"
      shadow="0 25px 60px -15px rgba(239, 68, 68, 0.55)"
      icon={<Code2 className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 11. D3 KAVRAMI — DATA JOIN ───── */
  () => (
    <SlideShell>
      <Eyebrow>D3 · temel fikir</Eyebrow>
      <H2 className="mb-2">Data join: veriyi DOM&apos;a bağla</H2>
      <Sub className="max-w-3xl mb-6">
        D3 &quot;Data-Driven Documents&quot; demektir. Bir bar chart çizmez; her veri satırını bir SVG
        öğesine eşler. Üç durum vardır: <span className="text-[#86efac]">enter</span> (yeni veri),
        <span className="text-[#fcd34d]"> update</span> (değişen veri), <span className="text-[#fca5a5]">exit</span> (kalkan veri).
      </Sub>
      <div className="grid grid-cols-2 gap-6 items-start">
        <D3CodeBlock />
        <div className="space-y-3">
          {[
            { k: "enter", c: "#22c55e", d: "Veride var, ekranda yok → yeni öğe oluştur." },
            { k: "update", c: "#f59e0b", d: "İkisinde de var → konum/boyutu güncelle." },
            { k: "exit", c: "#ef4444", d: "Ekranda var, veride yok → öğeyi kaldır." },
          ].map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.12 }}
              className="vg-card rounded-lg p-4 flex items-start gap-3"
            >
              <span
                className="font-mono text-xs px-2 py-0.5 rounded mt-0.5"
                style={{ background: `${s.c}22`, color: s.c }}
              >
                {s.k}
              </span>
              <span className="text-sm text-gray-300">{s.d}</span>
            </motion.div>
          ))}
          <div className="text-[11px] text-gray-500 leading-snug pt-1">
            <span className="text-[#ef4444] font-semibold">.join()</span> üçünü tek çağrıda yönetir —
            veri değiştiğinde grafik kendi kendini günceller.
          </div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 12. PLOTLY vs D3 KARŞILAŞTIRMA ───── */
  () => (
    <SlideShell>
      <Eyebrow>Araç karşılaştırması</Eyebrow>
      <H2>Plotly mi, D3 mü?</H2>
      <Sub className="mt-3 max-w-3xl">
        İkisi rakip değil, farklı seviyeler. &quot;Hangisi&quot; sorusunun cevabı: ne kadar özelleştirme
        istediğine ve ne kadar zamanın olduğuna bağlı.
      </Sub>
      <div className="mt-7 vg-card rounded-xl p-4">
        <table className="vg-table">
          <thead>
            <tr>
              <th>Ölçüt</th>
              <th>Plotly</th>
              <th>D3.js</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-white">Soyutlama seviyesi</td>
              <td>Yüksek · hazır grafik tipleri</td>
              <td>Düşük · ilkel öğeler (SVG/Canvas)</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Öğrenme eğrisi</td>
              <td><span className="vg-pill vg-pill-good">Yumuşak</span></td>
              <td><span className="vg-pill vg-pill-bad">Dik</span></td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Özelleştirme</td>
              <td><span className="vg-pill vg-pill-mid">Orta</span></td>
              <td><span className="vg-pill vg-pill-good">Neredeyse sınırsız</span></td>
            </tr>
            <tr>
              <td className="font-semibold text-white">İlk sonuca süre</td>
              <td>Dakikalar</td>
              <td>Saatler · daha çok kod</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Tipik kullanım</td>
              <td>Rapor, pano, keşif (EDA)</td>
              <td>Özgün/sıra dışı görseller, haber grafikleri</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-xs text-gray-500 text-center font-mono">
        Pratik kural: Standart grafik → Plotly · &quot;başka hiçbir yerde olmayan&quot; görsel → D3.
      </div>
    </SlideShell>
  ),

  /* ───── 13. EKOSİSTEM ───── */
  () => (
    <SlideShell>
      <Eyebrow>Daha geniş ekosistem</Eyebrow>
      <H2>Yalnız bu ikisi değil</H2>
      <Sub className="mt-3 max-w-3xl">
        Plotly ve D3 iki uç noktayı temsil eder. Aralarında, farklı denge noktaları sunan başka
        web tabanlı kütüphaneler de vardır; mantık hep aynı: veri → etkileşimli görsel.
      </Sub>
      <div className="mt-8 grid grid-cols-3 gap-4">
        {[
          { i: Boxes, t: "Plotly / Dash", d: "Hızlı etkileşim + pano", a: "#ef4444" },
          { i: Code2, t: "D3.js", d: "Tam kontrol, düşük seviye", a: "#f59e0b" },
          { i: Layers, t: "Vega-Lite", d: "Bildirimsel (JSON) gramer", a: "#fbbf24" },
          { i: GitBranch, t: "Observable Plot", d: "D3 üstü kısa sözdizimi", a: "#ef4444" },
          { i: Workflow, t: "ECharts", d: "Zengin hazır grafik seti", a: "#f59e0b" },
          { i: Gauge, t: "Bokeh", d: "Python · sunucu etkileşimi", a: "#fbbf24" },
        ].map((tool, i) => (
          <motion.div
            key={tool.t}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="vg-card rounded-lg p-4 flex items-center gap-3"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${tool.a}18`, border: `1px solid ${tool.a}55` }}
            >
              <tool.i className="w-5 h-5" style={{ color: tool.a }} />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-100">{tool.t}</div>
              <div className="text-[11px] text-gray-400">{tool.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 vg-card rounded-lg p-4 text-sm text-gray-300 flex items-start gap-3">
        <Brain className="w-5 h-5 text-[#ef4444] mt-0.5 shrink-0" />
        <div>
          <span className="text-white font-semibold">İlke aynı:</span> Bir kütüphaneyi öğrenince
          diğerine geçmek kolaylaşır; çünkü hepsi veriyi görsel öğelere ve etkileşime bağlar.
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 14. UYGULAMALI GÖREV ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı görev</Eyebrow>
      <H2>Statik grafiğini etkileşimliye çevir</H2>
      <Sub className="mt-3 max-w-3xl">
        Daha önce ürettiğin statik bir grafiği temel alıp, Plotly ile etkileşimli bir sürümünü
        oluştur ve HTML olarak dışa aktar. Dört adım:
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Server, title: "Plotly&apos;i kur", desc: "pip install plotly · Jupyter/Colab veya yerel Python ortamında.", accent: "#fbbf24" },
          { icon: Boxes, title: "Bir px grafiği yaz", desc: "px.scatter veya px.bar ile kendi CSV verinden etkileşimli bir grafik üret.", accent: "#ef4444" },
          { icon: MousePointer2, title: "Hover&apos;ı zenginleştir", desc: "hover_name ve hover_data ekleyerek üzerine gelince anlamlı bilgi göster.", accent: "#f59e0b" },
          { icon: Globe, title: "HTML&apos;e aktar", desc: "fig.write_html(\"grafik.html\") · tarayıcıda aç, zoom ve hover&apos;ı dene.", accent: "#fb923c" },
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
        className="mt-6 vg-card rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <Target className="w-4 h-4 text-[#ef4444] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Teslim:</span> Ürettiğin <span className="font-mono text-[#fca5a5]">grafik.html</span>
          {" "}dosyası ile kodunu getir. Bir sonraki derste D3 ile aynı veriyi düşük seviyede çizmeyi deneyeceğiz.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 15. SIRADAKİ HAFTA + KAPANIŞ ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{ background: "linear-gradient(135deg, #ef4444, #f59e0b)", boxShadow: "0 30px 80px -20px rgba(239,68,68,0.6)" }}
        >
          <Sparkles className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>14. hafta tamamlandı · sıradaki: 15. hafta</Eyebrow>
        <H1>
          <span className="vg-shimmer-amber">Proje &amp; Final Tekrarı</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta statik grafiği etkileşimliye çevirdik. Gelecek hafta tüm dönemi birleştirip
          (araçlar, tasarım ilkeleri, etkileşim) küçük bir görselleştirme projesini baştan sona kuruyoruz.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="vg-card rounded-xl p-5">
            <Layers className="w-5 h-5 text-[#ef4444] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Kapsam</div>
            <div className="text-white font-semibold">Dönem birleşimi</div>
            <div className="text-sm text-gray-400">veri → tasarım → etkileşim</div>
          </div>
          <div className="vg-card rounded-xl p-5">
            <Target className="w-5 h-5 text-[#f59e0b] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">grafik.html</div>
            <div className="text-sm text-gray-400">Plotly görevini bitir</div>
          </div>
          <div className="vg-card rounded-xl p-5">
            <Check className="w-5 h-5 text-[#fbbf24] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Proje taslağı</div>
            <div className="text-sm text-gray-400">veri seti + soru</div>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center gap-3 text-xs font-mono text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>MCBÜ MYO · BVA 2107 · Veri Görselleştirme · 14. Hafta</span>
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
          BVA 2107 · 14. Hafta · Etkileşimli Görselleştirme (Plotly &amp; D3)
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
