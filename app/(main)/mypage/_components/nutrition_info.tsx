"use client";

import Input from "@/components/common/input";
import Button from "@/components/common/button";

import { useStore } from "@/hooks/usestore";

import style from "@/app/(main)/mypage/_components/nutrition_info.module.css";

import { APPROVE, CUSTOM_TEXT, EDIT, FIX, FIX_TEXT } from "@/constants/mypage";

import type { TMypageNutrition } from "@/stores/mypage_store";

import classNames from "classnames/bind";
import { ERROR_MESSAGE, UPDATE_SUCCESS_MESSAGE } from "@/constants";

const cx = classNames.bind(style);

export default function NutritionInfo() {
  const { addMessage, isCustom, setIsCustom, userNutrition, updateUserNutrition } = useStore();

  const toggleHandler = () => {
    const updatedIsCustom = !isCustom;
    setIsCustom(updatedIsCustom);

    const handleUpdate = async () => {
      try {
        const response = await fetch("/api/mypage/nutrition", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isCustom: updatedIsCustom,
            newData: userNutrition,
          }),
        });

        if (!response.ok) {
          throw new Error("업데이트 실패");
        }

        addMessage(UPDATE_SUCCESS_MESSAGE);
      } catch (error) {
        console.error("업데이트 중 오류 발생:", error);
        addMessage(ERROR_MESSAGE);
      }
    };

    handleUpdate();
  };

  const onChangeHandler = (key: keyof TMypageNutrition, value: string) => {
    console.log(value, typeof value);

    if (value.replace(/[^a-zA-Z]/g, "")) return addMessage("숫자만 입력해주세요!", "var(--important-color)");

    updateUserNutrition(key, Number(value));
  };

  const onClickHandler = () => {
    const handleUpdate = async () => {
      try {
        const response = await fetch("/api/mypage/nutrition", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isCustom,
            newData: userNutrition,
          }),
        });

        if (!response.ok) {
          throw new Error("업데이트 실패");
        }

        addMessage(UPDATE_SUCCESS_MESSAGE);
      } catch (error) {
        console.error("업데이트 중 오류 발생:", error);
        addMessage(ERROR_MESSAGE);
      }
    };

    handleUpdate();
  };

  return (
    <div className={cx("nutrition_info")}>
      {/* toggle */}
      <div className={cx("nutrition_info__toggle__wrapper")}>
        <span className={cx("nutrition_info__toggle__span")}>{isCustom ? FIX_TEXT : CUSTOM_TEXT}</span>
        <div
          className={cx(
            "nutrition_info__toggle",
            isCustom ? "nutrition_info__toggle_active" : "nutrition_info__toggle_inactive",
          )}
          onClick={toggleHandler}
        >
          <span className={cx("nutrition_info__toggle_text", "text-md-b")}>{isCustom ? EDIT : FIX}</span>
          <div className={cx("nutrition_info__toggle_circle")}></div>
        </div>
      </div>
      {/* input area */}
      <ul className={cx("nutrition_info__ul")}>
        {userNutrition.map((nutrition, idx) => (
          <li key={idx} className={cx("nutrition_info__li")}>
            <Input
              label={`${nutrition.label}(${nutrition.unit})`}
              inputValue={isCustom ? nutrition.value : nutrition.recommendValue}
              disabled={!isCustom}
              onChange={(value) => {
                onChangeHandler(nutrition.key as keyof TMypageNutrition, value as string);
              }}
            />
          </li>
        ))}
      </ul>
      {isCustom && (
        <Button text={APPROVE} width="50%" className={cx("nutrition_info__approve_button")} onClick={onClickHandler} />
      )}
    </div>
  );
}
