"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Araç bir sunum slaydının içine gömüldüğünde site menüsü ve altbilgisi
 * gereksiz — hem yer kaplıyor hem de iframe içinde ikinci bir site açılmış
 * izlenimi veriyor.
 *
 * Bunu CSS ile çözüyoruz: `?gomulu=1` ile açılan sayfa `<body>` üzerine bir
 * sınıf koyuyor, globals.css o sınıf altında kabuk öğelerini gizliyor.
 * Böylece Navbar ve Footer'ın kendisine dokunmaya gerek kalmıyor.
 */
export function EmbedMode() {
  const search = useSearchParams();
  const gomulu = search.get("gomulu") === "1";

  useEffect(() => {
    if (!gomulu) return;
    document.body.classList.add("arac-gomulu");
    return () => document.body.classList.remove("arac-gomulu");
  }, [gomulu]);

  return null;
}
