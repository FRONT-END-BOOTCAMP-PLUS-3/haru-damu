import { createClient } from "@/utils/supabase/server";

import type { User } from "@/domain/entities/user";
import type { Order } from "@/domain/entities/order";
import type { OrderRepository } from "@/domain/repositories/order_repository";

export class SbOrderRepository implements OrderRepository {
  async findOneById(id: number): Promise<Order & { user: User }> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("orders").select("*, users(*)").eq("id", id).single();
    if (error) {
      throw new Error(`orders 데이터 패칭 오류: ${error.message}`);
    }
    return data as Order & { user: User };
  }

  async findByUserId(userId: number): Promise<(Order & { user: User })[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("orders").select("*, users(*)").eq("user_id", userId);
    if (error) {
      throw new Error(`orders 데이터 패칭 오류: ${error.message}`);
    }
    return data as (Order & { user: User })[];
  }

  async create(order: Order): Promise<Order> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("orders").insert(order).select().single();
    if (error) {
      throw new Error(`orders 데이터 추가 오류: ${error.message}`);
    }
    return data as Order;
  }
}
