# BLRO Starter → AIOSv2 UI 포팅 체크리스트 (12항)

> **레드팀 D10 — 구현 가능성 9.5**  
> **소스:** `~/Downloads/.../blro_company_ops_agentic_os_bundle/starter`  
> **타겟:** `AIOSv2_integration/apps/web` (Next 16)

---

## 버전 차이

| 항목 | BLRO starter | AIOSv2 web |
|------|--------------|------------|
| Next.js | 15 | 16 |
| 방식 | copy-paste ❌ | **포팅** (import 경로·layout 조정) |

---

## 체크리스트

| # | 항목 | 완료 |
|---|------|:----:|
| 1 | AppShell 레이아웃 (`app/(dashboard)/layout.tsx`) | ☐ |
| 2 | 사이드바 네비: command, mail, finance, sangfor, approvals | ☐ |
| 3 | `/command` Command Center 페이지 | ☐ |
| 4 | `/approvals` 승인 큐 UI | ☐ |
| 5 | `approval-gateway` 미들웨어/API 연동 | ☐ |
| 6 | `ApprovalActionType` enum 공유 (packages/db) | ☐ |
| 7 | mail iframe/proxy → `MAIL_INTELLIGENCE_URL` | ☐ |
| 8 | finance BFF stub → P3 연결 | ☐ |
| 9 | sangfor 탭 placeholder → P4 연결 | ☐ |
| 10 | shadcn/ui 컴포넌트 충돌 해소 | ☐ |
| 11 | `next.config` rewrite (mail, cfo, sangfor) | ☐ |
| 12 | `npm run build` + lint green | ☐ |

---

## 금지

- starter Prisma를 AIOSv2에 **병렬** 두기 (C-1a 위반)
- portal web 전체 merge
- 새 탭으로 mail 열기 (시나리오 1 실패)

---

## 검증

```bash
cd AIOSv2_integration/apps/web && npm run build
curl -s http://127.0.0.1:3110/api/integrations/health
```
