import Cart from "@/app/(main)/cart/_components/cart";

import getHeader from "@/utils/get_header";

export default async function CartPage() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

  const headers = await getHeader();

  const fetchedItems = await fetch(`${BASE_URL}/api/carts`, {
    headers,
    credentials: "include",
  }).then((response) => response.json());

  console.log(fetchedItems);

  return <Cart items={fetchedItems?.items ?? []} />;
}
