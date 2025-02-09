import type { Health } from "@/domain/entities/health";
import type { SbHealthRepository } from "@/infrastructure/repositories/sb_health_repository";

export class HealthService {
  private sbHealthRepository: SbHealthRepository;

  constructor(healthRepository: SbHealthRepository) {
    this.sbHealthRepository = healthRepository;
  }

  // 건강 데이터 생성
  public async createHealth(health: Health): Promise<Health> {
    return await this.sbHealthRepository.create(health);
  }

  // 특정 유저의 건강 데이터 조회
  public async getHealthByUserId(userId: number): Promise<Health | null> {
    return await this.sbHealthRepository.findByUserId(userId);
  }
}
