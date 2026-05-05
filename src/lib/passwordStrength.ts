export const COMMON_LEAKED = new Set(
  [
    "123456",
    "123456789",
    "12345678",
    "qwerty",
    "password",
    "111111",
    "12345",
    "abc123",
    "iloveyou",
    "1234567",
    "1q2w3e4r",
    "admin",
    "letmein",
    "welcome",
    "monkey",
    "1234",
    "passw0rd",
    "qwerty123",
    "1q2w3e",
    "ankara",
    "ankara06",
    "ankara2024",
    "ankara2025",
    "istanbul",
    "istanbul34",
    "izmir35",
    "manisa45",
    "galatasaray",
    "fenerbahce",
    "fenerbahce1907",
    "besiktas",
    "trabzonspor",
    "turkiye",
    "turkey",
    "şifre",
    "sifre123",
    "sifre1234",
    "parola",
    "parola123",
    "merhaba",
    "ataturk",
    "atatürk1881",
    "1881",
    "1923",
    "1453",
    "ali123",
    "mehmet",
    "ayse",
    "ayşe",
    "fatma",
    "ahmet",
    "qwerty1",
    "123qwe",
    "asdfgh",
    "okul123",
    "test123",
    "deneme",
    "123123",
    "654321",
    "987654321",
  ].map((s) => s.toLowerCase()),
);

export function passwordEntropy(pw: string): number {
  if (!pw) return 0;
  let space = 0;
  if (/[a-z]/.test(pw)) space += 26;
  if (/[A-Z]/.test(pw)) space += 26;
  if (/[0-9]/.test(pw)) space += 10;
  if (/[^A-Za-z0-9]/.test(pw)) space += 33;
  if (space === 0) space = 26;
  return Math.log2(space) * pw.length;
}

export function crackTime(bits: number): string {
  if (bits <= 0) return "anında";
  const guesses = Math.pow(2, bits) / 2;
  const rate = 1e11; // offline GPU
  const sec = guesses / rate;
  if (sec < 1) return "1 saniyeden kısa";
  if (sec < 60) return `${sec.toFixed(0)} saniye`;
  const min = sec / 60;
  if (min < 60) return `${min.toFixed(0)} dakika`;
  const hr = min / 60;
  if (hr < 24) return `${hr.toFixed(0)} saat`;
  const day = hr / 24;
  if (day < 365) return `${day.toFixed(0)} gün`;
  const yr = day / 365;
  if (yr < 1e3) return `${yr.toFixed(0)} yıl`;
  if (yr < 1e6) return `${(yr / 1e3).toFixed(1)} bin yıl`;
  if (yr < 1e9) return `${(yr / 1e6).toFixed(1)} milyon yıl`;
  if (yr < 1e12) return `${(yr / 1e9).toFixed(1)} milyar yıl`;
  return "evrenin yaşından uzun";
}

export type Strength = { label: string; color: string };

export function strengthLabel(bits: number): Strength {
  if (bits < 28) return { label: "ÇOK ZAYIF", color: "#f43f5e" };
  if (bits < 36) return { label: "ZAYIF", color: "#fb923c" };
  if (bits < 60) return { label: "ORTA", color: "#fbbf24" };
  if (bits < 80) return { label: "İYİ", color: "#22d3ee" };
  return { label: "MÜKEMMEL", color: "#00ff88" };
}

export function isLeaked(pw: string): boolean {
  return pw.length > 0 && COMMON_LEAKED.has(pw.toLowerCase());
}
