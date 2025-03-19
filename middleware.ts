import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const userAgent = req.headers.get("user-agent") || "";
  const isMobile = /iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile|WPDesktop/i.test(userAgent);

  if (isMobile) {
    return NextResponse.redirect(new URL("/mobile-restricted", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: "/:path*", 
};