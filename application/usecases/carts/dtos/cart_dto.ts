import type { UUID } from "crypto";

import type { ItemDto } from "../../items/dtos";

export interface CartDto {
  item_id: number;
  item: ItemDto;
  quantity: number;
  wrapper_id: UUID;
  is_checked: boolean;
  created_at: string;
  updated_at: string;
}
