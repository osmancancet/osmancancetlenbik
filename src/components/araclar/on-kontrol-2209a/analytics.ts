import { track as vercelTrack } from "@vercel/analytics";
import type { ScoreBand } from "@/lib/araclar/on-kontrol-2209a/engine/report";

// README §15: olaylar yalnızca buradan gönderilir. Parametreler kapalı kümelerdir; metin, uzunluk ya da içerik geçemez.
type Referrer = "linkedin" | "whatsapp" | "diger" | "dogrudan";
type EventMap = {
  "2209a_sayfa_gorundu": Referrer;
  "2209a_ornek_temizlendi": undefined;
  "2209a_ilk_duzenleme": undefined;
  "2209a_rapor_kopyalandi": ScoreBand;
  "2209a_rapor_indirildi": ScoreBand;
  "2209a_bulguya_tiklandi": string; // kural kimliği, ör. "wp-sum"
};
type Short<K> = K extends `2209a_${infer R}` ? R : never;

const RULE_ID = /^(len|wp|fill|cite|refs|generic|pii|tip)[a-z0-9-]*$/;

export function track<K extends Short<keyof EventMap>>(name: K, prop?: EventMap[`2209a_${K}` & keyof EventMap]) {
  if (typeof window === "undefined") return;
  if (name === "bulguya_tiklandi" && (typeof prop !== "string" || !RULE_ID.test(prop))) return;
  try {
    vercelTrack(`2209a_${name}`, prop === undefined ? undefined : { deger: prop });
  } catch { /* analitik kapalıysa yok say */ }
}

export function referrerKind(ref: string): Referrer {
  if (/linkedin/i.test(ref)) return "linkedin";
  if (/whatsapp/i.test(ref)) return "whatsapp";
  return ref ? "diger" : "dogrudan";
}
