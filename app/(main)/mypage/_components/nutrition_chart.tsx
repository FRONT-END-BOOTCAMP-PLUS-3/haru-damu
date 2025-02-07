"use client";

import NutritionBar from "@/app/(main)/mypage/_components/nutrition_bar";
import NutritionPie from "@/app/(main)/mypage/_components/nutrition_pie";

import style from "@/app/(main)/mypage/_components/nutrition_chart.module.css";

import { NUTRITION_CHART_TITLE } from "@/constants/mypage";

import classNames from "classnames/bind";

const cx = classNames.bind(style);

export const CUSTOM_CHART_TITLE = "현재 영양소 비율";
export const PERCENT_CHART_TITLE = "권장 영양소와 현재 영양소 비교(%)";

export default function NutritionChart() {
  return (
    <div className={cx("nutrition_chart__wrapper")}>
      <span className="title-lg-b">{NUTRITION_CHART_TITLE}</span>
      <div className={cx("nutrition_chart__flex")}>
        <div className={cx("nutrition_chart__div")}>
          <div className="title-sm">{CUSTOM_CHART_TITLE}</div>
          <NutritionPie />
        </div>
        <div className={cx("nutrition_chart__div")}>
          <div className="title-sm">{PERCENT_CHART_TITLE}</div>
          <NutritionBar />
        </div>
      </div>
    </div>
  );
}
