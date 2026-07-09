'use client';

import React, { useState } from 'react';
import { 
  Box, Typography, Drawer, List, ListItem, ListItemButton, 
  ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, 
  Avatar, Grid, Paper, Divider, Button, CircularProgress
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
    // Basic logout - in real app, clear token/session
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
    <Box sx={{ backgroundColor: '#0f172a', height: '100%', color: '#fff' }}>
      <Toolbar sx={{ px: 2, py: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '1px' }}>
          NILSWA Enterprise
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      <List sx={{ pt: 2 }}>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton sx={{ 
              py: 1.5, 
              px: 3, 
              backgroundColor: index === 0 ? 'rgba(14, 165, 233, 0.15)' : 'transparent',
              borderLeft: index === 0 ? '4px solid #0ea5e9' : '4px solid transparent',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' } 
            }}>
              <ListItemIcon sx={{ color: index === 0 ? '#0ea5e9' : '#94a3b8', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} slotProps={{ primary: { sx: { fontWeight: index === 0 ? 600 : 400, color: index === 0 ? '#fff' : '#cbd5e1' } } }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 2 }}>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2 }} />
        <Button 
          fullWidth 
          variant="outlined" 
          startIcon={<LogoutIcon />} 
          onClick={handleLogout}
          sx={{ 
            color: '#cbd5e1', 
            borderColor: 'rgba(255,255,255,0.2)',
            textTransform: 'none',
            '&:hover': { borderColor: '#fff', color: '#fff' }
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
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#fff',
          color: '#0f172a',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Dashboard Overview
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, display: { xs: 'none', md: 'block' } }}>
              Admin User
            </Typography>
            <Avatar sx={{ bgcolor: '#0ea5e9', width: 36, height: 36 }}>A</Avatar>
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
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {['Active Instances', 'Total Storage', 'Bandwidth Usage', 'Health Status'].map((title, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={title}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 1, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {title}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
                  {i === 0 ? '12' : i === 1 ? '4.2 TB' : i === 2 ? '890 GB' : '99.9%'}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', minHeight: '300px' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Resource Utilization</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', backgroundColor: '#f1f5f9', borderRadius: 2 }}>
                <Typography color="text.secondary">Chart Visualization Placeholder</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', minHeight: '300px' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Recent Activity</Typography>
              <List disablePadding>
                {[
                  { action: 'Instance deployed', time: '2 mins ago' },
                  { action: 'Backup completed', time: '1 hour ago' },
                  { action: 'MFA Verified', time: '3 hours ago' },
                  { action: 'User login', time: '3 hours ago' },
                ].map((log, i) => (
                  <React.Fragment key={i}>
                    <ListItem alignItems="flex-start" sx={{ px: 0, py: 1.5 }}>
                      <ListItemText
                        primary={log.action}
                        secondary={log.time}
                        slotProps={{
                          primary: { sx: { fontWeight: 500, fontSize: '0.9rem' } },
                          secondary: { sx: { fontSize: '0.75rem', mt: 0.5 } }
                        }}
                      />
                    </ListItem>
                    {i < 3 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
