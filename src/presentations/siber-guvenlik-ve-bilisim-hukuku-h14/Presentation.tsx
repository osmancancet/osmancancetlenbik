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
  Scale,
  Gavel,
  ShieldCheck,
  Shield,
  Lock,
  FileText,
  Network,
  Database,
  Server,
  UserCheck,
  Bell,
  Clock,
  Calendar,
  BookOpen,
  Mail,
  Bug,
  CheckCircle2,
  AlertTriangle,
  Ban,
  Handshake,
  Building2,
  FileSignature,
  Send,
  ListChecks,
  Brain,
  Target,
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

/* Sahte security.txt + sorumlu açıklama e-postası penceresi */
function DisclosureMail() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="sgbh-window-chrome w-full max-w-3xl mx-auto"
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
          <Send className="w-3.5 h-3.5" />
          <span>İlk bildirim e-postası — taslak</span>
        </div>
      </div>
      <div className="sgbh-terminal">
        <div className="sgbh-term-dim">// önce keşfet: well-known security.txt</div>
        <div>
          <span className="sgbh-term-prompt">$</span>{" "}
          <span className="sgbh-term-cmd">curl https://hedef-kurum.tr/.well-known/security.txt</span>
        </div>
        <div><span className="sgbh-term-ok">Contact:</span> mailto:security@hedef-kurum.tr</div>
        <div><span className="sgbh-term-ok">Policy:</span> https://hedef-kurum.tr/guvenlik-politikasi</div>
        <div><span className="sgbh-term-ok">Encryption:</span> https://hedef-kurum.tr/pgp-key.txt</div>
        <div className="sgbh-term-dim mt-2">────────────────────────────</div>
        <div className="mt-2"><span className="sgbh-term-warn">Kime:</span> security@hedef-kurum.tr</div>
        <div><span className="sgbh-term-warn">Konu:</span> Sorumlu açıklama &mdash; IDOR / yetkilendirme zafiyeti</div>
        <div className="mt-2 text-gray-300">Merhaba,</div>
        <div className="text-gray-300">/api/v1/fatura/&#123;id&#125; uç noktasında, oturum sahibi olmayan</div>
        <div className="text-gray-300">bir kullanıcının başka kullanıcıların faturalarını</div>
        <div className="text-gray-300">görebildiğini tespit ettim (IDOR).</div>
        <div className="mt-2 text-gray-300">Kapsam: yalnızca kendi iki test hesabımla doğruladım,</div>
        <div className="text-gray-300">veri indirmedim, kopyalamadım, paylaşmadım.</div>
        <div className="mt-2 text-gray-300">Önerilen süre: yamayı uygulamanız için 90 gün.</div>
        <div className="text-gray-300">PoC ve adımlar ektedir. İyi çalışmalar.</div>
        <div className="mt-2">
          <span className="sgbh-term-prompt">$</span>{" "}
          <span className="sgbh-term-cmd">_</span>
          <span className="animate-pulse">█</span>
        </div>
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
        <Eyebrow>BVA 2205 · 14. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="sgbh-shimmer">Türk Bilişim Hukuku</span>
          <br />
          <span className="text-white/90">Özet &amp; Sorumlu Açıklama</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          KVKK · 5651 · TCK 243-245. Teknik insanın bilmesi gereken üç kanun ve
          zafiyet bildirmenin hukuka uygun yolu.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Scale}
            title="KVKK 6698"
            desc="Kişisel verinin işlenmesi, ihlal bildirimi, idari para cezaları."
            delay={0.3}
            accent="#a78bfa"
          />
          <FeatureCard
            icon={Network}
            title="5651 · İnternet"
            desc="İçerik/yer/erişim sağlayıcı, log saklama, erişim engeli."
            delay={0.45}
            accent="#06b6d4"
          />
          <FeatureCard
            icon={Gavel}
            title="TCK 243-245"
            desc="Bilişim suçları: yetkisiz erişim, sistem bozma, kart suistimali."
            delay={0.6}
            accent="#f87171"
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Çarşamba 13:30 — 17:00 · Mevzuat özeti + vaka tartışması
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Köprü · geçen hafta → bu hafta ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 13. haftadan 14. haftaya</Eyebrow>
      <H2>Tekniği öğrendik; şimdi sınırı çizen kanunu</H2>
      <Sub className="mt-3 max-w-3xl">
        Dönem boyunca tarama, sızma, analiz ve savunma yaptık. Aynı becerinin
        izinli kullanımı meslek, izinsizi suçtur. Bu hafta o çizgiyi belirleyen
        üç temel mevzuatı özetliyor ve bir zafiyeti hukuka uygun bildirmenin
        yolunu öğreniyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#67e8f9]">
            <Brain className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Şimdiye kadar (teknik)</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Nmap ile keşif, Wireshark ile analiz.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />OWASP Top 10, web zafiyetleri.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Katmanlı savunma, olay müdahale.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#c4b5fd]">
            <Scale className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta (hukuki)</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#a78bfa] flex-shrink-0" />Hangi veri korunur, ihlali kim nasıl bildirir?</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#a78bfa] flex-shrink-0" />Hangi eylem &quot;giriş&quot;, hangisi &quot;bozma&quot; suçu?</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#a78bfa] flex-shrink-0" />Bir bug&apos;ı hapse girmeden nasıl bildiririm?</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. Bu dersin akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç kanun → bir pratik: sorumlu açıklama</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce kişisel veri (KVKK), sonra internet altyapısı (5651), sonra ceza
        (TCK). En sonunda hepsini birleştiren tek soru: bir zafiyeti yasal yoldan
        nasıl bildiririm?
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "KVKK 6698", items: ["Kişisel veri & özel nitelik", "İşleme şartları, aydınlatma", "İhlal bildirimi 72 saat"], icon: Scale, accent: "#a78bfa" },
          { range: "02", title: "5651 & TCK", items: ["İçerik/yer/erişim sağlayıcı", "Log saklama, erişim engeli", "TCK 243-244-245 suçları"], icon: Gavel, accent: "#06b6d4" },
          { range: "03", title: "Sorumlu Açıklama", items: ["security.txt & kapsam", "Bildirim & yama süresi", "Bug bounty & güvenli liman"], icon: Handshake, accent: "#34d399" },
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
                <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: g.accent }}>Bölüm {g.range}</div>
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

  /* ───── 4. Bölüm 1 — KVKK ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="KVKK · 6698 Sayılı Kanun"
      subtitle="Kişisel Verilerin Korunması Kanunu. Hangi veri korunur, nasıl işlenir, ihlal olursa kim ne kadar sürede bildirir?"
      bgGradient="linear-gradient(135deg,#a78bfa,#5b21b6)"
      shadow="0 30px 80px -20px rgba(167,139,250,0.55)"
      icon={<Scale className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 5. Kişisel veri nedir? ───── */
  () => (
    <SlideShell>
      <Eyebrow>KVKK · temel kavramlar</Eyebrow>
      <H2 className="mb-2">Kişisel veri &amp; özel nitelikli veri</H2>
      <Sub className="max-w-3xl mb-6">
        Kişisel veri, kimliği belirli ya da belirlenebilir gerçek kişiye ait her
        türlü bilgidir. Bir alt küme olan özel nitelikli (hassas) veri, sızdığında
        çok daha ağır sonuç doğurduğu için daha katı korunur.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#06b6d4]">
            <Database className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Kişisel veri</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Ad-soyad, T.C. kimlik no, doğum tarihi</li>
            <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />E-posta, telefon, adres</li>
            <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />IP adresi, çerez kimliği, konum</li>
            <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Plaka, ses kaydı, fotoğraf</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card-warn rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#f87171]">
            <Lock className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Özel nitelikli (md. 6)</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Sağlık &amp; cinsel hayat</li>
            <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Din, mezhep, felsefi inanç</li>
            <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Irk, etnik köken, siyasi düşünce</li>
            <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Biyometrik, genetik veri; ceza mahkumiyeti</li>
          </ul>
          <div className="text-[11px] text-gray-500 mt-3 border-t border-white/5 pt-3">
            Bu veriler kural olarak ilgili kişinin açık rızası olmadan işlenemez.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 6. KVKK roller & ihlal bildirimi ───── */
  () => (
    <SlideShell>
      <Eyebrow>KVKK · roller ve süreler</Eyebrow>
      <H2 className="mb-2">Kim kimdir, ihlalde saat işler</H2>
      <Sub className="max-w-3xl mb-6">
        Sorumluluk &quot;veri sorumlusu&quot;na aittir. Bir ihlal olduğunda iki ayrı
        bildirim süresi devreye girer; bunları karıştırmak ceza sebebidir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {[
            { icon: Building2, role: "Veri Sorumlusu", desc: "Veriyi neden/nasıl işleneceğine karar veren; asıl yükümlü.", color: "#a78bfa" },
            { icon: Server, role: "Veri İşleyen", desc: "Sorumlu adına veriyi işleyen taraf (örn. bulut sağlayıcı).", color: "#06b6d4" },
            { icon: UserCheck, role: "İlgili Kişi", desc: "Verisi işlenen gerçek kişi; haklarını kullanan taraf.", color: "#34d399" },
          ].map((r, i) => (
            <motion.div
              key={r.role}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.1 }}
              className="sgbh-card rounded-lg px-4 py-3 flex items-start gap-3"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${r.color}18`, border: `1px solid ${r.color}55` }}
              >
                <r.icon className="w-4.5 h-4.5" style={{ color: r.color }} />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{r.role}</div>
                <div className="text-[12px] text-gray-400 leading-snug">{r.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-[#fbbf24]">
            <Bell className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">İhlal bildirimi</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#fbbf24] mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-white font-semibold text-sm">Kurul&apos;a: en kısa sürede, 72 saat</div>
                <div className="text-[12px] text-gray-400">Veri sorumlusu, ihlali öğrendiği andan itibaren Kişisel Verileri Koruma Kurulu&apos;na bildirir.</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#34d399] mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-white font-semibold text-sm">İlgili kişiye: makul sürede</div>
                <div className="text-[12px] text-gray-400">Verisi etkilenen kişilere de mümkün olan en kısa sürede bilgi verilir.</div>
              </div>
            </div>
            <div className="text-[11px] text-gray-500 border-t border-white/5 pt-3">
              VERBİS kaydı (Veri Sorumluları Sicili) ayrıca, belirli eşikleri aşan
              sorumlular için bir yükümlülüktür.
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 7. İlgili kişinin hakları + yaptırım ───── */
  () => (
    <SlideShell>
      <Eyebrow>KVKK · md. 11 hakları &amp; yaptırım</Eyebrow>
      <H2 className="mb-2">İlgili kişi ne isteyebilir?</H2>
      <Sub className="max-w-3xl mb-6">
        Kanun, verisi işlenen kişiye somut haklar tanır. Bunlara uymamak ve
        güvenlik tedbirini almamak idari para cezasıyla yaptırıma bağlanmıştır.
      </Sub>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { icon: BookOpen, t: "Bilgi talep et", d: "Verim işleniyor mu, hangi amaçla?" },
          { icon: FileText, t: "Aktarım öğren", d: "Yurt içi/dışı kime aktarıldı?" },
          { icon: FileSignature, t: "Düzeltme iste", d: "Eksik/yanlış veriyi düzelttir." },
          { icon: Ban, t: "Silme iste", d: "Şartlar oluşunca sildir/yok ettir." },
          { icon: Shield, t: "İtiraz et", d: "Otomatik analizle aleyhe sonuca itiraz." },
          { icon: Scale, t: "Tazminat", d: "Zarara uğradıysa giderim talep et." },
        ].map((h, i) => (
          <motion.div
            key={h.t}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className="sgbh-card rounded-lg p-4"
          >
            <h.icon className="w-5 h-5 text-[#a78bfa] mb-2" />
            <div className="text-sm font-semibold text-white">{h.t}</div>
            <div className="text-[11px] text-gray-400 leading-snug mt-0.5">{h.d}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 sgbh-card-warn rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <Gavel className="w-4 h-4 text-[#f87171] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Yaptırım:</span> Veri güvenliği tedbirlerini almamak (md. 12) ve
          aydınlatma yükümlülüğünü ihlal, idari para cezasına tabidir. Tutarlar her yıl yeniden değerleme
          oranıyla güncellenir; güncel tarifeyi her zaman kvkk.gov.tr&apos;den teyit et.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 8. Bölüm 2 — 5651 & TCK ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="5651 Sayılı Kanun & TCK 243-245"
      subtitle="İnternet altyapısının sorumluları, log saklama ve erişim engeli; ardından bilişim suçlarının ceza karşılığı."
      bgGradient="linear-gradient(135deg,#06b6d4,#0e7490)"
      shadow="0 30px 80px -20px rgba(6,182,212,0.6)"
      icon={<Gavel className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 9. 5651 sağlayıcılar ───── */
  () => (
    <SlideShell>
      <Eyebrow>5651 · 2007 · sağlayıcı türleri</Eyebrow>
      <H2 className="mb-2">İnternette kim neyden sorumlu?</H2>
      <Sub className="max-w-3xl mb-6">
        5651 sayılı Kanun, internet ortamındaki yayınları ve sorumlulukları
        düzenler. Bir geliştiricinin bilmesi gereken çekirdek, dört sağlayıcı
        rolü ve log saklama yükümlülüğüdür.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: FileText, t: "İçerik Sağlayıcı", d: "İnternette sunulan her türlü bilgiyi/veriyi üreten, değiştiren ve sağlayan kişi. Kendi içeriğinden sorumludur.", c: "#a78bfa" },
          { icon: Server, t: "Yer Sağlayıcı (Hosting)", d: "Hizmet ve içerikleri barındıran sistemleri sağlayan/işleten. Haberdar edilirse yayını kaldırma (uyar-kaldır) yükümlülüğü var.", c: "#06b6d4" },
          { icon: Network, t: "Erişim Sağlayıcı (ISP)", d: "Kullanıcılara internet erişimi sunan taraf. Erişim engeli kararlarını uygular, trafik bilgisini saklar.", c: "#34d399" },
          { icon: Building2, t: "Toplu Kullanım Sağlayıcı", d: "Kafe, otel, kampüs gibi yerde internet erişimi sunan. İç IP dağıtım loglarını tutar.", c: "#fbbf24" },
        ].map((p, i) => (
          <motion.div
            key={p.t}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="sgbh-card rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${p.c}18`, border: `1px solid ${p.c}55` }}
            >
              <p.icon className="w-5 h-5" style={{ color: p.c }} />
            </div>
            <div>
              <div className="text-base font-semibold text-white">{p.t}</div>
              <div className="text-[12px] text-gray-400 leading-relaxed mt-0.5">{p.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 sgbh-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <Clock className="w-4 h-4 text-[#06b6d4] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Log saklama:</span> Sağlayıcılar trafik/erişim kayıtlarını
          mevzuatta öngörülen süre boyunca (ikincil düzenlemelerle belirlenen, genellikle yıllarla ifade edilen
          bir süre) doğru ve bütünlüğü bozulmadan saklamakla yükümlüdür. Güncel süreyi yürürlükteki yönetmelikten teyit et.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 10. 5651 erişim engeli ───── */
  () => (
    <SlideShell>
      <Eyebrow>5651 · erişim engeli mekanizması</Eyebrow>
      <H2 className="mb-2">Bir içerik nasıl engellenir?</H2>
      <Sub className="max-w-3xl mb-6">
        Engelleme keyfi değildir; bir karar zincirine dayanır. Teknik olarak da
        engel farklı seviyelerde uygulanabilir &mdash; her birinin etkisi ve
        aşılabilirliği farklıdır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-[#06b6d4] mb-4">Karar zinciri</div>
          <div className="sgbh-timeline space-y-5">
            {[
              { t: "Talep / şikayet", d: "BTK, ilgili kurum veya kişi başvurusu." },
              { t: "Sulh ceza hakimliği kararı", d: "Kural olarak yargı kararı esastır." },
              { t: "İdari tedbir (sınırlı haller)", d: "Belirli katalog suçlarda Başkanlık re&apos;sen tedbir uygulayabilir." },
              { t: "Uygulama (ISP)", d: "Erişim sağlayıcı kararı teknik olarak uygular." },
            ].map((s) => (
              <div key={s.t} className="relative">
                <span className="sgbh-timeline-dot">
                  <ChevronRight className="w-3 h-3 text-[#06b6d4]" />
                </span>
                <div className="text-sm font-semibold text-white">{s.t}</div>
                <div className="text-[12px] text-gray-400">{s.d}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-[#a78bfa] mb-4">Teknik uygulama seviyeleri</div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3"><span className="font-mono text-[11px] px-2 py-0.5 rounded bg-black/40 text-[#67e8f9] flex-shrink-0">URL</span><span>Tek bir sayfa/yol engellenir; en orantılı yöntem.</span></li>
            <li className="flex gap-3"><span className="font-mono text-[11px] px-2 py-0.5 rounded bg-black/40 text-[#67e8f9] flex-shrink-0">DNS</span><span>Alan adı çözümlenmez; farklı DNS ile kolay aşılır.</span></li>
            <li className="flex gap-3"><span className="font-mono text-[11px] px-2 py-0.5 rounded bg-black/40 text-[#67e8f9] flex-shrink-0">IP</span><span>Tüm IP bloklanır; aynı IP&apos;deki masum siteler de etkilenir (aşırı engelleme).</span></li>
          </ul>
          <div className="text-[11px] text-gray-500 mt-4 border-t border-white/5 pt-3">
            Engelin yerindeliği ve orantılılığı, ifade özgürlüğü ile sık sık dengelenir;
            kararlar yargı denetimine tabidir.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 11. TCK 243-245 tablo ───── */
  () => (
    <SlideShell>
      <Eyebrow>TCK · Onuncu Bölüm · bilişim suçları</Eyebrow>
      <H2>Üç madde, üç farklı eylem</H2>
      <Sub className="mt-3 max-w-3xl">
        Türk Ceza Kanunu&apos;nun bilişim suçları bölümü üç temel maddeden oluşur.
        Hangi eylemin hangi maddeye girdiğini ayırt etmek, &quot;test ettim&quot;
        savunmasının neden geçersiz olduğunu da gösterir.
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
              <th style={{ width: "14%" }}>Madde</th>
              <th style={{ width: "30%" }}>Eylem</th>
              <th>Tipik örnek</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="font-semibold text-white">TCK 243</div>
                <div className="text-[11px] text-gray-500 font-mono">yetkisiz erişim</div>
              </td>
              <td>Bir bilişim sisteminin bütününe veya bir kısmına hukuka aykırı olarak girmek ve orada kalmaya devam etmek.</td>
              <td>İzinsiz ele geçirilen parolayla panele giriş yapmak; açık bir API&apos;den başkasının verisini görüntülemek.</td>
            </tr>
            <tr>
              <td>
                <div className="font-semibold text-white">TCK 244</div>
                <div className="text-[11px] text-gray-500 font-mono">engelleme / bozma</div>
              </td>
              <td>Sistemin işleyişini engellemek, bozmak; verileri yok etmek, değiştirmek, erişilmez kılmak.</td>
              <td>DDoS ile hizmeti çökertmek; veritabanını silmek/şifrelemek (ransomware); kayıtları tahrif etmek.</td>
            </tr>
            <tr>
              <td>
                <div className="font-semibold text-white">TCK 245</div>
                <div className="text-[11px] text-gray-500 font-mono">kart suistimali</div>
              </td>
              <td>Başkasına ait banka/kredi kartını ele geçirip kullanmak veya sahte kart üretmek/kullanmak.</td>
              <td>Çalınan kart bilgisiyle alışveriş; skimmer ile kopyalanmış kart kullanımı.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 text-[11px] text-gray-500 font-mono max-w-4xl"
      >
        Not: Ceza miktarları kanun metnine ve yıllara göre değişebilir; ezber yerine maddenin tanımladığı eyleme odaklan.
        Birçok bilişim suçu şikayete bağlı değildir, re&apos;sen soruşturulur.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 12. Suç mu, meslek mi? ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sınır çizgisi · niyet değil, izin</Eyebrow>
      <H2 className="mb-2">Aynı komut: meslek mi, suç mu?</H2>
      <Sub className="max-w-3xl mb-6">
        Teknik eylem aynı olabilir; suçu meslekten ayıran şey &quot;iyi niyet&quot;
        değil, <span className="text-white">yazılı yetkilendirme</span> ve
        <span className="text-white"> kapsamdır</span>. Aşağıdaki ikili bunu gösteriyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-[#34d399]">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Meslek (yasal)</span>
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3"><ShieldCheck className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />İmzalı pentest sözleşmesi / kapsam (scope) var.</li>
            <li className="flex gap-3"><ShieldCheck className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Yalnızca izin verilen hedef ve uç noktalar.</li>
            <li className="flex gap-3"><ShieldCheck className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Veri kopyalanmaz; bulgular raporlanır.</li>
            <li className="flex gap-3"><ShieldCheck className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Bug bounty programı kuralları izlenir.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card-warn rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-[#f87171]">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Suç (TCK 243+)</span>
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3"><Ban className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />&quot;Açık buldum, denedim&quot; &mdash; izin yoksa erişim suçtur.</li>
            <li className="flex gap-3"><Ban className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Kapsam dışı sisteme geçmek (scope creep).</li>
            <li className="flex gap-3"><Ban className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Veriyi indirmek, paylaşmak, satmak.</li>
            <li className="flex gap-3"><Ban className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Zafiyeti &quot;kanıtlamak&quot; için zarar vermek.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 13. Bölüm 3 — Sorumlu açıklama ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Sorumlu Açıklama"
      subtitle="Bir zafiyet buldun. Hapse girmeden, kuruma zarar vermeden, etik kalarak nasıl bildirilir? Coordinated Vulnerability Disclosure."
      bgGradient="linear-gradient(135deg,#22c55e,#15803d)"
      shadow="0 30px 80px -20px rgba(34,197,94,0.55)"
      icon={<Handshake className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 14. Sorumlu açıklama akışı (timeline) ───── */
  () => (
    <SlideShell>
      <Eyebrow>Coordinated Vulnerability Disclosure</Eyebrow>
      <H2 className="mb-2">Bildirimin altı adımı</H2>
      <Sub className="max-w-3xl mb-6">
        Sorumlu açıklama, zafiyeti önce üreticiyle paylaşıp düzeltmesi için makul
        süre tanımak, kamuya ise ancak yama sonrası (veya süre dolunca) çıkmaktır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-timeline space-y-5"
        >
          {[
            { t: "1 · Keşif & doğrulama", d: "Zafiyeti yalnızca kendi/test hesabınla, minimum müdahaleyle doğrula." },
            { t: "2 · İletişim kanalını bul", d: "security.txt, güvenlik politikası veya bug bounty platformu." },
            { t: "3 · Şifreli bildirim", d: "PoC, adımlar ve etkiyi net biçimde, mümkünse PGP ile gönder." },
          ].map((s) => (
            <div key={s.t} className="relative">
              <span className="sgbh-timeline-dot">
                <ChevronRight className="w-3 h-3 text-[#06b6d4]" />
              </span>
              <div className="text-sm font-semibold text-white">{s.t}</div>
              <div className="text-[12px] text-gray-400 leading-snug">{s.d}</div>
            </div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-timeline space-y-5"
        >
          {[
            { t: "4 · Makul süre tanı", d: "Yama için tipik olarak 90 gün; ağır zafiyette ucu açık görüşme." },
            { t: "5 · Üreticiyle koordinasyon", d: "İlerlemeyi takip et, gerekirse CVE/CVD süreci işlet." },
            { t: "6 · Kamuya açıklama", d: "Yama yayınlanınca ya da süre dolduğunda; veriyi ifşa etmeden." },
          ].map((s) => (
            <div key={s.t} className="relative">
              <span className="sgbh-timeline-dot" style={{ borderColor: "#34d399", boxShadow: "0 0 12px rgba(52,211,153,0.5)" }}>
                <ChevronRight className="w-3 h-3 text-[#34d399]" />
              </span>
              <div className="text-sm font-semibold text-white">{s.t}</div>
              <div className="text-[12px] text-gray-400 leading-snug">{s.d}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 15. security.txt + bildirim e-postası ───── */
  () => (
    <SlideShell>
      <Eyebrow>Pratik · iletişim &amp; ilk e-posta</Eyebrow>
      <H2 className="mb-2">Önce kanalı bul, sonra ölçülü yaz</H2>
      <Sub className="max-w-3xl mb-6">
        İyi bir bildirim kısa, doğrulanabilir ve kapsamı nettir. &quot;Veri
        indirmedim&quot; cümlesi senin de hukuki güvencendir.
      </Sub>
      <DisclosureMail />
    </SlideShell>
  ),

  /* ───── 16. Güvenli liman & uyarılar ───── */
  () => (
    <SlideShell>
      <Eyebrow>Güvenli liman · safe harbor</Eyebrow>
      <H2 className="mb-2">Seni koruyan ve riske atan ayrıntılar</H2>
      <Sub className="max-w-3xl mb-6">
        Bir bug bounty programının &quot;safe harbor&quot; maddesi, kurallara
        uyduğun sürece yasal işlem yapılmayacağını taahhüt eder. Ama bu koruma
        koşulludur ve sınırlıdır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={ShieldCheck}
          title="Kapsam içinde kal"
          desc="Yalnızca programda listelenen hedefler. Kapsam dışına çıkmak güvenli limanı geçersiz kılar."
          accent="#34d399"
          delay={0.1}
        />
        <FeatureCard
          icon={Ban}
          title="Veriye dokunma"
          desc="Zafiyeti kanıtlamak için gereken minimumla yetin; başkasının verisini görüntüleme, indirme, paylaşma."
          accent="#fbbf24"
          delay={0.2}
        />
        <FeatureCard
          icon={FileText}
          title="Kuralı yazılı al"
          desc="Safe harbor sözleşmenin metnindedir. Sözlü &quot;sorun olmaz&quot; hukuken güvence değildir."
          accent="#06b6d4"
          delay={0.3}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 sgbh-card-warn rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <AlertTriangle className="w-4 h-4 text-[#f87171] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Türkiye gerçeği:</span> Bug bounty güvenli limanı bir program
          taahhüdüdür, kanun değil. Program yoksa veya kapsam dışındaysan, TCK 243-245 hâlâ uygulanır.
          Şüphede kal&mdash;yazılı izin olmadan test etme.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 17. Bu hafta · uygulamalı görev ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı görev</Eyebrow>
      <H2>Mevzuatı sahaya indir: 4 adım</H2>
      <Sub className="mt-3 max-w-3xl">
        Hepsi tamamen yasal ve halka açık kaynaklarla yapılır; kimseyi taramaz,
        test etmezsin. Sonraki derse bunları yapmış gelmen bekleniyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: BookOpen, title: "KVKK ihlal kararı oku", desc: "kvkk.gov.tr&apos;den yayımlanmış bir &quot;Kurul Kararı&quot; seç; hangi madde ihlal edilmiş, hangi tedbir eksik kalmış, 3 cümlede özetle.", accent: "#a78bfa" },
          { icon: FileSignature, title: "Bir security.txt yaz", desc: "Kendi örnek projen için .well-known/security.txt taslağı hazırla: Contact, Policy, Encryption, Expires alanlarıyla.", accent: "#06b6d4" },
          { icon: Bug, title: "Vakayı maddeye eşle", desc: "Bir gerçek bilişim olayı seç; eylemleri TCK 243 / 244 / 245&apos;ten hangisine girdiğini gerekçeleriyle yaz.", accent: "#f87171" },
          { icon: ListChecks, title: "Bildirim taslağı kur", desc: "Hayali bir IDOR için sorumlu açıklama e-postası yaz: kapsam, &quot;veri indirmedim&quot; beyanı ve 90 günlük süre talebiyle.", accent: "#34d399" },
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
                <h3 className="text-base font-semibold text-white" dangerouslySetInnerHTML={{ __html: t.title }} />
              </div>
              <p className="text-sm text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.desc }} />
            </div>
          </motion.div>
        ))}
      </div>
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
          style={{ background: "linear-gradient(135deg,#a78bfa,#5b21b6)", boxShadow: "0 30px 80px -20px rgba(167,139,250,0.6)" }}
        >
          <ShieldCheck className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>14. hafta tamamlandı · sıradaki: Final &amp; vaka analizi</Eyebrow>
        <H1>
          <span className="sgbh-shimmer-soft">Tekniği hukukla birleştir</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Son hafta dönemin tüm parçalarını tek bir kapsamlı vaka üzerinde
          birleştiriyoruz: keşiften savunmaya, ihlal bildiriminden sorumlu
          açıklamaya. Final projesi sunumları.
        </Sub>
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
            <div className="text-white font-semibold">4 görev</div>
            <div className="text-sm text-gray-400">tamamlanmış gelsin</div>
          </div>
          <div className="sgbh-card rounded-xl p-5">
            <Brain className="w-5 h-5 text-[#34d399] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Final projesi</div>
            <div className="text-sm text-gray-400">vaka + savunma planı</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Yazılı izin olmadan test etme · veriye dokunma · ölçülü bildir</span>
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
          BVA 2205 · 14. Hafta · Türk Bilişim Hukuku Özeti
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
