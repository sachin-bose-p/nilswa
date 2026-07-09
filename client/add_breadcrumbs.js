const fs = require('fs');
const path = require('path');

const learnDir = path.join(__dirname, 'app', 'learn');
const pages = fs.readdirSync(learnDir).filter(p => fs.statSync(path.join(learnDir, p)).isDirectory());

pages.forEach(page => {
  const filePath = path.join(learnDir, page, 'page.tsx');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Only add if not already added
    if (content.includes('Breadcrumbs')) {
      return;
    }

    // Add imports
    content = content.replace(
      "import Paper from '@mui/material/Paper';", 
      "import Paper from '@mui/material/Paper';\nimport Breadcrumbs from '@mui/material/Breadcrumbs';\nimport Link from 'next/link';"
    );

    // Extract the title
    const titleMatch = content.match(/<Typography variant="h2"[^>]*>\s*([\s\S]*?)\s*<\/Typography>/);
    let title = "Learn";
    if (titleMatch && titleMatch[1]) {
      title = titleMatch[1].trim();
    }

    // Prepare breadcrumbs JSX
    const breadcrumbsJSX = `
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.95rem' }}>
            Home
          </Link>
          <Typography sx={{ color: '#64748b', fontSize: '0.95rem' }}>
            Learn
          </Typography>
          <Typography sx={{ color: '#0ea5e9', fontSize: '0.95rem', fontWeight: 600 }}>
            ${title}
          </Typography>
        </Breadcrumbs>
        <Paper`;

    // Insert Breadcrumbs before Paper
    content = content.replace('<Paper', breadcrumbsJSX);

    fs.writeFileSync(filePath, content);
    console.log('Added breadcrumbs to:', filePath);
  }
});
