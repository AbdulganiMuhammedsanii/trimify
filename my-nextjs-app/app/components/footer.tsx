// components/Footer.tsx
"use client";

import { Box, Container, Grid, Typography, Link, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useTheme } from "@mui/material/styles";

const Footer: React.FC = () => {
  const theme = useTheme(); // Access the current theme

  return (
    <Box
      sx={{
        py: 4,
        backgroundColor: theme.palette.background.paper, // Theme-aware background
        color: theme.palette.text.primary, // Theme-aware text color
        borderTop: `1px solid ${theme.palette.divider}`, // Adaptive border color
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={1}
          sx={{
            justifyContent: { md: "flex-start" },
            alignItems: { md: "flex-end" },
          }}
        >
          {/* Rights Reserved */}
          <Grid item xs={6} md={3}>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary, // Theme-aware text color
                textDecorationColor: theme.palette.text.secondary,
                display: "block",
              }}
            >
              All rights reserved © 2024 Trimify
            </Typography>
          </Grid>

          {/* Private Policy */}
          <Grid item xs={6} md={2}>
            <Link
              href="/privatepolicy"
              variant="body2"
              sx={{
                display: "block",
                textDecorationColor: theme.palette.text.secondary,
                color: theme.palette.text.secondary, // Theme-aware link color
                "&:hover": {
                  color: theme.palette.secondary.main, // Change color on hover
                },
              }}
            >
              Private Policy
            </Link>
          </Grid>

          {/* Terms of Service */}
          <Grid item xs={6} md={3}>
            <Link
              href="/tos"
              variant="body2"
              sx={{
                display: "block",
                textDecorationColor: theme.palette.text.secondary,
                color: theme.palette.text.secondary, // Theme-aware link color
                "&:hover": {
                  color: theme.palette.secondary.main, // Change color on hover
                },
              }}
            >
              Terms of Service
            </Link>
          </Grid>

          {/* Social Media Icons */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
              alignItems: "center",
              mt: { xs: 2, md: 0 },
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              {/* LinkedIn */}
              <IconButton
                component="a"
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: theme.palette.text.secondary, // Theme-aware icon color
                  "&:hover": {
                    color: theme.palette.secondary.main, // Change color on hover
                  },
                }}
              >
                <LinkedInIcon sx={{ width: 24, height: 24 }} />
              </IconButton>

              {/* Twitter */}
              <IconButton
                component="a"
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: theme.palette.text.secondary, // Theme-aware icon color
                  "&:hover": {
                    color: theme.palette.secondary.main, // Change color on hover
                  },
                }}
              >
                <TwitterIcon sx={{ width: 24, height: 24 }} />
              </IconButton>

              {/* Instagram */}
              <IconButton
                component="a"
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: theme.palette.text.secondary, // Theme-aware icon color
                  "&:hover": {
                    color: theme.palette.secondary.main, // Change color on hover
                  },
                }}
              >
                <InstagramIcon sx={{ width: 24, height: 24 }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
