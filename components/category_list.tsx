"use client";

import { useRouter } from "next/navigation";

import type { ReactNode } from "react";

import styles from "@/components/category_list.module.css";

import classNames from "classnames/bind";
import { AlignJustify } from "lucide-react";

const cx = classNames.bind(styles);

type TCategory = {
  id?: number;
  category: string;
  icon?: ReactNode;
  path?: string;
};

interface CategoryListProps {
  categoryList: TCategory[];
  width?: string;
  height?: string;
  isShrunk?: boolean;
}

export default function CategoryList({ categoryList, width = "auto", height = "auto", isShrunk }: CategoryListProps) {
  const router = useRouter();
  const handleCategoryClick = (path: string | undefined) => {
    if (path) {
      router.push(`/category?value=${path}`); // ✅ 동적 라우팅 처리
    } else {
      router.push("/"); // ✅ 기본 홈으로 이동
    }
  };
  return (
    <div className={cx("categorylist")} style={{ width, height }}>
      <div className={cx("categorylist__button")}>
        {isShrunk ? (
          <>
            <AlignJustify width={24} height={21} />
          </>
        ) : (
          <>
            <AlignJustify width={16} height={14} />
            <span>카테고리</span>
          </>
        )}

        <ul className={cx("categorylist__dropdown")}>
          {categoryList.map((category, index) => (
            <li
              key={category.id ?? index + 1}
              className={cx("categorylist__item")}
              onClick={() => handleCategoryClick(category.path)} // ✅ 클릭 시 이동 처리
            >
              <div className={cx("categorylist__link")}>
                <div>{category.icon}</div>
                <span>{category.category}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
