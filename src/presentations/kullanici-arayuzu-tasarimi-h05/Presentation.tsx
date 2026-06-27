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
  Brain,
  Eye,
  Layers,
  Sparkles,
  Target,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  X,
  Hash,
  Globe,
  Calendar,
  Group,
  AlignVerticalSpaceBetween,
  Move,
  Grid3x3,
  Spline,
  Scan,
  Gauge,
  ListChecks,
  Search,
  SlidersHorizontal,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Type,
  Square,
  MousePointerClick,
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
   KONUYA ÖZEL MOCKUPLAR
   ============================================================ */

/* Pencere çerçevesi (CSS / kod mockupları için) */
function WindowChrome({
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
      transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
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
          {icon}
          <span>{title}</span>
        </div>
      </div>
      <div>{children}</div>
    </motion.div>
  );
}

/* Gestalt ilkesini gösteren küçük SVG demoları */
function GestaltDemo({ kind }: { kind: "proximity" | "similarity" | "closure" | "continuity" }) {
  const pink = "#ec4899";
  const purple = "#a855f7";
  const gray = "#52525b";

  return (
    <div className="katas-gestalt-surface w-full h-[150px] flex items-center justify-center p-3">
      <svg viewBox="0 0 200 120" className="h-full">
        {kind === "proximity" && (
          <>
            {/* Sol grup */}
            {[0, 1, 2].map((r) =>
              [0, 1].map((c) => (
                <circle key={`l${r}${c}`} cx={28 + c * 16} cy={30 + r * 26} r="6" fill={pink} />
              ))
            )}
            {/* Sağ grup */}
            {[0, 1, 2].map((r) =>
              [0, 1].map((c) => (
                <circle key={`r${r}${c}`} cx={130 + c * 16} cy={30 + r * 26} r="6" fill={pink} />
              ))
            )}
            <text x="100" y="115" textAnchor="middle" fontSize="8" fill="#9ca3af">
              Yakınlık = iki grup
            </text>
          </>
        )}
        {kind === "similarity" && (
          <>
            {[0, 1, 2, 3, 4].map((r) =>
              [0, 1, 2, 3, 4].map((c) => {
                const isCol = c === 2;
                return (
                  <circle
                    key={`s${r}${c}`}
                    cx={40 + c * 30}
                    cy={20 + r * 18}
                    r="6"
                    fill={isCol ? purple : gray}
                  />
                );
              })
            )}
            <text x="100" y="115" textAnchor="middle" fontSize="8" fill="#9ca3af">
              Benzerlik = renkli sütun bir bütün
            </text>
          </>
        )}
        {kind === "closure" && (
          <>
            {/* Kesik daire — beyin tamamlar */}
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i / 12) * Math.PI * 2;
              if (i % 3 === 0) return null;
              return (
                <circle
                  key={`c${i}`}
                  cx={100 + Math.cos(a) * 34}
                  cy={52 + Math.sin(a) * 34}
                  r="4.5"
                  fill={pink}
                />
              );
            })}
            <text x="100" y="115" textAnchor="middle" fontSize="8" fill="#9ca3af">
              Tamamlama = eksik daireyi görürüz
            </text>
          </>
        )}
        {kind === "continuity" && (
          <>
            <path
              d="M 20 80 Q 100 10 180 80"
              fill="none"
              stroke={pink}
              strokeWidth="3"
              strokeDasharray="0 14"
              strokeLinecap="round"
            />
            <path
              d="M 20 30 L 180 90"
              fill="none"
              stroke={gray}
              strokeWidth="3"
              strokeDasharray="0 14"
              strokeLinecap="round"
            />
            <text x="100" y="115" textAnchor="middle" fontSize="8" fill="#9ca3af">
              Süreklilik = göz akıcı yolu izler
            </text>
          </>
        )}
      </svg>
    </div>
  );
}

