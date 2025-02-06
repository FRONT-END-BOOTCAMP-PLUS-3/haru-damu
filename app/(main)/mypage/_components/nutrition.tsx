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
    const fetchedNutrition = await fetch(`${BASE_URL}/api/nutrition`);

    const {
      recommendedNutrition: { total: recommendedNutrition },
      customNutrition,
    } = await fetchedNutrition.json();

    const newNutrition: TMypageNutrition[] = MYPAGE_NUTRITION_LIST.map((nutrition) => {
      return {
        ...nutrition,
        value: customNutrition[nutrition.key as keyof THealth] as number,
        recommendValue: Math.ceil(recommendedNutrition[nutrition.key as keyof THealth] as number),
      };
    });

    setIsCustom(customNutrition.is_custom);
    setUserNutrition(newNutrition);
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
