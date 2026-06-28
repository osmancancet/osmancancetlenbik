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
  Briefcase,
  Users,
  Scissors,
  Bandage,
  Droplets,
  ShieldCheck,
  Thermometer,
  ClipboardList,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Quote,
  Check,
  X,
  Hand,
  CheckCircle2,
  XCircle,
  Plus,
  Calendar,
  Globe,
  GraduationCap,
  HeartPulse,
  PackageCheck,
  Layers,
  Ruler,
  AlertTriangle,
  ShieldAlert,
  Scale,
  ListChecks,
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

function StatCard({
  icon: Icon,
  value,
  label,
  source,
  delay = 0,
  accent = "#f59e0b",
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
      className="isg-card rounded-xl p-5"
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

function QuoteSlide({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <SlideShell>
      <div className="text-center max-w-4xl mx-auto">
        <Quote className="w-16 h-16 text-[#f59e0b]/40 mx-auto mb-8" />
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
          <div className="text-lg font-semibold text-[#f59e0b]">{author}</div>
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

/* Standart ilk yardım çantası — etiketli tepsi diyagramı */
function KitTray() {
  const cells: Array<{ label: string; qty: string; icon: LucideIcon }> = [
    { label: "Steril gazlı bez", qty: "10 paket", icon: Layers },
    { label: "Hidrofil pamuk", qty: "1 paket", icon: Bandage },
    { label: "Sargı bezi (rulo)", qty: "4 adet", icon: Bandage },
    { label: "Üçgen sargı", qty: "3 adet", icon: Bandage },
    { label: "Yara bandı", qty: "20 adet", icon: Plus },
    { label: "Antiseptik solüsyon", qty: "1 şişe", icon: Droplets },
    { label: "Flaster / mikropor", qty: "2 rulo", icon: Bandage },
    { label: "Küt uçlu makas", qty: "1 adet", icon: Scissors },
    { label: "Cımbız (penset)", qty: "1 adet", icon: Hand },
    { label: "Steril eldiven", qty: "5 çift", icon: ShieldCheck },
    { label: "Tıbbi termometre", qty: "1 adet", icon: Thermometer },
    { label: "Esmark bandajı / turnike", qty: "1 adet", icon: Bandage },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="grid md:grid-cols-[230px_1fr] gap-8 items-center"
    >
      {/* çanta kutusu */}
      <div className="relative mx-auto" style={{ width: 220 }}>
        <div className="isg-kit-handle mx-auto" style={{ width: 76, height: 16 }} />
        <div className="isg-kit-box relative" style={{ width: 220, height: 170 }}>
          <div
            className="isg-kit-cross absolute"
            style={{
              top: "50%",
              left: "50%",
              width: 84,
              height: 24,
              transform: "translate(-50%, -50%)",
            }}
          />
          <div
            className="isg-kit-cross absolute"
            style={{
              top: "50%",
              left: "50%",
              width: 24,
              height: 84,
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
        <div className="text-center text-[10px] text-gray-500 mt-3 font-mono uppercase tracking-wider">
          Standart İçerik · 12 kalem
        </div>
      </div>
      {/* etiketli malzeme bölmeleri */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {cells.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="isg-tray-cell"
            >
              <Icon className="w-4 h-4 mx-auto mb-1" style={{ color: "#b45309" }} />
              <div className="font-semibold text-[11px]">{c.label}</div>
              <div className="text-[9px] text-gray-500 mt-0.5">{c.qty}</div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* Malzeme bilgi kartı — kullanım amacı + uygulama */
function MaterialCard({
  icon: Icon,
  name,
  use,
  apply,
  delay = 0,
  accent = "#f59e0b",
}: {
  icon: LucideIcon;
  name: string;
  use: string;
  apply: string;
  delay?: number;
  accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="isg-card rounded-2xl p-5 flex flex-col"
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${accent}18`, border: `1px solid ${accent}55` }}
        >
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <div className="text-base font-bold text-white leading-tight">{name}</div>
      </div>
      <div className="text-[12px] text-gray-300 mb-3 leading-relaxed">{use}</div>
      <div className="isg-spec-row mt-auto">
        <div className="text-[9px] font-mono uppercase tracking-wider text-[#fbbf24] mb-1">
          Uygulama
        </div>
        <div className="text-[12px] text-gray-300">{apply}</div>
      </div>
    </motion.div>
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
        <Eyebrow>BVA 1109 · 3. Hafta · İlk Yardım Malzemeleri — I</Eyebrow>
        <H1 className="isg-shimmer">
          İlk Yardım
          <br />
          Malzemeleri
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Doğru malzeme, doğru yerde, doğru kullanım — temel donanımı tanıyoruz
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 flex items-center justify-center gap-6 flex-wrap"
        >
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-md flex items-center justify-center text-xl isg-cross-tile">
              +
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Sargı &amp; Örtü</div>
              <div className="text-[10px] text-gray-500">Gazlı bez · sargı · pamuk</div>
            </div>
          </div>
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(34,197,94,0.18)" }}
            >
              <Droplets className="w-5 h-5" style={{ color: "#4ade80" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Antiseptik &amp; Aletler</div>
              <div className="text-[10px] text-gray-500">Solüsyon · makas · cımbız</div>
            </div>
          </div>
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(59,130,246,0.18)" }}
            >
              <Briefcase className="w-5 h-5" style={{ color: "#60a5fa" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Çanta &amp; Dolap</div>
              <div className="text-[10px] text-gray-500">Standart liste · mevzuat</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Geçen haftadan köprü + bu haftanın hedefi
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 2. haftadan 3. haftaya</Eyebrow>
      <H2 className="mb-4">Önce ne yapacağımızı öğrendik; şimdi neyle yapacağımızı</H2>
      <Sub className="mb-8 max-w-3xl">
        İlk iki hafta temel ilkeleri, ABC algoritmasını ve müdahale adımlarını işledik. Bu hafta
        o müdahaleleri mümkün kılan fiziksel donanıma odaklanıyoruz: malzemeleri tanı, ne işe
        yaradıklarını ve nasıl kullanıldıklarını öğren.
      </Sub>
      <div className="grid md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card rounded-xl p-5"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">
            Geçen hafta
          </div>
          <div className="text-sm text-gray-300 leading-relaxed">
            Bilinç kontrolü, ABC, 112 araması ve güvenli yaklaşımı işledik.
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="isg-card-amber rounded-xl p-5"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-[#fbbf24] mb-2">
            Bu hafta — hedef
          </div>
          <div className="text-sm text-gray-200 leading-relaxed">
            Temel ilk yardım malzemelerini gruplayarak tanı; her birinin amacını ve doğru
            kullanımını öğren.
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.44 }}
          className="isg-card rounded-xl p-5"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">
            Sonraki hafta
          </div>
          <div className="text-sm text-gray-300 leading-relaxed">
            Malzemeler — II: tıbbi cihazlar, taşıma araçları ve özel senaryolar.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 3 — Malzeme grupları haritası (dersin akışı)
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2 className="mb-3">Üç malzeme grubu</H2>
      <Sub className="mb-8 max-w-3xl">
        Bir ilk yardım çantasının içindeki onlarca kalemi üç işlevsel gruba ayırarak öğrenmek
        en kolayı. Her grubu ayrı bir bölümde inceleyeceğiz.
      </Sub>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            range: "01",
            title: "Sargı &amp; Örtü Malzemeleri",
            items: ["Steril gazlı bez", "Sargı bezi &amp; üçgen sargı", "Hidrofil pamuk · flaster"],
            icon: Bandage,
            accent: "#f59e0b",
          },
          {
            range: "02",
            title: "Antiseptik · Alet · Koruyucu",
            items: ["Antiseptik solüsyon", "Makas &amp; cımbız", "Eldiven · maske"],
            icon: Droplets,
            accent: "#22c55e",
          },
          {
            range: "03",
            title: "Çanta · Dolap · Mevzuat",
            items: ["Standart içerik listesi", "Araç çantası zorunluluğu", "İşyeri ilk yardım dolabı"],
            icon: Briefcase,
            accent: "#3b82f6",
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
                    Grup {g.range}
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
                    <span dangerouslySetInnerHTML={{ __html: it }} />
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  1. SARGI & ÖRTÜ  ───────────────── */

  // 4 — Section: Sargı & Örtü
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Sargı &amp; Örtü Malzemeleri"
      subtitle="Yarayı kapatan, kanamayı durduran, bir uzvu sabitleyen temel donanım"
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 20px 60px -10px rgba(245, 158, 11, 0.6)"
      icon={<Bandage className="w-16 h-16 text-white" />}
    />
  ),

  // 5 — Sargı & örtü malzeme kartları
  () => (
    <SlideShell>
      <Eyebrow>Sargı &amp; Örtü</Eyebrow>
      <H2 className="mb-8">Dört temel kalem</H2>
      <div className="grid md:grid-cols-2 gap-4">
        <MaterialCard
          icon={Layers}
          name="Steril gazlı bez (kompres)"
          use="Açık yarayı doğrudan örtmek için tek kullanımlık, steril bez. Kanamada üzerine baskı uygulanır."
          apply="Ambalajı açıp ele değdirmeden yaraya kapat; üzerine sargı ile tespit et."
          accent="#f59e0b"
          delay={0.1}
        />
        <MaterialCard
          icon={Bandage}
          name="Sargı bezi (rulo bandaj)"
          use="Gazlı bezi yerinde tutmak ve uzva hafif baskı vermek için sarılan elastik/pamuklu rulo."
          apply="Distal (uç) bölgeden başlayıp yukarı doğru, dolaşımı kesmeden sar."
          accent="#fbbf24"
          delay={0.2}
        />
        <MaterialCard
          icon={Bandage}
          name="Üçgen sargı"
          use="Kol askısı yapmak, geniş bir bölgeyi sabitlemek veya örtmek için çok amaçlı bez."
          apply="Kırık kolda askı (sling); baş yarasında örtü olarak kullanılır."
          accent="#f97316"
          delay={0.3}
        />
        <MaterialCard
          icon={Droplets}
          name="Hidrofil pamuk"
          use="Temizlik ve antiseptik uygulamada taşıyıcı olarak; yaraya doğrudan değdirilmez."
          apply="Antiseptiği pamuğa dök, yara çevresini dıştan içe temizle — yara içine koyma."
          accent="#f59e0b"
          delay={0.4}
        />
      </div>
    </SlideShell>
  ),

  // 6 — Sargı türleri & boyut tablosu
  () => (
    <SlideShell>
      <Eyebrow>Sargı bezi · seçim</Eyebrow>
      <H2 className="mb-2">Hangi genişlik, nereye?</H2>
      <Sub className="max-w-3xl mb-6">
        Sargı bezi genişliği sarılacak vücut bölgesine göre seçilir. Yanlış genişlik ya dolaşımı
        keser ya da bandaj tutmaz. Yaklaşık ölçüler:
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
              <th style={{ width: "24%" }}>Genişlik</th>
              <th style={{ width: "34%" }}>Uygulama bölgesi</th>
              <th>Not</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="font-mono text-[#fbbf24]">2.5 cm</span></td>
              <td>Parmaklar</td>
              <td>Dar; tek parmağı sararken eklemleri serbest bırak.</td>
            </tr>
            <tr>
              <td><span className="font-mono text-[#fbbf24]">5 cm</span></td>
              <td>El bileği, el</td>
              <td>En sık kullanılan ölçü; çantada mutlaka bulunur.</td>
            </tr>
            <tr>
              <td><span className="font-mono text-[#fbbf24]">7.5 cm</span></td>
              <td>Ön kol, dirsek, ayak</td>
              <td>Orta bölgelerde dengeli baskı sağlar.</td>
            </tr>
            <tr>
              <td><span className="font-mono text-[#fbbf24]">10 cm</span></td>
              <td>Üst kol, baldır, diz</td>
              <td>Geniş kas gruplarını hızlı kapatır.</td>
            </tr>
            <tr>
              <td><span className="font-mono text-[#fbbf24]">15 cm</span></td>
              <td>Uyluk, gövde, kalça</td>
              <td>En geniş; büyük yüzeyleri tek turla örter.</td>
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
        Kural: Sargıyı uçtan başlat; parmak uçlarını görünür bırak (renk &amp; ısı kontrolü için).
      </motion.div>
    </SlideShell>
  ),

  // 7 — Sargı yaparken yapılır/yapılmaz
  () => (
    <SlideShell>
      <Eyebrow>Pratik · sargı</Eyebrow>
      <H2 className="mb-10">Sargı uygularken</H2>
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
              "Uçtan (parmak/ayak ucu) başlayıp gövdeye doğru sar",
              "Parmak uçlarını açıkta bırak — dolaşımı kontrol et",
              "Her turda bir öncekinin yarısını örtecek şekilde ilerle",
              "Düğüm / klipsi yaranın olmadığı tarafa koy",
              "Sarıştan sonra renk, ısı, his ve şişlik kontrolü yap",
            ].map((d) => (
              <li key={d} className="flex items-start gap-2 text-green-100">
                <Check className="w-3.5 h-3.5 text-green-400 mt-1 shrink-0" />
                <span>{d}</span>
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
              "Dolaşımı kesecek kadar sıkı sarma (parmak morarır)",
              "Steril bezin yaraya değen yüzeyine elle dokunma",
              "Hidrofil pamuğu doğrudan açık yaraya koyma (lif yapışır)",
              "Saplı cismin (cam, demir) üzerine bastırarak sarma",
              "Kanama sızdırınca ilk bezi çıkarma — üstüne ekle",
            ].map((d) => (
              <li key={d} className="flex items-start gap-2 text-red-100">
                <X className="w-3.5 h-3.5 text-red-400 mt-1 shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2. ANTİSEPTİK · ALET · KORUYUCU  ───────────────── */

  // 8 — Section: Antiseptik & Aletler
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Antiseptik · Alet · Koruyucu"
      subtitle="Temizleyen solüsyonlar, kesip tutan aletler ve ilk yardımcıyı koruyan donanım"
      bgGradient="linear-gradient(135deg, #22c55e, #15803d)"
      shadow="0 20px 60px -10px rgba(34, 197, 94, 0.6)"
      icon={<Droplets className="w-16 h-16 text-white" />}
    />
  ),

  // 9 — Antiseptik solüsyonlar tablosu
  () => (
    <SlideShell>
      <Eyebrow>Antiseptikler</Eyebrow>
      <H2 className="mb-2">Yara temizleyici solüsyonlar</H2>
      <Sub className="max-w-3xl mb-6">
        Antiseptik, canlı doku üzerindeki mikroorganizmaları azaltır. Çantada genellikle şu üç tür
        bulunur — hangisinin nerede kullanıldığı önemlidir.
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
              <th style={{ width: "26%" }}>Solüsyon</th>
              <th style={{ width: "34%" }}>Kullanım</th>
              <th>Dikkat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Povidon iyot (Batikon)</td>
              <td>Geniş spektrumlu yara ve cilt antiseptiği.</td>
              <td>İyot alerjisi ve tiroid hastalarında temkinli kullan.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Klorheksidin</td>
              <td>Cilt ve el dezenfeksiyonu, yara çevresi.</td>
              <td>Göz ve kulak içine kaçırma; mukozada dikkatli.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Steril serum fizyolojik</td>
              <td>Yara yıkama ve göz durulama (%0.9 NaCl).</td>
              <td>Antiseptik değildir; mekanik temizlik amaçlıdır.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Oksijenli su (%3)</td>
              <td>Kabuk yumuşatma, sınırlı temizlik.</td>
              <td>Sağlıklı dokuyu tahriş eder; sürekli kullanma.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 isg-card-amber rounded-lg px-4 py-3 text-[12px] text-gray-300 flex items-start gap-2"
      >
        <AlertTriangle className="w-4 h-4 text-[#fbbf24] mt-0.5 shrink-0" />
        <span>
          Alkol ve kolonya açık yaraya <span className="text-white">doğrudan</span> dökülmez —
          dokuyu yakar ve iyileşmeyi geciktirir. Yara temizliğinde tercih serum fizyolojiktir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  // 10 — Aletler & koruyucu donanım kartları
  () => (
    <SlideShell>
      <Eyebrow>Alet &amp; Koruyucu</Eyebrow>
      <H2 className="mb-8">Kesen, tutan, koruyan</H2>
      <div className="grid md:grid-cols-3 gap-4">
        <MaterialCard
          icon={Scissors}
          name="Küt uçlu makas"
          use="Sargı, flaster ve gerektiğinde giysi kesmek için. Küt ucu cildi yaralamaz."
          apply="Yaralının giysisini keserken makasın küt yüzü cilde gelecek şekilde ilerlet."
          accent="#22c55e"
          delay={0.1}
        />
        <MaterialCard
          icon={Hand}
          name="Cımbız (penset)"
          use="Yüzeysel yabancı cisim (kıymık, diken, cam kırığı) çıkarmak için."
          apply="Yalnızca yüzeyde ve kolay görünen cismi al; derine batanı çıkarma, 112 ara."
          accent="#16a34a"
          delay={0.2}
        />
        <MaterialCard
          icon={Thermometer}
          name="Tıbbi termometre"
          use="Vücut sıcaklığını ölçer; ateş ve hipotermi takibinde kullanılır."
          apply="Dijital modelde sinyal sesini bekle; cıvalı tip kırılırsa toplama, havalandır."
          accent="#22c55e"
          delay={0.3}
        />
        <MaterialCard
          icon={ShieldCheck}
          name="Tek kullanımlık eldiven"
          use="İlk yardımcıyı kan ve vücut sıvılarından korur; çapraz bulaşı önler."
          apply="Lateks alerjisi olana nitril ver; her yaralıda yenisini tak, kullandığını at."
          accent="#16a34a"
          delay={0.4}
        />
        <MaterialCard
          icon={ShieldAlert}
          name="Yüz maskesi / CPR maskesi"
          use="Solunum desteğinde ağız-ağıza temasta bariyer; damlacık korumasını sağlar."
          apply="Tek yönlü valfli CPR maskesini doğru yöne tak; sızdırmaması için iyi otur."
          accent="#22c55e"
          delay={0.5}
        />
        <MaterialCard
          icon={ClipboardList}
          name="İlk yardım kılavuzu &amp; not"
          use="Temel müdahale adımları ve acil numaralar; kayıt için kalem-kâğıt."
          apply="Müdahale saatini, nabzı, verilen bilgiyi not et; ekibe devirde işe yarar."
          accent="#16a34a"
          delay={0.6}
        />
      </div>
    </SlideShell>
  ),

  // 11 — Eldiven giyme/çıkarma adımları (uygulama detayı)
  () => (
    <SlideShell>
      <Eyebrow>Doğru teknik</Eyebrow>
      <H2 className="mb-10">Eldiveni güvenli çıkarma</H2>
      <div className="grid md:grid-cols-[1.1fr_1fr] gap-8">
        <div className="space-y-3">
          <div className="text-sm text-gray-400 mb-3 font-mono uppercase tracking-wider">
            Kontamine yüzeye dokunmadan — 4 adım
          </div>
          {[
            {
              n: 1,
              t: "İlk eldiveni bilekten tut",
              d: "Kirli dış yüzeyden, diğer eldivenli elle bilek hizasından kavra.",
              icon: Hand,
            },
            {
              n: 2,
              t: "Ters çevirerek çıkar",
              d: "Çek; eldiven iç yüzü dışa gelecek şekilde avucunda topla.",
              icon: Layers,
            },
            {
              n: 3,
              t: "Çıplak parmağı içten geçir",
              d: "Çıplak elinin parmağını ikinci eldivenin iç tarafından sok.",
              icon: ChevronRight,
            },
            {
              n: 4,
              t: "İkinciyi de ters çevir, ata",
              d: "İlk eldiveni içine alacak şekilde çıkar; tıbbi atık kutusuna at, elini yıka.",
              icon: PackageCheck,
            },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="isg-card rounded-lg p-3 flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-full bg-[#22c55e] text-black text-xs font-bold flex items-center justify-center shrink-0">
                  {s.n}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#4ade80]" />
                    <div className="text-sm font-semibold text-white">{s.t}</div>
                  </div>
                  <div className="text-[12px] text-gray-400 mt-0.5">{s.d}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="isg-card-green rounded-2xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-wider text-[#4ade80] mb-1">
            Neden önemli?
          </div>
          <div className="text-2xl font-bold text-white mb-5">
            Çapraz bulaşı önlemek
          </div>
          <ul className="space-y-3 text-[13px] text-gray-300">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#4ade80] mt-0.5 shrink-0" />
              Eldivenin dış yüzü kan ve sıvıyla kirlenir — buna asla çıplak elle dokunma.
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#4ade80] mt-0.5 shrink-0" />
              Yanlış çıkarma, korunmak için taktığın eldivenin işlevini sıfırlar.
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#4ade80] mt-0.5 shrink-0" />
              Eldiven çıktıktan sonra eller her durumda su ve sabunla yıkanır.
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3. ÇANTA · DOLAP · MEVZUAT  ───────────────── */

  // 12 — Section: Çanta & Mevzuat
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Çanta · Dolap · Mevzuat"
      subtitle="Standart içerik, bulundurma zorunluluğu ve düzenli bakım"
      bgGradient="linear-gradient(135deg, #3b82f6, #1d4ed8)"
      shadow="0 20px 60px -10px rgba(59, 130, 246, 0.6)"
      icon={<Briefcase className="w-16 h-16 text-white" />}
    />
  ),

  // 13 — Standart çanta içeriği (KitTray mockup)
  () => (
    <SlideShell>
      <Eyebrow>Standart içerik</Eyebrow>
      <H2 className="mb-8">Çantada ne, ne kadar?</H2>
      <KitTray />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 isg-card rounded-xl p-4 text-center"
      >
        <div className="text-xs text-gray-300">
          <span className="text-[#f59e0b] font-mono">NOT:</span> Miktarlar tek kişilik bir çanta
          için örnek değerlerdir. İşyerinde çalışan sayısı arttıkça malzeme adedi ve dolap sayısı
          buna göre artırılır.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 14 — Çanta türleri & bulundurma yerleri
  () => (
    <SlideShell>
      <Eyebrow>Nerede, hangisi?</Eyebrow>
      <H2 className="mb-8">Üç tip, üç ortam</H2>
      <div className="grid md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Briefcase}
          title="Araç ilk yardım çantası"
          desc="Karayolları Trafik Yönetmeliği gereği her araçta bulundurulması zorunludur. Bagajda, kolay ulaşılır yerde tutulur."
          accent="#3b82f6"
          delay={0.1}
        />
        <FeatureCard
          icon={PackageCheck}
          title="İşyeri ilk yardım dolabı"
          desc="6331 sayılı İSG Kanunu kapsamında işyerlerinde bulundurulur; çalışan sayısı ve risk düzeyine göre içeriği belirlenir."
          accent="#22c55e"
          delay={0.2}
        />
        <FeatureCard
          icon={Briefcase}
          title="Ev / seyahat çantası"
          desc="Evde sabit bir yerde, çocukların erişemeyeceği ama yetişkinin bildiği bir dolapta. Seyahatte yanına alınır."
          accent="#f59e0b"
          delay={0.3}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 grid md:grid-cols-3 gap-3 text-center"
      >
        {[
          { icon: Ruler, t: "Görünür &amp; etiketli", d: "Üzerinde beyaz zeminde yeşil/kırmızı haç işareti olmalı." },
          { icon: Thermometer, t: "Serin &amp; kuru", d: "Direkt güneş ve nemden uzak; solüsyonlar bozulmasın." },
          { icon: Hand, t: "Hızlı ulaşılır", d: "Kilitli değil; herkesin yerini bildiği sabit bir nokta." },
        ].map((b) => {
          const Icon = b.icon;
          return (
            <div key={b.t} className="isg-card rounded-lg p-4">
              <Icon className="w-5 h-5 text-[#60a5fa] mb-2 mx-auto" />
              <div
                className="text-sm font-semibold text-white"
                dangerouslySetInnerHTML={{ __html: b.t }}
              />
              <div
                className="text-[11px] text-gray-400 mt-1"
                dangerouslySetInnerHTML={{ __html: b.d }}
              />
            </div>
          );
        })}
      </motion.div>
    </SlideShell>
  ),

  // 15 — Mevzuat & bakım
  () => (
    <SlideShell>
      <Eyebrow>Mevzuat &amp; bakım</Eyebrow>
      <H2 className="mb-8">Bulundurmak yetmez — bakımı şart</H2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-[#60a5fa]">
            <Scale className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Yasal çerçeve</span>
          </div>
          <ul className="space-y-3 text-[13px] text-gray-300">
            <li className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#3b82f6] shrink-0" />
              <span><span className="text-white">6331 sayılı İSG Kanunu:</span> İşveren, ilk yardım malzemesini ve organizasyonunu sağlamakla yükümlüdür.</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#3b82f6] shrink-0" />
              <span><span className="text-white">İlk Yardım Yönetmeliği:</span> Belirli sayıda çalışana en az bir &quot;ilk yardımcı&quot; bulundurma şartı getirir.</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#3b82f6] shrink-0" />
              <span><span className="text-white">Trafik Yönetmeliği:</span> Araçta ilk yardım çantası bulundurmak zorunludur.</span>
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="isg-card-amber rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-[#fbbf24]">
            <ListChecks className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Düzenli bakım</span>
          </div>
          <ul className="space-y-3 text-[13px] text-gray-200">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 mt-0.5 text-[#fbbf24] shrink-0" />
              Son kullanma tarihlerini periyodik kontrol et; geçenleri yenile.
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 mt-0.5 text-[#fbbf24] shrink-0" />
              Kullanılan / eksilen malzemeyi aynı gün tamamla.
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 mt-0.5 text-[#fbbf24] shrink-0" />
              Steril paketlerin yırtık/ıslak olmadığını gözle; bozuğu at.
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 mt-0.5 text-[#fbbf24] shrink-0" />
              İçerik listesini çantanın içine ekle, her kontrolde tarih yaz.
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 16 — Uygulamalı: bu hafta yapılacaklar
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulama</Eyebrow>
      <H2 className="mb-3">Kendi çantanı denetle</H2>
      <Sub className="max-w-3xl mb-8">
        Sonraki derse şu dört adımı yapmış olarak gel. Bu, malzemeleri ezberlemenin en hızlı yolu.
      </Sub>
      <div className="grid md:grid-cols-2 gap-3">
        {[
          {
            t: "Bir çanta aç ve listeyle eşle",
            d: "Evdeki ya da araçtaki çantayı aç; bu derste gördüğün 12 kalemi tek tek işaretle.",
            icon: ClipboardList,
          },
          {
            t: "Eksik &amp; tarihi geçeni not et",
            d: "Biten malzemeleri ve son kullanma tarihi dolmuş ürünleri ayrı bir listeye yaz.",
            icon: ListChecks,
          },
          {
            t: "Sargı boyutlarını ölç",
            d: "Çantandaki sargı bezlerinin genişliğini ölç; hangi bölgeye uygun olduklarını eşleştir.",
            icon: Ruler,
          },
          {
            t: "Eldiven çıkarmayı prova et",
            d: "Bir çift eldivenle, dış yüzeye dokunmadan çıkarma tekniğini 3 kez tekrar et.",
            icon: Hand,
          },
        ].map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="isg-check-row"
            >
              <div className="w-9 h-9 rounded-lg bg-[#f59e0b]/15 border border-[#f59e0b]/40 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[#f59e0b]" />
              </div>
              <div className="flex-1">
                <div
                  className="text-sm font-semibold text-white"
                  dangerouslySetInnerHTML={{ __html: c.t }}
                />
                <div className="text-[11px] text-gray-400 mt-0.5">{c.d}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  ),

  // 17 — Özet + rakamlar
  () => (
    <SlideShell>
      <Eyebrow>Özet</Eyebrow>
      <H2 className="mb-10">Bu hafta neyi unutmamalısın?</H2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={Layers}
          value="3"
          label="Malzeme grubu: örtü · antiseptik-alet · çanta"
          accent="#f59e0b"
        />
        <StatCard
          icon={Ruler}
          value="5 cm"
          label="En sık kullanılan sargı genişliği (el/bilek)"
          delay={0.1}
          accent="#fbbf24"
        />
        <StatCard
          icon={Droplets}
          value="%0.9"
          label="Serum fizyolojik — yara yıkamada güvenli"
          delay={0.2}
          accent="#22c55e"
        />
        <StatCard
          icon={Scale}
          value="6331"
          label="İşyerinde malzeme bulundurmayı zorunlu kılan kanun"
          delay={0.3}
          accent="#3b82f6"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="isg-card-amber rounded-xl p-5"
        >
          <GraduationCap className="w-6 h-6 text-[#fbbf24] mb-3" />
          <div className="text-base font-semibold text-white mb-3">Üç şeyi bil</div>
          <ol className="space-y-2 text-[13px] text-gray-200 list-decimal list-inside">
            <li>Steril bez yaraya, pamuk yara <span className="text-[#fbbf24]">çevresine</span></li>
            <li>Sargı <span className="text-[#fbbf24]">uçtan</span> başlar, dolaşımı kesmez</li>
            <li>Eldiven <span className="text-[#fbbf24]">çapraz bulaşı</span> önler</li>
          </ol>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="isg-card-amber rounded-xl p-5"
        >
          <ListChecks className="w-6 h-6 text-[#fbbf24] mb-3" />
          <div className="text-base font-semibold text-white mb-3">Üç tutum</div>
          <ol className="space-y-2 text-[13px] text-gray-200 list-decimal list-inside">
            <li>Önce <span className="text-[#fbbf24]">kendini koru</span> (eldiven/maske)</li>
            <li>Malzemeyi <span className="text-[#fbbf24]">amacına uygun</span> kullan</li>
            <li>Çantayı <span className="text-[#fbbf24]">düzenli denetle</span></li>
          </ol>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 18 — Sıradaki hafta önizleme + kapanış
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
          <PackageCheck className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>3. Hafta tamamlandı · sıradaki: Malzemeler — II</Eyebrow>
        <H1 className="isg-shimmer">İlk Yardım Malzemeleri — II</H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Temel donanımı tanıdık; haftaya tıbbi cihazlar, taşıma araçları ve özel durum
          malzemelerine geçiyoruz.
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 grid md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <div className="isg-card rounded-xl p-4">
            <HeartPulse className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-sm font-semibold text-white">Tıbbi cihazlar</div>
            <div className="text-[11px] text-gray-400 mt-1">Tansiyon aleti, AED, atel</div>
          </div>
          <div className="isg-card rounded-xl p-4">
            <Users className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-sm font-semibold text-white">Taşıma araçları</div>
            <div className="text-[11px] text-gray-400 mt-1">Sedye, boyunluk, battaniye</div>
          </div>
          <div className="isg-card rounded-xl p-4">
            <ShieldAlert className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-sm font-semibold text-white">Özel durumlar</div>
            <div className="text-[11px] text-gray-400 mt-1">Yanık örtüsü, göz banyosu</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10 grid md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left"
        >
          <div className="isg-card rounded-xl p-4">
            <Calendar className="w-5 h-5 text-[#f59e0b] mb-2" />
            <div className="text-xs text-gray-400">Ders günü</div>
            <div className="text-sm font-semibold text-white mt-1">Perşembe · 13:30 — 15:10</div>
          </div>
          <div className="isg-card rounded-xl p-4">
            <Globe className="w-5 h-5 text-[#f59e0b] mb-2" />
            <div className="text-xs text-gray-400">Derslik</div>
            <div className="text-sm font-semibold text-white mt-1">MCBÜ MYO · Amfi 1</div>
          </div>
          <div className="isg-card rounded-xl p-4">
            <ClipboardList className="w-5 h-5 text-[#f59e0b] mb-2" />
            <div className="text-xs text-gray-400">Hazırlık</div>
            <div className="text-sm font-semibold text-white mt-1">Çanta denetim notları</div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 19 — Kapanış sözü (teknik vurgu)
  () => (
    <QuoteSlide
      quote="Eksik veya bozuk bir malzeme, doğru bilinen bir müdahaleyi sahada işe yaramaz hale getirir."
      author="İlk Yardım Donanımı · Ders notu"
      role="Bu yüzden çantayı düzenli denetlemek müdahalenin yarısıdır."
    />
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
          BVA 1109 · 3. Hafta · İlk Yardım Malzemeleri — I
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
