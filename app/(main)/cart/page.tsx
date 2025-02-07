import Cart from "@/app/(main)/cart/_components/cart";

export default async function CartPage() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

  const fetchedItems = await fetch(`${BASE_URL}/api/carts`);
  const cartItems = await fetchedItems.json();

  return <Cart items={cartItems} />;
}
