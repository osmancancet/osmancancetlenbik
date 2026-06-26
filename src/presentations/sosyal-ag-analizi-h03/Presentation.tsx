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
  Network,
  Globe,
  Code2,
  Terminal,
  Table2,
  FileJson,
  KeyRound,
  Clock,
  Layers,
  Filter,
  ListChecks,
  ClipboardList,
  ScrollText,
  ShieldCheck,
  AlertTriangle,
  Check,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  ArrowRight,
  Calendar,
  MapPin,
  Mail,
  GitBranch,
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

function CurlTerminal() {
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
          <Terminal className="w-3.5 h-3.5" />
          <span>arac@kampus:~ — REST API isteği (curl)</span>
        </div>
      </div>
      <div className="saa-terminal">
        <div>
          <span className="saa-term-prompt">arac@kampus</span>
          <span className="saa-term-dim">:~$</span>{" "}
          <span className="saa-term-cmd">
            curl -s -H &quot;Authorization: Bearer $TOKEN&quot; \
          </span>
        </div>
        <div className="saa-term-cmd pl-6">
          &quot;https://api.ornek.tr/v2/users/42/followers?page=1&amp;per_page=100&quot;
        </div>
        <div className="saa-term-dim mt-1">
          # 200 OK · X-RateLimit-Remaining: 48 · X-RateLimit-Reset: 540
        </div>
        <div className="mt-2 saa-term-dim">{"{"}</div>
        <div className="pl-4">
          <span className="saa-json-key">&quot;data&quot;</span>
          <span className="saa-json-punc">: [</span>
        </div>
        <div className="pl-8">
          <span className="saa-json-punc">{"{ "}</span>
          <span className="saa-json-key">&quot;id&quot;</span>
          <span className="saa-json-punc">: </span>
          <span className="saa-json-num">7</span>
          <span className="saa-json-punc">, </span>
          <span className="saa-json-key">&quot;username&quot;</span>
          <span className="saa-json-punc">: </span>
          <span className="saa-json-str">&quot;ayse&quot;</span>
          <span className="saa-json-punc">{" },"}</span>
        </div>
        <div className="pl-8">
          <span className="saa-json-punc">{"{ "}</span>
          <span className="saa-json-key">&quot;id&quot;</span>
          <span className="saa-json-punc">: </span>
          <span className="saa-json-num">9</span>
          <span className="saa-json-punc">, </span>
          <span className="saa-json-key">&quot;username&quot;</span>
          <span className="saa-json-punc">: </span>
          <span className="saa-json-str">&quot;mehmet&quot;</span>
          <span className="saa-json-punc">{" }"}</span>
        </div>
        <div className="pl-4 saa-json-punc">],</div>
        <div className="pl-4">
          <span className="saa-json-key">&quot;next_page&quot;</span>
          <span className="saa-json-punc">: </span>
          <span className="saa-json-num">2</span>
        </div>
        <div className="saa-term-dim">{"}"}</div>
        <div className="mt-2">
          <span className="saa-term-prompt">arac@kampus</span>
          <span className="saa-term-dim">:~$</span>{" "}
          <span className="saa-term-cmd">_</span>
          <span className="animate-pulse">█</span>
        </div>
      </div>
    </motion.div>
  );
}

