# [💌 WOOGYEOL: 우리 결혼해요](https://woogyeol.site/)

> 개발 기간: 2025.01 ~ 2025.07


"우리 결혼해요"는 💌 신랑 신부가 직접 꾸미는 모바일 청첩장을 손쉽게 제작할 수 있도록 돕는 플랫폼입니다. <br/>
📆 일정과 📍 위치 정보를 제공하고, 하객은 📊 참석 여부를 등록하며, 📸 실시간 포토월에 축하 사진과 메시지를 남길 수 있어 모두가 함께 추억을 만들어 갑니다.  <br/>
하객과의 소통을 자연스럽고 따뜻하게 이어주는, 우리만의 특별한 초대장 서비스입니다.


- [🔗 서비스 링크](https://woogyeol.site/)
- [📚 노션](https://www.notion.so/19e9673ec79780a3b17bed3825f5fa8c?pvs=21)
- [🎨 피그마](https://file+.vscode-resource.vscode-cdn.net/Users/isoyeon/Desktop/woo-gyeol/front-end/README.md)

<br/>

# 🔑 주요 기능

### **청첩장 관리**

- 생성 / 수정 / 삭제 / 조회 기능
- 내 청첩장 목록 확인

### **청첩장 만들기: 3단계 입력과 8가지 선택 기능**


1. 캘린더
2. 지도/교통수단
3. 갤러리
4. 축의금
5. 연락하기
6. 공지사항
7. 글꼴
8. 배경음악

### **청첩장 공유**

- URL 복사
- 카카오톡 공유
- QR 코드 저장

### **RSVP: 참석여부 통계**

- 참석/불참 통계 시각화
- 상세 입력 내역 조회
- 엑셀 다운로드 (.xlsx)

### **포토톡: 실시간 포토월**

- 사진 + 축하 메시지 업로드
- 하객 이미지 다운로드 / 삭제 기능 지원
- 관리자 권한 처리

### **다크 모드 지원**

<br/>


# 🛠️ 기술 스택

| 구분 | 기술 |
| ---- | ---- |
| **Frontend** | React, TypeScript |
| **스타일** | TailwindCSS, Storybook |
| **상태관리** | React Query, Zustand |
| **번들러** | Vite |
| **테스트** | Jest |
| **배포** | Vercel |
| **패키지 매니저** | npm |

<br/>


# 📁 폴더 구조

```
src
 ┣ components   # 공통/기능별 UI 컴포넌트
    ┣ common    # 재사용 가능한 컴포넌트
    ┣ form      # 청첩장 정보 입력 관련 UI
    ┣ display   # 완성된 청첩장 관련 UI
    ┣ phototalk # 포토톡 관련 컴포넌트
    ┣ mypage    # 내정보 관련 컴포넌트
 ┣ assets
 ┣ constants    # 정적 데이터
 ┣ hooks        # 커스텀 훅
 ┣ pages        # 라우팅 기반 페이지 컴포넌트
 ┣ services     # api 서비스 모듈
 ┣ store        # Zustand 전역 상태 저장소
 ┣ types        # 전역 타입 정의
 ┣ utils        # 유틸 함수
 ┣ styles       # 전역 스타일
 ┣ App.tsx      # 라우터 및 전체 레이아웃 구성

```

<br/>


# 🤙 커밋 컨벤션

| 태그 | 설명 |
|------|------|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `style` | 코드 포맷, 세미콜론 등 변경 |
| `refactor` | 코드 리팩토링 |
| `test` | 테스트 코드 작성 |
| `docs` | 문서 수정 |
| `chore` | 빌드 업무 수정, 패키지 매니저 설정 등 |
| `ci` | CI 관련 설정 |
| `build` | 빌드 파일 관련 |
| `revert` | 커밋 되돌리기 |


<br/>

## 👥 멤버 소개

|                                  FE                                  |                                  FE                                   |                                 FE                                  |                                  FE                                  |
| :------------------------------------------------------------------: | :-------------------------------------------------------------------: | :-----------------------------------------------------------------: | :------------------------------------------------------------------: |
| <img src="https://github.com/eesoyeon.png" width="100" height="100"> | <img src="https://github.com/meteorqz6.png" width="100" height="100"> | <img src="https://github.com/chaeon1.png" width="100" height="100"> | <img src="https://github.com/nowrobin.png" width="100" height="100"> |
|                [이소연](https://github.com/eesoyeon)                 |                [남유성](https://github.com/meteorqz6)                 |                [황채연](https://github.com/chaeon1)                 |                [한정욱](https://github.com/nowrobin)                 |

<br/>
