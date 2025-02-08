export class Cart {
  user_id: number; // FK (users)
  item_id: number; // FK (items)
  quantity: number; // 수량
  is_checked: boolean; // 선택 여부 (체크된 상태인지)
  created_at: string; // 생성일
  updated_at: string; // 수정일

  // 기본 생성자 추가
  constructor(user_id: number, item_id: number, quantity: number, is_checked: boolean) {
    this.user_id = user_id;
    this.item_id = item_id;
    this.quantity = quantity;
    this.is_checked = is_checked;
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }
}
