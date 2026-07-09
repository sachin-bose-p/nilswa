'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StorageIcon from '@mui/icons-material/Storage';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';

export default function DashboardPage() {
  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 0.5 }}>
            Operations Overview
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            Real-time summary of cloud operations, instance status, and storage assignments. Drag to reorder, click gear to resize or theme.
          </Typography>
        </Box>
      </Box>

      {/* KPI Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2, mb: 3 }}>
        {[
          { title: 'ACTIVE INSTANCES', val: '6', sub: 'running & active', color: '#3b82f6', bg: '#eff6ff', icon: <GroupIcon sx={{ color: '#3b82f6' }} /> },
          { title: 'PENDING ALERTS', val: '0', sub: 'awaiting review', color: '#f59e0b', bg: '#fffbeb', icon: <HourglassEmptyIcon sx={{ color: '#f59e0b' }} /> },
          { title: 'TOTAL STORAGE', val: '4.2 TB', sub: 'total allocated', color: '#10b981', bg: '#ecfdf5', icon: <StorageIcon sx={{ color: '#10b981' }} /> },
          { title: 'DEPLOYMENTS', val: '4', sub: 'scheduled tasks', color: '#a855f7', bg: '#faf5ff', icon: <CalendarTodayIcon sx={{ color: '#a855f7' }} /> },
        ].map((card, i) => (
          <Paper key={i} elevation={0} sx={{ 
            p: 2.5, 
            borderRadius: '12px', 
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography sx={{ color: '#94a3b8', fontSize: '0.65rem', fontWeight: 700, mb: 1, letterSpacing: '1px' }}>
                {card.title}
              </Typography>
              <Typography sx={{ fontWeight: 700, color: card.color, fontSize: '1.75rem', lineHeight: 1 }}>
                {card.val}
              </Typography>
              <Typography sx={{ color: '#64748b', fontSize: '0.75rem', mt: 1 }}>
                {card.sub}
              </Typography>
            </Box>
            <Box sx={{ 
              width: 48, height: 48, borderRadius: '50%', backgroundColor: card.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {card.icon}
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Charts & Activity */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
        {/* Widget 1 */}
        <Paper elevation={0} sx={{ 
          p: 3, 
          borderRadius: '12px', 
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          minHeight: '350px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Box>
              <Typography sx={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>Resource Request Status</Typography>
              <Typography sx={{ color: '#64748b', fontSize: '0.75rem', mt: 0.5 }}>Distribution by approval status</Typography>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ color: '#64748b', fontSize: '0.85rem' }}>No request data yet</Typography>
          </Box>
        </Paper>

        {/* Widget 2 */}
        <Paper elevation={0} sx={{ 
          p: 3, 
          borderRadius: '12px', 
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          minHeight: '350px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <DragIndicatorIcon sx={{ color: '#cbd5e1', fontSize: 20, cursor: 'grab' }} />
              <Box>
                <Typography sx={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>Instance Type Breakdown</Typography>
                <Typography sx={{ color: '#64748b', fontSize: '0.75rem', mt: 0.5 }}>Number of instances by category</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <SettingsIcon sx={{ color: '#0f172a', fontSize: 18, cursor: 'pointer' }} />
              <CloseIcon sx={{ color: '#0f172a', fontSize: 18, cursor: 'pointer' }} />
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ color: '#64748b', fontSize: '0.85rem' }}>No instance data yet</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
