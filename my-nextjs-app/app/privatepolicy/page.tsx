"use client";
import React from 'react';
import { Box, Container, Typography } from "@mui/material";

const PrivatePolicy: React.FC = () => {
  return (
    <Box sx={{ py: 6, backgroundColor: '#f9f9f9' }}>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: "Inter", fontWeight: "bold", color: "#666" }}>
          Privacy Policy
        </Typography>
        <Typography variant="body2" paragraph sx={{ fontFamily: "Inter", color: "#666" }}>
          Welcome to our Privacy Policy. Your privacy is critically important to us. We are committed to protecting the personal information you share with us. This policy outlines how we collect, use, and safeguard your information. By using our services, you consent to the practices described in this policy.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontFamily: "Inter", fontWeight: "bold", color: "#666" }}>
          1. Information We Collect
        </Typography>
        <Typography variant="body2" paragraph sx={{ fontFamily: "Inter", color: "#666" }}>
          We collect information to provide better services to our users. This includes information you provide to us directly and information we collect automatically.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontFamily: "Inter", fontWeight: "bold", color: "#666" }}>
          2. How We Use Information
        </Typography>
        <Typography variant="body2" paragraph sx={{ fontFamily: "Inter", color: "#666" }}>
          We use the information we collect to operate, maintain, and improve our services, and to communicate with you.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontFamily: "Inter", fontWeight: "bold", color: "#666" }}>
          3. Information Sharing
        </Typography>
        <Typography variant="body2" paragraph sx={{ fontFamily: "Inter", color: "#666" }}>
          We do not share your personal information with companies, organizations, or individuals outside of our company except as described in this policy.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontFamily: "Inter", fontWeight: "bold", color: "#666" }}>
          4. Data Security
        </Typography>
        <Typography variant="body2" paragraph sx={{ fontFamily: "Inter", color: "#666" }}>
          We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontFamily: "Inter", fontWeight: "bold", color: "#666" }}>
          5. Contact Us
        </Typography>
        <Typography variant="body2" paragraph sx={{ fontFamily: "Inter", color: "#666" }}>
          If you have any questions about this Privacy Policy, please contact us.
        </Typography>
      </Container>
    </Box>
  );
};

export default PrivatePolicy;
