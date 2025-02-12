import type { Store } from "../entities";

export interface StoreRepository {
  findOneById(storeId: number): Promise<Store | null>;
}
