import type { Cart } from "@/domain/entities";
import type { SbOrderRepository } from "@/infrastructure/repositories";

import type { GetOrderByIdResponseDto, GetOrderListResponseDto } from "./dtos";
import type { CreateOrderRequestDto, CreateOrderResponseDto } from "./dtos/create_order_dto";

export class OrderUsecase {
  private sbOrderRepository: SbOrderRepository;

  constructor(orderRepository: SbOrderRepository) {
    this.sbOrderRepository = orderRepository;
  }

  async createOrder({ userId, order }: CreateOrderRequestDto): Promise<CreateOrderResponseDto | null> {
    const newCart = order.orderList.map((item) => {
      return {
        ...item,
        userId,
      };
    });

    const newOrder = await this.sbOrderRepository.create({
      ...order,
      userId,
      status: 0,
      orderList: newCart as Cart[], // 임시로 설정
    });

    return {
      order: { ...newOrder, orderId: newOrder.id },
    };
  }

  async getOrderList(
    userId: number,
    page?: string | null,
    size?: string | null,
    year?: string | null,
  ): Promise<GetOrderListResponseDto | null> {
    const currentPage = page ? Number(page) : 1;
    const itemsPerPage = size ? Number(size) : 3;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage - 1;
    const filterYear = Number(year) ?? new Date().getFullYear();

    const startFilter = new Date(filterYear, 1, 1);
    const endFilter = new Date(filterYear + 1, 1, 1);

    const { count, order } = await this.sbOrderRepository.findByUserId(
      userId,
      startIndex,
      endIndex,
      startFilter,
      endFilter,
    );

    const totalPage = Math.ceil(count / itemsPerPage);

    const formattedOrder = order.map((item) => {
      return {
        ...item,
        orderId: item.id,
      };
    });

    return {
      count,
      totalPage,
      page: currentPage,
      size: itemsPerPage,
      year: filterYear,
      items: formattedOrder ?? [],
    };
  }

  async getOrderById(userId: number, orderId: number): Promise<GetOrderByIdResponseDto | null> {
    const data = await this.sbOrderRepository.findOneById(userId, orderId);

    return {
      order: {
        ...data,
        orderId: data.id,
      },
    };
  }
}
