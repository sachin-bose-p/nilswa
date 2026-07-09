'use client';

import * as React from 'react';
import { use } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

const productData: Record<string, any> = {
  'cats-crm': {
    title: 'Airline Crew',
    icon: '📈',
    description: 'A powerful CRM module tailored for your business needs. Centralize your customer data, track sales pipelines, and analyze performance with our advanced dashboard.',
    features: ['Lead Tracking & Scoring', 'Sales Pipeline Visualization', 'Automated Email Campaigns', 'Custom Reporting & Analytics'],
    pricing: {
      monthly: '$99/mo',
      annual: '$999/yr',
      setup: 'Free'
    }
  },
  'alcohol-check': {
    title: 'Alcohol Check System',
    icon: '🛡️',
    description: 'Ensure safety and compliance with our reliable crew alcohol testing software. Alcohol Check System automates reporting and keeps detailed logs for regulatory compliance.',
    features: ['Automated Testing Reports', 'Mobile-Ready Interface', 'Real-time Alerts', 'Compliance Log Export'],
    pricing: {
      monthly: '$149/mo',
      annual: '$1490/yr',
      setup: '$200 one-time'
    }
  },
  'real-estate-crm': {
    title: 'Real Estate CRM',
    icon: '🏢',
    description: 'A comprehensive Real Estate CRM dashboard combined with a customer-facing front portal. Manage listings, track leads, and provide clients with a premium portal experience.',
    features: ['Dashboard Analytics', 'Agent Portal', 'Customer Portal', 'Property Management'],
    pricing: {
      monthly: '$199/mo',
      annual: '$1990/yr',
      setup: '$500 one-time'
    }
  }
};

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const product = productData[id];

  if (!product) {
    return <Typography variant="h4" color="error">Product not found.</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Typography variant="h2" sx={{ mr: 3 }}>{product.icon}</Typography>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          {product.title}
        </Typography>
      </Box>

      <Grid container spacing={6}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 4, mb: 4, backgroundColor: '#ffffff',  border: '1px solid #e2e8f0' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>Overview</Typography>
            <Typography color="text.secondary" sx={{ mb: 2, fontSize: '1.1rem', lineHeight: 1.8 }}>
              {product.description}
            </Typography>
            
            <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
            
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>Key Features</Typography>
            <Box component="ul" sx={{ pl: 3, color: 'text.secondary' }}>
              {product.features.map((f: string, idx: number) => (
                <Typography component="li" key={idx} sx={{ mb: 1, fontSize: '1.1rem' }}>
                  {f}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 4, background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }} align="center">Pricing Plans</Typography>
            
            <Box sx={{ my: 4, textAlign: 'center' }}>
              <Typography variant="h3" color="primary.main" sx={{ fontWeight: "bold" }}>
                {product.pricing.monthly}
              </Typography>
              <Typography color="text.secondary">billed monthly</Typography>
            </Box>
            
            <Box sx={{ my: 4, textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {product.pricing.annual}
              </Typography>
              <Typography color="text.secondary">billed annually (save ~15%)</Typography>
            </Box>

            <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />
            
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">Setup Fee: {product.pricing.setup}</Typography>
            </Box>

            <Button variant="contained" size="large" fullWidth sx={{ py: 2, fontSize: '1.1rem' }}>
              Subscribe Now
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
