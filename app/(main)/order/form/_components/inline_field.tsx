"use client";
import styles from "@/app/(main)/order/form/_components/inline_field.module.css";

import classNames from "classnames/bind";

interface InlineFieldProps {
  label?: string;
  value?: string;
}

const cx = classNames.bind(styles);

export default function InlineField({ label, value }: InlineFieldProps) {
  return (
    <div className={cx("inline_field_wrapper")}>
      <p className={cx("text-md-b", "inline_field_label__p")}>{label}</p>
      <p className={cx("text-md", "inline_field_value__p")}>{value}</p>
    </div>
  );
}
