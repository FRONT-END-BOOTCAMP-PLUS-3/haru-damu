import Category from "@/components/common/category";

import styles from "@/app/(main)/main_page.module.css";

import { banners } from "@/constants/banner";
import { CATEGORIES } from "@/constants/categories";

import Banner from "./_components/banner";
import MealList from "./_components/meal_list";

import classNames from "classnames/bind";
import { dummyItems } from "@/dummys/items";

const cx = classNames.bind(styles);

export default function Main() {
  return (
    <div className={cx("container")}>
      <Banner bannerItem={banners} />

      <div className={cx("container__catagorys")}>
        <h2 className={cx("title-lg-b")}>카테고리</h2>
        <ul className={cx("container__catagorys__items")}>
          {CATEGORIES.map((category) => (
            <Category key={category.order} category={category} />
          ))}
        </ul>
      </div>

      <MealList meal="breakfast" items={dummyItems} />
      <MealList meal="lunch" items={dummyItems} />
      <MealList meal="dinner" items={dummyItems} />
    </div>
  );
}
