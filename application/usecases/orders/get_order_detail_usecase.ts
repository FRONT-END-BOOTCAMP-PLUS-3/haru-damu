// import getBlurImg from "@/utils/get_blur_img";

// import type { TItem } from "@/types";
import type { CartDto } from "@/application/usecases/carts/dtos";
import type { Order, Cart, Item, ItemImage } from "@/domain/entities";
import type { ItemRepository, OrderRepository } from "@/domain/repositories";
import type { ItemDto, TCategoryCode, TItemCode, TUnit } from "@/application/usecases/items/dtos";
import type { GetOrderByIdResponseDto, OrderDto, TOrderStatus } from "@/application/usecases/orders/dtos";

// 주문상세 페이지 params id에 따른 GetOrderByIdResponseDto 매퍼

export class GetOrderDetailUsecase {
  constructor(
    private orderRepository: OrderRepository,
    private itemRepository: ItemRepository,
  ) {}

  private mapItemToDto(item: Item, itemImage: ItemImage | null): ItemDto {
    return {
      itemId: item.id,
      storeId: item.storeId,
      itemName: item.itemName,
      itemPrice: item.itemPrice,
      img: itemImage?.src ?? undefined,
      blurImg: undefined,
      description: item.description ?? undefined,
      categoryCode: item.categoryCode as TCategoryCode,
      itemCode: item.itemCode as TItemCode,
      unitType: item.unitType as TUnit,
      volume: item.volume,
      nutrition: item.nutrition,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    };
  }

  private mapCartToDto(cart: Cart, item: Item, itemImage: ItemImage | null): CartDto {
    return {
      itemId: cart.itemId,
      item: this.mapItemToDto(item, itemImage),
      quantity: cart.quantity,
      wrapperId: cart.wrapperId,
      isChecked: cart.isChecked,
      createdAt: cart.createdAt.toISOString(),
      updatedAt: cart.updatedAt.toISOString(),
    };
  }

  private mapOrderToDto(order: Order, cartDtos: CartDto[]): OrderDto {
    return {
      orderId: order.id,
      orderAddress: order.orderAddress,
      totalPrice: order.totalPrice,
      orderList: cartDtos,
      status: order.status as TOrderStatus,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
    };
  }

  async execute(orderId: number): Promise<GetOrderByIdResponseDto> {
    const order = await this.orderRepository.findOneById(orderId);

    if (!order) {
      throw new Error("Order 찾을 수 없음");
    }

    const itemIds = order.orderList.map((cart) => cart.itemId);
    const items = await Promise.all(itemIds.map((id) => this.itemRepository.findOneById(id)));

    const cartDtos = order.orderList.map((cart) => {
      const item = items.find((item) => item.id === cart.itemId);
      if (!item) {
        throw new Error(`Item with id ${cart.itemId} not found`);
      }
      return this.mapCartToDto(cart, item, item.itemImage);
    });

    // const newItems: TItem[] = await Promise.all(
    //   items.map(async (item) => {
    //     const blurImg = await getBlurImg(item.img);
    //     return { ...item, blurImg };
    //   }),
    // );

    return {
      order: this.mapOrderToDto(order, cartDtos),
    };
  }
}
