import { redirect } from "next/navigation";

import { createClient } from "./server";

const getUser = async (type: "user" | "partner") => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const email = user?.user_metadata.email;

  const { data: existingUser } = await supabase.from(`${type}s`).select("*").eq("email", email).single();

  if (!existingUser) redirect("/login");

  return {
    userId: existingUser.id,
    userName: existingUser.name,
    userEmail: existingUser.email,
    userAddress: existingUser.address,
    userPhone: existingUser.phone,
  };
};

export default getUser;
