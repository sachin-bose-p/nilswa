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
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
        <Typography sx={{ color: '#64748b', fontSize: '1rem' }}>No data available.</Typography>
      </Box>
    </Box>
  );
}
