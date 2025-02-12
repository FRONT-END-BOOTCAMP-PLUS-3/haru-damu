import { createClient } from "@/utils/supabase/server";

import type { Item } from "@/domain/entities/item";
import type { ItemImage } from "@/domain/entities/item_image"; // 수정필요요
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

  async findByPage(
    startIndex: number,
    endIndex: number,
  ): Promise<{ items: (Item & { itemImage: ItemImage | null })[]; totalCount: number }> {
    const supabase = await createClient();
    const { data, error, count } = await supabase
      .from("items")
      .select("*, item_images(*)", { count: "exact" })
      .range(startIndex, endIndex);
    if (error) {
      throw new Error(`items 데이터 패칭 오류: ${error.message}`);
    }
    return {
      items: data.map((item) => ({
        ...camelcaseKeys(item, { deep: true }),
        itemImage: item.item_images?.[0] ?? null,
      })),
      totalCount: count || 0,
    };
  }

  async findByCategory(
    categoryCode: string,
    startIndex: number,
    endIndex: number,
  ): Promise<{ items: (Item & { itemImage: ItemImage | null })[]; totalCount: number }> {
    const supabase = await createClient();
    const { data, error, count } = await supabase
      .from("items")
      .select("*, item_images(*)", { count: "exact" })
      .eq("category_code", categoryCode)
      .range(startIndex, endIndex);
    if (error) {
      throw new Error(`items 카테고리별 데이터 패칭 오류: ${error.message}`);
    }
    return {
      items: data.map((item) => ({
        ...camelcaseKeys(item, { deep: true }),
        itemImage: item.item_images?.[0] ?? null,
      })),
      totalCount: count || 0,
    };
  }

  async findByQuery(
    query: string,
    startIndex: number,
    endIndex: number,
  ): Promise<{ items: (Item & { itemImage: ItemImage | null })[]; totalCount: number }> {
    const supabase = await createClient();
    const { data, error, count } = await supabase
      .from("items")
      .select("*, item_images(*)", { count: "exact" })
      .ilike("item_name", `%${query}%`)
      .range(startIndex, endIndex);
    if (error) {
      throw new Error(`items 검색 오류: ${error.message}`);
    }
    return {
      items: data.map((item) => ({
        ...camelcaseKeys(item, { deep: true }),
        itemImage: item.item_images?.[0] ?? null,
      })),
      totalCount: count || 0,
    };
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
  async LatestCategory(categoryCode: string): Promise<(Item & { itemImage: ItemImage | null })[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("items")
      .select("*, item_images(*)")
      .eq("category_code", categoryCode)
      .order("id", { ascending: false }) // 최신 데이터 기준 정렬
      .limit(10);

    if (error) {
      throw new Error(`items 데이터 삭제 오류: ${error.message}`);
    }

    return data.map((item) => ({
      ...camelcaseKeys(item, { deep: true }),
      itemImage: item.item_images ?? null,
    }));
  }
}
