import { describe, expect, it } from "vitest";
import { recentlyChanged } from "@/lib/indexnow";

const SITE = "https://osmancancetlenbik.com";
const now = Date.UTC(2026, 10, 25, 12);
const h = (n: number) => new Date(now - n * 3600_000);

describe("indexnow: değişen adresler", () => {
  it("yalnız pencere içindeki, tarihi bilinen ve bu siteye ait adresleri seçer", () => {
    const urls = recentlyChanged(
      [
        { url: `${SITE}/a`, lastModified: h(1) },
        { url: `${SITE}/b`, lastModified: h(60) },
        { url: `${SITE}/c` },
        { url: "https://baska.com/d", lastModified: h(1) },
        { url: `${SITE}/e`, lastModified: h(-5) },
        { url: `${SITE}/a`, lastModified: h(2).toISOString() },
      ],
      SITE,
      now,
      48 * 3600_000
    );
    expect(urls).toEqual([`${SITE}/a`]);
  });
});
