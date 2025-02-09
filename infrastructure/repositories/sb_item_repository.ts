import { createClient } from "@/utils/supabase/server";

import type { Item } from "@/domain/entities/item";
import type { ItemImage } from "@/domain/entities/item_image";
import type { ItemRepository } from "@/domain/repositories/item_repository";

export class SbItemRepository implements ItemRepository {
  async findOneById(id: number): Promise<Item & { itemImage: ItemImage | null }> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("items").select("*, item_images(*)").eq("id", id).single();

    if (error) {
      throw new Error(`items 데이터 패칭 오류: ${error.message}`);
    }

    return {
      ...data,
      itemImage: data.item_images ?? null,
    };
  }

  async findByPage(page: number, limit: number): Promise<(Item & { itemImage: ItemImage | null })[]> {
    const supabase = await createClient();
    const start = (page - 1) * limit;
    const end = start + limit - 1;
    const { data, error } = await supabase.from("items").select("*, item_images(*)").range(start, end);

    if (error) {
      throw new Error(`items 데이터 패칭 오류: ${error.message}`);
    }

    return data.map((item) => ({
      ...item,
      itemImage: item.item_images ?? null,
    }));
  }

  async findByCategory(
    categoryCode: string,
    page: number,
    limit: number,
  ): Promise<(Item & { itemImage: ItemImage | null })[]> {
    const supabase = await createClient();
    const start = (page - 1) * limit;
    const end = start + limit - 1;
    const { data, error } = await supabase
      .from("items")
      .select("*, item_images(*)")
      .eq("categoryCode", categoryCode)
      .range(start, end);

    if (error) {
      throw new Error(`items 카테고리별 데이터 패칭 오류: ${error.message}`);
    }

    return data.map((item) => ({
      ...item,
      itemImage: item.item_images ?? null,
    }));
  }

  async findByQuery(query: string, page: number, limit: number): Promise<(Item & { itemImage: ItemImage | null })[]> {
    const supabase = await createClient();
    const start = (page - 1) * limit;
    const end = start + limit - 1;
    const { data, error } = await supabase
      .from("items")
      .select("*, item_images(*)")
      .ilike("itemName", `%${query}%`)
      .range(start, end);

    if (error) {
      throw new Error(`items 검색 오류: ${error.message}`);
    }

    return data.map((item) => ({
      ...item,
      itemImage: item.item_images ?? null,
    }));
  }

  async create(item: Item): Promise<Item> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("items").insert(item).select().single();
    if (error) {
      throw new Error(`items 데이터 추가 오류: ${error.message}`);
    }
    return data as Item;
  }

  async updateById(id: number, item: Partial<Item>): Promise<Item> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("items").update(item).eq("id", id).select().single();
    if (error) {
      throw new Error(`items 데이터 업데이트 오류: ${error.message}`);
    }
    return data as Item;
  }

  async deleteById(id: number): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("items").delete().eq("id", id);
    if (error) {
      throw new Error(`items 데이터 삭제 오류: ${error.message}`);
    }
  }
  async findRandomByCategory(categoryCode: string): Promise<(Item & { itemImage: ItemImage | null }) | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("items")
      .select("*, item_images(*)")
      .eq("categoryCode", categoryCode)
      .order("RANDOM()")
      .limit(1)
      .single();

    if (error) {
      throw new Error(`items 카테고리별 랜덤 데이터 패칭 오류: ${error.message}`);
    }

    if (!data) {
      return null;
    }

    return {
      ...data,
      itemImage: data.item_images ?? null,
    };
  }
}
