# E2E-SCENARIO-001 — C-Stack 스모크 시나리오

> **목적:** P6 및 레드팀 D6 검증  
> **환경:** `docker-compose.c-stack.yml` + integration stack  
> **갱신:** 2026-06-22

---

## 사전 조건

```bash
docker compose -f docker-compose.c-stack.yml up -d
cd AIOSv2_integration && npm run integration:stack   # 또는 수동 5프로세스
node scripts/c-stack-health.mjs
```

| 서비스 | 기대 |
|--------|------|
| PG :5435 | TCP OK |
| Redis :6382 | TCP OK |
| :3110 | 200/503 |
| :3010 `/api/outlook/status` | 200 |
| :4100 `/api/health` | 200 |
| :3500 `/api/system/health` | 200 |

---

## 시나리오 1 — 아침 브리핑 (P1)

| Step | 액터 | 액션 | 기대 |
|------|------|------|------|
| 1 | 대표 | `http://localhost:3110/command` 접속 | 200, 5필드 브리핑 |
| 2 | 시스템 | SSE `/api/command/briefing/stream` | 30s 내 갱신 이벤트 |
| 3 | 대표 | 메일·CFO·Sangfor 위젯 클릭 | **같은 탭** 내 프록시 (새 탭 X) |

---

## 시나리오 2 — 메일 → Project 후보 (P2)

| Step | 액터 | 액션 | 기대 |
|------|------|------|------|
| 1 | 운영PM | 테스트 메일 1건 수신 (fixture) | Bronze ingest |
| 2 | 시스템 | data-plane-hook | Project 후보 1건 |
| 3 | 영업 | 후보 검토·승인 | Silver → Gold |
| 4 | 운영PM | 중복 메일 재수신 | dedup 정책 적용 |

---

## 시나리오 3 — 승인 게이트 (P1)

| Step | 액터 | 액션 | 기대 |
|------|------|------|------|
| 1 | 운영PM | 미승인 메일 발송 시도 | **409** |
| 2 | 대표 | `/approvals`에서 SEND_EMAIL 승인 | status=approved |
| 3 | 운영PM | 동일 메일 재발송 | 200 |

---

## 시나리오 4 — CFO 프록시 (P3)

| Step | 액터 | 액션 | 기대 |
|------|------|------|------|
| 1 | 재무 | `/finance` KPI 로드 | BFF → :4100 |
| 2 | 재무 | Invoice draft 생성 | read-only until 승인 |
| 3 | 대표 | COST_ACTION 승인 | 등록 완료 |

---

## Go/No-Go (P6)

- [ ] 시나리오 1~3 통과
- [ ] 시나리오 4 (P3 완료 시)
- [ ] `c-stack-health.mjs` 전체 pass
- [ ] rollback: `docker compose down` 후 재기동 5분 내 복구
