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
      title: 'CATS CRM', 
      desc: 'The ultimate CRM module tailored for comprehensive business relationship management.', 
      features: ['Lead Tracking', 'Sales Pipeline', 'Analytics Dashboard'],
      icon: '📈' 
    },
    { 
      id: 'bless-check',
      title: 'BLESS Crew Alcohol Check', 
      desc: 'Reliable and compliant crew alcohol testing software ensuring safety at all times.', 
      features: ['Automated Reporting', 'Compliance Tracking', 'Mobile Ready'],
      icon: '🛡️' 
    },
    { 
      id: 'ai-llm',
      title: 'AI & LLM Services', 
      desc: 'Like AWS Bedrock, access our top-tier foundational models integrated via API.', 
      features: ['API Access', 'Custom Fine-Tuning', 'High Token Limits'],
      icon: '🧠' 
    }
  ];

  return (
    <Box sx={{ py: 10, flexGrow: 1 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom fontWeight="bold">
          Our Product <Box component="span" sx={{ color: 'primary.main' }}>Portfolio</Box>
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 8, maxWidth: '700px', mx: 'auto' }}>
          Explore our suite of premium SaaS offerings designed to scale your enterprise efficiently.
        </Typography>

        <Grid container spacing={4}>
          {products.map((prod) => (
            <Grid item xs={12} md={4} key={prod.id}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                p: 3,
                background: 'rgba(30, 41, 59, 0.5)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  borderColor: 'secondary.main',
                  boxShadow: '0 10px 30px rgba(236,72,153,0.2)'
                }
              }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h2" sx={{ mb: 2 }}>{prod.icon}</Typography>
                  <Typography gutterBottom variant="h4" component="h2" fontWeight="bold">
                    {prod.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
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
