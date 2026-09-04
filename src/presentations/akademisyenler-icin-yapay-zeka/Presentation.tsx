"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Ban,
  BookOpen,
  Check,
  ClipboardList,
  Compass,
  FileSearch,
  FileText,
  FlaskConical,
  GraduationCap,
  Languages,
  Layers,
  Link2,
  Lock,
  MessageSquare,
  Minus,
  PenLine,
  Quote,
  Scale,
  ShieldCheck,
  Sparkles,
  Table2,
  Target,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { EmbeddedTool } from "../_shared/deck/EmbeddedTool";
import {
  CompareBars,
  DecisionTree,
  FlowSteps,
  Timeline,
} from "../_shared/deck/Diagrams";
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
 * KULLANIM BİÇİMİ: Bu sunum LinkedIn'de tek başına okunmak üzere kurgulandı.
 * Anlatan biri olmadığı için her slayt kendi başına tamamlanıyor; "birazdan
 * göreceğiz", "burada anlatacağım" gibi sunucuya bağlı ifade yok.
 *
 * İÇERİK KURALI: Her sayı, tarih ve kapsam iddiası Anthropic'in resmî
 * sayfalarından ya da yayıncıların kendi politika metinlerinden alındı ve
 * slaydın altında kaynağı yazıyor. Doğrulanamayan hiçbir iddia girmedi —
 * özellikle "akademisyenlere ücretsiz Pro" söylentisi, gerçekte ABD'deki
 * K-12 öğretmenlerine yönelik bir program olduğu için düzeltilerek anlatıldı.
 *
 * Erişim tarihi: 4 Eylül 2026.
 */

const ACCENT = "#d97757";

/* ─── Yapı taşları ─────────────────────────────────────────────── */

function Grid() {
  return <div className="absolute inset-0 ai-grid-bg pointer-events-none" />;
}

function Fade({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
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
    <div className="ai-card p-5 h-full">
      <span
        className="inline-grid place-items-center w-9 h-9 rounded-lg mb-3"
        style={{ background: "color-mix(in srgb, var(--deck-accent) 16%, transparent)" }}
      >
        <Icon className="w-4 h-4" />
      </span>
      <h3 className="text-base font-semibold text-white mb-1.5">{title}</h3>
      <div className="text-sm leading-relaxed text-white/55">{children}</div>
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
      <Grid />
      <div className="relative text-center max-w-3xl">
        <Fade>
          <div
            className="font-mono text-[11px] uppercase tracking-[0.3em] mb-5"
            style={{ color: ACCENT }}
          >
            Bölüm {num}
          </div>
        </Fade>
        <Fade delay={0.08}>
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.05]">
            {title}
          </h2>
        </Fade>
        <Fade delay={0.16}>
          <p className="mt-5 text-lg text-white/50 leading-relaxed">{subtitle}</p>
        </Fade>
      </div>
    </div>
  );
}

