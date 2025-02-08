import type { User } from "@/domain/entities/user";

export interface UserRepository {
  create(user: User): Promise<void>;

  findById(user_id: number): Promise<User | null>;

  findAll(): Promise<User[]>;

  update(user_id: number, updatedUser: Partial<User>): Promise<void>;

  delete(user_id: number): Promise<void>;
}
