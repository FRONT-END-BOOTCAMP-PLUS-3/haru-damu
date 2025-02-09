import { createClient } from "@/utils/supabase/server";

import type { User } from "@/domain/entities/user";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { UserRepository } from "@/domain/repositories/user_repository";

export class UserRepositoryImpl implements UserRepository {
  private supabase: SupabaseClient;

  constructor(supabaseClient?: SupabaseClient) {
    this.supabase = supabaseClient || createClient();
  }

  // 유저 생성
  public async create(user: User): Promise<void> {
    const { error } = await this.supabase.from("users").insert(user);
    if (error) throw new Error(error.message);
  }

  // ID로 유저 찾기
  public async findById(userId: number): Promise<User | null> {
    const { data, error } = await this.supabase.from("users").select("*").eq("user_id", userId).single();
    if (error) return null;
    return data as User;
  }

  // 모든 유저 조회
  public async findAll(): Promise<User[]> {
    const { data, error } = await this.supabase.from("users").select("*");
    if (error) throw new Error(error.message);
    return data as User[];
  }

  // 유저 정보 업데이트
  public async update(userId: number, updatedUser: Partial<User>): Promise<void> {
    const { error } = await this.supabase.from("users").update(updatedUser).eq("user_id", userId);
    if (error) throw new Error(error.message);
  }

  // 유저 삭제 (이메일만 삭제)
  public async delete(userId: number): Promise<void> {
    const { error } = await this.supabase
      .from("users")
      .update({ email: null }) // 이메일을 NULL로 설정
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
  }
}
