"use client";

import { useRouter } from "next/navigation"; // ✅ Link 대신 useRouter 사용
import Image from "next/image";

import CategoryList from "@/components/category_list";
import styles from "@/components/common/header.module.css";

import SearchBar from "../searchbar";

import classNames from "classnames/bind";
import { ShoppingBasket, User, Cpu, Shirt, Home } from "lucide-react";

interface HeaderProps {
  isLogin: boolean;
  isShrunk: boolean;
}
const cx = classNames.bind(styles);

const categoryList = [
  { id: 1, category: "전자기기", icon: <Cpu width={16} height={16} />, path: "/category/electronics" },
  { id: 2, category: "패션", icon: <Shirt width={16} height={16} />, path: "/category/fashion" },
  { id: 3, category: "홈", icon: <Home width={16} height={16} />, path: "/category/home" },
];

export default function Header({ isLogin, isShrunk }: HeaderProps) {
  const router = useRouter();

  return (
    <header className={cx("header", { nav: isShrunk })}>
      {isShrunk ? (
        <div className={cx("header__container", "text-sm")}>
          <div className={cx("header__nav")}>
            <div className={cx("header__nav__left")}>
              <CategoryList categoryList={categoryList} width="40px" isShrunk={isShrunk} />
              <button className={cx("header__logo")} onClick={() => router.push("/")}>
                <Image src="/favicon.ico" alt="하루담은 로고" width={40} height={40} />
                <span className={cx("header__logo_text", "title-md-b")}>하루담은</span>
              </button>
            </div>

            <SearchBar />
            <div className={cx("header__nav__icons")}>
              <ShoppingBasket
                className={cx("header__icon", "header__icon--cart")}
                size={30}
                onClick={() => router.push("/cart")}
              />
              <User
                className={cx("header__icon", "header__icon--user")}
                size={30}
                onClick={() => router.push("/profile")}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={cx("header__container", "text-sm")}>
          <div className={cx("header__top")}>
            <div className={cx("header__auth")}>
              <button className={cx("header__auth__button")} onClick={() => router.push("/login")}>
                {isLogin ? "유저네임" : "회원가입"}
              </button>
              <div className={cx("header__divider")}>|</div>
              <button className={cx("header__auth__button")} onClick={() => router.push("/login")}>
                {isLogin ? "회원가입" : "로그인"}
              </button>
            </div>
          </div>

          <div className={cx("header__middle")}>
            <button className={cx("header__logo")} onClick={() => router.push("/")}>
              <Image src="/favicon.ico" alt="하루담은 로고" width={40} height={40} />
              <span className={cx("header__logo_text", "title-md-b")}>하루담은</span>
            </button>

            <div className={cx("header__icons")}>
              <ShoppingBasket
                className={cx("header__icon", "header__icon--cart")}
                size={24}
                onClick={() => router.push("/cart")}
              />
              <User
                className={cx("header__icon", "header__icon--user")}
                size={24}
                onClick={() => router.push("/profile")}
              />
            </div>
          </div>

          <div className={cx("header__menu_button")}>
            <div className={cx("header__category_wrap")}>
              <CategoryList categoryList={categoryList} />
            </div>
            <SearchBar />
            <button className={cx("header__diet_button", "text-xsm")} onClick={() => router.push("/diet-info")}>
              1일 식단 장바구니 안내
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