/** Yan yana karşılaştırma — "böyle sorma / böyle sor" gibi. */
function Versus({
  left,
  right,
}: {
  left: { label: string; items: ReactNode[] };
  right: { label: string; items: ReactNode[] };
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Fade delay={0.08}>
        <div className="ai-card p-5 h-full">
          <div className="flex items-center gap-2 mb-3">
            <X className="w-4 h-4 text-white/35" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
              {left.label}
            </span>
          </div>
          <ul className="space-y-2 text-sm text-white/50 leading-relaxed">
            {left.items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </div>
      </Fade>
      <Fade delay={0.16}>
        <div className="ai-card p-5 h-full">
          <div className="flex items-center gap-2 mb-3">
            <Check className="w-4 h-4" style={{ color: ACCENT }} />
            <span
              className="font-mono text-[11px] uppercase tracking-[0.18em]"
              style={{ color: ACCENT }}
            >
              {right.label}
            </span>
          </div>
          <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
            {right.items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </div>
      </Fade>
    </div>
  );
}

/** Numaralı adım listesi. */
function Steps({
  items,
}: {
  items: Array<{ t: string; d: string }>;
}) {
  return (
    <div className="space-y-2.5">
      {items.map((s, i) => (
        <Fade key={s.t} delay={0.06 * i}>
          <div className="ai-card px-5 py-3.5 flex items-start gap-4">
            <span
              className="font-mono text-sm shrink-0 pt-0.5"
              style={{ color: ACCENT }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="text-white font-medium">{s.t}</div>
              <div className="text-sm text-white/50 mt-0.5 leading-relaxed">{s.d}</div>
            </div>
          </div>
        </Fade>
      ))}
    </div>
  );
}

/** Kopyalanabilir istem örneği. */
function Prompt({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-lg px-5 py-4 font-mono text-[13px] leading-relaxed text-white/75 whitespace-pre-wrap"
      style={{
        background: "rgba(255,255,255,0.04)",
        borderInlineStart: `3px solid ${ACCENT}`,
      }}
    >
      {children}
    </div>
  );
}

const Yes = () => <Check className="w-4 h-4 ai-yes" aria-label="var" />;
const No = () => <Minus className="w-4 h-4 ai-no" aria-label="yok" />;

/* ─── Slaytlar ─────────────────────────────────────────────────── */

const slides: Array<(active: boolean) => ReactNode> = [
  /* 01 · Kapak */
  () => (
    <div className="relative w-full h-full flex items-center justify-center px-10">
      <Grid />
      <div
        aria-hidden
        className="absolute -inset-x-40 top-1/3 h-96 blur-[140px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${ACCENT}22, transparent 70%)` }}
      />
      <div className="relative text-center max-w-4xl">
        <Fade>
          <div
            className="font-mono text-xs uppercase tracking-[0.3em] mb-7"
            style={{ color: ACCENT }}
          >
            84 slayt · okuma süresi ~30 dakika
          </div>
        </Fade>
        <Fade delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.05]">
            Akademisyenler için
            <br />
            <span style={{ color: ACCENT }}>yapay zekâ</span>
          </h1>
        </Fade>
        <Fade delay={0.2}>
          <p className="mt-7 text-xl text-white/55 leading-relaxed">
            Ders hazırlamaktan hakem yanıtı yazmaya: işin hangi kısmını
            devredebilirsiniz, hangisini asla devredemezsiniz.
            <br />
            Her sayının kaynağı slaytın altında yazılı.
          </p>
        </Fade>
        <Fade delay={0.3}>
          <div className="mt-11 font-mono text-sm text-white/35">
            Öğr. Gör. Osman Can Çetlenbik · Manisa Celal Bayar Üniversitesi
          </div>
        </Fade>
      </div>
    </div>
  ),

  /* 02 · Bu sunum ne, ne değil */
  () => (
    <Slide>
      <Eyebrow>Baştan netleştirelim</Eyebrow>
      <H1>Bu sunumda abartı yok.</H1>
      <Sub>
        Yapay zekâ anlatan içeriklerin çoğu vaatle dolu. Buradaki her sayı,
        tarih ve kapsam bilgisi üreticinin kendi resmî sayfasından ya da
        yayıncının kendi politika metninden alındı; kaynağı da slaytın altında
        duruyor. Doğrulayamadığım hiçbir şey bu sunuma girmedi.
      </Sub>
      <div className="mt-8">
        <Versus
          left={{
            label: "Bulamayacağınız şeyler",
            items: [
              "“Yapay zekâ makalenizi yazsın” tavsiyesi",
              "Doğrulanmamış kampanya duyurusu",
              "Aracı sihirli bir kutu gibi gösteren örnekler",
              "Kaynağı belirsiz istatistik",
            ],
          }}
          right={{
            label: "Bulacağınız şeyler",
            items: [
              "Neyin ücretsiz olduğu — tam kapsamıyla",
              "Kopyalayıp kullanabileceğiniz istem kalıpları",
              "Dört büyük yayıncının beyan kuralları",
              "Verinizin nereye gittiği ve ne kadar durduğu",
            ],
          }}
        />
      </div>
    </Slide>
  ),

  /* 03 · Sözlük */
  () => (
    <Slide>
      <Eyebrow>Önce ortak dil</Eyebrow>
      <H2>Altı terim, altı cümle.</H2>
      <Sub>
        Konuşmanın geri kalanı bu altı kelimeye dayanıyor. Zaten biliyorsanız
        bir slayt ilerleyin.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-x-8 gap-y-4">
        {[
          ["Model", "Metni üreten sistemin kendisi. Claude'un Opus, Sonnet, Haiku diye farklı güç ve hız seviyeleri var."],
          ["İstem (prompt)", "Modele yazdığınız yönerge. Sonucun kalitesini en çok belirleyen şey."],
          ["Bağlam penceresi", "Modelin aynı anda “aklında tutabildiği” metin miktarı. Uzun bir tez bu pencereye sığmayabilir."],
          ["Halüsinasyon", "Modelin, doğruymuş gibi görünen ama gerçekte var olmayan bilgi üretmesi. Akademisyeni en çok yakan hata türü."],
          ["Token", "Metnin modelce sayılan birimi. Kabaca bir kelimenin parçası; kullanım limitleri bununla ölçülür."],
          ["Ajan (agent)", "Sadece cevap vermekle kalmayıp adım adım iş yapan kurulum: dosya açar, arama yapar, tabloyu günceller."],
        ].map(([t, d], i) => (
          <Fade key={t} delay={0.05 * i}>
            <div>
              <div className="text-white font-semibold mb-1">{t}</div>
              <div className="text-sm text-white/50 leading-relaxed">{d}</div>
            </div>
          </Fade>
        ))}
      </div>
    </Slide>
  ),

  /* 04 · Yol haritası */
  () => (
    <Slide>
      <Eyebrow>İçindekiler</Eyebrow>
      <H2>Sekiz bölüm.</H2>
      <div className="mt-8 grid md:grid-cols-2 gap-x-8 gap-y-3">
        {[
          ["1 · Para", "Neyin ücretsiz olduğu, neyin olmadığı, dolaşan söylentinin aslı"],
          ["2 · Nasıl sorulur", "İstem yazmanın işe yarayan kalıpları ve hazır şablonlar"],
          ["3 · Akademik iş", "Literatürden hakem yanıtına, izlenceden veri analizine"],
          ["4 · Araç haritası", "Claude dışındaki araçlar, doğrulanmış fiyatlarıyla"],
          ["5 · Öğrenci", "Ödevi yasaklamadan nasıl kurgularsınız"],
          ["6 · Sınırlar", "Yayıncı kuralları, halüsinasyon, veri gizliliği"],
          ["7 · Araçlar", "Sizin için yazdığım ücretsiz yazılımlar"],
          ["8 · Uygulama", "Bu hafta yapabilecekleriniz ve sık yapılan hatalar"],
        ].map(([t, d], i) => (
          <Fade key={t} delay={0.05 * i}>
            <div className="ai-card px-5 py-4">
              <div
                className="font-mono text-[11px] uppercase tracking-[0.18em] mb-1.5"
                style={{ color: ACCENT }}
              >
                {t}
              </div>
              <div className="text-sm text-white/55 leading-relaxed">{d}</div>
            </div>
          </Fade>
        ))}
      </div>
    </Slide>
  ),

  /* 05 · Bölüm 1 */
  () => (
    <Divider
      num="1"
      title="Para"
      subtitle="Neyin ücretsiz olduğu, neyin olmadığı ve çok dolaşan bir söylentinin aslı."
    />
  ),

  /* 06 · Ücretsiz planda ne var */
  () => (
    <Slide>
      <Eyebrow>Ücretsiz plan · 0 USD</Eyebrow>
      <H2>Tek kuruş ödemeden neler yapabilirsiniz?</H2>
      <Sub>
        Akademik işin önemli bir kısmı ücretsiz planda zaten dönüyor. Ödeme
        yapmadan önce buranın sınırına gerçekten çarpıp çarpmadığınıza bakın.
      </Sub>
      <div className="mt-7 grid md:grid-cols-3 gap-4">
        <Fade delay={0.06}>
          <Card icon={Sparkles} title="Sonnet ve Haiku">
            Günlük yazışma, özetleme, çeviri ve kod için iki model.
          </Card>
        </Fade>
        <Fade delay={0.12}>
          <Card icon={Layers} title="Artifacts">
            Doküman, görselleştirme ve tek dosyalık web uygulaması üretip
            yayımlayabilirsiniz — yayımlama ücretsiz planda da açık.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={Link2} title="Bağlayıcılar, web araması">
            Drive, GitHub, Slack gibi kaynaklara bağlanma ve web araması
            ücretsiz planda listeleniyor.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={FileText} title="Beş proje">
            Ayrı bağlamlar: bir ders, bir makale, bir proje. Ücretsizde en
            fazla beş tane.
          </Card>
        </Fade>
        <Fade delay={0.3}>
          <Card icon={BookOpen} title="Dosya yükleme ve hafıza">
            Belge yükleyip üzerinde konuşmak ve önceki konuşmaları hatırlaması
            ücretsiz planda da var.
          </Card>
        </Fade>
        <Fade delay={0.36}>
          <Card icon={MessageSquare} title="Sesli mod ve Skills">
            Konuşarak kullanım ve hazır beceri paketleri ücretsizde listeleniyor.
          </Card>
        </Fade>
      </div>
      <Source>
        claude.com/pricing · support.claude.com “What are Projects”, “What are
        Artifacts” — erişim 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* 07 · Pro ne ekliyor */
  () => (
    <Slide>
      <Eyebrow>Pro · aylık 20 USD, yıllık ödemede 17 USD/ay</Eyebrow>
      <H2>Ücret neyi satın alıyor?</H2>
      <div className="mt-7 overflow-x-auto">
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
      <div className="ai-warn mt-5 px-5 py-3">
        <p className="text-sm text-white/70 leading-relaxed">
          <strong className="text-white">Sık karıştırılan nokta:</strong> Pro
          aboneliği <strong className="text-white">API erişimi içermez</strong>.
          Claude'u kendi uygulamanıza bağlayacaksanız API ayrı ücretlendirilir.
        </p>
      </div>
      <Source>
        claude.com/pricing · support.claude.com “What is the Pro plan” — erişim
        4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* 08 · Söylentinin aslı */
  () => (
    <Slide>
      <Eyebrow>Çok dolaşan bir iddia</Eyebrow>
      <H2>
        “Akademisyenlere ücretsiz Pro veriliyor” — yarısı doğru.
      </H2>
      <Sub>
        Ücretsiz bir program gerçekten var: <strong className="text-white">Claude
        for Teachers</strong>. 14 Temmuz 2026'da duyuruldu, premium erişim
        veriyor ve son başvuru 30 Haziran 2027. Ama kapsamı çok net çizilmiş.
      </Sub>
      <div className="mt-7">
        <Versus
          left={{
            label: "Kapsam dışı",
            items: [
              "Üniversite akademisyenleri",
              "Lisans ve lisansüstü öğrenciler",
              "ABD dışındaki ülkeler — Türkiye dahil",
            ],
          }}
          right={{
            label: "Kapsam içi",
            items: [
              "ABD'deki doğrulanmış K-12 öğretmenleri",
              "Okul ve ilçe düzeyinde kurumsal dağıtım",
              "Kaydolanlara bir yıl ücretsiz erişim",
            ],
          }}
        />
      </div>
      <div className="ai-warn mt-5 px-5 py-3">
        <p className="text-sm text-white/70 leading-relaxed">
          Yani Türkiye'deki bir üniversite akademisyeni bu programa
          başvuramıyor. Doğrusunu bilmek, yanlış bir umuda kapılmaktan iyidir.
        </p>
      </div>
      <Source>
        anthropic.com/news/claude-for-teachers — 14 Temmuz 2026 · ilçe
        dağıtımı 28 Ağustos 2026
      </Source>
    </Slide>
  ),

  /* 09 · .edu gerçeği */
  () => (
    <Slide>
      <Eyebrow>Peki .edu adresim?</Eyebrow>
      <H2>Tek başına hiçbir şey kazandırmıyor.</H2>
      <Sub>
        Resmî fiyat sayfasında öğrenci ya da akademisyen indirimi diye bir
        kalem yok. <code className="text-white/80">.edu</code> adresiniz ancak
        kurumunuz Claude for Education sözleşmesi imzaladıysa işe yarar — o
        zaman okul hesabınızla girip kurumun sağladığı erişimi kullanırsınız.
      </Sub>
      <div className="mt-7 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={GraduationCap} title="Kurumsal plan">
            Claude for Education üniversitenin tamamını kapsıyor: öğrenci,
            akademisyen ve idari personel. Bireysel başvuru yok.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={Wallet} title="İlan edilmiş fiyat yok">
            Anlaşma kuruma özel. Resmî sayfalarda koltuk başı bir rakam
            yayımlanmıyor.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Users} title="Partner kurumlar">
            LSE, Northeastern, Syracuse, Dartmouth, Virginia, Pittsburgh,
            Champlain, Northumbria, San Francisco.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed max-w-3xl">
          Resmî sayfada Türkiye'den listelenen bir kurum bulunmuyor. Bu, “Türk
          üniversiteleri başvuramaz” demek değil; sadece ilan edilmiş bir örnek
          olmadığı anlamına geliyor.
        </p>
      </Fade>
      <Source>
        claude.com/pricing · claude.com/solutions/education ·
        support.claude.com “Use Claude for Education at your university”
      </Source>
    </Slide>
  ),

  /* 10 · Campus Program */
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
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={Users} title="Builder Club · Lisans">
            Kampüste yapay zekâ topluluğu kuran lisans öğrencileri.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={MessageSquare} title="Campus Conversations · Y. Lisans">
            Kampüste tartışma ve etkinlik yürüten yüksek lisans öğrencileri.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={FlaskConical} title="Science Workshops · Doktora">
            Doktora ve doktora sonrası araştırmacılar için atölyeler.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <p className="mt-6 text-sm text-white/45">
          Koşul: 18 yaş üstü ve öğrenim görülen ülkede çalışma izni.
        </p>
      </Fade>
      <Source>claude.com/programs/campus — erişim 4 Eylül 2026</Source>
    </Slide>
  ),

  /* 11 · Hangi planı almalı */
  () => (
    <Slide>
      <Eyebrow>Karar</Eyebrow>
      <H2>Hangi planı almalısınız?</H2>
      <div className="mt-7 space-y-3">
        {[
          {
            t: "Ücretsiz kalın",
            d: "Ara sıra özet, çeviri ve fikir alıyorsanız. Beş saatlik pencereye haftada bir iki kez çarpıyorsanız acele etmeyin.",
          },
          {
            t: "Pro'ya geçin",
            d: "Haftada birkaç saat yoğun kullanıyorsanız; literatür taraması, Excel'de veri analizi ya da uzun belge işi yapıyorsanız. Limit uyarısını sık görüyorsanız karar zaten verilmiş demektir.",
          },
          {
            t: "Kurumsal konuşun",
            d: "Bölüm ya da fakülte olarak kullanacaksanız. Kurumsal planlar tüketici veri politikasının dışında — etik kurul ve bilgi işlem için belirleyici fark bu.",
          },
        ].map((s, i) => (
          <Fade key={s.t} delay={0.1 * i}>
            <div className="ai-card px-6 py-4">
              <div className="text-white font-semibold text-lg mb-1">{s.t}</div>
              <div className="text-sm text-white/55 leading-relaxed">{s.d}</div>
            </div>
          </Fade>
        ))}
      </div>
      <Fade delay={0.4}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed">
          Yıllık ödeme aylıktan ucuz: 17 USD/ay yerine 20 USD/ay. Ama önce bir
          ay aylık deneyip gerçekten kullanıp kullanmadığınızı görün.
        </p>
      </Fade>
      <Source>claude.com/pricing — erişim 4 Eylül 2026</Source>
    </Slide>
  ),

  /* 12 · Bölüm 2 */
  () => (
    <Divider
      num="2"
      title="Nasıl sorulur"
      subtitle="Aynı araç, iki farklı istem, iki farklı sonuç. Fark tekniğin kendisinde."
    />
  ),

  /* 13 · Kötü istem / iyi istem */
  () => (
    <Slide>
      <Eyebrow>En büyük fark burada</Eyebrow>
      <H2>Aynı soru, iki farklı sorulma biçimi.</H2>
      <Sub>
        “İşe yaramıyor” diyenlerin çoğu aslında bağlam vermiyor. Modelin sizin
        dersinizi, öğrencinizi ve amacınızı bilmesi mümkün değil — söylemezseniz
        ortalama bir cevap alırsınız.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <X className="w-4 h-4 text-white/35" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
                Ortalama cevap getirir
              </span>
            </div>
            <Prompt>Veri yapıları konusunda quiz hazırla.</Prompt>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Check className="w-4 h-4" style={{ color: ACCENT }} />
              <span
                className="font-mono text-[11px] uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                Kullanılabilir cevap getirir
              </span>
            </div>
            <Prompt>{`Önlisans 1. sınıf Programlama Temelleri dersi için
10 soruluk quiz hazırla.

Konu: listeler ve döngüler (yalnızca bu ikisi).
Öğrenciler 6 haftadır Python görüyor, fonksiyon
konusunu henüz görmediler — fonksiyon kullanma.

Format: 6 çoktan seçmeli, 4 kısa kod okuma.
Her sorunun altına doğru cevabı ve bir cümlelik
gerekçesini yaz.
Zorluk: 7 kolay, 3 ayırt edici.`}</Prompt>
          </div>
        </Fade>
      </div>
      <Fade delay={0.26}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed max-w-3xl">
          Uzun istem yazmak zahmetli görünüyor ama bir kez yazıp saklarsınız.
          İkinci hafta aynı kalıba konuyu değiştirip yapıştırmanız yeterli.
        </p>
      </Fade>
    </Slide>
  ),

  /* 14 · Bağlam vermenin yolları */
  () => (
    <Slide>
      <Eyebrow>Bağlam</Eyebrow>
      <H2>Modelin bilmediği dört şeyi söyleyin.</H2>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.06}>
          <Card icon={Users} title="Kim için">
            Önlisans mı doktora mı, hangi bölüm, hangi ön bilgiye sahip.
            “Öğrenciler türev görmedi” cümlesi çıktıyı kökten değiştirir.
          </Card>
        </Fade>
        <Fade delay={0.12}>
          <Card icon={Target} title="Ne amaçla">
            Sınav sorusu mu, ders içi tartışma mı, ödev yönergesi mi? Aynı
            konu, üç farklı metin demektir.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={ClipboardList} title="Hangi biçimde">
            Kaç madde, kaç kelime, tablo mu düz metin mi, kaynakça istiyor
            musunuz. Söylemezseniz kendi kararını verir.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Ban} title="Neyi yapmasın">
            “Fonksiyon kullanma”, “İngilizce terim kullanma”, “örnekleri
            Türkiye'den seç”. Yasaklar en az istekler kadar iş görür.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <div className="ai-warn mt-6 px-5 py-3.5">
          <p className="text-sm text-white/70 leading-relaxed">
            Belge yükleyebiliyorsanız anlatmak yerine gösterin. İzlencenizi
            yüklemek, izlenceyi tarif etmekten hem hızlı hem doğru.
          </p>
        </div>
      </Fade>
    </Slide>
  ),

  /* 15 · İşe yarayan kalıplar */
  () => (
    <Slide>
      <Eyebrow>Kalıplar</Eyebrow>
      <H2>Sonucu belirgin biçimde iyileştiren beş alışkanlık.</H2>
      <div className="mt-7">
        <Steps
          items={[
            {
              t: "Rol verin",
              d: "“Bu alanda 20 yıllık bir hakem gibi davran” demek, cevabın hangi gözle yazılacağını belirler.",
            },
            {
              t: "Örnek verin",
              d: "İstediğiniz çıktının bir örneğini yapıştırın. Tarif etmekten çok daha isabetli sonuç verir.",
            },
            {
              t: "Adım adım isteyin",
              d: "“Önce planını çıkar, onayımı al, sonra yaz.” Uzun işlerde tek seferde yazdırmak yerine ara onay alın.",
            },
            {
              t: "Eleştirmesini isteyin",
              d: "“Bu paragrafın en zayıf üç yanı ne?” Kendi yazdığınız metni verip eksiğini sordurmak, ürettirmekten daha değerli.",
            },
            {
              t: "İkinci turu atlamayın",
              d: "İlk cevap taslaktır. “Şu kısmı daha somut yaz, şu örneği çıkar” diyerek ilerleyin.",
            },
          ]}
        />
      </div>
    </Slide>
  ),

  /* 15b · Kopyalanabilir istem kütüphanesi */
  () => (
    <Slide>
      <Eyebrow>Kütüphane · 1</Eyebrow>
      <H2>Hazır istemler — ders için.</H2>
      <Sub>
        Köşeli parantezleri kendi dersinizle değiştirip kullanın. Bir kez
        kaydedin, her hafta aynı kalıba yeni konuyu yazın.
      </Sub>
      <div className="mt-6 space-y-4">
        <Fade delay={0.08}>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2">
              Anlaşılmayan konuyu yeniden anlatmak
            </div>
            <Prompt>{`[KONU] konusunu [SEVİYE] öğrencilere anlatıyorum ve
sınıfın yarısı anlamadı. Aynı konuyu tamamen farklı
bir benzetmeyle, günlük hayattan bir örnek üzerinden
yeniden anlat. Teknik terim kullanma; terimi ancak
kavram oturduktan sonra tanıt.`}</Prompt>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2">
              Yanlış anlamaları önceden görmek
            </div>
            <Prompt>{`[KONU] konusunda öğrencilerin en sık düştüğü beş
kavram yanılgısını yaz. Her biri için: yanlış düşünce
nedir, neden mantıklı geliyor, hangi örnekle
kırılır?`}</Prompt>
          </div>
        </Fade>
        <Fade delay={0.24}>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2">
              Ödev yönergesi ve değerlendirme ölçütü
            </div>
            <Prompt>{`[ÖDEV KONUSU] için yönerge ve dereceli puanlama
anahtarı (rubrik) yaz. Rubrik dört ölçüt içersin,
her ölçüt için 4/3/2/1 düzeyinin ne anlama geldiği
tek cümleyle açıklansın. Öğrencinin okuyup ne
beklendiğini anlayacağı sadelikte olsun.`}</Prompt>
          </div>
        </Fade>
      </div>
    </Slide>
  ),

  /* 15c · Kopyalanabilir istem kütüphanesi 2 */
  () => (
    <Slide>
      <Eyebrow>Kütüphane · 2</Eyebrow>
      <H2>Hazır istemler — araştırma için.</H2>
      <div className="mt-6 space-y-4">
        <Fade delay={0.08}>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2">
              Kendi metninizi eleştirtmek
            </div>
            <Prompt>{`Bu bölümü [HEDEF DERGİ] hakemi gözüyle oku.
Üç başlıkta yaz: (1) hangi iddiam kanıtsız kalmış,
(2) hangi cümle veriden fazlasını söylüyor,
(3) hangi bölüm gereksiz uzun. Düzeltme önerme,
yalnızca sorunları listele.`}</Prompt>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2">
              Yöntemi sınamak
            </div>
            <Prompt>{`Çalışmamda [YÖNTEM] kullanıyorum, örneklem
[N] kişi, değişkenler [X, Y]. Bu tasarımın
gözden kaçırdığım zayıf noktaları neler?
Hangi alternatif açıklamalar sonucumu
geçersiz kılabilir?`}</Prompt>
          </div>
        </Fade>
        <Fade delay={0.24}>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2">
              Sunum ve savunma provası
            </div>
            <Prompt>{`Bu çalışmayı [SÜRE] dakikada anlatacağım.
Dinleyici [KİTLE]. Bana bu sunumdan sonra
sorulabilecek en zor beş soruyu yaz ve her biri
için hangi veriye dayanarak cevap vermem
gerektiğini söyle.`}</Prompt>
          </div>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed max-w-3xl">
          Dikkat edin: bu istemlerin hiçbiri “benim yerime yaz” demiyor.
          Hepsi <strong className="text-white/70">eleştirmesini</strong>{" "}
          istiyor. En çok değer getiren kullanım biçimi bu.
        </p>
      </Fade>
    </Slide>
  ),

  /* İstem anatomisi */
  () => (
    <Slide>
      <Eyebrow>Teknik · anatomi</Eyebrow>
      <H2>İyi bir istemin altı parçası.</H2>
      <Sub>
        Hepsini her seferinde yazmanız gerekmiyor. Ama sonuç beklediğiniz gibi
        çıkmadıysa, eksik olan büyük ihtimalle bu altısından biridir.
      </Sub>
      <div className="mt-7 space-y-2.5">
        {[
          ["Rol", "“Bu alanda 20 yıllık bir hakem gibi davran.”", "Cevabın hangi gözle yazılacağını belirler."],
          ["Bağlam", "“Önlisans 1. sınıf, 6 haftadır Python görüyorlar.”", "Modelin bilmediği tek şey sizin durumunuz."],
          ["Görev", "“10 soruluk quiz hazırla.”", "Tek bir eylem olmalı; iki iş varsa iki istem yazın."],
          ["Biçim", "“6 çoktan seçmeli, 4 kod okuma. Cevap anahtarı altta.”", "Söylemezseniz kendi kararını verir."],
          ["Kısıt", "“Fonksiyon kullanma, İngilizce terim kullanma.”", "Yasaklar en az istekler kadar iş görür."],
          ["Örnek", "İstediğiniz çıktıdan bir tane yapıştırın.", "Tarif etmekten çok daha isabetli sonuç verir."],
        ].map(([k, ornek, neden], i) => (
          <Fade key={k} delay={0.06 * i}>
            <div className="ai-card px-5 py-3.5 grid md:grid-cols-[5.5rem_1fr_1fr] gap-4 items-start">
              <span
                className="font-mono text-[11px] uppercase tracking-[0.16em] pt-0.5"
                style={{ color: ACCENT }}
              >
                {k}
              </span>
              <span className="text-sm text-white/70 leading-relaxed">{ornek}</span>
              <span className="text-sm text-white/40 leading-relaxed">{neden}</span>
            </div>
          </Fade>
        ))}
      </div>
    </Slide>
  ),

  /* İleri teknikler */
  () => (
    <Slide>
      <Eyebrow>Teknik · ileri</Eyebrow>
      <H2>Sonucu değiştiren altı teknik.</H2>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <Fade delay={0.06}>
          <Card icon={Layers} title="Örnekle öğretme">
            İki üç örnek verip “aynı biçimde devam et” demek, kuralı tarif
            etmekten daha güvenilir. Özellikle biçimsel işlerde.
          </Card>
        </Fade>
        <Fade delay={0.12}>
          <Card icon={Compass} title="Adım adım düşündürme">
            “Önce planını yaz, sonra uygula.” Uzun ve çok adımlı işlerde hata
            oranını belirgin biçimde düşürüyor.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={ShieldCheck} title="Kendini denetletme">
            “Yazdığını hakem gözüyle eleştir, sonra düzelt.” Tek istemde iki
            aşama yaptırmak kaliteyi yükseltiyor.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Ban} title="Olumsuz kısıt">
            “Kaynak uydurma, emin değilsen bilmiyorum de.” Halüsinasyonu
            tamamen bitirmez ama azaltır.
          </Card>
        </Fade>
        <Fade delay={0.3}>
          <Card icon={ClipboardList} title="Çıktı iskeleti dayatma">
            İstediğiniz tabloyu ya da başlık yapısını boş hâliyle verip
            “doldur” demek, biçim tartışmasını bitirir.
          </Card>
        </Fade>
        <Fade delay={0.36}>
          <Card icon={PenLine} title="Turlayarak daraltma">
            İlk cevabı beğenmediyseniz baştan yazmayın: “şu kısmı daha somut
            yaz, şu örneği çıkar” deyin. Bağlam korunur.
          </Card>
        </Fade>
      </div>
    </Slide>
  ),

  /* Sunum üretme istemi */
  () => (
    <Slide>
      <Eyebrow>Teknik · sunum üretme</Eyebrow>
      <H2>Sunum hazırlatmanın istemi.</H2>
      <Sub>
        “Bana sunum hazırla” demek işe yaramıyor; ortalama bir slayt yığını
        çıkıyor. İşe yarayan istem, sunumun kısıtlarını baştan söylüyor.
      </Sub>
      <div className="mt-6">
        <Prompt>{`[KONU] üzerine [SÜRE] dakikalık bir sunum hazırlıyorum.
Dinleyici: [KİTLE — ör. alan dışı akademisyenler].
Amacım: [dinleyici çıkarken şunu bilsin / şunu yapsın].

Önce sadece bölüm başlıklarını ve her bölüme kaç
dakika ayrılacağını çıkar. Slayt yazma — önce akışı
onaylayacağım.`}</Prompt>
      </div>
      <Fade delay={0.2}>
        <p className="mt-5 text-sm text-white/50 leading-relaxed">
          Akışı onayladıktan sonra ikinci istem:
        </p>
      </Fade>
      <Fade delay={0.28}>
        <div className="mt-3">
          <Prompt>{`Şimdi [BÖLÜM ADI] için slaytları yaz. Her slaytta:
başlık (en fazla 8 kelime), en fazla 3 madde
(her biri tek satır) ve altına benim okuyacağım
2-3 cümlelik konuşma notu.

Slayta paragraf yazma. Dinleyici slaydı okurken
beni dinleyemez.`}</Prompt>
        </div>
      </Fade>
      <Fade delay={0.36}>
        <p className="mt-5 text-sm text-white/45 leading-relaxed max-w-3xl">
          Son kısıt önemli: model, istemezseniz slaytları paragrafla
          doldurmaya meyilli. “Slayta paragraf yazma” cümlesi sunumun
          okunabilirliğini tek başına kurtarıyor.
        </p>
      </Fade>
    </Slide>
  ),

  /* Uzun belgeyle çalışma */
  () => (
    <Slide>
      <Eyebrow>Teknik · uzun belgeler</Eyebrow>
      <H2>Tez, rapor ve kitap boyutunda metinler.</H2>
      <Sub>
        Uzun belgelerde en sık yapılan hata, tamamını yükleyip genel bir soru
        sormak. Sonuç yüzeysel çıkıyor. Dört adımda çözülüyor.
      </Sub>
      <div className="mt-6">
        <Steps
          items={[
            {
              t: "Önce haritasını çıkarttırın",
              d: "“Bu belgenin bölüm başlıklarını ve her bölümün ne yaptığını tek cümleyle yaz.” Neyin nerede olduğunu görürsünüz.",
            },
            {
              t: "Sonra tek bölüme odaklanın",
              d: "“Yalnızca 3. bölüme bak” deyin. Kapsamı daraltmak derinliği artırıyor.",
            },
            {
              t: "Alıntı isteyin",
              d: "“Her iddian için belgeden birebir alıntı ver.” Uydurmayı böyle yakalarsınız; alıntı bulamıyorsa iddia da yoktur.",
            },
            {
              t: "Görsel gerekiyorsa bölün",
              d: "Şekilleri incelemesi gerekiyorsa 100 sayfanın altına inin — üstünde yalnızca metin okunuyor.",
            },
          ]}
        />
      </div>
    </Slide>
  ),

  /* İstem hataları */
  () => (
    <Slide>
      <Eyebrow>Teknik · sık yapılan hatalar</Eyebrow>
      <H2>İstemi bozan beş alışkanlık.</H2>
      <div className="mt-6">
        <Versus
          left={{
            label: "Bozan",
            items: [
              "Tek istemde üç ayrı iş istemek",
              "“İyi bir metin yaz” gibi ölçülemeyen istek",
              "Bağlamı vermeden “bunu düzelt” demek",
              "Beğenmeyince baştan, sıfır bağlamla yazmak",
              "Kaynak isteyip doğrulamamak",
            ],
          }}
          right={{
            label: "Düzelten",
            items: [
              "Her istemde tek iş; sırayla ilerlemek",
              "“En fazla 150 kelime, üç madde” gibi ölçülebilir kısıt",
              "Belgeyi yükleyip “bu bağlamda” demek",
              "Aynı sohbette “şurayı değiştir” diye daraltmak",
              "Her DOI'yi açıp kontrol etmek",
            ],
          }}
        />
      </div>
      <Fade delay={0.28}>
        <div className="ai-warn mt-6 px-5 py-3.5">
          <p className="text-sm text-white/70 leading-relaxed">
            Pratik ölçü: istediğiniz şeyi bir asistana anlatsanız o kişi ne
            sorardı? O soruların cevabını baştan yazarsanız istem hazırdır.
          </p>
        </div>
      </Fade>
    </Slide>
  ),

  /* 16 · Nerede yanılır */
  () => (
    <Slide>
      <Eyebrow>Sınır</Eyebrow>
      <H2>Nerede güvenmemelisiniz?</H2>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.06}>
          <Card icon={FileSearch} title="Atıf ve kaynak">
            Var olmayan makale, yanlış cilt/sayfa, gerçek yazarla uydurma
            başlık birleşimi üretebilir. Her kaynağı açıp bakın.
          </Card>
        </Fade>
        <Fade delay={0.12}>
          <Card icon={Table2} title="Sayısal kesinlik">
            Uzun hesap zincirlerinde ve büyük tablolarda hata yapar. Kritik
            sayıyı kendiniz doğrulayın ya da hesabı koda yaptırın.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={Compass} title="Çok yeni gelişmeler">
            Eğitim verisinin bittiği tarihten sonrasını bilmez. Web araması
            açık değilse güncel bir yönetmeliği bilmesini beklemeyin.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Scale} title="Yerel mevzuat ve kurum kuralı">
            YÖK yönetmeliği, üniversitenizin yönergesi, derginizin özel kuralı
            — bunları kaynağından okuyun.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <div className="ai-warn mt-6 px-5 py-3.5">
          <p className="text-sm text-white/70 leading-relaxed">
            Pratik kural: <strong className="text-white">doğruluğunu
            denetleyebildiğiniz işlerde</strong> kullanın. Denetleyemeyeceğiniz
            bir alanda ürettiği metne güvenmek, bilmediğiniz bir dilde imza
            atmaya benzer.
          </p>
        </div>
      </Fade>
    </Slide>
  ),

  /* 17 · Bölüm 3 */
  () => (
    <Divider
      num="3"
      title="Akademik iş"
      subtitle="Literatürden hakem yanıtına, izlenceden veri analizine: somut akışlar."
    />
  ),

  /* 17b · Araştırma sürecinde nereye giriyor */
  () => (
    <Slide>
      <Eyebrow>Genel bakış</Eyebrow>
      <H2>Araştırma sürecinin neresine giriyor?</H2>
      <Sub>
        Her adımda yapay zekânın yaptığı iş ile sizin yapmanız gereken iş
        farklı. Karışırsa ya değer kaybediyorsunuz ya da sorumluluk.
      </Sub>
      <div className="mt-8">
        <FlowSteps
          steps={[
            {
              label: "Soru belirleme",
              ai: "Alandaki tartışmaları haritalar, benzer soruları gösterir.",
              you: "Hangi sorunun sorulmaya değer olduğuna karar verirsiniz.",
            },
            {
              label: "Literatür",
              ai: "Kaynak bulur, özetler, karşılaştırma tablosu çıkarır.",
              you: "Her kaynağı açıp doğrular, boşluğu siz tespit edersiniz.",
            },
            {
              label: "Yöntem",
              ai: "Zayıf noktaları ve alternatif açıklamaları sorar.",
              you: "Tasarımı kurar, etik kurul sorumluluğunu taşırsınız.",
            },
            {
              label: "Analiz",
              ai: "Kod yazar, dönüştürür, grafik üretir.",
              you: "Sayının doğruluğunu ve yorumunu siz üstlenirsiniz.",
            },
            {
              label: "Yazım",
              ai: "Taslak iskeleti, dil düzeltmesi, biçim uyarlama.",
              you: "İddiayı, katkıyı ve sınırlılıkları siz yazarsınız.",
            },
            {
              label: "Gönderim",
              ai: "Derginin biçim kurallarına uydurur, özet önerir.",
              you: "Beyanı yazar, kaynakçayı doğrular, imzayı atarsınız.",
            },
          ]}
        />
      </div>
    </Slide>
  ),

  /* 18 · Projects */
  () => (
    <Slide>
      <Eyebrow>Projects</Eyebrow>
      <H2>Her ders ve her makale için ayrı bir oda.</H2>
      <Sub>
        Proje, kendi belge havuzu ve kendi sohbet geçmişi olan bağımsız bir
        çalışma alanı. Belgeleri bir kez yüklersiniz; o projedeki her konuşma
        bu bağlamı bilir. Her sohbette baştan anlatmak zorunda kalmazsınız.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <h3 className="text-white font-semibold mb-2.5">
              Ders projesine ne koyarsınız
            </h3>
            <ul className="space-y-1.5 text-sm text-white/55 leading-relaxed">
              <li>· İzlence ve haftalık plan</li>
              <li>· Ders kitabının ilgili bölümleri</li>
              <li>· Geçen yılki sınav soruları</li>
              <li>· Öğrenci seviyesine dair kendi notunuz</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <h3 className="text-white font-semibold mb-2.5">
              Makale projesine ne koyarsınız
            </h3>
            <ul className="space-y-1.5 text-sm text-white/55 leading-relaxed">
              <li>· Okuduğunuz temel kaynaklar</li>
              <li>· Kendi taslağınız ve notlarınız</li>
              <li>· Hedef derginin yazım kılavuzu</li>
              <li>· Varsa hakem raporları</li>
            </ul>
          </div>
        </Fade>
      </div>
      <Source>
        support.claude.com “What are Projects” — ücretsizde 5 proje, ücretli
        planlarda sınırsız ve genişletilmiş bilgi tabanı
      </Source>
    </Slide>
  ),

  /* 19 · Dosya limitleri */
  () => (
    <Slide>
      <Eyebrow>Dosya analizi</Eyebrow>
      <H2>Gerçek sınırlar — tahmin değil.</H2>
      <Sub>
        “PDF yükleyebiliyor” demek yetmiyor. Sınırı bilmezseniz işin ortasında
        tıkanırsınız. Resmî limitler şöyle.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-3">
              Sohbete yüklerken
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>· Dosya başına <strong className="text-white">500 MB</strong></li>
              <li>· Sohbet başına <strong className="text-white">20 dosya</strong></li>
              <li>· PDF üst sınırı <strong className="text-white">1000 sayfa</strong></li>
              <li>
                · Grafik ve görseller yalnızca{" "}
                <strong className="text-white">100 sayfaya kadar</strong>{" "}
                analiz edilir; üstünde sadece metin çıkarılır
              </li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-3">
              Projeye yüklerken
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>· Dosya başına <strong className="text-white">30 MB</strong></li>
              <li>· Dosya sayısı bağlam penceresiyle sınırlı</li>
              <li>· PDF'lerden yalnızca metin çıkarılır</li>
            </ul>
          </div>
        </Fade>
      </div>
      <Fade delay={0.24}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed max-w-3xl">
          Pratik sonuç: 300 sayfalık bir tezin şekillerini incelemesini
          istiyorsanız ilgili bölümü ayırıp ayrı yüklemeniz gerekir. Tamamını
          atarsanız şekilleri değil yalnızca metni görür.
        </p>
      </Fade>
      <Source>
        support.claude.com “Upload files to Claude” — erişim 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* 20 · Literatür taraması */
  () => (
    <Slide>
      <Eyebrow>İş akışı · literatür</Eyebrow>
      <H2>Alana hızlı giriş.</H2>
      <Sub>
        Research özelliği birbirini besleyen çok sayıda arama yapıp atıflı bir
        rapor üretiyor. Ücretli planlarda var ve çok kaynak çektiği için
        kullanım limitini normal sohbetten hızlı tüketiyor.
      </Sub>
      <div className="mt-6">
        <Steps
          items={[
            {
              t: "Soruyu daraltın",
              d: "“Makine öğrenmesi” değil; “2020 sonrası, Türkçe metinlerde duygu analizi, transformer tabanlı yaklaşımlar”.",
            },
            {
              t: "Haritayı çıkarttırın",
              d: "Hangi ekoller var, kim kime cevap veriyor, hangi tartışma açık kalmış.",
            },
            {
              t: "Her kaynağı açın",
              d: "Rapordaki atıfları tek tek doğrulayın. Bu adımı atlarsanız bütün iş çöker.",
            },
            {
              t: "Boşluğu kendiniz bulun",
              d: "“Literatürde ne eksik” sorusunun cevabı sizden gelmeli. Model kalıp görür, siz alanı bilirsiniz.",
            },
          ]}
        />
      </div>
      <div className="ai-warn mt-5 px-5 py-3">
        <p className="text-sm text-white/70 leading-relaxed">
          Sistematik derleme yerine geçmez. PRISMA akışını, dahil etme
          ölçütlerini ve tarama günlüğünü siz kurarsınız.
        </p>
      </div>
      <Source>
        support.claude.com “Use Research on Claude” — Pro, Max, Team,
        Enterprise
      </Source>
    </Slide>
  ),

  /* 21 · Makale yazımı */
  () => (
    <Slide>
      <Eyebrow>İş akışı · makale</Eyebrow>
      <H2>Nerede yardım eder, nerede etmez.</H2>
      <div className="mt-7">
        <Versus
          left={{
            label: "Devretmeyin",
            items: [
              "Bulguların yorumu — alanı siz biliyorsunuz",
              "Katkı iddiası — “bu çalışma neden önemli”",
              "Sınırlılıklar bölümü — dürüstlük gerektirir",
              "Kaynakça — uydurma atıf riski burada",
            ],
          }}
          right={{
            label: "Rahatça devredin",
            items: [
              "Dağınık notlardan ilk taslak iskeleti",
              "Aynı şeyi tekrar eden paragrafları bulma",
              "Derginin biçim kurallarına uydurma",
              "Özet ve anahtar kelime önerisi",
              "Dil düzeltmesi ve akıcılık",
            ],
          }}
        />
      </div>
      <Fade delay={0.26}>
        <div className="mt-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2.5">
            En çok işe yarayan istem
          </div>
          <Prompt>{`Şu paragrafı hakem gözüyle oku. Hangi iddiam
kanıtsız kalmış, hangi cümle fazla iddialı,
nerede veri ile sonuç arasındaki bağ zayıf?
Düzeltme yazma — sadece sorunları listele.`}</Prompt>
        </div>
      </Fade>
    </Slide>
  ),

  /* 22 · Hakem yanıtı */
  () => (
    <Slide>
      <Eyebrow>İş akışı · hakem yanıtı</Eyebrow>
      <H2>Herkesin en çok ertelediği iş.</H2>
      <Sub>
        Hakem raporuna cevap yazmak duygusal olarak zor ve biçimsel olarak
        yorucu. Burada gerçekten hızlandırıcı — ama önemli bir sınırla.
      </Sub>
      <div className="mt-6">
        <Steps
          items={[
            {
              t: "Eleştirileri maddeleyin",
              d: "Raporu yapıştırıp “her eleştiriyi ayrı madde olarak çıkar, tekrar edenleri birleştir” deyin.",
            },
            {
              t: "Her maddeye ne yapacağınıza siz karar verin",
              d: "Kabul mü, kısmen kabul mü, gerekçeli ret mi. Bu karar sizin; model sizin yerinize veremez.",
            },
            {
              t: "Cevap taslağını yazdırın",
              d: "“Kararım şu” diyerek verin. Kibar, savunmacı olmayan, madde madde bir taslak çıkarsın.",
            },
            {
              t: "Tonunu siz ayarlayın",
              d: "Editöre giden metin sizin sesinizle olmalı. Fazla resmî ya da fazla özür dileyen tonu düzeltin.",
            },
          ]}
        />
      </div>
      <div className="ai-warn mt-5 px-5 py-3">
        <p className="text-sm text-white/70 leading-relaxed">
          <strong className="text-white">Dikkat:</strong> Bu, kendi makalenize
          gelen rapor için geçerli. Kendiniz hakemlik yapıyorsanız
          değerlendirdiğiniz makaleyi yükleyemezsiniz — ayrıntısı 37. slaytta.
        </p>
      </div>
    </Slide>
  ),

  /* 23 · Sunum hazırlama */
  () => (
    <Slide>
      <Eyebrow>İş akışı · sunum</Eyebrow>
      <H2>Bir konferans sunumu, baştan sona.</H2>
      <div className="mt-6">
        <Steps
          items={[
            {
              t: "Malzemeyi toplayın",
              d: "Makalenizi, veri tablonuzu ve varsa bildiri şablonunu bir projeye yükleyin.",
            },
            {
              t: "İskeleti çıkartın",
              d: "“15 dakikalık sunum için bölüm başlıkları ve her bölüme kaç dakika.” Kendi aklınızdaki akışla karşılaştırın.",
            },
            {
              t: "Slayt metnini yazdırın",
              d: "Her bölüm için slayt metni ve konuşma notu. Artifacts ile doğrudan görselleştirme de üretebilirsiniz.",
            },
            {
              t: "Zor soruları önceden görün",
              d: "“Bu sunumdan sonra bana sorulacak en zor üç soru ne?” En çok işe yarayan adım budur.",
            },
            {
              t: "Anlatımı siz yazın",
              d: "Çıkan metni olduğu gibi okumayın. Dinleyici, sizin cümleniz olmayanı fark eder.",
            },
          ]}
        />
      </div>
    </Slide>
  ),

  /* 24 · İzlence */
  () => (
    <Slide>
      <Eyebrow>İş akışı · ders</Eyebrow>
      <H2>İzlenceden haftalık plana.</H2>
      <Sub>
        Yeni bir ders açarken en çok vakit alan kısım, öğrenme çıktılarıyla
        haftalık konuları tutarlı biçimde eşlemek. Burada gerçekten hızlanır.
      </Sub>
      <div className="mt-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2.5">
          Kopyalanabilir istem
        </div>
        <Prompt>{`Önlisans 2. sınıf "Veri Görselleştirme" dersi için
14 haftalık plan hazırla.

Ders 3 saat/hafta, laboratuvarlı. Öğrenciler
Python biliyor, istatistik görmediler.

Her hafta için: konu başlığı, o haftanın öğrenme
çıktısı, laboratuvar etkinliği ve ön okuma.
8. hafta ara sınav, 15. hafta final.

Öğrenme çıktılarını Bloom taksonomisine göre
etiketle (hatırlama / uygulama / analiz / değerlendirme).`}</Prompt>
      </div>
      <Fade delay={0.25}>
        <p className="mt-5 text-sm text-white/45 leading-relaxed max-w-3xl">
          Çıkan planı olduğu gibi kullanmayın. Bölümünüzün müfredat komisyonu
          kuralları ve ders saatinin gerçek temposu ancak sizde var.
        </p>
      </Fade>
    </Slide>
  ),

  /* 25 · Sınav sorusu */
  () => (
    <Slide>
      <Eyebrow>İş akışı · ölçme</Eyebrow>
      <H2>Ezberle geçilemeyen soru yazmak.</H2>
      <Sub>
        Soru üretmek kolay; <em>ayırt edici</em> soru üretmek zor. İkincisini
        istemek için ne istediğinizi açıkça söylemeniz gerekiyor.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <Card icon={PenLine} title="Çeldirici isteyin">
            “Her şıkkın yanına, o şıkkı işaretleyen öğrencinin hangi kavramı
            yanlış anladığını yaz.” Bu tek cümle soru kalitesini değiştirir.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={Layers} title="Seviye dağıtın">
            “Üç soru hatırlama, dört soru uygulama, üç soru analiz düzeyinde
            olsun.” Yoksa hepsi aynı zorlukta çıkar.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={FileSearch} title="Kod okutun">
            Programlama derslerinde “şu kod ne yazdırır” tipi sorular ezberle
            geçilemez. Hatalı kod verip hatayı buldurmak daha da iyidir.
          </Card>
        </Fade>
        <Fade delay={0.32}>
          <Card icon={ShieldCheck} title="Kendi sorunuzu denetletin">
            Yazdığınız soruyu verip “bu soru belirsiz mi, birden fazla doğru
            cevabı var mı” diye sorun. Sınavdan önce yakalamak iyidir.
          </Card>
        </Fade>
      </div>
    </Slide>
  ),

  /* 26 · Veri analizi */
  () => (
    <Slide>
      <Eyebrow>İş akışı · veri</Eyebrow>
      <H2>Excel içinde veri setiyle konuşmak.</H2>
      <Sub>
        Claude for Excel, Excel'in içinde kenar çubuğu olarak çalışıyor:
        çalışma kitabını okuyor, hücre düzeyinde atıf vererek cevap veriyor,
        formül ilişkilerini bozmadan değer güncelliyor. Anket verisi, sınav
        sonucu ya da ölçüm tablosuyla çalışan herkesi doğrudan ilgilendiriyor.
      </Sub>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <h3 className="text-white font-semibold mb-2.5">Yaptıkları</h3>
            <ul className="space-y-1.5 text-sm text-white/55 leading-relaxed">
              <li>· Hata kök nedeni bulma (#REF!, #DIV/0)</li>
              <li>· Pivot ve koşullu biçimlendirme</li>
              <li>· Model ve şablon üretme</li>
              <li>· Formül ilişkilerini bozmadan güncelleme</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <h3 className="text-white font-semibold mb-2.5">Çalışmadığı yerler</h3>
            <ul className="space-y-1.5 text-sm text-white/55 leading-relaxed">
              <li>· Excel 2016 / 2019 kalıcı sürümler</li>
              <li>· iPad ve Android</li>
              <li>· Makro ve VBA</li>
            </ul>
          </div>
        </Fade>
      </div>
      <div className="ai-warn mt-5 px-5 py-3">
        <p className="text-sm text-white/70 leading-relaxed">
          <strong className="text-white">Güvenlik notu:</strong> Yalnızca
          güvendiğiniz dosyalarla kullanın. Dışarıdan gelen bir tabloya
          gizlenmiş yönerge, aracı istemediğiniz bir işe yönlendirebilir.
        </p>
      </div>
      <Source>claude.com/docs/office-agents/excel — erişim 4 Eylül 2026</Source>
    </Slide>
  ),

  /* 27 · Dil ve çeviri */
  () => (
    <Slide>
      <Eyebrow>İş akışı · dil</Eyebrow>
      <H2>İngilizce yazarken en çok işe yarayan yer.</H2>
      <Sub>
        Ana dili İngilizce olmayan bir araştırmacı için en somut fayda burada.
        İyi haber: temel dil ve yazım düzeltmesi çoğu yayıncıda beyan
        gerektirmiyor.
      </Sub>
      <div className="mt-7 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={Languages} title="Akademik ton">
            “Bu paragrafı akademik İngilizceye çevir, iddia düzeyini
            değiştirme” demek çeviri hatasını azaltır.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={PenLine} title="Aynı anlam, daha kısa">
            Dergi kelime sınırına takıldığınızda “anlamı koruyarak %20 kısalt”
            en pratik istektir.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={AlertTriangle} title="Anlam kayması">
            Çeviride iddianızın gücü değişebilir: “suggests” ile “proves”
            arasındaki fark size aittir. Çeviriyi mutlaka okuyun.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed max-w-3xl">
          Elsevier ve Springer Nature, temel dilbilgisi/okunabilirlik
          düzeltmesini beyan zorunluluğunun dışında tutuyor; IEEE beyanı
          “önerilir” diyor. Yine de kapsam genişlediyse beyan edin.
        </p>
      </Fade>
    </Slide>
  ),

  /* Alan · sosyal bilimler ve eğitim */
  () => (
    <Slide>
      <Eyebrow>Alanınıza göre · 1</Eyebrow>
      <H2>Sosyal bilimler ve eğitim.</H2>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <div
              className="font-mono text-[11px] uppercase tracking-[0.18em] mb-2.5"
              style={{ color: ACCENT }}
            >
              En çok değer getiren
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>· Görüşme deşifresini yazıya çevirme (Whisper, ücretsiz)</li>
              <li>· Açık uçlu anket yanıtlarını ön gruplama</li>
              <li>· Ölçek maddelerini dil açısından sadeleştirme</li>
              <li>· Ders materyali ve etkinlik tasarımı</li>
              <li>· Kuramsal çerçeve için karşıt görüşleri listeleme</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2.5">
              Dikkat edilecek
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>
                · <strong className="text-white">Nitel kodlamada ikinci
                kodlayıcı sayılamaz.</strong> Kodlayıcılar arası güvenirlik
                hesabına katmak yöntemsel olarak savunulamaz.
              </li>
              <li>· Katılımcı alıntıları yüklenmeden önce anonimleştirilmeli</li>
              <li>· Kültüre özgü kavramlarda Batı merkezli yorum üretebiliyor</li>
            </ul>
          </div>
        </Fade>
      </div>
      <Fade delay={0.26}>
        <div className="mt-5">
          <Prompt>{`Şu görüşme deşifresini oku. Katılımcının tekrar eden
temalarını çıkar, her tema için deşifreden birebir
alıntı ver. Yorum yapma — sadece metinde geçen
ifadelere dayan. Bulamadığın temayı uydurma.`}</Prompt>
        </div>
      </Fade>
    </Slide>
  ),

  /* Alan · mühendislik ve fen */
  () => (
    <Slide>
      <Eyebrow>Alanınıza göre · 2</Eyebrow>
      <H2>Mühendislik, fen ve bilişim.</H2>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <div
              className="font-mono text-[11px] uppercase tracking-[0.18em] mb-2.5"
              style={{ color: ACCENT }}
            >
              En çok değer getiren
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>· Analiz kodu yazma ve hata ayıklama — en güçlü olduğu iş</li>
              <li>· Veri temizleme ve biçim dönüştürme</li>
              <li>· Grafik üretimi ve yayın kalitesine getirme</li>
              <li>· Simülasyon parametrelerini tarama</li>
              <li>· LaTeX tablo ve denklem düzenleme</li>
            </ul>
            <p className="mt-3 text-xs text-white/40 leading-relaxed">
              Öğretim üyesiyseniz GitHub Copilot ücretsiz — bu alanda en
              somut kazanç orada.
            </p>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2.5">
              Dikkat edilecek
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>
                · <strong className="text-white">Türetilmiş formülleri
                doğrulayın.</strong> İkna edici görünen yanlış türetme
                üretebiliyor.
              </li>
              <li>· Birim dönüşümlerinde sessiz hata yapabiliyor</li>
              <li>· Kütüphane sürümü eskiyse çalışmayan kod önerebiliyor</li>
              <li>· Sanayi iş birliği verisi gizlilik sözleşmesine tabidir</li>
            </ul>
          </div>
        </Fade>
      </div>
      <Fade delay={0.26}>
        <div className="mt-5">
          <Prompt>{`Bu Python fonksiyonu beklediğim sonucu vermiyor.
Önce ne yaptığını satır satır açıkla, sonra hatanın
nerede olduğunu söyle. Düzeltilmiş kodu en son ver —
önce anlamak istiyorum.`}</Prompt>
        </div>
      </Fade>
    </Slide>
  ),

  /* Alan · sağlık */
  () => (
    <Slide>
      <Eyebrow>Alanınıza göre · 3</Eyebrow>
      <H2>Sağlık ve yaşam bilimleri.</H2>
      <Sub>
        Kazancın en yüksek, riskin de en yüksek olduğu alan. Sınır çok net
        çizilmeli.
      </Sub>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <div
              className="font-mono text-[11px] uppercase tracking-[0.18em] mb-2.5"
              style={{ color: ACCENT }}
            >
              Yapılabilir
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>· Literatür taraması (her kaynak PubMed&apos;den doğrulanarak)</li>
              <li>· İstatistik yöntemi seçimini tartışma</li>
              <li>· Hasta bilgilendirme metnini sadeleştirme</li>
              <li>· Şekil ve şema çizimi (BioRender)</li>
              <li>· Etik kurul başvuru metninin dil düzeltmesi</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <div className="flex items-center gap-2 mb-2.5">
              <Ban className="w-4 h-4 text-white/40" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                Yapılmaz
              </span>
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>
                · <strong className="text-white">Hasta verisi hiçbir koşulda
                genel amaçlı araca girmez.</strong> Anonimleştirilmiş olsa bile
                kurum politikanızı kontrol edin.
              </li>
              <li>· Tanı ya da tedavi önerisi üretilmez</li>
              <li>· Görüntü verisi (MR, patoloji) yüklenmez</li>
            </ul>
          </div>
        </Fade>
      </div>
      <Fade delay={0.26}>
        <p className="mt-5 text-sm text-white/45 leading-relaxed max-w-3xl">
          Deşifre gerekiyorsa Whisper&apos;ı kendi bilgisayarınızda çalıştırın —
          ses kaydı buluta hiç çıkmaz. Bu, etik kurul başvurusunda
          yazabileceğiniz somut bir güvence.
        </p>
      </Fade>
    </Slide>
  ),

  /* Alan · hukuk, ilahiyat, beşeri */
  () => (
    <Slide>
      <Eyebrow>Alanınıza göre · 4</Eyebrow>
      <H2>Hukuk, ilahiyat, edebiyat ve tarih.</H2>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <div
              className="font-mono text-[11px] uppercase tracking-[0.18em] mb-2.5"
              style={{ color: ACCENT }}
            >
              En çok değer getiren
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>· Uzun metinden argüman haritası çıkarma</li>
              <li>· Karşıt görüşü en güçlü hâliyle kurdurma</li>
              <li>· Eski dilli metni günümüz Türkçesine yaklaştırma (taslak olarak)</li>
              <li>· Ders okuma listesi ve tartışma sorusu hazırlama</li>
              <li>· Çeviri karşılaştırması: aynı pasajın farklı okumaları</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2.5">
              Dikkat edilecek
            </div>
            <ul className="space-y-2 text-sm text-white/60 leading-relaxed">
              <li>
                · <strong className="text-white">Mevzuat ve içtihat
                uydurabiliyor.</strong> Madde numarası ve karar tarihi
                kesinlikle kaynağından doğrulanmalı.
              </li>
              <li>· Metin yorumunda yüzeysel kalıyor; okumanızın yerini tutmaz</li>
              <li>· Osmanlıca ve Arapça çeviride ciddi hata payı var</li>
              <li>· Kanonik olmayan kaynaklarda hafızası zayıf</li>
            </ul>
          </div>
        </Fade>
      </div>
      <Fade delay={0.26}>
        <div className="mt-5">
          <Prompt>{`Bu metindeki ana savı ve onu destekleyen üç
gerekçeyi çıkar. Sonra bu sava yöneltilebilecek en
güçlü itirazı yaz — beni ikna etmeye çalışma,
karşı tarafın en iyi argümanını görmek istiyorum.`}</Prompt>
        </div>
      </Fade>
    </Slide>
  ),

  /* Alan · idari ve yönetsel */
  () => (
    <Slide>
      <Eyebrow>Alanınıza göre · 5</Eyebrow>
      <H2>Bölüm başkanı, koordinatör, komisyon üyesi.</H2>
      <Sub>
        Akademisyenliğin görünmeyen kısmı: yazışma, rapor, akreditasyon
        dosyası. Buradaki kazanç, araştırmadakinden daha büyük olabiliyor.
      </Sub>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={ClipboardList} title="Akreditasyon dosyası">
            Öğrenme çıktılarını program çıktılarıyla eşleme tablosu, kanıt
            listesi taslağı. Biçimsel ama çok zaman alan iş.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={PenLine} title="Kurumsal yazışma">
            Resmî yazı taslağı, toplantı tutanağı düzenleme, duyuru metni.
            Tonu siz ayarlarsınız, iskeleti o kurar.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Table2} title="Rapor ve özet">
            Uzun komisyon raporundan yönetici özeti; sayısal ekleri tabloya
            çevirme.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <div className="ai-warn mt-5 px-5 py-3.5">
          <p className="text-sm text-white/70 leading-relaxed">
            Personel dosyası, disiplin evrakı ve öğrenci not bilgisi bu işlerin
            dışında tutulmalı. Anonimleştirici ile temizlemeden yüklemeyin.
          </p>
        </div>
      </Fade>
    </Slide>
  ),

  /* Bölüm · Araç haritası */
  () => (
    <Divider
      num="4"
      title="Araç haritası"
      subtitle="Claude tek seçenek değil. Akademisyenin işine yarayan araçlar, doğrulanmış fiyatlarıyla."
    />
  ),

  /* Manzara */
  () => (
    <Slide>
      <Eyebrow>Genel görünüm</Eyebrow>
      <H2>Yedi kategori, onlarca araç.</H2>
      <Sub>
        Hepsini kullanmanız gerekmiyor. Kendi iş akışınızda hangi adımın
        tıkandığını bulup oraya bir araç koyun — “herkes kullanıyor” diye
        başlayan denemeler bırakılıyor.
      </Sub>
      <div className="mt-7 grid md:grid-cols-3 gap-3">
        {[
          ["Literatür", "Elicit · Consensus · Research Rabbit · Connected Papers · Semantic Scholar · Scite · Litmaps"],
          ["Okuma ve not", "NotebookLM · SciSpace · Zotero · Mendeley"],
          ["Yazma ve dil", "DeepL Write · Grammarly · Paperpal · Writefull"],
          ["Sohbet modelleri", "Claude · ChatGPT · Gemini · Copilot · Perplexity · Mistral"],
          ["Veri ve kod", "GitHub Copilot · Whisper · Kod yorumlayıcılar"],
          ["Görsel ve sunum", "BioRender · Napkin · Gamma"],
        ].map(([t, d], i) => (
          <Fade key={t} delay={0.05 * i}>
            <div className="ai-card px-4 py-4 h-full">
              <div
                className="font-mono text-[11px] uppercase tracking-[0.16em] mb-2"
                style={{ color: ACCENT }}
              >
                {t}
              </div>
              <div className="text-[13px] text-white/50 leading-relaxed">{d}</div>
            </div>
          </Fade>
        ))}
      </div>
      <Source>
        Fiyat ve kapsam bilgileri araçların resmî sayfalarından, 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* Gerçekten ücretsiz olanlar */
  () => (
    <Slide>
      <Eyebrow>Para gerektirmeyenler</Eyebrow>
      <H2>Tek kuruş ödemeden kullanabilecekleriniz.</H2>
      <Sub>
        Aşağıdakiler ücretsiz deneme değil, kalıcı olarak ücretsiz. Bütçe
        istemeden bugün başlayabilirsiniz.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.06}>
          <Card icon={FlaskConical} title="Whisper — ses deşifresi">
            Açık kaynak, MIT lisanslı, <strong className="text-white/80">kendi
            bilgisayarınızda</strong> çalışıyor. Görüşme, odak grubu ve ders
            kaydını yazıya çevirir. Ses buluta gitmediği için etik kurul
            açısından en temiz seçenek.
          </Card>
        </Fade>
        <Fade delay={0.12}>
          <Card icon={BookOpen} title="Zotero — kaynak yönetimi">
            Yazılım tamamen ücretsiz, 300 MB depolama dahil. Sınırsız depolama
            isterseniz yılda 120 dolar. Diğer araçların bağlandığı omurga.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={FileSearch} title="Semantic Scholar">
            200 milyondan fazla makalelik dizin ve açık API. Tamamen ücretsiz,
            anahtar bile gerekmiyor.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Layers} title="NotebookLM — ücretsiz katman">
            100 not defteri, defter başına 50 kaynak, günde 50 soru. En güçlü
            yanı: yalnızca yüklediğiniz kaynaklara bağlı kalıyor.
          </Card>
        </Fade>
      </div>
      <Source>
        github.com/openai/whisper · zotero.org/storage ·
        semanticscholar.org/product/api · support.google.com/notebooklm —
        4 Eylül 2026. NotebookLM limitleri 2 Eylül 2026&apos;da güncellendi;
        okuduğunuz tarihte tekrar bakın.
      </Source>
    </Slide>
  ),

  /* Akademisyene ücretsiz — Copilot */
  () => (
    <Slide>
      <Eyebrow>Doğrulanmış · en değerli bulgu</Eyebrow>
      <H1>
        GitHub Copilot
        <br />
        <span style={{ color: ACCENT }}>öğretim üyelerine ücretsiz.</span>
      </H1>
      <Sub>
        Doğrulanmış öğretmen ve öğretim üyeleri <strong className="text-white">tam
        Copilot Pro&apos;yu</strong> ücretsiz kullanıyor. Öğrenciler için ayrı
        bir “Copilot Student” katmanı var, o da ücretsiz. Normal fiyatı ayda 10
        dolar.
      </Sub>
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <Fade delay={0.1}>
          <div className="ai-card p-5">
            <div className="text-white font-semibold mb-2">Kimin işine yarar</div>
            <p className="text-sm text-white/55 leading-relaxed">
              R, Python, Stata ya da MATLAB kullanan herkes. Nicel araştırma
              yapıyorsanız doğrudan üretkenlik kazancı — üstelik bedava.
            </p>
          </div>
        </Fade>
        <Fade delay={0.18}>
          <div className="ai-card p-5">
            <div className="text-white font-semibold mb-2">Bilinmesi gereken</div>
            <p className="text-sm text-white/55 leading-relaxed">
              Uygunluk her ay yeniden değerlendiriliyor. Kurum e-postanız ve
              gerekirse görev belgesi isteniyor. Başvuru kabulünün açık olup
              olmadığını başvurmadan önce kontrol edin.
            </p>
          </div>
        </Fade>
      </div>
      <Source>
        docs.github.com/copilot — “Get free access to Copilot Pro” ve plan
        sayfası, 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* Öğrencilere ücretsiz */
  () => (
    <Slide>
      <Eyebrow>Öğrencilerinize söyleyin</Eyebrow>
      <H2>Google&apos;dan 12 ay ücretsiz yapay zekâ planı.</H2>
      <Sub>
        18 yaş üstü üniversite öğrencilerine 12 ay ücretsiz Google AI planı
        veriliyor. Son başvuru 31 Aralık 2026. Amerika&apos;da AI Pro,
        Amerika dışındaki 140&apos;tan fazla pazarda AI Plus olarak.
      </Sub>
      <Fade delay={0.2}>
        <div className="ai-warn mt-8 px-6 py-5">
          <div className="flex items-start gap-4">
            <AlertTriangle
              className="w-5 h-5 shrink-0 mt-0.5"
              style={{ color: ACCENT }}
            />
            <div className="text-white/70 leading-relaxed space-y-2">
              <p>
                <strong className="text-white">İki uyarı.</strong> Birincisi:
                kayıt sırasında geçerli bir ödeme yöntemi isteniyor ve süre
                bitince <strong className="text-white">otomatik yenileniyor</strong>.
                Öğrencinize bunu mutlaka söyleyin.
              </p>
              <p>
                İkincisi: Türkiye&apos;nin uygun pazarlar listesinde olup
                olmadığını resmî sayfada doğrulayamadım. “Türk öğrenciler de
                alabiliyor” demeden önce öğrencinizin kendi hesabından kontrol
                etmesini isteyin.
              </p>
            </div>
          </div>
        </div>
      </Fade>
      <Source>
        blog.google — student offer · support.google.com/gemini, 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* Literatür araçları */
  () => (
    <Slide>
      <Eyebrow>Kategori · literatür</Eyebrow>
      <H2>Alanı taramak ve haritalamak.</H2>
      <div className="mt-6 overflow-x-auto">
        <table className="ai-table table-fixed">
          <thead>
            <tr>
              <th className="w-[22%]">Araç</th>
              <th className="w-[44%]">Ne yapar</th>
              <th className="w-[34%]">Ücretsizde ne var</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Elicit</td>
              <td>138M+ makalede arama, tablo hâlinde veri çıkarımı</td>
              <td>Sınırsız arama, özet ve makaleyle sohbet · Pro 49 USD/ay</td>
            </tr>
            <tr>
              <td>Consensus</td>
              <td>Bilimsel soru–cevap; bulgularda uzlaşı derecesi</td>
              <td>Temel arama · Pro 20 USD/ay</td>
            </tr>
            <tr>
              <td>Research Rabbit</td>
              <td>Seçtiğiniz makalelerden ağ haritası ve öneri</td>
              <td>Sınırsız arama ve koleksiyon, 50 başlangıç makalesi</td>
            </tr>
            <tr>
              <td>Connected Papers</td>
              <td>Tek makaleden benzerlik grafiği</td>
              <td>Ayda 5 grafik</td>
            </tr>
            <tr>
              <td>Scite</td>
              <td>Atfın destekleyici mi çelişkili mi olduğunu etiketler</td>
              <td>Platform erişimi yok · Basic 20 USD/ay</td>
            </tr>
            <tr>
              <td>Litmaps</td>
              <td>Literatür haritası + yeni makale uyarısı</td>
              <td>2 harita, harita başına 100 makale · Pro 10 USD/ay</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Fade delay={0.3}>
        <p className="mt-5 text-sm text-white/45 leading-relaxed max-w-3xl">
          Scite&apos;ın yaptığı şey diğerlerinde yok: bir makaleye yapılan
          atfın onu destekleyip desteklemediğini gösteriyor. Atıf sayısına
          değil atıf niteliğine bakmak isteyen için tek seçenek.
        </p>
      </Fade>
      <Source>
        elicit.com/pricing · help.consensus.app · researchrabbit.ai/pricing ·
        scite.ai/pricing · litmaps.com/pricing — 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* Yazma ve dil araçları */
  () => (
    <Slide>
      <Eyebrow>Kategori · yazma ve dil</Eyebrow>
      <H2>İngilizce yazarken.</H2>
      <Sub>
        Ana dili Türkçe olan bir araştırmacı için en yüksek pratik değer bu
        kategoride. Ama aralarında akademik dürüstlük açısından ciddi fark var.
      </Sub>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={Languages} title="DeepL Write">
            Çeviri değil, kendi yazdığınız İngilizceyi akıcılaştırma. Yeni
            içerik üretmediği için dürüstlük riski en düşük olan. Hesapsız
            kullanımda seferde 1.500 karakter.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={PenLine} title="Paperpal">
            Akademik metne özel; Word, Overleaf ve Google Docs içinde çalışıyor.
            Ücretsizde ayda 200 dil önerisi · Prime 25 USD/ay.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Check} title="Grammarly">
            Genel amaçlı dil düzeltme. Öğrenci ve eğitmene doğrulama ile
            yüzde 50&apos;ye varan indirim veriyor · Pro 12 USD/ay.
          </Card>
        </Fade>
      </div>
      <Source>
        deepl.com · paperpal.com/pricing · grammarly.com/plans — 4 Eylül 2026.
        DeepL&apos;in tam plan tablosu resmî sayfadan doğrulanamadı.
      </Source>
    </Slide>
  ),

  /* Dürüstlük riski olan araçlar */
  () => (
    <Slide>
      <Eyebrow>Dikkat</Eyebrow>
      <H2>Bir kategori var ki kullanmadan önce düşünün.</H2>
      <Sub>
        Metni “başka sözcüklerle yeniden yazan” araçlar (paraphrase araçları)
        yaygın. İki ayrı sorun taşıyorlar.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <div className="flex items-center gap-2 mb-2.5">
              <AlertTriangle className="w-4 h-4" style={{ color: ACCENT }} />
              <span className="text-white font-semibold">Kaynak gösterme sorunu</span>
            </div>
            <p className="text-sm text-white/55 leading-relaxed">
              Başkasının cümlesini yeniden yazmak, kaynak göstermediğiniz
              sürece intihaldir. Aracın yeniden yazması bunu değiştirmiyor;
              birçok kurum bunu açıkça ihlal sayıyor.
            </p>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <div className="flex items-center gap-2 mb-2.5">
              <Ban className="w-4 h-4" style={{ color: ACCENT }} />
              <span className="text-white font-semibold">
                Tespitten kaçınma özelliği
              </span>
            </div>
            <p className="text-sm text-white/55 leading-relaxed">
              Bu araçların bir kısmı metni “insanlaştırma” adı altında yapay
              zekâ tespitinden kaçırmayı pazarlıyor. Bir özelliğin varlık
              sebebi denetimden kaçmaksa, kullanımı da savunulamaz.
            </p>
          </div>
        </Fade>
      </div>
      <Fade delay={0.26}>
        <p className="mt-7 text-white/50 leading-relaxed max-w-3xl">
          Dil düzeltmesi ile yeniden yazım arasındaki sınır burada. Kendi
          cümlenizi düzeltmek meşru; başkasının cümlesini tanınmaz hâle
          getirmek değil.
        </p>
      </Fade>
    </Slide>
  ),

  /* Görsel araçlar ve tuzak */
  () => (
    <Slide>
      <Eyebrow>Kategori · görsel</Eyebrow>
      <H2>Şekil çizmek — ve bir tuzak.</H2>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <h3 className="text-white font-semibold mb-2">
              BioRender — yaşam bilimleri
            </h3>
            <p className="text-sm text-white/55 leading-relaxed mb-3">
              Yayın kalitesinde bilimsel şema çizimi. Akademik bireysel plan
              yıllık ödemede aylık 35 dolar.
            </p>
            <div
              className="text-sm leading-relaxed px-3 py-2 rounded"
              style={{
                background: "color-mix(in srgb, var(--deck-accent) 10%, transparent)",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              <strong className="text-white">Tuzak:</strong> Ücretsiz katmanda
              ürettiğiniz şeklin <strong className="text-white">yayın hakkı
              yok</strong>. Makalenize koyamazsınız.
            </div>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <h3 className="text-white font-semibold mb-2">Napkin — diyagram</h3>
            <p className="text-sm text-white/55 leading-relaxed mb-3">
              Yazdığınız metinden otomatik diyagram üretiyor. Haftada 500
              kredi ücretsiz, sınırsız PNG ve PDF dışa aktarma.
            </p>
            <p className="text-sm text-white/45 leading-relaxed">
              Ücretsiz katmanda görsele Napkin logosu işleniyor — sunumda
              sorun değil, yayında olabilir.
            </p>
          </div>
        </Fade>
      </div>
      <Source>biorender.com/pricing · napkin.ai/pricing — 4 Eylül 2026</Source>
    </Slide>
  ),

  /* Tespit araçları — araştırma */
  () => (
    <Slide>
      <Eyebrow>En önemli slayt</Eyebrow>
      <H2>Yapay zekâ tespit araçları sizi de vurabilir.</H2>
      <Sub>
        Stanford&apos;dan Liang ve arkadaşlarının 2023&apos;te{" "}
        <em>Patterns</em> dergisinde yayımladığı çalışma, yedi ticari tespit
        aracını insan eliyle yazılmış metinlerle sınadı. Sonuç, ana dili
        İngilizce olmayan herkesi doğrudan ilgilendiriyor.
      </Sub>
      <div className="mt-8">
        <CompareBars
          unit="%"
          items={[
            {
              label: "TOEFL denemeleri — ana dili İngilizce olmayanlar",
              value: 61.3,
              caption:
                "İnsan eliyle yazılmış bu denemelerin ortalama yüzde 61,3'ü “yapay zekâ üretimi” diye yanlış etiketlendi.",
            },
            {
              label: "Kelime dağarcığı zenginleştirildikten sonra",
              value: 11.6,
              muted: true,
              caption:
                "Aynı denemeler daha zengin bir dille yeniden yazılınca yanlış etiketleme yüzde 11,6'ya düştü. Yani araç yapay zekâyı değil, sade dili yakalıyor.",
            },
          ]}
        />
      </div>
      <Fade delay={0.5}>
        <p className="mt-7 text-white/60 leading-relaxed">
          91 denemenin 18&apos;i{" "}
          <strong className="text-white">yedi aracın tamamı</strong>{" "}
          tarafından oybirliğiyle yapay zekâ sayıldı.
          89&apos;u en az bir araç tarafından işaretlendi.
        </p>
      </Fade>
      <Source>
        Liang W., Yuksekgonul M., Mao Y., Wu E., Zou J. (2023). GPT detectors
        are biased against non-native English writers. Patterns, Cell Press.
        PMID 37521038 · arXiv:2304.02819
      </Source>
    </Slide>
  ),

  /* Tespit araçları — kurumlar ne yaptı */
  () => (
    <Slide>
      <Eyebrow>Üniversiteler ne yaptı</Eyebrow>
      <H2>Bazıları tespit aracını kapattı.</H2>
      <div className="mt-7 space-y-3">
        <Fade delay={0.08}>
          <div className="ai-card px-6 py-5">
            <div className="text-white font-semibold mb-2">
              Vanderbilt University — 16 Ağustos 2023
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-3">
              Turnitin&apos;in yapay zekâ dedektörünü resmen devre dışı
              bıraktı. Gerekçelerinden biri, kendi rakamlarıyla: yılda 75.000
              ödev teslim ediliyor; üreticinin beyan ettiği yüzde 1 yanlış
              pozitif oranı bile <strong className="text-white">yaklaşık 750
              ödevin haksız yere işaretlenmesi</strong> demek.
            </p>
            <p className="text-sm text-white/45 leading-relaxed italic">
              “Yapay zekâ tespit yazılımının kullanılması gereken etkili bir
              araç olduğuna inanmıyoruz.”
            </p>
          </div>
        </Fade>
        <Fade delay={0.18}>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              ["UC San Diego Extended Studies", "2025 baharından itibaren yapay zekâ tespitini kapattı; intihal denetimi sürüyor."],
              ["Penn State", "Dedektörlerin “akademik dürüstlük süreçlerinde belirleyici kullanım için doğruluk ölçütlerini karşılamadığı” yönünde yönerge."],
              ["Michigan State", "Skorun tek başına öğrenciye yaptırım gerekçesi olamayacağını kurumsal yönergeye aldı."],
            ].map(([k, d]) => (
              <div key={k} className="ai-card p-4">
                <div className="text-white text-sm font-semibold mb-1.5">{k}</div>
                <div className="text-[13px] text-white/50 leading-relaxed">{d}</div>
              </div>
            ))}
          </div>
        </Fade>
      </div>
      <Source>
        vanderbilt.edu/brightspace (16 Ağustos 2023) ·
        extensionhelpcenter.ucsd.edu · integrity.psu.edu · help.d2l.msu.edu —
        erişim 4 Eylül 2026
      </Source>
    </Slide>
  ),

  /* Bütçeye göre seçim */
  () => (
    <Slide>
      <Eyebrow>Seçim rehberi</Eyebrow>
      <H2>Bütçenize göre ne alırsınız?</H2>
      <div className="mt-7">
        <DecisionTree
          nodes={[
            {
              question: "Hiç bütçem yok",
              branches: [
                {
                  answer: "0 USD",
                  result: "Whisper + Zotero + NotebookLM + Semantic Scholar",
                  detail:
                    "Deşifre, kaynak yönetimi, kaynağa bağlı özetleme ve literatür dizini. Öğretim üyesiyseniz GitHub Copilot da ücretsiz.",
                },
              ],
            },
            {
              question: "Ayda bir kahve parası ayırabilirim",
              branches: [
                {
                  answer: "~20 USD",
                  result: "Bir sohbet modeli aboneliği",
                  detail:
                    "Claude Pro ya da muadili. Eğitimciyseniz Perplexity Education Pro 10 dolara düşüyor.",
                },
              ],
            },
            {
              question: "Sistematik derleme yapıyorum",
              branches: [
                {
                  answer: "~50 USD",
                  result: "Elicit Pro",
                  detail:
                    "Tarama ve veri çıkarımını gerçekten ölçeklendiriyor. Yalnızca o işi yapıyorsanız karşılığı var.",
                },
              ],
            },
            {
              question: "Atıf niteliğine bakmam gerekiyor",
              branches: [
                {
                  answer: "~20 USD",
                  result: "Scite",
                  detail:
                    "Bir atfın destekleyici mi çelişkili mi olduğunu gösteren tek araç.",
                },
              ],
            },
          ]}
        />
      </div>
    </Slide>
  ),

  /* 28 · Bölüm 4 */
  () => (
    <Divider
      num="5"
      title="Öğrenci"
      subtitle="Yasaklayamıyorsunuz. Ama nasıl kullanacağını biçimlendirebilirsiniz."
    />
  ),

  /* 29 · Learning Mode */
  () => (
    <Slide>
      <Eyebrow>Cevabı vermeyen mod</Eyebrow>
      <H2>Learning Mode.</H2>
      <Sub>
        Öğrenciye doğrudan cevap vermek yerine soru sorarak cevabı kendisinin
        bulmasını sağlıyor. Resmî tanımı şöyle: “iyi bir özel ders hocası gibi
        çalışır — cevapları kendiniz bulmanıza yardım eden sorular sorar.”
      </Sub>
      <Fade delay={0.2}>
        <div className="ai-warn mt-9 px-6 py-5">
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

  /* 30 · Dayanıklı ödev tasarımı */
  () => (
    <Slide>
      <Eyebrow>Ödev tasarımı</Eyebrow>
      <H2>Yapay zekânın tek başına yapamadığı ödevler.</H2>
      <Sub>
        “Ödevi yapay zekâ yapmış” sorununun çözümü denetim değil, tasarım.
        Aşağıdaki beş kurgu, aracın erişemediği şeyleri işin merkezine koyuyor.
      </Sub>
      <div className="mt-6">
        <Steps
          items={[
            {
              t: "Süreci isteyin, ürünü değil",
              d: "Taslak, düzeltme geçmişi, kaynak notları. Yalnızca son metin istenirse süreç görünmez olur.",
            },
            {
              t: "Yerel ve güncel veri kullandırın",
              d: "Kendi topladığı anket, kendi mahallesinin verisi, bu haftaki bir olay. Modelin eğitim verisinde yok.",
            },
            {
              t: "Derste savunma isteyin",
              d: "Beş dakikalık sözlü savunma, yazının kime ait olduğunu kısa sürede belli eder.",
            },
            {
              t: "Yapay zekâyı ödevin parçası yapın",
              d: "“Aracın verdiği cevabı ekle, yanlış olan üç yerini işaretle ve düzelt.” Eleştirel okuma ölçülür.",
            },
            {
              t: "Kendi deneyimine bağlayın",
              d: "“Staj yerinde gördüğün bir örnekle ilişkilendir.” Kişisel gözlemi model üretemez.",
            },
          ]}
        />
      </div>
    </Slide>
  ),

  /* 31 · Öğrenciye ne söylemeli */
  () => (
    <Slide>
      <Eyebrow>Sınıf politikası</Eyebrow>
      <H2>İzlenceye koyabileceğiniz üç cümle.</H2>
      <Sub>
        Belirsiz kural, hem öğrenciyi hem sizi zor durumda bırakıyor. Net bir
        politika, dönem başında yazıldığında tartışmayı bitiriyor.
      </Sub>
      <div className="mt-7 space-y-3">
        {[
          {
            t: "Serbest",
            d: "“Fikir üretme, kaynak bulma ve dil düzeltmede yapay zekâ kullanabilirsiniz; beyan etmenize gerek yok.”",
          },
          {
            t: "Beyanla serbest",
            d: "“Ödev metninin herhangi bir bölümünde kullandıysanız, hangi araçla ne yaptığınızı ödevin sonuna bir paragrafla yazın.”",
          },
          {
            t: "Yasak",
            d: "“Bu ödev sizin yazma becerinizi ölçüyor; yapay zekâ kullanımı kopya sayılır.” — Yasaklıyorsanız gerekçesini yazın, kural o zaman anlaşılır oluyor.",
          },
        ].map((s, i) => (
          <Fade key={s.t} delay={0.1 * i}>
            <div className="ai-card px-6 py-4">
              <div
                className="font-mono text-[11px] uppercase tracking-[0.18em] mb-1.5"
                style={{ color: ACCENT }}
              >
                {s.t}
              </div>
              <div className="text-white/65 leading-relaxed">{s.d}</div>
            </div>
          </Fade>
        ))}
      </div>
      <Fade delay={0.4}>
        <p className="mt-6 text-sm text-white/45 leading-relaxed max-w-3xl">
          Üçü de geçerli. Yanlış olan, hiçbirini söylememek ve sonra ödev
          gelince karar vermek.
        </p>
      </Fade>
    </Slide>
  ),

  /* 31b · Yapay zekâ okuryazarlığı */
  () => (
    <Slide>
      <Eyebrow>Öğretilmesi gereken beceri</Eyebrow>
      <H2>Öğrenciye asıl öğretilecek şey araç değil, denetim.</H2>
      <Sub>
        Öğrenci aracı zaten kullanıyor. Eksik olan, çıktının doğru olup
        olmadığını anlama becerisi. Bunu derse dört adımda katabilirsiniz.
      </Sub>
      <div className="mt-6">
        <Steps
          items={[
            {
              t: "Yanlış çıktıyı sınıfta gösterin",
              d: "Kendi alanınızda bir soru sorup ürettiği hatayı tahtaya yansıtın. Bir kez görmek, on kez uyarmaktan etkili.",
            },
            {
              t: "Kaynak doğrulatın",
              d: "Ürettiği kaynakçayı verip “hangileri gerçek” diye arattırın. Uydurma atıfı kendi eliyle bulan öğrenci bir daha unutmaz.",
            },
            {
              t: "Karşılaştırma yaptırın",
              d: "Aynı soruyu iki farklı araca sordurup çelişkileri buldurun. Aracın tek doğru olmadığını böyle öğrenir.",
            },
            {
              t: "Beyan alışkanlığı kazandırın",
              d: "Her ödevin sonunda “nerede, ne için kullandım” paragrafı isteyin. Yayın hayatına hazırlığın en gerçekçi provası.",
            },
          ]}
        />
      </div>
    </Slide>
  ),

  /* 31c · Tespit araçları */
  () => (
    <Slide>
      <Eyebrow>Zor konu</Eyebrow>
      <H2>“Yapay zekâ mı yazmış?” — tespit araçlarına dikkat.</H2>
      <Sub>
        Bir metnin yapay zekâ tarafından yazılıp yazılmadığını iddia eden
        araçlar var. Bunlara dayanarak öğrenciyi suçlamadan önce bilmeniz
        gereken şeyler var.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <div className="flex items-center gap-2 mb-2.5">
              <AlertTriangle className="w-4 h-4" style={{ color: ACCENT }} />
              <span className="text-white font-semibold">Yanlış pozitif riski</span>
            </div>
            <p className="text-sm text-white/55 leading-relaxed">
              Bu araçlar, sade ve tekdüze yazan öğrencileri yapay zekâ olarak
              işaretlemeye yatkın. Ana dili Türkçe olan bir öğrencinin
              İngilizce metni bu riske özellikle açık.
            </p>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <div className="flex items-center gap-2 mb-2.5">
              <Scale className="w-4 h-4" style={{ color: ACCENT }} />
              <span className="text-white font-semibold">Kanıt değeri</span>
            </div>
            <p className="text-sm text-white/55 leading-relaxed">
              Skor bir olasılık tahminidir, kanıt değildir. Disiplin sürecine
              tek başına dayanak yapılamaz — sorduğunuzda araç size neden öyle
              düşündüğünü gösteremez.
            </p>
          </div>
        </Fade>
      </div>
      <Fade delay={0.26}>
        <div className="ai-warn mt-6 px-5 py-4">
          <p className="text-sm text-white/70 leading-relaxed">
            <strong className="text-white">Daha sağlam yol:</strong> Süreci
            ölçün. Taslak isteyin, sınıfta yazdırın, sözlü savunma alın. Bir
            öğrencinin kendi yazdığı metni savunması, hiçbir tespit aracının
            veremeyeceği kadar net bilgi verir.
          </p>
        </div>
      </Fade>
    </Slide>
  ),

  /* 32 · Bölüm 5 */
  () => (
    <Divider
      num="6"
      title="Sınırlar"
      subtitle="Yayıncılar ne istiyor, uydurma atıf nasıl yakalanır, veriniz nereye gidiyor."
    />
  ),

  /* 33 · Yazar olamaz */
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
        <div className="ai-card mt-9 px-7 py-6">
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

  /* 34 · Beyan nereye */
  () => (
    <Slide>
      <Eyebrow>Çoğu kişinin bilmediği ayrıntı</Eyebrow>
      <H2>Beyan zorunlu — ama yeri her yayıncıda farklı.</H2>
      <Sub>
        Yapay zekâ kullandıysanız bunu bildirmek zorundasınız. Nereye
        yazacağınız ise yayıncıya göre değişiyor.
      </Sub>
      <div className="mt-7 overflow-x-auto">
        <table className="ai-table table-fixed">
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
        <p className="mt-5 text-sm text-white/45 leading-relaxed max-w-3xl">
          Ortak istisna: temel dilbilgisi ve yazım denetimi genellikle beyan
          gerektirmiyor. IEEE bunu “önerilir” diyerek daha yumuşak ifade ediyor.
        </p>
      </Fade>
      <Source>
        elsevier.com generative-ai-policies (Haziran 2026) ·
        group.springernature.com AI guidance · open.ieee.org author guidelines
        (16 Nisan 2024) · publicationethics.org (13 Şubat 2023)
      </Source>
    </Slide>
  ),

  /* 35 · Beyan nasıl yazılır */
  () => (
    <Slide>
      <Eyebrow>Kopyalayıp uyarlayın</Eyebrow>
      <H2>Beyan metni nasıl yazılır?</H2>
      <Sub>
        Elsevier'in kendi önerdiği kalıp aşağıda. Üç şeyi söylüyor: hangi araç,
        ne için, ve sorumluluğun kimde olduğu.
      </Sub>
      <div className="mt-6">
        <Prompt>{`Declaration of generative AI and AI-assisted
technologies in the manuscript preparation process

During the preparation of this work the author(s)
used [ARAÇ ADI] in order to [SEBEP]. After using
this tool/service, the author(s) reviewed and
edited the content as needed and take(s) full
responsibility for the content of the publication.`}</Prompt>
      </div>
      <Fade delay={0.25}>
        <div className="mt-5 grid md:grid-cols-2 gap-4">
          <div className="ai-card p-5">
            <div className="text-white font-semibold mb-2">İyi bir sebep ifadesi</div>
            <p className="text-sm text-white/55 leading-relaxed">
              “to improve the readability and language of the manuscript” —
              somut ve sınırlı.
            </p>
          </div>
          <div className="ai-card p-5">
            <div className="text-white font-semibold mb-2">Kaçınılması gereken</div>
            <p className="text-sm text-white/55 leading-relaxed">
              “to write the paper” — bu ifade beyan değil, yazarlık sorunudur.
            </p>
          </div>
        </div>
      </Fade>
      <Source>
        elsevier.com — generative AI policies for journals, Haziran 2026
      </Source>
    </Slide>
  ),

  /* 36 · Hakem yasağı */
  () => (
    <Slide>
      <Eyebrow>Hakemlik yapıyorsanız</Eyebrow>
      <H1>
        Değerlendirdiğiniz makaleyi
        <br />
        <span style={{ color: ACCENT }}>yapay zekâya yükleyemezsiniz.</span>
      </H1>
      <Sub>
        Hem Elsevier hem Springer Nature açıkça yasaklıyor: hakem, kendisine
        gönderilen yayımlanmamış makaleyi ya da bir bölümünü yapay zekâ aracına
        yükleyemez. Gerekçe gizlilik ve yazarın mülkiyet hakkı.
      </Sub>
      <Fade delay={0.25}>
        <div className="ai-warn mt-9 px-6 py-5">
          <div className="flex items-start gap-4">
            <Lock className="w-5 h-5 shrink-0 mt-0.5" style={{ color: ACCENT }} />
            <p className="text-white/70 leading-relaxed">
              Hakem raporunuzu yazarken dil desteği aldıysanız bunu şeffafça
              beyan edin — ama makalenin kendisi araca girmemeli. Özet bile
              yüklememeniz gerekiyor.
            </p>
          </div>
        </div>
      </Fade>
      <Source>
        elsevier.com generative-ai-policies (Haziran 2026) ·
        group.springernature.com AI guidance
      </Source>
    </Slide>
  ),

  /* 37 · Görsel yasağı */
  () => (
    <Slide>
      <Eyebrow>Şekiller ve görseller</Eyebrow>
      <H2>Araştırma görseli üretilemez.</H2>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <h3 className="text-white font-semibold mb-2.5">Elsevier</h3>
            <p className="text-sm text-white/55 leading-relaxed">
              Birincil araştırma görselleri — mikroskopi, western blot, tarama,
              hasta görüntüsü — yapay zekâ ile üretilemez veya değiştirilemez.
            </p>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <h3 className="text-white font-semibold mb-2.5">Springer Nature</h3>
            <p className="text-sm text-white/55 leading-relaxed">
              Üretken yapay zekâ görselleri kural olarak yayımlanamıyor.
              Sınırlı istisnalar açıkça “AI-generated” etiketiyle
              işaretlenmek zorunda.
            </p>
          </div>
        </Fade>
      </div>
      <Fade delay={0.26}>
        <p className="mt-6 text-white/50 leading-relaxed max-w-3xl">
          Kavramsal şema, akış diyagramı ve sunum görseli başka; veriyi temsil
          eden şekil başka. Bu ayrımı korumak, iyi niyetli bir kullanımın
          suistimal gibi görünmesini engelliyor.
        </p>
      </Fade>
      <Source>
        elsevier.com generative-ai-policies · group.springernature.com AI
        guidance
      </Source>
    </Slide>
  ),

  /* 38 · Halüsinasyon */
  () => (
    <Slide>
      <Eyebrow>En çok yakan hata</Eyebrow>
      <H2>Uydurma atıf nasıl anlaşılır?</H2>
      <Sub>
        Model, gerçek yazar adlarıyla var olmayan bir makale başlığını
        birleştirebiliyor. Sonuç ikna edici görünüyor ve dergiye gönderilene
        kadar fark edilmiyor. Dört hızlı denetim:
      </Sub>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <Fade delay={0.06}>
          <Card icon={FileSearch} title="DOI'yi açın">
            Her DOI doi.org/&lt;numara&gt; adresinde açılmalı. Açılmıyorsa o
            kaynak yok demektir. En hızlı denetim budur.
          </Card>
        </Fade>
        <Fade delay={0.12}>
          <Card icon={AlertTriangle} title="Fazla uygun başlıklara dikkat">
            İhtiyacınız olan şeyi tam olarak söyleyen, aradığınız yılda
            yayımlanmış bir makale — fazla iyi görünüyorsa iki kez bakın.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={Table2} title="Cilt, sayı, sayfa tutuyor mu">
            Dergi gerçek ama cilt/sayfa uydurma olabilir. Derginin kendi
            sayfasından karşılaştırın.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={ShieldCheck} title="Yazarı sorgulayın">
            Yazar gerçek ama o konuda çalışmıyorsa, başlık büyük olasılıkla
            uydurmadır.
          </Card>
        </Fade>
      </div>
      <div className="ai-warn mt-5 px-5 py-3">
        <p className="text-sm text-white/70 leading-relaxed">
          Bu denetimi elle yapmak yorucu. Sunumun sonunda, kaynakçanızdaki her
          DOI'yi otomatik sorgulayan ücretsiz bir araç var.
        </p>
      </div>
    </Slide>
  ),

  /* 39 · Veri gizliliği */
  () => (
    <Slide>
      <Eyebrow>Veriniz nereye gidiyor</Eyebrow>
      <H2>Bir ayar, iki çok farklı sonuç.</H2>
      <Sub>
        Ücretsiz, Pro ve Max planlarında sohbetlerinizin modeli geliştirmek
        için kullanılmasına izin verip vermemek sizin elinizde. Seçiminiz
        saklama süresini kökten değiştiriyor.
      </Sub>
      <div className="mt-8">
        <CompareBars
          unit=" gün"
          items={[
            {
              label: "Model eğitimine izin verirseniz",
              value: 1825,
              caption:
                "Beş yıl. Yeni ve devam ettirilen sohbetler kimliksizleştirilmiş biçimde saklanıyor ve model eğitiminde kullanılıyor.",
            },
            {
              label: "İzin vermezseniz",
              value: 30,
              muted: true,
              caption:
                "Otuz gün. Eğitimde hiç kullanılmıyor. Ayarı istediğiniz zaman değiştirebiliyorsunuz.",
            },
          ]}
        />
      </div>
      <div className="ai-warn mt-5 px-5 py-3">
        <p className="text-sm text-white/70 leading-relaxed">
          <strong className="text-white">Kapsam dışı planlar:</strong> Team,
          Enterprise, Government, Education ve API. Bunlar ticari şartlara tabi
          ve bu değişikliğin dışında — etik kurul başvurusunda bu ayrım
          belirleyici olabiliyor.
        </p>
      </div>
      <Source>
        anthropic.com/news/updates-to-our-consumer-terms (28 Ağustos 2025) ·
        privacy.claude.com (güncelleme 1 Temmuz 2026)
      </Source>
    </Slide>
  ),

  /* 40 · Neyi vermezsiniz */
  () => (
    <Slide>
      <Eyebrow>Kontrol listesi</Eyebrow>
      <H2>Araca yüklemeden önce durun.</H2>
      <Sub>
        Aşağıdakiler, kurum politikanız ne olursa olsun iki kez düşünmeniz
        gereken içerikler.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-x-8 gap-y-3">
        {[
          "Hakemliğini yaptığınız yayımlanmamış makale",
          "Etik kurul onayına bağlı ham katılımcı verisi",
          "Öğrenci kimlik bilgisi, notu, sağlık raporu",
          "Henüz yayımlanmamış tez ve patent başvurusu",
          "Gizlilik sözleşmesi olan sanayi projesi verisi",
          "Kurum içi yazışma ve personel dosyası",
        ].map((t, i) => (
          <Fade key={t} delay={0.06 * i}>
            <div className="flex items-start gap-3">
              <Ban className="w-4 h-4 shrink-0 mt-1 text-white/35" />
              <span className="text-white/65 leading-relaxed">{t}</span>
            </div>
          </Fade>
        ))}
      </div>
      <Fade delay={0.4}>
        <div className="ai-warn mt-7 px-5 py-3.5">
          <p className="text-sm text-white/70 leading-relaxed">
            Kişisel veri içeren bir belgeyle çalışmanız gerekiyorsa, önce
            adları ve numaraları temizleyin. Sunumun sonunda bunu tarayıcıda
            yapan ücretsiz bir araç var — dosya bilgisayarınızdan çıkmıyor.
          </p>
        </div>
      </Fade>
    </Slide>
  ),

  /* 41 · Devredemeyecekleriniz */
  () => (
    <Slide>
      <Eyebrow>Değişmeyen kısım</Eyebrow>
      <H2>Devredemeyeceğiniz dört şey.</H2>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.06}>
          <Card icon={ShieldCheck} title="Sorumluluk">
            Metinde ne varsa sizindir. “Yapay zekâ yazdı” bir savunma değil;
            dört yayıncı da bunu açıkça söylüyor.
          </Card>
        </Fade>
        <Fade delay={0.12}>
          <Card icon={FileSearch} title="Doğrulama">
            Verilen her kaynağı açıp bakın. Var olmayan atıf üretebilir ve bu
            en çok akademisyeni yakan hatadır.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={FlaskConical} title="Yorum">
            Bulguyu alana bağlamak, sınırlılığı görmek, “bu sonuç neden önemli”
            demek sizin işiniz.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Users} title="Etik karar">
            Katılımcı verisi, gizli hakem dosyası, yayımlanmamış tez — neyin
            araca girmeyeceğine siz karar verirsiniz.
          </Card>
        </Fade>
      </div>
    </Slide>
  ),

  /* 42 · Bölüm 6 */
  () => (
    <Divider
      num="7"
      title="Araçlar"
      subtitle="Bu sunumda anlattığım risklerin üçünü doğrudan çözen, ücretsiz ve açık araçlar."
    />
  ),

  /* 43 · Neden bu araçlar */
  () => (
    <Slide>
      <Eyebrow>Neden yaptım</Eyebrow>
      <H2>Anlatmak yetmiyor, kolaylaştırmak gerekiyor.</H2>
      <Sub>
        “Her atıfı doğrulayın”, “PDF'i 100 sayfanın altına bölün”, “kişisel
        veriyi temizleyin” demek kolay. Bunları elle yapmak yorucu olduğu için
        kimse yapmıyor. O yüzden yapan araçları yazdım — şu an on iki tane.
      </Sub>
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={ShieldCheck} title="Ücretsiz ve üyeliksiz">
            Hesap açmanız gerekmiyor, hiçbir şey ödemiyorsunuz.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={Lock} title="Dosyanız bilgisayarınızdan çıkmıyor">
            Çoğu araç tamamen tarayıcıda çalışıyor. Sunucuya yükleme yok.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Compass} title="Masaüstüne kurulabiliyor">
            Mac ve Windows'ta uygulama olarak kurulup internetsiz de
            çalışıyor.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <p
          className="mt-8 font-mono text-lg"
          style={{ color: ACCENT }}
        >
          osmancancetlenbik.com/araclar
        </p>
      </Fade>
    </Slide>
  ),

  /* 44 · Atıf denetleyici */
  () => (
    <Slide>
      <Eyebrow>Araç 1</Eyebrow>
      <H2>Atıf Denetleyici.</H2>
      <Sub>
        Kaynakçanızı yapıştırın; içindeki her DOI CrossRef veritabanında
        sorgulanır. Var olmayan kaynak kırmızıyla işaretlenir. Uydurma atıfı
        dergiye göndermeden önce yakalamanın en hızlı yolu.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <div
              className="font-mono text-[11px] uppercase tracking-[0.18em] mb-2.5"
              style={{ color: ACCENT }}
            >
              Ne gösterir
            </div>
            <ul className="space-y-1.5 text-sm text-white/55 leading-relaxed">
              <li>· Kaynağın gerçekten var olup olmadığını</li>
              <li>· Gerçek başlığı, yazarları, dergiyi ve yılı</li>
              <li>· Künyenizle kayıt arasındaki uyuşmazlığı</li>
            </ul>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2.5">
              Bilinmesi gereken
            </div>
            <ul className="space-y-1.5 text-sm text-white/55 leading-relaxed">
              <li>· Yalnızca DOI'si olan kaynakları denetler</li>
              <li>· Kitap ve bildirilerin çoğunda DOI yok</li>
              <li>· Bulunamayan kaynak illa uydurma değildir — elle bakın</li>
            </ul>
          </div>
        </Fade>
      </div>
      <Fade delay={0.26}>
        <div className="mt-6">
          <EmbeddedTool
            slug="atif-denetleyici"
            title="Atıf Denetleyici"
            hint="Kendi kaynakçanızı yapıştırıp burada deneyin — sunumdan çıkmanıza gerek yok."
          />
        </div>
      </Fade>
      <Fade delay={0.34}>
        <p className="mt-4 text-sm text-white/45">
          Metniniz hiçbir yere gönderilmiyor; yalnızca bulunan DOI numaraları
          sorgulanıyor.
        </p>
      </Fade>
    </Slide>
  ),

  /* 45 · PDF bölücü ve anonimleştirici */
  () => (
    <Slide>
      <Eyebrow>Araç 2 ve 3</Eyebrow>
      <H2>PDF Bölücü ve Anonimleştirici.</H2>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-6">
            <h3 className="text-white font-semibold text-lg mb-2">PDF Bölücü</h3>
            <p className="text-sm text-white/55 leading-relaxed mb-3">
              Büyük bir PDF'i sayfa aralığına ya da eşit parçalara böler.
              Varsayılan parça boyutu 100 sayfa — çünkü yapay zekâ araçları
              bunun üstünde görselleri okumuyor, yalnızca metni çıkarıyor.
            </p>
            <p className="text-xs text-white/40 leading-relaxed">
              Dosya tarayıcıdan hiç çıkmıyor. 400 sayfalık bir tez, dört
              parçaya bölünüp şekilleriyle birlikte incelenebilir hale geliyor.
            </p>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-6">
            <h3 className="text-white font-semibold text-lg mb-2">
              Anonimleştirici
            </h3>
            <p className="text-sm text-white/55 leading-relaxed mb-3">
              Metindeki e-posta, telefon, TC kimlik, öğrenci numarası, IBAN ve
              verdiğiniz isimleri temizler. Belgeyi bir araca vermeden önceki
              son adım.
            </p>
            <p className="text-xs text-white/40 leading-relaxed">
              Etik kurul başvurusu ve KVKK açısından somut karşılığı var:
              kişisel veri hiçbir zaman üçüncü tarafa gitmiyor.
            </p>
          </div>
        </Fade>
      </div>
      <Fade delay={0.26}>
        <div className="mt-5 grid md:grid-cols-2 gap-4">
          <EmbeddedTool
            slug="pdf-bolucu"
            title="PDF Bölücü"
            hint="Bir PDF seçip burada bölün, parçaları buradan indirin."
          />
          <EmbeddedTool
            slug="anonimlestirici"
            title="Anonimleştirici"
            hint="Metninizi yapıştırıp temizlenmiş hâlini görün."
          />
        </div>
      </Fade>
      <Fade delay={0.34}>
        <p className="mt-4 text-sm text-white/45 leading-relaxed">
          İkisi de tamamen tarayıcınızda çalışıyor — dosyanız bu sayfadan hiç
          çıkmıyor. İnternet bağlantınızı kesip de kullanabilirsiniz.
        </p>
      </Fade>
    </Slide>
  ),

  /* 46 · Diğer araçlar */
  () => (
    <Slide>
      <Eyebrow>Araç 4 – 12</Eyebrow>
      <H2>Her dönem lazım olanlar.</H2>
      <div className="mt-6 grid md:grid-cols-3 gap-3">
        {[
          ["Kaynakça Biçimlendirici", "DOI listesinden APA 7, IEEE ve Vancouver kaynakça üretir. Dergi değiştirince elle çevirmekten kurtarır."],
          ["BibTeX Üretici", "DOI'lerden LaTeX için hazır .bib dosyası. Anahtarlar Türkçe karakterlerden arındırılıyor, kısaltmalar korunuyor."],
          ["Türkçe Karakter Düzeltici", "“GÃ¶sterimler” gibi bozulmuş metni onarır. Dışa aktarılan CSV'lerde sık görülen sorun."],
          ["Metin İstatistikleri", "Kelime, karakter, okuma süresi. Dergi kelime sınırını takip eder; kaynakçayı sayım dışı bırakabilir."],
          ["PDF Birleştirici", "Birden çok PDF'i tek dosyada birleştirir, sırayı siz belirlersiniz. Başvuru dosyaları için."],
          ["Not Hesaplayıcı", "Ağırlıklı ortalama, harf notu dağılımı, çan eğrisi. Excel'in bozmadığı CSV olarak indirir."],
          ["Sınav Karıştırıcı", "Soru listesinden A/B/C formları ve cevap anahtarları. Aynı tohumla aynı sınav yeniden üretilebilir."],
          ["Yayın Listesi Düzenleyici", "Yayınları türe ve yıla göre gruplayıp numaralandırır. Akademik başvuru dosyaları için."],
          ["Likert Anket Özetleyici", "Madde bazında ortalama, standart sapma, dağılım ve Cronbach alfa. Ters kodlamayı destekler."],
        ].map(([t, d], i) => (
          <Fade key={t} delay={0.04 * i}>
            <div className="ai-card px-4 py-4 h-full">
              <div className="text-white text-sm font-semibold mb-1.5">{t}</div>
              <div className="text-[13px] text-white/50 leading-relaxed">{d}</div>
            </div>
          </Fade>
        ))}
      </div>
      <Fade delay={0.45}>
        <p className="mt-5 text-sm text-white/45">
          Dokuzu da tamamen tarayıcınızda çalışıyor; yalnızca DOI sorgulayan
          ikisi dışarıya istek gönderiyor — o da yalnızca DOI numarasını.
        </p>
      </Fade>
      <Fade delay={0.5}>
        <a
          href="/araclar"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold"
          style={{ background: ACCENT, color: "#000" }}
        >
          On iki aracın hepsini aç
        </a>
      </Fade>
    </Slide>
  ),

  /* 47 · Nasıl kurulur */
  () => (
    <Slide>
      <Eyebrow>Kurulum</Eyebrow>
      <H2>Mac ve Windows&apos;ta masaüstü uygulaması olarak.</H2>
      <Sub>
        Araçlar tarayıcıda açılıyor ama orada kalmak zorunda değil. Kurunca
        kendi penceresinde açılıyor, görev çubuğuna/Dock&apos;a iniyor ve
        internet olmadan da çalışıyor.
      </Sub>
      <div className="mt-7 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <div className="ai-card p-5">
            <div className="text-white font-semibold mb-2">
              Windows · Chrome / Edge
            </div>
            <p className="text-sm text-white/55 leading-relaxed">
              Adres çubuğunun sağındaki kur simgesi, ya da menüden
              “Uygulamalar → Bu siteyi uygulama olarak yükle”.
            </p>
          </div>
        </Fade>
        <Fade delay={0.16}>
          <div className="ai-card p-5">
            <div className="text-white font-semibold mb-2">
              macOS · Chrome / Edge
            </div>
            <p className="text-sm text-white/55 leading-relaxed">
              Menü → “Yayınla, kaydet ve paylaş → Uygulama olarak yükle”.
            </p>
          </div>
        </Fade>
        <Fade delay={0.24}>
          <div className="ai-card p-5">
            <div className="text-white font-semibold mb-2">macOS · Safari</div>
            <p className="text-sm text-white/55 leading-relaxed">
              Paylaş düğmesi → “Dock&apos;a Ekle”.
            </p>
          </div>
        </Fade>
      </div>
      <Fade delay={0.32}>
        <p className="mt-7 text-sm text-white/45 leading-relaxed max-w-3xl">
          Kurulum ücretsiz ve imza uyarısı çıkmıyor, çünkü indirilen bir program
          değil — tarayıcının kendi uygulama kipi. Güncellemeler kendiliğinden
          geliyor.
        </p>
      </Fade>
    </Slide>
  ),

  /* 48 · Bölüm 7 */
  () => (
    <Divider
      num="8"
      title="Uygulama"
      subtitle="Bu sunumu kapattıktan sonra bu hafta içinde yapabilecekleriniz."
    />
  ),

  /* 49 · Üç adım */
  () => (
    <Slide>
      <Eyebrow>Bu hafta</Eyebrow>
      <H2>Üç adım.</H2>
      <div className="mt-8">
        <Steps
          items={[
            {
              t: "Gizlilik ayarınızı açıp bakın",
              d: "Ayarlar → Gizlilik. Model eğitimi tercihinizi bilinçli seçin. Beş yıl ile otuz gün arasındaki fark burada belirleniyor.",
            },
            {
              t: "Bir dersiniz için proje açın",
              d: "İzlence, kaynak ve geçen yılın sınavı. Sonra “bu haftanın quizini hazırla” deyin. Ücretsiz planda beş proje hakkınız var.",
            },
            {
              t: "Hedef derginizin politikasını okuyun",
              d: "Beyanın nereye yazılacağı dergiye göre değişiyor. Makaleyi göndermeden önce değil, yazmaya başlamadan önce bakın.",
            },
          ]}
        />
      </div>
    </Slide>
  ),

  /* 49b · 30 günlük plan */
  () => (
    <Slide>
      <Eyebrow>Dört hafta</Eyebrow>
      <H2>Alışkanlık hâline getirmenin planı.</H2>
      <Sub>
        Bir aracı bir kez denemek işe yaramıyor; iş akışınıza girmesi gerekiyor.
        Haftada bir yeni şey ekleyerek ilerleyin.
      </Sub>
      <div className="mt-8">
        <Timeline
          items={[
            {
              when: "1. hafta",
              title: "Sadece özet ve eleştiri",
              detail:
                "Okuduğunuz makaleleri özetletin, kendi paragraflarınızı eleştirtin. Hiçbir şey ürettirmeyin — önce nasıl düşündüğünü görün.",
            },
            {
              when: "2. hafta",
              title: "Bir ders projesi",
              detail:
                "En çok emek verdiğiniz dersi projeye taşıyın. Quiz ve örnek üretin, kaliteyi kendi standardınızla karşılaştırın.",
            },
            {
              when: "3. hafta",
              title: "Araştırma tarafı",
              detail:
                "Literatür taraması yaptırın ve her kaynağı doğrulayın. Kaç tanesinin gerçek olduğunu sayın — bu sayı güven ölçünüz.",
            },
            {
              when: "4. hafta",
              title: "Kendi kalıplarınız",
              detail:
                "En çok işe yarayan üç istemi kaydedin. Asıl kazanç burada başlıyor: her seferinde sıfırdan yazmıyorsunuz.",
            },
          ]}
        />
      </div>
    </Slide>
  ),

  /* 49c · Ekip ve laboratuvar */
  () => (
    <Slide>
      <Eyebrow>Tek başınıza değilseniz</Eyebrow>
      <H2>Laboratuvar ya da araştırma grubu için.</H2>
      <Sub>
        Bir ekipte herkesin kendi başına deneme yapması, hem tekrar hem de
        tutarsız kalite üretiyor. Dört basit kural bunu düzeltiyor.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <Fade delay={0.06}>
          <Card icon={ClipboardList} title="Ortak istem defteri">
            İşe yarayan istemleri paylaşılan bir belgede toplayın. Aynı işi
            beş kişinin beş farklı kalitede yapması engellensin.
          </Card>
        </Fade>
        <Fade delay={0.12}>
          <Card icon={Lock} title="Neyin yüklenmeyeceği yazılı olsun">
            Ham veri, hasta kaydı, yayımlanmamış tez. Sözlü kural
            unutuluyor; tek sayfalık yazılı kural unutulmuyor.
          </Card>
        </Fade>
        <Fade delay={0.18}>
          <Card icon={PenLine} title="Beyan sorumlusu belirleyin">
            Ortak yazarlı makalede beyanı kimin yazacağı baştan belli olsun.
            Sonradan “ben kullanmadım” tartışması çıkmasın.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Users} title="Öğrencilere sınır çizin">
            Lisansüstü öğrencinize neyi devredebileceğini söyleyin. Tez
            yazımında sınır belirsizse sorumluluk danışmana kalır.
          </Card>
        </Fade>
      </div>
    </Slide>
  ),

  /* 50 · Sık yapılan hatalar */
  () => (
    <Slide>
      <Eyebrow>Kaçının</Eyebrow>
      <H2>En sık yapılan beş hata.</H2>
      <div className="mt-7 space-y-2.5">
        {[
          {
            t: "Atıfları doğrulamadan kullanmak",
            d: "En pahalı hata. Dergiye gidince geri dönüşü olmuyor ve itibar kaybı yaratıyor.",
          },
          {
            t: "Tek cümlelik istem yazıp “işe yaramıyor” demek",
            d: "Bağlam vermeden ortalama cevap gelir. Sorun araçta değil, istemde.",
          },
          {
            t: "İlk cevabı son cevap sanmak",
            d: "İlk çıktı taslaktır. İkinci ve üçüncü turda kaliteyi siz belirlersiniz.",
          },
          {
            t: "Gizli belgeyi araca yüklemek",
            d: "Hakemliğini yaptığınız makale, ham katılımcı verisi, öğrenci dosyası. Önce anonimleştirin ya da hiç yüklemeyin.",
          },
          {
            t: "Beyan etmeyi unutmak",
            d: "Kullanmak sorun değil; saklamak sorun. Beyan, işin en kolay ve en koruyucu kısmı.",
          },
        ].map((s, i) => (
          <Fade key={s.t} delay={0.07 * i}>
            <div className="ai-card px-5 py-3.5 flex items-start gap-4">
              <X className="w-4 h-4 shrink-0 mt-1 text-white/30" />
              <div>
                <div className="text-white font-medium">{s.t}</div>
                <div className="text-sm text-white/50 mt-0.5 leading-relaxed">
                  {s.d}
                </div>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </Slide>
  ),

  /* 51 · Kurumsal adım */
  () => (
    <Slide>
      <Eyebrow>Kurumsal</Eyebrow>
      <H2>Üniversitenizde konuşmak isterseniz.</H2>
      <Sub>
        Claude for Education bireysel değil kurumsal bir anlaşma. Rektörlüğe ya
        da bilgi işleme götürülecek bir öneri, şu üç soruya cevap verdiğinde
        ciddiye alınıyor.
      </Sub>
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={Users} title="Kimi kapsayacak">
            Bir bölüm mü, tüm kampüs mü? Öğrenci dahil mi? Kapsam, fiyatı
            belirleyen ilk değişken.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={Lock} title="Veri nereye gidecek">
            Kurumsal planlar tüketici veri politikasının dışında. Bilgi
            işlemin ilk sorusu bu olacak.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={Table2} title="Başarı nasıl ölçülecek">
            Kaç ders kullandı, hangi işi kısalttı? Ölçüsü olmayan pilot ikinci
            yıl bütçe bulamıyor.
          </Card>
        </Fade>
      </div>
      <Source>
        claude.com/contact-sales/education-plan — kurumlar Anthropic eğitim
        ekibiyle iletişime geçiyor
      </Source>
    </Slide>
  ),

  /* 52 · Tek slaytta özet */
  () => (
    <Slide>
      <Eyebrow>Özet</Eyebrow>
      <H2>Hatırlanması gereken sekiz şey.</H2>
      <div className="mt-7 grid md:grid-cols-2 gap-x-8 gap-y-3">
        {[
          "Ücretsiz plan sandığınızdan çok şey yapıyor — önce sınırına çarpın.",
          "Pro 20 USD/ay, yıllıkta 17. API bu fiyata dahil değil.",
          "“Akademisyene ücretsiz Pro” yok; o program ABD'deki K-12 öğretmenleri için.",
          "Öğrencilerinize Campus Program'ı söyleyin: 3.600 dolar, dünya çapına açık.",
          "İstem kalitesi = sonuç kalitesi. Bağlam vermeden ortalama cevap gelir.",
          "Her atıfı açıp doğrulayın. Uydurma kaynak en pahalı hatadır.",
          "Beyan zorunlu, yeri yayıncıya göre değişiyor. Hakem makaleyi yükleyemez.",
          "Gizlilik ayarınız 5 yıl ile 30 gün arasındaki farkı belirliyor.",
        ].map((t, i) => (
          <Fade key={t} delay={0.05 * i}>
            <div className="flex items-start gap-3">
              <span
                className="font-mono text-xs shrink-0 pt-1"
                style={{ color: ACCENT }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-white/65 leading-relaxed">{t}</span>
            </div>
          </Fade>
        ))}
      </div>
    </Slide>
  ),

  /* 53 · Kaynaklar */
  () => (
    <Slide>
      <Eyebrow>Kaynaklar</Eyebrow>
      <H2>Her şeyi kendiniz doğrulayın.</H2>
      <Sub>
        Bu sunumdaki bilgiler 4 Eylül 2026&apos;da erişilen resmî sayfalardan
        alındı. Yapay zekâ tarafında kurallar hızlı değişiyor — okuduğunuz
        tarihte tekrar bakın.
      </Sub>
      <div className="mt-7 grid md:grid-cols-2 gap-x-10 gap-y-2 font-mono text-[13px] text-white/45">
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

  /* 53b · Birlikte çalışalım */
  () => (
    <Slide>
      <Eyebrow>Birlikte çalışalım</Eyebrow>
      <H1>Bu işi kurumunuza taşıyalım mı?</H1>
      <Sub>
        Bu sunumu okurken “bizim bölümde de böyle bir oturum olsa” diye
        düşündüyseniz, konuşalım. Aynı içeriği kurumunuzun alanına ve
        ihtiyacına göre yeniden kurgulayabiliriz.
      </Sub>
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <Fade delay={0.08}>
          <Card icon={Users} title="Kuruma özel seminer">
            Fakültenize ya da bölümünüze özel, alanınızın örnekleriyle
            hazırlanmış yerinde ya da çevrimiçi oturum.
          </Card>
        </Fade>
        <Fade delay={0.16}>
          <Card icon={ClipboardList} title="Atölye ve uygulama">
            Katılımcıların kendi makalesi ve kendi dersiyle çalıştığı,
            sonunda elinde somut çıktıyla ayrıldığı uygulamalı atölye.
          </Card>
        </Fade>
        <Fade delay={0.24}>
          <Card icon={FlaskConical} title="Ortak araştırma">
            Yapay zekâ, doğal dil işleme ve siber güvenlik alanlarında ortak
            yayın, proje başvurusu ve tez eş danışmanlığı.
          </Card>
        </Fade>
      </div>
      <Fade delay={0.34}>
        <div className="mt-9 ai-card px-7 py-6 flex flex-wrap items-center justify-between gap-5">
          <div>
            <div className="text-white/45 text-sm mb-1.5">
              Yazmanız yeterli — genellikle iki iş günü içinde dönüş yapıyorum.
            </div>
            <div
              className="font-mono text-xl md:text-2xl"
              style={{ color: ACCENT }}
            >
              osman.cetlenbik@cbu.edu.tr
            </div>
          </div>
          <div className="font-mono text-sm text-white/40 leading-relaxed">
            Öğr. Gör. Osman Can Çetlenbik
            <br />
            Manisa Celal Bayar Üniversitesi
            <br />
            osmancancetlenbik.com
          </div>
        </div>
      </Fade>
    </Slide>
  ),

  /* 54 · Kapanış */
  () => (
    <div className="relative w-full h-full flex items-center justify-center px-10">
      <Grid />
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
          <p className="mt-7 text-lg text-white/55 leading-relaxed">
            Yapay zekâ akademisyenin işini bitirmiyor; sıkıcı kısmını kısaltıp
            düşünmeye vakit bırakıyor. Hangi kısmın sıkıcı, hangi kısmın işin
            kendisi olduğuna karar vermek de akademisyenliğin bir parçası.
          </p>
        </Fade>
        <Fade delay={0.28}>
          <div className="mt-10 ai-card inline-block px-7 py-5">
            <div className="text-white/45 text-sm mb-2">
              Sunumdaki araçlar — ücretsiz, üyeliksiz:
            </div>
            <div className="font-mono text-lg" style={{ color: ACCENT }}>
              osmancancetlenbik.com/araclar
            </div>
          </div>
        </Fade>
        <Fade delay={0.4}>
          <div className="mt-10 font-mono text-sm text-white/45 space-y-1.5">
            <div className="text-white/60">Öğr. Gör. Osman Can Çetlenbik</div>
            <div>Manisa Celal Bayar Üniversitesi</div>
            <div style={{ color: ACCENT }}>osman.cetlenbik@cbu.edu.tr</div>
          </div>
        </Fade>
        <Fade delay={0.5}>
          <p className="mt-9 text-sm text-white/35 leading-relaxed">
            Seminer, atölye ya da ortak çalışma için yazabilirsiniz.
            <br />
            Faydalı bulduysanız paylaşın — meslektaşınızın da işine yarar.
          </p>
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
