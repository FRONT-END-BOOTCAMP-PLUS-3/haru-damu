"use client";

import Toast from "@/components/common/toast";
import styles from "@/components/common/toastContainer.module.css";

import classNames from "classnames/bind";
import { useStore } from "@/hooks/usestore";

const cx = classNames.bind(styles);

function ToastContainer() {
  const { messages } = useStore();

  return (
    <div className={cx("toast-container")}>
      {messages.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          backgroundColor={toast.backgroundColor}
          onClickEvent={toast.onClickEvent} // onClickEvent 전달
        />
      ))}
    </div>
  );
}

export default ToastContainer;
