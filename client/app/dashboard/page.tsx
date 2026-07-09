'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Drawer, List, ListItem, ListItemButton, 
  ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, 
  Avatar, Paper, Divider, Button, Dialog, InputBase, Grid, Fade, Badge,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
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
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SensorsIcon from '@mui/icons-material/Sensors';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WebIcon from '@mui/icons-material/Web';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DnsIcon from '@mui/icons-material/Dns';

const drawerWidthExpanded = 240;
const drawerWidthCollapsed = 72;

export default function DashboardPage() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [billingData, setBillingData] = useState<any>(null);

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
    // Check auth
    const token = localStorage.getItem('nilswa_auth_token');
    if (!token) {
      router.push('/login');
      return;
    }
    const ackNumber = localStorage.getItem('nilswa_ack_number');

    const fetchBilling = async () => {
      try {
        const res = await fetch(`https://nilswa-server.vercel.app/api/v1/billing/${ackNumber}`);
        if (res.ok) {
          const data = await res.json();
          setBillingData(data);
        }
      } catch (err) {
        console.error("Failed to fetch billing", err);
      }
    };
    if (ackNumber) {
      fetchBilling();
    }
  }, [router]);

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
        { text: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: 20 }} />, active: true }
      ]
    },
    {
      title: 'SERVICES',
      items: [
        { text: 'Crew CRM', icon: <FlightIcon sx={{ fontSize: 20 }} />, active: false, onClick: () => setSearchOpen(true) },
        { text: 'Alcohol Check', icon: <LocalHospitalIcon sx={{ fontSize: 20 }} />, active: false, onClick: () => setSearchOpen(true) },
        { text: 'Real Estate', icon: <WorkIcon sx={{ fontSize: 20 }} />, active: false, onClick: () => setSearchOpen(true) },
      ]
    },
    {
      title: 'ACCOUNT',
      items: [
        { text: 'Billing and Cost Management', icon: <AccountBalanceWalletIcon sx={{ fontSize: 20 }} />, active: false }
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
              {section.items.map((item) => (
                <ListItem key={item.text} disablePadding sx={{ mb: 0.5, px: collapsed ? 0 : 2 }}>
                  <ListItemButton 
                    onClick={'onClick' in item ? (item as any).onClick : undefined}
                    sx={{ 
                      py: 1, 
                      px: collapsed ? 0 : 2, 
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      borderRadius: collapsed ? 1.5 : 1,
                      backgroundColor: item.active ? '#eff6ff' : 'transparent',
                      color: item.active ? '#1d4ed8' : '#64748b',
                      borderLeft: item.active && !collapsed ? '3px solid #3b82f6' : '3px solid transparent',
                      '&:hover': { backgroundColor: item.active ? '#eff6ff' : '#f8fafc' } 
                    }}
                  >
                    <ListItemIcon sx={{ color: item.active ? '#3b82f6' : '#94a3b8', minWidth: collapsed ? 'auto' : 36, display: 'flex', justifyContent: 'center' }}>
                      {item.icon}
                    </ListItemIcon>
                    {!collapsed && (
                      <ListItemText primary={item.text} slotProps={{ primary: { sx: { fontWeight: item.active ? 600 : 500, fontSize: '0.85rem' } } }} />
                    )}
                  </ListItemButton>
                </ListItem>
              ))}
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
              Dashboard
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
            <Typography sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Dashboard</Typography>
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
      
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: '112px', transition: 'width 0.2s' }}>
        
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 0.5 }}>
              Billing and Cost Management
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              Manage your daily cloud costs based on active service modules and users.
            </Typography>
          </Box>
        </Box>

        {/* Total Cost KPI */}
        <Box sx={{ mb: 4 }}>
          <Paper elevation={0} sx={{ 
            p: 3, 
            borderRadius: '12px', 
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: 3
          }}>
            <Box sx={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AccountBalanceWalletIcon sx={{ fontSize: 32, color: '#3b82f6' }} />
            </Box>
            <Box>
              <Typography sx={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', mb: 0.5 }}>
                Estimated Daily Bill
              </Typography>
              <Typography sx={{ color: '#0f172a', fontSize: '2.5rem', fontWeight: 800, lineHeight: 1 }}>
                ${billingData ? billingData.total_daily_cost.toFixed(2) : '0.00'}
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Billing Table */}
        <Paper elevation={0} sx={{ borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: '#64748b' }}>Service Name</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: '#64748b' }}>Active Users</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: '#64748b' }}>Price / User / Day</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: '#64748b' }}>Total Daily Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {billingData && billingData.services.length > 0 ? (
                  billingData.services.map((service: any, idx: number) => (
                    <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 500, color: '#0f172a' }}>
                        {service.service_name}
                      </TableCell>
                      <TableCell align="center">{service.active_users}</TableCell>
                      <TableCell align="right">${service.price_per_user_per_day.toFixed(2)}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>${service.total_daily_cost.toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 4, color: '#64748b' }}>
                      {billingData ? 'No active services.' : 'Loading billing details...'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* Windows 11 Style Start Menu Overlay (Triggered by Ctrl+F or My Portal) */}
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
              {[
                { name: 'Crew CRM', icon: <FlightIcon sx={{ color: '#3b82f6', fontSize: 32 }} /> },
                { name: 'Alcohol Check', icon: <LocalHospitalIcon sx={{ color: '#10b981', fontSize: 32 }} /> },
                { name: 'Real Estate CRM', icon: <WorkIcon sx={{ color: '#f59e0b', fontSize: 32 }} /> }
              ].filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).map((service, i) => (
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
