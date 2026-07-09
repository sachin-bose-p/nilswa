'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';

export default function Navbar() {
  const [langAnchorEl, setLangAnchorEl] = React.useState<null | HTMLElement>(null);
  const langOpen = Boolean(langAnchorEl);
  const handleLangClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLangAnchorEl(event.currentTarget);
  };
  const handleLangClose = () => {
    setLangAnchorEl(null);
  };

  const languages = [
    { label: 'عربي', id: 'ar' }, { label: 'Tiếng Việt', id: 'vi' },
    { label: 'Bahasa Indonesia', id: 'id' }, { label: 'Türkçe', id: 'tr' },
    { label: 'Deutsch', id: 'de' }, { label: 'Русский', id: 'ru' },
    { label: 'English', id: 'en' }, { label: 'ไทย', id: 'th' },
    { label: 'Español', id: 'es' }, { label: '日本語', id: 'ja' },
    { label: 'Français', id: 'fr' }, { label: '한국어', id: 'ko' },
    { label: 'Italiano', id: 'it' }, { label: '中文 (简体)', id: 'zh-CN' },
    { label: 'Português', id: 'pt' }, { label: '中文 (繁體)', id: 'zh-TW' },
  ];

  return (
    <AppBar position="sticky" elevation={1} sx={{ backgroundColor: '#ffffff', color: '#0f172a', top: 0, zIndex: 1100 }}>
      {/* Top Secondary Navbar */}
      <Box sx={{ backgroundColor: '#f8fafc', color: '#475569', py: 0.5, borderBottom: '1px solid #e2e8f0' }}>
        <Toolbar variant="dense" sx={{ minHeight: '36px', justifyContent: 'flex-end', gap: 2 }}>
          <Button 
            color="inherit" 
            size="small" 
            startIcon={<LanguageIcon fontSize="small" />} 
            endIcon={<KeyboardArrowDownIcon fontSize="small" />}
            onClick={handleLangClick}
            sx={{ textTransform: 'none', fontSize: '0.8rem', backgroundColor: langOpen ? 'rgba(0,0,0,0.05)' : 'transparent', '&:hover': { backgroundColor: 'rgba(0,0,0,0.08)' } }}
          >
            English
          </Button>
          <Menu
            anchorEl={langAnchorEl}
            open={langOpen}
            onClose={handleLangClose}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  minWidth: 400,
                  borderRadius: 2,
                  boxShadow: '0px 4px 20px rgba(0,0,0,0.1)'
                }
              }
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Box sx={{ p: 2 }}>
              <Grid container spacing={1}>
                {languages.map((lang) => (
                  <Grid size={{ xs: 6 }} key={lang.id}>
                    <MenuItem 
                      onClick={handleLangClose}
                      sx={{ 
                        borderRadius: 1, 
                        fontSize: '0.9rem',
                        backgroundColor: lang.id === 'en' ? '#e0f2fe' : 'transparent',
                        color: lang.id === 'en' ? '#0ea5e9' : 'inherit',
                        '&:hover': {
                          backgroundColor: lang.id === 'en' ? '#bae6fd' : 'rgba(0,0,0,0.04)'
                        }
                      }}
                    >
                      {lang.label}
                    </MenuItem>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
              <FormControlLabel 
                control={<Checkbox size="small" />} 
                label={
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Detect language</Typography>
                    <Typography variant="caption" color="text.secondary">Automatically translated to English</Typography>
                  </Box>
                } 
              />
            </Box>
          </Menu>
          <Button color="inherit" size="small" component={Link} href="/contact" sx={{ textTransform: 'none', fontSize: '0.8rem' }}>
            Contact us
          </Button>

          <Button color="inherit" sx={{ textTransform: 'none', fontSize: '0.8rem', color: '#475569', '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' } }} component={Link} href="/docs">
            Support
          </Button>
        </Toolbar>
      </Box>

      {/* Primary Main Navbar */}
      <Box sx={{ backgroundColor: '#ffffff', color: '#0f172a' }}>
        <Toolbar sx={{ minHeight: '64px' }}>
          {/* Logo */}
          <Typography variant="h6" component="div" sx={{ mr: 4, fontWeight: 800 }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src="/images/logo.jpg" alt="NILSWA Logo" style={{ height: '56px', width: 'auto', borderRadius: '8px' }} />
              <Box component="span" sx={{ fontSize: '1.4rem', letterSpacing: '-0.5px' }}>NILSWA</Box>
            </Link>
          </Typography>

          {/* Main Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, flexGrow: 1, pr: 4 }}>
            <Button color="inherit" sx={{ textTransform: 'none', fontWeight: 500, fontSize: '0.9rem', color: '#4b5563' }} component={Link} href="/portfolio">
              Products
            </Button>
          </Box>

          {/* Right side actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit" size="small">
              <SearchIcon />
            </IconButton>
            <Button 
              color="inherit" 
              component={Link} 
              href="/login" 
              sx={{ 
                textTransform: 'none', 
                fontWeight: 600, 
                fontSize: '0.9rem', 
                color: '#4b5563',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Sign in to console
            </Button>
            <Button 
              variant="contained" 
              component={Link} 
              href="/register" 
              sx={{ 
                backgroundColor: '#0ea5e9', 
                color: '#ffffff',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '20px',
                px: 3,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#0284c7',
                  boxShadow: 'none'
                }
              }}
            >
              Create account
            </Button>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
