import type { User } from "@/domain/entities/user";

export interface UserRepository {
  create(user: User): Promise<void>;

  findById(userId: number): Promise<User | null>;

  findAll(): Promise<User[]>;

  update(userId: number, updatedUser: Partial<User>): Promise<void>;

  delete(userId: number): Promise<void>;
}
