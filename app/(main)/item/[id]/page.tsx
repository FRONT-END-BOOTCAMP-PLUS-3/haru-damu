import ItemDetailBox from "./_components/item_detail_box";

import { dummyItem } from "@/dummys/items";

export default function ItemDetail() {
  const data = dummyItem;
  return (
    <div>
      <ItemDetailBox item={data} />
    </div>
  );
}
