import { ORDER_FILTER_OPTIONS } from "@/constants/mypage";

import orders from "@/dummys/order";

export interface Order {
  user_id: number;
  item_id: number;
  wrapper_id: string | null;
  quantity: number;
  is_checked: boolean;
  item_name: string;
  item_price: number;
  img?: string;
  blurImg?: string;
  created_at: string;
  updated_at: string;
  status?: string;
}

export interface OrdersResponse {
  orders: Order[];
  total: number;
}

export async function fetchOrders(page: number, filter: string, size: number): Promise<OrdersResponse> {
  // API 호출을 시뮬레이션하기 위한 인위적인 딜레이
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 필터링 로직
  const filteredOrders = filterOrdersByDate(orders, filter);

  // 페이지네이션 로직
  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  return {
    orders: paginatedOrders,
    total: filteredOrders.length,
  };
}

function filterOrdersByDate(orders: Order[], filter: string): Order[] {
  const now = new Date();
  const pastDate = new Date();

  switch (filter) {
    case ORDER_FILTER_OPTIONS[0]:
      pastDate.setMonth(now.getMonth() - 3);
      break;
    case ORDER_FILTER_OPTIONS[1]:
      pastDate.setMonth(now.getMonth() - 6);
      break;
    case ORDER_FILTER_OPTIONS[2]:
      pastDate.setFullYear(now.getFullYear() - 1);
      break;
    case ORDER_FILTER_OPTIONS[3]:
      pastDate.setFullYear(now.getFullYear() - 3);
      break;
    default:
      return orders;
  }

  return orders.filter((order) => {
    const orderDate = new Date(order.created_at.replace(/\./g, "-"));
    return orderDate >= pastDate;
  });
}
