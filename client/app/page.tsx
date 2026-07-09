'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import { Container } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f2f6ff', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          pt: { xs: 4, md: 8 },
          pb: { xs: 8, md: 12 },
          display: 'flex', 
          alignItems: 'center', 
          background: '#f8f9fa', // Light grey background instead of gradient
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 6 } }}>
          <Grid container spacing={4} sx={{ alignItems: 'center' }}>
            
            {/* Left Content Card */}
            <Grid size={{ xs: 12, md: 6, lg: 5 }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: { xs: 4, md: 6 }, 
                  borderRadius: '16px', 
                  backgroundColor: '#ffffff',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                  border: '1px solid #e2e8f0'
                }}
              >
                <Typography variant="h2" sx={{ fontWeight: 800, color: '#111827', lineHeight: 1.1, fontSize: { xs: '2.5rem', md: '3.2rem' } }}>
                  Work with trusted Partners to find the right solutions
                </Typography>
                
                <Typography variant="h6" sx={{ color: '#4b5563', lineHeight: 1.6, fontWeight: 400 }}>
                  Benefit from specialized Partner expertise and solutions to get better business outcomes with greater speed and confidence
                </Typography>
                
                <Box>
                  <Button 
                    variant="contained" 
                    size="large" 
                    component={Link} 
                    href="/portfolio" 
                    sx={{ 
                      px: 4, 
                      py: 2, 
                      fontSize: '1rem', 
                      borderRadius: '24px',
                      backgroundColor: '#1f2937', // Dark grey button
                      color: '#ffffff',
                      textTransform: 'none',
                      fontWeight: 700,
                      '&:hover': {
                        backgroundColor: '#111827' // Darker grey on hover
                      }
                    }}
                  >
                    Start free with NILSWA
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Right Side Illustration */}
            <Grid size={{ xs: 12, md: 6, lg: 7 }} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              <Box 
                sx={{ 
                  width: '100%',
                  maxWidth: '700px',
                  aspectRatio: '1/1',
                  background: 'url("data:image/svg+xml,%3Csvg width=\'600\' height=\'600\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'300\' cy=\'300\' r=\'250\' fill=\'%23e5e7eb\' opacity=\'0.8\'/%3E%3Cpath d=\'M300 50 Q 400 150 500 300 T 300 550 T 100 300 T 300 50\' fill=\'none\' stroke=\'%239ca3af\' stroke-width=\'4\'/%3E%3Ccircle cx=\'200\' cy=\'200\' r=\'15\' fill=\'%236b7280\'/%3E%3Ccircle cx=\'400\' cy=\'400\' r=\'20\' fill=\'%236b7280\'/%3E%3Ccircle cx=\'450\' cy=\'200\' r=\'12\' fill=\'%236b7280\'/%3E%3Ccircle cx=\'150\' cy=\'450\' r=\'18\' fill=\'%236b7280\'/%3E%3C/svg%3E") no-repeat center center',
                  backgroundSize: 'contain',
                  position: 'relative'
                }}
              >
                {/* Decorative floating elements in greyscale */}
                <Box sx={{ position: 'absolute', bottom: '10%', right: '5%', width: '150px', height: '150px', backgroundColor: '#d1d5db', borderRadius: '50%', opacity: 0.8 }} />
                <Box sx={{ position: 'absolute', bottom: '-5%', right: '0', width: '200px', height: '120px', backgroundColor: '#9ca3af', borderTopLeftRadius: '100px', borderTopRightRadius: '100px' }} />
              </Box>
            </Grid>

          </Grid>
        </Container>
      </Box>
      {/* Subscription Business Model Section */}
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 }, 
          px: { xs: 2, md: 6 },
          backgroundColor: '#ffffff',
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          <Paper 
            elevation={0}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              backgroundColor: '#f8f9fa',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              animation: 'fadeInUp 1s ease-out forwards',
              '@keyframes fadeInUp': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(40px)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateY(0)',
                }
              }
            }}
          >
            {/* Image side */}
            <Box sx={{ width: { xs: '100%', md: '50%' }, p: 4, display: 'flex', justifyContent: 'center' }}>
              <Box 
                component="img"
                src="/images/subscription-model.jpg"
                alt="Flexible Subscription Model"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              />
            </Box>

            {/* Content side */}
            <Box sx={{ width: { xs: '100%', md: '50%' }, p: { xs: 4, md: 6, lg: 8 } }}>
              <Typography variant="overline" sx={{ color: '#4b5563', fontWeight: 700, letterSpacing: 1.5, mb: 2, display: 'block' }}>
                PAY-PER-USER MODEL
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#111827', mb: 3, lineHeight: 1.2 }}>
                Scale Smarter. Pay Only For What You Use.
              </Typography>
              <Typography variant="body1" sx={{ color: '#4b5563', mb: 2, fontSize: '1.1rem', lineHeight: 1.7 }}>
                Instead of massive upfront costs, our flexible subscription lets you start small. Subscribe with just 1 or 2 users to fully experience and test our enterprise product.
              </Typography>
              <Typography variant="body1" sx={{ color: '#4b5563', mb: 4, fontSize: '1.1rem', lineHeight: 1.7 }}>
                As you see the value, seamlessly scale up your user count. Eliminate large one-time payments and guarantee you are getting maximum return on your investment.
              </Typography>
              
              <Button 
                variant="outlined" 
                size="large" 
                component={Link}
                href="/pricing"
                sx={{ 
                  borderRadius: '24px', 
                  borderWidth: '2px',
                  borderColor: '#111827',
                  color: '#111827',
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  '&:hover': {
                    borderWidth: '2px',
                    borderColor: '#000000',
                    backgroundColor: 'rgba(0,0,0,0.04)'
                  }
                }}
              >
                View Pricing Plans
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>

    </Box>
  );
}
