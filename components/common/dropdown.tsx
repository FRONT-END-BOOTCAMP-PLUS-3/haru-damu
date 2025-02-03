import { useState, useEffect, useRef } from "react";

import styles from "@/components/common/dropdown.module.css";

import Image from "next/image";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface DropdownProps {
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

export default function Dropdown({ options, onSelect, placeholder = "검색..." }: DropdownProps) {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (inputValue) {
      setFilteredOptions(options.filter((option) => option.toLowerCase().includes(inputValue.toLowerCase())));
      setIsOpen(true);
    } else {
      setFilteredOptions(options);
      setIsOpen(false); // 검색어가 없을 때 드롭다운 닫기
    }
  }, [inputValue, options]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      setHighlightIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
    } else if (event.key === "ArrowUp") {
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault(); // 폼 제출 방지
      if (isOpen && filteredOptions.length > 0) {
        const selectedValue = highlightIndex >= 0 ? filteredOptions[highlightIndex] : filteredOptions[0];
        handleSelect(selectedValue);
      }
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    if (highlightIndex >= 0 && optionRefs.current[highlightIndex]) {
      optionRefs.current[highlightIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightIndex]);

  function handleSelect(value: string) {
    setInputValue(value);
    setIsOpen(false);
    setHighlightIndex(-1);
    onSelect(value);
  }

  function handleDropdownToggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className={cx("dropdown")} ref={dropdownRef}>
      <div className={cx("dropdown__wrapper")}>
        <input
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={cx("dropdown__input")}
        />
        <Image src="/button/dropdown.svg" alt="dropdown" width={20} height={20} onClick={handleDropdownToggle} />
      </div>
      {isOpen && filteredOptions.length > 0 && (
        <ul className={cx("dropdown__list")}>
          {filteredOptions.map((option, index) => (
            <li
              key={option}
              ref={(el) => {
                optionRefs.current[index] = el;
              }}
              className={cx("dropdown__item", {
                "dropdown__item--highlighted": highlightIndex === index,
              })}
              onClick={() => handleSelect(option)} // 🔹 `onMouseDown` → `onClick`으로 변경하여 클릭 정상 동작
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