function EdgeListMockup() {
  const rows: Array<[string, string, string]> = [
    ["42", "7", "follows"],
    ["42", "9", "follows"],
    ["7", "42", "follows"],
    ["9", "13", "follows"],
    ["13", "42", "follows"],
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="saa-card rounded-xl p-5 overflow-x-auto"
    >
      <div className="text-xs uppercase tracking-wider text-[#5eead4] mb-3 font-mono">
        followers.csv — kenar listesi (edge list)
      </div>
      <table className="saa-table">
        <thead>
          <tr>
            <th>source</th>
            <th>target</th>
            <th>relation</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([s, t, r], i) => (
            <tr key={i}>
              <td className="font-mono text-[#a7f3d0]">{s}</td>
              <td className="font-mono text-[#a7f3d0]">{t}</td>
              <td className="font-mono">{r}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 text-xs text-gray-500">
        JSON yanıtındaki her bağlantı, bir{" "}
        <span className="text-[#5eead4]">kaynak → hedef</span> satırına dönüşür.
        NetworkX bu CSV&apos;yi tek satırda grafa çevirir.
      </div>
    </motion.div>
  );
}

function ApiConceptTable() {
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
            <th style={{ width: "20%" }}>Kavram</th>
            <th style={{ width: "38%" }}>Ne demek?</th>
            <th>Veri toplarken neden önemli?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="saa-row-head">Endpoint</td>
            <td>İstek attığın adres — örn. /users/42/followers.</td>
            <td>Hangi ilişki türünü çektiğini belirler (takipçi, beğeni, yorum).</td>
          </tr>
          <tr>
            <td className="saa-row-head">Kimlik doğrulama</td>
            <td>API anahtarı veya OAuth token ile yetkilendirme.</td>
            <td>Tokensız çoğu uç nokta veri vermez; anahtarı gizli tut.</td>
          </tr>
          <tr>
            <td className="saa-row-head">Rate limit</td>
            <td>Birim zamanda izin verilen istek sayısı (örn. 15 dk / 50 istek).</td>
            <td>Aşınca 429 hatası gelir; bekleyip tekrar denemek gerekir.</td>
          </tr>
          <tr>
            <td className="saa-row-head">Sayfalama</td>
            <td>Sonuçların page / cursor ile parça parça dönmesi.</td>
            <td>Tüm ağı almak için döngüyle next_page&apos;i takip edersin.</td>
          </tr>
        </tbody>
      </table>
    </motion.div>
  );
}

