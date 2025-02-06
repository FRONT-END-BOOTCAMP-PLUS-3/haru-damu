"use client";

import { useEffect } from "react";

import OrderPage from "@/app/(main)/mypage/_components/order";

import { useStore } from "@/hooks/usestore";
// import HealthPage from "@/app/(main)/mypage/components/settings";
// import PersonalPage from "@/app/(main)/mypage/components/profile";
// import NutritionPage from "@/app/(main)/mypage/components/nutrition";

export default function MypageStateWrapper() {
  const { mypagePath, setMypagePath } = useStore();

  useEffect(() => {
    if (!mypagePath) {
      setMypagePath("nutrition");
    }
  }, [mypagePath, setMypagePath]);

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

  return renderPage();
}
