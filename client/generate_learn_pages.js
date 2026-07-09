const fs = require('fs');
const path = require('path');

const pages = [
  {
    route: 'what-is-nilswa',
    title: 'What Is NILSWA?',
    content: [
      "Instead of massive upfront costs, our flexible subscription lets you start small. Subscribe with just 1 or 2 users to fully experience and test our enterprise product.",
      "As you see the value, seamlessly scale up your user count. Eliminate large one-time payments and guarantee you are getting maximum return on your investment.",
      "We are changing the way products are currently sold. Instead of heavy upfront payments, customers can use our product monthly and pay exactly for what they use."
    ]
  },
  {
    route: 'how-we-work',
    title: 'How We Work',
    content: [
      "At NILSWA, our process is designed for maximum efficiency and transparency. We believe in providing value immediately, allowing you to test and validate our solutions in your own environment.",
      "Our infrastructure effortlessly scales with your demands, ensuring that you always have the resources you need, exactly when you need them."
    ]
  },
  {
    route: 'ai-driven-development',
    title: 'AI-Driven Development',
    content: [
      "Instead of normal and traditional development, we are using the full capacity of market AI models for our development.",
      "This is why we can come up with solutions that require no upfront price, since our manpower cost is significantly reduced.",
      "Furthermore, this ensures that future adaptation is much easier. Our product will organically evolve alongside new age technology."
    ]
  },
  {
    route: 'aws-infrastructure',
    title: 'AWS Infrastructure',
    content: [
      "We rely on Amazon Web Services (AWS) for our core product hosting and infrastructure needs.",
      "By leveraging AWS, we ensure high availability, unmatched scalability, and global reach for our enterprise clients."
    ]
  },
  {
    route: 'security',
    title: 'NILSWA Cloud Security',
    content: [
      "Security is our top priority. Because we utilize AWS services, our platform benefits from enterprise-grade, end-to-end protection.",
      "Additionally, we employ the latest AI models to continuously validate our product, proactively identifying and resolving any potential issues before they impact your operations."
    ]
  },
  {
    route: 'whats-new',
    title: "What's New",
    content: [
      "Discover the latest features, enhancements, and operational updates from the NILSWA team.",
      "We are constantly iterating on our core products to bring you better performance and more powerful AI integrations."
    ]
  },
  {
    route: 'blogs',
    title: 'Blogs',
    content: [
      "Welcome to the NILSWA technical blog. Here we share deep dives into cloud architecture, AI development methodologies, and enterprise software strategies.",
      "Sample Blog: 'The Future of No-Upfront Enterprise Software'"
    ]
  },
  {
    route: 'press-releases',
    title: 'Press Releases',
    content: [
      "Official announcements regarding the latest product releases, major upgrades, and company milestones.",
      "Sample Release: 'NILSWA announces new AI-driven security validation protocol.'"
    ]
  }
];

const template = (title, contentLines) => `
'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

export default function Page() {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f8f9fa', minHeight: '100vh', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Paper 
          elevation={0}
          sx={{
            p: { xs: 4, md: 8 },
            borderRadius: '24px',
            backgroundColor: '#ffffff',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0'
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: 800, color: '#111827', mb: 4 }}>
            ${title}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            ${contentLines.map(line => `
            <Typography variant="body1" sx={{ color: '#4b5563', fontSize: '1.1rem', lineHeight: 1.7 }}>
              ${line}
            </Typography>`).join('')}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
`;

pages.forEach(page => {
  const dirPath = path.join(__dirname, 'app', 'learn', page.route);
  fs.mkdirSync(dirPath, { recursive: true });
  
  const filePath = path.join(dirPath, 'page.tsx');
  fs.writeFileSync(filePath, template(page.title, page.content));
  console.log('Created:', filePath);
});
