# Haru_Damu

![하루담은배너](https://github.com/user-attachments/assets/5f5caad5-4c38-48a2-b2ab-e10f6ae5d0c9)

**건강한 하루 식단을 위한 맞춤형 쇼핑몰**

현대인의 건강 관리 요구를 충족하고 기존 이커머스 플랫폼에서 제공하지 못한 맞춤형 헬스케어 경험을 제공함으로써 차별화된 가치 창출을 목표로 하고 있습니다.

### 주요 기능 소개

1. 식단 분석 및 추천
    - 사용자가 카트에 담은 음식 데이터에서 탄수화물, 단백질, 지방 비율을 분석
    - 하루 권장 칼로리와 비교하여 적절한지 피드백 제공
2. 영양 데이터 시각화
    - 식품 영양 성분표 제공
    - 그래프로 탄단지 비율 시각화
    - 하루 식단 총 영양소 및 칼로리 요약을 보기 쉽게 제공
3. 개인화된 영양 목표 설정
    - 사용자가 자신의 신체 정보(나이, 성별, 활동 수준 등)를 입력하면 맞춤형 하루 영양 목표를 생성
    - 목표와 현재 식단을 비교해 피드백 제공

### 프로젝트 성취 목표

**React 순기능을 최대한 이용하여 코드 작성**
- React의 순수 기능을 사용하여 외부 라이브러리 의존성을 최소화하고 React의 핵심 원리인 상태 관리, 컴포넌트 설계, 렌더링 최적화 등을 직접 구현하여 라이브러리 의존도를 줄이고 코드의 효율성을 높입니다.

**Next.js 핵심 기능 사용 및 이해도 높이기**
- Next.js의 SSR, SSG, API Routes, 동적 라우팅, 이미지 최적화, ISR 등의 핵심 기능을 효과적으로 적용하여 SEO 최적화, 빠른 로딩 성능, 유연한 URL 설계 등을 구현하고 이를 통해 Next.js의 기능을 깊이 이해하고 활용합니다


## 팀 소개
우리 모두가 팀장 같은 마음으로 책임을 다하고 서로의 성장을 응원하며 나아가는 팀입니다. 

| 임 상 민 | 이 보 윤 | 박 상 민 | 김 혜 란 |
|---------|---------|---------|--------|
| 팀 리더 | 엔지니어링 리더 | 기술 리더 | 프로덕트 리더 |
| 기획 | 프로젝트 관리 | 아키텍처 설계 | 사용자 경험 이해|
| 팀 관리 및 커뮤니케이션 | 팀 성과 분석 및 관리 | 기술적 깊이와 넓이 | 요구사항 정의 |


## Skills

- [React](https://ko.react.dev/)
- [Next.js](https://nextjs.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [dnd-kit](https://dndkit.com/)
- [Supabase](https://supabase.com/)
- [React-query](https://tanstack.com/query/latest/docs/framework/react/overview)

## 프로젝트 구조

**Clean 아키텍처 구조에 맞게 적용하기**

유지보수성을 높여 코드 수정과 기능 추가를 효율적으로 만들고 확장성을 통해 새로운 기능 추가 시 기존 코드에 미치는 영향을 최소화하며 재사용성을 강화하여 코드의 반복을 줄이고 효율성을 높입니다.

``` javascript
HARU-DAMU
 ┣ .vscode
 ┃ ┗ settings.json // 프로젝트 공통 vscode 설정, 익스텐션
 ┣ app
 ┃ ┣ (auth)
 ┃ ┣ admin
 ┃ ┣ global-error.tsx
 ┃ ┣ layout.tsx
 ┃ ┣ not-found.tsx
 ┃ ┗ page.tsx
 ┣ application
 ┃ ┗ usecases   // 비지니스 로직을 관리
 ┣ components  // 공통 컴포넌트
 ┣ constants   // 공통상수
 ┣ domain
 ┃ ┣ entities   // database의 entity type 정의
 ┃ ┗ repositories // repository에서 사용하는 type 정의
 ┣ infrastructure
 ┃ ┗ repositories   // database와 데이터 통신
 ┣ public
 ┣ hooks
 ┣ stores
 ┣ styles
 ┣ utils
```

## 상세 기능

- 메인페이지 (home)
    - 상품 리스트
        - 카테고리
        - 검색
- 판매업체 관련 (admin)
    - 판매자가 판매업체 정보 등록
    - 판매자가 판매업체 정보 수정
    - 판매자가 판매업체 삭제
- 사용자 관련 (user)
    - image
        - 소셜 로그인을 통해 받은 이미지 링크 사용
    - 인증 (auth)
        - 사용자가 회원가입
        - 사용자가 로그인
        - 사용자가 로그아웃
    - 마이페이지 (mypage)
        - 사용자가 사용자 정보 수정
        - 사용자가 건강 정보 등록
        - 사용자가 건강 정보 수정
        - 등록한 리뷰 목록
        - 사용자가 탈퇴
            - 논리삭제(soft delete)로 `email`, `phone`, `address`를 `null`로 변경
- 상품 (item)
    - 판매자가 상품 등록
    - 판매자가 상품 수정
    - 판매자가 상품 삭제
    - 사용자가 상품 조회
    - 사용자가 상품 상세 조회
        - 영양성분 그래프 조회
- 장바구니 (cart)
    - 사용자가 장바구니에 상품 담기
    - 사용자가 장바구니에서 제거
    - 사용자가 장바구니 내에서 수량 제어
    - 사용자가 한끼 성분 확인
        - 칼로리 기준 식단 필터 *(default : 한끼 / optional : 하루, 일주일 등)*
- 주문 (order)
    - 사용자가 장바구니에 있는 물건 구매
    - 사용자가 주문 상세 내용 확인
    - 판매자가 주문 상세 내용 확인
    - 사용자가 주문 현황 수정
        - 주문 취소
    - 판매자가 주문 현황 수정
        - 배송 현황
        - 품절 여부
        - 주문 취소
- 결제 (payments)
    - 사용자가 주문 한 총 금액 결제
    - 판매자가 결제 된 금액 취소
- 찜 (pick)
    - 사용자가 상품을 찜하기
    - 사용자가 찜목록 보기
    - 사용자가 찜목록에서 아이템 제거하기
- 리뷰 (review)
    - 사용자가 구매한 상품에 리뷰 등록
    - 사용자가 구매한 상품에 리뷰 수정
    - 사용자가 구매한 상품에 리뷰 삭제

## Git Convention

## Code Convention

## 와이어프레임

## ERP (추후 수정)

```javascript
interface admin {
    id : number; // PK
    name : string;
    registration_number : number;
    phone : string;
    address : string;
    created_at : timestamp;
    updated_at : timestamp;
}

interface user {
    id : number;
    email? : string; // 회원 탈퇴 시 null
    phone? : string; // 회원 탈퇴 시 null
    address? : string; // 회원 탈퇴 시 null
    created_at : timestamp;
    updated_at : timestamp;
}

interface health {
    user_id : number;   // PK이자 FK. Unique값
    name : string;
    stature? : number;
    weight? : number;
    gender? : "Male" | "FeMale" ;
    age? : "0-9" | "10-19" | "20-29" | "30-39" | "40-49" | "50-59" | "60" ;
    momentum? : number; // 운동량
    calorie? : number;
    carbohydrate? : decimal(5,2); // 탄수화물
    protein? : decimal(5,2); // 단백질
    province? : decimal(5,2); // 지방
    sodium? : decimal(5,2); // 나트륨
    sugar? : decimal(5,2); // 당
    created_at : timestamp;
    updated_at : timestamp;
}

type nutrition_fact { // 영양성분, 영양분석
        ingredient_name : string;
        volume : number; // gram 기준
        calorie : decimal(5,2);
    } 

interface item {
    id : number;
    admin_id : number;
    name : string;
    category : "";
    price : number;
    is_sold_out : boolean; // 품절여부
    storage_method : string; // 보관방법
    nutrition_facts : nutrition_fact[]
}

interface pick {
    user_id : number; // FK
    item_id : number; // FK
    created_at : timestamp;
}

interface cart {
    user_id : number; // FK
    item_id : number; // FK
    quantity : number;
    created_at : timestamp;
    updated_at : timestamp;
}

type order_item {
    item_id : number;
    quantity : number;
    price : number;
}

interface order {
    id : number; // PK
    user_id : number; //FK
    payments_id : number; //FK - 결제 완료 시 등록
    address : string;
    status : "결제 전" | "결제 완료" | "배송준비중" | "배송중" | "배송완료" ;
    items : order_item[]
}

interface payments {  // toss페이 기준으로 작성 (https://docs.tosspayments.com/reference#%EA%B2%B0%EC%A0%9C)
    id : number; // PK
    order_id : number; // FK
    type : "NORMAL" // 일반 결제만 가능
    method : string; // 결제 방식 (카드, 가상계좌 등등)
    totalAmount : number; // 총 금액
    balanceAmount : number; // 취소할 수 있는 금액(잔고). 이 값은 결제 취소나 부분 취소가 되고 나서 남은 값
    status : string; // 결제 처리 상태 READY, IN_PROGRESS, WAITING_FOR_DEPOSIT, DONE, CANCELED, PARTIAL_CANCELED, ABORTED, EXPIRED
    requestedAt : string; // 결제가 일어난 날짜와 시간 정보
    approvedAt : string; // 결제 승인이 일어난 날짜와 시간 정보
    lastTransactionKey : string; // 마지막 거래의 키값 (결제 취소등을 위해 필요함)
    // 이 외에 정보들이 많음..
}

interface review {
    id : number; // PK
    user_id : number; // FK
    content : string;
    scope : 0 | 1 | 2 | 3 | 4 | 5;
    created_at : timestamp;
    updated_at : timestamp;
}
```