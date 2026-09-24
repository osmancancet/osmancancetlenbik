import { profile } from "@/data/profile";

/**
 * OpenAlex'ten akademisyen kartı verisi.
 *
 * Neden OpenAlex: Google Scholar'ın resmî API'si yok, Scopus/WoS ücretli.
 * OpenAlex ücretsiz, anahtar istemiyor ve `mailto` verilince "polite pool"a
 * alıyor (daha yüksek hız sınırı). Veri kalitesi Scholar'dan biraz düşük —
 * özellikle Türkçe dergilerde atıf sayıları eksik olabiliyor; kartın altına
 * kaynak notu bu yüzden konuyor.
 */

const TABAN = "https://api.openalex.org";
const MAILTO = profile.email;

/** Çok yayını olan yazarlarda tek sayfada çekilen üst sınır. */
const YAYIN_LIMITI = 200;

export type KartVerisi = {
  id: string;
  ad: string;
  kurum: string | null;
  ulke: string | null;
  orcid: string | null;
  yayin: number;
  atif: number;
  hIndeks: number;
  i10: number;
  ilkYil: number | null;
  enVerimliYil: { yil: number; yayin: number } | null;
  enCokAtifAlan: { baslik: string; yil: number | null; atif: number } | null;
  ortakYazarlar: { ad: string; sayi: number }[];
  ortakYazarSayisi: number;
  ulkeSayisi: number;
  konular: string[];
  dergiler: { ad: string; sayi: number }[];
  acikErisimYuzdesi: number | null;
  /** Yayın sayısı limiti aştıysa istatistikler ilk N yayına dayanır. */
  kismi: boolean;
};

export type YazarAdayi = {
  id: string;
  ad: string;
  kurum: string | null;
  orcid: string | null;
  yayin: number;
  atif: number;
  hIndeks: number;
};

type Yazar = {
  id: string;
  display_name: string;
  orcid: string | null;
  works_count: number;
  cited_by_count: number;
  summary_stats?: { h_index?: number; i10_index?: number };
  last_known_institutions?: { display_name: string; country_code?: string }[];
  topics?: { display_name: string; count: number }[];
  counts_by_year?: { year: number; works_count: number }[];
};

type Eser = {
  id: string;
  display_name: string | null;
  publication_year: number | null;
  cited_by_count: number;
  authorships?: {
    author: { id: string; display_name: string };
    countries?: string[];
  }[];
  primary_location?: { source?: { display_name?: string } | null } | null;
  open_access?: { is_oa?: boolean };
};

