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
const hiringSourceTextPatterns = [
  /\b(?:careers?|job)[ -]?(?:site|page|posting|description|listing)\b/i,
  /\b(?:recruit(?:ing|ment)|requisition|hiring)\b/i,
  /\b(?:posts?|posted|lists?|listed|advertises?|advertised|seeks?|sought)\b[^.!?\n]{0,120}\b(?:jobs?|roles?|positions?|intern(?:ship)?s?)\b/i,
];

function isHiringSourceUrl(url) {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();
    const pathname = decodeURIComponent(parsed.pathname).toLowerCase();

    return /(^|\.)(?:jobs|careers)\./.test(hostname)
      || hostname.includes('workdayjobs.com')
      || (hostname === 'workforcenow.adp.com' && pathname.includes('/recruitment/'))
      || /\/(?:jobs?|careers?|recruitment|requisitions?)(?:\/|$)/.test(pathname);
  } catch {
    return false;
  }
}

function isHiringSignal(data) {
  if (data.kind !== 'organizational') return false;

  const sourceText = [
    data.headline,
    ...(data.sources ?? []).flatMap((source) => [source.title, source.summary]),
  ].filter(Boolean).join('\n');

  return hiringSourceTextPatterns.some((pattern) => pattern.test(sourceText))
    || (data.sources ?? []).some((source) => isHiringSourceUrl(source.url));
}

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
  for (const pattern of inferencePatterns) {
    if (pattern.test(data.fact)) errors.push(`${file}: fact contains inference-like wording matching ${pattern}.`);
  }
  if (isHiringSignal(data) && !/(posted|listed|role|job description|job posting|position|careers site)/i.test(data.fact)) {
    errors.push(`${file}: hiring facts should preserve source modality (for example, “posted a role…”).`);
  }
}

if (errors.length) {
  console.error(`Fact lint failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Fact lint passed for ${files.length} events.`);
