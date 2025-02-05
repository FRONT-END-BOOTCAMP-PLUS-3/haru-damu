"use client";

import { useEffect } from "react";

import UserAside from "@/components/common/user_aside";
import OrderPage from "@/app/(main)/mypage/components/order";
// import HealthPage from "@/app/(main)/mypage/components/settings";
// import PersonalPage from "@/app/(main)/mypage/components/profile";
// import NutritionPage from "@/app/(main)/mypage/components/nutrition";

import styles from "./mypage.module.css";

import user from "@/dummys/user";
import health from "@/dummys/health";
import classNames from "classnames/bind";
import { useStore } from "@/hooks/usestore";

const cx = classNames.bind(styles);

export default function MypageLayout() {
  const { mypagePath, setMypagePath } = useStore(); // 현재 선택된 마이페이지 경로 가져오기

  // 선택된 페이지에 따라 렌더링할 컴포넌트 결정
  const renderPage = () => {
    if (mypagePath === "order") {
      return <OrderPage />;
    }
    // if (mypagePath === "personal") {
    //   return <PersonalPage />;
    // }
    // if (mypagePath === "health") {
    //   return <HealthPage />;
    // }
    // if (mypagePath === "nutrition") {
    //   return <NutritionPage />;
    // }
    // return <NutritionPage />;
  };

  // 페이지가 처음 렌더링될 때 경로를 설정해주는 로직을 추가할 수 있음
  useEffect(() => {
    if (!mypagePath) {
      setMypagePath("order");
    }
  }, [mypagePath, setMypagePath]);

  return (
    <div className={cx("container")}>
      <div className={cx("mypage__wrapper")}>
        {/* 왼쪽: UserAside 고정 */}
        <div className={cx("mypage__aside-wrapper")}>
          <UserAside user={user} health={health} />
        </div>

        {/* 오른쪽: 선택된 페이지 렌더링 */}
        <main className={cx("mypage_content")}>{renderPage()}</main>
      </div>
    </div>
  );
}
