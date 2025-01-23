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
 ┃ ┣ Folder
 ┃ ┣ components // 페이지에서만 사용하는 컴포넌트
 ┃ ┗ page.tsx
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