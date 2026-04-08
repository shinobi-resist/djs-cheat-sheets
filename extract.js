const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

const CHEAT_SHEETS_DIR = path.join(__dirname, '..', 'cheat sheets');

const DEPT_MAP = {
  'A-Emery': 'Designer', 'Aeyde': 'Designer', 'Aquazzura': 'Designer',
  'Bally': 'Designer', 'Carel': 'Designer', 'Chloe': 'Designer',
  'Jimmy Choo': 'Designer', 'Le Monde Beryl': 'Designer',
  'Manolo Blahnik': 'Designer', 'Pedro Garcia': 'Designer',
  'Stuart Weitzman': 'Designer',
  'AJE': 'Contemporary', 'Alohas': 'Contemporary',
  'Marc Joseph NY': 'Contemporary', 'Nelson Made': 'Contemporary',
  'Sperry': 'Contemporary', 'Michael Kors (Contemporary)': 'Contemporary',
  'Alias Mae': 'Fashion 5238', 'Birkenstock': 'Fashion 5238',
  'Charles & Keith': 'Fashion 5238', 'Converse': 'Fashion 5238',
  'Crocs Australia': 'Fashion 5238', 'Guess': 'Fashion 5238',
  'Lacoste': 'Fashion 5238', 'Lana Wilkinson': 'Fashion 5238',
  'New Balance': 'Fashion 5238', 'On Running': 'Fashion 5238',
  'Puma': 'Fashion 5238', 'Reebok': 'Fashion 5238',
  'Siren': 'Fashion 5238', 'Steve Madden': 'Fashion 5238',
  'Superga': 'Fashion 5238', 'Tommy Hilfiger': 'Fashion 5238',
  'Tony Bianco': 'Fashion 5238', 'Veja': 'Fashion 5238',
  'DF Supersoft': 'Modern 5288', 'Diana Ferrari': 'Modern 5288',
  'Ecco': 'Modern 5288', 'EMU Australia': 'Modern 5288',
  'Gino Ventori': 'Modern 5288', 'Grosby': 'Modern 5288',
  'Hogl': 'Modern 5288', 'Holster': 'Modern 5288',
  'Hush Puppies': 'Modern 5288', 'Naturalizer': 'Modern 5288',
  'Skechers': 'Modern 5288', 'UGG': 'Modern 5288',
  'Aldo': 'Concessions', 'Carvela': 'Concessions',
  'Christian Louboutin': 'Concessions', 'Kurt Geiger': 'Concessions',
  'Michael Kors (Concessions)': 'Concessions',
};

