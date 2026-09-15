"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { useDeck } from "../_shared/deck/useDeck";
import "./styles.css";

/**
 * Claude Skills ile Akademik İş Akışı — Makale Değerlendirme.
 *
 * KÖKEN: Yazarın 15 Eylül 2026'da bağımsız bir HTML dosyası olarak
 * hazırladığı 17 slaytlık sunum. Tasarım (kâğıt zemin, Palatino başlık,
 * sol oluk) olduğu gibi korundu; yalnızca gezinme sitenin ortak
 * çekirdeğine (useDeck) bağlandı ve sona skill paketini indiren bir slayt
 * eklendi. Metin birebir özgün sunumdan; içerik düzenlemesi yapılmadı.
 *
 * ÖLÇEK: Slaytlar 1280×720 sabit tuvale göre yazıldı. Bileşen, görünüm
 * alanına sığan en büyük ölçeği hesaplayıp tuvali transform ile küçültüyor
 * — böylece metin satır kırılımları her ekranda aynı kalıyor.
 *
 * YAZDIRMA: `?yazdir=1` bütün slaytları alt alta basar; tarayıcının PDF
 * kaydetme penceresi bunu 18 sayfaya böler. Hazır PDF de /dosyalar altında.
 */

const W = 1280;
const H = 720;

function cx(base: string, active: boolean) {
  return active ? `${base} is-active` : base;
}

