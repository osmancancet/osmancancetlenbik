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
  Database,
  FileSpreadsheet,
  Globe,
  Cloud,
  Link2,
  Search,
  Filter,
  Brush,
  Wand2,
  Layers,
  Table2,
  Code2,
  Terminal,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ScrollText,
  Boxes,
  Shuffle,
  Ruler,
  CalendarDays,
  ClipboardList,
  Sparkles,
  Target,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  GraduationCap,
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
        <div className="absolute inset-0 vg-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#ef4444]"
    >
      <span className="w-8 h-px bg-[#ef4444]" />
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
  accent = "#ef4444",
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
      className="vg-card vg-card-hover rounded-xl p-6 transition-all"
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

function WindowChrome({
  title,
  children,
  badge,
}: {
  title: string;
  children: ReactNode;
  badge?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="vg-window-chrome w-full"
    >
      <div className="vg-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-semibold flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d0d0d", color: "#fca5a5" }}
        >
          <span className="w-5 h-5 rounded-sm vg-tool-tile flex items-center justify-center text-[11px]">
            {badge ?? "V"}
          </span>
          <span>{title}</span>
        </div>
      </div>
      <div className="p-4 bg-[#0a0a0a]">{children}</div>
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
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 vg-pulse"
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
   KONUYA ÖZGÜ MOCKUP'LAR
   ============================================================ */

/* Kirli ham veri tablosu — temizleme öncesi */
function DirtyTableMock() {
  return (
    <WindowChrome title="satislar_ham.csv — düzenlenmemiş" badge="C">
      <table className="vg-sheet">
        <thead>
          <tr>
            <th>id</th>
            <th>tarih</th>
            <th>sehir</th>
            <th>tutar</th>
            <th>kategori</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td className="vg-cell-dirty">2025/01/03</td>
            <td>İzmir</td>
            <td>1.250,00</td>
            <td>Elektronik</td>
          </tr>
          <tr>
            <td>2</td>
            <td className="vg-cell-dirty">03-01-2025</td>
            <td className="vg-cell-dirty">izmir</td>
            <td>980</td>
            <td>elektronik</td>
          </tr>
          <tr>
            <td>3</td>
            <td>2025-01-04</td>
            <td>Ankara</td>
            <td className="vg-cell-null">NaN</td>
            <td>Giyim</td>
          </tr>
          <tr>
            <td className="vg-cell-dirty">3</td>
            <td>2025-01-04</td>
            <td>Ankara</td>
            <td className="vg-cell-dirty">12500</td>
            <td>Giyim</td>
          </tr>
          <tr>
            <td>5</td>
            <td>2025-01-05</td>
            <td className="vg-cell-dirty">  İstanbul </td>
            <td>2.100,50</td>
            <td className="vg-cell-null">—</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-gray-400">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm" style={{ background: "rgba(239,68,68,0.4)" }} />
          Tutarsız format / aykırı değer / yinelenen kayıt
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm" style={{ background: "rgba(148,163,184,0.4)" }} />
          Eksik değer (NaN, boş, —)
        </div>
      </div>
    </WindowChrome>
  );
}

/* Temizlenmiş veri tablosu — sonra */
function CleanTableMock() {
  return (
    <WindowChrome title="satislar_temiz.csv — hazır" badge="C">
      <table className="vg-sheet">
        <thead>
          <tr>
            <th>id</th>
            <th>tarih</th>
            <th>sehir</th>
            <th>tutar_try</th>
            <th>kategori</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td className="vg-cell-clean">2025-01-03</td>
            <td className="vg-cell-clean">İzmir</td>
            <td>1250.00</td>
            <td className="vg-cell-clean">Elektronik</td>
          </tr>
          <tr>
            <td>2</td>
            <td className="vg-cell-clean">2025-01-03</td>
            <td className="vg-cell-clean">İzmir</td>
            <td>980.00</td>
            <td className="vg-cell-clean">Elektronik</td>
          </tr>
          <tr>
            <td>3</td>
            <td>2025-01-04</td>
            <td>Ankara</td>
            <td className="vg-cell-clean">1015.00</td>
            <td>Giyim</td>
          </tr>
          <tr>
            <td>5</td>
            <td>2025-01-05</td>
            <td className="vg-cell-clean">İstanbul</td>
            <td>2100.50</td>
            <td className="vg-cell-clean">Diğer</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-3 text-[11px] text-gray-400 flex items-start gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
        <span>
          Tek tarih formatı (ISO 8601) · ondalık nokta · şehir adları normalize · yinelenen id 3
          silindi · eksik tutar medyanla, eksik kategori &quot;Diğer&quot; ile dolduruldu.
        </span>
      </div>
    </WindowChrome>
  );
}

