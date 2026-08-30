import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJsonDir = (relative) => {
  const dir = path.join(root, relative);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((name) => name.endsWith('.json'))
    .map((name) => ({ name, data: JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8')) }));
};

const companies = readJsonDir('src/data/companies');
const people = readJsonDir('src/data/people');
const events = readJsonDir('src/data/events');
const companyIds = new Set(companies.map(({ data }) => data.id));
const peopleIds = new Set(people.map(({ data }) => data.id));
const errors = [];
const allowedKinds = new Set(['technical', 'organizational']);
const allowedPrecision = new Set(['year', 'month', 'day']);

for (const { name, data } of [...companies, ...people, ...events]) {
  const stem = name.replace(/\.json$/, '');
  if (data.id !== stem) errors.push(`${name}: id must match the filename (${stem}).`);
}

for (const { name, data } of events) {
  if (!allowedKinds.has(data.kind)) errors.push(`${name}: unsupported kind ${data.kind}.`);
  if (!allowedPrecision.has(data.when?.precision)) errors.push(`${name}: invalid date precision.`);
  if (!Array.isArray(data.sources) || data.sources.length < 1 || data.sources.length > 3) errors.push(`${name}: sources must contain 1-3 entries.`);
  for (const id of data.companies ?? []) if (!companyIds.has(id)) errors.push(`${name}: unknown company id ${id}.`);
  for (const id of data.people ?? []) if (!peopleIds.has(id)) errors.push(`${name}: unknown person id ${id}.`);
  if (data.affiliationChange) {
    const move = data.affiliationChange;
    if (!peopleIds.has(move.person)) errors.push(`${name}: unknown affiliationChange person ${move.person}.`);
    for (const company of [move.from, move.to].filter(Boolean)) if (!companyIds.has(company)) errors.push(`${name}: unknown affiliationChange company ${company}.`);
  }
  for (const source of data.sources ?? []) {
    try {
      const parsed = new URL(source.url);
      if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('protocol');
    } catch {
      errors.push(`${name}: invalid source URL ${source.url}.`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(source.checkedAt ?? '')) errors.push(`${name}: source checkedAt must be YYYY-MM-DD.`);
  }
}

if (errors.length) {
  console.error(`Validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validated ${events.length} events, ${companies.length} companies, and ${people.length} people.`);
