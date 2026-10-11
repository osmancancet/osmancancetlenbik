import { expect, test, type Page } from "@playwright/test";

const URL = "/araclar/2209a-on-kontrol";
const SECRET = "GIZLIMETIN7319";

function watchConsole(page: Page) {
  const errors: string[] = [];
  // Sitede var olan ama bu bağımsız kopyada olmayan sayfaların önceden yüklenmesi 404 verebilir; yalnızca betik hataları sayılır.
  page.on("console", (m) => { if (m.type() === "error" && !m.text().startsWith("Failed to load resource")) errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push(e.message));
  return errors;
}

test("örnek başvuruyla açılır: 12/18; 2 düzelt, 4 gözden geçir, 1 ipucu", async ({ page }) => {
  const errors = watchConsole(page);
  await page.goto(URL);
  await expect(page.getByTestId("score")).toHaveText("12/18");
  await expect(page.getByText("2 düzelt", { exact: true })).toBeVisible();
  await expect(page.getByText("4 gözden geçir", { exact: true })).toBeVisible();
  await expect(page.getByText("1 ipucu", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Öğr. Gör. Osman Can Çetlenbik" })).toBeVisible();
  expect(errors.filter((e) => /hydrat/i.test(e))).toEqual([]);
});

test("katkı toplamı 100 olunca puan artar", async ({ page }) => {
  await page.goto(URL);
  await expect(page.getByTestId("score")).toHaveText("12/18");
  await page.getByLabel("İA3 katkı yüzdesi").fill("40");
  await expect(page.getByTestId("score")).toHaveText("13/18");
  await expect(page.getByTestId("wp-sum")).toContainText("100 / 100");
});

test("temizle → yaz → bulguya tıkla → alana odaklan → kopyala", async ({ page, context, browserName }) => {
  if (browserName === "chromium") await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto(URL);
  const clear = page.getByRole("button", { name: "Formu temizle" });
  await clear.click();
  await page.getByRole("button", { name: "Silmek için tekrar tıkla" }).click();
  await expect(page.locator("#ozet")).toHaveValue("");
  await expect(page.locator("#ozet")).toBeFocused();
  await expect(page.getByTestId("score")).not.toHaveText("12/18");

  await page.locator("#ozet").fill("kısa bir özet");
  await expect(page.locator("#f-ozet")).toContainText("3 / 25–450 kelime");

  await page.locator("button[data-rule='len-yontem']").click();
  await expect(page.locator("#yontem")).toBeFocused();

  await page.getByRole("button", { name: "Raporu kopyala" }).click();
  await expect(page.getByText(/Rapor kopyalandı|Kopyalanamadı/)).toBeVisible();
});

test("taslak yeniden yüklemede geri gelir", async ({ page }) => {
  await page.goto(URL);
  await page.getByRole("button", { name: "Formu temizle" }).click();
  await page.getByRole("button", { name: "Silmek için tekrar tıkla" }).click();
  await page.locator("#risk").fill("Taslak risk metni");
  await page.waitForTimeout(500);
  await page.reload();
  await expect(page.locator("#risk")).toHaveValue("Taslak risk metni");
});

test("başvuru metni hiçbir isteğe girmez", async ({ page }) => {
  const leaks: string[] = [];
  page.on("request", (r) => {
    const body = r.postData() ?? "";
    if (r.url().includes(SECRET) || body.includes(SECRET)) leaks.push(r.url());
  });
  await page.goto(URL);
  await page.locator("#bilimsel").fill(`Bu metin ${SECRET} içeriyor. `.repeat(20));
  await page.getByLabel("İA1 iş adımı").fill(SECRET);
  await page.getByRole("button", { name: "Raporu kopyala" }).click();
  await page.waitForTimeout(800);
  expect(leaks).toEqual([]);
});

test("localStorage kapalıyken çalışır", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new Error("depolama kapalı"); } });
  });
  // Yakalanmamış betik hataları sayılır (geliştirme modundaki React uyarıları değil).
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(URL);
  await expect(page.getByTestId("score")).toHaveText("12/18");
  await page.locator("#risk").fill("Yeni metin");
  await page.waitForTimeout(400);
  expect(errors).toEqual([]);
});

test("400 px genişlikte yatay kaydırma yok", async ({ page }) => {
  await page.setViewportSize({ width: 400, height: 900 });
  await page.goto(URL);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test("kısa bağlantı araca yönlendirir", async ({ page }) => {
  await page.goto("/2209");
  await expect(page).toHaveURL(new RegExp(`${URL}$`));
});
