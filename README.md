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
- [Css-modules](https://github.com/css-modules/css-modules)

## 프로젝트 폴더 구조

**Clean 아키텍처 구조에 맞게 적용하기**

유지보수성을 높여 코드 수정과 기능 추가를 효율적으로 만들고 확장성을 통해 새로운 기능 추가 시 기존 코드에 미치는 영향을 최소화하며 재사용성을 강화하여 코드의 반복을 줄이고 효율성을 높입니다.

``` javascript
HARU-DAMU
 ┣ .vscode
 ┃ ┗ settings.json // 프로젝트 공통 vscode 설정, 익스텐션
 ┣ app
 ┃ ┣ (auth)
 ┃ ┣ store
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
- 판매업체 관련 (store)
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

### 형식
```
Prefix : Commit message (한글) #이슈번호
```

|||
|----|-----|
|**feat**| 새로운 기능 추가 |
|**fix** | 버그 수정 |
|**docs** | 문서 수정 |
|**style** | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
|**refactor**| 코드 리팩토링 |
|**test**   | 테스트 코드, 리팩토링 테스트 코드 추가|
|**chore**   | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore|
|**design**  | CSS 등 사용자 UI 디자인 변경 |
|**comment**  | 필요한 주석 추가 및 변경 |
|**rename** | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우 |
|**remove**  | 파일을 삭제하는 작업만 수행한 경우 |
|**!BREAKING CHANGE** | 커다란 API 변경의 경우 |
|**!HOTFIX**  | 급하게 치명적인 버그를 고쳐야 하는 경우 |

### 규칙
1. 깃허브 프로젝트를 칸반을 통해 태스크 관리 -> 이슈 번호 획득
2. PR을 통해 dev branch로 2인 이상 리뷰 후 머지
3. PR 시 작업 내용과 사진 업로드
    ```
        ## 이슈 제목 + #이슈번호

        ### 작업 내용
        ----
        - 홈페이지 뷰를 구성하였습니다.
        - 뷰를 구성하는 과정에서 컴포넌트가 깨지는 문제가 있어 ~~을 ~~하였습니다.
        - ㅇㅇㅇ라이브러리를 사용하였습니다. 해당 라이브러리는 ~~~ 이유로 선택하였습니다.
        
        ### 변경 사항
        ----
        - `변경 전 컴포넌트명` -> `변경 후 컴포넌트명` 으로 변경
        - 파일 이동 관련

        ### 도움이 필요한 사항
        ----
        - ㅇㅇ에 대한 문제가 있습니다.
        - ㅇㅇ에 대해 의사결정이 필요합니다.

        ### 작업 사진 (뷰 변경이나 기능 시)
        ---
        -[이미지명](이미지 주소) //이미지 드래그 드랍 시 자동으로 생성 됨
    ```
4. 작은 이슈라도 모두 기록하는 습관 가지기 (추후 좋음...)

## Code Convention

### 폴더 및 변수명
- 폴더명 : Snake-case
- 변수명 : Camel-case
- 컴포넌트명 : Pascal-case

### 타입 별칭
- props 값 interface -> 별칭 : ComponentProps
- 외의 값들은 type으로 설정 -> 별칭 : TType

### style 클래스명은 [BEM (Block, Element, Modifier)](https://velog.io/@jspp120/CSS-%EB%84%A4%EC%9D%B4%EB%B0%8D-%EA%B7%9C%EC%B9%99-BEM) 방식 사용

```javascript
container__loginBox__button
```

**BEM의 장점**
- 목적과 기능을 명확히 전달한다.
- 요소의 구조를 효율적으로 전달한다.
- css 명시도를 항상 낮은 수준으로 유지하기 때문에 구체성으로 인한 코드의 길어짐을 방지할 수 있다.

### 함수 선언

- 컴포넌트 선언 : functional 선언 / `export default function Component`
- 이벤트 핸들러 : event명+Handler / `onclickHandler`
- 함수 선언 위치 : 상태 > 핸들러 > useEffect 순서

## 와이어프레임

## ERD

![ERD](https://github.com/user-attachments/assets/f76978cb-a1f3-4736-9646-f721747eb8dd)

## 기술적 도전

## 트러블 슈팅

## 아키텍쳐