// src/lib/track.ts
type TrackPayload = {
  name: string;
  meta?: Record<string, unknown>;
};

export function track({ name, meta }: TrackPayload) {
  const url = "/api/track";
  const body = JSON.stringify({
    name,
    meta,
    ts: Date.now(),
    href: typeof location !== "undefined" ? location.href : null,
    ua: typeof navigator !== "undefined" ? navigator.userAgent : null,
  });

  try {
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(url, blob);
      return;
    }
  } catch {}

  // Fallback
  try {
    fetch(url, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    }).catch(() => {});
  } catch {}
}
