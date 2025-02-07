import Image from "next/image";

import Button from "@/components/common/button";

import type { TItem } from "@/types";

import { Tally1, ShoppingCart } from "lucide-react";

interface ItemDetailBoxProps {
  item: TItem;
}

export default function ItemDetailBox({ item }: ItemDetailBoxProps) {
  return (
    <div>
      <Image width={390} height={520} alt="제품이미지" src={item.img ?? "/default_items.jpg"} />
      <ItemInfo
        itemInfo={{
          item_name: item.item_name,
          category_code: item.category_code,
          store_name: item.store_name,
          description: item.description,
        }}
      />
    </div>
  );
}

interface ItemInfoProps {
  itemInfo: Pick<TItem, "item_name" | "category_code" | "store_name" | "description">;
}

const ItemInfo = ({ itemInfo }: ItemInfoProps) => {
  return (
    <div>
      <ItemInfoLine title="상품명" description={itemInfo.item_name} />
      <ItemInfoLine title="카테고리" description={itemInfo.category_code} />
      <ItemInfoLine title="업체명" description={itemInfo.store_name} />
      <ItemInfoLine title="설명" description={itemInfo.description} />
      <div>수량</div>
      <Button text="장바구니 담기" iconComponent={<ShoppingCart size={16} />} />
    </div>
  );
};

const ItemInfoLine = ({ title, description }: { title: string; description: string }) => {
  return (
    <div>
      <span>{title}</span>
      <Tally1 />
      <span>{description}</span>
    </div>
  );
};
