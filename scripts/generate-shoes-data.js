const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../src/assets/athena-shop-assets');
const outputFile = path.join(__dirname, '../src/app/data/shoes-data.ts');

function getBrandFromFileName(fileName) {
  if (fileName.startsWith('adidas')) return 'Adidas';
  if (fileName.startsWith('nike')) return 'Nike';
  if (fileName.startsWith('puma')) return 'Puma';
  if (fileName.startsWith('off---white')) return 'Off-White';
  return 'Unknown';
}

function formatModel(fileName) {
  return fileName
    .replace('adidas_', '')
    .replace('nike_', '')
    .replace('puma_', '')
    .replace('off---white_', '')
    .replace(/\.[^.]+$/, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

function getDefaultPrice(fileName) {
  if (fileName.includes('slides')) return 90;
  if (fileName.includes('off---white') || fileName.includes('dior')) return 450;
  if (fileName.includes('travis')) return 380;
  if (fileName.includes('yeezy_700') || fileName.includes('jordan_4')) return 260;
  if (fileName.includes('yeezy_350') || fileName.includes('dunk')) return 220;
  return 180;
}

function getDefaultRank(fileName) {
  if (fileName.includes('off---white') || fileName.includes('travis') || fileName.includes('dior')) {
    return 5;
  }

  if (fileName.includes('yeezy') || fileName.includes('jordan')) {
    return 4.8;
  }

  return 4.5;
}

function generateShoesData() {
  const files = fs
    .readdirSync(imagesDir)
    .filter(file => /\.(png|jpg|jpeg|webp|svg)$/i.test(file))
    .sort();

  const shoes = files.map((file, index) => {
    const fileNameWithoutExt = file.replace(/\.[^.]+$/, '');
    const brand = getBrandFromFileName(fileNameWithoutExt);
    const model = formatModel(file);

    return `  {
    id: ${index + 1},
    name: '${brand} ${model}',
    brand: '${brand}',
    model: '${model}',
    price: ${getDefaultPrice(fileNameWithoutExt)},
    rank: ${getDefaultRank(fileNameWithoutExt)},
    image: 'assets/athena-shop-assets/${file}'
  }`;
  });

  const fileContent = `import { BasicShoe } from '../models/basic-shoe.model';

export const SHOES_DATA: BasicShoe[] = [
${shoes.join(',\n')}
];
`;

  fs.writeFileSync(outputFile, fileContent, 'utf8');
  console.log(`Generated ${files.length} basic shoes into ${outputFile}`);}

generateShoesData();