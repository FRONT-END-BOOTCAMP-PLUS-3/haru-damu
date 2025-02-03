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
<<<<<<< HEAD
): {
  breakfast: MealNutrients;
  lunch: MealNutrients;
  dinner: MealNutrients;
  total: MealNutrients;
} {
=======
): { breakfast: MealNutrients; lunch: MealNutrients; dinner: MealNutrients } {
>>>>>>> 68169feebb8a36b83aab045fe1e865568bc274a7
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
<<<<<<< HEAD
      sodium: calcSalt() * mealRatio, // calcSalt 함수 호출로 변경
=======
      sodium: calcSalt * mealRatio,
>>>>>>> 68169feebb8a36b83aab045fe1e865568bc274a7
    };
  };

  // 각 식사별 계산
<<<<<<< HEAD
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
=======
  return {
    breakfast: calcMealNutrients(mealRatios.breakfast),
    lunch: calcMealNutrients(mealRatios.lunch),
    dinner: calcMealNutrients(mealRatios.dinner),
  };
>>>>>>> 68169feebb8a36b83aab045fe1e865568bc274a7
}
