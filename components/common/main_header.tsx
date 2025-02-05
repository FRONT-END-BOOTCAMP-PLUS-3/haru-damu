"use client";

import Link from "next/link";
import Image from "next/image";

import Input from "@/components/common/input";
import CategoryList from "@/components/category_list";
import styles from "@/components/common/main_header.module.css";

import classNames from "classnames/bind";
import { Search, ShoppingBasket, User, Cpu, Shirt, Home } from "lucide-react";

const cx = classNames.bind(styles);

const categoryList = [
  { id: 1, category: "전자기기", icon: <Cpu width={16} height={16} />, path: "/category/electronics" },
  { id: 2, category: "패션", icon: <Shirt width={16} height={16} />, path: "/category/fashion" },
  { id: 3, category: "홈", icon: <Home width={16} height={16} />, path: "/category/home" },
];

const onChangeHandler = (value: string | number) => {
  console.log(value);
};

export default function MainHeader() {
  return (
    <header className={cx("header")}>
      <div className={cx("header__container", "text-sm")}>
        {/* 첫 번째 줄: 회원가입 / 로그인 */}
        <div className={cx("header__top")}>
          <div className={cx("header__auth")}>
            <Link href="/signup" className={cx("header__auth_link")}>
              회원가입
            </Link>
            <span className={cx("header__divider")}>|</span>
            <Link href="/login" className={cx("header__auth_link")}>
              로그인
            </Link>
          </div>
        </div>

        {/* 두 번째 줄: 로고, 장바구니 & 사용자 아이콘 */}
        <div className={cx("header__middle")}>
          <div className={cx("header__logo")}>
            <Image src="/favicon.ico" alt="하루담은 로고" width={40} height={40} />
            <span className={cx("header__logo_text", "title-md-b")}>하루담은</span>
          </div>

          <div className={cx("header__icons")}>
            <ShoppingBasket className={cx("header__icon", "header__icon--cart")} size={24} />
            <User className={cx("header__icon", "header__icon--user")} size={24} />
          </div>
        </div>

        {/* 세 번째 줄: 카테고리 리스트, 검색창, 1일 식단 장바구니 안내 버튼 */}
        <div className={cx("header__menu_button")}>
          <div className={cx("header__category_wrap")}>
            <CategoryList categoryList={categoryList} />
          </div>

          <div className={cx("header__search")}>
            <Input
              label=""
              placeholder="검색어를 입력해주세요"
              onChange={onChangeHandler}
              className={cx("header__search_input")}
            />
            <button className={cx("header__search_button")}>
              <Search size={20} />
            </button>
          </div>

          <button className={cx("header__diet_button", "text-sm")}>1일 식단 장바구니 안내</button>
        </div>
      </div>
    </header>
  );
}
