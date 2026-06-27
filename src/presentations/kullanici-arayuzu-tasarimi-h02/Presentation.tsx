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
  Search,
  MessageSquare,
  Users,
  Eye,
  ClipboardList,
  FileText,
  BarChart3,
  Mic,
  Quote,
  Tag,
  Target,
  Calendar,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ListChecks,
  Layers,
  Lightbulb,
  Clock,
  Hash,
  ThumbsUp,
  HelpCircle,
  PenTool,
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

function SurveyMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="katas-window-chrome w-full max-w-3xl mx-auto"
    >
      <div className="katas-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] flex-1 max-w-md mx-auto text-center justify-center font-mono"
          style={{ background: "#0d0d0d", color: "#f9a8d4" }}
        >
          <ClipboardList className="w-3.5 h-3.5" />
          <span>forms.google.com — Mobil Bankacılık Anketi</span>
        </div>
      </div>
      <div className="katas-survey-screen">
        <div className="katas-survey-header" />
        <div className="p-6">
          <div className="text-lg font-bold text-gray-900">Mobil bankacılık alışkanlıkları</div>
          <div className="text-xs text-gray-500 mt-1 mb-5">3 soru · tahmini 2 dakika · anonim</div>

          {/* Kapalı uçlu — tekli seçim */}
          <div className="mb-5">
            <div className="text-sm font-semibold text-gray-800 mb-1">
              1. Uygulamayı en sık ne için açıyorsunuz? <span className="text-pink-500">*</span>
            </div>
            <div className="text-[10px] text-gray-400 mb-2 font-mono">tip: kapalı uçlu (tekli seçim)</div>
            <div className="space-y-1.5">
              {[
                { t: "Bakiye / hesap görüntüleme", on: true },
                { t: "Para transferi (EFT/Havale)", on: false },
                { t: "Fatura / kart ödemesi", on: false },
                { t: "Yatırım işlemleri", on: false },
              ].map((o) => (
                <div key={o.t} className="flex items-center gap-2.5">
                  <span className={`katas-radio ${o.on ? "katas-radio-on" : ""}`} />
                  <span className="text-[13px] text-gray-700">{o.t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Likert ölçek */}
          <div className="mb-5">
            <div className="text-sm font-semibold text-gray-800 mb-2">
              2. &quot;Transfer ekranını kolay buluyorum.&quot;
            </div>
            <div className="flex items-center justify-between max-w-sm">
              <span className="text-[10px] text-gray-400">Kesinlikle katılmıyorum</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n} className={`katas-scale-dot ${n === 2 ? "katas-scale-dot-on" : ""}`}>
                    {n}
                  </span>
                ))}
              </div>
              <span className="text-[10px] text-gray-400">Kesinlikle katılıyorum</span>
            </div>
          </div>

          {/* Açık uçlu */}
          <div>
            <div className="text-sm font-semibold text-gray-800 mb-1">
              3. Sizi en çok zorlayan tek bir şey nedir?
            </div>
            <div className="text-[10px] text-gray-400 mb-2 font-mono">tip: açık uçlu (serbest metin)</div>
            <div className="border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-500 italic bg-gray-50">
              &quot;Alıcı eklerken IBAN&apos;ı her seferinde tekrar yazmak...&quot;
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function InterviewTranscriptMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="katas-window-chrome w-full max-w-3xl mx-auto"
    >
      <div className="katas-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] flex-1 max-w-md mx-auto text-center justify-center font-mono"
          style={{ background: "#0d0d0d", color: "#f9a8d4" }}
        >
          <Mic className="w-3.5 h-3.5" />
          <span>gorusme-P03.txt — transkript + kodlama (coding)</span>
        </div>
      </div>
      <div className="katas-transcript">
        <div>
          <span className="katas-transcript-q">S:</span>{" "}
          <span className="text-gray-400">Bana en son nasıl para gönderdiğini anlatır mısın?</span>
        </div>
        <div className="mt-2">
          <span className="katas-transcript-q">K:</span>{" "}
          <span className="katas-transcript-a">
            Önce ekranda alıcıyı arıyorum ama kayıtlı listede yok, sonra IBAN&apos;ı
            mesajdan kopyalıyorum...
          </span>{" "}
          <span className="katas-transcript-tag">kod: alıcı bulma zorluğu</span>
        </div>
        <div className="mt-2">
          <span className="katas-transcript-q">K:</span>{" "}
          <span className="katas-transcript-a">
            ...yapıştırınca &quot;geçersiz&quot; dedi, baştaki TR&apos;yi silmem gerekiyormuş,
            bunu nereden bileceğim.
          </span>{" "}
          <span className="katas-transcript-tag">kod: hata mesajı belirsiz</span>
        </div>
        <div className="mt-2">
          <span className="katas-transcript-q">S:</span>{" "}
          <span className="text-gray-400">O an ne hissettin?</span>{" "}
          <span className="text-[10px] text-gray-600">(takip sorusu — &quot;neden?&quot;)</span>
        </div>
        <div className="mt-2">
          <span className="katas-transcript-q">K:</span>{" "}
          <span className="katas-transcript-a">
            Açıkçası uygulamayı kapatıp internet şubesinden yapasım geldi.
          </span>{" "}
          <span className="katas-transcript-tag">kod: kanal terk etme</span>
        </div>
        <div className="mt-3 text-[10px] text-gray-600">
          ── Üç farklı görüşmede aynı &quot;kod&quot; tekrar ederse, bu bir desen (tema) olur. ──
        </div>
      </div>
    </motion.div>
  );
}

function OpenVsClosedTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="mt-6 katas-card rounded-xl p-1"
    >
      <table className="katas-tbl">
        <thead>
          <tr>
            <th style={{ width: "22%" }}>Soru tipi</th>
            <th style={{ width: "30%" }}>Örnek</th>
            <th style={{ width: "24%" }}>Verir</th>
            <th>Dikkat</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-white font-semibold">Kapalı uçlu</td>
            <td className="font-mono text-[12px] text-[#f9a8d4]">&quot;Ne sıklıkla kullanırsın?&quot;</td>
            <td>Sayılabilir, karşılaştırılabilir veri (nicel)</td>
            <td>Seçenek dışı cevabı kaçırır.</td>
          </tr>
          <tr>
            <td className="text-white font-semibold">Açık uçlu</td>
            <td className="font-mono text-[12px] text-[#f9a8d4]">&quot;Bu adımı anlat...&quot;</td>
            <td>Bağlam, neden, beklenmedik içgörü (nitel)</td>
            <td>Analizi zaman alır, kodlama gerekir.</td>
          </tr>
          <tr>
            <td className="text-white font-semibold">Likert ölçek</td>
            <td className="font-mono text-[12px] text-[#f9a8d4]">&quot;1–5: katılıyorum&quot;</td>
            <td>Tutum / memnuniyet trendi (nicel)</td>
            <td>Orta seçenek &quot;kaçış&quot; olabilir.</td>
          </tr>
          <tr>
            <td className="text-white font-semibold">Yönlendirici</td>
            <td className="font-mono text-[12px] text-[#f87171]">&quot;Bu özelliği sevdin değil mi?&quot;</td>
            <td>Yanlı, çöp veri</td>
            <td className="text-[#fca5a5]">Asla kullanma — cevabı sen söylemiş olursun.</td>
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
        <Eyebrow>BVA 2245 · 2. Hafta · Kullanıcı Araştırması</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl font-bold tracking-tight leading-[1] mb-6"
        >
          <span className="katas-shimmer">Kullanıcı Araştırması</span>
          <br />
          <span className="text-white">Anket · Görüşme · Gözlem</span>
        </motion.h1>
        <Sub className="mt-6 max-w-3xl mx-auto">
          Tasarımı varsayımla değil, kanıtla yaparız. Bu hafta kullanıcıyı anlamanın
          üç temel yöntemini ve hangi durumda hangisini seçeceğimizi öğreniyoruz.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={MessageSquare}
            title="Anket"
            desc="Çok kişi, az derinlik. Ölçülebilir nicel veri ve trend."
            delay={0.3}
            accent="#ec4899"
          />
          <FeatureCard
            icon={Users}
            title="Görüşme"
            desc="Az kişi, çok derinlik. &quot;Neden&quot;in peşine düşen nitel veri."
            delay={0.45}
            accent="#a855f7"
          />
          <FeatureCard
            icon={Eye}
            title="Gözlem"
            desc="Söylenen değil, yapılan. Bağlamdaki gerçek davranış."
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
          Cuma · 15:20 — 17:00 · EnerjiSA Bil. Lab 1
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Köprü: geçen hafta → bu hafta ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 1. haftadan 2. haftaya</Eyebrow>
      <H2>Geçen hafta &quot;iyi tasarım&quot; dedik; peki iyiyi kim tanımlar?</H2>
      <Sub className="mt-3 max-w-3xl">
        1. haftada UI/UX ayrımını ve UX sürecinin <em>Empathize</em> (anla) adımıyla
        başladığını gördük. O adımın yakıtı veridir. Tasarımcının kendi sezgisi değil,
        gerçek kullanıcının ihtiyacı yön verir. Bu hafta o veriyi nasıl topladığımızı işliyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="katas-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#f87171]">
            <XCircle className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Sezgiyle tasarım</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ec4899] flex-shrink-0" />&quot;Bence kullanıcı şunu ister.&quot;</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ec4899] flex-shrink-0" />Tasarımcı = kullanıcı varsayımı.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ec4899] flex-shrink-0" />Hata pahalı çıkar — kod yazıldıktan sonra.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="katas-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Kanıtla tasarım</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />&quot;Kullanıcı şunu yaptığını söyledi / yaptı.&quot;</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Kararlar veriyle savunulabilir.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Hata ucuz çıkar — tek çizgi çizilmeden önce.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. Dersin akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç yöntem: ölç, dinle, izle</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce çok kişiden ölçülebilir veri toplayan anketi; sonra az kişiyle derinleşen
        görüşmeyi; en son söze değil eyleme bakan gözlemi inceliyoruz. Sonunda kendi
        çalışmanı kurguladığın bir alıştırma.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Anket", items: ["Açık vs kapalı uçlu soru", "Likert ölçek", "Örneklem ve yanlılık"], icon: MessageSquare, accent: "#ec4899" },
          { range: "02", title: "Görüşme", items: ["Yarı yapılandırılmış akış", "Açık uçlu sorma sanatı", "Transkript & kodlama"], icon: Users, accent: "#a855f7" },
          { range: "03", title: "Gözlem", items: ["Bağlamsal araştırma", "Söylenen ≠ yapılan", "Saha notu & alanlar"], icon: Eye, accent: "#3b82f6" },
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
                <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: g.accent }}>Yöntem {g.range}</div>
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

  /* ───── 4. Nicel vs Nitel ───── */
  () => (
    <SlideShell>
      <Eyebrow>Temel ayrım</Eyebrow>
      <H2 className="mb-2">Nicel mi, nitel mi? — &quot;Kaç&quot; ve &quot;neden&quot;</H2>
      <Sub className="max-w-3xl mb-8">
        Her yöntem bu iki sorudan birine daha iyi cevap verir. İyi bir araştırma
        genelde ikisini birleştirir: önce nitelle keşfet, sonra nicelle doğrula.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="katas-card-rose rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-6 h-6 text-pink-300" />
            <span className="text-xs font-mono uppercase tracking-widest text-pink-300">Nicel · &quot;Kaç / ne kadar&quot;</span>
          </div>
          <div className="text-sm text-gray-300 leading-relaxed mb-4">
            Sayılarla ifade edilir; çok kişide ölçülür, istatistikle özetlenir.
            <strong className="text-pink-200"> Ne olduğunu</strong> ve ne sıklıkta olduğunu söyler.
          </div>
          <div className="space-y-1.5 text-xs text-gray-400">
            <div className="flex gap-2"><ChevronRight className="w-3.5 h-3.5 text-pink-400 mt-0.5" />Yöntem: Anket, Likert, analitik</div>
            <div className="flex gap-2"><ChevronRight className="w-3.5 h-3.5 text-pink-400 mt-0.5" />Örnek: &quot;%62 transferi zor buluyor&quot;</div>
            <div className="flex gap-2"><ChevronRight className="w-3.5 h-3.5 text-pink-400 mt-0.5" />Çok katılımcı, az derinlik</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="katas-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Quote className="w-6 h-6 text-[#c4b5fd]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#c4b5fd]">Nitel · &quot;Neden / nasıl&quot;</span>
          </div>
          <div className="text-sm text-gray-300 leading-relaxed mb-4">
            Sözlerle, davranışla ifade edilir; az kişide derinleşir.
            <strong className="text-purple-200"> Neden olduğunu</strong> ve bağlamı açıklar.
          </div>
          <div className="space-y-1.5 text-xs text-gray-400">
            <div className="flex gap-2"><ChevronRight className="w-3.5 h-3.5 text-purple-400 mt-0.5" />Yöntem: Görüşme, gözlem, günlük</div>
            <div className="flex gap-2"><ChevronRight className="w-3.5 h-3.5 text-purple-400 mt-0.5" />Örnek: &quot;IBAN&apos;daki TR&apos;yi silmem gerekti&quot;</div>
            <div className="flex gap-2"><ChevronRight className="w-3.5 h-3.5 text-purple-400 mt-0.5" />Az katılımcı, çok derinlik</div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 5. Bölüm 1 — Anket ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Anket — Geniş Kitleden Ölç"
      subtitle="Tek formla yüzlerce kişiye ulaşan en ölçeklenebilir yöntem. Gücü sayıda, zayıflığı yüzeyde: doğru soruyu sormazsan çok sayıda yanlış veri toplarsın."
      bgGradient="linear-gradient(135deg, #ec4899 0%, #be185d 100%)"
      shadow="0 30px 80px -20px rgba(236,72,153,0.6)"
      icon={<MessageSquare className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 6. Anket — soru tipleri tablosu ───── */
  () => (
    <SlideShell>
      <Eyebrow>Anket · soru tasarımı</Eyebrow>
      <H2>Sorunun tipi, verinin tipini belirler</H2>
      <Sub className="mt-3 max-w-3xl">
        Anketin kalitesi, soruların kalitesi kadardır. Dört tipi ve birinin neden
        yasak olduğunu görelim:
      </Sub>
      <OpenVsClosedTable />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-[11px] text-gray-500 font-mono flex items-center gap-2"
      >
        <AlertTriangle className="w-3.5 h-3.5 text-[#f87171]" />
        Kural: Soruyu, cevabı ima etmeden sor. &quot;Sevdin mi?&quot; yerine &quot;Bu deneyim nasıldı?&quot;
      </motion.div>
    </SlideShell>
  ),

  /* ───── 7. Anket — Google Forms mockup ───── */
  () => (
    <SlideShell>
      <Eyebrow>Anket · uygulamada</Eyebrow>
      <H2 className="mb-2">Üç soru, üç farklı veri türü</H2>
      <Sub className="max-w-3xl mb-6">
        Aynı formda kapalı uçlu (kategori), Likert (tutum) ve açık uçlu (içgörü)
        soruları birlikte kullanılır. Google Forms, Typeform gibi araçlar ücretsiz ve hızlıdır.
      </Sub>
      <SurveyMockup />
    </SlideShell>
  ),

  /* ───── 8. Anket — örneklem ve yanlılık ───── */
  () => (
    <SlideShell>
      <Eyebrow>Anket · veriye güvenmek</Eyebrow>
      <H2 className="mb-2">Sayı çok diye veri doğru olmaz</H2>
      <Sub className="max-w-3xl mb-8">
        Bin yanlı cevap, on iyi cevaptan daha yanıltıcıdır. Anket sonucunu okurken
        bu üç tuzağa dikkat:
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Users, t: "Örneklem yanlılığı", d: "Anketi yalnızca mevcut mutlu kullanıcılarına gönderirsen, terk edenlerin sesini hiç duymazsın.", accent: "#ec4899" },
          { icon: HelpCircle, t: "Yönlendirici soru", d: "Soru cevabı ima ederse, ölçtüğün şey kullanıcı değil senin beklentin olur.", accent: "#a855f7" },
          { icon: ThumbsUp, t: "Sosyal kabul etkisi", d: "İnsanlar &quot;doğru&quot; görünen cevabı verir. Bu yüzden söylenen ile yapılan ayrışır.", accent: "#3b82f6" },
        ].map((p, i) => (
          <motion.div
            key={p.t}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="katas-card rounded-xl p-6"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ background: `${p.accent}18`, border: `1px solid ${p.accent}55` }}
            >
              <p.icon className="w-6 h-6" style={{ color: p.accent }} />
            </div>
            <div className="text-base font-semibold text-white mb-2">{p.t}</div>
            <p className="text-sm text-gray-400 leading-relaxed">{p.d}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 9. Bölüm 2 — Görüşme ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Görüşme — &quot;Neden&quot;in Peşinde"
      subtitle="Anket ne olduğunu söyler; görüşme neden olduğunu açar. Bire bir, derinlemesine; sayı değil, bağlam ve hikâye toplar."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #6d28d9 100%)"
      shadow="0 30px 80px -20px rgba(168,85,247,0.55)"
      icon={<Users className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 10. Görüşme türleri ───── */
  () => (
    <SlideShell>
      <Eyebrow>Görüşme · yapı seçimi</Eyebrow>
      <H2>Üç yapı: ne kadar serbest bırakırsın?</H2>
      <Sub className="mt-3 max-w-3xl">
        Görüşmeyi ne kadar &quot;senaryoya&quot; bağlayacağın, ne aradığına bağlıdır.
        UX&apos;te en çok orta yol kullanılır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          { t: "Yapılandırılmış", d: "Sabit soru listesi, hep aynı sırada. Karşılaştırması kolay, ama sürprize kapalı.", tag: "katı", accent: "#3b82f6" },
          { t: "Yarı yapılandırılmış", d: "Hazır soru iskeleti + anlık takip soruları. UX&apos;in standart tercihi.", tag: "önerilen", accent: "#ec4899", on: true },
          { t: "Yapılandırılmamış", d: "Serbest sohbet, tek konu başlığı. Çok zengin ama analizi en zor olan.", tag: "esnek", accent: "#a855f7" },
        ].map((g, i) => (
          <motion.div
            key={g.t}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className={`rounded-xl p-6 ${g.on ? "katas-card-rose" : "katas-card"}`}
          >
            <div className="flex items-center justify-between mb-3">
              <Layers className="w-6 h-6" style={{ color: g.accent }} />
              <span
                className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded"
                style={{ background: `${g.accent}1f`, color: g.accent }}
              >
                {g.tag}
              </span>
            </div>
            <div className="text-base font-semibold text-white mb-2">{g.t}</div>
            <p className="text-sm text-gray-400 leading-relaxed">{g.d}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 11. Görüşme — iyi soru / kötü soru ───── */
  () => (
    <SlideShell>
      <Eyebrow>Görüşme · sorma sanatı</Eyebrow>
      <H2 className="mb-2">Geçmişi sor, geleceği değil</H2>
      <Sub className="max-w-3xl mb-8">
        İnsanlar gelecekte ne yapacaklarını kötü tahmin eder; ama en son ne yaptıklarını
        iyi hatırlar. İyi sorular somut, açık uçlu ve tarafsızdır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="katas-card rounded-xl overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 border-b border-red-500/30">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-xs font-mono uppercase text-red-300">Kaçın</span>
          </div>
          <div className="p-5 space-y-3 text-sm">
            <div className="text-gray-300">&quot;Bu özelliği kullanır mıydın?&quot; <span className="text-red-400/80 text-xs">(varsayımsal gelecek)</span></div>
            <div className="text-gray-300">&quot;Uygulama güzel değil mi?&quot; <span className="text-red-400/80 text-xs">(yönlendirici)</span></div>
            <div className="text-gray-300">&quot;Genelde nasıl yaparsın?&quot; <span className="text-red-400/80 text-xs">(soyut, ortalama)</span></div>
            <div className="text-gray-300">&quot;Bunu beğendin mi?&quot; <span className="text-red-400/80 text-xs">(evet/hayır, kapalı)</span></div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="katas-card rounded-xl overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 border-b border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono uppercase text-emerald-300">Tercih et</span>
          </div>
          <div className="p-5 space-y-3 text-sm">
            <div className="text-gray-300">&quot;Bunu en son ne zaman yaptın, anlat.&quot; <span className="text-emerald-400/80 text-xs">(somut geçmiş)</span></div>
            <div className="text-gray-300">&quot;O an aklından ne geçti?&quot; <span className="text-emerald-400/80 text-xs">(açık uçlu)</span></div>
            <div className="text-gray-300">&quot;Bu seni nasıl etkiledi?&quot; <span className="text-emerald-400/80 text-xs">(neden / nasıl)</span></div>
            <div className="text-gray-300">&quot;...ve sonra?&quot; · sessizlik <span className="text-emerald-400/80 text-xs">(takip / bekleme)</span></div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 12. Görüşme — transkript & kodlama ───── */
  () => (
    <SlideShell>
      <Eyebrow>Görüşme · veriye dönüştürmek</Eyebrow>
      <H2 className="mb-2">Sohbetten desene: kodlama (coding)</H2>
      <Sub className="max-w-3xl mb-6">
        Görüşme kaydı tek başına veri değildir. Transkripti okuyup tekrar eden fikirlere
        etiket (kod) verirsin; aynı kod birden çok kişide çıkarsa o bir tema olur.
      </Sub>
      <InterviewTranscriptMockup />
    </SlideShell>
  ),

  /* ───── 13. Bölüm 3 — Gözlem ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Gözlem — Söze Değil Eyleme Bak"
      subtitle="Kullanıcılar her zaman ne yaptıklarını doğru anlatamaz. Gözlem, insanları kendi bağlamlarında gerçek görevleri yaparken izleyerek sözle eylem arasındaki boşluğu kapatır."
      bgGradient="linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
      shadow="0 30px 80px -20px rgba(59,130,246,0.55)"
      icon={<Eye className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 14. Gözlem — söylenen vs yapılan ───── */
  () => (
    <SlideShell>
      <Eyebrow>Gözlem · neden gerekli?</Eyebrow>
      <H2 className="mb-2">Söylenen ile yapılan arasındaki boşluk</H2>
      <Sub className="max-w-3xl mb-8">
        Bu, kullanıcı araştırmasının en önemli dersidir: insanlar yalan söylemez,
        ama hafızaları ve idealleri davranışlarından farklıdır. Gözlem gerçeği gösterir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="katas-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#c4b5fd]">
            <Quote className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Görüşmede söylediği</span>
          </div>
          <div className="text-lg text-gray-200 italic leading-relaxed">
            &quot;Şifremi tarayıcıya asla kaydetmem, her seferinde elle girerim.&quot;
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="katas-card-rose rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#f9a8d4]">
            <Eye className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Gözlemde yaptığı</span>
          </div>
          <div className="text-lg text-white leading-relaxed">
            Sayfa açılır açılmaz <strong className="text-pink-300">otomatik dolan</strong> şifreyle
            tek tıkla giriş yapar — kaydettiğini fark bile etmeden.
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-center text-sm text-gray-400 max-w-3xl mx-auto"
      >
        İki veri de değerli; ama tasarım kararını <strong className="text-white">yapılan</strong> üzerine kurarsın.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 15. Gözlem türleri & saha notu ───── */
  () => (
    <SlideShell>
      <Eyebrow>Gözlem · sahada</Eyebrow>
      <H2>Bağlamsal araştırma ve yapılandırılmış not</H2>
      <Sub className="mt-3 max-w-3xl">
        Kullanıcıyı kendi ortamında (ev, ofis, mağaza) izlersin. Notu rastgele tutmak
        yerine alanlara ayırmak, analizi kolaylaştırır. Klasik yöntem: <strong className="text-white">AEIOU</strong>.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 items-start">
        <div className="grid grid-cols-1 gap-2.5">
          {[
            { k: "A", t: "Activities", d: "Hangi görevler, hangi sırayla yapılıyor?", c: "#ec4899" },
            { k: "E", t: "Environment", d: "Fiziksel ortam, dikkat dağıtıcılar.", c: "#a855f7" },
            { k: "I", t: "Interactions", d: "Kişi–kişi, kişi–sistem etkileşimleri.", c: "#3b82f6" },
            { k: "O", t: "Objects", d: "Kullanılan araçlar, nesneler, ekranlar.", c: "#10b981" },
            { k: "U", t: "Users", d: "Kim, hangi rol, hangi beklentiyle?", c: "#f59e0b" },
          ].map((row, i) => (
            <motion.div
              key={row.k}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5"
              style={{ background: `${row.c}10`, border: `1px solid ${row.c}33` }}
            >
              <span
                className="w-8 h-8 rounded-md flex items-center justify-center font-black text-sm flex-shrink-0"
                style={{ background: `${row.c}22`, color: row.c }}
              >
                {row.k}
              </span>
              <div>
                <span className="text-white font-semibold text-sm">{row.t}</span>
                <span className="text-gray-400 text-xs"> — {row.d}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="katas-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3 text-pink-300">
            <FileText className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Saha notu örneği</span>
          </div>
          <div className="space-y-2 text-sm text-gray-300 font-mono leading-relaxed">
            <div><span className="text-pink-400">[A]</span> Kasada QR okutmayı 2 kez denedi, başarısız.</div>
            <div><span className="text-purple-400">[E]</span> Ortam çok parlak; ekran yansıyor.</div>
            <div><span className="text-blue-400">[I]</span> Kasiyere &quot;çalışmıyor&quot; dedi, sıra büyüdü.</div>
            <div><span className="text-emerald-400">[O]</span> Telefon kılıfı kamerayı kısmen kapatıyor.</div>
            <div><span className="text-amber-400">[U]</span> İlk kez kullanıyor, acelesi var.</div>
          </div>
          <div className="mt-4 text-[11px] text-gray-500 flex items-start gap-2">
            <Lightbulb className="w-3.5 h-3.5 text-pink-400 mt-0.5 flex-shrink-0" />
            <span>Yorum yapma, gördüğünü yaz. Yorum analizde gelir.</span>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 16. Üç yöntem karşılaştırma tablosu ───── */
  () => (
    <SlideShell>
      <Eyebrow>Üçü bir arada · hangisi ne zaman?</Eyebrow>
      <H2>Doğru soru, doğru yöntemi seçtirir</H2>
      <Sub className="mt-3 max-w-3xl">
        Tek bir &quot;en iyi&quot; yöntem yok; sorduğun soruya göre seçersin. Çoğu projede
        ikisini birleştirmek en sağlam sonucu verir.
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
              <th style={{ width: "16%" }}>Yöntem</th>
              <th style={{ width: "18%" }}>Veri</th>
              <th style={{ width: "16%" }}>Kişi sayısı</th>
              <th>Hangi soruyu cevaplar?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Anket</td>
              <td><span className="text-[#f9a8d4]">Nicel</span> (+ az nitel)</td>
              <td>Çok (50–1000+)</td>
              <td>&quot;Kaç kişi, ne sıklıkta, ne kadar memnun?&quot;</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Görüşme</td>
              <td><span className="text-[#c4b5fd]">Nitel</span></td>
              <td>Az (5–8)</td>
              <td>&quot;Neden böyle yapıyor, ne hissediyor?&quot;</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Gözlem</td>
              <td><span className="text-[#93c5fd]">Nitel</span> (davranış)</td>
              <td>Az (5–8)</td>
              <td>&quot;Gerçekte ne yapıyor, nerede takılıyor?&quot;</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-[11px] text-gray-500 font-mono flex items-center gap-2"
      >
        <Hash className="w-3.5 h-3.5 text-[#ec4899]" />
        Nitel görüşme/gözlemde sorunların büyük kısmını yakalamak için genelde az sayıda katılımcı yeterli olur; net sayı projeye göre değişir.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 17. Uygulamalı alıştırma ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı alıştırma</Eyebrow>
      <H2>Kendi mini araştırmanı kurgula</H2>
      <Sub className="mt-3 max-w-3xl">
        Konu: <strong className="text-white">üniversite yemekhanesi mobil sipariş uygulaması</strong>.
        Sonraki derse aşağıdaki dördünü yapıp tek sayfalık bir özetle gelmen bekleniyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: ClipboardList, title: "5 soruluk anket yaz", desc: "En az 1 Likert + 1 açık uçlu içersin; yönlendirici soru olmasın. Google Forms ile kur.", accent: "#ec4899" },
          { icon: Mic, title: "1 görüşme yap", desc: "Bir arkadaşınla 10 dk yarı yapılandırılmış görüşme; &quot;en son ne zaman&quot; ile başla, kaydet.", accent: "#a855f7" },
          { icon: Eye, title: "1 kişiyi gözlemle", desc: "Birinin gerçek sipariş akışını izle; AEIOU alanlarıyla 5 saha notu al, yorum katma.", accent: "#3b82f6" },
          { icon: Tag, title: "3 bulgu çıkar", desc: "Üç kaynağı yan yana koy; tekrar eden 3 sorunu kod/etiketle ve bir cümleyle açıkla.", accent: "#10b981" },
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
        className="mt-6 katas-card-rose rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <ListChecks className="w-4 h-4 text-[#f9a8d4] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Etik hatırlatma:</span> Görüşme/gözlem öncesi izin al,
          amacı açıkla, kişisel veriyi anonimleştir. Katılım her zaman gönüllüdür.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 18. Sıradaki hafta + kapanış ───── */
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
          <Target className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>2. hafta tamamlandı · sıradaki: Persona &amp; Senaryo</Eyebrow>
        <H1>
          <span className="katas-shimmer">Veriden Kullanıcıya</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta ham veri topladık. Hafta 3&apos;te bu veriyi anlamlı bir tasarım
          aracına dönüştürüyoruz: persona, empati haritası ve kullanım senaryoları.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
          <FeatureCard icon={Users} title="Persona" desc="Araştırma verisini temsil eden kurgusal kullanıcı profili." accent="#ec4899" delay={0.15} />
          <FeatureCard icon={PenTool} title="Senaryo" desc="Persona&apos;nın hedefe ulaşmak için izlediği adım adım hikâye." accent="#a855f7" delay={0.25} />
          <FeatureCard icon={Search} title="Empati haritası" desc="Kullanıcının ne dediği, yaptığı, düşündüğü ve hissettiği." accent="#3b82f6" delay={0.35} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="katas-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#ec4899] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Cuma</div>
            <div className="text-sm text-gray-400">15:20 — 17:00</div>
          </div>
          <div className="katas-card rounded-xl p-5">
            <Clock className="w-5 h-5 text-[#a855f7] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">Mini araştırma</div>
            <div className="text-sm text-gray-400">anket + görüşme + gözlem</div>
          </div>
          <div className="katas-card rounded-xl p-5">
            <FileText className="w-5 h-5 text-[#3b82f6] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Bulgu özeti</div>
            <div className="text-sm text-gray-400">3 kaynak + 3 bulgu</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>BVA 2245 · Kullanıcı Arayüzü Tasarımı · Hafta 02</span>
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
          BVA 2245 · 2. Hafta · Kullanıcı Araştırması
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
