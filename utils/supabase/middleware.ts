import { NextResponse, type NextRequest } from "next/server";

import { createServerClient } from "@supabase/ssr";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && (request.nextUrl.pathname === "/cart" || request.nextUrl.pathname === "/mypage")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const myNewResponse = NextResponse.next({ request });
   supabaseResponse.cookies.getAll().forEach(cookie => {
    myNewResponse.cookies.set(cookie.name, cookie.value, {
      path: '/',               // 기본 경로 설정
      httpOnly: true,          // HttpOnly 속성 추가 (선택)
      secure: process.env.NODE_ENV === 'production', // 프로덕션 환경에서 secure 설정
      sameSite: 'lax'          // 기본 sameSite 설정
    });
  });

  return myNewResponse;
}
