"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Download, Plus, Trash2 } from "lucide-react";
import {
  ayristir,
  bicimle,
  csvUret,
  hesapla,
  VARSAYILAN_BILESENLER,
  VARSAYILAN_OLCEK,
  type Bilesen,
  type HarfKurali,
} from "./hesap";

/**
 * Not hesaplayıcı arayüzü.
 *
 * Tasarım kararı: "Hesapla" düğmesi yok, sonuç yazdıkça güncelleniyor.
 * Neden: eğitmen ağırlık ya da eşik oynattığında harf dağılımının nasıl
 * değiştiğini anında görmek istiyor; bu aracın asıl işi zaten o denemeyi
 * kolaylaştırmak. Hesap tarayıcıda ve saf fonksiyonlarla yapıldığı için
 * her tuş vuruşunda yeniden hesaplamak ucuz.
 */

const ORNEK = `Ad Soyad,Vize,Final
Ayşe Yılmaz,80,90
Mehmet Öztürk,60,70
Zeynep Şahin,45,55`;

/** Ağırlık toplamının 100'den sapması bu kadarın altındaysa uyarı vermiyoruz. */
const TOLERANS = 0.001;

export function NotHesaplayiciClient() {
  const [bilesenler, setBilesenler] = useState<Bilesen[]>(VARSAYILAN_BILESENLER);
  const [olcek, setOlcek] = useState<HarfKurali[]>(VARSAYILAN_OLCEK);
  const [metin, setMetin] = useState("");
  const [canAcik, setCanAcik] = useState(false);
  const [hedef, setHedef] = useState(70);
  const [olcekAcik, setOlcekAcik] = useState(false);

  const toplamAgirlik = bilesenler.reduce((t, b) => t + b.agirlik, 0);
  const agirlikSorunlu = Math.abs(toplamAgirlik - 100) > TOLERANS;

  const ayrisim = useMemo(
    () => (metin.trim() ? ayristir(metin, bilesenler.length) : null),
    [metin, bilesenler.length]
  );

  const sonuc = useMemo(
    () =>
      ayrisim && ayrisim.ogrenciler.length > 0
        ? hesapla(ayrisim.ogrenciler, bilesenler, olcek, {
            acik: canAcik,
            hedef,
          })
        : null,
    [ayrisim, bilesenler, olcek, canAcik, hedef]
  );

  function bilesenGuncelle(id: string, yama: Partial<Bilesen>) {
    setBilesenler((mevcut) =>
      mevcut.map((b) => (b.id === id ? { ...b, ...yama } : b))
    );
  }

  function bilesenEkle() {
    setBilesenler((mevcut) => [
      ...mevcut,
      {
        // Zaman damgası + uzunluk: silme sonrası da çakışmayan basit bir kimlik.
        id: `b${Date.now()}${mevcut.length}`,
        ad: `Bileşen ${mevcut.length + 1}`,
        agirlik: 0,
      },
    ]);
  }

  function bilesenSil(id: string) {
    setBilesenler((mevcut) =>
      mevcut.length > 1 ? mevcut.filter((b) => b.id !== id) : mevcut
    );
  }

  function olcekGuncelle(i: number, yama: Partial<HarfKurali>) {
    setOlcek((mevcut) => mevcut.map((k, j) => (j === i ? { ...k, ...yama } : k)));
  }

  function csvIndir() {
    if (!sonuc) return;
    const icerik = csvUret(sonuc.satirlar, bilesenler, canAcik);
    // BOM'u koruyabilmek için Blob'a UTF-8 olarak veriyoruz; charset'i de
    // yazıyoruz ki Excel dışındaki araçlar da doğru okusun.
    const blob = new Blob([icerik], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "notlar.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-8">
      {/* 1 — Değerlendirme bileşenleri */}
      <section className="space-y-3">
        <h2 className="text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
          Değerlendirme bileşenleri
        </h2>

        <ul className="space-y-2">
          {bilesenler.map((b, i) => (
            <li key={b.id} className="flex items-center gap-2">
              <label htmlFor={`bilesen-ad-${b.id}`} className="sr-only">
                {i + 1}. bileşenin adı
              </label>
              <input
                id={`bilesen-ad-${b.id}`}
                value={b.ad}
                onChange={(e) => bilesenGuncelle(b.id, { ad: e.target.value })}
                className="flex-1 px-3 py-2 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm focus:outline-none focus:border-[var(--accent)]"
              />
              <label htmlFor={`bilesen-agirlik-${b.id}`} className="sr-only">
                {b.ad} ağırlığı (yüzde)
              </label>
              <div className="relative">
                <input
                  id={`bilesen-agirlik-${b.id}`}
                  type="number"
                  min={0}
                  max={100}
                  value={b.agirlik}
                  onChange={(e) =>
                    bilesenGuncelle(b.id, {
                      agirlik: Number(e.target.value) || 0,
                    })
                  }
                  className="w-24 ps-3 pe-7 py-2 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm tabular-nums focus:outline-none focus:border-[var(--accent)]"
                />
                <span className="pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 text-xs text-[var(--fg-subtle)]">
                  %
                </span>
              </div>
              <button
                type="button"
                onClick={() => bilesenSil(b.id)}
                disabled={bilesenler.length === 1}
                aria-label={`${b.ad} bileşenini sil`}
                className="p-2 rounded-md border border-[var(--border-strong)] text-[var(--fg-subtle)] hover:text-red-400 hover:border-red-400/50 transition-colors disabled:opacity-30 disabled:hover:text-[var(--fg-subtle)] disabled:hover:border-[var(--border-strong)]"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <button
            type="button"
            onClick={bilesenEkle}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-[var(--border-strong)] text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Bileşen ekle
          </button>
          <span
            className={`text-sm tabular-nums ${
              agirlikSorunlu ? "text-yellow-500" : "text-[var(--fg-muted)]"
            }`}
          >
            Toplam ağırlık: %{bicimle(toplamAgirlik, 0)}
          </span>
        </div>

        {agirlikSorunlu && (
          <div className="border-s-[3px] border-yellow-500 bg-yellow-500/10 rounded-e-md px-4 py-3 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-yellow-500" />
            <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
              Ağırlık toplamı 100 değil. Hesap yine de yapılıyor — ağırlıklar
              kendi toplamlarına (%{bicimle(toplamAgirlik, 0)}) bölünerek
              normalleştiriliyor. Bilerek yaptıysanız sorun yok.
            </p>
          </div>
        )}
      </section>

      {/* 2 — Öğrenci notları */}
      <section className="space-y-2">
        <label
          htmlFor="notlar"
          className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)]"
        >
          Öğrenci notları
        </label>
        <textarea
          id="notlar"
          value={metin}
          onChange={(e) => setMetin(e.target.value)}
          rows={9}
          placeholder={`Her satır bir öğrenci. İlk sütun ad, sonrakiler bileşen notları.
Excel'den doğrudan yapıştırabilirsiniz.

${ORNEK}`}
          className="w-full px-4 py-3 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm font-mono leading-relaxed focus:outline-none focus:border-[var(--accent)]"
        />
        <div className="flex items-center gap-4 flex-wrap">
          <button
            type="button"
            onClick={() => setMetin(ORNEK)}
            className="text-xs text-[var(--accent)] hover:underline"
          >
            Örnek veriyi doldur
          </button>
          <p className="text-xs text-[var(--fg-subtle)]">
            Sütunlar virgül, noktalı virgül ya da sekme ile ayrılabilir. Başlık
            satırı varsa otomatik atlanır.
          </p>
        </div>

        {ayrisim && (
          <p className="text-xs text-[var(--fg-subtle)]">
            {ayrisim.ogrenciler.length} öğrenci okundu · ayraç: {ayrisim.ayrac}
            {ayrisim.baslikAtlandi ? " · başlık satırı atlandı" : ""}
          </p>
        )}

        {ayrisim && ayrisim.uyarilar.length > 0 && (
          <ul className="border-s-[3px] border-yellow-500 bg-yellow-500/10 rounded-e-md px-4 py-3 space-y-1">
            {ayrisim.uyarilar.map((u) => (
              <li key={u} className="text-xs text-[var(--fg-muted)]">
                {u}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 3 — Harf notu ölçeği */}
      <section className="space-y-3">
        <button
          type="button"
          onClick={() => setOlcekAcik((v) => !v)}
          aria-expanded={olcekAcik}
          className="text-xs uppercase tracking-wider text-[var(--fg-subtle)] hover:text-[var(--accent)] transition-colors"
        >
          Harf notu ölçeği {olcekAcik ? "−" : "+"}
        </button>

        {olcekAcik ? (
          <div className="card rounded-lg p-4 space-y-3">
            <p className="text-xs text-[var(--fg-subtle)]">
              Her harf için alt sınır. Bir puan, sınırını geçtiği en yüksek
              harfi alır.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {olcek.map((k, i) => (
                <div key={k.harf} className="flex items-center gap-2">
                  <label
                    htmlFor={`olcek-${k.harf}`}
                    className="w-8 text-sm font-semibold text-[var(--fg)]"
                  >
                    {k.harf}
                  </label>
                  <input
                    id={`olcek-${k.harf}`}
                    type="number"
                    min={0}
                    max={100}
                    value={k.min}
                    onChange={(e) =>
                      olcekGuncelle(i, { min: Number(e.target.value) || 0 })
                    }
                    className="w-full px-2 py-1.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm tabular-nums focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setOlcek(VARSAYILAN_OLCEK)}
              className="text-xs text-[var(--accent)] hover:underline"
            >
              Varsayılan ölçeğe dön
            </button>
          </div>
        ) : (
          <p className="text-xs text-[var(--fg-muted)]">
            {[...olcek]
              .sort((a, b) => b.min - a.min)
              .map((k) => `${k.harf} ${k.min}+`)
              .join(" · ")}
          </p>
        )}
      </section>

      {/* 4 — Çan eğrisi */}
      <section className="card rounded-lg p-4 space-y-3">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={canAcik}
            onChange={(e) => setCanAcik(e.target.checked)}
            className="w-4 h-4 accent-[var(--accent)]"
          />
          <span className="text-sm font-medium text-[var(--fg)]">
            Çan eğrisi uygula
          </span>
        </label>

        {canAcik && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <label
                htmlFor="hedef-ortalama"
                className="text-sm text-[var(--fg-muted)]"
              >
                Hedef sınıf ortalaması
              </label>
              <input
                id="hedef-ortalama"
                type="number"
                min={0}
                max={100}
                value={hedef}
                onChange={(e) => setHedef(Number(e.target.value) || 0)}
                className="w-24 px-3 py-1.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm tabular-nums focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
            <p className="text-xs text-[var(--fg-subtle)] leading-relaxed">
              Uygulanan yöntem: her nota sabit bir puan eklenir (doğrusal
              kaydırma). Sıralama ve notlar arası fark değişmez, yalnızca sınıf
              ortalaması hedefe taşınır. 100&apos;ü aşan notlar 100&apos;e
              sabitlenir.
            </p>
          </div>
        )}
      </section>

      {/* 5 — Sonuçlar */}
      {sonuc && sonuc.ozet && (
        <section className="space-y-5">
          {canAcik && (
            <div className="border-s-[3px] border-[var(--accent)] bg-[var(--accent)]/10 rounded-e-md px-4 py-3">
              <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
                <strong className="text-[var(--fg)]">
                  Kaydırma: {sonuc.can.kaydirma >= 0 ? "+" : ""}
                  {bicimle(sonuc.can.kaydirma)} puan.
                </strong>{" "}
                Sınıf ortalaması {bicimle(sonuc.can.oncekiOrtalama)} →{" "}
                {bicimle(sonuc.can.sonrakiOrtalama)} (hedef {hedef}).
                {sonuc.can.tavanaTakilan > 0 && (
                  <>
                    {" "}
                    {sonuc.can.tavanaTakilan} öğrencinin notu 100&apos;ü aştığı
                    için 100&apos;e sabitlendi; bu yüzden gerçekleşen ortalama
                    hedefin altında kaldı.
                  </>
                )}
              </p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3">
            <Kutu
              etiket="Sınıf ortalaması"
              deger={bicimle(sonuc.ozet.sinifOrtalamasi)}
            />
            <Kutu etiket="En yüksek" deger={bicimle(sonuc.ozet.enYuksek)} />
            <Kutu etiket="En düşük" deger={bicimle(sonuc.ozet.enDusuk)} />
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2">
              Harf notu dağılımı
            </h3>
            <div className="flex flex-wrap gap-2">
              {[...olcek]
                .sort((a, b) => b.min - a.min)
                .map((k) => (
                  <span
                    key={k.harf}
                    className={`px-2.5 py-1 rounded-md border text-xs tabular-nums ${
                      (sonuc.ozet?.dagilim[k.harf] ?? 0) > 0
                        ? "border-[var(--accent)]/40 text-[var(--fg)]"
                        : "border-[var(--border)] text-[var(--fg-subtle)]"
                    }`}
                  >
                    {k.harf}: {sonuc.ozet?.dagilim[k.harf] ?? 0}
                  </span>
                ))}
            </div>
          </div>

          <div className="overflow-x-auto card rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border-strong)]">
                  <th
                    scope="col"
                    className="text-start font-medium text-[var(--fg-subtle)] text-xs uppercase tracking-wider px-4 py-3"
                  >
                    Ad
                  </th>
                  {bilesenler.map((b) => (
                    <th
                      key={b.id}
                      scope="col"
                      className="text-end font-medium text-[var(--fg-subtle)] text-xs uppercase tracking-wider px-4 py-3 whitespace-nowrap"
                    >
                      {b.ad} <span className="opacity-60">%{b.agirlik}</span>
                    </th>
                  ))}
                  <th
                    scope="col"
                    className="text-end font-medium text-[var(--fg-subtle)] text-xs uppercase tracking-wider px-4 py-3 whitespace-nowrap"
                  >
                    Ortalama
                  </th>
                  {canAcik && (
                    <th
                      scope="col"
                      className="text-end font-medium text-[var(--fg-subtle)] text-xs uppercase tracking-wider px-4 py-3 whitespace-nowrap"
                    >
                      Çan sonrası
                    </th>
                  )}
                  <th
                    scope="col"
                    className="text-end font-medium text-[var(--fg-subtle)] text-xs uppercase tracking-wider px-4 py-3"
                  >
                    Harf
                  </th>
                </tr>
              </thead>
              <tbody>
                {sonuc.satirlar.map((s, i) => (
                  <tr
                    key={`${s.ad}-${i}`}
                    className="border-b border-[var(--border)] last:border-0"
                  >
                    <th
                      scope="row"
                      className="text-start font-normal text-[var(--fg)] px-4 py-2.5"
                    >
                      {s.ad}
                    </th>
                    {s.notlar.map((n, j) => (
                      <td
                        key={bilesenler[j]?.id ?? j}
                        className="text-end text-[var(--fg-muted)] tabular-nums px-4 py-2.5"
                      >
                        {n === null ? "—" : bicimle(n, 0)}
                      </td>
                    ))}
                    <td className="text-end text-[var(--fg-muted)] tabular-nums px-4 py-2.5">
                      {bicimle(s.hamOrtalama)}
                    </td>
                    {canAcik && (
                      <td className="text-end text-[var(--fg)] tabular-nums px-4 py-2.5">
                        {bicimle(s.ortalama)}
                      </td>
                    )}
                    <td className="text-end font-semibold text-[var(--accent)] px-4 py-2.5">
                      {s.harf}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={csvIndir}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg)] font-semibold rounded-md hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" />
              CSV indir
            </button>
            <span className="text-xs text-[var(--fg-subtle)]">
              Excel uyumlu: UTF-8 BOM&apos;lu, noktalı virgül ayraçlı, ondalık
              virgüllü.
            </span>
          </div>
        </section>
      )}
    </div>
  );
}

function Kutu({ etiket, deger }: { etiket: string; deger: string }) {
  return (
    <div className="card rounded-lg px-4 py-3 text-center">
      <div className="text-2xl font-semibold text-[var(--fg)] tabular-nums">
        {deger}
      </div>
      <div className="text-[11px] uppercase tracking-wider text-[var(--fg-subtle)] mt-0.5">
        {etiket}
      </div>
    </div>
  );
}
