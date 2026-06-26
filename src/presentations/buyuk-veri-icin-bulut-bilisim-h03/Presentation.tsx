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
  Cloud,
  Server,
  Cpu,
  Database,
  Globe,
  Layers,
  Layers3,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  Sparkles,
  Target,
  Lightbulb,
  HardDrive,
  Network,
  Settings,
  Code,
  Terminal,
  Building2,
  Wrench,
  Mail,
  ShoppingCart,
  Boxes,
  Brain,
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
        <div className="absolute inset-0 bvbb-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#60a5fa]"
    >
      <span className="w-8 h-px bg-[#60a5fa]" />
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
  accent = "#2563eb",
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
      className="bvbb-card bvbb-card-hover rounded-xl p-6 transition-all"
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={{
          background: `${accent}1f`,
          border: `1px solid ${accent}55`,
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
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 bvbb-pulse"
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

/* Paylaşılan sorumluluk yığını — kim neyi yönetir? */
function ResponsibilityStack() {
  const layers = [
    "Veri & erişim",
    "Uygulama",
    "Çalışma zamanı (runtime)",
    "Orta katman (middleware)",
    "İşletim sistemi",
    "Sanallaştırma",
    "Sunucu (fiziksel)",
    "Depolama",
    "Ağ",
  ];

  // her model için "senin yönettiğin" katman sayısı (en üstten itibaren)
  const models = [
    { name: "On-Premise", you: 9, color: "#94a3b8" },
    { name: "IaaS", you: 5, color: "#a855f7" },
    { name: "PaaS", you: 2, color: "#2563eb" },
    { name: "SaaS", you: 1, color: "#22c55e" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bvbb-card rounded-xl p-5 overflow-x-auto"
    >
      <div className="grid grid-cols-[150px_repeat(4,1fr)] gap-2 min-w-[760px]">
        {/* Başlık satırı */}
        <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 flex items-end pb-2">
          Katman
        </div>
        {models.map((m) => (
          <div
            key={m.name}
            className="text-center text-sm font-bold pb-2"
            style={{ color: m.color }}
          >
            {m.name}
          </div>
        ))}

        {/* Katmanlar */}
        {layers.map((layer, rowIdx) => (
          <FragmentRow
            key={layer}
            layer={layer}
            rowIdx={rowIdx}
            models={models}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center gap-6 text-[11px] text-gray-400">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bvbb-stack-you" /> Sen yönetirsin
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bvbb-stack-them" /> Sağlayıcı yönetir
        </span>
        <span className="ml-auto font-mono text-gray-500">
          Yukarı çıktıkça soyutlama artar
        </span>
      </div>
    </motion.div>
  );
}

function FragmentRow({
  layer,
  rowIdx,
  models,
}: {
  layer: string;
  rowIdx: number;
  models: Array<{ name: string; you: number; color: string }>;
}) {
  return (
    <>
      <div className="text-[11px] text-gray-300 flex items-center px-1 py-2">
        {layer}
      </div>
      {models.map((m) => {
        // rowIdx 0 = en üst (Veri). "you" = üstten kaç katman sana ait.
        const mine = rowIdx < m.you;
        return (
          <div
            key={m.name + layer}
            className={`rounded-md text-[10px] text-center py-2 ${
              mine ? "bvbb-stack-you" : "bvbb-stack-them"
            }`}
          >
            {mine ? "Sen" : "Sağlayıcı"}
          </div>
        );
      })}
    </>
  );
}

/* PaaS dağıtım terminali (Heroku tarzı) */
function PaaSDeployTerminal() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bvbb-window-chrome w-full"
    >
      <div className="bvbb-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-mono flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d1117", color: "#94a3b8" }}
        >
          <Terminal className="w-3 h-3" />
          <span>ocet@mcbu: ~/veri-api</span>
        </div>
      </div>
      <div className="bvbb-terminal">
        <div>
          <span className="bvbb-term-prompt">ocet@mcbu</span>
          <span className="bvbb-term-dim">:~/veri-api$</span>{" "}
          <span className="bvbb-term-cmd">git push heroku main</span>
        </div>
        <div className="bvbb-term-dim">Enumerating objects: 42, done.</div>
        <div className="bvbb-term-out">remote: -----&gt; Building on the Heroku-22 stack</div>
        <div className="bvbb-term-out">remote: -----&gt; Python app detected</div>
        <div className="bvbb-term-out">remote: -----&gt; Installing dependencies (requirements.txt)</div>
        <div className="bvbb-term-dim">remote:        Collecting flask, gunicorn, pandas ...</div>
        <div className="bvbb-term-out">remote: -----&gt; Discovering process types</div>
        <div className="bvbb-term-dim">remote:        Procfile declares types -&gt; web</div>
        <div className="bvbb-term-out">remote: -----&gt; Compressing... done, 58.4M</div>
        <div className="bvbb-term-ok">remote: -----&gt; Launching... done, v12</div>
        <div className="bvbb-term-ok">remote:        https://veri-api.herokuapp.com deployed to Heroku</div>
        <div className="mt-2">
          <span className="bvbb-term-prompt">ocet@mcbu</span>
          <span className="bvbb-term-dim">:~/veri-api$</span>{" "}
          <span className="bvbb-term-cmd">_</span>
          <span className="animate-pulse">█</span>
        </div>
      </div>
    </motion.div>
  );
}

/* IaaS sanal sunucu başlatma terminali (AWS CLI) */
function IaaSProvisionTerminal() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bvbb-window-chrome w-full"
    >
      <div className="bvbb-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-mono flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d1117", color: "#94a3b8" }}
        >
          <Terminal className="w-3 h-3" />
          <span>aws-cli — ec2 run-instances</span>
        </div>
      </div>
      <div className="bvbb-terminal">
        <div>
          <span className="bvbb-term-prompt">ocet@mcbu</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
          <span className="bvbb-term-cmd">aws ec2 run-instances \</span>
        </div>
        <div className="bvbb-term-cmd">  --image-id ami-0abcd1234 \</div>
        <div className="bvbb-term-cmd">  --instance-type t3.medium \</div>
        <div className="bvbb-term-cmd">  --key-name mcbu-key --count 1</div>
        <div className="bvbb-term-dim mt-1">{"{"}</div>
        <div className="bvbb-term-out">  &quot;InstanceId&quot;: &quot;i-0f9e8d7c6b5a4&quot;,</div>
        <div className="bvbb-term-out">  &quot;InstanceType&quot;: &quot;t3.medium&quot;,</div>
        <div className="bvbb-term-out">  &quot;State&quot;: {"{"} &quot;Name&quot;: <span className="bvbb-term-warn">&quot;pending&quot;</span> {"}"},</div>
        <div className="bvbb-term-out">  &quot;ImageId&quot;: &quot;ami-0abcd1234&quot;</div>
        <div className="bvbb-term-dim">{"}"}</div>
        <div className="bvbb-term-ok mt-1">
          # ~30 sn sonra: State = running · boş bir Linux sunucu senindir
        </div>
        <div className="bvbb-term-dim">
          # OS güncelleme, paket kurulumu, güvenlik → tamamen senin sorumluluğun
        </div>
      </div>
    </motion.div>
  );
}

