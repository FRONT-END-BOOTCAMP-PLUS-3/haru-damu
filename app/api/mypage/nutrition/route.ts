import { NextResponse } from "next/server";

import { SbHealthRepository } from "@/infrastructure/repositories/sb_health_repository";

import { calcOneMeals } from "@/utils/onemeal_kcal";

import type { NextRequest } from "next/server"; // 수정된 부분
import getUser from "@/utils/supabase/get_user"; // 추가된 부분

const healthRepository = new SbHealthRepository(); // 수정된 부분

export async function GET() {
  const user = await getUser("user"); // 추가된 부분
  if (!user || !("userId" in user)) {
    // 추가된 부분
    return NextResponse.json({ error: "User not found or user ID missing" }, { status: 404 }); // 추가된 부분
  } // 추가된 부분

  const health = await healthRepository.findByUserId(user.userId); // 건강 데이터와 영양 데이터 함께 가져오기

  if (!health) {
    return NextResponse.json({ error: "Health data not found" }, { status: 404 });
  }

  const {
    weight,
    height,
    age,
    genderCode,
    activityCode,
    isCustom,
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
    genderCode,
    activityCode,
  };
  const gender = genderCode === "M" || genderCode === "F" ? genderCode : "M";
  const recommendedNutrition = calcOneMeals(weight ?? 0, height ?? 0, age ?? 0, gender, activityCode ?? 0);
  const customNutrition = {
    isCustom,
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
    const { newData, isCustom } = await request.json();
    console.log("Received newData:", newData);
    console.log("Received isCustom:", isCustom);
    const user = await getUser("user");
    if (!user || !("userId" in user)) {
      return NextResponse.json({ error: "User not found or user ID missing" }, { status: 404 });
    }

    // Call updateNutrition with userId, isCustom, and newData
    await healthRepository.updateNutrition(user.userId, isCustom, newData); // Pass all three arguments

    return NextResponse.json({ message: "User data updated successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error updating user data:", error);
    return NextResponse.json({ message: "Error updating user data." }, { status: 500 });
  }
}
