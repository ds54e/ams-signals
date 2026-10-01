import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'src/data/events');
const entries = fs.readdirSync(dir)
  .filter((name) => name.endsWith('.json'))
  .map((name) => ({ name, data: JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8')) }));

const tokens = (text) => new Set(text.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter((token) => token.length > 2));
const similarity = (a, b) => {
  const left = tokens(a);
  const right = tokens(b);
  const intersection = [...left].filter((token) => right.has(token)).length;
  const union = new Set([...left, ...right]).size;
  return union ? intersection / union : 0;
};
const dateValue = (value) => Date.parse(`${value.length === 4 ? `${value}-01-01` : value.length === 7 ? `${value}-01` : value}T00:00:00Z`);
const warnings = [];

for (let i = 0; i < entries.length; i += 1) {
  for (let j = i + 1; j < entries.length; j += 1) {
    const a = entries[i];
    const b = entries[j];
    if (a.data.kind !== b.data.kind) continue;
    if (!a.data.companies.some((company) => b.data.companies.includes(company))) continue;
    const days = Math.abs(dateValue(a.data.when.start) - dateValue(b.data.when.start)) / 86400000;
    if (days > 365) continue;
    const score = similarity(`${a.data.headline} ${a.data.fact}`, `${b.data.headline} ${b.data.fact}`);
    if (score >= 0.62) warnings.push(`${a.name} ↔ ${b.name}: similarity ${score.toFixed(2)}; consider clustering or merging sources.`);
  }
}

if (warnings.length) {
  console.warn('Potential duplicate events:');
  for (const warning of warnings) console.warn(`- ${warning}`);
} else {
  console.log('No likely duplicate event pairs detected.');
}
