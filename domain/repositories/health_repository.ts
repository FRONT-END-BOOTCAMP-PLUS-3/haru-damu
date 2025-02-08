import { createClient } from "@/utils/supabase/server";

import type { Health } from "@/domain/entities/health";
import type { SupabaseClient } from "@supabase/supabase-js";

export class HealthRepository {
  private supabase: SupabaseClient;

  constructor(supabaseClient?: SupabaseClient) {
    this.supabase = supabaseClient || (await createClient());
  }

  // 건강 데이터 생성
  public async create(health: Health): Promise<void> {
    const { error } = await this.supabase.from("healths").insert(health);
    if (error) throw new Error(error.message);
  }

  // 특정 유저의 건강 데이터 조회
  public async findByUserId(user_id: number): Promise<Health | null> {
    const { data, error } = await this.supabase.from("healths").select("*").eq("user_id", user_id).single();
    if (error) return null;
    return data as Health;
  }

  // 모든 건강 데이터 조회
  public async findAll(): Promise<Health[]> {
    const { data, error } = await this.supabase.from("healths").select("*");
    if (error) throw new Error(error.message);
    return data as Health[];
  }

  // 건강 데이터 업데이트
  public async update(user_id: number, updatedHealth: Partial<Health>): Promise<void> {
    const { error } = await this.supabase.from("healths").update(updatedHealth).eq("user_id", user_id);
    if (error) throw new Error(error.message);
  }

  // 건강 데이터 삭제
  public async delete(user_id: number): Promise<void> {
    const { error } = await this.supabase.from("healths").delete().eq("user_id", user_id);
    if (error) throw new Error(error.message);
  }
}
