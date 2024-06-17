# diskettte-exclusive

## 1. stack

### 1) Common

- typescript
- eslint
- prettier

### 2) Client

- react
- vite
- tailwind css
- feather icons

### 3) Server

- node + nodemon + ts-node + tsconfig-paths

- express + cookie-parser + cors
  - CORS: 다른 도메인, 포트, 프로토콜을 가진 리소스에서 API를 호출할 때 발생
- argon2 + jsonwebtoken + dotenv
- mongoose(mongoDB)

## 2. 코드 특징

### 1) 인증시 JWT을 액세스 토큰과 리프레시 토큰으로 나눠 관리

### 2) 서버 컨트롤러 함수를 미들웨어 처리하고 응답 반환시 공통 에러 처리 로직

### 3) svg 최적화 + svg 동적 스타일링으로 파일 개수 축소

### 4) profile image

1.  프로필 없을 때(!profile.image)

    1. 프로필 안 건드림(!isTouch) => X
    2. 프로필 건드렸다 취소(isTouch) => X
    3. 프로필 건드리고 바꿈(isTouch) => O(selectedImage)

2.  프로필 있을 때(profile.image)

    1. 프로필 안 건드림(!isTouch) => O
    2. 프로필 건드렸다 취소(isTouch) => X
    3. 프로필 건드리고 바꿈(isTouch) => O(selectedImage)

### 5) 개인 테마화

- light
- dark

- strawberry
- mango
- lemon
- melon
- grape
- dragonfruit

## 3. 트러블슈팅

- 서버 데이터 응답 속도 축소
- ui 낙관적 업데이트 로직
