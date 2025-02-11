import { NextResponse } from "next/server";

import getUser from "@/utils/supabase/get_user";

import type { NextRequest } from "next/server";

import { SbOrderRepository } from "@/infrastructure/repositories";
import { OrderUsecase } from "@/application/usecases/orders/order_usecases";

export interface Order {
  userId: number;
  itemId: number;
  wrapperId: string | null;
  quantity: number;
  isChecked: boolean;
  itemName: string;
  itemPrice: number;
  img?: string;
  blurImg?: string;
  createdAt: string;
  updatedAt: string;
  status?: string;
}

export interface OrdersResponse {
  orders: Order[];
  total: number;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = searchParams.get("page");
    const size = searchParams.get("size");
    const filter = searchParams.get("filter");

    const user = await getUser("user");

    const orderRepository: SbOrderRepository = new SbOrderRepository();
    const orderUsecase: OrderUsecase = new OrderUsecase(orderRepository);

    const data = await orderUsecase.getOrderList(user.userId, page, size, filter);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("장바구니 get 에러:", error);
    return NextResponse.json({ message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body) return NextResponse.json({ message: "order 데이터 누락" }, { status: 400 });

    const user = await getUser("user");
    const { order } = body;

    const orderRepository: SbOrderRepository = new SbOrderRepository();
    const orderUsecase: OrderUsecase = new OrderUsecase(orderRepository);

    const data = await orderUsecase.createOrder({ userId: user.userId, order });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("장바구니 get 에러:", error);
    return NextResponse.json({ message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
