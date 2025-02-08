import { createClient } from "@/utils/supabase/server";

import type { User } from "@/domain/entities/user";
import type { SupabaseClient } from "@supabase/supabase-js";

export class UserRepository {
  private supabase: SupabaseClient;

  constructor(supabaseClient?: SupabaseClient) {
    this.supabase = supabaseClient || (await createClient());
  }

  // 유저 생성
  public async create(user: User): Promise<void> {
    const { error } = await this.supabase.from("users").insert(user);
    if (error) throw new Error(error.message);
  }

  // ID로 유저 찾기
  public async findById(user_id: number): Promise<User | null> {
    const { data, error } = await this.supabase.from("users").select("*").eq("user_id", user_id).single();
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
  public async update(user_id: number, updatedUser: Partial<User>): Promise<void> {
    const { error } = await this.supabase.from("users").update(updatedUser).eq("user_id", user_id);
    if (error) throw new Error(error.message);
  }

  // 유저 삭제
  public async delete(user_id: number): Promise<void> {
    const { error } = await this.supabase.from("users").delete().eq("user_id", user_id);
    if (error) throw new Error(error.message);
  }
}
