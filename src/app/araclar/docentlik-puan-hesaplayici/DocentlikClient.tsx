"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  CircleCheck,
  CircleX,
  Copy,
  ExternalLink,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import {
  DONEM,
  DR_SONRASI_ASGARI,
  KAYNAK_URL,
  TEMEL_ALANLAR,
  TOPLAM_ASGARI,
  temelAlanBul,
  yuvarla,
  type Kayit,
  type Madde,
  type Rol,
  type TemelAlan,
} from "./kriterler";
import { hesapla, ozetMetni, yazarPayi, type HesapSonucu } from "./hesap";

/**
 * Doçentlik puan hesaplayıcı arayüzü.
 *
 * Kayıtlar tarayıcıda (localStorage) tutuluyor; başvuru dosyası haftalarca
 * hazırlandığı için sekme kapanınca sıfırlanmamalı. Alan değişince kayıtlar
 * korunuyor — bent kodları ortak, olmayan bent varsa hesap onu atlıyor.
 */

const DEPO = "docentlik-hesap-v1";

type Durum = { alanId: string; altSecenek: string | null; kayitlar: Kayit[] };

const BASLANGIC: Durum = { alanId: "muhendislik", altSecenek: null, kayitlar: [] };

function yukle(): Durum {
  try {
    const ham = localStorage.getItem(DEPO);
    if (!ham) return BASLANGIC;
    const d = JSON.parse(ham) as Durum;
    if (!temelAlanBul(d.alanId) || !Array.isArray(d.kayitlar)) return BASLANGIC;
    return d;
  } catch {
    return BASLANGIC;
  }
}

let sayac = 0;
const yeniId = () => `${Date.now().toString(36)}-${(sayac++).toString(36)}`;

