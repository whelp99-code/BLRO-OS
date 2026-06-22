# BLRO Company Operating OS MVP 화면명세서

## 1. 문서 목적
베를로 회사 운영 자동화를 위한 화면 단위 요구사항을 정의한다. 사용자가 대표처럼 자연어로 지시하면 부서형 에이전트가 고객/프로젝트/메일/일정/견적/기술검토 맥락을 반영해 실행하고 승인/로그까지 남기는 구조다.

## 2. MVP 범위
### 포함 화면
- Dashboard
- Onboarding / Company Setup
- Customers
- Projects
- Mail Intelligence
- Presales Review
- Proposal / Quote Desk
- Agents
- Command Center
- Workflows
- Approvals
- Runs / Logs
- Finance
- Settings

### 제외 화면
- 복잡한 BPMN 빌더
- 고급 회계/세무 처리
- 모바일 네이티브 앱
- 완전 자동 외부 발송

## 3. 공통 UX 원칙
1. 사용자는 프롬프트를 직접 관리하지 않는다.
2. 결과 텍스트보다 업무 액션과 다음 단계를 먼저 보여준다.
3. 자동화는 승인 기반 반자동을 기본으로 한다.
4. 에이전트는 대표/영업/프리세일즈/기술/운영/재무/파트너 담당처럼 부서형 카드로 노출한다.
5. 모든 중요 작업은 로그, 근거, 재실행 경로를 가진다.

## 4. 글로벌 레이아웃
### 좌측 사이드바
Dashboard, Customers, Projects, Mail, Presales, Proposal, Agents, Command, Workflows, Approvals, Logs, Finance, Settings

### 상단 헤더
조직명, 전역 검색, 오늘 미응답, 승인 대기, 최근 실행 상태, 사용자 메뉴

### 우측 보조 패널
오늘 긴급 업무, 고객 회신 대기, 승인 대기, 연결 상태, 최근 실행 5건

## 5. Dashboard
### 목적
대표가 오늘의 회사 운영 현황과 병목을 10초 안에 파악한다.

### 핵심 위젯
- Today Critical Tasks
- Pending Customer Replies
- Hot Opportunities
- Pending Approvals
- Active Projects
- Monthly Revenue Pipeline
- Failed / Stuck Runs
- Tool Connection Health

### 주요 액션
새 업무 지시, 고객 회신 초안 생성, 견적 요청 정리, 기술검토 시작, 승인함 이동, 실패 로그 보기

## 6. Customers
### 목적
고객사별 히스토리, 프로젝트, 연락처, 제안 가능 제품, 후속 액션을 관리한다.

### 목록 컬럼
고객사명, 산업군, 규모, 담당자, 최근 요청, 진행 프로젝트, 제안 가능 제품, 다음 액션, 위험도

### 상세 탭
Overview, Contacts, Projects, Mail, Opportunities, Files, Runs

## 7. Projects
### 목적
고객 요청이 실제 업무 단위로 누락 없이 관리되도록 한다.

### 상태값
New Lead, Qualification, Tech Review, Proposal, PoC, Negotiation, Won, Lost, Hold

### 상세 탭
Overview, Requests, Technical Review, Proposal / Quote, Tasks, Mail Threads, Files, Runs, Approvals, Finance

## 8. Mail Intelligence
### 목적
메일을 고객 요청, 견적 요청, 기술 문의, 일정 요청, 파트너 협업, 긴급 이슈로 자동 분류한다.

### 기능
- 고객명/담당자 추출
- 요청사항 추출
- 제품군 추출
- 답변 필요 여부 판단
- 긴급도 판단
- 프로젝트 자동 연결
- 답장 초안 생성

### 승인 기준
내부 요약과 답장 초안은 자동, 실제 발송과 첨부파일 외부 공유는 승인 필요.

## 9. Presales Review
### 목적
고객 기술 문의를 제품군별 체크리스트와 가능/불가/확인필요 기준으로 정리한다.

### 제품군
HCI, DR/hDR, SCP, SKE, SASE, NGAF, IAG, EPP, Switch/AP/Network, Backup, VDI

### 검증 기준
확실한 내용만 가능/불가로 표시하고, 자료 확인이 필요한 항목은 확인 필요로 표시한다. 고객 발송용과 내부 검토용을 분리한다.

## 10. Proposal / Quote Desk
### 목적
견적과 제안에 필요한 정보를 구조화하고 고객/파트너/벤더용 문서를 자동 생성한다.

### 기능
BOM 초안, 제품/라이선스/수량/기간 정리, 고객 요청자료 체크리스트, 파트너 견적 요청 초안, 고객 제안 요약, 견적 발송 승인 요청

## 11. Agents
### 기본 에이전트
- CEO Operating Assistant
- Sales Operator
- Presales Consultant
- Technical Support Scribe
- Proposal Manager
- Finance Briefing Agent
- Partner Collaboration Manager
- Project PM Agent

## 12. Command Center
### 목적
자연어 지시를 적절한 에이전트로 라우팅하고 실행 계획, 위험도, 승인 필요 여부, 결과를 보여준다.

### 예시 입력
- 오늘 고객 메일 중 급한 것만 정리해줘.
- 성우하이텍 DR PoC 기준으로 필요한 자료 요청 메일 작성해줘.
- 베가네트웍스 기존 고객 대상으로 추가 제안 가능한 제품 정리해줘.
- 이번 달 예상 매출과 비용 요약해줘.

## 13. Approvals
### 목적
외부 발송, 견적 확정, 삭제, 비용성 작업을 실행 전 검토한다.

### 상세 블록
Summary, Action Preview, Destination, Related Context, Diff View, Warning, Approval History

## 14. Runs / Logs
모든 AI 실행 결과를 추적하고 실패 원인을 확인한다. Summary, Steps, Tool Actions, Output, Context, Error, Approval, Related Project 탭을 제공한다.

## 15. Finance
예상 매출, 확정 매출, 비용, 순이익, 프로젝트별 수익성을 관리한다.

## 16. 성공 기준
- 하루 업무 브리핑 확인 시간 3분 이하
- 첫 고객 회신 초안 생성까지 1분 이하
- 신규 고객 문의 → 프로젝트 후보 생성 자동화
- 기술검토 체크리스트 자동 생성
- 외부 발송 승인 정책 100% 적용
