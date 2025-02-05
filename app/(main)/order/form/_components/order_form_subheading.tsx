import styles from "@/app/(main)/order/form/_components/order_form_subheading.module.css";

import classNames from "classnames/bind";

interface OrderFormSubheadingProps {
  title: string;
}

const cx = classNames.bind(styles);

export default function OrderFormSubheading({ title }: OrderFormSubheadingProps) {
  const { subheading_wrapper, subheading_title__h3, subheading_divider__div } = styles;
  return (
    <div className={subheading_wrapper}>
      <h2 className={cx("title-md-b", subheading_title__h3)}>{title}</h2>
      <div className={subheading_divider__div}></div>
    </div>
  );
}
