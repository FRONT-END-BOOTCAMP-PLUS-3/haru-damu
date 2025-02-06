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
  is_checked: boolean;
  wrapper_id: string | null;
  created_at: string;
  updated_at: string;
};

export type TCartSlice = {
  cart: TCartItem[];
  mealCart: TCartItem[];

  fetchCart: (items: TCartItem[]) => void;
  getCartItem: (id: number) => TCartItem;
  getIsCheckedAllCartItems: () => boolean;
  getCheckedCartItems: () => TCartItem[];
  changeIsCheckedCartItems: (id: number, is_checked: boolean) => void;
  changeIsCheckedAllCartItems: (is_checked: boolean) => void;
  changeQuantityCartItem: (itemId: number, quantity: number) => void;
  removeCartItem: (id: number) => void;

  getMealCartItem: (id: number) => TCartItem;
  addMealCartItem: (item: TCartItem) => void;
  bulkAddMealCartItems: (items: TCartItem[]) => void;
  wrappingMealItems: () => void;
  removeMealCartItem: (item: TCartItem) => void;
  removeAllMealCartItems: () => void;

  isDragging: boolean;
  startDragging: () => void;
  stopDragging: () => void;
};

export const createCartSlice: StateCreator<Partial<State>, [], [], TCartSlice> = (set, get) => ({
  cart: [],
  mealCart: [],

  fetchCart: (items) =>
    set({
      cart: [...items],
    }),

  getCartItem: (id) => {
    return get().cart?.find((item) => item.item_id === id) as TCartItem;
  },

  getIsCheckedAllCartItems: () => {
    return !get().cart?.find((item) => !item.is_checked);
  },

  getCheckedCartItems: () => {
    return get().cart?.filter((item) => item.is_checked) || [];
  },

  changeIsCheckedCartItems: (id, is_checked) =>
    set({
      cart: get().cart?.map((item) => {
        if (item.item_id === id) return { ...item, is_checked };

        return item;
      }),
    }),

  changeIsCheckedAllCartItems: (is_checked) =>
    set({
      cart: get().cart?.map((item) => {
        return { ...item, is_checked };
      }),
    }),

  changeQuantityCartItem: (id, quantity) =>
    set({
      cart: get().cart?.map((item) => {
        if (item.item_id === id) return { ...item, quantity };

        return item;
      }),
    }),

  removeCartItem: (id) =>
    set({
      cart: get().cart?.filter((item) => id !== item.item_id),
    }),

  getMealCartItem: (id) => {
    return get().mealCart?.find((item) => item.item_id === id) as TCartItem;
  },

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
      cart: [...(get().cart?.filter((cartItem) => !cartItem.is_checked) || [])],
    }),

  wrappingMealItems: () =>
    set((state) => {
      const wrapper_id = uuidGenerator();
      const wrappedItems = state.mealCart?.map((item) => {
        return { ...item, wrapper_id, is_checked: true } as TCartItem;
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

  // dnd 관련
  isDragging: false,

  startDragging: () => set({ isDragging: true }),
  stopDragging: () => set({ isDragging: false }),
});
