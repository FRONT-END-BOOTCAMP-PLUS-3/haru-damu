// app/api/health/route.ts
import { cookies } from "next/headers"; // 서버에서만 사용 가능한 API
import { createServerClient } from "@supabase/ssr";

export async function GET() {
  const cookieStore = await cookies();
  const client = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
      },
    },
  });

  try {
    const { data, error } = await client.auth.getUser();
    if (error) throw error;

    const user = data?.user;
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // 사용자 건강 데이터를 가져오기
    const healthResponse = await fetch(`/api/health/${user.id}`);
    const healthData = await healthResponse.json();

    // 유효한 데이터가 없을 때 처리
    if (!healthData) {
      return new Response(JSON.stringify({ error: "Health data not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(healthData), { status: 200 });
  } catch (error) {
    console.error("Error fetching health data:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), { status: 500 });
  }
}
