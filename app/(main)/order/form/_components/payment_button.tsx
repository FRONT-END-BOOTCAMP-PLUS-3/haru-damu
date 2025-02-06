import styles from "@/app/(main)/order/form/_components/payment_button.module.css";

import classNames from "classnames/bind";

interface PaymentButtonProps {
  paymentName: string;
  brandColor: string;
  isChecked: boolean;
}

const cx = classNames.bind(styles);

export default function PaymentButton({ paymentName, brandColor, isChecked }: PaymentButtonProps) {
  const propsColor = {
    background: brandColor,
  };
  return (
    <label style={propsColor} className={cx("payment_button__label")}>
      <input type="radio" name="payment" defaultChecked={isChecked} className={cx("payment_button__input")} />
      {paymentName}
    </label>
  );
}
