"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState, useEffect, useCallback } from "react";

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
  const [isShrunk, setIsShrunk] = useState(false);

  const handleScroll = useCallback(() => setIsShrunk(window.scrollY > 100), []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header className={cx("header", { nav: isShrunk })}>
      <div className={cx("header__container", "text-sm")}>
        {isPartner && isLogin ? <PartnerHeader /> : <HeaderContent isLogin={isLogin} isShrunk={isShrunk} />}
      </div>
    </header>
  );
}

// ✅ 파트너 헤더
const PartnerHeader = () => {
  const router = useRouter();
  return (
    <div className={cx("header__container__partner", "text-sm")}>
      <HeaderLogo />
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
  );
};

// ✅ 일반 헤더
const HeaderContent = ({ isLogin, isShrunk }: { isLogin: boolean; isShrunk: boolean }) => {
  return isShrunk ? <ShrunkNav /> : <ExpandedHeader isLogin={isLogin} />;
};

// ✅ 축소된 헤더
const ShrunkNav = () => {
  return (
    <div className={cx("header__nav")}>
      <div className={cx("header__nav__left")}>
        <CategoryList categoryList={categoryList} width="40px" isShrunk />
        <HeaderLogo />
      </div>
      <SearchBar />
      <NavIcons />
    </div>
  );
};

// ✅ 확장된 헤더
const ExpandedHeader = ({ isLogin }: { isLogin: boolean }) => {
  const router = useRouter();
  return (
    <>
      <div className={cx("header__top")}>
        <AuthButtons isLogin={isLogin} />
      </div>
      <div className={cx("header__middle")}>
        <HeaderLogo />
        <NavIcons />
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
  );
};

// ✅ 로그인 & 회원가입 버튼
const AuthButtons = ({ isLogin }: { isLogin: boolean }) => {
  const router = useRouter();
  return (
    <div className={cx("header__auth")}>
      <button className={cx("header__auth__button")} onClick={() => router.push(isLogin ? "/profile" : "/login")}>
        {isLogin ? "유저네임" : "회원가입"}
      </button>
      <div className={cx("header__divider")}>|</div>
      <button className={cx("header__auth__button")} onClick={() => router.push(isLogin ? "/" : "/login")}>
        {isLogin ? "로그아웃" : "로그인"}
      </button>
    </div>
  );
};

// ✅ 네비게이션 아이콘 (장바구니 & 프로필)
const NavIcons = () => {
  const router = useRouter();
  return (
    <div className={cx("header__nav__icons")}>
      <ShoppingBasket className={cx("header__icon")} size={24} onClick={() => router.push("/cart")} />
      <User className={cx("header__icon")} size={24} onClick={() => router.push("/profile")} />
    </div>
  );
};

// ✅ 로고 버튼
const HeaderLogo = () => {
  const router = useRouter();
  return (
    <button className={cx("header__logo")} onClick={() => router.push("/")}>
      <Image src="/favicon.ico" alt="하루담은 로고" width={40} height={40} />
      <span className={cx("header__logo_text", "title-md-b")}>하루담은</span>
    </button>
  );
};
