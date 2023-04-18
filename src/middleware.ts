// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const userProtectedRoute = ["/profile", "/bookmarks"];
const adminProtectedRoute = ["/dashboard", "/userlist"];
const unloggedProtectedRoute = ["/signin", "/signup"];

const userAuthMiddleware = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const isRouteProtected = userProtectedRoute.find(
    (route) => route == pathname
  );

  const isTokenPresent = request.cookies.has("token");

  if (isRouteProtected && !isTokenPresent) {
    // return NextResponse.redirect(new URL("/about-2", request.url));
    return NextResponse.redirect(new URL("/", request.url));
  }
};

const adminAuthMiddleware = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  const isRouteProtected = adminProtectedRoute.find(
    (route) => route == pathname
  );

  const isTokenPresent = request.cookies.has("admintoken");

  if (isRouteProtected && !isTokenPresent) {
    // return NextResponse.redirect(new URL("/about-2", request.url));
    return NextResponse.redirect(new URL("/", request.url));
  }
};

const unloggedAuthMiddleware = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  const isRouteProtected = unloggedProtectedRoute.find(
    (route) => route == pathname
  );

  const isTokenPresent = request.cookies.has("token");
  console.log({ pathname, isRouteProtected, isTokenPresent });

  if (isRouteProtected && isTokenPresent) {
    // return NextResponse.redirect(new URL("/about-2", request.url));
    return NextResponse.redirect(new URL("/", request.url));
  }
};

const middlewares = [
  userAuthMiddleware,
  adminAuthMiddleware,
  unloggedAuthMiddleware,
];

// This function can be marked `async` if using `await` inside
export const middleware = (request: NextRequest) => {
  for (const mw of middlewares) {
    const response = mw(request);
    if (response) {
      return response;
    }
  }
};

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/test"],
// };
