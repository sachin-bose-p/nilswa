'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { 
  Box, Container, Typography, Paper, Stepper, Step, StepLabel, 
  CircularProgress, Button, Divider, Alert
} from '@mui/material';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function TrackingContent() {
  const searchParams = useSearchParams();
  const ack = searchParams.get('ack');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const verificationSteps = [
    'Application Submitted',
    'Account Information Verification',
    'Legal & Compliance Review',
    'Infrastructure Provisioning',
    'Account Active'
  ];

  useEffect(() => {
    if (ack) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      fetch(`${apiUrl}/api/v1/track/${ack}`)
        .then(res => {
          if (!res.ok) throw new Error('Acknowledgment number not found');
          return res.json();
        })
        .then(data => {
          setStatus(data.status);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [ack]);

  if (!ack) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h5">Please provide an Acknowledgment Number.</Typography>
        <Button component={Link} href="/register" variant="outlined" sx={{ mt: 3 }}>
          Return to Registration
        </Button>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Retrieving application status...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Alert severity="error" sx={{ display: 'inline-flex', mb: 3 }}>{error}</Alert>
        <br />
        <Button component={Link} href="/register" variant="outlined">
          Return to Registration
        </Button>
      </Box>
    );
  }

  // Derive active step based on status string (simplistic mapping for demo)
  let activeStepIndex = 1;
  if (status === 'Application Submitted') activeStepIndex = 1;
  else if (status === 'Account Information Verification') activeStepIndex = 2;
  else if (status === 'Legal & Compliance Review') activeStepIndex = 3;
  else if (status === 'Infrastructure Provisioning') activeStepIndex = 4;
  else if (status === 'Account Active') activeStepIndex = 5;

  return (
    <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, border: '1px solid #e2e8f0', textAlign: 'center' }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: '#0f172a' }}>
        Application Status
      </Typography>
      
      <Box sx={{ backgroundColor: '#f1f5f9', p: 3, borderRadius: 2, display: 'inline-block', mb: 6 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Your Acknowledgment Tracking Number
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#0ea5e9', letterSpacing: '1px' }}>
          {ack}
        </Typography>
      </Box>

      <Typography variant="body1" sx={{ mb: 6, color: '#475569', maxWidth: '600px', mx: 'auto' }}>
        Thank you for choosing NILSWA for your enterprise needs. Your application is currently undergoing our rigorous internal verification process. Please save your Acknowledgment Number to check on your status.
      </Typography>

      <Box sx={{ maxWidth: '800px', mx: 'auto', textAlign: 'left', mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 4 }}>Current Progress</Typography>
        <Stepper activeStep={activeStepIndex} orientation="vertical">
          {verificationSteps.map((label, index) => (
            <Step key={label} completed={index < activeStepIndex}>
              <StepLabel 
                optional={
                  index === activeStepIndex ? (
                    <Typography variant="caption" color="error" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <CircularProgress size={12} color="inherit" />
                      In Progress (Pending Manual Review)
                    </Typography>
                  ) : index > activeStepIndex ? (
                    <Typography variant="caption" color="text.secondary">Waiting</Typography>
                  ) : null
                }
              >
                <Typography sx={{ fontWeight: index === activeStepIndex ? 600 : 400 }}>{label}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Divider sx={{ my: 4 }} />
      
      <Button variant="outlined" component={Link} href="/" sx={{ textTransform: 'none', fontWeight: 600 }}>
        Return to Home
      </Button>
    </Paper>
  );
}

export default function TrackPage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc', py: 8 }}>
      <Container maxWidth="md">
        <Suspense fallback={<Box sx={{ textAlign: 'center', py: 10 }}><CircularProgress /></Box>}>
          <TrackingContent />
        </Suspense>
      </Container>
    </Box>
  );
}
