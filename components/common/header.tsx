"use client";
// url 수정 필요
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";

import CategoryList from "@/components/category_list";
import styles from "@/components/common/header.module.css";

import categoryList from "@/constants/categories_list";

import SearchBar from "../searchbar";

import classNames from "classnames/bind";
import { ShoppingBasket, User } from "lucide-react";

interface HeaderProps {
  isLogin: boolean;
  isPartner?: boolean;
}

const cx = classNames.bind(styles);

export default function Header({ isLogin, isPartner }: HeaderProps) {
  const router = useRouter();
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsShrunk(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ 파트너 로그인 시 전용 헤더
  if (isPartner && isLogin) {
    return (
      <header className={cx("header")}>
        <div className={cx("header__container__partner", "text-sm")}>
          <button className={cx("header__logo")} onClick={() => router.push("/")}>
            <Image src="/favicon.ico" alt="하루담은 로고" width={40} height={40} />
            <span className={cx("header__logo_text", "title-md-b")}>하루담은</span>
          </button>
          <div className={cx("header__auth")}>
            <button className={cx("header__auth__button")} onClick={() => router.push("/profile")}>
              유저네임
            </button>
            <div className={cx("header__divider")}>|</div>
            <button className={cx("header__auth__button")} onClick={() => router.push("/")}>
              로그아웃
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={cx("header", { nav: isShrunk })}>
      <div className={cx("header__container", "text-sm")}>
        {isShrunk ? (
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
              <ShoppingBasket className={cx("header__icon")} size={30} onClick={() => router.push("/cart")} />
              <User className={cx("header__icon")} size={30} onClick={() => router.push("/profile")} />
            </div>
          </div>
        ) : (
          <>
            <div className={cx("header__top")}>
              <div className={cx("header__auth")}>
                <button
                  className={cx("header__auth__button")}
                  onClick={() => router.push(isLogin ? "/profile" : "/login")}
                >
                  {isLogin ? "유저네임" : "회원가입"}
                </button>
                <div className={cx("header__divider")}>|</div>
                <button className={cx("header__auth__button")} onClick={() => router.push(isLogin ? "/" : "/login")}>
                  {isLogin ? "로그아웃" : "로그인"}
                </button>
              </div>
            </div>
            <div className={cx("header__middle")}>
              <button className={cx("header__logo")} onClick={() => router.push("/")}>
                <Image src="/favicon.ico" alt="하루담은 로고" width={40} height={40} />
                <span className={cx("header__logo_text", "title-md-b")}>하루담은</span>
              </button>
              <div className={cx("header__icons")}>
                <ShoppingBasket className={cx("header__icon")} size={24} onClick={() => router.push("/cart")} />
                <User className={cx("header__icon")} size={24} onClick={() => router.push("/profile")} />
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
          </>
        )}
      </div>
    </header>
  );
}
