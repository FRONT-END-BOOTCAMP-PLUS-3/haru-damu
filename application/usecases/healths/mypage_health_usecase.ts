import type { Health } from "@/domain/entities/health";
import type { SbHealthRepository } from "@/infrastructure/repositories/sb_health_repository";

export class HealthUsecase {
  private sbHealthRepository: SbHealthRepository;

  constructor(healthRepository: SbHealthRepository) {
    this.sbHealthRepository = healthRepository;
  }

  // 건강 데이터 생성
  public createHealth(health: Health): Promise<Health> {
    return this.sbHealthRepository.create(health);
  }

  // 특정 유저의 건강 데이터 조회
  public getHealthByUserId(userId: number): Promise<Health | null> {
    return this.sbHealthRepository.findByUserId(userId);
  }

  // 건강 데이터 업데이트
  public updateHealthByUserId(userId: number, updatedHealth: Partial<Health>): Promise<Health> {
    return this.sbHealthRepository.update(userId, updatedHealth);
  }

  // 건강 데이터 저장 (업데이트 또는 생성)
  public async saveHealth(userId: number, healthData: Partial<Health>): Promise<Health> {
    const existingHealth = await this.getHealthByUserId(userId);

    if (existingHealth) {
      // 기존 데이터가 있으면 업데이트
      return this.updateHealthByUserId(userId, healthData);
    } else {
      // 없으면 새로 생성 (user_id 추가)
      const newHealthData: Health = { ...healthData, user_id: userId } as Health;
      return this.createHealth(newHealthData);
    }
  }
}
