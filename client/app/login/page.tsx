'use client';

import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, CircularProgress, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    mfa_token: ''
  });
  
  const [requiresMfa, setRequiresMfa] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/v1/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        if (data.requires_mfa) {
          setRequiresMfa(true);
        } else {
          // Success
          localStorage.setItem('nilswa_auth_token', data.ack_number || 'authenticated');
          router.push('/dashboard');
        }
      } else {
        setErrorMsg(data.detail || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', py: 8 }}>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: '#0f172a' }}>
            NILSWA Console
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
            Sign in to manage your enterprise cloud services
          </Typography>

          {errorMsg && (
            <Alert severity="error" sx={{ mb: 4, textAlign: 'left' }}>
              {errorMsg}
            </Alert>
          )}

          <form onSubmit={handleLogin}>
            {!requiresMfa ? (
              <>
                <TextField 
                  fullWidth 
                  name="username" 
                  value={formData.username} 
                  onChange={handleChange} 
                  label="Username" 
                  variant="outlined" 
                  sx={{ mb: 3 }} 
                  required
                />
                <TextField 
                  fullWidth 
                  name="password" 
                  type="password"
                  value={formData.password} 
                  onChange={handleChange} 
                  label="Password" 
                  variant="outlined" 
                  sx={{ mb: 4 }} 
                  required
                />
              </>
            ) : (
              <>
                <Typography variant="body2" sx={{ mb: 3, fontWeight: 600 }}>
                  Multi-Factor Authentication Required
                </Typography>
                <TextField 
                  fullWidth 
                  name="mfa_token" 
                  value={formData.mfa_token} 
                  onChange={(e) => setFormData({ ...formData, mfa_token: e.target.value.replace(/[^0-9]/g, '').slice(0, 6) })}
                  label="6-Digit MFA Code" 
                  variant="outlined" 
                  sx={{ mb: 4 }}
                  slotProps={{ htmlInput: { maxLength: 6, style: { textAlign: 'center', letterSpacing: '4px', fontSize: '1.2rem' } } }}
                  autoFocus
                  required
                />
              </>
            )}

            <Button 
              type="submit"
              variant="contained" 
              fullWidth
              disabled={loading}
              sx={{ 
                textTransform: 'none', 
                fontWeight: 600, 
                backgroundColor: '#0ea5e9',
                py: 1.5,
                '&:hover': { backgroundColor: '#0284c7' }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : (requiresMfa ? 'Verify & Sign In' : 'Sign In')}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
