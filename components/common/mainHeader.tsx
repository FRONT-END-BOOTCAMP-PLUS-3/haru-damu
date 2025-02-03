"use client";

import styles from "@/components/common/mainHeader.module.css";

import Link from "next/link";
import Image from "next/image";
import classNames from "classnames/bind";
import { Menu, Search, ShoppingBasket, User } from "lucide-react";

const cx = classNames.bind(styles);

export default function MainHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        {/* 첫 번째 줄: 회원가입 / 로그인 */}
        <div className={styles.header__top}>
          <div className={styles.header__auth}>
            <Link href="/signup" className={styles.header__auth_link}>
              회원가입
            </Link>
            <span className={styles.header__divider}>|</span>
            <Link href="/login" className={styles.header__auth_link}>
              로그인
            </Link>
          </div>
        </div>

        {/* 두 번째 줄: 로고, 장바구니 & 사용자 아이콘 */}
        <div className={styles.header__middle}>
          <div className={styles.header__logo}>
            <Image src="/favicon.ico" alt="하루담은 로고" width={40} height={40} />
            <span className={styles.header__logo_text}>하루담은</span>
          </div>

          <div className={styles.header__icons}>
            <ShoppingBasket className={cx("header__icon", "header__icon--cart")} size={24} />
            <User className={cx("header__icon", "header__icon--user")} size={24} />
          </div>
        </div>

        {/* 세 번째 줄: 카테고리 버튼, 검색창, 1일 식단 장바구니 안내 버튼 */}
        <div className={styles.header__bottom}>
          <button className={styles.header__menu_button}>
            <Menu size={20} /> 카테고리
          </button>

          <div className={styles.header__search}>
            <input type="text" placeholder="검색어를 입력해주세요" className={styles.header__search_input} />
            <button className={styles.header__search_button}>
              <Search size={20} />
            </button>
          </div>

          <button className={styles.header__diet_button}>1일 식단 장바구니 안내</button>
        </div>
      </div>
    </header>
  );
}
