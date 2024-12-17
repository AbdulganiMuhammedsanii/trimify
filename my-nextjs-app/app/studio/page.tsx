// components/Studio.tsx
"use client";

import React from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import FFmpegComponent from "../components/VideoTimelineEditor";

const Studio: React.FC = () => {
  const theme = useTheme(); // Access the current theme

  return (
    <Box
      sx={{
        maxWidth: "lg",
        backgroundColor: theme.palette.background.paper, // Theme-aware background
        height: "auto",
        padding: { xs: 3, md: 5 },
        borderRadius: 2,
        margin: "auto",
        mt: 10,
        mb: 50,
        textAlign: "center",
        boxShadow: theme.shadows[3], // Adaptive shadow based on theme
        color: theme.palette.text.primary, // Theme-aware text color
        transition: "background-color 0.3s ease, color 0.3s ease", // Smooth transition
      }}
    >
      <Container>
        <Typography variant="h4" gutterBottom>
          Welcome to the Studio
        </Typography>
        <FFmpegComponent />
      </Container>
    </Box>
  );
};

export default Studio;
