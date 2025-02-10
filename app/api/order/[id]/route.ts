import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { ItemRepository, OrderRepository } from "@/domain/repositories";
import type { GetOrderByIdResponseDto } from "@/application/usecases/orders/dtos";

import { SbItemRepository, SbOrderRepository } from "@/infrastructure/repositories";
import { GetOrderDetailUsecase } from "@/application/usecases/orders/get_order_detail_usecase";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const orderId = Number(params.id);

  if (isNaN(orderId)) {
    return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
  }

  const orderRepository: OrderRepository = new SbOrderRepository();
  const itemRepository: ItemRepository = new SbItemRepository();

  const getOrderDetailUsecase = new GetOrderDetailUsecase(orderRepository, itemRepository);
  const order: GetOrderByIdResponseDto = await getOrderDetailUsecase.execute(orderId);

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(order);
}
