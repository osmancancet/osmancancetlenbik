"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Ban,
  BookOpen,
  Check,
  FileSearch,
  FileText,
  FlaskConical,
  GraduationCap,
  Layers,
  Link2,
  Lock,
  Minus,
  Presentation as PresentationIcon,
  Quote,
  ShieldCheck,
  Sparkles,
  Table2,
  Users,
  Wallet,
  X,
} from "lucide-react";
import {
  DeckShell,
  Slide,
  Eyebrow,
  H1,
  H2,
  Sub,
  Source,
} from "../_shared/deck/DeckShell";
import "./styles.css";

/**
 * Akademisyenler için Yapay Zekâ — Claude ile günlük akademik iş.
 *
 * İÇERİK KURALI: Bu sunumdaki her sayı, tarih ve kapsam iddiası Anthropic'in
 * resmî sayfalarından ya da yayıncıların kendi politika metinlerinden alındı
 * ve slaytın altında kaynağı yazıyor. Doğrulanamayan hiçbir iddia sunuma
 * girmedi — özellikle "akademisyenlere ücretsiz Pro" söylentisi, gerçekte
 * ABD'deki K-12 öğretmenlerine yönelik bir program olduğu için düzeltilerek
 * anlatılıyor (bkz. 8. ve 9. slayt).
 *
 * Erişim tarihi: 4 Eylül 2026.
 */

const ACCENT = "#d97757";

/* ─── Yardımcılar ──────────────────────────────────────────────── */

function Grid({ children }: { children: ReactNode }) {
  return <div className="absolute inset-0 ai-grid-bg pointer-events-none">{children}</div>;
}

