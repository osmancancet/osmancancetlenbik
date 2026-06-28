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
  GitBranch,
  Split,
  Equal,
  ToggleRight,
  ListTree,
  Workflow,
  AlertTriangle,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  CheckCircle2,
  Sparkles,
  Zap,
  Hash,
  Layers,
  Calendar,
  Users,
  FileText,
  Sigma,
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
        <div className="absolute inset-0 prog-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#5fa8e0]"
    >
      <span className="w-8 h-px bg-[#5fa8e0]" />
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
  accent = "#3776ab",
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
      className="prog-card prog-card-hover rounded-xl p-6 transition-all"
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

/* ---- Code Editor Mockup (VS Code style) ---------------------- */

type CodeLine = ReactNode;

function CodeEditor({
  title,
  tabs,
  activeTab,
  lines,
  terminal,
  highlight = [],
}: {
  title: string;
  tabs: string[];
  activeTab: string;
  lines: CodeLine[];
  terminal?: ReactNode;
  highlight?: number[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="prog-window-chrome w-full"
    >
      <div className="prog-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-semibold flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d0d0d", color: "#9cdcfe" }}
        >
          <span className="w-5 h-5 rounded-sm prog-py-tile flex items-center justify-center text-[10px]">
            Py
          </span>
          <span>{title}</span>
        </div>
      </div>

      <div className="prog-editor-tabbar flex">
        {tabs.map((t) => (
          <div
            key={t}
            className={`prog-editor-tab ${
              t === activeTab ? "prog-editor-tab-active" : ""
            }`}
          >
            <span
              className="w-3 h-3 rounded-sm"
              style={{
                background: t.endsWith(".py")
                  ? "#3776ab"
                  : t.endsWith(".md")
                  ? "#5fa8e0"
                  : "#ffd43b",
              }}
            />
            {t}
          </div>
        ))}
      </div>

      <div className="prog-editor flex">
        <div className="prog-editor-gutter px-3 py-3 select-none">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <div className="flex-1 px-4 py-3 overflow-x-auto">
          {lines.map((line, i) => (
            <div
              key={i}
              className={`whitespace-pre ${
                highlight.includes(i + 1) ? "prog-line-hl" : ""
              }`}
            >
              {line || " "}
            </div>
          ))}
        </div>
      </div>

      {terminal && (
        <div className="prog-terminal px-4 py-3">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            TERMİNAL
          </div>
          {terminal}
        </div>
      )}
    </motion.div>
  );
}

/* ---- Decision flowchart (sınav notu örneği) ------------------ */