function FormatTable() {
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
            <th style={{ width: "16%" }}>Format</th>
            <th style={{ width: "26%" }}>Yapı</th>
            <th style={{ width: "30%" }}>Avantaj</th>
            <th>Tipik kullanım</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="saa-row-head">Edge list (CSV)</td>
            <td>source, target satırları</td>
            <td>En sade · her araçla okunur · kolay düzenlenir</td>
            <td>İlk veri toplama, hızlı içe aktarma</td>
          </tr>
          <tr>
            <td className="saa-row-head">Adjacency matrix</td>
            <td>n×n 0/1 (ya da ağırlık) matrisi</td>
            <td>Matematiksel işlem · hızlı sorgu</td>
            <td>Küçük ağlar, lineer cebir hesapları</td>
          </tr>
          <tr>
            <td className="saa-row-head">GraphML / GEXF</td>
            <td>XML tabanlı · düğüm &amp; kenar öznitelikleri</td>
            <td>Etiket, renk, ağırlık birlikte saklanır</td>
            <td>Gephi&apos;ye aktarım, görselleştirme</td>
          </tr>
          <tr>
            <td className="saa-row-head">JSON</td>
            <td>nodes[] ve links[] dizileri</td>
            <td>API çıktısına yakın · web&apos;de doğrudan kullanılır</td>
            <td>D3.js, web tabanlı interaktif grafikler</td>
          </tr>
        </tbody>
      </table>
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
        <Eyebrow>BVA 2105 · 3. Hafta — Sosyal Ağ Analizi</Eyebrow>
        <H1>
          <span className="saa-shimmer">Sosyal Ağ Verisi</span>
          <br />
          <span className="text-white/90">Nasıl Toplanır?</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Analiz etmeden önce veriyi toplamak gerekir. Bu hafta veriyi nereden ve
          hangi yöntemle alacağımıza bakıyoruz: API, web scraping ve anket.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Code2}
            title="API ile toplama"
            desc="Resmi uç noktalardan yapısal veri çekme — token, rate limit, sayfalama."
            delay={0.3}
            accent="#14b8a6"
          />
          <FeatureCard
            icon={Globe}
            title="Web scraping"
            desc="API olmadığında HTML&apos;den veri ayıklama ve sınırları."
            delay={0.45}
            accent="#0d9488"
          />
          <FeatureCard
            icon={ClipboardList}
            title="Anket &amp; örnekleme"
            desc="Çevrimdışı ağlar için anket ve kartopu örnekleme."
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
          Cuma · 09:55 — 11:35 · Uygulamalı (Python + requests)
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Köprü: geçen hafta → bu hafta ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 2. haftadan 3. haftaya</Eyebrow>
      <H2>Görseli çizdik; peki o veri nereden geldi?</H2>
      <Sub className="mt-3 max-w-3xl">
        2. haftada hazır bir ağı Gephi ile görselleştirdik. Ama gerçek bir projede
        ilk iş veriyi toplamaktır. &quot;Çöp girer, çöp çıkar&quot; — yanlış
        toplanmış veri, en güzel merkezilik hesabını bile anlamsız kılar.
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
            <span className="text-xs font-mono uppercase tracking-widest">
              Şimdiye kadar
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              Düğüm, kenar, merkezilik ölçüleri (Hafta 1)
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              Görselleştirme ve düzen algoritmaları (Hafta 2)
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              Hep hazır veri setleriyle çalıştık (Karate Club).
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5eead4]">
            <Database className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Bu haftanın hedefi
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              Kendi ağ verini sıfırdan toplayabilmek.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              Yöntem seçimi: ne zaman API, ne zaman scraping, ne zaman anket?
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              Ham veriyi kenar listesine dönüştürebilmek.
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. Dersin akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: kaynaklar → API → scraping &amp; anket</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce veriyi nereden alabileceğimizi karşılaştırıyoruz; sonra en yapısal
        yol olan API&apos;yi açıyoruz; en son scraping ve anket yöntemlerini ele
        alıp veriyi formatlara bağlıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "Veri Kaynakları",
            items: ["Dört ana yöntem", "Karşılaştırma", "Bir ilişki = bir satır"],
            icon: Database,
            accent: "#14b8a6",
          },
          {
            range: "02",
            title: "API ile Toplama",
            items: ["Endpoint & token", "Rate limit & sayfalama", "JSON → kenar listesi"],
            icon: Code2,
            accent: "#0d9488",
          },
          {
            range: "03",
            title: "Scraping & Anket",
            items: ["HTML ayıklama", "robots.txt & etik", "Veri formatları"],
            icon: Globe,
            accent: "#2dd4bf",
          },
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
                <div
                  className="text-[10px] font-mono uppercase tracking-widest"
                  style={{ color: g.accent }}
                >
                  Durak {g.range}
                </div>
                <div className="text-lg font-semibold text-white">{g.title}</div>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-400">
              {g.items.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <ChevronRight
                    className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                    style={{ color: g.accent }}
                  />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 4. Bölüm 1 — Veri kaynakları ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Veri Nereden Gelir?"
      subtitle="Sosyal ağ verisi tek bir yerden gelmez. Dört temel yöntemin her birinin maliyeti, kapsamı ve sınırı farklıdır."
      bgGradient="linear-gradient(135deg, #14b8a6, #0d9488)"
      shadow="0 30px 80px -20px rgba(20, 184, 166, 0.6)"
      icon={<Database className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 5. Dört yöntem karşılaştırma ───── */
  () => (
    <SlideShell>
      <Eyebrow>Dört temel yöntem</Eyebrow>
      <H2 className="mb-2">Veriyi toplamanın dört yolu</H2>
      <Sub className="max-w-3xl mb-8">
        Hangisini seçeceğin platforma, bütçeye ve etik/yasal sınırlara bağlıdır.
        Çoğu projede birden fazlası birlikte kullanılır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FeatureCard
          icon={Code2}
          title="Resmi API"
          desc="Platformun sunduğu uç noktalar. Yapısal, güvenilir; ama kota ve erişim kısıtları var."
          accent="#14b8a6"
          delay={0.1}
        />
        <FeatureCard
          icon={Globe}
          title="Web scraping"
          desc="HTML sayfasından veri ayıklama. API yokken işe yarar; kırılgan ve kullanım şartlarına tabidir."
          accent="#0d9488"
          delay={0.2}
        />
        <FeatureCard
          icon={ClipboardList}
          title="Anket / saha"
          desc="&quot;Kiminle yakınsın?&quot; gibi sorular. Çevrimdışı ilişkiler için tek yol; öznel ve emek yoğun."
          accent="#2dd4bf"
          delay={0.3}
        />
        <FeatureCard
          icon={Database}
          title="Hazır veri setleri"
          desc="SNAP, Network Repository, Kaggle gibi arşivler. Hızlı başlangıç; ama soruna birebir uymayabilir."
          accent="#5eead4"
          delay={0.4}
        />
      </div>
    </SlideShell>
  ),

  /* ───── 6. Bir ilişki bir satıra nasıl dönüşür ───── */
  () => (
    <SlideShell>
      <Eyebrow>Temel fikir</Eyebrow>
      <H2 className="mb-2">Her ilişki bir satıra dönüşür</H2>
      <Sub className="max-w-3xl mb-8">
        Veriyi hangi yöntemle toplarsan topla, hedef hep aynı: bir{" "}
        <span className="text-[#5eead4]">kaynak</span> ve bir{" "}
        <span className="text-[#5eead4]">hedef</span> düğümünden oluşan kenar
        listesi. Ağ analizinin ortak dili budur.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-[#5eead4] mb-4">
            Gerçek dünya olayı
          </div>
          <div className="flex items-center justify-center gap-4 py-4">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#0d9488] border-2 border-[#5eead4] flex items-center justify-center text-white font-bold mx-auto saa-node-pulse">
                Ali
              </div>
              <div className="text-[11px] text-gray-500 mt-2">@ali</div>
            </div>
            <div className="flex flex-col items-center">
              <ArrowRight className="w-7 h-7 text-[#5eead4]" />
              <span className="text-[10px] font-mono text-[#5eead4] mt-1">
                takip etti
              </span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#1f2937] border-2 border-gray-500 flex items-center justify-center text-white font-bold mx-auto">
                Ayşe
              </div>
              <div className="text-[11px] text-gray-500 mt-2">@ayse</div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-[#5eead4] mb-4">
            Veri satırı
          </div>
          <div className="font-mono text-sm space-y-2">
            <div className="bg-black/40 rounded px-3 py-2 text-gray-400">
              source,target,relation
            </div>
            <div className="bg-black/40 rounded px-3 py-2 text-[#a7f3d0]">
              ali,ayse,follows
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-400 leading-relaxed">
            <span className="text-[#5eead4]">follows</span> yönlü bir ilişki — Ali
            → Ayşe, Ayşe → Ali ile aynı değil. Arkadaşlık olsaydı yönsüz tek satır
            yeterdi.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 7. Bölüm 2 — API ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="API ile Veri Toplama"
      subtitle="En temiz ve en sürdürülebilir yöntem. Platform sana yapısal veriyi kurallı bir şekilde verir; karşılığında onun kotalarına uyarsın."
      bgGradient="linear-gradient(135deg, #0d9488, #134e4a)"
      shadow="0 30px 80px -20px rgba(13, 148, 136, 0.6)"
      icon={<Code2 className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 8. API kavramları tablosu ───── */
  () => (
    <SlideShell>
      <Eyebrow>API · dört temel kavram</Eyebrow>
      <H2 className="mb-2">İstek atmadan önce bilinmesi gerekenler</H2>
      <Sub className="max-w-3xl mb-6">
        Bir API&apos;den ağ verisi çekerken aynı dört kavramla tekrar tekrar
        karşılaşırsın. Bunları anlamadan döngü kuran kod, yarı yolda 429 hatasıyla
        durur.
      </Sub>
      <ApiConceptTable />
    </SlideShell>
  ),

  /* ───── 9. curl terminal ───── */
  () => (
    <SlideShell>
      <Eyebrow>Canlı istek · curl</Eyebrow>
      <H2 className="mb-2">Bir takipçi listesini çekmek</H2>
      <Sub className="max-w-3xl mb-6">
        Token&apos;ı başlığa koyar, kullanıcının takipçilerini sayfa sayfa
        isteriz. Yanıt başlıklarında kalan kotayı (X-RateLimit-Remaining) takip
        etmek şarttır.
      </Sub>
      <CurlTerminal />
    </SlideShell>
  ),

  /* ───── 10. JSON → kenar listesi ───── */
  () => (
    <SlideShell>
      <Eyebrow>Ham veriyi düzleştirmek</Eyebrow>
      <H2 className="mb-2">JSON yanıtından kenar listesine</H2>
      <Sub className="max-w-3xl mb-6">
        API&apos;den gelen iç içe JSON doğrudan analiz edilmez. Her takipçi
        ilişkisini bir <span className="text-[#5eead4]">kaynak → hedef</span>{" "}
        satırına indirip CSV&apos;ye yazarız — analiz hep buradan başlar.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-center">
        <div className="md:col-span-3">
          <EdgeListMockup />
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-2 space-y-3"
        >
          <div className="saa-card rounded-lg p-4 flex items-start gap-3">
            <FileJson className="w-5 h-5 text-[#5eead4] mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-300">
              JSON&apos;daki her <span className="text-[#5eead4]">data[]</span>{" "}
              öğesi bir kenar.
            </span>
          </div>
          <div className="saa-card rounded-lg p-4 flex items-start gap-3">
            <KeyRound className="w-5 h-5 text-[#5eead4] mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-300">
              Kullanıcı id&apos;leri istikrarlı bir{" "}
              <span className="text-[#5eead4]">düğüm kimliği</span> sağlar;
              kullanıcı adı değişebilir.
            </span>
          </div>
          <div className="saa-card rounded-lg p-4 flex items-start gap-3">
            <Table2 className="w-5 h-5 text-[#5eead4] mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-300">
              CSV hazırsa{" "}
              <span className="font-mono text-[#a7f3d0]">
                nx.read_edgelist()
              </span>{" "}
              ile graf bir satırda kurulur.
            </span>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 11. Bölüm 3 — Scraping & Anket ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Scraping, Anket &amp; Formatlar"
      subtitle="API olmadığında HTML ayıklarız; çevrimdışı ağlar için anket yaparız. Hepsinde aynı sorumluluk: etik, izin ve doğru format."
      bgGradient="linear-gradient(135deg, #0d9488, #115e59)"
      shadow="0 30px 80px -20px rgba(13, 148, 136, 0.6)"
      icon={<Globe className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 12. Scraping vs Anket + etik ───── */
  () => (
    <SlideShell>
      <Eyebrow>İki tamamlayıcı yöntem</Eyebrow>
      <H2 className="mb-8">Web scraping ve anket</H2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Globe className="w-6 h-6 text-[#5eead4]" />
            <h3 className="text-xl font-semibold text-white">Web scraping</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            <span className="font-mono text-[#a7f3d0]">requests</span> +{" "}
            <span className="font-mono text-[#a7f3d0]">BeautifulSoup</span> ile
            sayfanın HTML&apos;inden ilgilenilen alanları seçeriz.
          </p>
          <ul className="text-sm text-gray-400 space-y-1.5">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              API yoksa ya da yetersizse devreye girer.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              Sayfa tasarımı değişince kod kırılır — kırılgandır.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              Yavaş ve nazik ol: istekler arasına bekleme koy.
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <ClipboardList className="w-6 h-6 text-[#5eead4]" />
            <h3 className="text-xl font-semibold text-white">Anket &amp; örnekleme</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Çevrimdışı ilişkiler için katılımcılara sorulur:{" "}
            <span className="text-[#5eead4]">
              &quot;Bu kişilerden hangileriyle düzenli görüşürsün?&quot;
            </span>
          </p>
          <ul className="text-sm text-gray-400 space-y-1.5">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              <span>
                <span className="text-[#5eead4]">Kartopu örnekleme:</span> her
                katılımcı yeni isimler verir, ağ büyür.
              </span>
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              Sınıf, ekip, köy gibi kapalı gruplar için idealdir.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              Hatırlama yanlılığı ve eksik yanıt sık görülür.
            </li>
          </ul>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 saa-card-teal rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <ShieldCheck className="w-4 h-4 text-[#5eead4] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Etik &amp; yasal:</span>{" "}
          <span className="font-mono text-[#a7f3d0]">robots.txt</span> ve kullanım
          şartlarına uy; kişisel veride KVKK geçerlidir; ankette aydınlatılmış
          onam alınır. İzin, yöntemden önce gelir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 13. Veri formatları tablosu ───── */
  () => (
    <SlideShell>
      <Eyebrow>Veriyi saklamak</Eyebrow>
      <H2 className="mb-2">Ağ verisi hangi formatta tutulur?</H2>
      <Sub className="max-w-3xl mb-6">
        Topladığın veriyi doğru formata yazarsan, sonraki haftalarda NetworkX ve
        Gephi&apos;ye sürtünmesiz aktarırsın. Aynı ağ farklı formatlarda
        saklanabilir.
      </Sub>
      <FormatTable />
    </SlideShell>
  ),

  /* ───── 14. Uygulamalı lab ───── */
  () => {
    const items: Array<{ t: string; d: string; icon: LucideIcon }> = [
      {
        t: "Bir veri kaynağı seç",
        d: "Halka açık bir API ya da izinli bir sayfa. Hangi ilişkiyi (takip, yorum) toplayacağını yaz.",
        icon: Database,
      },
      {
        t: "10–20 düğümlük örnek çek",
        d: "requests ile küçük bir istek at; rate limit&apos;e takılmadan örnek bir alt ağ topla.",
        icon: Code2,
      },
      {
        t: "Kenar listesine dönüştür",
        d: "Ham yanıtı source,target,relation kolonlu bir CSV&apos;ye yaz; tekrar eden kenarları temizle.",
        icon: Table2,
      },
      {
        t: "NetworkX ile yükle & doğrula",
        d: "nx.read_edgelist ile grafı kur; düğüm/kenar sayısını yazdırıp veriyi gözle kontrol et.",
        icon: ListChecks,
      },
    ];
    return (
      <SlideShell>
        <Eyebrow>Bu hafta · uygulamalı görev</Eyebrow>
        <H2 className="mb-3">Kendi mini ağını topla</H2>
        <Sub className="max-w-3xl mb-6">
          Hedef: küçük ama gerçek bir ağ verisini sıfırdan toplayıp temiz bir
          kenar listesine indirmek. Sonraki derse CSV&apos;n hazır gel.
        </Sub>
        <div className="space-y-3">
          {items.map((it, i) => (
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
          transition={{ delay: 0.6 }}
          className="mt-5 saa-card-teal rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
        >
          <AlertTriangle className="w-4 h-4 text-[#fde68a] mt-0.5 flex-shrink-0" />
          <span>
            <span className="text-white">Sadece izinli ve halka açık veri.</span>{" "}
            Kişisel veriyi anonimleştir; kullanım şartlarını ve{" "}
            <span className="font-mono text-[#a7f3d0]">robots.txt</span>&apos;yi
            çiğneme.
          </span>
        </motion.div>
      </SlideShell>
    );
  },

  /* ───── 15. Sonraki hafta + kapanış ───── */
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
          <GitBranch className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>3. hafta tamamlandı · sıradaki: Yönlü &amp; ağırlıklı ağlar</Eyebrow>
        <H1 className="saa-shimmer-teal">Veriyi Topladık</H1>
        <Sub className="mt-6">
          Elimizde artık ham bir kenar listesi var. 4. haftada bu kenarlara{" "}
          <span className="text-[#5eead4]">yön ve ağırlık</span> ekleyip ilişkinin
          gücünü modelleyeceğiz.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 text-left">
          <div className="saa-card rounded-xl p-5">
            <Layers className="w-5 h-5 text-[#5eead4] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">
              Konu
            </div>
            <div className="text-white font-semibold">Yönlü &amp; ağırlıklı</div>
            <div className="text-sm text-gray-400">in/out-degree, kenar ağırlığı</div>
          </div>
          <div className="saa-card rounded-xl p-5">
            <Filter className="w-5 h-5 text-[#5eead4] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">
              Hazırlık
            </div>
            <div className="text-white font-semibold">Topladığın CSV</div>
            <div className="text-sm text-gray-400">temiz kenar listesi getir</div>
          </div>
          <div className="saa-card rounded-xl p-5">
            <ScrollText className="w-5 h-5 text-[#5eead4] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">
              Teslim
            </div>
            <div className="text-white font-semibold">Mini ağ verisi</div>
            <div className="text-sm text-gray-400">kaynak notuyla birlikte</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left"
        >
          <div className="saa-card rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#14b8a6]/15 border border-[#14b8a6]/35 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-[#5eead4]" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">
                Ders Saati
              </div>
              <div className="text-sm font-semibold text-white">
                Cuma · 09:55 – 11:35
              </div>
            </div>
          </div>
          <div className="saa-card rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#14b8a6]/15 border border-[#14b8a6]/35 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-[#5eead4]" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">
                Derslik
              </div>
              <div className="text-sm font-semibold text-white">
                MYO · Derslik 7
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
          <Clock className="w-3.5 h-3.5" />
          BVA 2105 · Sosyal Ağ Analizi · 2026 Bahar
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
          BVA 2105 · 3. Hafta · Veri Toplama Yöntemleri
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
