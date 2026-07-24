const fs = require('fs');
const https = require('https');
const path = require('path');

const sectors = [
  { name: 'steel-plants', prompt: 'Massive steel manufacturing plant, molten steel, blast furnace, industrial workers, heavy machinery, premium realistic DSLR photography, cinematic lighting, modern industrial' },
  { name: 'power-generation', prompt: 'Modern thermal power plant, turbines, boiler systems, steam pipes, industrial energy facility, premium realistic DSLR photography, cinematic lighting' },
  { name: 'mining', prompt: 'Open-pit mine, heavy excavators, conveyor systems, mineral processing equipment, premium realistic DSLR photography, cinematic lighting' },
  { name: 'oil-gas', prompt: 'Oil Refinery, pressure piping, industrial valves, storage tanks, petrochemical facility, premium realistic DSLR photography, cinematic lighting, modern industrial' },
  { name: 'chemical-process', prompt: 'Chemical processing plant, stainless steel pipelines, pressure vessels, automated process systems, premium realistic DSLR photography, cinematic lighting' },
  { name: 'cement-heavy-manufacturing', prompt: 'Cement manufacturing plant, rotary kilns, industrial production lines, heavy process equipment, premium realistic DSLR photography, cinematic lighting' },
  { name: 'construction-chemicals', prompt: 'Industrial construction site, Waterproofing application, concrete repair, chemical coatings, premium realistic DSLR photography, cinematic lighting' },
  { name: 'agriculture-equipment', prompt: 'Modern rotary tiller, Tractor attachments, Farm machinery, Agricultural field, premium realistic DSLR photography, cinematic lighting, sunset' }
];

const outputDir = path.join(__dirname, '..', 'public', 'images', 'sectors');

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filename);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
         downloadImage(response.headers.location, filename).then(resolve).catch(reject);
      } else {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function main() {
  for (const sector of sectors) {
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(sector.prompt)}?width=800&height=600&nologo=true&seed=${Math.floor(Math.random() * 1000)}`;
    const filename = path.join(outputDir, `${sector.name}.jpg`);
    console.log(`Downloading ${sector.name}.jpg...`);
    try {
      await downloadImage(url, filename);
      console.log(`Successfully downloaded ${sector.name}.jpg`);
    } catch (err) {
      console.error(`Error downloading ${sector.name}:`, err);
    }
  }
}

main();
