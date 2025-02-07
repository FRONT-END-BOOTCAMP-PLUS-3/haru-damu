import { NextResponse } from "next/server";

import { calcOneMeals } from "@/utils/onemeal_kcal";

import type { NextRequest } from "next/server";

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

export async function PUT(request: NextRequest) {
  try {
    const { id, newData } = await request.json();

    // 데이터베이스 업데이트 로직
    // await updateUserData(id, newData);

    // 응답 반환 (NextResponse 사용)
    return NextResponse.json({ message: "User data updated successfully." }, { status: 200 });
  } catch (error) {
    // 오류 처리 및 응답 반환
    return NextResponse.json({ message: "Error updating user data." }, { status: 500 });
  }
}
