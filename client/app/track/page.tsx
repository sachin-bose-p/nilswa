'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { 
  Box, Container, Typography, Paper, Stepper, Step, StepLabel, 
  CircularProgress, Button, Divider, Alert, Grid, TextField
} from '@mui/material';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function TrackingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ack = searchParams.get('ack');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [mfaEnabled, setMfaEnabled] = useState(true);
  
  const [mfaData, setMfaData] = useState({ secret: '', uri: '', token: '' });
  const [mfaLoading, setMfaLoading] = useState(false);
  const [mfaError, setMfaError] = useState('');

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
          if (data.mfa_enabled === false) {
            setMfaEnabled(false);
            initMfa(ack);
          } else {
            setMfaEnabled(true);
          }
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [ack]);

  const initMfa = async (ackNumber: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const mfaResponse = await fetch(`${apiUrl}/api/v1/register/${ackNumber}/mfa/setup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (mfaResponse.ok) {
        const mfaDetails = await mfaResponse.json();
        setMfaData(prev => ({ ...prev, secret: mfaDetails.secret, uri: mfaDetails.uri }));
      } else {
        setMfaError("Failed to initialize MFA.");
      }
    } catch (err) {
      console.error(err);
      setMfaError("Network error initializing MFA.");
    }
  };

  const verifyMfa = async () => {
    setMfaLoading(true);
    setMfaError('');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/v1/register/${ack}/mfa/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: mfaData.token })
      });
      
      if (response.ok) {
        setMfaEnabled(true);
        router.push('/dashboard');
      } else {
        const errData = await response.json();
        setMfaError(errData.detail || "Invalid MFA token.");
      }
    } catch (err) {
      console.error(err);
      setMfaError("Network error during MFA verification.");
    }
    setMfaLoading(false);
  };

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

  if (!mfaEnabled) {
    return (
      <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, border: '1px solid #e2e8f0', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: '#0f172a' }}>
          Mandatory MFA Configuration
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', maxWidth: '600px', mx: 'auto' }}>
          You must configure Multi-Factor Authentication before accessing your application status or dashboard.
          Scan the QR code using Google or Microsoft Authenticator.
        </Typography>

        {mfaError && <Alert severity="error" sx={{ mb: 4, display: 'inline-flex' }}>{mfaError}</Alert>}

        {mfaData.uri && (
          <Box sx={{ mb: 4 }}>
            <img 
              src={`https://chart.googleapis.com/chart?chs=200x200&chld=M|0&cht=qr&chl=${encodeURIComponent(mfaData.uri)}`} 
              alt="MFA QR Code" 
              style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px' }}
            />
          </Box>
        )}

        <Grid container spacing={3} sx={{ justifyContent: 'center', mb: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField 
              fullWidth 
              label="6-Digit MFA Code" 
              variant="outlined" 
              value={mfaData.token}
              onChange={(e) => setMfaData({ ...mfaData, token: e.target.value.replace(/[^0-9]/g, '').slice(0, 6) })}
              slotProps={{ htmlInput: { maxLength: 6, style: { textAlign: 'center', letterSpacing: '4px', fontSize: '1.2rem' } } }}
            />
          </Grid>
        </Grid>
        <Button 
          variant="contained" 
          disabled={mfaData.token.length !== 6 || mfaLoading}
          onClick={verifyMfa}
          sx={{ textTransform: 'none', fontWeight: 600, backgroundColor: '#0ea5e9', px: 4 }}
        >
          {mfaLoading ? <CircularProgress size={24} color="inherit" /> : 'Verify & Continue'}
        </Button>
      </Paper>
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
      
      <Button variant="outlined" component={Link} href="/dashboard" sx={{ textTransform: 'none', fontWeight: 600 }}>
        Go to Dashboard
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
