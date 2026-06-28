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
  HardHat,
  Glasses,
  Wind,
  Hand,
  Footprints,
  Shield,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Check,
  X,
  Layers,
  Target,
  ListChecks,
  ClipboardList,
  Tag,
  ArrowDownWideNarrow,
  Volume2,
  Anchor,
  Wrench,
  Calendar,
  Globe,
  Users,
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
        <div className="absolute inset-0 isg-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#f59e0b]"
    >
      <span className="w-8 h-px bg-[#f59e0b]" />
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
  accent = "#f59e0b",
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
      className="isg-card isg-card-hover rounded-xl p-6 transition-all"
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
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 isg-pulse"
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

/* Korunma hiyerarşisi — tersine dönen piramit */
function ControlHierarchy() {
  const levels: Array<{
    t: string;
    d: string;
    eff: string;
    color: string;
    w: number;
  }> = [
    { t: "Ortadan kaldırma", d: "Tehlikeyi tamamen yok et", eff: "En etkili", color: "#22c55e", w: 100 },
    { t: "İkame", d: "Tehlikeliyi daha az tehlikeliyle değiştir", eff: "Çok etkili", color: "#84cc16", w: 86 },
    { t: "Mühendislik önlemleri", d: "Havalandırma, makine koruyucusu, izolasyon", eff: "Etkili", color: "#f59e0b", w: 72 },
    { t: "İdari önlemler", d: "Prosedür, eğitim, rotasyon, işaretleme", eff: "Orta", color: "#f97316", w: 58 },
    { t: "Kişisel koruyucu donanım (KKD)", d: "Son savunma hattı — riski kaynağında azaltmaz", eff: "En az etkili", color: "#dc2626", w: 44 },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-col items-center gap-2"
    >
      {levels.map((l, i) => (
        <motion.div
          key={l.t}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 + i * 0.1 }}
          className="rounded-lg px-5 py-3 flex items-center justify-between"
          style={{
            width: `${l.w}%`,
            background: `${l.color}12`,
            border: `1px solid ${l.color}55`,
          }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
              style={{ background: l.color, color: "#0a0a0a" }}
            >
              {i + 1}
            </span>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white truncate">{l.t}</div>
              <div className="text-[11px] text-gray-400 truncate">{l.d}</div>
            </div>
          </div>
          <span
            className="isg-risk shrink-0 ml-3"
            style={{ background: `${l.color}22`, color: l.color }}
          >
            {l.eff}
          </span>
        </motion.div>
      ))}
      <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-2 font-mono">
        <ArrowDownWideNarrow className="w-3.5 h-3.5" />
        Aşağı indikçe etki azalır — KKD <span className="text-[#f87171]">en son</span> tercih edilir.
      </div>
    </motion.div>
  );
}

/* KKD etiketi / spesifikasyon panosu */
function HelmetSpec() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="isg-spec w-full max-w-md mx-auto"
    >
      <div className="isg-spec-head flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-[#f59e0b]" />
          <span className="text-[12px] text-white font-semibold">
            Baret · iç etiket
          </span>
        </div>
        <span className="isg-ce px-2 py-1 text-[12px]">CE 0123</span>
      </div>
      <div className="isg-spec-row">
        <span className="isg-spec-key">Standart</span>
        <span className="isg-spec-val">EN 397 (endüstriyel baret)</span>
      </div>
      <div className="isg-spec-row">
        <span className="isg-spec-key">KKD kategorisi</span>
        <span className="isg-spec-val">Kategori II</span>
      </div>
      <div className="isg-spec-row">
        <span className="isg-spec-key">Üretim tarihi</span>
        <span className="isg-spec-val">2025-03 (saat ibresi)</span>
      </div>
      <div className="isg-spec-row">
        <span className="isg-spec-key">Malzeme</span>
        <span className="isg-spec-val">HDPE (yüksek yoğ. polietilen)</span>
      </div>
      <div className="isg-spec-row">
        <span className="isg-spec-key">İsteğe bağlı işaret</span>
        <span className="isg-spec-val">-30&deg;C · 440 V a.c. · LD</span>
      </div>
      <div className="isg-spec-row">
        <span className="isg-spec-key">Önerilen ömür</span>
        <span className="isg-spec-val">Üretimden 5 yıl / darbede değiştir</span>
      </div>
      <div className="px-4 py-3 text-[11px] text-gray-500 border-t border-white/5 flex items-start gap-2">
        <AlertTriangle className="w-3.5 h-3.5 text-[#fbbf24] mt-0.5 shrink-0" />
        <span>
          Etiket olmadan ya da CE işareti bulunmadan satın alınan KKD{" "}
          <span className="text-white">kabul edilmez</span> — koruma garantisi yoktur.
        </span>
      </div>
    </motion.div>
  );
}