/** "https://openalex.org/A123" → "A123". */
export function kisaId(id: string): string {
  return id.replace(/^https?:\/\/openalex\.org\//, "");
}

function url(yol: string, params: Record<string, string>) {
  const u = new URL(TABAN + yol);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
  u.searchParams.set("mailto", MAILTO);
  return u.toString();
}

async function getir<T>(adres: string, revalidate = 86400): Promise<T | null> {
  const res = await fetch(adres, {
    headers: { Accept: "application/json" },
    next: { revalidate },
  });
  if (!res.ok) return null;
  return (await res.json()) as T;
}

const YAZAR_ALANLARI =
  "id,display_name,orcid,works_count,cited_by_count,summary_stats,last_known_institutions,topics,counts_by_year";

function yazarToAday(y: Yazar): YazarAdayi {
  return {
    id: kisaId(y.id),
    ad: y.display_name,
    kurum: y.last_known_institutions?.[0]?.display_name ?? null,
    orcid: y.orcid ? y.orcid.replace("https://orcid.org/", "") : null,
    yayin: y.works_count,
    atif: y.cited_by_count,
    hIndeks: y.summary_stats?.h_index ?? 0,
  };
}

/** Ad ya da ORCID ile yazar arar. ORCID verilirse tek sonuç döner. */
export async function yazarAra(sorgu: string): Promise<YazarAdayi[]> {
  const temiz = sorgu.trim();
  if (!temiz) return [];

  const orcid = temiz.match(/(\d{4}-\d{4}-\d{4}-\d{3}[\dX])/i)?.[1];
  if (orcid) {
    const y = await getir<Yazar>(
      url(`/authors/orcid:${orcid}`, { select: YAZAR_ALANLARI }),
      3600
    );
    return y ? [yazarToAday(y)] : [];
  }

  const veri = await getir<{ results: Yazar[] }>(
    url("/authors", {
      search: temiz,
      "per-page": "8",
      select: YAZAR_ALANLARI,
    }),
    3600
  );
  return (veri?.results ?? []).map(yazarToAday);
}

/** Kartta gösterilecek tüm istatistikleri tek yerde toplar. */
export async function kartVerisiGetir(id: string): Promise<KartVerisi | null> {
  const temiz = kisaId(id);
  if (!/^A\d+$/.test(temiz)) return null;

  const [yazar, eserler] = await Promise.all([
    getir<Yazar>(url(`/authors/${temiz}`, { select: YAZAR_ALANLARI })),
    getir<{ results: Eser[] }>(
      url("/works", {
        filter: `authorships.author.id:${temiz}`,
        "per-page": String(YAYIN_LIMITI),
        sort: "cited_by_count:desc",
        select:
          "id,display_name,publication_year,cited_by_count,authorships,primary_location,open_access",
      })
    ),
  ]);
  if (!yazar) return null;

  const liste = eserler?.results ?? [];

  // Ortak yazarlar, ülkeler ve dergiler eser listesinden sayılıyor.
  const yazarSayac = new Map<string, { ad: string; sayi: number }>();
  const ulkeler = new Set<string>();
  const dergiSayac = new Map<string, number>();
  let oa = 0;
  let ilkYil: number | null = null;

  for (const e of liste) {
    for (const a of e.authorships ?? []) {
      const aid = kisaId(a.author.id);
      if (aid === temiz) continue;
      const kayit = yazarSayac.get(aid) ?? { ad: a.author.display_name, sayi: 0 };
      kayit.sayi += 1;
      yazarSayac.set(aid, kayit);
      for (const u of a.countries ?? []) ulkeler.add(u);
    }
    const dergi = e.primary_location?.source?.display_name;
    if (dergi) dergiSayac.set(dergi, (dergiSayac.get(dergi) ?? 0) + 1);
    if (e.open_access?.is_oa) oa += 1;
    if (e.publication_year && (ilkYil === null || e.publication_year < ilkYil)) {
      ilkYil = e.publication_year;
    }
  }

  const enCok = liste[0];
  const yillar = yazar.counts_by_year ?? [];
  const enVerimli = yillar.reduce<{ yil: number; yayin: number } | null>(
    (en, y) =>
      !en || y.works_count > en.yayin ? { yil: y.year, yayin: y.works_count } : en,
    null
  );
  // counts_by_year son 10 yılı kapsıyor; daha eski yayın varsa eser listesinden gelen yıl esas.
  const ilkYilSayim = yillar.length
    ? Math.min(...yillar.map((y) => y.year))
    : null;
  if (ilkYilSayim !== null && (ilkYil === null || ilkYilSayim < ilkYil)) {
    ilkYil = ilkYilSayim;
  }

  return {
    id: temiz,
    ad: yazar.display_name,
    kurum: yazar.last_known_institutions?.[0]?.display_name ?? null,
    ulke: yazar.last_known_institutions?.[0]?.country_code ?? null,
    orcid: yazar.orcid ? yazar.orcid.replace("https://orcid.org/", "") : null,
    yayin: yazar.works_count,
    atif: yazar.cited_by_count,
    hIndeks: yazar.summary_stats?.h_index ?? 0,
    i10: yazar.summary_stats?.i10_index ?? 0,
    ilkYil,
    enVerimliYil: enVerimli,
    enCokAtifAlan:
      enCok && enCok.display_name
        ? {
            baslik: enCok.display_name,
            yil: enCok.publication_year,
            atif: enCok.cited_by_count,
          }
        : null,
    ortakYazarlar: [...yazarSayac.values()]
      .sort((a, b) => b.sayi - a.sayi)
      .slice(0, 3),
    ortakYazarSayisi: yazarSayac.size,
    ulkeSayisi: ulkeler.size,
    konular: (yazar.topics ?? []).slice(0, 3).map((t) => t.display_name),
    dergiler: [...dergiSayac.entries()]
      .map(([ad, sayi]) => ({ ad, sayi }))
      .sort((a, b) => b.sayi - a.sayi)
      .slice(0, 2),
    acikErisimYuzdesi: liste.length ? Math.round((oa / liste.length) * 100) : null,
    kismi: yazar.works_count > YAYIN_LIMITI,
  };
}
