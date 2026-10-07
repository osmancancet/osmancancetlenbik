import type { Metadata } from "next";
import { seoMeta } from "@/lib/seo/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { BasvuruForm } from "./BasvuruForm";
import {
  APPLICATION_DEADLINE,
  COMPETITIONS,
  DATA_RETENTION_UNTIL,
  applicationsOpen,
} from "@/lib/competitions";
import {
  BarChart3,
  Gamepad2,
  Rocket,
  Code2,
  CheckCircle2,
  CalendarClock,
} from "lucide-react";

const TITLE = "Yarışma Takımı Başvurusu";
const DESCRIPTION =
  "Datathon, Game Jam, TEKNOFEST ve Hackathon'lar için takım arkadaşı arıyoruz. Deneyim şart değil; öğrenme isteği ve takım ruhu yeterli.";

export const metadata: Metadata = seoMeta({
  path: "/basvuru",
  title: TITLE,
  description: DESCRIPTION,
  ogTitle: "Datathon · Game Jam · TEKNOFEST · Hackathon — Başvurular açık",
});

// Son başvuru tarihi geçince sayfa kendiliğinden kapansın.
export const revalidate = 300;

const ICONS = {
  DATATHON: BarChart3,
  GAMEJAM: Gamepad2,
  TEKNOFEST: Rocket,
  HACKATHON: Code2,
} as const;

const GAINS = [
  "Gerçek problemler üzerinde proje deneyimi",
  "Hocalarımızdan mentorluk ve teknik destek",
  "Özgeçmişinizde ve portfolyonuzda yer alacak somut çıktılar",
  "Ödül, burs ve sektörle tanışma fırsatları",
];

export default function BasvuruPage() {
  const open = applicationsOpen();

  return (
    <PageShell
      eyebrow="Öğrenci çağrısı"
      title="Takım arkadaşı arıyoruz."
      subtitle="Osman Can Çetlenbik ve Orkun Teke ile bu dönem ulusal ve uluslararası yarışmalara takım olarak katılıyoruz. Fikri olan, kod yazmayı seven, veriyle uğraşmaktan keyif alan ya da oyun geliştirmeyi hayal eden herkesi bekliyoruz."
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
        {COMPETITIONS.map((c) => {
          const Icon = ICONS[c.id];
          return (
            <div key={c.id} className="card rounded-lg p-4 sm:p-5">
              <Icon className="w-5 h-5 text-[var(--accent)] mb-3" />
              <div className="font-medium text-[var(--fg)]">{c.label}</div>
              <div className="text-sm text-[var(--fg-muted)] mt-1">
                {c.desc}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start">
        <div className="card rounded-lg p-6 md:p-8 order-2 lg:order-1">
          {open ? (
            <BasvuruForm />
          ) : (
            <div className="text-center py-10">
              <CalendarClock className="w-10 h-10 text-[var(--fg-subtle)] mx-auto mb-4" />
              <p className="text-[var(--fg)] font-medium">
                Bu dönemin başvuruları kapandı.
              </p>
              <p className="text-sm text-[var(--fg-muted)] mt-2">
                Yeni çağrılar için Duyurular sayfasını takip edebilirsiniz.
              </p>
            </div>
          )}
        </div>

        <aside className="space-y-6 order-1 lg:order-2 lg:sticky lg:top-28">
          <div>
            <h2 className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-4">
              Kimleri arıyoruz?
            </h2>
            <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
              Yazılımcılar, veri meraklıları, tasarımcılar, oyun
              geliştiriciler, sunum ve fikir tarafında güçlü arkadaşlar.
              Deneyim şart değil. Farklı bölümlerden gelen öğrencilerin katkısı
              özellikle değerli.
            </p>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-4">
              Neler kazanacaksınız?
            </h2>
            <ul className="space-y-2.5">
              {GAINS.map((g) => (
                <li
                  key={g}
                  className="flex gap-2.5 text-sm text-[var(--fg-muted)]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  {g}
                </li>
              ))}
            </ul>
          </div>

          {APPLICATION_DEADLINE && open && (
            <div className="card rounded-lg p-4 flex items-center gap-3">
              <CalendarClock className="w-4 h-4 text-[var(--accent)]" />
              <div className="text-sm text-[var(--fg-muted)]">
                Son başvuru:{" "}
                <span className="text-[var(--fg)]">
                  {APPLICATION_DEADLINE.toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "Europe/Istanbul",
                  })}
                </span>
              </div>
            </div>
          )}
        </aside>
      </div>

      <section
        id="aydinlatma-metni"
        className="mt-16 max-w-3xl scroll-mt-28 text-sm text-[var(--fg-muted)] leading-relaxed space-y-3"
      >
        <h2 className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-4">
          Kişisel verilerin korunması hakkında aydınlatma metni
        </h2>
        <p>
          Bu formla paylaştığınız kişisel veriler, 6698 sayılı Kişisel
          Verilerin Korunması Kanunu (KVKK) kapsamında veri sorumlusu sıfatıyla
          Osman Can Çetlenbik tarafından işlenir.
        </p>
        <p>
          <span className="text-[var(--fg)]">İşlenen veriler:</span> ad soyad,
          öğrenci numarası, e-posta, telefon (isteğe bağlı), üniversite, bölüm,
          sınıf, ilgilendiğiniz yarışmalar, yetkinlikleriniz, deneyiminiz,
          portfolyo bağlantınız ve motivasyon yazınız.
        </p>
        <p>
          <span className="text-[var(--fg)]">Amaç:</span> yarışma takımlarının
          oluşturulması, başvurunuzun değerlendirilmesi ve bu süreçle ilgili
          sizinle iletişime geçilmesi. Verileriniz başka bir amaçla
          kullanılmaz, pazarlama için kullanılmaz ve satılmaz.
        </p>
        <p>
          <span className="text-[var(--fg)]">Hukuki sebep ve aktarım:</span>{" "}
          verileriniz açık rızanıza dayanarak (KVKK m. 5/1) işlenir. Takım
          oluşturma sürecini birlikte yürüttüğümüz Orkun Teke ile paylaşılır.
          Site, yurt dışında bulunabilen bulut sunucularında (barındırma ve
          veritabanı hizmet sağlayıcıları) çalıştığı için verileriniz bu
          sunucularda saklanır; bu aktarım da açık rızanıza dayanır (KVKK m.
          9).
        </p>
        <p>
          <span className="text-[var(--fg)]">Saklama süresi:</span> veriler
          yarışma dönemi süresince saklanır ve en geç {DATA_RETENTION_UNTIL}{" "}
          tarihinde silinir.
        </p>
        <p>
          <span className="text-[var(--fg)]">Haklarınız:</span> KVKK m. 11
          uyarınca verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini
          veya silinmesini isteme ve rızanızı her zaman geri alma hakkına
          sahipsiniz. Talepleriniz için{" "}
          <a
            href="mailto:osman.cetlenbik@cbu.edu.tr"
            className="text-[var(--accent)] hover:underline"
          >
            osman.cetlenbik@cbu.edu.tr
          </a>{" "}
          adresine yazabilirsiniz.
        </p>
      </section>
    </PageShell>
  );
}
