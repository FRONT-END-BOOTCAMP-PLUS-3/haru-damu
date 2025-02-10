import { NextResponse } from "next/server";

import getUser from "@/utils/supabase/get_user";
import { createClient } from "@/utils/supabase/server";

import type { NextRequest } from "next/server";

export async function GET() {
  const user = await getUser("user");

  if (!user) return NextResponse.json({ user: null });

  return NextResponse.json({ user }, { status: 201 });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const body = await request.json();
  const { type, email, name, phone } = body;

  if (!type) {
    NextResponse.json({ error: "로그인이 잘 되었는 지 다시 확인 해주세요!" }, { status: 400 });
  }

  if (!name || !email) {
    return NextResponse.json({ error: "필요한 정보가 없습니다! (name, email)" }, { status: 400 });
  }

  try {
    // 1. 이메일로 기존 사용자 확인
    const { data: existingUser } = await supabase.from(`${type}s`).select("*").eq("email", email).single();

    if (!existingUser) {
      // 2. 기존 사용자가 없으면 새로 등록
      const { data: newUser } = await supabase.from(`${type}s`).insert([{ email, name, phone }]).select().single();

      return NextResponse.json({ message: `신규 ${type} 로그인 성공!`, user: newUser, type }, { status: 201 });
    } else {
      // 3. 기존 사용자가 있으면 업데이트
      const { data: updatedUser } = await supabase
        .from(`${type}s`)
        .update({ name, phone })
        .eq("email", email)
        .select()
        .single();

      return NextResponse.json({ message: `기존 ${type} 로그인 성공!`, user: updatedUser, type }, { status: 201 });
    }
  } catch (error) {
    NextResponse.json({ message: error.message }, { status: 500 });
  }
}
