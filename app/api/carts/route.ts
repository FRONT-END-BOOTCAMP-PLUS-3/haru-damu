import { NextResponse } from "next/server";

import getUser from "@/utils/supabase/get_user";

import type { NextRequest } from "next/server";

import { SbCartRepository } from "@/infrastructure/repositories";
import { CartUsecase } from "@/application/usecases/carts/cart_usecases";

export async function CREATE(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || !body.cart) return NextResponse.json({ message: "cart 데이터 누락" }, { status: 400 });

    const user = await getUser("user");

    const cartRepository: SbCartRepository = new SbCartRepository();
    const cartUsecase: CartUsecase = new CartUsecase(cartRepository);

    const newCart = {
      userId: user.userId,
      ...body.cart,
    };

    const data = await cartUsecase.createCart(newCart);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("장바구니 get 에러:", error);
    return NextResponse.json({ message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const user = await getUser("user");

    const cartRepository: SbCartRepository = new SbCartRepository();
    const cartUsecase: CartUsecase = new CartUsecase(cartRepository);

    const data = await cartUsecase.getCartByUserId(user.userId);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("장바구니 get 에러:", error);
    return NextResponse.json({ message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    console.log(body);

    if (!body || !body.itemId || !body.cart)
      return NextResponse.json({ message: "itemId 혹은 cart 데이터 누락" }, { status: 400 });

    const { itemId, cart } = body;

    const user = await getUser("user");
    if (!user) return NextResponse.json({ message: "인증 실패: 유저 정보를 찾을 수 없습니다." }, { status: 401 });

    const cartRepository: SbCartRepository = new SbCartRepository();
    const cartUsecase: CartUsecase = new CartUsecase(cartRepository);

    const item = await cartUsecase.updateCart(user.userId, itemId, cart);

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.error("장바구니 put 에러:", error);
    return NextResponse.json({ message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || !body.itemId) return NextResponse.json({ message: "itemId 누락" }, { status: 400 });

    const { itemId } = body;

    const user = await getUser("user");
    if (!user) return NextResponse.json({ message: "인증 실패: 유저 정보를 찾을 수 없습니다." }, { status: 401 });

    const cartRepository: SbCartRepository = new SbCartRepository();
    const cartUsecase: CartUsecase = new CartUsecase(cartRepository);

    const id = await cartUsecase.deleteCart(user.userId, itemId);

    return NextResponse.json({ itemId: id }, { status: 200 });
  } catch (error) {
    console.error("장바구니 delete 에러:", error);
    return NextResponse.json({ message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
