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
}
