export interface User {
  user_id: number; // PK
  name: string; // 이름
  address?: string | null; // 주소 (nullable)
  email: string; // 이메일
  phone?: string | null; // 전화번호 (nullable)
  created_at: Date; // 생성일
  updated_at: Date; // 수정일
}
