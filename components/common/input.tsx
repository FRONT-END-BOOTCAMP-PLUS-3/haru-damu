"use client";

import { useState } from "react";
import type { ChangeEvent, InputHTMLAttributes } from "react";

import style from "@/components/common/input.module.css";

import classNames from "classnames";

const cx = classNames.bind(style);

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  width?: number | string;
  direction?: "vertical" | "horizontal";
  placeholder?: string;
  inputValue?: string | number;
  onChange?: (value: string | number) => void;
  waringMsg?: string;
}

export default function Input({
  width = "100%",
  label,
  direction = "horizontal",
  type = "text",
  placeholder = "",
  inputValue = "",
  onChange,
  waringMsg,
  ...rest
}: InputProps) {
  const { wrapper, vertical, horizontal, input_label, msg_wrapper, input, warning_msg } = style;

  const [value, setValue] = useState<string | number>(inputValue);

  const isVertical = direction === "vertical";

  // onChange가 들어오지 않아도 기본 동작을 합니다.
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;

    setValue(value);
    onChange && onChange(value);
  };

  return (
    <div className={cx(wrapper, isVertical ? vertical : horizontal)} style={{ width }}>
      <label htmlFor={label} className={cx(input_label, "text-md-b")}>
        {label}
      </label>
      <div className={cx(msg_wrapper, vertical)}>
        <input
          id={label}
          type={type}
          className={cx(input, "text-md")}
          placeholder={placeholder}
          value={value}
          onChange={onChangeHandler}
          {...rest}
        />
        {waringMsg && <span className={`${warning_msg} text-sm`}>{waringMsg}</span>}
      </div>
    </div>
  );
}
