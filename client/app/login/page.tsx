'use client';

import React, { useState } from 'react';
import { 
  Box, Typography, TextField, Button, CircularProgress, Alert, 
  Checkbox, FormControlLabel, Link as MuiLink 
} from '@mui/material';
import { useRouter } from 'next/navigation';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
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
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#f8f8f8',
      backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
      backgroundSize: '20px 20px'
    }}>
      {/* Header */}
      <Box sx={{ 
        width: '100%', 
        p: 2, 
        backgroundColor: '#232f3e', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography sx={{ color: '#fff', fontWeight: 800, letterSpacing: '1px' }}>
          NILSWA Console
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, py: 8, px: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          maxWidth: '900px',
          width: '100%',
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          
          {/* Left Marketing Area (Branding) */}
          <Box sx={{ 
            width: { xs: '100%', md: '50%' },
            backgroundColor: '#0f172a', 
            color: '#fff',
            p: { xs: 4, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRight: { xs: 'none', md: '1px solid #e5e7eb' }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <img src="/images/logo.jpg" alt="NILSWA Logo" style={{ height: '64px', width: 'auto', borderRadius: '8px', marginRight: '16px' }} />
              <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: '2px', color: '#0f172a' }}>
                NILSWA
              </Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, lineHeight: 1.3 }}>
              Welcome to the NILSWA Enterprise Cloud
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', opacity: 0.9 }}>
              Manage your global infrastructure securely and efficiently. Sign in to access your CRM, Cloud Storage, and Analytics modules.
            </Typography>
          </Box>

          {/* Right Form Area */}
          <Box sx={{ 
            p: { xs: 4, md: 6 }, 
            width: { xs: '100%', md: '50%' },
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a', mr: 1 }}>
                Sign in
              </Typography>
              <InfoOutlinedIcon sx={{ color: '#0ea5e9', fontSize: 20 }} />
            </Box>

            {errorMsg && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {errorMsg}
              </Alert>
            )}

            <form onSubmit={handleLogin}>
              {!requiresMfa ? (
                <>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#0f172a' }}>
                    Username
                  </Typography>
                  <TextField 
                    fullWidth 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    variant="outlined" 
                    size="small"
                    sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 1 } }} 
                    required
                  />

                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#0f172a' }}>
                    Password
                  </Typography>
                  <TextField 
                    fullWidth 
                    name="password" 
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password} 
                    onChange={handleChange} 
                    variant="outlined" 
                    size="small"
                    sx={{ mb: 1, '& .MuiOutlinedInput-root': { borderRadius: 1 } }} 
                    required
                  />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <FormControlLabel 
                      control={<Checkbox size="small" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} sx={{ color: '#0ea5e9' }} />} 
                      label={<Typography variant="body2" sx={{ color: '#475569' }}>Show Password</Typography>} 
                    />
                    <MuiLink href="#" underline="hover" sx={{ fontSize: '0.875rem', color: '#0ea5e9', fontWeight: 500 }}>
                      Forgot password?
                    </MuiLink>
                  </Box>
                </>
              ) : (
                <>
                  <Typography variant="body2" sx={{ mb: 3, fontWeight: 600, color: '#0f172a' }}>
                    Multi-Factor Authentication Required
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#0f172a' }}>
                    MFA Code
                  </Typography>
                  <TextField 
                    fullWidth 
                    name="mfa_token" 
                    value={formData.mfa_token} 
                    onChange={(e) => setFormData({ ...formData, mfa_token: e.target.value.replace(/[^0-9]/g, '').slice(0, 6) })}
                    variant="outlined" 
                    size="small"
                    sx={{ mb: 4, '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                    slotProps={{ htmlInput: { maxLength: 6, style: { letterSpacing: '2px' } } }}
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
                  fontWeight: 700, 
                  backgroundColor: '#0ea5e9',
                  color: '#fff',
                  py: 1,
                  borderRadius: 1,
                  boxShadow: 'none',
                  mb: 1,
                  '&:hover': { backgroundColor: '#0284c7', boxShadow: 'none' }
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : (requiresMfa ? 'Verify MFA' : 'Sign in')}
              </Button>
            </form>
          </Box>

        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ textAlign: 'center', py: 4, color: '#64748b' }}>
        <Typography variant="body2">
          By continuing, you agree to NILSWA Customer Agreement or other agreement for NILSWA services.
        </Typography>
      </Box>
    </Box>
  );
}
