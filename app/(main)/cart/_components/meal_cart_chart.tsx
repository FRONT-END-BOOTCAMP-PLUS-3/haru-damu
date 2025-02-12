"use client";

import { Bar } from "react-chartjs-2";

import { HEALTH_CHART_DATA } from "@/constants/aside";

import type { TNutrition } from "@/types";
import type { Context } from "chartjs-plugin-datalabels";

import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

interface MealCartChartProps {
  userNutrition: Omit<TNutrition, "g" | "calorie">;
  itemsNutrition: TNutrition[];
}

export default function MealCartChart({ userNutrition, itemsNutrition }: MealCartChartProps) {
  const labels = HEALTH_CHART_DATA.map((data) => data.kor);

  const userNutritionData =
    !userNutrition.carbohydrates || userNutrition.carbohydrates === 0
      ? {
          carbohydrates: 70,
          protein: 30,
          fat: 20,
          sodium: 800,
          sugar: 15,
        }
      : userNutrition;

  const nutritionKeys = Object.keys(userNutritionData);

  const sumItemsNutrition = (key: keyof TNutrition, itemsNutrition: TNutrition[]) => {
    return itemsNutrition.reduce((acc, cur) => {
      return acc + cur[key as keyof TNutrition];
    }, 0);
  };

  const calculatePercentage = (value: number, total: number): number => {
    if (value === 0 || total === 0) return 0;
    return Math.floor((total / value) * 100);
  };

  const mealNutrition = nutritionKeys.map((key) => {
    const oneMeal = Math.floor(userNutritionData[key as keyof Omit<TNutrition, "g" | "calorie">] / 3);
    const sumItems = Math.floor(sumItemsNutrition(key as keyof TNutrition, itemsNutrition));
    return {
      key,
      oneMeal,
      sumItems,
      percent: calculatePercentage(oneMeal, sumItems),
    };
  });

  const data = mealNutrition.map((data) => data.percent);
  const backgroundColor = mealNutrition.map((data) => {
    if (data.percent > 30 && data.percent < 70) return "rgba(255, 206, 86, 0.6)";
    if (data.percent > 71 && data.percent < 120) return "rgba(75, 192, 192, 0.6)";

    return "rgba(255, 99, 132, 0.6)";
  });

  const chartData = {
    labels,
    datasets: [
      {
        data: data,
        backgroundColor,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      BarElement: {
        horizontal: true,
      },
      datalabels: {
        color: "white",
        anchor: "center" as const, // as const 추가
        display: (context: Context) => {
          const chart = context.chart;
          const dataset = chart.data.datasets[context.datasetIndex];
          const isTotalLabel = dataset.data.length > 1 && context.dataIndex === dataset.data.length - 1;
          return !isTotalLabel;
        },
        formatter: (value: number) => `      ${value}%`,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 150,
        ticks: {
          color: "white",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
        },
      },
    },
  };

  return (
    <div>
      <Bar options={options} data={chartData} />
    </div>
  );
}
