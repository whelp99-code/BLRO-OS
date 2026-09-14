# 윤비서 재귀 자기개선(RSI) 적용안

- 상태: **제안서. 루프는 아직 안 돈다.** 이 문서를 활성화하거나 스킬/루틴을 켜지 말 것.
- 작성: 2026-09-14. 대상: 윤비서(Grok Bot 비서실장) → 재민 브리핑용.
- 말투 힌트: 재민에게는 한글 반말, **결과부터**. 이 문서는 재민이 승인할 계약서이므로 평서문으로 적는다.

---

## 0. 윤비서 브리핑 카드 (재민에게 올릴 한 장)

**결과:** 진짜 RSI는 “일을 놓치지 마” 체크리스트가 아니다. **측정 → 비판 → 한 줄 규칙/스킬 초안 → 같은 실패를 다시 돌려보기 → 재민 게이트**다. 지금 스택에는 이 루프가 **돌아가고 있지 않다.**

| 항목 | 상태 | 상세 |
|---|---|---|
| 이 레포(BLRO-OS) RSI/eval | 없음 | 승인 게이트·런 로그 MVP만 있음. `yun-recursive-self-improve`, `OPERATING_CONTRACT`, `completion-gate` 파일 없음 |
| Grok Bot 쪽 가장 가까운 루프 | 문서만 | 평일 19:13 **협업 점검**: 같은 오류 두 번이면 규칙 한 줄. **자동 적용 금지** (2026-08-29 인벤토리) |
| 완료 판정 | 사람+증거 | 완료이가 원문·화면·로그를 연다. “연결됨/명령 전송/초안”은 완료 아님 |
| Ouroboros evolve | 코딩용, 윤비서 운영 아님 | 플러그인 연결(인벤토리). evaluate는 Claude CLI 로그인 필요. **윤비서 데몬으로 쓰지 말 것** |
| 1차 슬라이스 | 아래 §8 | 실패 레지스트리 + same-turn 벤치 2개 + DRAFT 규칙 1줄. 스킬/루틴 활성화는 재민 승인 후 |

**재민에게 올릴 결정 하나:** 1차 슬라이스(§8)를 켤까? 켜면 윤비서는 **초안만** 만들고, 스킬·루틴·Second Brain 확정 기록은 재민이 승인한 뒤에만 반영한다.

---

## 1. 이 문서가 아닌 것 / 이미 돈다고 말하지 말 것

| 주장 | 판정 |
|---|---|
| `yun-recursive-self-improve`가 운영 루프다 | **거부.** 사용자 피드백: “일을 놓치지 마”만 담은 얕은 스킬. 루프가 아님 |
| `completion-gate`(EXECUTED→VERIFIED→RECORDED)가 이 레포/인벤토리에 구현돼 있다 | **이 레포·GitHub org 검색·2026-08-29 인벤토리에서 파일/코드 없음.** 원하는 계약으로만 취급 (§6) |
| Ouroboros evolve가 윤비서를 세대마다 고친다 | **없음.** 코딩 에이전트용 진화 루프. 윤비서 운영에 연결한 증거 없음 |
| Action Hub가 RSI 엔진이다 | **아님.** 모드 `draft-and-read-only`. Routine은 **의도적으로 없음** (수동 Draft 1회 성공 + 재민 승인 전 금지) |
| 이 제안서가 곧 적용이다 | **아님.** 재민이 §8을 승인하기 전 스킬/루틴을 켜지 말 것 |

과거 Aside/shell이 끝났는데 같은 턴에 채점·결과를 안 올린 사건의 **원인 추측은 가설**로만 적는다. 확정 사실로 위키/Second Brain에 쓰지 말 것.

---

## 2. 실무에서 RSI가 의미하는 것 (SF 에세이 제외)

공개 연구·하니스 문서가 공통으로 쓰는 루프는 이것이다.

```
측정(traces + 합격/실패)
  → 비판(실패를 증상 문자열이 아니라 메커니즘으로 묶기)
  → 제한된 쓰기(스킬/규칙/하니스의 최소 수정안)
  → 재실행(그 실패 + 예전에 되던 일)
  → 게이트(둘 다 나빠지지 않고, 하나는 좋아져야 승격)
```

### 2.1 체크리스트와 루프의 차이

