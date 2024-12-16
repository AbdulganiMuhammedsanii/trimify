"use client";
import React, { useRef, useEffect } from 'react';
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check"
import SoundBarCard from './components/SoundbarCard';
import Testimonial from './components/testimonial'
// Dummy data for demonstration


// Keyframes for fade-in animation


const LandingPage: React.FC = () => {
  const testimonialsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!testimonialsRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2, // Adjust this threshold as needed
      }
    );

    observer.observe(testimonialsRef.current);

    return () => {
      if (testimonialsRef.current) {
        observer.unobserve(testimonialsRef.current);
      }
    };
  }, []);

  return (
    <Box
      id="instagram"
      sx={{
        minHeight: { xs: '80vh', md: '85vh' },
        overflow: 'auto',
        backgroundColor: '#FFFFFF',
        paddingTop: '100px',
        transition: 'background 1s ease-in-out',
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          alignItems="flex-start"
          sx={{ marginBottom: { xs: 4, md: 10 } }}
        >
          <Grid
            item
            xs={12}
            md={8}
            color="secondary"
            sx={{ marginBottom: { xs: 4 }, textAlign: 'left' }}
          >
            <Typography
              component="h2"
              gutterBottom
              sx={{
                fontSize: { xs: "2.25rem", md: "3.5rem" },
                fontFamily: "Inter",
                fontWeight: 'light',
                color: "#000000",
                marginBottom: 4,
              }}
            >
              Streamline Your
              <strong style={{ color: "#0096FF" }}> Podcast Production </strong>
              with Our Distraction-Free Cleaner
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", padding: 0 }}>
              {[
                "Automatically removes filler words, silences gaps, and reduces background noise.",
                "Access and manage your podcasts from anywhere with cloud-based tools.",
                "User-friendly design tailored for creators.",
                "Achieve studio-grade sound effortlessly.",
                "Seamless API Integration.",
              ].map((text, i) => (
                <Typography
                  key={i}
                  component="li"
                  variant="body1"
                  style={{ color: "#000000" }}
                  sx={{
                    fontFamily: "Inter",
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Box component="span" sx={{ marginRight: 1 }}>
                    <CheckIcon style={{ color: "#000000" }} />
                  </Box>
                  {text}
                </Typography>
              ))}
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
              mt: { xs: 4, md: 0 },
            }}
          >
            <SoundBarCard />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
          >
            <Button
              variant="contained"
              color="secondary"
              sx={{
                fontFamily: "Inter",
                fontWeight: "bold",
                fontSize: "1.2rem",
                backgroundColor: "#0096FF",
                '&:hover': { backgroundColor: "#007ACC" }
              }}
            >
              Get Started
            </Button>
          </Grid>
        </Grid>

        {/* Transition to Testimonials Section */}
        <Testimonial />
      </Container>
    </Box>
  );
}

export default LandingPage;
