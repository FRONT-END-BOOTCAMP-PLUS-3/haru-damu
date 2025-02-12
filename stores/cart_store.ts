import { uuidGenerator } from "@/utils/uuid_generator";

import type { TItem } from "@/types";
import type { StateCreator } from "zustand";
import type { State } from "@/hooks/usestore";

export type TCartItem = {
  itemId: number;
  userId: number;
  item: TItem;
  itemName: string;
  itemPrice: number;
  img: string | undefined;
  blurImg: string | undefined;
  quantity: number;
  isChecked: boolean;
  wrapperId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TCartSlice = {
  cart: TCartItem[];
  mealCart: TCartItem[];

  fetchCart: (items: TCartItem[]) => void;
  getCartItem: (id: number) => TCartItem;
  getIsCheckedAllCartItems: () => boolean;
  getCheckedCartItems: () => TCartItem[];
  changeIsCheckedCartItems: (id: number, isChecked: boolean) => void;
  changeIsCheckedAllCartItems: (isChecked: boolean) => void;
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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export const createCartSlice: StateCreator<Partial<State>, [], [], TCartSlice> = (set, get) => ({
  cart: [],
  mealCart: [],

  fetchCart: (items) =>
    set({
      cart: [...items],
      mealCart: [],
    }),

  getCartItem: (id) => {
    return get().cart?.find((item) => item.itemId === id) as TCartItem;
  },

  getIsCheckedAllCartItems: () => {
    return !get().cart?.find((item) => !item.isChecked);
  },

  getCheckedCartItems: () => {
    return get().cart?.filter((item) => item.isChecked) || [];
  },

  changeIsCheckedCartItems: async (id, isChecked) => {
    try {
      const cart = get().cart?.find((item) => item.itemId === id);

      await fetch(`${BASE_URL}/api/carts`, {
        method: "PUT",
        body: JSON.stringify({
          itemId: id,
          cart: {
            ...cart,
            isChecked,
          },
        }),
      }).then((response) => response.json);

      set({
        cart: get().cart?.map((item) => {
          if (item.itemId === id) return { ...item, isChecked };

          return item;
        }),
      });
    } catch (error) {
      console.log(error);
    }
  },

  changeIsCheckedAllCartItems: async (isChecked) => {
    try {
      const cart = get().cart;

      const fetchPromises = cart?.map(
        async (item) =>
          await fetch(`${BASE_URL}/api/carts`, {
            method: "PUT",
            body: JSON.stringify({
              itemId: item.itemId,
              cart: {
                ...cart,
                isChecked,
              },
            }),
          }),
      );

      if (fetchPromises) {
        await Promise.all(fetchPromises);
      }

      set({
        cart: get().cart?.map((item) => {
          return { ...item, isChecked };
        }),
      });
    } catch (error) {
      console.log(error);
    }
  },

  changeQuantityCartItem: async (id, quantity) => {
    try {
      const cart = get().cart?.find((item) => item.itemId === id);

      await fetch(`${BASE_URL}/api/carts`, {
        method: "PUT",
        body: JSON.stringify({
          itemId: id,
          cart: {
            ...cart,
            quantity,
          },
        }),
      }).then((response) => response.json);

      set({
        cart: get().cart?.map((item) => {
          if (item.itemId === id) return { ...item, quantity };

          return item;
        }),
      });
    } catch (error) {
      console.log(error);
    }
  },

  removeCartItem: async (id) => {
    try {
      await fetch(`${BASE_URL}/api/carts`, {
        method: "DELETE",
        body: JSON.stringify({
          itemId: id,
        }),
      }).then((response) => response.json);

      set({
        cart: get().cart?.filter((item) => id !== item.itemId),
      });
    } catch (error) {
      console.log(error);
    }
  },

  getMealCartItem: (id) => {
    return get().mealCart?.find((item) => item.itemId === id) as TCartItem;
  },

  addMealCartItem: (item) =>
    set((state) => {
      if (item.wrapperId !== null) {
        const newItems = state.cart?.filter((cartItem) => item.wrapperId === cartItem.wrapperId) || [];

        return {
          mealCart: [...(get().mealCart || []), ...newItems],
          cart: [...(get().cart?.filter((cartItem) => item.wrapperId !== cartItem.wrapperId) || [])],
        };
      }
      return {
        mealCart: [...(get().mealCart || []), item],
        cart: [...(get().cart?.filter((cartItem) => item.itemId !== cartItem.itemId) || [])],
      };
    }),

  bulkAddMealCartItems: (items) =>
    set({
      mealCart: [...(get().mealCart || []), ...items],
      cart: [...(get().cart?.filter((cartItem) => !cartItem.isChecked) || [])],
    }),

  wrappingMealItems: async () => {
    try {
      const wrapperId = uuidGenerator();
      const wrappedItems = get().mealCart?.map((item) => {
        return { ...item, wrapperId, isChecked: true } as TCartItem;
      });

      const fetchPromises = wrappedItems?.map(
        async (item) =>
          await fetch(`${BASE_URL}/api/carts`, {
            method: "PUT",
            body: JSON.stringify({
              itemId: item.itemId,
              cart: item,
            }),
          }),
      );

      if (fetchPromises) {
        await Promise.all(fetchPromises);
      }

      set({
        cart: [...(get().cart || []), ...(wrappedItems || [])],
        mealCart: [],
      });
    } catch (error) {
      console.log(error);
    }
  },

  removeMealCartItem: (item) =>
    set({
      mealCart: [...(get().mealCart?.filter((cartItem) => item.itemId !== cartItem.itemId) || [])],
      cart: [...(get().cart || []), { ...item, wrapperId: null }],
    }),

  removeAllMealCartItems: async () => {
    try {
      const wrappedItems = get().mealCart?.map((item) => {
        return { ...item, wrapperId: null } as TCartItem;
      });

      const fetchPromises = wrappedItems?.map(
        async (item) =>
          await fetch(`${BASE_URL}/api/carts`, {
            method: "PUT",
            body: JSON.stringify({
              itemId: item.itemId,
              cart: item,
            }),
          }),
      );

      if (fetchPromises) {
        await Promise.all(fetchPromises);
      }

      set({
        cart: [
          ...(get().cart || []),
          ...(get().mealCart?.map((item) => {
            return {
              ...item,
              wrapperId: null,
            };
          }) || []),
        ],
        mealCart: [],
      });
    } catch (error) {
      console.log(error);
    }
  },

  // dnd 관련
  isDragging: false,

  startDragging: () => set({ isDragging: true }),
  stopDragging: () => set({ isDragging: false }),
});
