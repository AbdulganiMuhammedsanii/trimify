"use client";
import React from 'react';
import { Box, Container, Typography, useTheme } from "@mui/material";

const TermsOfService: React.FC = () => {
  const theme = useTheme(); // Access the current theme

  return (
    <Box sx={{ py: 6, backgroundColor: theme.palette.background.paper }}>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: "Inter", fontWeight: "bold", color: theme.palette.text.primary }}>
          Terms of Service
        </Typography>
        <Typography variant="body2" paragraph sx={{ fontFamily: "Inter", color: theme.palette.text.secondary }}>
          Welcome to our Terms of Service. Please read these terms carefully before using our services. By accessing or using our services, you agree to be bound by these terms. If you do not agree, please do not use our services. We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new terms on our website. You agree to use our services only for lawful purposes and in accordance with these terms. We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever. If you have any questions about these terms, please contact us.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontFamily: "Inter", fontWeight: "bold", color: theme.palette.text.primary }}>
          1. Acceptance of Terms
        </Typography>
        <Typography variant="body2" paragraph sx={{ fontFamily: "Inter", color: theme.palette.text.secondary }}>
          By accessing or using our services, you agree to be bound by these terms. If you do not agree, please do not use our services.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontFamily: "Inter", fontWeight: "bold", color: theme.palette.text.primary }}>
          2. Changes to Terms
        </Typography>
        <Typography variant="body2" paragraph sx={{ fontFamily: "Inter", color: theme.palette.text.secondary }}>
          We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new terms on our website.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontFamily: "Inter", fontWeight: "bold", color: theme.palette.text.primary }}>
          3. Use of Service
        </Typography>
        <Typography variant="body2" paragraph sx={{ fontFamily: "Inter", color: theme.palette.text.secondary }}>
          You agree to use our services only for lawful purposes and in accordance with these terms.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontFamily: "Inter", fontWeight: "bold", color: theme.palette.text.primary }}>
          4. Termination
        </Typography>
        <Typography variant="body2" paragraph sx={{ fontFamily: "Inter", color: theme.palette.text.secondary }}>
          We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontFamily: "Inter", fontWeight: "bold", color: theme.palette.text.primary }}>
          5. Contact Us
        </Typography>
        <Typography variant="body2" paragraph sx={{ fontFamily: "Inter", color: theme.palette.text.secondary }}>
          If you have any questions about these terms, please contact us.
        </Typography>
      </Container>
    </Box>
  );
};

export default TermsOfService;
