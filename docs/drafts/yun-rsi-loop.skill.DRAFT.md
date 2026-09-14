# DRAFT / 미활성 — 윤비서 RSI 루프 스킬

- 상태: **DRAFT. 활성화 금지.** 재민이 `docs/yun-secretary-recursive-self-improvement-proposal.md` §8을 승인하고 벤치 B1·B2를 돌리기 전에는 윤비서 스킬로 저장하지 말 것.
- 이름 후보: `yun-rsi-loop` (기존 `yun-recursive-self-improve` 철학 스킬을 대체할 때만. 그 스킬을 몰래 덮어쓰지 말 것)
- 소유: 윤비서. 완료이·기록이에게 이 스킬로 발송/기록 권한을 주지 않음.

## When to use

다음일 때만:

- 재민이 “놓쳤다”, “결과 어디 있어”, “RSI 벤치 돌려”라고 함
- 긴 Aside/shell/담당 봇 작업이 **종료 원문**을 남겼는데 같은 턴 최종 메시지에 결과 표가 없음
- 평일 19:13 협업 점검이 레지스트리에서 `count>=2` 행을 봄

일상 아침/퇴근 보고, 잡담, 전략 토론에는 쓰지 않음.

## Required inputs

1. 사용자 요청 원문 (지어내지 말 것)
2. 위임 목록과 각 종료 신호 (로그/툴 출력 인용)
3. 실패 레지스트리 파일 (없으면 “없음”이라고 보고하고 만들지 말지 재민에게 한 가지로 물음 — §8 승인 후에만 생성)

소스 없거나 종료 신호가 없으면 추정 금지. `UNKNOWN` + 다음에 열 원문.

## Sequence

1. **측정:** 각 위임 건을 EXECUTED / 미종료 / UNKNOWN으로 표에 적음.
2. **같은 턴 배달:** EXECUTED인데 최종 메시지에 행이 없으면 `failure_id=drop.same_turn_result` 로 DROP.
3. **비판:** 메커니즘 가설 한 줄. 확정 사실처럼 쓰지 말 것.
4. **초안:** 규칙 한 줄만. 스킬/루틴/description을 직접 고치지 말 것.
5. **재실행 (요청 또는 §8 승인 후):** B1(이번 DROP 재연, 읽기 전용) + B2(퇴근 보고 형식 유지). 외부 발송·카카오·메일·WEHAGO·Push 없음.
6. **게이트:** 재민에게 결정 하나만. `이 DRAFT를 활성 스킬로 넣을까? B1= / B2=`

## Validate

- 표 열: 항목 | 상태(EXECUTED/VERIFIED/RECORDED/DROP/UNKNOWN) | 상세(원문 근거)
- VERIFIED 없이 “완료” 금지
- 외부 실행 주장 → 완료이 패킷 없으면 VERIFIED 금지
- 레지스트리 append 외에 위키 결정/Second Brain/CRM 쓰기 금지

## Return (결과만)

핵심 한 줄 → 표 → 다음에 할 일 또는 승인 질문 **하나**.

RSI 논문, 철학, 이 스킬 전문을 재민 브리프에 넣지 말 것.

## Requires Jae Min approval

- 이 스킬의 저장·활성화·교체
- 루틴 생성/변경
- Second Brain 볼트 반영, 위키 결정 로그
- 메일 / 카카오 / 외부 게시 / WEHAGO / 송금 / 원장 / Push / PR / Merge / 배포 / 장비

채팅 “승인해 줘”는 Action Hub 승인이 아니다.

## Do not

- “일을 놓치지 마” 훈화만 추가
- 운영 사실 발명
- 백그라운드 완료를 침묵으로 처리
- 자기 패치를 APPROVED로 표시
- 평가기·완료이 기준을 이 스킬로 완화
- 한 세대에 쓰기 대상 2개 이상 변경
