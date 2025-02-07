"use client";

import { redirect, useSearchParams } from "next/navigation";

import { useEffect } from "react";

import Spinner from "@/components/common/spinner";

import { useStore } from "@/hooks/usestore";

import { supabase } from "@/utils/supabase/server";

import type { TUserType } from "@/stores/user_store";

export default function Callback() {
  const searchParams = useSearchParams();

  const { login, addMessage } = useStore();

  useEffect(() => {
    const type = searchParams.get("type") as TUserType;

    const updateuser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.user_metadata || user?.user_metadata === null) return redirect("/");

      const { avatar_url, email, full_name } = user.user_metadata;
      console.table({ type, avatar_url, email, full_name });

      login(type, { email, name: full_name }, avatar_url);

      addMessage(`어서오세요, ${full_name}님!`, "var(--secondary-color)");
    };

    updateuser();

    return type === "user" ? redirect("/") : redirect("/partner");
  }, []);

  return <Spinner />;
}
