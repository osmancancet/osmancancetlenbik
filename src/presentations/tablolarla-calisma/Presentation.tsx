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
  FileText,
  Table as TableIcon,
  Sigma,
  Calculator,
  Filter,
  ArrowDownUp,
  Search,
  Database,
  BarChart3,
  TrendingUp,
  Users,
  Globe,
  Briefcase,
  GraduationCap,
  Brain,
  Target,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Quote,
  Check,
  X,
  Sparkles,
  Edit3,
  Palette,
  Wand2,
  AlertTriangle,
  Zap,
  Hash,
  Percent,
  Calendar,
  DollarSign,
  Type,
  Copy,
  ClipboardPaste,
  History,
  CheckCircle2,
  XCircle,
  Plus,
  Equal,
  MousePointer2,
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
        <div className="absolute inset-0 tab-grid-bg pointer-events-none" />
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
      className="tab-card tab-card-hover rounded-xl p-6 transition-all"
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
  accent = "#00ff41",
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
      className="tab-card rounded-xl p-5"
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

function ExcelMockup({
  title,
  formula,
  children,
}: {
  title: string;
  formula?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="tab-window-chrome w-full"
    >
      <div className="tab-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-semibold flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d0d0d", color: "#86efac" }}
        >
          <span className="w-5 h-5 rounded-sm tab-x-tile flex items-center justify-center text-[11px]">X</span>
          <span>{title}</span>
        </div>
      </div>
      {formula !== undefined && (
        <div className="tab-formulabar flex items-center gap-2">
          <div className="flex items-center gap-1.5 pr-2 border-r border-gray-300">
            <span className="text-[10px] text-gray-500">fx</span>
          </div>
          <span className="text-[#21a366] font-bold">=</span>
          <span className="flex-1 text-gray-700">{formula}</span>
        </div>
      )}
      <div className="p-0 bg-white">{children}</div>
    </motion.div>
  );
}

