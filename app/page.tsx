'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import Link from 'next/link';
import { Container } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          minHeight: '80vh', 
          display: 'flex', 
          alignItems: 'center', 
          background: 'radial-gradient(circle at top right, #1e1b4b, #0f172a 70%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box 
          sx={{ 
            position: 'absolute', 
            top: '-20%', right: '-10%', width: '50%', height: '50%', 
            background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
            filter: 'blur(100px)',
            zIndex: 0 
          }} 
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="h1" gutterBottom sx={{ fontWeight: 800, background: '-webkit-linear-gradient(45deg, #818cf8 30%, #ec4899 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Next-Gen Enterprise Solutions
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: '600px', lineHeight: 1.6 }}>
                Empower your business with powerful relationship management, compliance software, and cutting-edge AI platforms.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" size="large" component={Link} href="/portfolio" sx={{ px: 4, py: 1.5, fontSize: '1.1rem', borderRadius: 2 }}>
                  Explore Portfolio
                </Button>
                <Button variant="outlined" size="large" component={Link} href="/contact" sx={{ px: 4, py: 1.5, fontSize: '1.1rem', borderRadius: 2 }}>
                  Contact Us
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>


    </Box>
  );
}
