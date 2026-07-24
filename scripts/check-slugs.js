const fs = require('fs');

const content = fs.readFileSync('src/data/catalogProducts.ts', 'utf8');

const slugs = [];
const lines = content.split('\n');
for (const line of lines) {
  if (line.includes('"slug"')) {
    const match = line.match(/"slug"\s*:\s*"([^"]+)"/);
    if (match) slugs.push(match[1]);
  }
}

const badSlugs = slugs.filter(s => s.includes(' ') || s.includes('/') || s.includes('%') || encodeURIComponent(s) !== s);

console.log("Total Slugs:", slugs.length);
console.log("Bad Slugs:", badSlugs);