/* SaaS uygulama penceresi mockup (tarayıcı tabanlı) */
function SaaSAppMock() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bvbb-window-chrome w-full"
    >
      <div className="bvbb-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-mono flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d1117", color: "#94a3b8" }}
        >
          <Globe className="w-3 h-3" />
          <span>app.kurum-crm.com/musteriler</span>
        </div>
      </div>
      <div className="grid grid-cols-[150px_1fr] bg-[#0f172a] min-h-[260px]">
        {/* Sidebar */}
        <div className="p-3 border-r border-white/5 text-[11px]">
          <div className="flex items-center gap-2 text-white font-bold mb-4">
            <ShoppingCart className="w-4 h-4 text-[#22c55e]" /> CRM Cloud
          </div>
          {[
            { n: "Gösterge Paneli", on: false },
            { n: "Müşteriler", on: true },
            { n: "Anlaşmalar", on: false },
            { n: "Raporlar", on: false },
            { n: "Ayarlar", on: false },
          ].map((it) => (
            <div
              key={it.n}
              className={`px-2 py-1.5 rounded mb-1 ${
                it.on ? "bg-[#22c55e]/15 text-[#86efac]" : "text-gray-400"
              }`}
            >
              {it.n}
            </div>
          ))}
        </div>
        {/* Main */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold text-white">Müşteriler (3)</div>
            <button className="text-[10px] bg-[#22c55e] text-[#052e16] px-2.5 py-1 rounded font-semibold">
              + Yeni
            </button>
          </div>
          <table className="w-full text-[11px]">
            <thead className="text-gray-500">
              <tr>
                <th className="text-left py-1">Ad</th>
                <th className="text-left py-1">Şehir</th>
                <th className="text-right py-1">Durum</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-t border-white/5">
                <td className="py-1.5">Ege Lojistik</td>
                <td>İzmir</td>
                <td className="text-right text-[#86efac]">● Aktif</td>
              </tr>
              <tr className="border-t border-white/5">
                <td className="py-1.5">Manisa Tarım A.Ş.</td>
                <td>Manisa</td>
                <td className="text-right text-[#86efac]">● Aktif</td>
              </tr>
              <tr className="border-t border-white/5">
                <td className="py-1.5">Demir İnşaat</td>
                <td>Bursa</td>
                <td className="text-right text-amber-400">● Beklemede</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4 text-[10px] text-gray-500 font-mono">
            Kurulum yok · güncelleme yok · sürüm yok — sadece tarayıcı ve giriş.
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ─────────────────  1 · KAPAK  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2103 · 3. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Bulut Hizmet Modelleri</span>
          <br />
          <span className="text-white">IaaS · PaaS · SaaS</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Aynı bulut, üç farklı sorumluluk seviyesi. Bu hafta &ldquo;kim neyi
          yönetir?&rdquo; sorusunun cevabını katman katman çözüyoruz.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { name: "IaaS", tag: "Altyapı kiralarsın", color: "#a855f7", icon: Server },
            { name: "PaaS", tag: "Platform üzerine kod yazarsın", color: "#2563eb", icon: Code },
            { name: "SaaS", tag: "Hazır uygulamayı kullanırsın", color: "#22c55e", icon: Briefcase },
          ].map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="bvbb-card rounded-xl p-4 flex items-center gap-3"
              style={{ borderColor: `${p.color}55` }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${p.color}22`, border: `1px solid ${p.color}66` }}
              >
                <p.icon className="w-5 h-5" style={{ color: p.color }} />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">{p.name}</div>
                <div className="text-[10px] text-gray-400">{p.tag}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-10 text-[11px] font-mono text-gray-600"
        >
          Öğr. Gör. Osman Can Çetlenbik · MCBÜ MYO · Bilgisayar Programcılığı
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2 · GEÇEN HAFTADAN KÖPRÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 2. haftadan 3. haftaya</Eyebrow>
      <H2>Veriyi tanıdık; şimdi onu nereye koyacağımıza karar veriyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta büyük verinin 5V modelini ve kaynaklarını gördük. Bu veriyi
        işlemek için buluttan kaynak alacağız — ama bulut tek bir şey değil. Ne
        kadarını biz yönetip ne kadarını sağlayıcıya bırakacağımız hizmet
        modelini belirler.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-9">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#60a5fa]">
            <Database className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Geçen hafta</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#2563eb] flex-shrink-0" />Volume, Velocity, Variety… — veri neden &ldquo;büyük&rdquo;?</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#2563eb] flex-shrink-0" />Yapılandırılmış / yapılandırılmamış veri kaynakları.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#2563eb] flex-shrink-0" />Tek sunucu yetmiyor — ölçeklenebilir altyapı şart.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card-sky rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#7dd3fc]">
            <Target className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu haftanın hedefi</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#0ea5e9] flex-shrink-0" />IaaS, PaaS ve SaaS&apos;ı tanımlayıp ayırt etmek.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#0ea5e9] flex-shrink-0" />Paylaşılan sorumluluk modelini okumak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#0ea5e9] flex-shrink-0" />Bir senaryoya doğru modeli seçebilmek.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: katmanlar → üç model → doğru seçim</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce bulut yığınını ve paylaşılan sorumluluğu kuruyoruz; sonra IaaS, PaaS
        ve SaaS&apos;ı tek tek mockup&apos;larla görüyoruz; en sonunda bir
        senaryoda doğru modeli seçiyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Yığın & Sorumluluk", items: ["Bulut yığınının katmanları", "Paylaşılan sorumluluk", "On-prem → SaaS ekseni"], icon: Layers, accent: "#0ea5e9" },
          { range: "02", title: "Üç Model", items: ["IaaS — altyapı kiralama", "PaaS — platform üzerine kod", "SaaS — hazır uygulama"], icon: Layers3, accent: "#2563eb" },
          { range: "03", title: "Doğru Seçim", items: ["Karşılaştırma tablosu", "Karar senaryosu", "Büyük veride hangi model nerede?"], icon: Target, accent: "#22c55e" },
        ].map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="bvbb-card rounded-xl p-6"
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

  /* ─────────────────  4 · BÖLÜM 1 · YIĞIN & SORUMLULUK  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Bulut Yığını ve Sorumluluk"
      subtitle="Her bulut hizmeti aynı katmanlardan oluşur. Modeli belirleyen tek şey: bu katmanların kaçını sen, kaçını sağlayıcı yönetir."
      bgGradient="linear-gradient(135deg, #0ea5e9 0%, #22d3ee 100%)"
      shadow="0 20px 60px -10px rgba(14, 165, 233, 0.6)"
      icon={<Layers className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  5 · BULUT YIĞINI KATMANLARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bulut Yığını · 9 katman</Eyebrow>
      <H2 className="mb-2">Bir uygulamanın altındaki tüm katmanlar</H2>
      <Sub className="max-w-3xl mb-6">
        Bir web uygulaması ağdan veriye kadar dokuz katmanın üzerinde durur. Bu
        katmanlar her zaman vardır — soru sadece &ldquo;kim bakar?&rdquo;.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          {[
            { layer: "Veri & erişim", note: "Senin verin — daima senin", color: "#22c55e" },
            { layer: "Uygulama", note: "İş mantığı, arayüz", color: "#2563eb" },
            { layer: "Çalışma zamanı", note: "Python, Node, JVM…", color: "#0ea5e9" },
            { layer: "İşletim sistemi", note: "Linux, Windows Server", color: "#a855f7" },
            { layer: "Sanallaştırma + Donanım", note: "Hipervizör, sunucu, depolama, ağ", color: "#fb923c" },
          ].map((l, i) => (
            <motion.div
              key={l.layer}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.1 }}
              className="rounded-lg px-4 py-3 flex items-center justify-between"
              style={{ background: `${l.color}10`, border: `1px solid ${l.color}40` }}
            >
              <span className="text-white font-semibold text-sm">{l.layer}</span>
              <span className="font-mono text-[11px]" style={{ color: l.color }}>{l.note}</span>
            </motion.div>
          ))}
          <div className="text-[11px] text-gray-500 mt-2 pl-1">
            Üstte uygulamaya, altta donanıma yaklaşırsın.
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-[#60a5fa] mb-4">Soyutlama ekseni</div>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <span><span className="text-white font-semibold">On-Premise:</span> dokuz katmanın tamamı sende.</span>
            </div>
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-[#a855f7] flex-shrink-0" />
              <span><span className="text-white font-semibold">IaaS:</span> donanım ve sanallaştırma sağlayıcıda; OS&apos;ten yukarısı sende.</span>
            </div>
            <div className="flex items-center gap-3">
              <Code className="w-5 h-5 text-[#2563eb] flex-shrink-0" />
              <span><span className="text-white font-semibold">PaaS:</span> sadece uygulama ve veri sende.</span>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-[#22c55e] flex-shrink-0" />
              <span><span className="text-white font-semibold">SaaS:</span> neredeyse her şey sağlayıcıda; sen sadece verini ve kullanıcılarını yönetirsin.</span>
            </div>
          </div>
          <div className="mt-4 text-[11px] text-gray-500">
            <span className="bvbb-token">Önemli</span> Soyutlama arttıkça kontrol
            azalır, hız ve kolaylık artar.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  6 · PAYLAŞILAN SORUMLULUK YIĞINI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Paylaşılan Sorumluluk Modeli</Eyebrow>
      <H2 className="mb-2">Kim neyi yönetir? — tek bakışta</H2>
      <Sub className="max-w-3xl mb-6">
        Soldan sağa soyutlama artar. Mavi hücreler senin, gri hücreler
        sağlayıcının sorumluluğu. SaaS&apos;a doğru gittikçe gri alan büyür.
      </Sub>
      <ResponsibilityStack />
    </SlideShell>
  ),

  /* ─────────────────  7 · BÖLÜM 2 · ÜÇ MODEL  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="IaaS · PaaS · SaaS"
      subtitle="Üç katmanı sırayla açıyoruz: altyapı kiralama, platform üzerine kod yazma ve hazır uygulamayı kullanma. Her biri için gerçek bir mockup."
      bgGradient="linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)"
      shadow="0 20px 60px -10px rgba(124, 58, 237, 0.6)"
      icon={<Layers3 className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  8 · ÜÇ MODEL KARTLARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Üç Katman · Genel Bakış</Eyebrow>
      <H2>IaaS · PaaS · SaaS</H2>
      <Sub className="mt-3 max-w-3xl">
        Yukarı çıktıkça soyutlama artar, kontrol azalır — ama hız ve kolaylık
        kazanırsınız.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          {
            tier: "IaaS",
            sub: "Infrastructure as a Service",
            color: "#a855f7",
            icon: Server,
            ctrl: "En yüksek",
            you: ["Uygulama", "Çalışma zamanı", "OS", "Veri"],
            ex: ["Amazon EC2", "Azure VM", "Google Compute Engine", "DigitalOcean Droplet"],
          },
          {
            tier: "PaaS",
            sub: "Platform as a Service",
            color: "#2563eb",
            icon: Code,
            ctrl: "Orta",
            you: ["Uygulama kodu", "Veriler"],
            ex: ["Heroku", "Google App Engine", "Azure App Service", "AWS Elastic Beanstalk"],
          },
          {
            tier: "SaaS",
            sub: "Software as a Service",
            color: "#22c55e",
            icon: Briefcase,
            ctrl: "En düşük",
            you: ["Veriler", "Kullanıcılar"],
            ex: ["Microsoft 365", "Gmail", "Salesforce", "Dropbox"],
          },
        ].map((m, i) => (
          <motion.div
            key={m.tier}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bvbb-card rounded-xl p-5"
            style={{ borderColor: `${m.color}55` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${m.color}25`, border: `1px solid ${m.color}66` }}
              >
                <m.icon className="w-5 h-5" style={{ color: m.color }} />
              </div>
              <div>
                <div className="text-base font-bold text-white">{m.tier}</div>
                <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{m.sub}</div>
              </div>
            </div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Kontrol seviyesi</div>
            <div className="text-sm font-semibold mb-3" style={{ color: m.color }}>{m.ctrl}</div>

            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Senin sorumluluğun</div>
            <div className="flex flex-wrap gap-1 mb-3">
              {m.you.map((y) => (
                <span key={y} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10">
                  {y}
                </span>
              ))}
            </div>

            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Örnekler</div>
            <ul className="space-y-1">
              {m.ex.map((e) => (
                <li key={e} className="text-xs text-gray-300 flex items-center gap-1.5">
                  <Check className="w-3 h-3 flex-shrink-0" style={{ color: m.color }} />
                  {e}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 text-center text-[11px] text-gray-500"
      >
        Pizza analojisi: IaaS = mutfağı kirala, malzemeyi sen getir · PaaS = mutfak
        hazır, sen sadece pişir · SaaS = pizza sıcak servis edilir.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  9 · IaaS DETAY + TERMİNAL  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>IaaS · Infrastructure as a Service</Eyebrow>
      <H2 className="mb-2">Boş bir sunucu kirala, gerisini sen kur</H2>
      <Sub className="max-w-3xl mb-6">
        IaaS&apos;te sağlayıcı sana sanal bir makine verir; işletim sistemi,
        paketler, güvenlik ve uygulama tamamen sana ait. En esnek ama en çok
        yönetim isteyen model. Büyük veride bir <span className="text-[#c4b5fd]">Hadoop/Spark kümesini</span> sıfırdan kurmak için idealdir.
      </Sub>
      <IaaSProvisionTerminal />
    </SlideShell>
  ),

  /* ─────────────────  10 · PaaS DETAY + TERMİNAL  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>PaaS · Platform as a Service</Eyebrow>
      <H2 className="mb-2">OS&apos;i unut — sadece kodunu gönder</H2>
      <Sub className="max-w-3xl mb-6">
        PaaS&apos;te sunucu, işletim sistemi ve çalışma zamanı hazırdır. Sen
        sadece uygulama kodunu &ldquo;push&rdquo; edersin; ölçekleme ve yama
        platformun işidir. Veri API&apos;si veya analiz arayüzü gibi uygulamaları
        hızla yayınlamak için biçilmiş kaftandır.
      </Sub>
      <PaaSDeployTerminal />
    </SlideShell>
  ),

  /* ─────────────────  11 · SaaS DETAY + MOCKUP  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>SaaS · Software as a Service</Eyebrow>
      <H2 className="mb-2">Kurulum yok — tarayıcıyı aç, çalış</H2>
      <Sub className="max-w-3xl mb-6">
        SaaS&apos;te uygulamanın tamamı sağlayıcıda çalışır. Sen sadece bir hesap
        açar, tarayıcıdan girer ve verini yönetirsin. Güncelleme, sunucu, yedek —
        hiçbiri senin derdin değil. Aşağıda örnek bir bulut CRM arayüzü.
      </Sub>
      <SaaSAppMock />
    </SlideShell>
  ),

  /* ─────────────────  12 · GÜNLÜK HAYATTAN ÖRNEKLER  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Tanıdık Yüzler</Eyebrow>
      <H2>Aslında hepsini her gün kullanıyorsunuz</H2>
      <Sub className="mt-3 max-w-3xl">
        Hizmet modelleri soyut değil; bilerek ya da bilmeyerek hepsiyle temas
        ediyorsunuz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bvbb-card rounded-xl p-5" style={{ borderColor: "#a855f733" }}>
          <div className="flex items-center gap-2 mb-3">
            <Server className="w-5 h-5 text-[#a855f7]" />
            <span className="text-sm font-bold text-white">IaaS</span>
          </div>
          <ul className="space-y-2 text-xs text-gray-300">
            <li className="flex items-start gap-2"><Boxes className="w-3.5 h-3.5 mt-0.5 text-[#a855f7]" />Bir VPS&apos;te oyun sunucusu barındırmak</li>
            <li className="flex items-start gap-2"><Boxes className="w-3.5 h-3.5 mt-0.5 text-[#a855f7]" />EC2&apos;de Spark kümesi kurmak</li>
            <li className="flex items-start gap-2"><Boxes className="w-3.5 h-3.5 mt-0.5 text-[#a855f7]" />Kendi Linux makineni kiralamak</li>
          </ul>
        </div>
        <div className="bvbb-card rounded-xl p-5" style={{ borderColor: "#2563eb44" }}>
          <div className="flex items-center gap-2 mb-3">
            <Code className="w-5 h-5 text-[#60a5fa]" />
            <span className="text-sm font-bold text-white">PaaS</span>
          </div>
          <ul className="space-y-2 text-xs text-gray-300">
            <li className="flex items-start gap-2"><Wrench className="w-3.5 h-3.5 mt-0.5 text-[#60a5fa]" />Heroku&apos;ya Flask uygulaması atmak</li>
            <li className="flex items-start gap-2"><Wrench className="w-3.5 h-3.5 mt-0.5 text-[#60a5fa]" />Vercel&apos;e Next.js sitesi deploy etmek</li>
            <li className="flex items-start gap-2"><Wrench className="w-3.5 h-3.5 mt-0.5 text-[#60a5fa]" />Firebase ile backend kurmak</li>
          </ul>
        </div>
        <div className="bvbb-card rounded-xl p-5" style={{ borderColor: "#22c55e44" }}>
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="w-5 h-5 text-[#22c55e]" />
            <span className="text-sm font-bold text-white">SaaS</span>
          </div>
          <ul className="space-y-2 text-xs text-gray-300">
            <li className="flex items-start gap-2"><Mail className="w-3.5 h-3.5 mt-0.5 text-[#22c55e]" />Gmail ile e-posta okumak</li>
            <li className="flex items-start gap-2"><Mail className="w-3.5 h-3.5 mt-0.5 text-[#22c55e]" />Google Docs&apos;ta ödev yazmak</li>
            <li className="flex items-start gap-2"><Mail className="w-3.5 h-3.5 mt-0.5 text-[#22c55e]" />Spotify, Netflix, Trello kullanmak</li>
          </ul>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 bvbb-card rounded-xl p-4 flex items-start gap-3"
      >
        <Lightbulb className="w-5 h-5 text-[#60a5fa] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-300">
          <span className="bvbb-token">Bonus</span> Sunucusuz işlevler (AWS Lambda,
          Cloud Functions) için kullanılan <span className="text-white">FaaS</span>{" "}
          (Function as a Service), PaaS&apos;ın daha da ince taneli bir
          türevidir — sadece fonksiyon başına çalışır ve faturalanır.
        </p>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  13 · BÖLÜM 3 · DOĞRU SEÇİM  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Doğru Modeli Seçmek"
      subtitle="Üç model de buluttur; &ldquo;en iyisi&rdquo; yoktur — yalnızca senaryoya en uygunu vardır. Karşılaştıralım ve karar verelim."
      bgGradient="linear-gradient(135deg, #16a34a 0%, #22d3ee 100%)"
      shadow="0 20px 60px -10px rgba(22, 163, 74, 0.6)"
      icon={<Target className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  14 · KARŞILAŞTIRMA TABLOSU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Yan Yana</Eyebrow>
      <H2>IaaS vs PaaS vs SaaS</H2>
      <Sub className="mt-3 max-w-3xl">
        Aynı soruları üç modele soralım; farklar bir tabloda netleşir.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8 bvbb-card rounded-xl overflow-hidden"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#1e293b] text-gray-300">
              <th className="text-left px-4 py-3 font-semibold">Soru</th>
              <th className="text-left px-4 py-3 font-semibold">
                <Server className="inline w-4 h-4 mr-1.5 -mt-0.5 text-[#a855f7]" />
                IaaS
              </th>
              <th className="text-left px-4 py-3 font-semibold">
                <Code className="inline w-4 h-4 mr-1.5 -mt-0.5 text-[#60a5fa]" />
                PaaS
              </th>
              <th className="text-left px-4 py-3 font-semibold">
                <Briefcase className="inline w-4 h-4 mr-1.5 -mt-0.5 text-[#22c55e]" />
                SaaS
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {[
              { k: "Kullanıcı kim?", a: "Sistem yöneticisi", b: "Geliştirici", c: "Son kullanıcı" },
              { k: "Sen ne yönetirsin?", a: "OS + üstü", b: "Sadece kod + veri", c: "Sadece veri" },
              { k: "Kontrol / esneklik", a: "En yüksek", b: "Orta", c: "En düşük" },
              { k: "Kurulum hızı", a: "Yavaş (sen kurarsın)", b: "Hızlı (push)", c: "Anında (giriş yap)" },
              { k: "Tipik fatura", a: "Saatlik sunucu", b: "Çalışan örnek / istek", c: "Kullanıcı / abonelik" },
            ].map((row, i) => (
              <motion.tr
                key={row.k}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="border-t border-white/5"
              >
                <td className="px-4 py-3 font-medium text-white">{row.k}</td>
                <td className="px-4 py-3 text-[#c4b5fd]">{row.a}</td>
                <td className="px-4 py-3 text-[#93c5fd]">{row.b}</td>
                <td className="px-4 py-3 text-[#86efac]">{row.c}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-4 text-[11px] text-gray-500 text-center"
      >
        <span className="bvbb-token">Kural</span> Ne kadar yukarı çıkarsan o
        kadar az iş; ne kadar aşağı inersen o kadar çok kontrol.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · BÜYÜK VERİDE HANGİSİ?  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Büyük Veri Bağlamı</Eyebrow>
      <H2>
        Veri iş yükünde <span className="bvbb-shimmer-sky">hangi model nerede?</span>
      </H2>
      <Sub className="mt-3 max-w-3xl">
        Bu ders boyunca üç modeli de kullanacağız. Hangi aracın hangi modele
        denk geldiğini bilmek mimari kararlarını netleştirir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={HardDrive}
          title="IaaS ile küme kurmak"
          desc="EC2 düğümleri üzerinde elle Hadoop/Spark kümesi: tam kontrol, ince ayar, ama kurulum yükü senin."
          delay={0.0}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Cpu}
          title="PaaS ile yönetilen analiz"
          desc="EMR, Databricks, Dataproc — Spark'ı hazır sunar; sen sadece işi (job) gönderirsin."
          delay={0.1}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Brain}
          title="SaaS ile hazır panolar"
          desc="Google Analytics, Power BI Service, Looker Studio — altyapısız doğrudan gösterge paneli."
          delay={0.2}
          accent="#22c55e"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 bvbb-card rounded-xl p-4 flex items-start gap-3"
      >
        <Network className="w-5 h-5 text-[#60a5fa] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-300">
          <span className="bvbb-token">Eğilim</span> Sektörde genel yönelim
          mümkün olduğunda yönetilen hizmetlere (PaaS) kaymaktır; ekipler
          altyapı bakımı yerine veriden değer üretmeye odaklanır.
        </p>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  16 · UYGULAMA · KARAR SENARYOSU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · Karar alıştırması</Eyebrow>
      <H2>Senaryoya doğru modeli eşle</H2>
      <Sub className="mt-3 max-w-3xl">
        Aşağıdaki dört durum için &ldquo;IaaS / PaaS / SaaS&rdquo;tan birini seç
        ve <span className="text-white">tek cümleyle</span> gerekçelendir.
        Sonraki derse cevaplarınla gel.
      </Sub>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            n: 1,
            t: "Küçük işletmeye e-posta + dosya",
            d: "5 kişilik bir firma sıfır IT bilgisiyle kurumsal e-posta ve ortak takvim istiyor.",
            icon: Mail,
            color: "#22c55e",
            hint: "İpucu: kurulum/yönetim isteği yok.",
          },
          {
            n: 2,
            t: "Öğrenci, Spark üzerinde deney",
            d: "Spark yapılandırmasını satır satır kontrol edip farklı sürümleri denemek istiyorsun.",
            icon: Server,
            color: "#a855f7",
            hint: "İpucu: maksimum kontrol gerekiyor.",
          },
          {
            n: 3,
            t: "Startup, hızlı web API yayını",
            d: "Üç kişilik ekip, sunucu yönetmeden Python API&apos;sını bugün canlıya almak istiyor.",
            icon: Code,
            color: "#2563eb",
            hint: "İpucu: sadece kod, OS derdi yok.",
          },
          {
            n: 4,
            t: "Pazarlama ekibi, hazır pano",
            d: "Veri ekibi olmadan web sitesi trafiğini grafiklerle izlemek istiyorlar.",
            icon: ShoppingCart,
            color: "#0ea5e9",
            hint: "İpucu: altyapısız, abonelikle kullan.",
          },
        ].map((item, i) => (
          <motion.label
            key={item.n}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="bvbb-card bvbb-card-hover rounded-xl p-5 flex gap-4 cursor-pointer transition-all"
          >
            <div className="flex flex-col items-center gap-2">
              <input
                type="checkbox"
                className="w-5 h-5 accent-[#2563eb] rounded"
              />
              <span className="text-[10px] font-mono text-gray-500">#{item.n}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <item.icon className="w-4 h-4" style={{ color: item.color }} />
                <div className="text-base font-semibold text-white">{item.t}</div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{item.d}</p>
              <p className="text-[11px] text-gray-600 mt-1.5 font-mono">{item.hint}</p>
            </div>
          </motion.label>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 text-[11px] text-gray-500 text-center"
      >
        <span className="bvbb-token">Hedef</span> Doğru cevap ezber değil;
        gerekçe önemli. &ldquo;Çünkü kontrol/hız/yönetim isteği şu yüzden&hellip;&rdquo;
        diye düşün.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  17 · SIRADAKİ HAFTA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Hafta 4 Önizleme</Eyebrow>
      <H2>AWS temelleri — IaaS&apos;ı elle deneyelim</H2>
      <Sub className="mt-3 max-w-3xl">
        Modelleri kavradık; gelecek hafta en yaygın bulut sağlayıcısı AWS&apos;e
        giriyoruz. IaaS&apos;ı kâğıttan çıkarıp gerçek konsolda EC2 ve S3 ile
        ellerimizi kirletiyoruz.
      </Sub>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Cloud}
          title="AWS hesabı & konsol"
          desc="Free Tier, bölgeler (region), IAM kullanıcısı ve fatura uyarıları."
          delay={0.0}
          accent="#ff9900"
        />
        <FeatureCard
          icon={Server}
          title="EC2 — ilk sunucun"
          desc="Bir Linux örneği başlat, SSH ile bağlan, güvenlik gruplarını anla."
          delay={0.1}
          accent="#a855f7"
        />
        <FeatureCard
          icon={HardDrive}
          title="S3 — nesne deposu"
          desc="Bucket oluştur, dosya yükle, erişim politikalarına ilk bakış."
          delay={0.2}
          accent="#22c55e"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bvbb-card rounded-xl p-5 flex items-center gap-4"
      >
        <Settings className="w-6 h-6 text-[#60a5fa]" />
        <div className="flex-1">
          <div className="text-sm font-semibold text-white">Hazırlık</div>
          <div className="text-xs text-gray-400 mt-0.5">
            Mümkünse bir AWS Free Tier hesabı açmayı deneyin (kredi kartı
            gerekir, 12 ay ücretsiz kotalar tanımlı) · Karar alıştırmasının
            cevaplarını getirin.
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-500" />
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  18 · KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex w-24 h-24 rounded-3xl items-center justify-center mb-8"
          style={{
            background: "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)",
            boxShadow: "0 20px 60px -10px rgba(37,99,235,0.6)",
          }}
        >
          <Layers3 className="w-12 h-12 text-white" />
        </motion.div>

        <Eyebrow>Hafta 3 · Özet</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Üç model, tek bulut</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          IaaS kontrol verir, PaaS hız verir, SaaS kolaylık verir. Sorumluluk
          yığınında nerede durduğunu bilirsen doğru aracı seçersin.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { icon: Server, label: "IaaS", value: "Altyapı · en çok kontrol", color: "#a855f7" },
            { icon: Code, label: "PaaS", value: "Platform · en hızlı dağıtım", color: "#60a5fa" },
            { icon: Briefcase, label: "SaaS", value: "Uygulama · sıfır yönetim", color: "#22c55e" },
          ].map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="bvbb-card rounded-xl p-4 text-left"
            >
              <c.icon className="w-5 h-5 mb-2" style={{ color: c.color }} />
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">{c.label}</div>
              <div className="text-sm font-semibold text-white mt-1">{c.value}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-10 text-[11px] font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>BVA 2103 · Büyük Veri İçin Bulut Bilişim · Güz 2026</span>
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
            background: "linear-gradient(90deg, #2563eb, #60a5fa, #2563eb)",
            boxShadow: "0 0 16px rgba(37,99,235,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#60a5fa]/80">
          BVA 2103 · 3. Hafta · IaaS · PaaS · SaaS
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#60a5fa]/60">
            <span className="text-[#60a5fa]">
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
            className="p-1.5 text-gray-500 hover:text-[#60a5fa] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#60a5fa] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#60a5fa]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(96,165,250,0.6)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#60a5fa] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
