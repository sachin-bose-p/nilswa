'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, List, ListItem, ListItemButton, ListItemText, 
  Switch, Button, Paper, Grid, Divider, CircularProgress
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditIcon from '@mui/icons-material/Edit';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function BillingPage() {
  const [billingData, setBillingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };
    if (ackNumber) {
      fetchBilling();
    } else {
      setLoading(false);
    }
  }, []);

  const mtdCost = billingData ? billingData.total_daily_cost * 15 : 1.55;
  const forecastedCost = billingData ? billingData.total_daily_cost * 30 : 3.28;
  const lastMonthCost = billingData ? (billingData.total_daily_cost * 30 * 0.3) : 0.99;
  const lastMonthSamePeriod = billingData ? (billingData.total_daily_cost * 15 * 0.1) : 0.15;

  return (
    <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 112px)', backgroundColor: '#ffffff' }}>
      
      {/* Secondary Sidebar (AWS Style) */}
      <Box sx={{ width: 250, borderRight: '1px solid #eaeded', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#16191f', mb: 2 }}>
            Billing and Cost Management
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Switch size="small" defaultChecked color="primary" />
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, ml: 1, color: '#16191f' }}>
              Billing View
            </Typography>
            <Typography sx={{ fontSize: '0.7rem', color: '#0073bb', ml: 1, cursor: 'pointer' }}>New</Typography>
          </Box>
        </Box>
        <Divider sx={{ borderColor: '#eaeded' }} />
        
        <Box sx={{ flexGrow: 1, overflowY: 'auto', py: 1 }}>
          <List dense disablePadding>
            <ListItem disablePadding>
              <ListItemButton selected sx={{ borderLeft: '3px solid #e47f00', backgroundColor: '#f2f8fd !important' }}>
                <ListItemText primary="Home" slotProps={{ primary: { sx: { fontWeight: 700, fontSize: '0.85rem', color: '#0073bb' } } }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding><ListItemButton><ListItemText primary="Getting Started" slotProps={{ primary: { sx: { fontSize: '0.85rem', color: '#545b64' } } }} /></ListItemButton></ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Dashboards" slotProps={{ primary: { sx: { fontSize: '0.85rem', color: '#545b64' } } }} />
                <Typography sx={{ fontSize: '0.7rem', color: '#0073bb' }}>New</Typography>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="FinOps Agent" slotProps={{ primary: { sx: { fontSize: '0.85rem', color: '#545b64' } } }} />
                <Typography sx={{ fontSize: '0.7rem', color: '#0073bb' }}>Preview</Typography>
              </ListItemButton>
            </ListItem>
          </List>

          <Typography sx={{ px: 2, pt: 2, pb: 1, fontWeight: 700, fontSize: '0.85rem', color: '#16191f' }}>
            Billing and Payments
          </Typography>
          <List dense disablePadding>
            {['Bills', 'Payments', 'Credits', 'Purchase Orders'].map(text => (
              <ListItem key={text} disablePadding><ListItemButton><ListItemText primary={text} slotProps={{ primary: { sx: { fontSize: '0.85rem', color: '#545b64' } } }} /></ListItemButton></ListItem>
            ))}
          </List>

          <Typography sx={{ px: 2, pt: 2, pb: 1, fontWeight: 700, fontSize: '0.85rem', color: '#16191f' }}>
            Cost and Usage Analysis
          </Typography>
          <List dense disablePadding>
            {['Cost Explorer', 'Cost Explorer Saved Reports'].map(text => (
              <ListItem key={text} disablePadding><ListItemButton><ListItemText primary={text} slotProps={{ primary: { sx: { fontSize: '0.85rem', color: '#545b64' } } }} /></ListItemButton></ListItem>
            ))}
          </List>
        </Box>
      </Box>

      {/* Main Content (AWS Style) */}
      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, backgroundColor: '#f2f4f8' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#16191f', mr: 1 }}>
              Billing and Cost Management home
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#0073bb', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              Info
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" size="small" sx={{ color: '#0073bb', borderColor: '#0073bb', textTransform: 'none', borderRadius: '20px', fontWeight: 600 }}>
              Provide feedback
            </Button>
            <Button variant="outlined" size="small" sx={{ color: '#0073bb', borderColor: '#0073bb', textTransform: 'none', borderRadius: '20px', fontWeight: 600 }}>
              Need help? Ask Q ✨
            </Button>
            <Button variant="outlined" size="small" sx={{ color: '#0073bb', borderColor: '#0073bb', textTransform: 'none', borderRadius: '20px', fontWeight: 600 }}>
              Reset layout
            </Button>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {/* Cost Summary */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Paper elevation={0} sx={{ p: 0, borderRadius: '8px', border: '1px solid #eaeded', overflow: 'hidden' }}>
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eaeded' }}>
                  <DashboardIcon sx={{ color: '#545b64', fontSize: 18, mr: 1 }} />
                  <Typography sx={{ fontWeight: 700, color: '#16191f', fontSize: '1.1rem' }}>Cost summary</Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: '#0073bb', cursor: 'pointer', ml: 1 }}>Info</Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={4}>
                    <Grid size={{ xs: 6 }}>
                      <Box sx={{ mb: 4 }}>
                        <Typography sx={{ color: '#545b64', fontSize: '0.85rem', mb: 0.5 }}>Month-to-date cost</Typography>
                        <Typography sx={{ color: '#0073bb', fontSize: '1.5rem', fontWeight: 700, lineHeight: 1 }}>
                          ${mtdCost.toFixed(2)}
                        </Typography>
                        <Typography sx={{ color: '#545b64', fontSize: '0.75rem', mt: 1 }}>
                          <span style={{ color: '#d13212' }}>↑ 931%</span> compared to last month for same period
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ color: '#545b64', fontSize: '0.85rem', mb: 0.5 }}>Total forecasted cost for current month</Typography>
                        <Typography sx={{ color: '#0073bb', fontSize: '1.5rem', fontWeight: 700, lineHeight: 1 }}>
                          ${forecastedCost.toFixed(2)}
                        </Typography>
                        <Typography sx={{ color: '#545b64', fontSize: '0.75rem', mt: 1 }}>
                          <span style={{ color: '#d13212' }}>↑ 233%</span> compared to last month's total costs
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Box sx={{ mb: 4 }}>
                        <Typography sx={{ color: '#545b64', fontSize: '0.85rem', mb: 0.5 }}>Last month's cost for same time period</Typography>
                        <Typography sx={{ color: '#0073bb', fontSize: '1.5rem', fontWeight: 700, lineHeight: 1 }}>
                          ${lastMonthSamePeriod.toFixed(2)}
                        </Typography>
                        <Typography sx={{ color: '#545b64', fontSize: '0.75rem', mt: 1 }}>Jun 1 - 9</Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ color: '#545b64', fontSize: '0.85rem', mb: 0.5 }}>Last month's total cost</Typography>
                        <Typography sx={{ color: '#0073bb', fontSize: '1.5rem', fontWeight: 700, lineHeight: 1 }}>
                          ${lastMonthCost.toFixed(2)}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ borderTop: '1px solid #eaeded', p: 1.5, display: 'flex', justifyContent: 'center' }}>
                  <Typography sx={{ color: '#0073bb', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
                    View bill
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Cost Monitor */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper elevation={0} sx={{ p: 0, borderRadius: '8px', border: '1px solid #eaeded', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eaeded' }}>
                  <DashboardIcon sx={{ color: '#545b64', fontSize: 18, mr: 1 }} />
                  <Typography sx={{ fontWeight: 700, color: '#16191f', fontSize: '1.1rem' }}>Cost monitor</Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: '#0073bb', cursor: 'pointer', ml: 1 }}>Info</Typography>
                </Box>
                <Box sx={{ p: 3, flexGrow: 1 }}>
                  <Box sx={{ mb: 3 }}>
                    <Typography sx={{ color: '#545b64', fontSize: '0.85rem', mb: 0.5 }}>Budgets status</Typography>
                    <Typography sx={{ color: '#0073bb', fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                      <InfoOutlinedIcon sx={{ fontSize: 18, mr: 0.5 }} /> Setup required
                    </Typography>
                    <Typography sx={{ color: '#545b64', fontSize: '0.75rem' }}>No budget created</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ color: '#545b64', fontSize: '0.85rem', mb: 0.5 }}>Cost anomalies status (MTD)</Typography>
                    <Typography sx={{ color: '#945c00', fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                      <WarningAmberIcon sx={{ fontSize: 20, mr: 0.5 }} /> 2 detected
                    </Typography>
                    <Typography sx={{ color: '#0073bb', fontSize: '0.75rem', cursor: 'pointer' }}>1 monitor(s) active</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Cost breakdown */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={0} sx={{ p: 0, borderRadius: '8px', border: '1px solid #eaeded', minHeight: '200px' }}>
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eaeded' }}>
                  <DashboardIcon sx={{ color: '#545b64', fontSize: 18, mr: 1 }} />
                  <Typography sx={{ fontWeight: 700, color: '#16191f', fontSize: '1.1rem' }}>Cost breakdown</Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: '#0073bb', cursor: 'pointer', ml: 1 }}>Info</Typography>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Typography sx={{ color: '#16191f', fontSize: '0.85rem', fontWeight: 700, mb: 1 }}>Group costs by</Typography>
                  <Box sx={{ p: 1, border: '1px solid #879196', borderRadius: '4px', width: 'fit-content', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <Typography sx={{ fontSize: '0.85rem', mr: 2 }}>Service</Typography>
                  </Box>
                  {/* Chart Placeholder */}
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                     <Typography sx={{ color: '#545b64', fontSize: '0.85rem' }}>Loading cost data...</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Recommended actions */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={0} sx={{ p: 0, borderRadius: '8px', border: '1px solid #eaeded', minHeight: '200px' }}>
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eaeded' }}>
                  <DashboardIcon sx={{ color: '#545b64', fontSize: 18, mr: 1 }} />
                  <Typography sx={{ fontWeight: 700, color: '#16191f', fontSize: '1.1rem' }}>Recommended actions (4)</Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: '#0073bb', cursor: 'pointer', ml: 1 }}>Info</Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Box sx={{ border: '1px solid #f5b041', backgroundColor: '#fcf3e3', p: 2, borderRadius: '4px' }}>
                    <Typography sx={{ color: '#945c00', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
                      <WarningAmberIcon sx={{ mr: 1, fontSize: 18 }} /> Review anomalies
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}
