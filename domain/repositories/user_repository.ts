import type { User } from "@/domain/entities/user";

export interface UserRepository {
  create(user: User): Promise<User>;

  findById(userId: number): Promise<User | null>;

  findAll(): Promise<User[]>;

  update(userId: number, updatedUser: Partial<User>): Promise<User>;

  delete(userId: number): Promise<void>;
}
