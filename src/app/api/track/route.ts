// src/app/api/track/route.ts
export async function POST(req: Request) {
  const data = await req.json().catch(() => ({}));
  // Tùy ý: ghi log ra console; sau này bạn ghi DB/log service
  console.log("[track]", data);
  return Response.json({ ok: true });
}
