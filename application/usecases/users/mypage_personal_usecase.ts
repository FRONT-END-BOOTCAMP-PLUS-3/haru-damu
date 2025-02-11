import type { User } from "@/domain/entities/user";
import type { UserRepository } from "@/domain/repositories/user_repository";

export class UserUsecase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  // ID로 사용자 조회
  public async getUserById(userId: number): Promise<User | null> {
    return await this.userRepository.findById(userId);
  }

  // 사용자 정보 업데이트
  public async updateUser(userId: number, updatedUser: Partial<User>): Promise<User> {
    return await this.userRepository.update(userId, updatedUser);
  }

  // 사용자 삭제 (이메일만 삭제)
  public async deleteUser(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }
}