/* Bilişsel yük ölçer (intrinsic / extraneous / germane) */
function CognitiveLoadMeter() {
  const bars = [
    {
      label: "İçsel yük (intrinsic)",
      sub: "Görevin kendi zorluğu — IBAN girmek vs. ad girmek.",
      value: 55,
      color: "#a855f7",
      note: "Görev sadeleştirilerek azaltılır.",
    },
    {
      label: "Dışsal yük (extraneous)",
      sub: "Kötü arayüzün eklediği gereksiz çaba — dağınık düzen, belirsiz etiket.",
      value: 80,
      color: "#f87171",
      note: "Tasarımla doğrudan düşürülmeli. Hedefimiz burası.",
    },
    {
      label: "Anlamlı yük (germane)",
      sub: "Öğrenmeye / zihinsel modele giden faydalı çaba.",
      value: 35,
      color: "#34d399",
      note: "Korunmalı, hatta desteklenmeli.",
    },
  ];
  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      {bars.map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + i * 0.15 }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-semibold text-white">{b.label}</span>
            <span className="text-xs font-mono" style={{ color: b.color }}>
              {b.value}%
            </span>
          </div>
          <div className="katas-load-track">
            <motion.div
              className="katas-load-fill"
              style={{ background: `linear-gradient(90deg, ${b.color}, ${b.color}aa)` }}
              initial={{ width: 0 }}
              animate={{ width: `${b.value}%` }}
              transition={{ delay: 0.35 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1.5">{b.sub}</div>
          <div className="text-[11px] mt-0.5" style={{ color: b.color }}>
            {b.note}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* Hick yasası karşılaştırması: çok seçenek vs az seçenek */
function HicksLawDemo() {
  return (
    <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="katas-card rounded-xl overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border-b border-red-500/30">
          <XCircle className="w-4 h-4 text-red-400" />
          <span className="text-xs font-mono uppercase text-red-300">12 seçenek · uzun karar</span>
        </div>
        <div className="bg-white p-4 h-[240px] grid grid-cols-3 gap-1.5 content-start">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="text-[8px] text-gray-700 bg-gray-100 border border-gray-300 rounded px-1.5 py-2 text-center"
            >
              Seçenek {i + 1}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="katas-card rounded-xl overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border-b border-emerald-500/30">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono uppercase text-emerald-300">3 grup · hızlı karar</span>
        </div>
        <div className="bg-gradient-to-b from-pink-50 to-white p-4 h-[240px] flex flex-col gap-2 justify-center">
          {["Önerilen plan", "Diğer planlar", "Yardım iste"].map((t, i) => (
            <div
              key={t}
              className={`rounded-lg px-3 py-3 text-[11px] font-semibold text-center ${
                i === 0
                  ? "text-white"
                  : "text-gray-700 bg-white border border-gray-200"
              }`}
              style={i === 0 ? { background: "linear-gradient(135deg,#ec4899,#be185d)" } : undefined}
            >
              {t}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* Aynı içerik — yüklü vs sade ekran (boşluk & gruplama) */
function CrowdedVsCalm() {
  return (
    <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
      {/* Yüklü */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="katas-card rounded-xl overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border-b border-red-500/30">
          <XCircle className="w-4 h-4 text-red-400" />
          <span className="text-xs font-mono uppercase text-red-300">Yoğun · gruplama yok</span>
        </div>
        <div className="bg-white p-3 h-[300px]">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[9px] font-bold text-gray-800">Pano</div>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="w-3 h-3 rounded-sm bg-gray-300" />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="h-7 rounded-sm bg-gray-100 border border-gray-200 text-[6px] text-gray-500 flex items-center justify-center">
                öğe {i + 1}
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-5 rounded-sm bg-gray-100 border border-gray-200 text-[6px] text-gray-500 flex items-center px-1">
                metin satırı {i + 1}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Sade */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="katas-card rounded-xl overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border-b border-emerald-500/30">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono uppercase text-emerald-300">Boşluk + gruplama</span>
        </div>
        <div className="bg-gradient-to-b from-pink-50 to-white p-5 h-[300px] flex flex-col">
          <div className="text-sm font-bold text-gray-900 mb-1">Pano</div>
          <div className="text-[9px] text-gray-400 mb-4">Bu hafta · 3 bölüm</div>

          <div className="text-[8px] font-mono uppercase tracking-wider text-pink-400 mb-1.5">
            Devam edenler
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-10 rounded-lg bg-white border border-pink-100 shadow-sm" />
            ))}
          </div>

          <div className="text-[8px] font-mono uppercase tracking-wider text-pink-400 mb-1.5">
            Eylem
          </div>
          <div className="rounded-lg px-3 py-2.5 text-[11px] font-semibold text-white text-center" style={{ background: "linear-gradient(135deg,#ec4899,#be185d)" }}>
            Yeni öğe ekle
          </div>
        </div>
      </motion.div>
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
        <Eyebrow>BVA 2245 · 5. Hafta · Algı &amp; Bilişsel Yük</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          <span className="katas-shimmer">Görsel Algı İlkeleri</span>
          <br />
          <span className="text-white">Gestalt &amp; Bilişsel Yük</span>
        </motion.h1>
        <Sub className="mt-6 max-w-3xl mx-auto">
          Beyin bir ekrana baktığında parçaları değil, bütünleri görür. Bu hafta
          algının kurallarını ve arayüzün zihne bindirdiği yükü öğreniyoruz.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Group}
            title="Gestalt ilkeleri"
            desc="Yakınlık, benzerlik, tamamlama, süreklilik, şekil–zemin."
            delay={0.3}
            accent="#ec4899"
          />
          <FeatureCard
            icon={Brain}
            title="Bilişsel yük"
            desc="İçsel, dışsal ve anlamlı yük — neyi azaltır, neyi koruruz?"
            delay={0.45}
            accent="#a855f7"
          />
          <FeatureCard
            icon={Gauge}
            title="Yasalar"
            desc="Hick, Miller (7±2), Fitts — karar ve hedefleme maliyeti."
            delay={0.6}
            accent="#3b82f6"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Cuma 15:20 — 17:00 · Heuristik gruplama atölyesi
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 02 · KÖPRÜ / HEDEF ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 4. haftadan 5. haftaya</Eyebrow>
      <H2>Bilgiyi düzenledik; şimdi gözün onu nasıl okuduğuna bakıyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta bilgi mimarisiyle içeriği mantıksal olarak grupladık. Bu
        hafta soru değişiyor: aynı ekran <strong className="text-pink-300">göze</strong> nasıl
        görünüyor? Beyin elemanları otomatik olarak nasıl grupluyor ve bu süreç
        ne zaman zorlaşıyor?
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="katas-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#f9a8d4]">
            <Eye className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu haftanın hedefi</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ec4899] flex-shrink-0" />Beş temel Gestalt ilkesini bir arayüzde tanımak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ec4899] flex-shrink-0" />Bilişsel yükün üç türünü ayırt etmek.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ec4899] flex-shrink-0" />Yükü düşüren somut tasarım kararlarını uygulamak.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="katas-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#c4b5fd]">
            <Lightbulb className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Neden önemli</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#a855f7] flex-shrink-0" />Algı, kullanıcı bilinçli düşünmeden saniyenin altında çalışır.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#a855f7] flex-shrink-0" />Doğru gruplama = daha az açıklama, daha az hata.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#a855f7] flex-shrink-0" />Yük düştükçe görev tamamlama hızlanır, terk azalır.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 03 · DERSİN AKIŞI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>İki durak: algının kuralları → zihnin sınırları</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce gözün elemanları nasıl gruplandırdığını (Gestalt) görüyoruz; sonra
        beynin bir anda ne kadarını işleyebildiğine (bilişsel yük) bakıyoruz. En
        sonda küçük bir uygulamalı atölye.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "Gestalt — Görsel gruplama",
            items: ["Şekil–zemin ayrımı", "Yakınlık & benzerlik", "Tamamlama & süreklilik"],
            icon: Group,
            accent: "#ec4899",
          },
          {
            range: "02",
            title: "Bilişsel Yük — Zihnin sınırları",
            items: ["İçsel / dışsal / anlamlı yük", "Miller 7±2 ve parçalama", "Hick & Fitts yasaları"],
            icon: Brain,
            accent: "#a855f7",
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

  /* ───── 04 · BÖLÜM 1 — GESTALT ───── */
  () => (
    <SectionDivider
      num="01"
      total="02"
      title="Gestalt: Bütün, Parçaların Toplamından Fazladır"
      subtitle="1920'lerde Berlin'de doğan algı psikolojisi okulu. Beyin tek tek noktaları değil, aralarındaki ilişkiyi görür — tasarımın görünmez gramerini bu ilkeler yazar."
      bgGradient="linear-gradient(135deg, #ec4899 0%, #be185d 100%)"
      shadow="0 30px 80px -20px rgba(236, 72, 153, 0.6)"
      icon={<Group className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 05 · ŞEKİL–ZEMİN ───── */
  () => (
    <SlideShell>
      <Eyebrow>Gestalt · temel ayrım</Eyebrow>
      <H2 className="mb-2">Şekil–zemin: önce neyi görürüz?</H2>
      <Sub className="max-w-3xl mb-6">
        Göz her sahneyi öne çıkan &quot;şekil&quot; ve geriye çekilen &quot;zemin&quot; olarak
        ikiye ayırır. Arayüzde bu ayrım net değilse kullanıcı neye odaklanacağını bilemez.
      </Sub>
      <div className="grid grid-cols-2 gap-8 items-center">
        <div className="space-y-3">
          <FeatureCard
            icon={Scan}
            title="Kontrast şekli belirler"
            desc="Renk, gölge ve boşluk öne çıkacak elemanı işaret eder — modal, buton, kart."
            delay={0}
          />
          <FeatureCard
            icon={Layers}
            title="Katman = derinlik"
            desc="Gölge ve örtü (overlay) hangi katmanın aktif olduğunu söyler."
            delay={0.1}
          />
          <FeatureCard
            icon={Square}
            title="Negatif alan da iletişim kurar"
            desc="Etrafındaki boşluk bir elemanı önemli/ayrı kılar."
            delay={0.2}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="katas-card rounded-2xl p-6"
        >
          <div className="text-[10px] font-mono uppercase tracking-widest text-pink-300 mb-3 text-center">
            Modal = şekil · sayfa = zemin
          </div>
          <div className="relative h-[260px] rounded-lg overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
            {/* dim zemin */}
            <div className="absolute inset-0 grid grid-cols-3 gap-2 p-3 opacity-40">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-white/70 rounded" />
              ))}
            </div>
            <div className="absolute inset-0 bg-black/40" />
            {/* şekil: modal */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[70%] bg-white rounded-xl shadow-2xl p-4">
                <div className="text-[11px] font-bold text-gray-900 mb-1">Emin misin?</div>
                <div className="text-[9px] text-gray-500 mb-3">Bu işlem geri alınamaz.</div>
                <div className="flex gap-2 justify-end">
                  <div className="text-[9px] px-3 py-1.5 rounded bg-gray-100 text-gray-600">Vazgeç</div>
                  <div className="text-[9px] px-3 py-1.5 rounded text-white" style={{ background: "#ec4899" }}>Onayla</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-gray-400">
            Karartılmış zemin, gözü tek bir <strong className="text-pink-300">şekle</strong> kilitler.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 06 · DÖRT İLKE DEMO ───── */
  () => (
    <SlideShell>
      <Eyebrow>Gestalt · dört çalışma ilkesi</Eyebrow>
      <H2 className="mb-2">Beyin elemanları nasıl gruplar?</H2>
      <Sub className="max-w-3xl mb-6">
        Aşağıdaki dört demo, hiçbir çizgi olmadan beynin nasıl &quot;grup&quot;
        ürettiğini gösterir. Arayüzde aynı ilkeleri menü, liste ve form düzeninde kullanırız.
      </Sub>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { kind: "proximity" as const, icon: AlignVerticalSpaceBetween, title: "Yakınlık", desc: "Birbirine yakın öğeler aynı gruba aittir." },
          { kind: "similarity" as const, icon: Grid3x3, title: "Benzerlik", desc: "Aynı renk/şekil, ortak işlevi işaret eder." },
          { kind: "closure" as const, icon: Scan, title: "Tamamlama", desc: "Eksik biçimi beyin kapatır — ikonlar bundan yararlanır." },
          { kind: "continuity" as const, icon: Spline, title: "Süreklilik", desc: "Göz akıcı, kesintisiz yolu izler." },
        ].map((d, i) => (
          <motion.div
            key={d.kind}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="katas-card rounded-xl p-3"
          >
            <GestaltDemo kind={d.kind} />
            <div className="flex items-center gap-2 mt-3 mb-1">
              <d.icon className="w-4 h-4 text-pink-400" />
              <span className="text-sm font-semibold text-white">{d.title}</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">{d.desc}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 07 · YAKINLIK ARAYÜZDE (CSS) ───── */
  () => (
    <SlideShell>
      <Eyebrow>Yakınlık · uygulama</Eyebrow>
      <H2 className="mb-2">Boşluk, çizgiden daha güçlü gruplar</H2>
      <Sub className="max-w-3xl mb-6">
        Bir etiketi ait olduğu alana yaklaştırmak, kutu veya çizgi çizmekten daha
        nettir. Aşağıda aynı form, iki farklı boşluk düzeniyle — fark tek bir
        CSS değeri: <span className="font-mono text-pink-300">gap</span>.
      </Sub>
      <div className="grid grid-cols-2 gap-6 items-start">
        <WindowChrome
          title="kotu.css — belirsiz aidiyet"
          icon={<Type className="w-3.5 h-3.5" />}
        >
          <div className="katas-code">
            <div><span className="katas-code-sel">.form-row</span> &#123;</div>
            <div className="pl-4"><span className="katas-code-prop">margin-bottom</span>: <span className="katas-code-val">16px</span>;</div>
            <div>&#125;</div>
            <div><span className="katas-code-sel">label</span> &#123;</div>
            <div className="pl-4"><span className="katas-code-comment">/* etiketle input arası da 16px */</span></div>
            <div className="pl-4"><span className="katas-code-prop">margin-bottom</span>: <span className="katas-code-val">16px</span>;</div>
            <div>&#125;</div>
            <div className="mt-2"><span className="katas-code-comment">/* her şey eşit aralıklı → hangi etiket</span></div>
            <div><span className="katas-code-comment">   hangi alana ait belirsiz */</span></div>
          </div>
        </WindowChrome>

        <WindowChrome
          title="iyi.css — yakınlık = grup"
          icon={<Type className="w-3.5 h-3.5" />}
        >
          <div className="katas-code">
            <div><span className="katas-code-sel">.form-row</span> &#123;</div>
            <div className="pl-4"><span className="katas-code-prop">display</span>: <span className="katas-code-val">flex</span>;</div>
            <div className="pl-4"><span className="katas-code-prop">flex-direction</span>: <span className="katas-code-val">column</span>;</div>
            <div className="pl-4"><span className="katas-code-prop">gap</span>: <span className="katas-code-val">4px</span>; <span className="katas-code-comment">/* etiket↔input yakın */</span></div>
            <div className="pl-4"><span className="katas-code-prop">margin-bottom</span>: <span className="katas-code-val">24px</span>; <span className="katas-code-comment">/* satırlar uzak */</span></div>
            <div>&#125;</div>
            <div className="mt-2"><span className="katas-code-comment">/* küçük iç boşluk + büyük dış boşluk</span></div>
            <div><span className="katas-code-comment">   = her etiket alanına yapışır */</span></div>
          </div>
        </WindowChrome>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 text-[12px] text-gray-500 text-center max-w-3xl mx-auto"
      >
        Kural: bir etiketle alanı arasındaki boşluk, o satırla komşu satır
        arasındaki boşluktan <strong className="text-pink-300">küçük</strong> olmalı.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 08 · BÖLÜM 2 — BİLİŞSEL YÜK ───── */
  () => (
    <SectionDivider
      num="02"
      total="02"
      title="Bilişsel Yük: Çalışma Belleğinin Sınırı"
      subtitle="Algı bedavadır, düşünmek pahalıdır. İnsan çalışma belleği aynı anda yalnızca birkaç birim tutabilir. İyi arayüz bu kıt kaynağı gereksiz harcamaz."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #6d28d9 100%)"
      shadow="0 30px 80px -20px rgba(168, 85, 247, 0.6)"
      icon={<Brain className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 09 · YÜKÜN ÜÇ TÜRÜ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bilişsel yük · üç tür</Eyebrow>
      <H2 className="mb-2">Her yük eşit değildir</H2>
      <Sub className="max-w-3xl mb-8">
        Sweller&apos;ın bilişsel yük kuramı yükü üçe ayırır. Tasarımcının asıl
        hedefi <strong className="text-red-300">dışsal yükü</strong> sıfıra
        yaklaştırmaktır — çünkü onu üreten kötü arayüzün kendisidir.
      </Sub>
      <CognitiveLoadMeter />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-7 katas-card-rose rounded-xl p-4 flex items-start gap-3 max-w-3xl mx-auto"
      >
        <Lightbulb className="w-5 h-5 text-pink-300 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-300 leading-relaxed">
          Pratik kural: bir öğeyi anlamak için kullanıcı &quot;dur, bu ne
          demek?&quot; diye duraksıyorsa, bu dışsal yüktür ve tasarımla giderilebilir.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 10 · MILLER 7±2 ───── */
  () => (
    <SlideShell>
      <Eyebrow>Çalışma belleği · Miller</Eyebrow>
      <H2 className="mb-2">7 ± 2 ve parçalama (chunking)</H2>
      <Sub className="max-w-3xl mb-6">
        Klasik bir bulgu, kısa süreli belleğin sınırlı sayıda birim tuttuğunu
        söyler. Çözüm sayıyı azaltmak değil, <strong className="text-pink-300">parçalamaktır</strong>:
        birimleri anlamlı gruplara toplamak kapasiteyi büyütür.
      </Sub>
      <div className="grid grid-cols-2 gap-6 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="katas-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-red-300">
            <XCircle className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Parçalanmamış</span>
          </div>
          <div className="font-mono text-2xl tracking-[0.2em] text-white text-center py-6">
            05349912847
          </div>
          <p className="text-sm text-gray-400">11 ayrı birim — okumak ve hatırlamak zor.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="katas-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-emerald-300">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Parçalanmış</span>
          </div>
          <div className="font-mono text-2xl tracking-wider text-white text-center py-6">
            0534 <span className="text-pink-300">·</span> 991 <span className="text-pink-300">·</span> 28 47
          </div>
          <p className="text-sm text-gray-400">4 grup — telefon numarası gibi, tek bakışta okunur.</p>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 text-[12px] text-gray-500 text-center"
      >
        Arayüzde karşılığı: IBAN, kart numarası, tarih alanlarını gruplara böl;
        uzun menüleri kategorilere ayır.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 11 · HICK YASASI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Karar süresi · Hick yasası</Eyebrow>
      <H2 className="mb-2">Seçenek arttıkça karar yavaşlar</H2>
      <Sub className="max-w-3xl mb-6">
        Hick yasası, karar süresinin seçenek sayısıyla birlikte arttığını söyler.
        Az ama iyi gruplanmış seçenek, kullanıcıyı felç eden uzun listeden hızlıdır.
      </Sub>
      <HicksLawDemo />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 grid grid-cols-3 gap-3 max-w-4xl mx-auto text-xs"
      >
        <div className="flex items-center gap-2 text-gray-400">
          <Check className="w-4 h-4 text-emerald-400" /> Varsayılanı işaretle
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Check className="w-4 h-4 text-emerald-400" /> Seçenekleri grupla
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Check className="w-4 h-4 text-emerald-400" /> Gelişmişi gizle (progressive disclosure)
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 12 · FITTS YASASI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Hedefleme · Fitts yasası</Eyebrow>
      <H2 className="mb-2">Büyük ve yakın hedefe hızlı ulaşılır</H2>
      <Sub className="max-w-3xl mb-6">
        Fitts yasası, bir hedefe ulaşma süresinin hedefin <strong className="text-pink-300">boyutu</strong> ve
        <strong className="text-pink-300"> uzaklığıyla</strong> ilişkili olduğunu söyler. Birincil eylem
        butonu büyük ve elin/imlecin doğal yolunda olmalı.
      </Sub>
      <div className="grid grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="katas-card rounded-2xl p-6 flex flex-col items-center"
        >
          <div className="text-[10px] font-mono uppercase tracking-widest text-pink-300 mb-4">
            Hedef boyutu önemli
          </div>
          <div className="flex items-end gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-7 rounded-md bg-gray-200 flex items-center justify-center text-[8px] text-gray-600">
                <MousePointerClick className="w-3 h-3" />
              </div>
              <span className="text-[10px] text-red-300">küçük · yavaş</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-12 rounded-lg flex items-center justify-center text-white text-xs font-semibold" style={{ background: "linear-gradient(135deg,#ec4899,#be185d)" }}>
                Devam
              </div>
              <span className="text-[10px] text-emerald-300">büyük · hızlı</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-6 text-center leading-relaxed">
            Dokunmatik hedef için en az ~44&nbsp;px&apos;lik dokunma alanı önerilir.
          </p>
        </motion.div>

        <div className="space-y-3">
          <FeatureCard
            icon={Target}
            title="Birincil eylem büyük olsun"
            desc="En sık yapılan işlem en büyük ve en erişilebilir hedef olmalı."
            delay={0}
            accent="#a855f7"
          />
          <FeatureCard
            icon={Move}
            title="Mesafeyi kısalt"
            desc="İlişkili kontrolleri yan yana koy; imleci ekranı baştan başa gezdirme."
            delay={0.1}
            accent="#a855f7"
          />
          <FeatureCard
            icon={Square}
            title="Kenar ve köşeler &quot;sonsuz&quot; hedeftir"
            desc="Ekran kenarına yaslı öğeler kolay isabet alır (imleç kenarda durur)."
            delay={0.2}
            accent="#a855f7"
          />
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 13 · KARŞILAŞTIRMA TABLOSU ───── */
  () => (
    <SlideShell>
      <Eyebrow>Toparlama · ilke → tasarım kararı</Eyebrow>
      <H2>Her ilkenin bir arayüz karşılığı vardır</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu hafta gördüğümüz ilkelerin doğrudan, uygulanabilir karşılıkları.
        Tasarım gözden geçirmesinde (design review) bu tabloyu bir kontrol listesi gibi kullan.
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
              <th style={{ width: "22%" }}>İlke</th>
              <th style={{ width: "30%" }}>Ne der?</th>
              <th>Arayüzde uygulaması</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Yakınlık</td>
              <td>Yakın öğeler aynı gruptur.</td>
              <td>Etiketi alanına yaklaştır; ilgili kartları kümele, gruplar arası boşluğu büyüt.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Benzerlik</td>
              <td>Aynı görünen aynı işlevdir.</td>
              <td>Tüm birincil butonları tek renk/biçimde tut; bağlantıları ayırt edilebilir kıl.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Şekil–zemin</td>
              <td>Bir öğe öne, gerisi geriye.</td>
              <td>Modal açıkken zemini karart; aktif sekmeyi kontrastla öne çıkar.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Hick</td>
              <td>Çok seçenek = yavaş karar.</td>
              <td>Varsayılanı öner, seçenekleri grupla, gelişmiş ayarı gizle.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Miller 7±2</td>
              <td>Bellek birkaç birimle sınırlı.</td>
              <td>Uzun numara/menüyü parçala; sihirbazı adımlara böl.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Fitts</td>
              <td>Büyük + yakın hedef hızlıdır.</td>
              <td>Birincil eylemi büyüt; dokunma alanını ~44px tut; kenarları kullan.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 14 · YÜKLÜ vs SADE ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bütünü görmek · aynı içerik</Eyebrow>
      <H2 className="mb-2">Gestalt + yük bir araya gelince</H2>
      <Sub className="max-w-3xl mb-6">
        Soldaki ekran her şeyi eşit gösterir: gruplama yok, boşluk yok, hiyerarşi
        yok — yüksek dışsal yük. Sağda aynı içerik, yakınlık ve boşlukla gruplanmış;
        göz birincil eyleme akar.
      </Sub>
      <CrowdedVsCalm />
    </SlideShell>
  ),

  /* ───── 15 · UYGULAMALI ATÖLYE ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı atölye</Eyebrow>
      <H2>Bir ekranı &quot;yeniden grupla&quot;</H2>
      <Sub className="mt-3 max-w-3xl">
        Kendi seçtiğin yoğun bir ekranı (kayıt formu, ayarlar sayfası, pano) alıp
        bu haftanın ilkeleriyle sadeleştireceksin. Sonraki derse önce/sonra
        görüntüsüyle gelmen bekleniyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Search, title: "1 · Yoğun bir ekran seç", desc: "Çok elemanlı gerçek bir arayüzün ekran görüntüsünü al (form/ayarlar/pano).", accent: "#ec4899" },
          { icon: SlidersHorizontal, title: "2 · Yükü işaretle", desc: "Dışsal yük üreten yerleri kırmızıyla işaretle: belirsiz gruplama, gereksiz seçenek, eşit boşluk.", accent: "#f87171" },
          { icon: Group, title: "3 · Gestalt ile yeniden grupla", desc: "Yakınlık ve boşlukla ilişkili öğeleri kümele; benzer butonları aynılaştır; birincil eylemi büyüt.", accent: "#a855f7" },
          { icon: ListChecks, title: "4 · Önce/sonra karşılaştır", desc: "İki versiyonu yan yana koy; hangi ilkeyi nerede uyguladığını 3–4 maddeyle yaz.", accent: "#3b82f6" },
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
              <h3 className="text-base font-semibold text-white mb-1">{t.title}</h3>
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
        <AlertTriangle className="w-4 h-4 text-pink-300 mt-0.5 flex-shrink-0" />
        <span>
          Amaç ekranı &quot;güzelleştirmek&quot; değil; her kararı bir ilkeyle
          gerekçelendirmek. &quot;Bunu yaklaştırdım çünkü aynı gruba ait&quot; diyebilmelisin.
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
          <Eye className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>5. hafta tamamlandı · sıradaki: Renk &amp; Tipografi</Eyebrow>
        <H1>
          <span className="katas-shimmer">Görmekten okumaya</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta beynin elemanları nasıl grupladığını ve yükü öğrendik. Gelecek
          hafta bu grupları görsel olarak biçimlendiren iki araca odaklanıyoruz:
          renk sistemleri ve tipografik hiyerarşi.
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
            <div className="text-white font-semibold">Yeniden grupla</div>
            <div className="text-sm text-gray-400">önce/sonra görüntüsü</div>
          </div>
          <div className="katas-card rounded-xl p-5">
            <Brain className="w-5 h-5 text-[#3b82f6] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Atölye notu</div>
            <div className="text-sm text-gray-400">ilke gerekçeleriyle</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>BVA 2245 · Kullanıcı Arayüzü Tasarımı · 5. Hafta</span>
          <Hash className="w-3.5 h-3.5" />
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
            background: "linear-gradient(90deg, #ec4899, #f472b6, #ec4899)",
            boxShadow: "0 0 16px rgba(236,72,153,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#ec4899]/70">
          BVA 2245 · 5. Hafta · Gestalt &amp; Bilişsel Yük
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
