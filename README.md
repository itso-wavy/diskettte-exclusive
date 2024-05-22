# boilerplate

## stack

### 1. Common

- **typescript + eslint + prettier**: https://prettier.io/docs/en/install

### 2. Client

- **vite + react**

- **tailwindcss**: https://tailwindcss.com/docs/installation

```bash
pnpm i -D tailwindcss postcss autoprefixer prettier-plugin-tailwindcss
pnpx tailwindcss init -p
```

- **feather icons**: https://feathericons.com/

### 2. Server

- **node + nodemon + ts-node + tsconfig-paths**

- **express + cookie-parser + cors**
  - CORS: 다른 도메인, 포트, 프로토콜을 가진 리소스에서 API를 호출할 때 발생.
- **argon2 + jsonwebtoken + dotenv**
  - JWT: 상태를 유지하지 않는 RESTful. 인증 토큰과 리프레시 토큰.
- **mongoose(mongoDB)**

  <!-- // "bcryptjs": "^2.4.3",
  // "multer": "^1.4.5-lts.1",
  // "react-router-dom": "^6.6.1"
  -->

## login

### auth: JWT 액세스 토큰과 리프레시 토큰 사용

### profile image

1.  프로필 없을 때(!profile.image)

    1. 프로필 안 건드림(!isTouch) => X
    2. 프로필 건드렸다 취소(isTouch) => X
    3. 프로필 건드리고 바꿈(isTouch) => O(selectedImage)

2.  프로필 있을 때(profile.image)

    1. 프로필 안 건드림(!isTouch) => O
    2. 프로필 건드렸다 취소(isTouch) => X
    3. 프로필 건드리고 바꿈(isTouch) => O(selectedImage)

    <!--

User 컬렉션/테이블

User {
\_id: ObjectId,
username: String,
email: String,
password: String,
profileImage: String, // 프로필 이미지 URL
createdAt: Date,
updatedAt: Date
}

Task 컬렉션/테이블

Task {
\_id: ObjectId,
userId: ObjectId (ref: User), // 작성자 참조
title: String,
description: String, // 할 일 세부 설명
category: String, // 'important-urgent', 'important-not-urgent', 'not-important-urgent', 'not-important-not-urgent'
dueDate: Date, // 마감 기한
estimatedTime: Number, // 예상 소요 시간 (분 단위)
completedTime: Number, // 실제 소요 시간 (분 단위)
completed: Boolean,
createdAt: Date,
updatedAt: Date
}

Timer 컬렉션/테이블

Timer {
\_id: ObjectId,
userId: ObjectId (ref: User), // 사용자 참조
taskId: ObjectId (ref: Task), // 작업 참조
startTime: Date, // 타이머 시작 시간
endTime: Date, // 타이머 종료 시간
duration: Number, // 타이머 지속 시간 (분 단위)
interruptions: [
{
startTime: Date, // 중단 시작 시간
endTime: Date, // 중단 종료 시간
duration: Number // 중단 지속 시간 (분 단위)
}
],
createdAt: Date,
updatedAt: Date
}

Routine 컬렉션/테이블 (예: 수면, 운동, 독서 등)

Routine {
\_id: ObjectId,
userId: ObjectId (ref: User), // 사용자 참조
name: String, // 루틴 이름 (예: 수면, 운동, 독서)
unit: String, // 단위 (예: 시간, 페이지 수)
records: [
{
date: Date,
value: Number // 기록값 (예: 8 (시간), 50 (페이지 수))
}
],
createdAt: Date,
updatedAt: Date
}

Draft 컬렉션/테이블 (메모, 일기 등)

Draft {
\_id: ObjectId,
userId: ObjectId (ref: User), // 작성자 참조
title: String,
content: String,
createdAt: Date,
updatedAt: Date
}

-->
