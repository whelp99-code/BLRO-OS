#!/usr/bin/env node
/**
 * C-Stack E2E scenarios 1–4 (smoke)
 */
const HUB = process.env.C_STACK_HUB ?? 'http://localhost:3110';
const MAIL = process.env.MAIL_INTELLIGENCE_URL ?? 'http://localhost:3010';

async function fetchOk(url, init) {
  const res = await fetch(url, init);
  return { ok: res.ok, status: res.status, res };
}

async function scenario1() {
  const page = await fetchOk(`${HUB}/command`);
  const briefing = await fetchOk(`${HUB}/api/command/briefing`);
  const data = briefing.ok ? await briefing.res.json() : null;
  const fields = data
    ? ['mail', 'approvals', 'projects', 'cfo', 'sangfor'].every((k) => k in data)
    : false;
  return {
    name: 'scenario-1-briefing',
    pass: page.ok && briefing.ok && fields,
    detail: { page: page.status, briefing: briefing.status, fields },
  };
}

async function scenario2() {
  const ingest = await fetchOk(`${HUB}/api/projects/from-mail`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      subject: `E2E Project ${Date.now()}`,
      from: 'e2e@example.com',
      bodyPreview: 'PoC 요청 fixture',
    }),
  });
  const body = ingest.ok ? await ingest.res.json() : null;
  const created = body?.project?.id;
  return {
    name: 'scenario-2-mail-to-project',
    pass: ingest.ok && Boolean(created),
    detail: body,
  };
}

async function scenario3() {
  const blocked = await fetchOk(`${HUB}/api/mail/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to: 'test@example.com', subject: 'e2e' }),
  });
  if (blocked.status !== 409) {
    return {
      name: 'scenario-3-approval-gate',
      pass: false,
      detail: { step: 'expect-409', status: blocked.status },
    };
  }

  const createApproval = await fetchOk(`${HUB}/api/approvals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'E2E mail send',
      actionType: 'SEND_EMAIL',
    }),
  });
  const approvalBody = createApproval.ok ? await createApproval.res.json() : null;
  const approvalId = approvalBody?.approval?.id;

  const approve = await fetchOk(`${HUB}/api/approvals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ approvalId, status: 'APPROVED' }),
  });

  const retry = await fetchOk(`${HUB}/api/mail/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: 'test@example.com',
      subject: 'e2e',
      approvalId,
    }),
  });

  return {
    name: 'scenario-3-approval-gate',
    pass: blocked.status === 409 && approve.ok && retry.status !== 409,
    detail: { blocked: blocked.status, approve: approve.status, retry: retry.status },
  };
}

async function scenario4() {
  const finance = await fetchOk(`${HUB}/finance`);
  const cfo = await fetchOk(`${HUB}/api/cfo/health`);
  return {
    name: 'scenario-4-cfo-proxy',
    pass: finance.ok && (cfo.ok || cfo.status === 404),
    detail: { finance: finance.status, cfo: cfo.status },
  };
}

async function main() {
  const results = await Promise.all([
    scenario1(),
    scenario2(),
    scenario3(),
    scenario4(),
  ]);

  for (const r of results) {
    console.log(`${r.pass ? 'PASS' : 'FAIL'} ${r.name}`, JSON.stringify(r.detail));
  }

  const allPass = results.every((r) => r.pass);
  process.exit(allPass ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
