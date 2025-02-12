import { NextResponse } from "next/server";

import getUser from "@/utils/supabase/get_user";

import type { NextRequest } from "next/server";

import { SbOrderRepository } from "@/infrastructure/repositories";
import { OrderUsecase } from "@/application/usecases/orders/order_usecases";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id: orderId } = await params;

    if (!orderId) return NextResponse.json({ message: "order 페이지를 찾을 수 없음" }, { status: 404 });

    const user = await getUser("user");

    const orderRepository: SbOrderRepository = new SbOrderRepository();
    const orderUsecase: OrderUsecase = new OrderUsecase(orderRepository);

    const data = await orderUsecase.getOrderById(user.userId, Number(orderId));

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("장바구니 get 에러:", error);
    return NextResponse.json({ message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