const slides: Array<(active: boolean) => ReactNode> = [
  /* 01 · Kapak */
  (active) => (
    <section className={cx("slide cover", active)}>
      <div className="mark"><i></i><i></i><i></i></div>
      <h1>Claude Skills ile akademik iş akışı</h1>
      <p className="sub">Bir kez yazılan, her seferinde aynı titizlikle çalışan bir makale değerlendirme asistanı nasıl kurulur.</p>
      <div className="by">
        <b>Osman Can Çetlenbik</b>
        Öğr. Gör., Manisa Celal Bayar Üniversitesi<br />
        Manisa Teknik Bilimler Meslek Yüksekokulu<br />
        osman.cetlenbik@cbu.edu.tr
      </div>
    </section>
  ),

  /* 02 · Sorun */
  (active) => (
    <section className={cx("slide", active)}>
      <div className="gutter"><span className="num">02</span><span className="sec">Sorun</span></div>
      <h2>Her sohbet sıfırdan başlıyor</h2>
      <div className="rule"></div>
      <ul>
        <li>Aynı talimatları her seferinde yeniden yazıyorsunuz: hangi rapor biçimi, hangi atıf stili, hangi ölçütler.</li>
        <li>Çıktı tutarsız oluyor. Bu haftaki değerlendirme, geçen haftakiyle aynı ölçütlerle yapılmıyor.</li>
        <li>Kurumsal bilgi dağınık kalıyor. Bölümün rubriği, derginin hakem formu, tez biçim kılavuzu — hepsi ayrı dosyalarda.</li>
        <li>Bir asistanı işe alıp ona hiç oryantasyon yapmamak gibi. Her gün yeni bir asistan geliyor.</li>
      </ul>
      <p className="lead" style={{ marginTop: "26px", color: "var(--minor)" }}>Skill, o oryantasyon dosyasıdır.</p>
    </section>
  ),

  /* 03 · Tanım */
  (active) => (
    <section className={cx("slide", active)}>
      <div className="gutter"><span className="num">03</span><span className="sec">Tanım</span></div>
      <h2>Skill nedir?</h2>
      <div className="rule"></div>
      <p className="lead" style={{ marginBottom: "26px" }}>Bir klasör. İçinde <code className="inline">SKILL.md</code> adlı bir Markdown dosyası ve isterseniz yardımcı dosyalar. Claude ilgili bir görevle karşılaştığında o klasörü kendisi açıp okur.</p>
      <div className="cols3">
        <div className="card">
          <h3>Kod gerekmez</h3>
          <p>Talimatları düz Türkçe yazarsınız. Programlama bilgisi şart değil; isteğe bağlı olarak betik eklenebilir.</p>
        </div>
        <div className="card">
          <h3>Kendiliğinden devreye girer</h3>
          <p>"Şu skill'i kullan" demeniz gerekmez. Claude görevi görüp hangi skill'in gerektiğine karar verir.</p>
        </div>
        <div className="card">
          <h3>Taşınabilir</h3>
          <p>Bir dosya olarak paylaşılır. Bölüm arkadaşınıza gönderirsiniz, o da aynı ölçütlerle çalışır.</p>
        </div>
      </div>
      <p className="small" style={{ marginTop: "26px" }}>Skill biçimi <code className="inline">agentskills.io</code> adresinde açık standart olarak yayımlanıyor; yazdığınız skill tek bir araca bağlı kalmıyor.</p>
    </section>
  ),

  /* 04 · Mekanizma */
  (active) => (
    <section className={cx("slide", active)}>
      <div className="gutter"><span className="num">04</span><span className="sec">Mekanizma</span></div>
      <h2>Üç katmanlı okuma</h2>
      <div className="rule"></div>
      <p className="small" style={{ marginBottom: "18px", maxWidth: "70ch" }}>Skill'in tamamı baştan yüklenmez. Bu yüzden onlarca skill kurmanız performansı düşürmez — ve bu yüzden açıklama alanı her şeyden önemlidir.</p>
      <div className="layers">
        <div className="layer l1 reveal d1">
          <span className="lt">Ad ve açıklama</span>
          <span className="ld">Her zaman bellekte. Claude yalnızca buna bakarak skill'i açıp açmayacağına karar verir.</span>
          <span className="tag">~100 kelime</span>
        </div>
        <div className="layer l2 reveal d2">
          <span className="lt">SKILL.md gövdesi</span>
          <span className="ld">Skill tetiklendiğinde okunur. İş akışı, ölçütler, çıktı biçimi burada durur.</span>
          <span className="tag">500 satırın altında tutun</span>
        </div>
        <div className="layer l3 reveal d3">
          <span className="lt">Yardımcı dosyalar</span>
          <span className="ld">Yalnızca gerektiğinde okunur. Şablonlar, kontrol listeleri, rubrikler, betikler.</span>
          <span className="tag">sınırsız</span>
        </div>
      </div>
    </section>
  ),

  /* 05 · Anatomi */
  (active) => (
    <section className={cx("slide", active)}>
      <div className="gutter"><span className="num">05</span><span className="sec">Anatomi</span></div>
      <h2>Bir skill neye benzer?</h2>
      <div className="rule"></div>
      <div className="cols" style={{ gridTemplateColumns: ".85fr 1.15fr" }}>
        <div>
          <pre>makale-degerlendirme/{"\n"}
├── <span className="k">SKILL.md</span>{"\n"}
└── references/{"\n    "}
├── rapor-sablonlari.md{"\n    "}
├── kontrol-listeleri.md{"\n    "}
├── istatistik-tuzaklari.md{"\n    "}
├── etik-butunluk.md{"\n    "}
└── puanlama-rubrigi.md</pre>
          <p className="small" style={{ marginTop: "16px" }}>Klasör adı ile <code className="inline">name</code> alanı aynı olmalı. Tek zorunlu dosya SKILL.md'dir.</p>
        </div>
        <div>
          <pre><span className="c">---</span>{"\n"}
<span className="k">name:</span> makale-degerlendirme{"\n"}
<span className="k">description:</span> <span className="s">Akademik makale, bildiri, tez ve{"\n  "}
öğrenci ödevlerini hakem titizliğinde değerlendirir...{"\n  "}
Kullanıcı "hakem raporu yaz", "gönderime hazır mı",{"\n  "}
"peer review" dediğinde mutlaka kullan.</span>{"\n"}
<span className="c">---</span>{"\n"}
{"\n"}
<span className="k"># Makale Değerlendirme</span>{"\n"}
{"\n"}
<span className="c">## Adım 1 — Modu belirle</span>{"\n"}
Üç mod var: hakem, öndenetim, tez...{"\n"}
{"\n"}
<span className="c">## Adım 4 — Dokuz boyutta değerlendir</span>{"\n"}
1. Özgünlük ve katkı{"\n"}
2. Literatür ve konumlandırma{"\n"}
...</pre>
        </div>
      </div>
    </section>
  ),

  /* 06 · Tetikleme */
  (active) => (
    <section className={cx("slide", active)}>
      <div className="gutter"><span className="num">06</span><span className="sec">Tetikleme</span></div>
      <h2>Açıklama alanı skill'i ya çalıştırır ya öldürür</h2>
      <div className="rule"></div>
      <p className="small" style={{ marginBottom: "20px", maxWidth: "72ch" }}>Skill'in devreye girmemesinin en yaygın nedeni zayıf bir <code className="inline">description</code> alanıdır. Kullanıcının gerçekte yazacağı cümleleri açıklamanın içine koyun.</p>
      <div className="cols">
        <div className="cmp bad">
          <div className="h">Çalışmaz</div>
          Ne yaptığını söylüyor, ne zaman gerektiğini söylemiyor.
          <code>description: Makaleleri değerlendirir.</code>
        </div>
        <div className="cmp good">
          <div className="h">Çalışır</div>
          Görevi, tetikleyici ifadeleri ve sınırı birlikte veriyor.
          <code>description: Akademik makale, bildiri ve tezleri hakem titizliğinde değerlendirir; hakem raporu veya gönderim öncesi denetim üretir. Kullanıcı bir taslak paylaşıp "değerlendir", "hakem raporu yaz", "gönderime hazır mı", "peer review" dediğinde mutlaka kullan.</code>
        </div>
      </div>
      <p className="small" style={{ marginTop: "22px" }}>Kritik anahtar kelimeleri açıklamanın başına koyun. Tek bir skill'e her işi yüklemek yerine amaç başına ayrı skill yazın.</p>
    </section>
  ),

  /* 07 · Kurulum */
  (active) => (
    <section className={cx("slide", active)}>
      <div className="gutter"><span className="num">07</span><span className="sec">Kurulum</span></div>
      <h2>Claude.ai'ye ekleme: web ve mobil</h2>
      <div className="rule"></div>
      <div className="cols" style={{ gridTemplateColumns: "1.1fr .9fr" }}>
        <div>
          <ol className="steps">
            <li><b>Kod yürütmeyi açın.</b> Ayarlar → Capabilities bölümünden "Code execution and file creation" etkin olmalı. Skills bu ortam olmadan çalışmaz.</li>
            <li><b>Skill klasörünü ZIP'leyin.</b> Klasör adı skill adıyla aynı olsun.</li>
            <li><b>Customize → Skills</b> sayfasına gidin.</li>
            <li><b>"+" düğmesi → "Create skill" → "Upload a skill".</b></li>
            <li><b>ZIP dosyasını yükleyin</b> ve listede çıkan skill'i açık konuma getirin.</li>
          </ol>
        </div>
        <div>
          <div className="card">
            <h3>Bilinmesi gerekenler</h3>
            <p>Yüklediğiniz skill hesabınıza özeldir; paylaşmadıkça kimse göremez. Team ve Enterprise planlarında kişilere, gruplara veya tüm kuruma paylaşılabilir.<br /><br />
            Aynı hesapla giriş yaptığınız mobil uygulamada da geçerlidir; ayrıca yüklemeniz gerekmez.<br /><br />
            Yükleme hatalarının olağan nedenleri: klasör adının skill adıyla uyuşmaması, SKILL.md'nin eksik olması, ZIP boyutu.</p>
          </div>
        </div>
      </div>
      <div className="src">support.claude.com/en/articles/12512180-use-skills-in-claude</div>
    </section>
  ),

  /* 08 · Kurulum */
  (active) => (
    <section className={cx("slide", active)}>
      <div className="gutter"><span className="num">08</span><span className="sec">Kurulum</span></div>
      <h2>Claude Code'a ekleme</h2>
      <div className="rule"></div>
      <p className="small" style={{ marginBottom: "18px", maxWidth: "72ch" }}>Claude Code'da yükleme yoktur: skill'ler dosya sistemindedir. Klasörü doğru yere koyarsınız, bu kadar.</p>
      <div className="cols">
        <div>
          <pre><span className="c"># yalnızca size ait, her projede geçerli</span>{"\n"}
~/.claude/skills/makale-degerlendirme/SKILL.md{"\n"}
{"\n"}
<span className="c"># projeye ait, depoyla birlikte paylaşılır</span>{"\n"}
.claude/skills/makale-degerlendirme/SKILL.md{"\n"}
{"\n"}
<span className="c"># kurulu skill'leri listelemek için</span>{"\n"}
<span className="k">/skills</span></pre>
        </div>
        <div>
          <ul>
            <li className="tight">Kişisel konum tek kullanıcılık; proje konumu ekiple paylaşılır ve sürüm kontrolüne girer.</li>
            <li className="tight">Proje skill'lerinde çalışma alanı güven onayı istenir — güvenmediğiniz bir depodaki skill'i açmayın.</li>
            <li className="tight">Aynı klasör yapısı hem Claude.ai hem Claude Code için geçerlidir; bir kez yazıp iki yerde kullanırsınız.</li>
          </ul>
        </div>
      </div>
      <div className="src">code.claude.com/docs/en/skills</div>
    </section>
  ),

  /* 09 · Örnek */
  (active) => (
    <section className={cx("slide", active)}>
      <div className="gutter"><span className="num">09</span><span className="sec">Örnek</span></div>
      <h2>Örnek: makale-degerlendirme</h2>
      <div className="rule"></div>
      <p className="small" style={{ marginBottom: "18px", maxWidth: "70ch" }}>Tek skill, dört mod. Claude bağlamdan hangi modda olduğunu çıkarır; belirsizse tek soru sorar.</p>
      <div className="cols" style={{ gap: "18px 20px" }}>
        <div className="card">
          <h3>hakem</h3>
          <p style={{ color: "var(--murekkep)" }}>Dergiden değerlendirme geldi.</p>
          <p style={{ marginTop: "6px" }}>Editöre ve yazara ayrı bölümlü rapor, beyan kontrol tablosu, gerekçeli karar önerisi.</p>
        </div>
        <div className="card" style={{ borderLeft: "4px solid var(--minor)" }}>
          <h3>panel</h3>
          <p style={{ color: "var(--murekkep)" }}>Üç kör hakem ne derdi?</p>
          <p style={{ marginTop: "6px" }}>Birbirinden bağımsız üç hakem raporu ve editör sentezi. Ayrıntısı sonraki slaytta.</p>
        </div>
        <div className="card">
          <h3>öndenetim</h3>
          <p style={{ color: "var(--murekkep)" }}>Kendi makalemi göndereceğim.</p>
          <p style={{ marginTop: "6px" }}>Hakemin soracağı sorular, öncelik sıralı düzeltme listesi, dergi kurallarına uyum tablosu.</p>
        </div>
        <div className="card">
          <h3>tez</h3>
          <p style={{ color: "var(--murekkep)" }}>Öğrenci çalışmasını okuyorum.</p>
          <p style={{ marginTop: "6px" }}>Ağırlıklı rubrik, gelişime dönük geri bildirim, hesabı gösterilen not önerisi, savunma soruları.</p>
        </div>
      </div>
      <p className="small" style={{ marginTop: "20px" }}>Dört modun omurgası aynı: envanteri çıkar, öz ve sonuçtaki her iddiayı bulgularla eşle, karşılığı olmayanı işaretle.</p>
    </section>
  ),

  /* 10 · Çerçeve */
  (active) => (
    <section className={cx("slide", active)}>
      <div className="gutter"><span className="num">10</span><span className="sec">Çerçeve</span></div>
      <h2>Dokuz boyut</h2>
      <div className="rule"></div>
      <div className="dims">
        <div><span className="n">1</span><span className="t">Özgünlük ve katkı</span><span className="d">Katkı açıkça yazılmış mı, bulgularla orantılı mı?</span></div>
        <div><span className="n">2</span><span className="t">Literatür ve konumlandırma</span><span className="d">Boşluk kurulmuş mu, yoksa kaynak listesi mi?</span></div>
        <div><span className="n">3</span><span className="t">Çerçeve ve araştırma sorusu</span><span className="d">Başlık, öz, amaç ve sonuç aynı çalışmayı anlatıyor mu?</span></div>
        <div><span className="n">4</span><span className="t">Yöntem sağlamlığı</span><span className="d">Başkası bu metinle çalışmayı tekrarlayabilir mi?</span></div>
        <div><span className="n">5</span><span className="t">Veri ve analiz</span><span className="d">Test ölçüm düzeyine uygun mu, etki büyüklüğü var mı?</span></div>
        <div><span className="n">6</span><span className="t">Bulguların sunumu</span><span className="d">Tablolar kendi başına anlaşılıyor mu?</span></div>
        <div><span className="n">7</span><span className="t">Tartışma tutarlılığı</span><span className="d">Sonuç bulgunun ötesine geçiyor mu?</span></div>
        <div><span className="n">8</span><span className="t">Etik ve yayın bütünlüğü</span><span className="d">Onay, onam, çıkar çatışması, fon, YZ beyanı.</span></div>
        <div><span className="n">9</span><span className="t">Dil, biçim, kaynakça</span><span className="d">Atıf–kaynakça eşleşmesi, terim tutarlılığı.</span></div>
      </div>
      <p className="small" style={{ marginTop: "22px" }}>Her boyut için ya bir bulgu yazılır ya "sorun görülmedi" denir. Atlanan boyut, yazarın en çok ihtiyaç duyduğu yerde sessiz kalmaktır.</p>
    </section>
  ),

  /* 11 · Bulgu */
  (active) => (
    <section className={cx("slide", active)}>
      <div className="gutter"><span className="num">11</span><span className="sec">Bulgu</span></div>
      <h2>Bulgunun dili</h2>
      <div className="rule"></div>
      <p className="small" style={{ marginBottom: "16px" }}>
        <span className="sev k">Kritik</span> geçerlilik gider {"\u00a0"}
        <span className="sev j">Majör</span> iddia düzeltilmeli {"\u00a0"}
        <span className="sev m">Minör</span> netlik {"\u00a0"}
        <span className="sev o">Öneri</span> zorunlu değil
      </p>
      <div className="finding">
        <span className="sev k">Kritik</span><span className="loc">Yöntem, 3.2</span><br />
        Zaman serisi verisi rastgele bölünerek eğitim ve test kümesi oluşturulmuş. Bu, geleceğe ait bilginin eğitim kümesine karışmasına yol açar ve bildirilen %94 doğruluğu yukarı yönlü yanlı hâle getirir. Bölmeyi kronolojik yapın, sonuçları yeniden raporlayın; performans düşerse tartışmayı buna göre güncelleyin.
      </div>
      <div className="parts">
        <div><span>Şiddet</span>Yazar neyi önce yapacak?</div>
        <div><span>Konum</span>Hangi bölüm, hangi tablo?</div>
        <div><span>Gerekçe</span>Bu neden sorun?</div>
        <div><span>İstenen</span>Somut olarak ne yapılacak?</div>
      </div>
      <p className="small" style={{ marginTop: "18px" }}>Dört parçadan biri eksikse yazar ne yapacağını bilemez. "Yöntem yetersiz" bir bulgu değil, bir yakınmadır.</p>
    </section>
  ),

  /* 12 · Çıktı */
  (active) => (
    <section className={cx("slide", active)}>
      <div className="gutter"><span className="num">12</span><span className="sec">Çıktı</span></div>
      <h2>Rapor iskeleti</h2>
      <div className="rule"></div>
      <div className="cols" style={{ gridTemplateColumns: "1.05fr .95fr" }}>
        <div className="skel">
          <span className="l h">1. Çalışmanın özeti, hakem kalemiyle</span>
          <span className="l dim">Yazarın özeti kopyalanmaz; doğru anlaşıldığı gösterilir</span>
          <span className="l h">2. Genel değerlendirme</span>
          <span className="l h">3. Güçlü yanlar</span>
          <span className="l h">4–6. Kritik, majör, minör bulgular</span>
          <span className="l h">7. Öneriler</span>
          <span className="l h">8. Etik ve beyan kontrol tablosu</span>
          <span className="l h">9. Karar önerisi</span>
          <span className="l dim">En sonda: gerekçe okunmadan karar görünmesin</span>
          <span className="l h" style={{ color: "var(--murekkep-soluk)" }}>Editöre özel notlar</span>
        </div>
        <div>
          <ul>
            <li className="tight">Şiddet dağılımı karara çevrilir, ama mekanik değil: gerekçe her zaman yazılır.</li>
            <li className="tight">Kritik bulgu mevcut veriyle giderilemiyorsa ret; giderilebiliyorsa majör revizyon.</li>
            <li className="tight">Etik ihlal şüphesinde karar önerilmez, editöre bildirilir.</li>
            <li className="tight">600–1200 kelime tipik olarak yeterli. Uzun rapor iyi rapor değildir; yazarın uygulayamayacağı liste yardım etmez.</li>
          </ul>
        </div>
      </div>
    </section>
  ),

  /* 13 · Panel */
  (active) => (
    <section className={cx("slide", active)}>
      <div className="gutter"><span className="num">13</span><span className="sec">Panel</span></div>
      <h2>Üç kör hakem paneli</h2>
      <div className="rule"></div>
      <p className="small" style={{ marginBottom: "18px", maxWidth: "74ch" }}>Dergi müsveddeyi tek hakeme göndermez, çünkü tek okuyucu her şeyi görmez. Panelde üç rapor bağımsız yazılır ve her hakem yalnızca kendi merceğinden bakar: H1 istatistik testi tartışmaz, H2 literatür eksiği yazmaz.</p>
      <div className="cols3">
        <div className="card" style={{ borderLeft: "4px solid var(--minor)" }}>
          <h3>Hakem 1: alan ve katkı</h3>
          <p>Literatür, konumlandırma, kuramsal çerçeve, özgünlük.</p>
          <p style={{ marginTop: "8px", color: "var(--murekkep)" }}>Bu çalışma alana ne katıyor, katkı iddiası orantılı mı?</p>
        </div>
        <div className="card" style={{ borderLeft: "4px solid var(--kritik)" }}>
          <h3>Hakem 2: yöntem ve analiz</h3>
          <p>Tasarım, örneklem, istatistik, tekrarlanabilirlik, veri sızıntısı.</p>
          <p style={{ marginTop: "8px", color: "var(--murekkep)" }}>Bu veriyle bu yöntemle bu sonuçlara varılabilir mi?</p>
        </div>
        <div className="card" style={{ borderLeft: "4px solid var(--major)" }}>
          <h3>Hakem 3: sunum ve bütünlük</h3>
          <p>Tablolar, tartışma tutarlılığı, etik beyanlar, dil, kaynakça.</p>
          <p style={{ marginTop: "8px", color: "var(--murekkep)" }}>Okuyucu bu metinden doğru sonucu çıkarır mı?</p>
        </div>
      </div>
      <div className="parts" style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
        <div><span>Uzlaşı</span>İki hakemin ortaklaştığı bulgular</div>
        <div><span>Çelişki</span>Gerekçeler yan yana, karar editörde</div>
        <div><span>Tek hakem</span>Çoğunluk yok diye zayıflatılmaz</div>
        <div><span>Karar dağılımı</span>Üç öneri ve birleşik karar</div>
        <div><span>Birleşik liste</span>Yazara tek, öncelik sıralı liste</div>
      </div>
      <p className="small" style={{ marginTop: "16px" }}>Kalite ölçütü tek: üç rapor birbirinin yeniden yazımı olduysa mercekler çalışmamıştır. Körlük kuralı üçü için de aynı — kimlik tahmini yok.</p>
    </section>
  ),

  /* 14 · Etik */
  (active) => (
    <section className={cx("slide", active)}>
      <div className="gutter"><span className="num">14</span><span className="sec">Etik</span></div>
      <h2>Sınır: hakem gizliliği</h2>
      <div className="rule"></div>
      <div className="warnbox">
        <p><b>Değerlendirme aşamasındaki bir müsveddeyi, gizliliği güvence altına alınmayan bir yapay zekâ aracına yüklemek gizlilik ihlali sayılır.</b></p>
        <p className="small">ICMJE, hakemin müsvedde gizliliğini korumak zorunda olduğunu ve derginin açık izni olmadıkça müsveddeyi böyle araçlara yüklemesinin bu yükümlülüğe aykırı olabileceğini belirtir. COPE tartışmalarında da hakemlerin müsveddeyi YZ araçlarına yüklemesinin gizliliği ve yazarın metin üzerindeki haklarını ihlal edebileceği ifade edilir. Birçok yayınevi bunu yazılı olarak yasaklar; bir kısmı editör iznine bağlar.</p>
        <p className="small" style={{ marginBottom: "0" }}>Bu yüzden skill, hakem modunda işe başlamadan önce tek seferlik bir uyarı verir ve iki alternatif sunar: müsveddeyi paylaşmadan rapor dilini kurmak, ya da yalnızca anonimleştirilmiş yöntem bölümünü tartışmak.</p>
      </div>
      <ul style={{ marginTop: "22px" }}>
        <li className="tight">Kendi makaleniz, kendi teziniz, kendi öğrencinizin ödevi — bu sınır orada çalışmaz.</li>
        <li className="tight">Karar insanın: kabul/ret editörün, not öğretim elemanının. Skill gerekçeli öneri üretir.</li>
        <li className="tight">Kişisel veri içeren metinlerde KVKK yükümlülüğü sizde kalır.</li>
      </ul>
      <div className="src">icmje.org/recommendations · publicationethics.org</div>
    </section>
  ),

  /* 15 · Uygulama */
  (active) => (
    <section className={cx("slide", active)}>
      <div className="gutter"><span className="num">15</span><span className="sec">Uygulama</span></div>
      <h2>Akademisyen için başka ne yazılır?</h2>
      <div className="rule"></div>
      <p className="small" style={{ marginBottom: "20px", maxWidth: "70ch" }}>Ölçüt: tekrar eden ve her seferinde aynı biçimde yapılması gereken her iş bir skill adayıdır.</p>
      <div className="cols">
        <ul>
          <li className="tight"><b>Hakem yanıtı.</b> Gelen raporun her maddesine sırayla, numarasıyla ve değişiklik yerini göstererek cevap.</li>
          <li className="tight"><b>Tez biçim denetimi.</b> Enstitünün yazım kılavuzunu skill'e koyup her bölümü ona göre kontrol.</li>
          <li className="tight"><b>Proje başvurusu denetimi.</b> TÜBİTAK veya BAP formunun değerlendirme ölçütleriyle öz-denetim.</li>
        </ul>
        <ul>
          <li className="tight"><b>Ders materyali.</b> Kazanımlara bağlı ders planı, etkinlik ve ölçme aracı üretimi.</li>
          <li className="tight"><b>Sınav ve rubrik.</b> Bloom düzeylerine dağıtılmış soru bankası ve puanlama anahtarı.</li>
          <li className="tight"><b>Terim tutarlılığı.</b> Türkçe-İngilizce akademik çeviride alan sözlüğünüzü sabitleyen skill.</li>
        </ul>
      </div>
      <p className="small" style={{ marginTop: "22px" }}>Bölüm düzeyinde tek bir "yazım kılavuzu" skill'i, aynı ölçütlerle çalışan bir ekip demektir.</p>
    </section>
  ),

  /* 16 · Başlangıç */
  (active) => (
    <section className={cx("slide", active)}>
      <div className="gutter"><span className="num">16</span><span className="sec">Başlangıç</span></div>
      <h2>Kendi skill'iniz: beş adım</h2>
      <div className="rule"></div>
      <ol className="steps">
        <li><b>Tekrar eden bir işi seçin.</b> Bu hafta iki kez yaptığınız, üç ay sonra yine yapacağınız bir iş.</li>
        <li><b>O işi bir kez Claude ile yapın</b> ve düzeltmelerinizi not edin. Düzeltmeler skill'in gövdesi olacak.</li>
        <li><b>"Bunu bir skill'e çevir" deyin.</b> Klasörü, SKILL.md'yi ve açıklama alanını sizin için hazırlar.</li>
        <li><b>Yükleyin ve gerçek bir işle sınayın.</b> Devreye girmiyorsa sorun neredeyse her zaman açıklama alanındadır.</li>
        <li><b>Kullandıkça düzeltin.</b> Skill'i mükemmel doğmuş bir metin değil, her kullanımda biraz daha sizin olan bir belge gibi düşünün.</li>
      </ol>
      <p className="small" style={{ marginTop: "8px" }}>İlk çalışan sürüm tipik olarak yarım saat içinde çıkar. Uzun olan iyi değil; sizin çalışma biçiminizi anlatan iyi.</p>
    </section>
  ),

  /* 17 · Kapanış */
  (active) => (
    <section className={cx("slide", active)}>
      <div className="gutter"><span className="num">17</span><span className="sec">Kapanış</span></div>
      <h2>Özetle</h2>
      <div className="rule"></div>
      <div className="close-grid">
        <ul>
          <li>Skill, Claude'a çalışma biçiminizi bir kez anlatıp her seferinde aynı titizlikte tekrar ettirmenin yolu.</li>
          <li>Bir klasör ve bir Markdown dosyası. Kod gerekmiyor, taşınabiliyor, paylaşılabiliyor.</li>
          <li>Açıklama alanı skill'in kaderini belirliyor; kullanıcının yazacağı cümleleri oraya koyun.</li>
          <li>Değerlendirme skill'i bulgu üretir, karar üretmez. Karar insanda kalır — ve hakem gizliliği her şeyin önünde gelir.</li>
        </ul>
        <div className="contact">
          <b>Osman Can Çetlenbik</b><br />
          Öğr. Gör., Manisa Celal Bayar Üniversitesi<br />
          Manisa Teknik Bilimler MYO<br /><br />
          osman.cetlenbik@cbu.edu.tr<br />
          ORCID 0009-0000-6561-1943<br />
          <a href="https://osmancancetlenbik.com">osmancancetlenbik.com</a>
        </div>
      </div>
    </section>
  ),

  /* 18 · İndir — özgün sunumda yoktu; skill paketi ve PDF siteden
     indirilebilsin diye eklendi. */
  (active) => (
    <section className={cx("slide", active)}>
      <div className="gutter"><span className="num">18</span><span className="sec">İndir</span></div>
      <h2>Skill&apos;i indirin, deneyin, kendinize göre değiştirin</h2>
      <div className="rule"></div>
      <p className="lead" style={{ marginBottom: "22px" }}>
        Sunumda anlatılan <code className="inline">makale-degerlendirme</code> skill&apos;i
        olduğu gibi burada. Claude.ai&apos;de <b>Customize → Skills → Upload</b>{" "}ile
        ZIP&apos;i yükleyin; Claude Code&apos;da klasörü{" "}
        <code className="inline">~/.claude/skills/</code> altına açın.
      </p>
      <div className="dl">
        <a href="/dosyalar/makale-degerlendirme.zip" download>
          <span className="t">makale-degerlendirme.zip</span>
          <span className="d">
            SKILL.md ve beş yardımcı dosya: rapor şablonları, kontrol listeleri,
            istatistik ve yöntem tuzakları, etik ve yayın bütünlüğü, puanlama
            rubriği. Dört mod: hakem, panel, öndenetim, tez.
          </span>
          <span className="f">ZIP · 27 KB · MIT</span>
        </a>
        <a href="/dosyalar/claude-skills-akademik-sunum.pdf" download>
          <span className="t">Sunumun PDF&apos;i</span>
          <span className="d">
            Bu 17 slaytın basılabilir hâli. Bölüm toplantısında dağıtmak ya da
            bir meslektaşa iletmek için.
          </span>
          <span className="f">PDF · 8 sayfa · 184 KB</span>
        </a>
      </div>
      <p className="small" style={{ marginTop: "22px", maxWidth: "70ch" }}>
        Skill&apos;i değiştirip kullanın; işe yaradıysa ya da bir boyut eksikse
        yazın: osman.cetlenbik@cbu.edu.tr. Hakem gizliliği uyarısı skill&apos;in
        içinde — hakem modunda işe başlamadan önce kendisi hatırlatıyor.
      </p>
    </section>
  ),
];