function DecisionFlowchart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="prog-flow-bg p-6 w-full"
    >
      <svg viewBox="0 0 760 470" className="w-full h-auto">
        <defs>
          <marker
            id="arr5"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="#5fa8e0" />
          </marker>
          <linearGradient id="gBlue5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3776ab" />
            <stop offset="100%" stopColor="#2c5d88" />
          </linearGradient>
          <linearGradient id="gYellow5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd43b" />
            <stop offset="100%" stopColor="#e6a800" />
          </linearGradient>
          <linearGradient id="gGreen5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ec9b0" />
            <stop offset="100%" stopColor="#2f8a76" />
          </linearGradient>
        </defs>

        {/* Başla */}
        <ellipse cx="120" cy="40" rx="70" ry="22" fill="url(#gGreen5)" stroke="#4ec9b0" strokeWidth="1.5" />
        <text x="120" y="46" textAnchor="middle" fill="#0a0a0a" fontSize="14" fontWeight="700">
          Başla · not al
        </text>

        {/* Karar 1: not >= 90 */}
        <polygon points="120,90 240,150 120,210 0,150" fill="url(#gBlue5)" stroke="#5fa8e0" strokeWidth="1.5" />
        <text x="120" y="148" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">
          not &gt;= 90 ?
        </text>

        {/* AA çıktısı */}
        <polygon points="270,120 410,120 390,180 250,180" fill="url(#gYellow5)" stroke="#ffd43b" strokeWidth="1.5" />
        <text x="330" y="156" textAnchor="middle" fill="#1a1a1a" fontSize="13" fontWeight="600">
          &quot;AA&quot; yaz
        </text>

        {/* Karar 2: not >= 70 */}
        <polygon points="120,250 240,310 120,370 0,310" fill="url(#gBlue5)" stroke="#5fa8e0" strokeWidth="1.5" />
        <text x="120" y="308" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">
          not &gt;= 70 ?
        </text>

        {/* BB çıktısı */}
        <polygon points="270,280 410,280 390,340 250,340" fill="url(#gYellow5)" stroke="#ffd43b" strokeWidth="1.5" />
        <text x="330" y="316" textAnchor="middle" fill="#1a1a1a" fontSize="13" fontWeight="600">
          &quot;BB&quot; yaz
        </text>

        {/* FF çıktısı (else) */}
        <polygon points="40,400 200,400 180,450 20,450" fill="url(#gYellow5)" stroke="#ffd43b" strokeWidth="1.5" />
        <text x="110" y="430" textAnchor="middle" fill="#1a1a1a" fontSize="13" fontWeight="600">
          &quot;FF&quot; yaz (else)
        </text>

        {/* Bitir */}
        <ellipse cx="600" cy="310" rx="70" ry="22" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
        <text x="600" y="316" textAnchor="middle" fill="white" fontSize="14" fontWeight="700">
          Bitir
        </text>

        {/* Oklar */}
        <line x1="120" y1="62" x2="120" y2="88" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr5)" />
        <line x1="240" y1="150" x2="248" y2="150" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr5)" />
        <line x1="120" y1="210" x2="120" y2="248" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr5)" />
        <line x1="240" y1="310" x2="248" y2="310" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr5)" />
        <line x1="120" y1="370" x2="115" y2="398" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr5)" />
        {/* çıktılardan bitire */}
        <line x1="410" y1="150" x2="560" y2="295" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr5)" />
        <line x1="410" y1="310" x2="528" y2="310" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr5)" />
        <line x1="200" y1="425" x2="555" y2="328" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr5)" />

        {/* Etiketler */}
        <text x="200" y="120" fill="#86efac" fontSize="12" fontWeight="700">Evet</text>
        <text x="60" y="240" fill="#fca5a5" fontSize="12" fontWeight="700">Hayır</text>
        <text x="200" y="280" fill="#86efac" fontSize="12" fontWeight="700">Evet</text>
        <text x="60" y="396" fill="#fca5a5" fontSize="12" fontWeight="700">Hayır</text>
      </svg>
      <div className="text-[11px] text-gray-500 text-center font-mono mt-2">
        Her karar bir sonraki koşula bağlanır — bu zincir koddaki if / elif / else&apos;in ta kendisi.
      </div>
    </motion.div>
  );
}

/* ---- Bölüm ayırıcı ------------------------------------------- */

