"use client";

import { Pie } from "react-chartjs-2";

import style from "@/components/common/user_aside.module.css";

import type { THealth, TUser } from "@/types";
import type { TMypagePath } from "@/stores/mypage_store";

import classNames from "classnames/bind";
import { useStore } from "@/hooks/usestore";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

import { ASIDE_PATH, HEALTH_CHART_DATA, HONORIFIC_TEXT, NUTRITION_TITLE, WELCOME_TEXT } from "@/constants/aside";

const cx = classNames.bind(style);
ChartJS.register(Tooltip, ArcElement);

interface UserAsideProps {
  user: TUser;
  health: THealth;
}

export default function UserAside({ user, health }: UserAsideProps) {
  const { mypagePath: path } = useStore();

  const { name } = user;

  const isNutritionPage = path === "nutrition";

  return (
    <div className={cx("user_aside__wrapper")}>
      <div className={cx("user_aside__div")}>
        <span className="title-lg">{WELCOME_TEXT}</span>
        <div className={cx("user_aside__name__div", "title-lg-b")}>
          <span className={cx("user_aside__name")}>{name}</span>
          <span>{HONORIFIC_TEXT}</span>
        </div>
      </div>
      <ul>
        {!isNutritionPage && <AsideChart health={health} />}
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

function AsideChart({ health }: { health: THealth }) {
  const { calorie } = health;

  const chartData = HEALTH_CHART_DATA.map((data) => {
    return {
      ...data,
      value: health[data.eng as keyof THealth],
    };
  });

  const labels = chartData.map((data) => data.kor);
  const backgroundColor = chartData.map((data) => data.color);
  const values = chartData.map((data) => data.value);

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
    <div className={cx("aside_chart__wrapper")}>
      <span className={cx("aside_chart__title", "title-lg-b")}>{NUTRITION_TITLE}</span>
      <Pie data={pieData} />
      <span className={cx("aside_chart__sub", "text-lg")}>{`총 칼로리 ${calorie}kcal`}</span>
      <ul>
        {chartData.map((legend, idx) => (
          <li key={idx} className={cx("aside_chart__list")}>
            <div className={cx("aside_chart__list__div")} style={{ background: legend.color }} />
            <span>{`${legend.kor} : ${legend.value}g`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
