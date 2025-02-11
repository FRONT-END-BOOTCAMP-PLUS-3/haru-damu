import { createClient } from "@/utils/supabase/server";

import type { Order } from "@/domain/entities/order";
import type { OrderRepository } from "@/domain/repositories/order_repository";

import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

export class SbOrderRepository implements OrderRepository {
  async findOneById(userId: number, id: number): Promise<Order> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("orders").select("*").eq("id", id).eq("user_id", userId).single();
    if (error) {
      throw new Error(`orders 데이터 패칭 오류: ${error.message}`);
    }
    return camelcaseKeys(data, { deep: true }) as Order;
  }

  async findByUserId(
    userId: number,
    startIndex: number,
    endIndex: number,
    startFilter: Date,
    endFilter: Date,
  ): Promise<{ order: Order[]; count: number }> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .gte("created_at", startFilter.toISOString())
      .lte("created_at", endFilter.toISOString())
      .range(startIndex, endIndex);

    if (error) {
      throw new Error(`orders 데이터 패칭 오류: ${error.message}`);
    }

    const { count } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", startFilter.toISOString())
      .lte("created_at", endFilter.toISOString());

    return { count, order: camelcaseKeys(data, { deep: true }) } as { order: Order[]; count: number };
  }

  async create(order: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order> {
    const supabase = await createClient();

    const snakeOrder = snakecaseKeys(JSON.parse(JSON.stringify(order)) as Record<string, unknown>, { deep: true }); // camelCase → snake_case 변환

    const { data, error } = await supabase.from("orders").insert(snakeOrder).select().single();

    if (error) {
      throw new Error(`orders 데이터 추가 오류: ${error.message}`);
    }

    return camelcaseKeys(data, { deep: true }) as Order; // snake_case → camelCase 변환
  }
}
