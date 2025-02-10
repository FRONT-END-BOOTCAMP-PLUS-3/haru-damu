// page : item/[:id]

import type { ItemDto } from "@/application/usecases/items/dtos";

// GET
export interface GetItemById {
  itemId: string;
  item: ItemDto;
}
