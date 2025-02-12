import { createClient } from "@/utils/supabase/server";

import type { User, Item, Cart, ItemImage } from "@/domain/entities";
import type { CartRepository } from "@/domain/repositories/cart_repository";

import snakecaseKeys from "snakecase-keys";
import camelcaseKeys from "camelcase-keys";

export class SbCartRepository implements CartRepository {
  // 카트 아이템 생성
  public async create(cart: Cart): Promise<Cart & { item: Item & { itemImages: ItemImage[] } }> {
    const supabase = await createClient();
    const snakeCart = snakecaseKeys(JSON.parse(JSON.stringify(cart)) as Record<string, unknown>, { deep: true });
    await supabase.from("carts").insert(snakeCart);
    // 수정 필요
    const { data, error } = await supabase
      .from("carts")
      .select("*, item:items(*, {item_images(*)})") // 이게 악의 근원인듯
      .eq("user_id", cart.userId)
      .eq("item_id", cart.itemId)
      .single();

    if (error) {
      throw new Error("Failed to retrieve item");
    }
    // 이거 타입 어떻게 해야할지 모르겠음 방법이 있을까?
    return camelcaseKeys(data, { deep: true }) as Cart & { item: Item & { itemImages: ItemImage[] } };
  }

  // 특정 유저의 카트 조회
  public async findByUserId(userId: number): Promise<Cart[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("carts").select("*").eq("user_id", userId).single();

    if (error) throw new Error(error.message);

    return camelcaseKeys(data, { deep: true }) as Cart[];
  }

  // 모든 카트 조회
  public async findAll(): Promise<Cart[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("carts").select("*");
    if (error) throw new Error(error.message);
    return camelcaseKeys(data, { deep: true }) as Cart[];
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
    return camelcaseKeys(data, { deep: true }) as Cart & { user: User };
  }

  // 특정 유저의 카트 조회 (유저, 아이템 정보와 함께)
  public async findByUserIdWithAll(userId: number): Promise<(Cart & { user: User; item: Item })[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("carts")
      .select("*, user:users(*), item:items(*)") // users와 items 테이블의 모든 컬럼 가져오기
      .eq("user_id", userId);

    if (error) throw new Error(error.message);

    return camelcaseKeys(data, { deep: true }) as (Cart & { user: User; item: Item })[];
  }

  // 특정 유저의 카트 조회 (아이템 정보와 함께)
  public async findByUserIdWithItem(
    userId: number,
  ): Promise<{ count: number; data: (Cart & { item: Item & { itemImages: ItemImage[] } })[] }> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("carts")
      .select("*, item:items(*, item_images(*))") //  items 테이블의 모든 컬럼을 item 객체로 가져옴
      .eq("user_id", userId);

    if (error) throw new Error(error.message);

    const { count } = await supabase.from("carts").select("*", { count: "exact", head: true }).eq("user_id", userId);

    return {
      count,
      data: camelcaseKeys(data, { deep: true }),
    } as { count: number; data: (Cart & { item: Item & { itemImages: ItemImage[] } })[] };
  }

  // 카트 아이템 업데이트 (수량, 선택 여부 등)
  public async update(userId: number, itemId: number, updatedCart: Partial<Cart>): Promise<Cart> {
    const supabase = await createClient();
    const snakeCart = snakecaseKeys(JSON.parse(JSON.stringify(updatedCart)) as Record<string, unknown>, { deep: true });
    const { data, error } = await supabase
      .from("carts")
      .update(snakeCart)
      .eq("user_id", userId)
      .eq("item_id", itemId)
      .select()
      .single();

    if (error) {
      throw new Error(`carts 데이터 업데이트 오류: ${error.message}`);
    }
    return camelcaseKeys(data, { deep: true }) as Cart;
  }

  // 카트 아이템 삭제
  public async delete(userId: number, itemId: number): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("carts").delete().eq("user_id", userId).eq("item_id", itemId);
    if (error) throw new Error(error.message);
  }
}
