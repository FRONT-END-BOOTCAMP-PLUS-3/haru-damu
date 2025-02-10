import { NextResponse } from "next/server";

import { SbItemRepository } from "@/infrastructure/repositories";
import { MainItemsUseCase } from "@/application/usecases/items/main_items_usecase";
export async function GET() {
  try {
    const repository = new SbItemRepository();
    const useCase = new MainItemsUseCase(repository);
    const response = await useCase.execute();
    console.log(response);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching main items:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
