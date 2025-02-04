import {
  calcBmr,
  calcCarbohydrates,
  calcFat,
  calcProtein,
  calcRecommendedKcal,
  calcSalt,
  calcSugar,
} from "@/utils/oneday_kcal";

// 식사별 영양소 타입
type MealNutrients = {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  sugar: number;
  sodium: number;
};

export function calcOneMeals(
  weight: number,
  height: number,
  age: number,
  gender: "M" | "F",
  activityLevel: number,
): {
  breakfast: MealNutrients;
  lunch: MealNutrients;
  dinner: MealNutrients;
  total: MealNutrients;
} {
  // BMR 계산
  const bmr = calcBmr(weight, height, age, gender);

  // 권장 칼로리 계산
  const recommendedKcal = calcRecommendedKcal(bmr, activityLevel);

  // 아침, 점심, 저녁 비율
  const mealRatios = { breakfast: 0.3, lunch: 0.4, dinner: 0.3 };

  // 영양소 계산 함수
  const calcMealNutrients = (mealRatio: number): MealNutrients => {
    const mealCalories = recommendedKcal * mealRatio;
    return {
      calories: mealCalories,
      protein: calcProtein(weight, activityLevel) * mealRatio,
      carbohydrates: calcCarbohydrates(mealCalories),
      fat: calcFat(mealCalories),
      sugar: calcSugar(mealCalories),
      sodium: calcSalt() * mealRatio,
    };
  };

  // 각 식사별 계산
  const breakfast = calcMealNutrients(mealRatios.breakfast);
  const lunch = calcMealNutrients(mealRatios.lunch);
  const dinner = calcMealNutrients(mealRatios.dinner);

  // 하루 총 영양소 계산
  const total: MealNutrients = {
    calories: breakfast.calories + lunch.calories + dinner.calories,
    protein: breakfast.protein + lunch.protein + dinner.protein,
    carbohydrates: breakfast.carbohydrates + lunch.carbohydrates + dinner.carbohydrates,
    fat: breakfast.fat + lunch.fat + dinner.fat,
    sugar: breakfast.sugar + lunch.sugar + dinner.sugar,
    sodium: breakfast.sodium + lunch.sodium + dinner.sodium,
  };

  return { breakfast, lunch, dinner, total };
}