/* Terminal — basit veri çekme komutları */
function FetchTerminal() {
  return (
    <WindowChrome title="bash — veri erişimi" badge="$">
      <div className="vg-code" style={{ border: "none", boxShadow: "none", padding: 0 }}>
        <div><span className="cm"># 1. Açık veri portalından CSV indir</span></div>
        <div>
          <span className="op">$</span> curl <span className="op">-O</span>{" "}
          <span className="str">https://data.ibb.gov.tr/.../metro_yolcu.csv</span>
        </div>
        <div className="mt-3"><span className="cm"># 2. Web API&apos;den JSON çek (sayfalı)</span></div>
        <div>
          <span className="op">$</span> curl <span className="str">&quot;https://api.ornek.com/v1/satis?page=1&amp;limit=100&quot;</span>{" "}
          <span className="op">\</span>
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;<span className="op">-H</span>{" "}
          <span className="str">&quot;Authorization: Bearer $API_TOKEN&quot;</span>{" "}
          <span className="op">&gt;</span> satis.json
        </div>
        <div className="mt-3"><span className="cm"># 3. Veritabanından sorguyla CSV&apos;ye aktar</span></div>
        <div>
          <span className="op">$</span> psql <span className="op">-d</span> magaza{" "}
          <span className="op">-c</span>{" "}
          <span className="str">&quot;\copy (SELECT * FROM satis) TO &apos;s.csv&apos; CSV HEADER&quot;</span>
        </div>
      </div>
    </WindowChrome>
  );
}

