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
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  HardHat,
  Lock,
  Ban,
  ListChecks,
  ClipboardCheck,
  ClipboardList,
  Layers,
  Trash2,
  Settings,
  DoorOpen,
  Siren,
  Eye,
  FileCheck2,
  CheckCircle2,
  XCircle,
  Check,
  X,
  Target,
  Users,
  Calendar,
  Globe,
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

/* Kontrol hiyerarşisi piramidi — en etkiliden en zayıfa */
function ControlHierarchy() {
  const levels: Array<{
    icon: LucideIcon;
    label: string;
    desc: string;
    accent: string;
    width: number;
  }> = [
    { icon: Trash2, label: "1 · Ortadan Kaldırma", desc: "Tehlikeyi tamamen yok et (Elimination)", accent: "#16a34a", width: 100 },
    { icon: Layers, label: "2 · İkame", desc: "Tehlikeliyi daha güvenliyle değiştir (Substitution)", accent: "#22c55e", width: 86 },
    { icon: Settings, label: "3 · Mühendislik Önlemi", desc: "Koruma, paravan, havalandırma, otomasyon", accent: "#f59e0b", width: 72 },
    { icon: ClipboardList, label: "4 · İdari Önlem", desc: "Prosedür, eğitim, rotasyon, uyarı levhası", accent: "#f97316", width: 58 },
    { icon: HardHat, label: "5 · KKD", desc: "Kişisel koruyucu donanım — son savunma hattı", accent: "#dc2626", width: 44 },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-col items-center gap-2.5"
    >
      {levels.map((l, i) => {
        const Icon = l.icon;
        return (
          <motion.div
            key={l.label}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 + i * 0.12 }}
            className="rounded-lg px-5 py-3 flex items-center gap-3"
            style={{
              width: `${l.width}%`,
              background: `${l.accent}14`,
              border: `1px solid ${l.accent}55`,
            }}
          >
            <div
              className="w-9 h-9 rounded-md flex items-center justify-center shrink-0"
              style={{ background: `${l.accent}22`, border: `1px solid ${l.accent}66` }}
            >
              <Icon className="w-5 h-5" style={{ color: l.accent }} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white">{l.label}</div>
              <div className="text-[11px] text-gray-400 truncate">{l.desc}</div>
            </div>
          </motion.div>
        );
      })}
      <div className="text-[11px] text-gray-500 mt-2 font-mono">
        Yukarıdan aşağı: etkinlik azalır · çalışana yüklenen sorumluluk artar.
      </div>
    </motion.div>
  );
}

/* İş izni formu (permit-to-work) kağıt mockup */
function PermitToWork() {
  const rows: Array<{ label: string; val: string }> = [
    { label: "İzin No", val: "İİ-2026-0417" },
    { label: "İş türü", val: "Yüksekte çalışma · 6 m" },
    { label: "Konum", val: "B Blok · Çatı erişimi" },
    { label: "Geçerlilik", val: "08:00 — 17:00 (tek vardiya)" },
    { label: "Gerekli KKD", val: "Tam vücut kemeri + baret + emniyet ipi" },
    { label: "Ön kontroller", val: "İskele · ankraj · hava durumu" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="isg-permit mx-auto w-full max-w-md"
    >
      <div className="isg-permit-head flex items-center justify-between">
        <span className="flex items-center gap-2">
          <FileCheck2 className="w-4 h-4" />
          İŞ İZİN FORMU
        </span>
        <span className="text-[11px] font-mono opacity-90">PTW</span>
      </div>
      {rows.map((r) => (
        <div key={r.label} className="isg-permit-row">
          <span className="isg-permit-label">{r.label}</span>
          <span className="isg-permit-val">{r.val}</span>
        </div>
      ))}
      <div className="flex items-center justify-between px-[18px] py-3">
        <div className="text-[11px] text-gray-600">
          İşveren / İSG uzmanı imzası
        </div>
        <span className="isg-permit-stamp">ONAYLANDI</span>
      </div>
    </motion.div>
  );
}

/* Etiketle-Kilitle (LOTO) asma kilit + etiket */
function LotoTag() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="isg-loto-tag mx-auto px-5 pt-3 pb-5"
      style={{ width: 220 }}
    >
      <div className="isg-loto-hole" />
      <div className="text-center mt-3">
        <div className="text-[10px] uppercase tracking-[0.3em] opacity-90">
          Tehlike
        </div>
        <div className="text-2xl font-black leading-tight mt-1">ÇALIŞTIRMA</div>
        <div className="text-[11px] opacity-90 mt-2">
          Bu ekipman bakım için kilitlenmiştir.
        </div>
        <div className="mt-3 border-t border-white/40 pt-2 text-left text-[11px] space-y-0.5">
          <div>Kilitleyen: M. Demir</div>
          <div>Bölüm: Elektrik bakım</div>
          <div>Tarih: 28.06.2026 · 09:14</div>
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 bg-black/25 rounded-full px-3 py-1 text-[11px] font-mono">
          <Lock className="w-3.5 h-3.5" />
          Yalnızca kilidi takan açabilir
        </div>
      </div>
    </motion.div>
  );
}

