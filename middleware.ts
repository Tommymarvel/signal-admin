import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ['/', '/profile'];

function mobileRedirectMiddleware(req: NextRequest) {
  const userAgent = req.headers.get("user-agent") || "";
  const isMobile = /iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile|WPDesktop/i.test(userAgent);
  if (isMobile && !req.nextUrl.pathname.startsWith("/mobile-restricted")) {
    return NextResponse.redirect(new URL("/mobile-restricted", req.url));
  }

  return NextResponse.next();
}

function protectedMiddleware(req: NextRequest){
  const token = req.cookies.get('authToken')?.value;
  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
function logoutMiddleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/logout') {
    const response = NextResponse.redirect(new URL('/login', req.url));

    // Clear the cookie
    response.cookies.set('authToken', '', {
      httpOnly: true,
      expires: new Date(0),
      path: '/',
    });

    return response;
  }

  return NextResponse.next();
}

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  let response = NextResponse.next();
  if (pathname !== "/mobile-restricted") {
    response = mobileRedirectMiddleware(req) || response;
  }

  if (pathname == "/logout") {
    response = logoutMiddleware(req) || response;
  }

  if(protectedRoutes.includes(pathname)){
    
    response = protectedMiddleware(req) || response;
  }

  return response;
}

// Apply middleware to all routes
export const config = {
  matcher: [ "/((?!mobile-restricted|login).*)",'/((?!api|_next/static|_next/image|.*\\.png$).*)'], 
};