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
  FileText,
  Sigma,
  Brain,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  Repeat,
  ListOrdered,
  GitBranch,
  Split,
  ArrowDown,
  CheckCircle2,
  Layers,
  Users,
  Calendar,
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
}: {
  title: string;
  tabs: string[];
  activeTab: string;
  lines: CodeLine[];
  terminal?: ReactNode;
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
            <div key={i} className="whitespace-pre">
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

/* ---- Pseudocode block --------------------------------------- */

function Pseudocode({
  title,
  lines,
  delay = 0,
}: {
  title: string;
  lines: ReactNode[];
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="prog-pseudo p-5"
    >
      <div className="text-[10px] uppercase tracking-wider text-[#5fa8e0] mb-3 font-mono flex items-center gap-2">
        <ListOrdered className="w-4 h-4" />
        {title}
      </div>
      <div>
        {lines.map((l, i) => (
          <div key={i} className="flex gap-3 whitespace-pre-wrap">
            <span className="prog-pseudo-num select-none w-5 text-right flex-shrink-0">
              {i + 1}
            </span>
            <span className="flex-1">{l}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ---- Flowchart SVG — iki sayıdan büyüğünü bul ---------------- */

function FlowchartMax() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="prog-flow-bg p-6 w-full"
    >
      <svg viewBox="0 0 700 470" className="w-full h-auto">
        <defs>
          <marker
            id="arr2"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="#5fa8e0" />
          </marker>
          <linearGradient id="g2Blue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3776ab" />
            <stop offset="100%" stopColor="#2c5d88" />
          </linearGradient>
          <linearGradient id="g2Yellow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd43b" />
            <stop offset="100%" stopColor="#e6a800" />
          </linearGradient>
          <linearGradient id="g2Green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ec9b0" />
            <stop offset="100%" stopColor="#2f8a76" />
          </linearGradient>
        </defs>

        {/* Başla */}
        <ellipse cx="350" cy="38" rx="74" ry="22" fill="url(#g2Green)" stroke="#4ec9b0" strokeWidth="1.5" />
        <text x="350" y="44" textAnchor="middle" fill="#0a0a0a" fontSize="14" fontWeight="700">
          Başla
        </text>

        {/* a ve b al — paralelkenar (giriş) */}
        <polygon points="265,96 460,96 440,146 245,146" fill="url(#g2Yellow)" stroke="#ffd43b" strokeWidth="1.5" />
        <text x="352" y="126" textAnchor="middle" fill="#1a1a1a" fontSize="13" fontWeight="600">
          a ve b sayılarını al
        </text>

        {/* Karar — a > b ? */}
        <polygon points="350,180 475,250 350,320 225,250" fill="url(#g2Blue)" stroke="#5fa8e0" strokeWidth="1.5" />
        <text x="350" y="246" textAnchor="middle" fill="white" fontSize="14" fontWeight="700">
          a &gt; b ?
        </text>
        <text x="350" y="266" textAnchor="middle" fill="#dbeafe" fontSize="11">
          (a büyük mü?)
        </text>

        {/* Evet — a yaz */}
        <polygon points="110,348 260,348 240,398 90,398" fill="url(#g2Yellow)" stroke="#ffd43b" strokeWidth="1.5" />
        <text x="175" y="378" textAnchor="middle" fill="#1a1a1a" fontSize="13" fontWeight="600">
          a&apos;yı yazdır
        </text>

        {/* Hayır — b yaz */}
        <polygon points="445,348 600,348 580,398 425,398" fill="url(#g2Yellow)" stroke="#ffd43b" strokeWidth="1.5" />
        <text x="512" y="378" textAnchor="middle" fill="#1a1a1a" fontSize="13" fontWeight="600">
          b&apos;yi yazdır
        </text>

        {/* Bitir */}
        <ellipse cx="350" cy="440" rx="74" ry="22" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
        <text x="350" y="446" textAnchor="middle" fill="white" fontSize="14" fontWeight="700">
          Bitir
        </text>

        {/* Oklar */}
        <line x1="350" y1="60" x2="350" y2="94" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr2)" />
        <line x1="350" y1="148" x2="350" y2="178" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr2)" />
        <line x1="288" y1="288" x2="195" y2="346" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr2)" />
        <line x1="412" y1="288" x2="505" y2="346" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr2)" />
        <line x1="175" y1="400" x2="300" y2="434" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr2)" />
        <line x1="512" y1="400" x2="400" y2="434" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr2)" />

        {/* Dal etiketleri */}
        <text x="228" y="312" fill="#86efac" fontSize="12" fontWeight="700">
          Evet
        </text>
        <text x="452" y="312" fill="#fca5a5" fontSize="12" fontWeight="700">
          Hayır
        </text>
      </svg>
    </motion.div>
  );
}

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
        <Eyebrow>BVA 1101 · 2. Hafta · Bahar Dönemi</Eyebrow>
        <H1>
          <span className="prog-shimmer">Algoritmalar</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Algoritma türleri ve bir problemi adım adım algoritmaya dönüştürmek.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-14 max-w-3xl mx-auto"
        >
          {[
            { name: "Sıralı", icon: ListOrdered, color: "#3776ab", desc: "Adım adım, dallanmasız" },
            { name: "Koşullu", icon: Split, color: "#5fa8e0", desc: "Eğer–değilse kararı" },
            { name: "Döngülü", icon: Repeat, color: "#ffd43b", desc: "Tekrar eden adımlar" },
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
                className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center"
                style={{ background: `${l.color}22`, color: l.color, border: `1px solid ${l.color}66` }}
              >
                <l.icon className="w-5 h-5" />
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
      <Eyebrow>Köprü · 1. haftadan 2. haftaya</Eyebrow>
      <H2>Geçen hafta &ldquo;ne&rdquo;ydi; bu hafta &ldquo;nasıl&rdquo;</H2>
      <Sub className="mt-3 max-w-3xl">
        1. haftada algoritmanın ne olduğunu, beş temel özelliğini ve akış diyagramının
        dört sembolünü gördük. Bu hafta algoritmaları{" "}
        <span className="text-white font-semibold">türlerine</span> göre ayırıyor ve sıfırdan
        bir algoritmayı <span className="text-white font-semibold">nasıl kuracağımızı</span> çalışıyoruz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#5fa8e0] mb-3">
            Hatırla · Hafta 01
          </div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />Algoritma = sıralı, açık, sonlu adımlar</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />Sonluluk, kesinlik, girdi, çıktı, etkililik</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />Akış diyagramı: oval, dikdörtgen, dörtgen, paralelkenar</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-card-yellow rounded-xl p-6 flex items-center"
        >
          <div>
            <ArrowDown className="w-6 h-6 text-[#ffd43b] mb-2" />
            <div className="text-white font-semibold text-sm mb-1">Bu hafta nereye?</div>
            <div className="text-xs text-gray-300 leading-relaxed">
              Aynı &ldquo;adım adım&rdquo; fikrini farklı problem tiplerine uyguluyoruz: kimi
              düz akar, kimi dallanır, kimi tekrar eder.
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#5fa8e0] mb-3">
            Hedef · Hafta 02
          </div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#86efac] flex-shrink-0" />Üç algoritma türünü ayırt etmek</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#86efac] flex-shrink-0" />Sözde-kod (pseudocode) yazmak</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#86efac] flex-shrink-0" />Bir problemi 4 adımda çözmek</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: türler → kurma → temsil</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce algoritma türlerini tanıyoruz; sonra sıfırdan bir algoritmayı nasıl kuracağımızı
        adımlandırıyoruz; en son aynı algoritmayı sözde-kod ve akış diyagramıyla temsil ediyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Algoritma Türleri", items: ["Sıralı (sequential)", "Koşullu (selection)", "Döngülü (iteration)"], icon: GitBranch, accent: "#3776ab" },
          { range: "02", title: "Algoritma Kurma", items: ["Problemi anla", "Girdi–işlem–çıktı ayır", "Adımlara böl ve sırala"], icon: Brain, accent: "#5fa8e0" },
          { range: "03", title: "Temsil & Sınama", items: ["Sözde-kod (pseudocode)", "Akış diyagramı", "Kuru çalıştırma (trace)"], icon: ListOrdered, accent: "#ffd43b" },
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

  /* ─────────────────  4 · BÖLÜM 1/3 · ALGORİTMA TÜRLERİ  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Algoritma Türleri"
      subtitle="Her algoritma üç temel yapı taşının bir araya gelmesinden oluşur: sıralı, koşullu ve döngülü."
      glowClass="prog-glow-blue"
      icon={<GitBranch className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  5 · ÜÇ TEMEL YAPI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Türler</Eyebrow>
      <H2>Üç temel kontrol yapısı</H2>
      <Sub className="mt-3 max-w-3xl">
        1966&apos;da Böhm ve Jacopini, her programın yalnızca bu üç yapıyla kurulabileceğini
        gösterdi. Karmaşık bir algoritma da bunların iç içe geçmiş halidir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <FeatureCard
          icon={ListOrdered}
          title="1 · Sıralı (Sequence)"
          desc="Adımlar yukarıdan aşağıya, hiç dallanmadan ve tekrar etmeden bir kez işlenir."
          delay={0.0}
          accent="#3776ab"
        />
        <FeatureCard
          icon={Split}
          title="2 · Koşullu (Selection)"
          desc="Bir koşula bakılır; doğruysa bir yol, yanlışsa başka bir yol izlenir. Eğer–değilse."
          delay={0.1}
          accent="#5fa8e0"
        />
        <FeatureCard
          icon={Repeat}
          title="3 · Döngülü (Iteration)"
          desc="Bir adım bloğu, bir koşul sağlandığı veya belirli sayıda olduğu sürece tekrarlanır."
          delay={0.2}
          accent="#ffd43b"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 prog-card rounded-xl p-5 flex items-center gap-4"
      >
        <Layers className="w-6 h-6 text-[#5fa8e0] flex-shrink-0" />
        <div className="text-sm text-gray-300">
          <span className="text-white font-semibold">Birlikte kullanılır:</span> Gerçek
          programlar bu üç yapının iç içe geçmesidir — örneğin bir döngünün içinde bir koşul,
          onun içinde sıralı adımlar.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  6 · SÖZDE-KOD KARŞILAŞTIRMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Üç tür · sözde-kod ile</Eyebrow>
      <H2 className="mb-2">Aynı fikir, üç farklı yapı</H2>
      <Sub className="max-w-3xl mb-6">
        Sözde-kod, gerçek bir dilin söz dizimine takılmadan algoritmayı anlatmanın yoludur.
        Aşağıda üç yapının en sade hâli:
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Pseudocode
          title="Sıralı · alan hesabı"
          delay={0.0}
          lines={[
            <span key="a"><span className="prog-pseudo-kw">BAŞLA</span></span>,
            <span key="b">kenar oku</span>,
            <span key="c">alan ← kenar × kenar</span>,
            <span key="d">alan yaz</span>,
            <span key="e"><span className="prog-pseudo-kw">BİTİR</span></span>,
          ]}
        />
        <Pseudocode
          title="Koşullu · geçti/kaldı"
          delay={0.1}
          lines={[
            <span key="a"><span className="prog-pseudo-kw">BAŞLA</span></span>,
            <span key="b">not oku</span>,
            <span key="c"><span className="prog-pseudo-kw">EĞER</span> not ≥ 50 <span className="prog-pseudo-kw">İSE</span></span>,
            <span key="d">{"   "}&quot;Geçti&quot; yaz</span>,
            <span key="e"><span className="prog-pseudo-kw">DEĞİLSE</span></span>,
            <span key="f">{"   "}&quot;Kaldı&quot; yaz</span>,
            <span key="g"><span className="prog-pseudo-kw">BİTİR</span></span>,
          ]}
        />
        <Pseudocode
          title="Döngülü · 1..5 yaz"
          delay={0.2}
          lines={[
            <span key="a"><span className="prog-pseudo-kw">BAŞLA</span></span>,
            <span key="b">i ← 1</span>,
            <span key="c"><span className="prog-pseudo-kw">DÖNGÜ</span> i ≤ 5 oldukça</span>,
            <span key="d">{"   "}i yaz</span>,
            <span key="e">{"   "}i ← i + 1</span>,
            <span key="f"><span className="prog-pseudo-kw">DÖNGÜ SONU</span></span>,
            <span key="g"><span className="prog-pseudo-kw">BİTİR</span></span>,
          ]}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 text-center text-xs text-gray-500 font-mono"
      >
        Sözde-kod hiçbir dilde &ldquo;çalışmaz&rdquo; — ama her dile kolayca çevrilir.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  7 · BÖLÜM 2/3 · ALGORİTMA KURMA  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Algoritma Oluşturma"
      subtitle="Bir problemi alıp adım adım, doğrulanabilir bir çözüme dönüştürmenin dört aşaması."
      glowClass="prog-glow-yellow"
      icon={<Brain className="w-14 h-14 text-[#1a1a1a]" />}
    />
  ),

  /* ─────────────────  9 · 4 ADIMDA ALGORİTMA KURMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · Kurma yöntemi</Eyebrow>
      <H2>Algoritma kurmanın dört adımı</H2>
      <Sub className="mt-3 max-w-3xl">
        Acele edip koda atlamak yerine, önce problemi anlamak ve parçalara ayırmak — bir
        programcının en değerli alışkanlığıdır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { n: "01", t: "Problemi anla", d: "Ne isteniyor? Hangi durumlar olabilir? Sınır halleri (boş giriş, eşitlik) nelerdir?", icon: Brain, accent: "#3776ab" },
          { n: "02", t: "Girdi–İşlem–Çıktı ayır", d: "Hangi veri girilecek, ne hesaplanacak, ne döndürülecek? (IPO modeli)", icon: Split, accent: "#5fa8e0" },
          { n: "03", t: "Adımlara böl ve sırala", d: "Çözümü küçük, tek anlamlı adımlara böl; doğru sırayla diz.", icon: ListOrdered, accent: "#ffd43b" },
          { n: "04", t: "Sına ve düzelt", d: "Örnek girdilerle elle çalıştır (kuru çalıştırma); hatalı adımı düzelt.", icon: CheckCircle2, accent: "#86efac" },
        ].map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="prog-card prog-card-hover rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${s.accent}18`, border: `1px solid ${s.accent}55` }}
            >
              <s.icon className="w-5 h-5" style={{ color: s.accent }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-gray-500">{s.n}</span>
                <h3 className="text-base font-semibold text-white">{s.t}</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{s.d}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  10 · IPO MODELİ TABLOSU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Girdi · İşlem · Çıktı (IPO)</Eyebrow>
      <H2>Her problemi üç sütuna oturt</H2>
      <Sub className="mt-3 max-w-3xl">
        Algoritma kurmaya başlamadan önce problemi bu üç sütuna ayırmak, çoğu kafa karışıklığını
        baştan çözer.
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
              <th>Problem</th>
              <th>Girdi (Input)</th>
              <th>İşlem (Process)</th>
              <th>Çıktı (Output)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-white">Dairenin alanı</td>
              <td>yarıçap r</td>
              <td>alan = π × r × r</td>
              <td>alan değeri</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">İki notun ortalaması</td>
              <td>vize, final</td>
              <td>ort = vize × 0.4 + final × 0.6</td>
              <td>ortalama</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Çift mi tek mi?</td>
              <td>tam sayı n</td>
              <td>kalan = n mod 2 · karşılaştır</td>
              <td>&quot;Çift&quot; / &quot;Tek&quot;</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">En büyüğü bul</td>
              <td>a, b sayıları</td>
              <td>a &gt; b karşılaştır</td>
              <td>büyük olan sayı</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">1..N toplamı</td>
              <td>üst sınır N</td>
              <td>1&apos;den N&apos;e döngüyle topla</td>
              <td>toplam</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  11 · ÖRNEK: SÖZDE-KOD → KOD  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Örnek · ortalama hesabı</Eyebrow>
      <H2 className="mb-2">Sözde-koddan Python&apos;a</H2>
      <Sub className="max-w-3xl mb-6">
        Solda dilden bağımsız sözde-kod, sağda aynı algoritmanın Python karşılığı. Adımlar
        birebir örtüşür — işte algoritma kurmanın ödülü.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        <Pseudocode
          title="Sözde-kod"
          delay={0.2}
          lines={[
            <span key="a"><span className="prog-pseudo-kw">BAŞLA</span></span>,
            <span key="b">vize oku</span>,
            <span key="c">final oku</span>,
            <span key="d">ort ← vize × 0.4 + final × 0.6</span>,
            <span key="e"><span className="prog-pseudo-kw">EĞER</span> ort ≥ 50 <span className="prog-pseudo-kw">İSE</span></span>,
            <span key="f">{"   "}&quot;Geçti&quot; yaz</span>,
            <span key="g"><span className="prog-pseudo-kw">DEĞİLSE</span> &quot;Kaldı&quot; yaz</span>,
            <span key="h"><span className="prog-pseudo-kw">BİTİR</span></span>,
          ]}
        />

        <CodeEditor
          title="ortalama.py — Visual Studio Code"
          tabs={["ortalama.py"]}
          activeTab="ortalama.py"
          lines={[
            <>
              <span className="tok-var">vize</span>
              <span className="tok-operator"> = </span>
              <span className="tok-builtin">float</span>
              <span className="tok-punct">(</span>
              <span className="tok-builtin">input</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;Vize: &quot;</span>
              <span className="tok-punct">))</span>
            </>,
            <>
              <span className="tok-var">final</span>
              <span className="tok-operator"> = </span>
              <span className="tok-builtin">float</span>
              <span className="tok-punct">(</span>
              <span className="tok-builtin">input</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;Final: &quot;</span>
              <span className="tok-punct">))</span>
            </>,
            <>
              <span className="tok-var">ort</span>
              <span className="tok-operator"> = </span>
              <span className="tok-var">vize</span>
              <span className="tok-operator"> * </span>
              <span className="tok-number">0.4</span>
              <span className="tok-operator"> + </span>
              <span className="tok-var">final</span>
              <span className="tok-operator"> * </span>
              <span className="tok-number">0.6</span>
            </>,
            <>
              <span className="tok-keyword">if</span>
              <span className="tok-var"> ort</span>
              <span className="tok-operator"> &gt;= </span>
              <span className="tok-number">50</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"  "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;Geçti&quot;</span>
              <span className="tok-punct">)</span>
            </>,
            <>
              <span className="tok-keyword">else</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"  "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;Kaldı&quot;</span>
              <span className="tok-punct">)</span>
            </>,
          ]}
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  12 · BÖLÜM 3/3 · TEMSİL & SINAMA  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Temsil ve Sınama"
      subtitle="Aynı algoritmayı akış diyagramıyla çizmek ve örnek girdilerle elle çalıştırarak doğrulamak."
      glowClass="prog-glow-purple"
      icon={<ListOrdered className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  13 · ÖRNEK AKIŞ — EN BÜYÜĞÜ BUL  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Koşullu algoritma · akış diyagramı</Eyebrow>
      <H2>İki sayıdan büyüğünü bul</H2>
      <Sub className="mt-3 max-w-3xl">
        a ile b&apos;yi al, karşılaştır, büyük olanı yazdır. Tek karar noktası &mdash; iki dal.
        Bu, koşullu (selection) yapının en sade örneğidir.
      </Sub>

      <div className="mt-6 max-w-3xl mx-auto">
        <FlowchartMax />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 text-xs text-gray-500 text-center font-mono"
      >
        Not: a = b ise &ldquo;Hayır&rdquo; dalına gider ve b yazdırılır; eşit sayılar için sonuç yine doğrudur.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · KURU ÇALIŞTIRMA (TRACE)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sınama · kuru çalıştırma (trace)</Eyebrow>
      <H2 className="mb-2">Algoritmayı elle, satır satır çalıştır</H2>
      <Sub className="max-w-3xl mb-6">
        Kod yazmadan önce algoritmayı bir izleme tablosuyla denersin: her adımda değişkenlerin
        aldığı değeri yazarsın. &ldquo;1&apos;den 4&apos;e topla&rdquo; döngüsünü izleyelim.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        <Pseudocode
          title="Algoritma"
          delay={0.2}
          lines={[
            <span key="a">toplam ← 0</span>,
            <span key="b">i ← 1</span>,
            <span key="c"><span className="prog-pseudo-kw">DÖNGÜ</span> i ≤ 4 oldukça</span>,
            <span key="d">{"   "}toplam ← toplam + i</span>,
            <span key="e">{"   "}i ← i + 1</span>,
            <span key="f"><span className="prog-pseudo-kw">DÖNGÜ SONU</span></span>,
            <span key="g">toplam yaz</span>,
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-card rounded-xl overflow-hidden"
        >
          <table className="prog-compare">
            <thead>
              <tr>
                <th>Adım</th>
                <th>i</th>
                <th>i ≤ 4 ?</th>
                <th>toplam</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>başlangıç</td><td>1</td><td>—</td><td>0</td></tr>
              <tr><td>1. tur</td><td>1</td><td>Evet</td><td>1</td></tr>
              <tr><td>2. tur</td><td>2</td><td>Evet</td><td>3</td></tr>
              <tr><td>3. tur</td><td>3</td><td>Evet</td><td>6</td></tr>
              <tr><td>4. tur</td><td>4</td><td>Evet</td><td>10</td></tr>
              <tr><td className="text-white font-semibold">çıkış</td><td>5</td><td>Hayır</td><td className="text-[#86efac] font-semibold">10</td></tr>
            </tbody>
          </table>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 text-center text-xs text-gray-500 font-mono"
      >
        Sonuç: 1+2+3+4 = 10 · Döngü, i = 5 olunca koşul bozulduğu için durur.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  16 · BU HAFTA YAPILACAKLAR (LAB)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta sizin göreviniz</Eyebrow>
      <H2>Üç problemi algoritmaya dök</H2>
      <Sub className="mt-3 max-w-3xl">
        Henüz kod yazmıyoruz. Aşağıdaki üç problemi <span className="text-white">sözde-kod</span> ve
        <span className="text-white"> akış diyagramı</span> olarak çöz, sonraki derse getir.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 prog-card rounded-xl p-6 max-w-3xl mx-auto"
      >
        <div className="text-xs uppercase tracking-wider text-[#5fa8e0] mb-4 font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Görev listesi · Hafta 02
        </div>
        <div className="space-y-3">
          {[
            { t: "Sıralı · Dairenin çevresi", d: "yarıçapı al, çevre = 2 × π × r hesapla ve yazdır" },
            { t: "Koşullu · Pozitif/Negatif/Sıfır", d: "bir sayı al; üç durumu da ayrı dalda yazdır (İF–DEĞİLSE EĞER)" },
            { t: "Döngülü · 1..N çift sayılar", d: "N&apos;i al, 2&apos;den N&apos;e kadar çift sayıları sırayla yazdır" },
            { t: "Her biri için kuru çalıştırma", d: "bir örnek girdiyle izleme tablosu doldur (örn. r = 3, n = 6)" },
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
                <div className="text-xs text-gray-400 mt-0.5">{item.d}</div>
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

  /* ─────────────────  17 · SIRADAKİ HAFTA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Hafta 03 · Önizleme</Eyebrow>
      <H2>Akış diyagramlarını derinleştiriyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu hafta algoritmaları türlere ayırdık ve sözde-kodla kurduk. Önümüzdeki hafta aynı
        algoritmaları daha büyük, iç içe akış diyagramlarıyla çizmeye odaklanıyoruz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <FeatureCard
          icon={Layers}
          title="İç içe yapılar"
          desc="Döngü içinde koşul, koşul içinde sıralı adımlar — gerçek problemlerin yapısı."
          accent="#3776ab"
          delay={0.0}
        />
        <FeatureCard
          icon={GitBranch}
          title="Çoklu dallanma"
          desc="Üç ve daha fazla seçenek: not harfi, vergi dilimi gibi çok kollu kararlar."
          accent="#5fa8e0"
          delay={0.1}
        />
        <FeatureCard
          icon={Sigma}
          title="Daha büyük örnekler"
          desc="Faktöriyel, bir listede arama gibi adım sayısı artan algoritmaların diyagramları."
          accent="#ffd43b"
          delay={0.2}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center text-xs text-gray-500 font-mono"
      >
        + Pratik: &ldquo;N&apos;in faktöriyelini hesapla&rdquo; · &ldquo;bir dizide aranan sayıyı bul&rdquo; akışları
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  18 · KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>Hafta 02 · Sonu</Eyebrow>
        <H1>
          <span className="prog-shimmer">Özet</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Algoritmalar üç temel yapıdan kurulur: sıralı, koşullu, döngülü. Bir problemi
          dört adımda algoritmaya dönüştürdük ve sözde-kod ile akış diyagramıyla temsil ettik.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12"
        >
          <div className="prog-card rounded-xl p-5">
            <GitBranch className="w-5 h-5 text-[#5fa8e0] mb-2 mx-auto" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
              Üç yapı
            </div>
            <div className="text-white font-semibold mt-1">Sıralı · Koşullu · Döngülü</div>
            <div className="text-sm text-gray-400">her programın yapı taşı</div>
          </div>

          <div className="prog-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#5fa8e0] mb-2 mx-auto" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
              Ders saati
            </div>
            <div className="text-white font-semibold mt-1">Perşembe</div>
            <div className="text-sm text-gray-400">09:55 — 12:30</div>
          </div>

          <div className="prog-card rounded-xl p-5">
            <FileText className="w-5 h-5 text-[#5fa8e0] mb-2 mx-auto" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
              Sonraki hafta
            </div>
            <div className="text-white font-semibold mt-1">H03</div>
            <div className="text-sm text-gray-400">Akış diyagramları</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 prog-card rounded-lg px-4 py-3 text-sm text-gray-300 flex items-center justify-center gap-3 max-w-xl mx-auto"
        >
          <Lightbulb className="w-5 h-5 text-[#ffd43b] flex-shrink-0" />
          <span>
            Takıldığın problem, çözemediğin adım — derse veya office hour&apos;a getir.
            Sormak, çözümün ilk adımıdır.
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-[11px] font-mono text-gray-600 uppercase tracking-[0.3em] flex items-center justify-center gap-2"
        >
          <Users className="w-3.5 h-3.5" />
          BVA 1101 · Programlama Temelleri · Bahar 2026
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
          BVA 1101 · 2. Hafta · Algoritmalar
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
