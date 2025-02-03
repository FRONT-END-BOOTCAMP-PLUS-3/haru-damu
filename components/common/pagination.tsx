"use client";

import { useEffect, useState } from "react";

import style from "@/components/common/pagination.module.css";

import classNames from "classnames/bind";
import { ChevronLeft, ChevronRight } from "lucide-react";

const cx = classNames.bind(style);

interface PaginationProps {
  current?: number;
  total?: number;
  limit?: number;
  onClick: (page: number) => void;
}

export default function Pagination({ current = 1, total = 1, limit = 5, onClick }: PaginationProps) {
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
    const length = total < limit ? total : limit;
    const halfLimit = Math.ceil(limit / 2);
    const remainderPage = total - currentPage;

    const newPages = Array.from({ length }, (v, i) => {
      if (total < limit || currentPage <= halfLimit) return i + 1;
      if (total === currentPage) return i + (currentPage - (limit - 1));
      if (remainderPage < halfLimit) return i + (currentPage - (limit - remainderPage - 1));

      return i + (currentPage - halfLimit);
    });

    setPages(newPages);
  }, [currentPage, total, limit]);

  useEffect(() => {
    setCurrentPage(current);
  }, [current]);

  return (
    <div className={cx(wrapper, "text-xsm")}>
      <button
        className={buttonStyle}
        disabled={currentPage === 1}
        onClick={() => onClickHandler("previous", currentPage)}
      >
        <ChevronLeft size={18} />
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
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
