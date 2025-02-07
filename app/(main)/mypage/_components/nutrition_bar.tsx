"use client";

import { Bar } from "react-chartjs-2";

import { useStore } from "@/hooks/usestore";

import style from "@/app/(main)/mypage/_components/nutrition_bar.module.css";

import type { Context } from "chartjs-plugin-datalabels";

import classNames from "classnames/bind";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

const cx = classNames.bind(style);

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

export default function NutritionBar() {
  const { isCustom, userNutrition } = useStore();

  const labels = userNutrition.map((data) => data.label);

  const calculatePercentage = (value = 1, total = 1): number => {
    if (value === 0 || total === 0) return 0;

    return Math.floor((value / total) * 100);
  };

  const dayNutrition = userNutrition.map((nutrition) => {
    return {
      ...nutrition,
      percent: isCustom ? calculatePercentage(nutrition.value, nutrition.recommendValue) : 100,
    };
  });

  const data = dayNutrition.map((data) => data.percent);
  const backgroundColor = dayNutrition.map((data) => {
    if (data.percent === 100) return "#228B22";

    if (data.percent < 30 && data.percent > 140) return "##FF9F40";
    if (data.percent < 70 && data.percent > 50) return "##FFCE56";
    if (data.percent < 120 && data.percent > 71) return "#32CD32";

    return "#FF6384";
  });

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
      },
    ],
  };

  const options = {
    indexAxis: "x" as const,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      maintainAspectRatio: false,
      datalabels: {
        color: "black",
        anchor: "center" as const,
        display: (context: Context) => {
          const chart = context.chart;
          const dataset = chart.data.datasets[context.datasetIndex];
          const isTotalLabel = dataset.data.length > 1 && context.dataIndex === dataset.data.length - 1;
          return !isTotalLabel;
        },
        formatter: (value: number) => `${value}%`,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "black",
        },
      },
      y: {
        max: 200,
        beginAtZero: true,
        reverse: false,
        ticks: {
          color: "black",
        },
      },
    },
  };

  return (
    <div className={cx("nutrition_bar__wrapper")}>
      <Bar height={"270px"} options={options} data={chartData} />
      <ul className={cx("nutrition_bar__ul")}>
        {dayNutrition.map((data, idx) => (
          <li key={idx} className={cx("nutrition_bar__list")}>
            <div className={cx("nutrition_bar__list__div")} style={{ background: backgroundColor[idx] }} />
            <span>{`${data.label}`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
