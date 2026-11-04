import { PrismaClient } from "@/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/** Önizleme derlemelerinde değişken yoktur; üretimde doludur. */
export function databaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  // Neon adapter — HTTP transport, serverless-friendly, no TCP pool issues
  const adapter = new PrismaNeon({ connectionString });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

/**
 * DATABASE_URL yokken model çağrıları reddedilen bir Promise döndürür.
 * Modül yüklenirken istemci kurulmaz; böylece `prisma generate` sonrası
 * `next build` bağlantı dizesi olmadan da sayfaları derleyebilir.
 * Var olan `.catch` / try-catch yolları bu reddi yakalar.
 */
function unavailableCall(): Promise<never> {
  return Promise.reject(new Error("DATABASE_URL is not set"));
}

function unavailableDelegate(): unknown {
  const fn = function unavailable() {
    return unavailableCall();
  };
  return new Proxy(fn, {
    get: () => unavailableDelegate(),
    apply: () => unavailableCall(),
  });
}

export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (!databaseConfigured()) {
      if (prop === "then") return undefined;
      return unavailableDelegate();
    }
    const client = getPrismaClient();
    const value = Reflect.get(client, prop, client);
    return typeof value === "function" ? value.bind(client) : value;
  },
});

/**
 * DATABASE_URL yoksa sorguyu çalıştırmadan `fallback` döner.
 * URL varsa sorgu aynen çalışır; bağlantı hatası yutulmaz.
 */
export async function withDatabase<T>(
  query: () => Promise<T>,
  fallback: T
): Promise<T> {
  if (!databaseConfigured()) return fallback;
  return query();
}
