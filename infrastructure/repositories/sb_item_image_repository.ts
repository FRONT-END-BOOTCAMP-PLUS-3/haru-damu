import { createClient } from "@/utils/supabase/server";

import type { ItemImage } from "@/domain/entities/item_image";
import type { ItemImageRepository } from "@/domain/repositories/item_image_repository";

export class SbItemImageRepository implements ItemImageRepository {
  async create(itemImage: ItemImage): Promise<ItemImage> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("item_images").insert(itemImage).select().single();
    if (error) {
      throw new Error(`item_images 데이터 추가 오류: ${error.message}`);
    }
    return data as ItemImage;
  }

  async updateById(id: number, itemImage: Partial<ItemImage>): Promise<ItemImage> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("item_images").update(itemImage).eq("id", id).select().single();
    if (error) {
      throw new Error(`item_images 데이터 수정 오류: ${error.message}`);
    }
    return data as ItemImage;
  }

  async deleteById(id: number): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("item_images").delete().eq("id", id);
    if (error) {
      throw new Error(`item_images 데이터 삭제 오류: ${error.message}`);
    }
  }
}
