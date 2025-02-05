"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import styles from "@/components/searchbar.module.css";

import { Search } from "lucide-react";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function SearchBar() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const navigateToSearch = () => {
    if (value.trim()) {
      router.push(`/search?query=${encodeURIComponent(value)}`);
    }
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigateToSearch();
    }
  };

  return (
    <div className={cx("search")}>
      <input
        type="text"
        className={cx("search__input", "text-md")}
        placeholder="검색어를 입력해주세요"
        value={value}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
      />
      <button className={cx("search__button")} onClick={navigateToSearch}>
        <Search size={20} />
      </button>
    </div>
  );
}
