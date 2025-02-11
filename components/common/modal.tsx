"use client";

import ReactDOM from "react-dom";

import { useStore } from "@/hooks/usestore";

import styles from "@/components/common/modal.module.css";

export function Modal({ children }: { children: React.ReactNode }) {
  const { isOpenModal, closeModal } = useStore();

  if (!isOpenModal) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const { modal_overlay, modal__box, modal__modalContent } = styles;

  return ReactDOM.createPortal(
    <div className={modal_overlay} onClick={handleOverlayClick}>
      <div className={modal__box}>
        <div className={modal__modalContent}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
