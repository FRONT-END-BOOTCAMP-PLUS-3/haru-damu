import MainVerticalItem from "@/components/common/vertical_item_main";

import styles from "@/app/(main)/_components/meal_list.module.css";

import { MAIN_MEAL } from "@/constants";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
type ItemImage = {
  id: number;
  itemId: number;
  src: string | null;
  createdAt: Date;
};

export type MainItems = {
  itemId: number;
  storeId: number;
  itemName: string;
  itemPrice: number;
  categoryCode: string;
  itemImage?: ItemImage[] | null;
};
interface VerticalItemListProps {
  meal: "breakfast" | "lunch" | "dinner";
  items: MainItems[] | null;
}
export default function MealList({ meal, items }: VerticalItemListProps) {
  return (
    <div className={cx("meallist")}>
      <div className={cx("meallist__title")}>
        <h2 className={cx("title-lg-b")}>{MAIN_MEAL[meal].title}</h2>
        <span className={cx("text-md")}>{MAIN_MEAL[meal].description}</span>
      </div>

      <ul className={cx("meallist__item")}>
        {items && items.map((item) => <MainVerticalItem key={item.itemId} item={item} />)}
      </ul>
    </div>
  );
}
