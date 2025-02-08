import { createClient } from "@/utils/supabase/server";

import type { SupabaseClient } from "@supabase/supabase-js"; // Supabase 클라이언트를 가져오는 함수
import type { Cart } from "@/domain/entities/cart"; // Cart 엔티티 가져오기

export class CartRepository {
  private supabase: SupabaseClient;

  constructor(supabaseClient?: SupabaseClient) {
    this.supabase = supabaseClient || (await createClient());
  }

  // 카트 아이템 생성
  public async create(cart: Cart): Promise<void> {
    const { error } = await this.supabase.from("carts").insert(cart);
    if (error) throw new Error(error.message);
  }

  // 특정 유저의 카트 조회
  public async findByUserId(user_id: number): Promise<Cart[]> {
    const { data, error } = await this.supabase.from("carts").select("*").eq("user_id", user_id);

    if (error) throw new Error(error.message);
    return data as Cart[];
  }

  // 모든 카트 조회
  public async findAll(): Promise<Cart[]> {
    const { data, error } = await this.supabase.from("carts").select("*");
    if (error) throw new Error(error.message);
    return data as Cart[];
  }

  // 카트 아이템 업데이트 (수량, 선택 여부 등)
  public async update(user_id: number, item_id: number, updatedCart: Partial<Cart>): Promise<void> {
    const { error } = await this.supabase
      .from("carts")
      .update(updatedCart)
      .eq("user_id", user_id)
      .eq("item_id", item_id);

    if (error) throw new Error(error.message);
  }

  // 카트 아이템 삭제
  public async delete(user_id: number, item_id: number): Promise<void> {
    const { error } = await this.supabase.from("carts").delete().eq("user_id", user_id).eq("item_id", item_id);

    if (error) throw new Error(error.message);
  }
}
