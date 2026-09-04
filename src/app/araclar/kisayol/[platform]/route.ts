import { siteUrl } from "@/lib/site";

/**
 * Masaüstü kısayol dosyası.
 *
 * NEDEN: Kullanıcılar "indir" düğmesi bekliyor. İmzalı bir .dmg/.exe için
 * Apple Developer hesabı ve Windows kod imzalama sertifikası gerekiyor;
 * imzasız dağıtımda her iki işletim sistemi de korkutucu uyarı veriyor.
 *
 * Bunun yerine her iki platformun KENDİ yerleşik kısayol biçimini
 * üretiyoruz: macOS'ta .webloc, Windows'ta .url. İkisi de işletim sisteminin
 * tanıdığı, uyarı çıkarmayan, çift tıklandığında araçları açan gerçek
 * dosyalar. Asıl "uygulama gibi" deneyim tarayıcının kurulum kipinden
 * geliyor (bkz. PlatformDownload).
 */

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ platform: "macos" }, { platform: "windows" }];
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ platform: string }> }
) {
  const { platform } = await params;
  const hedef = `${siteUrl}/araclar`;

  if (platform === "macos") {
    // Apple property list — Finder bunu çift tıklanabilir kısayol sayıyor.
    const body = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
\t<key>URL</key>
\t<string>${hedef}</string>
</dict>
</plist>
`;
    return new Response(body, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition":
          'attachment; filename="Akademisyen Araclari.webloc"',
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  if (platform === "windows") {
    // Windows Internet Shortcut — satır sonları CRLF olmalı.
    const body = [
      "[InternetShortcut]",
      `URL=${hedef}`,
      "IconIndex=0",
      "",
    ].join("\r\n");
    return new Response(body, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition":
          'attachment; filename="Akademisyen Araclari.url"',
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  return new Response("Bilinmeyen platform", { status: 404 });
}
