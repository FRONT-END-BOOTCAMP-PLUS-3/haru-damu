import type { User, Order } from "@/domain/entities";
// import type { OrderRepository } from "@/domain/repositories/order_repository";
import type { GetOrderByIdResponseDto, TOrderStatus } from "@/application/usecases/orders/dtos";

import type { CartDto } from "../carts/dtos";
import { CartRepositoryImpl, SbOrderRepository } from "@/infrastructure/repositories";

// params id에 따른 주문상세 페이지

export class GetOrderDetailUsecase {
  constructor(
    private orderRepository: OrderRepository
    private cartRepository: CartRepositoryImplRepository
  
  ) {}

  async excute(orderId: number): Promise<GetOrderByIdResponseDto> {
    const order: Order & { user: User } = await this.orderRepository.findOneById(orderId);
    return {
      order: {
        orderId: order.id,
        orderAddress: order.orderAddress,
        totalPrice: order.totalPrice,
        orderList: order.orderList.map((cart: CartDto) => ({
          itemId: cart.itemId,
          item: cart.item,
          quantity: cart.quantity,
          wrapperId: cart.wrapperId,
          isChecked: cart.isChecked,
          createdAt: cart.createdAt.toISOString(),
          updatedAt: cart.updatedAt.toISOString(),
        })),
        status: order.status as TOrderStatus,
        created_at: order.createdAt.toISOString(),
        updated_at: order.updatedAt.toISOString(),
      },
    };
  }
}
