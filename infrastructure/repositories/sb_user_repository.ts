import { createClient } from "@/utils/supabase/server";

import type { User } from "@/domain/entities/user";
import type { UserRepository } from "@/domain/repositories/user_repository";

import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

export class SbUserRepository implements UserRepository {
  // 유저 생성
  public async create(user: User): Promise<User> {
    const supabase = await createClient();
    const snakeUser = snakecaseKeys(JSON.parse(JSON.stringify(user)) as Record<string, unknown>, { deep: true });
    const { data } = await supabase.from("users").insert(snakeUser);
    if (!data) {
      throw new Error("Failed to create cart");
    }
    return camelcaseKeys(data, { deep: true }) as User;
  }

  // ID로 유저 찾기
  public async findById(userId: number): Promise<User | null> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("users").select("*").eq("id", userId).single();
    if (error) return null;
    return camelcaseKeys(data, { deep: true }) as User;
  }

  // 모든 유저 조회
  public async findAll(): Promise<User[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("users").select("*");
    if (error) throw new Error(error.message);
    return camelcaseKeys(data, { deep: true }) as User[];
  }

  // 유저 정보 업데이트
  public async update(userId: number, updatedUser: Partial<User>): Promise<User> {
    const supabase = await createClient();
    const snakeUser = snakecaseKeys(JSON.parse(JSON.stringify(updatedUser)) as Record<string, unknown>, { deep: true });
    const { data, error } = await supabase.from("users").update(snakeUser).eq("id", userId).select().single();
    if (error) {
      throw new Error(`healths 데이터 업데이트 오류: ${error.message}`);
    }
    return camelcaseKeys(data, { deep: true }) as User;
  }

  // 유저 삭제 (이메일만 삭제)
  public async delete(userId: number): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase
      .from("users")
      .update({ email: null }) // 이메일을 NULL로 설정
      .eq("id", userId);
    if (error) throw new Error(error.message);
  }
}
