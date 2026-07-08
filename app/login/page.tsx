'use client';

import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const domain = email.split('@')[1];
    if (!domain) {
      setError('Please enter a valid email address.');
      return;
    }

    const blockedDomains = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com'];
    if (blockedDomains.includes(domain.toLowerCase())) {
      setError('Access restricted to company domain emails only. Personal email domains are not allowed.');
      return;
    }

    // Mock successful login: save mock token and redirect
    if (typeof window !== 'undefined') {
      localStorage.setItem('nilswa_auth_token', 'mock_token_' + email);
      router.push('/dashboard');
    }
  };

  return (
    <Box sx={{ py: 10, flexGrow: 1, display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Paper sx={{ 
          p: { xs: 4, md: 6 }, 
          background: 'rgba(30, 41, 59, 0.7)', 
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 4,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
            Sign <Box component="span" sx={{ color: 'primary.main' }}>In</Box>
          </Typography>
          <Typography align="center" color="text.secondary" sx={{ mb: 4 }}>
            Access your NILSWA Cloud Dashboard
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleLogin}>
            <TextField 
              fullWidth 
              label="Company Email" 
              variant="outlined" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
              placeholder="name@yourcompany.com"
            />
            <TextField 
              fullWidth 
              label="Password" 
              variant="outlined" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 4 }}
            />
            <Button type="submit" variant="contained" size="large" fullWidth sx={{ py: 1.5, fontSize: '1.1rem' }}>
              Login to Dashboard
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
