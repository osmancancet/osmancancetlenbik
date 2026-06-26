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
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Users,
  Scale,
  FileText,
  AlertTriangle,
  UserX,
  Fingerprint,
  Database,
  ClipboardCheck,
  Check,
  Network,
  Search,
  Code2,
  Calendar,
  MapPin,
  Mail,
  Clock,
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
        <div className="absolute inset-0 saa-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#14b8a6]"
    >
      <span className="w-8 h-px bg-[#14b8a6]" />
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
  accent = "#14b8a6",
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
      className="saa-card saa-card-hover rounded-xl p-6 transition-all"
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={{
          background: `${accent}18`,
          border: `1px solid ${accent}50`,
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
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 saa-pulse"
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
   TOPIC MOCKUPS
   ============================================================ */

/* Anonimleştirme öncesi/sonrası tablo */
function AnonymizationTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="saa-card rounded-xl p-5 overflow-x-auto"
    >
      <table className="saa-table">
        <thead>
          <tr>
            <th style={{ width: "22%" }}>Alan</th>
            <th>Ham veri (riskli)</th>
            <th>Yetersiz maskeleme</th>
            <th>Doğru yaklaşım</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="saa-row-head">Ad Soyad</td>
            <td>Ayşe Yıldız</td>
            <td>A. Y.</td>
            <td>Tamamen kaldır · rastgele kimlik (u_3192)</td>
          </tr>
          <tr>
            <td className="saa-row-head">Kullanıcı adı</td>
            <td>@ayse_yildiz_34</td>
            <td>@ayse_***</td>
            <td>Tutarlı hash (HMAC) ile takma kimlik</td>
          </tr>
          <tr>
            <td className="saa-row-head">Konum</td>
            <td>Kadıköy, 40.99, 29.03</td>
            <td>İstanbul</td>
            <td>İl düzeyinde genelleştir · koordinatı sil</td>
          </tr>
          <tr>
            <td className="saa-row-head">Zaman damgası</td>
            <td>2026-03-14 21:47:08</td>
            <td>2026-03-14 21:47</td>
            <td>Saat dilimine yuvarla (gün/hafta)</td>
          </tr>
          <tr>
            <td className="saa-row-head">Bağlantı listesi</td>
            <td>Tam komşu listesi</td>
            <td>İlk 3 komşu</td>
            <td>Kenarlara gürültü ekle · alt-örnekle</td>
          </tr>
        </tbody>
      </table>
    </motion.div>
  );
}

/* Yeniden tanımlama (re-identification) saldırısı — terminal mockup */
function ReidentTerminal() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="saa-window-chrome w-full"
    >
      <div className="saa-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-semibold flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0a0f0e", color: "#5eead4" }}
        >
          <Search className="w-3.5 h-3.5" />
          <span>reidentify.py · &quot;anonim&quot; ağ + yardımcı veri</span>
        </div>
      </div>
      <div className="saa-terminal">
        <div>
          <span className="saa-term-prompt">analist@lab</span>
          <span className="saa-term-dim">:~$</span>{" "}
          <span className="saa-term-cmd">python reidentify.py --graph anon_ag.gexf --aux linkedin_public.csv</span>
        </div>
        <div className="saa-term-dim">[*] Anonim ağ yükleniyor: 12.400 düğüm · 88.300 kenar (etiketler kaldırılmış)</div>
        <div className="saa-term-dim">[*] Yardımcı kaynak: herkese açık 9.100 profil (derece + komşuluk imzası)</div>
        <div className="mt-1 saa-term-warn">[+] Yapısal imza eşleştirmesi başlatıldı (degree + triangle profili)</div>
        <div className="saa-term-ok">[+] Yüksek-dereceli 50 düğümün 41&apos;i tek adayla eşleşti</div>
        <div className="saa-term-err">[!] u_3192  ←→  @ayse_yildiz_34   (güven: yüksek)</div>
        <div className="saa-term-err">[!] u_0087  ←→  @mehmet.k         (güven: yüksek)</div>
        <div className="saa-term-dim">[*] Sonuç: anonimleştirme yalnız etiketleri sildi; YAPI parmak izini bırakmadı.</div>
        <div className="mt-2">
          <span className="saa-term-prompt">analist@lab</span>
          <span className="saa-term-dim">:~$</span>{" "}
          <span className="saa-term-cmd">_</span>
          <span className="animate-pulse">█</span>
        </div>
      </div>
    </motion.div>
  );
}

