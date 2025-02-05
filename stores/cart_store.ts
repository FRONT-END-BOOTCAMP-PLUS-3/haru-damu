import { uuidGenerator } from "@/utils/uuid_generator";

import type { StateCreator } from "zustand";
import type { State } from "@/hooks/usestore";

export type TCartItem = {
  item_id: number;
  user_id: number;
  item_name: string;
  item_price: number;
  img: string | undefined;
  blurImg: string | undefined;
  quantity: number;
  isChecked: boolean;
  wrapper_id: string | null;
};

export type TCartSlice = {
  cart: TCartItem[];
  mealCart: TCartItem[];

  fetchCart: (items: TCartItem[]) => void;
  getIsCheckedAllCartItems: () => boolean;
  getCheckedCartItems: () => TCartItem[];
  changeIsCheckedAllCartItems: (isChecked: boolean) => void;

  addMealCartItem: (item: TCartItem) => void;
  bulkAddMealCartItems: (items: TCartItem[]) => void;
  wrappingMealItems: () => void;
  removeMealCartItem: (item: TCartItem) => void;
  removeAllMealCartItems: () => void;
};

export const createCartSlice: StateCreator<Partial<State>, [], [], TCartSlice> = (set, get) => ({
  cart: [],
  mealCart: [],

  fetchCart: (items) =>
    set({
      cart: [...items],
    }),

  getIsCheckedAllCartItems: () => {
    return !get().cart?.find((item) => !item.isChecked);
  },

  getCheckedCartItems: () => {
    return get().cart?.filter((item) => item.isChecked) || [];
  },

  changeIsCheckedAllCartItems: (isChecked) =>
    set({
      cart: get().cart?.map((item) => {
        return { ...item, isChecked };
      }),
    }),

  addMealCartItem: (item) =>
    set((state) => {
      if (item.wrapper_id !== null) {
        const newItems = state.cart?.filter((cartItem) => item.wrapper_id === cartItem.wrapper_id) || [];

        return {
          mealCart: [...(get().mealCart || []), ...newItems],
          cart: [...(get().cart?.filter((cartItem) => item.wrapper_id !== cartItem.wrapper_id) || [])],
        };
      }
      return {
        mealCart: [...(get().mealCart || []), item],
        cart: [...(get().cart?.filter((cartItem) => item.item_id !== cartItem.item_id) || [])],
      };
    }),

  bulkAddMealCartItems: (items) =>
    set({
      mealCart: [...(get().mealCart || []), ...items],
      cart: [...(get().cart?.filter((cartItem) => !cartItem.isChecked) || [])],
    }),

  wrappingMealItems: () =>
    set((state) => {
      const wrapper_id = uuidGenerator();
      const wrappedItems = state.mealCart?.map((item) => {
        return { ...item, wrapper_id, isChecked: true } as TCartItem;
      });

      return { cart: [...(get().cart || []), ...(wrappedItems || [])], mealCart: [] };
    }),

  removeMealCartItem: (item) =>
    set({
      mealCart: [...(get().mealCart?.filter((cartItem) => item.item_id !== cartItem.item_id) || [])],
      cart: [...(get().cart || []), { ...item, wrapper_id: null }],
    }),

  removeAllMealCartItems: () =>
    set({
      cart: [
        ...(get().cart || []),
        ...(get().mealCart?.map((item) => {
          return {
            ...item,
            wrapper_id: null,
          };
        }) || []),
      ],
      mealCart: [],
    }),
});
