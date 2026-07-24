const fs = require('fs');

const content = fs.readFileSync('src/data/catalogProducts.ts', 'utf8');

const ids = [];
const lines = content.split('\n');
for (const line of lines) {
  if (line.includes('"id"')) {
    const match = line.match(/"id"\s*:\s*"([^"]+)"/);
    if (match) ids.push(match[1]);
  } else if (line.includes('id:')) {
    const match = line.match(/id\s*:\s*"([^"]+)"/);
    if (match) ids.push(match[1]);
  }
}

console.log(JSON.stringify(ids, null, 2));
