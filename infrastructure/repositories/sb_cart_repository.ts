import { createClient } from "@/utils/supabase/server";

import type { Cart } from "@/domain/entities/cart";
import type { Item } from "@/domain/entities/item";
import type { User } from "@/domain/entities/user";
import type { CartRepository } from "@/domain/repositories/cart_repository";

export class SbCartRepository implements CartRepository {
  // 카트 아이템 생성
  public async create(cart: Cart): Promise<Cart> {
    const supabase = await createClient();
    const { data } = await supabase.from("carts").insert(cart);
    if (!data) {
      throw new Error("Failed to create cart");
    }
    return data as Cart;
  }

  // 특정 유저의 카트 조회
  public async findByUserId(userId: number): Promise<Cart> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("carts").select("*").eq("user_id", userId).single();

    if (error) throw new Error(error.message);
    return data as Cart;
  }

  // 모든 카트 조회
  public async findAll(): Promise<Cart[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("carts").select("*");
    if (error) throw new Error(error.message);
    return data as Cart[];
  }

  // 특정 유저의 카트 조회 (유저 정보와 함께)
  public async findByUserIdWithUser(userId: number): Promise<Cart & { user: User }> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("carts")
      .select("*, user:users(*)") // users 테이블의 모든 컬럼을 user 객체로 가져옴
      .eq("user_id", userId)
      .single();

    if (error) throw new Error(error.message);
    return data as Cart & { user: User };
  }

  // 특정 유저의 카트 조회 (유저, 아이템 정보와 함께)
  public async findByUserIdWithAll(userId: number): Promise<Cart & { user: User; item: Item }> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("carts")
      .select("*, user:users(*), item:items(*)") // users와 items 테이블의 모든 컬럼 가져오기
      .eq("user_id", userId)
      .single();

    if (error) throw new Error(error.message);
    return data as Cart & { user: User; item: Item };
  }

  // 특정 유저의 카트 조회 (아이템 정보와 함께)
  public async findByUserIdWithItem(userId: number): Promise<Cart & { item: Item }> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("carts")
      .select("*, item:items(*)") //  items 테이블의 모든 컬럼을 item 객체로 가져옴
      .eq("user_id", userId)
      .single();

    if (error) throw new Error(error.message);
    return data as Cart & { item: Item };
  }

  // 카트 아이템 업데이트 (수량, 선택 여부 등)
  public async update(userId: number, itemId: number, updatedCart: Partial<Cart>): Promise<Cart> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("carts")
      .update(updatedCart)
      .eq("user_id", userId)
      .eq("item_id", itemId)
      .select()
      .single();

    if (error) {
      throw new Error(`carts 데이터 업데이트 오류: ${error.message}`);
    }
    return data as Cart;
  }

  // 카트 아이템 삭제
  public async delete(userId: number, itemId: number): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("carts").delete().eq("user_id", userId).eq("item_id", itemId);

    if (error) throw new Error(error.message);
  }
}
