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
  Accessibility,
  Eye,
  Keyboard,
  Image as ImageIcon,
  Contrast,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Sparkles,
  Ear,
  Hand,
  Brain,
  ListChecks,
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Code2,
  MousePointer2,
  ArrowRight,
  Volume2,
  Gauge,
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

function CodeWindow({
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
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-mono flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d0d0d", color: "#f9a8d4" }}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>{title}</span>
        </div>
      </div>
      <div className="katas-code">{children}</div>
    </motion.div>
  );
}

/* Renk kontrastı kartı — örnek metin + WCAG sonucu */
function ContrastCard({
  pass,
  ratio,
  text,
  bg,
  fg,
  label,
  delay = 0,
}: {
  pass: boolean;
  ratio: string;
  text: string;
  bg: string;
  fg: string;
  label: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="katas-card rounded-xl overflow-hidden"
    >
      <div className="p-8 text-center" style={{ background: bg, color: fg }}>
        <div className="text-2xl font-bold">{text}</div>
        <div className="text-sm opacity-90 mt-2">Aa · Okunabilirlik testi</div>
      </div>
      <div className="px-4 py-3 flex items-center justify-between">
        <div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</div>
          <div className="text-lg font-bold text-white">{ratio}</div>
        </div>
        {pass ? (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
            <Check className="w-3.5 h-3.5" /> AA Geçer
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-bold">
            <X className="w-3.5 h-3.5" /> Kalır
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* Klavye odak halkası + tab sırası diyagramı */
function KeyboardNavMockup() {
  const fields = [
    { tab: 1, label: "Ad Soyad", active: false },
    { tab: 2, label: "E-posta", active: true },
    { tab: 3, label: "Mesaj", active: false },
    { tab: 4, label: "Gönder", active: false, isBtn: true },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center max-w-4xl mx-auto"
    >
      {/* Form + görünür focus ring */}
      <div className="bg-white rounded-xl p-6">
        <div className="text-sm font-bold text-gray-900 mb-4">İletişim formu</div>
        <div className="space-y-3">
          {fields.map((f) => (
            <div key={f.tab} className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                {f.tab}
              </span>
              {f.isBtn ? (
                <button
                  className={`flex-1 text-center text-[12px] font-bold py-2 rounded-lg text-white ${
                    f.active ? "katas-focus-ring" : ""
                  }`}
                  style={{ background: "#be185d" }}
                >
                  {f.label}
                </button>
              ) : (
                <div
                  className={`flex-1 text-[11px] text-gray-500 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 ${
                    f.active ? "katas-focus-ring" : ""
                  }`}
                >
                  {f.label}
                  {f.active && <span className="inline-block w-0.5 h-3 bg-pink-600 ml-0.5 align-middle animate-pulse" />}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Açıklama */}
      <div className="space-y-3">
        <div className="katas-card rounded-lg p-4 flex items-start gap-3">
          <Keyboard className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-300">
            <span className="text-white font-semibold">Tab</span> ile bir sonraki öğeye,
            <span className="text-white font-semibold"> Shift+Tab</span> ile geriye gidilir.
          </div>
        </div>
        <div className="katas-card rounded-lg p-4 flex items-start gap-3">
          <Eye className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-300">
            Odaklanan öğenin <span className="text-white font-semibold">görünür bir halkası</span> olmalı.
            <span className="font-mono text-[#f9a8d4]"> outline: none</span> erişilebilirliği bozar.
          </div>
        </div>
        <div className="katas-card rounded-lg p-4 flex items-start gap-3">
          <ListChecks className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-300">
            Tab sırası <span className="text-white font-semibold">okuma sırasıyla</span> aynı olmalı:
            yukarıdan aşağı, soldan sağa.
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* Alt text iyi/kötü karşılaştırması */
function AltTextCompare() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
      {[
        {
          tone: "bad" as const,
          tag: "Eksik",
          alt: 'alt=""',
          note: "Anlamlı görselde boş alt — ekran okuyucu görseli atlar, bilgi kaybolur.",
          icon: XCircle,
        },
        {
          tone: "bad" as const,
          tag: "Kötü",
          alt: 'alt="resim"',
          note: '"resim", "foto", dosya adı veya "IMG_2043.jpg" hiçbir şey anlatmaz.',
          icon: AlertTriangle,
        },
        {
          tone: "good" as const,
          tag: "İyi",
          alt: 'alt="Grafik: 2026 satışları çeyrek başına %12 arttı"',
          note: "Görselin taşıdığı bilgiyi ve amacını kısa, net biçimde aktarır.",
          icon: CheckCircle2,
        },
      ].map((c, i) => {
        const good = c.tone === "good";
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="katas-card rounded-xl overflow-hidden"
          >
            <div
              className={`flex items-center gap-2 px-4 py-2 border-b ${
                good
                  ? "bg-emerald-500/10 border-emerald-500/30"
                  : "bg-red-500/10 border-red-500/30"
              }`}
            >
              <c.icon className={`w-4 h-4 ${good ? "text-emerald-400" : "text-red-400"}`} />
              <span
                className={`text-xs font-mono uppercase ${
                  good ? "text-emerald-300" : "text-red-300"
                }`}
              >
                {c.tag}
              </span>
            </div>
            <div className="p-4">
              <code
                className={`block text-[12px] font-mono break-words rounded-md px-3 py-2 ${
                  good ? "bg-emerald-500/10 text-emerald-200" : "bg-red-500/10 text-red-200"
                }`}
              >
                {c.alt}
              </code>
              <p className="text-xs text-gray-400 mt-3 leading-relaxed">{c.note}</p>
            </div>
          </motion.div>
        );
      })}
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
        <Eyebrow>BVA 2245 · 13. Hafta · Güz Dönemi</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl font-bold tracking-tight leading-[1] mb-6"
        >
          <span className="katas-shimmer">Erişilebilirlik</span>
          <br />
          <span className="text-white">WCAG 2.2</span>
        </motion.h1>
        <Sub className="mt-6 max-w-3xl mx-auto">
          Tasarım herkes için çalışmalı. Bu hafta üç somut temel: alternatif
          metin, renk kontrastı ve klavye navigasyonu.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={ImageIcon}
            title="Alt text"
            desc="Görselin anlamını ekran okuyucuya aktaran alternatif metin."
            delay={0.3}
            accent="#ec4899"
          />
          <FeatureCard
            icon={Contrast}
            title="Kontrast"
            desc="Metin ile arka plan arasında okunabilir renk oranı."
            delay={0.45}
            accent="#a855f7"
          />
          <FeatureCard
            icon={Keyboard}
            title="Klavye"
            desc="Fare olmadan, yalnızca klavyeyle tam kullanılabilirlik."
            delay={0.6}
            accent="#3b82f6"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/5 text-xs text-pink-300 font-mono"
        >
          <Accessibility className="w-3.5 h-3.5" />
          a11y — &quot;accessibility&quot; 11 harf · baş ve son harf arası
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 02 · KÖPRÜ / HEDEF ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 12. haftadan 13. haftaya</Eyebrow>
      <H2>Önce güzel görünmesini, şimdi herkes için çalışmasını</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta web düzeni ve responsive tasarımı kurduk. Güzel görünen bir
        arayüz, görme, motor veya bilişsel farklılığı olan bir kullanıcı için
        kullanılamıyorsa eksiktir. Erişilebilirlik bir &quot;ekstra özellik&quot;
        değil, tasarımın kalitesidir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="katas-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#f9a8d4]">
            <Target className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu haftanın hedefi</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ec4899] flex-shrink-0" />WCAG 2.2&apos;nin ne olduğunu ve POUR ilkelerini tanımak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ec4899] flex-shrink-0" />Anlamlı alt text yazabilmek.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ec4899] flex-shrink-0" />Kontrast oranını ölçüp AA eşiğini geçmek.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ec4899] flex-shrink-0" />Tasarımı fare olmadan, klavyeyle gezebilmek.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="katas-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#c4b5fd]">
            <Accessibility className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Kim için tasarlıyoruz?</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><Eye className="w-4 h-4 mt-0.5 text-[#a855f7] flex-shrink-0" />Görme: az gören, renk körü, tam görme engelli.</li>
            <li className="flex gap-2"><Hand className="w-4 h-4 mt-0.5 text-[#a855f7] flex-shrink-0" />Motor: fare kullanamayan, titreme, tek elle giriş.</li>
            <li className="flex gap-2"><Ear className="w-4 h-4 mt-0.5 text-[#a855f7] flex-shrink-0" />İşitme: video/ses için altyazı ve metin gerekir.</li>
            <li className="flex gap-2"><Brain className="w-4 h-4 mt-0.5 text-[#a855f7] flex-shrink-0" />Bilişsel: sade dil, tutarlı düzen, az dikkat dağıtan.</li>
          </ul>
          <div className="text-[11px] text-gray-500 mt-3">
            Geçici durumlar da sayılır: kırık kol, güneşte parlayan ekran, gürültülü ortam.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 03 · DERSİN AKIŞI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: alt text → kontrast → klavye</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce ekran okuyucu kullanan kullanıcının görseli nasıl &quot;gördüğünü&quot;,
        sonra az gören kullanıcı için kontrastı, en son fareyi hiç kullanmayan
        kullanıcı için klavye erişimini ele alıyoruz. Sonunda kısa bir denetim labı.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Alt text", items: ["alt niteliği nedir", "Anlamlı vs dekoratif görsel", "İyi/kötı alt örnekleri"], icon: ImageIcon, accent: "#ec4899" },
          { range: "02", title: "Renk kontrastı", items: ["Kontrast oranı (X:1)", "AA / AAA eşikleri", "Renge tek başına güvenme"], icon: Contrast, accent: "#a855f7" },
          { range: "03", title: "Klavye navigasyonu", items: ["Tab sırası", "Görünür focus", "Atla bağlantısı (skip link)"], icon: Keyboard, accent: "#3b82f6" },
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

  /* ───── 04 · WCAG NEDİR + POUR ───── */
  () => (
    <SlideShell>
      <Eyebrow>WCAG 2.2 · W3C standardı</Eyebrow>
      <H2 className="mb-2">WCAG nedir ve POUR ilkeleri</H2>
      <Sub className="max-w-3xl mb-6">
        WCAG (Web Content Accessibility Guidelines), W3C tarafından yayımlanan
        uluslararası erişilebilirlik standardıdır. 2.2 sürümü 2023&apos;te
        yayımlandı. Tüm kurallar dört temel ilkenin (POUR) altında toplanır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { k: "P", t: "Perceivable", tr: "Algılanabilir", d: "Bilgi duyulardan en az biriyle alınabilmeli (alt text, altyazı).", icon: Eye, accent: "#ec4899" },
          { k: "O", t: "Operable", tr: "Çalıştırılabilir", d: "Arayüz klavye dahil her giriş yöntemiyle kullanılabilmeli.", icon: MousePointer2, accent: "#a855f7" },
          { k: "U", t: "Understandable", tr: "Anlaşılabilir", d: "İçerik ve işleyiş öngörülebilir, hatalar açıklayıcı olmalı.", icon: Brain, accent: "#3b82f6" },
          { k: "R", t: "Robust", tr: "Sağlam", d: "İçerik farklı tarayıcı ve yardımcı teknolojilerle çalışmalı.", icon: Gauge, accent: "#10b981" },
        ].map((p, i) => (
          <motion.div
            key={p.k}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="katas-card rounded-xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-white text-sm"
                style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent}aa)` }}
              >
                {p.k}
              </div>
              <p.icon className="w-4 h-4" style={{ color: p.accent }} />
            </div>
            <div className="text-sm font-bold text-white">{p.t}</div>
            <div className="text-[11px] font-mono uppercase tracking-wide mb-2" style={{ color: p.accent }}>{p.tr}</div>
            <p className="text-xs text-gray-400 leading-relaxed">{p.d}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 katas-card-rose rounded-xl p-4 flex items-start gap-3"
      >
        <ListChecks className="w-5 h-5 text-pink-300 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-300 leading-relaxed">
          Her ilkenin <strong className="text-white">A, AA, AAA</strong> uyum
          seviyeleri vardır. Sektörde ve çoğu yasal düzenlemede hedef genellikle
          <strong className="text-pink-300"> AA</strong> seviyesidir.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 05 · BÖLÜM 1 — ALT TEXT ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Alternatif Metin (alt text)"
      subtitle="Görme engelli bir kullanıcı görseli ekran okuyucudan dinler. Alt text, o görselin sesli karşılığıdır."
      bgGradient="linear-gradient(135deg, #ec4899 0%, #be185d 100%)"
      shadow="0 30px 80px -20px rgba(236,72,153,0.6)"
      icon={<ImageIcon className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 06 · ALT TEXT NEDİR ───── */
  () => (
    <SlideShell>
      <Eyebrow>Algılanabilir · alt niteliği</Eyebrow>
      <H2 className="mb-2">Ekran okuyucu bir görseli nasıl &quot;görür&quot;?</H2>
      <Sub className="max-w-3xl mb-6">
        Görme engelli kullanıcı sayfayı ekran okuyucu (NVDA, VoiceOver, TalkBack)
        ile sesli dinler. Görsel için yalnızca <span className="font-mono text-[#f9a8d4]">alt</span>
        {" "}metni okunur. Alt yoksa kullanıcı &quot;görsel&quot; ya da dosya adını duyar —
        bilgi kaybolur.
      </Sub>
      <CodeWindow title="iyi-alt.html">
        <div><span className="katas-code-comment">&lt;!-- Anlamlı görsel: amacı anlat --&gt;</span></div>
        <div>
          <span className="katas-code-tag">&lt;img</span>{" "}
          <span className="katas-code-attr">src</span>=<span className="katas-code-str">&quot;grafik.png&quot;</span>
        </div>
        <div className="pl-6">
          <span className="katas-code-attr">alt</span>=<span className="katas-code-str">&quot;2026 satışları çeyrek başına %12 arttı&quot;</span>
          <span className="katas-code-tag"> /&gt;</span>
        </div>
        <div className="mt-3"><span className="katas-code-comment">&lt;!-- Dekoratif görsel: boş alt ile gizle --&gt;</span></div>
        <div>
          <span className="katas-code-tag">&lt;img</span>{" "}
          <span className="katas-code-attr">src</span>=<span className="katas-code-str">&quot;ayrac-cizgi.svg&quot;</span>{" "}
          <span className="katas-code-attr">alt</span>=<span className="katas-code-str">&quot;&quot;</span>
          <span className="katas-code-tag"> /&gt;</span>
        </div>
        <div className="mt-3 katas-code-comment">// Figma&apos;da: görsele &quot;Alt text&quot; alanından ekle (sağ panel)</div>
      </CodeWindow>
    </SlideShell>
  ),

  /* ───── 07 · ALT TEXT İYİ/KÖTÜ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Alt text · iyi yazım</Eyebrow>
      <H2 className="mb-2">Aynı görsel, üç farklı alt</H2>
      <Sub className="max-w-3xl mb-8">
        İyi alt text kısa, görselin <span className="text-white">amacını</span> ve
        taşıdığı bilgiyi aktarır; &quot;resim&quot; gibi sözcükleri tekrarlamaz.
      </Sub>
      <AltTextCompare />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 max-w-5xl mx-auto text-xs"
      >
        <div className="flex items-center gap-2 text-gray-400">
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Kısa ve amaca yönelik (genelde &lt; 125 karakter)
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> &quot;Resim/görsel&quot; sözcüğü gereksiz
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Dekoratifse boş alt (alt=&quot;&quot;)
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 08 · BÖLÜM 2 — KONTRAST ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Renk Kontrastı"
      subtitle="Metin arka planından yeterince ayrışmazsa az gören ya da güneş altındaki kullanıcı için okunmaz hale gelir."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #6d28d9 100%)"
      shadow="0 30px 80px -20px rgba(168,85,247,0.55)"
      icon={<Contrast className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 09 · KONTRAST ORANI + EŞİKLER ───── */
  () => (
    <SlideShell>
      <Eyebrow>Algılanabilir · kontrast oranı</Eyebrow>
      <H2>Kontrast bir orandır, göz kararı değil</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Kontrast, metin rengi ile arka plan rengi arasındaki parlaklık farkının
        oranıdır; <span className="font-mono text-[#f9a8d4]">21:1</span> (siyah/beyaz) en yüksek,
        {" "}<span className="font-mono text-[#f9a8d4]">1:1</span> (aynı renk) en düşüktür.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ContrastCard
          pass
          ratio="14.8 : 1"
          text="Okunabilir metin"
          bg="#111111"
          fg="#ffffff"
          label="Kontrast oranı"
          delay={0}
        />
        <ContrastCard
          pass={false}
          ratio="1.6 : 1"
          text="Okunmaz metin"
          bg="#f9a8d4"
          fg="#fbcfe8"
          label="Kontrast oranı"
          delay={0.12}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="katas-card-rose rounded-xl p-5 flex flex-col justify-center"
        >
          <div className="text-xs font-mono uppercase text-pink-300 mb-2">WCAG AA eşikleri</div>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex justify-between"><span>Normal metin</span><span className="font-bold text-white">≥ 4.5 : 1</span></div>
            <div className="flex justify-between"><span>Büyük metin (≥ 24px)</span><span className="font-bold text-white">≥ 3 : 1</span></div>
            <div className="flex justify-between"><span>UI bileşeni / ikon</span><span className="font-bold text-white">≥ 3 : 1</span></div>
            <div className="flex justify-between border-t border-white/10 pt-2"><span>AAA (normal)</span><span className="font-bold text-white">≥ 7 : 1</span></div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="katas-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3"
      >
        <Sparkles className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
        <span>
          Ölçüm araçları: tarayıcıda <span className="text-white">DevTools</span>, Figma eklentisi
          <span className="text-white"> Contrast / Stark</span>, veya
          <span className="text-white"> WebAIM Contrast Checker</span>. Renk seçerken oran otomatik çıkar.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 10 · RENGE TEK BAŞINA GÜVENME ───── */
  () => (
    <SlideShell>
      <Eyebrow>Algılanabilir · renk tek başına yetmez</Eyebrow>
      <H2 className="mb-2">Bilgiyi yalnız renkle anlatma</H2>
      <Sub className="max-w-3xl mb-6">
        Erkeklerin yaklaşık her on ikiden biri renk körüdür. &quot;Yeşil = başarılı,
        kırmızı = hata&quot; gibi yalnız renge dayalı bir ipucu, bu kullanıcılar için
        görünmez olur. Renge bir <span className="text-white">ikon, etiket veya desen</span> ekle.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="katas-card rounded-xl overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border-b border-red-500/30">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-xs font-mono uppercase text-red-300">Sadece renk</span>
          </div>
          <div className="bg-white p-5 space-y-2">
            <div className="text-[12px] font-bold text-gray-900 mb-1">Form durumu</div>
            <div className="text-[12px] px-3 py-2 rounded" style={{ color: "#16a34a" }}>E-posta</div>
            <div className="text-[12px] px-3 py-2 rounded" style={{ color: "#dc2626" }}>Parola</div>
            <p className="text-[10px] text-gray-500 mt-1">Renk körü kullanıcı hangisinin hatalı olduğunu ayırt edemez.</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="katas-card rounded-xl overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border-b border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono uppercase text-emerald-300">Renk + ikon + metin</span>
          </div>
          <div className="bg-white p-5 space-y-2">
            <div className="text-[12px] font-bold text-gray-900 mb-1">Form durumu</div>
            <div className="flex items-center gap-2 text-[12px] px-3 py-2 rounded bg-green-50" style={{ color: "#15803d" }}>
              <Check className="w-3.5 h-3.5" /> E-posta · Geçerli
            </div>
            <div className="flex items-center gap-2 text-[12px] px-3 py-2 rounded bg-red-50" style={{ color: "#b91c1c" }}>
              <X className="w-3.5 h-3.5" /> Parola · En az 8 karakter olmalı
            </div>
            <p className="text-[10px] text-gray-500 mt-1">İkon ve açıklayıcı metin, renkten bağımsız anlam taşır.</p>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 11 · BÖLÜM 3 — KLAVYE ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Klavye Navigasyonu"
      subtitle="Fareyi hiç kullanamayan bir kullanıcı sayfayı yalnız Tab, Enter ve ok tuşlarıyla gezer. Her etkileşim klavyeyle de çalışmalı."
      bgGradient="linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
      shadow="0 30px 80px -20px rgba(59,130,246,0.55)"
      icon={<Keyboard className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 12 · KLAVYE — TAB SIRASI + FOCUS ───── */
  () => (
    <SlideShell>
      <Eyebrow>Çalıştırılabilir · klavye erişimi</Eyebrow>
      <H2 className="mb-2">Tab ile gez, görünür halka ile gör</H2>
      <Sub className="max-w-3xl mb-6">
        Klavye kullanıcısı odağın (focus) nerede olduğunu görmek zorunda. Her
        odaklanan öğenin görünür bir halkası olmalı ve Tab sırası okuma sırasıyla
        eşleşmeli.
      </Sub>
      <KeyboardNavMockup />
    </SlideShell>
  ),

  /* ───── 13 · KLAVYE TUŞLARI + SKIP LINK ───── */
  () => (
    <SlideShell>
      <Eyebrow>Çalıştırılabilir · klavye kuralları</Eyebrow>
      <H2>Bilinmesi gereken tuşlar ve iki kural</H2>
      <Sub className="mt-3 max-w-3xl">
        Standart tuşlar her sitede aynı çalışmalı; kullanıcı yeni bir tuş düzeni
        öğrenmek zorunda kalmamalı.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 katas-card rounded-xl overflow-hidden"
      >
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-white/5 text-[11px] font-mono uppercase tracking-wider text-gray-400">
              <th className="px-4 py-3" style={{ width: "22%" }}>Tuş</th>
              <th className="px-4 py-3">Ne yapar?</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {[
              { k: "Tab", v: "Bir sonraki etkileşimli öğeye odaklan." },
              { k: "Shift + Tab", v: "Bir önceki öğeye geri dön." },
              { k: "Enter", v: "Bağlantıyı veya butonu etkinleştir." },
              { k: "Boşluk (Space)", v: "Butona bas, onay kutusunu işaretle." },
              { k: "Ok tuşları", v: "Menü, sekme, radyo grubu içinde gez." },
              { k: "Esc", v: "Açılır pencereyi veya menüyü kapat." },
            ].map((r) => (
              <tr key={r.k} className="border-t border-white/5">
                <td className="px-4 py-3"><span className="font-mono text-[#f9a8d4]">{r.k}</span></td>
                <td className="px-4 py-3">{r.v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="katas-card rounded-lg p-4 flex items-start gap-3"
        >
          <ArrowRight className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-300">
            <span className="text-white font-semibold">Skip link:</span> sayfa başında gizli bir
            &quot;İçeriğe atla&quot; bağlantısı; Tab&apos;a basınca görünür ve menüyü atlatır.
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="katas-card rounded-lg p-4 flex items-start gap-3"
        >
          <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-300">
            <span className="text-white font-semibold">Focus tuzağı:</span> bir bileşene girip
            çıkamamak. Modal kapatılabilmeli; Tab modaldan dışarı &quot;kapanmadan&quot; çıkmamalı.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 14 · DENETİM TABLOSU (3 TEMEL ÖZET) ───── */
  () => (
    <SlideShell>
      <Eyebrow>Hızlı denetim · üç temel</Eyebrow>
      <H2>Her ekranda kendine sor</H2>
      <Sub className="mt-3 max-w-3xl">
        Tasarımı teslim etmeden önce bu üç soruyu geçir. Çoğu erişilebilirlik
        sorunu bu kontrol listesiyle erken yakalanır.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 katas-card rounded-xl overflow-hidden"
      >
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-white/5 text-[11px] font-mono uppercase tracking-wider text-gray-400">
              <th className="px-4 py-3" style={{ width: "20%" }}>Konu</th>
              <th className="px-4 py-3" style={{ width: "44%" }}>Soru</th>
              <th className="px-4 py-3">Geçer ölçüt (AA)</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            <tr className="border-t border-white/5">
              <td className="px-4 py-3 text-white font-semibold">Alt text</td>
              <td className="px-4 py-3">Her anlamlı görselin amacını anlatan bir alt&apos;ı var mı?</td>
              <td className="px-4 py-3"><span className="text-emerald-300">Var · dekoratifte boş</span></td>
            </tr>
            <tr className="border-t border-white/5">
              <td className="px-4 py-3 text-white font-semibold">Kontrast</td>
              <td className="px-4 py-3">Metin arka planından yeterince ayrışıyor mu?</td>
              <td className="px-4 py-3"><span className="text-emerald-300">≥ 4.5:1 (büyük 3:1)</span></td>
            </tr>
            <tr className="border-t border-white/5">
              <td className="px-4 py-3 text-white font-semibold">Klavye</td>
              <td className="px-4 py-3">Fareyi çekince her şey hâlâ kullanılabiliyor mu?</td>
              <td className="px-4 py-3"><span className="text-emerald-300">Tam erişim + görünür focus</span></td>
            </tr>
            <tr className="border-t border-white/5">
              <td className="px-4 py-3 text-white font-semibold">Renk</td>
              <td className="px-4 py-3">Bilgi yalnız renge mi dayanıyor?</td>
              <td className="px-4 py-3"><span className="text-emerald-300">Hayır · ikon/metin de var</span></td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 15 · UYGULAMALI LAB ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Bir ekranı erişilebilir hale getir</H2>
      <Sub className="mt-3 max-w-3xl">
        Önceki haftalarda çizdiğin bir Figma ekranını al ve dört adımda denetle.
        Sonraki derse öncesi/sonrası ekran görüntüleriyle gel.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: ImageIcon, title: "Alt text ekle", desc: "Tasarımdaki anlamlı her görsele Figma'nın alt text alanından açıklama yaz; dekoratiflere boş bırak.", accent: "#ec4899" },
          { icon: Contrast, title: "Kontrastı ölç", desc: "Stark / Contrast eklentisiyle tüm metinleri tara; AA'yı geçmeyen rengi koyulaştır.", accent: "#a855f7" },
          { icon: Keyboard, title: "Tab sırasını çiz", desc: "Etkileşimli öğeleri 1-2-3 diye numaralandır; sıra okuma sırasıyla aynı mı kontrol et.", accent: "#3b82f6" },
          { icon: Volume2, title: "Ekran okuyucu dene", desc: "VoiceOver (Mac) veya NVDA (Windows) ile bir ekranı sesli gez; ne duyduğunu not al.", accent: "#10b981" },
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 katas-card-rose rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <Target className="w-4 h-4 text-pink-300 mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Teslim:</span> bir ekranın öncesi/sonrası görseli + bulduğun
          en az üç sorunu ve düzeltmeyi 3-5 cümlede açıkla.
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
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{ background: "linear-gradient(135deg,#ec4899,#be185d)", boxShadow: "0 30px 80px -20px rgba(236,72,153,0.6)" }}
        >
          <Accessibility className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>13. hafta tamamlandı · sıradaki: Tasarım Sistemi</Eyebrow>
        <H1>
          <span className="katas-shimmer">Tutarlı · Yeniden Kullanılabilir</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta tek tek ekranları erişilebilir yaptık. Hafta 14&apos;te bunları
          bir tasarım sistemine bağlıyoruz: renk token&apos;ları, tipografi ölçeği
          ve yeniden kullanılabilir bileşenler — erişilebilirlik baştan içine
          gömülü olacak.
        </Sub>
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
            <div className="text-white font-semibold">Figma + bir ekran</div>
            <div className="text-sm text-gray-400">labı yapılmış getir</div>
          </div>
          <div className="katas-card rounded-xl p-5">
            <ListChecks className="w-5 h-5 text-[#3b82f6] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Denetim raporu</div>
            <div className="text-sm text-gray-400">öncesi/sonrası + 3 bulgu</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Erişilebilirlik ek değil, tasarımın kendisidir</span>
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
          BVA 2245 · 13. Hafta · Erişilebilirlik (WCAG 2.2)
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
