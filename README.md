# React 팀 프로젝트 "HonCook"

## 🖥️ 프로젝트 소개

#### 자취생들을 위한 요리 레시피 공유 커뮤니티로, 다양한 레시피를 손쉽게 공유하고 자취생들끼리 요리에 대한 경험과 노하우를 나눌 수 있는 플랫폼입니다. 혼쿡은 맛있는 요리를 즐기며 독립적인 자취 생활을 즐기는 이들에게 유용한 정보와 영감을 제공하여, 맛있고 건강한 식사를 더욱 풍요롭게 만들어 줍니다. 함께 요리를 공유하고 자취 생활의 즐거움을 더해보세요!
<br/>

![Jul-03-2023 11-43-18](https://github.com/HiYongA/redux-todo2/assets/120562771/952983d8-0482-4a7e-860f-9577811aa0b2)

---


## 📜 [S.A(Starting Assignments)](https://www.notion.so/HonCook-6-project-030d200979d243ce8084c0218a225ecf/)


## 🎬 구현 사이트
- 배포 링크 : https://react-rookies-newfeed-project.vercel.app/

## ⏰ 개발 기간

- 23.06.26일(월) - 23.07.02일(일)

## 🧑‍🤝‍🧑 맴버 구성 및 역할 분담
- 이진솔 : Navigation Menu, Login & Sign up, Logout, 인기 레시피 & 멤버 불러오기 & 게시글 사진 업로드, 미리보기 모달창
- 이동준 : 전체 게시물 목록, 게시물 등록 & 수정 & 삭제 & 상세보기
- 정승하 : 게시물 상세페이지 댓글 조회 & 등록 & 수정 & 삭제
- 박제이 : My Page 구현, Profile 조회 & 수정 & Profile image 등록, 내 게시물 보기
- 지설희 : 전체 스타 멤버 목록, Star Page 구현, 스타 멤버 Profile 조회

## 🖨️ 개발 프로세스 가이드
1.  CRA 프로젝트 셋업
- yarn create react-app [project-name] 또는 npx create-react-app [project-name]
- 프로젝트 생성 이후에는 npm, yarn 중 하나를 택하여 사용 권장!!
- npm을 사용할 경우 package-lock.json 파일, yarn을 사용할 경우, yarn.lock 파일이 github에 함께 공유되어야 의존성 라이브러리들의 버전을 일관성있게 관리 할 수 있어 동일한 개발환경을 유지하는 데 도움이 됩니다.
- 팀원 중 대표로 한분이 github repository 를 만들고 팀원들과 공유

2. .prettierrc 파일 만들기
- 팀원들과 코드포맷팅 규칙을 동일하게 설정하기 위해 .prettierrc을 깃헙에 공유하여 활용

3. Firebase 셋업 (서버 및 DB 셋업)
- 각 팀원 모두 Firebase 계정 및 프로젝트 셋업하기
- 팀원 별로 각자의 Firebase를 이용한 기능 구현 후 완료 시 대표 Firebase 계정을 팀 공용으로 사용

4. 환경변수(.env) 셋업
- Firebase의 계정 config 정보 (api_key포함) 등 보안이 필요한 정보들은 .env.local 파일에 담아 github에 공유되지 않도록 하기
- root directory에 .env.local 파일 생성

5. git 브렌치 관리 권장사항
- main/master 또는 dev/develop 브렌치에 직접 push 지양하기

## ❗ 필수 구현 기능

### 공통
◻︎ 로그인, 회원 가입
- Authentication에서 제공하는 api를 이요한 회원가입, 로그인 구현
- 아이디(이메일), 패스워드 로그인 및 회원가입
- (선택) 소셜 로그인 - 구글, 깃험

◻︎ CRUD
- Firebase에서 제공하는 api를 이용하여 CRUD 데이터베이스 핸들링 구현
- CUD(등록 / 수정 / 삭제)가 일어날 떄 마다 R(조회)하여 자연스럽게 화면 변경하기

◻︎ 마이페이지
- 내 개시물 보기
 ㄴ Authentication에서 제공하는 uid를 이용하여 내 게시물을 모아 조회하기
- 프로필 수정 기능
 ㄴ Storage에서 제공하는 api를 이용하여 이미지 업로드와 다운로드 url을 받아 이미지 핸들링 하기

◻︎ 배포
- Vercel이라는 호스팅 플랫폼을 이용하여 배포
- 배포에 적용될 브렌치는 main 또는 master 브렌치로 적용

◻︎ Git 최대한 활용하기
- Pull Request 활용
 ㄴ Merge는 Pull Request를 활용하여 진행
- Branch 생성 후 작업
- 코드 리뷰

## 👉🏻 추가 구현 기능 (선택)
- 로그인, 회원가입 예외 처리 ✔️
- 비밀번호 찾기 기능
- 팔로우, 팔로워 기능
- 팔로우한 상대 게시물 확인 기능
- 댓글 기능 ✔️
- 좋아요, 북마크 기능 ✔️(좋아요)
- 반응형 웹 구현
- 무한스크롤 기능
- 더보기 기능
- memo, useMemo, useCallback을 이용한 렌더링 최적화 적용
- Vercel에 배포한 뒤 커스텀 도메인 적용 (저렴한 도메인 권장)
  
## ❗ 주의
- `필수 포함기능`을 반드시 염두에 두기
- 어떤 기능을 사용할 지 보다 플래닝이 더 중요
- 마감 기한 지키기
- 기술의 구현보다 팀이 목표한 바를 이루어 냈는지, 그 목표를 이루기 위해 내가 어떻게 기여했는가가 더 중요함
- 클론 코딩 XXX

## ⚙️ 개발 환경 / 기술스택

- **`React`**
- **`JavaScript`**
- **`HTML`**
- **`CSS`**
- **`Firebase`**
- **`Router`**
- **`Redux`**
- **`Style-components`**
- **`vercel`**
