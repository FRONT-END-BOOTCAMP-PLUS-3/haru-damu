"use client";
import type { InputHTMLAttributes } from "react";
import { useState, useRef, useEffect } from "react";

import style from "@/components/common/dropdown.module.css";

import classNames from "classnames/bind";
import { ChevronUp, ChevronDown } from "lucide-react";

const cx = classNames.bind(style);

interface DropdownProps<T = string> extends Omit<InputHTMLAttributes<HTMLInputElement>, "onClick"> {
  placeHolder?: string;
  currentItem?: T;
  itemList: T[];
  width?: string;
  onClick: (value: T) => void;
}

export default function Dropdown({ placeHolder, currentItem, itemList, width, onClick, ...rest }: DropdownProps) {
  const [inputValue, setInputValue] = useState(currentItem || "");
  const [selectedValue, setSelectedValue] = useState<string | null>(currentItem || null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string) => {
    setInputValue(value);
    setSelectedValue(value);
    setIsOpen(false);
    onClick(value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cx("dropdown")} ref={dropdownRef} style={{ width }}>
      <div className={cx("dropdown__wrapper")}>
        <input
          type="text"
          value={inputValue}
          placeholder={placeHolder || "검색..."}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setInputValue(selectedValue || "")}
          className={cx("dropdown__input")}
          {...rest}
        />

        {isOpen ? (
          <ChevronUp size={16} onClick={() => setIsOpen(false)} />
        ) : (
          <ChevronDown size={16} onClick={() => setIsOpen(true)} />
        )}
      </div>
      {isOpen && (
        <ul className={cx("dropdown__list")}>
          {itemList.length > 0 &&
            itemList.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className={cx("dropdown__item", { "dropdown__item--selected": selectedValue === option })}
              >
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
