"use client";

import Link from "next/link";

import styles from "@/components/category_list.module.css";

import classNames from "classnames/bind";
import { AlignJustify } from "lucide-react";

const cx = classNames.bind(styles);

type TCategory = {
  id?: number;
  category: string;
  icon?: React.ReactNode;
  path?: string;
};

interface CategoryListProps {
  categoryList: TCategory[];
  width?: string;
  height?: string;
}

export default function CategoryList({ categoryList, width = "200px", height = "auto" }: CategoryListProps) {
  return (
    <div className={cx("categorylist")} style={{ width, height }}>
      <div className={cx("categorylist__button")}>
        <AlignJustify width={16} height={14} />
        카테고리
        <ul className={cx("categorylist__dropdown")}>
          {categoryList.map((category, index) => (
            <li key={category.id ?? index + 1} className={cx("categorylist__item")}>
              <Link href={category.path ?? "/"} className={cx("categorylist__link")}>
                <div>{category.icon}</div>
                <span>{category.category}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