export default function Presentation() {
  const search = useSearchParams();
  const printMode = search.get("yazdir") === "1";
  const deck = useDeck(slides.length);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fit = () =>
      setScale(Math.min(window.innerWidth / W, window.innerHeight / H));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  if (printMode) {
    return (
      <div className="cs-root cs-print">
        <div className="cs-stage">
          <div className="cs-deck">
            {slides.map((render, i) => (
              <div key={i}>{render(true)}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const { current, total } = deck;

  return (
    <div className="cs-root" {...deck.touchHandlers}>
      <div className="cs-stage">
        <div className="cs-deck" style={{ transform: `scale(${scale})` }}>
          {slides[current]?.(true)}
        </div>
      </div>

      <button
        onClick={deck.prev}
        disabled={current === 0}
        aria-label="Önceki slayt"
        className="cs-edge"
        style={{ left: 0 }}
      />
      <button
        onClick={deck.next}
        disabled={current === total - 1}
        aria-label="Sonraki slayt"
        className="cs-edge"
        style={{ right: 0 }}
      />

      <div
        className="cs-bar"
        style={{ width: `${((current + 1) / total) * 100}%` }}
      />
      <div className="cs-hint" aria-hidden>
        ← → gezin · F tam ekran
      </div>
      <div className="cs-hud">
        <span>
          {current + 1} / {total}
        </span>
        <a href="?yazdir=1" title="Yazdır / PDF olarak kaydet">
          PDF
        </a>
        <button
          onClick={deck.toggleFullscreen}
          aria-label={deck.isFullscreen ? "Tam ekrandan çık" : "Tam ekran"}
        >
          {deck.isFullscreen ? "⤡" : "⤢"}
        </button>
        <button onClick={deck.prev} disabled={current === 0} aria-label="Önceki">
          ‹
        </button>
        <button
          onClick={deck.next}
          disabled={current === total - 1}
          aria-label="Sonraki"
        >
          ›
        </button>
      </div>
    </div>
  );
}