const FILE_TO_NAME = {
  'A-Emery_Cheat_Sheet.docx': 'A-Emery',
  'Aeyde_Cheat_Sheet.docx': 'Aeyde',
  'AJE_Cheat_Sheet.docx': 'AJE',
  'Aldo_Cheat_Sheet.docx': 'Aldo',
  'Alias_Mae_Cheat_Sheet.docx': 'Alias Mae',
  'Alohas_Cheat_Sheet.docx': 'Alohas',
  'Aquazzura_Cheat_Sheet.docx': 'Aquazzura',
  'Bally_Cheat_Sheet.docx': 'Bally',
  'Birkenstock_Cheat_Sheet.docx': 'Birkenstock',
  'Carel_Cheat_Sheet.docx': 'Carel',
  'Carvela_Cheat_Sheet.docx': 'Carvela',
  'Charles_Keith_Cheat_Sheet.docx': 'Charles & Keith',
  'Chloe_Cheat_Sheet.docx': 'Chloe',
  'Christian_Louboutin_Cheat_Sheet.docx': 'Christian Louboutin',
  'Converse_Cheat_Sheet.docx': 'Converse',
  'Crocs_Australia_Cheat_Sheet.docx': 'Crocs Australia',
  'DF_Supersoft_Cheat_Sheet.docx': 'DF Supersoft',
  'Diana_Ferrari_Cheat_Sheet.docx': 'Diana Ferrari',
  'Ecco_Cheat_Sheet.docx': 'Ecco',
  'EMU_Australia_Cheat_Sheet.docx': 'EMU Australia',
  'Gino_Ventori_Cheat_Sheet.docx': 'Gino Ventori',
  'Grosby_Cheat_Sheet.docx': 'Grosby',
  'Guess_Cheat_Sheet.docx': 'Guess',
  'Hogl_Cheat_Sheet.docx': 'Hogl',
  'Holster_Cheat_Sheet.docx': 'Holster',
  'Hush_Puppies_Cheat_Sheet.docx': 'Hush Puppies',
  'Jimmy_Choo_Cheat_Sheet.docx': 'Jimmy Choo',
  'Kurt_Geiger_Cheat_Sheet.docx': 'Kurt Geiger',
  'Lacoste_Cheat_Sheet.docx': 'Lacoste',
  'Lana_Wilkinson_Cheat_Sheet.docx': 'Lana Wilkinson',
  'Le_Monde_Beryl_Cheat_Sheet.docx': 'Le Monde Beryl',
  'Manolo_Blahnik_Cheat_Sheet.docx': 'Manolo Blahnik',
  'Marc_Joseph_NY_Cheat_Sheet.docx': 'Marc Joseph NY',
  'Michael_Kors_Concessions.docx': 'Michael Kors (Concessions)',
  'Michael_Kors_Womens_Contemporary.docx': 'Michael Kors (Contemporary)',
  'Naturalizer_Cheat_Sheet.docx': 'Naturalizer',
  'Nelson_Made_Cheat_Sheet.docx': 'Nelson Made',
  'New_Balance_Cheat_Sheet.docx': 'New Balance',
  'On_Running_Cheat_Sheet.docx': 'On Running',
  'Pedro_Garcia_Cheat_Sheet.docx': 'Pedro Garcia',
  'Puma_Cheat_Sheet.docx': 'Puma',
  'Reebok_Cheat_Sheet.docx': 'Reebok',
  'Siren_Cheat_Sheet.docx': 'Siren',
  'Skechers_Cheat_Sheet.docx': 'Skechers',
  'Sperry_Cheat_Sheet.docx': 'Sperry',
  'Steve_Madden_Cheat_Sheet.docx': 'Steve Madden',
  'Stuart_Weitzman_Cheat_Sheet.docx': 'Stuart Weitzman',
  'Superga_Cheat_Sheet.docx': 'Superga',
  'Tommy_Hilfiger_Cheat_Sheet.docx': 'Tommy Hilfiger',
  'Tony_Bianco_Cheat_Sheet.docx': 'Tony Bianco',
  'UGG_Cheat_Sheet.docx': 'UGG',
  'Veja_Cheat_Sheet.docx': 'Veja',
};

// Section headers as they appear in the DOCX text
const SECTION_HEADERS = [
  { num: 1, label: 'Brand History & Origins' },
  { num: 2, label: 'Brand Culture & Identity' },
  { num: 3, label: 'Price & Target Market' },
  { num: 4, label: 'Size Range' },
  { num: 5, label: 'Key Features' },
  { num: 6, label: 'Key Benefits' },
  { num: 7, label: 'Why Is the Brand Popular' },
  { num: 8, label: 'Selling Points' },
];

