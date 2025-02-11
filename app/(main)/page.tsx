import Category from "@/components/common/category";
import Banner from "@/app/(main)/_components/banner";
import MealList from "@/app/(main)/_components/meal_list";

import styles from "@/app/(main)/main_page.module.css";

import { banners } from "@/constants/banner";
import { CATEGORIES } from "@/constants/categories";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default async function Main() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/items/main`, { method: "GET" }).then((response) =>
    response.json(),
  );
  const { breakfast, lunch, dinner } = data;

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

      <MealList meal="breakfast" items={breakfast} />
      <MealList meal="lunch" items={lunch} />
      <MealList meal="dinner" items={dinner} />
    </div>
  );
}
