"use client";

import { YazarSecici } from "@/components/tools/YazarSecici";
import { AgPaneli } from "./AgPaneli";

export function OrtakYazarAgiClient() {
  return <YazarSecici>{(yazar) => <AgPaneli yazar={yazar} />}</YazarSecici>;
}
