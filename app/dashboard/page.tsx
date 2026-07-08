'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { Paper } from '@mui/material';

export default function DashboardOverview() {
  const products = [
    { 
      id: 'cats-crm',
      title: 'CATS CRM', 
      desc: 'Enterprise Customer Relationship Management', 
      icon: '📈',
      status: 'Available for Subscription'
    },
    { 
      id: 'bless-check',
      title: 'BLESS Crew Check', 
      desc: 'Crew Alcohol Testing & Compliance', 
      icon: '🛡️',
      status: 'Available for Subscription'
    },
    { 
      id: 'ai-llm',
      title: 'AI & LLM Services', 
      desc: 'Top-tier foundation models via API', 
      icon: '🧠',
      status: 'Available for Subscription'
    }
  ];

  return (
    <Box>
      <Typography variant="h3" gutterBottom fontWeight="bold">
        Welcome to your <Box component="span" sx={{ color: 'primary.main' }}>Dashboard</Box>
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 6 }}>
        Manage your active subscriptions and explore new enterprise solutions below.
      </Typography>

      <Paper sx={{ p: 4, mb: 6, background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Active Subscriptions
        </Typography>
        <Typography color="text.secondary">
          You currently have no active subscriptions. Browse the products below to get started.
        </Typography>
      </Paper>

      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
        Available Products
      </Typography>

      <Grid container spacing={4}>
        {products.map((prod) => (
          <Grid item xs={12} md={4} key={prod.id}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              p: 2,
              background: 'rgba(30, 41, 59, 0.5)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.05)',
              '&:hover': { borderColor: 'primary.main' }
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h3" sx={{ mr: 2 }}>{prod.icon}</Typography>
                  <Typography variant="h5" fontWeight="bold">{prod.title}</Typography>
                </Box>
                <Typography color="text.secondary" paragraph>
                  {prod.desc}
                </Typography>
                <Typography variant="body2" color="success.main" fontWeight="bold" sx={{ mb: 2 }}>
                  {prod.status}
                </Typography>
                <Button variant="contained" fullWidth component={Link} href={`/dashboard/product/${prod.id}`}>
                  View Details & Pricing
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