function QuoteSlide({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <SlideShell>
      <div className="text-center max-w-4xl mx-auto">
        <Quote className="w-16 h-16 text-[#00ff41]/40 mx-auto mb-8" />
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
          <div className="text-lg font-semibold text-[#00ff41]">{author}</div>
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
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 tab-pulse"
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
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ─────────────────  AÇILIŞ  ───────────────── */

  // 1 — Cover
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>12. Hafta · BVA 1108 — Bilgi Teknolojileri</Eyebrow>
        <H1 className="tab-shimmer-green">
          Tablolarla
          <br />
          Çalışma
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Excel · Word tabloları · Google Sheets — veri analistinin günlük
          aletleri
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 flex items-center justify-center gap-6 flex-wrap"
        >
          <div className="tab-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-md flex items-center justify-center text-lg tab-x-tile">
              X
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">
                Microsoft Excel
              </div>
              <div className="text-[10px] text-gray-500">
                1.1 milyar kullanıcı
              </div>
            </div>
          </div>
          <div className="tab-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center font-bold"
              style={{ background: "rgba(15,108,40,0.15)", color: "#0f6c28" }}
            >
              S
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">
                Google Sheets
              </div>
              <div className="text-[10px] text-gray-500">Bulut + collab</div>
            </div>
          </div>
          <div className="tab-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(43,87,154,0.15)" }}
            >
              <TableIcon className="w-5 h-5" style={{ color: "#4a89dc" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">
                Word Tabloları
              </div>
              <div className="text-[10px] text-gray-500">Belge içi tablo</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Üç araç tanıtımı
  () => (
    <SlideShell>
      <Eyebrow>Üç Tablo Aracı</Eyebrow>
      <H2 className="mb-10">Hangisi ne için?</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <FeatureCard
          icon={Calculator}
          title="Excel"
          desc="Hesaplamalar, veri analizi, formüller, pivot tablolar — veri analistinin baş aleti."
          accent="#21a366"
          delay={0.15}
        />
        <FeatureCard
          icon={TableIcon}
          title="Word Tabloları"
          desc="Rapor içinde küçük veri sunumu — staj defteri, ödev, dilekçe için."
          accent="#4a89dc"
          delay={0.3}
        />
        <FeatureCard
          icon={Globe}
          title="Google Sheets"
          desc="Tarayıcıda, ekiple gerçek zamanlı, ücretsiz — Excel'in cloud kuzeni."
          accent="#0f6c28"
          delay={0.45}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-10 tab-card-green rounded-xl p-5 text-center"
      >
        <div className="text-sm text-gray-300">
          BVA için temel kural:{" "}
          <span className="text-[#21a366] font-semibold">Excel iyi bil</span>{" "}
          + Sheets&apos;te de aynı şeyleri yapabil. Her ikisi de neredeyse aynı
          komutlara sahip.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 3 — İstatistikler
  () => (
    <SlideShell>
      <Eyebrow>Rakamlarla Excel</Eyebrow>
      <H2 className="mb-12">Veri analistinin günlük dünyası</H2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          value="1.1 mlr"
          label="Microsoft 365 kullanıcısı"
          source="Microsoft, 2025"
          accent="#21a366"
        />
        <StatCard
          icon={Database}
          value="1M+"
          label="Tek Excel dosyasında satır limiti"
          source="1.048.576 satır"
          delay={0.1}
          accent="#21a366"
        />
        <StatCard
          icon={Briefcase}
          value="82%"
          label="İş ilanında istenen Excel becerisi"
          source="LinkedIn, 2025"
          delay={0.2}
          accent="#21a366"
        />
        <StatCard
          icon={History}
          value="40 yıl"
          label="Excel'in piyasadaki süresi (1985+)"
          source="Bill Gates, MS"
          delay={0.3}
          accent="#21a366"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 tab-card rounded-xl p-5 text-center"
      >
        <div className="text-sm text-gray-300">
          BVA mezunlarının{" "}
          <span className="text-[#21a366] font-semibold">ilk işlerinde</span>{" "}
          en çok kullandıkları araç → Excel. Python öncesi, SQL öncesi,
          Tableau öncesi.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 4 — Quote (Edwards Deming)
  () => (
    <QuoteSlide
      quote="Tanrı'ya güveniriz. Geri kalan herkes veri getirsin."
      author="W. Edwards Deming"
      role="Veri yönetimi öncüsü · Toyota üretim sistemi danışmanı"
    />
  ),

  /* ─────────────────  1. EXCEL TEMELLERİ  ───────────────── */

  // 5 — Section: Excel Temelleri
  () => (
    <SectionDivider
      num="1"
      total="4"
      title="Excel Temelleri"
      subtitle="Arayüz, hücreler, veri girişi ve biçimlendirme"
      bgGradient="linear-gradient(135deg, #21a366, #107c41)"
      shadow="0 20px 60px -10px rgba(33, 163, 102, 0.6)"
      icon={<span className="text-7xl font-black text-white">X</span>}
    />
  ),

  // 6 — Excel Arayüzü
  () => (
    <SlideShell>
      <Eyebrow>Arayüz</Eyebrow>
      <H2 className="mb-8">Excel Şerit (Ribbon) Yapısı</H2>
      <ExcelMockup title="Çalışma Kitabı1 - Excel">
        <div className="space-y-0">
          <div className="flex gap-1 flex-wrap p-3 bg-gray-50 border-b border-gray-200">
            {[
              { t: "Dosya", active: false },
              { t: "Giriş", active: true },
              { t: "Ekle", active: false },
              { t: "Sayfa Düzeni", active: false },
              { t: "Formüller", active: false },
              { t: "Veri", active: false },
              { t: "Gözden Geçir", active: false },
              { t: "Görünüm", active: false },
            ].map((tab, i) => (
              <motion.div
                key={tab.t}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.04 }}
                className={`px-3 py-1.5 text-xs rounded ${
                  tab.active
                    ? "bg-[#21a366] text-white font-semibold"
                    : "bg-white text-gray-600 border border-gray-200"
                }`}
              >
                {tab.t}
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-[40px_repeat(8,1fr)] text-[10px]">
            <div className="tab-sheet-headerrow"></div>
            {["A", "B", "C", "D", "E", "F", "G", "H"].map((col) => (
              <div key={col} className="tab-sheet-headerrow py-1">
                {col}
              </div>
            ))}
            {[1, 2, 3, 4, 5, 6, 7].map((row) => (
              <>
                <div key={`r${row}`} className="tab-sheet-headercol py-1">
                  {row}
                </div>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((col) => {
                  const isActive = row === 1 && col === 1;
                  const sample =
                    row === 1 && col === 0 ? "Ad" :
                    row === 1 && col === 1 ? "Soyad" :
                    row === 1 && col === 2 ? "Yaş" :
                    row === 1 && col === 3 ? "Şehir" :
                    row === 2 && col === 0 ? "Ahmet" :
                    row === 2 && col === 1 ? "Yılmaz" :
                    row === 2 && col === 2 ? "24" :
                    row === 2 && col === 3 ? "İstanbul" :
                    row === 3 && col === 0 ? "Ayşe" :
                    row === 3 && col === 1 ? "Demir" :
                    row === 3 && col === 2 ? "26" :
                    row === 3 && col === 3 ? "Ankara" :
                    "";
                  return (
                    <div
                      key={`${row}-${col}`}
                      className={
                        isActive
                          ? "tab-sheet-cell-active py-1 px-2 font-semibold"
                          : "tab-sheet-cell py-1 px-2"
                      }
                    >
                      {sample}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </div>
      </ExcelMockup>
    </SlideShell>
  ),

  // 7 — Hücre anatomisi
  () => (
    <SlideShell>
      <Eyebrow>Temel Birim</Eyebrow>
      <H2 className="mb-10">Hücre · Satır · Sütun</H2>
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 items-center">
        <div className="space-y-4">
          {[
            {
              t: "Hücre (Cell)",
              d: "Bir kutu — ad: harfle sütun + sayı satır",
              ex: "B2 = sütun B, satır 2",
              icon: Hash,
            },
            {
              t: "Sütun (Column)",
              d: "Dikey, A'dan başlar, XFD'ye kadar gider (16384 sütun)",
              ex: "A, B, C, ... Z, AA, AB, ...",
              icon: ChevronRight,
            },
            {
              t: "Satır (Row)",
              d: "Yatay, 1'den başlar, 1.048.576'ya kadar",
              ex: "1, 2, 3, ... 1048576",
              icon: ArrowDownUp,
            },
            {
              t: "Aralık (Range)",
              d: "Birden fazla hücre — iki nokta ile ifade",
              ex: "A1:B10 = A1'den B10'a 20 hücre",
              icon: TableIcon,
            },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="tab-card rounded-lg p-3 flex items-start gap-3"
              >
                <Icon className="w-5 h-5 text-[#21a366] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">{s.t}</div>
                  <div className="text-xs text-gray-400">{s.d}</div>
                  <div className="text-[10px] text-[#34d399] font-mono mt-1">
                    {s.ex}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="tab-sheet p-4"
        >
          <div className="grid grid-cols-[36px_repeat(4,1fr)] text-[11px]">
            <div className="tab-sheet-headerrow"></div>
            {["A", "B", "C", "D"].map((col) => (
              <div key={col} className="tab-sheet-headerrow py-1">
                {col}
              </div>
            ))}
            {[1, 2, 3, 4, 5].map((row) => (
              <>
                <div key={`r${row}`} className="tab-sheet-headercol py-1.5">
                  {row}
                </div>
                {[0, 1, 2, 3].map((col) => {
                  const isB2 = row === 2 && col === 1;
                  const isB1B5 = col === 1;
                  return (
                    <div
                      key={`${row}-${col}`}
                      className={
                        isB2
                          ? "tab-sheet-cell-active py-1.5 px-2 font-bold text-center"
                          : isB1B5
                            ? "tab-sheet-cell py-1.5 px-2 text-center"
                            : "tab-sheet-cell py-1.5 px-2 text-center"
                      }
                      style={
                        isB1B5 && !isB2 ? { background: "#dcfce7" } : undefined
                      }
                    >
                      {isB2 ? "B2" : ""}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
          <div className="mt-3 text-[10px] text-gray-600 text-center">
            <span className="px-1.5 py-0.5 bg-[#21a366] text-white rounded">B2</span>{" "}
            tek hücre · <span className="px-1.5 py-0.5" style={{ background: "#dcfce7", color: "#166534" }}>B1:B5</span>{" "}
            sütun aralığı
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 8 — Veri Tipleri
  () => (
    <SlideShell>
      <Eyebrow>Veri Tipleri</Eyebrow>
      <H2 className="mb-10">Excel hangi tipte veri tutar?</H2>
      <div className="grid md:grid-cols-4 gap-4">
        {[
          {
            icon: Hash,
            t: "Sayı",
            ex: "42 · 3.14 · 1.5e6",
            d: "Sağa hizalanır otomatik",
            color: "#21a366",
          },
          {
            icon: Type,
            t: "Metin",
            ex: "Ahmet Yılmaz · #001",
            d: "Sola hizalanır otomatik",
            color: "#3b82f6",
          },
          {
            icon: Calendar,
            t: "Tarih/Saat",
            ex: "21.04.2026 · 14:30",
            d: "Sayı olarak saklanır (1900&apos;den seri no)",
            color: "#a855f7",
          },
          {
            icon: Equal,
            t: "Formül",
            ex: "=A1+B1 · =SUM(A:A)",
            d: "= ile başlar, sonuç gösterir",
            color: "#f59e0b",
          },
        ].map((d, i) => {
          const Icon = d.icon;
          return (
            <motion.div
              key={d.t}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="tab-card rounded-xl p-5"
              style={{ borderColor: `${d.color}40` }}
            >
              <Icon className="w-7 h-7 mb-3" style={{ color: d.color }} />
              <div className="text-sm font-semibold text-white mb-1">{d.t}</div>
              <div
                className="text-xs font-mono mb-2"
                style={{ color: d.color }}
              >
                {d.ex}
              </div>
              <div className="text-[11px] text-gray-400">{d.d}</div>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 tab-card-green rounded-lg p-4 text-center"
      >
        <div className="text-xs text-gray-300">
          <span className="text-[#21a366] font-mono">PRO TİP:</span> Excel
          metni mi sayı mı tahmin ediyor. &ldquo;0123&rdquo; gibi başında sıfır
          olan kodu metin yapmak için tek tırnak ekle:{" "}
          <span className="font-mono text-[#21a366]">&apos;0123</span>
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 9 — Otomatik Doldurma & Flash Fill
  () => (
    <SlideShell>
      <Eyebrow>Süper Güç</Eyebrow>
      <H2 className="mb-4">Otomatik Doldurma &amp; Flash Fill</H2>
      <Sub className="mb-8 !text-base">
        Bir hücreye yaz, sağ alt köşedeki karenin (fill handle) üzerine gel,
        sürükle &mdash; Excel ne istediğini anlar.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="tab-card-green rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-[#21a366]" />
            <div className="text-sm font-semibold text-white">
              Otomatik Doldurma (AutoFill)
            </div>
          </div>
          <div className="space-y-2 text-[11px]">
            <div className="bg-black/40 rounded p-2 font-mono text-gray-300">
              <div>1 → sürükle → 2, 3, 4, 5, 6...</div>
            </div>
            <div className="bg-black/40 rounded p-2 font-mono text-gray-300">
              <div>Pazartesi → sürükle → Salı, Çarşamba, ...</div>
            </div>
            <div className="bg-black/40 rounded p-2 font-mono text-gray-300">
              <div>Ocak 2026 → Şubat 2026, Mart 2026, ...</div>
            </div>
            <div className="bg-black/40 rounded p-2 font-mono text-gray-300">
              <div>=A1+1 → A2+1, A3+1, ... (formül)</div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-gray-500">
            Hücrenin sağ alt köşesi → siyah +&apos;ı sürükle veya çift tıkla (sütun sonuna kadar)
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
          className="tab-card-green rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Wand2 className="w-5 h-5 text-[#21a366]" />
            <div className="text-sm font-semibold text-white">
              Flash Fill (Anlık Doldurma)
            </div>
            <kbd className="ml-auto px-1.5 py-0.5 text-[9px] font-mono bg-[#21a366]/20 border border-[#21a366]/30 rounded text-[#86efac]">
              Ctrl+E
            </kbd>
          </div>
          <div className="text-[11px] bg-black/40 rounded p-3 space-y-1 font-mono">
            <div className="text-gray-500">A: Tam ad</div>
            <div className="text-gray-300">Ahmet Yılmaz</div>
            <div className="text-gray-300">Ayşe Demir</div>
            <div className="text-gray-300">Mehmet Kaya</div>
            <div className="border-t border-white/10 pt-2 mt-2 text-gray-500">
              B: İlk ad isteği
            </div>
            <div className="text-gray-300">Ahmet</div>
            <div className="text-[#21a366]">▼ Ctrl+E (flash!)</div>
            <div className="text-[#86efac]">Ayşe</div>
            <div className="text-[#86efac]">Mehmet</div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-gray-500">
            Excel deseni öğrenir → kalan satırları otomatik doldurur
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 10 — Hücre Biçimlendirme
  () => (
    <SlideShell>
      <Eyebrow>Görsel Düzen</Eyebrow>
      <H2 className="mb-10">Hücre Biçimlendirme</H2>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            t: "Yazı Tipi",
            d: "Font, boyut, kalın, italik, renk",
            icon: Type,
            keys: "Ctrl+B / I / U",
          },
          {
            t: "Hizalama",
            d: "Sol/orta/sağ, üst/orta/alt, açı, sığdır",
            icon: Edit3,
            keys: "Ctrl+1 → Hizalama",
          },
          {
            t: "Kenarlık",
            d: "Kalın çerçeve, ince ızgara, çift çizgi",
            icon: TableIcon,
            keys: "Şerit → Kenarlık",
          },
          {
            t: "Dolgu Rengi",
            d: "Hücreye arka plan rengi — vurgu için",
            icon: Palette,
            keys: "Şerit → Dolgu",
          },
          {
            t: "Hücreleri Birleştir",
            d: "İki hücreyi tek hücre yap (başlıklar için)",
            icon: Plus,
            keys: "Şerit → Birleştir",
          },
          {
            t: "Sayı Biçimi",
            d: "1234 → ₺1,234 / %12 / 1234,00 / 1.2K",
            icon: Hash,
            keys: "Ctrl+1 → Sayı",
          },
        ].map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="tab-card rounded-xl p-4"
              style={{ borderColor: "rgba(33,163,102,0.25)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-[#21a366]" />
                <div className="text-sm font-semibold text-white">{f.t}</div>
              </div>
              <div className="text-[11px] text-gray-400 mb-2">{f.d}</div>
              <div className="text-[10px] text-[#34d399] font-mono">
                {f.keys}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  ),

  // 11 — Sayı biçimleri
  () => (
    <SlideShell>
      <Eyebrow>Sayı Biçimleri</Eyebrow>
      <H2 className="mb-10">Aynı sayı, farklı görünüm</H2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="tab-sheet p-5"
      >
        <table className="w-full text-[12px]">
          <thead>
            <tr className="bg-[#21a366] text-white">
              <th className="text-left px-3 py-2 font-semibold">Biçim</th>
              <th className="text-left px-3 py-2 font-semibold">Ham Değer</th>
              <th className="text-right px-3 py-2 font-semibold">Görünüm</th>
              <th className="text-left px-3 py-2 font-semibold">Kullanım</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {[
              { f: "Genel", v: "1234.5678", d: "1234,5678", u: "Varsayılan" },
              { f: "Sayı (2 ondalık)", v: "1234.5678", d: "1.234,57", u: "Hesaplamalar" },
              { f: "Para Birimi (₺)", v: "1234.5", d: "₺1.234,50", u: "Finans, satış" },
              { f: "Yüzde", v: "0.875", d: "%87,5", u: "Oran, performans" },
              { f: "Tarih (kısa)", v: "45838", d: "21.04.2026", u: "Tarihler" },
              { f: "Saat", v: "0.5", d: "12:00:00", u: "Süre, mesai" },
              { f: "Bilimsel", v: "1234567", d: "1,23E+06", u: "Çok büyük/küçük" },
              { f: "Özel: 0,0K", v: "1234567", d: "1.234,6K", u: "Dashboard" },
            ].map((row, i) => (
              <motion.tr
                key={row.f}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className={i % 2 === 0 ? "bg-gray-50" : ""}
              >
                <td className="px-3 py-1.5 border-b border-gray-200 font-semibold text-[#21a366]">
                  {row.f}
                </td>
                <td className="px-3 py-1.5 border-b border-gray-200 font-mono text-gray-600">
                  {row.v}
                </td>
                <td className="px-3 py-1.5 border-b border-gray-200 font-mono text-right text-gray-900">
                  {row.d}
                </td>
                <td className="px-3 py-1.5 border-b border-gray-200 text-gray-500">
                  {row.u}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-6 text-center text-xs text-gray-500"
      >
        <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#21a366]/20 border border-[#21a366]/30 rounded text-[#86efac]">
          Ctrl+1
        </kbd>{" "}
        ile Hücre Biçimi penceresini aç
      </motion.div>
    </SlideShell>
  ),

  // 12 — Koşullu Biçimlendirme
  () => (
    <SlideShell>
      <Eyebrow>Görsel Analiz</Eyebrow>
      <H2 className="mb-4">Koşullu Biçimlendirme (Conditional)</H2>
      <Sub className="mb-8 !text-base">
        Veri değerine göre rengi otomatik değiştir &mdash; en yüksekleri yeşil,
        düşükleri kırmızı yap.
      </Sub>
      <div className="grid md:grid-cols-[1fr_1fr] gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="tab-sheet p-4"
        >
          <div className="text-xs font-bold mb-3 text-[#21a366]">
            Aylık Satış (₺)
          </div>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="bg-[#21a366] text-white">
                <th className="text-left px-2 py-1">Şehir</th>
                <th className="text-right px-2 py-1">Oca</th>
                <th className="text-right px-2 py-1">Şub</th>
                <th className="text-right px-2 py-1">Mar</th>
              </tr>
            </thead>
            <tbody>
              {[
                { c: "İstanbul", v: ["high", "high", "high"], n: ["85K", "92K", "98K"] },
                { c: "Ankara", v: ["mid", "mid", "high"], n: ["48K", "52K", "61K"] },
                { c: "İzmir", v: ["mid", "high", "mid"], n: ["55K", "63K", "57K"] },
                { c: "Bursa", v: ["low", "mid", "mid"], n: ["28K", "35K", "42K"] },
                { c: "Antalya", v: ["low", "low", "low"], n: ["18K", "22K", "25K"] },
              ].map((row) => (
                <tr key={row.c}>
                  <td className="px-2 py-1 border border-gray-200 font-semibold">
                    {row.c}
                  </td>
                  {row.v.map((level, j) => (
                    <td
                      key={j}
                      className={`px-2 py-1 border border-gray-200 text-right font-mono ${
                        level === "high"
                          ? "tab-heat-high"
                          : level === "mid"
                            ? "tab-heat-mid"
                            : "tab-heat-low"
                      }`}
                    >
                      {row.n[j]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3 pt-2 border-t border-gray-200 flex items-center justify-center gap-4 text-[9px] text-gray-600">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 tab-heat-low rounded-sm" /> düşük
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 tab-heat-mid rounded-sm" /> orta
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 tab-heat-high rounded-sm" /> yüksek
            </span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          {[
            {
              t: "Renk Skalaları",
              d: "2-3 renk gradyanı — düşük → yüksek (heat map)",
            },
            {
              t: "Veri Çubukları",
              d: "Hücre içinde görsel çubuk — değer arttıkça uzar",
            },
            {
              t: "İkon Setleri",
              d: "Trafik ışığı, ok, yıldız — kategoriye göre",
            },
            {
              t: "Hücre Kuralları",
              d: "&gt; 100 ise kırmızı, kopya değer ise sarı...",
            },
            {
              t: "Üst/Alt Kurallar",
              d: "Top 10, Bottom 10, ortalamadan yüksek...",
            },
            {
              t: "Formül Tabanlı",
              d: "Özel formülle — &ldquo;hafta sonu olan tarihleri vurgula&rdquo;",
            },
          ].map((r, i) => (
            <motion.div
              key={r.t}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.06 }}
              className="tab-card rounded p-3 flex items-start gap-3"
            >
              <Check className="w-4 h-4 text-[#21a366] shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-white">{r.t}</div>
                <div className="text-[11px] text-gray-400">{r.d}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2. FORMÜLLER  ───────────────── */

  // 13 — Section: Formüller
  () => (
    <SectionDivider
      num="2"
      total="4"
      title="Formüller &amp; Fonksiyonlar"
      subtitle="Excel'in beyni — verileri otomatik hesaplayan tılsımlar"
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 20px 60px -10px rgba(245, 158, 11, 0.6)"
      icon={<Sigma className="w-16 h-16 text-white" />}
    />
  ),

  // 14 — Formül temelleri
  () => (
    <SlideShell>
      <Eyebrow>Formül 101</Eyebrow>
      <H2 className="mb-4">Her formül = ile başlar</H2>
      <Sub className="mb-8 !text-base">
        Bir hücreye <span className="font-mono text-[#f59e0b]">=</span> yazdığın
        an Excel hesap moduna geçer.
      </Sub>
      <ExcelMockup title="Çalışma Kitabı1" formula="A1 + B1 + C1">
        <div className="bg-white p-4">
          <div className="grid grid-cols-[40px_repeat(4,1fr)] text-[11px]">
            <div className="tab-sheet-headerrow"></div>
            {["A", "B", "C", "D"].map((col) => (
              <div key={col} className="tab-sheet-headerrow py-1">
                {col}
              </div>
            ))}
            {[
              { r: 1, vals: ["10", "20", "30", "60"], formula: 3 },
              { r: 2, vals: ["5", "7", "3", "15"], formula: 3 },
              { r: 3, vals: ["100", "200", "300", "600"], formula: 3 },
            ].map((row) => (
              <>
                <div key={`r${row.r}`} className="tab-sheet-headercol py-1.5">
                  {row.r}
                </div>
                {row.vals.map((v, j) => (
                  <div
                    key={j}
                    className={
                      j === row.formula
                        ? "tab-sheet-cell-formula py-1.5 px-2 font-bold text-right"
                        : "tab-sheet-cell py-1.5 px-2 text-right"
                    }
                  >
                    {v}
                  </div>
                ))}
              </>
            ))}
          </div>
        </div>
      </ExcelMockup>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 grid md:grid-cols-3 gap-3 text-xs"
      >
        <div className="tab-card-green rounded p-3 text-center">
          <span className="font-mono text-[#f59e0b]">=10+20</span> → 30 (sabit
          sayı)
        </div>
        <div className="tab-card-green rounded p-3 text-center">
          <span className="font-mono text-[#f59e0b]">=A1+B1</span> → hücre
          referansı
        </div>
        <div className="tab-card-green rounded p-3 text-center">
          <span className="font-mono text-[#f59e0b]">=SUM(A1:A10)</span> → fonksiyon
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 15 — Hücre referansları (relative vs absolute)
  () => (
    <SlideShell>
      <Eyebrow>Çok Önemli</Eyebrow>
      <H2 className="mb-10">Göreceli vs Mutlak Referans</H2>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            ref: "A1",
            t: "Göreceli",
            d: "Aşağı kopyalandıkça satır numarası artar (A1, A2, A3...)",
            ex: "=A1+B1 → kopyala → =A2+B2",
            color: "#3b82f6",
            use: "Standart durum",
          },
          {
            ref: "$A$1",
            t: "Mutlak (Tam)",
            d: "Asla değişmez. Hep $A$1'e bakar.",
            ex: "=B1*$A$1 → kopyala → =B2*$A$1",
            color: "#ef4444",
            use: "Tek bir sabit değer (KDV, kur)",
          },
          {
            ref: "$A1 / A$1",
            t: "Karışık",
            d: "Sadece sütun veya satır kilitli",
            ex: "$A1: sütun sabit, satır değişir",
            color: "#a855f7",
            use: "Çarpım tablosu, sıcaklık matrisi",
          },
        ].map((r, i) => (
          <motion.div
            key={r.ref}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="tab-card rounded-xl p-5"
            style={{ borderColor: `${r.color}40` }}
          >
            <div
              className="text-2xl font-mono font-bold mb-2"
              style={{ color: r.color }}
            >
              {r.ref}
            </div>
            <div className="text-sm font-semibold text-white mb-2">{r.t}</div>
            <div className="text-xs text-gray-400 mb-3">{r.d}</div>
            <div className="text-[10px] font-mono text-gray-300 bg-black/40 rounded p-2 mb-3">
              {r.ex}
            </div>
            <div
              className="text-[10px] font-mono"
              style={{ color: r.color }}
            >
              ↳ {r.use}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-8 text-center text-xs text-gray-500"
      >
        <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#f59e0b]/20 border border-[#f59e0b]/30 rounded text-[#fbbf24]">
          F4
        </kbd>{" "}
        ile referansı döngü: A1 → $A$1 → A$1 → $A1 → A1
      </motion.div>
    </SlideShell>
  ),

  // 16 — Temel fonksiyonlar
  () => (
    <SlideShell>
      <Eyebrow>Olmazsa Olmazlar</Eyebrow>
      <H2 className="mb-10">8 temel matematik fonksiyonu</H2>
      <div className="grid md:grid-cols-4 gap-3">
        {[
          { f: "SUM", d: "Toplama", ex: "=SUM(A1:A10) → 1240" },
          { f: "AVERAGE", d: "Ortalama", ex: "=AVERAGE(B1:B10) → 124" },
          { f: "MIN", d: "En küçük", ex: "=MIN(C1:C10) → 12" },
          { f: "MAX", d: "En büyük", ex: "=MAX(C1:C10) → 250" },
          { f: "COUNT", d: "Kaç hücre sayı", ex: "=COUNT(D1:D10) → 8" },
          { f: "COUNTA", d: "Kaç hücre dolu", ex: "=COUNTA(D1:D10) → 10" },
          { f: "ROUND", d: "Yuvarla", ex: "=ROUND(3.14159,2) → 3,14" },
          { f: "PRODUCT", d: "Çarpma", ex: "=PRODUCT(A1:A3) → 2400" },
        ].map((fn, i) => (
          <motion.div
            key={fn.f}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className="tab-card rounded-lg p-4"
            style={{ borderColor: "rgba(245,158,11,0.25)" }}
          >
            <div className="text-base font-mono font-bold text-[#f59e0b] mb-1">
              {fn.f}
            </div>
            <div className="text-xs text-white mb-2">{fn.d}</div>
            <div className="text-[10px] font-mono text-gray-400">{fn.ex}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 text-center text-xs text-gray-500"
      >
        Tüm fonksiyon listesi:{" "}
        <span className="text-[#f59e0b] font-mono">Formüller</span> sekmesi → 500+ fonksiyon
      </motion.div>
    </SlideShell>
  ),

  // 17 — Mantıksal IF/AND/OR
  () => (
    <SlideShell>
      <Eyebrow>Karar Verme</Eyebrow>
      <H2 className="mb-10">Mantıksal Fonksiyonlar — IF · AND · OR</H2>
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-6">
        <div className="space-y-3">
          {[
            {
              f: "IF",
              syn: "IF(koşul; doğru; yanlış)",
              ex: "=IF(A1>=50; \"Geçti\"; \"Kaldı\")",
              color: "#f59e0b",
            },
            {
              f: "IFS",
              syn: "Birden fazla koşul (Excel 2019+)",
              ex: "=IFS(A1>=85;\"AA\"; A1>=70;\"BB\"; TRUE;\"CC\")",
              color: "#f59e0b",
            },
            {
              f: "AND",
              syn: "Hepsi doğru mu?",
              ex: "=AND(A1>0; A1<100) → TRUE/FALSE",
              color: "#3b82f6",
            },
            {
              f: "OR",
              syn: "Biri doğru mu yeter",
              ex: "=OR(A1=\"Pzt\"; A1=\"Çar\")",
              color: "#3b82f6",
            },
            {
              f: "NOT",
              syn: "Tersini al",
              ex: "=NOT(A1>10) → 10'dan büyük değilse TRUE",
              color: "#a855f7",
            },
          ].map((fn, i) => (
            <motion.div
              key={fn.f}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.07 }}
              className="tab-card rounded-lg p-3"
            >
              <div
                className="text-base font-mono font-bold mb-1"
                style={{ color: fn.color }}
              >
                {fn.f}
              </div>
              <div className="text-[11px] text-gray-400 mb-1">{fn.syn}</div>
              <div className="text-[10px] font-mono text-gray-500 bg-black/30 rounded px-2 py-1">
                {fn.ex}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="tab-sheet p-4"
        >
          <div className="text-xs font-bold mb-3 text-[#f59e0b]">
            Sınav Notu → Harf Notu (IF örneği)
          </div>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="bg-[#f59e0b] text-white">
                <th className="text-left px-2 py-1.5">Öğrenci</th>
                <th className="text-right px-2 py-1.5">Not</th>
                <th className="text-center px-2 py-1.5">Harf</th>
                <th className="text-center px-2 py-1.5">Durum</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {[
                { n: "Ahmet", note: 92, h: "AA", s: "Başarılı", color: "#16a34a" },
                { n: "Ayşe", note: 76, h: "BB", s: "Başarılı", color: "#16a34a" },
                { n: "Mehmet", note: 65, h: "CC", s: "Başarılı", color: "#84cc16" },
                { n: "Fatma", note: 48, h: "FF", s: "Kaldı", color: "#ef4444" },
                { n: "Hasan", note: 38, h: "FF", s: "Kaldı", color: "#ef4444" },
              ].map((row, i) => (
                <tr
                  key={row.n}
                  className={i % 2 === 0 ? "bg-gray-50" : ""}
                >
                  <td className="px-2 py-1.5 border-b border-gray-200 font-semibold">
                    {row.n}
                  </td>
                  <td className="px-2 py-1.5 border-b border-gray-200 text-right font-mono">
                    {row.note}
                  </td>
                  <td className="px-2 py-1.5 border-b border-gray-200 text-center font-bold">
                    {row.h}
                  </td>
                  <td
                    className="px-2 py-1.5 border-b border-gray-200 text-center font-semibold"
                    style={{ color: row.color }}
                  >
                    {row.s}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3 pt-2 border-t border-gray-200 text-[9px] font-mono text-gray-600">
            =IFS(B2&gt;=85;&quot;AA&quot;; B2&gt;=70;&quot;BB&quot;; B2&gt;=60;&quot;CC&quot;; TRUE;&quot;FF&quot;)
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 18 — Metin fonksiyonları
  () => (
    <SlideShell>
      <Eyebrow>Metin Üzerinde</Eyebrow>
      <H2 className="mb-10">Metin Fonksiyonları</H2>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { f: "CONCAT", d: "Birleştir", ex: '=CONCAT(A1; " "; B1)', r: "Ahmet Yılmaz" },
          { f: "LEFT", d: "Soldan n karakter", ex: '=LEFT("Türkiye"; 4)', r: "Türk" },
          { f: "RIGHT", d: "Sağdan n karakter", ex: '=RIGHT("Türkiye"; 3)', r: "iye" },
          { f: "MID", d: "Ortadan kes", ex: '=MID("Türkiye"; 2; 3)', r: "ürk" },
          { f: "LEN", d: "Karakter sayısı", ex: '=LEN("Türkiye")', r: "7" },
          { f: "UPPER / LOWER", d: "Büyük / küçük harf", ex: '=UPPER("ahmet")', r: "AHMET" },
          { f: "TRIM", d: "Fazla boşlukları sil", ex: '=TRIM("  Ahmet  Y. ")', r: "Ahmet Y." },
          { f: "REPLACE", d: "Belli yerden değiştir", ex: '=REPLACE("0532..."; 1; 1; "+90 0")', r: "+90 0532..." },
        ].map((fn, i) => (
          <motion.div
            key={fn.f}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className="tab-card rounded-lg p-3"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="text-sm font-mono font-bold text-[#f59e0b] min-w-[100px]">
                {fn.f}
              </div>
              <div className="text-xs text-gray-400">{fn.d}</div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-gray-400">{fn.ex}</span>
              <span className="text-[#34d399]">→ {fn.r}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 19 — VLOOKUP/XLOOKUP
  () => (
    <SlideShell>
      <Eyebrow>Süper Güç</Eyebrow>
      <H2 className="mb-4">VLOOKUP &amp; XLOOKUP — &ldquo;ara ve getir&rdquo;</H2>
      <Sub className="mb-8 !text-base">
        Bir tabloda değer ara, başka bir sütundan ilgili veriyi getir. Veri
        analistinin en sık kullandığı formül.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="tab-card rounded-xl p-5"
          style={{ borderColor: "rgba(245,158,11,0.3)" }}
        >
          <div className="text-base font-mono font-bold text-[#f59e0b] mb-2">
            VLOOKUP (klasik)
          </div>
          <div className="text-[11px] text-gray-400 mb-3">
            Excel 2019 ve öncesinin standardı
          </div>
          <div className="text-[10px] font-mono bg-black/40 rounded p-3 text-gray-300 leading-relaxed">
            <div className="text-[#f59e0b]">VLOOKUP(</div>
            <div className="ml-3">aranan_değer;</div>
            <div className="ml-3">tablo_aralığı;</div>
            <div className="ml-3">sütun_no;</div>
            <div className="ml-3">[tam_eşleşme])</div>
            <div className="text-[#f59e0b]">)</div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-gray-500">
            ⚠ Sadece sola değil, sağa bakar. İlk sütundan arar.
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
          className="tab-card rounded-xl p-5"
          style={{ borderColor: "rgba(33,163,102,0.4)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="text-base font-mono font-bold text-[#21a366]">
              XLOOKUP (modern)
            </div>
            <span className="px-1.5 py-0 text-[9px] bg-[#21a366]/20 text-[#86efac] rounded">
              Excel 365
            </span>
          </div>
          <div className="text-[11px] text-gray-400 mb-3">
            VLOOKUP&apos;ın halefi — daha esnek
          </div>
          <div className="text-[10px] font-mono bg-black/40 rounded p-3 text-gray-300 leading-relaxed">
            <div className="text-[#21a366]">XLOOKUP(</div>
            <div className="ml-3">aranan_değer;</div>
            <div className="ml-3">arama_dizisi;</div>
            <div className="ml-3">sonuç_dizisi;</div>
            <div className="ml-3">[bulunamazsa])</div>
            <div className="text-[#21a366]">)</div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-gray-500">
            ✓ Sola da bakar · sondan da arar · hata yönetimi dahil
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 tab-card-green rounded-lg p-4 text-center"
      >
        <div className="text-xs text-gray-300">
          Örnek: Ürün kodu (
          <span className="font-mono text-[#21a366]">A001</span>) gör → fiyat
          listesinden fiyatı getir.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 20 — Hata türleri
  () => (
    <SlideShell>
      <Eyebrow>Hata Mesajları</Eyebrow>
      <H2 className="mb-10">Excel sana ne demek istiyor?</H2>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { e: "#DIV/0!", t: "Sıfıra bölme", d: "=A1/0 veya =A1/B1 (B1 boş)", fix: "IFERROR ile boşluğa çevir" },
          { e: "#N/A", t: "Bulunamadı", d: "VLOOKUP arama değeri yok", fix: "XLOOKUP'ın 4. arg'ı ile özel mesaj" },
          { e: "#VALUE!", t: "Yanlış veri tipi", d: '=A1+"abc" (sayı + metin)', fix: "Hücre tipini kontrol et" },
          { e: "#REF!", t: "Geçersiz referans", d: "Sütunu sildin, formül kayboldu", fix: "Ctrl+Z ile geri al, formülü düzelt" },
          { e: "#NAME?", t: "Bilinmeyen isim", d: "=SUM yerine =SUMM yazdın", fix: "Fonksiyon adını kontrol et" },
          { e: "#NUM!", t: "Geçersiz sayı", d: "Negatif sayının karekökü", fix: "Mantıksal kontrolü düzelt" },
        ].map((er, i) => (
          <motion.div
            key={er.e}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.07 }}
            className="tab-card rounded-lg p-4"
            style={{ borderColor: "rgba(239,68,68,0.3)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="px-2 py-1 rounded bg-red-500/15 border border-red-500/30 text-red-300 font-mono text-xs font-bold">
                {er.e}
              </div>
              <div className="text-sm font-semibold text-white">{er.t}</div>
            </div>
            <div className="text-[11px] text-gray-400 mb-2">
              <span className="text-gray-500">Sebep:</span> {er.d}
            </div>
            <div className="text-[11px] text-[#34d399]">
              <span className="text-gray-500">Çözüm:</span> {er.fix}
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3. VERİ YÖNETİMİ  ───────────────── */

  // 21 — Section: Veri
  () => (
    <SectionDivider
      num="3"
      total="4"
      title="Veri Yönetimi"
      subtitle="Sırala, filtrele, pivot ve grafikle anlam çıkar"
      bgGradient="linear-gradient(135deg, #6366f1, #4338ca)"
      shadow="0 20px 60px -10px rgba(99, 102, 241, 0.6)"
      icon={<Database className="w-16 h-16 text-white" />}
    />
  ),

  // 22 — Sırala & Filtrele
  () => (
    <SlideShell>
      <Eyebrow>Veri Düzenleme</Eyebrow>
      <H2 className="mb-10">Sırala &amp; Filtrele</H2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="tab-card rounded-xl p-5"
          style={{ borderColor: "rgba(99,102,241,0.35)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <ArrowDownUp className="w-5 h-5 text-[#6366f1]" />
            <div className="text-sm font-semibold text-white">Sırala (Sort)</div>
          </div>
          <ul className="space-y-1.5 text-xs text-gray-400 mb-4">
            <li>• A→Z (artan), Z→A (azalan)</li>
            <li>• Sayı: küçükten büyüğe</li>
            <li>• Tarih: eskiden yeniye</li>
            <li>• Çoklu kriter: önce şehre, sonra yaşa</li>
            <li>• Renge göre: koşullu biçim ile birlikte</li>
          </ul>
          <div className="text-[10px] font-mono text-[#6366f1]">
            Veri → Sırala (Ctrl+Shift+L)
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="tab-card rounded-xl p-5"
          style={{ borderColor: "rgba(99,102,241,0.35)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-[#6366f1]" />
            <div className="text-sm font-semibold text-white">Filtrele (Filter)</div>
          </div>
          <ul className="space-y-1.5 text-xs text-gray-400 mb-4">
            <li>• Sadece İstanbul&apos;dakileri göster</li>
            <li>• 50&apos;den büyük olanlar</li>
            <li>• Bu yıl içindeki tarihler</li>
            <li>• Renge göre filtrele</li>
            <li>• Çoklu sütunda eş zamanlı</li>
          </ul>
          <div className="text-[10px] font-mono text-[#6366f1]">
            Veri → Filtre (Ctrl+Shift+L) → açılır oklar
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 tab-card-green rounded-lg p-4 text-center"
      >
        <div className="text-xs text-gray-300">
          <span className="text-[#21a366] font-mono">Tablo formatına çevir</span>{" "}
          (Ctrl+T) → otomatik filtre + stil + dinamik aralık
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 23 — Tablo formatı
  () => (
    <SlideShell>
      <Eyebrow>Excel&apos;in En Az Bilinen Gücü</Eyebrow>
      <H2 className="mb-4">Tablo Formatı (Ctrl+T)</H2>
      <Sub className="mb-8 !text-base">
        Düz veri aralığını &ldquo;akıllı tablo&rdquo;ya çevir &mdash; otomatik filtre,
        otomatik stil, dinamik formül.
      </Sub>
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-6 items-center">
        <div className="space-y-3">
          {[
            { t: "Otomatik filtre", d: "Her sütuna açılır filtre oklar" },
            { t: "Şerit stilleri", d: "20+ hazır renk ve format" },
            { t: "Dinamik aralık", d: "Yeni satır eklediğinde formüller otomatik genişler" },
            { t: "Yapısal referans", d: "=Tablo1[Satış] gibi okunaklı formül" },
            { t: "Toplam satırı", d: "Tek tıkla TOPLA / ORTALAMA / SAY ekle" },
            { t: "Pivot için ideal", d: "Tabloyu seç → pivot otomatik hazır" },
          ].map((f, i) => (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.07 }}
              className="flex items-start gap-2"
            >
              <Check className="w-4 h-4 text-[#21a366] shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-white">{f.t}</div>
                <div className="text-xs text-gray-400">{f.d}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="tab-sheet p-4"
        >
          <div className="text-xs font-bold mb-3 text-[#21a366]">
            Tablo1 - Müşteri Listesi
          </div>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="bg-[#21a366] text-white">
                <th className="text-left px-2 py-1.5">
                  <div className="flex items-center gap-1">
                    Ad
                    <Filter className="w-2.5 h-2.5 opacity-70" />
                  </div>
                </th>
                <th className="text-left px-2 py-1.5">
                  <div className="flex items-center gap-1">
                    Şehir
                    <Filter className="w-2.5 h-2.5 opacity-70" />
                  </div>
                </th>
                <th className="text-right px-2 py-1.5">
                  <div className="flex items-center gap-1 justify-end">
                    Satış
                    <Filter className="w-2.5 h-2.5 opacity-70" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {[
                ["Ahmet Y.", "İstanbul", "₺12.400"],
                ["Ayşe D.", "Ankara", "₺8.200"],
                ["Mehmet K.", "İzmir", "₺15.800"],
                ["Fatma D.", "İstanbul", "₺10.600"],
                ["Hasan A.", "Bursa", "₺6.400"],
              ].map((row, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-emerald-50" : ""}
                >
                  <td className="px-2 py-1.5 border-b border-gray-200">
                    {row[0]}
                  </td>
                  <td className="px-2 py-1.5 border-b border-gray-200">
                    {row[1]}
                  </td>
                  <td className="px-2 py-1.5 border-b border-gray-200 text-right font-mono">
                    {row[2]}
                  </td>
                </tr>
              ))}
              <tr className="bg-emerald-100 font-bold border-t-2 border-emerald-600">
                <td className="px-2 py-1.5">TOPLAM</td>
                <td className="px-2 py-1.5">5 müşteri</td>
                <td className="px-2 py-1.5 text-right font-mono">₺53.400</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 24 — Pivot kavram
  () => (
    <SlideShell>
      <Eyebrow>Veri Analizinin Tacı</Eyebrow>
      <H2 className="mb-4">Pivot Tablo Nedir?</H2>
      <Sub className="mb-8 !text-base">
        1000 satırlık veriyi tek tıkla özetle &mdash; toplam, ortalama, sayım
        anında. Excel&apos;in en güçlü özelliği.
      </Sub>
      <div className="grid md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Database}
          title="Ham Veri"
          desc="1000+ satır işlem kaydı: tarih, müşteri, ürün, miktar, fiyat..."
          accent="#6366f1"
          delay={0.2}
        />
        <FeatureCard
          icon={Wand2}
          title="Pivot Sihir"
          desc="Sürükle-bırak: Sütun=Şehir, Satır=Ürün, Değer=TOPLAM(Satış)"
          accent="#a855f7"
          delay={0.35}
        />
        <FeatureCard
          icon={BarChart3}
          title="Anlamlı Özet"
          desc="Şehre × ürüne göre toplam satışlar — tek bakışta dashboard"
          accent="#21a366"
          delay={0.5}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center text-xs text-gray-500"
      >
        Ekle → Özet Tablo (PivotTable) → tablo seç → tamam → alanları sürükle
      </motion.div>
    </SlideShell>
  ),

  // 25 — Pivot örnek
  () => (
    <SlideShell>
      <Eyebrow>Canlı Örnek</Eyebrow>
      <H2 className="mb-8">Pivot — Şehir × Ürün Satış Özeti</H2>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="tab-sheet p-5"
      >
        <table className="w-full text-[11px]">
          <thead>
            <tr className="bg-[#6366f1] text-white">
              <th className="text-left px-3 py-2 font-semibold">Şehir / Ürün</th>
              <th className="text-right px-3 py-2 font-semibold">Laptop</th>
              <th className="text-right px-3 py-2 font-semibold">Telefon</th>
              <th className="text-right px-3 py-2 font-semibold">Tablet</th>
              <th
                className="text-right px-3 py-2 font-semibold"
                style={{ background: "#4f46e5" }}
              >
                Genel Toplam
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {[
              { c: "İstanbul", l: 124000, t: 89000, tab: 32000, total: 245000 },
              { c: "Ankara", l: 78000, t: 45000, tab: 18000, total: 141000 },
              { c: "İzmir", l: 92000, t: 51000, tab: 22000, total: 165000 },
              { c: "Bursa", l: 38000, t: 28000, tab: 12000, total: 78000 },
              { c: "Antalya", l: 42000, t: 31000, tab: 14000, total: 87000 },
            ].map((row, i) => (
              <motion.tr
                key={row.c}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.07 }}
                className={i % 2 === 0 ? "bg-indigo-50" : ""}
              >
                <td className="px-3 py-1.5 border-b border-gray-200 font-semibold">
                  {row.c}
                </td>
                <td className="px-3 py-1.5 border-b border-gray-200 text-right font-mono">
                  ₺{row.l.toLocaleString("tr-TR")}
                </td>
                <td className="px-3 py-1.5 border-b border-gray-200 text-right font-mono">
                  ₺{row.t.toLocaleString("tr-TR")}
                </td>
                <td className="px-3 py-1.5 border-b border-gray-200 text-right font-mono">
                  ₺{row.tab.toLocaleString("tr-TR")}
                </td>
                <td className="px-3 py-1.5 border-b border-gray-200 text-right font-mono font-bold bg-indigo-100">
                  ₺{row.total.toLocaleString("tr-TR")}
                </td>
              </motion.tr>
            ))}
            <motion.tr
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="bg-[#6366f1] text-white font-bold"
            >
              <td className="px-3 py-2">Genel Toplam</td>
              <td className="px-3 py-2 text-right font-mono">₺374.000</td>
              <td className="px-3 py-2 text-right font-mono">₺244.000</td>
              <td className="px-3 py-2 text-right font-mono">₺98.000</td>
              <td className="px-3 py-2 text-right font-mono">₺716.000</td>
            </motion.tr>
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 grid md:grid-cols-2 gap-3 text-xs text-gray-400"
      >
        <div className="tab-card-green rounded p-3 text-center">
          <span className="font-mono text-[#6366f1]">Satır:</span> Şehir
        </div>
        <div className="tab-card-green rounded p-3 text-center">
          <span className="font-mono text-[#6366f1]">Sütun:</span> Ürün ·{" "}
          <span className="font-mono text-[#6366f1]">Değer:</span> TOPLA(Satış)
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 26 — Tablodan grafik
  () => (
    <SlideShell>
      <Eyebrow>Görselleştir</Eyebrow>
      <H2 className="mb-10">Tablodan grafik &mdash; tek tuşa bas</H2>
      <div className="grid md:grid-cols-[1fr_1fr] gap-6 items-center">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="tab-sheet p-4"
        >
          <div className="text-xs font-bold mb-3 text-[#21a366]">Aylık Satış</div>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="bg-[#21a366] text-white">
                <th className="text-left px-2 py-1">Ay</th>
                <th className="text-right px-2 py-1">Satış</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {[
                ["Oca", "12.400"],
                ["Şub", "15.200"],
                ["Mar", "18.600"],
                ["Nis", "16.800"],
                ["May", "21.400"],
                ["Haz", "24.100"],
              ].map((row, i) => (
                <tr key={row[0]} className={i % 2 === 0 ? "bg-emerald-50" : ""}>
                  <td className="px-2 py-1 border-b border-gray-200 font-semibold">
                    {row[0]}
                  </td>
                  <td className="px-2 py-1 border-b border-gray-200 text-right font-mono">
                    ₺{row[1]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3 pt-2 border-t border-gray-200 flex items-center justify-center gap-2 text-[10px] text-gray-600">
            Veriyi seç →
            <kbd className="px-1.5 py-0.5 font-mono bg-emerald-100 border border-emerald-300 rounded">
              Alt+F1
            </kbd>
            → instant grafik
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="tab-sheet p-5"
        >
          <div className="text-center text-xs font-bold text-gray-900 mb-3">
            Aylık Satış Trendi
          </div>
          <div className="h-32 flex items-end justify-around gap-2 border-b-2 border-l-2 border-gray-300 pl-2 pr-2">
            {[
              { l: "Oca", v: 35 },
              { l: "Şub", v: 45 },
              { l: "Mar", v: 60 },
              { l: "Nis", v: 52 },
              { l: "May", v: 75 },
              { l: "Haz", v: 90 },
            ].map((b, i) => (
              <div
                key={b.l}
                className="flex flex-col items-center flex-1"
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${b.v}%` }}
                  transition={{ delay: 0.8 + i * 0.08, duration: 0.5 }}
                  className="w-full rounded-t-sm"
                  style={{
                    background: "linear-gradient(180deg, #34d399 0%, #21a366 100%)",
                  }}
                />
                <div className="text-[9px] text-gray-700 mt-1 font-semibold">
                  {b.l}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-center text-[10px] text-gray-500">
            ↑ Sütun grafik &middot; veri ile bağlı &middot; otomatik güncellenir
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  4. PRATİK & KAPANIŞ  ───────────────── */

  // 27 — Section: Pratik
  () => (
    <SectionDivider
      num="4"
      total="4"
      title="Pratik &amp; Kapanış"
      subtitle="Word ↔ Excel akışı, alternatifler, kısayollar, ödev"
      bgGradient="linear-gradient(135deg, #00ff41, #0e6802)"
      shadow="0 20px 60px -10px rgba(0, 255, 65, 0.5)"
      icon={<Keyboard className="w-16 h-16 text-black" />}
    />
  ),

  // 28 — Word ↔ Excel akışı
  () => (
    <SlideShell>
      <Eyebrow>Hangi Tablo Nereye?</Eyebrow>
      <H2 className="mb-10">Word Tabloları vs Excel</H2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="tab-card rounded-xl p-5"
          style={{ borderColor: "rgba(43,87,154,0.4)" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white"
              style={{ background: "#2b579a" }}
            >
              W
            </div>
            <div className="text-base font-semibold text-white">
              Word Tablosu
            </div>
          </div>
          <ul className="space-y-1.5 text-xs text-gray-400">
            <li className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#4a89dc] shrink-0 mt-0.5" />
              Staj raporunda küçük veri (≤20 satır)
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#4a89dc] shrink-0 mt-0.5" />
              Görsel — başlık, ürün özellikleri
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#4a89dc] shrink-0 mt-0.5" />
              Hafif hesap (TOPLA, ORTALAMA dahil)
            </li>
            <li className="flex items-start gap-2">
              <X className="w-3 h-3 text-red-400 shrink-0 mt-0.5" />
              Pivot, VLOOKUP yok
            </li>
            <li className="flex items-start gap-2">
              <X className="w-3 h-3 text-red-400 shrink-0 mt-0.5" />
              Büyük veri için yetersiz
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="tab-card rounded-xl p-5"
          style={{ borderColor: "rgba(33,163,102,0.4)" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-base tab-x-tile">
              X
            </div>
            <div className="text-base font-semibold text-white">Excel Tablosu</div>
          </div>
          <ul className="space-y-1.5 text-xs text-gray-400">
            <li className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#21a366] shrink-0 mt-0.5" />
              Sınırsız veri (1M+ satır)
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#21a366] shrink-0 mt-0.5" />
              500+ fonksiyon
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#21a366] shrink-0 mt-0.5" />
              Pivot, koşullu biçimlendirme, makro
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#21a366] shrink-0 mt-0.5" />
              17 grafik tipi
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#21a366] shrink-0 mt-0.5" />
              Word&apos;e &ldquo;canlı bağlı&rdquo; kopyalanabilir
            </li>
          </ul>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 tab-card-green rounded-lg p-4 text-center"
      >
        <div className="text-xs text-gray-300">
          Pratik kural:{" "}
          <span className="text-[#21a366] font-semibold">Veriyi Excel&apos;de hesapla</span>,{" "}
          sadece sonuç tablosunu Word&apos;e kopyala (Yapıştırma Seçenekleri →
          &ldquo;Bağlı Yapıştır&rdquo; → Excel&apos;de değişirse Word&apos;de güncellensin)
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 29 — Alternatifler
  () => (
    <SlideShell>
      <Eyebrow>Alternatifler</Eyebrow>
      <H2 className="mb-10">Google Sheets &amp; LibreOffice Calc</H2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="tab-card rounded-xl p-5"
          style={{ borderColor: "rgba(15,108,40,0.4)" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white"
              style={{ background: "#0f6c28" }}
            >
              S
            </div>
            <div className="text-base font-semibold text-white">
              Google Sheets
            </div>
          </div>
          <ul className="space-y-1.5 text-xs text-gray-400 mb-3">
            <li className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#0f6c28] shrink-0 mt-0.5" />
              %100 web tabanlı, ücretsiz
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#0f6c28] shrink-0 mt-0.5" />
              Gerçek zamanlı işbirliği (20+ kişi)
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#0f6c28] shrink-0 mt-0.5" />
              Otomatik kayıt + sürüm geçmişi
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#0f6c28] shrink-0 mt-0.5" />
              Excel formüllerinin %95&apos;i çalışır
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#0f6c28] shrink-0 mt-0.5" />
              QUERY, IMPORTRANGE gibi özel fonksiyonlar
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#0f6c28] shrink-0 mt-0.5" />
              Apps Script (JavaScript ile makro)
            </li>
          </ul>
          <div className="text-[10px] text-[#0f6c28] font-mono">
            sheets.google.com
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="tab-card rounded-xl p-5"
          style={{ borderColor: "rgba(24,163,3,0.4)" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white"
              style={{ background: "#18a303" }}
            >
              C
            </div>
            <div className="text-base font-semibold text-white">
              LibreOffice Calc
            </div>
          </div>
          <ul className="space-y-1.5 text-xs text-gray-400 mb-3">
            <li className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#18a303] shrink-0 mt-0.5" />
              %100 ücretsiz, açık kaynak
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#18a303] shrink-0 mt-0.5" />
              Windows · macOS · Linux
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#18a303] shrink-0 mt-0.5" />
              .xlsx açar, kaydeder
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#18a303] shrink-0 mt-0.5" />
              Native: .ods (OpenDocument)
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#18a303] shrink-0 mt-0.5" />
              Pivot, koşullu biçim, makro (LibreBasic)
            </li>
            <li className="flex items-start gap-2">
              <X className="w-3 h-3 text-red-400 shrink-0 mt-0.5" />
              Bulut işbirliği daha zayıf
            </li>
          </ul>
          <div className="text-[10px] text-[#18a303] font-mono">
            libreoffice.org
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 30 — Kısayollar
  () => (
    <SlideShell>
      <Eyebrow>Klavye Kısayolları</Eyebrow>
      <H2 className="mb-10">Excel için olmazsa olmaz 16 kısayol</H2>
      <div className="grid md:grid-cols-2 gap-3">
        {[
          { keys: ["Ctrl", "T"], desc: "Tablo formatına çevir" },
          { keys: ["Ctrl", "1"], desc: "Hücre Biçimi penceresi" },
          { keys: ["Ctrl", "Shift", "L"], desc: "Filtre aç/kapat" },
          { keys: ["Ctrl", "E"], desc: "Flash Fill" },
          { keys: ["F4"], desc: "Referans tipini değiştir ($A$1)" },
          { keys: ["Alt", "="], desc: "Otomatik TOPLAM (SUM)" },
          { keys: ["Alt", "F1"], desc: "Hızlı grafik (instant)" },
          { keys: ["Ctrl", "Shift", "+"], desc: "Satır/sütun ekle" },
          { keys: ["Ctrl", "-"], desc: "Satır/sütun sil" },
          { keys: ["Ctrl", ";"], desc: "Bugünün tarihini ekle" },
          { keys: ["Ctrl", "Shift", ":"], desc: "Şu anki saati ekle" },
          { keys: ["F2"], desc: "Hücreyi düzenle modu" },
          { keys: ["Ctrl", "Home"], desc: "A1 hücresine git" },
          { keys: ["Ctrl", "End"], desc: "Veri sonu hücresine git" },
          { keys: ["Ctrl", "Shift", "↓"], desc: "Sütun sonuna kadar seç" },
          { keys: ["Ctrl", "D"], desc: "Üst hücreyi aşağı kopyala" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + i * 0.03 }}
            className="tab-card rounded-lg px-5 py-2 flex items-center justify-between"
          >
            <div className="text-sm text-gray-300">{s.desc}</div>
            <div className="flex items-center gap-1">
              {s.keys.map((k, ki) => (
                <span key={k + ki} className="flex items-center gap-1">
                  <kbd className="px-2 py-0.5 text-[10px] font-mono bg-emerald-500/15 border border-emerald-400/30 rounded text-emerald-300 min-w-7 text-center">
                    {k}
                  </kbd>
                  {ki < s.keys.length - 1 && (
                    <span className="text-gray-600 text-[10px]">+</span>
                  )}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 31 — Yaygın hatalar
  () => (
    <SlideShell>
      <Eyebrow>Yapma!</Eyebrow>
      <H2 className="mb-10">Excel başlangıçta yapılan hatalar</H2>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          {
            t: "Tarih ve sayıları metin gibi yazma",
            d: "&ldquo;21.04.2026&rdquo; tarih olarak girmezsen, sıralama bozulur",
          },
          {
            t: "Birleştirilmiş hücre kullanma",
            d: "Pivot bozulur, sıralama yanlış çalışır — gerekmedikçe kaçın",
          },
          {
            t: "Formülde sabit sayı yazma",
            d: "=A1*0.18 yerine =A1*$KDV$1 — KDV değişirse 1 yerden değiştir",
          },
          {
            t: "Ham veri ve özetlemeyi karıştırma",
            d: "Ham veri 1 sayfada, özet/grafik başka sayfada olsun",
          },
          {
            t: "Boş satır ile veriyi bölmek",
            d: "Tablo formatı + pivot bozulur — ortada boş satır bırakma",
          },
          {
            t: "Otomatik dolduran formülleri kontrol etmemek",
            d: "Aşağı sürükledikten sonra rastgele 3-4 hücre kontrol et",
          },
        ].map((m, i) => (
          <motion.div
            key={m.t}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className="tab-card rounded-lg p-4 flex gap-3"
            style={{ borderColor: "rgba(239,68,68,0.25)" }}
          >
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-white">{m.t}</div>
              <div className="text-xs text-gray-400 mt-0.5">{m.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 32 — Ödev
  () => (
    <SlideShell>
      <Eyebrow>Bu Hafta</Eyebrow>
      <H2 className="mb-4">Ödev — Mini Veri Analisti Çalışması</H2>
      <Sub className="mb-8 !text-base">
        Kendi seçeceğin bir konuda 30+ satırlık bir Excel tablosu hazırla,
        analiz et, görselleştir.
      </Sub>
      <div className="grid md:grid-cols-3 gap-5">
        {[
          {
            n: "01",
            icon: Database,
            t: "Veri Topla",
            d: "30+ satır gerçek veri (örnek: aylık harcamalarım, sınıf notları, futbol takımı sezonu istatistikleri).",
            color: "#21a366",
          },
          {
            n: "02",
            icon: Calculator,
            t: "Analiz Et",
            d: "En az 3 formül kullan: SUM, AVERAGE, IF, VLOOKUP, COUNTIF. Koşullu biçimlendirme ekle.",
            color: "#f59e0b",
          },
          {
            n: "03",
            icon: BarChart3,
            t: "Görselleştir",
            d: "Pivot tablo + bir grafik (sütun veya pasta). Word'e kopyala (resim olarak veya bağlı).",
            color: "#6366f1",
          },
        ].map((task, i) => {
          const Icon = task.icon;
          return (
            <motion.div
              key={task.n}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="tab-card rounded-xl p-5"
              style={{ borderColor: `${task.color}40` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-white text-sm"
                  style={{ background: task.color }}
                >
                  {task.n}
                </div>
                <Icon className="w-5 h-5" style={{ color: task.color }} />
              </div>
              <div className="text-base font-semibold text-white mb-2">
                {task.t}
              </div>
              <div className="text-xs text-gray-400 leading-relaxed">
                {task.d}
              </div>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-center text-[11px] text-gray-500"
      >
        Teslim: <span className="font-mono text-[#21a366]">.xlsx</span>{" "}
        dosyası + 1 sayfalık Word raporu (tablonun ekran görüntüsü + 3 cümle
        yorum) → PDF&apos;e çevir →{" "}
        <span className="font-mono text-[#21a366]">
          AdSoyad_Hafta12.zip
        </span>
      </motion.div>
    </SlideShell>
  ),

  // 33 — Teşekkürler
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
        <H1 className="tab-shimmer">Teşekkürler</H1>
        <Sub className="mt-8 max-w-xl mx-auto">
          Sorularınız için sınıf saatinde &mdash; Çarşamba 09:55–12:30
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 inline-flex items-center gap-3 px-6 py-3 rounded-full tab-card"
        >
          <FileText className="w-4 h-4 text-[#00ff41]" />
          <span className="text-sm text-gray-300">
            BVA 1108 · Bilgi Teknolojileri · 12. Hafta — Tablolarla Çalışma
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10 text-[10px] text-gray-600 font-mono"
        >
          Kaynaklar: Microsoft (2025) · Google Workspace (2025) ·
          The Document Foundation · W. Edwards Deming
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
            background: "linear-gradient(90deg, #00ff41, #4dff80, #00ff41)",
            boxShadow: "0 0 16px rgba(0,255,65,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#00ff41]/70">
          BVA 1108 · 12. Hafta · Tablolarla Çalışma
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#00ff41]/50">
            <span className="text-[#00ff41]">
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
            className="p-1.5 text-gray-500 hover:text-[#00ff41] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#00ff41] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#00ff41]"
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

      <div className="absolute bottom-3 right-8 text-[9px] font-mono text-gray-700 z-50 hidden md:flex items-center gap-2">
        <Keyboard className="w-3 h-3" />
        <span>← → · F · Esc</span>
      </div>
    </div>
  );
}
