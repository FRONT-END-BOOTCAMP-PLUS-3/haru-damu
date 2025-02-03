import { useState } from "react";

import styles from "./dropdown.module.css";

import Image from "next/image";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface Option {
  value: string;
  iconSrc?: string; // 이미지 URL
}

interface DropdownProps {
  className?: string; // 외부 스타일 클래스
  options?: Option[]; // 옵션 데이터
}

export default function Dropdown({
  className = "",
  options = [
    { value: "Option 1", iconSrc: "/images/icon1.png" },
    { value: "Option 2", iconSrc: "/images/icon2.png" },
    { value: "Option 3", iconSrc: "/images/icon3.png" },
  ],
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false); // 드롭다운 닫기
  };

  return (
    <div className={cx("dropdown", className)}>
      {/* 드롭다운 버튼 */}
      <button onClick={toggleDropdown} className={cx("dropdown__button", { active: isOpen })}>
        {selectedOption?.iconSrc && (
          <Image
            src={selectedOption.iconSrc}
            alt={selectedOption.value}
            width={20}
            height={20}
            className={cx("dropdown__icon")}
          />
        )}
        {selectedOption?.value || "Select an option"}
      </button>

      {/* 드롭다운 리스트 */}
      {isOpen && (
        <ul className={cx("dropdown__list")}>
          {options.map((option) => (
            <li key={option.value} onClick={() => handleOptionClick(option)} className={cx("dropdown__item")}>
              {option.iconSrc && (
                <Image
                  src={option.iconSrc}
                  alt={option.value}
                  width={20}
                  height={20}
                  className={cx("dropdown__icon")}
                />
              )}
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
