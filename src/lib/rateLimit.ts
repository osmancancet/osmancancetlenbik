// In-memory rate limiter. Best-effort only: on serverless platforms each
// lambda instance keeps its own counter, so attackers distributing across
// cold starts see less friction than on a single host. Good enough for a
// low-traffic portfolio site; upgrade to Upstash/Vercel KV if traffic grows.

type Entry = { hits: number[] };

const store = new Map<string, Entry>();
const MAX_KEYS = 5000;

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export function checkRateLimit(
  key: string,
  opts: { max: number; windowMs: number }
): RateLimitResult {
  const now = Date.now();

  if (store.size > MAX_KEYS) {
    for (const [k, v] of store) {
      if (v.hits.every((t) => now - t >= opts.windowMs)) store.delete(k);
      if (store.size <= MAX_KEYS / 2) break;
    }
  }

  const entry = store.get(key) ?? { hits: [] };
  entry.hits = entry.hits.filter((t) => now - t < opts.windowMs);

  if (entry.hits.length >= opts.max) {
    const oldest = entry.hits[0];
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((opts.windowMs - (now - oldest)) / 1000),
    };
  }

  entry.hits.push(now);
  store.set(key, entry);
  return {
    ok: true,
    remaining: opts.max - entry.hits.length,
    retryAfterSeconds: 0,
  };
}

export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip") || "unknown";
}
