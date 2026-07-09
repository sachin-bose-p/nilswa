'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Drawer, List, ListItem, ListItemButton, 
  ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, 
  Avatar, Dialog, InputBase, Grid, Badge
} from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FlightIcon from '@mui/icons-material/Flight';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
import CircularProgress from '@mui/material/CircularProgress';

const drawerWidthExpanded = 240;
const drawerWidthCollapsed = 72;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const drawerWidth = collapsed ? drawerWidthCollapsed : drawerWidthExpanded;

  // Handle Ctrl+F for search menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('nilswa_auth_token');
    router.push('/login');
  };

  const sections = [
    {
      title: 'OVERVIEW',
      items: [
        { text: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: 20 }} />, path: '/dashboard' }
      ]
    },
    {
      title: 'SERVICES',
      items: [
        { text: 'Crew CRM', icon: <FlightIcon sx={{ fontSize: 20 }} />, onClick: () => setSearchOpen(true) },
        { text: 'Alcohol Check', icon: <LocalHospitalIcon sx={{ fontSize: 20 }} />, onClick: () => setSearchOpen(true) },
        { text: 'Real Estate', icon: <WorkIcon sx={{ fontSize: 20 }} />, onClick: () => setSearchOpen(true) },
      ]
    },
    {
      title: 'ACCOUNT',
      items: [
        { text: 'Billing and Cost Management', icon: <AccountBalanceWalletIcon sx={{ fontSize: 20 }} />, path: '/dashboard/billing' }
      ]
    }
  ];

  const drawer = (
    <Box sx={{ backgroundColor: '#ffffff', height: '100%', color: '#334155', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', height: '80px' }}>
        <img src="/images/logo.jpg" alt="NILSWA Logo" style={{ height: '40px', width: 'auto', borderRadius: '4px', marginRight: collapsed ? 0 : '12px' }} />
        {!collapsed && (
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0ea5e9', lineHeight: 1.2 }}>
              NILSWA
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem' }}>
              Enterprise Cloud
            </Typography>
          </Box>
        )}
      </Box>
      
      <Box sx={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {sections.map((section, idx) => (
          <Box key={idx} sx={{ mb: 2 }}>
            {!collapsed && (
              <Typography sx={{ px: 3, py: 1, fontSize: '0.65rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '1px' }}>
                {section.title}
              </Typography>
            )}
            <List sx={{ py: 0, px: collapsed ? 1 : 0 }}>
              {section.items.map((item) => {
                const isActive = 'path' in item && item.path ? pathname === item.path : false;
                return (
                  <ListItem key={item.text} disablePadding sx={{ mb: 0.5, px: collapsed ? 0 : 2 }}>
                    <ListItemButton 
                      onClick={() => {
                        if ('onClick' in item && item.onClick) item.onClick();
                        if ('path' in item && item.path) router.push(item.path);
                      }}
                      sx={{ 
                        py: 1, 
                        px: collapsed ? 0 : 2, 
                        justifyContent: collapsed ? 'center' : 'flex-start',
                        borderRadius: collapsed ? 1.5 : 1,
                        backgroundColor: isActive ? '#eff6ff' : 'transparent',
                        color: isActive ? '#1d4ed8' : '#64748b',
                        borderLeft: isActive && !collapsed ? '3px solid #3b82f6' : '3px solid transparent',
                        '&:hover': { backgroundColor: isActive ? '#eff6ff' : '#f8fafc' } 
                      }}
                    >
                      <ListItemIcon sx={{ color: isActive ? '#3b82f6' : '#94a3b8', minWidth: collapsed ? 'auto' : 36, display: 'flex', justifyContent: 'center' }}>
                        {item.icon}
                      </ListItemIcon>
                      {!collapsed && (
                        <ListItemText primary={item.text} slotProps={{ primary: { sx: { fontWeight: isActive ? 600 : 500, fontSize: '0.85rem' } } }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>
      
      <Box sx={{ p: 2, display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end', borderTop: '1px solid #f1f5f9' }}>
        <IconButton onClick={() => setCollapsed(!collapsed)} sx={{ color: '#94a3b8', '&:hover': { color: '#0f172a', backgroundColor: '#f1f5f9' } }}>
          {collapsed ? <KeyboardDoubleArrowRightIcon /> : <KeyboardDoubleArrowLeftIcon />}
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#ffffff',
          color: '#0f172a',
          borderBottom: '1px solid #e2e8f0',
          transition: 'width 0.2s, margin 0.2s',
        }}
      >
        <Toolbar sx={{ minHeight: '64px !important', px: { xs: 2, sm: 3 } }}>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', fontSize: '1.1rem', lineHeight: 1.2 }}>
              NILSWA Console
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ color: '#64748b' }}>
              <Badge variant="dot" color="error">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
            <Avatar sx={{ bgcolor: '#3b82f6', width: 36, height: 36, fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>AD</Avatar>
          </Box>
        </Toolbar>
        <Box sx={{ px: 3, display: 'flex', borderTop: '1px solid #f1f5f9' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', py: 1.5, borderBottom: '2px solid #3b82f6', color: '#1d4ed8' }}>
            <DashboardIcon sx={{ fontSize: 18, mr: 1 }} />
            <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', textTransform: 'capitalize' }}>
              {pathname === '/dashboard/billing' ? 'Billing and Cost Management' : 'Dashboard Overview'}
            </Typography>
          </Box>
        </Box>
      </AppBar>
      
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, transition: 'width 0.2s' }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidthExpanded },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid #e2e8f0', transition: 'width 0.2s' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box component="main" sx={{ flexGrow: 1, pt: '112px', minHeight: '100vh', transition: 'width 0.2s', width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        {children}
      </Box>

      {/* Windows 11 Style Start Menu Overlay (Triggered by Ctrl+F) */}
      <Dialog 
        open={searchOpen} 
        onClose={() => setSearchOpen(false)}
        slotProps={{
          paper: {
            sx: {
              position: 'absolute',
              bottom: { xs: 0, md: 'auto' },
              top: { xs: 'auto', md: '15vh' },
              m: 0,
              width: '100%',
              maxWidth: '640px',
              borderRadius: { xs: '16px 16px 0 0', md: '12px' },
              backgroundColor: '#1e1e1e', // Win11 Dark Theme
              color: '#ffffff',
              boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.05)',
              backgroundImage: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
              backdropFilter: 'blur(20px)'
            }
          }
        }}
      >
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: { xs: '70vh', md: '600px' } }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: 'rgba(255,255,255,0.05)', 
            borderRadius: '24px', 
            px: 2, 
            py: 0.5,
            mb: 4,
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <SearchIcon sx={{ color: '#aaa', mr: 1, fontSize: 20 }} />
            <InputBase 
              autoFocus
              placeholder="Search for apps, settings, and documents" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ color: '#fff', width: '100%', fontSize: '0.9rem', py: 0.5 }} 
            />
          </Box>

          <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>Pinned</Typography>
            </Box>

            <Grid container spacing={2}>
              {[
                { name: 'Crew CRM', icon: <FlightIcon sx={{ color: '#3b82f6', fontSize: 32 }} /> },
                { name: 'Alcohol Check', icon: <LocalHospitalIcon sx={{ color: '#10b981', fontSize: 32 }} /> },
                { name: 'Real Estate CRM', icon: <WorkIcon sx={{ color: '#f59e0b', fontSize: 32 }} /> }
              ].filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).map((service, i) => (
                <Grid size={{ xs: 4, sm: 3, md: 2 }} key={i}>
                  <Box sx={{ 
                    display: 'flex', flexDirection: 'column', alignItems: 'center', 
                    p: 1.5, borderRadius: 2, cursor: 'pointer',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' }
                  }}>
                    <Box sx={{ 
                      width: 48, height: 48, display: 'flex', justifyContent: 'center', alignItems: 'center',
                      backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)', mb: 1
                    }}>
                      {service.icon}
                    </Box>
                    <Typography align="center" sx={{ fontSize: '0.75rem', color: '#ccc', lineHeight: 1.2 }}>
                      {service.name}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', p: 1, borderRadius: 2, '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' } }}>
              <Avatar sx={{ width: 32, height: 32, mr: 1.5, fontSize: '0.9rem' }}>A</Avatar>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>Admin User</Typography>
            </Box>
            <IconButton onClick={handleLogout} sx={{ color: '#ccc', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' } }}>
              <PowerSettingsNewIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
