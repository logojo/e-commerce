// proxy.ts

import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);

  // 1. Si intenta entrar al login y tiene cookie de sesión,
  // redirigir al home.
  if (pathname === "/auth/login") {
    if (sessionCookie) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Sin sesión: permitir el acceso al formulario.
    return NextResponse.next();
  }

  // 2. Define exclusivamente las rutas privadas.
  const protectedRoutes = [
    "/products",
    "/checkout",
    "/profile",
    "/orders",
    "/users",
  ];

  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`)
  );

  // 3. Si no tiene sesión y quiere entrar a una ruta privada,
  // redirigir al login conservando el destino original.
  if (isProtectedRoute && !sessionCookie) {
    const loginUrl = new URL("/auth/login", request.url);

    loginUrl.searchParams.set("callbackUrl", pathname + search);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/login",
    "/products/:path*",
    "/users/:path*",
    "/checkout/:path*",
    "/profile/:path*",
    "/orders/:path*",
  ],
};