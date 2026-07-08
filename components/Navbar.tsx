'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(15, 23, 42, 0.7)' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box component="span" sx={{ color: 'primary.main' }}>NILSWA</Box> Cloud
            </Link>
          </Typography>
          <Button color="inherit" component={Link} href="/">Home</Button>
          <Button color="inherit" component={Link} href="/portfolio">Portfolio</Button>
          <Button color="inherit" component={Link} href="/contact">Contact</Button>
          <Button color="primary" variant="contained" component={Link} href="/login" sx={{ ml: 2 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
