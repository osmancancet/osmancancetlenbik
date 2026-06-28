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
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Database,
  FileJson,
  Code2,
  Network,
  Layers,
  Search,
  Boxes,
  GitBranch,
  Terminal,
  ListChecks,
  Calendar,
  Target,
  BookOpen,
  ScrollText,
  Binary,
  Workflow,
  ArrowRight,
  Quote,
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

function CodeWindow({
  title,
  icon: Icon = Terminal,
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
      transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
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

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ───── 1 · KAPAK ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 1203 · 14. Hafta</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.04]"
        >
          <span className="uyz-shimmer">Yapay Zekâ Dilleri</span>
          <br />
          <span className="text-white/90">&amp; Bilgi Tabanı Oluşturma</span>
        </motion.h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Modele &ldquo;ne&rdquo; sorduğumuz kadar &ldquo;nasıl&rdquo; sorduğumuz da önemli.
          Bu hafta yapay zekânın anladığı dilleri ve dış bilgiyi bağladığımız
          bilgi tabanını kuruyoruz.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Code2}
            title="YZ Dilleri"
            desc="Prompt şablonları, yapılandırılmış çıktı (JSON Schema), DSL ve bilgi temsil dilleri."
            delay={0.35}
            accent="#a855f7"
          />
          <FeatureCard
            icon={Network}
            title="Bilgi Temsili"
            desc="Ontoloji, RDF üçlüleri (özne-yüklem-nesne) ve bilgi grafikleri."
            delay={0.5}
            accent="#ec4899"
          />
          <FeatureCard
            icon={Database}
            title="Bilgi Tabanı"
            desc="Gömme vektörleri, vektör veritabanı ve RAG ile dış bilgi bağlama."
            delay={0.65}
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

  /* ───── 2 · GEÇEN HAFTADAN KÖPRÜ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 13. haftadan 14. haftaya</Eyebrow>
      <H2>Modeli güçlendirmenin iki yolu</H2>
      <Sub className="mt-3 max-w-3xl">
        13. haftaya kadar modeli &ldquo;içeriden&rdquo; konuşturduk: prompt ve ince
        ayar. Ama modelin bilgisi belirli bir tarihte donar ve özel verini bilmez.
        Bu hafta onu &ldquo;dışarıdaki&rdquo; bilgiye bağlamayı öğreniyoruz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="uyz-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3" style={{ color: ACCENT_SOFT }}>
            <Brain className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Parametrik bilgi</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Bilgi, eğitim sırasında ağırlıklara &ldquo;gömülür&rdquo;.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Güncellenmesi yeniden eğitim/ince ayar ister, pahalıdır.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Kaynağını gösteremez; halüsinasyona açıktır.</li>
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
            <Database className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Parametrik olmayan bilgi</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Bilgi dışarıda — bir bilgi tabanında — tutulur.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Belge eklemek/silmek anında etkili olur, eğitim gerekmez.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Cevap kaynağıyla birlikte gösterilebilir.</li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 text-center text-sm text-gray-500"
      >
        Bu haftanın hedefi: modele <span className="text-white">doğru dilde</span> sormak ve ona
        <span className="text-white"> güvenilir bir bilgi tabanı</span> bağlamak.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 3 · DERSİN AKIŞI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: diller → bilgi temsili → bilgi tabanı</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce modelin anladığı dilleri görüyoruz; sonra bilgiyi makinenin
        işleyebileceği biçimde temsil ediyoruz; en son bunu bir bilgi tabanına
        koyup RAG ile modele bağlıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "YZ Dilleri", items: ["Prompt & şablon dilleri", "Yapılandırılmış çıktı (JSON Schema)", "DSL ve bilgi temsil dilleri"], icon: Code2, accent: "#a855f7" },
          { range: "02", title: "Bilgi Temsili", items: ["Ontoloji ve sınıf/ilişki", "RDF üçlüsü: özne-yüklem-nesne", "Bilgi grafiği & SPARQL"], icon: Network, accent: "#ec4899" },
          { range: "03", title: "Bilgi Tabanı", items: ["Gömme (embedding) vektörleri", "Vektör veritabanı & benzerlik", "RAG hattı & uygulamalı lab"], icon: Database, accent: "#22c55e" },
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
                <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: g.accent }}>Durak {g.range}</div>
                <div className="text-lg font-semibold text-white">{g.title}</div>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-400">
              {g.items.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <ChevronRight className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: g.accent }} />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 4 · BÖLÜM 1 — YZ DİLLERİ ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Yapay Zekâ Dilleri"
      subtitle="Modelle konuşmanın da bir grameri var: doğal dilden yapılandırılmış çıktıya, bilgi temsil dillerine uzanan bir yelpaze."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #6d28d9 100%)"
      shadow="0 30px 80px -20px rgba(168,85,247,0.6)"
      icon={<Code2 className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 5 · DİL KATMANLARI ───── */
  () => (
    <SlideShell>
      <Eyebrow>YZ dilleri · katmanlar</Eyebrow>
      <H2 className="mb-2">&ldquo;Yapay zekâ dili&rdquo; tek bir şey değil</H2>
      <Sub className="max-w-3xl mb-6">
        Bir uçta serbest doğal dil, diğer uçta makinenin kesinlikle işleyebileceği
        biçimsel diller var. Sağa gittikçe esneklik azalır, kesinlik ve
        otomasyon artar.
      </Sub>
      <div className="space-y-2.5">
        {[
          { layer: "Doğal dil prompt", ex: "Serbest cümle: “Bu metni özetle”", color: "#a855f7", note: "En esnek, en belirsiz" },
          { layer: "Şablon / istem dili", ex: "Jinja, LangChain PromptTemplate — değişkenli istem", color: "#ec4899", note: "Tekrarlanabilir, parametrik" },
          { layer: "Yapılandırılmış çıktı", ex: "JSON Schema, function calling — kesin alanlar", color: "#3b82f6", note: "Makinece okunur çıktı" },
          { layer: "Sorgu / bilgi temsil dili", ex: "SPARQL, Cypher, SQL — bilgi tabanını sorgular", color: "#22c55e", note: "Tam biçimsel, kesin" },
        ].map((l, i) => (
          <motion.div
            key={l.layer}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="rounded-lg px-5 py-4 flex items-center justify-between gap-4"
            style={{ background: `${l.color}10`, border: `1px solid ${l.color}40`, marginLeft: `${i * 18}px` }}
          >
            <div className="flex items-center gap-4 min-w-0">
              <span className="text-white font-semibold text-sm whitespace-nowrap">{l.layer}</span>
              <span className="font-mono text-[12px] text-gray-400 truncate">{l.ex}</span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider shrink-0" style={{ color: l.color }}>{l.note}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-5 text-[12px] text-gray-500 flex items-center gap-2"
      >
        <ArrowRight className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
        Aşağı indikçe: serbestlik azalır, makinece işlenebilirlik artar.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 6 · YAPILANDIRILMIŞ ÇIKTI — JSON SCHEMA ───── */
  () => (
    <SlideShell>
      <Eyebrow>YZ dilleri · yapılandırılmış çıktı</Eyebrow>
      <H2 className="mb-2">Cümle yerine şema iste</H2>
      <Sub className="max-w-3xl mb-6">
        Modelden serbest metin yerine bir <span className="text-white">JSON Schema</span>&apos;ya
        uyan çıktı istersek, cevabı doğrudan bir programa besleyebiliriz.
        Modern API&apos;ler bunu &ldquo;structured output&rdquo; / &ldquo;function calling&rdquo; ile garanti eder.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
        <CodeWindow title="schema.json — beklenen biçim" icon={FileJson}>
          <span className="uyz-code-line"><span className="uyz-code-comment">{"// modelden bu alanlar dolu dönmeli"}</span></span>
          <span className="uyz-code-line">{"{"}</span>
          <span className="uyz-code-line">{"  "}<span className="uyz-code-key">&quot;type&quot;</span>: <span className="uyz-code-str">&quot;object&quot;</span>,</span>
          <span className="uyz-code-line">{"  "}<span className="uyz-code-key">&quot;properties&quot;</span>: {"{"}</span>
          <span className="uyz-code-line">{"    "}<span className="uyz-code-key">&quot;sehir&quot;</span>:   {"{ "}<span className="uyz-code-key">&quot;type&quot;</span>: <span className="uyz-code-str">&quot;string&quot;</span> {"}"},</span>
          <span className="uyz-code-line">{"    "}<span className="uyz-code-key">&quot;nufus&quot;</span>:   {"{ "}<span className="uyz-code-key">&quot;type&quot;</span>: <span className="uyz-code-str">&quot;integer&quot;</span> {"}"},</span>
          <span className="uyz-code-line">{"    "}<span className="uyz-code-key">&quot;plaka&quot;</span>:   {"{ "}<span className="uyz-code-key">&quot;type&quot;</span>: <span className="uyz-code-str">&quot;integer&quot;</span> {"}"}</span>
          <span className="uyz-code-line">{"  }"},</span>
          <span className="uyz-code-line">{"  "}<span className="uyz-code-key">&quot;required&quot;</span>: [<span className="uyz-code-str">&quot;sehir&quot;</span>, <span className="uyz-code-str">&quot;plaka&quot;</span>]</span>
          <span className="uyz-code-line">{"}"}</span>
        </CodeWindow>
        <CodeWindow title="cevap — şemaya uyan çıktı" icon={Binary}>
          <span className="uyz-code-line"><span className="uyz-code-prompt">istem &gt;</span> <span className="uyz-code-out">Manisa&apos;yı bu şemaya göre doldur</span></span>
          <span className="uyz-code-line">{" "}</span>
          <span className="uyz-code-line">{"{"}</span>
          <span className="uyz-code-line">{"  "}<span className="uyz-code-key">&quot;sehir&quot;</span>: <span className="uyz-code-str">&quot;Manisa&quot;</span>,</span>
          <span className="uyz-code-line">{"  "}<span className="uyz-code-key">&quot;nufus&quot;</span>: <span className="uyz-code-num">1468000</span>,</span>
          <span className="uyz-code-line">{"  "}<span className="uyz-code-key">&quot;plaka&quot;</span>: <span className="uyz-code-num">45</span></span>
          <span className="uyz-code-line">{"}"}</span>
          <span className="uyz-code-line">{" "}</span>
          <span className="uyz-code-line"><span className="uyz-code-ok">{"✓"} valid against schema</span> <span className="uyz-code-comment">{"// parse hatasız"}</span></span>
          <span className="uyz-code-line"><span className="uyz-code-warn">{"⚠"}</span> <span className="uyz-code-out">nüfus değeri yine de doğrulanmalı</span></span>
        </CodeWindow>
      </div>
    </SlideShell>
  ),

  /* ───── 7 · ŞABLON / PROMPT DİLİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>YZ dilleri · şablon dili</Eyebrow>
      <H2 className="mb-2">İstemi koda gömme — şablonla</H2>
      <Sub className="max-w-3xl mb-6">
        Aynı istemi yüzlerce kayıt için tekrarlamak gerektiğinde, sabit metni
        değişkenlerle birleştiren bir <span className="text-white">şablon dili</span> kullanılır.
        Jinja, LangChain&apos;in <span className="font-mono text-violet-300">PromptTemplate</span>&apos;i bunun yaygın örnekleri.
      </Sub>
      <CodeWindow title="prompt_template.py — değişkenli istem" icon={Code2}>
        <span className="uyz-code-line"><span className="uyz-code-comment">{"# {{ }} ile işaretli yerler çalışma anında doldurulur"}</span></span>
        <span className="uyz-code-line"><span className="uyz-code-key">template</span> = <span className="uyz-code-str">&quot;&quot;&quot;</span></span>
        <span className="uyz-code-line"><span className="uyz-code-str">Sen bir kütüphane asistanısın.</span></span>
        <span className="uyz-code-line"><span className="uyz-code-str">Aşağıdaki BAĞLAM&apos;ı kullanarak SORU&apos;yu yanıtla.</span></span>
        <span className="uyz-code-line"><span className="uyz-code-str">Bağlamda yoksa &apos;bilmiyorum&apos; de.</span></span>
        <span className="uyz-code-line">{" "}</span>
        <span className="uyz-code-line"><span className="uyz-code-str">BAĞLAM: </span><span className="uyz-code-num">{"{{ context }}"}</span></span>
        <span className="uyz-code-line"><span className="uyz-code-str">SORU: </span><span className="uyz-code-num">{"{{ question }}"}</span></span>
        <span className="uyz-code-line"><span className="uyz-code-str">&quot;&quot;&quot;</span></span>
        <span className="uyz-code-line">{" "}</span>
        <span className="uyz-code-line"><span className="uyz-code-prompt">&gt;&gt;&gt;</span> prompt = template.format(context=docs, question=q)</span>
        <span className="uyz-code-line"><span className="uyz-code-out">{"→"} her kayıt için aynı yapı, farklı veri</span></span>
      </CodeWindow>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 text-center text-[12px] text-gray-500"
      >
        Önemli ayrım: <span className="text-white">talimat</span> sabittir, <span className="text-white">bağlam ve soru</span> değişkendir.
        Bu ayrım birazdan RAG&apos;in temelini oluşturacak.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 8 · BÖLÜM 2 — BİLGİ TEMSİLİ ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Bilgiyi Temsil Etmek"
      subtitle="Bir cümleyi makine nasıl saklar? Ontoloji, RDF üçlüleri ve bilgi grafikleri ile gerçekleri birbirine bağlarız."
      bgGradient="linear-gradient(135deg, #ec4899 0%, #9d174d 100%)"
      shadow="0 30px 80px -20px rgba(236,72,153,0.55)"
      icon={<Network className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 9 · RDF ÜÇLÜSÜ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bilgi temsili · RDF üçlüsü</Eyebrow>
      <H2 className="mb-2">Her gerçek bir üçlüye sığar</H2>
      <Sub className="max-w-3xl mb-8">
        Semantik web&apos;in temel taşı <span className="text-white">RDF üçlüsüdür</span>:
        her bilgi <span className="font-mono text-violet-300">özne → yüklem → nesne</span> biçiminde yazılır.
        Bu üçlüler birleşince bir bilgi grafiği ortaya çıkar.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { role: "Özne (subject)", val: "Manisa", desc: "Hakkında konuştuğumuz varlık.", color: "#a855f7" },
          { role: "Yüklem (predicate)", val: "plakaKodu", desc: "Özne ile nesneyi bağlayan ilişki.", color: "#ec4899" },
          { role: "Nesne (object)", val: "45", desc: "İlişkinin değeri ya da başka bir varlık.", color: "#22c55e" },
        ].map((t, i) => (
          <motion.div
            key={t.role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="uyz-card rounded-xl p-6 text-center"
          >
            <div className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{ color: t.color }}>{t.role}</div>
            <div className="font-mono text-2xl font-bold text-white mb-3">{t.val}</div>
            <p className="text-xs text-gray-400">{t.desc}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 uyz-card rounded-xl p-5 font-mono text-sm text-center text-gray-300"
      >
        <span className="text-violet-300">:Manisa</span>{" "}
        <span className="text-pink-300">:plakaKodu</span>{" "}
        <span className="text-green-300">&quot;45&quot;</span> .
        <span className="mx-3 text-gray-600">|</span>
        <span className="text-violet-300">:Manisa</span>{" "}
        <span className="text-pink-300">:bulunduguBolge</span>{" "}
        <span className="text-green-300">:Ege</span> .
      </motion.div>
    </SlideShell>
  ),

  /* ───── 10 · BİLGİ GRAFİĞİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bilgi temsili · bilgi grafiği</Eyebrow>
      <H2 className="mb-2">Üçlüler birleşince grafik olur</H2>
      <Sub className="max-w-3xl mb-8">
        Düğümler varlıkları, oklar ilişkileri (yüklemleri) gösterir. Google&apos;ın
        &ldquo;Knowledge Graph&rdquo;ı, Wikidata ve birçok kurumsal sistem bu yapıyı kullanır.
      </Sub>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="uyz-card rounded-2xl p-8"
      >
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <span className="uyz-kb-node px-5 py-3 font-mono text-white text-sm">Ege Bölgesi</span>
            <div className="flex flex-col items-center text-[10px] font-mono" style={{ color: ACCENT_SOFT }}>
              <span>icerir</span>
              <ArrowRight className="w-5 h-5" style={{ color: ACCENT_SOFT }} />
            </div>
            <span className="uyz-kb-node px-5 py-3 font-mono text-white text-sm" style={{ borderColor: "rgba(236,72,153,0.5)" }}>Manisa</span>
            <div className="flex flex-col items-center text-[10px] font-mono text-pink-300">
              <span>komsu</span>
              <ArrowRight className="w-5 h-5 text-pink-300" />
            </div>
            <span className="uyz-kb-node px-5 py-3 font-mono text-white text-sm">İzmir</span>
          </div>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <div className="flex flex-col items-center text-[10px] font-mono text-green-300">
              <ArrowRight className="w-5 h-5 text-green-300 rotate-90" />
              <span>universite</span>
            </div>
          </div>
          <span className="uyz-kb-node px-5 py-3 font-mono text-white text-sm" style={{ borderColor: "rgba(34,197,94,0.5)" }}>Manisa Celal Bayar Üniversitesi</span>
        </div>
        <div className="mt-6 pt-4 border-t border-white/5 text-center text-xs text-gray-500">
          Aynı düğüm birçok ilişkiye girebilir — bu yüzden grafik, tabloya göre çok daha esnek bağlantılar kurar.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 11 · SPARQL SORGUSU ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bilgi temsili · sorgu dili</Eyebrow>
      <H2 className="mb-2">Grafiği SPARQL ile sorgula</H2>
      <Sub className="max-w-3xl mb-6">
        Bilgi grafikleri <span className="font-mono text-violet-300">SPARQL</span> (RDF için) ya da
        <span className="font-mono text-violet-300"> Cypher</span> (etiketli grafikler için) ile sorgulanır.
        Aşağıdaki sorgu &ldquo;Ege Bölgesi&apos;ndeki tüm illeri&rdquo; getirir.
      </Sub>
      <CodeWindow title="sorgu.sparql — Ege illeri" icon={Search}>
        <span className="uyz-code-line"><span className="uyz-code-key">PREFIX</span> : <span className="uyz-code-str">&lt;http://ornek.tr/cografya#&gt;</span></span>
        <span className="uyz-code-line">{" "}</span>
        <span className="uyz-code-line"><span className="uyz-code-key">SELECT</span> ?il <span className="uyz-code-key">WHERE</span> {"{"}</span>
        <span className="uyz-code-line">{"  "}<span className="uyz-code-num">?il</span> :bulunduguBolge :Ege .</span>
        <span className="uyz-code-line">{"  "}<span className="uyz-code-num">?il</span> :tip :Sehir .</span>
        <span className="uyz-code-line">{"}"} <span className="uyz-code-key">ORDER BY</span> ?il</span>
        <span className="uyz-code-line">{" "}</span>
        <span className="uyz-code-line"><span className="uyz-code-comment">{"# sonuç:"}</span></span>
        <span className="uyz-code-line"><span className="uyz-code-out">?il</span></span>
        <span className="uyz-code-line"><span className="uyz-code-ok">:Aydin  :Izmir  :Manisa  :Mugla  ...</span></span>
      </CodeWindow>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 text-center text-[12px] text-gray-500"
      >
        Bilgi grafiği <span className="text-white">kesin ve denetlenebilir</span>: cevap tek tek üçlülere dayanır,
        model uydurmaz. Bu yüzden RAG hatlarında dilin yanına grafik de konur.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 12 · BÖLÜM 3 — BİLGİ TABANI ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Bilgi Tabanı & RAG"
      subtitle="Belgeleri vektöre çevir, benzerine göre getir, modele bağlam olarak ver. Üretken cevabı kendi verine dayandır."
      bgGradient="linear-gradient(135deg, #22c55e 0%, #15803d 100%)"
      shadow="0 30px 80px -20px rgba(34,197,94,0.55)"
      icon={<Database className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 13 · GÖMME (EMBEDDING) ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bilgi tabanı · gömme vektörleri</Eyebrow>
      <H2 className="mb-2">Anlamı sayıya çevirmek</H2>
      <Sub className="max-w-3xl mb-8">
        Bir <span className="text-white">gömme (embedding)</span> modeli, her metni
        yüzlerce boyutlu bir vektöre dönüştürür. Anlamca yakın metinler bu uzayda
        birbirine yakın düşer — böylece &ldquo;benzerlik&rdquo; matematiksel bir hesaba iner.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <CodeWindow title="embed.py — metin → vektör" icon={Boxes}>
          <span className="uyz-code-line"><span className="uyz-code-key">from</span> openai <span className="uyz-code-key">import</span> OpenAI</span>
          <span className="uyz-code-line">{" "}</span>
          <span className="uyz-code-line">v = client.embeddings.create(</span>
          <span className="uyz-code-line">{"  "}model=<span className="uyz-code-str">&quot;text-embedding-3-small&quot;</span>,</span>
          <span className="uyz-code-line">{"  "}input=<span className="uyz-code-str">&quot;Manisa Ege Bölgesi&apos;nde bir ildir.&quot;</span></span>
          <span className="uyz-code-line">)</span>
          <span className="uyz-code-line">{" "}</span>
          <span className="uyz-code-line"><span className="uyz-code-prompt">&gt;&gt;&gt;</span> len(v)  <span className="uyz-code-comment">{"# boyut sayısı"}</span></span>
          <span className="uyz-code-line"><span className="uyz-code-out">1536</span></span>
          <span className="uyz-code-line"><span className="uyz-code-prompt">&gt;&gt;&gt;</span> v[:4]</span>
          <span className="uyz-code-line"><span className="uyz-code-out">[</span><span className="uyz-code-num">0.013</span>, <span className="uyz-code-num">-0.041</span>, <span className="uyz-code-num">0.007</span>, <span className="uyz-code-num">0.022</span><span className="uyz-code-out">, ...]</span></span>
        </CodeWindow>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="uyz-card rounded-2xl p-6 flex flex-col justify-center"
        >
          <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: ACCENT_SOFT }}>
            Benzerlik = kosinüs
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-gray-300 font-mono text-[12px]">&quot;Manisa ili&quot; ↔ &quot;Ege&apos;de bir şehir&quot;</span>
              <span className="font-mono text-green-300">0.86</span>
            </div>
            <div className="uyz-bar-track"><div className="uyz-bar-fill" style={{ width: "86%" }} /></div>
            <div className="flex items-center justify-between gap-3 pt-2">
              <span className="text-gray-300 font-mono text-[12px]">&quot;Manisa ili&quot; ↔ &quot;Python döngüsü&quot;</span>
              <span className="font-mono text-gray-500">0.11</span>
            </div>
            <div className="uyz-bar-track"><div className="uyz-bar-fill" style={{ width: "11%", background: "linear-gradient(90deg,#6b21a8,#a855f7)", opacity: 0.5 }} /></div>
          </div>
          <div className="mt-5 pt-4 border-t border-white/5 text-xs text-gray-500">
            Kosinüs benzerliği 1&apos;e yakınsa anlamca yakın, 0&apos;a yakınsa alakasız demektir.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 14 · RAG HATTI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bilgi tabanı · RAG hattı</Eyebrow>
      <H2 className="mb-2">Getir, bağla, üret (RAG)</H2>
      <Sub className="max-w-3xl mb-8">
        <span className="text-white">RAG</span> (Retrieval-Augmented Generation):
        soruyu vektöre çevir, vektör veritabanından en yakın belgeleri getir,
        bunları bağlam olarak modele ver, cevabı kaynaklı üret.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-stretch">
        {[
          { n: "1", icon: Search, t: "Soru → vektör", d: "Kullanıcı sorusu embedding ile vektöre çevrilir.", c: "#a855f7" },
          { n: "2", icon: Database, t: "Benzer getir", d: "Vektör veritabanından en yakın k belge bulunur.", c: "#ec4899" },
          { n: "3", icon: Layers, t: "Bağlam kur", d: "Getirilen parçalar şablona bağlam olarak yerleşir.", c: "#3b82f6" },
          { n: "4", icon: Brain, t: "Model üretir", d: "LLM yalnızca bu bağlama dayanarak cevap yazar.", c: "#22c55e" },
          { n: "5", icon: BookOpen, t: "Kaynak göster", d: "Cevabın yanında hangi belgeden geldiği listelenir.", c: "#fbbf24" },
        ].map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="relative uyz-card rounded-xl p-4"
          >
            <div
              className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold"
              style={{ background: s.c, color: "#fff", boxShadow: `0 0 16px ${s.c}55` }}
            >
              {s.n}
            </div>
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 mt-2"
              style={{ background: `${s.c}1f`, border: `1px solid ${s.c}55` }}
            >
              <s.icon className="w-5 h-5" style={{ color: s.c }} />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">{s.t}</h3>
            <p className="text-[11px] text-gray-400 leading-relaxed">{s.d}</p>
            {i < 4 && (
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
        transition={{ delay: 0.9 }}
        className="mt-6 text-center text-xs text-gray-500"
      >
        RAG&apos;in gücü: modeli yeniden eğitmeden, <span className="text-white">bilgi tabanını güncelleyerek</span> cevapları tazelersin.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 15 · YAKLAŞIM KARŞILAŞTIRMASI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Karşılaştırma · hangi yöntem ne zaman?</Eyebrow>
      <H2 className="mb-2">Üç farklı &ldquo;bilgi bağlama&rdquo; yolu</H2>
      <Sub className="max-w-3xl mb-6">
        Aynı amaç — modele dış bilgi vermek — için üç ayrı yaklaşım var. Seçim
        maliyete, güncelleme sıklığına ve kesinlik ihtiyacına göre değişir.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="uyz-card rounded-xl p-1"
      >
        <table className="uyz-tbl">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Yaklaşım</th>
              <th style={{ width: "26%" }}>Bilgi nerede?</th>
              <th style={{ width: "27%" }}>Güçlü yanı</th>
              <th>Ne zaman?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">İnce ayar (fine-tune)</td>
              <td>Model ağırlıklarında</td>
              <td>Üslup/biçim öğretir, ekstra bağlam gerektirmez</td>
              <td>Davranış/ton sabitse, veri seyrek değişiyorsa</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">RAG (vektör)</td>
              <td>Vektör veritabanında</td>
              <td>Anlık güncelleme, kaynak gösterimi</td>
              <td>Belge sık değişiyorsa, geniş metin tabanı varsa</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Bilgi grafiği</td>
              <td>Üçlülerde / grafikte</td>
              <td>Kesin, denetlenebilir, ilişkisel sorgu</td>
              <td>Net olgular ve ilişkiler kritikse (örn. mevzuat)</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-[12px] text-gray-500 flex items-center gap-2"
      >
        <GitBranch className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
        Pratikte üçü birlikte kullanılır: ince ayar üslubu, RAG güncel belgeyi, grafik kesin olguları taşır.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 16 · UYGULAMALI LAB ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Kendi mini bilgi tabanını kur</H2>
      <Sub className="mt-3 max-w-3xl">
        Küçük bir belge kümesiyle uçtan uca bir RAG hattı kuracaksın. Sonraki
        derse bu dört adımı yapmış ve çalışan bir soru-cevap çıktısı almış gelmen bekleniyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: ScrollText, title: "Belgeleri parçala", desc: "3-5 metin dosyasını ~500 kelimelik parçalara böl (chunking).", accent: "#a855f7" },
          { icon: Boxes, title: "Vektöre çevir & sakla", desc: "Bir embedding modeliyle her parçayı vektörle; bir vektör DB'ye (örn. Chroma) yaz.", accent: "#ec4899" },
          { icon: Search, title: "Getirmeyi test et", desc: "Bir soru sor; en yakın 3 parçayı getirip ekrana yazdır — doğru mu?", accent: "#3b82f6" },
          { icon: Workflow, title: "Şablonla cevap üret", desc: "Getirilen bağlamı PromptTemplate'e koy, modele sor; cevabı kaynakla birlikte yazdır.", accent: "#22c55e" },
        ].map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="uyz-card uyz-card-hover rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
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
        className="mt-6 uyz-card rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <ListChecks className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />
        <span>
          <span className="text-white">İpucu:</span> Modelin yanıtını yalnızca getirilen bağlama dayandır; bağlamda yoksa
          &ldquo;bilmiyorum&rdquo; demesini iste. Böylece halüsinasyonu büyük ölçüde azaltırsın.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 17 · ALINTI ───── */
  () => (
    <QuoteSlide
      quote="Veri ve bilgi temsili olmadan, en güçlü model bile yalnızca akıcı bir tahmin makinesidir."
      author="Ders notu · BVA 1203"
      role="Bilgi tabanı, modelin belleği değil; doğruladığı kaynağıdır."
    />
  ),

  /* ───── 18 · SIRADAKİ HAFTA + KAPANIŞ ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8 uyz-pulse"
          style={{ background: "linear-gradient(135deg,#a855f7,#6d28d9)", boxShadow: "0 30px 80px -20px rgba(168,85,247,0.6)" }}
        >
          <Target className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>14. hafta tamamlandı · sıradaki: Final Proje</Eyebrow>
        <H1>
          <span className="uyz-shimmer-violet">Hepsini Birleştir</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Hafta 15&apos;te dönem boyunca öğrendiklerini tek bir projede toplayacaksın:
          bir üretken model, doğru bir prompt dili ve kendi bilgi tabanına bağlı bir RAG hattı.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
          <FeatureCard icon={Database} title="Bilgi tabanın" desc="Bu haftaki mini RAG'ı genişlet; gerçek bir belge kümesi bağla." accent="#a855f7" delay={0.1} />
          <FeatureCard icon={Code2} title="Doğru dil" desc="Yapılandırılmış çıktı + şablon: cevabı programa beslenebilir kıl." accent="#ec4899" delay={0.2} />
          <FeatureCard icon={Brain} title="Üretken cevap" desc="Modeli kaynağa dayandır, halüsinasyonu ölç ve raporla." accent="#22c55e" delay={0.3} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="uyz-card rounded-xl p-5">
            <Calendar className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Perşembe</div>
            <div className="text-sm text-gray-400">15:20 — 17:00</div>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <Target className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">Çalışan RAG labı</div>
            <div className="text-sm text-gray-400">4 adımı tamamlamış getir</div>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <ListChecks className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Lab çıktısı</div>
            <div className="text-sm text-gray-400">soru + kaynaklı cevap</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-[11px] font-mono text-gray-600 uppercase tracking-widest flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          BVA 1203 · Üretken Yapay Zekâlar · MCBÜ Manisa Meslek Yüksekokulu
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
          BVA 1203 · 14. Hafta · YZ Dilleri &amp; Bilgi Tabanı
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
            className="p-1.5 transition-colors"
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
