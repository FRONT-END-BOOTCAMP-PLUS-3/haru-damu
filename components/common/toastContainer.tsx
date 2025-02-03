import styles from "@/components/common/toastContainer.module.css";

import classNames from "classnames/bind";
import Toast from "@/components/common/toast";

const cx = classNames.bind(styles);

interface ToastContainerProps {
  messages: Array<{ id: number; message: string; backgroundColor: string; onClickEvent?: () => void }>; // onClickEvent 추가
}

function ToastContainer({ messages }: ToastContainerProps) {
  return (
    <div className={cx("toast-container")}>
      {messages.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          backgroundColor={toast.backgroundColor}
          onClickEvent={toast.onClickEvent} // onClickEvent 전달
        />
      ))}
    </div>
  );
}

export default ToastContainer;
