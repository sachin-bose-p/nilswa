'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

export default function Contact() {
  return (
    <Box sx={{ py: 10, flexGrow: 1 }}>
      <Container maxWidth="md">
        <Typography variant="h2" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
          Get in <Box component="span" sx={{ color: 'primary.main' }}>Touch</Box>
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 8 }}>
          Have questions about our enterprise solutions? Reach out to us below.
        </Typography>

        <Paper sx={{ 
          p: { xs: 3, md: 6 }, 
          background: 'rgba(30, 41, 59, 0.5)', 
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 4
        }}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField 
                fullWidth 
                label="Full Name" 
                variant="outlined" 
                sx={{ mb: 3 }}
              />
              <TextField 
                fullWidth 
                label="Company Email" 
                variant="outlined" 
                sx={{ mb: 3 }}
              />
              <TextField 
                fullWidth 
                label="Company Name" 
                variant="outlined" 
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField 
                fullWidth 
                label="Your Message" 
                variant="outlined" 
                multiline
                rows={7}
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button variant="contained" size="large" fullWidth sx={{ py: 2, fontSize: '1.1rem' }}>
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
