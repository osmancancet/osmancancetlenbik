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
  TestTube2,
  ClipboardList,
  Users,
  UserCheck,
  Eye,
  Target,
  Gauge,
  Timer,
  Smile,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Sparkles,
  Calendar,
  Hash,
  Globe,
  GraduationCap,
  Briefcase,
  Clock,
  ListChecks,
  MessageSquare,
  Lightbulb,
  ScrollText,
  Layers,
  Scale,
  Filter,
  ArrowRight,
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

function StatCard({
  icon: Icon,
  value,
  label,
  source,
  delay = 0,
  accent = "#ec4899",
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
      className="katas-card rounded-xl p-5"
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

/* Pencere kromu — test ekranı / transkript paneli için */
function WindowMock({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
          <Icon className="w-3.5 h-3.5" />
          <span>{title}</span>
        </div>
      </div>
      <div>{children}</div>
    </motion.div>
  );
}

/* Kullanılabilirlik testi oturumu — düşünme-sesli-anlatma transkripti */
function ThinkAloudTranscript() {
  return (
    <WindowMock
      title="oturum-04.mp4 — moderasyonlu test · sesli düşünme"
      icon={MessageSquare}
    >
      <div className="katas-transcript">
        <div>
          <span className="katas-transcript-time">00:12</span>{" "}
          <span className="katas-transcript-facil">Moderatör:</span>{" "}
          Lütfen sepetinizdeki ürünü iade etmeye çalışın. Aklınızdan geçeni
          sesli söyleyin.
        </div>
        <div>
          <span className="katas-transcript-time">00:31</span>{" "}
          <span className="katas-transcript-user">Katılımcı:</span>{" "}
          &ldquo;İade... hesabım altında olmalı herhalde? Burada yok ki.&rdquo;
        </div>
        <div>
          <span className="katas-transcript-time">01:05</span>{" "}
          <span className="katas-transcript-user">Katılımcı:</span>{" "}
          &ldquo;Siparişlerim&rsquo;e girdim ama iade butonu görmüyorum.&rdquo;{" "}
          <span className="katas-transcript-flag">[takıldı]</span>
        </div>
        <div>
          <span className="katas-transcript-time">01:40</span>{" "}
          <span className="katas-transcript-note">Gözlem:</span>{" "}
          Katılımcı sayfayı 3 kez aşağı-yukarı kaydırdı, geri tuşuna bastı.
        </div>
        <div>
          <span className="katas-transcript-time">02:18</span>{" "}
          <span className="katas-transcript-user">Katılımcı:</span>{" "}
          &ldquo;Sanırım iade yapılamıyor. Vazgeçtim.&rdquo;{" "}
          <span className="katas-transcript-flag">[görev başarısız]</span>
        </div>
      </div>
      <div className="px-4 py-3 text-[11px] text-gray-400 border-t border-white/5 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-[#f87171] mt-0.5 flex-shrink-0" />
        <span>
          Moderatör <span className="text-white">çözüm söylemez</span>, yönlendirmez:
          yalnızca &ldquo;ne düşünüyorsunuz?&rdquo; diye sorar. Takılma ve vazgeçme
          anları en değerli bulgudur.
        </span>
      </div>
    </WindowMock>
  );
}

/* Heuristic değerlendirme bulgu kartı — şiddet derecesi ile */
function HeuristicFindingCard({
  heuristic,
  problem,
  severity,
  severityLabel,
  delay = 0,
}: {
  heuristic: string;
  problem: string;
  severity: 0 | 1 | 2 | 3 | 4;
  severityLabel: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="katas-card rounded-xl p-5"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="text-[10px] font-mono uppercase tracking-wider text-pink-300">
          {heuristic}
        </div>
        <span className={`katas-sev katas-sev-${severity}`}>{severity}</span>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed mb-3">{problem}</p>
      <div className="text-[11px] text-gray-500 border-t border-white/5 pt-2">
        Şiddet: <span className="text-gray-300">{severityLabel}</span>
      </div>
    </motion.div>
  );
}

/* Moderasyonlu vs moderasyonsuz / nicel vs nitel — kıyas mockup */
function MethodCompareMock() {
  return (
    <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="katas-card rounded-xl overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-pink-500/10 border-b border-pink-500/30">
          <UserCheck className="w-4 h-4 text-pink-400" />
          <span className="text-xs font-mono uppercase text-pink-300">
            Nitel · &ldquo;neden&rdquo;
          </span>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-start gap-2 text-sm text-gray-300">
            <Eye className="w-4 h-4 mt-0.5 text-pink-400 flex-shrink-0" />
            <span>Az katılımcı (5&ndash;8), derin gözlem.</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-300">
            <MessageSquare className="w-4 h-4 mt-0.5 text-pink-400 flex-shrink-0" />
            <span>Sesli düşünme, davranış, takılma anları.</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-300">
            <Lightbulb className="w-4 h-4 mt-0.5 text-pink-400 flex-shrink-0" />
            <span>Sorunun <em>kök nedenini</em> bulmaya yarar.</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="katas-card rounded-xl overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border-b border-purple-500/30">
          <Gauge className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-mono uppercase text-purple-300">
            Nicel · &ldquo;ne kadar&rdquo;
          </span>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-start gap-2 text-sm text-gray-300">
            <Users className="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0" />
            <span>Çok katılımcı, istatistiksel metrikler.</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-300">
            <Timer className="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0" />
            <span>Görev süresi, başarı oranı, hata sayısı.</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-300">
            <Target className="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0" />
            <span>İki tasarımı <em>karşılaştırmaya</em> yarar.</span>
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
  /* ─────────────────  01 · KAPAK  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2245 · 14. Hafta · Değerlendirme</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          <span className="katas-shimmer">Kullanılabilirlik Testi</span>
          <br />
          <span className="text-white">&amp; Heuristic Değerlendirme</span>
        </motion.h1>
        <Sub className="mt-6 max-w-3xl mx-auto">
          Tasarımın iyi olduğunu sezgiyle değil, kanıtla gösteririz. Bu hafta
          arayüzü iki yöntemle sınarız: gerçek kullanıcıyla test ve uzman
          incelemesi.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={TestTube2}
            title="Kullanılabilirlik testi"
            desc="Gerçek kullanıcılar gerçek görevleri denerken gözlemlemek."
            delay={0.3}
            accent="#ec4899"
          />
          <FeatureCard
            icon={ClipboardList}
            title="Heuristic değerlendirme"
            desc="Uzmanların 10 ilkeye göre arayüzü taraması — hızlı ve ucuz."
            delay={0.45}
            accent="#a855f7"
          />
          <FeatureCard
            icon={Gauge}
            title="Metrikler"
            desc="Başarı oranı, süre, hata, memnuniyet (SUS) ile ölçmek."
            delay={0.6}
            accent="#3b82f6"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/5 text-xs text-pink-300 font-mono"
        >
          <Calendar className="w-3.5 h-3.5" />
          Cuma 15:20 — 17:00 · Uygulamalı: kendi prototipini test et
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  02 · KÖPRÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 13. haftadan 14. haftaya</Eyebrow>
      <H2>Prototipi yaptık; peki gerçekten işe yarıyor mu?</H2>
      <Sub className="mt-3 max-w-3xl">
        Önceki haftalarda wireframe&apos;den prototipe bir arayüz kurduk. Ama
        &ldquo;güzel görünüyor&rdquo; ile &ldquo;kullanılabiliyor&rdquo; aynı şey
        değildir. Bu hafta tasarımı kanıt karşısına çıkarıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="katas-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-pink-300">
            <XCircle className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Test öncesi varsayım
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-pink-400 flex-shrink-0" />&ldquo;Bence buton yeterince belli.&rdquo;</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-pink-400 flex-shrink-0" />&ldquo;Akış mantıklı, herkes anlar.&rdquo;</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-pink-400 flex-shrink-0" />Tasarımcı kendi arayüzünü ezbere bilir.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="katas-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-emerald-300">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Test sonrası kanıt
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />5 kullanıcıdan 4&apos;ü butonu görmedi.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />İade görevi %40 başarı oranında.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Karar artık tahmine değil veriye dayanır.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  03 · BU DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>İki yöntem, bir hedef: sorunları erken bulmak</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce gerçek kullanıcılarla testi, sonra uzman incelemesini (heuristic)
        öğreniyoruz; sonunda ikisini ne zaman seçeceğimizi netleştiriyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "Kullanılabilirlik Testi",
            items: ["Görev senaryoları", "Sesli düşünme", "Moderasyonlu / uzaktan", "Metrikler & SUS"],
            icon: TestTube2,
            accent: "#ec4899",
          },
          {
            range: "02",
            title: "Heuristic Değerlendirme",
            items: ["Nielsen&apos;in 10 ilkesi", "Uzman taraması", "Şiddet derecesi", "Bulgu raporu"],
            icon: ClipboardList,
            accent: "#a855f7",
          },
          {
            range: "03",
            title: "Hangi Yöntem, Ne Zaman?",
            items: ["Nitel vs nicel", "Maliyet & süre", "Birlikte kullanım", "Uygulama planı"],
            icon: Scale,
            accent: "#3b82f6",
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
                  Bölüm {g.range}
                </div>
                <div className="text-lg font-semibold text-white">{g.title}</div>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-400">
              {g.items.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <ChevronRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: g.accent }} />
                  <span dangerouslySetInnerHTML={{ __html: it }} />
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  04 · DIVIDER 1/3  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Kullanılabilirlik Testi"
      subtitle="Gerçek kullanıcı, gerçek görev, gerçek davranış. Tasarımcının göremediği sorunları kullanıcı ilk dakikada gösterir."
      bgGradient="linear-gradient(135deg, #ec4899 0%, #be185d 100%)"
      shadow="0 0 60px rgba(236, 72, 153, 0.5)"
      icon={<TestTube2 className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  05 · TEST NEDİR + 5 KULLANICI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kullanılabilirlik testi · tanım</Eyebrow>
      <H2 className="mb-2">Az kullanıcı, çok bulgu</H2>
      <Sub className="max-w-3xl mb-8">
        Temsili kullanıcılara gerçekçi görevler verip nerede takıldıklarını
        gözlemlemektir. Amaç kullanıcıyı değil, tasarımı sınamaktır.
      </Sub>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={Users}
          value="~5"
          label="Bir tasarım turunda çoğu büyük sorunu yakalamaya yeten katılımcı sayısı"
          source="Nielsen Norman Group"
          delay={0}
        />
        <StatCard
          icon={Layers}
          value="Az + sık"
          label="Tek büyük test yerine, küçük testleri iterasyonlara yayma yaklaşımı"
          delay={0.1}
          accent="#a855f7"
        />
        <StatCard
          icon={Gauge}
          value="Görev"
          label="Soyut görüş değil; tamamlanabilen somut görevler üzerinden ölçüm"
          delay={0.2}
          accent="#3b82f6"
        />
        <StatCard
          icon={Eye}
          value="Davranış"
          label="Kullanıcının söylediği değil, yaptığı esas alınır"
          delay={0.3}
          accent="#10b981"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="katas-card-rose rounded-xl p-5 flex items-start gap-3"
      >
        <Lightbulb className="w-5 h-5 text-pink-300 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-300 leading-relaxed">
          Az sayıda kullanıcı yeter çünkü ilk birkaç kişi aynı temel sorunlara
          takılır. Bütçeyi tek devasa teste değil,{" "}
          <strong className="text-pink-300">birden çok küçük turla iterasyona</strong>{" "}
          ayırmak daha çok sorun çözer.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  06 · TEST OTURUMU AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Oturum yapısı · 5 adım</Eyebrow>
      <H2>Bir test oturumu nasıl ilerler?</H2>
      <Sub className="mt-3 max-w-3xl">
        Her oturum aynı iskelete oturur; böylece katılımcılar arasında
        karşılaştırma yapılabilir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-10">
        {[
          { i: MessageSquare, t: "Karşılama", d: "Amaç anlat: &ldquo;Sizi değil tasarımı test ediyoruz.&rdquo; Rıza al, kayıt izni." },
          { i: ScrollText, t: "Ön sorular", d: "Kısa profil: deneyim, alışkanlık, beklenti." },
          { i: Target, t: "Görevler", d: "Gerçekçi senaryolar; her görevde sesli düşünme." },
          { i: Eye, t: "Gözlem", d: "Takılma, hata, tereddüt; çözüm söyleme." },
          { i: Smile, t: "Kapanış", d: "Memnuniyet (SUS), serbest yorum, teşekkür." },
        ].map((s, idx) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className="katas-card rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-pink-500/15 border border-pink-500/40 flex items-center justify-center">
                <s.i className="w-5 h-5 text-pink-400" />
              </div>
              <span className="text-[10px] font-mono text-gray-600">
                {String(idx + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="text-sm font-semibold text-white mb-1">{s.t}</div>
            <div
              className="text-xs text-gray-400 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: s.d }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 text-xs text-gray-500 font-mono flex items-center gap-2"
      >
        <AlertTriangle className="w-3.5 h-3.5 text-pink-400" />
        Görev cümlesi çözümü içermemeli: &ldquo;İade et&rdquo; de, &ldquo;Hesabım &gt; İade&rsquo;ye gir&rdquo; deme.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  07 · SESLİ DÜŞÜNME / TRANSKRİPT  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sesli düşünme · think-aloud</Eyebrow>
      <H2 className="mb-2">Kullanıcının kafasının içini duymak</H2>
      <Sub className="max-w-3xl mb-6">
        Katılımcı her adımda ne düşündüğünü sesli söyler. Böylece nerede ve{" "}
        <em>neden</em> takıldığını görürüz. Aşağıda bir iade görevi oturumundan kesit:
      </Sub>
      <ThinkAloudTranscript />
    </SlideShell>
  ),

  /* ─────────────────  08 · MODERASYON & METRİKLER  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Türler & ölçüm</Eyebrow>
      <H2>Moderasyon biçimleri ve temel metrikler</H2>
      <Sub className="mt-3 max-w-3xl">
        Testi nasıl yürüttüğüne (moderasyonlu/uzaktan) ve neyi ölçtüğüne
        (nitel/nicel) göre kurgu değişir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 items-start">
        <MethodCompareMock />
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="katas-card rounded-xl p-1"
        >
          <table className="katas-tbl">
            <thead>
              <tr>
                <th style={{ width: "42%" }}>Metrik</th>
                <th>Ne söyler?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-white font-semibold">Görev başarı oranı</td>
                <td>Görevi tamamlayanların yüzdesi.</td>
              </tr>
              <tr>
                <td className="text-white font-semibold">Görev süresi</td>
                <td>Tamamlamanın ne kadar sürdüğü.</td>
              </tr>
              <tr>
                <td className="text-white font-semibold">Hata sayısı</td>
                <td>Yanlış tıklama, geri dönüş, sapma.</td>
              </tr>
              <tr>
                <td className="text-white font-semibold">SUS skoru</td>
                <td>10 soruluk standart memnuniyet ölçeği (0&ndash;100).</td>
              </tr>
            </tbody>
          </table>
          <div className="px-4 py-3 text-[11px] text-gray-500">
            SUS (System Usability Scale) sektör standardı bir anket; sonucu
            yorumlarken yüksek skor daha iyi algılanan kullanılabilirliğe işaret eder.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  09 · DIVIDER 2/3  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Heuristic Değerlendirme"
      subtitle="Kullanıcı bulmadan, uzmanlar bilinen ilkelere göre arayüzü tarar. Hızlı, ucuz ve tasarımın her aşamasında uygulanabilir."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #ec4899 100%)"
      shadow="0 0 60px rgba(168, 85, 247, 0.5)"
      icon={<ClipboardList className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  10 · NIELSEN'İN 10 İLKESİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Jakob Nielsen · 10 Usability Heuristics</Eyebrow>
      <H2 className="mb-2">Değerlendirmenin dayandığı 10 ilke</H2>
      <Sub className="max-w-3xl mb-6">
        Uzmanlar arayüzü bu genel kabul görmüş ilkelere göre tarar. Bir ilkeye
        aykırı her durum bir bulgudur.
      </Sub>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { n: "01", t: "Sistem durumunun görünürlüğü" },
          { n: "02", t: "Sistem ile gerçek dünya uyumu" },
          { n: "03", t: "Kullanıcı denetimi ve özgürlüğü" },
          { n: "04", t: "Tutarlılık ve standartlar" },
          { n: "05", t: "Hata önleme" },
          { n: "06", t: "Hatırlamak yerine tanıma" },
          { n: "07", t: "Esneklik ve verimlilik" },
          { n: "08", t: "Estetik ve minimal tasarım" },
          { n: "09", t: "Hatadan kurtulma yardımı" },
          { n: "10", t: "Yardım ve dokümantasyon" },
        ].map((h, i) => (
          <motion.div
            key={h.n}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="rounded-lg p-3 border border-pink-500/15 bg-pink-500/[0.03]"
          >
            <div className="text-[10px] font-mono text-pink-300 mb-1">H{h.n}</div>
            <div className="text-[12px] font-semibold text-gray-200 leading-tight">
              {h.t}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 text-[11px] text-gray-500 font-mono"
      >
        İlkeler Jakob Nielsen tarafından 1994&apos;te derlendi; bugün hâlâ uzman
        incelemesinin temel çerçevesidir.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  11 · İLKE → İHLAL ÖRNEKLERİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>İlkeden bulguya · somut örnekler</Eyebrow>
      <H2>Bir ilke ihlali pratikte nasıl görünür?</H2>
      <Sub className="mt-3 max-w-3xl">
        Soyut ilke yetmez; uzman onu somut bir arayüz davranışına bağlamalıdır.
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
              <th style={{ width: "26%" }}>İlke</th>
              <th style={{ width: "37%" }}>İhlal örneği</th>
              <th>Çözüm yönü</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Durum görünürlüğü</td>
              <td>Form gönderiminde hiçbir geri bildirim yok; kullanıcı bekliyor mu, bitti mi bilmiyor.</td>
              <td>Yükleniyor göstergesi + başarı/onay mesajı ekle.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Gerçek dünya uyumu</td>
              <td>Buton etiketi &ldquo;Commit transaction&rdquo; — son kullanıcının diline yabancı.</td>
              <td>Kullanıcının diliyle yaz: &ldquo;Ödemeyi tamamla&rdquo;.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Hata önleme</td>
              <td>&ldquo;Hesabı sil&rdquo; tek tıkla, geri alınamaz çalışıyor.</td>
              <td>Onay adımı veya geri alma (undo) penceresi ekle.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Tutarlılık</td>
              <td>Aynı eylem bir ekranda &ldquo;Kaydet&rdquo;, diğerinde &ldquo;Onayla&rdquo; deniyor.</td>
              <td>Terim ve yerleşimi tüm akışta standartlaştır.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  12 · ŞİDDET DERECESİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Önceliklendirme · severity rating</Eyebrow>
      <H2 className="mb-2">Her bulgu eşit değildir</H2>
      <Sub className="max-w-3xl mb-6">
        Bulguları 0&ndash;4 arası bir şiddet ölçeğiyle puanlamak, ekibin önce
        neyi düzelteceğine karar vermesini sağlar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-8">
        {[
          { s: 0, t: "Sorun değil", d: "İlke ihlali olarak görülmüyor." },
          { s: 1, t: "Kozmetik", d: "Zaman varsa düzeltilir." },
          { s: 2, t: "Küçük", d: "Düşük öncelik, düzeltilmeli." },
          { s: 3, t: "Büyük", d: "Yüksek öncelik, mutlaka." },
          { s: 4, t: "Felaket", d: "Yayından önce şart." },
        ].map((r, i) => (
          <motion.div
            key={r.s}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="katas-card rounded-xl p-4 text-center"
          >
            <span className={`katas-sev katas-sev-${r.s as 0 | 1 | 2 | 3 | 4} mx-auto mb-3`}>
              {r.s}
            </span>
            <div className="text-sm font-semibold text-white">{r.t}</div>
            <div className="text-[11px] text-gray-400 mt-1 leading-snug">{r.d}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <HeuristicFindingCard
          heuristic="H05 · Hata önleme"
          problem="Tek tıkla geri alınamaz hesap silme. Kullanıcı yanlışlıkla tetikleyebilir."
          severity={4}
          severityLabel="Felaket — yayından önce şart"
          delay={0.1}
        />
        <HeuristicFindingCard
          heuristic="H01 · Durum görünürlüğü"
          problem="Gönderim sonrası geri bildirim yok; kullanıcı butona tekrar basıyor."
          severity={3}
          severityLabel="Büyük — yüksek öncelik"
          delay={0.2}
        />
        <HeuristicFindingCard
          heuristic="H08 · Estetik & minimallik"
          problem="Ana sayfada okunmayan ikincil bir uyarı metni dikkat dağıtıyor."
          severity={1}
          severityLabel="Kozmetik — zaman varsa"
          delay={0.3}
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  13 · DIVIDER 3/3  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Hangi Yöntem, Ne Zaman?"
      subtitle="Test mi, heuristic mi? İkisi rakip değil tamamlayıcıdır. Doğru anda doğru yöntemi seçmek bütçeyi de bulguyu da artırır."
      bgGradient="linear-gradient(135deg, #f472b6 0%, #a855f7 100%)"
      shadow="0 0 60px rgba(244, 114, 182, 0.5)"
      icon={<Scale className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  14 · KARŞILAŞTIRMA TABLOSU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kıyas · iki yöntem yan yana</Eyebrow>
      <H2>Kullanıcı testi vs heuristic değerlendirme</H2>
      <Sub className="mt-3 max-w-3xl">
        İkisi de sorun bulur ama farklı türde. Genelde önce ucuz heuristic ile
        kaba sorunları temizler, sonra kullanıcı testiyle gerçek davranışı görürsün.
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
              <th style={{ width: "24%" }}>Ölçüt</th>
              <th>Kullanılabilirlik testi</th>
              <th>Heuristic değerlendirme</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Kim yapar?</td>
              <td>Gerçek temsili kullanıcılar.</td>
              <td>Birkaç kullanılabilirlik uzmanı.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Ne bulur?</td>
              <td>Gerçek davranıştaki sorunlar, sürpriz takılmalar.</td>
              <td>İlkelere aykırı tasarım hataları.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Maliyet & süre</td>
              <td>Daha yüksek; katılımcı bulma, oturum, analiz.</td>
              <td>Daha düşük; hızlı tarama, prototip bile yetebilir.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Ne zaman?</td>
              <td>Akış oturduktan sonra, doğrulamak için.</td>
              <td>Erken ve sık; her tasarım turunda.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Sınırı</td>
              <td>Az katılımcı; nadir senaryoları kaçırabilir.</td>
              <td>Uzman gerçek kullanıcı olmadığı için bazı sorunları ıskalar.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 text-[11px] text-gray-500 font-mono flex items-center gap-2"
      >
        <Filter className="w-3.5 h-3.5 text-pink-400" />
        Pratik: önce heuristic ile ele, sonra kalan sorunları kullanıcı testiyle doğrula.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · UYGULAMALI LAB  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı görev</Eyebrow>
      <H2>Kendi prototipini sına</H2>
      <Sub className="mt-3 max-w-3xl">
        Önceki haftalarda Figma&apos;da yaptığın prototip üzerinde dört adımı
        tamamla. Sonraki derse kısa bir bulgu raporuyla gel.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          {
            icon: Target,
            title: "İki görev senaryosu yaz",
            desc: "Çözümü içermeyen, gerçekçi iki görev hazırla (örn. &ldquo;Bir ürünü sepete ekle ve iade et&rdquo;).",
            accent: "#ec4899",
          },
          {
            icon: UserCheck,
            title: "Üç kişiyle test et",
            desc: "Hedef kitleye yakın 3 kişiye prototipi denet; sesli düşünmelerini iste, çözüm söyleme.",
            accent: "#a855f7",
          },
          {
            icon: ClipboardList,
            title: "Heuristic taraması yap",
            desc: "Nielsen&apos;in 10 ilkesine göre kendi arayüzünü tara; en az 5 bulgu listele.",
            accent: "#3b82f6",
          },
          {
            icon: ListChecks,
            title: "Bulguları derecelendir",
            desc: "Her bulguya 0&ndash;4 şiddet puanı ver; en yüksek 3 sorunu kısa çözüm önerisiyle yaz.",
            accent: "#10b981",
          },
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
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 katas-card-rose rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <Lightbulb className="w-4 h-4 text-pink-300 mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">İpucu:</span> Katılımcıya &ldquo;sizi
          değil tasarımı test ediyoruz&rdquo; demeyi unutma; gerginlik bulguyu
          bozar. Kayıt için her zaman rıza al.
        </span>
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
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{
            background: "linear-gradient(135deg, #ec4899, #be185d)",
            boxShadow: "0 30px 80px -20px rgba(236,72,153,0.6)",
          }}
        >
          <Sparkles className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>14. hafta tamamlandı · sıradaki: sunum &amp; portföy</Eyebrow>
        <H1>
          <span className="katas-shimmer">Bulgudan iyileştirmeye</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta sorunları ölçtük ve önceliklendirdik. 15. haftada tasarım
          sürecini ve test bulgularını bir sunum/portföy hikâyesine dönüştürüyoruz.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
          <FeatureCard
            icon={ArrowRight}
            title="İterasyon"
            desc="En yüksek şiddetli bulguyu tasarıma yansıt, önce/sonra göster."
            accent="#ec4899"
            delay={0.1}
          />
          <FeatureCard
            icon={ScrollText}
            title="Vaka anlatımı"
            desc="Problem → süreç → test → çözüm akışıyla bir case study kur."
            accent="#a855f7"
            delay={0.2}
          />
          <FeatureCard
            icon={GraduationCap}
            title="Portföy"
            desc="Çalışmalarını işverene anlatacak biçimde derle ve sun."
            accent="#3b82f6"
            delay={0.3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="katas-card rounded-xl p-5">
            <Clock className="w-5 h-5 text-[#ec4899] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">
              Ders saati
            </div>
            <div className="text-white font-semibold">Cuma</div>
            <div className="text-sm text-gray-400">15:20 — 17:00</div>
          </div>
          <div className="katas-card rounded-xl p-5">
            <Target className="w-5 h-5 text-[#a855f7] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">
              Hazırlık
            </div>
            <div className="text-white font-semibold">Prototip + bulgular</div>
            <div className="text-sm text-gray-400">test ettiğin sürüm</div>
          </div>
          <div className="katas-card rounded-xl p-5">
            <Briefcase className="w-5 h-5 text-[#3b82f6] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">
              Teslim
            </div>
            <div className="text-white font-semibold">Bulgu raporu</div>
            <div className="text-sm text-gray-400">5 bulgu + şiddet puanı</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-3 text-xs text-gray-500 font-mono"
        >
          <Globe className="w-3 h-3" />
          <span>BVA 2245 · Kullanıcı Arayüzü Tasarımı · 2026 Bahar · Hafta 14</span>
          <Hash className="w-3 h-3" />
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
          BVA 2245 · 14. Hafta · Kullanılabilirlik Testi &amp; Heuristic
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
