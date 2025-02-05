import Cart from "@/app/(main)/cart/_components/cart";

import style from "@/app/(main)/cart/page.module.css";

import classNames from "classnames/bind";

const cx = classNames.bind(style);

export default async function CartPage() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

  const fetchedItems = await fetch(`${BASE_URL}/api/carts`);
  const cartItems = await fetchedItems.json();

  return (
    <div className={cx("cart_wrapper", "container")}>
      <Cart items={cartItems} />
    </div>
  );
}
