'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function Portfolio() {
  const products = [
    { 
      id: 'cats-crm',
      title: 'Airline Crew', 
      desc: 'The ultimate CRM module tailored for comprehensive business relationship management.', 
      features: ['Lead Tracking', 'Sales Pipeline', 'Analytics Dashboard'],
      icon: '📈' 
    },
    { 
      id: 'alcohol-check',
      title: 'Alcohol Check System', 
      desc: 'Reliable and compliant crew alcohol testing software ensuring safety at all times.', 
      features: ['Automated Reporting', 'Compliance Tracking', 'Mobile Ready'],
      icon: '🛡️' 
    },
    { 
      id: 'real-estate-crm',
      title: 'Real Estate CRM', 
      desc: 'Real Estate completed CRM dashboard plus Customer front portal.', 
      features: ['Dashboard Analytics', 'Agent Portal', 'Customer Portal', 'Property Management'],
      icon: '🏢' 
    }
  ];

  return (
    <Box sx={{ py: 10, flexGrow: 1 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
          Our Product <Box component="span" sx={{ color: '#111827' }}>Portfolio</Box>
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 8, maxWidth: '700px', mx: 'auto' }}>
          Explore our suite of premium SaaS offerings designed to scale your enterprise efficiently.
        </Typography>

        <Grid container spacing={4}>
          {products.map((prod) => (
            <Grid size={{ xs: 12, md: 4 }} key={prod.id}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                p: 3,
                backgroundColor: '#ffffff',
                
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  borderColor: 'secondary.main',
                  boxShadow: '0 10px 30px rgba(236,72,153,0.2)'
                }
              }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h2" sx={{ mb: 2 }}>{prod.icon}</Typography>
                  <Typography gutterBottom variant="h4" component="h2" sx={{ fontWeight: "bold" }}>
                    {prod.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {prod.desc}
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, color: 'text.secondary', mb: 3 }}>
                    {prod.features.map(f => (
                      <Typography component="li" key={f} sx={{ mb: 1 }}>{f}</Typography>
                    ))}
                  </Box>
                </CardContent>
                <Button variant="contained" fullWidth component={Link} href={`/login`} sx={{ py: 1.5 }}>
                  Subscribe to {prod.title}
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
