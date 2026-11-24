import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const apiKey = process.env.SENTINEL_API_KEY;

  if (apiKey) {
    fetch("https://secure-auth-mauve.vercel.app/api/traffic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        path: request.nextUrl.pathname,
        method: request.method,
      }),
    }).catch(() => {});
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
