import { useState } from "react";

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

const GENDER_MAP: Record<string, string> = {
  M: "남성",
  F: "여성",
};

const ACTIVITY_MAP: Record<number, string> = {
  1: "매우 적은 활동량",
  2: "가벼운 활동",
  3: "보통 활동",
  4: "활발한 활동",
  5: "매우 활발",
};

import type { THealth } from "@/types";

import health from "@/dummys/health";
import { text } from "stream/consumers";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function HealthPage() {
  const [formData, setFormData] = useState<THealth>({ ...health });

  // TODO: API 연동
  const handleChange = (key: keyof THealth, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const getLabel = (key: keyof THealth) => HEALTH_FIELDS.find((field) => field.key === key)?.label || key.toString();

  const displayGender = GENDER_MAP[formData.gender_code] || "선택되지 않음";
  const displayActivity = ACTIVITY_MAP[formData.activity_code] || "선택되지 않음";

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
              itemList={GENDER_OPTIONS}
              currentItem={displayGender} // 사용자에게 보여줄 성별
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
              itemList={ACTIVITY_OPTIONS}
              width="480px"
              currentItem={displayActivity}
              onClick={(value) => handleChange("activity_code", value)}
              style={{ fontSize: "16px" }} // 어떻게 해도 글자크기가 안먹어서 이렇게 해놨습니다.
            />
          </div>
        </div>
      </div>

      <button className={cx("health__button", "text-md")}>{HEALTH_BUTTON}</button>
    </div>
  );
}
