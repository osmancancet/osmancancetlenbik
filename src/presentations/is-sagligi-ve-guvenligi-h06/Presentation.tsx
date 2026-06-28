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
  Shield,
  ShieldAlert,
  ShieldCheck,
  Footprints,
  Ear,
  Wind,
  Hand,
  Eye,
  Flame,
  Volume2,
  Zap,
  Droplets,
  Layers,
  ListChecks,
  ClipboardCheck,
  AlertTriangle,
  Check,
  X,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Calendar,
  Globe,
  Users,
  Target,
  Activity,
  type LucideIcon,
} from "lucide-react";
import "./styles.css";

/* ============================================================
   PRIMITIVES  (h01 ile birebir aynı)
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
   KONUYA ÖZGÜ MOCKUP'LAR  (Hafta 6 — KKD)
   ============================================================ */

/* Kontrol hiyerarşisi — yukarıdan aşağı etkinlik azalır */
function ControlHierarchy() {
  const levels: Array<{
    rank: string;
    title: string;
    desc: string;
    color: string;
    width: number;
  }> = [
    {
      rank: "1",
      title: "Ortadan kaldırma (Elimination)",
      desc: "Tehlikeyi tamamen yok et — en etkili çözüm",
      color: "#22c55e",
      width: 100,
    },
    {
      rank: "2",
      title: "İkame (Substitution)",
      desc: "Tehlikeli maddeyi/işlemi daha güvenliyle değiştir",
      color: "#84cc16",
      width: 86,
    },
    {
      rank: "3",
      title: "Mühendislik önlemleri",
      desc: "Makine koruyucu, havalandırma, otomasyon, bariyer",
      color: "#eab308",
      width: 72,
    },
    {
      rank: "4",
      title: "İdari önlemler",
      desc: "Prosedür, eğitim, vardiya/maruziyet süresi, uyarı levhası",
      color: "#f59e0b",
      width: 58,
    },
    {
      rank: "5",
      title: "Kişisel Koruyucu Donanım (KKD)",
      desc: "Son savunma hattı — diğerleri yetmediğinde",
      color: "#dc2626",
      width: 44,
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="isg-card rounded-xl p-6 max-w-4xl mx-auto"
    >
      <div className="space-y-2.5">
        {levels.map((l, i) => (
          <motion.div
            key={l.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.1 }}
            className="flex items-center gap-3 mx-auto"
            style={{ width: `${l.width}%` }}
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
              style={{ background: `${l.color}22`, color: l.color, border: `1px solid ${l.color}55` }}
            >
              {l.rank}
            </span>
            <div
              className="flex-1 rounded-lg px-4 py-2.5"
              style={{ background: `${l.color}12`, border: `1px solid ${l.color}40` }}
            >
              <div className="text-sm font-semibold text-white">{l.title}</div>
              <div className="text-[11px] text-gray-400">{l.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between text-[11px] font-mono text-gray-500">
        <span className="flex items-center gap-1.5">
          <ArrowRight className="w-3.5 h-3.5 -rotate-90 text-[#22c55e]" /> En etkili
        </span>
        <span className="flex items-center gap-1.5">
          En az etkili
          <ArrowRight className="w-3.5 h-3.5 rotate-90 text-[#dc2626]" />
        </span>
      </div>
    </motion.div>
  );
}

/* Güvenlik levhası kartı — zorunluluk (mavi disk) / uyarı (sarı üçgen) */
function SignCard({
  kind,
  icon: Icon,
  label,
  delay = 0,
}: {
  kind: "zorunlu" | "uyari" | "yasak";
  icon: LucideIcon;
  label: string;
  delay?: number;
}) {
  const color =
    kind === "zorunlu" ? "#2563eb" : kind === "yasak" ? "#dc2626" : "#000000";
  const border =
    kind === "zorunlu" ? "#2563eb" : kind === "yasak" ? "#dc2626" : "#eab308";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="isg-sign-card"
      style={{ border: `1px solid ${border}55` }}
    >
      {kind === "uyari" ? (
        <div className="isg-sign-tri">
          <Icon className="w-6 h-6" style={{ color: "#000" }} />
        </div>
      ) : (
        <div className="isg-sign-disc" style={{ background: color }}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      )}
      <div className="text-[12px] font-semibold text-white">{label}</div>
      <div className="text-[9px] uppercase tracking-wider text-gray-500 font-mono mt-1">
        {kind === "zorunlu" ? "Zorunluluk" : kind === "yasak" ? "Yasak" : "Uyarı"}
      </div>
    </motion.div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ───── 1. Kapak ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 1109 · 6. Hafta · Kişisel Emniyet — II</Eyebrow>
        <H1 className="isg-shimmer">
          Kişisel Emniyet
          <br />
          Sağlama — II
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Kişisel koruyucu donanım (KKD): doğru ekipman, doğru tehlike, doğru kullanım.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Layers}
            title="Kontrol Hiyerarşisi"
            desc="KKD neden en son sırada? Korunmanın 5 kademesi."
            delay={0.3}
            accent="#f59e0b"
          />
          <FeatureCard
            icon={HardHat}
            title="KKD Türleri"
            desc="Baş, göz, kulak, solunum, el, ayak — tehlikeye göre eşleştirme."
            delay={0.45}
            accent="#22c55e"
          />
          <FeatureCard
            icon={ShieldAlert}
            title="Güvenlik Levhaları"
            desc="Zorunluluk, uyarı ve yasak işaretlerini okumak."
            delay={0.6}
            accent="#2563eb"
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Perşembe · 13:30 — 15:10 · 6331 sayılı Kanun &amp; KKD Yönetmeliği temelli
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Geçen haftadan köprü ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 5. haftadan 6. haftaya</Eyebrow>
      <H2>Geçen hafta &quot;neden korunmalı&quot;, bu hafta &quot;nasıl korunmalı&quot;</H2>
      <Sub className="mt-3 max-w-3xl">
        Kişisel emniyetin ilk bölümünde temel kuralları ve genel hijyeni konuştuk. Bu hafta
        somut araca geçiyoruz: tehlikeyi azaltamadığımızda bedeni doğrudan koruyan donanım nasıl
        seçilir, takılır ve bakımı yapılır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fbbf24]">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">5. hafta — özet</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />Önce kendi güvenliği sağlama ilkesi</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />Çalışma ortamı düzeni ve genel hijyen</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />Tehlike ile risk arasındaki fark</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="isg-card-amber rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <Target className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">6. hafta — hedef</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />Kontrol hiyerarşisinde KKD&apos;nin yerini kavramak</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />Tehlikeye uygun KKD seçebilmek</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />Güvenlik levhalarını doğru yorumlamak</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. Dersin akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: hiyerarşi → donanım → işaretler</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce korunmanın kademelerini görüyoruz; sonra her vücut bölgesi için doğru donanımı
        eşleştiriyoruz; en son ortamdaki güvenlik levhalarını okuyup uygulamalı bir çalışma yapıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "Kontrol Hiyerarşisi",
            items: ["5 kademeli korunma", "KKD neden en sonda?", "Tehlike — risk ayrımı"],
            icon: Layers,
            accent: "#f59e0b",
          },
          {
            range: "02",
            title: "KKD Türleri",
            items: ["Baş · göz · kulak · solunum", "El · ayak · gövde", "Tehlikeye göre seçim"],
            icon: HardHat,
            accent: "#22c55e",
          },
          {
            range: "03",
            title: "Güvenlik Levhaları",
            items: ["Zorunluluk · uyarı · yasak", "Renk ve şekil kodu", "Saha uygulaması"],
            icon: ShieldAlert,
            accent: "#2563eb",
          },
        ].map((g, i) => (
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

  /* ───── 4. Bölüm 1 — Kontrol hiyerarşisi ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Korunmanın Kademeleri"
      subtitle="KKD önemlidir ama tek başına yetmez. Önce tehlikeyi azaltmaya çalışır, ancak son çare olarak bedeni korumaya geçeriz."
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 30px 80px -20px rgba(245, 158, 11, 0.6)"
      icon={<Layers className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 5. Kontrol hiyerarşisi mockup ───── */
  () => (
    <SlideShell>
      <Eyebrow>Kontrol Hiyerarşisi</Eyebrow>
      <H2 className="mb-2">Önce kaynağı, en son kişiyi koru</H2>
      <Sub className="max-w-3xl mb-6">
        İSG&apos;de korunma yukarıdan aşağı uygulanır. Yukarıdaki önlem ne kadar etkinse, KKD&apos;ye
        o kadar az yük biner. KKD&apos;ye atlamak değil, ona{" "}
        <span className="text-[#fbbf24]">son savunma hattı</span> demek doğrudur.
      </Sub>
      <ControlHierarchy />
    </SlideShell>
  ),

  /* ───── 6. Tehlike → uygun KKD eşleştirme tablosu ───── */
  () => (
    <SlideShell>
      <Eyebrow>Tehlike — KKD eşleşmesi</Eyebrow>
      <H2>Hangi tehlikeye hangi donanım?</H2>
      <Sub className="mt-3 max-w-3xl">
        KKD seçimi keyfi değildir; ortamdaki tehlikeye göre yapılır. Tek bir &quot;koruyucu&quot;
        yoktur — risk değerlendirmesi sonucu eşleştirilir.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 isg-card rounded-xl p-1"
      >
        <table className="isg-tbl">
          <thead>
            <tr>
              <th style={{ width: "26%" }}>Tehlike</th>
              <th style={{ width: "30%" }}>Vücut bölgesi</th>
              <th>Uygun KKD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Düşen / çarpan cisim</td>
              <td>Baş</td>
              <td>Baret (koruyucu kask)</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Toz, kıvılcım, sıçrama</td>
              <td>Göz / yüz</td>
              <td>Koruyucu gözlük, yüz siperi</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Yüksek gürültü (85 dB üzeri)</td>
              <td>Kulak</td>
              <td>Kulak tıkacı veya kulaklık</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Toz, gaz, buhar</td>
              <td>Solunum yolu</td>
              <td>Maske / respiratör (FFP2-FFP3)</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Kesik, kimyasal, sıcak</td>
              <td>El</td>
              <td>Kesilmez / kimyasal / ısı eldiveni</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Ezilme, delinme, kayma</td>
              <td>Ayak</td>
              <td>Çelik burunlu güvenlik ayakkabısı</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 7. Bölüm 2 — KKD türleri ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Kişisel Koruyucu Donanım"
      subtitle="Baştan ayağa: her vücut bölgesi için tasarlanmış donanım. Doğru seçim kadar doğru kullanım da kritiktir."
      bgGradient="linear-gradient(135deg, #22c55e, #15803d)"
      shadow="0 30px 80px -20px rgba(34, 197, 94, 0.55)"
      icon={<HardHat className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 8. KKD türleri — baştan ayağa kartlar ───── */
  () => (
    <SlideShell>
      <Eyebrow>Baştan ayağa</Eyebrow>
      <H2 className="mb-8">Altı temel KKD grubu</H2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { icon: HardHat, t: "Baş koruması", d: "Baret · darbe kaskı. Düşen cisim ve çarpmaya karşı.", c: "#f59e0b" },
          { icon: Glasses, t: "Göz / yüz koruması", d: "Gözlük · yüz siperi. Sıçrama, toz, kıvılcıma karşı.", c: "#06b6d4" },
          { icon: Ear, t: "Kulak koruması", d: "Tıkaç · kulaklık. 85 dB üzeri gürültüde zorunlu.", c: "#a855f7" },
          { icon: Wind, t: "Solunum koruması", d: "Maske · respiratör. Toz, gaz ve buhara karşı.", c: "#22c55e" },
          { icon: Hand, t: "El koruması", d: "Eldiven (kesik / kimyasal / ısı). İşe göre seçilir.", c: "#fbbf24" },
          { icon: Footprints, t: "Ayak koruması", d: "Çelik burunlu ayakkabı. Ezilme ve delinmeye karşı.", c: "#ef4444" },
        ].map((k, i) => {
          const Icon = k.icon;
          return (
            <motion.div
              key={k.t}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="isg-card rounded-xl p-5"
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center mb-3"
                style={{ background: `${k.c}18`, border: `1px solid ${k.c}50` }}
              >
                <Icon className="w-5 h-5" style={{ color: k.c }} />
              </div>
              <div className="text-sm font-semibold text-white mb-1">{k.t}</div>
              <div className="text-[11px] text-gray-400 leading-relaxed">{k.d}</div>
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  ),

  /* ───── 9. Solunum koruması — maske sınıfları ───── */
  () => (
    <SlideShell>
      <Eyebrow>Solunum koruması · sınıflar</Eyebrow>
      <H2 className="mb-2">FFP1 · FFP2 · FFP3 farkı</H2>
      <Sub className="max-w-3xl mb-8">
        Toz maskeleri filtreleme verimine göre sınıflandırılır. Yanlış sınıf, sahte güvenlik
        duygusu yaratır — ortamdaki tehlikeye uygun sınıf seçilmelidir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            cls: "FFP1",
            eff: "≈ %80",
            use: "İnce mekanik tozlar, polen. Düşük riskli ortamlar.",
            color: "#eab308",
            icon: Droplets,
          },
          {
            cls: "FFP2",
            eff: "≈ %94",
            use: "İnce toz, biyolojik aerosol. Orta riskli ortamlar.",
            color: "#f59e0b",
            icon: Wind,
          },
          {
            cls: "FFP3",
            eff: "≈ %99",
            use: "Çok ince ve zararlı partiküller, bazı kimyasallar.",
            color: "#dc2626",
            icon: ShieldAlert,
          },
        ].map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.cls}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.12 }}
              className="isg-card rounded-xl p-6"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ background: `${m.color}18`, border: `1px solid ${m.color}55` }}
              >
                <Icon className="w-6 h-6" style={{ color: m.color }} />
              </div>
              <div className="font-mono text-2xl font-bold mb-1" style={{ color: m.color }}>
                {m.cls}
              </div>
              <div className="text-sm text-gray-300 mb-3">
                Filtreleme: <span className="text-white font-semibold">{m.eff}</span>
              </div>
              <p className="text-xs text-gray-500 border-t border-white/5 pt-3">{m.use}</p>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 isg-card-amber rounded-lg px-4 py-3 text-[12px] text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <AlertTriangle className="w-4 h-4 text-[#fbbf24] mt-0.5 shrink-0" />
        <span>
          Filtreleme oranları yaklaşık değerlerdir; sınıf seçimi her zaman risk değerlendirmesi ve
          üretici talimatına göre yapılır. Sakallı kullanımda maske yüze tam oturmaz — koruma düşer.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 10. KKD doğru kullanım — yapılır / yapılmaz ───── */
  () => (
    <SlideShell>
      <Eyebrow>Doğru kullanım</Eyebrow>
      <H2 className="mb-10">KKD&apos;de yapılır vs yapılmaz</H2>
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
              "Kullanmadan önce hasar / çatlak kontrolü yap",
              "Beden ve yüze tam oturduğundan emin ol",
              "Tehlikeye uygun sınıf/tipi seç (FFP, kesik sınıfı vb.)",
              "Kullanım sonrası temizle ve kuru yerde sakla",
              "Son kullanma / değişim tarihini takip et",
              "Birden çok tehlike varsa kombine koru (gözlük + maske)",
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
              "Hasarlı / yırtık donanımı &quot;idare eder&quot; deyip kullanma",
              "Başkasının kişisel maskesini paylaşma",
              "Bareti ters / gevşek takma, askısını sökme",
              "Eldivenle dönen makineye dokunma (kapılma riski)",
              "CE işareti olmayan ucuz ekipmana güvenme",
              "KKD&apos;yi mühendislik önleminin yerine koyma",
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

  /* ───── 11. Bölüm 3 — Güvenlik levhaları ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Güvenlik İşaretleri"
      subtitle="Sahada konuşmak yerine renk ve şekil konuşur. Levhanın türünü bir bakışta tanımak, doğru davranışın ilk adımıdır."
      bgGradient="linear-gradient(135deg, #2563eb, #1e3a8a)"
      shadow="0 30px 80px -20px rgba(37, 99, 235, 0.55)"
      icon={<ShieldAlert className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 12. Levha renk/şekil kodu tablosu ───── */
  () => (
    <SlideShell>
      <Eyebrow>İşaret kodu · renk ve şekil</Eyebrow>
      <H2>Renk ve şekil ne anlatır?</H2>
      <Sub className="mt-3 max-w-3xl">
        Güvenlik ve Sağlık İşaretleri Yönetmeliği&apos;ne göre her renk ve şekil belirli bir anlam
        taşır. Yazıyı okumadan da işaretin türü anlaşılabilmelidir.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 isg-card rounded-xl p-1"
      >
        <table className="isg-tbl">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Tür</th>
              <th style={{ width: "20%" }}>Şekil</th>
              <th style={{ width: "20%" }}>Renk</th>
              <th>Örnek</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Yasaklama</td>
              <td>Yuvarlak + eğik çizgi</td>
              <td><span style={{ color: "#ef4444" }}>Kırmızı</span></td>
              <td>Sigara içilmez, girilmez</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Uyarı</td>
              <td>Üçgen</td>
              <td><span style={{ color: "#eab308" }}>Sarı</span></td>
              <td>Dikkat yüksek gerilim, kaygan zemin</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Zorunluluk</td>
              <td>Yuvarlak (dolu)</td>
              <td><span style={{ color: "#3b82f6" }}>Mavi</span></td>
              <td>Baret tak, koruyucu gözlük kullan</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Acil çıkış / ilk yardım</td>
              <td>Dikdörtgen / kare</td>
              <td><span style={{ color: "#22c55e" }}>Yeşil</span></td>
              <td>Acil çıkış, ilk yardım dolabı</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Yangınla mücadele</td>
              <td>Dikdörtgen / kare</td>
              <td><span style={{ color: "#ef4444" }}>Kırmızı</span></td>
              <td>Yangın söndürücü, hortum dolabı</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 13. Levha kartları — görsel örnekler ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sahada karşılaşılan levhalar</Eyebrow>
      <H2 className="mb-2">Bir bakışta tanı</H2>
      <Sub className="max-w-3xl mb-8">
        Mavi disk &quot;yapmalısın&quot;, sarı üçgen &quot;dikkat&quot;, kırmızı &quot;yapma&quot; der.
        Aşağıdaki örnekleri ezberlemek yerine mantığını kavra.
      </Sub>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        <SignCard kind="zorunlu" icon={HardHat} label="Baret tak" delay={0.1} />
        <SignCard kind="zorunlu" icon={Glasses} label="Gözlük kullan" delay={0.18} />
        <SignCard kind="zorunlu" icon={Ear} label="Kulaklık tak" delay={0.26} />
        <SignCard kind="uyari" icon={Zap} label="Yüksek gerilim" delay={0.34} />
        <SignCard kind="uyari" icon={Flame} label="Yangın tehlikesi" delay={0.42} />
        <SignCard kind="yasak" icon={X} label="Girilmez" delay={0.5} />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 isg-card rounded-lg px-4 py-3 text-[12px] text-gray-300 flex items-start gap-3 max-w-4xl mx-auto"
      >
        <Eye className="w-4 h-4 text-[#06b6d4] mt-0.5 shrink-0" />
        <span>
          İşaretler yalnızca uyarır; tehlikeyi ortadan kaldırmaz. Bir alanda &quot;baret tak&quot;
          levhası varsa orada gerçek bir düşen cisim riski olduğunu unutma.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 14. Uygulamalı çalışma ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı çalışma</Eyebrow>
      <H2>Kendi ortamında KKD denetimi</H2>
      <Sub className="mt-3 max-w-3xl">
        Aşağıdaki dört adımı bir atölye, laboratuvar veya iş yeri üzerinde uygula. Sonraki derse
        kısa bir gözlem notuyla gel.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          {
            icon: Activity,
            title: "Tehlikeleri listele",
            desc: "Seçtiğin ortamdaki üç tehlikeyi yaz (gürültü, toz, kesik vb.).",
            accent: "#f59e0b",
          },
          {
            icon: HardHat,
            title: "Uygun KKD&apos;yi eşleştir",
            desc: "Her tehlikeye 6. slayttaki tabloya bakarak donanım ata.",
            accent: "#22c55e",
          },
          {
            icon: ShieldAlert,
            title: "Levhaları say",
            desc: "Ortamdaki güvenlik işaretlerini türüne göre grupla (zorunlu/uyarı/yasak).",
            accent: "#2563eb",
          },
          {
            icon: ListChecks,
            title: "Bir eksik bul",
            desc: "Olması gerekip de olmayan tek bir KKD veya levha belirle ve gerekçesini yaz.",
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
                  <h3
                    className="text-base font-semibold text-white"
                    dangerouslySetInnerHTML={{ __html: t.title }}
                  />
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 isg-card-amber rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <ClipboardCheck className="w-4 h-4 text-[#fbbf24] mt-0.5 shrink-0" />
        <span>
          Sadece gözlem yap; çalışan makineye veya kapalı alana izinsiz girme. Amaç denetim
          yetkinliğini değil, tehlike-donanım eşleştirme refleksini geliştirmektir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 15. Özet ───── */
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
          <div className="text-base font-semibold text-white mb-3">Üç kavramı ezbere bil</div>
          <ol className="space-y-2 text-[13px] text-gray-200 list-decimal list-inside">
            <li>Sıra: <span className="isg-token">Önce kaynak, en son KKD</span></li>
            <li>Eşleşme: <span className="isg-token">Tehlike → uygun donanım</span></li>
            <li>İşaret: <span className="isg-token">Mavi zorunlu · sarı uyarı · kırmızı yasak</span></li>
          </ol>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="isg-card-amber rounded-xl p-5"
        >
          <ShieldCheck className="w-6 h-6 text-[#fbbf24] mb-3" />
          <div className="text-base font-semibold text-white mb-3">Üç tutumu içselleştir</div>
          <ol className="space-y-2 text-[13px] text-gray-200 list-decimal list-inside">
            <li>KKD <span className="text-[#fbbf24] font-semibold">son savunma hattıdır</span>, ilki değil</li>
            <li>Hasarlı donanım <span className="text-[#fbbf24] font-semibold">koruma sağlamaz</span></li>
            <li>Doğru takmak, <span className="text-[#fbbf24] font-semibold">doğru seçmek</span> kadar önemlidir</li>
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
          <span className="text-[#f59e0b] font-semibold">KKD Yönetmeliği:</span> İşveren uygun
          donanımı ücretsiz sağlar, çalışan ise doğru kullanmak ve korumakla yükümlüdür — sorumluluk
          iki taraflıdır.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 16. Sıradaki hafta + kapanış ───── */
  () => (
    <SlideShell bgPattern={false}>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{
            background: "linear-gradient(135deg, #f59e0b, #b45309)",
            boxShadow: "0 30px 80px -20px rgba(245, 158, 11, 0.6)",
          }}
        >
          <Shield className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>6. hafta tamamlandı · sıradaki: Yangın güvenliği</Eyebrow>
        <H1 className="isg-shimmer">Hafta 7 · Yangın &amp; Tahliye</H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta bedeni koruduk; gelecek hafta ortamı koruyoruz: yangın üçgeni, söndürücü
          türleri, tahliye planı ve toplanma alanı.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
          <FeatureCard
            icon={Flame}
            title="Yangın Üçgeni"
            desc="Isı, yakıt, oksijen — birini kes, yangını söndür."
            accent="#ef4444"
            delay={0.1}
          />
          <FeatureCard
            icon={Volume2}
            title="Alarm &amp; Tahliye"
            desc="Alarm duyunca ne yapılır? Toplanma alanı nerede?"
            accent="#f59e0b"
            delay={0.2}
          />
          <FeatureCard
            icon={Droplets}
            title="Söndürücü Türleri"
            desc="Su, kuru kimyevi toz, CO₂ — hangi yangına hangisi?"
            accent="#22c55e"
            delay={0.3}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 grid md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <div className="isg-card rounded-xl p-4">
            <Calendar className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Ders günü</div>
            <div className="text-sm font-semibold text-white mt-1">Perşembe · 13:30 — 15:10</div>
          </div>
          <div className="isg-card rounded-xl p-4">
            <Globe className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Derslik</div>
            <div className="text-sm font-semibold text-white mt-1">MCBÜ MYO · Amfi 1</div>
          </div>
          <div className="isg-card rounded-xl p-4">
            <Users className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Kod</div>
            <div className="text-sm font-semibold text-white mt-1">BVA 1109 · 2 AKTS</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
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
   PRESENTATION ROOT  (h01 ile birebir aynı)
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
          BVA 1109 · 6. Hafta · Kişisel Emniyet — II
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
