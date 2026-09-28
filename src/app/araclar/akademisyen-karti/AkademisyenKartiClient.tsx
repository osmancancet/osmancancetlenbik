"use client";

import { YazarSecici } from "@/components/tools/YazarSecici";
import { KartPaneli } from "./KartPaneli";

export function AkademisyenKartiClient() {
  return <YazarSecici>{(yazar) => <KartPaneli yazar={yazar} />}</YazarSecici>;
}
