import { createClient } from "@/utils/supabase/server";

import type { Store } from "@/domain/entities";
import type { StoreRepository } from "@/domain/repositories/store_repository";

import camelcaseKeys from "camelcase-keys";

export class SbStoreRepository implements StoreRepository {
  async findOneById(storeId: number): Promise<Store | null> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("stores").select("*").eq("id", storeId).single();
    if (error) {
      throw new Error(`store 데이터 패칭 오류: ${error.message}`);
    }
    return camelcaseKeys(data, { deep: true });
  }
}
