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
  CloudCog,
  ShieldCheck,
  Lock,
  Key,
  KeyRound,
  Users,
  UserCog,
  Server,
  Database,
  Eye,
  AlertTriangle,
  Network,
  Globe,
  FileWarning,
  FolderLock,
  ScanSearch,
  Activity,
  ListChecks,
  Layers,
  ArrowRight,
  Check,
  X,
  Calendar,
  Target,
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

function TerminalWindow({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="sgbh-window-chrome w-full"
    >
      <div className="sgbh-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-mono flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d0d0d", color: "#67e8f9" }}
        >
          <span
            className="w-5 h-5 rounded-sm flex items-center justify-center text-[11px]"
            style={{ background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white" }}
          >
            $_
          </span>
          <span>{title}</span>
        </div>
      </div>
      <div className="sgbh-terminal">{children}</div>
    </motion.div>
  );
}

/* AWS konsol benzeri JSON gösterici (IAM policy belgesi) */
function PolicyWindow({
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
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="sgbh-window-chrome w-full"
    >
      <div className="sgbh-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] flex-1 max-w-md mx-auto text-center justify-center font-mono"
          style={{ background: "#0d0d0d", color: "#67e8f9" }}
        >
          {icon}
          <span>{title}</span>
        </div>
      </div>
      <div className="sgbh-json">{children}</div>
    </motion.div>
  );
}

