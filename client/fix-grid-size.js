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
    
    // Replace xs={X} md={Y}
    content = content.replace(/xs={([^}]+)} md={([^}]+)}/g, 'size={{ xs: $1, md: $2 }}');
    // Replace xs={X}
    content = content.replace(/xs={([^}]+)}/g, 'size={{ xs: $1 }}');
    
    fs.writeFileSync(filePath, content);
    console.log('Fixed Grid size in', file);
  }
});
