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
  Bandage,
  Droplet,
  Boxes,
  ShieldAlert,
  ShieldCheck,
  Hand,
  Thermometer,
  ClipboardCheck,
  CalendarClock,
  PackageCheck,
  Layers,
  Target,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  X,
  CheckCircle2,
  XCircle,
  Plus,
  Calendar,
  Globe,
  Users,
  GraduationCap,
  Heart,
  AlertTriangle,
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

/* Sargı / örtü malzemeleri — etiketli ürün kartları */
function DressingShelf() {
  const items: Array<{
    label: string;
    spec: string;
    use: string;
    icon: LucideIcon;
    accent: string;
  }> = [
    {
      label: "Steril gazlı bez",
      spec: "10×10 cm · tekli ambalaj",
      use: "Yaranın üstünü örter, kanı emer",
      icon: Layers,
      accent: "#f59e0b",
    },
    {
      label: "Hidrofil sargı bezi",
      spec: "5 cm × 5 m rulo",
      use: "Gazlı bezi yerinde tutar, sarar",
      icon: Bandage,
      accent: "#fbbf24",
    },
    {
      label: "Üçgen sargı",
      spec: "96×96×136 cm · bez",
      use: "Kol askısı, geniş örtü, baskı",
      icon: Layers,
      accent: "#22c55e",
    },
    {
      label: "Elastik bandaj",
      spec: "8 cm · esnek",
      use: "Burkulmada basınçlı sabitleme",
      icon: Bandage,
      accent: "#3b82f6",
    },
    {
      label: "Yara bandı / flaster",
      spec: "Çeşitli boy · mikropor",
      use: "Küçük kesik, sürtük kapatma",
      icon: Plus,
      accent: "#a855f7",
    },
    {
      label: "Yanık örtüsü",
      spec: "Hidrojel · steril",
      use: "Yanık yüzeyini serinletir, kapatır",
      icon: Droplet,
      accent: "#dc2626",
    },
  ];
  return (
    <div className="grid md:grid-cols-3 gap-3">
      {items.map((it, i) => {
        const Icon = it.icon;
        return (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            className="isg-card rounded-xl p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: `${it.accent}18`,
                  border: `1px solid ${it.accent}45`,
                }}
              >
                <Icon className="w-4 h-4" style={{ color: it.accent }} />
              </div>
              <div className="text-sm font-semibold text-white leading-tight">
                {it.label}
              </div>
            </div>
            <div className="isg-label inline-block mb-2">{it.spec}</div>
            <div className="text-[11px] text-gray-400 leading-relaxed">{it.use}</div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* Duvara monte iş yeri ilk yardım dolabı */
function WallCabinet() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="grid md:grid-cols-[240px_1fr] gap-8 items-center"
    >
      {/* cabinet illustration */}
      <div className="mx-auto" style={{ width: 220 }}>
        <div className="isg-cabinet relative" style={{ width: 220, height: 230 }}>
          <div className="isg-cabinet-door" />
          {/* white cross */}
          <div
            className="isg-cabinet-cross absolute"
            style={{
              top: "50%",
              left: "50%",
              width: 70,
              height: 20,
              transform: "translate(-50%, -50%)",
            }}
          />
          <div
            className="isg-cabinet-cross absolute"
            style={{
              top: "50%",
              left: "50%",
              width: 20,
              height: 70,
              transform: "translate(-50%, -50%)",
            }}
          />
          {/* handle */}
          <div
            className="absolute"
            style={{
              top: "50%",
              right: 14,
              width: 6,
              height: 34,
              background: "rgba(255,255,255,0.7)",
              borderRadius: 3,
              transform: "translateY(-50%)",
            }}
          />
        </div>
        <div className="text-center text-[10px] text-gray-500 mt-3 font-mono uppercase tracking-wider">
          Duvar Tipi · Kilitsiz · Göz Hizası
        </div>
      </div>
      {/* rules */}
      <div className="space-y-2.5">
        {[
          {
            t: "Görünür ve ulaşılabilir",
            d: "Herkesin bildiği, kilitsiz, işaretli bir noktada; önü kapatılmaz.",
            icon: Globe,
          },
          {
            t: "Sorumlusu bellidir",
            d: "İçeriği periyodik kontrol eden bir görevli ve kontrol çizelgesi bulunur.",
            icon: ClipboardCheck,
          },
          {
            t: "Çalışan sayısına göre boyut",
            d: "Tehlike sınıfı ve çalışan sayısı arttıkça malzeme miktarı da artar.",
            icon: Users,
          },
          {
            t: "Eksik anında tamamlanır",
            d: "Kullanılan her malzeme, kullanımdan hemen sonra yenisiyle değiştirilir.",
            icon: PackageCheck,
          },
        ].map((r, i) => {
          const Icon = r.icon;
          return (
            <motion.div
              key={r.t}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="isg-card rounded-lg p-3 flex items-start gap-3"
            >
              <Icon className="w-4 h-4 text-[#fbbf24] mt-0.5 shrink-0" />
              <div>
                <div className="text-sm font-semibold text-white">{r.t}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{r.d}</div>
              </div>
            </motion.div>
          );
        })}
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
        <Eyebrow>BVA 1109 · 4. Hafta · İlk Yardım Malzemeleri II</Eyebrow>
        <H1 className="isg-shimmer">
          İlk Yardım
          <br />
          Malzemeleri — II
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Sargı, örtü ve sabitleme malzemeleri; iş yeri dolabı; kontrol ve son kullanma takibi
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
              <div className="text-[10px] text-gray-500">Gazlı bez · sargı · üçgen sargı</div>
            </div>
          </div>
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(34,197,94,0.18)" }}
            >
              <Briefcase className="w-5 h-5" style={{ color: "#4ade80" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">İş Yeri Dolabı</div>
              <div className="text-[10px] text-gray-500">Zorunlu içerik · konum</div>
            </div>
          </div>
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(245,158,11,0.18)" }}
            >
              <CalendarClock className="w-5 h-5" style={{ color: "#fbbf24" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Kontrol &amp; SKT</div>
              <div className="text-[10px] text-gray-500">Periyodik denetim</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Geçen haftadan köprü + bu haftanın hedefi
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 3. haftadan 4. haftaya</Eyebrow>
      <H2>Çantayı tanıdık; şimdi içindeki malzemeyi tek tek tanıyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta ilk yardım malzemelerine giriş yaptık: çantanın amacı, temel
        antiseptikler ve küçük el aletleri. Bu hafta II. bölümde sargı–örtü ailesini,
        sabitleme malzemelerini, iş yeri dolabının zorunlu içeriğini ve malzeme
        kontrolünü ele alıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fbbf24]">
            <PackageCheck className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Geçen hafta (III. konu)
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />Çantanın amacı ve temel mantığı</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />Antiseptik solüsyonlar ve dezenfeksiyon</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />Makas, cımbız, eldiven gibi el aletleri</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="isg-card-amber rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#4ade80]">
            <Target className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Bu hafta (II. devam)
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />Sargı, örtü ve sabitleme malzemeleri</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />İş yeri ilk yardım dolabı ve zorunlu içerik</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />Sterilite, son kullanma ve periyodik kontrol</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  1. SARGI & SABİTLEME  ───────────────── */

  // 3 — Section 1
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Sargı &amp; Sabitleme"
      subtitle="Yarayı kapatan, tutan ve hareketsiz kılan malzemeler — doğru ürünü doğru işe seç"
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 20px 60px -10px rgba(245, 158, 11, 0.6)"
      icon={<Bandage className="w-16 h-16 text-white" />}
    />
  ),

  // 5 — Sargı / örtü malzemeleri rafı
  () => (
    <SlideShell>
      <Eyebrow>Örtü &amp; Sargı Ailesi</Eyebrow>
      <H2 className="mb-3">Yara kapatma malzemeleri</H2>
      <Sub className="max-w-3xl mb-6">
        Her birinin ayrı bir işi var. &quot;Örtü&quot; yarayı kapatır, &quot;sargı&quot;
        örtüyü yerinde tutar. Karıştırmak, yaranın açılmasına veya dolaşımın bozulmasına yol açar.
      </Sub>
      <DressingShelf />
    </SlideShell>
  ),

  // 6 — Üçgen sargı kullanım alanları (çok amaçlı)
  () => (
    <SlideShell>
      <Eyebrow>Çok Amaçlı · Üçgen Sargı</Eyebrow>
      <H2 className="mb-3">Tek malzeme, çok kullanım</H2>
      <Sub className="max-w-3xl mb-8">
        Üçgen sargı, çantadaki en esnek malzemedir. Düzgün katlanınca dar bir bandaja,
        açık halde geniş bir örtüye dönüşür.
      </Sub>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-3">
          {[
            {
              t: "Kol askısı (sling)",
              d: "Kırık/çıkık kolu göğse yaslayıp hareketsiz kılar.",
              icon: Hand,
            },
            {
              t: "Geniş yara örtüsü",
              d: "Açık halde büyük yüzeyleri (el, baş, diz) kapatır.",
              icon: Layers,
            },
            {
              t: "Baskılı pansuman",
              d: "Katlanıp kanayan bölgeye basınç uygulamada kullanılır.",
              icon: Target,
            },
            {
              t: "Geçici sabitleme",
              d: "Atelle birlikte uzvu gövdeye bağlamada yardımcı olur.",
              icon: ShieldCheck,
            },
          ].map((u, i) => {
            const Icon = u.icon;
            return (
              <motion.div
                key={u.t}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="isg-card rounded-lg p-3 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-md bg-[#f59e0b]/15 border border-[#f59e0b]/40 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#fbbf24]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{u.t}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{u.d}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="isg-card-amber rounded-2xl p-6 flex flex-col justify-center"
        >
          <Lightbulb className="w-6 h-6 text-[#fbbf24] mb-3" />
          <div className="text-base font-semibold text-white mb-3">
            Sargıda altın kural
          </div>
          <ul className="space-y-2.5 text-[13px] text-gray-200">
            <li className="flex gap-2">
              <Check className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />
              Uçtan merkeze değil, <span className="text-[#fbbf24]">merkezden uca</span> doğru kontrol et.
            </li>
            <li className="flex gap-2">
              <Check className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />
              Parmak ucu açıkta kalsın — <span className="text-[#fbbf24]">renk ve sıcaklık</span> izlenebilsin.
            </li>
            <li className="flex gap-2">
              <Check className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />
              Karıncalanma, morarma, soğuma varsa <span className="text-[#fbbf24]">çok sıkı</span>; gevşet.
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 7 — Sabitleme malzemeleri (atel) — karşılaştırma kartları
  () => (
    <SlideShell>
      <Eyebrow>Sabitleme · Atel</Eyebrow>
      <H2 className="mb-10">Kırık/çıkık şüphesinde sabitleme malzemeleri</H2>
      <div className="grid md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Layers}
          title="Hazır atel (SAM splint)"
          desc="Köpük kaplı, bükülebilir alüminyum şerit. İstenen şekli alır, hafif ve yıkanabilir."
          accent="#f59e0b"
          delay={0.1}
        />
        <FeatureCard
          icon={Boxes}
          title="Sert / tahta atel"
          desc="Düz, sert yüzey. Uzvu eklemin üstü ve altından destekleyerek hareketi engeller."
          accent="#3b82f6"
          delay={0.2}
        />
        <FeatureCard
          icon={ShieldCheck}
          title="Boyunluk (servikal)"
          desc="Boyun travması şüphesinde başı–boynu sabit tutar. Yalnızca eğitimli kişi takmalı."
          accent="#a855f7"
          delay={0.3}
        />
        <FeatureCard
          icon={Bandage}
          title="Elastik / üçgen bağ"
          desc="Ateli uzva sabitleyen bağlar. Çok sıkmadan, dolaşımı engellemeden uygula."
          accent="#22c55e"
          delay={0.4}
        />
        <FeatureCard
          icon={Hand}
          title="Doğaçlama destek"
          desc="Atel yoksa karton, dergi, tahta parçası ped ile sarılarak geçici kullanılabilir."
          accent="#fbbf24"
          delay={0.5}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="isg-card-red rounded-xl p-6 flex flex-col justify-center"
        >
          <ShieldAlert className="w-6 h-6 text-red-400 mb-3" />
          <div className="text-sm font-semibold text-white mb-2">Sabitleme ilkesi</div>
          <div className="text-[12px] text-red-100 leading-relaxed">
            Atel, kırığın <span className="text-white font-semibold">bir üst ve bir alt eklemini</span>{" "}
            içine alacak kadar uzun olmalı. Kırık ucunu yerine oturtmaya çalışma; bulduğun
            pozisyonda sabitle.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 8 — Sterilite & koruyucu malzeme
  () => (
    <SlideShell>
      <Eyebrow>Sterilite &amp; Koruma</Eyebrow>
      <H2 className="mb-3">Steril mi, temiz mi? Fark hayati</H2>
      <Sub className="max-w-3xl mb-8">
        Yarayla temas eden örtü <span className="text-[#fbbf24]">steril</span> olmalı; ambalajı
        açılmış veya tarihi geçmiş malzeme artık steril değildir. İlk yardımcı da kendini
        korumalıdır.
      </Sub>
      <div className="grid md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card-green rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-6 h-6 text-green-400" />
            <span className="text-lg font-bold text-white">Sterilite kuralları</span>
          </div>
          <ul className="space-y-2.5 text-[13px] text-green-100">
            {[
              "Ambalajı yara üstünde, son anda aç",
              "Örtünün yaraya değecek yüzeyine elle dokunma",
              "Ambalajı yırtık/ıslak/açık olanı kullanma",
              "Her yara için ayrı, yeni örtü kullan",
            ].map((d) => (
              <li key={d} className="flex items-start gap-2">
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
          className="isg-card-amber rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Hand className="w-6 h-6 text-[#fbbf24]" />
            <span className="text-lg font-bold text-white">İlk yardımcının korunması</span>
          </div>
          <ul className="space-y-2.5 text-[13px] text-gray-200">
            {[
              "Tek kullanımlık eldiven — kan/vücut sıvısı bariyeri",
              "Mümkünse koruyucu maske ve gözlük",
              "Sun'i solunumda cep maskesi (yüz kalkanı)",
              "Uygulama sonrası elleri mutlaka yıka",
            ].map((d) => (
              <li key={d} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#fbbf24] mt-1 shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2. İŞ YERİ DOLABI  ───────────────── */

  // 9 — Section 2
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="İş Yeri İlk Yardım Dolabı"
      subtitle="İş yerinde malzeme bireysel değil kurumsaldır — bulundurma yükümlülüğü işverenindir"
      bgGradient="linear-gradient(135deg, #22c55e, #15803d)"
      shadow="0 20px 60px -10px rgba(34, 197, 94, 0.6)"
      icon={<Briefcase className="w-16 h-16 text-white" />}
    />
  ),

  // 10 — Duvar dolabı mockup + kurallar
  () => (
    <SlideShell>
      <Eyebrow>Bulundurma · Konum</Eyebrow>
      <H2 className="mb-8">İş yeri dolabı nerede, nasıl durmalı?</H2>
      <WallCabinet />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 isg-card rounded-xl p-4 text-center"
      >
        <div className="text-xs text-gray-300">
          <span className="text-[#f59e0b] font-mono">YASAL:</span> 6331 sayılı İş Sağlığı ve
          Güvenliği Kanunu ve İlk Yardım Yönetmeliği gereği iş yerlerinde ilk yardım malzemesi
          bulundurmak <span className="text-[#fbbf24] font-semibold">işverenin yükümlülüğüdür</span>.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 11 — Zorunlu içerik listesi (tablo)
  () => (
    <SlideShell>
      <Eyebrow>Dolabın İçi · Zorunlu İçerik</Eyebrow>
      <H2 className="mb-2">Asgari bulunması gereken malzemeler</H2>
      <Sub className="max-w-3xl mb-6">
        Aşağıdaki kalemler temel bir iş yeri dolabının çekirdeğidir. Kesin miktarlar; iş yerinin
        tehlike sınıfına ve çalışan sayısına göre yönetmelikle belirlenir.
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
              <th style={{ width: "30%" }}>Malzeme</th>
              <th style={{ width: "26%" }}>Örnek / Ölçü</th>
              <th>Ne işe yarar?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Steril gazlı bez</td>
              <td><span className="font-mono text-[#67e8f9]">10×10 cm · tekli</span></td>
              <td>Yarayı örtmek, kanamada baskı pedi</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Hidrofil sargı bezi</td>
              <td><span className="font-mono text-[#67e8f9]">5 cm / 10 cm rulo</span></td>
              <td>Örtüyü sarıp yerinde tutmak</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Üçgen sargı</td>
              <td><span className="font-mono text-[#67e8f9]">~96×96×136 cm</span></td>
              <td>Kol askısı, geniş örtü, baskı</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Antiseptik solüsyon</td>
              <td><span className="font-mono text-[#67e8f9]">Povidon iyot vb.</span></td>
              <td>Yara çevresini temizlemek</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Tek kullanımlık eldiven</td>
              <td><span className="font-mono text-[#67e8f9]">Lateks/nitril · çift</span></td>
              <td>Bulaş bariyeri (ilk yardımcı koruması)</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Makas &amp; cımbız</td>
              <td><span className="font-mono text-[#67e8f9]">Paslanmaz</span></td>
              <td>Sargı kesme, yüzeysel cisim alma</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Flaster &amp; yara bandı</td>
              <td><span className="font-mono text-[#67e8f9]">Mikropor · çeşitli</span></td>
              <td>Küçük kesik ve örtü sabitleme</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Esnek bandaj / atel</td>
              <td><span className="font-mono text-[#67e8f9]">8 cm · sabitleyici</span></td>
              <td>Burkulma ve kırıkta sabitleme</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-3 text-[11px] text-gray-500 font-mono"
      >
        Not: Tam liste ve miktarlar İlk Yardım Yönetmeliği eklerinde tehlike sınıfına göre tanımlıdır.
      </motion.div>
    </SlideShell>
  ),

  // 12 — Çalışan sayısı / tehlike sınıfı → ilk yardımcı
  () => (
    <SlideShell>
      <Eyebrow>Ölçek · Kim, Ne Kadar?</Eyebrow>
      <H2 className="mb-2">Malzeme ve ilk yardımcı sayısı sabit değildir</H2>
      <Sub className="max-w-3xl mb-8">
        İş yeri büyüdükçe ve tehlike sınıfı arttıkça hem malzeme miktarı hem de bulundurulması
        gereken eğitimli ilk yardımcı sayısı artar. Mantık basittir: daha çok kişi, daha çok risk,
        daha çok hazırlık.
      </Sub>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            t: "Az tehlikeli",
            d: "Ofis, perakende gibi düşük riskli iş yerleri. Çalışan başına asgari bir ilk yardımcı oranı.",
            c: "#22c55e",
            icon: ShieldCheck,
          },
          {
            t: "Tehlikeli",
            d: "Üretim, depo gibi orta riskli ortamlar. Oran ve malzeme miktarı yükselir.",
            c: "#f59e0b",
            icon: AlertTriangle,
          },
          {
            t: "Çok tehlikeli",
            d: "İnşaat, maden, kimya gibi yüksek riskli işler. En yüksek ilk yardımcı oranı ve donanım.",
            c: "#dc2626",
            icon: ShieldAlert,
          },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.12 }}
              className="isg-card rounded-xl p-5"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                style={{ background: `${s.c}18`, border: `1px solid ${s.c}55` }}
              >
                <Icon className="w-6 h-6" style={{ color: s.c }} />
              </div>
              <div className="text-lg font-semibold text-white mb-1">{s.t}</div>
              <div className="text-[12px] text-gray-400 leading-relaxed">{s.d}</div>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 isg-card-amber rounded-xl p-4 text-center"
      >
        <div className="text-sm text-gray-300">
          Kesin oranlar İlk Yardım Yönetmeliği&apos;nde tanımlıdır; iş yeri bu sayıyı{" "}
          <span className="text-[#fbbf24] font-semibold">eğitimli ilk yardımcı</span> bulundurarak
          sağlamak zorundadır.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  3. KONTROL & SKT  ───────────────── */

  // 13 — Section 3
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Kontrol &amp; Son Kullanma"
      subtitle="Dolu görünen dolap güvenlik vermez — kontrol edilmeyen malzeme kritik anda işe yaramaz"
      bgGradient="linear-gradient(135deg, #3b82f6, #1d4ed8)"
      shadow="0 20px 60px -10px rgba(59, 130, 246, 0.6)"
      icon={<ClipboardCheck className="w-16 h-16 text-white" />}
    />
  ),

  // 14 — Kontrol çizelgesi tablosu (SKT durumları)
  () => (
    <SlideShell>
      <Eyebrow>Periyodik Kontrol · Çizelge</Eyebrow>
      <H2 className="mb-2">Malzeme kontrol kaydı nasıl tutulur?</H2>
      <Sub className="max-w-3xl mb-6">
        Sorumlu kişi düzenli aralıkla her kalemi sayar, son kullanma tarihini ve ambalaj
        bütünlüğünü kontrol eder. Tarihi yaklaşan veya bozulan malzeme önceden değiştirilir.
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
              <th style={{ width: "28%" }}>Malzeme</th>
              <th style={{ width: "14%" }}>Adet</th>
              <th style={{ width: "22%" }}>Son Kullanma</th>
              <th>Durum / Aksiyon</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white">Steril gazlı bez</td>
              <td className="font-mono">12 / 12</td>
              <td className="font-mono text-gray-400">2027-08</td>
              <td><span className="isg-expiry isg-expiry-ok">UYGUN</span></td>
            </tr>
            <tr>
              <td className="text-white">Antiseptik solüsyon</td>
              <td className="font-mono">1 / 1</td>
              <td className="font-mono text-gray-400">2026-09</td>
              <td><span className="isg-expiry isg-expiry-warn">YAKIN · değiştir</span></td>
            </tr>
            <tr>
              <td className="text-white">Tek kullanımlık eldiven</td>
              <td className="font-mono">2 / 6</td>
              <td className="font-mono text-gray-400">2028-01</td>
              <td><span className="isg-expiry isg-expiry-warn">EKSİK · tamamla</span></td>
            </tr>
            <tr>
              <td className="text-white">Üçgen sargı</td>
              <td className="font-mono">3 / 3</td>
              <td className="font-mono text-gray-400">—</td>
              <td><span className="isg-expiry isg-expiry-ok">UYGUN</span></td>
            </tr>
            <tr>
              <td className="text-white">Yanık örtüsü (hidrojel)</td>
              <td className="font-mono">2 / 2</td>
              <td className="font-mono text-gray-400">2026-07</td>
              <td><span className="isg-expiry isg-expiry-warn">GEÇMEK ÜZERE</span></td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-3 text-[11px] text-gray-500 font-mono"
      >
        Tarih biçimi: YYYY-AA · &quot;Adet&quot; sütunu mevcut / olması gereken miktarı gösterir.
      </motion.div>
    </SlideShell>
  ),

  // 15 — Yapılır / Yapılmaz (malzeme yönetimi)
  () => (
    <SlideShell>
      <Eyebrow>Pratik · Malzeme Yönetimi</Eyebrow>
      <H2 className="mb-10">Yapılır vs Yapılmaz</H2>
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
              "Steril örtüyü yara üstünde, son anda aç",
              "Kullanılan malzemeyi hemen yenisiyle değiştir",
              "SKT&apos;si yaklaşan ürünü öne al, önce kullan",
              "Eldiven tak — kanla teması engelle",
              "Kontrol çizelgesini tarih + imza ile tut",
              "Dolabı göz hizasında ve işaretli tut",
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
              "Ambalajı açık/ıslak örtüyü &quot;idare eder&quot; deyip kullanma",
              "Tarihi geçmiş antiseptik veya örtü bırakma",
              "Sargıyı dolaşımı kesecek kadar sıkma",
              "Kırık ucunu yerine oturtmaya çalışma",
              "Aynı eldivenle birden çok yaralıya dokunma",
              "Dolabı kilitli ya da erişilemez yere koyma",
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

  // 16 — Uygulamalı alıştırma (bu hafta)
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı alıştırma</Eyebrow>
      <H2>Dört adımda kendi dolap denetimin</H2>
      <Sub className="mt-3 max-w-3xl">
        Evdeki, arabadaki veya staj yaptığın iş yerindeki dolaptan birini seç. Sonraki derse
        bu dördünü tamamlamış ve kısa bir not olarak getirmiş gelmen bekleniyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          {
            icon: Boxes,
            title: "Malzemeyi say ve grupla",
            desc: "Örtü, sargı, sabitleme, koruyucu olarak ayır; her gruptan kaç adet var listele.",
            accent: "#f59e0b",
          },
          {
            icon: CalendarClock,
            title: "Son kullanma tarihlerini tara",
            desc: "Her kalemin SKT&apos;sini oku; geçmiş veya 1 ay içinde geçecek olanları işaretle.",
            accent: "#3b82f6",
          },
          {
            icon: ClipboardCheck,
            title: "Basit bir kontrol çizelgesi doldur",
            desc: "Malzeme · adet · SKT · durum sütunlu küçük bir tablo hazırla (kâğıt veya tablo).",
            accent: "#22c55e",
          },
          {
            icon: PackageCheck,
            title: "Eksik listesi çıkar",
            desc: "Tamamlanması gereken kalemleri yaz; bunun &quot;alışveriş listesi&quot; mantığını not et.",
            accent: "#a855f7",
          },
        ].map((t, i) => {
          const Icon = t.icon;
          return (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="isg-card isg-card-hover rounded-xl p-5 flex items-start gap-4"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${t.accent}18`, border: `1px solid ${t.accent}55` }}
              >
                <Icon className="w-5 h-5" style={{ color: t.accent }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono">
                    {i + 1}
                  </span>
                  <h3 className="text-base font-semibold text-white">{t.title}</h3>
                </div>
                <p
                  className="text-sm text-gray-400 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: t.desc }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  ),

  // 17 — Sıradaki hafta önizlemesi + kapanış
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{
            background: "linear-gradient(135deg, #f59e0b, #b45309)",
            boxShadow: "0 20px 60px -10px rgba(245, 158, 11, 0.6)",
          }}
        >
          <Heart className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>4. hafta tamamlandı · sıradaki: 5. hafta</Eyebrow>
        <H1 className="isg-shimmer">Yaralanmalar &amp; Pansuman</H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Malzemeyi tanıdık; artık onu kullanıyoruz. Hafta 5&apos;te yara türleri, kanama
          kontrolü ve pansuman uygulamalarına geçiyoruz.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
          <FeatureCard
            icon={Droplet}
            title="Yara &amp; Kanama"
            desc="Yara türleri, direkt baskı, baskılı pansuman ile kanama kontrolü."
            accent="#dc2626"
            delay={0.1}
          />
          <FeatureCard
            icon={Bandage}
            title="Pansuman Tekniği"
            desc="Örtüyü kapatma, sargıyla sabitleme, dolaşımı kontrol etme."
            accent="#f59e0b"
            delay={0.2}
          />
          <FeatureCard
            icon={Thermometer}
            title="Yanık &amp; Soğuk"
            desc="Yanık örtüsü ve soğutma; yanlış uygulamalardan kaçınma."
            accent="#3b82f6"
            delay={0.3}
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
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
            <GraduationCap className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Hazırlık</div>
            <div className="text-sm font-semibold text-white mt-1">
              Dolap denetim notun
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
      </div>
    </SlideShell>
  ),

  // 18 — Özet
  () => (
    <SlideShell>
      <Eyebrow>Özet</Eyebrow>
      <H2 className="mb-10">Bu hafta neyi unutmamalısın?</H2>
      <div className="grid md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card-amber rounded-xl p-5"
        >
          <Target className="w-6 h-6 text-[#fbbf24] mb-3" />
          <div className="text-base font-semibold text-white mb-3">
            Üç teknik ayrım
          </div>
          <ol className="space-y-2 text-[13px] text-gray-200 list-decimal list-inside">
            <li><span className="text-[#fbbf24] font-semibold">Örtü</span> yarayı kapatır, <span className="text-[#fbbf24] font-semibold">sargı</span> örtüyü tutar</li>
            <li><span className="text-[#fbbf24] font-semibold">Steril</span> ≠ temiz; ambalaj açıksa steril değildir</li>
            <li>Atel <span className="text-[#fbbf24] font-semibold">üst ve alt eklemi</span> içine almalı</li>
          </ol>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="isg-card-amber rounded-xl p-5"
        >
          <ClipboardCheck className="w-6 h-6 text-[#fbbf24] mb-3" />
          <div className="text-base font-semibold text-white mb-3">
            Üç yönetim kuralı
          </div>
          <ol className="space-y-2 text-[13px] text-gray-200 list-decimal list-inside">
            <li>İş yerinde malzeme <span className="text-[#fbbf24] font-semibold">işverenin</span> yükümlülüğü</li>
            <li>Dolap <span className="text-[#fbbf24] font-semibold">görünür, ulaşılır, işaretli</span></li>
            <li><span className="text-[#fbbf24] font-semibold">Kontrol et + yenile</span>; SKT&apos;yi takip et</li>
          </ol>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 isg-card rounded-xl p-5 text-center"
      >
        <div className="text-sm text-gray-300">
          <span className="text-[#f59e0b] font-semibold">Özetle:</span> İyi bir ilk yardım, doğru
          malzemenin steril, eksiksiz ve kullanılabilir halde elinin altında olmasıyla başlar.
          Kontrol edilmeyen dolap, boş dolaptır.
        </div>
      </motion.div>
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
          BVA 1109 · 4. Hafta · İlk Yardım Malzemeleri II
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
