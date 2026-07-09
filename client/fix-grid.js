const fs = require('fs');
const path = require('path');

const files = [
  'app/contact/page.tsx',
  'app/dashboard/page.tsx',
  'app/dashboard/product/[id]/page.tsx',
  'app/page.tsx',
  'app/portfolio/page.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/<Grid item /g, '<Grid ');
    fs.writeFileSync(filePath, content);
    console.log('Fixed Grid item in', file);
  }
});
