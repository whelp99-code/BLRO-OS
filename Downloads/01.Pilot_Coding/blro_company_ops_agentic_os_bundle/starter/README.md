# BLRO Company Operating OS Starter

베를로 회사 운영 자동화 MVP를 위한 Next.js App Router 스타터 코드입니다.

## 검증

- `npm install` 후 `npm run build`로 빌드 확인 가능

## 실행

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run dev
```

PostgreSQL을 연결한 뒤에는 다음 순서로 진행합니다.

```bash
npm run prisma:migrate
npm run seed
npm run dev
```

## 포함 범위

- Next.js App Router 라우트 골격
- Dashboard / Customers / Projects / Mail / Presales / Proposal / Finance / Agents / Command / Workflows / Approvals / Logs / Settings 화면 placeholder
- 공통 AppShell, PageHeader, KPI 카드, DataTable, 상태 배지
- Mock API route
- Prisma schema
- Command Center용 task router / approval gateway 샘플
- BLRO 운영 페르소나 기반 seed/mock 데이터

## Drive 00_INBOX weekly classification

Cursor owns a weekly dry-run of residual files in Google Drive `00_INBOX` (account `jm.park830202@gmail.com`, Drive Protocol v1.0). Schedule: Monday 10:00 Asia/Seoul (`0 1 * * 1` UTC). The job proposes buckets A/B/C/D/E only. Ambiguous files are UNKNOWN (bucket E), stay in `00_INBOX`, and are listed for 재민 to confirm. External email, trash, delete, and live moves are forbidden. `--apply` is refused. Details: `ops/drive-inbox-weekly/README.md`.

## 개발 원칙

- page.tsx는 얇게 유지한다.
- 실제 로직은 `src/server`와 `src/features`로 분리한다.
- 외부 발송, 삭제, 견적 발송은 Approval Gateway로 보낸다.
- 불확실한 내용은 `확인 필요`로 표시한다.
