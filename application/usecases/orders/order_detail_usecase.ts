import type { User } from "@/domain/entities/user";
import type { Order } from "@/domain/entities/order";
import type { OrderRepository } from "@/domain/repositories/order_repository";
import type { GetOrderByIdResponseDto, TOrderStatus } from "@/application/usecases/orders/dtos";

export class OrderDetailUsecase {
  constructor(private orderRepository: OrderRepository) {}

  async excute(orderId: number): Promise<GetOrderByIdResponseDto> {
    const order: Order & { user: User } = await this.orderRepository.findOneById(orderId);
    return {
      order: {
        order_id: order.id,
        order_address: order.orderAddress,
        total_price: order.totalPrice,
        order_list: order.orderList.map((cart) => ({
          item_id: cart.itemId,
          item: cart.item,
          quantity: cart.quantity,
          wrapper_id: cart.wrapperId,
          is_checked: cart.isChecked,
          created_at: cart.createdAt.toISOString(),
          updated_at: cart.updatedAt.toISOString(),
        })),
        status: order.status as TOrderStatus,
        created_at: order.createdAt.toISOString(),
        updated_at: order.updatedAt.toISOString(),
      },
    };
  }
}
