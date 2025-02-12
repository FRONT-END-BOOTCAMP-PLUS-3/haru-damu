import { createClient } from "@/utils/supabase/server";

import type { Partner } from "@/domain/entities";
import type { PartnerRepository } from "@/domain/repositories/store_repository";

import camelcaseKeys from "camelcase-keys";

export class SbPartnerRepository implements PartnerRepository {
  async findOneById(storeId: number): Promise<Partner | null> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("stores").select("*").eq("id", storeId).single();
    if (error) {
      throw new Error(`store 데이터 패칭 오류: ${error.message}`);
    }
    return camelcaseKeys(data, { deep: true });
  }
}
