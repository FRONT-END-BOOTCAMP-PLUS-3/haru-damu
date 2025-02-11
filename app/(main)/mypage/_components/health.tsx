import { useState, useEffect } from "react";

import Dropdown from "@/components/common/dropdown";

import { useStore } from "@/hooks/usestore";

import {
  calcBmr,
  calcRecommendedKcal,
  calcProtein,
  calcCarbohydrates,
  calcFat,
  calcSugar,
  calcSalt,
} from "@/utils/oneday_kcal";

import styles from "@/app/(main)/mypage/_components/health.module.css";

import {
  GENDER_OPTIONS as GenderOptions,
  HEALTH_BUTTON,
  HEALTH_TITLE,
  HEALTH_FIELDS,
  ACTIVITY_OPTIONS as ActivityOptions,
} from "@/constants/mypage";

import type { HealthDto } from "@/application/usecases/healths/dtos";

import classNames from "classnames/bind";

const GENDER_OPTIONS = [...GenderOptions];
const ACTIVITY_OPTIONS = [...ActivityOptions];
const cx = classNames.bind(styles);

export default function HealthPage() {
  const { addMessage } = useStore();

  // 기본값이 있으므로 NaN이 발생하지 않도록 기본 숫자 필드는 0으로 설정
  const [formData, setFormData] = useState<HealthDto>({
    activityCode: 0,
    genderCode: "" as "M" | "F",
    isCustom: false,
    createdAt: "",
    updatedAt: "",
    age: 0,
    height: 0,
    weight: 0,
  });

  useEffect(() => {
    async function fetchHealth() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage/healths`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            age: data.age ?? 0,
            height: data.height ?? 0,
            weight: data.weight ?? 0,
            genderCode: data.genderCode ?? "",
            activityCode: data.activityCode ?? 0,
            isCustom: data.isCustom ?? false,
            createdAt: data.createdAt ?? "",
            updatedAt: data.updatedAt ?? "",
          });
        } else {
          console.error("데이터를 가져오지 못했습니다.");
        }
      } catch (error) {
        console.error("fetchHealth 에러:", error);
      }
    }

    fetchHealth();
  }, []);

  const handleChange = (key: keyof HealthDto, value: string | number) => {
    // 숫자 값일 때 처리: 입력값을 number로 변환한 후 NaN이면 0을 사용
    if (key === "age" || key === "height" || key === "weight") {
      const parsed = Number(value);
      value = isNaN(parsed) ? 0 : parsed;
    }
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    if (
      formData.age == null ||
      formData.genderCode == null ||
      formData.weight == null ||
      formData.height == null ||
      formData.activityCode == null
    ) {
      addMessage("필수 정보를 모두 입력해 주세요.");
      return;
    }

    try {
      const nutrients = !formData.isCustom ? calculateDailyNutrients(formData) : {};

      const payload = { healthData: { ...formData, ...nutrients } };

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage/healths`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error("Failed to save health data");
      }
      addMessage("저장되었습니다.");
    } catch (error) {
      console.error("Error saving health data:", error);
    }
  };

  const calculateDailyNutrients = (healthData: HealthDto) => {
    const { age, genderCode, weight, height, activityCode } = healthData;

    if (age == null || genderCode == null || weight == null || height == null || activityCode == null) {
      throw new Error("필수 건강 정보가 누락되었습니다.");
    }

    const bmr = calcBmr(weight, height, age, genderCode);
    const recommendedKcal = calcRecommendedKcal(bmr, activityCode);
    const protein = calcProtein(weight, activityCode);
    const carbs = calcCarbohydrates(recommendedKcal);
    const fat = calcFat(recommendedKcal);
    const sugar = calcSugar(recommendedKcal);
    const sodium = calcSalt();

    return {
      calorie: Math.round(recommendedKcal),
      carbohydrates: Math.round(carbs),
      protein: Math.round(protein),
      fat: Math.round(fat),
      sodium: Math.round(sodium),
      sugar: Math.round(sugar),
    };
  };

  const handleGenderSelect = (selectedLabel: string) => {
    const selectedOption = GENDER_OPTIONS.find((option) => option.label === selectedLabel);
    if (selectedOption) {
      console.log(`선택된 성별 레이블: ${selectedLabel}, 값: ${selectedOption.value}`);
      handleChange("genderCode", selectedOption.value);
    } else {
      console.log(`선택된 성별 레이블이 GENDER_OPTIONS에 없습니다: ${selectedLabel}`);
    }
  };

  const handleActivitySelect = (selectedLabel: string) => {
    const selectedOption = ACTIVITY_OPTIONS.find((option) => option.label === selectedLabel);
    if (selectedOption) {
      console.log(`선택된 활동량 레이블: ${selectedLabel}, 값: ${selectedOption.value}`);
      handleChange("activityCode", selectedOption.value);
    } else {
      console.log(`선택된 활동량 레이블이 ACTIVITY_OPTIONS에 없습니다: ${selectedLabel}`);
      handleChange("activityCode", 0);
    }
  };

  const getLabel = (key: keyof HealthDto) => HEALTH_FIELDS.find((field) => field.key === key)?.label || key.toString();

  const safeValue = (num: number | null | undefined) => (num == null || isNaN(num) ? "" : String(num));

  return (
    <div className={cx("health")}>
      <h2 className={cx("health__title", "title-lg-b")}>{HEALTH_TITLE}</h2>
      <hr className={cx("health__divider")} />
      <div className={cx("health__form")}>
        {/* 연령 */}
        <div className={cx("health__row")}>
          <label className={cx("health__label", "text-md-b")}>{getLabel("age")}</label>
          <input
            type="number"
            className={cx("health__input", "text-md")}
            value={safeValue(formData.age)}
            onChange={(e) => handleChange("age", e.target.value)}
          />
        </div>

        {/* 성별 (드롭다운) */}
        <div className={cx("health__row")}>
          <label className={cx("health__label", "text-md-b")}>{getLabel("genderCode")}</label>
          <div className={cx("health__dropdown", "text-md")}>
            <Dropdown
              itemList={GENDER_OPTIONS.map((option) => option.label)}
              currentItem={
                GENDER_OPTIONS.find((option) => option.value === formData.genderCode)?.label || "선택되지 않음"
              }
              onClick={handleGenderSelect}
              placeHolder="성별을 선택하세요"
              width="480px"
              style={{ fontSize: "16px" }}
            />
          </div>
        </div>

        {/* 키 */}
        <div className={cx("health__row")}>
          <label className={cx("health__label", "text-md-b")}>{getLabel("height")}</label>
          <input
            type="number"
            className={cx("health__input", "text-md")}
            value={safeValue(formData.height)}
            onChange={(e) => handleChange("height", e.target.value)}
          />
        </div>

        {/* 몸무게 */}
        <div className={cx("health__row")}>
          <label className={cx("health__label", "text-md-b")}>{getLabel("weight")}</label>
          <input
            type="number"
            className={cx("health__input", "text-md")}
            value={safeValue(formData.weight)}
            onChange={(e) => handleChange("weight", e.target.value)}
          />
        </div>

        {/* 활동량 (드롭다운) */}
        <div className={cx("health__row")}>
          <label className={cx("health__label", "text-md-b")}>{getLabel("activityCode")}</label>
          <div className={cx("health__dropdown")}>
            <Dropdown
              itemList={ACTIVITY_OPTIONS.map((option) => option.label)}
              currentItem={
                formData.activityCode === 0
                  ? "선택되지 않음"
                  : ACTIVITY_OPTIONS.find((option) => option.value === formData.activityCode)?.label || "선택되지 않음"
              }
              onClick={handleActivitySelect}
              placeHolder="활동량을 선택하세요"
              width="480px"
              style={{ fontSize: "16px" }}
            />
          </div>
        </div>
      </div>
      <button className={cx("health__button", "text-md")} onClick={handleSave}>
        {HEALTH_BUTTON}
      </button>
    </div>
  );
}
