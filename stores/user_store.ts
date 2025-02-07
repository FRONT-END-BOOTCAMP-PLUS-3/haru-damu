import type { StateCreator } from "zustand";
import type { State } from "@/hooks/usestore";

export type TUserSlice = {
  isLogin: boolean;
  userType: "user" | "partner" | null;
  isShrunk: boolean;

  login: (type: "user" | "partner") => void;
  logout: () => void;
  setIsShrunk: (isShrunk: boolean) => void;
};

export const createUserSlice: StateCreator<Partial<State>, [], [], TUserSlice> = (set) => ({
  isLogin: false,
  userType: null,
  isShrunk: false,

  login: (type) =>
    set((state) => ({
      ...state,
      isLoggedIn: true,
      userType: type,
    })),

  logout: () =>
    set((state) => ({
      ...state,
      isLoggedIn: false,
      userType: null,
    })),

  setIsShrunk: (isShrunk) => set({ isShrunk }),
});
