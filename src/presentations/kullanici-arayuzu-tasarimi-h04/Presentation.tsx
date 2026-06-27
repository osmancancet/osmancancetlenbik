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
  Workflow,
  Map as MapIcon,
  Network,
  FolderTree,
  Layers,
  Search,
  Compass,
  Route,
  GitBranch,
  ListTree,
  Tags,
  SquareStack,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Home,
  ShoppingCart,
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Diamond,
  Circle,
  Square,
  MousePointerClick,
  Users,
  Target,
  Sparkles,
  Calendar,
  Maximize2,
  Minimize2,
  Keyboard,
  Lightbulb,
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
   TOPIC-SPECIFIC MOCKUPS
   ============================================================ */

/* Pencere kasası — sitemap / flow tuvali için */
function CanvasWindow({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
          {icon}
          <span>{title}</span>
        </div>
      </div>
      <div className="p-0">{children}</div>
    </motion.div>
  );
}

/* Sitemap ağacı — bir e-ticaret sitesinin hiyerarşisi */
function SitemapTree() {
  return (
    <CanvasWindow
      title="sitemap-v2.fig — Bilgi Mimarisi"
      icon={<FolderTree className="w-3.5 h-3.5" />}
    >
      <div className="katas-figma-canvas p-8">
        {/* Root */}
        <div className="flex flex-col items-center">
          <div className="katas-node-root rounded-lg px-5 py-2.5 text-sm flex items-center gap-2">
            <Home className="w-4 h-4" />
            <span>0.0 Ana Sayfa</span>
          </div>
          <div className="w-px h-6 bg-pink-500/40" />
          {/* Level 1 connector */}
          <div className="flex items-start justify-center gap-6">
            {[
              {
                code: "1.0",
                label: "Ürünler",
                children: ["1.1 Kadın", "1.2 Erkek", "1.3 İndirim"],
              },
              {
                code: "2.0",
                label: "Sepet",
                children: ["2.1 Adres", "2.2 Ödeme"],
              },
              {
                code: "3.0",
                label: "Hesabım",
                children: ["3.1 Siparişler", "3.2 Ayarlar"],
              },
              {
                code: "4.0",
                label: "Yardım",
                children: ["4.1 SSS", "4.2 İletişim"],
              },
            ].map((branch, i) => (
              <motion.div
                key={branch.code}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="katas-node rounded-lg px-4 py-2 text-xs flex items-center gap-1.5">
                  <span className="font-mono text-[10px] opacity-70">{branch.code}</span>
                  {branch.label}
                </div>
                <div className="w-px h-5 bg-pink-500/30" />
                <div className="flex flex-col gap-1.5">
                  {branch.children.map((c) => (
                    <div
                      key={c}
                      className="katas-node-leaf rounded-md px-3 py-1.5 text-[11px] font-mono"
                    >
                      {c}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-6 text-[11px] text-gray-500 text-center font-mono">
          Her kutu bir sayfa · numaralandırma (0.0 / 1.1) ekiplerin aynı ekranı işaret etmesini sağlar.
        </div>
      </div>
    </CanvasWindow>
  );
}

/* Kart ayrıştırma (card sorting) mockup */
function CardSortMockup() {
  const groups = [
    {
      title: "Hesap",
      color: "#ec4899",
      cards: ["Profil", "Şifre değiştir", "Adreslerim", "Çıkış yap"],
    },
    {
      title: "Siparişler",
      color: "#a855f7",
      cards: ["Geçmiş siparişler", "Kargo takip", "İade talebi"],
    },
    {
      title: "Destek",
      color: "#3b82f6",
      cards: ["SSS", "Canlı destek", "İletişim formu"],
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
      {groups.map((g, gi) => (
        <motion.div
          key={g.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: gi * 0.12 }}
          className="rounded-xl p-4"
          style={{ background: `${g.color}10`, border: `1px dashed ${g.color}55` }}
        >
          <div
            className="text-xs font-mono uppercase tracking-widest mb-3 flex items-center gap-2"
            style={{ color: g.color }}
          >
            <Tags className="w-4 h-4" />
            {g.title}
          </div>
          <div className="space-y-2">
            {g.cards.map((c, ci) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: gi * 0.12 + ci * 0.06 }}
                className="bg-white rounded-md px-3 py-2 text-[12px] text-gray-800 font-medium shadow-sm flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-sm" style={{ background: g.color }} />
                {c}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* User flow diyagramı — bir satın alma akışı */
function UserFlowDiagram() {
  type Node =
    | { kind: "start" | "end"; label: string }
    | { kind: "screen"; label: string }
    | { kind: "decision"; label: string };

  const row: Node[] = [
    { kind: "start", label: "Giriş" },
    { kind: "screen", label: "Ürün sayfası" },
    { kind: "decision", label: "Giriş yapıldı mı?" },
    { kind: "screen", label: "Sepet" },
    { kind: "screen", label: "Ödeme" },
    { kind: "end", label: "Onay" },
  ];

  function NodeBox({ node }: { node: Node }) {
    if (node.kind === "start" || node.kind === "end") {
      return (
        <div className="flex flex-col items-center gap-1.5">
          <div
            className="rounded-full px-4 py-2.5 text-xs font-semibold flex items-center gap-1.5"
            style={{
              background: node.kind === "start" ? "#34d39920" : "#ec489920",
              border: `1px solid ${node.kind === "start" ? "#34d399" : "#ec4899"}`,
              color: node.kind === "start" ? "#86efac" : "#f9a8d4",
            }}
          >
            <Circle className="w-3 h-3" />
            {node.label}
          </div>
          <span className="text-[9px] font-mono text-gray-600">terminal</span>
        </div>
      );
    }
    if (node.kind === "decision") {
      return (
        <div className="flex flex-col items-center gap-1.5">
          <div className="relative w-[120px] h-[64px] flex items-center justify-center">
            <div
              className="absolute inset-0 rotate-45 rounded-md"
              style={{ background: "#fbbf2418", border: "1px solid #fbbf24" }}
            />
            <span className="relative text-[10px] font-semibold text-amber-200 text-center px-2 leading-tight">
              {node.label}
            </span>
          </div>
          <span className="text-[9px] font-mono text-gray-600 flex items-center gap-1">
            <Diamond className="w-2.5 h-2.5" /> karar
          </span>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center gap-1.5">
        <div className="katas-card rounded-lg px-4 py-3 text-xs font-semibold text-white flex items-center gap-1.5 min-w-[96px] justify-center">
          <Square className="w-3 h-3 text-pink-400" />
          {node.label}
        </div>
        <span className="text-[9px] font-mono text-gray-600">ekran</span>
      </div>
    );
  }

  return (
    <CanvasWindow
      title="user-flow · satın alma akışı"
      icon={<Route className="w-3.5 h-3.5" />}
    >
      <div className="katas-figma-canvas px-6 py-10">
        <div className="flex items-center justify-between gap-1 flex-wrap">
          {row.map((node, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.12 }}
              className="flex items-center"
            >
              <NodeBox node={node} />
              {i < row.length - 1 && (
                <ArrowRight className="w-5 h-5 text-pink-400/70 mx-1 flex-shrink-0" />
              )}
            </motion.div>
          ))}
        </div>
        {/* karar dalı */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 flex items-center justify-center gap-3 text-[11px]"
        >
          <span className="font-mono text-amber-300">&quot;Giriş yapıldı mı?&quot;</span>
          <span className="text-gray-500">→ Hayır ise</span>
          <span className="katas-node-leaf rounded-md px-2.5 py-1 font-mono text-[10px]">
            Giriş / Kayıt ekranı
          </span>
          <span className="text-gray-500">→ sonra Sepet&apos;e döner</span>
        </motion.div>
      </div>
    </CanvasWindow>
  );
}

/* Breadcrumb + navigasyon mockup */
function NavigationMockup() {
  return (
    <CanvasWindow
      title="magaza.ornek.com — navigasyon"
      icon={<Compass className="w-3.5 h-3.5" />}
    >
      <div className="bg-white">
        {/* top nav */}
        <div className="flex items-center gap-5 px-5 py-3 border-b border-gray-200 text-[12px]">
          <span className="font-black text-pink-600">MAĞAZA</span>
          {["Ürünler", "Kampanyalar", "Hakkımızda", "Yardım"].map((m, i) => (
            <span
              key={m}
              className={i === 0 ? "text-pink-600 font-semibold" : "text-gray-600"}
            >
              {m}
            </span>
          ))}
          <span className="ml-auto flex items-center gap-3 text-gray-500">
            <Search className="w-4 h-4" />
            <ShoppingCart className="w-4 h-4" />
          </span>
        </div>
        {/* breadcrumb */}
        <div className="flex items-center gap-1.5 px-5 py-2.5 text-[11px] text-gray-500 bg-gray-50">
          <Home className="w-3 h-3" />
          <ChevronRight className="w-3 h-3" />
          <span>Ürünler</span>
          <ChevronRight className="w-3 h-3" />
          <span>Kadın</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-pink-600 font-semibold">Spor Ayakkabı</span>
        </div>
        {/* body */}
        <div className="flex">
          <div className="w-[150px] border-r border-gray-100 p-4 space-y-2">
            <div className="text-[10px] font-bold text-gray-700 uppercase">Kategori</div>
            {["Sneaker", "Koşu", "Outdoor", "Bot"].map((c, i) => (
              <div
                key={c}
                className={`text-[11px] ${i === 0 ? "text-pink-600 font-semibold" : "text-gray-500"}`}
              >
                {c}
              </div>
            ))}
          </div>
          <div className="flex-1 p-4 grid grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden border border-gray-100">
                <div className="h-16 bg-gradient-to-br from-pink-100 to-pink-50" />
                <div className="p-2">
                  <div className="h-1.5 w-3/4 bg-gray-200 rounded mb-1" />
                  <div className="h-1.5 w-1/2 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CanvasWindow>
  );
}

/* Flat vs deep hiyerarşi karşılaştırması */
function DepthComparison() {
  return (
    <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
      {/* derin */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="katas-card rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <XCircle className="w-5 h-5 text-red-400" />
          <span className="text-xs font-mono uppercase text-red-300">Çok derin · 5 tık</span>
        </div>
        <div className="space-y-1.5 font-mono text-[12px]">
          {["Ana Sayfa", "Kategori", "Alt kategori", "Marka", "Seri", "Ürün"].map(
            (l, i) => (
              <div
                key={l}
                className="katas-node-leaf rounded px-3 py-1.5 text-gray-300"
                style={{ marginLeft: `${i * 14}px` }}
              >
                {i === 5 ? "↳ " : ""}
                {l}
              </div>
            ),
          )}
        </div>
        <p className="text-xs text-gray-400 mt-4 leading-relaxed">
          Az seçenek ama çok kademe. Kullanıcı her tıkta yön kaybeder; geri-ileri
          gidip gelir.
        </p>
      </motion.div>

      {/* sığ */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="katas-card rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-mono uppercase text-emerald-300">Dengeli · 2-3 tık</span>
        </div>
        <div className="space-y-1.5 font-mono text-[12px]">
          <div className="katas-node-leaf rounded px-3 py-1.5 text-gray-300">Ana Sayfa</div>
          <div className="katas-node-leaf rounded px-3 py-1.5 text-gray-300" style={{ marginLeft: "14px" }}>
            Kadın · Erkek · Çocuk
          </div>
          <div className="katas-node-leaf rounded px-3 py-1.5 text-gray-300" style={{ marginLeft: "28px" }}>
            ↳ Ürün (filtre ile daralt)
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {["Filtre", "Sırala", "Ara"].map((f) => (
            <div
              key={f}
              className="text-center text-[10px] py-1 rounded bg-pink-500/15 border border-pink-500/30 text-pink-300"
            >
              {f}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4 leading-relaxed">
          Geniş ama sığ. Derinlik yerine filtre/arama kullanılır. Kullanıcı nerede
          olduğunu bilir.
        </p>
      </motion.div>
    </div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ─────────────────  01 · KAPAK  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2245 · 4. Hafta · Bilgi Mimarisi</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl font-bold tracking-tight leading-[1] mb-6"
        >
          <span className="katas-shimmer">Bilgi Mimarisi</span>
          <br />
          <span className="text-white">&amp; Kullanıcı Akışları</span>
        </motion.h1>
        <Sub className="mt-6 max-w-3xl mx-auto">
          İçeriği nasıl düzenleriz, kullanıcı aradığını nasıl bulur ve A noktasından
          B noktasına hangi adımlarla gider? — Ekrandan önce yapı.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <FeatureCard
            icon={Network}
            title="Bilgi Mimarisi"
            desc="İçeriğin yapısı: gruplama, etiketleme, hiyerarşi."
            accent="#ec4899"
            delay={0.3}
          />
          <FeatureCard
            icon={FolderTree}
            title="Sitemap"
            desc="Tüm sayfaların kuşbakışı haritası ve ilişkileri."
            accent="#a855f7"
            delay={0.45}
          />
          <FeatureCard
            icon={Route}
            title="User Flow"
            desc="Kullanıcının bir görevi tamamlama yolu, adım adım."
            accent="#3b82f6"
            delay={0.6}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/5 text-xs text-pink-300 font-mono"
        >
          <Calendar className="w-3 h-3" />
          Cuma · 15:20 — 17:00 · Sitemap &amp; flow çizim atölyesi
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  02 · KÖPRÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 3. haftadan 4. haftaya</Eyebrow>
      <H2>Kimi tanıdık; şimdi onun için yapıyı kuruyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        3. hafta persona ve senaryolarla &quot;kullanıcı kim, ne yapmak istiyor&quot;
        sorusunu cevapladık. Bu hafta o görevleri bir yapıya oturtuyoruz: hangi içerik
        nerede duracak ve kullanıcı hedefine hangi adımlarla ulaşacak.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="katas-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#f9a8d4]">
            <Users className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Geçen hafta</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ec4899] flex-shrink-0" />Persona: &quot;Ayşe, 28, hızlı alışveriş yapmak istiyor.&quot;</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ec4899] flex-shrink-0" />Senaryo: &quot;İş çıkışı telefondan ayakkabı alacak.&quot;</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ec4899] flex-shrink-0" />Görevler listesi çıkarıldı.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="katas-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#c4b5fd]">
            <Workflow className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#a855f7] flex-shrink-0" />Görevleri içerik gruplarına dönüştür (IA).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#a855f7] flex-shrink-0" />Grupları sitemap hiyerarşisine yerleştir.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#a855f7] flex-shrink-0" />Her görev için user flow çiz.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  03 · DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: yapı → harita → akış</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce bilgiyi nasıl düzenlediğimizi (IA) konuşuyoruz; sonra bunu bir sitemap
        ile görselleştiriyoruz; en son kullanıcının hedefe gidişini user flow ile
        çiziyoruz. Sonunda küçük bir atölye.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "Bilgi Mimarisi",
            items: ["Gruplama & etiketleme", "Kart ayrıştırma", "Zihinsel modeller"],
            icon: Network,
            accent: "#ec4899",
          },
          {
            range: "02",
            title: "Sitemap",
            items: ["Hiyerarşi & kademe", "Numaralandırma", "Derinlik vs genişlik"],
            icon: FolderTree,
            accent: "#a855f7",
          },
          {
            range: "03",
            title: "User Flow",
            items: ["Akış sembolleri", "Karar noktaları", "Görev tamamlama"],
            icon: Route,
            accent: "#3b82f6",
          },
        ].map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="katas-card rounded-xl p-6"
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

  /* ─────────────────  04 · BÖLÜM 1  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Bilgi Mimarisi"
      subtitle="Information Architecture: içeriği kullanıcının anlayacağı şekilde gruplama, etiketleme ve düzenleme sanatı."
      bgGradient="linear-gradient(135deg, #ec4899 0%, #be185d 100%)"
      shadow="0 0 60px rgba(236, 72, 153, 0.5)"
      icon={<Network className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  05 · IA NEDİR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>IA · Information Architecture</Eyebrow>
      <H2 className="mb-2">Bilgi mimarisi nedir?</H2>
      <Sub className="max-w-3xl mb-8">
        İçeriğin düzenlenme, yapılandırılma ve etiketlenme biçimidir. Amaç: kullanıcının
        nerede olduğunu, ne bulabileceğini ve nereye gidebileceğini her an bilmesi.
        Rosenfeld &amp; Morville bunu dört bileşene ayırır.
      </Sub>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FeatureCard
          icon={SquareStack}
          title="Organizasyon"
          desc="İçerik hangi mantıkla gruplanır: konu, görev, hedef kitle, alfabe?"
          accent="#ec4899"
          delay={0}
        />
        <FeatureCard
          icon={Tags}
          title="Etiketleme"
          desc="Her grubu adlandırma. Kullanıcının diliyle: &quot;Hesabım&quot; mı &quot;Profil&quot; mü?"
          accent="#a855f7"
          delay={0.1}
        />
        <FeatureCard
          icon={Compass}
          title="Navigasyon"
          desc="Yapı içinde gezinme yolları: menü, breadcrumb, filtre."
          accent="#3b82f6"
          delay={0.2}
        />
        <FeatureCard
          icon={Search}
          title="Arama"
          desc="Yapıyı bilmeyen kullanıcı için doğrudan erişim: arama kutusu."
          accent="#10b981"
          delay={0.3}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 katas-card-rose rounded-xl p-5 flex items-start gap-3"
      >
        <Lightbulb className="w-5 h-5 text-pink-300 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-300 leading-relaxed">
          İyi IA görünmezdir: kullanıcı &quot;ne kadar düzenli&quot; demez, sadece
          aradığını bulur. <strong className="text-pink-300">Kötü IA</strong> ise hemen
          fark edilir — kullanıcı kaybolur ve siteyi terk eder.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  06 · KART AYRIŞTIRMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>IA tekniği · Card Sorting</Eyebrow>
      <H2 className="mb-2">Grupları kullanıcıya kurdurmak: Kart ayrıştırma</H2>
      <Sub className="max-w-3xl mb-6">
        Her içerik bir karta yazılır; kullanıcılar bunları kendilerine mantıklı gelen
        gruplara ayırır. Böylece menüyü tasarımcının değil, kullanıcının zihinsel
        modeline göre kurarız.
      </Sub>
      <CardSortMockup />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 max-w-4xl mx-auto">
        <div className="katas-card rounded-lg p-4 flex items-start gap-3">
          <span className="text-[10px] font-mono text-pink-300 mt-0.5">AÇIK</span>
          <span className="text-sm text-gray-300">Grupları ve isimleri kullanıcı kendisi belirler — keşif için.</span>
        </div>
        <div className="katas-card rounded-lg p-4 flex items-start gap-3">
          <span className="text-[10px] font-mono text-purple-300 mt-0.5">KAPALI</span>
          <span className="text-sm text-gray-300">Gruplar hazırdır; kullanıcı kartları onlara yerleştirir — doğrulama için.</span>
        </div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  07 · BÖLÜM 2  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Sitemap"
      subtitle="Site haritası: tüm sayfaları ve aralarındaki hiyerarşik ilişkiyi tek bakışta gösteren kuşbakışı diyagram."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #ec4899 100%)"
      shadow="0 0 60px rgba(168, 85, 247, 0.5)"
      icon={<FolderTree className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  08 · SITEMAP AĞACI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sitemap · hiyerarşi diyagramı</Eyebrow>
      <H2 className="mb-2">Bir e-ticaret sitesinin haritası</H2>
      <Sub className="max-w-3xl mb-6">
        Sitemap, IA&apos;da kararlaştırılan grupları somut sayfalara dönüştürür. Üstte
        ana sayfa (kök), altında ana bölümler, en altta yaprak sayfalar. Numaralandırma
        ekip içi iletişimi netleştirir.
      </Sub>
      <SitemapTree />
    </SlideShell>
  ),

  /* ─────────────────  09 · SITEMAP SEMBOLLERİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sitemap · ortak dil</Eyebrow>
      <H2>Bir sitemap&apos;te ne gösterilir?</H2>
      <Sub className="mt-3 max-w-3xl">
        Sitemap görsel bir sözleşmedir; herkesin aynı sembolü aynı anlamda okuması gerekir.
        En sık kullanılan yapı taşları:
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 katas-card rounded-xl p-1"
      >
        <table className="katas-tbl">
          <thead>
            <tr>
              <th style={{ width: "22%" }}>Öğe</th>
              <th style={{ width: "38%" }}>Ne anlama gelir?</th>
              <th>Örnek</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Sayfa (kutu)</td>
              <td>Tek bir benzersiz ekran/URL.</td>
              <td className="font-mono text-[#f9a8d4]">1.0 Ürünler</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Numara</td>
              <td>Hiyerarşik kimlik; ekipler aynı sayfayı işaret eder.</td>
              <td className="font-mono text-[#f9a8d4]">1.2.1</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Bağlantı çizgisi</td>
              <td>Ebeveyn–çocuk (üst–alt sayfa) ilişkisi.</td>
              <td className="font-mono text-gray-400">Ana Sayfa → Ürünler</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Yığın simgesi</td>
              <td>Aynı şablonun çoğaltılmış örnekleri (ör. tüm ürünler).</td>
              <td className="font-mono text-gray-400">Ürün detayı ×N</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Dış bağlantı</td>
              <td>Site dışına çıkan adres; kesik çizgiyle gösterilir.</td>
              <td className="font-mono text-gray-400">Ödeme sağlayıcı</td>
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
        Sitemap tasarım değil, <span className="text-[#f9a8d4]">yapı</span> belgesidir — renk ve görselden önce gelir.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  10 · DERİNLİK vs GENİŞLİK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sitemap · kritik karar</Eyebrow>
      <H2 className="mb-2">Derin mi, geniş mi?</H2>
      <Sub className="max-w-3xl mb-6">
        Aynı sayıda sayfayı az kademede geniş ya da çok kademede derin yerleştirebilirsin.
        Genel kural: kullanıcı hedefe <strong className="text-pink-300">mümkün olan en az tıkla</strong>
        ulaşmalı, ama her ekranda da boğulmamalı. Denge önemli.
      </Sub>
      <DepthComparison />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 katas-card-warn rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl mx-auto"
      >
        <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
        <span>
          &quot;Üç tık kuralı&quot; katı bir yasa değildir; asıl önemli olan tık sayısı değil,
          her adımın <span className="text-white">net ve doğru yönde</span> hissedilmesidir.
          Doğru yolda 5 tık, yanlış yolda 2 tıktan iyidir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  11 · NAVİGASYON & BREADCRUMB  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>IA &amp; Sitemap buluşması · navigasyon</Eyebrow>
      <H2 className="mb-2">Yapı ekranda nasıl görünür?</H2>
      <Sub className="max-w-3xl mb-6">
        Sitemap soyut bir ağaçtır; kullanıcı onu menü, breadcrumb ve filtre olarak deneyimler.
        Breadcrumb (&quot;Ana Sayfa &gt; Ürünler &gt; Kadın&quot;) kullanıcıya nerede olduğunu ve
        bir üst seviyeye nasıl döneceğini söyler.
      </Sub>
      <NavigationMockup />
    </SlideShell>
  ),

  /* ─────────────────  12 · BÖLÜM 3  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="User Flow"
      subtitle="Kullanıcı akışı: bir kişinin belirli bir görevi tamamlamak için izlediği adımların ve karar noktalarının diyagramı."
      bgGradient="linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)"
      shadow="0 0 60px rgba(59, 130, 246, 0.5)"
      icon={<Route className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  13 · FLOW SEMBOLLERİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>User Flow · semboller</Eyebrow>
      <H2>Akış diyagramının dört yapı taşı</H2>
      <Sub className="mt-3 max-w-3xl">
        Flowchart geleneğinden gelen bu dört sembolle hemen her görevi çizebilirsin.
        Tutarlı kullanmak, ekibin diyagramı tartışmasız okumasını sağlar.
      </Sub>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          {
            icon: Circle,
            shape: "Yuvarlak",
            name: "Başlangıç / Bitiş",
            desc: "Akışın girdiği ve çıktığı terminal noktalar.",
            accent: "#34d399",
          },
          {
            icon: Square,
            shape: "Dikdörtgen",
            name: "Ekran / Adım",
            desc: "Kullanıcının gördüğü bir sayfa veya yaptığı bir işlem.",
            accent: "#ec4899",
          },
          {
            icon: Diamond,
            shape: "Eşkenar dörtgen",
            name: "Karar",
            desc: "Evet/Hayır gibi dallanma; akış buradan ikiye ayrılır.",
            accent: "#fbbf24",
          },
          {
            icon: ArrowRight,
            shape: "Ok",
            name: "Yön / Geçiş",
            desc: "Adımlar arası sıra ve yön; akışın okunma istikameti.",
            accent: "#3b82f6",
          },
        ].map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="katas-card rounded-xl p-5"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
              style={{ background: `${s.accent}18`, border: `1px solid ${s.accent}55` }}
            >
              <s.icon className="w-6 h-6" style={{ color: s.accent }} />
            </div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">{s.shape}</div>
            <div className="text-base font-semibold text-white mb-1">{s.name}</div>
            <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  14 · USER FLOW DİYAGRAMI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>User Flow · canlı örnek</Eyebrow>
      <H2 className="mb-2">&quot;Ürünü satın al&quot; akışı</H2>
      <Sub className="max-w-3xl mb-6">
        Aynı görevi yukarıdaki sembollerle çizelim. Dikkat: bir karar noktası
        (&quot;giriş yapıldı mı?&quot;) akışı dallandırır — flow, mutlu yolu da
        sapmaları da göstermelidir.
      </Sub>
      <UserFlowDiagram />
    </SlideShell>
  ),

  /* ─────────────────  15 · FLOW vs SITEMAP  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Karıştırma · iki farklı diyagram</Eyebrow>
      <H2>Sitemap nereyi; User Flow nasıl gösterir</H2>
      <Sub className="mt-3 max-w-3xl">
        İkisi de kutu-ok diyagramıdır ama farklı soruları yanıtlar. Birini diğerinin
        yerine kullanmak ekibi yanıltır.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 katas-card rounded-xl p-1"
      >
        <table className="katas-tbl">
          <thead>
            <tr>
              <th style={{ width: "24%" }}>Ölçüt</th>
              <th style={{ width: "38%" }}>Sitemap</th>
              <th>User Flow</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Sorduğu soru</td>
              <td>Site neyden oluşuyor? (yapı)</td>
              <td>Kullanıcı görevi nasıl tamamlıyor? (süreç)</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Düzen</td>
              <td>Hiyerarşik ağaç (üst → alt)</td>
              <td>Soldan sağa adım dizisi + dallanma</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Kapsam</td>
              <td>Tüm site, her sayfa</td>
              <td>Tek bir görev/senaryo</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Karar noktası</td>
              <td>Yok</td>
              <td>Var (eşkenar dörtgen)</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Cevapladığı</td>
              <td><span className="font-mono text-[#f9a8d4]">&quot;Bu sayfa nerede?&quot;</span></td>
              <td><span className="font-mono text-[#93c5fd]">&quot;Buraya nasıl gelinir?&quot;</span></td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  16 · UYGULAMALI ATÖLYE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı atölye</Eyebrow>
      <H2>Kendi projende dört adım</H2>
      <Sub className="mt-3 max-w-3xl">
        3. haftada seçtiğin persona ve senaryo üzerinden ilerle. Sonraki derse bu dördünü
        bir Figma/FigJam sayfasında hazır getirmen bekleniyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          {
            icon: Tags,
            title: "İçeriği grupla",
            desc: "Projendeki tüm ekran/içerikleri kartlara yaz, 4-6 mantıklı gruba ayır (kart ayrıştırma).",
            accent: "#ec4899",
          },
          {
            icon: FolderTree,
            title: "Sitemap çiz",
            desc: "Grupları kök → bölüm → yaprak hiyerarşisine yerleştir; her kutuyu numaralandır (0.0, 1.1).",
            accent: "#a855f7",
          },
          {
            icon: Route,
            title: "Bir user flow çiz",
            desc: "En önemli görevi seç (ör. kayıt ol). Başlangıç, ekranlar, en az bir karar ve bitiş ile çiz.",
            accent: "#3b82f6",
          },
          {
            icon: MousePointerClick,
            title: "Tık sayısını say",
            desc: "Flow'da hedefe kaç tıkla ulaşılıyor? Üçten fazlaysa sitemap'i sadeleştirebilir misin, dene.",
            accent: "#10b981",
          },
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
                <h3 className="text-base font-semibold text-white">{t.title}</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{t.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  17 · SIK YAPILAN HATALAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kontrol listesi · sık hatalar</Eyebrow>
      <H2>Yapıyı kurarken nelere dikkat?</H2>
      <Sub className="mt-3 max-w-3xl">
        IA, sitemap ve flow çizerken en sık karşılaşılan tuzaklar. Atölyeden önce kendi
        çalışmanı bunlara karşı gözden geçir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Tags}
          title="Tasarımcı dili"
          desc="Menüde &quot;Solüsyonlar&quot; gibi iç jargon yerine kullanıcının dediği kelimeyi kullan."
          accent="#ec4899"
          delay={0.1}
        />
        <FeatureCard
          icon={ListTree}
          title="Dengesiz ağaç"
          desc="Bir bölüm 1 sayfa, diğeri 40 sayfa olmasın. Grupları kullanıcının beklediği boyutta tut."
          accent="#a855f7"
          delay={0.2}
        />
        <FeatureCard
          icon={GitBranch}
          title="Eksik dallar"
          desc="Flow'da sadece mutlu yolu çizme; hata, &quot;giriş yok&quot;, &quot;stok yok&quot; gibi sapmaları da göster."
          accent="#3b82f6"
          delay={0.3}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 katas-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <MapIcon className="w-4 h-4 text-[#ec4899] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">İpucu:</span> IA bir kez kurulup unutulmaz; ürün büyüdükçe
          yeniden gözden geçirilir. Yeni bir özellik eklerken &quot;bu sitemap&apos;te nereye oturur?&quot;
          sorusu ilk sorulması gerekendir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  18 · SIRADAKİ HAFTA + KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{ background: "linear-gradient(135deg,#ec4899,#be185d)", boxShadow: "0 30px 80px -20px rgba(236,72,153,0.6)" }}
        >
          <Sparkles className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>4. hafta tamamlandı · sıradaki: Wireframe</Eyebrow>
        <H1>
          <span className="katas-shimmer-soft">Yapıdan İskelete</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta &quot;hangi sayfa nerede&quot; ve &quot;kullanıcı nasıl geçer&quot; sorularını
          çözdük. 5. haftada bu sayfaların içini düşük çözünürlüklü wireframe&apos;lerle
          taslaklaştırıyoruz — renk ve görsel henüz yok, sadece düzen ve hiyerarşi.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-4xl mx-auto">
          <FeatureCard icon={Square} title="Low-fi" desc="Gri kutular ve yer tutucularla hızlı taslak." accent="#ec4899" delay={0.1} />
          <FeatureCard icon={Layers} title="Düzen" desc="Sitemap'teki her sayfanın iç hiyerarşisi." accent="#a855f7" delay={0.2} />
          <FeatureCard icon={CreditCard} title="İçerik önceliği" desc="Ekranda ne önce, ne sonra görünmeli?" accent="#3b82f6" delay={0.3} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="katas-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#ec4899] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Cuma</div>
            <div className="text-sm text-gray-400">15:20 — 17:00</div>
          </div>
          <div className="katas-card rounded-xl p-5">
            <Target className="w-5 h-5 text-[#a855f7] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">Sitemap + flow</div>
            <div className="text-sm text-gray-400">FigJam sayfasını getir</div>
          </div>
          <div className="katas-card rounded-xl p-5">
            <CheckCircle2 className="w-5 h-5 text-[#10b981] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">4 adımlık atölye</div>
            <div className="text-sm text-gray-400">grup · sitemap · flow · tık sayısı</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Keyboard className="w-3.5 h-3.5" />
          <span>← → ile gez · F tam ekran · sorular için her zaman buradayım</span>
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
            background: "linear-gradient(90deg, #ec4899, #f472b6, #ec4899)",
            boxShadow: "0 0 16px rgba(236,72,153,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#ec4899]/70">
          BVA 2245 · 4. Hafta · Bilgi Mimarisi &amp; User Flow
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