/* Python pandas temizleme kod bloğu */
function PandasCleanBlock() {
  return (
    <div className="vg-code">
      <div><span className="cm"># pandas ile temel temizleme akışı</span></div>
      <div><span className="kw">import</span> pandas <span className="kw">as</span> pd</div>
      <div className="mt-2">df <span className="op">=</span> pd.<span className="fn">read_csv</span>(<span className="str">&quot;satislar_ham.csv&quot;</span>)</div>
      <div className="mt-2"><span className="cm"># yinelenenleri at</span></div>
      <div>df <span className="op">=</span> df.<span className="fn">drop_duplicates</span>(subset<span className="op">=</span><span className="str">&quot;id&quot;</span>)</div>
      <div className="mt-2"><span className="cm"># tarihi tek tipe çevir</span></div>
      <div>df[<span className="str">&quot;tarih&quot;</span>] <span className="op">=</span> pd.<span className="fn">to_datetime</span>(df[<span className="str">&quot;tarih&quot;</span>])</div>
      <div className="mt-2"><span className="cm"># metni normalize et</span></div>
      <div>df[<span className="str">&quot;sehir&quot;</span>] <span className="op">=</span> df[<span className="str">&quot;sehir&quot;</span>].<span className="fn">str</span>.<span className="fn">strip</span>().<span className="fn">str</span>.<span className="fn">title</span>()</div>
      <div className="mt-2"><span className="cm"># eksik tutarı medyanla doldur</span></div>
      <div>df[<span className="str">&quot;tutar&quot;</span>] <span className="op">=</span> df[<span className="str">&quot;tutar&quot;</span>].<span className="fn">fillna</span>(df[<span className="str">&quot;tutar&quot;</span>].<span className="fn">median</span>())</div>
      <div className="mt-2">df.<span className="fn">to_csv</span>(<span className="str">&quot;satislar_temiz.csv&quot;</span>, index<span className="op">=</span><span className="kw">False</span>)</div>
    </div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ───── 1. KAPAK ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2107 · 5. Hafta</Eyebrow>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.04]">
          <span className="vg-shimmer">Veriyi Bulmak, Erişmek</span>
          <br />
          <span className="text-white/90">Temizlemek &amp; Hazırlamak</span>
        </h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Her grafik bir veri kaynağıyla başlar. Bu hafta ham veriyi bulup erişiyor, kirini
          temizliyor ve görselleştirmeye hazır hale getiriyoruz.
        </Sub>
        <div className="mt-12 grid grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { name: "Bul", desc: "Kaynağı keşfet", icon: Search },
            { name: "Eriş", desc: "İndir · API · DB", icon: Database },
            { name: "Temizle", desc: "Hata · eksik · tekrar", icon: Brush },
            { name: "Hazırla", desc: "Biçimle · birleştir", icon: Wand2 },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="vg-card rounded-xl p-4"
            >
              <div className="w-10 h-10 mx-auto mb-2 rounded-md vg-tool-tile flex items-center justify-center">
                <t.icon className="w-5 h-5" />
              </div>
              <div className="text-white font-semibold text-sm">{t.name}</div>
              <div className="text-[11px] text-gray-400 mt-1">{t.desc}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-xs font-mono text-gray-500">
          Manisa CBÜ MYO · Bilgisayar Programcılığı · 2025-2026 Bahar
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. KÖPRÜ — GEÇEN HAFTADAN BU HAFTAYA ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · araçtan veriye</Eyebrow>
      <H2>Aracı öğrendik; şimdi onu besleyecek veri</H2>
      <Sub className="mt-3 max-w-3xl">
        Önceki haftalarda Tableau ve Power BI arayüzünü kurduk. Ama hiçbir araç kötü veriyi
        düzeltmez: &quot;garbage in, garbage out&quot;. Bu hafta her görselleştirme projesinin
        görünmeyen ama en uzun süren adımına giriyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fca5a5]">
            <Table2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Şu ana kadar</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />Grafik türleri ve tasarım ilkeleri.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />Tableau / Power BI arayüzü.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />Hazır, temiz örnek veri setleri.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fcd34d]">
            <Wand2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />Gerçek dünyada veriyi sıfırdan bulmak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />Dosya, API ve veritabanından erişim.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />Kirli veriyi temizleyip hazırlamak.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. SÜREÇ HARİTASI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Veriden grafiğe giden boru hattı</H2>
      <Sub className="mt-3 max-w-3xl">
        Görselleştirme bir buzdağıdır: görünen kısım grafik, su altındaki büyük kütle veri
        hazırlığıdır. Pratikte zamanın çoğu bu üç adıma gider.
      </Sub>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { range: "01", title: "Bulma & Erişim", items: ["Kaynak türleri", "Açık veri portalları", "Dosya · API · veritabanı"], icon: Search, accent: "#ef4444" },
          { range: "02", title: "Temizleme", items: ["Eksik & aykırı değerler", "Yinelenen kayıtlar", "Tutarsız format"], icon: Brush, accent: "#f59e0b" },
          { range: "03", title: "Hazırlama", items: ["Tipler & biçimlendirme", "Birleştirme (join)", "Tidy / uzun-geniş"], icon: Wand2, accent: "#fbbf24" },
        ].map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="vg-card rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${g.accent}18`, border: `1px solid ${g.accent}55` }}
              >
                <g.icon className="w-5 h-5" style={{ color: g.accent }} />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: g.accent }}>Adım {g.range}</div>
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
      <p className="mt-6 text-xs text-gray-500 text-center font-mono">
        Sektörde sıkça söylenir: veri hazırlığı çoğu projenin en uzun adımıdır, görselleştirme en kısası.
      </p>
    </SlideShell>
  ),

  /* ───── 4. BÖLÜM 1 — BULMA & ERİŞİM ───── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Veriyi Bulmak &amp; Erişmek"
      subtitle="İyi bir görselleştirme projesi doğru soruyla başlar; doğru soru da onu yanıtlayacak veriyi aramaktan geçer."
      bgGradient="linear-gradient(135deg, #ef4444, #b91c1c)"
      shadow="0 25px 60px -15px rgba(239, 68, 68, 0.6)"
      icon={<Search className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 5. KAYNAK TÜRLERİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Veri kaynağı türleri</Eyebrow>
      <H2>Veri nereden gelir?</H2>
      <Sub className="mt-3 max-w-3xl">
        Bir projede veri tek bir yerden gelmek zorunda değil. Erişim biçimi kaynağın türüne göre değişir.
      </Sub>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={FileSpreadsheet}
          title="Dosyalar"
          desc="CSV, Excel, JSON, Parquet. En yaygın ve en taşınabilir biçim; doğrudan indirilir."
          delay={0.05}
        />
        <FeatureCard
          icon={Database}
          title="Veritabanları"
          desc="PostgreSQL, MySQL, SQL Server. SQL sorgusuyla yalnız ihtiyacın olan satırı çekersin."
          delay={0.1}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Link2}
          title="Web API"
          desc="REST / JSON uç noktaları. Anahtar (token) ve çoğu zaman sayfalama (pagination) gerekir."
          delay={0.15}
        />
        <FeatureCard
          icon={Globe}
          title="Açık veri portalları"
          desc="data.gov.tr, İBB Açık Veri, Eurostat, Dünya Bankası, Kaggle. Çoğu ücretsiz ve lisanslı."
          delay={0.2}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={ScrollText}
          title="Web kazıma"
          desc="HTML tablolarından veri çıkarma. Son çare; site şartlarına ve hukuka dikkat."
          delay={0.25}
        />
        <FeatureCard
          icon={Cloud}
          title="Bulut / akış"
          desc="S3, BigQuery, Google Sheets, sensör akışları. Büyük ve sürekli güncellenen veri için."
          delay={0.3}
          accent="#f59e0b"
        />
      </div>
    </SlideShell>
  ),

  /* ───── 6. AÇIK VERİ PORTALLARI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Nereden başlamalı?</Eyebrow>
      <H2>Güvenilir açık veri kaynakları</H2>
      <Sub className="mt-3 max-w-3xl">
        Projende kullanacağın veriyi sıfırdan toplamak zorunda değilsin. Aşağıdaki kaynaklar
        kamuya açık, çoğu lisanslı ve doğrudan indirilebilir.
      </Sub>
      <div className="mt-8 vg-card rounded-xl p-4">
        <table className="vg-table">
          <thead>
            <tr>
              <th>Kaynak</th>
              <th>İçerik</th>
              <th>Biçim</th>
              <th>Tipik kullanım</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-white">data.gov.tr / İBB Açık Veri</td>
              <td>Resmî Türkiye / şehir verileri</td>
              <td><span className="vg-pill vg-pill-good">CSV · API</span></td>
              <td>Ulaşım, nüfus, bütçe panoları</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">TÜİK</td>
              <td>Türkiye istatistikleri</td>
              <td><span className="vg-pill vg-pill-mid">Excel</span></td>
              <td>Ekonomi, demografi raporları</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Dünya Bankası · Eurostat</td>
              <td>Uluslararası göstergeler</td>
              <td><span className="vg-pill vg-pill-good">CSV · API</span></td>
              <td>Ülke karşılaştırmaları</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Kaggle Datasets</td>
              <td>Topluluk veri setleri</td>
              <td><span className="vg-pill vg-pill-good">CSV</span></td>
              <td>Pratik, ödev, prototip</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Our World in Data</td>
              <td>Küresel konular (sağlık, iklim)</td>
              <td><span className="vg-pill vg-pill-good">CSV</span></td>
              <td>Zaman serisi hikâyeleri</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-xs text-gray-500 text-center font-mono">
        Her zaman lisansı kontrol et: kullanım, atıf ve yeniden dağıtım şartları kaynağa göre değişir.
      </div>
    </SlideShell>
  ),

  /* ───── 7. ERİŞİM YÖNTEMLERİ — TERMİNAL ───── */
  () => (
    <SlideShell>
      <Eyebrow>Erişim · pratik</Eyebrow>
      <H2 className="mb-2">Üç tipik erişim yolu</H2>
      <Sub className="max-w-3xl mb-6">
        Aynı veriye dosya indirme, API çağrısı veya doğrudan veritabanı sorgusuyla ulaşabilirsin.
        Hangi yolu seçeceğin kaynağa ve güncelleme sıklığına bağlı.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <FetchTerminal />
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="vg-card rounded-xl p-4"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-white mb-1">
              <FileSpreadsheet className="w-4 h-4 text-[#ef4444]" /> İndir (statik)
            </div>
            <p className="text-xs text-gray-400 leading-snug">Tek seferlik, az değişen veri. En basiti; ama elle güncelleme gerekir.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="vg-card rounded-xl p-4"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-white mb-1">
              <Link2 className="w-4 h-4 text-[#f59e0b]" /> API (canlı)
            </div>
            <p className="text-xs text-gray-400 leading-snug">Sık güncellenen veri. Token, hız limiti ve sayfalamayı yönetmen gerekir.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="vg-card rounded-xl p-4"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-white mb-1">
              <Database className="w-4 h-4 text-[#fbbf24]" /> Veritabanı (sorgu)
            </div>
            <p className="text-xs text-gray-400 leading-snug">Büyük veri. SQL ile yalnız gereken sütun/satır; araç doğrudan bağlanabilir.</p>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 8. CSV ANATOMİSİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Dosya formatları · CSV</Eyebrow>
      <H2 className="mb-2">CSV neden hâlâ kral?</H2>
      <Sub className="max-w-3xl mb-6">
        CSV düz metindir: her satır bir kayıt, sütunlar bir ayraçla (genelde virgül) bölünür.
        Basit ama tuzaklıdır — ayraç, kodlama ve metin içi virgül en sık sorunlardır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="vg-code">
          <div><span className="cm"># satislar.csv — ham metin</span></div>
          <div>id,tarih,sehir,tutar</div>
          <div><span className="num">1</span>,<span className="str">2025-01-03</span>,<span className="str">İzmir</span>,<span className="num">1250.00</span></div>
          <div><span className="num">2</span>,<span className="str">2025-01-03</span>,<span className="str">İzmir</span>,<span className="num">980.00</span></div>
          <div><span className="num">3</span>,<span className="str">2025-01-04</span>,<span className="str">Ankara</span>,<span className="num">1015.00</span></div>
        </div>
        <div className="space-y-3">
          {[
            { icon: AlertTriangle, t: "Ayraç (delimiter)", d: "Türkçe Excel genelde noktalı virgül (;) kullanır. Yanlış ayraç tek sütun olarak okunur.", accent: "#f59e0b" },
            { icon: AlertTriangle, t: "Karakter kodlaması", d: "UTF-8 kullan. Yanlış kodlama Türkçe harfleri (ç, ş, ı) bozar.", accent: "#ef4444" },
            { icon: AlertTriangle, t: "Metin içi ayraç", d: "Bir hücrede virgül varsa o alan çift tırnak içine alınmalı.", accent: "#fbbf24" },
          ].map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="vg-card rounded-xl p-4 flex items-start gap-3"
            >
              <it.icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: it.accent }} />
              <div>
                <div className="text-sm font-semibold text-white">{it.t}</div>
                <p className="text-xs text-gray-400 leading-snug mt-0.5">{it.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 9. BÖLÜM 2 — TEMİZLEME ───── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Veriyi Temizlemek"
      subtitle="Gerçek veri nadiren temiz gelir: eksik hücreler, aykırı değerler, yinelenen kayıtlar ve tutarsız biçimlerle dolu. Temizlik, güvenilir grafiğin önkoşuludur."
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 25px 60px -15px rgba(245, 158, 11, 0.6)"
      icon={<Brush className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 10. KİRLİ VERİNİN BELİRTİLERİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sorun türleri</Eyebrow>
      <H2>Kirli verinin altı yüzü</H2>
      <Sub className="mt-3 max-w-3xl">
        Temizliğe başlamadan önce neyi aradığını bilmelisin. En sık karşılaşılan altı sorun:
      </Sub>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={XCircle}
          title="Eksik değerler"
          desc="Boş hücre, NaN, NULL, 0 veya -999 gibi yer tutucular. Önce neden eksik olduğunu sor."
          delay={0.05}
        />
        <FeatureCard
          icon={Shuffle}
          title="Yinelenen kayıtlar"
          desc="Aynı satır birden çok kez. Toplamları ve ortalamaları sessizce şişirir."
          delay={0.1}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Ruler}
          title="Aykırı değerler"
          desc="12.500 yerine 1.250 girilmiş olabilir. Gerçek mi, hata mı? Bağlam belirler."
          delay={0.15}
        />
        <FeatureCard
          icon={CalendarDays}
          title="Tutarsız format"
          desc="2025/01/03 · 03-01-2025 · 3 Oca 2025. Aynı tarih, üç farklı yazım."
          delay={0.2}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Layers}
          title="Karışık tipler"
          desc="Sayı sütununda &quot;1.250 TL&quot; gibi metin. Hesaplama çöker."
          delay={0.25}
        />
        <FeatureCard
          icon={Boxes}
          title="Kategori dağınıklığı"
          desc="izmir · İzmir · IZMIR · Izmır — aynı şehir, dört ayrı grup sayılır."
          delay={0.3}
          accent="#f59e0b"
        />
      </div>
    </SlideShell>
  ),

  /* ───── 11. ÖNCE / SONRA TABLO ───── */
  () => (
    <SlideShell>
      <Eyebrow>Önce → sonra</Eyebrow>
      <H2 className="mb-2">Aynı tablo, temizlenmeden ve temizlendikten sonra</H2>
      <Sub className="max-w-3xl mb-6">
        Soldaki ham tabloda işaretli her hücre bir sorun. Sağda hepsi tek tek düzeltildi —
        artık grafiğe güvenle bağlanabilir.
      </Sub>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <DirtyTableMock />
        <CleanTableMock />
      </div>
    </SlideShell>
  ),

  /* ───── 12. EKSİK DEĞER STRATEJİLERİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Eksik değerler · karar</Eyebrow>
      <H2>Eksik veriyle ne yapılır?</H2>
      <Sub className="mt-3 max-w-3xl">
        Tek doğru cevap yok; seçim verinin türüne ve eksik oranına bağlı. Yaptığın seçimi her zaman not et.
      </Sub>
      <div className="mt-8 vg-card rounded-xl p-4">
        <table className="vg-table">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Strateji</th>
              <th style={{ width: "34%" }}>Ne yapar?</th>
              <th>Ne zaman uygun?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-white">Satırı sil</td>
              <td>Eksik içeren kaydı tamamen çıkarır.</td>
              <td>Eksik oranı düşükse ve kayıp önemsizse.</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Ortalama / medyan</td>
              <td>Sayısal boşluğu merkezî değerle doldurur.</td>
              <td>Sayısal sütun; aykırı değer varsa medyan tercih.</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Sabit / kategori</td>
              <td>&quot;Bilinmiyor&quot; ya da &quot;Diğer&quot; ile doldurur.</td>
              <td>Kategorik sütun; eksiklik kendi başına bilgiyse.</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">İleri/geri taşı</td>
              <td>Komşu satırın değerini kopyalar (ffill/bfill).</td>
              <td>Zaman serisi; ardışık ölçümler benzerse.</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Olduğu gibi bırak</td>
              <td>Eksiği grafikte ayrı gösterir, doldurmaz.</td>
              <td>Doldurmanın yanıltıcı olacağı durumlar.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-xs text-gray-500 text-center font-mono">
        Altın kural: veriyi uydurma. Doldurduğun her değer bir varsayımdır; onu görünür kıl.
      </div>
    </SlideShell>
  ),

  /* ───── 13. PANDAS İLE TEMİZLEME ───── */
  () => (
    <SlideShell>
      <Eyebrow>Pratik · pandas</Eyebrow>
      <H2 className="mb-2">Temizliği koda dökmek</H2>
      <Sub className="max-w-3xl mb-6">
        Aynı temizliği elle değil, tekrarlanabilir bir betikle yap. Kaynak güncellendiğinde
        betiği yeniden çalıştırırsın; el emeği sıfır, hata payı düşer.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <PandasCleanBlock />
        <div className="space-y-3">
          {[
            { icon: Code2, t: "Tekrarlanabilir", d: "Betik = belgelenmiş süreç. Aynı sonucu herkes üretebilir.", accent: "#ef4444" },
            { icon: ClipboardList, t: "İzlenebilir", d: "Hangi adımda ne değişti, satır satır görünür.", accent: "#f59e0b" },
            { icon: Wand2, t: "Ölçeklenir", d: "5 satıra da 5 milyon satıra da aynı kod uygulanır.", accent: "#fbbf24" },
            { icon: Terminal, t: "Araçsız da olur", d: "Excel/Power Query ile de yapılır; mantık aynı kalır.", accent: "#ef4444" },
          ].map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="vg-card rounded-xl p-4 flex items-start gap-3"
            >
              <it.icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: it.accent }} />
              <div>
                <div className="text-sm font-semibold text-white">{it.t}</div>
                <p className="text-xs text-gray-400 leading-snug mt-0.5">{it.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 14. BÖLÜM 3 — HAZIRLAMA ───── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Veriyi Hazırlamak"
      subtitle="Temiz veri henüz grafiğe hazır olmayabilir. Doğru tip, doğru biçim ve doğru yapı (tidy) görselleştirme aracının veriyi anlaması için şarttır."
      bgGradient="linear-gradient(135deg, #ef4444, #f59e0b)"
      shadow="0 25px 60px -15px rgba(239, 68, 68, 0.55)"
      icon={<Wand2 className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 15. TIDY / UZUN-GENİŞ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Veri yapısı · tidy</Eyebrow>
      <H2 className="mb-2">Geniş mi, uzun mu?</H2>
      <Sub className="max-w-3xl mb-6">
        Çoğu görselleştirme aracı &quot;uzun&quot; (tidy) biçimi sever: her satır bir gözlem,
        her sütun bir değişken. İnsan gözüne geniş tablo hoş gelir; araca uzun tablo lazımdır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <div className="text-xs font-mono text-[#fca5a5] mb-2">GENİŞ (insan için okunaklı)</div>
          <div className="vg-card rounded-xl p-1">
            <table className="vg-sheet w-full">
              <thead>
                <tr>
                  <th>sehir</th>
                  <th>2023</th>
                  <th>2024</th>
                  <th>2025</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>İzmir</td><td>120</td><td>135</td><td>150</td></tr>
                <tr><td>Ankara</td><td>90</td><td>110</td><td>118</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-500 mt-2 px-1">Yıllar sütun başlığı; yeni yıl = yeni sütun.</p>
        </div>
        <div>
          <div className="text-xs font-mono text-[#86efac] mb-2">UZUN / TIDY (araç için ideal)</div>
          <div className="vg-card rounded-xl p-1">
            <table className="vg-sheet w-full">
              <thead>
                <tr>
                  <th>sehir</th>
                  <th>yil</th>
                  <th>deger</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>İzmir</td><td>2023</td><td>120</td></tr>
                <tr><td>İzmir</td><td>2024</td><td>135</td></tr>
                <tr><td>İzmir</td><td>2025</td><td>150</td></tr>
                <tr><td>Ankara</td><td>2023</td><td>90</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-500 mt-2 px-1">Yıl bir değişken oldu; renk/eksen olarak kullanılabilir.</p>
        </div>
      </div>
      <div className="mt-5 vg-card rounded-lg p-3 text-xs text-gray-300 flex items-center gap-3 max-w-3xl">
        <Shuffle className="w-4 h-4 text-[#f59e0b] flex-shrink-0" />
        <span>Geniş&apos;ten uzun&apos;a dönüşüme <span className="text-white">melt / unpivot</span>, ters yöne <span className="text-white">pivot</span> denir.</span>
      </div>
    </SlideShell>
  ),

  /* ───── 16. BİRLEŞTİRME (JOIN) ───── */
  () => (
    <SlideShell>
      <Eyebrow>Birleştirme · join</Eyebrow>
      <H2 className="mb-2">İki tabloyu ortak anahtarla birleştir</H2>
      <Sub className="max-w-3xl mb-6">
        Veri çoğu zaman birden çok tabloya dağılmıştır: satışlar bir yerde, şehir bilgisi başka.
        Ortak bir anahtar sütunu (örn. <span className="font-mono text-[#fca5a5]">sehir_id</span>) üzerinden birleştirilir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-4">
          <div className="text-xs font-mono text-gray-400 mb-2">satislar</div>
          <div className="vg-card rounded-xl p-1">
            <table className="vg-sheet w-full">
              <thead><tr><th>sehir_id</th><th>tutar</th></tr></thead>
              <tbody>
                <tr><td className="vg-cell-clean">35</td><td>1250</td></tr>
                <tr><td className="vg-cell-clean">06</td><td>1015</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="md:col-span-1 flex justify-center">
          <Link2 className="w-7 h-7 text-[#ef4444]" />
        </div>
        <div className="md:col-span-3">
          <div className="text-xs font-mono text-gray-400 mb-2">sehirler</div>
          <div className="vg-card rounded-xl p-1">
            <table className="vg-sheet w-full">
              <thead><tr><th>sehir_id</th><th>ad</th></tr></thead>
              <tbody>
                <tr><td className="vg-cell-clean">35</td><td>İzmir</td></tr>
                <tr><td className="vg-cell-clean">06</td><td>Ankara</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="md:col-span-1 flex justify-center">
          <ChevronRight className="w-7 h-7 text-[#f59e0b]" />
        </div>
        <div className="md:col-span-3">
          <div className="text-xs font-mono text-[#86efac] mb-2">birleşmiş</div>
          <div className="vg-card rounded-xl p-1">
            <table className="vg-sheet w-full">
              <thead><tr><th>ad</th><th>tutar</th></tr></thead>
              <tbody>
                <tr><td>İzmir</td><td>1250</td></tr>
                <tr><td>Ankara</td><td>1015</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="vg-card rounded-lg p-3 text-gray-300"><span className="text-[#ef4444] font-semibold">inner join:</span> yalnız iki tabloda da eşleşen satırlar.</div>
        <div className="vg-card rounded-lg p-3 text-gray-300"><span className="text-[#f59e0b] font-semibold">left join:</span> sol tablonun hepsi, sağdan eşleşen varsa eklenir.</div>
        <div className="vg-card rounded-lg p-3 text-gray-300"><span className="text-[#fbbf24] font-semibold">Dikkat:</span> anahtar tipleri uyuşmazsa (06 vs 6) eşleşme kaçar.</div>
      </div>
    </SlideShell>
  ),

  /* ───── 17. KALİTE KONTROL LİSTESİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Son denetim</Eyebrow>
      <H2>Görselleştirmeye geçmeden kontrol listesi</H2>
      <Sub className="mt-3 max-w-3xl">
        Veriyi araca bağlamadan önce bu altı soruyu sor. Hepsine &quot;evet&quot; diyebiliyorsan hazırsın.
      </Sub>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { t: "Her sütun doğru tipte mi?", d: "Tarih = tarih, sayı = sayı, kategori = metin." },
          { t: "Eksikler ele alındı mı?", d: "Silindi, dolduruldu ya da bilinçli bırakıldı; not edildi." },
          { t: "Yinelenen kayıt kaldı mı?", d: "Benzersiz anahtar üzerinden tekrarlar temizlendi." },
          { t: "Kategoriler tutarlı mı?", d: "İzmir tek yazımla; büyük/küçük harf, boşluk normalize." },
          { t: "Birimler net mi?", d: "TL mi USD mi, bin mi milyon mu — sütun adında belli." },
          { t: "Yapı araca uygun mu?", d: "Gerekiyorsa tidy/uzun biçime dönüştürüldü." },
        ].map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="vg-card rounded-lg p-4 flex gap-3"
          >
            <div className="w-7 h-7 rounded-md border border-[#ef4444]/50 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 text-[#ef4444]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{it.t}</div>
              <div className="text-[11px] text-gray-400 mt-0.5 leading-snug">{it.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 18. UYGULAMALI LAB ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Gerçek bir veri setini sıfırdan hazırla</H2>
      <Sub className="mt-3 max-w-3xl">
        Açık veri portallarından ilgi alanına uygun bir CSV seç. Sonraki derse temizlenmiş veriyi
        ve attığın adımların kısa notunu getir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Search, title: "1 · Bul ve indir", desc: "İBB Açık Veri, Kaggle veya Our World in Data'dan en az 200 satırlık bir CSV indir.", accent: "#ef4444" },
          { icon: Table2, title: "2 · Keşfet", desc: "Sütun tiplerine, eksik hücrelere ve uç değerlere bak; üç sorun tespit et.", accent: "#f59e0b" },
          { icon: Brush, title: "3 · Temizle", desc: "Eksikleri ele al, yinelenenleri sil, tarih/metin formatını tek tipe getir.", accent: "#fbbf24" },
          { icon: Wand2, title: "4 · Hazırla & belgele", desc: "Gerekiyorsa tidy biçime çevir; yaptığın her adımı 4-5 cümleyle yaz.", accent: "#ef4444" },
        ].map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="vg-card vg-card-hover rounded-xl p-5 flex items-start gap-4"
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
        className="mt-6 vg-card rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <Target className="w-4 h-4 text-[#ef4444] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Teslim:</span> temizlenmiş CSV + adım notları. Excel/Power Query
          ya da Python (pandas) — araç serbest, mantık önemli.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 19. SIRADAKİ HAFTA ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sıradaki Hafta · H6</Eyebrow>
      <H1>
        <span className="vg-shimmer-amber">Renk &amp; Tipografi</span>
      </H1>
      <Sub className="mt-6 max-w-3xl">
        Veri hazır; sıra onu görsel olarak doğru kodlamada. Önümüzdeki hafta renk paletleri
        (sıralı, iki uçlu, kategorik), erişilebilirlik ve grafiklerde tipografiyi işliyoruz.
      </Sub>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { i: Brush, t: "Renk paletleri" },
          { i: Layers, t: "Sıralı vs kategorik" },
          { i: Target, t: "Erişilebilirlik" },
          { i: ScrollText, t: "Grafikte tipografi" },
        ].map((tool, i) => (
          <motion.div
            key={tool.t}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="vg-card rounded-lg p-3 flex items-center gap-3"
          >
            <tool.i className="w-5 h-5 text-[#f59e0b]" />
            <span className="text-sm text-gray-200">{tool.t}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 vg-card rounded-lg p-4 flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-[#ef4444]" />
        <span className="text-sm text-gray-300">
          Bu haftaki labda hazırladığın temiz veriyi gelecek hafta renklendireceğiz — yanında getir.
        </span>
      </div>
    </SlideShell>
  ),

  /* ───── 20. KAPANIŞ ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{ background: "linear-gradient(135deg,#ef4444,#b91c1c)", boxShadow: "0 30px 80px -20px rgba(239,68,68,0.6)" }}
        >
          <CheckCircle2 className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>Hafta 5 · Tamamlandı</Eyebrow>
        <H1>
          <span className="vg-shimmer">Önce veri, sonra grafik.</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta veriyi bulduk, eriştik, temizledik ve hazırladık. İyi bir görselleştirmenin
          temeli, üzerinde durduğu temiz veridir.
        </Sub>
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="vg-card rounded-xl p-4">
            <Search className="w-5 h-5 text-[#ef4444] mx-auto mb-2" />
            <div className="text-xs text-gray-400">Bul &amp; Eriş</div>
            <div className="text-sm font-semibold text-white mt-1">Dosya · API · DB</div>
          </div>
          <div className="vg-card rounded-xl p-4">
            <Brush className="w-5 h-5 text-[#f59e0b] mx-auto mb-2" />
            <div className="text-xs text-gray-400">Temizle</div>
            <div className="text-sm font-semibold text-white mt-1">Eksik · tekrar · format</div>
          </div>
          <div className="vg-card rounded-xl p-4">
            <Wand2 className="w-5 h-5 text-[#fbbf24] mx-auto mb-2" />
            <div className="text-xs text-gray-400">Hazırla</div>
            <div className="text-sm font-semibold text-white mt-1">Tip · tidy · join</div>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-center gap-3 text-xs font-mono text-gray-500">
          <GraduationCap className="w-4 h-4" />
          <span>MCBÜ MYO · BVA 2107 · Veri Görselleştirme · 2025-2026 Bahar</span>
        </div>
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
            background: "linear-gradient(90deg, #ef4444, #f87171, #ef4444)",
            boxShadow: "0 0 16px rgba(239,68,68,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#ef4444]/70">
          BVA 2107 · 5. Hafta · Veri Kaynakları &amp; Hazırlama
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#ef4444]/50">
            <span className="text-[#ef4444]">
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
            className="p-1.5 text-gray-500 hover:text-[#ef4444] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#ef4444] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#ef4444]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(239,68,68,0.6)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#ef4444] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
