import getBlurImg from "@/utils/get_blur_img";

import type { Cart, ItemImage } from "@/domain/entities";
import type { SbCartRepository } from "@/infrastructure/repositories";

import type { CartDto, GetCartItemsResponseDto } from "./dtos";

export class CartUsecase {
  private sbCartRepository: SbCartRepository;

  constructor(cartRepository: SbCartRepository) {
    this.sbCartRepository = cartRepository;
  }

  async createCart(cart: Cart): Promise<CartDto | null> {
    const newCart = await this.sbCartRepository.create(cart);
    const img = newCart.item.itemImages;
    const blurImg = img && img[0].src ? await getBlurImg(img[0].src) : null;

    return {
      ...newCart,
      itemPrice: items.itemPrice,
      item: {
        ...newCart.item,
        itemId: newCart.itemId,
        img: img[0].src,
        blurImg,
      },
    };
  }

  async getCartByUserId(userId: number): Promise<GetCartItemsResponseDto | null> {
    const { count, data } = await this.sbCartRepository.findByUserIdWithItem(userId);

    const itemsWithBlurImg = await Promise.all(
      data.map(async (cart) => {
        const img = cart.item.itemImages;
        const blurImg = img && img[0].src ? await getBlurImg(img[0].src) : null;

        return {
          ...cart,
          itemName: cart.item.itemName,
          itemPrice: cart.item.itemPrice,
          img: img[0].src,
          blurImg,
          item: {
            ...cart.item,
            img: img[0].src,
            blurImg,
          },
        };
      }),
    );

    const totalPrice = data.reduce((acc, cur) => acc + cur.quantity * cur.item.itemPrice, 0);

    return {
      count,
      totalPrice,
      items: itemsWithBlurImg,
    };
  }

  async updateCart(userId: number, itemId: number, cart: Cart): Promise<Cart> {
    const newCartItem: Omit<Cart, "createdAt" | "updatedAt"> = {
      userId: cart.userId,
      itemId: cart.itemId,
      quantity: cart.quantity,
      wrapperId: cart.wrapperId,
      isChecked: cart.isChecked,
    };

    return this.sbCartRepository.update(userId, itemId, newCartItem);
  }

  async deleteCart(userId: number, itemId: number): Promise<number> {
    this.sbCartRepository.delete(userId, itemId);

    return itemId;
  }
  async upsertCart(userId: number, itemId: number, cart: Cart, quantity?: number): Promise<Cart | CartDto | null> {
    // 1️⃣ 현재 사용자의 장바구니 조회
    const existingCart = await this.getCartByUserId(userId);
    const existingItem = existingCart?.items.find((cartItem) => cartItem.itemId === itemId);

    if (existingItem) {
      // 2️⃣ 기존 수량 가져와서 quantity가 있으면 추가, 없으면 +1 증가
      const updatedQuantity = existingItem.quantity + (quantity ?? 1);

      // 3️⃣ 업데이트할 새로운 cart 객체 생성
      const updatedCartProps: Cart = {
        ...cart, // 기존 cart 객체 복사
        quantity: updatedQuantity, // 수량 증가
      };

      // 4️⃣ 업데이트 실행
      return await this.updateCart(userId, itemId, updatedCartProps);
    } else {
      // 새로운 아이템을 추가하는 경우
      const newCartProps: Cart = {
        ...cart,
        quantity: quantity ?? 1, // quantity가 없으면 기본값 1
      };

      return await this.createCart(newCartProps);
    }
  }
}
