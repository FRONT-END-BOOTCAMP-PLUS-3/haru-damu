"use client";
import styles from "@/components/common/label_value_text.module.css";

import classNames from "classnames/bind";

interface LabelValueTextProps {
  label?: string;
  value?: string;
}

const cx = classNames.bind(styles);

export default function LabelValueText({ label, value }: LabelValueTextProps) {
  return (
    <div className={cx("label_value_text_wrapper")}>
      <p className={cx("text-md-b", "label_value_text_label__p")}>{label}</p>
      <p className={cx("text-md", "label_value_text_value__p")}>{value}</p>
    </div>
  );
}
