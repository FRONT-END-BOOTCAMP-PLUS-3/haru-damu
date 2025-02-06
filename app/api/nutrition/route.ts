import { NextResponse } from "next/server";

import { calcOneMeals } from "@/utils/onemeal_kcal";

import health from "@/dummys/health";

export async function GET() {
  const {
    weight,
    height,
    age,
    gender_code: gender,
    activity_code: activityLevel,
    is_custom,
    calorie,
    carbohydrates,
    protein,
    fat,
    sodium,
    sugar,
  } = health;

  const userInfo = {
    weight,
    height,
    age,
    gender,
    activityLevel,
  };
  const recommendedNutrition = calcOneMeals(weight, height, age, gender, activityLevel);
  const customNutrition = {
    is_custom,
    calorie,
    carbohydrates,
    protein,
    fat,
    sodium,
    sugar,
  };

  return NextResponse.json({
    userInfo,
    recommendedNutrition,
    customNutrition,
  });
}
