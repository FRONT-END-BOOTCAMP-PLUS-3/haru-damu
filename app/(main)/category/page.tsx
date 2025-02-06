import CategoryResult from "@/app/(main)/category/_components/category_result";

import getBlurImg from "@/utils/get_blur_img";

import type { TItem } from "@/types";

import items from "@/dummys/items";

export default async function CategoryPage({ searchParams }: { searchParams: { page?: string } }) {
  const itemsPerPage = 20;
  const currentPage = Number(searchParams.page) || 1;

  // 페이지네이션 유효성 검사
  const totalPages = Math.ceil(items.length / itemsPerPage);
  if (currentPage < 1 || currentPage > totalPages) {
    return { notFound: true };
  }

  // 현재 페이지에 해당하는 아이템들만 가져오기
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  const newItems: TItem[] = [];
  for (const item of paginatedItems) {
    const blurImg = await getBlurImg(item.img);
    newItems.push({ ...item, blurImg, img: item.img });
  }

  return <CategoryResult items={newItems} totalItems={items.length} />;
}
