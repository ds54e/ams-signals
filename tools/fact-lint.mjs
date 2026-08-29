import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'src/data/events');
const files = fs.readdirSync(dir).filter((name) => name.endsWith('.json'));
const errors = [];
const inferencePatterns = [
  /\blikely\b/i,
  /\bprobably\b/i,
  /\bappears to\b/i,
  /\bseems to\b/i,
  /\bsuggests that\b/i,
  /\bmay indicate\b/i,
  /\bwe (?:believe|think)\b/i,
  /\bis (?:mature|advanced|leading)\b/i,
];

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
  for (const pattern of inferencePatterns) {
    if (pattern.test(data.fact)) errors.push(`${file}: fact contains inference-like wording matching ${pattern}.`);
  }
  if (data.kind === 'hiring' && !/(posted|listed|role|job description|job posting|position)/i.test(data.fact)) {
    errors.push(`${file}: hiring facts should preserve source modality (for example, “posted a role…”).`);
  }
}

if (errors.length) {
  console.error(`Fact lint failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Fact lint passed for ${files.length} events.`);
