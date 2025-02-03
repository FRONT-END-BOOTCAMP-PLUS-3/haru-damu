"use client";

import ReactDOM from "react-dom";

import styles from "@/components/common/modal.module.css";

import { modalStore } from "@/hooks/modalstore";

export function Modal({ children }: { children: React.ReactNode }) {
  const isOpen = modalStore((state) => state.modal.isOpen);
  const closeModal = modalStore((state) => state.closeModal);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
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
