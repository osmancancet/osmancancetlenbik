"use client";

import { useMemo, useState } from "react";
import { BookX, Trash2 } from "lucide-react";
import {
  OKUMA_HIZI,
  SUNUM_HIZI,
  enSikKelimeler,
  hesapla,
  kaynakcayiAyir,
  sureMetni,
} from "./istatistik";

/**
 * Metin istatistikleri arayüzü.
 *
 * Metin hiçbir yere gönderilmiyor; sayım her tuş vuruşunda tarayıcıda
 * yapılıyor. Aracın Word'den farkı iki yerde: kaynakçayı sayımın dışında
 * bırakabilmesi ve dergi kelime sınırını gözle görülür bir çubuğa
 * bağlaması — akademisyenin asıl sorusu "sınırı aştım mı" oluyor.
 */

const ORNEK = `Bu çalışma, uzaktan öğretimde öğrenci katılımını inceleyen bir alan araştırmasıdır. Katılım, öğrencinin derse ayırdığı süre ve etkileşim sıklığı üzerinden ölçülmüştür.

Araştırmaya 2023-2024 güz döneminde 148 lisans öğrencisi katılmıştır. Veriler çevrim içi anket ile toplanmış, çözümlemede betimsel istatistikler kullanılmıştır. Bulgular, katılımın ders saatinden çok geri bildirim sıklığıyla ilişkili olduğunu göstermektedir.

Kaynakça

Yılmaz, A. (2022). Uzaktan öğretimde etkileşim. Ankara: Örnek Yayınları.
Öztürk, M. (2021). Çevrim içi derslerde katılım. Eğitim Dergisi, 14(2), 33-51.`;

/** Tek bir gösterge kutusu — hepsi aynı biçimde okunuyor. */
function Gosterge({
  etiket,
  deger,
  alt,
}: {
  etiket: string;
  deger: string;
  alt?: string;
}) {
  return (
    <div className="card rounded-lg px-4 py-3">
      <div className="text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
        {etiket}
      </div>
      <div className="mt-1 text-xl font-semibold text-[var(--fg)] tabular-nums">
        {deger}
      </div>
      {alt && (
        <div className="mt-0.5 text-xs text-[var(--fg-subtle)]">{alt}</div>
      )}
    </div>
  );
}

