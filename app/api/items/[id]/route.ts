import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { SbItemRepository } from "@/infrastructure/repositories";
import { ItemPageUsecase } from "@/application/usecases/items/itempage_item_usecase";

const itemRepository = new SbItemRepository();
const itemPageUsecase = new ItemPageUsecase(itemRepository);

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const itemId = Number(params.id);
    if (isNaN(itemId)) {
      return NextResponse.json({ error: "Invalid item ID" }, { status: 400 });
    }

    const item = await itemPageUsecase.getItemPage(itemId);
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