export function DocentlikClient() {
  const [durum, setDurum] = useState<Durum>(BASLANGIC);
  const [hazir, setHazir] = useState(false);
  const [acik, setAcik] = useState<Set<number>>(new Set([1, 2]));
  const [kopyalandi, setKopyalandi] = useState(false);

  useEffect(() => {
    setDurum(yukle());
    setHazir(true);
  }, []);

  useEffect(() => {
    if (!hazir) return;
    try {
      localStorage.setItem(DEPO, JSON.stringify(durum));
    } catch {
      // Özel pencere vb. — kayıt olmadan da çalışır.
    }
  }, [durum, hazir]);

  const alan = temelAlanBul(durum.alanId) ?? TEMEL_ALANLAR[0];
  const altSecenek =
    alan.altSecenekler &&
    (durum.altSecenek ?? alan.altSecenekler.secenekler[0].id);

  const sonuc = useMemo(
    () => hesapla(alan, durum.kayitlar, altSecenek ?? null),
    [alan, durum.kayitlar, altSecenek]
  );

  function ekle(madde: Madde, bentKod: string) {
    const k: Kayit = {
      id: yeniId(),
      maddeNo: madde.no,
      bentKod,
      adet: 1,
      yazarSayisi: 1,
      rol: "baslica",
      drSonrasi: true,
      esDanisman: false,
    };
    setDurum((d) => ({ ...d, kayitlar: [...d.kayitlar, k] }));
  }

  function guncelle(id: string, degisim: Partial<Kayit>) {
    setDurum((d) => ({
      ...d,
      kayitlar: d.kayitlar.map((k) => (k.id === id ? { ...k, ...degisim } : k)),
    }));
  }

  function sil(id: string) {
    setDurum((d) => ({ ...d, kayitlar: d.kayitlar.filter((k) => k.id !== id) }));
  }

  function sifirla() {
    if (durum.kayitlar.length && !window.confirm("Tüm kayıtlar silinsin mi?")) return;
    setDurum({ ...BASLANGIC, alanId: durum.alanId });
  }

  function acKapat(no: number) {
    setAcik((s) => {
      const y = new Set(s);
      if (y.has(no)) y.delete(no);
      else y.add(no);
      return y;
    });
  }

  async function kopyala() {
    try {
      await navigator.clipboard.writeText(ozetMetni(alan, sonuc, DONEM));
      setKopyalandi(true);
      window.setTimeout(() => setKopyalandi(false), 2500);
    } catch {
      // Pano izni yok; kullanıcı ekrandan okur.
    }
  }

  return (
    <div className="space-y-8">
      {/* Alan seçimi */}
      <section className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="temel-alan"
            className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2"
          >
            Temel alan
          </label>
          <select
            id="temel-alan"
            value={durum.alanId}
            onChange={(e) =>
              setDurum((d) => ({ ...d, alanId: e.target.value, altSecenek: null }))
            }
            className="w-full px-4 py-3 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm focus:outline-none focus:border-[var(--accent)]"
          >
            {TEMEL_ALANLAR.map((a) => (
              <option key={a.id} value={a.id}>
                {a.ad} (Tablo {a.tabloNo})
              </option>
            ))}
          </select>
        </div>
        {alan.altSecenekler && (
          <div>
            <label
              htmlFor="alt-secenek"
              className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2"
            >
              {alan.altSecenekler.etiket}
            </label>
            <select
              id="alt-secenek"
              value={altSecenek ?? ""}
              onChange={(e) => setDurum((d) => ({ ...d, altSecenek: e.target.value }))}
              className="w-full px-4 py-3 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm focus:outline-none focus:border-[var(--accent)]"
            >
              {alan.altSecenekler.secenekler.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.ad}
                </option>
              ))}
            </select>
          </div>
        )}
        <p className="sm:col-span-2 text-xs text-[var(--fg-subtle)] leading-relaxed">
          ÜAK {DONEM} dönemi tablosu. Yazar payı:{" "}
          {alan.yazarKurali === "kademeli"
            ? "makalelerde tek yazar tam, iki yazarda başlıca 0,8 / diğer 0,5, üç ve üzerinde başlıca yarısı, kalanı eşit; diğer yayınlarda eşit bölüşüm."
            : "çok yazarlı yayınlarda puan yazarlar arasında eşit bölünür."}{" "}
          Güzel Sanatlar tablosu yapısı farklı olduğu için burada yok.{" "}
          <a
            href={KAYNAK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[var(--fg-muted)] hover:text-[var(--accent)]"
          >
            ÜAK kaynak sayfası <ExternalLink className="w-3 h-3" />
          </a>
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px] items-start">
        {/* Maddeler */}
        <div className="space-y-3">
          {alan.maddeler.map((madde) => {
            const ms = sonuc.maddeler.find((m) => m.madde.no === madde.no)!;
            const kayitlar = sonuc.kayitlar.filter((k) => k.maddeNo === madde.no);
            const acikMi = acik.has(madde.no);
            return (
              <section
                key={madde.no}
                className="rounded-lg border border-[var(--border-strong)] bg-[var(--bg-card)]"
              >
                <button
                  type="button"
                  onClick={() => acKapat(madde.no)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-[var(--fg-subtle)] transition-transform ${
                        acikMi ? "rotate-180" : ""
                      }`}
                    />
                    <span className="font-medium text-[var(--fg)] truncate">
                      {madde.no}. {madde.ad}
                    </span>
                    {kayitlar.length > 0 && (
                      <span className="text-xs text-[var(--fg-subtle)]">
                        {kayitlar.length} kayıt
                      </span>
                    )}
                  </span>
                  <span className="text-sm tabular-nums shrink-0">
                    <span className={ms.puan > 0 ? "text-[var(--accent)]" : "text-[var(--fg-subtle)]"}>
                      {ms.puan}
                    </span>
                    {madde.tavan !== undefined && (
                      <span className="text-[var(--fg-subtle)]"> / {madde.tavan}</span>
                    )}
                  </span>
                </button>

                {acikMi && (
                  <div className="px-4 pb-4 space-y-4 border-t border-[var(--border)]">
                    {(madde.notlar?.length || madde.altTavanlar?.length) && (
                      <ul className="pt-3 text-xs text-[var(--fg-subtle)] space-y-1">
                        {madde.altTavanlar?.map((a) => (
                          <li key={a.not}>• {a.not}</li>
                        ))}
                        {madde.notlar?.map((n) => (
                          <li key={n}>• {n}</li>
                        ))}
                      </ul>
                    )}

                    {kayitlar.length > 0 && (
                      <ul className="space-y-2 pt-2">
                        {kayitlar.map((k) => (
                          <KayitSatiri
                            key={k.id}
                            alan={alan}
                            madde={madde}
                            kayit={k}
                            puan={k.puan}
                            onChange={(d) => guncelle(k.id, d)}
                            onSil={() => sil(k.id)}
                          />
                        ))}
                      </ul>
                    )}

                    <div className="pt-1">
                      <div className="text-[11px] uppercase tracking-wider text-[var(--fg-subtle)] mb-2">
                        Ekle
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {madde.bentler.map((b) => (
                          <button
                            key={b.kod}
                            type="button"
                            onClick={() => ekle(madde, b.kod)}
                            title={b.ad}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[var(--border)] text-xs text-[var(--fg-muted)] hover:border-[var(--accent)] hover:text-[var(--fg)] transition-colors max-w-full"
                          >
                            <Plus className="w-3 h-3 shrink-0 text-[var(--accent)]" />
                            <span className="truncate">{b.ad}</span>
                            <span className="text-[var(--fg-subtle)] shrink-0">{b.puan}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </section>
            );
          })}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={sifirla}
              className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Kayıtları sıfırla
            </button>
          </div>
        </div>

        {/* Özet */}
        <Ozet alan={alan} sonuc={sonuc} onKopyala={kopyala} kopyalandi={kopyalandi} />
      </div>
    </div>
  );
}

function KayitSatiri({
  alan,
  madde,
  kayit,
  puan,
  onChange,
  onSil,
}: {
  alan: TemelAlan;
  madde: Madde;
  kayit: Kayit;
  puan: number;
  onChange: (d: Partial<Kayit>) => void;
  onSil: () => void;
}) {
  const bent = madde.bentler.find((b) => b.kod === kayit.bentKod)!;
  const yazarSorulur = madde.tip === "makale" || madde.tip === "esit" || madde.tip === "kisi";
  const rolSorulur =
    madde.tip === "makale" && alan.yazarKurali === "kademeli" && kayit.yazarSayisi > 1;
  const pay = yazarPayi(alan, madde, kayit);

  const girdi =
    "px-2 py-1.5 rounded-md bg-[var(--bg)] border border-[var(--border-strong)] text-[var(--fg)] text-xs focus:outline-none focus:border-[var(--accent)]";

  return (
    <li className="rounded-md border border-[var(--border)] p-3 space-y-2">
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm text-[var(--fg)] leading-snug">{bent.ad}</div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-sm tabular-nums text-[var(--accent)]">{yuvarla(puan)}</span>
          <button
            type="button"
            onClick={onSil}
            aria-label="Kaydı sil"
            className="text-[var(--fg-subtle)] hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--fg-muted)]">
        <label className="inline-flex items-center gap-1.5">
          Adet
          <input
            type="number"
            min={1}
            value={kayit.adet}
            onChange={(e) => onChange({ adet: Number(e.target.value) || 1 })}
            className={`${girdi} w-16`}
          />
        </label>
        {yazarSorulur && (
          <label className="inline-flex items-center gap-1.5">
            {madde.tip === "kisi" ? "Kişi" : "Yazar"} sayısı
            <input
              type="number"
              min={1}
              value={kayit.yazarSayisi}
              onChange={(e) => onChange({ yazarSayisi: Number(e.target.value) || 1 })}
              className={`${girdi} w-16`}
            />
          </label>
        )}
        {rolSorulur && (
          <label className="inline-flex items-center gap-1.5">
            Rolünüz
            <select
              value={kayit.rol}
              onChange={(e) => onChange({ rol: e.target.value as Rol })}
              className={girdi}
            >
              <option value="baslica">Başlıca yazar</option>
              <option value="diger">Diğer yazar</option>
              <option value="belirsiz">Başlıca yazar belirtilmemiş</option>
            </select>
          </label>
        )}
        {madde.tip === "danismanlik" && (
          <label className="inline-flex items-center gap-1.5">
            <input
              type="checkbox"
              checked={kayit.esDanisman}
              onChange={(e) => onChange({ esDanisman: e.target.checked })}
              className="accent-[var(--accent)]"
            />
            İkinci/eş danışman
          </label>
        )}
        {!madde.drSorulmaz && (
          <label className="inline-flex items-center gap-1.5">
            <input
              type="checkbox"
              checked={kayit.drSonrasi}
              onChange={(e) => onChange({ drSonrasi: e.target.checked })}
              className="accent-[var(--accent)]"
            />
            {alan.unvan} sonrası
          </label>
        )}
        {pay < 1 && (
          <span className="text-[var(--fg-subtle)]">
            pay ×{yuvarla(pay)}
          </span>
        )}
      </div>
    </li>
  );
}

function Ozet({
  alan,
  sonuc,
  onKopyala,
  kopyalandi,
}: {
  alan: TemelAlan;
  sonuc: HesapSonucu;
  onKopyala: () => void;
  kopyalandi: boolean;
}) {
  const yuzde = (p: number, hedef: number) => Math.min(100, Math.round((p / hedef) * 100));

  return (
    <aside className="lg:sticky lg:top-24 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-card)] p-5 space-y-5">
      <div>
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs uppercase tracking-wider text-[var(--fg-subtle)]">Toplam</span>
          <span className="text-2xl font-semibold tabular-nums text-[var(--fg)]">
            {sonuc.toplam}
            <span className="text-sm text-[var(--fg-subtle)] font-normal"> / {TOPLAM_ASGARI}</span>
          </span>
        </div>
        <Cubuk yuzde={yuzde(sonuc.toplam, TOPLAM_ASGARI)} tamam={sonuc.genel.toplamOk} />
      </div>
      <div>
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
            {alan.unvan} sonrası
          </span>
          <span className="text-2xl font-semibold tabular-nums text-[var(--fg)]">
            {sonuc.drToplam}
            <span className="text-sm text-[var(--fg-subtle)] font-normal">
              {" "}
              / {DR_SONRASI_ASGARI}
            </span>
          </span>
        </div>
        <Cubuk yuzde={yuzde(sonuc.drToplam, DR_SONRASI_ASGARI)} tamam={sonuc.genel.drOk} />
        <p className="mt-1 text-[11px] text-[var(--fg-subtle)]">3. madde puanı bu toplama girmez.</p>
      </div>

      <div>
        <div className="text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2">
          Asgari koşullar
        </div>
        <ul className="space-y-2">
          {sonuc.kosullar.map((k) => (
            <li key={k.id} className="flex gap-2 text-xs leading-snug">
              {k.saglandi ? (
                <CircleCheck className="w-4 h-4 shrink-0 text-[var(--accent)]" />
              ) : (
                <CircleX className="w-4 h-4 shrink-0 text-yellow-500" />
              )}
              <div>
                <div className="text-[var(--fg)]">{k.metin}</div>
                <div className="text-[var(--fg-subtle)]">{k.durum}</div>
                {k.elleKontrol && (
                  <div className="text-[var(--fg-subtle)] italic">{k.elleKontrol}</div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`rounded-md px-3 py-2 text-xs ${
          sonuc.hepsiTamam
            ? "bg-[var(--accent-soft)] text-[var(--accent)]"
            : "border border-[var(--border)] text-[var(--fg-muted)]"
        }`}
      >
        {sonuc.hepsiTamam
          ? "Girdiğiniz verilere göre tüm sayısal koşullar sağlanıyor."
          : "Eksik koşullar sarı ile işaretli. Bu araç resmî değerlendirme değildir."}
      </div>

      <button
        type="button"
        onClick={onKopyala}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-[var(--border-strong)] rounded-md hover:border-[var(--accent)] text-[var(--fg)] text-sm transition-colors"
      >
        {kopyalandi ? (
          <Check className="w-4 h-4 text-[var(--accent)]" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
        {kopyalandi ? "Kopyalandı" : "Özeti kopyala"}
      </button>
    </aside>
  );
}

function Cubuk({ yuzde, tamam }: { yuzde: number; tamam: boolean }) {
  return (
    <div className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
      <div
        className={`h-full rounded-full transition-all ${
          tamam ? "bg-[var(--accent)]" : "bg-yellow-500"
        }`}
        style={{ width: `${yuzde}%` }}
      />
    </div>
  );
}