/* IAM erişim zinciri: kimlik → policy → kaynak */
function IAMChain() {
  const nodes = [
    { icon: Users, label: "Principal", detail: "Kullanıcı · Rol · Servis", color: "#06b6d4" },
    { icon: KeyRound, label: "Policy", detail: "Effect · Action · Resource", color: "#a78bfa" },
    { icon: Database, label: "Resource", detail: "S3 · EC2 · DynamoDB", color: "#34d399" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="sgbh-card rounded-xl p-6 max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between gap-3">
        {nodes.map((n, i) => (
          <div key={n.label} className="flex items-center gap-3 flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.2 }}
              className="flex flex-col items-center text-center flex-1"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-2"
                style={{ background: `${n.color}18`, border: `1px solid ${n.color}55` }}
              >
                <n.icon className="w-7 h-7" style={{ color: n.color }} />
              </div>
              <div className="text-sm font-semibold text-white">{n.label}</div>
              <div className="text-[11px] text-gray-500 font-mono mt-0.5">{n.detail}</div>
            </motion.div>
            {i < nodes.length - 1 && (
              <ArrowRight className="w-6 h-6 text-gray-600 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 text-[11px] text-gray-500 font-mono text-center border-t border-white/5 pt-4">
        AWS&apos;de varsayılan <span className="text-[#f87171]">implicit deny</span> &middot; bir eylem ancak{" "}
        <span className="text-[#34d399]">açıkça Allow</span> edilirse ve hiçbir yerde Deny yoksa çalışır.
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
        <Eyebrow>BVA 2205 · 10. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="sgbh-shimmer">Bulut Güvenliği</span>
          <br />
          <span className="text-white/90">AWS&apos;te Yapılandırmayı Doğru Kur</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          İhlallerin çoğu sıfır-gün değil, yanlış yapılandırmadır. IAM, S3, security group ve
          GuardDuty ile bulutta saldırı yüzeyini daraltıyoruz.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
          <FeatureCard
            icon={KeyRound}
            title="IAM"
            desc="Kimlik ve yetki: kullanıcı, rol, policy ve en az yetki ilkesi."
            delay={0.3}
            accent="#06b6d4"
          />
          <FeatureCard
            icon={FolderLock}
            title="S3"
            desc="Bucket erişim modeli ve public ifşaya yol açan yanlış ayarlar."
            delay={0.42}
            accent="#a78bfa"
          />
          <FeatureCard
            icon={Network}
            title="Security Groups"
            desc="Sanal güvenlik duvarı: stateful kurallar ve 0.0.0.0/0 tuzağı."
            delay={0.54}
            accent="#fbbf24"
          />
          <FeatureCard
            icon={ScanSearch}
            title="GuardDuty"
            desc="Tehdit tespiti: anormal API ve ağ davranışını yakalayan servis."
            delay={0.66}
            accent="#34d399"
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Çarşamba 13:30 — 17:00 · Uygulamalı lab (AWS Free Tier + AWS CLI)
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Geçen hafta → bu hafta köprü ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 9. haftadan 10. haftaya</Eyebrow>
      <H2>Sunucu bizimken kurduğumuz savunmayı şimdi paylaşımlı buluta taşıyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Bulutta güvenlik artık tek taraflı değil: altyapıyı sağlayıcı korur, içine ne koyup nasıl
        yapılandırdığından sen sorumlusun. Bu çizgiyi bilmemek ihlallerin bir numaralı sebebi.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#67e8f9]">
            <Cloud className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Sağlayıcının sorumluluğu</span>
          </div>
          <div className="text-[11px] text-gray-500 font-mono mb-3">security OF the cloud</div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Veri merkezleri, donanım, fiziksel güvenlik.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Hipervizör ve temel ağ altyapısı.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Yönetilen servislerin altyapı yaması.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <UserCog className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Senin sorumluluğun</span>
          </div>
          <div className="text-[11px] text-gray-500 font-mono mb-3">security IN the cloud</div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />IAM kullanıcı/rol ve policy tasarımı.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />S3 erişim ayarları ve veri şifreleme.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Security group / firewall kuralları, log izleme.</li>
          </ul>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 sgbh-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <Layers className="w-4 h-4 text-[#06b6d4] mt-0.5 flex-shrink-0" />
        <span>
          Buna <span className="text-white">Paylaşımlı Sorumluluk Modeli</span> denir. Sağlayıcı bulutu güvende
          tutar; bulutun içindekini güvende tutmak müşterinin işidir. Çizgiyi karıştırmak veri sızıntısıyla biter.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 3. Dersin akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: kimlik → açık yüzey → tespit</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce kimin neye erişebileceğini (IAM) kuruyoruz; sonra yanlış yapılandırmanın yarattığı
        açık yüzeyi (S3 ve security group) görüyoruz; en son anormali yakalayan tespiti (GuardDuty)
        ekliyoruz. Sonunda küçük bir uygulamalı lab.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "IAM — Kimlik & Yetki", items: ["Kullanıcı, rol, policy", "En az yetki (least privilege)", "Allow / Deny değerlendirme"], icon: KeyRound, accent: "#06b6d4" },
          { range: "02", title: "Açık Yüzey", items: ["S3 bucket erişim modeli", "Public ifşa anatomisi", "Security group 0.0.0.0/0"], icon: FileWarning, accent: "#fbbf24" },
          { range: "03", title: "GuardDuty — Tespit", items: ["Tehdit tespit kaynakları", "Bulgu (finding) okuma", "Olay müdahale akışı"], icon: ScanSearch, accent: "#34d399" },
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

  /* ───── 4. Bölüm 1 — IAM ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="IAM — Kimlik & Erişim Yönetimi"
      subtitle="Bulutta her şey bir API çağrısı. IAM, hangi kimliğin hangi kaynakta hangi eylemi yapabileceğini belirleyen bekçidir."
      bgGradient="linear-gradient(135deg,#06b6d4,#0e7490)"
      shadow="0 30px 80px -20px rgba(6,182,212,0.6)"
      icon={<KeyRound className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 5. IAM zinciri ───── */
  () => (
    <SlideShell>
      <Eyebrow>IAM · temel model</Eyebrow>
      <H2 className="mb-2">Kim, neye, ne yapabilir?</H2>
      <Sub className="max-w-3xl mb-6">
        Her erişim üç parçaya ayrışır: bir <span className="text-white">principal</span> (kimlik),
        ona bağlı bir <span className="text-white">policy</span> (izin belgesi) ve hedef bir{" "}
        <span className="text-white">resource</span> (kaynak). Policy bu üçlüyü birbirine bağlar.
      </Sub>
      <IAMChain />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="sgbh-card rounded-lg px-4 py-3">
          <div className="text-xs font-mono uppercase tracking-widest text-[#06b6d4] mb-1">Kullanıcı (User)</div>
          <p className="text-[12px] text-gray-400">Kalıcı kimlik; uzun ömürlü erişim anahtarı taşır. İnsanlar için MFA şart.</p>
        </div>
        <div className="sgbh-card rounded-lg px-4 py-3">
          <div className="text-xs font-mono uppercase tracking-widest text-[#a78bfa] mb-1">Rol (Role)</div>
          <p className="text-[12px] text-gray-400">Üstlenilen geçici kimlik; kısa ömürlü kimlik bilgisi üretir. EC2 ve servisler için tercih.</p>
        </div>
        <div className="sgbh-card rounded-lg px-4 py-3">
          <div className="text-xs font-mono uppercase tracking-widest text-[#34d399] mb-1">Grup (Group)</div>
          <p className="text-[12px] text-gray-400">Policy&apos;leri kullanıcılara toplu atamak için kova; kendi başına oturum açamaz.</p>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 6. IAM policy JSON ───── */
  () => (
    <SlideShell>
      <Eyebrow>IAM · policy belgesi</Eyebrow>
      <H2 className="mb-2">Bir policy nasıl okunur?</H2>
      <Sub className="max-w-3xl mb-6">
        Policy bir JSON belgesidir. Asıl iş <span className="text-white">Effect</span>,{" "}
        <span className="text-white">Action</span> ve <span className="text-white">Resource</span>{" "}
        alanlarında biter. Solda en az yetki ilkesine uygun, sağda tehlikeli geniş yetki.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <PolicyWindow title="least-privilege.json" icon={<ShieldCheck className="w-3.5 h-3.5 text-[#34d399]" />}>
{`{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": `}<span className="sgbh-json-good">&quot;Allow&quot;</span>{`,
    "Action": [
      `}<span className="sgbh-json-str">&quot;s3:GetObject&quot;</span>{`
    ],
    "Resource":
      `}<span className="sgbh-json-str">&quot;arn:aws:s3:::raporlar/*&quot;</span>{`
  }]
}`}
        </PolicyWindow>
        <PolicyWindow title="dangerous.json" icon={<AlertTriangle className="w-3.5 h-3.5 text-[#f87171]" />}>
{`{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": `}<span className="sgbh-json-good">&quot;Allow&quot;</span>{`,
    "Action": `}<span className="sgbh-json-bad">&quot;*&quot;</span>{`,
    "Resource": `}<span className="sgbh-json-bad">&quot;*&quot;</span>{`
  }]
}
`}<span className="sgbh-json-comment">{`// her eylem, her kaynak =
// AdministratorAccess eşdeğeri`}</span>{`
`}
        </PolicyWindow>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 sgbh-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <Lock className="w-4 h-4 text-[#06b6d4] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">En az yetki ilkesi:</span> bir kimliğe yalnızca işini yapması için gereken
          eylemleri ve kaynakları ver. <span className="font-mono text-[#f87171]">&quot;Action&quot;: &quot;*&quot;</span> ile
          başlayıp daraltmak değil, dar başlayıp gerektikçe genişletmek doğru yöndür.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 7. IAM en iyi pratikler ───── */
  () => (
    <SlideShell>
      <Eyebrow>IAM · sahadan kurallar</Eyebrow>
      <H2>Root&apos;u kilitle, anahtarı döndür, MFA&apos;yı zorla</H2>
      <Sub className="mt-3 max-w-3xl">
        IAM zafiyetlerinin çoğu eksik bilgiden değil, ihmalden doğar. Aşağıdaki altı pratik,
        bulut hesabının büyük kısmını korur.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Lock}
          title="Root&apos;u kullanma"
          desc="Hesap kök kimliğine MFA tak, anahtarını sil, günlük işlerde asla kullanma. Sadece acil durum için."
          accent="#f87171"
          delay={0.1}
        />
        <FeatureCard
          icon={ShieldCheck}
          title="MFA zorunlu"
          desc="Konsola erişen her insan kimliğine çok faktörlü doğrulama. Çalınan parola tek başına yetmesin."
          accent="#06b6d4"
          delay={0.18}
        />
        <FeatureCard
          icon={UserCog}
          title="Rol > anahtar"
          desc="EC2 ve uygulamalar için uzun ömürlü erişim anahtarı yerine üstlenilen rol kullan; kod içine anahtar gömme."
          accent="#a78bfa"
          delay={0.26}
        />
        <FeatureCard
          icon={Key}
          title="Anahtar rotasyonu"
          desc="Erişim anahtarlarını düzenli döndür, kullanılmayanı devre dışı bırak. Sızan eski anahtar uzun süre risk."
          accent="#fbbf24"
          delay={0.34}
        />
        <FeatureCard
          icon={Users}
          title="Grup ile yönet"
          desc="Policy&apos;yi kullanıcıya tek tek değil gruba bağla; izin yönetimi denetlenebilir ve tutarlı kalır."
          accent="#34d399"
          delay={0.42}
        />
        <FeatureCard
          icon={Eye}
          title="Erişimi denetle"
          desc="IAM Access Analyzer ve son-kullanım raporları ile kimsenin kullanmadığı geniş izinleri budama."
          accent="#22d3ee"
          delay={0.5}
        />
      </div>
    </SlideShell>
  ),

  /* ───── 8. Bölüm 2 — Açık Yüzey ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Açık Yüzey: S3 & Security Groups"
      subtitle="İhlallerin manşete çıkanı genelde tek bir yanlış ayardır: herkese açık bir bucket ya da internete sonuna kadar açık bir port."
      bgGradient="linear-gradient(135deg,#f59e0b,#b45309)"
      shadow="0 30px 80px -20px rgba(245,158,11,0.55)"
      icon={<FileWarning className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 9. S3 erişim modeli ───── */
  () => (
    <SlideShell>
      <Eyebrow>S3 · erişim kapıları</Eyebrow>
      <H2 className="mb-2">Bir bucket&apos;a erişimi dört kapı belirler</H2>
      <Sub className="max-w-3xl mb-6">
        S3&apos;te &quot;public&quot; tek bir düğme değil; birden çok katmanın bileşkesidir. Hepsi
        birlikte değerlendirilir — biri açık kalırsa veri sızar.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: ShieldCheck, title: "Block Public Access", desc: "Hesap ve bucket düzeyinde ana şalter. Açık kalması herkese açık ifşanın bir numaralı sebebi; varsayılan olarak açık tutulmalı.", accent: "#06b6d4" },
          { icon: FolderLock, title: "Bucket Policy", desc: "Bucket&apos;a kaynak-bazlı izin. Principal &quot;*&quot; + s3:GetObject yazmak bucket&apos;ı internete açar.", accent: "#a78bfa" },
          { icon: ListChecks, title: "ACL (eski)", desc: "Nesne/bucket düzeyinde eski erişim listesi. Artık önerilmez; çoğu hesapta kapatılır.", accent: "#fbbf24" },
          { icon: Lock, title: "IAM Policy", desc: "Kimlik-bazlı izin: hangi kullanıcı/rol bucket&apos;a erişebilir. Bucket policy ile birlikte değerlendirilir.", accent: "#34d399" },
        ].map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="sgbh-card rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${c.accent}18`, border: `1px solid ${c.accent}55` }}
            >
              <c.icon className="w-5 h-5" style={{ color: c.accent }} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-1">{c.title}</h3>
              <p className="text-[13px] text-gray-400 leading-relaxed">{c.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 10. S3 misconfiguration — bucket policy + CLI ───── */
  () => (
    <SlideShell>
      <Eyebrow>S3 · yanlış yapılandırma anatomisi</Eyebrow>
      <H2 className="mb-2">Bu policy bucket&apos;ı internete açar</H2>
      <Sub className="max-w-3xl mb-6">
        <span className="font-mono text-[#f87171]">&quot;Principal&quot;: &quot;*&quot;</span> herhangi biri demektir
        (kimlik doğrulama yok). Bir saldırgan kimliği olmadan, sadece bucket adını bilerek tüm nesneleri indirebilir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        <PolicyWindow title="bucket-policy.json (tehlikeli)" icon={<AlertTriangle className="w-3.5 h-3.5 text-[#f87171]" />}>
{`{
  "Statement": [{
    "Effect": `}<span className="sgbh-json-good">&quot;Allow&quot;</span>{`,
    "Principal": `}<span className="sgbh-json-bad">&quot;*&quot;</span>{`,
    "Action": `}<span className="sgbh-json-str">&quot;s3:GetObject&quot;</span>{`,
    "Resource":
      `}<span className="sgbh-json-str">&quot;arn:aws:s3:::sirket-yedek/*&quot;</span>{`
  }]
}`}
        </PolicyWindow>
        <TerminalWindow title="attacker@anon:~ — aws-cli (kimliksiz)">
          <div>
            <span className="sgbh-term-prompt">attacker@anon</span>
            <span className="sgbh-term-dim">:~$</span>{" "}
            <span className="sgbh-term-cmd">aws s3 ls s3://sirket-yedek --no-sign-request</span>
          </div>
          <div className="sgbh-term-err">2026-06-20 03:11   8.4 GB  db-dump-2026.sql</div>
          <div className="sgbh-term-err">2026-06-20 03:12   120 MB  musteri-listesi.csv</div>
          <div className="sgbh-term-dim mt-1">--no-sign-request = imzasız, yani kimlik doğrulamadan</div>
          <div className="mt-2">
            <span className="sgbh-term-prompt">attacker@anon</span>
            <span className="sgbh-term-dim">:~$</span>{" "}
            <span className="sgbh-term-cmd">aws s3 cp s3://sirket-yedek/db-dump-2026.sql . --no-sign-request</span>
          </div>
          <div className="sgbh-term-err">download: s3://sirket-yedek/db-dump-2026.sql to ./db-dump-2026.sql</div>
          <div className="mt-2">
            <span className="sgbh-term-prompt">attacker@anon</span>
            <span className="sgbh-term-dim">:~$</span>{" "}
            <span className="sgbh-term-cmd">_</span>
            <span className="animate-pulse">█</span>
          </div>
        </TerminalWindow>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 sgbh-card-warn rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <X className="w-4 h-4 text-[#f87171] mt-0.5 flex-shrink-0" />
        <span>
          Çözüm: <span className="text-white">Block Public Access</span> açık kalsın, Principal asla &quot;*&quot; olmasın,
          veri <span className="text-white">SSE-KMS</span> ile şifrelensin ve değişiklikler S3 erişim loglarıyla izlensin.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 11. Security groups ───── */
  () => (
    <SlideShell>
      <Eyebrow>Security Group · sanal güvenlik duvarı</Eyebrow>
      <H2 className="mb-2">Hangi trafik içeri girer?</H2>
      <Sub className="max-w-3xl mb-6">
        Security group, EC2 örneğinin önündeki <span className="text-white">stateful</span> güvenlik
        duvarıdır: yalnızca <span className="text-white">izin</span> kuralları içerir (deny yok), izin verilen
        gelen trafiğin yanıtı otomatik geri döner. Sorun, kuralın kaynağını çok geniş bırakmaktır.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="sgbh-card rounded-xl p-1"
      >
        <table className="sgbh-tbl">
          <thead>
            <tr>
              <th style={{ width: "12%" }}>Tür</th>
              <th style={{ width: "12%" }}>Port</th>
              <th style={{ width: "26%" }}>Kaynak (Source)</th>
              <th style={{ width: "16%" }}>Değerlendirme</th>
              <th>Neden?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-mono text-white">HTTPS</td>
              <td className="font-mono">443</td>
              <td><span className="font-mono text-[#86efac]">0.0.0.0/0</span></td>
              <td><span className="sgbh-pill sgbh-pill-a">Kabul</span></td>
              <td>Genel web sitesi için herkese açık olması beklenir.</td>
            </tr>
            <tr>
              <td className="font-mono text-white">SSH</td>
              <td className="font-mono">22</td>
              <td><span className="font-mono text-[#f87171]">0.0.0.0/0</span></td>
              <td><span className="sgbh-pill" style={{ background: "rgba(239,68,68,0.15)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.35)" }}>Tehlikeli</span></td>
              <td>Tüm internete açık yönetim portu — brute force ve tarama hedefi.</td>
            </tr>
            <tr>
              <td className="font-mono text-white">SSH</td>
              <td className="font-mono">22</td>
              <td><span className="font-mono text-[#86efac]">203.0.113.10/32</span></td>
              <td><span className="sgbh-pill sgbh-pill-a">Doğru</span></td>
              <td>Yalnızca tek bir yönetici IP&apos;sine açık; saldırı yüzeyi en aza iner.</td>
            </tr>
            <tr>
              <td className="font-mono text-white">MySQL</td>
              <td className="font-mono">3306</td>
              <td><span className="font-mono text-[#f87171]">0.0.0.0/0</span></td>
              <td><span className="sgbh-pill" style={{ background: "rgba(239,68,68,0.15)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.35)" }}>Kritik</span></td>
              <td>Veritabanı asla internete açılmaz; yalnız uygulama SG&apos;sinden erişilmeli.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-[11px] text-gray-500 font-mono"
      >
        Kural: <span className="text-[#67e8f9]">/32</span> tek host · <span className="text-[#67e8f9]">/0</span> tüm internet ·
        veritabanı kaynağı IP değil, başka bir security group olmalı.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 12. SG katmanları: NACL vs SG ───── */
  () => (
    <SlideShell>
      <Eyebrow>Ağ savunması · iki katman</Eyebrow>
      <H2>Security Group ile Network ACL&apos;i karıştırma</H2>
      <Sub className="mt-3 max-w-3xl">
        İkisi de filtreler ama farklı seviyede ve farklı mantıkla çalışır. Sınavda da sahada da
        en sık karışan ikili.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#67e8f9]">
            <Server className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Security Group</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Örnek (instance) seviyesinde çalışır.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" /><span className="text-white">Stateful</span>: izin verilen isteğin yanıtı otomatik döner.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Yalnız Allow kuralı; örtük olarak gerisini engeller.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Kaynak olarak başka bir SG referansı verilebilir.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#a78bfa]">
            <Network className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Network ACL</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#a78bfa] flex-shrink-0" />Subnet seviyesinde çalışır (tüm örnekleri kapsar).</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#a78bfa] flex-shrink-0" /><span className="text-white">Stateless</span>: gelen ve giden ayrı ayrı tanımlanır.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#a78bfa] flex-shrink-0" />Hem Allow hem Deny kuralı yazılabilir, sıralıdır.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#a78bfa] flex-shrink-0" />Belirli bir IP&apos;yi geniş bir bloktan engellemek için ideal.</li>
          </ul>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 sgbh-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <Layers className="w-4 h-4 text-[#06b6d4] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Defense in depth:</span> ikisi birlikte kullanılır. NACL kaba ağ sınırını
          (subnet) çizer, security group örnek bazında ince ayar yapar. Bir trafiğin geçmesi için her ikisinden de izin gerekir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 13. Bölüm 3 — GuardDuty ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="GuardDuty — Tehdit Tespiti"
      subtitle="Yapılandırmayı sıkılaştırsan da bir gün biri içeri sızabilir. GuardDuty, bulut hesabındaki anormal davranışı sürekli izleyip uyaran tespit servisidir."
      bgGradient="linear-gradient(135deg,#22c55e,#15803d)"
      shadow="0 30px 80px -20px rgba(34,197,94,0.55)"
      icon={<ScanSearch className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 14. GuardDuty nasıl çalışır ───── */
  () => (
    <SlideShell>
      <Eyebrow>GuardDuty · veri kaynakları</Eyebrow>
      <H2 className="mb-2">Ne izler, neyi yakalar?</H2>
      <Sub className="max-w-3xl mb-6">
        GuardDuty ajan kurmadan, üç tür telemetriyi sürekli analiz eder ve bilinen tehdit
        istihbaratı ile makine öğrenmesini birleştirerek anomalileri bulgu (finding) olarak üretir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Activity}
          title="CloudTrail olayları"
          desc="API çağrı geçmişi. Örnek: alışılmadık bir ülkeden root API kullanımı veya toplu izin değişikliği."
          accent="#06b6d4"
          delay={0.15}
        />
        <FeatureCard
          icon={Network}
          title="VPC Flow Logs"
          desc="Ağ akış kayıtları. Örnek: bir EC2&apos;nin bilinen kötü amaçlı IP&apos;lere ya da madencilik havuzuna bağlanması."
          accent="#a78bfa"
          delay={0.25}
        />
        <FeatureCard
          icon={Globe}
          title="DNS sorguları"
          desc="Çözümleme kayıtları. Örnek: komuta-kontrol (C2) için kullanılan alan adlarına yapılan DNS istekleri."
          accent="#34d399"
          delay={0.35}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 sgbh-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <CloudCog className="w-4 h-4 text-[#06b6d4] mt-0.5 flex-shrink-0" />
        <span>
          GuardDuty bir <span className="text-white">tespit</span> servisidir, engelleme değil. Bulgu ürettiğinde otomatik
          aksiyon için EventBridge + Lambda ya da AWS Security Hub ile entegre edilir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 15. GuardDuty bulgu paneli ───── */
  () => (
    <SlideShell>
      <Eyebrow>GuardDuty · bulgu konsolu</Eyebrow>
      <H2 className="mb-2">Bir bulgu (finding) nasıl okunur?</H2>
      <Sub className="max-w-3xl mb-6">
        Her bulgunun bir <span className="text-white">tip</span>, bir{" "}
        <span className="text-white">önem derecesi</span> (severity) ve etkilenen kaynağı vardır.
        Bulgu tipi <span className="font-mono text-[#67e8f9]">Tehdit:Kaynak/Davranış</span> biçiminde okunur.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="space-y-2.5 max-w-4xl"
      >
        {[
          { sev: "high" as const, type: "UnauthorizedAccess:IAMUser/MaliciousIPCaller", detail: "Bir IAM kullanıcısının erişim anahtarı bilinen kötü amaçlı bir IP&apos;den API çağrısı yapıyor.", res: "IAMUser: deploy-bot" },
          { sev: "high" as const, type: "CryptoCurrency:EC2/BitcoinTool.B!DNS", detail: "Bir EC2 örneği bir kripto madencilik havuzuyla ilişkili alan adını çözümlüyor — büyük olasılıkla ele geçirilmiş.", res: "Instance: i-0a9f2c..." },
          { sev: "med" as const, type: "Recon:IAMUser/MaliciousIPCaller", detail: "Kötü amaçlı bir IP, hesapta keşif amaçlı izin sıralama API&apos;leri çağırıyor.", res: "IAMUser: temp-user" },
          { sev: "low" as const, type: "Policy:S3/BucketBlockPublicAccessDisabled", detail: "Bir S3 bucket&apos;ında Block Public Access kapatıldı — public ifşa riski açıldı.", res: "Bucket: sirket-yedek" },
        ].map((f, i) => (
          <motion.div
            key={f.type}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="sgbh-finding"
          >
            <span className={`sgbh-sev ${f.sev === "high" ? "sgbh-sev-high" : f.sev === "med" ? "sgbh-sev-med" : "sgbh-sev-low"}`}>
              {f.sev === "high" ? "Yüksek" : f.sev === "med" ? "Orta" : "Düşük"}
            </span>
            <div className="min-w-0">
              <div className="font-mono text-[12px] text-white leading-tight break-all">{f.type}</div>
              <div className="text-[12px] text-gray-400 mt-1">{f.detail}</div>
              <div className="text-[11px] text-gray-600 font-mono mt-1">{f.res}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SlideShell>
  ),

  /* ───── 16. Olay müdahale akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bulgudan aksiyona</Eyebrow>
      <H2 className="mb-2">Yüksek önemli bir bulgu geldi — ne yaparsın?</H2>
      <Sub className="max-w-3xl mb-8">
        Tespit yalnızca başlangıçtır. Aşağıdaki dört adım, ele geçirilmiş bir kimlik veya örnek için
        temel olay müdahale akışıdır — sıra önemlidir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {[
          { n: "01", icon: Lock, title: "İzole et", desc: "Etkilenen EC2&apos;yi kısıtlayıcı bir SG&apos;ye al; şüpheli IAM anahtarını devre dışı bırak.", accent: "#f87171" },
          { n: "02", icon: Key, title: "Kimlik bilgisini iptal et", desc: "Sızan erişim anahtarını sil/döndür, rol oturumlarını geçersiz kıl, parolayı sıfırla.", accent: "#fbbf24" },
          { n: "03", icon: ScanSearch, title: "Kapsamı çıkar", desc: "CloudTrail ile saldırganın hangi API&apos;leri çağırdığını, neye eriştiğini araştır.", accent: "#06b6d4" },
          { n: "04", icon: ShieldCheck, title: "Kapat & güçlendir", desc: "Açığı gideren yapılandırmayı uygula; benzer bulgu için otomatik müdahale kur.", accent: "#34d399" },
        ].map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.12 }}
            className="sgbh-card rounded-xl p-5 flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: s.accent }}>{s.n}</span>
              <s.icon className="w-5 h-5" style={{ color: s.accent }} />
            </div>
            <div className="text-base font-semibold text-white mb-2">{s.title}</div>
            <p className="text-[12px] text-gray-400 leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 17. Uygulamalı lab ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Kendi AWS Free Tier hesabında dört adım</H2>
      <Sub className="mt-3 max-w-3xl">
        Lab tamamen kendi hesabında. Yanlış yapılandırmayı önce kurup sonra düzelterek riski elinle
        görüyorsun. Sonraki derse bu dördünü yapmış ve ekran görüntülerini almış gelmen bekleniyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: KeyRound, title: "Dar bir IAM kullanıcısı oluştur", desc: "Sadece tek bir bucket&apos;a s3:GetObject veren bir policy yaz; AdministratorAccess verme. MFA ekle.", accent: "#06b6d4" },
          { icon: FolderLock, title: "Bir bucket&apos;ı incele", desc: "Bir test bucket&apos;ında Block Public Access durumunu kontrol et; açıksa bırakma, kapalıysa neden riskli olduğunu yaz.", accent: "#fbbf24" },
          { icon: Network, title: "SSH kuralını daralt", desc: "Bir security group&apos;ta 22 portunu 0.0.0.0/0 yerine kendi IP&apos;ne /32 olarak sınırla; öncesi-sonrası kaydet.", accent: "#a78bfa" },
          { icon: ScanSearch, title: "GuardDuty&apos;yi etkinleştir", desc: "GuardDuty&apos;yi aç, örnek (sample) bulgular üret ve bir yüksek önemli bulguyu 3 cümlede yorumla.", accent: "#34d399" },
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
          <span className="text-white">Yalnızca kendi hesabında.</span> Sana ait olmayan bir bucket&apos;ı taramak veya
          erişmek izinsiz erişimdir ve TCK 243-245 kapsamında suçtur. Ayrıca lab sonunda kaynakları kapatıp
          beklenmedik ücretten kaçın.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 18. Hafta 11 önizleme + kapanış ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{ background: "linear-gradient(135deg,#06b6d4,#0e7490)", boxShadow: "0 30px 80px -20px rgba(6,182,212,0.6)" }}
        >
          <ShieldCheck className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>10. hafta tamamlandı · sıradaki: KVKK &amp; Veri Sorumlusu</Eyebrow>
        <H1>
          <span className="sgbh-shimmer-soft">Teknikten Hukuka</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta bir S3 sızıntısını teknik olarak önledik. Hafta 11&apos;de aynı olayın hukuki yüzünü
          açıyoruz: KVKK kapsamında veri sorumlusunun yükümlülükleri, ihlal bildirimi ve idari yaptırımlar.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
          <FeatureCard icon={FileWarning} title="İhlal bildirimi" desc="Veri ihlalinin Kurul&apos;a ve ilgili kişiye bildirim süreci." accent="#06b6d4" delay={0.1} />
          <FeatureCard icon={Users} title="Veri sorumlusu" desc="Kim sorumlu? Veri sorumlusu ve işleyen ayrımı." accent="#a78bfa" delay={0.18} />
          <FeatureCard icon={ShieldCheck} title="Teknik tedbir" desc="KVKK&apos;nın beklediği teknik ve idari tedbirler." accent="#34d399" delay={0.26} />
          <FeatureCard icon={Target} title="Yaptırım" desc="İdari para cezaları ve örnek Kurul kararları." accent="#fbbf24" delay={0.34} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="sgbh-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#06b6d4] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Çarşamba</div>
            <div className="text-sm text-gray-400">13:30 — 17:00</div>
          </div>
          <div className="sgbh-card rounded-xl p-5">
            <Target className="w-5 h-5 text-[#a78bfa] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">AWS Free Tier</div>
            <div className="text-sm text-gray-400">hesap + CLI kurulu getir</div>
          </div>
          <div className="sgbh-card rounded-xl p-5">
            <Brain className="w-5 h-5 text-[#34d399] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Lab raporu</div>
            <div className="text-sm text-gray-400">4 adım + ekran görüntüsü</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Yalnızca kendi hesabın · lab sonunda kaynakları kapat</span>
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
          BVA 2205 · 10. Hafta · Bulut Güvenliği (AWS)
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
