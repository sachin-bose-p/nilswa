const fs = require('fs');
const path = require('path');

const learnDir = path.join(__dirname, 'app', 'learn');
const pages = fs.readdirSync(learnDir).filter(p => fs.statSync(path.join(learnDir, p)).isDirectory());

pages.forEach(page => {
  const filePath = path.join(learnDir, page, 'page.tsx');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Reduce top/bottom padding on the main outer Box: py: { xs: 8, md: 12 } -> py: { xs: 6, md: 8 }
    content = content.replace(/py: \{ xs: 8, md: 12 \}/g, 'py: { xs: 6, md: 8 }');
    
    // 2. Increase the Container width from "md" to "lg" to reduce side whitespace
    content = content.replace(/maxWidth="md"/g, 'maxWidth="lg"');
    
    // 3. Reduce the padding inside the Paper: p: { xs: 4, md: 8 } -> p: { xs: 4, md: 6 }
    content = content.replace(/p: \{ xs: 4, md: 8 \}/g, 'p: { xs: 4, md: 6 }');
    
    // 4. Reduce the margin below the title: mb: 4 -> mb: 2
    content = content.replace(/mb: 4/g, 'mb: 2');
    
    fs.writeFileSync(filePath, content);
    console.log('Updated:', filePath);
  }
});
