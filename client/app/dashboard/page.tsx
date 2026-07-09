'use client';

import React, { useState } from 'react';
import { 
  Box, Typography, Drawer, List, ListItem, ListItemButton, 
  ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, 
  Avatar, Paper, Divider, Button
} from '@mui/material';
import { useRouter } from 'next/navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorageIcon from '@mui/icons-material/Storage';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AssessmentIcon from '@mui/icons-material/Assessment';

const drawerWidth = 260;

export default function DashboardPage() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('nilswa_auth_token');
    router.push('/login');
  };

  const menuItems = [
    { text: 'Overview', icon: <DashboardIcon /> },
    { text: 'Compute', icon: <CloudQueueIcon /> },
    { text: 'Storage', icon: <StorageIcon /> },
    { text: 'Analytics', icon: <AssessmentIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
  ];

  const drawer = (
    <Box sx={{ backgroundColor: '#ffffff', height: '100%', color: '#334155', borderRight: '1px solid #e2e8f0' }}>
      <Toolbar sx={{ px: 3, py: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '0.5px', color: '#0f172a' }}>
          <Box component="span" sx={{ color: '#0ea5e9' }}>NILSWA</Box> Enterprise
        </Typography>
      </Toolbar>
      
      <List sx={{ pt: 2, px: 2 }}>
        {menuItems.map((item, index) => {
          const isActive = index === 0;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton sx={{ 
                py: 1.5, 
                px: 2, 
                borderRadius: 2,
                backgroundColor: isActive ? '#f0f9ff' : 'transparent',
                color: isActive ? '#0ea5e9' : '#475569',
                '&:hover': { backgroundColor: isActive ? '#f0f9ff' : '#f8fafc' } 
              }}>
                <ListItemIcon sx={{ color: isActive ? '#0ea5e9' : '#64748b', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} slotProps={{ primary: { sx: { fontWeight: isActive ? 600 : 500 } } }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      
      <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 3 }}>
        <Divider sx={{ borderColor: '#e2e8f0', mb: 3 }} />
        <Button 
          fullWidth 
          variant="text" 
          startIcon={<LogoutIcon />} 
          onClick={handleLogout}
          sx={{ 
            color: '#64748b', 
            textTransform: 'none',
            fontWeight: 600,
            justifyContent: 'flex-start',
            px: 2,
            py: 1.5,
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
        <Toolbar sx={{ height: 72 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 700, color: '#0f172a' }}>
            Dashboard Overview
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', display: { xs: 'none', md: 'block' } }}>
              Admin User
            </Typography>
            <Avatar sx={{ bgcolor: '#0ea5e9', width: 40, height: 40, fontWeight: 600 }}>A</Avatar>
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
      
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 3, md: 5 }, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: '72px' }}>
        
        {/* KPI Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 5 }}>
          {['Active Instances', 'Total Storage', 'Bandwidth Usage', 'Health Status'].map((title, i) => (
            <Box key={title}>
              <Paper elevation={0} sx={{ 
                p: 3, 
                borderRadius: 4, 
                backgroundColor: '#ffffff',
                border: '1px solid #f1f5f9',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
                display: 'flex', 
                flexDirection: 'column' 
              }}>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, mb: 1, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {title}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
                  {i === 0 ? '12' : i === 1 ? '4.2 TB' : i === 2 ? '890 GB' : '99.9%'}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>

        {/* Charts & Activity */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4 }}>
          <Box>
            <Paper elevation={0} sx={{ 
              p: 4, 
              borderRadius: 4, 
              backgroundColor: '#ffffff',
              border: '1px solid #f1f5f9',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
              minHeight: '380px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#0f172a' }}>Resource Utilization</Typography>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                flexGrow: 1, 
                backgroundColor: '#f8fafc', 
                borderRadius: 3,
                border: '1px dashed #cbd5e1'
              }}>
                <Typography sx={{ color: '#94a3b8', fontWeight: 500 }}>Interactive Chart Area</Typography>
              </Box>
            </Paper>
          </Box>
          <Box>
            <Paper elevation={0} sx={{ 
              p: 4, 
              borderRadius: 4, 
              backgroundColor: '#ffffff',
              border: '1px solid #f1f5f9',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
              minHeight: '380px' 
            }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#0f172a' }}>Recent Activity</Typography>
              <List disablePadding>
                {[
                  { action: 'Instance deployed in ap-northeast-1', time: '2 mins ago' },
                  { action: 'Daily Backup completed', time: '1 hour ago' },
                  { action: 'MFA Verified for Admin', time: '3 hours ago' },
                  { action: 'New API Key generated', time: '5 hours ago' },
                ].map((log, i) => (
                  <React.Fragment key={i}>
                    <ListItem alignItems="flex-start" sx={{ px: 0, py: 2 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#0ea5e9', mt: 1, mr: 2 }} />
                      <ListItemText
                        primary={log.action}
                        secondary={log.time}
                        slotProps={{
                          primary: { sx: { fontWeight: 600, fontSize: '0.95rem', color: '#334155' } },
                          secondary: { sx: { fontSize: '0.8rem', mt: 0.5, color: '#94a3b8' } }
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
    </Box>
  );
}
