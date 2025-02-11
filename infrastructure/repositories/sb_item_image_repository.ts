import { createClient } from "@/utils/supabase/server";

import type { ItemImage } from "@/domain/entities/item_image";
import type { ItemImageRepository } from "@/domain/repositories/item_image_repository";

import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

export class SbItemImageRepository implements ItemImageRepository {
  async create(itemImage: ItemImage): Promise<ItemImage> {
    const supabase = await createClient();
    const snakeItemImage = snakecaseKeys(JSON.parse(JSON.stringify(itemImage)) as Record<string, unknown>, {
      deep: true,
    });
    const { data, error } = await supabase.from("item_images").insert(snakeItemImage).select().single();
    if (error) {
      throw new Error(`item_images 데이터 추가 오류: ${error.message}`);
    }
    return camelcaseKeys(data, { deep: true }) as ItemImage;
  }

  async updateById(id: number, itemImage: Partial<ItemImage>): Promise<ItemImage> {
    const supabase = await createClient();
    const snakeItemImage = snakecaseKeys(JSON.parse(JSON.stringify(itemImage)) as Record<string, unknown>, {
      deep: true,
    });
    const { data, error } = await supabase.from("item_images").update(snakeItemImage).eq("id", id).select().single();
    if (error) {
      throw new Error(`item_images 데이터 수정 오류: ${error.message}`);
    }
    return camelcaseKeys(data, { deep: true }) as ItemImage;
  }

  async deleteById(id: number): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("item_images").delete().eq("id", id);
    if (error) {
      throw new Error(`item_images 데이터 삭제 오류: ${error.message}`);
    }
  }
}
