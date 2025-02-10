import { createClient } from "@/utils/supabase/client";

import type { StateCreator } from "zustand";
import type { State } from "@/hooks/usestore";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export type TUser = {
  name: string;
  email: string;
  phone?: string;
  address?: string;
} | null;

export type TUserType = "user" | "partner" | null;

export type TUserSlice = {
  user: TUser;
  userImg: string | null;

  isLogin: boolean;
  userType: TUserType;
  isShrunk: boolean;

  getUser: () => void;
  login: (type: TUserType, user?: Omit<TUser, "id">, img?: string) => void;
  logout: () => void;
  setIsShrunk: (isShrunk: boolean) => void;
};

export const createUserSlice: StateCreator<Partial<State>, [], [], TUserSlice> = (set) => ({
  user: null,
  userImg: null,

  isLogin: false,
  userType: null,
  isShrunk: false,

  getUser: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/users`);

      const { user } = await response.json();

      const supabase = createClient();

      const {
        data: { user: googleData },
      } = await supabase.auth.getUser();

      const isLogin = user !== null;
      const type = "user";

      const newUser = user
        ? {
            name: user.userName,
            email: user.userEmail,
            phone: user.userPhone,
            address: user.userAddress,
          }
        : null;

      set({
        user: newUser,
        isLogin,
        userType: type,
        userImg: googleData ? googleData.user_metadata.avatar_url : null,
      });
    } catch (error) {
      console.error(error);
    }
  },

  login: async (type, user, img) => {
    console.log(type);
    // 유저 로그인 타입이 넘어오지 않으면 로그인 되지 않았다고 판단합니다.
    const isLogin = !!type && type !== null;
    try {
      const response =
        isLogin &&
        (await fetch(`${BASE_URL}/api/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type,
            ...user,
          }),
        }));

      const data = response ? await response.json() : null;

      set({
        user: data.user,
        userImg: img,
        isLogin,
        userType: type,
      });
    } catch (error) {
      console.error(error);
    }
  },

  logout: () =>
    set(() => ({
      user: null,
      userImg: null,
      isLogin: false,
      userType: null,
    })),

  setIsShrunk: (isShrunk) => set({ isShrunk }),
});
