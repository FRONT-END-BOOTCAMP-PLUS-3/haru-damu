import ReactDOM from "react-dom";

import { useModalState } from "../../hooks/use_modal_state"; // useModalState 훅을 사용

import styles from "./modal.module.css";

export function Modal({ children }: { children: React.ReactNode }) {
  const { isOpen, closeModal } = useModalState();

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal(); // 모달 외부 클릭 시 닫기
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
