'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Drawer, List, ListItem, ListItemButton, 
  ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, 
  Avatar, Paper, Divider, Button, Dialog, InputBase, Grid, Fade
} from '@mui/material';
import { useRouter } from 'next/navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AppsIcon from '@mui/icons-material/Apps';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SearchIcon from '@mui/icons-material/Search';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FlightIcon from '@mui/icons-material/Flight';
import SecurityIcon from '@mui/icons-material/Security';
import ComputerIcon from '@mui/icons-material/Computer';
import StorageIcon from '@mui/icons-material/Storage';

const drawerWidth = 240;

export default function DashboardPage() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('nilswa_auth_token');
    router.push('/login');
  };

  const menuItems = [
    { text: 'Overview', icon: <DashboardIcon sx={{ fontSize: 20 }} /> },
    { text: 'Services', icon: <AppsIcon sx={{ fontSize: 20 }} />, onClick: () => setSearchOpen(true) },
    { text: 'Analytics', icon: <AssessmentIcon sx={{ fontSize: 20 }} /> },
    { text: 'Settings', icon: <SettingsIcon sx={{ fontSize: 20 }} /> },
  ];

  const pinnedServices = [
    { name: 'Airline Crew', icon: <FlightIcon sx={{ color: '#0ea5e9', fontSize: 32 }} /> },
    { name: 'Alcohol Check', icon: <LocalHospitalIcon sx={{ color: '#10b981', fontSize: 32 }} /> },
    { name: 'Real Estate CRM', icon: <WorkIcon sx={{ color: '#f59e0b', fontSize: 32 }} /> },
    { name: 'IAM Console', icon: <SecurityIcon sx={{ color: '#8b5cf6', fontSize: 32 }} /> },
    { name: 'Compute Instances', icon: <ComputerIcon sx={{ color: '#ec4899', fontSize: 32 }} /> },
    { name: 'Cloud Storage', icon: <StorageIcon sx={{ color: '#64748b', fontSize: 32 }} /> },
  ];

  const filteredServices = pinnedServices.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const drawer = (
    <Box sx={{ backgroundColor: '#ffffff', height: '100%', color: '#334155', borderRight: '1px solid #e2e8f0' }}>
      <Toolbar sx={{ px: 2, py: 1, minHeight: '64px !important' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, letterSpacing: '0.5px', color: '#0f172a' }}>
          <Box component="span" sx={{ color: '#0ea5e9' }}>NILSWA</Box> Enterprise
        </Typography>
      </Toolbar>
      
      <List sx={{ pt: 1, px: 2 }}>
        {menuItems.map((item, index) => {
          const isActive = index === 0;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton 
                onClick={item.onClick}
                sx={{ 
                  py: 1, 
                  px: 1.5, 
                  borderRadius: 1.5,
                  backgroundColor: isActive ? '#f0f9ff' : 'transparent',
                  color: isActive ? '#0ea5e9' : '#475569',
                  '&:hover': { backgroundColor: isActive ? '#f0f9ff' : '#f8fafc' } 
                }}
              >
                <ListItemIcon sx={{ color: isActive ? '#0ea5e9' : '#64748b', minWidth: 32 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} slotProps={{ primary: { sx: { fontWeight: isActive ? 600 : 500, fontSize: '0.85rem' } } }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      
      <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 2 }}>
        <Divider sx={{ borderColor: '#e2e8f0', mb: 2 }} />
        <Button 
          fullWidth 
          variant="text" 
          startIcon={<LogoutIcon sx={{ fontSize: 18 }} />} 
          onClick={handleLogout}
          sx={{ 
            color: '#64748b', 
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.85rem',
            justifyContent: 'flex-start',
            px: 1.5,
            py: 1,
            '&:hover': { backgroundColor: '#f1f5f9', color: '#0f172a' }
          }}
        >
          Sign Out
        </Button>
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
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          color: '#0f172a',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <Toolbar sx={{ minHeight: '64px !important' }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="subtitle1" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 700, color: '#0f172a' }}>
            Dashboard Overview
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Button 
              onClick={() => setSearchOpen(true)}
              sx={{ 
                display: { xs: 'none', md: 'flex' }, 
                textTransform: 'none', 
                color: '#64748b', 
                backgroundColor: '#f1f5f9', 
                borderRadius: 4, 
                px: 2, 
                py: 0.5,
                fontSize: '0.8rem',
                mr: 2,
                '&:hover': { backgroundColor: '#e2e8f0' }
              }}
            >
              <SearchIcon sx={{ fontSize: 16, mr: 1 }} />
              Search services (Ctrl+F)
            </Button>
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#475569', display: { xs: 'none', md: 'block' }, fontSize: '0.8rem' }}>
              Admin User
            </Typography>
            <Avatar sx={{ bgcolor: '#0ea5e9', width: 32, height: 32, fontWeight: 600, fontSize: '0.9rem' }}>A</Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: '64px' }}>
        
        {/* KPI Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2, mb: 4 }}>
          {['Active Instances', 'Total Storage', 'Bandwidth Usage', 'Health Status'].map((title, i) => (
            <Box key={title}>
              <Paper elevation={0} sx={{ 
                p: 2.5, 
                borderRadius: 3, 
                backgroundColor: '#ffffff',
                border: '1px solid #f1f5f9',
                boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.05)',
                display: 'flex', 
                flexDirection: 'column' 
              }}>
                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {title}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
                  {i === 0 ? '12' : i === 1 ? '4.2 TB' : i === 2 ? '890 GB' : '99.9%'}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>

        {/* Charts & Activity */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
          <Box>
            <Paper elevation={0} sx={{ 
              p: 3, 
              borderRadius: 3, 
              backgroundColor: '#ffffff',
              border: '1px solid #f1f5f9',
              boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.05)',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#0f172a' }}>Resource Utilization</Typography>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                flexGrow: 1, 
                backgroundColor: '#f8fafc', 
                borderRadius: 2,
                border: '1px dashed #cbd5e1'
              }}>
                <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500 }}>Interactive Chart Area</Typography>
              </Box>
            </Paper>
          </Box>
          <Box>
            <Paper elevation={0} sx={{ 
              p: 3, 
              borderRadius: 3, 
              backgroundColor: '#ffffff',
              border: '1px solid #f1f5f9',
              boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.05)',
              minHeight: '300px' 
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#0f172a' }}>Recent Activity</Typography>
              <List disablePadding>
                {[
                  { action: 'Instance deployed in ap-northeast-1', time: '2 mins ago' },
                  { action: 'Daily Backup completed', time: '1 hour ago' },
                  { action: 'MFA Verified for Admin', time: '3 hours ago' },
                  { action: 'New API Key generated', time: '5 hours ago' },
                ].map((log, i) => (
                  <React.Fragment key={i}>
                    <ListItem alignItems="flex-start" sx={{ px: 0, py: 1.5 }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#0ea5e9', mt: 1, mr: 1.5 }} />
                      <ListItemText
                        primary={log.action}
                        secondary={log.time}
                        slotProps={{
                          primary: { sx: { fontWeight: 600, fontSize: '0.85rem', color: '#334155' } },
                          secondary: { sx: { fontSize: '0.75rem', mt: 0.25, color: '#94a3b8' } }
                        }}
                      />
                    </ListItem>
                    {i < 3 && <Divider sx={{ borderColor: '#f1f5f9' }} />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Box>
        </Box>
      </Box>

      {/* Windows 11 Style Start Menu Overlay */}
      <Dialog 
        open={searchOpen} 
        onClose={() => setSearchOpen(false)}
        TransitionComponent={Fade}
        PaperProps={{
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
        }}
      >
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: { xs: '70vh', md: '600px' } }}>
          {/* Search Bar */}
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
              <Button size="small" sx={{ color: '#ccc', textTransform: 'none', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                All <Box component="span" sx={{ ml: 0.5, fontSize: '0.7rem' }}>›</Box>
              </Button>
            </Box>

            {/* Apps Grid */}
            <Grid container spacing={2}>
              {filteredServices.map((service, i) => (
                <Grid size={{ xs: 4, sm: 3, md: 2 }} key={i}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    p: 1.5,
                    borderRadius: 2,
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' }
                  }}>
                    <Box sx={{ 
                      width: 48, 
                      height: 48, 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center',
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      mb: 1
                    }}>
                      {service.icon}
                    </Box>
                    <Typography align="center" sx={{ fontSize: '0.75rem', color: '#ccc', lineHeight: 1.2 }}>
                      {service.name}
                    </Typography>
                  </Box>
                </Grid>
              ))}
              {filteredServices.length === 0 && (
                <Grid size={12}>
                  <Typography sx={{ color: '#888', textAlign: 'center', py: 4 }}>No services found.</Typography>
                </Grid>
              )}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 5, mb: 2 }}>
              <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>Recommended</Typography>
              <Button size="small" sx={{ color: '#ccc', textTransform: 'none', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                More <Box component="span" sx={{ ml: 0.5, fontSize: '0.7rem' }}>›</Box>
              </Button>
            </Box>
            
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', p: 1, borderRadius: 2, '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' } }}>
                  <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.1)', width: 36, height: 36, mr: 2, borderRadius: 1 }} variant="rounded">
                    <AssessmentIcon fontSize="small" sx={{ color: '#ccc' }} />
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>Usage Report 2026</Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#888' }}>Recently added</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', p: 1, borderRadius: 2, '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' } }}>
                  <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.1)', width: 36, height: 36, mr: 2, borderRadius: 1 }} variant="rounded">
                    <SettingsIcon fontSize="small" sx={{ color: '#ccc' }} />
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>System Config</Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#888' }}>You open this often</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Bottom Bar (User Profile & Power) */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mt: 2, 
            pt: 2, 
            borderTop: '1px solid rgba(255,255,255,0.1)' 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', p: 1, borderRadius: 2, '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' } }}>
              <Avatar sx={{ width: 32, height: 32, mr: 1.5, fontSize: '0.9rem' }}>A</Avatar>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>Admin User</Typography>
            </Box>
            <IconButton 
              onClick={handleLogout}
              sx={{ color: '#ccc', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' } }}
            >
              <PowerSettingsNewIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
