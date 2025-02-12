import type { Partner } from "../entities";

export interface PartnerRepository {
  findOneById(storeId: number): Promise<Partner | null>;
}
