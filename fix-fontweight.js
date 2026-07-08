const fs = require('fs');
const path = require('path');

const files = [
  'app/contact/page.tsx',
  'app/dashboard/layout.tsx',
  'app/dashboard/page.tsx',
  'app/dashboard/product/[id]/page.tsx',
  'app/docs/page.tsx',
  'app/login/page.tsx',
  'app/portfolio/page.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace fontWeight="bold" sx={{ ... }}
    content = content.replace(/fontWeight="bold" sx={{([^}]+)}}/g, 'sx={{ fontWeight: "bold",$1 }}');
    
    // Replace fontWeight="bold" alone
    content = content.replace(/fontWeight="bold"/g, 'sx={{ fontWeight: "bold" }}');
    
    fs.writeFileSync(filePath, content);
    console.log('Fixed', file);
  }
});
