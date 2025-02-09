import { createClient } from "@/utils/supabase/server";

import type { User } from "@/domain/entities/user";
import type { Health } from "@/domain/entities/health";
import type { HealthRepository } from "@/domain/repositories/health_repository";

export class HealthRepositoryImpl implements HealthRepository {
  // 건강 데이터 생성
  public async create(health: Health): Promise<Health> {
    const supabase = await createClient();
    const { data } = await supabase.from("healths").insert(health);
    if (!data) {
      throw new Error("Failed to create cart");
    }
    return data as Health;
  }

  // 특정 유저의 건강 데이터 조회
  public async findByUserId(userId: number): Promise<Health | null> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("healths").select("*").eq("user_id", userId).single();
    if (error) return null;
    if (!data) {
      throw new Error("Failed to update health data");
    }
    return data as Health;
  }

  // 모든 건강 데이터 조회
  public async findAll(): Promise<Health[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("healths").select("*");
    if (error) throw new Error(error.message);
    return data as Health[];
  }

  // 특정 유저의 건강 데이터 조회 (유저 정보와 함께)
  public async findByUserIdWithUser(userId: number): Promise<Health & { user: User }> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("healths")
      .select("*, user:users(*)") // users 테이블의 모든 컬럼을 user 객체로 가져옴
      .eq("user_id", userId)
      .single();

    if (error) throw new Error(error.message);
    return data as Health & { user: User };
  }

  // 건강 데이터 업데이트
  public async update(userId: number, updatedHealth: Partial<Health>): Promise<Health> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("healths")
      .update(updatedHealth)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      throw new Error(`healths 데이터 업데이트 오류: ${error.message}`);
    }
    return data as Health;
  }

  // 건강 데이터 삭제
  public async delete(userId: number): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("healths").delete().eq("user_id", userId);
    if (error) throw new Error(error.message);
  }
}