export function MetinIstatistikleriClient() {
  const [girdi, setGirdi] = useState("");
  const [kaynakcaHaric, setKaynakcaHaric] = useState(true);
  const [sinirMetni, setSinirMetni] = useState("");

  // Uzun tezlerde sayım hissedilir maliyetli; girdi değişmedikçe tekrar
  // hesaplanmasın diye useMemo ile sarıldı.
  const ayrim = useMemo(() => kaynakcayiAyir(girdi), [girdi]);

  // Kaynakça başlığı yoksa onay kutusunun bir hükmü yok: tüm metin sayılır.
  const kaynakcaAtildi = kaynakcaHaric && ayrim.baslik !== null;
  const sayilan = kaynakcaAtildi ? ayrim.sayilan : girdi;

  const ist = useMemo(() => hesapla(sayilan), [sayilan]);
  const sik = useMemo(() => enSikKelimeler(sayilan, 15), [sayilan]);

  const sinir = Number(sinirMetni);
  const sinirGecerli = Number.isFinite(sinir) && sinir > 0;
  const kalan = sinirGecerli ? sinir - ist.kelime : 0;
  const yuzde = sinirGecerli ? (ist.kelime / sinir) * 100 : 0;
  const asildi = sinirGecerli && kalan < 0;
  // Sınıra yaklaşırken uyarmak, aştıktan sonra uyarmaktan daha işe yarıyor.
  const yaklasti = sinirGecerli && !asildi && yuzde >= 90;

  const enYuksekSiklik = sik.length > 0 ? sik[0].sayi : 0;

  return (
    <div className="space-y-6">
      {/* Girdi */}
      <div>
        <div className="flex items-end justify-between gap-3 mb-2">
          <label
            htmlFor="kaynak-metin"
            className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)]"
          >
            Metniniz
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setGirdi(ORNEK);
                setSinirMetni("6000");
              }}
              className="text-xs text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
            >
              Örnek doldur
            </button>
            <button
              type="button"
              onClick={() => setGirdi("")}
              aria-label="Metni temizle"
              className="p-1.5 rounded-md text-[var(--fg-muted)] hover:text-[var(--accent)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <textarea
          id="kaynak-metin"
          value={girdi}
          onChange={(e) => setGirdi(e.target.value)}
          rows={14}
          placeholder="Metninizi buraya yapıştırın ya da yazmaya başlayın. Sayılar yazdıkça güncellenir."
          className="w-full px-4 py-3 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm leading-relaxed focus:outline-none focus:border-[var(--accent)]"
        />
      </div>

      {/* Kaynakça dışlama */}
      <div className="flex items-start gap-2.5">
        <input
          type="checkbox"
          id="kaynakca-haric"
          checked={kaynakcaHaric}
          onChange={(e) => setKaynakcaHaric(e.target.checked)}
          className="mt-0.5 w-4 h-4 shrink-0 accent-[var(--accent)]"
        />
        <label
          htmlFor="kaynakca-haric"
          className="text-sm text-[var(--fg)] leading-snug cursor-pointer"
        >
          Kaynakça bölümünü sayma
          <span className="block text-xs text-[var(--fg-subtle)] mt-0.5">
            Kendi satırında duran{" "}
            <span className="text-[var(--fg-muted)]">Kaynakça</span>,{" "}
            <span className="text-[var(--fg-muted)]">Kaynaklar</span>,{" "}
            <span className="text-[var(--fg-muted)]">References</span> ya da{" "}
            <span className="text-[var(--fg-muted)]">Bibliography</span>{" "}
            başlığından sonrası sayıma girmez.
          </span>
        </label>
      </div>

      {kaynakcaHaric && girdi.trim() !== "" && (
        <div
          className={`border-s-[3px] rounded-e-md px-5 py-3 flex items-start gap-3 ${
            kaynakcaAtildi
              ? "border-[var(--accent)] bg-[var(--accent-soft)]"
              : "border-[var(--border-strong)] bg-[var(--bg-card)]"
          }`}
        >
          <BookX className="w-4 h-4 mt-0.5 shrink-0 text-[var(--accent)]" />
          <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
            {kaynakcaAtildi ? (
              <>
                <strong className="text-[var(--fg)]">
                  &ldquo;{ayrim.baslik}&rdquo;
                </strong>{" "}
                başlığı bulundu; sonrasındaki{" "}
                <strong className="text-[var(--accent)]">
                  {hesapla(ayrim.atilan).kelime}
                </strong>{" "}
                kelime sayıma katılmadı.
              </>
            ) : (
              <>
                Kaynakça başlığı bulunamadı; metnin tamamı sayılıyor. Başlık
                kendi satırında ve tek başına yazılmış olmalı.
              </>
            )}
          </p>
        </div>
      )}

      {/* Göstergeler */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <Gosterge etiket="Kelime" deger={ist.kelime.toLocaleString("tr-TR")} />
        <Gosterge
          etiket="Karakter"
          deger={ist.karakterBosluklu.toLocaleString("tr-TR")}
          alt="boşluklu"
        />
        <Gosterge
          etiket="Karakter"
          deger={ist.karakterBosluksuz.toLocaleString("tr-TR")}
          alt="boşluksuz"
        />
        <Gosterge etiket="Cümle" deger={ist.cumle.toLocaleString("tr-TR")} />
        <Gosterge
          etiket="Paragraf"
          deger={ist.paragraf.toLocaleString("tr-TR")}
        />
        <Gosterge
          etiket="Ort. kelime"
          deger={`${ist.ortKelimeUzunlugu}`}
          alt="harf / kelime"
        />
        <Gosterge
          etiket="Ort. cümle"
          deger={`${ist.ortCumleUzunlugu}`}
          alt="kelime / cümle"
        />
        <Gosterge
          etiket="Okuma süresi"
          deger={sureMetni(ist.okumaSaniye)}
          alt={`dakikada ${OKUMA_HIZI} kelime`}
        />
        <Gosterge
          etiket="Sunum süresi"
          deger={sureMetni(ist.sunumSaniye)}
          alt={`dakikada ${SUNUM_HIZI} kelime`}
        />
      </div>

      {/* Dergi kelime sınırı */}
      <div className="card rounded-lg px-5 py-4">
        <label
          htmlFor="kelime-siniri"
          className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2"
        >
          Dergi kelime sınırı
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <input
            id="kelime-siniri"
            type="number"
            min={1}
            step={100}
            inputMode="numeric"
            value={sinirMetni}
            onChange={(e) => setSinirMetni(e.target.value)}
            placeholder="6000"
            className="w-40 px-4 py-2.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm font-mono focus:outline-none focus:border-[var(--accent)]"
          />
          {sinirGecerli && (
            <p
              className={`text-sm ${
                asildi ? "text-red-400" : "text-[var(--fg-muted)]"
              }`}
            >
              {asildi ? (
                <>
                  <strong>{Math.abs(kalan).toLocaleString("tr-TR")} kelime</strong>{" "}
                  aşıldı
                </>
              ) : (
                <>
                  <strong className="text-[var(--fg)]">
                    {kalan.toLocaleString("tr-TR")} kelime
                  </strong>{" "}
                  hakkınız kaldı
                </>
              )}{" "}
              · %{Math.round(yuzde)}
            </p>
          )}
        </div>

        {sinirGecerli && (
          <>
            <div
              className="mt-3 h-2 w-full rounded-full bg-[var(--border)] overflow-hidden"
              role="progressbar"
              aria-valuenow={Math.round(yuzde)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Kelime sınırının doluluk oranı"
            >
              <div
                className={`h-full rounded-full transition-[width] duration-200 ${
                  asildi
                    ? "bg-red-500"
                    : yaklasti
                      ? "bg-yellow-500"
                      : "bg-[var(--accent)]"
                }`}
                style={{ width: `${Math.min(100, yuzde)}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-[var(--fg-subtle)]">
              {asildi
                ? "Sınır aşıldı. Kısaltmanız gereken kelime sayısı yukarıda."
                : yaklasti
                  ? "Sınıra yaklaştınız."
                  : "Sayım, yukarıdaki kaynakça ayarına göre yapılır."}
            </p>
          </>
        )}
      </div>

      {/* En sık kelimeler */}
      {sik.length > 0 && (
        <div className="card rounded-lg px-5 py-4">
          <h2 className="text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
            En sık geçen 15 kelime
          </h2>
          <ul className="mt-3 space-y-1.5">
            {sik.map((satir) => (
              <li key={satir.kelime} className="flex items-center gap-3">
                <span className="w-40 shrink-0 text-sm text-[var(--fg)] truncate">
                  {satir.kelime}
                </span>
                <span className="flex-1 h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                  <span
                    className="block h-full rounded-full bg-[var(--accent)]"
                    style={{
                      width: `${(satir.sayi / enYuksekSiklik) * 100}%`,
                    }}
                  />
                </span>
                <span className="w-10 shrink-0 text-right text-sm tabular-nums text-[var(--fg-muted)]">
                  {satir.sayi}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-[var(--fg-subtle)] leading-relaxed">
            Bağlaç ve edatlar (ve, ile, bu, bir, için, olarak, daha, çok, gibi,
            ancak, ayrıca, ise, de, da, ki, mi) listeden düşülür. Aynı kelimenin
            çekimli biçimleri ayrı sayılır — &ldquo;öğrenci&rdquo; ve
            &ldquo;öğrencinin&rdquo; iki farklı satırdır.
          </p>
        </div>
      )}
    </div>
  );
}
