'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Link from 'next/link';

const drawerWidth = 280;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('nilswa_auth_token');
      if (!token) {
        router.push('/login');
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('nilswa_auth_token');
    router.push('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
            borderRight: '1px solid rgba(255,255,255,0.05)'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            <Box component="span" sx={{ color: 'primary.main' }}>NILSWA</Box> Portal
          </Typography>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />
        <List sx={{ px: 2, mt: 2 }}>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton component={Link} href="/dashboard" sx={{ borderRadius: 2 }}>
              <ListItemIcon>🏠</ListItemIcon>
              <ListItemText primary="Overview" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton component={Link} href="/dashboard/product/cats-crm" sx={{ borderRadius: 2 }}>
              <ListItemIcon>📈</ListItemIcon>
              <ListItemText primary="CATS CRM" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton component={Link} href="/dashboard/product/bless-check" sx={{ borderRadius: 2 }}>
              <ListItemIcon>🛡️</ListItemIcon>
              <ListItemText primary="BLESS Check" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton component={Link} href="/dashboard/product/ai-llm" sx={{ borderRadius: 2 }}>
              <ListItemIcon>🧠</ListItemIcon>
              <ListItemText primary="AI & LLM" />
            </ListItemButton>
          </ListItem>
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ p: 3 }}>
          <Button variant="outlined" color="error" fullWidth onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 4, minHeight: '100vh', bgcolor: 'background.default' }}
      >
        {children}
      </Box>
    </Box>
  );
}