/* Aydınlatma metni / rıza karşılaştırması */
function ConsentCompare() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="saa-card-warn rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <UserX className="w-6 h-6 text-[#f87171]" />
          <h3 className="text-xl font-semibold text-white">Sorunlu uygulama</h3>
        </div>
        <ul className="space-y-2.5 text-sm text-gray-300">
          <li className="flex gap-2">
            <ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />
            Açık API&apos;den izinsiz toplu profil çekme (scraping)
          </li>
          <li className="flex gap-2">
            <ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />
            &quot;Herkese açık demek serbest demek&quot; varsayımı
          </li>
          <li className="flex gap-2">
            <ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />
            Amaç dışı ikincil kullanım — veriyi başka projeye taşıma
          </li>
          <li className="flex gap-2">
            <ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />
            Ham, kimliklendirilmiş veriyi süresiz saklama
          </li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="saa-card-teal rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <ShieldCheck className="w-6 h-6 text-[#5eead4]" />
          <h3 className="text-xl font-semibold text-white">İlkeli uygulama</h3>
        </div>
        <ul className="space-y-2.5 text-sm text-gray-300">
          <li className="flex gap-2">
            <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
            Platform kullanım şartlarına ve API limitlerine uyma
          </li>
          <li className="flex gap-2">
            <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
            Amaç sınırlaması — yalnız tanımlı araştırma sorusu için
          </li>
          <li className="flex gap-2">
            <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
            Veri minimizasyonu — gerekenden fazlasını toplama
          </li>
          <li className="flex gap-2">
            <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
            Kimliksizleştir, sınırlı sakla, etik kurul onayı al
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

/* KVKK / GDPR ilke kartları */
function PrincipleGrid() {
  const items: Array<{ icon: LucideIcon; t: string; d: string; accent: string }> = [
    {
      icon: FileText,
      t: "Hukuka uygunluk & şeffaflık",
      d: "Verinin neden işlendiği açık; aydınlatma metni anlaşılır.",
      accent: "#14b8a6",
    },
    {
      icon: Search,
      t: "Amaçla sınırlılık",
      d: "Yalnız belirlenen amaç için; sonradan amaç kaydırma yasak.",
      accent: "#0d9488",
    },
    {
      icon: Database,
      t: "Veri minimizasyonu",
      d: "Araştırma için gerekli en az alan; fazlasını toplama.",
      accent: "#5eead4",
    },
    {
      icon: Clock,
      t: "Saklama süresi sınırı",
      d: "İş bitince ham veriyi sil; yalnız özet/anonim sakla.",
      accent: "#2dd4bf",
    },
    {
      icon: Lock,
      t: "Bütünlük & gizlilik",
      d: "Şifreli saklama, erişim kontrolü, ihlal bildirimi.",
      accent: "#0f766e",
    },
    {
      icon: Scale,
      t: "Hesap verebilirlik",
      d: "Uyumu belgeleyebilme; veri sahibinin haklarına yanıt.",
      accent: "#115e59",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((it, i) => (
        <motion.div
          key={it.t}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: i * 0.08 }}
          className="saa-card rounded-xl p-5"
        >
          <div
            className="w-11 h-11 rounded-lg flex items-center justify-center mb-3"
            style={{ background: `${it.accent}18`, border: `1px solid ${it.accent}55` }}
          >
            <it.icon className="w-5 h-5" style={{ color: it.accent }} />
          </div>
          <h3 className="text-sm font-semibold text-white mb-1">{it.t}</h3>
          <p className="text-xs text-gray-400 leading-relaxed">{it.d}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* k-anonimlik kod örneği */
function KAnonymityCode() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="saa-window-chrome w-full"
    >
      <div className="saa-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-semibold flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0a0f0e", color: "#5eead4" }}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>anonymize.py · Python 3.12 · pandas + networkx</span>
        </div>
      </div>
      <pre className="saa-code p-6 overflow-x-auto m-0">
        <code>
          <span className="saa-code-cmt"># 1) Doğrudan tanımlayıcıları kaldır</span>
          {"\n"}
          df = df.<span className="saa-code-fn">drop</span>(columns=[
          <span className="saa-code-str">&quot;ad_soyad&quot;</span>,{" "}
          <span className="saa-code-str">&quot;kullanici_adi&quot;</span>,{" "}
          <span className="saa-code-str">&quot;eposta&quot;</span>])
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 2) Yarı-tanımlayıcıları genelleştir (konum, yaş)</span>
          {"\n"}
          df[<span className="saa-code-str">&quot;sehir&quot;</span>] = df[
          <span className="saa-code-str">&quot;ilce&quot;</span>].
          <span className="saa-code-fn">map</span>(ilce_to_il)
          {"\n"}
          df[<span className="saa-code-str">&quot;yas_grubu&quot;</span>] = pd.
          <span className="saa-code-fn">cut</span>(df.yas, bins=[
          <span className="saa-code-num">0</span>,
          <span className="saa-code-num">18</span>,
          <span className="saa-code-num">30</span>,
          <span className="saa-code-num">50</span>,
          <span className="saa-code-num">99</span>])
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 3) k-anonimlik kontrolu: her grup en az k=5 kayit icermeli</span>
          {"\n"}
          q = [<span className="saa-code-str">&quot;sehir&quot;</span>,{" "}
          <span className="saa-code-str">&quot;yas_grubu&quot;</span>,{" "}
          <span className="saa-code-str">&quot;cinsiyet&quot;</span>]
          {"\n"}
          k = df.<span className="saa-code-fn">groupby</span>(q).
          <span className="saa-code-fn">size</span>().
          <span className="saa-code-fn">min</span>()
          {"\n"}
          <span className="saa-code-kw">assert</span> k &gt;={" "}
          <span className="saa-code-num">5</span>,{" "}
          <span className="saa-code-str">&quot;k-anonimlik saglanmadi: tekil kayit var&quot;</span>
        </code>
      </pre>
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
        <Eyebrow>BVA 2105 · 15. Hafta — Sosyal Ağ Analizi</Eyebrow>
        <H1 className="saa-shimmer">
          Ağ Etiği ve
          <br />
          Gizlilik Sorunları
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Bağlantı verisi kişiseldir. Bu hafta &quot;teknik olarak yapabilmek&quot;
          ile &quot;yapmaya hakkımız olması&quot; arasındaki çizgiyi çekiyoruz.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Eye}
            title="Mahremiyet"
            desc="Ağ verisi neden hassas; arkadaş listesi ne kadar şey ele verir."
            delay={0.3}
            accent="#14b8a6"
          />
          <FeatureCard
            icon={UserX}
            title="Yeniden tanımlama"
            desc="&quot;Anonim&quot; bir grafı yapısal imzadan geri çözmek."
            delay={0.45}
            accent="#0d9488"
          />
          <FeatureCard
            icon={Scale}
            title="Hukuk & etik"
            desc="KVKK / GDPR ilkeleri, rıza, etik kurul ve araştırma sınırları."
            delay={0.6}
            accent="#5eead4"
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Dönemin son teknik konusu — ardından proje teslimine giriyoruz.
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Geçen hafta → bu hafta köprüsü ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 14. haftadan 15. haftaya</Eyebrow>
      <H2>Dönem boyu ağları ölçtük, modelledik, yaydık; şimdi sorumluluğu</H2>
      <Sub className="mt-3 max-w-3xl">
        Merkezilik, topluluk tespiti, bilgi yayılımı ve etki maksimizasyonu — hepsi
        gerçek insanların bağlantı verisi üzerinde çalışır. Bu güç beraberinde
        gizlilik ve etik sorumluluğu getirir. Bugün onu konuşuyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5eead4]">
            <Network className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Öğrendiğimiz güç</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />Kim merkezde, kim köprü — etki haritası</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />Toplulukları ve gizli grupları ayırma</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />Bir mesajı en hızlı kim yayar — etki seçimi</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card-warn rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#f87171]">
            <ShieldAlert className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Beraberindeki risk</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Aynı yöntemle gözetim, profilleme, ayrımcılık</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />&quot;Anonim&quot; sandığımız verinin geri çözülmesi</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Kişinin haberi olmadan kararını etkileme</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. Bu dersin akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: mahremiyet → yeniden tanımlama → hukuk &amp; etik</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce ağ verisinin neden hassas olduğunu görüyoruz; sonra &quot;anonimleştirme&quot;nin
        neden çoğu zaman yetmediğini gösteriyoruz; en son KVKK/GDPR ilkeleri ve etik
        çerçeveye bağlıyoruz. Sonunda kısa bir etik denetim alıştırması.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Mahremiyet & Hassasiyet", items: ["Ağ verisi neden kişiseldir", "Çıkarımsal (inference) gizlilik", "Gözetim ve profilleme riski"], icon: Eye, accent: "#14b8a6" },
          { range: "02", title: "Anonimlik Yanılgısı", items: ["Etiket silmek yetmez", "Yapısal yeniden tanımlama", "k-anonimlik, gürültü, mahremiyet bütçesi"], icon: UserX, accent: "#0d9488" },
          { range: "03", title: "Hukuk & Etik", items: ["KVKK / GDPR ilkeleri", "Rıza, amaç sınırlaması", "Etik kurul & araştırma sınırları"], icon: Scale, accent: "#5eead4" },
        ].map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="saa-card rounded-xl p-6"
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

  /* ───── 4. Bölüm 1 — Mahremiyet ───── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Mahremiyet ve Ağ Verisi"
      subtitle="Bir kişiyi sildiğinde bile bağlantıları onu ele verir. Ağ verisi neden tekil bir gizlilik problemidir?"
      bgGradient="linear-gradient(135deg, #14b8a6, #0d9488)"
      shadow="0 30px 80px -10px rgba(20, 184, 166, 0.6)"
      icon={<Eye className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 5. Ağ verisi neden hassas? ───── */
  () => (
    <SlideShell>
      <Eyebrow>Neden bağlantı verisi farklı?</Eyebrow>
      <H2 className="mb-8">Tek bir satır değil — ilişkiler ele verir</H2>
      <div className="grid md:grid-cols-2 gap-5 mb-6">
        <FeatureCard
          icon={Users}
          title="İlişkisel veri ortaktır"
          desc="Sen verini paylaşmasan da, arkadaşlarının bağlantı listesi senin varlığını ve ilişkilerini açığa çıkarır. Rıza yalnız bireysel değildir."
          accent="#14b8a6"
          delay={0.1}
        />
        <FeatureCard
          icon={Fingerprint}
          title="Yapı bir parmak izidir"
          desc="Kimin kimi takip ettiği örüntüsü, ad-soyad silinse bile çoğu kişiyi tekil biçimde tanımlamaya yeter."
          accent="#0d9488"
          delay={0.25}
        />
        <FeatureCard
          icon={Search}
          title="Çıkarımsal gizlilik"
          desc="Açıkça yazmadığın şeyler (siyasi görüş, cinsel yönelim, sağlık) komşularından istatistiksel olarak tahmin edilebilir."
          accent="#5eead4"
          delay={0.4}
        />
        <FeatureCard
          icon={EyeOff}
          title="Gözetim & profilleme"
          desc="Merkezilik ve topluluk analizi, kişileri rızası dışında etiketleyip hedeflemek için de kullanılabilir."
          accent="#2dd4bf"
          delay={0.55}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="saa-card-teal rounded-xl p-5 text-center text-sm text-gray-300"
      >
        Temel ilke:{" "}
        <span className="text-[#5eead4] font-semibold">veri toplamadan önce</span> &quot;bu
        kişinin bunu paylaşmama hakkı var mı?&quot; sorusunu sor — &quot;teknik olarak
        erişilebilir mi?&quot; sorusunu değil.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 6. Çıkarımsal saldırı / homofili ───── */
  () => (
    <SlideShell>
      <Eyebrow>Çıkarımsal gizlilik · &quot;söylemediğin şey&quot;</Eyebrow>
      <H2 className="mb-2">Komşularından okunan özellikler</H2>
      <Sub className="max-w-3xl mb-6">
        Ağlarda homofili vardır: benzer kişiler bağlanır. Bu yüzden profilini gizli
        tutsan bile, bağlantılarının çoğunluğu bir özelliği taşıyorsa o özellik sana da
        yüksek olasılıkla atfedilir. Bu, &quot;gölge profil&quot; riskinin temelidir.
      </Sub>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: Users, t: "Komşu çoğunluğu", d: "Bağlantılarının %80&apos;i bir grup/görüş taşıyorsa, sınıflandırıcı seni de o etikete koyar." , accent: "#14b8a6" },
          { icon: Search, t: "Etiket yayılımı", d: "Birkaç etiketli düğümden başlayıp ağ boyunca yayan algoritmalar, hiç etiketlenmemişleri tahmin eder.", accent: "#0d9488" },
          { icon: ShieldAlert, t: "Riskli sonuç", d: "Sağlık, inanç, yönelim gibi hassas çıkarımlar — kişi hiç beyan etmemiş olsa bile.", accent: "#f87171" },
        ].map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className={i === 2 ? "saa-card-warn rounded-xl p-5" : "saa-card rounded-xl p-5"}
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center mb-3"
              style={{ background: `${c.accent}18`, border: `1px solid ${c.accent}55` }}
            >
              <c.icon className="w-5 h-5" style={{ color: c.accent }} />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">{c.t}</h3>
            <p className="text-xs text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: c.d }} />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 text-[11px] text-gray-500 font-mono text-center"
      >
        Homofili = benzerlik bağ kurar · ama aynı mekanizma, gizlenen özelliği de tahmin edilebilir kılar.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 7. Bölüm 2 — Anonimlik yanılgısı ───── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Anonimlik Yanılgısı"
      subtitle="İsimleri silmek anonimleştirmek değildir. Yapısal imza geride kalır ve yardımcı veriyle geri çözülebilir."
      bgGradient="linear-gradient(135deg, #0d9488, #134e4a)"
      shadow="0 30px 80px -10px rgba(13, 148, 136, 0.6)"
      icon={<UserX className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 8. Anonimleştirme tablosu ───── */
  () => (
    <SlideShell>
      <Eyebrow>Anonimleştirme · alan alan</Eyebrow>
      <H2 className="mb-2">Maskeleme yetmez, doğru genelleştir</H2>
      <Sub className="max-w-3xl mb-6">
        Çoğu sızıntı, &quot;yarı-tanımlayıcı&quot; alanların (konum, zaman, ince
        ayrıntı) yetersiz maskelenmesinden gelir. Sağ sütun pratikte hedeflediğimiz
        yaklaşımdır.
      </Sub>
      <AnonymizationTable />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-[11px] text-gray-500 text-center"
      >
        Doğrudan tanımlayıcı (ad) ≠ yarı-tanımlayıcı (konum+zaman). İkincisi birleşince yine kişiyi gösterir.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 9. Yeniden tanımlama saldırısı (terminal) ───── */
  () => (
    <SlideShell>
      <Eyebrow>Yapısal yeniden tanımlama · canlı örnek</Eyebrow>
      <H2 className="mb-2">&quot;Anonim&quot; ağ neden geri çözülür?</H2>
      <Sub className="max-w-3xl mb-6">
        Etiketler silinse bile her düğümün derece ve komşuluk örüntüsü kalır. Herkese
        açık bir yardımcı kaynakla eşleştirilince yüksek-dereceli kişiler tek tek tanınır.
        Bu, ağ verisinde klasik bir saldırı senaryosudur.
      </Sub>
      <ReidentTerminal />
    </SlideShell>
  ),

  /* ───── 10. Koruma teknikleri ───── */
  () => (
    <SlideShell>
      <Eyebrow>Gerçek koruma · seçenekler</Eyebrow>
      <H2 className="mb-2">Etiket silmenin ötesinde üç yaklaşım</H2>
      <Sub className="max-w-3xl mb-8">
        Hiçbiri sihirli değildir; her biri fayda-mahremiyet dengesinde bir noktada
        durur. Doğru seçim, verinin hassasiyetine ve yayım biçimine bağlıdır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Users, state: "k-anonimlik", color: "#14b8a6", what: "Her kayıt en az k-1 başkasıyla ayırt edilemez olacak şekilde genelleştir.", mean: "Basit ve denetlenebilir; ama yapısal saldırıya tek başına dayanmaz." },
          { icon: Network, state: "graf perturbasyonu", color: "#0d9488", what: "Kenar ekle/sil, alt-örnekle — yapısal imzayı bulanıklaştır.", mean: "Yeniden tanımlamayı zorlaştırır; ölçüm doğruluğunu bir miktar bozar." },
          { icon: Lock, state: "diferansiyel gizlilik", color: "#5eead4", what: "Sonuçlara kontrollü gürültü; tek bir kişinin katkısı matematiksel olarak gizlenir.", mean: "En güçlü garanti; mahremiyet bütçesi (ε) ile fayda arasında ödünleşme." },
        ].map((p, i) => (
          <motion.div
            key={p.state}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="saa-card rounded-xl p-6"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ background: `${p.color}18`, border: `1px solid ${p.color}55` }}
            >
              <p.icon className="w-6 h-6" style={{ color: p.color }} />
            </div>
            <div className="font-mono text-base font-bold mb-2" style={{ color: p.color }}>{p.state}</div>
            <p className="text-sm text-gray-300 mb-3">{p.what}</p>
            <p className="text-xs text-gray-500 border-t border-white/5 pt-3">{p.mean}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 11. k-anonimlik kod örneği ───── */
  () => (
    <SlideShell>
      <Eyebrow>Python · pratik anonimleştirme</Eyebrow>
      <H2 className="mb-6">Üç adımda k-anonimlik kontrolü</H2>
      <KAnonymityCode />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-xs text-gray-500 text-center"
      >
        Bir grup k&apos;dan küçükse o satırlar tekildir — daha kaba genelleştirme ya da o kayıtları baskılama (suppression) gerekir.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 12. Bölüm 3 — Hukuk & Etik ───── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Hukuk ve Etik Çerçeve"
      subtitle="KVKK ve GDPR ilkeleri, rıza, amaç sınırlaması ve etik kurul. Teknik kararı kurala bağlayan kısım."
      bgGradient="linear-gradient(135deg, #0d9488, #115e59)"
      shadow="0 30px 80px -10px rgba(13, 148, 136, 0.6)"
      icon={<Scale className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 13. KVKK / GDPR ilkeleri ───── */
  () => (
    <SlideShell>
      <Eyebrow>KVKK &amp; GDPR · temel ilkeler</Eyebrow>
      <H2 className="mb-2">Kişisel veriyi işlemenin altı kuralı</H2>
      <Sub className="max-w-3xl mb-8">
        Türkiye&apos;de KVKK (6698 sayılı kanun), Avrupa&apos;da GDPR aynı çekirdek
        ilkeleri paylaşır. Sosyal ağ verisi çoğu zaman kişisel veridir; bu ilkeler
        araştırmada da bağlayıcıdır.
      </Sub>
      <PrincipleGrid />
    </SlideShell>
  ),

  /* ───── 14. Rıza & sorumlu toplama ───── */
  () => (
    <SlideShell>
      <Eyebrow>Rıza · sorumlu veri toplama</Eyebrow>
      <H2 className="mb-2">&quot;Herkese açık&quot; serbest demek değildir</H2>
      <Sub className="max-w-3xl mb-6">
        Verinin teknik olarak erişilebilir olması, onu istediğin gibi toplayıp
        saklayabileceğin anlamına gelmez. İki uçtaki yaklaşımı yan yana koyalım.
      </Sub>
      <ConsentCompare />
    </SlideShell>
  ),

  /* ───── 15. Etik denetim — uygulamalı alıştırma ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · etik denetim alıştırması</Eyebrow>
      <H2>Kendi projeni bir kontrol listesinden geçir</H2>
      <Sub className="mt-3 max-w-3xl">
        Dönem projende kullandığın veri kümesini aşağıdaki dört adımda denetle.
        Gelecek derse her madde için kısa bir not (1-2 cümle) hazırlamış gelmen
        bekleniyor.
      </Sub>
      <div className="space-y-3 mt-8">
        {([
          { t: "Veri kaynağını ve iznini yaz", d: "Veri nereden geldi? Platform şartlarına ve API limitine uygun mu, scraping var mı?", icon: FileText },
          { t: "Tanımlayıcıları sınıflandır", d: "Doğrudan ve yarı-tanımlayıcı alanları işaretle; hangileri kaldırılacak/genelleştirilecek karar ver.", icon: Database },
          { t: "Yeniden tanımlama riskini test et", d: "Yüksek-dereceli düğümler dışarıdan tanınabilir mi? k-anonimlik en az 5 mi?", icon: Search },
          { t: "Saklama ve amaç notu", d: "Ham veri ne kadar tutulacak, ne zaman silinecek? Amaç dışı kullanım var mı?", icon: ClipboardCheck },
        ] as Array<{ t: string; d: string; icon: LucideIcon }>).map((it, i) => (
          <motion.div
            key={it.t}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="saa-card saa-card-hover rounded-xl p-4 flex items-center gap-4"
          >
            <div className="saa-tick w-9 h-9 rounded-md flex items-center justify-center shrink-0">
              <Check className="w-5 h-5" strokeWidth={3} />
            </div>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-[#14b8a6]/15 border border-[#14b8a6]/35">
              <it.icon className="w-4 h-4 text-[#5eead4]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white">{it.t}</div>
              <div className="text-xs text-gray-400 mt-0.5">{it.d}</div>
            </div>
            <div className="text-[10px] font-mono text-gray-600">
              #{String(i + 1).padStart(2, "0")}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 saa-card-warn rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <AlertTriangle className="w-4 h-4 text-[#f87171] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Sınır:</span> Gerçek kişilerin verisiyle çalışırken
          kişiyi rızası dışında hedeflemek, hassas çıkarım yapıp paylaşmak veya izinsiz
          toplu veri çekmek KVKK kapsamında hukuki sorumluluk doğurabilir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 16. Sıradaki hafta + kapanış ───── */
  () => (
    <SlideShell>
      <div className="text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-3xl items-center justify-center mb-8 saa-pulse"
          style={{
            background: "linear-gradient(135deg, #14b8a6, #0d9488)",
            boxShadow: "0 20px 60px -10px rgba(20, 184, 166, 0.6)",
          }}
        >
          <ShieldCheck className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>15. hafta tamamlandı · sıradaki: Proje sunumları</Eyebrow>
        <H1 className="saa-shimmer-teal">İlkeli Analiz</H1>
        <Sub className="mt-6">
          Teknik beceriyi öğrendik; bu hafta onu{" "}
          <span className="text-[#5eead4]">sorumlulukla</span> kullanmayı ekledik.
          Sıradaki derste projelerinizi bu etik kontrol listesiyle birlikte sunacaksınız.
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left"
        >
          <div className="saa-card rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#14b8a6]/15 border border-[#14b8a6]/35 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-[#5eead4]" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">
                Sıradaki Ders
              </div>
              <div className="text-sm font-semibold text-white">
                Proje sunumları
              </div>
            </div>
          </div>
          <div className="saa-card rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#14b8a6]/15 border border-[#14b8a6]/35 flex items-center justify-center shrink-0">
              <ClipboardCheck className="w-5 h-5 text-[#5eead4]" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">
                Teslim
              </div>
              <div className="text-sm font-semibold text-white">
                Etik denetim notu
              </div>
            </div>
          </div>
          <div className="saa-card rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#14b8a6]/15 border border-[#14b8a6]/35 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-[#5eead4]" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">
                Ofis Saati
              </div>
              <div className="text-sm font-semibold text-white">
                Salı · 14:00 – 16:00
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Shield className="w-3.5 h-3.5" />
          <span className="inline-flex items-center gap-2">
            BVA 2105 · Sosyal Ağ Analizi · Önce gizlilik, sonra analiz
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 inline-flex items-center gap-4 text-[10px] font-mono text-gray-600"
        >
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3 h-3" /> MYO · Derslik 7
          </span>
          <span className="inline-flex items-center gap-1">
            <Unlock className="w-3 h-3" /> İzinsiz toplama yok
          </span>
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
            background: "linear-gradient(90deg, #14b8a6, #5eead4, #14b8a6)",
            boxShadow: "0 0 16px rgba(20,184,166,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#14b8a6]/70">
          BVA 2105 · 15. Hafta · Ağ Etiği &amp; Gizlilik
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#14b8a6]/50">
            <span className="text-[#14b8a6]">
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
            className="p-1.5 text-gray-500 hover:text-[#14b8a6] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#14b8a6] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#14b8a6]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(20,184,166,0.6)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#14b8a6] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
