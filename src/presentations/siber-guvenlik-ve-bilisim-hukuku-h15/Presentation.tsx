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
  FileText,
  ClipboardList,
  Target,
  Crosshair,
  Bug,
  Gauge,
  AlertTriangle,
  CheckCircle2,
  ListChecks,
  Presentation as PresentationIcon,
  Scale,
  GraduationCap,
  Layers,
  Search,
  Wrench,
  Mic,
  Clock,
  Calendar,
  Brain,
  Sparkles,
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
        <div className="absolute inset-0 sgbh-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#06b6d4]"
    >
      <span className="w-8 h-px bg-[#06b6d4]" />
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
  accent = "#06b6d4",
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
      className="sgbh-card sgbh-card-hover rounded-xl p-6 transition-all"
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={{ background: `${accent}15`, border: `1px solid ${accent}40` }}
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
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 sgbh-pulse"
          style={{ background: bgGradient, boxShadow: shadow }}
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

/* Sızma testi raporu — kağıt belge mockup */
function ReportDocument() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="sgbh-report w-full max-w-3xl mx-auto"
    >
      <div className="sgbh-report-band flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-80">
            Sızma Testi Raporu · GİZLİ
          </div>
          <div className="text-xl font-bold mt-1">Acme E-Ticaret — Web Uygulaması</div>
          <div className="text-[11px] opacity-80 mt-0.5">
            Kapsam: app.acme-ornek.tr · Tarih: 02—06 Haziran 2026 · Metodoloji: OWASP WSTG
          </div>
        </div>
        <ShieldCheck className="w-10 h-10 opacity-90" />
      </div>
      <div className="sgbh-report-body">
        <div className="sgbh-report-sec">Yönetici Özeti</div>
        <p className="mb-3 text-gray-700">
          Yetkili (gri kutu) bir sızma testinde, kimliği doğrulanmış bir kullanıcının
          yetkisini aşarak başka kullanıcıların siparişlerine eriştiği{" "}
          <strong>kritik</strong> bir erişim kontrolü zafiyeti tespit edildi. Toplam{" "}
          <strong>7 bulgu</strong> raporlandı.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="sgbh-report-sec">Örnek Bulgu</div>
            <div className="text-gray-800">
              <span className="font-bold">F-01 · IDOR — Sipariş Görüntüleme</span>
              <div className="text-[11px] text-gray-600 mt-1">
                Konum: GET /api/orders/&#123;id&#125; · CVSS 8.1 (Yüksek) · CWE-639
              </div>
              <p className="mt-1">
                &#123;id&#125; parametresi sırayla artırılarak diğer hesapların
                sipariş ve adres bilgilerine erişildi (yatay yetki yükseltme).
              </p>
            </div>
          </div>
          <div>
            <div className="sgbh-report-sec">Öneri</div>
            <p className="text-gray-800">
              Her istekte nesne sahipliğini sunucu tarafında doğrula
              (oturum kullanıcısı = kaynak sahibi). Tahmin edilebilir tamsayı
              kimlikleri yerine UUID kullan. Yetki kontrolünü merkezi bir
              katmana taşı.
            </p>
          </div>
        </div>
        <div className="mt-3 text-[10px] text-gray-500 border-t border-gray-200 pt-2 font-sans">
          Bu belge yalnızca yetkili kapsam dahilinde, müşterinin yazılı izniyle
          hazırlanmıştır. Bulgular sorumlu açıklama ilkesine göre paylaşılır.
        </div>
      </div>
    </motion.div>
  );
}

