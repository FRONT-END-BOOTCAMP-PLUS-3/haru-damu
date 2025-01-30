"use client";

import ReactDOM from "react-dom";

import { modalStore } from "../../hooks/modalstore";

import styles from "./modal.module.css";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export function Modal({ children }: { children: React.ReactNode }) {
  const isOpen = modalStore((state) => state.modal.isOpen);
  const closeModal = modalStore((state) => state.closeModal);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal(); // 모달 외부 클릭 시 닫기
    }
  };

  return ReactDOM.createPortal(
    <div className={cx("overlay")} onClick={handleOverlayClick}>
      <div className={cx("modal")}>
        <div className={cx("modalContent")}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
