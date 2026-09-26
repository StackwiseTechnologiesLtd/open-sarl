import { NextResponse, type NextRequest } from "next/server";

function preferredLocale(header: string | null) {
  const first = header?.split(",")[0]?.split("-")[0]?.trim().toLowerCase();
  return first === "en" ? "en" : "fr";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (first === "fr" || first === "en") {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", first);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const locale = preferredLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
