import VerticalItem from "@/components/common/vertical_item";

import styles from "@/app/(main)/_components/meal_list.module.css";

import type { TItem } from "@/types";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface VerticalItemListProps {
  meal: "breakfast" | "lunch" | "dinner";
  items: TItem[];
}

export default function MealList({ meal, items }: VerticalItemListProps) {
  const mealNames: Record<"breakfast" | "lunch" | "dinner", string> = {
    breakfast: "아침식사",
    lunch: "점심식사",
    dinner: "저녁식사",
  };
  return (
    <div className={cx("meallist")}>
      <div className={cx("meallist__title")}>
        <h2 className={cx("title-lg-b")}>{mealNames[meal]}</h2>
        <span className={cx("text-md")}>건강한 아침 한끼를 완성해보세요.</span>
      </div>

      <ul className={cx("meallist__item")}>
        {items.map((item) => (
          <VerticalItem key={item.item_id} item={item} />
        ))}
      </ul>
    </div>
  );
}