function Fade({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Card({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="ai-card p-6 h-full">
      <span
        className="inline-grid place-items-center w-10 h-10 rounded-lg mb-4"
        style={{ background: "color-mix(in srgb, var(--deck-accent) 16%, transparent)" }}
      >
        <Icon className="w-4.5 h-4.5" />
      </span>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm leading-relaxed text-white/55">{children}</p>
    </div>
  );
}

function Divider({
  num,
  title,
  subtitle,
}: {
  num: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="relative w-full h-full flex items-center justify-center px-10">
      <Grid>{null}</Grid>
      <div className="relative text-center max-w-3xl">
        <Fade>
          <div
            className="font-mono text-[11px] uppercase tracking-[0.3em] mb-6"
            style={{ color: ACCENT }}
          >
            Bölüm {num}
          </div>
        </Fade>
        <Fade delay={0.1}>
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.05]">
            {title}
          </h2>
        </Fade>
        <Fade delay={0.2}>
          <p className="mt-6 text-lg text-white/50 leading-relaxed">{subtitle}</p>
        </Fade>
      </div>
    </div>
  );
}

/** Doğru/yanlış hücresi — plan karşılaştırma tablosunda. */
const Yes = () => <Check className="w-4 h-4 ai-yes" aria-label="var" />;
const No = () => <Minus className="w-4 h-4 ai-no" aria-label="yok" />;

/* ─── Slaytlar ─────────────────────────────────────────────────── */

const slides: Array<(active: boolean) => ReactNode> = [
  /* 01 — Kapak */
  () => (
    <div className="relative w-full h-full flex items-center justify-center px-10">
      <Grid>{null}</Grid>
      <div
        aria-hidden
        className="absolute -inset-x-40 top-1/3 h-96 blur-[140px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${ACCENT}22, transparent 70%)` }}
      />
      <div className="relative text-center max-w-4xl">
        <Fade>
          <div
            className="font-mono text-xs uppercase tracking-[0.3em] mb-8"
            style={{ color: ACCENT }}
          >
            Manisa Celal Bayar Üniversitesi
          </div>
        </Fade>
        <Fade delay={0.12}>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.05]">
            Akademisyenler için
            <br />
            <span style={{ color: ACCENT }}>yapay zekâ</span>
          </h1>
        </Fade>
        <Fade delay={0.24}>
          <p className="mt-8 text-xl text-white/55 leading-relaxed">
            Makale yazdırmadan, ders hazırlamaktan sunum üretmeye:
            <br />
            işin hangi kısmını devredebilirsiniz, hangisini asla devredemezsiniz.
          </p>
        </Fade>
        <Fade delay={0.36}>
          <div className="mt-12 font-mono text-sm text-white/35">
            Öğr. Gör. Osman Can Çetlenbik · osmancancetlenbik.com
          </div>
        </Fade>
      </div>
    </div>
  ),

  /* 02 — Bu sunumda ne YOK (güven kancası) */
  () => (
    <Slide>
      <Eyebrow>Önce şunu netleştirelim</Eyebrow>
      <H1>Bu sunumda abartı yok.</H1>
      <Sub>
        Yapay zekâ anlatan sunumların çoğu vaatle dolu. Buradaki her sayı,
        tarih ve kapsam bilgisi üreticinin kendi resmî sayfasından alındı ve
        slaydın altında kaynağı yazıyor. Doğrulayamadığım hiçbir şeyi
        anlatmıyorum.
      </Sub>
      <div className="mt-10 grid md:grid-cols-2 gap-4">
        <Fade delay={0.1}>
          <div className="ai-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <X className="w-4 h-4 text-white/35" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
                Yapmayacağım
              </span>
            </div>
            <ul className="space-y-2 text-sm text-white/55 leading-relaxed">
              <li>· “Yapay zekâ makalenizi yazsın” demek</li>
              <li>· Doğrulanmamış kampanya duyurmak</li>
              <li>· Aracı sihirli bir kutu gibi göstermek</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.2}>
          <div className="ai-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <Check className="w-4 h-4" style={{ color: ACCENT }} />
              <span
                className="font-mono text-[11px] uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                Yapacağım
              </span>
            </div>
            <ul className="space-y-2 text-sm text-white/55 leading-relaxed">
              <li>· Neyin ücretsiz olduğunu tam olarak söylemek</li>
              <li>· Yayıncıların kurallarını göstermek</li>
              <li>· Verinizin nereye gittiğini anlatmak</li>
            </ul>
          </div>
        </Fade>
      </div>
    </Slide>
  ),

  /* 03 — Bölüm 1 */
  () => (
    <Divider
      num="1"
      title="Para"
      subtitle="Neyin ücretsiz olduğu, neyin olmadığı ve dolaşan söylentinin aslı."
    />
  ),

  /* 04 — Ücretsiz planda ne var */
  () => (
    <Slide>
      <Eyebrow>Ücretsiz plan · 0 USD</Eyebrow>
      <H2>Tek kuruş ödemeden neler yapabilirsiniz?</H2>
      <Sub>
        Akademik işin önemli bir kısmı ücretsiz planda zaten dönüyor. Pro'ya
        geçmeden önce buranın sınırına gerçekten çarpıp çarpmadığınızı görün.
      </Sub>
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={Sparkles} title="Sonnet ve Haiku modelleri">
            Günlük yazışma, özetleme, çeviri ve kod için yeterli iki model.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={Layers} title="Artifacts">
            Doküman, görselleştirme, tek dosyalık web uygulaması üretip
            yayımlayabilirsiniz — ücretsiz planda da yayımlama açık.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Link2} title="Bağlayıcılar ve web araması">
            Drive, GitHub, Slack gibi kaynaklara bağlanma ve web'de arama
            ücretsiz planda listeleniyor.
          </Card>
        </Fade>
      </div>
      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <Fade delay={0.32}>
          <Card icon={FileText} title="Beş proje">
            Ayrı bağlamlar kurabilirsiniz: bir ders, bir makale, bir proje.
            Ücretsiz planda en fazla beş tane.
          </Card>
        </Fade>
        <Fade delay={0.4}>
          <Card icon={BookOpen} title="Hafıza ve dosya yükleme">
            Belge yükleyip üzerinde konuşmak ücretsiz planda da var.
          </Card>
        </Fade>
      </div>
      <Source>
        claude.com/pricing · support.claude.com “What are Projects” ·
        “What are Artifacts” — erişim 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* 05 — Pro ne ekliyor */
  () => (
    <Slide>
      <Eyebrow>Pro · aylık 20 USD, yıllık ödemede 17 USD/ay</Eyebrow>
      <H2>Ücret neyi satın alıyor?</H2>
      <div className="mt-8 overflow-x-auto">
        <table className="ai-table table-fixed">
          <thead>
            <tr>
              <th className="w-[40%]">Özellik</th>
              <th className="w-[30%]">Ücretsiz</th>
              <th className="w-[30%]">Pro</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Modeller</td>
              <td>Sonnet · Haiku</td>
              <td>Opus · Sonnet · Haiku (+ sınırlı Fable)</td>
            </tr>
            <tr>
              <td>Kullanım hacmi</td>
              <td>5 saatlik pencere</td>
              <td>Aynı pencerede en az 5 kat</td>
            </tr>
            <tr>
              <td>Proje sayısı</td>
              <td>5</td>
              <td>Sınırsız + genişletilmiş bilgi tabanı</td>
            </tr>
            <tr>
              <td>Research — atıflı rapor</td>
              <td><No /></td>
              <td><Yes /></td>
            </tr>
            <tr>
              <td>Claude for Excel</td>
              <td><No /></td>
              <td><Yes /></td>
            </tr>
            <tr>
              <td>Chrome uzantısı</td>
              <td><No /></td>
              <td><Yes /></td>
            </tr>
            <tr>
              <td>Claude Science</td>
              <td><No /></td>
              <td><Yes /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="ai-warn mt-6 px-5 py-3.5">
        <p className="text-sm text-white/70 leading-relaxed">
          <strong className="text-white">Sık karıştırılan nokta:</strong> Pro
          aboneliği <strong className="text-white">API erişimi içermez</strong>.
          Kod yazıp Claude'u kendi uygulamanıza bağlayacaksanız API ayrı
          ücretlendirilir.
        </p>
      </div>
      <Source>
        claude.com/pricing · support.claude.com “What is the Pro plan” —
        erişim 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* 06 — Söylentinin aslı */
  () => (
    <Slide>
      <Eyebrow>Dolaşan söylenti</Eyebrow>
      <H1>
        “Akademisyenlere
        <br />
        ücretsiz Pro veriliyor.”
      </H1>
      <Sub>
        Bu cümleyi çok duyacaksınız. Yarısı doğru, ama yanlış kişilere
        atfediliyor. Ücretsiz bir program gerçekten var — hedef kitlesi başka.
      </Sub>
      <Fade delay={0.25}>
        <div className="mt-12 flex items-center gap-4">
          <AlertTriangle className="w-6 h-6 shrink-0" style={{ color: ACCENT }} />
          <p className="text-xl text-white/70">
            Sonraki iki slaytta programın tam kapsamını görelim.
          </p>
        </div>
      </Fade>
    </Slide>
  ),

  /* 07 — Claude for Teachers */
  () => (
    <Slide>
      <Eyebrow>Gerçekte var olan ücretsiz program</Eyebrow>
      <H2>Claude for Teachers</H2>
      <Sub>
        Ücretsiz premium erişim veriyor. Ama kapsamı çok net çizilmiş.
      </Sub>
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <Fade delay={0.1}>
          <div className="ai-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Check className="w-4 h-4" style={{ color: ACCENT }} />
              <span
                className="font-mono text-[11px] uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                Kimi kapsıyor
              </span>
            </div>
            <ul className="space-y-2.5 text-sm text-white/60 leading-relaxed">
              <li>· ABD'deki doğrulanmış K-12 öğretmenleri</li>
              <li>· Okul ve ilçe düzeyinde kurumsal dağıtım</li>
              <li>· Son başvuru: 30 Haziran 2027 · 1 yıl ücretsiz</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.2}>
          <div className="ai-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Ban className="w-4 h-4 text-white/40" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                Kimi kapsamıyor
              </span>
            </div>
            <ul className="space-y-2.5 text-sm text-white/60 leading-relaxed">
              <li>· Üniversite akademisyenleri</li>
              <li>· Öğrenciler</li>
              <li>· ABD dışındaki ülkeler — Türkiye dahil</li>
            </ul>
          </div>
        </Fade>
      </div>
      <div className="ai-warn mt-6 px-5 py-3.5">
        <p className="text-sm text-white/70 leading-relaxed">
          Yani bu salondaki hiç kimse bu programa başvuramıyor. Doğrusunu
          bilmek, yanlış bir umuda kapılmaktan iyidir.
        </p>
      </div>
      <Source>
        anthropic.com/news/claude-for-teachers — 14 Temmuz 2026 ·
        ilçe dağıtımı 28 Ağustos 2026
      </Source>
    </Slide>
  ),

  /* 08 — .edu gerçeği */
  () => (
    <Slide>
      <Eyebrow>Peki .edu adresim?</Eyebrow>
      <H2>Tek başına hiçbir şey kazandırmıyor.</H2>
      <Sub>
        Resmî fiyat sayfasında öğrenci ya da akademisyen indirimi diye bir
        kalem yok. `.edu` adresiniz ancak kurumunuz Claude for Education
        sözleşmesi imzaladıysa işe yarar — o zaman okul hesabınızla girip
        kurumun sağladığı erişimi kullanırsınız.
      </Sub>
      <div className="mt-10 grid md:grid-cols-3 gap-4">
        <Fade delay={0.1}>
          <Card icon={GraduationCap} title="Claude for Education">
            Üniversitenin tamamını kapsayan kurumsal plan: öğrenci, akademisyen
            ve idari personel. Bireysel başvuru yok, kurum satış ekibiyle
            görüşüyor.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={Wallet} title="İlan edilmiş fiyat yok">
            Anlaşma kuruma özel. Resmî sayfalarda koltuk başı bir rakam
            yayımlanmıyor.
          </Card>
        </Fade>
        <Fade delay={0.26}>
          <Card icon={Users} title="Partner kurumlar">
            LSE, Northeastern, Syracuse, Dartmouth, Virginia, Pittsburgh,
            Champlain, Northumbria, San Francisco.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.34}>
        <p className="mt-8 text-white/45 text-sm leading-relaxed max-w-3xl">
          Resmî sayfada Türkiye'den listelenen bir kurum bulunmuyor. Bu, “Türk
          üniversiteleri başvuramaz” demek değil; sadece ilan edilmiş bir örnek
          yok demek.
        </p>
      </Fade>
      <Source>
        claude.com/pricing · claude.com/solutions/education ·
        support.claude.com “Use Claude for Education at your university” —
        erişim 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* 09 — Öğrenciler için gerçek fırsat */
  () => (
    <Slide>
      <Eyebrow>Öğrencilerinize söyleyin</Eyebrow>
      <H1>
        Campus Program:
        <br />
        <span style={{ color: ACCENT }}>3.600 dolar</span> destek.
      </H1>
      <Sub>
        Başvuru dünya çapına açık. Üç ayrı kulvar var ve seçilen öğrencilere
        nakit destek veriliyor. Danışmanlığını yaptığınız öğrenciye
        söyleyebileceğiniz en somut şey bu.
      </Sub>
      <div className="mt-10 grid md:grid-cols-3 gap-4">
        <Fade delay={0.1}>
          <Card icon={Users} title="Builder Club · Lisans">
            Kampüste yapay zekâ topluluğu kuran lisans öğrencileri.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={PresentationIcon} title="Campus Conversations · Y. Lisans">
            Kampüste tartışma ve etkinlik yürüten yüksek lisans öğrencileri.
          </Card>
        </Fade>
        <Fade delay={0.26}>
          <Card icon={FlaskConical} title="Science Workshops · Doktora">
            Doktora ve doktora sonrası araştırmacılar için atölyeler.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.34}>
        <p className="mt-7 text-sm text-white/45">
          Koşul: 18 yaş üstü ve öğrenim görülen ülkede çalışma izni.
        </p>
      </Fade>
      <Source>claude.com/programs/campus — erişim 4 Eylül 2026</Source>
    </Slide>
  ),

  /* 10 — Bölüm 2 */
  () => (
    <Divider
      num="2"
      title="İş"
      subtitle="Ders hazırlığından sunuma, veri analizinden literatüre — günlük akademik işin neresine giriyor."
    />
  ),

  /* 11 — Projects */
  () => (
    <Slide>
      <Eyebrow>Projects</Eyebrow>
      <H2>Her ders ve her makale için ayrı bir oda.</H2>
      <Sub>
        Proje, kendi belge havuzu ve kendi sohbet geçmişi olan bağımsız bir
        çalışma alanı. İzlencenizi, kaynak makalelerinizi, not şablonunuzu bir
        kez yüklersiniz; o projedeki her konuşma bu bağlamı bilir. Her sohbette
        baştan anlatmazsınız.
      </Sub>
      <div className="mt-10 grid md:grid-cols-2 gap-4">
        <Fade delay={0.1}>
          <div className="ai-card p-6">
            <h3 className="text-white font-semibold mb-3">
              Ders projesi — içine ne koyarsınız
            </h3>
            <ul className="space-y-2 text-sm text-white/55 leading-relaxed">
              <li>· İzlence ve haftalık plan</li>
              <li>· Ders kitabının ilgili bölümleri</li>
              <li>· Geçen yılki sınav soruları</li>
              <li>· Öğrencinin seviyesine dair notunuz</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.2}>
          <div className="ai-card p-6">
            <h3 className="text-white font-semibold mb-3">
              Sonra ne istersiniz
            </h3>
            <ul className="space-y-2 text-sm text-white/55 leading-relaxed">
              <li>· “7. hafta için 10 soruluk quiz hazırla”</li>
              <li>· “Bu konuyu anlamayan öğrenciye başka bir örnek ver”</li>
              <li>· “Ödev yönergesini değerlendirme ölçütüyle yaz”</li>
            </ul>
          </div>
        </Fade>
      </div>
      <Source>
        support.claude.com “What are Projects” — ücretsiz planda 5 proje,
        ücretli planlarda sınırsız · erişim 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* 12 — Dosya limitleri */
  () => (
    <Slide>
      <Eyebrow>Dosya analizi</Eyebrow>
      <H2>Gerçek sınırlar — tahmin değil.</H2>
      <Sub>
        “PDF yükleyebiliyor” demek yetmiyor; sınırı bilmezseniz derste ya da
        sunumda tıkanırsınız. Resmî limitler şöyle.
      </Sub>
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <Fade delay={0.1}>
          <div className="ai-card p-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-4">
              Sohbete yüklerken
            </div>
            <ul className="space-y-2.5 text-sm text-white/60 leading-relaxed">
              <li>· Dosya başına <strong className="text-white">500 MB</strong></li>
              <li>· Sohbet başına <strong className="text-white">20 dosya</strong></li>
              <li>· PDF üst sınırı <strong className="text-white">1000 sayfa</strong></li>
              <li>
                · Grafik ve görseller yalnızca{" "}
                <strong className="text-white">100 sayfaya kadar</strong> analiz
                edilir; üstünde sadece metin çıkarılır
              </li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.2}>
          <div className="ai-card p-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-4">
              Projeye yüklerken
            </div>
            <ul className="space-y-2.5 text-sm text-white/60 leading-relaxed">
              <li>· Dosya başına <strong className="text-white">30 MB</strong></li>
              <li>· Dosya sayısı bağlam penceresiyle sınırlı</li>
              <li>· PDF'lerden yalnızca metin çıkarılır</li>
            </ul>
            <p className="mt-4 text-xs text-white/35 leading-relaxed">
              Yani 300 sayfalık bir tezin şekillerini incelemesini istiyorsanız
              ilgili bölümü ayırıp yüklemeniz gerekir.
            </p>
          </div>
        </Fade>
      </div>
      <Source>
        support.claude.com “Upload files to Claude” — erişim 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* 13 — Research */
  () => (
    <Slide>
      <Eyebrow>Research · ücretli planlarda</Eyebrow>
      <H2>Atıflı literatür taraması.</H2>
      <Sub>
        Tek bir arama değil: Claude birbirini besleyen çok sayıda arama yapıp
        kapsamlı bir rapor üretiyor ve her iddianın kaynağını gösteriyor —
        siz de tıklayıp doğruluyorsunuz. Bu son cümle önemli: doğrulama
        sizde kalıyor.
      </Sub>
      <div className="mt-10 grid md:grid-cols-3 gap-4">
        <Fade delay={0.1}>
          <Card icon={FileSearch} title="Ne için iyi">
            Alana hızlı giriş, kaynak keşfi, “bu konuda kim ne demiş” haritası.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={AlertTriangle} title="Ne için değil">
            Sistematik derleme yerine geçmez. PRISMA akışını, dahil etme
            ölçütlerini ve tarama günlüğünü siz kurarsınız.
          </Card>
        </Fade>
        <Fade delay={0.26}>
          <Card icon={Wallet} title="Kotayı hızlı yer">
            Çok kaynak çektiği için kullanım limitinizi normal sohbetten
            belirgin biçimde hızlı tüketir.
          </Card>
        </Fade>
      </div>
      <Source>
        support.claude.com “Use Research on Claude” — Pro, Max, Team ve
        Enterprise · erişim 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* 14 — Excel */
  () => (
    <Slide>
      <Eyebrow>Claude for Excel</Eyebrow>
      <H2>Veri setiyle konuşmak.</H2>
      <Sub>
        Excel'in içinde bir kenar çubuğu olarak çalışıyor: çalışma kitabını
        okuyor, hücre düzeyinde atıf vererek cevap veriyor, formül
        ilişkilerini bozmadan değer güncelliyor. Anket verisi, sınav sonucu ya
        da ölçüm tablosuyla çalışan herkes için doğrudan işe yarıyor.
      </Sub>
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <Fade delay={0.1}>
          <div className="ai-card p-6">
            <h3 className="text-white font-semibold mb-3">Yaptıkları</h3>
            <ul className="space-y-2 text-sm text-white/55 leading-relaxed">
              <li>· Hata kök nedeni bulma (#REF!, #DIV/0)</li>
              <li>· Pivot ve koşullu biçimlendirme</li>
              <li>· Model ve şablon üretme</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.2}>
          <div className="ai-card p-6">
            <h3 className="text-white font-semibold mb-3">Sınırları</h3>
            <ul className="space-y-2 text-sm text-white/55 leading-relaxed">
              <li>· Excel 2016/2019 kalıcı sürümlerde çalışmaz</li>
              <li>· iPad ve Android yok</li>
              <li>· Makro/VBA desteklenmiyor</li>
            </ul>
          </div>
        </Fade>
      </div>
      <div className="ai-warn mt-6 px-5 py-3.5">
        <p className="text-sm text-white/70 leading-relaxed">
          <strong className="text-white">Güvenlik notu:</strong> Yalnızca
          güvendiğiniz dosyalarla kullanın. Dışarıdan gelen bir tabloya
          gizlenmiş yönerge, aracı istemediğiniz bir işe yönlendirebilir.
        </p>
      </div>
      <Source>claude.com/docs/office-agents/excel — erişim 4 Eylül 2026</Source>
    </Slide>
  ),

  /* 15 — Sunum hazırlama akışı */
  () => (
    <Slide>
      <Eyebrow>Somut akış</Eyebrow>
      <H2>Bir konferans sunumu — baştan sona.</H2>
      <div className="mt-8 space-y-3">
        {[
          {
            n: "01",
            t: "Malzemeyi topla",
            d: "Makalenizi, veri tablonuzu ve varsa bildiri şablonunu bir projeye yükleyin.",
          },
          {
            n: "02",
            t: "İskeleti çıkart",
            d: "“15 dakikalık sunum için bölüm başlıkları ve her bölüme kaç dakika” diye sorun. Kendi bildiğiniz akışla karşılaştırın.",
          },
          {
            n: "03",
            t: "Slaytları yazdır",
            d: "Her bölüm için slayt metni ve konuşma notu isteyin. Artifacts ile doğrudan görselleştirme üretebilirsiniz.",
          },
          {
            n: "04",
            t: "Soruları önceden gör",
            d: "“Bu sunumdan sonra hakem bana hangi üç zor soruyu sorar?” — en çok işe yarayan adım budur.",
          },
          {
            n: "05",
            t: "Siz yazın",
            d: "Çıkan metni olduğu gibi kullanmayın. Anlatım sizin sesinizle olmalı; dinleyici farkı hemen anlar.",
          },
        ].map((s, i) => (
          <Fade key={s.n} delay={0.08 * i}>
            <div className="ai-card px-6 py-4 flex items-start gap-5">
              <span
                className="font-mono text-sm shrink-0 pt-0.5"
                style={{ color: ACCENT }}
              >
                {s.n}
              </span>
              <div>
                <div className="text-white font-medium">{s.t}</div>
                <div className="text-sm text-white/50 mt-1 leading-relaxed">
                  {s.d}
                </div>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </Slide>
  ),

  /* 16 — Learning Mode */
  () => (
    <Slide>
      <Eyebrow>Öğrenci tarafı</Eyebrow>
      <H2>Cevabı vermeyen mod.</H2>
      <Sub>
        Learning Mode, öğrenciye doğrudan cevap vermek yerine soru sorarak
        cevabı kendisinin bulmasını sağlıyor. Resmî tanımı şöyle: “iyi bir özel
        ders hocası gibi çalışır — cevapları kendiniz bulmanıza yardım eden
        sorular sorar.”
      </Sub>
      <Fade delay={0.2}>
        <div className="ai-warn mt-10 px-6 py-5">
          <Quote className="w-5 h-5 mb-3" style={{ color: ACCENT }} />
          <p className="text-lg text-white/75 leading-relaxed">
            Öğrencinin yapay zekâ kullanmasını engelleyemezsiniz. Ama
            <strong className="text-white"> nasıl kullandığını </strong>
            biçimlendirebilirsiniz. Ödevi “yapay zekâ ile çöz, sonra nerede
            yanıldığını göster” diye kurgulamak, yasaklamaktan daha çok
            öğretiyor.
          </p>
        </div>
      </Fade>
      <Source>claude.com/solutions/education — erişim 4 Eylül 2026</Source>
    </Slide>
  ),

  /* 17 — Bölüm 3 */
  () => (
    <Divider
      num="3"
      title="Sınırlar"
      subtitle="Yayıncılar ne istiyor, veriniz nereye gidiyor, neyi asla devredemezsiniz."
    />
  ),

  /* 18 — Yazar olamaz */
  () => (
    <Slide>
      <Eyebrow>Dört kurum, tek cevap</Eyebrow>
      <H1>Yapay zekâ yazar olamaz.</H1>
      <Sub>
        Elsevier, Springer Nature, IEEE ve COPE bu konuda hemfikir. Gerekçe
        ortak: yazarlık sorumluluk demektir, bir araç sorumluluk üstlenemez,
        çıkar çatışması beyan edemez, telif anlaşması imzalayamaz.
      </Sub>
      <Fade delay={0.2}>
        <div className="ai-card mt-10 px-7 py-6">
          <Quote className="w-5 h-5 mb-3 text-white/30" />
          <p className="text-lg text-white/70 leading-relaxed italic">
            “Yazarlık, yalnızca insanlara atfedilebilen ve insanlar tarafından
            yerine getirilebilen sorumluluklar ve görevler içerir.”
          </p>
          <p className="mt-3 font-mono text-[11px] text-white/35">
            Elsevier — Haziran 2026
          </p>
        </div>
      </Fade>
    </Slide>
  ),

  /* 19 — Beyan nereye yazılır */
  () => (
    <Slide>
      <Eyebrow>Çoğu kişinin bilmediği ayrıntı</Eyebrow>
      <H2>Beyan zorunlu — ama yeri her yayıncıda farklı.</H2>
      <Sub>
        Yapay zekâ kullandıysanız bunu bildirmek zorundasınız. Nereye
        yazacağınız ise dergisine göre değişiyor. Yanlış yere yazmak, hiç
        yazmamakla aynı kapıya çıkabiliyor.
      </Sub>
      <div className="mt-8 overflow-x-auto">
        <table className="ai-table">
          <thead>
            <tr>
              <th className="w-[34%]">Kurum</th>
              <th>Beyan nereye yazılır</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Elsevier</td>
              <td>Kaynakçadan önce ayrı bir başlık altında</td>
            </tr>
            <tr>
              <td>Springer Nature</td>
              <td>Introduction ya da Acknowledgements</td>
            </tr>
            <tr>
              <td>IEEE</td>
              <td>Acknowledgments</td>
            </tr>
            <tr>
              <td>COPE</td>
              <td>Materials and Methods (ya da muadili)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Fade delay={0.3}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed max-w-3xl">
          Ortak istisna: temel dilbilgisi ve yazım denetimi genellikle beyan
          gerektirmiyor. IEEE bunu “önerilir” diyerek daha yumuşak ifade ediyor.
        </p>
      </Fade>
      <Source>
        elsevier.com generative-ai-policies · group.springernature.com AI
        guidance · open.ieee.org author guidelines (16 Nisan 2024) ·
        publicationethics.org (13 Şubat 2023)
      </Source>
    </Slide>
  ),

  /* 20 — Hakem uyarısı */
  () => (
    <Slide>
      <Eyebrow>Hakemlik yapıyorsanız</Eyebrow>
      <H1>
        Değerlendirdiğiniz makaleyi
        <br />
        <span style={{ color: ACCENT }}>yapay zekâya yükleyemezsiniz.</span>
      </H1>
      <Sub>
        Bu, sunumun en çok şaşırtan slaydı olacak. Hem Elsevier hem Springer
        Nature açıkça yasaklıyor: hakem, kendisine gönderilen yayımlanmamış
        makaleyi ya da bir bölümünü yapay zekâ aracına yükleyemez. Gerekçe
        gizlilik ve yazarın mülkiyet hakkı.
      </Sub>
      <Fade delay={0.25}>
        <div className="ai-warn mt-10 px-6 py-5">
          <div className="flex items-start gap-4">
            <Lock className="w-5 h-5 shrink-0 mt-0.5" style={{ color: ACCENT }} />
            <p className="text-white/70 leading-relaxed">
              Hakem raporunuzu yazarken dil desteği aldıysanız bunu şeffafça
              beyan edin — ama makalenin kendisi araca girmemeli.
            </p>
          </div>
        </div>
      </Fade>
      <Source>
        elsevier.com generative-ai-policies (Haziran 2026) ·
        group.springernature.com AI guidance — erişim 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* 21 — Görsel yasağı */
  () => (
    <Slide>
      <Eyebrow>Şekiller ve görseller</Eyebrow>
      <H2>Araştırma görseli üretilemez.</H2>
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <Fade delay={0.1}>
          <div className="ai-card p-6">
            <h3 className="text-white font-semibold mb-3">Elsevier</h3>
            <p className="text-sm text-white/55 leading-relaxed">
              Birincil araştırma görselleri — mikroskopi, western blot, tarama,
              hasta görüntüsü — yapay zekâ ile üretilemez veya değiştirilemez.
            </p>
          </div>
        </Fade>
        <Fade delay={0.2}>
          <div className="ai-card p-6">
            <h3 className="text-white font-semibold mb-3">Springer Nature</h3>
            <p className="text-sm text-white/55 leading-relaxed">
              Üretken yapay zekâ görselleri kural olarak yayımlanamıyor. Sınırlı
              istisnalar açıkça “AI-generated” etiketiyle işaretlenmek zorunda.
            </p>
          </div>
        </Fade>
      </div>
      <Fade delay={0.3}>
        <p className="mt-8 text-white/50 leading-relaxed max-w-3xl">
          Kavramsal şema, akış diyagramı ve sunum görseli başka; veriyi temsil
          eden şekil başka. Ayrımı korumak, iyi niyetli bir kullanımın
          suistimal gibi görünmesini engelliyor.
        </p>
      </Fade>
      <Source>
        elsevier.com generative-ai-policies · group.springernature.com AI
        guidance — erişim 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* 22 — Veri gizliliği */
  () => (
    <Slide>
      <Eyebrow>Veriniz nereye gidiyor</Eyebrow>
      <H2>Bir ayar, iki çok farklı sonuç.</H2>
      <Sub>
        Ücretsiz, Pro ve Max planlarında sohbetlerinizin modeli geliştirmek
        için kullanılmasına izin verip vermemek sizin elinizde. Seçiminiz
        saklama süresini kökten değiştiriyor.
      </Sub>
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <Fade delay={0.1}>
          <div className="ai-card p-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-3">
              İzin verirseniz
            </div>
            <div className="text-3xl font-semibold text-white mb-2">5 yıl</div>
            <p className="text-sm text-white/55 leading-relaxed">
              Yeni ve devam ettirilen sohbetler kimliksizleştirilmiş biçimde
              beş yıla kadar saklanabiliyor ve model eğitiminde kullanılıyor.
            </p>
          </div>
        </Fade>
        <Fade delay={0.2}>
          <div className="ai-card p-6">
            <div
              className="font-mono text-[11px] uppercase tracking-[0.18em] mb-3"
              style={{ color: ACCENT }}
            >
              İzin vermezseniz
            </div>
            <div className="text-3xl font-semibold text-white mb-2">30 gün</div>
            <p className="text-sm text-white/55 leading-relaxed">
              Eğitimde kullanılmıyor, saklama otuz güne iniyor. Ayarı istediğiniz
              zaman değiştirebiliyorsunuz.
            </p>
          </div>
        </Fade>
      </div>
      <div className="ai-warn mt-6 px-5 py-3.5">
        <p className="text-sm text-white/70 leading-relaxed">
          <strong className="text-white">Kapsam dışı planlar:</strong> Team,
          Enterprise, Government, Education ve API. Bunlar ticari şartlara tabi
          ve bu değişikliğin dışında.
        </p>
      </div>
      <Source>
        anthropic.com/news/updates-to-our-consumer-terms (28 Ağustos 2025) ·
        privacy.claude.com (güncelleme 1 Temmuz 2026)
      </Source>
    </Slide>
  ),

  /* 23 — Neyi devredemezsiniz */
  () => (
    <Slide>
      <Eyebrow>Değişmeyen kısım</Eyebrow>
      <H2>Devredemeyeceğiniz dört şey.</H2>
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <Card icon={ShieldCheck} title="Sorumluluk">
            Metinde ne varsa sizindir. “Yapay zekâ yazdı” bir savunma değil;
            dört yayıncı da bunu açıkça söylüyor.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={FileSearch} title="Doğrulama">
            Verilen her kaynağı açıp bakın. Var olmayan atıf üretebilir ve bu
            en çok akademisyeni yakan hatadır.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={FlaskConical} title="Yorum">
            Bulguyu alana bağlamak, sınırlılığı görmek, “bu sonuç neden önemli”
            demek sizin işiniz.
          </Card>
        </Fade>
        <Fade delay={0.32}>
          <Card icon={Users} title="Etik karar">
            Katılımcı verisi, gizli hakem dosyası, yayımlanmamış tez — neyin
            araca girmeyeceğine siz karar verirsiniz.
          </Card>
        </Fade>
      </div>
    </Slide>
  ),

  /* 24 — Bölüm 4 */
  () => (
    <Divider
      num="4"
      title="Başlangıç"
      subtitle="Bu salondan çıkınca bu hafta içinde yapabileceğiniz üç şey."
    />
  ),

  /* 25 — Üç adım */
  () => (
    <Slide>
      <Eyebrow>Bu hafta</Eyebrow>
      <H2>Üç adım.</H2>
      <div className="mt-10 space-y-4">
        {[
          {
            n: "01",
            t: "Gizlilik ayarınızı açıp bakın",
            d: "Ayarlar → Gizlilik. Model eğitimi tercihinizi bilinçli olarak seçin. Beş yıl ile otuz gün arasındaki fark burada belirleniyor.",
          },
          {
            n: "02",
            t: "Bir dersiniz için proje açın",
            d: "İzlence, kaynak ve geçen yılın sınavı. Sonra o projeye “bu haftanın quizini hazırla” deyin. Ücretsiz planda beş proje hakkınız var.",
          },
          {
            n: "03",
            t: "Hedef derginizin politikasını okuyun",
            d: "Beyanın nereye yazılacağı dergiye göre değişiyor. Makaleyi göndermeden önce değil, yazmaya başlamadan önce bakın.",
          },
        ].map((s, i) => (
          <Fade key={s.n} delay={0.1 * i}>
            <div className="ai-card px-7 py-5 flex items-start gap-6">
              <span
                className="font-mono text-lg shrink-0"
                style={{ color: ACCENT }}
              >
                {s.n}
              </span>
              <div>
                <div className="text-white font-medium text-lg">{s.t}</div>
                <div className="text-sm text-white/50 mt-1.5 leading-relaxed">
                  {s.d}
                </div>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </Slide>
  ),

  /* 26 — Kurumunuz için */
  () => (
    <Slide>
      <Eyebrow>Kurumsal adım</Eyebrow>
      <H2>Üniversitenizde konuşmak isterseniz.</H2>
      <Sub>
        Claude for Education bireysel değil kurumsal bir anlaşma. Rektörlüğe ya
        da bilgi işleme götürülecek bir öneri, şu üç soruya cevap verdiğinde
        ciddiye alınıyor.
      </Sub>
      <div className="mt-10 grid md:grid-cols-3 gap-4">
        <Fade delay={0.1}>
          <Card icon={Users} title="Kimi kapsayacak">
            Yalnızca bir bölüm mü, tüm kampüs mü? Öğrenci dahil mi? Kapsam
            fiyatı belirleyen ilk değişken.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={Lock} title="Veri nereye gidecek">
            Kurumsal planlar tüketici veri politikasının dışında. Bunu
            bilgi işlemin ilk sorusu olarak bekleyin.
          </Card>
        </Fade>
        <Fade delay={0.26}>
          <Card icon={Table2} title="Başarı nasıl ölçülecek">
            Kaç ders kullandı, hangi işi kısalttı? Ölçüsü olmayan pilot ikinci
            yıl bütçe bulamıyor.
          </Card>
        </Fade>
      </div>
      <Source>
        claude.com/contact-sales/education-plan — kurumlar Anthropic eğitim
        ekibiyle iletişime geçiyor · erişim 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* 27 — Kaynaklar */
  () => (
    <Slide>
      <Eyebrow>Kaynaklar</Eyebrow>
      <H2>Her şeyi kendiniz doğrulayın.</H2>
      <Sub>
        Bu sunumdaki bilgiler 4 Eylül 2026'da erişilen resmî sayfalardan
        alındı. Yapay zekâ tarafında kurallar hızlı değişiyor — sunumu
        izlediğiniz tarihte tekrar bakın.
      </Sub>
      <div className="mt-8 grid md:grid-cols-2 gap-x-10 gap-y-2.5 font-mono text-[13px] text-white/45">
        {[
          "claude.com/pricing",
          "claude.com/solutions/education",
          "claude.com/programs/campus",
          "anthropic.com/news/claude-for-teachers",
          "anthropic.com/news/updates-to-our-consumer-terms",
          "privacy.claude.com",
          "support.claude.com — Projects, Artifacts, dosya limitleri",
          "claude.com/docs/office-agents/excel",
          "elsevier.com — generative AI policies",
          "group.springernature.com — AI guidance",
          "open.ieee.org — author guidelines",
          "publicationethics.org — authorship and AI tools",
        ].map((u, i) => (
          <Fade key={u} delay={0.03 * i}>
            <div className="flex items-baseline gap-2.5">
              <span style={{ color: ACCENT }}>·</span>
              <span>{u}</span>
            </div>
          </Fade>
        ))}
      </div>
    </Slide>
  ),

  /* 28 — Kapanış */
  () => (
    <div className="relative w-full h-full flex items-center justify-center px-10">
      <Grid>{null}</Grid>
      <div
        aria-hidden
        className="absolute -inset-x-40 top-1/3 h-96 blur-[140px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${ACCENT}22, transparent 70%)` }}
      />
      <div className="relative text-center max-w-3xl">
        <Fade>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white leading-[1.1]">
            Araç iyi.
            <br />
            <span style={{ color: ACCENT }}>Sorumluluk hâlâ sizde.</span>
          </h2>
        </Fade>
        <Fade delay={0.15}>
          <p className="mt-8 text-lg text-white/55 leading-relaxed">
            Yapay zekâ akademisyenin işini bitirmiyor; sıkıcı kısmını kısaltıp
            düşünmeye vakit bırakıyor. Hangi kısmın sıkıcı, hangi kısmın işin
            kendisi olduğuna karar vermek de akademisyenliğin bir parçası.
          </p>
        </Fade>
        <Fade delay={0.3}>
          <div className="mt-14 font-mono text-sm text-white/40 space-y-1.5">
            <div>Öğr. Gör. Osman Can Çetlenbik</div>
            <div style={{ color: ACCENT }}>osmancancetlenbik.com</div>
            <div>osman.cetlenbik@cbu.edu.tr</div>
          </div>
        </Fade>
      </div>
    </div>
  ),
];

export default function Presentation() {
  return (
    <DeckShell
      label="Akademisyenler için Yapay Zekâ · Claude"
      accent={ACCENT}
      slides={slides}
    />
  );
}
