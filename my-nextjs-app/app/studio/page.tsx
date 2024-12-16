"use client";

import React from 'react';
import { Box, Typography } from '@mui/material';
import FFmpegComponent from '../components/VideoTimelineEditor';

const Studio: React.FC = () => (
  <Box
    sx={{
      maxWidth: 'lg',
      backgroundColor: '#FFFFFF',
      padding: { xs: 3, md: 5 },
      borderRadius: 2,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      margin: 'auto',
      mt: 10,
      textAlign: 'center',
    }}
  >
    <Typography
      variant="h4"
      sx={{
        fontWeight: 700,
        color: '#0096FF',
        mb: 5,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      Welcome to the Video Studio
    </Typography>
    <FFmpegComponent />
  </Box>
);

export default Studio;
