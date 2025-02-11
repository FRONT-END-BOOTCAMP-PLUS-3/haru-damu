// app/(main)/mypage/_components/nutrition.tsx
"use client";

import { useEffect } from "react";

import NutritionInfo from "@/app/(main)/mypage/_components/nutrition_info";
import NutritionChart from "@/app/(main)/mypage/_components/nutrition_chart";

import { useStore } from "@/hooks/usestore";

import { MYPAGE_NUTRITION_LIST } from "@/constants/mypage";

import type { THealth } from "@/types";
import type { TMypageNutrition } from "@/stores/mypage_store";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function Nutrition() {
  const { setUserNutrition, setIsCustom } = useStore();

  const fetchNutrition = async () => {
    try {
      const fetchedNutrition = await fetch(`${BASE_URL}/api/mypage/nutrition`);

      if (!fetchedNutrition.ok) {
        throw new Error("데이터를 불러오는 데 실패했습니다.");
      }

      const {
        recommendedNutrition: { total: recommendedNutrition },
        customNutrition,
      } = await fetchedNutrition.json();

      const newNutrition: TMypageNutrition[] = MYPAGE_NUTRITION_LIST.map((nutrition) => {
        return {
          ...nutrition,
          value: customNutrition[nutrition.key as keyof THealth] as number,
          recommendValue: Math.ceil(recommendedNutrition[nutrition.key as keyof THealth] as number),
          isCustom: false,
        };
      });

      setIsCustom(customNutrition.isCustom);
      setUserNutrition(newNutrition);
    } catch (error) {
      console.error("영양 정보를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchNutrition();
  }, []);

  return (
    <div>
      <NutritionChart />
      <NutritionInfo />
    </div>
  );
}