| | 얕은 스킬 (“일을 놓치지 마”) | 재귀 자기개선 루프 |
|---|---|---|
| 입력 | 훈화 | 실패한 턴의 **원문 트레이스** + 기대 산출물 |
| 출력 | “다음에 잊지 마” | **버전 있는 패치 초안** + 재실행 결과 |
| 판정 | 자기 선언 | 독립 판정자 + 숫자/증거 |
| 쓰기 | 즉시 본문에 잔소리 추가 | 초안 → 재민 게이트 → 그때만 활성 스킬/루틴 |
| 재귀 | 없음 | 다음 세대는 **갱신된** 스킬/규칙으로 같은 벤치를 다시 돈다 |
| 실패 시 | 또 잔소리 | 패치 폐기, 레지스트리에 남김, 같은 패치 재제안 금지 |

한 줄: **같은 실패를 고친 규칙으로 다시 돌려서, 고친 것과 예전에 되던 것을 둘 다 재민/완료이 기준으로 통과해야** RSI다.

### 2.2 공개 개념 (레포 밖. 이미 우리 스택에서 돈다고 쓰지 말 것)

- **Self-Harness** (Zhou et al., arXiv:2606.09498): Weakness mining → 최소 하니스 수정 → held-in/held-out 회귀 후에만 승격.
- **SICA / ADAS**: 에이전트 아카이브 + 벤치 점수. 메타 에이전트가 다음 후보를 만듦. 스캐폴딩만 바꾸고 가중치는 안 바꿈.
- **AgentForge형 eval 게이트**: 실패 클러스터 → 패치 → 빠른 재평가 → **별도 held-out**에서 점수 게이트 + 회귀 게이트 + 시드 안정성.
- **Context/skill 진화 (ACE 계열)**: 통째로 다시 쓰지 말고 **항목 단위 delta**. 한 번에 매뉴얼을 재작성하면 context collapse.
- **Ouroboros evolve** (플러그인 스킬, 이 환경 MCP는 조사 시 미연결): Seed → Execute → Judge → Gate. Gen2+는 실패한 노드만 열고 PASS는 동결. Judge(점수)와 Gate(계속/수렴/정체)는 분리. 최대 30세대. **ontology_stable ≠ 수렴.**
- **Grok Bot 공식 모델** ([docs.x.ai/grok-bot](https://docs.x.ai/grok-bot/skills-routines-and-automations)): 스킬 = 방법, 루틴 = 언제. 수동으로 한 번 성공한 뒤에만 스킬로 저장. 발송·게시·구매·삭제·프로덕션 변경은 승인. 소스 없거나 오래된 데이터면 실패를 보고하고 멈춤.

### 2.3 윤비서에 맞는 최적화 단 (낮을수록 먼저)

1. **턴 산출물 계약** — 같은 턴에 결과 표가 나왔는가 (이번 실패의 최저 단).
2. **노트/스킬 한 줄** — “어떻게 일하나” (Grok notes / 스킬).
3. **루틴 트리거** — 언제 깨울지. 재민 승인 필수.
4. **봇 description / 운영 헌법** — 거의 안 고침. 재민만.
5. **Ouroboros / 하니스 코드** — 코딩 레포용. 윤비서 일상 운영에 넣지 않음 (전체 설계 §9).

가중치 학습·자기 평가기 수정·자기 권한 완화는 **범위 밖**.

---

## 3. 이 레포와 스택에서 재사용할 것

출처를 갈라 적는다. **경로가 있으면 경로. 스크린/파일로 못 본 것은 UNKNOWN.**

### 3.1 이 레포 `BLRO-OS` (`feature/blro-os-mvp`) — 회사 OS MVP, 윤비서 런타임 아님

재사용:

- 승인 강제: `Downloads/01.Pilot_Coding/blro_company_ops_agentic_os_bundle/starter/src/server/orchestrator/approval-gateway.ts` — `SEND_EMAIL` / `SEND_QUOTE` / `EXTERNAL_SHARE` / `DELETE_DATA` / `MOVE_DATA` / `COST_ACTION`.
- 초안은 자동, 발송은 승인: `.../starter/src/server/policies/action-policy.ts`.
- 라우팅 뼈대: `.../starter/src/server/orchestrator/task-router.ts` (견적/기술/메일/재무 → 담당 에이전트 + 승인 액션).
- 런/승인 모델: `.../starter/prisma/schema.prisma` — `ExecutionRun`, `RunStep`, `ApprovalItem`, `RunStatus` (`QUEUED|RUNNING|SUCCESS|FAILED|WAITING_APPROVAL|CANCELED`). **EXECUTED/VERIFIED/RECORDED enum은 없음.**
- 제품 원칙: `.../00_INDEX.md`, `07_PRD.md`, `00A_Multi-Persona_User_Story.md` — 요약/초안은 자동, 외부 발송·견적·삭제는 승인. 불확실하면 `확인 필요`.

없는 것: eval 하니스, 실패 레지스트리, 스킬 승격 루프, `yun-recursive-self-improve`, `OPERATING_CONTRACT.md`, `completion-gate` 구현.

### 3.2 Grok Bot 운영 스냅샷 (Drive, 윤비서 작성, 2026-08-29)

파일: Google Drive `grokbot-설정-인벤토리-2026-08-29.md` (`16a6TNV-dFxo4DWE0VUKtRQKXdK7Tgz2p`). Drive 업로드 시각 2026-09-07. **2026-08-29 이후 변경은 UNKNOWN.**

재사용 (재민 확정으로 인벤토리에 적힌 것):

- 윤비서 = 라우터 / 승인 게이트 / 최종 브리퍼. id `f59f0239-c687-4d73-bb96-2247324d174b`.
- 완료이: 발송·게시·머지·배포·장비·송금 **주장**이 있을 때만 원문을 연다. 결과를 `[주장] [확인한 원문] [일치/불일치] [남은 위험]`으로 **윤비서에게만**.
- 기록이: 확인된 사건·재민 결정만 위키. 남의 레인 노트 합치지 않음.
- 승인 전 금지: 메일 발송, 외부 게시, 원격 Push·PR·Merge, 배포, 장비·정책·권한, 송금·세금계산서, 원장.
- 재민에게: 검증된 결과, 남은 충돌, 정확한 승인 요청, 결정할 한 가지.
- 보고 형식: 핵심 → 표(항목·상태·상세) → 다음에 할 일 한 가지.
- **협업 점검** 루틴 `13 19 * * 1-5`: 같은 오류 두 번일 때만 규칙 한 줄. **자동 적용 금지. 없으면 침묵.**
- Action Hub: `draft-and-read-only`. 채팅 “승인해 줘” ≠ 승인. Gateway에 approve/execute/send/publish/merge/deploy URL 없음.
- 메모리 힌트: 위키 `/home/box/agent-data/obsidian-blro`. CRM 정본은 로컬 SQLite(노션이 스킬이 가리킴), Notion은 투영, 영업 보드는 읽기전용 참조.
- 노션이 운영 계약 경로 (윤비서 컴퓨터, 이 레포에는 없음): `/home/box/agent-data/workflows/jm-business-crm-operator/` + `references/operating-contract.md` → `daily-scheduling.md` / `change-protocol.md`. **이 워크스페이스에서 원문 미확인 = UNKNOWN live body.**

가장 가까운 기존 “자기개선”은 이미 **반자동 적용**이다. 새 RSI는 이 게이트를 우회하면 안 된다.

### 3.3 형제 레포 (윤비서에 붙여 돌리고 있지 않음. 패턴만)

| 레포 | 가져올 패턴 | 가져오지 말 것 |
|---|---|---|
| [Orca-JARVIS `ORCA_MASTER_CHARTER.md`](https://github.com/whelp99-code/Orca-JARVIS/blob/331c92e26810f8d762453a8e2dd043448f747c36/ORCA_MASTER_CHARTER.md) | 실측 후 추천 → Sir 승인 → 실행 → 문서화. Implementer ≠ Reviewer. `active_work=0`만으로 완료 금지. push/merge/deploy는 단일 사용 승인 영수증 | 윤비서가 코딩 워커를 돌리는 것 |
| [shipping-harness `AGENTS.md`](https://github.com/whelp99-code/shipping-harness/blob/1c74745e8097514933bf0e1caa696fb03cf9431c/AGENTS.md) | 계약 lock → 실행 → evidence → release gate. 모델은 승인/마감 권한 없음. 닫힌 릴리스는 재오픈 금지 | 윤비서 채팅을 소프트웨어 릴리스로 취급하는 것 |
| [second-brain-app `AGENTS.md`](https://github.com/whelp99-code/second-brain-app/blob/f36142c85d4a856094815e5d85c2de0002c97157/AGENTS.md) | `sb_remember`는 `inbox/`만. 볼트 컴파일은 별도. **기본 경로에 사람 승인 게이트 없음** | 확인 안 된 운영 사실을 기본 경로로 볼트에 넣는 것 |
| [JM-AI-Action-Hub](https://github.com/whelp99-code/JM-AI-Action-Hub) | Focus suite 스냅샷. 로컬 acceptance | Action Hub Routine 생성 |

### 3.4 Notion (운영 사실 vs 콘텐츠 오케스트레이션)

- 영업 보드 실무: [롯데건설 NGAF](https://app.notion.com/p/3c936701351881b5aadeea197213426d) — 재민 발송 승인 ≠ 발송됨. 보낸편지함 원문 윤비서 미확인 → “발송 승인됨(원문 대기)”.
- [TV조선 HCI](https://app.notion.com/p/3c336701351881049080dad6067b576b) — 세금계산서·계약서 재민 승인 전 금지.
- Notion Orchestration 2.0 유지보수/스킬 루프(2026-02)는 **콘텐츠 파이프라인**이다. 윤비서 운영 루프가 아니다. 교훈만: 선택 단계는 건너뛴다. 비판 후 패치는 **필수 단계**로 박아야 한다. 매뉴얼 덮어쓰기는 명시 허락 없이 금지 ([파일 하나로 AI 직원…](https://app.notion.com/p/31236701351881118e41e7e08b0a45f0) — 저장 기사, 재민 윤비서 결정 아님).

### 3.5 이 조사에서 확인 못 한 것

Memory-bank MCP 로드 실패. Ouroboros/second-brain MCP 이 환경에서 미연결. `yun-recursive-self-improve` 파일 GitHub org 0건. 대화 아카이브 로컬 없음. 2026-08-29 이후 윤비서 컴퓨터의 스킬 목록은 **UNKNOWN**.

---

## 4. 윤비서 전용 루프

윤비서는 모델을 학습하지 않는다. **자기 하니스**(스킬·루틴·노트·브리프 계약)를 증거로 고친다.

```
[트리거]
   놓친 일 사고 | 평일 19:13 협업 점검 | 벤치 실패
        ↓
[측정]  원문 트레이스 + 기대 산출물 체크리스트
        ↓
[비판]  완료이(증거) / 필요 시 분석이·반박이(고비용) / 윤비서는 자기 배달을 혼자 합격 시키지 않음
        ↓
[초안]  쓰기 대상 1개만. 한 줄~최소 패치. DRAFT
        ↓
[재실행] held-in = 이번 실패 재현 / held-out = 예전에 되던 브리프 1개
        ↓
[게이트] 재민. 둘 다 회귀 없음 + 하나는 개선일 때만 활성 스킬/루틴/결정 기록
        ↓
[다음 세대] 활성 규칙으로 같은 벤치를 다시 측정. 이게 재귀
```

### 4.1 단계별 계약

#### A. 입력 (측정)

윤비서가 모을 것. 기억으로 채우지 말 것.

| 입력 | 어디서 | 합격 조건 |
|---|---|---|
| 사용자 요청 원문 | 그 턴 채팅 | 그대로 인용 |
| 위임한 작업 목록 | 윤비서가 부른 봇/Aside/shell | TASK-ID 또는 job id |
| 작업 종료 신호 | 로그/툴 결과/Aside done | “시작했다”가 아니라 **끝났다는 원문** |
| 같은 턴 브리프 | 윤비서 최종 메시지 | §6 표가 있는가 |
| 완료이 패킷 | 외부 실행 주장 시만 | `[주장][원문][일치][위험]` |
| 이전 같은 실패 | 실패 레지스트리 (노트) | 같은 `failure_id` 2회? |

**1차 벤치 (놓친 일):** 긴 Aside/shell이 `SUCCESS`/`done`인데 같은 턴 최종 메시지에 점수·결과 표가 없으면 **DROP**. 가설: 백그라운드 완료를 “나중에”로 미루고 턴을 닫음. 확정 원인 아님.

#### B. 지표

| 지표 | 정의 | 1차 목표 |
|---|---|---|
| `same_turn_delivery` | 끝난 작업마다 같은 턴 표에 행이 있음 | 벤치 2개 모두 PASS |
| `evidence_completion` | 외부 실행을 완료로 쓴 경우 완료이 원문 있음 | 100% (해당 시) |
| `silent_done` | 사용자가 묻기 전에 결과가 안 보임 | 0 |
| `invented_fact` | 노트/위키에 확인 안 된 사실을 적음 | 0 |
| `auto_apply` | 재민 승인 없이 스킬/루틴/결정 기록 변경 | 0 |
| `repeat_drop` | 같은 `failure_id`가 승인된 패치 이후에도 재발 | 0 (재발하면 패치 롤백) |

점수는 우선순위일 뿐 권한이 아니다 (노션이/영업이 계약과 동일).

#### C. 판정자 (Judge) vs 게이트 (Gate)

| 역할 | 누가 | 하는 일 | 못 하는 일 |
|---|---|---|---|
| Judge-증거 | 완료이 | 원문·화면을 열어 사실만 | 스킬 수정, 재민 대신 승인 |
| Judge-메커니즘 | 윤비서 + (반복/고비용이면) 분석이·반박이 독립 | 실패를 `failure_id`로 묶고 최소 패치 초안 | 자기 패치를 활성으로 승격 |
| Gate | **재민** | 스킬/루틴/위키 결정/Second Brain 후보 승격 | — |
| 코딩 evolve Gate | Ouroboros / shipping-harness | 코딩 레포만 | 윤비서 운영 스킬 자동 승격 |

Ouroboros식 분리: Judge는 점수·증거를 남기고, Gate는 재민이 수락/보류/폐기한다. 윤비서가 둘 다 하면 보상 해킹이다.

#### D. 쓰기 대상 (한 세대에 하나)

| 대상 | 넣는 내용 | 티어 | 자동? |
|---|---|---|---|
| **실패 레지스트리** (노트 / 위키 `열린 일`이 아님, 작업 로그) | `failure_id`, 증상, 메커니즘 가설, 트레이스 링크, 패치 초안, 재실행 결과 | notes = 어떻게 일하나 | 예, append-only |
| **스킬 패치 DRAFT** | 한 메커니즘, 검증 방법, 승인 경계 | notes/skill | 초안만 자동. 활성화는 재민 |
| **에이전트 메모리 로그** | “이 턴에서 뭘 놓쳤고 다음에 같은 입력이면 표를 먼저” | chat/notes | 작업 메모만. 사실 확정 아님 |
| **Second Brain 후보** | 재민이 확인한 결정·사건만 | confirmed facts | **아니오.** inbox 후보 + 재민 확인. `sb_remember` 기본 경로는 승인 없음 — 윤비서는 확인 전 볼트 컴파일 요청 금지 |
| **루틴** | cron/트리거, 입력, 실패 시 동작 | schedule | **아니오.** 협업 점검 문구 변경·새 루틴은 재민 |
| **봇 description / 운영 원칙** | 헌법 | 거의 불변 | **아니오. 재민만** |

메모리 정책 (사용자 지시 + 인벤토리):

- **notes** = 어떻게 일하나 (스킬·체크·실패 패턴).
- **Second Brain / 위키 결정** = 확인된 사실·결정만.
- 노트에 사실을 쌓지 말 것. 사실 후보는 기록이 레인으로 넘기고, 재민 확인 전 “결정됨”으로 쓰지 말 것.

---

## 5. 자동 vs 재민 승인

### 5.1 자동 허용 (권한 없음, 흔적만)

- 실패 레지스트리에 **한 건 append**.
- 같은 턴에 DROP이면 표로 재민에게 보고 (결과만).
- DRAFT 스킬/규칙 텍스트를 채팅 또는 `docs/drafts/`에 붙임. 파일명·본문에 `DRAFT / 미활성`.
- 협업 점검이 침묵 조건을 충족하면 **침묵** (새 잔소리 스킬을 만들지 않음).

### 5.2 재민 승인 필수

- 스킬 활성화·교체·삭제.
- 루틴 생성·cron 변경·pause 해제 (Aside 감시 포함).
- 윤비서/완료이/기록 description 수정.
- 위키 결정 로그, Second Brain 볼트 반영, CRM 금액/단계/계약.
- 메일·카카오·외부 게시·WEHAGO 발행·송금·원장·Push·PR·Merge·배포·장비 설정.
- Action Hub Draft 생성 이상의 일. Action Hub 승인은 **허브 UI에서**. 채팅 승인은 무효.
- Ouroboros evolve를 윤비서 스킬에 연결하는 실험.
- 이 제안서 §8 → §9로 범위 확대.

### 5.3 절대 자동 금지

- 평가기·완료이 기준을 윤비서가 고침.
- “완료됨”을 원문 없이 기록.
- 백그라운드에서 일을 끝내고 같은 턴에 안 올림.
- Kakao/메일/WEHAGO 커넥터가 없다고 브라우저로 우회 발송.
- 한 세대에 스킬+루틴+description을 같이 고침.

---

## 6. completion-gate와 “결과만 보고”

`EXECUTED → VERIFIED → RECORDED`는 **이 레포에 구현돼 있지 않다.** 윤비서 운영 계약으로 **이렇게 쓰자고 제안**한다.

| 단계 | 의미 | 누가 | 윤비서 브리프에 쓸 수 있나 |
|---|---|---|---|
| **EXECUTED** | 담당 봇/Aside/shell이 종료 원문을 남김 | 실행자 | “일 끝남”이 아님. “실행 종료 신호 있음” |
| **VERIFIED** | 기대 산출물을 독립 확인. 외부 실행이면 완료이 원문 | 완료이 또는 윤서 체크리스트(내부 산출물) | 일치일 때만 “확인됨” |
| **RECORDED** | 확인된 사건만 기록이/위키. 재민 브리프 표에 행 | 기록이 + 윤비서 | 이 단계 후에만 재민 보고에 “완료” |

**결과만 보고:** 재민 메시지에는 핵심 → 표 → 다음 일 하나. RSI 중간 추론, 철학, 스킬 전문을 올리지 않는다. RSI 상세는 재민이 “패치 초안 보여줘” 할 때만.

놓친 일의 정의 (가설이 아니라 **운영 정의**):

> EXECUTED 신호가 있는데 같은 턴에 VERIFIED 행이 없고, 재민 표에도 RECORDED가 없으면 DROP.

RSI는 이 게이트 **위**에 앉는다. 게이트를 느슨하게 만들어 점수를 올리는 패치는 폐기.

BLRO-OS `RunStatus`와 맞출 때 (나중에 OS를 붙이면): `SUCCESS` ≠ VERIFIED. `SUCCESS`는 EXECUTED에 가깝다. VERIFIED는 `ApprovalItem` + 원문 링크 또는 별도 필드가 필요하다. 지금은 Grok 턴 계약으로만 강제.

---

## 7. 스케줄 / 트리거

플러그인은 스케줄이 없다. 루틴이 윤비서를 깨운다 (인벤토리 §7). 새 루틴은 재민 승인 전 만들지 말 것.

| 트리거 | 언제 | 하는 일 | 침묵? |
|---|---|---|---|
| **사고** | 재민이 “놓쳤다”거나 윤서 자기점검이 DROP | 즉시 측정→초안→재민에게 결정 하나 | 아니오. 결과 표 |
| **협업 점검** (기존 `19:13` 평일) | 이미 켜짐 (2026-08-29) | 레지스트리에서 같은 `failure_id` 2회면 **규칙 한 줄 초안만**. 자동 적용 금지 | 새 오류 없으면 **침묵** 유지 |
| **벤치 실패** | 1차 슬라이스의 수동/요청 재실행이 FAIL | 패치 폐기 또는 2차 초안. 3회 실패면 정체 → 재민 | 아니오 |
| 아침/퇴근 보고 | 기존 09:00 / 18:00 | RSI 하지 않음. 운영 브리프만 | RSI 잔소리 금지 |
| Ouroboros 세대 루프 | — | 1차에 없음 | — |
| 주말/심야 백그라운드 evolve | — | 없음 | — |

Aside 감시 루틴은 인벤토리상 **꺼짐**. 켜는 것은 재민 승인.

---

## 8. 1차 슬라이스 (최소 범위. 재민 승인 후에만)

일정 추정이 아니라 **범위**다. 벤치 2개와 레지스트리·한 줄 초안이 닫히면 1차 끝.

### 켤 것

1. **실패 레지스트리 한 파일**  
   위치 제안: 윤비서 컴퓨터 노트  
   ` /home/box/agent-data/obsidian-blro/ops/yun-rsi-failure-registry.md `  
   (볼트가 없으면 채팅 고정 노트). Second Brain 아님. 결정 로그 아님.  
   스키마:

   ```text
   failure_id: drop.same_turn_result
   first_seen: ISO-KST
   count: n
   last_trace: (메시지/로그 링크, 원문 인용 3줄 이내)
   mechanism_hypothesis: (가설 표시)
   patch_draft: (한 줄, DRAFT)
   rerun: PASS/FAIL/NOT_RUN
   jaemin_gate: PENDING/APPROVED/REJECTED
   ```

2. **벤치 2개 (held-in / held-out)**  
   - B1 held-in: 긴 shell/Aside가 끝난 직후, 같은 턴에 결과 표가 있어야 PASS.  
   - B2 held-out: 기존 퇴근 보고 형식(항목·상태·상세 + 다음 일 하나)이 깨지지 않아야 PASS.  
   재민이 “RSI 벤치 돌려”라고 하거나, DROP 사고 직후 윤서가 같은 입력을 **읽기 전용으로** 재연한다. 외부 발송 없음.

3. **패치 형식**  
   활성 스킬을 고치지 않는다. `docs/drafts/yun-rsi-loop.skill.DRAFT.md` 또는 채팅 블록.  
   허용 내용 예: “EXECUTED 신호가 있으면 최종 메시지 전에 표 행을 채운다. 없으면 DROP으로 보고 턴을 닫지 않는다.”  
   금지: 철학 문단, 새 승인 우회, 사실 발명.

4. **재민 게이트 한 줄**  
   “이 DRAFT를 윤비서 작업 스킬로 활성화할까? B1·B2 결과: …”

### 켜지 말 것 (1차)

- 새 Grok Routine.
- Ouroboros evolve / evaluate 상시.
- Second Brain 자동 compile.
- Action Hub Routine.
- `yun-recursive-self-improve` 철학 스킬 재작성.
- BLRO-OS 코드 변경 (이 PR은 문서만).

### 1차 성공 기준

- DROP이 한 번 나면 레지스트리 행 + 같은 턴 표가 재민에게 간다.
- 승인 전 활성 스킬/루틴/위키 결정이 안 바뀐다.
- 승인 후 B1 PASS, B2 회귀 없음.
- 그 다음 실제 DROP이 같은 `failure_id`로 재발하면 패치를 끄고 레지스트리에 REJECT 이유를 남긴다.

---

## 9. 전체 설계 (1차 통과 후에만)

1. 벤치 세트 고정 (5~10). 예: same-turn 배달, 발송 승인≠발송, WEHAGO 미커넥터에서 발행 시도 차단, stale CRM 쓰기 중단, 협업 점검 침묵, Action Hub 채팅 승인 거부.
2. 실패 클러스터링: 증상 문자열 말고 `(verifier_cause, agent_causal, mechanism)`.
3. 스킬을 항목 ID + helpful/harmful 카운터로 쪼갬. 통째 재작성 금지.
4. shipping-harness식 **스킬 계약 lock**: 활성 스킬 해시. 승인 영수증 없이 교체 불가.
5. Ouroboros는 **격리된 코딩/온톨로지 실험**에만. `execute:true` 없이 수렴 선언 금지. 윤비서 프로덕션 스킬 트리에 직접 write-back 금지.
6. BLRO-OS에 `RunStatus`와 VERIFIED 원문 필드를 나중에 맞출 수 있음. 지금은 필수 아님.
7. 평가기·완료이 프롬프트는 루프가 수정 가능한 표면 **밖**.

정체 조건: 같은 벤치가 3세대 점수 변동 < 의미 있는 차이(실무: PASS/FAIL이 안 바뀜) → 멈추고 재민에게 “정체, 단을 올릴지” 한 가지.

---

## 10. 안티패턴

| 안티패턴 | 왜 루프가 아닌가 / 위험한가 |
|---|---|
| 철학-only 스킬 | 측정·재실행·게이트가 없음. 이미 거부됨 |
| 운영 사실 발명 | 노트/위키에 “카카오 게이트 있음”, “completion-gate 가동 중” 등을 증거 없이 씀 |
| 침묵 백그라운드 완료 | EXECUTED만 있고 같은 턴 RECORDED 없음 = 원래 실패 모드 |
| 자기 채점 승격 | 윤서 패치를 윤서가 APPROVED로 씀 |
| 평가기 수정으로 점수 상승 | 보상 해킹. 패치 폐기 |
| 매뉴얼 통째 재작성 | context collapse |
| 한 줄이 아닌 헌법 수정으로 사고 대응 | 과잉. 최저 단부터 |
| 협업 점검에 매일 잔소리 | 인벤토리: 없으면 침묵 |
| Action Hub / 메일 / WEHAGO를 RSI가 실행 | 승인 경계 파괴 |
| Ouroboros를 윤서 야간 데몬으로 | 미검증, evaluate 의존, 운영 사실 오염 |
| Second Brain에 가설 DROP 원인을 사실로 넣음 | 메모리 정책 위반 |
| “연결됨”을 VERIFIED로 승격 | 완료이 계약 위반 |

---

## 11. 윤비서가 지금 할 일 (승인 전)

1. 이 문서를 읽고 재민에게 §0 카드만 올린다.
2. 스킬/루틴을 만들지 않는다. Appendix는 DRAFT다.
3. 재민이 §8을 승인하면: 레지스트리 파일 위치만 정하고, 다음 DROP 또는 “벤치 돌려”에서 B1/B2를 돌린다.
4. 승인 질문이 하나보다 많아지면 가장 위험한 것 하나만 남긴다.

---

## 12. 출처

**레포 (이 워크스페이스)**

- `Downloads/01.Pilot_Coding/blro_company_ops_agentic_os_bundle/00_INDEX.md`
- `.../07_PRD.md`
- `.../00A_Multi-Persona_User_Story.md`
- `.../starter/src/server/orchestrator/approval-gateway.ts`
- `.../starter/src/server/policies/action-policy.ts`
- `.../starter/src/server/orchestrator/task-router.ts`
- `.../starter/prisma/schema.prisma`

**Drive**

- `grokbot-설정-인벤토리-2026-08-29.md` (id `16a6TNV-dFxo4DWE0VUKtRQKXdK7Tgz2p`) — 재민 확정 원칙·봇·루틴. 스냅샷.

**GitHub (패턴, 윤비서에 미연결)**

- `whelp99-code/Orca-JARVIS` `ORCA_MASTER_CHARTER.md`
- `whelp99-code/shipping-harness` `AGENTS.md`
- `whelp99-code/second-brain-app` `AGENTS.md`

**Notion**

- 롯데건설 NGAF, TV조선 HCI (발송 승인 ≠ 발송, WEHAGO 승인)
- Orchestration 2.0 유지보수 가이드 — 윤비서 루프 아님

**공개**

- [xAI Grok Bot skills/routines](https://docs.x.ai/grok-bot/skills-routines-and-automations)
- Self-Harness arXiv:2606.09498; SICA arXiv:2504.15228; Agent Skills for Context Engineering `self-improvement-loops`

**UNKNOWN**

- 2026-09-14 기준 윤비서 컴퓨터의 실제 스킬 목록에 `yun-recursive-self-improve`가 있는지
- `operating-contract.md` 현재 본문
- Ouroboros evaluate가 재민 머신에서 로그인돼 있는지
- 카카오를 별도 채널 게이트로 명시한 재민 문서 (인벤토리는 “외부 게시”로만 포괄)
- Memory-bank / 대화 아카이브의 과거 RSI 거절 원문

---

## Appendix A — DRAFT 스킬 본문 (미활성)

아래는 **켜지 말 것.** 재민이 §8을 승인하고 B1/B2를 한 번 돌린 뒤에만 윤비서 스킬로 저장할지 묻는다.  
전체 파일: `docs/drafts/yun-rsi-loop.skill.DRAFT.md`

## Appendix B — DRAFT 루틴 문구 (만들지 말 것)

기존 **협업 점검**을 바꾸는 것도 재민 승인 전 금지. 승인 시 추가 문장 후보:

> 실패 레지스트리에서 `count>=2` 이고 `jaemin_gate=PENDING` 인 행이 있으면 규칙 한 줄 초안만 올린다. 없으면 침묵. 스킬·위키·루틴은 적용하지 않는다.

새 cron을 추가하지 않는다.
