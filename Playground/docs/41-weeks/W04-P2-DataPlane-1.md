# W4 — P2 Data Plane (1/3)

> **Phase:** P2 · **게이트:** 5 yaml + registry build

## 목표

data-plane 패키지 운영 확정, Bronze/Silver/Gold 정의 v2.

## 머지 PR

AIOSv2 #3 → main (`packages/data-plane`)

## 티켓

| ID | 작업 | Done |
|----|------|:----:|
| P2-PM-001 | B/S/G 워크숍 | 🟡 |
| P2-PM-002 | email·project yaml | ✅ |
| P2-PRE-001 | device yaml | ✅ |
| P2-FIN-001 | invoice·payment yaml | ✅ |
| P2-ENG-001 | 패키지 생성 | ✅ |
| P2-ENG-002 | registry 5종 | 🟡 |
| P2-ENG-004 | Redis publisher | ✅ |

## 검증

```bash
cd Playground/AIOSv2_integration/packages/data-plane && pnpm build
redis-cli -p 6382 XREAD STREAMS aios:data-plane:events 0
```

## 산출

[p2-data-plane-definitions.md](../p2-data-plane-definitions.md) v2
