import { createClient } from "@/utils/supabase/server";

import type { User } from "@/domain/entities/user";
import type { Health } from "@/domain/entities/health";
import type { HealthRepository } from "@/domain/repositories/health_repository";

import snakecaseKeys from "snakecase-keys";
import camelcaseKeys from "camelcase-keys";

export class SbHealthRepository implements HealthRepository {
  // 건강 데이터 생성 또는 업데이트 후 최신 데이터 반환
  public async create(health: Health): Promise<Health> {
    const supabase = await createClient();

    if (!health.createdAt) {
      health.createdAt = new Date().toISOString();
    }
    if (!health.updatedAt) {
      health.updatedAt = new Date().toISOString();
    }

    // 데이터를 snake_case로 변환
    const snakeHealth = snakecaseKeys(JSON.parse(JSON.stringify(health)) as Record<string, unknown>, { deep: true });

    // 데이터 생성 또는 업데이트
    const { data, error } = await supabase.from("healths").upsert(snakeHealth).select().single();
    
    // 오류 처리
    if (error) {
      throw new Error(`Error occurred during health data operation: ${error.message}`);
    }

    // 최신 데이터 반환
    const latestHealthData = camelcaseKeys(data, { deep: true }) as Health;

    if (!latestHealthData) {
      throw new Error("Failed to retrieve latest health data.");
    }

    return latestHealthData;
  }

  // 특정 유저의 건강 데이터 조회
  public async findByUserId(userId: number): Promise<Health | null> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("healths").select("*").eq("user_id", userId).single();
    if (error) return null;
    if (!data) {
      throw new Error("Failed to update health data");
    }
    return camelcaseKeys(data, { deep: true }) as Health;
  }

  // 모든 건강 데이터 조회
  public async findAll(): Promise<Health[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("healths").select("*");
    if (error) throw new Error(error.message);
    return camelcaseKeys(data, { deep: true }) as Health[];
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
    return camelcaseKeys(data, { deep: true }) as Health & { user: User };
  }

  // 건강 데이터 업데이트
  public async update(userId: number, updatedHealth: Partial<Health>): Promise<Health> {
    const supabase = await createClient();
    const snakeHealth = snakecaseKeys(JSON.parse(JSON.stringify(updatedHealth)) as Record<string, unknown>, {
      deep: true,
    });
    const { data, error } = await supabase.from("healths").update(snakeHealth).eq("user_id", userId).select().single();
    if (error) {
      throw new Error(`healths 데이터 업데이트 오류: ${error.message}`);
    }
    return camelcaseKeys(data, { deep: true }) as Health;
  }

  // 영양 데이터 업데이트
  public async updateNutrition(userId: number, isCustom: boolean, nutritionData: any[]): Promise<Health> {
    const supabase = await createClient();

    const nutritionObject = nutritionData.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});

    const NutritionData = snakecaseKeys(nutritionObject, { deep: true });

    const { data, error } = await supabase
      .from("healths")
      .update({
        ...NutritionData,
        is_custom: isCustom, // isCustom 상태 추가
      })
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      throw new Error(`healths 데이터 업데이트 오류: ${error.message}`);
    }

    return camelcaseKeys(data, { deep: true }) as Health;
  }

  // 건강 데이터 삭제
  public async delete(userId: number): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("healths").delete().eq("user_id", userId);
    if (error) throw new Error(error.message);
  }
}
