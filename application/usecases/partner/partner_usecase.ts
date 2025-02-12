import { Partner } from "@/domain/entities";
import type { SbPartnerRepository } from "@/infrastructure/repositories/sb_partner_repository";

export class PartnerUsecase {
  private partnerRepository: SbPartnerRepository;

  constructor(partnerRepository: SbPartnerRepository) {
    this.partnerRepository = partnerRepository;
  }

  async findOneById(storeId: number): Promise<Partner | null> {
    return this.partnerRepository.findOneById(storeId);
  }
}
