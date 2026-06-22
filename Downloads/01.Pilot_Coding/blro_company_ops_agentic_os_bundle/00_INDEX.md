# BLRO Company Operating OS 문서 + 개발 번들

베를로 회사 운영을 위한 Multi-Persona 기반 Agentic OS MVP 설계/개발 번들이다.

## 문서 사용 순서
1. `00A_Multi-Persona_User_Story.md`
2. `07_PRD.md`
3. `01_MVP_화면명세서.md`
4. `02_와이어프레임_텍스트설계.md`
5. `04_schema.prisma`
6. `08_API_명세서.md`
7. `06_개발태스크_체크리스트.md`
8. `12_추천_실행순서.md`
9. `09_헤르메스_개발지시_프롬프트팩.md`

## 목적
대표가 고객 메일, 일정, 프로젝트, 견적, 기술검토, 파트너 협업, 비용 관리를 직접 기억하지 않아도 AI가 오늘 해야 할 일과 실행 초안을 자동으로 만든다.

## 포함 파일
0. `00A_Multi-Persona_User_Story.md`
1. `01_MVP_화면명세서.md`
2. `02_와이어프레임_텍스트설계.md`
3. `03_Nextjs_App_Router_폴더구조.md`
4. `04_schema.prisma`
5. `05_shadcn_ui_컴포넌트_분해표.md`
6. `06_개발태스크_체크리스트.md`
7. `07_PRD.md`
8. `08_API_명세서.md`
9. `09_헤르메스_개발지시_프롬프트팩.md`
10. `10_.env.example`
11. `11_한번에_전달한_구성요소_요약.md`
12. `12_추천_실행순서.md`
13. `13_CODE_STARTER_구성.md`
14. `starter/` — 실행 가능한 Next.js App Router 코드 골격

## 핵심 원칙
- 고객사 → 프로젝트 → 요청사항 → 액션 → 산출물 구조로 연결한다.
- 요약/초안/체크리스트/내부 정리는 자동 처리한다.
- 메일 발송/외부 공유/삭제/최종 견적 발송은 승인 후 처리한다.
- 확실하지 않은 내용은 `확인 필요`로 표시한다.


## 페르소나 기준 문서
`00A_Multi-Persona_User_Story.md`가 원본 기준 문서다. 나머지 화면명세서, 와이어프레임, API, 태스크 문서는 이 페르소나 문서에서 파생된 구현 문서로 본다.


## 코드 스타터
- `starter/` 폴더에 Next.js App Router 기반 실행 골격을 포함한다.
- Dashboard, Customers, Projects, Mail, Presales, Proposal, Finance, Agents, Command, Workflows, Approvals, Logs, Settings 라우트가 포함되어 있다.
- mock API, task-router, approval-gateway, Prisma schema를 포함한다.
