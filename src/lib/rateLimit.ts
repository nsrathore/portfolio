// In-memory fixed-window rate limiter.
//
// STOPGAP: state lives in a single server instance's memory, so it resets on
// cold starts and isn't shared across concurrent serverless instances. It
// stops casual abuse; swap in a shared store (e.g. Upstash Redis) for a hard
// guarantee.

type Bucket = { count: number; resetAt: number };

export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const buckets = new Map<string, Bucket>();
  let lastSweep = Date.now();

  return function check(key: string) {
    const now = Date.now();

    // Drop expired buckets once per window so the map can't grow unbounded
    if (now - lastSweep > windowMs) {
      buckets.forEach((b, k) => {
        if (b.resetAt <= now) buckets.delete(k);
      });
      lastSweep = now;
    }

    let bucket = buckets.get(key);
    if (!bucket || bucket.resetAt <= now) {
      bucket = { count: 0, resetAt: now + windowMs };
      buckets.set(key, bucket);
    }
    bucket.count += 1;

    return {
      ok: bucket.count <= limit,
      remaining: Math.max(0, limit - bucket.count),
      retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
    };
  };
}

export function getClientIp(headers: Headers) {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
