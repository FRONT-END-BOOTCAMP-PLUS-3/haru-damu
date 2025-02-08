export interface Cart {
  user_id: number; // FK (users)
  item_id: number; // FK (items)
  quantity: number; // 수량
  is_checked: boolean; // 선택 여부 (체크된 상태인지)
  created_at: Date; // 생성일
  updated_at: Date; // 수정일
}
