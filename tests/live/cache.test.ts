import { expect, test } from "vitest";
import { cached, invalidate } from "@/lib/liveCache";

test("aynı anahtar için süren sorguya katılır, süre dolunca yeniler", async () => {
  let calls = 0;
  const load = async () => {
    calls++;
    await new Promise((r) => setTimeout(r, 20));
    return calls;
  };
  const [a, b] = await Promise.all([
    cached("t:1", 50, load),
    cached("t:1", 50, load),
  ]);
  expect(a).toBe(1);
  expect(b).toBe(1);
  expect(await cached("t:1", 50, load)).toBe(1);
  await new Promise((r) => setTimeout(r, 60));
  expect(await cached("t:1", 50, load)).toBe(2);
});

test("hata önbellekte kalmaz", async () => {
  let n = 0;
  const load = async () => {
    n++;
    if (n === 1) throw new Error("ilk deneme");
    return "ok";
  };
  await expect(cached("t:2", 1000, load)).rejects.toThrow();
  expect(await cached("t:2", 1000, load)).toBe("ok");
});

test("invalidate öneke uyan kayıtları düşürür", async () => {
  let n = 0;
  const load = async () => ++n;
  expect(await cached("t:3:x", 10_000, load)).toBe(1);
  invalidate("t:3");
  expect(await cached("t:3:x", 10_000, load)).toBe(2);
});
