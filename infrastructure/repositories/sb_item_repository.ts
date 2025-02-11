import { createClient } from "@/utils/supabase/server";

import type { ItemImage } from "@/domain/entities/item_image";
import type { Item, TestItem, TestItemImage } from "@/domain/entities/item"; // 수정필요요
import type { ItemRepository } from "@/domain/repositories/item_repository";

import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

export class SbItemRepository implements ItemRepository {
  async findOneById(id: number): Promise<Item & { itemImage: ItemImage | null }> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("items").select("*, item_images(*)").eq("id", id).single();
    if (error) {
      throw new Error(`items 데이터 패칭 오류: ${error.message}`);
    }
    return {
      ...camelcaseKeys(data, { deep: true }),
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
      ...camelcaseKeys(item, { deep: true }),
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
      .eq("category_code", categoryCode)
      .range(start, end);
    if (error) {
      throw new Error(`items 카테고리별 데이터 패칭 오류: ${error.message}`);
    }
    return data.map((item) => ({
      ...camelcaseKeys(item, { deep: true }),
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
      .ilike("item_name", `%${query}%`)
      .range(start, end);
    if (error) {
      throw new Error(`items 검색 오류: ${error.message}`);
    }
    return data.map((item) => ({
      ...camelcaseKeys(item, { deep: true }),
      itemImage: item.item_images ?? null,
    }));
  }

  async create(item: Item): Promise<Item> {
    const supabase = await createClient();
    const snakeItem = snakecaseKeys(JSON.parse(JSON.stringify(item)) as Record<string, unknown>, { deep: true });
    const { data, error } = await supabase.from("items").insert(snakeItem).select().single();
    if (error) {
      throw new Error(`items 데이터 추가 오류: ${error.message}`);
    }
    return camelcaseKeys(data, { deep: true }) as Item;
  }

  async updateById(id: number, item: Partial<Item>): Promise<Item> {
    const supabase = await createClient();
    const snakeItem = snakecaseKeys(JSON.parse(JSON.stringify(item)) as Record<string, unknown>, { deep: true });
    const { data, error } = await supabase.from("items").update(snakeItem).eq("id", id).select().single();
    if (error) {
      throw new Error(`items 데이터 업데이트 오류: ${error.message}`);
    }
    return camelcaseKeys(data, { deep: true }) as Item;
  }

  async deleteById(id: number): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("items").delete().eq("id", id);
    if (error) {
      throw new Error(`items 데이터 삭제 오류: ${error.message}`);
    }
  }
  async findRandomByCategory(categoryCode: string): Promise<(TestItem & { itemImage: TestItemImage | null }) | null> {
    const supabase = await createClient();

    const { data, error } = await supabase.from("items").select("*, item_images(*)").eq("category_code", categoryCode);

    if (error || !data || data.length === 0) {
      console.error("Error fetching items:", error);
      return null;
    }

    // ✅ 데이터 개수에 따라 최적화된 랜덤 선택
    const randomItem = data[Math.floor(Math.random() * data.length)];

    console.log("랜덤으로 선택된 아이템:", randomItem);
    return randomItem;
  }
}
