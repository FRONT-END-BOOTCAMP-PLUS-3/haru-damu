"use client";

import { redirect, useSearchParams } from "next/navigation";

import { useEffect } from "react";

import Spinner from "@/components/common/spinner";

import { useStore } from "@/hooks/usestore";

import { createClient } from "@/utils/supabase/client";

import type { TUserType } from "@/stores/user_store";

import { setCookie } from "nookies";

export default function Callback() {
  const searchParams = useSearchParams();

  const { login, addMessage } = useStore();

  useEffect(() => {
    const type = searchParams.get("type") as TUserType;

    const updateUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.user_metadata || user?.user_metadata === null) return redirect("/");

      const { avatar_url, email, full_name } = user.user_metadata;

      login(type, { email, name: full_name }, avatar_url);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return;

      setCookie(null, "access_token", session?.access_token, {
        maxAge: 30 * 24 * 60 * 60, // 30일 동안 유지
        path: "/", // 모든 경로에서 쿠키 접근 가능
        secure: true, // HTTPS 환경에서만 쿠키 전송
        sameSite: "strict", // CSRF 방지
      });

      addMessage(`어서오세요, ${full_name}님!`, "var(--secondary-color)");
    };

    updateUser();

    return type === "user" ? redirect("/") : redirect("/partner");
  }, []);

  return <Spinner />;
}
