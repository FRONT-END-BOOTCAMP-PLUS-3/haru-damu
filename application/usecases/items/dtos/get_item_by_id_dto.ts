// page : item/[:id]

import type { ItemDto } from "@/application/usecases/items/dtos";

// GET
export interface GetItemById {
  item_id: string;
  item: ItemDto;
}
