const fs = require('fs');
const path = require('path');

const files = [
  'app/contact/page.tsx',
  'app/dashboard/page.tsx',
  'app/dashboard/product/[id]/page.tsx',
  'app/login/page.tsx',
  'app/portfolio/page.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace dark transparent backgrounds with white
    content = content.replace(/background: 'rgba\(30, 41, 59, 0\.[57]\)'/g, "backgroundColor: '#ffffff'");
    // Replace white transparent borders with grey borders
    content = content.replace(/border: '1px solid rgba\(255,255,255,0\.05\)'/g, "border: '1px solid #e2e8f0'");
    // Remove blur backdrop filters if any
    content = content.replace(/backdropFilter: 'blur\(10px\)',?/g, "");
    
    // In contact page, "color: 'primary.main'" was used for "Touch", change it to dark grey. Wait, in theme.ts, primary.main is now #4b5563 (grey), so it's already grey. But let's change it to #111827 just to be safe.
    content = content.replace(/color: 'primary.main'/g, "color: '#111827'");

    fs.writeFileSync(filePath, content);
    console.log('Fixed theme in', file);
  }
});