function SectionDivider({
  num,
  total,
  title,
  subtitle,
  glowClass,
  icon,
}: {
  num: string;
  total: string;
  title: string;
  subtitle: string;
  glowClass: string;
  icon: ReactNode;
}) {
  return (
    <SlideShell bgPattern={false}>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 prog-pulse ${glowClass}`}
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
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ─────────────────  1 · KAPAK  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 1101 · 5. Hafta · Bahar Dönemi</Eyebrow>
        <H1>
          <span className="prog-shimmer">Karar ve Kontrol Yapıları</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Programa &quot;eğer şu olursa şunu yap&quot; demeyi öğreniyoruz — koşullarla dallanan akış.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-14 max-w-3xl mx-auto"
        >
          {[
            { name: "Karşılaştırma", tag: "==", color: "#3776ab", desc: "İki değeri kıyasla" },
            { name: "Mantıksal", tag: "and", color: "#ffd43b", desc: "Koşulları birleştir" },
            { name: "Dallanma", tag: "if", color: "#86efac", desc: "Akışı yönlendir" },
          ].map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="prog-card rounded-xl p-5"
              style={{ borderColor: `${l.color}55` }}
            >
              <div
                className="w-12 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center text-[12px] font-mono font-bold"
                style={{ background: `${l.color}22`, color: l.color, border: `1px solid ${l.color}66` }}
              >
                {l.tag}
              </div>
              <div className="text-white font-semibold text-sm">{l.name}</div>
              <div className="text-[11px] text-gray-500 mt-1">{l.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 text-[11px] font-mono text-gray-600 uppercase tracking-[0.3em]"
        >
          Öğr. Gör. · MCBÜ MYO · Bilgisayar Programcılığı
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2 · GEÇEN HAFTADAN KÖPRÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 4. haftadan 5. haftaya</Eyebrow>
      <H2>Değerleri tanıdık; şimdi onlarla karar veriyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta operatörlerle (aritmetik, atama, karşılaştırma) değerleri hesapladık.
        Bu hafta o karşılaştırmaların sonucunu kullanıp programın <span className="text-white font-semibold">hangi
        satırları çalıştıracağına</span> karar veriyoruz. Akış artık tek bir düz çizgi değil — dallanıyor.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5fa8e0]">
            <Sigma className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Geçen hafta · operatörler</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />Aritmetik: + − * / // % **</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />Karşılaştırma bir <span className="text-white">True / False</span> üretir.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />Ama henüz bu sonuçla bir şey yapmadık.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <GitBranch className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta · kontrol</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#86efac] flex-shrink-0" />True/False sonucuna göre satır çalıştır ya da atla.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#86efac] flex-shrink-0" />if · elif · else ile çoklu yolu yönet.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#86efac] flex-shrink-0" />Mantıksal operatörlerle koşulları birleştir.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: koşul → dallanma → seçim</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce bir koşulun nasıl True/False ürettiğini görüyoruz; sonra if/elif/else ile akışı dallandırıyoruz;
        en son match-case ve kısa biçimlerle çok yollu seçimi inceliyoruz. Sonunda uygulamalı bir alıştırma.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Koşul & Boolean", items: ["Karşılaştırma operatörleri", "and · or · not", "Doğruluk (truthiness)"], icon: Equal, accent: "#3776ab" },
          { range: "02", title: "if / elif / else", items: ["Girinti (indentation)", "Çok yollu dallanma", "Akış diyagramı karşılığı"], icon: GitBranch, accent: "#ffd43b" },
          { range: "03", title: "match & kısa biçim", items: ["match-case (3.10+)", "Üçlü (ternary) ifade", "İç içe koşul"], icon: Split, accent: "#86efac" },
        ].map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="prog-card rounded-xl p-6"
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

  /* ─────────────────  4 · BÖLÜM 1/3 · KOŞUL & BOOLEAN  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Koşul & Boolean"
      subtitle="Her karar bir soruyla başlar. O sorunun cevabı yalnızca iki değerden biridir: True ya da False."
      glowClass="prog-glow-blue"
      icon={<Equal className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  5 · KARŞILAŞTIRMA OPERATÖRLERİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Koşul</Eyebrow>
      <H2>Karşılaştırma operatörleri</H2>
      <Sub className="mt-3 max-w-3xl">
        Bir koşul, iki değeri karşılaştırıp bir <span className="prog-bool-true">True</span> veya{" "}
        <span className="prog-bool-false">False</span> üretir. En çok karıştırılan kısım:{" "}
        <span className="font-mono text-[#5fa8e0]">=</span> atamadır,{" "}
        <span className="font-mono text-[#5fa8e0]">==</span> ise eşitlik kontrolüdür.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 prog-card rounded-xl overflow-hidden"
      >
        <table className="prog-compare">
          <thead>
            <tr>
              <th style={{ width: "14%" }}>Operatör</th>
              <th style={{ width: "30%" }}>Anlamı</th>
              <th style={{ width: "28%" }}>Örnek (x = 7)</th>
              <th>Sonuç</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-mono text-[#5fa8e0]">==</td>
              <td>Eşit mi?</td>
              <td className="font-mono">x == 7</td>
              <td><span className="prog-bool-true">True</span></td>
            </tr>
            <tr>
              <td className="font-mono text-[#5fa8e0]">!=</td>
              <td>Eşit değil mi?</td>
              <td className="font-mono">x != 10</td>
              <td><span className="prog-bool-true">True</span></td>
            </tr>
            <tr>
              <td className="font-mono text-[#5fa8e0]">&gt;</td>
              <td>Büyük mü?</td>
              <td className="font-mono">x &gt; 10</td>
              <td><span className="prog-bool-false">False</span></td>
            </tr>
            <tr>
              <td className="font-mono text-[#5fa8e0]">&lt;</td>
              <td>Küçük mü?</td>
              <td className="font-mono">x &lt; 10</td>
              <td><span className="prog-bool-true">True</span></td>
            </tr>
            <tr>
              <td className="font-mono text-[#5fa8e0]">&gt;=</td>
              <td>Büyük veya eşit mi?</td>
              <td className="font-mono">x &gt;= 7</td>
              <td><span className="prog-bool-true">True</span></td>
            </tr>
            <tr>
              <td className="font-mono text-[#5fa8e0]">&lt;=</td>
              <td>Küçük veya eşit mi?</td>
              <td className="font-mono">x &lt;= 6</td>
              <td><span className="prog-bool-false">False</span></td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  6 · MANTIKSAL OPERATÖRLER & TRUTHINESS  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Boolean</Eyebrow>
      <H2>Koşulları birleştir: and · or · not</H2>
      <Sub className="mt-3 max-w-3xl">
        Tek bir karşılaştırma çoğu zaman yetmez. Mantıksal operatörler birden çok koşulu tek bir
        True/False&apos;a indirger.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Layers}
          title="and"
          desc="İki koşul da doğruysa True. (yas >= 18) and (bilet == True) → ikisi de şart."
          delay={0.0}
          accent="#3776ab"
        />
        <FeatureCard
          icon={Split}
          title="or"
          desc="En az biri doğruysa True. (ogrenci) or (emekli) → indirim için biri yeterli."
          delay={0.1}
          accent="#ffd43b"
        />
        <FeatureCard
          icon={ToggleRight}
          title="not"
          desc="Sonucu tersine çevirir. not (kayitli) → kayıtlı DEĞİLse True olur."
          delay={0.2}
          accent="#86efac"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="prog-card rounded-xl p-5"
        >
          <div className="text-xs uppercase tracking-wider text-[#5fa8e0] mb-3 font-mono">
            Doğruluk tablosu · and / or
          </div>
          <table className="prog-compare">
            <thead>
              <tr><th>A</th><th>B</th><th>A and B</th><th>A or B</th></tr>
            </thead>
            <tbody>
              <tr><td>T</td><td>T</td><td><span className="prog-bool-true">True</span></td><td><span className="prog-bool-true">True</span></td></tr>
              <tr><td>T</td><td>F</td><td><span className="prog-bool-false">False</span></td><td><span className="prog-bool-true">True</span></td></tr>
              <tr><td>F</td><td>F</td><td><span className="prog-bool-false">False</span></td><td><span className="prog-bool-false">False</span></td></tr>
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="prog-card-yellow rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-[#ffd43b]" />
            <span className="text-white font-semibold text-sm">Doğruluk (truthiness)</span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            Python&apos;da koşula bool olmayan değer de yazılabilir. <span className="text-white">Boş</span> şeyler
            False sayılır: <span className="font-mono text-[#ce9178]">0</span>,{" "}
            <span className="font-mono text-[#ce9178]">&quot;&quot;</span>,{" "}
            <span className="font-mono text-[#ce9178]">[]</span>,{" "}
            <span className="font-mono text-[#ce9178]">None</span>. Dolu olan her şey True sayılır.
          </p>
          <div className="mt-3 font-mono text-[12px] text-gray-300 bg-black/30 rounded px-3 py-2">
            <span className="tok-keyword">if</span> isim<span className="tok-punct">:</span>{"  "}
            <span className="tok-comment"># isim boş değilse çalışır</span>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  7 · BÖLÜM 2/3 · if / elif / else  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="if · elif · else"
      subtitle="Koşul True ise bir bloğu çalıştır, değilse diğerine geç. Programın akışını dallandıran temel yapı."
      glowClass="prog-glow-yellow"
      icon={<GitBranch className="w-14 h-14 text-[#1a1a1a]" />}
    />
  ),

  /* ─────────────────  8 · if / elif / else KODU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · Dallanma</Eyebrow>
      <H2 className="mb-2">Söz dizimi: koşul, iki nokta, girinti</H2>
      <Sub className="max-w-3xl">
        Koşul satırı <span className="font-mono text-[#5fa8e0]">:</span> ile biter; ona ait blok ise{" "}
        <span className="text-white font-semibold">girintili</span> yazılır. elif istediğin kadar olabilir;
        else en fazla bir tanedir ve sona gelir.
      </Sub>

      <div className="mt-6">
        <CodeEditor
          title="not.py — Visual Studio Code"
          tabs={["not.py", "README.md"]}
          activeTab="not.py"
          highlight={[2, 4, 6, 8]}
          lines={[
            <>
              <span className="tok-var">puan</span>
              <span className="tok-operator"> = </span>
              <span className="tok-builtin">int</span>
              <span className="tok-punct">(</span>
              <span className="tok-builtin">input</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;Puan: &quot;</span>
              <span className="tok-punct">))</span>
            </>,
            <>
              <span className="tok-keyword">if</span>{" "}
              <span className="tok-var">puan</span>
              <span className="tok-operator"> &gt;= </span>
              <span className="tok-number">90</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"    "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;AA — pekiyi&quot;</span>
              <span className="tok-punct">)</span>
            </>,
            <>
              <span className="tok-keyword">elif</span>{" "}
              <span className="tok-var">puan</span>
              <span className="tok-operator"> &gt;= </span>
              <span className="tok-number">70</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"    "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;BB — iyi&quot;</span>
              <span className="tok-punct">)</span>
            </>,
            <>
              <span className="tok-keyword">elif</span>{" "}
              <span className="tok-var">puan</span>
              <span className="tok-operator"> &gt;= </span>
              <span className="tok-number">50</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"    "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;CC — geçer&quot;</span>
              <span className="tok-punct">)</span>
            </>,
            <>
              <span className="tok-keyword">else</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"    "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;FF — kaldı&quot;</span>
              <span className="tok-punct">)</span>
            </>,
          ]}
          terminal={
            <div className="leading-relaxed">
              <div>
                <span className="prog-terminal-prompt">user@mcbu</span>
                <span className="text-gray-500"> $ </span>
                <span className="prog-terminal-out">python not.py</span>
              </div>
              <div className="prog-terminal-out">
                Puan: <span className="prog-terminal-user">76</span>
              </div>
              <div className="prog-terminal-out">BB — iyi</div>
              <div>
                <span className="prog-terminal-prompt">user@mcbu</span>
                <span className="text-gray-500"> $ </span>
                <span className="animate-pulse">▌</span>
              </div>
            </div>
          }
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  9 · GİRİNTİ HATASI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · Sık yapılan hata</Eyebrow>
      <H2 className="mb-2">Girinti Python&apos;da zorunludur</H2>
      <Sub className="max-w-3xl">
        Çoğu dil bloğu süslü parantezle ayırır; Python ise <span className="text-white font-semibold">girintiyle</span>.
        Girintiyi unutmak ya da boşlukla tab&apos;ı karıştırmak çalışma zamanından önce hata verir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <CodeEditor
          title="hatali.py — IndentationError"
          tabs={["hatali.py"]}
          activeTab="hatali.py"
          lines={[
            <>
              <span className="tok-keyword">if</span>{" "}
              <span className="tok-var">x</span>
              <span className="tok-operator"> &gt; </span>
              <span className="tok-number">0</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;pozitif&quot;</span>
              <span className="tok-punct">)</span>
              {"  "}
              <span className="tok-comment"># girinti yok!</span>
            </>,
          ]}
          terminal={
            <div className="leading-relaxed">
              <div className="text-red-400">IndentationError: expected an</div>
              <div className="text-red-400">indented block after &apos;if&apos; statement</div>
            </div>
          }
        />
        <CodeEditor
          title="dogru.py — çalışır"
          tabs={["dogru.py"]}
          activeTab="dogru.py"
          highlight={[2]}
          lines={[
            <>
              <span className="tok-keyword">if</span>{" "}
              <span className="tok-var">x</span>
              <span className="tok-operator"> &gt; </span>
              <span className="tok-number">0</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"    "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;pozitif&quot;</span>
              <span className="tok-punct">)</span>
              {"  "}
              <span className="tok-comment"># 4 boşluk girinti</span>
            </>,
          ]}
          terminal={
            <div className="leading-relaxed">
              <div className="prog-terminal-out">pozitif</div>
            </div>
          }
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 prog-card rounded-xl p-4 flex items-center gap-4"
      >
        <AlertTriangle className="w-6 h-6 text-[#ffd43b] flex-shrink-0" />
        <div className="text-sm text-gray-300">
          <span className="text-white font-semibold">Kural:</span> Bloktaki tüm satırlar aynı miktarda
          girintili olmalı. Standart 4 boşluktur; editörün tab&apos;ı boşluğa çevirsin.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  10 · AKIŞ DİYAGRAMI KARŞILIĞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · Görselleştirme</Eyebrow>
      <H2>Aynı not programı, akış diyagramı olarak</H2>
      <Sub className="mt-3 max-w-3xl">
        Koddaki her <span className="font-mono text-[#5fa8e0]">if/elif</span> bir karar (eşkenar dörtgen);
        her blok bir çıktıdır. Diyagramı okuyabilmek, kod yazmadan önce mantığı doğrulamanı sağlar.
      </Sub>

      <div className="mt-5 max-w-4xl mx-auto">
        <DecisionFlowchart />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  11 · BÖLÜM 3/3 · SEÇİM & KISA BİÇİM  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="match & Kısa Biçim"
      subtitle="Çok sayıda seçenek varsa match-case okunabilirliği artırır; tek satırlık kararlar için üçlü ifade vardır."
      glowClass="prog-glow-purple"
      icon={<Split className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  12 · match-case  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 3 · match-case (Python 3.10+)</Eyebrow>
      <H2 className="mb-2">Çok dallı seçimde temiz alternatif</H2>
      <Sub className="max-w-3xl">
        Bir değişkeni birçok sabit değerle karşılaştıracaksan uzun bir elif zinciri yerine{" "}
        <span className="font-mono text-[#5fa8e0]">match</span> kullanılabilir.{" "}
        <span className="font-mono text-[#5fa8e0]">case _</span> diğer dillerdeki &quot;default&quot;a karşılık gelir.
      </Sub>

      <div className="mt-6">
        <CodeEditor
          title="menu.py — Visual Studio Code"
          tabs={["menu.py"]}
          activeTab="menu.py"
          highlight={[2, 3, 5, 7]}
          lines={[
            <>
              <span className="tok-var">secim</span>
              <span className="tok-operator"> = </span>
              <span className="tok-builtin">input</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;İşlem (+ - * /): &quot;</span>
              <span className="tok-punct">)</span>
            </>,
            <>
              <span className="tok-keyword">match</span>{" "}
              <span className="tok-var">secim</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"    "}
              <span className="tok-keyword">case</span>{" "}
              <span className="tok-string">&quot;+&quot;</span>
              <span className="tok-punct">:</span>{"  "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;toplama&quot;</span>
              <span className="tok-punct">)</span>
            </>,
            <>
              {"    "}
              <span className="tok-keyword">case</span>{" "}
              <span className="tok-string">&quot;-&quot;</span>
              <span className="tok-punct">:</span>{"  "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;çıkarma&quot;</span>
              <span className="tok-punct">)</span>
            </>,
            <>
              {"    "}
              <span className="tok-keyword">case</span>{" "}
              <span className="tok-string">&quot;*&quot;</span>{" "}
              <span className="tok-operator">|</span>{" "}
              <span className="tok-string">&quot;x&quot;</span>
              <span className="tok-punct">:</span>{"  "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;çarpma&quot;</span>
              <span className="tok-punct">)</span>
            </>,
            <>
              {"    "}
              <span className="tok-keyword">case</span>{" "}
              <span className="tok-string">&quot;/&quot;</span>
              <span className="tok-punct">:</span>{"  "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;bölme&quot;</span>
              <span className="tok-punct">)</span>
            </>,
            <>
              {"    "}
              <span className="tok-keyword">case</span>{" "}
              <span className="tok-var">_</span>
              <span className="tok-punct">:</span>{"      "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;geçersiz işlem&quot;</span>
              <span className="tok-punct">)</span>
            </>,
          ]}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-xs text-gray-500 font-mono text-center"
      >
        <span className="text-[#5fa8e0]">|</span> ile birden çok değeri aynı case&apos;e bağlayabilirsin (&quot;*&quot; veya &quot;x&quot;).
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  13 · ÜÇLÜ İFADE & İÇ İÇE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 3 · Kısa biçim</Eyebrow>
      <H2>Üçlü ifade ve iç içe koşul</H2>
      <Sub className="mt-3 max-w-3xl">
        Basit bir &quot;şu ya da bu&quot; ataması için dört satırlık if/else yerine tek satırlık{" "}
        <span className="text-white">üçlü (ternary)</span> ifade kullanılır. Karmaşık kararlar ise iç içe yazılabilir
        — ama okunabilirliği bozmamaya dikkat.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7">
        <CodeEditor
          title="ternary.py — tek satır karar"
          tabs={["ternary.py"]}
          activeTab="ternary.py"
          highlight={[2]}
          lines={[
            <>
              <span className="tok-var">yas</span>
              <span className="tok-operator"> = </span>
              <span className="tok-number">20</span>
            </>,
            <>
              <span className="tok-var">durum</span>
              <span className="tok-operator"> = </span>
              <span className="tok-string">&quot;yetişkin&quot;</span>{" "}
              <span className="tok-keyword">if</span>{" "}
              <span className="tok-var">yas</span>
              <span className="tok-operator"> &gt;= </span>
              <span className="tok-number">18</span>{" "}
              <span className="tok-keyword">else</span>{" "}
              <span className="tok-string">&quot;çocuk&quot;</span>
            </>,
            <>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">durum</span>
              <span className="tok-punct">)</span>{"   "}
              <span className="tok-comment"># yetişkin</span>
            </>,
          ]}
        />
        <CodeEditor
          title="ic_ice.py — iç içe koşul"
          tabs={["ic_ice.py"]}
          activeTab="ic_ice.py"
          lines={[
            <>
              <span className="tok-keyword">if</span>{" "}
              <span className="tok-var">giris</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"    "}
              <span className="tok-keyword">if</span>{" "}
              <span className="tok-var">yetkili</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"        "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;panel açıldı&quot;</span>
              <span className="tok-punct">)</span>
            </>,
            <>
              {"    "}
              <span className="tok-keyword">else</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"        "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;yetki yok&quot;</span>
              <span className="tok-punct">)</span>
            </>,
            <>
              <span className="tok-keyword">else</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"    "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;önce giriş yap&quot;</span>
              <span className="tok-punct">)</span>
            </>,
          ]}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 prog-card rounded-xl p-4 flex items-center gap-4 max-w-4xl"
      >
        <Lightbulb className="w-6 h-6 text-[#ffd43b] flex-shrink-0" />
        <div className="text-sm text-gray-300">
          <span className="text-white font-semibold">İpucu:</span> İki koşul tek bir mantıkla birleşebiliyorsa
          (örn. <span className="font-mono text-[#5fa8e0]">giris and yetkili</span>) iç içe yazmak yerine{" "}
          <span className="font-mono text-[#5fa8e0]">and</span> kullan — daha okunaklı olur.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  14 · SIK HATALAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Dikkat · sık yapılan hatalar</Eyebrow>
      <H2>Karar yazarken en çok takılınan beş nokta</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu hataların çoğu mantık hatasıdır — program çalışır ama yanlış sonuç verir. Tanıyınca kolayca yakalanır.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 prog-card rounded-xl overflow-hidden"
      >
        <table className="prog-compare">
          <thead>
            <tr>
              <th style={{ width: "30%" }}>Hatalı</th>
              <th style={{ width: "30%" }}>Doğru</th>
              <th>Neden?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-mono text-[#fca5a5]">if x = 5:</td>
              <td className="font-mono text-[#86efac]">if x == 5:</td>
              <td><span className="font-mono text-[#5fa8e0]">=</span> atama yapar; karşılaştırma <span className="font-mono text-[#5fa8e0]">==</span> ister.</td>
            </tr>
            <tr>
              <td className="font-mono text-[#fca5a5]">if 18 &lt; yas &lt; 65</td>
              <td className="font-mono text-[#86efac]">aynısı geçerli</td>
              <td>Python zincirli karşılaştırmayı destekler — bu doğru, ama çoğu dilde değildir.</td>
            </tr>
            <tr>
              <td className="font-mono text-[#fca5a5]">if not x == 5</td>
              <td className="font-mono text-[#86efac]">if x != 5</td>
              <td>Daha okunaklı; aynı sonucu verir.</td>
            </tr>
            <tr>
              <td className="font-mono text-[#fca5a5]">elif (sırasız)</td>
              <td className="font-mono text-[#86efac]">geniş → dar sıra</td>
              <td>Önce <span className="font-mono">&gt;= 90</span>, sonra <span className="font-mono">&gt;= 70</span>; ters sıra hep ilk koşula düşer.</td>
            </tr>
            <tr>
              <td className="font-mono text-[#fca5a5]">if &quot;5&quot; == 5</td>
              <td className="font-mono text-[#86efac]">if int(x) == 5</td>
              <td>Metin ile sayı asla eşit değildir; tip dönüşümü gerekir.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · UYGULAMALI ALIŞTIRMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta sizin göreviniz</Eyebrow>
      <H2>Beş alıştırma · kendi makinende çöz</H2>
      <Sub className="mt-3 max-w-3xl">
        Karar yapıları ancak yazarak pekişir. Aşağıdaki beşini çöz, çalışan kodu ve çıktının ekran
        görüntüsünü sonraki derse getir.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-7 prog-card rounded-xl p-6 max-w-3xl mx-auto"
      >
        <div className="text-xs uppercase tracking-wider text-[#5fa8e0] mb-4 font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Görev listesi · Hafta 05
        </div>
        <div className="space-y-3">
          {[
            { t: "Çift / tek bul", d: "Bir sayı al; n % 2 == 0 ise &quot;çift&quot;, değilse &quot;tek&quot; yaz." },
            { t: "Sınav notu → harf", d: "Puanı al; if/elif/else ile AA-FF harf notunu yazdır." },
            { t: "En büyüğü bul", d: "Üç sayı al; and / or kullanarak en büyüğünü bul." },
            { t: "Giriş kontrolü", d: "Kullanıcı adı ve parolayı kontrol et; doğruysa &quot;hoş geldin&quot;." },
            { t: "Mini hesap makinesi", d: "İki sayı ve işlem al; match-case ile sonucu hesapla." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="flex items-start gap-3 bg-black/30 rounded-lg p-3"
            >
              <div className="w-6 h-6 rounded-md border border-[#5fa8e0]/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 text-[#5fa8e0]" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-white font-medium">{item.t}</div>
                <div
                  className="text-xs text-gray-400 mt-0.5"
                  dangerouslySetInnerHTML={{ __html: item.d }}
                />
              </div>
              <div className="text-[10px] font-mono text-gray-600 mt-1">
                {String(i + 1).padStart(2, "0")}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  16 · SIRADAKİ HAFTA + KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8 prog-glow-blue"
        >
          <Workflow className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>5. hafta tamamlandı · sıradaki: Döngüler</Eyebrow>
        <H1>
          <span className="prog-shimmer">Tekrar Eden İşler: Döngüler</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta &quot;karar&quot; verdik. Hafta 6&apos;da &quot;tekrar&quot;a geçiyoruz:{" "}
          <span className="font-mono text-[#5fa8e0]">for</span> ve{" "}
          <span className="font-mono text-[#5fa8e0]">while</span> ile bir işi koşula bağlı olarak
          defalarca çalıştırmak — koşul yapısının üstüne kurulur.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
          <FeatureCard
            icon={Zap}
            title="for döngüsü"
            desc="Belirli bir aralık veya liste üzerinde dönerek tekrar eder."
            accent="#3776ab"
            delay={0.1}
          />
          <FeatureCard
            icon={ListTree}
            title="while döngüsü"
            desc="Koşul True kaldığı sürece bloğu tekrarlar; karar yapısının kardeşi."
            accent="#ffd43b"
            delay={0.2}
          />
          <FeatureCard
            icon={Hash}
            title="break / continue"
            desc="Döngüyü erken bitirmek veya bir adımı atlamak için koşullu kontrol."
            accent="#86efac"
            delay={0.3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="prog-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#5fa8e0] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Perşembe</div>
            <div className="text-sm text-gray-400">09:55 — 12:30</div>
          </div>
          <div className="prog-card rounded-xl p-5">
            <Users className="w-5 h-5 text-[#5fa8e0] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Konum</div>
            <div className="text-white font-semibold">Amfi 1</div>
            <div className="text-sm text-gray-400">MCBÜ MYO</div>
          </div>
          <div className="prog-card rounded-xl p-5">
            <FileText className="w-5 h-5 text-[#5fa8e0] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">5 alıştırma</div>
            <div className="text-sm text-gray-400">kod + ekran görüntüsü</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>BVA 1101 · Programlama Temelleri · Bahar 2026</span>
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
            background: "linear-gradient(90deg, #3776ab, #5fa8e0, #ffd43b)",
            boxShadow: "0 0 16px rgba(55,118,171,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#5fa8e0]/70">
          BVA 1101 · 5. Hafta · Karar ve Kontrol Yapıları
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#5fa8e0]/50">
            <span className="text-[#5fa8e0]">
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
            className="p-1.5 text-gray-500 hover:text-[#5fa8e0] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#5fa8e0] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#5fa8e0]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(95,168,224,0.7)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#5fa8e0] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
