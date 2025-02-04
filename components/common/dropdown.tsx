"use client";
import { useState, useRef, useEffect } from "react";

import style from "@/components/common/dropdown.module.css";

import classNames from "classnames/bind";
import { ChevronUp, ChevronDown } from "lucide-react";

const cx = classNames.bind(style);

interface DropdownProps {
  options: string[];
  onSelect: (value: string) => void;
}

export default function Dropdown({ options, onSelect }: DropdownProps) {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string) => {
    setInputValue(value);
    setSelectedValue(value);
    setIsOpen(false);
    onSelect(value);
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
    <div className={cx("dropdown")} ref={dropdownRef}>
      <div className={cx("dropdown__wrapper")}>
        <input
          type="text"
          value={inputValue}
          placeholder="검색..."
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setInputValue(selectedValue || "")}
          className={cx("dropdown__input")}
        />

        {isOpen ? (
          <ChevronUp size={16} onClick={() => setIsOpen(false)} />
        ) : (
          <ChevronDown size={16} onClick={() => setIsOpen(true)} />
        )}
      </div>
      {isOpen && (
        <ul className={cx("dropdown__list")}>
          {options.length > 0 &&
            options.map((option) => (
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
