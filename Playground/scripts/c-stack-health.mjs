#!/usr/bin/env node
/**
 * C-Stack health check — HEALTH-REGISTRY.yaml 기준
 * Usage: node scripts/c-stack-health.mjs [--required-only]
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import net from 'node:net';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const requiredOnly = process.argv.includes('--required-only');

const registry = readFileSync(join(ROOT, 'HEALTH-REGISTRY.yaml'), 'utf8');
const blocks = registry.split(/\n  (?=[a-z])/);
const services = {};

for (const line of registry.split('\n')) {
  const m = line.match(/^  ([a-z0-9-]+):$/);
  if (m) services[m[1]] = services[m[1]] || { name: m[1] };
}

// Simple YAML parse for our fixed format
let current = null;
for (const line of registry.split('\n')) {
  const svc = line.match(/^  ([a-z0-9-]+):$/);
  if (svc) {
    current = svc[1];
    services[current] = { name: current, required: false };
    continue;
  }
  if (!current) continue;
  if (line.includes('required_for_p0: true')) services[current].required = true;
  const url = line.match(/url: "(.+?)"/);
  if (url) services[current].url = url[1];
  const target = line.match(/target: "(.+?)"/);
  if (target) services[current].tcp = target[1];
  const type = line.match(/type: (\w+)/);
  if (type) services[current].type = type[1];
  const expect = line.match(/expect_status: \[(.+?)\]/);
  if (expect) services[current].expect = expect[1].split(',').map((s) => Number(s.trim()));
}

function checkTcp(host, port) {
  return new Promise((resolve) => {
    const socket = net.connect({ host, port, timeout: 3000 }, () => {
      socket.end();
      resolve(true);
    });
    socket.on('error', () => resolve(false));
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
  });
}

async function checkHttp(url, expect = [200]) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    return expect.includes(res.status);
  } catch {
    return false;
  }
}

async function main() {
  const entries = Object.values(services).filter((s) => s.name);
  let pass = 0;
  let fail = 0;

  console.log('C-Stack Health Check\n');

  for (const s of entries) {
    if (requiredOnly && !s.required) continue;

    let ok = false;
    if (s.type === 'tcp' && s.tcp) {
      const [host, port] = s.tcp.split(':');
      ok = await checkTcp(host, Number(port));
    } else if (s.type === 'http' && s.url) {
      ok = await checkHttp(s.url, s.expect || [200]);
    }

    const mark = ok ? '✅' : '❌';
    const req = s.required ? ' [P0 필수]' : '';
    console.log(`${mark} ${s.name}${req} ${s.url || s.tcp || ''}`);
    if (ok) pass++;
    else fail++;
  }

  console.log(`\n결과: ${pass} pass / ${fail} fail`);
  process.exit(fail > 0 ? 1 : 0);
}

main();
