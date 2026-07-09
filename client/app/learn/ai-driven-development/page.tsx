
'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';

export default function Page() {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f8f9fa', minHeight: '100vh', py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.95rem' }}>
            Home
          </Link>
          <Typography sx={{ color: '#64748b', fontSize: '0.95rem' }}>
            Learn
          </Typography>
          <Typography sx={{ color: '#0ea5e9', fontSize: '0.95rem', fontWeight: 600 }}>
            AI-Driven Development
          </Typography>
        </Breadcrumbs>
        <Paper 
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: '24px',
            backgroundColor: '#ffffff',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0'
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: 800, color: '#111827', mb: 2 }}>
            AI-Driven Development
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            
            <Typography variant="body1" sx={{ color: '#4b5563', fontSize: '1.1rem', lineHeight: 1.7 }}>
              Instead of normal and traditional development, we are using the full capacity of market AI models for our development.
            </Typography>
            <Typography variant="body1" sx={{ color: '#4b5563', fontSize: '1.1rem', lineHeight: 1.7 }}>
              This is why we can come up with solutions that require no upfront price, since our manpower cost is significantly reduced.
            </Typography>
            <Typography variant="body1" sx={{ color: '#4b5563', fontSize: '1.1rem', lineHeight: 1.7 }}>
              Furthermore, this ensures that future adaptation is much easier. Our product will organically evolve alongside new age technology.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