/* ABC adımına benzer "adım kartı" — acil tahliye sırası */
function StepTile({
  num,
  title,
  subtitle,
  steps,
  delay = 0,
  accent = "#f59e0b",
}: {
  num: string;
  title: string;
  subtitle: string;
  steps: string[];
  delay?: number;
  accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="isg-card rounded-2xl p-6 flex flex-col"
    >
      <div
        className="isg-abc-tile w-20 h-20 flex items-center justify-center text-4xl mb-4 mx-auto"
        style={{
          background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
          boxShadow: `0 12px 30px -10px ${accent}99`,
        }}
      >
        {num}
      </div>
      <div className="text-center">
        <div className="text-xl font-bold text-white">{title}</div>
        <div className="text-xs text-gray-400 mb-4">{subtitle}</div>
      </div>
      <ul className="space-y-2">
        {steps.map((s) => (
          <li key={s} className="flex items-start gap-2 text-[12px] text-gray-300">
            <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: accent }} />
            <span>{s}</span>
          </li>
        ))}
      </ul>
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
        <Eyebrow>BVA 1109 · 9. Hafta · Çalışan Emniyeti</Eyebrow>
        <H1 className="isg-shimmer">
          Çalışanların
          <br />
          Emniyetini Sağlama
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Riski yönetmek bireysel dikkat değil, sistemli bir korumadır.
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
              <Layers className="w-5 h-5" style={{ color: "#fbbf24" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Kontrol Hiyerarşisi</div>
              <div className="text-[10px] text-gray-500">Tehlikeyi kaynağında yönet</div>
            </div>
          </div>
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(220,38,38,0.18)" }}
            >
              <Lock className="w-5 h-5" style={{ color: "#f87171" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">İzin &amp; Kilitleme</div>
              <div className="text-[10px] text-gray-500">İş izni · etiketle-kilitle</div>
            </div>
          </div>
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(59,130,246,0.18)" }}
            >
              <Siren className="w-5 h-5" style={{ color: "#60a5fa" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Acil Durum</div>
              <div className="text-[10px] text-gray-500">Tahliye · toplanma · ilk müdahale</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Geçen haftadan köprü / bu haftanın hedefi
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 8. haftadan 9. haftaya</Eyebrow>
      <H2>Riski tanıdık; şimdi onu kontrol altına alıyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Önceki haftalarda kişisel emniyeti, ortam tehlikelerini ve risk kavramını ele aldık.
        Bu hafta soruyu değiştiriyoruz: &quot;Tehlike var mı?&quot; değil, &quot;Bu tehlikeden
        çalışanı nasıl, hangi sırayla korurum?&quot; — yani emniyeti sağlamanın somut araçları.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fbbf24]">
            <Eye className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Buraya kadar</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />Tehlike ile riski ayırt ettik.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />Ortam, kimyasal ve fiziksel etkenleri tanıdık.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />Bireysel hijyen ve kişisel emniyeti gördük.</li>
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
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta hedef</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#fbbf24] shrink-0" />Kontrol hiyerarşisini doğru sırayla uygulamak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#fbbf24] shrink-0" />İş izni ve etiketle-kilitle (LOTO) sistemini kavramak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#fbbf24] shrink-0" />Güvenlik işaretlerini ve acil durum akışını okumak.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 3 — Dersin akışı (3 durak)
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: önlem sırası → izin &amp; kilit → acil durum</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce tehlikeyi hangi öncelikle kontrol edeceğimizi öğreniyoruz; sonra tehlikeli işe
        kontrollü giriş için izin ve enerji kilitleme; en sonunda her şeye rağmen kaza olursa
        devreye giren acil durum yönetimi.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Önlem Sırası", items: ["Kontrol hiyerarşisi", "KKD&apos;nin yeri", "Güvenlik işaretleri"], icon: Layers, accent: "#f59e0b" },
          { range: "02", title: "İzin & Kilit", items: ["İş izni (permit-to-work)", "Etiketle-kilitle (LOTO)", "Yüksekte / kapalı alan"], icon: Lock, accent: "#dc2626" },
          { range: "03", title: "Acil Durum", items: ["Tahliye ve toplanma", "Acil durum ekibi", "İletişim ve tatbikat"], icon: Siren, accent: "#22c55e" },
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

  /* ─────────────────  1. ÖNLEM SIRASI  ───────────────── */

  // 4 — Section: Önlem sırası
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Önlem Sırası"
      subtitle="Çalışanı korumanın bir sırası vardır. KKD ile başlamak en sık yapılan hatadır; o sıranın en sonudur."
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 30px 80px -20px rgba(245, 158, 11, 0.6)"
      icon={<Layers className="w-16 h-16 text-white" />}
    />
  ),

  // 5 — Kontrol hiyerarşisi piramidi
  () => (
    <SlideShell>
      <Eyebrow>Kontrol Hiyerarşisi</Eyebrow>
      <H2 className="mb-2">En etkili önlemden en zayıfına</H2>
      <Sub className="max-w-3xl mb-6">
        Bir tehlikeyle karşılaşınca ilk soru &quot;Kemer mi taksın?&quot; değildir. Önce tehlikeyi
        ortadan kaldırmaya, olmuyorsa değiştirmeye, sonra mühendislik ve idari önlemlere bakarız.
        Kişisel koruyucu donanım (KKD) en son hattır.
      </Sub>
      <ControlHierarchy />
    </SlideShell>
  ),

  // 6 — Aynı tehlike, 5 yaklaşım (tablo)
  () => (
    <SlideShell>
      <Eyebrow>Hiyerarşi · uygulama</Eyebrow>
      <H2>Tek bir tehlike, beş farklı önlem</H2>
      <Sub className="mt-3 max-w-3xl">
        Örnek tehlike: bir atölyede yüksek gürültü. Aynı sorun, hiyerarşinin her kademesinde
        farklı bir çözüm üretir. Üsttekiler kalıcı, alttakiler çalışanın sürekli uyumuna bağlıdır.
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
              <th style={{ width: "26%" }}>Kademe</th>
              <th>Gürültü tehlikesine uygulanışı</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-[#86efac] font-semibold">Ortadan kaldırma</td>
              <td>Gürültülü süreci tamamen kaldır ya da makineyi durdur.</td>
            </tr>
            <tr>
              <td className="text-[#86efac] font-semibold">İkame</td>
              <td>Gürültülü makineyi daha sessiz bir modelle değiştir.</td>
            </tr>
            <tr>
              <td className="text-[#fbbf24] font-semibold">Mühendislik</td>
              <td>Makineyi ses yalıtımlı kabine al, titreşim takozu ekle.</td>
            </tr>
            <tr>
              <td className="text-[#f97316] font-semibold">İdari</td>
              <td>Maruziyet süresini sınırla, rotasyon yap, uyarı levhası as.</td>
            </tr>
            <tr>
              <td className="text-[#f87171] font-semibold">KKD</td>
              <td>Kulak tıkacı / kulaklık ver — ama sadece bu yeterli değildir.</td>
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
        Kural: KKD&apos;ye geçmeden önce üstteki dört kademeyi tüketmiş olmalısın.
      </motion.div>
    </SlideShell>
  ),

  // 7 — Güvenlik işaretleri (renk/şekil mantığı)
  () => (
    <SlideShell>
      <Eyebrow>Görsel Uyarı</Eyebrow>
      <H2 className="mb-2">Güvenlik işaretleri — renk ve şekil bir dildir</H2>
      <Sub className="max-w-3xl mb-8">
        İşyerinde işaretler tesadüfi değildir. Renk ve şekil, anlamı kelimeye gerek kalmadan
        anlatır (Sağlık ve Güvenlik İşaretleri Yönetmeliği). Dördünü ezbere bilmek gerekir.
      </Sub>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { cls: "isg-sign-prohibit", icon: Ban, t: "Yasaklama", d: "Kırmızı yuvarlak · &quot;Yapma&quot;", e: "Sigara içilmez" },
          { cls: "isg-sign-warn", icon: AlertTriangle, t: "Uyarı", d: "Sarı üçgen · &quot;Dikkat et&quot;", e: "Kayan zemin" },
          { cls: "isg-sign-mandatory", icon: HardHat, t: "Emredici", d: "Mavi yuvarlak · &quot;Yapmalısın&quot;", e: "Baret tak" },
          { cls: "isg-sign-safe", icon: DoorOpen, t: "Acil çıkış / güvenli", d: "Yeşil kare · &quot;Buradan&quot;", e: "Acil çıkış" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className={`isg-sign ${s.cls}`}
            >
              <Icon className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm font-bold">{s.t}</div>
              <div
                className="text-[11px] opacity-90 mt-1"
                dangerouslySetInnerHTML={{ __html: s.d }}
              />
              <div className="text-[11px] mt-2 bg-black/20 rounded px-2 py-0.5 inline-block">
                örn. {s.e}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2. İZİN & KİLİT  ───────────────── */

  // 8 — Section: İzin & Kilit
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="İzin &amp; Kilitleme"
      subtitle="Tehlikeli işe rastgele girilmez. İş izni kimin, neyi, hangi koşulda yapacağını; LOTO ise enerjinin kontrol altında olduğunu garanti eder."
      bgGradient="linear-gradient(135deg, #dc2626, #7f1d1d)"
      shadow="0 30px 80px -20px rgba(220, 38, 38, 0.6)"
      icon={<Lock className="w-16 h-16 text-white" />}
    />
  ),

  // 9 — İş izni sistemi (permit-to-work) mockup
  () => (
    <SlideShell>
      <Eyebrow>İş İzni · Permit-to-Work</Eyebrow>
      <H2 className="mb-8">Tehlikeli işe yazılı geçiş kartı</H2>
      <div className="grid md:grid-cols-[1fr_1.1fr] gap-10 items-center">
        <PermitToWork />
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="isg-card rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <ClipboardCheck className="w-4 h-4 text-[#f59e0b]" />
              <span className="text-sm font-semibold text-white">İş izni ne zaman gerekir?</span>
            </div>
            <ul className="text-[12px] text-gray-300 space-y-1.5">
              <li>· Yüksekte çalışma (düşme riski)</li>
              <li>· Kapalı / dar alan girişi (tank, rögar, depo)</li>
              <li>· Ateşli iş (kaynak, taşlama, kesme)</li>
              <li>· Elektrik / enerji hattı yakınında çalışma</li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 }}
            className="isg-card-amber rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-[#fbbf24]" />
              <span className="text-sm font-semibold text-white">Ne işe yarar?</span>
            </div>
            <div className="text-[12px] text-gray-300">
              Riskleri önceden listeler, önlemleri zorunlu kılar, sorumluyu ve geçerlilik
              süresini sabitler. İmza alınmadan iş başlamaz.
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="isg-card-red rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-semibold text-white">Sık hata</span>
            </div>
            <div className="text-[12px] text-red-200">
              &quot;Bir dakikalık iş&quot; diye izinsiz girmek. Süre değil, tehlikenin türü
              izni gerektirir.
            </div>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  ),

  // 10 — Etiketle-Kilitle (LOTO) 5 adım + tag mockup
  () => (
    <SlideShell>
      <Eyebrow>LOTO · Etiketle-Kilitle</Eyebrow>
      <H2 className="mb-2">Enerjiyi kilitle, makineyi kimse çalıştıramasın</H2>
      <Sub className="max-w-3xl mb-6">
        Bakım sırasında en ölümcül hatalardan biri, beklenmedik çalışmaya geçen makinedir.
        LOTO (Lockout-Tagout) enerji kaynağını fiziksel olarak kilitler ve etiketler.
      </Sub>
      <div className="grid md:grid-cols-[1fr_240px] gap-10 items-center">
        <div className="space-y-2.5">
          {[
            { n: 1, t: "Bildir & hazırla", d: "Etkilenenleri uyar, kapatma sırasını belirle." },
            { n: 2, t: "Kapat (shutdown)", d: "Makineyi normal prosedürle durdur." },
            { n: 3, t: "Enerjiyi ayır", d: "Elektrik, basınç, gaz, hidrolik — tüm kaynakları kes." },
            { n: 4, t: "Kilitle & etiketle", d: "Şalter/vanaya kilit tak, etikete adını ve tarihi yaz." },
            { n: 5, t: "Doğrula (try-out)", d: "Çalıştırmayı dene; hareket yoksa iş güvenli." },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="isg-card rounded-lg p-3 flex items-start gap-3"
            >
              <div className="w-7 h-7 rounded-full bg-[#dc2626] text-white text-xs font-bold flex items-center justify-center shrink-0">
                {s.n}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">{s.t}</div>
                <div className="text-[12px] text-gray-400 mt-0.5">{s.d}</div>
              </div>
            </motion.div>
          ))}
          <div className="text-[11px] text-gray-500 mt-2 font-mono">
            Altın kural: kilidi takan kişi, işi bitince yine kendisi çıkarır.
          </div>
        </div>
        <LotoTag />
      </div>
    </SlideShell>
  ),

  // 11 — Yüksekte ve kapalı alan: somut önlemler
  () => (
    <SlideShell>
      <Eyebrow>Özel Tehlikeler</Eyebrow>
      <H2 className="mb-10">İki klasik ölümcül iş, iki önlem seti</H2>
      <div className="grid md:grid-cols-2 gap-5">
        <FeatureCard
          icon={ShieldAlert}
          title="Yüksekte çalışma"
          desc="Toplu koruma önce gelir: korkuluk, ağ, platform. Bireysel koruma (tam vücut kemeri + ankraj) ek hattır. Tek başına kemer yeterli değildir."
          accent="#f59e0b"
          delay={0.1}
        />
        <FeatureCard
          icon={DoorOpen}
          title="Kapalı / dar alan"
          desc="Girmeden önce gaz ölçümü (O2, patlayıcı, zehirli). Dışarıda gözcü bekler, kurtarma planı hazırdır, iletişim kesilmez."
          accent="#dc2626"
          delay={0.2}
        />
        <FeatureCard
          icon={ListChecks}
          title="Ortak ilke: girişten önce kontrol"
          desc="Her iki işte de çalışma başlamadan kontrol listesi doldurulur, izin onaylanır. Atlanan tek adım, geri dönüşü olmayan kazadır."
          accent="#22c55e"
          delay={0.3}
        />
        <FeatureCard
          icon={Users}
          title="Ortak ilke: asla yalnız değil"
          desc="Bu işlerde çalışan tek başına bırakılmaz. Bir gözcü ya da ekip arkadaşı her an müdahaleye hazır olmalıdır."
          accent="#a855f7"
          delay={0.4}
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3. ACİL DURUM  ───────────────── */

  // 12 — Section: Acil durum
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Acil Durum Yönetimi"
      subtitle="Tüm önlemlere rağmen kaza olabilir. Önemli olan, o an ne yapılacağının önceden bilinmesi ve prova edilmiş olmasıdır."
      bgGradient="linear-gradient(135deg, #22c55e, #15803d)"
      shadow="0 30px 80px -20px rgba(34, 197, 94, 0.6)"
      icon={<Siren className="w-16 h-16 text-white" />}
    />
  ),

  // 13 — Tahliye akışı (3 adım kartı)
  () => (
    <SlideShell>
      <Eyebrow>Tahliye · adım adım</Eyebrow>
      <H2 className="mb-8">Alarmdan toplanma alanına</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <StepTile
          num="1"
          title="Fark et & uyar"
          subtitle="İlk saniyeler"
          steps={[
            "Tehlikeyi gör, alarmı çal / butona bas",
            "Mümkünse acil durdurma düğmesini kullan",
            "Çevredekileri sesli uyar",
            "Kendi güvenliğini riske atma",
          ]}
          accent="#dc2626"
          delay={0.15}
        />
        <StepTile
          num="2"
          title="Tahliye et"
          subtitle="Sakin ve düzenli"
          steps={[
            "En yakın acil çıkışı kullan, asansör kullanma",
            "Koşma, itişme yok; tabelaları izle",
            "Yardıma muhtaç kişilere eşlik et",
            "Geri dönme — eşya için risk alma",
          ]}
          accent="#f59e0b"
          delay={0.3}
        />
        <StepTile
          num="3"
          title="Topla & say"
          subtitle="Toplanma alanı"
          steps={[
            "Belirlenmiş toplanma alanına git",
            "Ekip lideri yoklama (sayım) yapar",
            "Eksik varsa arama-kurtarmaya bildir",
            "&quot;Güvenli&quot; denene kadar geri girme",
          ]}
          accent="#22c55e"
          delay={0.45}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 isg-card-green rounded-xl p-4 text-center"
      >
        <div className="text-sm text-gray-200">
          <span className="text-green-300 font-semibold">Hatırla:</span> Tahliyenin amacı hızdan
          önce <span className="text-[#fbbf24] font-bold">eksiksiz sayım</span>dır. Kimsenin içeride
          kalmadığını ancak yoklama doğrular.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 14 — Acil durum ekibi & roller
  () => (
    <SlideShell>
      <Eyebrow>Hazırlık · roller</Eyebrow>
      <H2 className="mb-2">İşyerinde acil durum ekipleri</H2>
      <Sub className="max-w-3xl mb-8">
        Acil durumda &quot;herkes bir şey yapsın&quot; kaos demektir. 6331 sayılı İSG Kanunu,
        işyerinde önceden görevlendirilmiş ve eğitilmiş ekipleri zorunlu kılar.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FeatureCard
          icon={Siren}
          title="Yangınla mücadele ekibi"
          desc="Yangın söndürücü ve dolapları kullanır, küçük yangına ilk müdahaleyi yapar, itfaiyeyi karşılar."
          accent="#dc2626"
          delay={0.1}
        />
        <FeatureCard
          icon={DoorOpen}
          title="Arama, kurtarma & tahliye ekibi"
          desc="Çalışanları güvenli çıkışa yönlendirir, mahsur kalanları arar, toplanma alanında yoklama alır."
          accent="#f59e0b"
          delay={0.2}
        />
        <FeatureCard
          icon={ShieldCheck}
          title="İlk yardım ekibi"
          desc="Sertifikalı ilk yardımcılar yaralıya müdahale eder, 112&apos;yi arar ve sağlık ekibini bilgilendirir."
          accent="#22c55e"
          delay={0.3}
        />
        <FeatureCard
          icon={ClipboardList}
          title="Koruma & koordinasyon"
          desc="Alanı emniyete alır, dış ekiplerle iletişimi sağlar, olayı kayıt altına alır ve raporlar."
          accent="#a855f7"
          delay={0.4}
        />
      </div>
    </SlideShell>
  ),

  // 15 — Yapılır / Yapılmaz (acil durumda)
  () => (
    <SlideShell>
      <Eyebrow>Pratik</Eyebrow>
      <H2 className="mb-10">Acil durumda: yapılır vs yapılmaz</H2>
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
              "Alarmı duyar duymaz işi bırak, çıkışa yönel",
              "En yakın acil çıkış tabelasını izle",
              "Kapıyı arkandan kapat (yangın yayılımını yavaşlatır)",
              "Toplanma alanında ekip liderine görün",
              "Yaralıyı eğitimliysen ve güvenliyse taşı",
              "Acil numarayı (112 / itfaiye) net bilgiyle ara",
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
              "Yangında asansör kullanma",
              "Eşya / çanta almak için geri dönme",
              "Panikle koşma, itme, kalabalığı sıkıştırma",
              "Çıkışları, hortum dolaplarını malzemeyle kapatma",
              "&quot;Yanlış alarmdır&quot; deyip yerinde kalma",
              "Toplanma alanından izinsiz ayrılma",
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

  // 16 — Uygulamalı: bu hafta yapılacaklar (checklist)
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulama</Eyebrow>
      <H2 className="mb-10">Kendi ortamında dört adım</H2>
      <Sub className="mb-8 max-w-3xl -mt-6">
        Sınıf, atölye, ev veya staj yerin — bulunduğun bir mekânı seç ve bu dördünü yap.
        Sonraki derse kısa bir gözlem notuyla gelmen bekleniyor.
      </Sub>
      <div className="grid md:grid-cols-2 gap-3">
        {[
          {
            t: "Acil çıkış ve toplanma alanını bul",
            d: "Bulunduğun binadaki en yakın acil çıkışı ve dışarıdaki toplanma alanını tespit et.",
          },
          {
            t: "Üç güvenlik işareti fotoğrafla",
            d: "Yasaklama, uyarı ve emredici işaretlerden birer örnek bul; rengini ve anlamını yaz.",
          },
          {
            t: "Bir tehlikeye hiyerarşi uygula",
            d: "Gördüğün bir tehlike için 5 kademede birer önlem öner (ortadan kaldırmadan KKD&apos;ye).",
          },
          {
            t: "İş izni gereken bir iş düşün",
            d: "Yüksekte/kapalı alan/ateşli iş örneği seç, izinde hangi önlemler yazmalı listele.",
          },
        ].map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
            className="isg-check-row"
          >
            <div className="w-6 h-6 rounded border-2 border-[#f59e0b]/50 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-[#f59e0b]" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">{c.t}</div>
              <div
                className="text-[11px] text-gray-400 mt-0.5"
                dangerouslySetInnerHTML={{ __html: c.d }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 17 — Sıradaki hafta önizleme + kapanış
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
            boxShadow: "0 30px 80px -20px rgba(245, 158, 11, 0.6)",
          }}
        >
          <HardHat className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>9. Hafta tamamlandı · Sıradaki: Kişisel Koruyucu Donanım</Eyebrow>
        <H1 className="isg-shimmer">Doğru KKD, Doğru Kullanım</H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta KKD&apos;nin son savunma hattı olduğunu gördük. 10. haftada o son hattı
          ayrıntısıyla işliyoruz: baş, göz, solunum, el ve ayak koruması — seçim, uyum ve bakım.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="isg-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#f59e0b] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders günü</div>
            <div className="text-white font-semibold">Perşembe</div>
            <div className="text-sm text-gray-400">13:30 — 15:10</div>
          </div>
          <div className="isg-card rounded-xl p-5">
            <Globe className="w-5 h-5 text-[#f59e0b] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Derslik</div>
            <div className="text-white font-semibold">MCBÜ MYO</div>
            <div className="text-sm text-gray-400">Amfi 1</div>
          </div>
          <div className="isg-card rounded-xl p-5">
            <GraduationCap className="w-5 h-5 text-[#f59e0b] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">Gözlem notu</div>
            <div className="text-sm text-gray-400">4 adımlık uygulama</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Önce tehlikeyi yönet · KKD en son hattır</span>
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
          BVA 1109 · 9. Hafta · Çalışan Emniyeti
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
