import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

const getUser = async (
  type: "user" | "partner",
): Promise<{
  userId: number;
  userName: string;
  userEmail: string;
  userAddress: string;
  userPhone: string;
}> => {
  const supabase = await createClient();

  const header = await headers();
  const token = header.get("authorization");
  const accessToken = token?.split("Bearer ")[1];

  const {
    data: { user },
  } = token ? await supabase.auth.getUser(accessToken) : await supabase.auth.getUser();

  if (!user) return NextResponse.json({ message: "header에 authorization이 없습니다." }, { status: 401 });

  const email = user.user_metadata.email;
  const { data: existingUser } = await supabase.from(`${type}s`).select("*").eq("email", email).single();

  if (!existingUser) return NextResponse.json({ message: "회원을 찾지 못하였습니다." }, { status: 401 });

  return {
    userId: existingUser.id,
    userName: existingUser.name,
    userEmail: existingUser.email,
    userAddress: existingUser.address,
    userPhone: existingUser.phone,
  };
};

export default getUser;
