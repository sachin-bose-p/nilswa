'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Contact() {
  const [formData, setFormData] = React.useState({
    fullName: '',
    companyEmail: '',
    companyName: '',
    message: ''
  });
  const [loading, setLoading] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In production, this would use a dynamic API URL based on environment
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/v1/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          company_email: formData.companyEmail,
          company_name: formData.companyName,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSnackbar({ open: true, message: 'Message sent successfully!', severity: 'success' });
        setFormData({ fullName: '', companyEmail: '', companyName: '', message: '' });
      } else {
        const errorData = await response.json();
        setSnackbar({ open: true, message: `Error: ${errorData.detail || 'Failed to send message'}`, severity: 'error' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSnackbar({ open: true, message: 'Network error. Please try again later.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ py: 10, flexGrow: 1 }}>
      <Container maxWidth="md">
        <Typography variant="h2" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
          Get in <Box component="span" sx={{ color: '#111827' }}>Touch</Box>
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 8 }}>
          Have questions about our enterprise solutions? Reach out to us below.
        </Typography>

        <Paper sx={{ 
          p: { xs: 3, md: 6 }, 
          backgroundColor: '#ffffff', 
          
          border: '1px solid #e2e8f0',
          borderRadius: 4
        }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField 
                  fullWidth 
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  label="Full Name" 
                  variant="outlined" 
                  sx={{ mb: 3 }}
                />
                <TextField 
                  fullWidth 
                  required
                  type="email"
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleChange}
                  label="Company Email" 
                  variant="outlined" 
                  sx={{ mb: 3 }}
                />
                <TextField 
                  fullWidth 
                  required
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  label="Company Name" 
                  variant="outlined" 
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField 
                  fullWidth 
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  label="Your Message" 
                  variant="outlined" 
                  multiline
                  rows={7}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Button 
                  type="submit"
                  variant="contained" 
                  size="large" 
                  fullWidth 
                  disabled={loading}
                  sx={{ py: 2, fontSize: '1.1rem' }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
