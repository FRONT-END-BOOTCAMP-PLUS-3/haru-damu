// BMR 계산
export function calcBMR(weight: number, height: number, age: number, isMale: boolean): number {
  return isMale ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;
}

// 권장 칼로리 계산
export function calcRecommendedKcal(bmr: number, activityLevel: number): number {
  const calcActivity = [1.2, 1.37, 1.55, 1.725, 1.9];
  // [매우 적은 활동량, 가벼운 활동, 보통 활동, 활발한 활동, 매우 활발];
  return bmr * calcActivity[activityLevel - 1];
}

// 단백질 계산(단백질은 체중의 1.2배)
export function calcProtein(weight: number, activityLevel: number): number {
  const activityRate = activityLevel <= 3 ? 0.8 : 1.2; // 활동량에 따른 단백질 배율
  return weight * activityRate;
}

// 탄수화물 계산(탄수화물은 권장 칼로리의 55%)
export function calcCarbohydrates(recommendedKcal: number): number {
  return (recommendedKcal * 0.55) / 4; // 1g 탄수화물 = 4kcal
}

// 지방 계산(지방은 권장 칼로리의 25%)
export function calcFat(recommendedKcal: number): number {
  return (recommendedKcal * 0.25) / 9; // 1g 지방 = 9kcal
}

// 당 계산(당은 권장 칼로리의 7.5%)
export function calcSugar(recommendedKcal: number): number {
  return recommendedKcal * 0.075; // 권장 칼로리의 7.5%
}

// 나트륨 계산 (고정값)
export const calcSalt = 2000; // 2000mg
