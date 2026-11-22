import { describe, expect, it } from "vitest";
import { BUSY_AFTER_MS, isBusy, waitingSince } from "@/lib/chatShared";

const at = (min: number) => new Date(Date.UTC(2026, 10, 23, 10, min));
const v = (min: number) => ({ sender: "VISITOR", createdAt: at(min) });
const o = (min: number) => ({ sender: "OWNER", createdAt: at(min) });

describe("sohbet: meşgul notu", () => {
  it("mesaj yokken bekleyen yoktur", () => {
    expect(waitingSince([])).toBeNull();
    expect(isBusy(null)).toBe(false);
  });

  it("yanıtsız ilk ziyaretçi mesajından itibaren sayar", () => {
    expect(waitingSince([v(0), v(5)])).toEqual(at(0));
  });

  it("yanıt gelince bekleme biter, yeni soru yeniden başlatır", () => {
    expect(waitingSince([v(0), o(3)])).toBeNull();
    expect(waitingSince([v(0), o(3), v(20), v(22)])).toEqual(at(20));
  });

  it("15 dakika dolmadan meşgul demez, dolunca der", () => {
    const since = at(0);
    expect(isBusy(since, since.getTime() + BUSY_AFTER_MS - 1)).toBe(false);
    expect(isBusy(since, since.getTime() + BUSY_AFTER_MS)).toBe(true);
    expect(isBusy(since.toISOString(), since.getTime() + BUSY_AFTER_MS)).toBe(true);
  });
});
