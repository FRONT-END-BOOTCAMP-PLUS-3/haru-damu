"use client";

import { useEffect } from "react";

import OrderPage from "@/app/(main)/mypage/_components/order";
import HealthPage from "@/app/(main)/mypage/_components/health";
import PersonalPage from "@/app/(main)/mypage/_components/personal";
import NutritionPage from "@/app/(main)/mypage/_components/nutrition";

import { useStore } from "@/hooks/usestore";

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
    if (mypagePath === "personal") {
      return <PersonalPage />;
    }
    if (mypagePath === "health") {
      return <HealthPage />;
    }
    if (mypagePath === "nutrition") {
      return <NutritionPage />;
    }
    return <NutritionPage />;
  };

  return renderPage();
}
