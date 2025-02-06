import { NextResponse } from "next/server";

import getBlurImg from "@/utils/get_blur_img";

import items from "@/dummys/items";
import cartItems from "@/dummys/cart";

export async function GET() {
  // TODO : service로 이동 예정 로직
  const formatItem = async (
    item_id: number,
    user_id = 1,
    quantity = 1,
    is_checked = true,
    wrapper_id = null,
    created_at: string,
    updated_at: string,
    img?: string | undefined,
  ) => {
    const blurImg = img ? await getBlurImg(img) : undefined;
    const item = items.find((item) => item_id === item.item_id);

    return {
      item_id,
      user_id,
      item_name: item ? item.item_name : "",
      item_price: item ? item.item_price : 0,
      img,
      blurImg,
      quantity,
      is_checked,
      wrapper_id,
      created_at,
      updated_at,
    };
  };

  const newCartItems = await Promise.all(
    cartItems.map((item) =>
      formatItem(
        item.item_id,
        item.user_id,
        item.quantity,
        item.is_checked,
        item.wrapper_id,
        item.created_at,
        item.updated_at,
      ),
    ),
  );

  return NextResponse.json(newCartItems);
}
