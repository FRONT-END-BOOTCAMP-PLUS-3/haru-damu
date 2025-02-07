import type { StateCreator } from "zustand";
import type { State } from "@/hooks/usestore";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export type TUser = {
  id: number;
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
