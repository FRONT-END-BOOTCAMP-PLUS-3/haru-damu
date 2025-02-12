import ItemDetailBox from "@/app/(main)/item/[id]/_components/item_detail_box";
import ItemDetailTable from "@/app/(main)/item/[id]/_components/item_detail_table";

import styles from "@/app/(main)/item/[id]/item_page.module.css";

import { DAILY_NUTRIENT_VALUES } from "@/constants/daily_nutrient_law";
import {
  NUTRIENT_HEADERS,
  PRODUCT_DETAIL_HEADERS_GROUP_ONE,
  PRODUCT_DETAIL_HEADERS_GROUP_TWO,
  PRODUCT_DETAILS_GROUP_ONE,
  PRODUCT_DETAILS_GROUP_TWO,
} from "@/constants/product";

import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export default async function ItemDetail({ params }: { params: { id: string } }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/items/${params.id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    console.log("안녕");
  }

  const item = await response.json();

  const nutrientBody = item.nutrition
    ? [
        {
          nutrient: "칼로리",
          value: item.nutrition.calorie ?? 0,
          percentage: `${Math.floor((item.nutrition.carbohydrates / DAILY_NUTRIENT_VALUES.carbohydrate) * 100)}%`,
        },
        {
          nutrient: "탄수화물",
          value: item.nutrition.carbohydrates ?? 0,
          percentage: `${Math.floor((item.nutrition.carbohydrates / DAILY_NUTRIENT_VALUES.carbohydrate) * 100)}%`,
        },
        {
          nutrient: "단백질",
          value: item.nutrition.protein ?? 0,
          percentage: `${Math.floor((item.nutrition.protein / DAILY_NUTRIENT_VALUES.protein) * 100)}%`,
        },
        {
          nutrient: "지방",
          value: item.nutrition.fat ?? 0,
          percentage: `${Math.floor((item.nutrition.fat / DAILY_NUTRIENT_VALUES.fat) * 100)}%`,
        },
        {
          nutrient: "당",
          value: item.nutrition.sugar ?? 0,
          percentage: `${Math.floor((item.nutrition.sugar / DAILY_NUTRIENT_VALUES.sugar) * 100)}%`,
        },
        {
          nutrient: "나트륨",
          value: item.nutrition.sodium ?? 0,
          percentage: `${Math.floor((item.nutrition.sodium / DAILY_NUTRIENT_VALUES.sodium) * 100)}%`,
        },
      ]
    : [];

  return (
    <div className={cx("container")}>
      <ItemDetailBox item={item} />
      <ItemDetailTable headers={NUTRIENT_HEADERS} data={nutrientBody} />
      <div className={cx("container__product")}>
        <ItemDetailTable headers={PRODUCT_DETAIL_HEADERS_GROUP_ONE} data={PRODUCT_DETAILS_GROUP_ONE} />
        <ItemDetailTable headers={PRODUCT_DETAIL_HEADERS_GROUP_TWO} data={PRODUCT_DETAILS_GROUP_TWO} />
      </div>
    </div>
  );
}
