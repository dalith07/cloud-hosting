import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("❤️Middlware is called");

  // 3: na5tho authToken men headers
  const jwtToken = request.cookies.get("jwtToken");
  const token = jwtToken?.value as string;

  // console.log("😍😍", request.nextUrl.pathname);

  // 4: namlo check khteer saat client myatinech token itha ken authToken moch mwjoud return NextResponse...
  if (!token) {
    // 5:itha ken maandich token w n3od fel masasara /api/users/profile/ print message
    if (request.nextUrl.pathname.startsWith("/api/users/profile/")) {
      return NextResponse.json(
        // hatit json khater hatha jaweeb api dima natti jaweb api ala chakel json format
        { message: "not token provided,access denied" },
        { status: 401 } // Unauthorized
      );
    }
  } else {
    // 6: kif y3od adnaaa token mtkhalich user ynajem y7el /login" w /register" PAGE
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register"
    ) {
      // honi mhatitech json khater /login w /register how  page moch api nwali nhot redirect yaani wadddi ilaaa masaaar okhirr
      return NextResponse.redirect(new URL("/", request.url)); // kif nemchi lel login wila register yraajani lel home page ("/")
    }
  }
}

export const config = {
  matcher: ["/api/users/profile/:path*", "/login", "/register"], //(:path*) yaani kol route eli yji baad profile
};
