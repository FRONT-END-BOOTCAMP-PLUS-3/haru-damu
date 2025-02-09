import type { User } from "@/domain/entities/user";
import type { Health } from "@/domain/entities/health";

export interface HealthRepository {
  create(health: Health): Promise<void>;

  findByUserId(userId: number): Promise<Health | null>;

  findAll(): Promise<Health[]>;

  findByUserIdWithUser(userId: number): Promise<(Health & { user: User })[]>;

  update(userId: number, updatedHealth: Partial<Health>): Promise<void>;

  delete(userId: number): Promise<void>;
}
