import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/profile";
import { PaylasBaglantilari } from "./PaylasBaglantilari";
import s from "./Hazirlayan.module.css";

/** Araç sayfasının altındaki tanıtım kartı: fotoğraf, unvan, kurum ve paylaşım bağlantıları. */
export function Hazirlayan() {
  return (
    <section className={s.card} id="hazirlayan" aria-labelledby="hazirlayan-h">
      <Image src="/profile.png" alt={profile.name} width={112} height={112} className={s.photo} />
      <div className={s.body}>
        <span className="eyebrow">Hazırlayan</span>
        <h2 id="hazirlayan-h">Öğr. Gör. {profile.name}</h2>
        <p className={s.role}>{profile.title}</p>
        <p className={s.inst}>{profile.institution}</p>
        <p>Öğrenciler, danışmanlar ve araştırmacılar için ücretsiz akademik araçlar geliştiriyorum. Araçlarım tarayıcıda çalışır; metniniz sizde kalır. 2209-A Ön Kontrol bu araçlardan biri.</p>
        <div className={s.links}>
          <Link className={`${s.btn} ${s.primary}`} href="/araclar">Diğer akademik araçlar</Link>
          <Link className={s.btn} href="/hakkimda">Hakkımda</Link>
          <a className={s.btn} href={profile.socials.linkedin} target="_blank" rel="noopener">LinkedIn</a>
          <Link className={s.btn} href="/iletisim">Geri bildirim gönder</Link>
        </div>
        <PaylasBaglantilari />
      </div>
    </section>
  );
}
