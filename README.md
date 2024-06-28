<div align="center">

  <img width="25" src="./client/public/favicon.png" alt="logo">
  <h1>diskettte-exclusive</h1>

**URL**: http://diskettte-exclusive.my.to

**👤게스트 계정**: `guest`/`qwerty!1`

</div>

## 1. 개요

*diskettte-exclusive*은 가상의 쇼핑몰 [diskettte](https://github.com/itso-wavy/diskettte) 유저를 대상으로 하는 소셜 네트워크 서비스입니다.
TypeScript+MERN 스택 기반으로 모던 웹 기술을 적용하여 사용자 경험과 성능을 최적화했습니다. 사용자 인증, 포스트와 댓글 관리, 팔로우 시스템 등 SNS의 핵심 기능을 포함하고 있습니다. [threads](https://www.threads.net)의 비즈니스 로직을 참고했습니다.

## 2. 기술 스택

![typescript](https://shields.io/badge/typescript-black?style=for-the-badge&logo=typescript)
![react](https://shields.io/badge/react-black?style=for-the-badge&logo=react)
![nodejs](https://shields.io/badge/node.js-black?style=for-the-badge&logo=node.js)
![mongodb](https://shields.io/badge/mongodb-black?style=for-the-badge&logo=mongodb)
![aws](https://img.shields.io/badge/aws-black?style=for-the-badge&logo=amazon)

### (1) Common

- 언어: [TypeScript](https://www.typescriptlang.org/)
- 린팅 & 포맷팅: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
- 유효성 검사: [Zod](https://zod.dev/)

### (2) Client

- 라이브러리: [React](https://ko.legacy.reactjs.org/) v.18
- 라우팅: [React Router](https://reactrouter.com/) v.6
- HTTP 클라이언트: [Axios](https://axios-http.com/)
- 클라이언트 전역 상태 관리: [Redux Toolkit](https://redux-toolkit.js.org/) v.2, [Redux Persist](https://github.com/rt2zz/redux-persist#readme)
- 서버 상태 관리: [TanStack Query](https://tanstack.com/query/latest) v.5
- 폼 상태 관리: [React Hook Form](https://react-hook-form.com/)
- 스타일링: [Tailwind CSS](https://tailwindcss.com/) v.3
- UI 컴포넌트: [shadcn/ui](https://ui.shadcn.com/)
- CSS 도구: [PostCSS](https://postcss.org/), [Autoprefixer](https://www.npmjs.com/package/autoprefixer)
- SVG 처리: [SVGR](https://react-svgr.com/)

### (3) Server

- 런타임: [Node.js](https://nodejs.org/)
- 프레임워크: [Express](https://expressjs.com/)
- 데이터베이스: [MongoDB](https://www.mongodb.com/ko-kr)(ODM [Mongoose](https://mongoosejs.com/))
- 인증: [JWT](https://jwt.io/)

### (4) Deployment

- 클라우드 인스턴스: [Amazon EC2](https://aws.amazon.com/ko/ec2/?gclid=CjwKCAjw-O6zBhASEiwAOHeGxVUD__lm6qh_odGit5oDKibJ-eElc2X-tMEDhH-7TahietD5Wx5AcRoCeZIQAvD_BwE&trk=bc3c5de1-7376-43c7-ad4f-f0f3f8248023&sc_channel=ps&ef_id=CjwKCAjw-O6zBhASEiwAOHeGxVUD__lm6qh_odGit5oDKibJ-eElc2X-tMEDhH-7TahietD5Wx5AcRoCeZIQAvD_BwE:G:s&s_kwcid=AL!4422!3!588924203019!e!!g!!aws%20ec2!16390049454!133992834459)
- 프론트엔드용 웹 서버: [nginx](https://nginx.org/)
- 데이터베이스 호스팅: [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)

## 3. 특징

1. **TypeScript 기반 풀스택 아키텍처**

   - 서버와 클라이언트 모두에 TypeScript를 사용하여 정적 타입 검사를 통한 코드 안정성 확보
   - ESLint, Prettier와 코딩 컨벤션으로 코드 품질과 가독성 유지

2. **모던 프론트엔드 기술 사용**

   - React와 React Router를 이용한 SPA 구현, CSR 적용
   - Redux Toolkit과 Redux Persist를 통한 중앙 집중식 상태 관리 및 지속성 보장
   - TanStack Query를 활용해 효율적인 서버 상태 관리 및 캐싱과 낙관적 UI 업데이트 구현

3. **보안 및 인증 시스템**

   - JWT 기반의 접근 토큰 및 갱신 토큰 인증 메커니즘 적용
   - CORS 설정을 통한 리소스 접근 제어
   - HttpOnly, SameSite 쿠키 설정으로 XSS 및 CSRF 공격 방지
   - Argon2 암호화 알고리즘으로 비밀번호 해싱

4. **UX 중심의 스타일링 및 테마 시스템**

   - Tailwind CSS와 shadcn/ui로 일관성, 확장성 및 접근성을 충족하는 디자인 시스템 구축
   - 라이트/다크 모드와 6가지 컬러 테마를 포함한 개인 테마 설정 기능
   - SVG 동적 스타일링으로 인터랙티브한 UX 구현 및 에셋 최적화

5. **폼 핸들링 및 유효성 검사 강화**:

   - React Hook Form으로 선언적 폼 상태 관리 및 UI 렌더링
   - Zod 스키마 기반의 정교한 유효성 검사와 에러 메시지 피드백

6. **체계적인 아키텍처 설계**

   - 기능별 폴더 구조와 단일 책임 원칙에 기반한 컴포넌트 모듈화로 코드 유지보수성 및 확장성 향상
   - form, post, comment 등 복합적 UI에 Compound Components 패턴 사용(클라이언트)
   - 라우트별 컨트롤러를 미들웨어 체이닝으로 구현해 유연한 요청 처리(서버)
   - 중앙화된 응답/에러 핸들링 미들웨어로 일관된 API 응답/에러 처리(서버)

7. **성능 최적화 및 사용자 경험 향상**
   - 메모이제이션 기법(useMemo, useCallback)을 활용한 리렌더링 방지
   - 낙관적 업데이트를 통한 빠른 반응성 구현
   <!-- - 이미지 최적화 및 Webpack 설정 튜닝으로 번들 크기 최소화
   - Lighthouse, Chrome DevTools를 활용한 정기적인 성능 분석
   - Web Vitals 지표 개선을 통한 사용자 경험 향상 -->

🐬🦈🐬

## 4. 주요 기능

1.  **유저 인증 및 권한 부여**:

    - 회원가입, 로그인, 로그아웃
    - 토큰 갱신 메커니즘을 통한 인증 보안
    - 인증/인가 상태에 따른 라우트 보호와 조건부 렌더링
    - 비밀번호 암호화 저장

1.  **유저 프로필**:

    - 유저 프로필 조회, 수정

1.  **개인 테마화**:

    - 라이트/다크 모드, 6색 컬러 개인 테마화

1.  **포스트 관리**:

    - 포스트 작성, 조회, 수정, 삭제
    - 포스트당 최대 3개의 이미지 업로드 지원
    - 로그인한 유저 포스트를 제외한 전체 포스트 모아보기
    - 특정 유저 포스트 모아보기
    - 단일 포스트 상세 보기

1.  **댓글 시스템**:

    - 포스트 댓글 작성, 조회, 수정, 삭제

1.  **좋아요 시스템**:

    - 포스트 좋아요 추가/제거

1.  **북마크 시스템**:

    - 포스트 북마크 추가/제거
    - 북마크한 포스트 모아보기

1.  **팔로우 시스템**:

    - 다른 유저 팔로우/언팔로우
    - 팔로우한 유저 포스트 모아보기

1.  **검색 기능**:

    - 유저 아이디, 닉네임 검색

1.  **기타**:

    - 에러 페이지와 리페치 컴포넌트
    - 로딩 스켈레톤 및 인디케이터
    - 반응형 디자인과 다양한 UI 컴포넌트

## 5. 폴더 구조

```shell
├─💾server
│  └─src
│     │  index.ts
│     │
│     ├─🎫controllers
│     │      authController.ts
│     │      bookmarkController.ts
│     │      commentController.ts
│     │      followController.ts
│     │      likeController.ts
│     │      postController.ts
│     │      profileController.ts
│     │      searchController.ts
│     │
│     ├─🎫db
│     │  index.ts
│     │
│     ├─🎫lib
│     │ │  types.ts
│     │ │
│     │ └─🏷️utils
│     │      token-utils.ts
│     │
│     ├─🎫middlewares
│     │      authentication.ts
│     │      response-handler.ts
│     │
│     ├─🎫models
│     │      BookmarkModel.ts
│     │      CommentModel.ts
│     │      FollowModel.ts
│     │      index.ts
│     │      LikeModel.ts
│     │      PostModel.ts
│     │      UserModel.ts
│     │
│     ├─🎫routers
│     │      index.ts
│     │      postRoutes.ts
│     │      userRoutes.ts
│     │
│     └─🎫schmas
│            auth-schema.ts
│            imageFileValidator.ts
│            post-schema.ts
│            profile-schema.ts
│
└─💾client
   │  index.html
   │
   ├─🎫public
   │  favicon.png
   │  logo-dark.png
   │  logo.png
   │
   ├─🎫src
   │  App.tsx
   │  main.tsx
   │
   ├─🎫components
   │  │  ErrorText.tsx
   │  │  Loader.tsx
   │  │  ProfileAvatar.tsx
   │  │  Skeleton.tsx
   │  │
   │  ├─🏷️comment
   │  │      CommentMoreButton.tsx
   │  │      index.ts
   │  │      PostComment.tsx
   │  │
   │  ├─🏷️dialog
   │  │      CommentForm.tsx
   │  │      index.ts
   │  │      LoginForm.tsx
   │  │      PostForm.tsx
   │  │      RegisterForm.tsx
   │  │      types.ts
   │  │
   │  ├─🏷️form
   │  │      Button.tsx
   │  │      Form.tsx
   │  │      IconButtons.tsx
   │  │      index.ts
   │  │      ProfileForm.tsx
   │  │
   │  ├─🏷️icons(svg 파일 목록 생략)
   │  │
   │  ├─🏷️layout
   │  │      DialogLayout.tsx
   │  │      index.ts
   │  │      PageWrapper.tsx
   │  │      WidthWrapper.tsx
   │  │
   │  ├─🏷️post
   │  │      FeedPost.tsx
   │  │      index.ts
   │  │      Post.tsx
   │  │      PostBookmarkButton.tsx
   │  │      PostCommentButton.tsx
   │  │      PostLikeButton.tsx
   │  │      PostMoreButton.tsx
   │  │      PostSkeleton.tsx
   │  │
   │  └─🏷️ui
   │         avatar.tsx
   │         dialog.tsx
   │         dropdown-menu.tsx
   │         scroll-area.tsx
   │         sonner.tsx
   │         switch.tsx
   │         tooltip.tsx
   │
   ├─🎫context
   │      commentContext.tsx
   │      followContext.tsx
   │      postContext.tsx
   │      themeContext.tsx
   │
   ├─🎫lib
   │  ├─🏷️assets
   │  │      errorball.svg
   │  │      wave.svg
   │  │
   │  ├─🏷️queries
   │  │      post-interaction.ts
   │  │      post.ts
   │  │      profile.ts
   │  │
   │  ├─🏷️schemas
   │  │      imageFileValidator.ts
   │  │      index.ts
   │  │      postValidator.ts
   │  │      profileValidators.ts
   │  │      userValidators.ts
   │  │
   │  ├─🏷️services
   │  │      auth.ts
   │  │      index.ts
   │  │
   │  ├─🏷️store
   │  │  │   index.ts
   │  │  │   store.ts
   │  │  │
   │  │  └─📦features
   │  │        authSlice.ts
   │  │        themeSlice.ts
   │  │        userSlice.ts
   │  │
   │  ├─🏷️types
   │  │      index.ts
   │  │      post.ts
   │  │      theme.ts
   │  │      user.ts
   │  │
   │  └─🏷️utils
   │         cn.ts
   │         date.ts
   │         debounce.ts
   │         file.ts
   │         index.ts
   │
   ├─🎫pages
   │  │  index.ts
   │  │
   │  ├─🏷️Bookmarks
   │  │  │  index.tsx
   │  │  │
   │  │  └─📦components
   │  │       index.ts
   │  │       PostList.tsx
   │  │
   │  ├─🏷️Error
   │  │     index.tsx
   │  │
   │  ├─🏷️Feed
   │  │  │  index.tsx
   │  │  │
   │  │  └─📦components
   │  │       FeedNav.tsx
   │  │       index.ts
   │  │       PostList.tsx
   │  │
   │  ├─🏷️PostDetail
   │  │  │  index.tsx
   │  │  │
   │  │  └─📦components
   │  │       index.ts
   │  │       PostWithComments.tsx
   │  │
   │  ├─🏷️Profile
   │  │     index.tsx
   │  │
   │  ├─🏷️RootLayout
   │  │  │  index.tsx
   │  │  │
   │  │  └─📦components
   │  │       Header.tsx
   │  │       index.ts
   │  │       MainNav.tsx
   │  │       NavLinkButton.tsx
   │  │       NavMenuBlock.tsx
   │  │
   │  ├─🏷️Search
   │  │  │  index.tsx
   │  │  │
   │  │  └─📦components
   │  │       index.ts
   │  │       SearchInput.tsx
   │  │       SearchList.tsx
   │  │
   │  ├─🏷️UserLayout
   │  │     index.tsx
   │  │
   │  └─🏷️UserPage
   │     │  index.tsx
   │     │
   │     └─📦components
   │          FollowButton.tsx
   │          index.ts
   │          PostListField.tsx
   │          ProfileCard.tsx
   │          ProfileField.tsx
   │          ProfileSkeleton.tsx
   │
   ├─🎫routes
   │     index.tsx
   │
   └─🎫styles
         index.css
```

## 6. 프로젝트 특징

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

## 3. 트러블슈팅

- 서버 데이터 응답 속도 축소
- ui 낙관적 업데이트 로직

10. **상태 관리**:

Redux를 사용한 것으로 보임 (store 폴더 구조 기반)

10. **클라이언트 사이드 라우팅**:

다양한 기능을 위한 여러 페이지 (피드, 프로필, 게시물 상세 등)

10. **파일 처리**:

이미지 업로드 및 유효성 검사 (게시물 및 사용자 아바타용)

10. **오류 처리 및 로딩 상태**:

- 다양한 UI 컴포넌트 (버튼, 폼, 아이콘, 다이얼로그 등)를 통한 사용자 경험 개선
- 상태 관리와 렌더링 최적화를 위한 컨텍스트 및 상태 관리 구현
