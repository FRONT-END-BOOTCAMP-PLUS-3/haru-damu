import {
  calcBmr,
  calcCarbohydrates,
  calcFat,
  calcProtein,
  calcRecommendedKcal,
  calcSalt,
  calcSugar,
} from "./oneday_kcal";

// 식사별 영양소 계산
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
  isMale: boolean,
  activityLevel: number,
): { breakfast: MealNutrients; lunch: MealNutrients; dinner: MealNutrients } {
  // BMR 계산
  const bmr = calcBmr(weight, height, age, isMale);

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
      sodium: calcSalt * mealRatio,
    };
  };

  // 각 식사별 계산
  return {
    breakfast: calcMealNutrients(mealRatios.breakfast),
    lunch: calcMealNutrients(mealRatios.lunch),
    dinner: calcMealNutrients(mealRatios.dinner),
  };
}
