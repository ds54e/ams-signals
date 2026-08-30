import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const analysisDir = path.join(root, 'src/content/analysis');
const eventDir = path.join(root, 'src/data/events');
const errors = [];

const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const location = path.join(directory, entry.name);
  return entry.isDirectory() ? walk(location) : [location];
});

const eventIds = new Set(
  fs.readdirSync(eventDir)
    .filter((name) => name.endsWith('.json'))
    .map((name) => JSON.parse(fs.readFileSync(path.join(eventDir, name), 'utf8')).id),
);

if (!fs.existsSync(analysisDir)) {
  errors.push('src/content/analysis does not exist.');
}

const articles = fs.existsSync(analysisDir)
  ? walk(analysisDir).filter((file) => file.endsWith('.md'))
  : [];

if (articles.length === 0) errors.push('No Markdown Analysis articles found.');

let referenceCount = 0;
const referencedEventIds = new Set();
const markdownDestination = /!?\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))/g;
const referenceDestination = /^\s*\[[^\]]+\]:\s*(?:<([^>]+)>|(\S+))/gm;

for (const file of articles) {
  const markdown = fs.readFileSync(file, 'utf8');
  const destinations = [];

  for (const pattern of [markdownDestination, referenceDestination]) {
    pattern.lastIndex = 0;
    for (const match of markdown.matchAll(pattern)) destinations.push(match[1] ?? match[2]);
  }

  let articleReferences = 0;
  for (const destination of destinations) {
    const route = destination.split(/[?#]/, 1)[0];
    if (!route.includes('/events/')) continue;

    articleReferences += 1;
    referenceCount += 1;
    const match = route.match(/(?:^|\/)events\/([^/]+)\/?$/);
    const relativeFile = path.relative(root, file);
    if (!match) {
      errors.push(`${relativeFile}: malformed Golden Event permalink ${destination}.`);
      continue;
    }

    const eventId = decodeURIComponent(match[1]);

    if (/^(?:[a-z][a-z\d+.-]*:|\/)/i.test(destination)) {
      errors.push(`${relativeFile}: Event reference must use a relative article-to-Event link (${destination}).`);
    }
    if (!route.endsWith('/')) {
      errors.push(`${relativeFile}: Event reference must use the canonical trailing-slash permalink (${destination}).`);
    }
    if (!eventIds.has(eventId)) {
      errors.push(`${relativeFile}: unknown Golden Event id ${eventId}.`);
    } else {
      referencedEventIds.add(eventId);
    }
  }

  if (articleReferences === 0) {
    errors.push(`${path.relative(root, file)}: Analysis article has no Golden Event references.`);
  }
}

if (errors.length > 0) {
  console.error(`Analysis link validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validated ${referenceCount} Analysis reference(s) to ${referencedEventIds.size} Golden Event(s) across ${articles.length} Markdown article(s).`);
