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
  Presentation as PresentationIcon,
  Sparkles,
  Palette,
  Video,
  Zap,
  Check,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Layers,
  Mouse,
  Keyboard,
  Wand2,
  Image as ImageIcon,
  FileText,
  Download,
  Share2,
  Lightbulb,
  Target,
  Users,
  Clock,
  Brain,
  Code,
  PlayCircle,
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
        <div className="absolute inset-0 ofis-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#00ff41]"
    >
      <span className="w-8 h-px bg-[#00ff41]" />
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
  accent = "#00ff41",
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
      className="ofis-card ofis-card-hover rounded-xl p-6 transition-all"
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

function BrowserMockup({
  url,
  children,
  accent = "#00ff41",
}: {
  url: string;
  children: ReactNode;
  accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="ofis-window-chrome w-full"
    >
      <div className="ofis-window-bar flex items-center gap-2 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="ml-3 px-3 py-1 rounded text-[11px] font-mono flex-1 max-w-md mx-auto text-center"
          style={{ background: "#0d0d0d", color: accent }}
        >
          {url}
        </div>
      </div>
      <div className="p-8">{children}</div>
    </motion.div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const TOTAL = 24;

const slides: Array<(active: boolean) => ReactNode> = [
  // 1 — Cover
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>9. Hafta · Bilgi Teknolojileri</Eyebrow>
        <H1 className="ofis-shimmer">
          Sunum Hazırlama
          <br />
          Araçları
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Klasikten yapay zekâya, üç farklı yaklaşımla profesyonel
          sunum hazırlamayı öğreneceğiz.
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 flex items-center justify-center gap-6 flex-wrap"
        >
          <div className="ofis-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center font-bold text-xl"
              style={{ background: "rgba(210,71,38,0.15)", color: "#d24726" }}
            >
              P
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">PowerPoint</div>
              <div className="text-[10px] text-gray-500">Microsoft</div>
            </div>
          </div>
          <div className="ofis-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(0,196,204,0.15)" }}
            >
              <Palette className="w-5 h-5" style={{ color: "#00c4cc" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Canva</div>
              <div className="text-[10px] text-gray-500">Tasarım</div>
            </div>
          </div>
          <div className="ofis-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(168,85,247,0.15)" }}
            >
              <Wand2 className="w-5 h-5" style={{ color: "#a855f7" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Gamma App</div>
              <div className="text-[10px] text-gray-500">Yapay Zekâ</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Why this lesson?
  () => (
    <SlideShell>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Eyebrow>Neden bu ders?</Eyebrow>
          <H2>Sunum bir araçtır,
            <br />
            <span className="text-[#00ff41]">fikrini taşır.</span>
          </H2>
          <Sub className="mt-6">
            İyi bir sunum, izleyicinin dikkatini çeker, mesajını net
            iletir ve hatırda kalır. Bugün üç farklı aracı, üç farklı
            tarz ile keşfedeceğiz.
          </Sub>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="ofis-card rounded-xl p-5">
            <Target className="w-6 h-6 text-[#00ff41] mb-3" />
            <div className="text-2xl font-bold text-white">87%</div>
            <div className="text-xs text-gray-500 mt-1">Görsel öğeler hatırlanma oranı</div>
          </div>
          <div className="ofis-card rounded-xl p-5">
            <Clock className="w-6 h-6 text-[#00ff41] mb-3" />
            <div className="text-2xl font-bold text-white">7 sn</div>
            <div className="text-xs text-gray-500 mt-1">İlk izlenim süresi</div>
          </div>
          <div className="ofis-card rounded-xl p-5">
            <Brain className="w-6 h-6 text-[#00ff41] mb-3" />
            <div className="text-2xl font-bold text-white">10x</div>
            <div className="text-xs text-gray-500 mt-1">Görsel hızı (metne göre)</div>
          </div>
          <div className="ofis-card rounded-xl p-5">
            <Users className="w-6 h-6 text-[#00ff41] mb-3" />
            <div className="text-2xl font-bold text-white">2026</div>
            <div className="text-xs text-gray-500 mt-1">Yeni standart yıl</div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 3 — Section: PowerPoint
  () => (
    <SlideShell bgPattern={false}>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 ofis-pulse"
          style={{
            background: "linear-gradient(135deg, #d24726, #b8351e)",
            boxShadow: "0 20px 60px -10px rgba(210, 71, 38, 0.5)",
          }}
        >
          <span className="text-7xl font-black text-white">P</span>
        </motion.div>
        <Eyebrow>Bölüm 1 / 3</Eyebrow>
        <H1>Microsoft PowerPoint</H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Ofis paketinin sunum aracı. 1987'den bu yana akademi ve
          kurumsal dünyanın standardı.
        </Sub>
      </div>
    </SlideShell>
  ),

  // 4 — PowerPoint features
  () => (
    <SlideShell>
      <Eyebrow>PowerPoint Nedir?</Eyebrow>
      <H2 className="mb-12">Klasikten asla vazgeçmeyenlerin tercihi</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <FeatureCard
          icon={Layers}
          title="Slayt + Şerit"
          desc="Tanıdık şerit (ribbon) arayüzü, hızlı kısayollar, sezgisel düzen seçici"
          delay={0.1}
          accent="#d24726"
        />
        <FeatureCard
          icon={Sparkles}
          title="Designer"
          desc="İçerik ekledikçe yapay zekâ destekli düzen önerileri otomatik gelir"
          delay={0.2}
          accent="#d24726"
        />
        <FeatureCard
          icon={Video}
          title="Video Kayıt"
          desc="Slayt anlatımını mikrofon + webcam ile direkt video olarak kaydet"
          delay={0.3}
          accent="#d24726"
        />
        <FeatureCard
          icon={Code}
          title="VBA & Makro"
          desc="İhtiyaca özel otomasyonlar yazılabilir, formül ve veri entegrasyonu"
          delay={0.4}
          accent="#d24726"
        />
        <FeatureCard
          icon={Share2}
          title="Bulut Senkron"
          desc="OneDrive üzerinden gerçek zamanlı işbirliği, sürüm geçmişi"
          delay={0.5}
          accent="#d24726"
        />
        <FeatureCard
          icon={Download}
          title="Çoklu Format"
          desc="PPTX, PDF, MP4, PNG, GIF — tek tıkla farklı formatlara dışa aktar"
          delay={0.6}
          accent="#d24726"
        />
      </div>
    </SlideShell>
  ),

  // 5 — PowerPoint Mockup (UI)
  () => (
    <SlideShell>
      <Eyebrow>Arayüz</Eyebrow>
      <H2 className="mb-8">Şerit (Ribbon) Yapısı</H2>
      <BrowserMockup url="PowerPoint - Sunu1.pptx" accent="#d24726">
        <div className="space-y-3">
          <div className="flex gap-2 flex-wrap">
            {["Giriş", "Ekle", "Tasarım", "Geçişler", "Animasyonlar", "Slayt Gösterisi", "Görünüm"].map(
              (tab, i) => (
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className={`px-3 py-1.5 text-xs rounded ${
                    i === 0
                      ? "bg-[#d24726] text-white font-semibold"
                      : "bg-white/5 text-gray-400 border border-white/10"
                  }`}
                >
                  {tab}
                </motion.div>
              )
            )}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-[200px_1fr] gap-4 mt-6"
          >
            <div className="space-y-2">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className={`aspect-[16/9] rounded border ${
                    n === 1
                      ? "border-[#d24726] bg-[#d24726]/10"
                      : "border-white/10 bg-white/5"
                  } flex items-center justify-center text-xs text-gray-500`}
                >
                  Slayt {n}
                </div>
              ))}
            </div>
            <div className="aspect-[16/9] rounded-lg bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 flex flex-col items-center justify-center text-center p-8">
              <div className="text-2xl font-bold text-white mb-2">Başlık Buraya</div>
              <div className="text-sm text-gray-500">Alt başlık veya açıklama</div>
            </div>
          </motion.div>
        </div>
      </BrowserMockup>
    </SlideShell>
  ),

  // 6 — Video Recording highlight
  () => (
    <SlideShell>
      <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div>
          <Eyebrow>En Önemli Özellik</Eyebrow>
          <H2>
            Video Sunum
            <br />
            <span className="text-[#d24726]">Kaydı</span>
          </H2>
          <Sub className="mt-6">
            Slaytları anlatırken video olarak kaydet. Mikrofon, webcam
            ve kalem çizimleriyle birlikte. YouTube, e-öğrenme veya
            uzaktan ders için ideal.
          </Sub>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 ofis-card rounded-lg p-4 font-mono text-sm"
          >
            <div className="text-[#00ff41]">$ Slayt Gösterisi</div>
            <div className="text-gray-400 ml-3">→ Slayt Gösterisini Kaydet</div>
            <div className="text-gray-500 ml-6 mt-2">→ Dosya → Dışa Aktar → Video Oluştur</div>
            <div className="text-[#d24726] ml-9 mt-2">⚐ output.mp4 (Full HD)</div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <div className="aspect-video rounded-2xl bg-gradient-to-br from-[#d24726]/20 to-black border border-[#d24726]/40 flex items-center justify-center relative overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-radial from-[#d24726]/20 to-transparent"
            />
            <PlayCircle className="w-24 h-24 text-[#d24726] relative z-10" />
            <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 rounded bg-red-500/80 text-white text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              REC
            </div>
            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#d24726]">
              00:14:32
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 7 — Export formats
  () => (
    <SlideShell>
      <Eyebrow>Dışa Aktar</Eyebrow>
      <H2 className="mb-12">Hangi Format Ne İçin?</H2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { ext: ".pptx", desc: "Düzenlenebilir orijinal", color: "#d24726" },
          { ext: ".pdf", desc: "Paylaşım ve baskı", color: "#ef4444" },
          { ext: ".mp4", desc: "Video sunum", color: "#00ff41" },
          { ext: ".png", desc: "Slayt görselleri", color: "#3b82f6" },
        ].map((f, i) => (
          <motion.div
            key={f.ext}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="ofis-card rounded-2xl p-6 text-center"
            style={{ borderColor: `${f.color}40` }}
          >
            <FileText
              className="w-10 h-10 mx-auto mb-4"
              style={{ color: f.color }}
            />
            <div
              className="text-2xl font-mono font-bold mb-2"
              style={{ color: f.color }}
            >
              {f.ext}
            </div>
            <div className="text-xs text-gray-400">{f.desc}</div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 8 — Section: Canva
  () => (
    <SlideShell bgPattern={false}>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 ofis-pulse"
          style={{
            background: "linear-gradient(135deg, #00c4cc, #7d2ae8)",
            boxShadow: "0 20px 60px -10px rgba(0, 196, 204, 0.5)",
          }}
        >
          <Palette className="w-16 h-16 text-white" />
        </motion.div>
        <Eyebrow>Bölüm 2 / 3</Eyebrow>
        <H1>Canva</H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Tarayıcı tabanlı, şablon odaklı tasarım aracı. Sunumdan
          sosyal medya görseline kadar her şey.
        </Sub>
      </div>
    </SlideShell>
  ),

  // 9 — Canva strengths
  () => (
    <SlideShell>
      <Eyebrow>Canva Güçlü Yanları</Eyebrow>
      <H2 className="mb-12">Tasarımcı olmadan tasarla</H2>
      <div className="grid md:grid-cols-2 gap-5">
        {[
          { icon: Layers, title: "250.000+ Şablon", desc: "Sunum, poster, sosyal medya — her şey hazır" },
          { icon: ImageIcon, title: "Stok Kütüphane", desc: "Milyonlarca ücretsiz görsel, video ve müzik" },
          { icon: Mouse, title: "Sürükle-Bırak", desc: "Kod yok, öğrenme eğrisi yok, sıfır kurulum" },
          { icon: Users, title: "Takım Çalışması", desc: "Real-time co-editing, yorum, sürüm geçmişi" },
        ].map((f, i) => (
          <FeatureCard
            key={f.title}
            icon={f.icon}
            title={f.title}
            desc={f.desc}
            delay={0.15 + i * 0.1}
            accent="#00c4cc"
          />
        ))}
      </div>
    </SlideShell>
  ),

  // 10 — Canva workflow
  (active) => (
    <SlideShell>
      <Eyebrow>Workflow</Eyebrow>
      <H2 className="mb-12">5 Adımda Sunum</H2>
      <div className="space-y-4">
        {[
          { n: "01", t: "canva.com", d: "Tarayıcıdan giriş yap, ücretsiz hesap aç" },
          { n: "02", t: "Sunumlar", d: "Üst menüden 'Sunumlar' kategorisini seç" },
          { n: "03", t: "Şablon", d: "Hazır şablon seç veya boş başla — seçim sınırsız" },
          { n: "04", t: "Düzenle", d: "Sürükle-bırak ile metni, görseli, rengi değiştir" },
          { n: "05", t: "Paylaş", d: "Link, PDF, PNG veya MP4 olarak indir" },
        ].map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, x: -20 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            className="ofis-card rounded-xl p-5 flex items-center gap-6"
            style={{ borderColor: "rgba(0,196,204,0.25)" }}
          >
            <div
              className="text-3xl font-mono font-bold w-16 shrink-0"
              style={{ color: "#00c4cc" }}
            >
              {s.n}
            </div>
            <div className="flex-1">
              <div className="text-lg font-semibold text-white">{s.t}</div>
              <div className="text-sm text-gray-400 mt-0.5">{s.d}</div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 11 — Canva mockup
  () => (
    <SlideShell>
      <Eyebrow>Şablon Galerisi</Eyebrow>
      <H2 className="mb-8">250.000+ profesyonel tasarım</H2>
      <BrowserMockup url="canva.com/templates" accent="#00c4cc">
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="aspect-[3/4] rounded border border-white/10 relative overflow-hidden"
              style={{
                background: `linear-gradient(${135 + i * 20}deg, #00c4cc${i % 2 ? 30 : 50}, #7d2ae8${i % 2 ? 50 : 30})`,
              }}
            >
              <div className="absolute bottom-2 left-2 right-2">
                <div className="h-1.5 bg-white/40 rounded mb-1" />
                <div className="h-1 bg-white/20 rounded w-2/3" />
              </div>
            </motion.div>
          ))}
        </div>
      </BrowserMockup>
    </SlideShell>
  ),

  // 12 — Canva sharing
  () => (
    <SlideShell>
      <Eyebrow>Paylaşım & Yayınlama</Eyebrow>
      <H2 className="mb-12">Sınırsız çıktı seçeneği</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <FeatureCard
          icon={Share2}
          title="Link ile Paylaş"
          desc="Görüntüleme / Yorum / Düzenleme yetkilerini ayarla"
          delay={0.1}
          accent="#00c4cc"
        />
        <FeatureCard
          icon={Download}
          title="İndir"
          desc="PNG, PDF, MP4, GIF, SVG — çoklu format desteği"
          delay={0.2}
          accent="#00c4cc"
        />
        <FeatureCard
          icon={Code}
          title="Web'e Göm"
          desc="iframe kodu ile blog veya web sitenize entegre et"
          delay={0.3}
          accent="#00c4cc"
        />
      </div>
    </SlideShell>
  ),

  // 13 — Section: Gamma
  () => (
    <SlideShell bgPattern={false}>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 ofis-pulse"
          style={{
            background: "linear-gradient(135deg, #a855f7, #7c3aed)",
            boxShadow: "0 20px 60px -10px rgba(168, 85, 247, 0.5)",
          }}
        >
          <Wand2 className="w-16 h-16 text-white" />
        </motion.div>
        <Eyebrow>Bölüm 3 / 3</Eyebrow>
        <H1>Gamma App</H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Yapay zekâ destekli sunum üreticisi. Tek bir prompt ile
          dakikalar içinde tam bir sunum.
        </Sub>
      </div>
    </SlideShell>
  ),

  // 14 — Gamma magic
  () => (
    <SlideShell>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Eyebrow>Yapay Zekâ</Eyebrow>
          <H2>
            Promptu yaz,
            <br />
            <span style={{ color: "#a855f7" }}>sunum hazır.</span>
          </H2>
          <Sub className="mt-6">
            "10 slaytlık yapay zekâ etiği sunumu" yaz, Gamma 30 saniye
            içinde içerik, görsel ve düzeni hazırlar. Sonra istediğin
            yeri düzenlersin.
          </Sub>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="ofis-card rounded-2xl p-6 font-mono text-sm space-y-3"
          style={{ borderColor: "rgba(168,85,247,0.3)" }}
        >
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <Sparkles className="w-3 h-3" /> Prompt
          </div>
          <div
            className="rounded p-3 text-white leading-relaxed"
            style={{ background: "rgba(168,85,247,0.1)" }}
          >
            Yapay zekânın eğitimde kullanımı konulu, lise öğrencileri
            için 12 slaytlık akademik sunum. Giriş, 4 ana başlık ve
            sonuç olsun.
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, delay: 0.8 }}
            className="h-2 rounded"
            style={{
              background: "linear-gradient(90deg, #a855f7, #ec4899)",
            }}
          />
          <div
            className="text-xs flex items-center gap-2"
            style={{ color: "#a855f7" }}
          >
            <Check className="w-3 h-3" /> 12 slayt · 28 saniyede oluşturuldu
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 15 — Gamma features
  () => (
    <SlideShell>
      <Eyebrow>Gamma Özellikleri</Eyebrow>
      <H2 className="mb-12">AI ile çalışmanın gücü</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <FeatureCard
          icon={Wand2}
          title="Otomatik İçerik"
          desc="Konuyu yaz, AI metin + başlık + alt başlık hepsini üretsin"
          delay={0.1}
          accent="#a855f7"
        />
        <FeatureCard
          icon={ImageIcon}
          title="Otomatik Görsel"
          desc="İçeriğe uygun görselleri AI seçer veya AI ile üretir"
          delay={0.2}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Zap}
          title="30 Saniye"
          desc="10 slaytlık tam sunum yarım dakikada hazır"
          delay={0.3}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Layers}
          title="3-in-1"
          desc="Sunum, doküman ve web sayfası — aynı içerikten üçü de"
          delay={0.4}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Palette}
          title="Tema Kütüphanesi"
          desc="Modern temalar, marka kiti desteği, anlık değiştirme"
          delay={0.5}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Share2}
          title="Web'de Yayınla"
          desc="PDF/PPTX export + paylaşılabilir web link"
          delay={0.6}
          accent="#a855f7"
        />
      </div>
    </SlideShell>
  ),

  // 16 — Prompt tips
  () => (
    <SlideShell>
      <Eyebrow>Pro İpucu</Eyebrow>
      <H2 className="mb-12">İyi Bir Prompt Nasıl Yazılır?</H2>
      <div className="grid md:grid-cols-2 gap-5">
        {[
          {
            icon: Target,
            t: "Hedef Kitleyi Belirt",
            d: '"Lise öğrencileri için" veya "akademik konferans için"',
          },
          {
            icon: Layers,
            t: "Slayt Sayısını Söyle",
            d: '"15 slaytlık" — kısa için 8, detaylı için 20',
          },
          {
            icon: Lightbulb,
            t: "Tonu Belirt",
            d: '"Eğlenceli, görsel ağırlıklı" veya "akademik, kaynaklı"',
          },
          {
            icon: Layers,
            t: "Yapı Öner",
            d: '"Giriş, 3 ana başlık, sonuç" — bölümleri sayısal ver',
          },
        ].map((tip, i) => (
          <FeatureCard
            key={tip.t}
            icon={tip.icon}
            title={tip.t}
            desc={tip.d}
            delay={0.15 + i * 0.1}
            accent="#a855f7"
          />
        ))}
      </div>
    </SlideShell>
  ),

  // 17 — Comparison Table
  (active) => (
    <SlideShell>
      <Eyebrow>Karşılaştırma</Eyebrow>
      <H2 className="mb-10">Hangisi Hangi Konuda Güçlü?</H2>
      <div className="ofis-card rounded-2xl overflow-hidden">
        <div className="grid grid-cols-4 gap-px bg-white/5">
          <div className="bg-black p-4 text-xs text-gray-500 uppercase tracking-wider">
            Özellik
          </div>
          <div className="bg-black p-4 text-center">
            <div className="text-xs font-bold" style={{ color: "#d24726" }}>
              POWERPOINT
            </div>
          </div>
          <div className="bg-black p-4 text-center">
            <div className="text-xs font-bold" style={{ color: "#00c4cc" }}>
              CANVA
            </div>
          </div>
          <div className="bg-black p-4 text-center">
            <div className="text-xs font-bold" style={{ color: "#a855f7" }}>
              GAMMA
            </div>
          </div>

          {[
            { f: "Şablon Sayısı", v: [40, 95, 30] },
            { f: "Kullanım Kolaylığı", v: [70, 85, 95] },
            { f: "AI Desteği", v: [50, 60, 100] },
            { f: "Video Kayıt", v: [100, 0, 0] },
            { f: "Web Paylaşım", v: [30, 90, 100] },
            { f: "Maliyet (free)", v: [40, 80, 70] },
          ].map((row) => (
            <div key={row.f} className="contents">
              <div className="bg-black p-4 text-sm text-gray-300">{row.f}</div>
              {row.v.map((val, idx) => {
                const colors = ["#d24726", "#00c4cc", "#a855f7"];
                return (
                  <div key={idx} className="bg-black p-4 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={active ? { width: `${val}%` } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-full rounded-full"
                        style={{ background: colors[idx] }}
                      />
                    </div>
                    <div
                      className="text-xs font-mono w-8 text-right"
                      style={{ color: colors[idx] }}
                    >
                      {val}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  ),

  // 18 — When to use what
  () => (
    <SlideShell>
      <Eyebrow>Karar Rehberi</Eyebrow>
      <H2 className="mb-12">Hangi Aracı Ne Zaman?</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-6 ofis-slot-pp-bg border"
        >
          <div className="text-3xl font-bold ofis-slot-pp mb-3">P</div>
          <div className="text-lg font-semibold text-white mb-3">PowerPoint</div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-pp shrink-0 mt-0.5" />
              Akademik sunum
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-pp shrink-0 mt-0.5" />
              Kurumsal raporlar
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-pp shrink-0 mt-0.5" />
              Video sunum kaydı
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-pp shrink-0 mt-0.5" />
              Çevrimdışı çalışma
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl p-6 ofis-slot-canva-bg border"
        >
          <Palette className="w-8 h-8 ofis-slot-canva mb-3" />
          <div className="text-lg font-semibold text-white mb-3">Canva</div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-canva shrink-0 mt-0.5" />
              Sosyal medya
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-canva shrink-0 mt-0.5" />
              Görsel ağırlıklı
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-canva shrink-0 mt-0.5" />
              Marka tutarlılığı
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-canva shrink-0 mt-0.5" />
              Takım çalışması
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl p-6 ofis-slot-gamma-bg border"
        >
          <Wand2 className="w-8 h-8 ofis-slot-gamma mb-3" />
          <div className="text-lg font-semibold text-white mb-3">Gamma</div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-gamma shrink-0 mt-0.5" />
              Hızlı taslak
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-gamma shrink-0 mt-0.5" />
              Brainstorming
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-gamma shrink-0 mt-0.5" />
              AI içerik üretimi
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-gamma shrink-0 mt-0.5" />
              Web yayını
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 19 — Best practices
  () => (
    <SlideShell>
      <Eyebrow>Genel Kurallar</Eyebrow>
      <H2 className="mb-12">İyi Sunum Tasarımının 6 Kuralı</H2>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { n: "1", t: "Az kelime, çok görsel", d: "Slayt bir poster, bir makale değil" },
          { n: "2", t: "6×6 kuralı", d: "En fazla 6 satır, satırda 6 kelime" },
          { n: "3", t: "Tek mesaj / slayt", d: "Bir slayt = bir fikir" },
          { n: "4", t: "Tutarlı tipografi", d: "En fazla 2 font, hiyerarşik boyut" },
          { n: "5", t: "Büyük font", d: "30pt altına inme — son sıradan okunabilsin" },
          { n: "6", t: "Animasyon az", d: "Vurgu için kullan, gösteriş için değil" },
        ].map((r, i) => (
          <motion.div
            key={r.n}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.07 }}
            className="ofis-card rounded-xl p-5 flex items-center gap-5"
          >
            <div className="w-12 h-12 rounded-lg bg-[#00ff41]/10 border border-[#00ff41]/30 flex items-center justify-center text-2xl font-bold text-[#00ff41] shrink-0">
              {r.n}
            </div>
            <div>
              <div className="text-base font-semibold text-white">{r.t}</div>
              <div className="text-sm text-gray-400">{r.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 20 — Color & Typography
  () => (
    <SlideShell>
      <Eyebrow>Görsel Detaylar</Eyebrow>
      <H2 className="mb-12">Renk & Tipografi</H2>
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-xs uppercase tracking-wider text-[#00ff41] mb-4">
            Renk Paleti — 3 renk yeter
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { c: "#00ff41", n: "Primary" },
              { c: "#0a0a0a", n: "BG" },
              { c: "#e8ffee", n: "Text" },
            ].map((c) => (
              <div key={c.n} className="text-center">
                <div
                  className="aspect-square rounded-lg mb-2 border border-white/10"
                  style={{ background: c.c }}
                />
                <div className="text-[10px] font-mono text-gray-500">{c.c}</div>
                <div className="text-xs text-gray-400">{c.n}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-xs uppercase tracking-wider text-[#00ff41] mb-4">
            Tipografi Hiyerarşisi
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-3xl font-bold text-white">Başlık</div>
              <div className="text-[10px] font-mono text-gray-500">36-48pt · bold</div>
            </div>
            <div>
              <div className="text-xl font-semibold text-gray-300">Alt Başlık</div>
              <div className="text-[10px] font-mono text-gray-500">20-24pt · semibold</div>
            </div>
            <div>
              <div className="text-base text-gray-400">Gövde metni — okunabilir kalsın</div>
              <div className="text-[10px] font-mono text-gray-500">14-18pt · regular</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 21 — Keyboard shortcuts
  () => (
    <SlideShell>
      <Eyebrow>Pratik İpuçları</Eyebrow>
      <H2 className="mb-12">Klavye Kısayolları</H2>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { keys: ["F5"], desc: "Sunum modunu başlat (PowerPoint)" },
          { keys: ["Esc"], desc: "Sunumdan çık" },
          { keys: ["→", "←"], desc: "Slaytlar arasında gezin" },
          { keys: ["B"], desc: "Ekranı karart (PowerPoint)" },
          { keys: ["Ctrl", "M"], desc: "Yeni slayt ekle" },
          { keys: ["Ctrl", "D"], desc: "Slayt çoğalt" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.07 }}
            className="ofis-card rounded-lg px-5 py-4 flex items-center justify-between"
          >
            <div className="text-sm text-gray-300">{s.desc}</div>
            <div className="flex items-center gap-1.5">
              {s.keys.map((k) => (
                <kbd
                  key={k}
                  className="px-2.5 py-1 text-xs font-mono bg-[#00ff41]/10 border border-[#00ff41]/30 rounded text-[#00ff41] min-w-8 text-center"
                >
                  {k}
                </kbd>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 22 — Homework
  () => (
    <SlideShell>
      <Eyebrow>Bu Hafta</Eyebrow>
      <H2 className="mb-12">Yapılacaklar</H2>
      <div className="grid md:grid-cols-2 gap-5">
        {[
          {
            n: "01",
            t: "PowerPoint",
            d: "5 slaytlık bir sunum hazırla, anlatımını video olarak kaydet. .mp4 olarak çıktı al.",
            color: "#d24726",
          },
          {
            n: "02",
            t: "Canva",
            d: "Aynı konuyu Canva'da hazır bir şablonla yeniden tasarla. PNG ve PDF olarak indir.",
            color: "#00c4cc",
          },
          {
            n: "03",
            t: "Gamma",
            d: "Aynı konuyu Gamma'ya prompt olarak ver, AI ile üret. 5 dakikada bitirmeyi hedefle.",
            color: "#a855f7",
          },
          {
            n: "04",
            t: "Karşılaştır",
            d: "Üç sonucu kıyasla. Hangisi en hızlıydı? Hangisi en güzel? Bir blog yazısı yaz.",
            color: "#00ff41",
          },
        ].map((task, i) => (
          <motion.div
            key={task.n}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="ofis-card rounded-2xl p-6"
            style={{ borderColor: `${task.color}30` }}
          >
            <div
              className="text-3xl font-mono font-bold mb-3"
              style={{ color: task.color }}
            >
              {task.n}
            </div>
            <div className="text-xl font-semibold text-white mb-2">{task.t}</div>
            <div className="text-sm text-gray-400 leading-relaxed">{task.d}</div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 23 — Resources
  () => (
    <SlideShell>
      <Eyebrow>Kaynaklar</Eyebrow>
      <H2 className="mb-12">Daha Fazla Öğrenmek İçin</H2>
      <div className="space-y-3">
        {[
          {
            cat: "PowerPoint",
            link: "support.microsoft.com/powerpoint",
            desc: "Resmi dokümantasyon",
            color: "#d24726",
          },
          {
            cat: "Canva",
            link: "canva.com/learn",
            desc: "Tasarım okulu — ücretsiz dersler",
            color: "#00c4cc",
          },
          {
            cat: "Gamma",
            link: "gamma.app/blog",
            desc: "AI sunum örnekleri ve prompt rehberi",
            color: "#a855f7",
          },
          {
            cat: "Tipografi",
            link: "fonts.google.com",
            desc: "Ücretsiz Google Fonts",
            color: "#00ff41",
          },
          {
            cat: "Görsel",
            link: "unsplash.com · pexels.com",
            desc: "Telifsiz stok fotoğraflar",
            color: "#00ff41",
          },
        ].map((r, i) => (
          <motion.div
            key={r.cat}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
            className="ofis-card rounded-xl p-5 flex items-center gap-5"
          >
            <div
              className="w-2 h-12 rounded-full"
              style={{ background: r.color }}
            />
            <div className="flex-1">
              <div className="text-base font-semibold text-white">{r.cat}</div>
              <div className="text-sm text-gray-400">{r.desc}</div>
            </div>
            <div className="font-mono text-xs" style={{ color: r.color }}>
              {r.link}
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 24 — Thanks / Closing
  () => (
    <SlideShell bgPattern={false}>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-20 h-20 rounded-full items-center justify-center mb-8"
          style={{
            background: "rgba(0,255,65,0.1)",
            border: "2px solid rgba(0,255,65,0.4)",
          }}
        >
          <Sparkles className="w-10 h-10 text-[#00ff41]" />
        </motion.div>
        <H1 className="ofis-shimmer">Teşekkürler</H1>
        <Sub className="mt-8 max-w-xl mx-auto">
          Sorularınız için sınıf saatinde — Çarşamba 09:55–12:30
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 inline-flex items-center gap-3 px-6 py-3 rounded-full ofis-card"
        >
          <PresentationIcon className="w-4 h-4 text-[#00ff41]" />
          <span className="text-sm text-gray-300">
            BVA 1108 · Bilgi Teknolojileri · 9. Hafta
          </span>
        </motion.div>
      </div>
    </SlideShell>
  ),
];

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
      {/* Top progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/5 z-50">
        <motion.div
          className="h-full"
          style={{
            background:
              "linear-gradient(90deg, #00ff41, #4dff80, #00ff41)",
            boxShadow: "0 0 16px rgba(0,255,65,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Top bar — title + counter + fullscreen */}
      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#00ff41]/70">
          BVA 1108 · 9. Hafta · Ofis Programları
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#00ff41]/50">
            <span className="text-[#00ff41]">{String(current + 1).padStart(2, "0")}</span>
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
            className="p-1.5 text-gray-500 hover:text-[#00ff41] transition-colors"
            aria-label="Tam ekran"
          >
            {isFs ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Slide content */}
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

      {/* Click navigation zones */}
      <button
        onClick={prev}
        disabled={current === 0}
        aria-label="Önceki slayt"
        className="absolute left-0 top-12 bottom-16 w-[15%] z-30 cursor-w-resize disabled:cursor-default opacity-0"
      />
      <button
        onClick={next}
        disabled={current === TOTAL - 1}
        aria-label="Sonraki slayt"
        className="absolute right-0 top-12 bottom-16 w-[15%] z-30 cursor-e-resize disabled:cursor-default opacity-0"
      />

      {/* Bottom navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-40 px-8 py-4 flex items-center justify-between border-t border-white/5 bg-black/60 backdrop-blur">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#00ff41] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Önceki
        </button>
        <div className="flex items-center gap-1.5">
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
                  ? "w-6 bg-[#00ff41]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(0,255,65,0.6)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#00ff41] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          Sonraki
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Keyboard hint (corner) */}
      <div className="absolute bottom-3 right-8 text-[9px] font-mono text-gray-700 z-50 hidden md:flex items-center gap-2">
        <Keyboard className="w-3 h-3" />
        <span>← → · F · Esc</span>
      </div>
    </div>
  );
}
