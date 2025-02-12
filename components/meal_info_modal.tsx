"use client";

import Image from "next/image";

import { Modal } from "@/components/common/modal";

import style from "@/components/meal_info_modal.module.css";

import classNames from "classnames/bind";

const cx = classNames.bind(style);

export default function MealInfoModal() {
  return (
    <Modal>
      <div className={cx("meal_info__wrapper")}>
        <div className={cx("meal_info__title", "title-lg-b")}>🛒 1일 식단 장바구니란? 🛒</div>
        <div className={cx("meal_info__text", "text-lg")}>
          <div>
            한끼 장바구니에 담은 상품들을 한끼 식사 영양소에 맞게 칼로리와 영양성분을 계산해서 그래프로 보여드리는
            서비스 입니다!
          </div>
          <div>드래그 앤 드랍을 통해 쉽게 사용할 수 있고, 마음에 든다면 묶음으로 만들수도 있습니다.</div>
          <div>지금 상품을 담고 장바구니를 누리세요! 🎉</div>
        </div>
        <div className={cx("meal_info__img")}>
          <Image fill src="/meal_info.gif" alt="meal-info" style={{ objectFit: "cover" }} unoptimized/>
        </div>
      </div>
    </Modal>
  );
}
