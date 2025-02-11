"use client";

import { Pie } from "react-chartjs-2";

import { useStore } from "@/hooks/usestore";

import style from "@/components/common/user_aside.module.css";

import { MYPAGE_NUTRITION_CHART_COLOR } from "@/constants/mypage";
import { ASIDE_PATH, HONORIFIC_TEXT, NUTRITION_TITLE, WELCOME_TEXT } from "@/constants/aside";

import type { TMypagePath } from "@/stores/mypage_store";

import classNames from "classnames/bind";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

const cx = classNames.bind(style);
ChartJS.register(Tooltip, ArcElement);

export default function UserAside() {
  const { mypagePath: path } = useStore();
  const { user } = useStore();

  const name = user?.name;

  const isNutritionPage = path === "nutrition";

  return (
    <div className={cx("user_aside__wrapper")}>
      <div className={cx("user_aside__div")}>
        <span className={cx("user_aside__welcome", "title-lg")}>{WELCOME_TEXT}</span>
        <div className={cx("user_aside__name__div", "title-lg-b")}>
          <span className={cx("user_aside__name")}>{name}</span>
          <span>{HONORIFIC_TEXT}</span>
        </div>
      </div>
      <ul>
        {!isNutritionPage && <AsideChart />}
        {ASIDE_PATH.map((value, idx) => (
          <AsideButton key={idx} path={value.path} title={value.title} isCurrent={path === value.path} />
        ))}
      </ul>
    </div>
  );
}

function AsideButton({ path, title, isCurrent = false }: { path: TMypagePath; title: string; isCurrent?: boolean }) {
  const { setMypagePath } = useStore();

  return (
    <button onClick={() => setMypagePath(path)} className={cx(isCurrent && "aside_button__is_current", "aside_button")}>
      <span className={cx(isCurrent && "aside_button__span__is_current")}>{title}</span>
    </button>
  );
}

function AsideChart() {
  const { userNutrition } = useStore();

  const chartKeys = ["carbohydrates", "protein", "fat"];
  const chartData = userNutrition
    .filter((data) => chartKeys.includes(data.key))
    .map((data) => ({
      key: data.key,
      kor: data.label,
      value: data.value,
      color: MYPAGE_NUTRITION_CHART_COLOR[data.key] || "#999999",
    }));

  const additionalData = userNutrition.filter((data) => ["sodium", "sugar"].includes(data.key));

  const totalCalorie = userNutrition.find((item) => item.key === "calorie")?.value || 0;

  const pieData = {
    labels: chartData.map((data) => data.kor),
    datasets: [
      {
        data: chartData.map((data) => data.value),
        backgroundColor: chartData.map((data) => data.color),
        borderWidth: 4,
      },
    ],
  };

  return (
    <div className={cx("aside_chart__wrapper")}>
      <span className={cx("aside_chart__title", "title-lg-b")}>{NUTRITION_TITLE}</span>
      <Pie
        data={pieData}
        options={{
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              display: false,
            },
          },
          responsive: true,
          maintainAspectRatio: true,
        }}
      />
      <span className={cx("aside_chart__sub", "text-lg")}>{`총 칼로리 ${totalCalorie}kcal`}</span>
      <ul>
        {chartData.map((legend, idx) => (
          <li key={idx} className={cx("aside_chart__list")}>
            <div className={cx("aside_chart__list__div")} style={{ background: legend.color }} />
            <span>{`${legend.kor} : ${legend.value}g`}</span>
          </li>
        ))}
        {additionalData.map((legend, idx) => (
          <li key={idx} className={cx("aside_chart__list")}>
            <div className={cx("aside_chart__list__div")} style={{ background: "#999999" }} />
            <span>{`${legend.label} : ${legend.value}g`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
