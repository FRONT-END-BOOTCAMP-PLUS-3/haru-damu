"use client";

import { useEffect, useState } from "react";

import style from "@/components/common/pagination.module.css";

import classNames from "classnames";

const cx = classNames.bind(style);

interface PaginationProps {
  current?: number;
  total?: number;
  onClick: (page: number) => void;
}

export default function Pagination({ current = 1, total = 1, onClick }: PaginationProps) {
  const { wrapper, page_wrapper, current_page, button } = style;

  const [currentPage, setCurrentPage] = useState<number>(current);
  const [pages, setPages] = useState<number[]>([1]);

  const buttonStyle = cx(button);

  // 누른 버튼에 따라 page 번호를 계산하는 함수입니다.
  const getPage = (page: number | "previous" | "next", current: number) => {
    if (page === "previous") return current - 1;
    if (page === "next") return current + 1;
    return page;
  };

  const onClickHandler = (page: number | "previous" | "next", current = 1) => {
    const changedPage = getPage(page, current);

    setCurrentPage(changedPage);
    // 바뀐 번호를 props의 onClick을 통해서 사용할 수 있습니다.
    onClick(changedPage);
  };

  useEffect(() => {
    // 현재 페이지를 기준으로 5개의 페이지를 보여주고 있습니다.
    const length = total < 5 ? total : 5;

    const newPages = Array.from({ length }, (v, i) => {
      if (total < 5) return i + 1;
      if (currentPage < 3) return i + 1;
      if (total === currentPage) return i + (currentPage - 4);
      if (total - currentPage < 2) return i + (currentPage - 3);

      return i + (currentPage - 2);
    });

    setPages(newPages);
  }, [currentPage, total]);

  return (
    <div className={cx(wrapper, "text-xsm")}>
      <button
        className={buttonStyle}
        disabled={currentPage === 1}
        onClick={() => onClickHandler("previous", currentPage)}
      >
        {"<"}
      </button>
      <ul className={page_wrapper}>
        {pages.map((page) => (
          <li key={page}>
            <button
              className={cx(currentPage === page && current_page, buttonStyle)}
              onClick={() => onClickHandler(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
      <button
        className={buttonStyle}
        disabled={currentPage === total}
        onClick={() => onClickHandler("next", currentPage)}
      >
        {">"}
      </button>
    </div>
  );
}
