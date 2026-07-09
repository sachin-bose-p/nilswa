'use client';

import React, { useState } from 'react';
import { 
  Box, Container, Typography, TextField, Button, Stepper, Step, StepLabel, 
  Paper, Grid, Checkbox, FormControlLabel, Alert, Divider, MenuItem, CircularProgress
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const steps = ['Company Profile', 'Admin Details', 'Security & Terms'];

export default function RegisterPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    company_name: '',
    registration_number: '',
    industry: '',
    company_size: '',
    annual_revenue: '',
    admin_name: '',
    admin_email: '',
    admin_title: '',
    admin_phone: ''
  });

  const [termsAccepted, setTermsAccepted] = useState({
    auth: false,
    msa: false,
    background: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/api/v1/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          const data = await response.json();
          router.push(`/track?ack=${data.ack_number}`);
        } else {
          console.error("Failed to register");
          // Revert back on error
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const canSubmit = termsAccepted.auth && termsAccepted.msa && termsAccepted.background;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc', py: 8 }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, border: '1px solid #e2e8f0' }}>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: '#0f172a' }}>
              Enterprise Onboarding
            </Typography>
            <Typography variant="body1" color="text.secondary">
              NILSWA is an exclusive enterprise cloud platform. Please provide your corporate details for our internal verification process.
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 6 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mb: 6, minHeight: '250px' }}>
            {activeStep === 0 && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Company Information</Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField fullWidth name="company_name" value={formData.company_name} onChange={handleChange} label="Legal Company Name" variant="outlined" placeholder="e.g. Acme Corporation" />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField fullWidth name="registration_number" value={formData.registration_number} onChange={handleChange} label="Company Registration Number / Tax ID" variant="outlined" />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField fullWidth select name="industry" value={formData.industry} onChange={handleChange} label="Industry" variant="outlined">
                    {[
                      "Agriculture & Forestry", "Airlines & Aviation", "Automotive", "Banking & Finance", 
                      "Biotechnology", "Chemicals", "Construction", "Consulting", "Education", 
                      "Electronics", "Energy & Utilities", "Engineering", "Entertainment & Media", 
                      "Food & Beverage", "Government & Public Administration", "Healthcare", 
                      "Hospitality & Hotels", "Insurance", "Legal Services", "Logistics & Supply Chain", 
                      "Manufacturing", "Mining & Metals", "Non-Profit & Philanthropy", "Pharmaceuticals", 
                      "Real Estate", "Retail & E-commerce", "Software & IT Services", "Telecommunications", 
                      "Travel & Tourism", "Wholesale Trade", "Other"
                    ].map((industry) => (
                      <MenuItem key={industry} value={industry}>{industry}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField fullWidth select name="company_size" value={formData.company_size} onChange={handleChange} label="Company Size" variant="outlined">
                    <MenuItem value="1-10">1-10 employees</MenuItem>
                    <MenuItem value="11-25">11-25 employees</MenuItem>
                    <MenuItem value="26-50">26-50 employees</MenuItem>
                    <MenuItem value="51-100">51-100 employees</MenuItem>
                    <MenuItem value="101-500">101-500 employees</MenuItem>
                    <MenuItem value="501-1000">501-1000 employees</MenuItem>
                    <MenuItem value="1000+">1000+ employees</MenuItem>
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField fullWidth name="annual_revenue" value={formData.annual_revenue} onChange={handleChange} label="Annual Revenue (Optional)" variant="outlined" />
                </Grid>
              </Grid>
            )}

            {activeStep === 1 && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Primary Administrator Details</Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField fullWidth name="admin_name" value={formData.admin_name} onChange={handleChange} label="Full Name" variant="outlined" />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField fullWidth name="admin_email" value={formData.admin_email} onChange={handleChange} label="Corporate Email Address" type="email" variant="outlined" placeholder="name@company.com" />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField fullWidth name="admin_title" value={formData.admin_title} onChange={handleChange} label="Job Title" variant="outlined" />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField fullWidth name="admin_phone" value={formData.admin_phone} onChange={handleChange} label="Phone Number" variant="outlined" />
                </Grid>
              </Grid>
            )}

            {activeStep === 2 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Security & Compliance</Typography>
                
                <Alert severity="info" sx={{ mb: 4, borderRadius: 2 }}>
                  To maintain our enterprise security standards, all registrations undergo manual review by our Compliance Team before infrastructure provisioning begins.
                </Alert>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControlLabel 
                    control={<Checkbox checked={termsAccepted.auth} onChange={(e) => setTermsAccepted({...termsAccepted, auth: e.target.checked})} />} 
                    label="I certify that I am an authorized representative of this company." 
                  />
                  <FormControlLabel 
                    control={<Checkbox checked={termsAccepted.msa} onChange={(e) => setTermsAccepted({...termsAccepted, msa: e.target.checked})} />} 
                    label={<span>I agree to the NILSWA <Link href="#" style={{ color: '#0ea5e9' }}>Master Service Agreement</Link> and <Link href="#" style={{ color: '#0ea5e9' }}>API Usage Terms</Link>.</span>} 
                  />
                  <FormControlLabel 
                    control={<Checkbox checked={termsAccepted.background} onChange={(e) => setTermsAccepted({...termsAccepted, background: e.target.checked})} />} 
                    label="I consent to the background identity verification process." 
                  />
                </Box>
              </Box>
            )}
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              color="inherit"
              disabled={activeStep === 0 || loading}
              onClick={handleBack}
              sx={{ mr: 1, textTransform: 'none', fontWeight: 600 }}
            >
              Back
            </Button>
            <Button 
              variant="contained" 
              disabled={loading || (activeStep === steps.length - 1 && !canSubmit)}
              onClick={handleNext}
              sx={{ 
                textTransform: 'none', 
                fontWeight: 600, 
                backgroundColor: '#0ea5e9',
                px: 4,
                '&:hover': { backgroundColor: '#0284c7' }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : (activeStep === steps.length - 1 ? 'Submit Application' : 'Next Step')}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
