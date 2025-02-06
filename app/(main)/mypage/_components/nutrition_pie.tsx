"use client";

import { Pie } from "react-chartjs-2";

import { useStore } from "@/hooks/usestore";

import unitConverter from "@/utils/unit_converter";

import style from "@/app/(main)/mypage/_components/nutrition_pie.module.css";

import { MYPAGE_NUTRITION_CHART_COLOR } from "@/constants/mypage";

import classNames from "classnames/bind";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(Tooltip, ArcElement);

const cx = classNames.bind(style);

export default function NutritionPie() {
  const { isCustom, userNutrition } = useStore();

  const legends = userNutrition
    .filter((data) => data.key !== "calorie")
    .map((data) => {
      if (data.key === "sodium")
        return {
          ...data,
          value: isCustom
            ? unitConverter("mg", "g", data.value).value
            : unitConverter("mg", "g", data.recommendValue).value,
          color: MYPAGE_NUTRITION_CHART_COLOR[data.key as keyof typeof MYPAGE_NUTRITION_CHART_COLOR],
        };

      return {
        ...data,
        value: isCustom ? data.value : data.recommendValue,
        color: MYPAGE_NUTRITION_CHART_COLOR[data.key as keyof typeof MYPAGE_NUTRITION_CHART_COLOR],
      };
    });

  const labels = legends.map((data) => data.label);
  const backgroundColor = legends.map((data) => data.color);
  const values = legends.map((data) => data.value);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
  };

  const pieData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColor,
        borderWidth: 4,
      },
    ],
  };

  return (
    <div className={cx("nutrition_pie__wrapper")}>
      <Pie options={options} data={pieData} />
      <ul className={cx("nutrition_pie__ul")}>
        {legends.map((legend, idx) => (
          <li key={idx} className={cx("nutrition_pie__list")}>
            <div className={cx("nutrition_pie__list__div")} style={{ background: legend.color }} />
            <span>{`${legend.label}`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
