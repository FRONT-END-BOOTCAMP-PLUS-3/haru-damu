import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { SbItemRepository } from "@/infrastructure/repositories";
import { ItemUsecases } from "@/application/usecases/items/item_usecases";

const itemRepository = new SbItemRepository();
const itemUsecases = new ItemUsecases(itemRepository);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const page = Number(searchParams.get("page")) || 1;
  const limit = 20; // 페이지당 아이템 개수 (상수 관리 고려)

  if (!query) {
    return NextResponse.json({ error: "검색어가 필요합니다." }, { status: 400 });
  }

  if (!page) {
    return NextResponse.json({ error: "초기 페이지값이 필요합니다." }, { status: 400 });
  }

  try {
    const result = await itemUsecases.getItemsByQuery(query, page, limit);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json({ error: "서버에 문제가 발생했습니다." }, { status: 500 });
  }
}
