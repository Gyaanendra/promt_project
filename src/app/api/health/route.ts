import { describeConfig } from "@/lib/config";

export const dynamic = "force-dynamic";

// Public, never returns key values. Lets the UI show setup problems early.
export async function GET() {
  return Response.json({
    ok: true,
    authRequired: Boolean(process.env.APP_ACCESS_CODE?.trim()),
    models: describeConfig(),
  });
}