/* Tepeden tırnağa KKD haritası */
function PPEBodyMap() {
  const parts: Array<{
    icon: LucideIcon;
    zone: string;
    item: string;
    std: string;
    accent: string;
  }> = [
    { icon: HardHat, zone: "Baş", item: "Baret / koruyucu kask", std: "EN 397", accent: "#f59e0b" },
    { icon: Glasses, zone: "Göz / yüz", item: "Gözlük, siperlik", std: "EN 166", accent: "#06b6d4" },
    { icon: Volume2, zone: "Kulak", item: "Kulak tıkacı / kulaklık", std: "EN 352", accent: "#a855f7" },
    { icon: Wind, zone: "Solunum", item: "Toz maskesi / yarım maske", std: "EN 149", accent: "#22c55e" },
    { icon: Hand, zone: "El", item: "İş eldiveni (mekanik/kimyasal)", std: "EN 388", accent: "#fbbf24" },
    { icon: Anchor, zone: "Düşmeye karşı", item: "Emniyet kemeri + halat", std: "EN 361", accent: "#ef4444" },
    { icon: Footprints, zone: "Ayak", item: "Çelik burunlu iş ayakkabısı", std: "EN ISO 20345", accent: "#3b82f6" },
  ];
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
      {parts.map((p, i) => {
        const Icon = p.icon;
        return (
          <motion.div
            key={p.zone}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.07 }}
            className="isg-card rounded-xl p-4 flex items-start gap-3"
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${p.accent}18`, border: `1px solid ${p.accent}55` }}
            >
              <Icon className="w-5 h-5" style={{ color: p.accent }} />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-wider font-mono text-gray-500">
                {p.zone}
              </div>
              <div className="text-sm font-semibold text-white leading-tight">
                {p.item}
              </div>
              <div className="text-[11px] font-mono mt-1" style={{ color: p.accent }}>
                {p.std}
              </div>
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
  /* ─────────────────  AÇILIŞ  ───────────────── */

  // 1 — Kapak
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 1109 · 7. Hafta · Kişisel Emniyet III</Eyebrow>
        <H1 className="isg-shimmer">
          Kişisel Koruyucu
          <br />
          Donanım (KKD)
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Son savunma hattı — doğru seçilen, doğru takılan ve bakımı yapılan koruyucu.
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 flex items-center justify-center gap-6 flex-wrap"
        >
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(245,158,11,0.18)" }}
            >
              <HardHat className="w-5 h-5" style={{ color: "#fbbf24" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Baş, göz, el, ayak</div>
              <div className="text-[10px] text-gray-500">Vücut bölgesine göre KKD</div>
            </div>
          </div>
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-md flex items-center justify-center text-sm isg-ce">
              CE
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">CE &amp; standartlar</div>
              <div className="text-[10px] text-gray-500">EN 397 · EN 166 · EN 388</div>
            </div>
          </div>
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(59,130,246,0.18)" }}
            >
              <ClipboardList className="w-5 h-5" style={{ color: "#60a5fa" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Mevzuat</div>
              <div className="text-[10px] text-gray-500">6331 + KKD Yönetmeliği</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Geçen haftadan köprü + bu haftanın hedefi
  () => (
    <SlideShell>
      <Eyebrow>Köprü · Kişisel emniyet serisi</Eyebrow>
      <H2 className="mb-2">Hijyenden donanıma — son halka</H2>
      <Sub className="max-w-3xl mb-8">
        Önceki haftalarda kişisel emniyetin davranış ve ortam tarafını işledik: temizlik,
        hijyen ve güvenli çalışma alışkanlıkları. Bu hafta zincirin son halkasını
        ekliyoruz: vücudu doğrudan koruyan donanımı.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fbbf24]">
            <Layers className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Şimdiye kadar
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />
              Kişisel temizlik ve hijyen kuralları
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />
              Güvenli çalışma duruşu ve alışkanlıklar
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />
              Ortam kaynaklı tehlikelerin farkındalığı
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="isg-card-amber rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fbbf24]">
            <Target className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Bu haftanın hedefi
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-200">
            <li className="flex gap-2">
              <Check className="w-4 h-4 mt-0.5 text-[#fbbf24] shrink-0" />
              KKD&apos;nin korunma hiyerarşisindeki yerini açıkla
            </li>
            <li className="flex gap-2">
              <Check className="w-4 h-4 mt-0.5 text-[#fbbf24] shrink-0" />
              Vücut bölgesine göre doğru KKD türünü seç
            </li>
            <li className="flex gap-2">
              <Check className="w-4 h-4 mt-0.5 text-[#fbbf24] shrink-0" />
              CE işareti ve EN standardı etiketini oku
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 3 — Dersin akışı (3 durak)
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: yer → türler → seçim &amp; kullanım</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce KKD&apos;nin önlem hiyerarşisindeki yerini ve yasal çerçevesini koyuyoruz;
        sonra vücut bölgesine göre türlerini tanıyoruz; en son doğru seçim, kullanım ve
        bakımla bitiriyoruz.
      </Sub>
      <div className="grid md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "KKD &amp; Mevzuat",
            items: ["Korunma hiyerarşisi", "6331 + KKD Yönetmeliği", "CE işareti & kategoriler"],
            icon: Shield,
            accent: "#f59e0b",
          },
          {
            range: "02",
            title: "KKD Türleri",
            items: ["Baş, göz, kulak, solunum", "El, ayak koruyucu", "Yüksekte düşmeye karşı"],
            icon: HardHat,
            accent: "#06b6d4",
          },
          {
            range: "03",
            title: "Seçim & Kullanım",
            items: ["Doğru beden & uyum", "Etiket / standart okuma", "Bakım, depolama, ömür"],
            icon: ListChecks,
            accent: "#22c55e",
          },
        ].map((g, i) => {
          const Icon = g.icon;
          return (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="isg-card rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${g.accent}18`, border: `1px solid ${g.accent}55` }}
                >
                  <Icon className="w-5 h-5" style={{ color: g.accent }} />
                </div>
                <div>
                  <div
                    className="text-[10px] font-mono uppercase tracking-widest"
                    style={{ color: g.accent }}
                  >
                    Durak {g.range}
                  </div>
                  <div
                    className="text-lg font-semibold text-white"
                    dangerouslySetInnerHTML={{ __html: g.title }}
                  />
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-400">
                {g.items.map((it) => (
                  <li key={it} className="flex items-start gap-2">
                    <ChevronRight
                      className="w-3.5 h-3.5 mt-0.5 shrink-0"
                      style={{ color: g.accent }}
                    />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  1. KKD & MEVZUAT  ───────────────── */

  // 4 — Section 1
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="KKD ve Mevzuat"
      subtitle="KKD korunma hiyerarşisinde en son tercihtir. Önce yasal çerçeveyi ve neden son sırada olduğunu görelim."
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 20px 60px -10px rgba(245, 158, 11, 0.6)"
      icon={<Shield className="w-16 h-16 text-white" />}
    />
  ),

  // 5 — KKD tanımı + 4 ilke
  () => (
    <SlideShell>
      <Eyebrow>Tanım</Eyebrow>
      <H2 className="mb-6">Kişisel koruyucu donanım nedir?</H2>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="isg-card-amber rounded-xl p-5 mb-8"
      >
        <div className="text-base text-gray-200 leading-relaxed">
          Çalışanı, bir veya birden fazla riske karşı korumak amacıyla{" "}
          <span className="text-[#fbbf24] font-semibold">kişi tarafından giyilen, takılan ya da tutulan</span>{" "}
          tüm araç, gereç ve cihazlardır. KKD riski{" "}
          <span className="text-[#fbbf24] font-semibold">kaynağında ortadan kaldırmaz</span>;
          yalnızca çalışana ulaşmadan önce etkisini azaltır.
        </div>
        <div className="text-[10px] text-gray-500 mt-3 font-mono">
          Kişisel Koruyucu Donanımların İşyerlerinde Kullanılması Hakkında Yönetmelik
        </div>
      </motion.div>
      <div className="grid md:grid-cols-4 gap-3">
        {[
          { icon: ArrowDownWideNarrow, t: "Son çare", d: "Diğer önlemler yetmezse devreye girer" },
          { icon: Users, t: "Kişiye özel", d: "Bedene ve işe uygun, paylaşılmaz" },
          { icon: ShieldCheck, t: "Uygunluk", d: "CE işaretli, standarda uygun olmalı" },
          { icon: Wrench, t: "Sürdürülebilir", d: "Bakımı yapılır, ömrü dolunca değişir" },
        ].map((a, i) => {
          const Icon = a.icon;
          return (
            <motion.div
              key={a.t}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="isg-card rounded-xl p-4"
            >
              <Icon className="w-6 h-6 text-[#f59e0b] mb-2" />
              <div className="text-sm font-semibold text-white mb-1">{a.t}</div>
              <div className="text-[11px] text-gray-400">{a.d}</div>
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  ),

  // 6 — Korunma hiyerarşisi
  () => (
    <SlideShell>
      <Eyebrow>Önlem Hiyerarşisi</Eyebrow>
      <H2 className="mb-2">KKD neden en son sırada?</H2>
      <Sub className="max-w-3xl mb-6">
        Risk yönetiminde önce tehlikeyi kaynağında çözmeye çalışırız. KKD tehlikeyi yok
        etmez, sadece çalışana ulaşmasını engellemeye çalışır — bu yüzden en alt basamaktadır.
      </Sub>
      <ControlHierarchy />
    </SlideShell>
  ),

  // 7 — Mevzuat & kategoriler tablosu
  () => (
    <SlideShell>
      <Eyebrow>Yasal çerçeve · KKD kategorileri</Eyebrow>
      <H2 className="mb-2">Üç risk kategorisi</H2>
      <Sub className="max-w-3xl mb-6">
        KKD&apos;ler taşıdıkları risk düzeyine göre üç kategoriye ayrılır. Kategori
        yükseldikçe belgelendirme ve denetim yükümlülüğü de artar.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="isg-card rounded-xl p-1"
      >
        <table className="isg-tbl">
          <thead>
            <tr>
              <th style={{ width: "16%" }}>Kategori</th>
              <th style={{ width: "30%" }}>Risk düzeyi</th>
              <th style={{ width: "27%" }}>Örnek KKD</th>
              <th>Uygunluk değerlendirmesi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className="isg-risk" style={{ background: "#22c55e22", color: "#22c55e" }}>
                  Kategori I
                </span>
              </td>
              <td>Asgari (yüzeysel) riskler</td>
              <td>Bahçe eldiveni, güneş gözlüğü</td>
              <td>Üreticinin öz beyanı yeterli</td>
            </tr>
            <tr>
              <td>
                <span className="isg-risk" style={{ background: "#f59e0b22", color: "#f59e0b" }}>
                  Kategori II
                </span>
              </td>
              <td>Orta düzey riskler (I ve III dışı)</td>
              <td>Baret, koruyucu gözlük, iş ayakkabısı</td>
              <td>Onaylanmış kuruluş tip incelemesi</td>
            </tr>
            <tr>
              <td>
                <span className="isg-risk" style={{ background: "#dc262622", color: "#f87171" }}>
                  Kategori III
                </span>
              </td>
              <td>Ölümcül / geri dönüşsüz riskler</td>
              <td>Solunum cihazı, düşme önleyici, kimyasal kıyafet</td>
              <td>Tip incelemesi + sürekli üretim denetimi</td>
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
        İşveren KKD&apos;yi <span className="text-[#fbbf24]">ücretsiz</span> sağlar, çalışan{" "}
        <span className="text-[#fbbf24]">kullanmakla</span> yükümlüdür (6331 sayılı Kanun).
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  2. KKD TÜRLERİ  ───────────────── */

  // 8 — Section 2
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="KKD Türleri"
      subtitle="Tepeden tırnağa: hangi vücut bölgesi için hangi donanım ve hangi standart geçerli?"
      bgGradient="linear-gradient(135deg, #06b6d4, #0e7490)"
      shadow="0 20px 60px -10px rgba(6, 182, 212, 0.55)"
      icon={<HardHat className="w-16 h-16 text-white" />}
    />
  ),

  // 9 — Tepeden tırnağa harita
  () => (
    <SlideShell>
      <Eyebrow>Vücut bölgesine göre</Eyebrow>
      <H2 className="mb-2">Tepeden tırnağa KKD haritası</H2>
      <Sub className="max-w-3xl mb-6">
        Her bölgenin kendine ait bir riski, donanımı ve uyması gereken bir EN standardı
        vardır. Etiketteki standart numarası, ürünün hangi testten geçtiğini gösterir.
      </Sub>
      <PPEBodyMap />
    </SlideShell>
  ),

  // 10 — Baş, göz, kulak — detay kartları
  () => (
    <SlideShell>
      <Eyebrow>Detay · üst gövde</Eyebrow>
      <H2 className="mb-10">Baş, göz ve kulak koruyucuları</H2>
      <div className="grid md:grid-cols-3 gap-4">
        <FeatureCard
          icon={HardHat}
          title="Baret (EN 397)"
          desc="Düşen cisim, çarpma ve elektrik riskine karşı. Askı sistemi kafaya tam oturmalı; çatlamış kabuk değiştirilir, üzerine delik açılmaz."
          accent="#f59e0b"
          delay={0.1}
        />
        <FeatureCard
          icon={Glasses}
          title="Göz / yüz (EN 166)"
          desc="Toz, kıvılcım, sıçrayan sıvı ve kaynak ışınına karşı gözlük veya siperlik. Çizilmiş cam görüşü bozar, değiştirilmeli."
          accent="#06b6d4"
          delay={0.2}
        />
        <FeatureCard
          icon={Volume2}
          title="Kulak (EN 352)"
          desc="85 dB üstü gürültüde kulak tıkacı veya manşonlu kulaklık. Sürekli gürültü kalıcı işitme kaybı yapar; ses azaltımı (SNR) işe uygun seçilir."
          accent="#a855f7"
          delay={0.3}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 isg-card-amber rounded-xl p-4 text-center"
      >
        <div className="text-sm text-gray-300">
          <span className="text-[#fbbf24] font-semibold">İpucu:</span> Birden fazla KKD bir
          arada takıldığında (baret + gözlük + kulaklık) birbirinin korumasını bozmamalı —
          uyumlu bir set seçilir.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 11 — El, ayak, solunum, düşme — alt gövde + özel risk
  () => (
    <SlideShell>
      <Eyebrow>Detay · el, ayak, solunum, yükseklik</Eyebrow>
      <H2 className="mb-8">Geri kalan dört kritik bölge</H2>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          {
            icon: Hand,
            t: "El koruyucu (EN 388)",
            d: "Kesik, delinme, aşınma ve yırtılmaya karşı. Etiketteki 4 haneli kod (örn. 4543) her bir mekanik direnci 1-5 arası puanlar.",
            accent: "#fbbf24",
          },
          {
            icon: Footprints,
            t: "Ayak koruyucu (EN ISO 20345)",
            d: "Çelik veya kompozit burun düşen cisme karşı 200 J&apos;a dayanır. S3 sınıfı: delinmez taban + su geçirmez + antistatik.",
            accent: "#3b82f6",
          },
          {
            icon: Wind,
            t: "Solunum koruyucu (EN 149)",
            d: "FFP1/FFP2/FFP3 toz maskeleri partikülü filtreler. Gaz/buhar varsa uygun filtreli yarım/tam yüz maskesi gerekir.",
            accent: "#22c55e",
          },
          {
            icon: Anchor,
            t: "Düşmeye karşı (EN 361)",
            d: "Yüksekte çalışmada tam vücut emniyet kemeri + bağlantı halatı + sağlam ankraj noktası. Bel kemeri tek başına düşme durdurmaz.",
            accent: "#ef4444",
          },
        ].map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.t}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="isg-card rounded-xl p-5 flex items-start gap-4"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${p.accent}18`, border: `1px solid ${p.accent}55` }}
              >
                <Icon className="w-5 h-5" style={{ color: p.accent }} />
              </div>
              <div>
                <div className="text-base font-semibold text-white mb-1">{p.t}</div>
                <div
                  className="text-[13px] text-gray-400 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: p.d }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3. SEÇİM & KULLANIM  ───────────────── */

  // 12 — Section 3
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Doğru Seçim &amp; Kullanım"
      subtitle="Doğru ürün yanlış takılırsa korumaz. Etiket okuma, uyum, bakım ve ömür yönetimi."
      bgGradient="linear-gradient(135deg, #22c55e, #15803d)"
      shadow="0 20px 60px -10px rgba(34, 197, 94, 0.6)"
      icon={<ClipboardList className="w-16 h-16 text-white" />}
    />
  ),

  // 13 — Etiket okuma mockup
  () => (
    <SlideShell>
      <Eyebrow>Etiket okuma</Eyebrow>
      <H2 className="mb-8">Bir KKD etiketini doğru oku</H2>
      <div className="grid md:grid-cols-[1fr_1.1fr] gap-10 items-center">
        <HelmetSpec />
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="isg-card rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-white">Mutlaka aranacaklar</span>
            </div>
            <ul className="text-[12px] text-gray-300 space-y-1.5">
              <li>· <span className="text-[#fbbf24]">CE işareti</span> (+ Kat. III ise onaylı kuruluş no)</li>
              <li>· <span className="text-[#fbbf24]">EN standardı</span> numarası</li>
              <li>· <span className="text-[#fbbf24]">Üretim tarihi</span> ve son kullanım / ömür</li>
              <li>· <span className="text-[#fbbf24]">Beden / koruma sınıfı</span> bilgisi</li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 }}
            className="isg-card-red rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-semibold text-white">Uyarı işaretleri</span>
            </div>
            <div className="text-[12px] text-red-200">
              CE işareti yok, etiket okunmuyor, tarih geçmiş ya da kullanım kılavuzu
              Türkçe değilse: o KKD kullanılmaz.
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="isg-card-green rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-white">Bilgi: CE</span>
            </div>
            <div className="text-[12px] text-green-200">
              CE işareti ürünün ilgili güvenlik gereklerini karşıladığını gösterir; bir
              kalite ödülü değil, <span className="font-semibold">asgari uygunluk</span> beyanıdır.
            </div>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  ),

  // 14 — Doğru kullanım: Yapılır / Yapılmaz
  () => (
    <SlideShell>
      <Eyebrow>Pratik</Eyebrow>
      <H2 className="mb-10">KKD kullanımında yapılır vs yapılmaz</H2>
      <div className="grid md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-do p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-6 h-6 text-green-400" />
            <span className="text-lg font-bold text-white">Yapılır</span>
          </div>
          <ul className="space-y-2.5 text-[13px]">
            {[
              "Her kullanımdan önce gözle kontrol et (çatlak, yırtık)",
              "Bedene tam oturacak şekilde ayarla / takı",
              "Görev bittiğinde temizleyip kuru yerde depola",
              "Hasarlı veya ömrü dolmuş KKD&apos;yi değiştir",
              "Kullanım kılavuzuna ve standarda uygun kullan",
              "Birden çok KKD&apos;yi uyumlu set olarak seç",
            ].map((d) => (
              <li key={d} className="flex items-start gap-2 text-green-100">
                <Check className="w-3.5 h-3.5 text-green-400 mt-1 shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: d }} />
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="isg-dont p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-6 h-6 text-red-400" />
            <span className="text-lg font-bold text-white">Yapılmaz</span>
          </div>
          <ul className="space-y-2.5 text-[13px]">
            {[
              "Barete delik açma, üzerine boya / çıkartma sürme",
              "Tek kullanımlık maskeyi yıkayıp tekrar takma",
              "Başkasının teri bulaşmış KKD&apos;yi paylaşma",
              "Çizik gözlük / çatlak baretle çalışmaya devam etme",
              "Eldiveni dönen makine başında takma (kapılma riski)",
              "KKD&apos;yi güneşte / nemde gelişigüzel bırakma",
            ].map((d) => (
              <li key={d} className="flex items-start gap-2 text-red-100">
                <X className="w-3.5 h-3.5 text-red-400 mt-1 shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: d }} />
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 15 — Bakım, depolama, ömür akışı
  () => (
    <SlideShell>
      <Eyebrow>Bakım döngüsü</Eyebrow>
      <H2 className="mb-2">KKD&apos;nin yaşam döngüsü</H2>
      <Sub className="max-w-3xl mb-8">
        KKD &quot;al-tak-unut&quot; değildir. Düzenli kontrol, doğru depolama ve zamanında
        değişimle koruma sürer. Aşağıdaki beş adım sürekli tekrar eder.
      </Sub>
      <div className="grid md:grid-cols-5 gap-3">
        {[
          { n: 1, icon: Tag, t: "Seç", d: "Riske ve bedene uygun, CE&apos;li ürün" },
          { n: 2, icon: ListChecks, t: "Kontrol", d: "Her kullanım öncesi gözle muayene" },
          { n: 3, icon: ShieldCheck, t: "Kullan", d: "Doğru tak, görev boyunca çıkarma" },
          { n: 4, icon: Wrench, t: "Bakım", d: "Temizle, kuru ortamda depola" },
          { n: 5, icon: AlertTriangle, t: "Değiştir", d: "Hasar / ömür dolunca yenile" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="isg-card rounded-xl p-4 text-center"
            >
              <div className="w-9 h-9 rounded-full bg-[#f59e0b] text-black text-sm font-bold flex items-center justify-center mx-auto mb-3">
                {s.n}
              </div>
              <Icon className="w-5 h-5 text-[#fbbf24] mx-auto mb-2" />
              <div className="text-sm font-semibold text-white mb-1">{s.t}</div>
              <div className="text-[11px] text-gray-400 leading-snug">{s.d}</div>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 isg-card-red rounded-xl p-4 text-center"
      >
        <div className="text-sm text-gray-200">
          <span className="text-red-300 font-semibold">Unutma:</span> Bir kez ciddi darbe
          almış baret veya düşmeyi durdurmuş emniyet kemeri görünüşte sağlam olsa bile{" "}
          <span className="text-[#fbbf24] font-semibold">derhal hizmet dışı bırakılır</span>.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 16 — Uygulamalı / bu hafta yapılacaklar
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulama</Eyebrow>
      <H2 className="mb-4">Kendi çalışma ortamın için mini KKD analizi</H2>
      <Sub className="mb-8 max-w-3xl">
        Seçtiğin bir iş kolu için (atölye, şantiye, laboratuvar, mutfak…) aşağıdaki dört
        adımı tamamla. Bir sonraki derse kısa bir doküman olarak getir.
      </Sub>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          {
            icon: ClipboardList,
            t: "1. Tehlikeleri listele",
            d: "İş kolundaki başlıca riskleri yaz: düşen cisim, kıvılcım, gürültü, kayma vb.",
          },
          {
            icon: HardHat,
            t: "2. KKD eşleştir",
            d: "Her tehlikeye karşı uygun KKD&apos;yi ve EN standardını eşleştir (tablo yap).",
          },
          {
            icon: Tag,
            t: "3. Bir etiket fotoğrafla",
            d: "Çevrende gerçek bir KKD etiketi bul; CE, EN no ve üretim tarihini işaretle.",
          },
          {
            icon: ListChecks,
            t: "4. Kontrol listesi yaz",
            d: "O KKD için 5 maddelik kullanım öncesi muayene kontrol listesi oluştur.",
          },
        ].map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="isg-card isg-card-hover rounded-xl p-5 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 bg-[#f59e0b]/15 border border-[#f59e0b]/40">
                <Icon className="w-5 h-5 text-[#fbbf24]" />
              </div>
              <div>
                <div className="text-base font-semibold text-white mb-1">{c.t}</div>
                <div
                  className="text-sm text-gray-400 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: c.d }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 isg-card-amber rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <AlertTriangle className="w-4 h-4 text-[#fbbf24] mt-0.5 shrink-0" />
        <span>
          <span className="text-white">Not:</span> KKD&apos;yi işverenin ücretsiz sağlaması
          yasal zorunluluktur; çalışanın da sağlanan KKD&apos;yi kurallarına uygun kullanması
          gerekir (6331 sayılı Kanun).
        </span>
      </motion.div>
    </SlideShell>
  ),

  // 17 — Sıradaki hafta önizleme + kapanış
  () => (
    <SlideShell bgPattern={false}>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-3xl items-center justify-center mb-8"
          style={{
            background: "linear-gradient(135deg, #f59e0b, #b45309)",
            boxShadow: "0 20px 60px -10px rgba(245, 158, 11, 0.6)",
          }}
        >
          <ShieldAlert className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>7. Hafta tamamlandı · Sıradaki: ortam tehlikeleri</Eyebrow>
        <H1 className="isg-shimmer">Tehlikeyi Tanı</H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta &quot;son savunma hattı&quot; olan KKD&apos;yi kurduk. Sonraki haftalarda
          asıl odağa geçiyoruz: tehlikeyi kaynağında tanımak ve değerlendirmek.
        </Sub>
        <div className="grid md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
          {[
            {
              icon: ShieldAlert,
              t: "İş ortamı tehlikeleri",
              d: "Fiziksel, kimyasal, biyolojik, ergonomik risk grupları",
            },
            {
              icon: Target,
              t: "Risk değerlendirmesi",
              d: "Olasılık × şiddet, risk puanlama mantığına giriş",
            },
            {
              icon: GraduationCap,
              t: "Önlem hiyerarşisi",
              d: "KKD&apos;den önce gelen dört basamağın uygulanışı",
            },
          ].map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.t}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="isg-card rounded-xl p-5 text-left"
              >
                <Icon className="w-5 h-5 text-[#f59e0b] mb-2" />
                <div className="text-sm font-semibold text-white mb-1">{p.t}</div>
                <div className="text-[11px] text-gray-400">{p.d}</div>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 grid md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <div className="isg-card rounded-xl p-4">
            <Calendar className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Ders günü</div>
            <div className="text-sm font-semibold text-white mt-1">
              Perşembe · 13:30 — 15:10
            </div>
          </div>
          <div className="isg-card rounded-xl p-4">
            <Globe className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Derslik</div>
            <div className="text-sm font-semibold text-white mt-1">
              MCBÜ MYO · Amfi 1
            </div>
          </div>
          <div className="isg-card rounded-xl p-4">
            <Users className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Kod</div>
            <div className="text-sm font-semibold text-white mt-1">
              BVA 1109 · 2 AKTS
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 text-[11px] text-gray-600 font-mono"
        >
          Önce can güvenliği — sonra her şey.
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
            background: "linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b)",
            boxShadow: "0 0 16px rgba(245,158,11,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#f59e0b]/70">
          BVA 1109 · 7. Hafta · Kişisel Koruyucu Donanım
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#f59e0b]/50">
            <span className="text-[#f59e0b]">
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
            className="p-1.5 text-gray-500 hover:text-[#f59e0b] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#f59e0b] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#f59e0b]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(245,158,11,0.6)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#f59e0b] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
