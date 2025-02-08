export class User {
  user_id: number; // PK
  name: string; // 이름
  address?: string; // 주소 (nullable)
  email: string; // 이메일
  phone?: string; // 전화번호 (nullable)
  created_at: string; // 생성일
  updated_at: string; // 수정일

  // 기본 생성자 추가
  constructor(user_id: number, name: string, email: string, address?: string, phone?: string) {
    this.user_id = user_id;
    this.name = name;
    this.email = email;
    this.address = address; // 선택적 속성
    this.phone = phone; // 선택적 속성
    this.created_at = new Date().toISOString(); // 생성일
    this.updated_at = new Date().toISOString(); // 수정일
  }
}
