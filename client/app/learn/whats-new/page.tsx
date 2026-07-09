
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
            What's New
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
            What's New
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            
            <Typography variant="body1" sx={{ color: '#4b5563', fontSize: '1.1rem', lineHeight: 1.7 }}>
              Discover the latest features, enhancements, and operational updates from the NILSWA team.
            </Typography>
            <Typography variant="body1" sx={{ color: '#4b5563', fontSize: '1.1rem', lineHeight: 1.7 }}>
              We are constantly iterating on our core products to bring you better performance and more powerful AI integrations.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
