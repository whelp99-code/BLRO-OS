# W12 — P6 QA·운영

> **Phase:** P6 · **게이트:** CEO 성공정의 8항목 · 레드팀 ≥9.0

## 티켓

전량 → [41-티켓-전량-상세 §P6](../41-티켓-전량-상세.md#p6--w12)

## CEO 8항목 체크

| # | 기준 | 검증 |
|---|------|------|
| 1 | :3110 브리핑 | /command |
| 2 | same-tab | mail/finance/sangfor |
| 3 | mail→Project | E2E-2 |
| 4 | 단일 승인 | E2E-3 |
| 5 | 의도적 분리 | 33 §3 |
| 6 | health 8/8 | c-stack-health |
| 7 | DB :5435 | prisma |
| 8 | E2E 1–4 | e2e-scenarios |

## 운영

- [ ] [c-stack-runbook](../ops/c-stack-runbook.md) 교육 1회 (P6-PM-002)
- [ ] rollback drill: `docker compose down` → 5분 복구
- [ ] [34-레드팀](../34-레드팀-점수화-개선-루프-C방향.md) Round 5 재채점

## CI

```bash
# AIOSv2 GitHub Actions — migrate + build
gh run list --repo whelp99-code/AIOSv2_integration --limit 3
```

## CFO DB merge (P6-ENG-003)

- [p6-cfo-db-merge-plan.md](../p6-cfo-db-merge-plan.md) additive migration
- 대표 서명 후 deploy
