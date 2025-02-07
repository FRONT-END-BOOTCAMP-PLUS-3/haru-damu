"use client";
import styles from "@/app/(main)/order/form/_components/subheading.module.css";

import classNames from "classnames/bind";

interface SubheadingProps {
  title: string;
}

const cx = classNames.bind(styles);

export default function Subheading({ title }: SubheadingProps) {
  return (
    <div className={cx("subheading_wrapper")}>
      <h2 className={cx("title-md-b", "subheading_title__h3")}>{title}</h2>
      <div className={cx("subheading_divider__div")}></div>
    </div>
  );
}
