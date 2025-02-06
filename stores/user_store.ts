import type { StateCreator } from "zustand";
import type { State } from "@/hooks/usestore";

export type TUserSlice = {
  isLogin: boolean;
  userType: "user" | "partner" | null;
  login: (type: "user" | "partner") => void;
  logout: () => void;
};

export const createUserSlice: StateCreator<Partial<State>, [], [], TUserSlice> = (set) => ({
  isLogin: false,
  userType: null,

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
});
