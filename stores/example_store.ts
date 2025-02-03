import type { StateCreator } from "zustand";
import type { State } from "@/hooks/usestore";

export type TExSlice = {
  example: string;
};

export const createExSlice: StateCreator<Partial<State>, [], [], TExSlice> = (set, get) => ({
  example: "",
});
