import { NextRequest, NextResponse } from "next/server";
import checkUserSubscription from "./hooks/checkusersubscribtion";
import isAdmin from "./hooks/isAdmin";

const authRoutes = [
  "/login",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/verify-email/[token]",
];

const publicRoutes = ["/"];


const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  
 
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images") || 
    pathname.includes(".") 
  ) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("accessToken")?.value;
  const userId = request.cookies.get("id")?.value;
  

  
  if (pathname === "/") {
    return NextResponse.next();
  }


 
  if (!accessToken && !authRoutes.includes(pathname)) {
    console.log("Access token not found, redirecting to landing page.");
    return NextResponse.redirect(new URL("/", request.url));
  }



  if (accessToken && authRoutes.includes(pathname)) {
    console.log("Logged in user trying to access auth route, redirecting.");
    return NextResponse.redirect(new URL("/", request.url));
  }

  
  if (!publicRoutes.includes(pathname)) {
    const isExpired = await checkUserSubscription(userId!, accessToken!);
    if (isExpired === true) {
      console.log("Subscription has expired, redirecting to pricing page.");
      return NextResponse.redirect(new URL("/#pricing", request.url));
    }
  }

  return NextResponse.next();
};

export default middleware