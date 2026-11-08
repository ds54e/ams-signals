import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const auditScript = fileURLToPath(new URL('../../tools/internal-link-check.mjs', import.meta.url));

async function fixture(t, siteBase = '/') {
  const projectRoot = await mkdtemp(path.join(tmpdir(), 'ams-signals-internal-links-test-'));
  t.after(() => rm(projectRoot, { recursive: true, force: true }));
  const write = async (file, body) => {
    const absolute = path.join(projectRoot, file);
    await mkdir(path.dirname(absolute), { recursive: true });
    await writeFile(absolute, body);
  };
  const read = (file) => readFile(path.join(projectRoot, file), 'utf8');
  const event = { id: 'event-one', companies: ['company-one'], people: ['person-one'] };
  for (const [collection, id] of [
    ['companies', 'company-one'], ['companies', 'empty-company'],
    ['people', 'person-one'], ['people', 'empty-person'],
  ]) {
    await write(`src/data/${collection}/${id}.json`, JSON.stringify({ id }));
  }
  await write('src/data/events/event-one.json', JSON.stringify(event));
  const href = (route) => `<a href="${siteBase}${route}">${route}</a>`;
  const inspector = `<script type="application/json" data-events-json>${JSON.stringify([
    { eventUrl: `${siteBase}events/event-one/` },
  ])}</script>`;
  await write('dist/timeline/index.html', href('companies/company-one/') + href('people/person-one/') + inspector);
  await write('dist/events/index.html', href('events/event-one/'));
  await write('dist/events/event-one/index.html', href('companies/company-one/') + href('people/person-one/'));
  for (const collection of ['companies', 'people']) {
    const active = collection === 'companies' ? 'company-one' : 'person-one';
    const empty = collection === 'companies' ? 'empty-company' : 'empty-person';
    await write(`dist/${collection}/${active}/index.html`, inspector);
    await write(`dist/${collection}/${empty}/index.html`, '<h1>No events are currently indexed</h1>');
  }
  const audit = () => {
    const result = spawnSync(process.execPath, [auditScript], {
      cwd: projectRoot,
      env: { ...process.env, SITE: 'https://example.com', BASE_URL: siteBase },
      encoding: 'utf8',
    });
    assert.ifError(result.error);
    return { status: result.status, output: result.stdout + result.stderr };
  };
  return { write, read, audit, event, href, inspector };
}

for (const siteBase of ['/', '/a+b/']) {
  test(`internal-link audit accepts empty Company and Person pages at ${siteBase}`, async (t) => {
    const f = await fixture(t, siteBase);
    const result = f.audit();
    assert.equal(result.status, 0, result.output);
  });
}

test('internal-link audit still requires active Person links on Timeline', async (t) => {
  const f = await fixture(t);
  await f.write('dist/timeline/index.html', (await f.read('dist/timeline/index.html')).replace(f.href('people/person-one/'), ''));
  const result = f.audit();
  assert.equal(result.status, 1);
  assert.match(result.output, /Timeline is missing \/people\/person-one\//);
});

test('internal-link audit still requires active Person inspector data', async (t) => {
  const f = await fixture(t);
  await f.write('dist/people/person-one/index.html', '<h1>Person one</h1>');
  const result = f.audit();
  assert.equal(result.status, 1);
  assert.match(result.output, /Person person-one is missing serialized Event inspector data/);
});

test('an empty Person becomes subject to link and inspector checks when evidence is added', async (t) => {
  const f = await fixture(t);
  await f.write('src/data/events/event-one.json', JSON.stringify({ ...f.event, people: [...f.event.people, 'empty-person'] }));
  await f.write('dist/events/event-one/index.html', (await f.read('dist/events/event-one/index.html')) + f.href('people/empty-person/'));
  const failed = f.audit();
  assert.equal(failed.status, 1);
  assert.match(failed.output, /Timeline is missing \/people\/empty-person\//);
  assert.match(failed.output, /Person empty-person is missing serialized Event inspector data/);
  await f.write('dist/timeline/index.html', (await f.read('dist/timeline/index.html')) + f.href('people/empty-person/'));
  await f.write('dist/people/empty-person/index.html', f.inspector);
  const repaired = f.audit();
  assert.equal(repaired.status, 0, repaired.output);
});
