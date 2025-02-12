"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useCallback } from "react";

import SearchBar from "@/components/searchbar";
import CategoryList from "@/components/category_list";
import MealInfoModal from "@/components/meal_info_modal";

import { useStore } from "@/hooks/usestore";

import styles from "@/components/common/header.module.css";

import categoryList from "@/constants/categories_list";

import { parseCookies } from "nookies";
import classNames from "classnames/bind";
import { BRAND_NAMES } from "@/constants";
import { ShoppingBasket, User } from "lucide-react";

const cx = classNames.bind(styles);

export default function Header() {
  const cookies = parseCookies();
  const accessToken = cookies.access_token;

  const { isLogin, user, userType, isShrunk, setIsShrunk, getUser, logout } = useStore();

  if (!accessToken) logout;
  if (isLogin && !user?.name) {
    getUser();
  }

  useEffect(() => {
    getUser();
  }, [accessToken, getUser]);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;

    if (y <= 160) {
      setIsShrunk(false);
    } else {
      setIsShrunk(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header className={cx("header", { nav: userType !== "partner" && isShrunk })}>
      <div className={cx("header__container", "text-sm")}>
        {userType === "partner" && isLogin ? <PartnerHeader /> : <HeaderContent isShrunk={isShrunk} />}
      </div>
    </header>
  );
}

// 파트너 헤더
const PartnerHeader = () => {
  const router = useRouter();

  const { user } = useStore();

  return (
    <div className={cx("header__container__partner", "text-sm")}>
      <HeaderLogo />
      <div className={cx("header__auth")}>
        <button className={cx("header__auth__button")} onClick={() => router.push("/mypage")}>
          {user && user.name}
        </button>
        <div className={cx("header__divider")}>|</div>
        <button className={cx("header__auth__button")} onClick={() => router.push("/")}>
          로그아웃
        </button>
      </div>
    </div>
  );
};

// 일반 헤더
const HeaderContent = ({ isShrunk }: { isShrunk: boolean }) => {
  return isShrunk ? <ShrunkNav /> : <ExpandedHeader />;
};

// 축소된 헤더
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

// 확장된 헤더
const ExpandedHeader = () => {
  const { openModal } = useStore();

  return (
    <>
      <div className={cx("header__top")}>
        <AuthButtons />
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
        <button className={cx("header__diet_button", "text-xsm")} onClick={openModal}>
          1일 식단 장바구니 안내
        </button>
        <MealInfoModal />
      </div>
    </>
  );
};

// 로그인 & 회원가입 버튼
const AuthButtons = () => {
  const { isLogin, logout, user } = useStore(); // ✅ Zustand 전역 상태 가져오기
  const router = useRouter();

  const logoutHandler = () => {
    if (!isLogin) return router.push("/login");

    logout();
    router.push("/");
  };

  return (
    <div className={cx("header__auth")}>
      <button className={cx("header__auth__button")} onClick={() => router.push(isLogin ? "/mypage" : "/login")}>
        {isLogin ? `${user?.name}님` : "회원가입"}
      </button>
      <div className={cx("header__divider")}>|</div>
      <button className={cx("header__auth__button")} onClick={logoutHandler}>
        {isLogin ? "로그아웃" : "로그인"}
      </button>
    </div>
  );
};

// 네비게이션 아이콘 (장바구니 & 프로필)
const NavIcons = () => {
  const router = useRouter();
  const { userImg } = useStore();
  return (
    <div className={cx("header__nav__icons")}>
      <ShoppingBasket className={cx("header__icon")} size={24} onClick={() => router.push("/cart")} />
      <button className={cx("header__mypage_icon__button")} onClick={() => router.push("/mypage")}>
        {userImg === null ? (
          <User className={cx("header__icon")} size={24} />
        ) : (
          <div className={cx("header__mypage_icon__div")}>
            <Image src={userImg} fill alt="user_img" objectFit="cover" />
          </div>
        )}
      </button>
    </div>
  );
};

// 로고 버튼
const HeaderLogo = () => {
  const router = useRouter();
  return (
    <button className={cx("header__logo")} onClick={() => router.push("/")}>
      <Image src="/favicon.ico" alt="하루담은 로고" width={40} height={40} />
      <span className={cx("header__logo_text", "title-md-b")}>{BRAND_NAMES["KOREAN"]}</span>
    </button>
  );
};
