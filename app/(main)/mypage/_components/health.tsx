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

const GENDER_OPTIONS = [...readonlyGenderOptions];
const ACTIVITY_OPTIONS = [...readonlyActivityOptions];

import type { GetHealth } from "@/application/usecases/healths/dtos/get_health_dto";
import type { PutHealthRequestDto } from "@/application/usecases/healths/dtos/put_health_dto";
import type { HealthDto, TActivityCode } from "@/application/usecases/healths/dtos/health_dto";

import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export default function HealthPage() {
  const [formData, setFormData] = useState<HealthDto>({
    activity_code: "" as unknown as TActivityCode,
    gender_code: "" as "M" | "F",
    is_custom: false,
    created_at: "",
    updated_at: "",
    age: 0,
    height: 0,
    weight: 0,
  });

  useEffect(() => {
    const fetchHealthData = async () => {
      const userId = localStorage.getItem("user_id");
      try {
        const response = await fetch(`/api/health/${userId}`);
        const result: GetHealth = await response.json();

        if (result?.health) {
          setFormData(result.health);
        }
      } catch (error) {
        console.error("Error fetching health data:", error);
      }
    };

    fetchHealthData();
  }, []);

  const handleChange = (key: keyof HealthDto, value: string | number) => {
    // 숫자 값만 처리하도록 검증
    if (key === "age" || key === "height" || key === "weight") {
      // NaN이 아니면 숫자 값으로 변환, NaN이면 기본값 0
      value = isNaN(Number(value)) ? 0 : Number(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const payload: PutHealthRequestDto = { health: formData };

      const response = await fetch(`/api/health`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save health data");
      }
    } catch (error) {
      console.error("Error saving health data:", error);
    }
  };

  const getLabel = (key: keyof HealthDto) => HEALTH_FIELDS.find((field) => field.key === key)?.label || key.toString();

  const displayGender =
    GENDER_OPTIONS.find((option) => option.value === formData.gender_code)?.label || "선택되지 않음";
  const displayActivity =
    ACTIVITY_OPTIONS.find((option) => option.value === formData.activity_code)?.label || "선택되지 않음";

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
            value={formData.age}
            onChange={(e) => handleChange("age", e.target.value)}
          />
        </div>

        {/* 성별 (드롭다운) */}
        <div className={cx("health__row")}>
          <label className={cx("health__label", "text-md-b")}>{getLabel("gender_code")}</label>
          <div className={cx("health__dropdown", "text-md")}>
            <Dropdown
              itemList={GENDER_OPTIONS.map((option) => option.label)}
              currentItem={displayGender}
              onClick={(value) => handleChange("gender_code", value)}
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
            value={formData.height}
            onChange={(e) => handleChange("height", e.target.value)}
          />
        </div>

        {/* 몸무게 */}
        <div className={cx("health__row")}>
          <label className={cx("health__label", "text-md-b")}>{getLabel("weight")}</label>
          <input
            type="number"
            className={cx("health__input", "text-md")}
            value={formData.weight}
            onChange={(e) => handleChange("weight", e.target.value)}
          />
        </div>

        {/* 활동량 (드롭다운) */}
        <div className={cx("health__row")}>
          <label className={cx("health__label", "text-md-b")}>{getLabel("activity_code")}</label>
          <div className={cx("health__dropdown")}>
            <Dropdown
              placeHolder="활동량을 선택하세요"
              itemList={ACTIVITY_OPTIONS.map((option) => option.label)}
              width="480px"
              currentItem={displayActivity}
              onClick={(value) => handleChange("activity_code", value)}
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
