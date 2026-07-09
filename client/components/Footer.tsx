'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

// Icons
import XIcon from '@mui/icons-material/X'; // Using X icon for Twitter
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PodcastsIcon from '@mui/icons-material/Podcasts';

const footerLinks = [
  {
    title: 'Learn',
    links: [
      { name: 'What Is NILSWA?', href: '/learn/what-is-nilswa' },
      { name: 'How We Work', href: '/learn/how-we-work' },
      { name: 'AI-Driven Development', href: '/learn/ai-driven-development' },
      { name: 'AWS Infrastructure', href: '/learn/aws-infrastructure' },
      { name: 'NILSWA Cloud Security', href: '/learn/security' },
      { name: 'What\'s New', href: '/learn/whats-new' },
      { name: 'Blogs', href: '/learn/blogs' },
      { name: 'Press Releases', href: '/learn/press-releases' }
    ]
  }
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ backgroundColor: '#ffffff', color: '#475569', pt: 4, pb: 2, borderTop: '1px solid #e2e8f0' }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 6 } }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: { xs: 2, md: 4 }, mb: 3 }}>
          {footerLinks[0].links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              style={{ 
                color: '#475569', 
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#0ea5e9'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
            >
              {link.name}
            </Link>
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Button 
            onClick={scrollToTop}
            sx={{ 
              color: '#0f172a', 
              textTransform: 'none', 
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline',
                color: '#0ea5e9'
              }
            }}
          >
            Back to top &uarr;
          </Button>
        </Box>

        <Divider sx={{ borderColor: '#e2e8f0', mb: 2 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.85rem' }}>
            © 2026, NILSWA, Inc. or its affiliates. All rights reserved.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {[XIcon, FacebookIcon, LinkedInIcon, InstagramIcon, YouTubeIcon, PodcastsIcon].map((Icon, index) => (
              <IconButton 
                key={index} 
                size="small" 
                sx={{ 
                  color: '#64748b',
                  '&:hover': { color: '#0ea5e9', backgroundColor: '#f1f5f9' }
                }}
              >
                <Icon fontSize="small" />
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
