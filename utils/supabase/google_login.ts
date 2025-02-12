import { createClient } from "@/utils/supabase/client";

import type { TUserType } from "@/stores/user_store";

const redirectTo = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export const googleLogin = async (type: TUserType) => {
  console.log("=== loginHandler ===");
  const supabase = createClient();

  try {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: `${redirectTo}/login/callback?type=${type}`,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    } else {
      throw Error(String(error));
    }
  }
};