/* CVSS önem dağılımı paneli */
function SeverityScoreboard() {
  const rows = [
    { label: "Kritik", count: 1, pct: 14, color: "#dc2626", cls: "sgbh-sev-crit", range: "9.0 — 10.0" },
    { label: "Yüksek", count: 2, pct: 28, color: "#ea580c", cls: "sgbh-sev-high", range: "7.0 — 8.9" },
    { label: "Orta", count: 2, pct: 28, color: "#eab308", cls: "sgbh-sev-med", range: "4.0 — 6.9" },
    { label: "Düşük", count: 1, pct: 14, color: "#22c55e", cls: "sgbh-sev-low", range: "0.1 — 3.9" },
    { label: "Bilgi", count: 1, pct: 16, color: "#3b82f6", cls: "sgbh-sev-info", range: "0.0" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="sgbh-card rounded-xl p-6 max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-[#67e8f9]">
          <Gauge className="w-5 h-5" />
          <span className="text-xs font-mono uppercase tracking-widest">
            CVSS v3.1 · Önem dağılımı (7 bulgu)
          </span>
        </div>
        <span className="text-[11px] font-mono text-gray-500">
          0.0 — 10.0 puan aralığı
        </span>
      </div>
      <div className="space-y-3.5">
        {rows.map((r, i) => (
          <motion.div
            key={r.label}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-center gap-4"
          >
            <span className={`sgbh-sev ${r.cls}`} style={{ minWidth: 78, justifyContent: "center" }}>
              {r.label}
            </span>
            <span className="text-[11px] font-mono text-gray-500 w-24 flex-shrink-0">
              {r.range}
            </span>
            <div className="flex-1 sgbh-bar-track">
              <motion.div
                className="sgbh-bar-fill"
                style={{ background: r.color }}
                initial={{ width: 0 }}
                animate={{ width: `${r.pct}%` }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
              />
            </div>
            <span className="text-sm font-mono text-white w-6 text-right flex-shrink-0">
              {r.count}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="mt-5 text-[11px] text-gray-500">
        Puan; saldırı vektörü, karmaşıklık, gereken yetki ve etkiden (gizlilik/bütünlük/erişilebilirlik) hesaplanır.
        Önem, iş bağlamıyla birlikte önceliklendirilir.
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
        <Eyebrow>BVA 2205 · 15. Hafta · Final · Güz Dönemi</Eyebrow>
        <H1>
          <span className="sgbh-shimmer">Final Pen-Test Raporu</span>
          <br />
          <span className="text-white/90">Sunum &amp; Dönem Değerlendirmesi</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Dönem boyunca öğrendiğin saldırı ve savunmayı tek bir çıktıda topla:
          yetkili, hukuka uygun, okunabilir bir rapor ve onu sunmak.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={FileText}
            title="Rapor"
            desc="Yönetici özeti, bulgular, kanıt, CVSS önem ve giderme önerisi."
            delay={0.3}
            accent="#06b6d4"
          />
          <FeatureCard
            icon={Mic}
            title="Sunum"
            desc="10 dakikada teknik bulguyu hem yöneticiye hem geliştiriciye anlat."
            delay={0.45}
            accent="#34d399"
          />
          <FeatureCard
            icon={GraduationCap}
            title="Değerlendirme"
            desc="15 haftanın haritası: temeller, saldırı-savunma, hukuk ve etik."
            delay={0.6}
            accent="#a78bfa"
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Çarşamba 13:30 — 17:00 · Öğrenci sunumları + dönem kapanışı
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Geçen haftadan köprü / hedef ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 14. haftadan 15. haftaya</Eyebrow>
      <H2>Bulguyu bulmak yarısı; raporlamak ve sunmak diğer yarısı</H2>
      <Sub className="mt-3 max-w-3xl">
        14. haftaya kadar keşif, sömürü ve savunmayı işledik. Sahada bir zafiyetin
        değeri, ancak doğru kişiye anlaşılır biçimde aktarıldığında ortaya çıkar.
        Bu hafta dönemin çıktısını teslim ediyor ve sunuyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#67e8f9]">
            <Crosshair className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Şimdiye kadar (test)</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Kapsam ve izin belgesi (Rules of Engagement).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Keşif → numaralandırma → sömürü → iz.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Her bulguda ekran görüntüsü, istek/yanıt kanıtı.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <FileText className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta (çıktı)</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Bulguları bir rapora dönüştür ve önceliklendir.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Yönetici özeti + teknik detay; iki okuyucu kitlesi.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />10 dakikalık sunum: en kritik 3 bulguyu anlat.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. Bugünün akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bugünün akışı</Eyebrow>
      <H2>Üç durak: rapor → sunum → dönem haritası</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce iyi bir raporun anatomisini netleştiriyoruz; sonra sunum ve
        değerlendirme ölçütlerini; en son dönemin tamamını tek karede topluyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Rapor Anatomisi", items: ["Yönetici özeti vs teknik detay", "Bulgu yapısı & kanıt zinciri", "CVSS ile önceliklendirme"], icon: FileText, accent: "#06b6d4" },
          { range: "02", title: "Sunum & Ölçüt", items: ["10 dakikalık akış", "Değerlendirme rubriği", "Sık yapılan hatalar"], icon: Mic, accent: "#34d399" },
          { range: "03", title: "Dönem Haritası", items: ["15 haftanın özeti", "Etik & hukuk hatırlatması", "Sonraki adımlar"], icon: GraduationCap, accent: "#a78bfa" },
        ].map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="sgbh-card rounded-xl p-6"
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

  /* ───── 4. Bölüm 1 — Rapor ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Sızma Testi Raporu"
      subtitle="Rapor, testin tek kalıcı ürünüdür. İyi yazılmış bir bulgu okunur, anlaşılır ve giderilir; kötü yazılmış bir bulgu rafta kalır."
      bgGradient="linear-gradient(135deg,#06b6d4,#0e7490)"
      shadow="0 30px 80px -20px rgba(6,182,212,0.6)"
      icon={<FileText className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 5. Rapor anatomisi ───── */
  () => (
    <SlideShell>
      <Eyebrow>Rapor · standart bölümler</Eyebrow>
      <H2 className="mb-2">İyi bir raporun iskeleti</H2>
      <Sub className="max-w-3xl mb-6">
        Profesyonel raporlar (PTES, OWASP WSTG yaklaşımı) benzer bir yapıyı izler.
        Aynı belge iki farklı okuyucuya hizmet eder: karar veren yönetici ve
        düzeltmeyi yapan geliştirici.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          { n: "01", t: "Yönetici Özeti", d: "Teknik olmayan; risk tablosu, genel duruş, iş etkisi. 1 sayfa.", icon: ClipboardList, accent: "#06b6d4" },
          { n: "02", t: "Kapsam & Metodoloji", d: "Hedefler, test penceresi, kutu rengi (siyah/gri/beyaz), kullanılan standart.", icon: Target, accent: "#67e8f9" },
          { n: "03", t: "Bulgular (detay)", d: "Her zafiyet: açıklama, konum, CVSS, kanıt, etki, giderme.", icon: Bug, accent: "#f87171" },
          { n: "04", t: "Risk Değerlendirmesi", d: "Önem dağılımı, önceliklendirme, kalıntı risk.", icon: Gauge, accent: "#fbbf24" },
          { n: "05", t: "Giderme Yol Haritası", d: "Hızlı kazanımlar vs uzun vadeli; sahip ve süre önerisi.", icon: Wrench, accent: "#34d399" },
          { n: "06", t: "Ekler", d: "Ham çıktılar, araç logları, yeniden üretme adımları, kapsam dışı notlar.", icon: Layers, accent: "#a78bfa" },
        ].map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, x: i % 2 === 0 ? -12 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.07 }}
            className="sgbh-card rounded-lg px-4 py-3 flex items-start gap-3"
          >
            <span
              className="text-[10px] font-mono font-bold px-2 py-1 rounded flex-shrink-0"
              style={{ background: `${s.accent}15`, color: s.accent, border: `1px solid ${s.accent}40` }}
            >
              {s.n}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <s.icon className="w-4 h-4 flex-shrink-0" style={{ color: s.accent }} />
                <div className="text-sm font-semibold text-white leading-tight">{s.t}</div>
              </div>
              <div className="text-[11px] text-gray-400 leading-snug mt-1">{s.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 6. Rapor belge mockup ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bir bulgu nasıl görünür?</Eyebrow>
      <H2 className="mb-2">Örnek rapor sayfası</H2>
      <Sub className="max-w-3xl mb-6">
        Her bulgu kendi başına okunabilir olmalı: ne, nerede, ne kadar ciddi,
        nasıl kanıtlandı ve nasıl giderilir. Aşağıda bir IDOR bulgusunun özeti.
      </Sub>
      <ReportDocument />
    </SlideShell>
  ),

  /* ───── 7. Tek bir bulgunun yapısı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bulgu yapısı · alan alan</Eyebrow>
      <H2>Bir bulgu hangi alanlardan oluşur?</H2>
      <Sub className="mt-3 max-w-3xl">
        Tutarlı bir şablon, raporun okunabilirliğini ve karşılaştırılabilirliğini
        sağlar. Sunumdaki her bulguyu da bu alanlara göre anlat.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 sgbh-card rounded-xl p-1"
      >
        <table className="sgbh-tbl">
          <thead>
            <tr>
              <th style={{ width: "22%" }}>Alan</th>
              <th style={{ width: "38%" }}>Ne içerir?</th>
              <th>Örnek (F-01 · IDOR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Başlık &amp; kimlik</td>
              <td>Kısa, eylem odaklı ad ve takip numarası.</td>
              <td>F-01 · Sipariş uç noktasında IDOR.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Önem (CVSS)</td>
              <td>Puan + vektör; iş bağlamıyla önceliklendir.</td>
              <td><span className="font-mono text-[#fdba74]">8.1 · Yüksek</span> · AV:N/AC:L/PR:L/UI:N.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Konum</td>
              <td>URL, parametre, dosya/satır veya bileşen.</td>
              <td><span className="font-mono text-[11px]">GET /api/orders/&#123;id&#125;</span></td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Kanıt</td>
              <td>Yeniden üretme adımları, istek/yanıt, ekran görüntüsü.</td>
              <td>id=1042 → başka kullanıcının adresi döndü.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Etki</td>
              <td>İş diline çevrilmiş sonuç (CIA üzerinden).</td>
              <td>Tüm müşterilerin kişisel verisi okunabilir.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Giderme</td>
              <td>Somut, uygulanabilir düzeltme + referans.</td>
              <td>Sunucu tarafı sahiplik kontrolü · CWE-639.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 8. CVSS önem dağılımı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Önceliklendirme · CVSS</Eyebrow>
      <H2 className="mb-2">Hepsi acil değil — önce neyi düzeltmeli?</H2>
      <Sub className="max-w-3xl mb-6">
        Bulguları önem derecesine göre sıralamak, sınırlı zamanı doğru yere
        yöneltir. CVSS ortak bir dildir; ama nihai öncelik iş etkisiyle birlikte verilir.
      </Sub>
      <SeverityScoreboard />
    </SlideShell>
  ),

  /* ───── 9. Bölüm 2 — Sunum ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Sunum &amp; Değerlendirme"
      subtitle="Raporu yazdın; şimdi 10 dakikada anlat. İyi sunum, dinleyiciye ne yapması gerektiğini bırakır — panik değil, plan."
      bgGradient="linear-gradient(135deg,#22c55e,#15803d)"
      shadow="0 30px 80px -20px rgba(34,197,94,0.55)"
      icon={<PresentationIcon className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 10. 10 dakikalık sunum akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sunum · 10 dakikalık akış</Eyebrow>
      <H2 className="mb-2">Zamanı böl, kanıtla anlat, eylemle bitir</H2>
      <Sub className="max-w-3xl mb-6">
        Süre kısa; en kritik 3 bulguya odaklan. Slayt değil hikâye sun:
        nereye girdin, ne buldun, neden önemli, nasıl giderilir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {[
          { t: "Bağlam", min: "1 dk", d: "Kapsam, izin, hedef ve metot — tek cümle özet.", icon: Target, color: "#06b6d4" },
          { t: "Genel durum", min: "2 dk", d: "Risk tablosu: kaç bulgu, hangi önem dağılımı.", icon: Gauge, color: "#67e8f9" },
          { t: "Kritik 3 bulgu", min: "4 dk", d: "Her biri: kanıt + etki + giderme. Canlı demo varsa kısa.", icon: Bug, color: "#f87171" },
          { t: "Öneriler", min: "2 dk", d: "Hızlı kazanımlar ve yol haritası; kim, ne zaman.", icon: Wrench, color: "#34d399" },
          { t: "Soru", min: "1 dk", d: "Hazır ol: 'sömürdün mü', 'kapsam dışı ne kaldı'.", icon: Mic, color: "#a78bfa" },
        ].map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="sgbh-card rounded-xl p-4 flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <s.icon className="w-5 h-5" style={{ color: s.color }} />
              <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: `${s.color}18`, color: s.color }}>
                {s.min}
              </span>
            </div>
            <div className="text-sm font-semibold text-white mb-2">{s.t}</div>
            <p className="text-[11px] text-gray-400 leading-snug">{s.d}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 sgbh-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <Clock className="w-4 h-4 text-[#06b6d4] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">İpucu:</span> Provanı süre tutarak yap. 10 dakika dolduğunda
          jüri durdurur; en kritik bulguyu sona bırakırsan anlatamadan biter.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 11. Değerlendirme rubriği ───── */
  () => (
    <SlideShell>
      <Eyebrow>Final · değerlendirme ölçütleri</Eyebrow>
      <H2>Notun neye göre verilecek?</H2>
      <Sub className="mt-3 max-w-3xl">
        Final projesi; rapor ve sunum birlikte değerlendirilir. Şeffaf olsun diye
        ağırlıklar aşağıda. &quot;Çok zafiyet bulmak&quot; tek başına yeterli değil —
        anlatım ve etik de puanlanır.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 sgbh-card rounded-xl p-1"
      >
        <table className="sgbh-tbl">
          <thead>
            <tr>
              <th style={{ width: "26%" }}>Ölçüt</th>
              <th style={{ width: "14%" }}>Ağırlık</th>
              <th>Aranan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Teknik doğruluk</td>
              <td><span className="font-mono text-[#67e8f9]">%30</span></td>
              <td>Bulgular gerçek ve yeniden üretilebilir; yanlış pozitif yok; CVSS makul.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Rapor kalitesi</td>
              <td><span className="font-mono text-[#67e8f9]">%25</span></td>
              <td>Yapı, açıklık, kanıt zinciri, giderme önerisinin uygulanabilirliği.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Sunum</td>
              <td><span className="font-mono text-[#67e8f9]">%20</span></td>
              <td>Süre yönetimi, hikâye akışı, soruları karşılama, dinleyiciye uygun dil.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Kapsam &amp; metot</td>
              <td><span className="font-mono text-[#67e8f9]">%15</span></td>
              <td>Tanımlı kapsama sadakat, yöntemsel iz (keşiften gidermeye).</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Etik &amp; hukuk</td>
              <td><span className="font-mono text-[#67e8f9]">%10</span></td>
              <td>İzin sınırları, veri gizliliği, sorumlu açıklama, kapsam dışına çıkmama.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 12. Sık yapılan hatalar ───── */
  () => (
    <SlideShell>
      <Eyebrow>Raporda &amp; sunumda · kaçın</Eyebrow>
      <H2>Sık yapılan altı hata</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu hatalar her yıl tekrar eder. Tanırsan teslimden önce kendin yakalarsın.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { bad: "Araç çıktısını yapıştırmak", good: "Çıktıyı yorumla; ham log eke gider, gövdede anlamı kalır.", icon: ClipboardList },
          { bad: "Önem derecesini şişirmek", good: "Her şeyi 'kritik' yapma; iş etkisiyle dürüstçe önceliklendir.", icon: Gauge },
          { bad: "Yeniden üretme adımı yok", good: "Geliştirici aynı adımı izleyip görebilmeli, yoksa düzeltemez.", icon: ListChecks },
          { bad: "Giderme önerisi belirsiz", good: "'Güvenli hale getir' değil; somut kontrol, yapılandırma, kod örneği.", icon: Wrench },
          { bad: "Kapsam dışına çıkmak", good: "İzin sınırını aşma; bulduğun bonus hedefi raporda not et, sömürme.", icon: Scale },
          { bad: "Tek kitle için yazmak", good: "Yönetici özeti + teknik detayı ayır; ikisi de okumalı.", icon: FileText },
        ].map((m, i) => (
          <motion.div
            key={m.bad}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 + i * 0.08 }}
            className="sgbh-card rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "#06b6d418", border: "1px solid #06b6d455" }}
            >
              <m.icon className="w-5 h-5 text-[#06b6d4]" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#fca5a5]">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {m.bad}
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-300 mt-1.5">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />
                <span>{m.good}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 13. Bölüm 3 — Dönem haritası ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Dönem Değerlendirmesi"
      subtitle="15 hafta tek karede. Saldırganı tanıdık, savunmayı kurduk, hukuku öğrendik. Final projesi bunların hepsini bir araya getiriyor."
      bgGradient="linear-gradient(135deg,#a78bfa,#5b21b6)"
      shadow="0 30px 80px -20px rgba(167,139,250,0.55)"
      icon={<GraduationCap className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 14. Dönem haritası — 3 katman ───── */
  () => (
    <SlideShell>
      <Eyebrow>Geriye bakış · 15 hafta</Eyebrow>
      <H2>Öğrendiklerimiz · üç katman</H2>
      <Sub className="mt-3 max-w-3xl">
        Dönem boyunca teknik temellerden saldırı-savunmaya, oradan hukuki çerçeveye
        ilerledik. Final raporu bu üç katmanı aynı anda kullanmanı istiyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          { range: "Temeller", title: "Güvenliğin dili", items: ["CIA üçlüsü & tehdit modeli", "Ağ trafiği: Nmap & Wireshark", "Kriptografi: şifrele/özetle/imzala"], icon: Shield, accent: "#06b6d4" },
          { range: "Saldırı & Savunma", title: "Saldırganı tanı", items: ["OWASP Top 10 & web zafiyetleri", "Sömürü, sosyal mühendislik, malware", "Katmanlı savunma & olay müdahale"], icon: Crosshair, accent: "#f87171" },
          { range: "Hukuk & Etik", title: "Sınırı çiz", items: ["KVKK · 5651 · TCK 243-245", "Dijital delil & sorumlu açıklama", "Yetkili test, kapsam, izin"], icon: Scale, accent: "#a78bfa" },
        ].map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="sgbh-card rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${g.accent}18`, border: `1px solid ${g.accent}55` }}
              >
                <g.icon className="w-5 h-5" style={{ color: g.accent }} />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: g.accent }}>{g.range}</div>
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

  /* ───── 15. Etik & hukuk hatırlatması + teslim kontrol listesi ───── */
  () => (
    <SlideShell>
      <Eyebrow>Teslimden önce · son kontrol</Eyebrow>
      <H2>Yetkili kal, kanıtla, sorumlu paylaş</H2>
      <Sub className="mt-3 max-w-3xl">
        Final raporun yalnızca derste tanımlı, izinli laboratuvar hedefini kapsar.
        Teslim etmeden bu listeyi geçir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: ListChecks, title: "Kapsam içinde kaldım", desc: "Yalnızca izinli hedef test edildi; kapsam dışı sistemlere dokunulmadı.", accent: "#06b6d4" },
          { icon: Search, title: "Her bulgu kanıtlı", desc: "Yeniden üretme adımı, istek/yanıt ve ekran görüntüsü ekli.", accent: "#34d399" },
          { icon: Gauge, title: "Önem dürüst verildi", desc: "CVSS puanı vektörle gerekçeli; iş etkisi açıklandı.", accent: "#fbbf24" },
          { icon: Scale, title: "Veri ve hukuk korundu", desc: "Kişisel veri maskelendi; rapor 'gizli' işaretli; sorumlu açıklama.", accent: "#a78bfa" },
        ].map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="sgbh-card sgbh-card-hover rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${t.accent}18`, border: `1px solid ${t.accent}55` }}
            >
              <t.icon className="w-5 h-5" style={{ color: t.accent }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono">{i + 1}</span>
                <h3 className="text-base font-semibold text-white">{t.title}</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{t.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 sgbh-card-warn rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <AlertTriangle className="w-4 h-4 text-[#f87171] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Hatırlatma:</span> İzin = sınırı çizen tek şey. Yetki belgesi olmadan
          bir sistemi test etmek TCK 243-245 kapsamında suçtur; bulduğun veriyi paylaşmak ayrıca KVKK ihlalidir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 16. Kapanış ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{
            background: "linear-gradient(135deg,#06b6d4,#0e7490)",
            boxShadow: "0 30px 80px -20px rgba(6,182,212,0.6)",
          }}
        >
          <GraduationCap className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>Dönem tamamlandı · 15 / 15</Eyebrow>
        <H1>
          <span className="sgbh-shimmer">Saldırgan düşün, savunan ol</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bir aracı çalıştırmayı değil, sorumlu ve hukuka uygun düşünmeyi öğrendik.
          Sertifikalar (OSCP, CEH, eJPT), CTF&apos;ler ve bug bounty programları
          buradan sonraki doğal adımlar.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto text-left">
          <div className="sgbh-card rounded-xl p-5">
            <FileText className="w-5 h-5 text-[#06b6d4] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Final raporu</div>
            <div className="text-sm text-gray-400">PDF + sunum slaytları</div>
          </div>
          <div className="sgbh-card rounded-xl p-5">
            <Brain className="w-5 h-5 text-[#a78bfa] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Sonraki adım</div>
            <div className="text-white font-semibold">CTF &amp; lab</div>
            <div className="text-sm text-gray-400">TryHackMe · HackTheBox</div>
          </div>
          <div className="sgbh-card rounded-xl p-5">
            <ShieldCheck className="w-5 h-5 text-[#34d399] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">İlke</div>
            <div className="text-white font-semibold">Etik &gt; merak</div>
            <div className="text-sm text-gray-400">izinsiz test yok</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Teşekkürler · iyi sunumlar · görüşmek üzere</span>
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
            background: "linear-gradient(90deg, #06b6d4, #67e8f9, #06b6d4)",
            boxShadow: "0 0 16px rgba(6,182,212,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#06b6d4]/70">
          BVA 2205 · 15. Hafta · Final Rapor &amp; Sunum
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#06b6d4]/50">
            <span className="text-[#06b6d4]">
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
            className="p-1.5 text-gray-500 hover:text-[#06b6d4] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#06b6d4] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#06b6d4]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(6,182,212,0.6)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#06b6d4] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