function getSectionText(text, sectionNum) {
  const section = SECTION_HEADERS.find(s => s.num === sectionNum);
  if (!section) return '';

  // Match "  N  Section Header" pattern (with possible variations)
  const pattern = new RegExp(
    `\\b${sectionNum}\\s+${section.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^\n]*`,
    'i'
  );
  const match = text.match(pattern);
  if (!match) return '';

  const startIdx = match.index + match[0].length;

  // Find the next section
  let endIdx = text.length;
  for (const next of SECTION_HEADERS) {
    if (next.num === sectionNum) continue;
    const nextPattern = new RegExp(
      `\\b${next.num}\\s+${next.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
      'i'
    );
    const nextMatch = text.substring(startIdx).match(nextPattern);
    if (nextMatch && (startIdx + nextMatch.index) < endIdx) {
      endIdx = startIdx + nextMatch.index;
    }
  }

  return text.substring(startIdx, endIdx).trim();
}

function extractKV(text, key) {
  const pattern = new RegExp(`${key}:\\s*(.+?)(?:\\n|$)`, 'i');
  const match = text.match(pattern);
  return match ? match[1].trim() : '';
}

function parseHistory(text) {
  return {
    founded: extractKV(text, 'Founded'),
    origin: extractKV(text, 'Origin'),
    manufactured: extractKV(text, 'Manufactured In'),
  };
}

function parsePriceTarget(text) {
  const price = extractKV(text, 'Price Point');
  const tmMatch = text.match(/Target Market:\s*\n?([\s\S]*)/i);
  const targetMarket = tmMatch ? tmMatch[1].trim().replace(/\n\n+/g, '\n') : '';
  return { price, targetMarket };
}

function parseSizeRange(text) {
  return {
    au: extractKV(text, 'Australian Sizes'),
    eu: extractKV(text, 'European Sizes'),
  };
}

function parseListItems(text) {
  // Split by double newlines to get items (mammoth separates paragraphs with \n\n)
  const items = text.split(/\n\n+/)
    .map(s => s.trim())
    .filter(s => s.length > 5);
  return items;
}

function parseCulture(text) {
  // Return as array of paragraphs
  return text.split(/\n\n+/)
    .map(s => s.trim())
    .filter(s => s.length > 5);
}

function parseSellingPoints(text) {
  // Selling points may start with "1  " or just be paragraphs
  const items = text.split(/\n\n+/)
    .map(s => s.replace(/^\d+\s+/, '').replace(/^"|"$/g, '').trim())
    .filter(s => s.length > 10);
  return items;
}

function extractTagline(text) {
  // Second line typically has "Type | Tagline | Location"
  const lines = text.split('\n').filter(l => l.trim());
  if (lines.length >= 2) {
    const secondLine = lines[1].trim();
    if (secondLine.includes('|')) {
      return secondLine;
    }
  }
  return '';
}

async function processDOCX(filePath, brandName) {
  const result = await mammoth.extractRawText({ path: filePath });
  const text = result.value;

  const tagline = extractTagline(text);

  const historyText = getSectionText(text, 1);
  const cultureText = getSectionText(text, 2);
  const priceText = getSectionText(text, 3);
  const sizeText = getSectionText(text, 4);
  const featuresText = getSectionText(text, 5);
  const benefitsText = getSectionText(text, 6);
  const popularText = getSectionText(text, 7);
  const sellingText = getSectionText(text, 8);

  const history = parseHistory(historyText);
  const { price, targetMarket } = parsePriceTarget(priceText);
  const sizeRange = parseSizeRange(sizeText);
  const features = parseListItems(featuresText);
  const benefits = parseListItems(benefitsText);
  const culture = parseCulture(cultureText);
  const whyPopular = popularText.replace(/\n\n+/g, '\n').trim();
  const sellingPoints = parseSellingPoints(sellingText);

  const id = brandName.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return {
    id,
    name: brandName,
    department: DEPT_MAP[brandName] || 'Unknown',
    tagline,
    history,
    culture,
    price,
    targetMarket,
    sizeRange,
    features,
    benefits,
    whyPopular,
    sellingPoints,
  };
}

async function main() {
  const results = [];
  const errors = [];

  for (const [file, brandName] of Object.entries(FILE_TO_NAME)) {
    const filePath = path.join(CHEAT_SHEETS_DIR, file);
    try {
      if (!fs.existsSync(filePath)) {
        errors.push(`File not found: ${file}`);
        continue;
      }
      const brand = await processDOCX(filePath, brandName);
      results.push(brand);

      // Quick validation
      const issues = [];
      if (!brand.history.founded) issues.push('no founded');
      if (brand.features.length === 0) issues.push('no features');
      if (brand.benefits.length === 0) issues.push('no benefits');
      if (brand.sellingPoints.length === 0) issues.push('no selling points');

      const status = issues.length ? `⚠ ${issues.join(', ')}` : '✓';
      console.log(`${status} ${brandName}`);
    } catch (err) {
      errors.push(`Error: ${file}: ${err.message}`);
      console.error(`✗ ${brandName}: ${err.message}`);
    }
  }

  results.sort((a, b) => a.name.localeCompare(b.name));

  const output = `// Auto-generated from cheat sheet DOCX files — ${new Date().toISOString().split('T')[0]}
// ${results.length} brands extracted

export const BRANDS = ${JSON.stringify(results, null, 2)};
`;

  fs.writeFileSync(path.join(__dirname, 'brands.js'), output, 'utf-8');
  console.log(`\n✅ ${results.length} brands extracted to brands.js`);

  if (errors.length) {
    console.log(`\n❌ Errors (${errors.length}):`);
    errors.forEach(e => console.log(`  - ${e}`));
  }
}

main().catch(console.error);
