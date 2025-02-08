import type { Health } from "@/domain/entities/health";

export interface HealthRepository {
  create(health: Health): Promise<void>;

  findByUserId(user_id: number): Promise<Health | null>;

  findAll(): Promise<Health[]>;

  update(user_id: number, updatedHealth: Partial<Health>): Promise<void>;

  delete(user_id: number): Promise<void>;
}
