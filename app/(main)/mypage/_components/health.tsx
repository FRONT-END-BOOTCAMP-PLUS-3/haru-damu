import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";

import Dropdown from "@/components/common/dropdown";

import styles from "@/app/(main)/mypage/_components/health.module.css";

import {
  GENDER_OPTIONS as readonlyGenderOptions,
  HEALTH_BUTTON,
  HEALTH_TITLE,
  HEALTH_FIELDS,
  ACTIVITY_OPTIONS as readonlyActivityOptions,
} from "@/constants/mypage";

import type { HealthDto } from "@/application/usecases/healths/dtos";

import classNames from "classnames/bind";

const GENDER_OPTIONS = [...readonlyGenderOptions];
const ACTIVITY_OPTIONS = [...readonlyActivityOptions];
const cx = classNames.bind(styles);

export default function HealthPage() {
  // userId를 고정 값 1로 사용
  const fixedUserId = 1;
  const router = useRouter();

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

  const [, setHealth] = useState<HealthDto | null>(null);

  useEffect(() => {
    async function fetchHealth() {
      try {
        const res = await fetch(`/api/mypage/healths/${fixedUserId}`);
        if (res.ok) {
          const data = await res.json();
          // 만약 받아온 데이터에 숫자 필드가 undefined 혹은 NaN일 경우, 기본값(0)으로 처리합니다.
          setHealth(data);
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
  }, [fixedUserId]);

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
    try {
      const payload = { healthData: formData };

      const response = await fetch(`/api/mypage/healths/${fixedUserId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // 응답 상태 코드와 본문을 로그로 출력
      console.log("Response Status:", response.status);
      const responseBody = await response.json(); // 응답 본문을 JSON으로 읽기
      console.log("Response Body:", responseBody);

      if (!response.ok) {
        throw new Error("Failed to save health data");
      }
      // 저장 후 예시로 마이페이지로 이동
      router.push(`/mypage`);
    } catch (error) {
      console.error("Error saving health data:", error);
    }
  };

  const handleGenderSelect = (selectedLabel: string) => {
    const selectedOption = GENDER_OPTIONS.find((option) => option.label === selectedLabel);
    if (selectedOption) {
      // 상태에 올바른 value("M" 또는 "F")를 저장
      handleChange("genderCode", selectedOption.value);
    }
  };

  const handleActivitySelect = (selectedLabel: string) => {
    const selectedOption = ACTIVITY_OPTIONS.find((option) => option.label === selectedLabel);
    if (selectedOption) {
      handleChange("activityCode", selectedOption.value);
    }
  };

  const getLabel = (key: keyof HealthDto) => HEALTH_FIELDS.find((field) => field.key === key)?.label || key.toString();

  // 숫자 필드의 value가 NaN이면 빈 문자열을 전달하도록 처리합니다.
  const safeValue = (num: number | undefined) => (num === undefined || isNaN(num) ? "" : String(num));

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
              placeHolder="활동량을 선택하세요"
              itemList={ACTIVITY_OPTIONS.map((option) => option.label)}
              width="480px"
              currentItem={
                ACTIVITY_OPTIONS.find((option) => option.value === formData.activityCode)?.label || "선택되지 않음"
              }
              onClick={handleActivitySelect}
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
