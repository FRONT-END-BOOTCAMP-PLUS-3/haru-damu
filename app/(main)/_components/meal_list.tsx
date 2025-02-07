import VerticalItem from "@/components/common/vertical_item";

import styles from "@/app/(main)/_components/meal_list.module.css";

import type { TItem } from "@/types";

import { MAIN_MEAL } from "@/constants";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface VerticalItemListProps {
  meal: "breakfast" | "lunch" | "dinner";
  items: TItem[];
}
export default function MealList({ meal, items }: VerticalItemListProps) {
  return (
    <div className={cx("meallist")}>
      <div className={cx("meallist__title")}>
        <h2 className={cx("title-lg-b")}>{MAIN_MEAL[meal].title}</h2>
        <span className={cx("text-md")}>{MAIN_MEAL[meal].description}</span>
      </div>

      <ul className={cx("meallist__item")}>
        {items.map((item) => (
          <VerticalItem key={item.item_id} item={item} />
        ))}
      </ul>
    </div>
  );
}
