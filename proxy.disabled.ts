import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import {
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
} from "@/modules/auth/constants/auth-route.constants";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isLoggedIn = Boolean(token);

  if (pathname.startsWith(DASHBOARD_ROUTE) && !isLoggedIn) {
    return NextResponse.redirect(new URL(LOGIN_ROUTE, req.url));
  }

  if (pathname.startsWith(LOGIN_ROUTE) && isLoggedIn) {
    return NextResponse.redirect(new URL(DASHBOARD_ROUTE, req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Must be statically analyzable at build time (no variables/template strings).
  matcher: ["/timesheets/:path*", "/login"],
};

