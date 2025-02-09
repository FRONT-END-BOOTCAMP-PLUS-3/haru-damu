export interface User {
  userId: number; // PK
  name: string; // 이름
  address?: string | null; // 주소 (nullable)
  email: string; // 이메일
  phone?: string | null; // 전화번호 (nullable)
  createdAt: Date; // 생성일
  updatedAt: Date; // 수정일
}
