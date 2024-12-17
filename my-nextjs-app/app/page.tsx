// components/LandingPage.tsx
"use client";

import React, { useRef, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import Link from "next/link"
import CheckIcon from "@mui/icons-material/Check";
import SoundBarCard from "./components/SoundbarCard"; // Ensure correct import path
import Testimonial from "./components/testimonial"; // Ensure correct import path and casing
import Features from "./components/features"



const LandingPage: React.FC = () => {
  const testimonialsRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme(); // Access the current theme

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2, // Adjust this threshold as needed
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (testimonialsRef.current) {
        observer.unobserve(testimonialsRef.current);
      }
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  return (
    <Box
      id="instagram"
      sx={{
        minHeight: { xs: "80vh", md: "85vh" },
        overflow: "auto",
        backgroundColor: theme.palette.background.default, // Theme-aware background
        paddingTop: "100px",
        color: theme.palette.text.primary, // Theme-aware text color
      }}
    >
      <Container maxWidth="lg">
        {/* Top Section */}
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
            sx={{
              marginBottom: { xs: 4 },
              textAlign: "left",
              color: theme.palette.text.primary, // Ensure text color adapts
            }}
          >
            <Typography
              component="h2"
              gutterBottom
              sx={{
                fontSize: { xs: "2.25rem", md: "3.5rem" },
                fontFamily: "Inter",
                fontWeight: "light",
                color: theme.palette.text.primary,
                marginBottom: 4,
              }}
            >
              Streamline Your
              <strong style={{ color: theme.palette.secondary.main }}>
                {" "}
                Podcast Production{" "}
              </strong>
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
                  sx={{
                    fontFamily: "Inter",
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                    color: theme.palette.text.primary,
                  }}
                >
                  <Box component="span" sx={{ marginRight: 1 }}>
                    <CheckIcon sx={{ color: theme.palette.secondary.main }} />
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
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
              mt: { xs: 4, md: 0 },
            }}
          >
            <SoundBarCard />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              alignItems: "center",
              mt: { xs: 4, md: 0 },
            }}
          >
            <Button
              component={Link}
              href="/studio"
              variant="contained"
              color="secondary"
              sx={{
                fontFamily: "Inter",
                fontWeight: "bold",
                fontSize: "1.2rem",
                backgroundColor: theme.palette.secondary.main,
                "&:hover": {
                  backgroundColor: theme.palette.secondary.dark,
                },
                textDecoration: "none",
              }}
            >
              Get Started
            </Button>
          </Grid>
        </Grid>

        {/* Spokesperson Video Section */}
        <Box
          sx={{
            marginBottom: { xs: 6, md: 8 },
            padding: { xs: "30px 20px", md: "40px 30px" },
            backgroundColor: theme.palette.background.default,
            borderRadius: "16px",
            boxShadow: theme.shadows[4],
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontFamily: "Inter",
              fontWeight: "bold",
              color: theme.palette.primary.main,
              marginBottom: { xs: 5, md: 6 },
            }}
          >
            Discover Our Product
          </Typography>
          <Box
            component="video"
            src="/videos/aliabdal.mp4"
            controls
            muted
            loop
            autoPlay
            playsInline
            aria-label="Ali Abdal demonstrating podcast production tools"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: "12px",
              boxShadow: theme.shadows[3],
              objectFit: "cover",
            }}
          />
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Inter",
              color: theme.palette.text.secondary,
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Join Ali Abdal as he showcases how our innovative tool can revolutionize your podcast production, delivering studio-quality audio effortlessly.
          </Typography>
        </Box>

        {/* Features Subsection */}
        <Box
          ref={featuresRef}
          sx={{
            marginTop: { xs: 10, md: 10 },
            marginBottom: { xs: 10, md: 10 },
            opacity: 0,
            transform: "translateY(-20px)", // Fade in from the top
            transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
            "&.animate-fade-in": {
              opacity: 1,
              transform: "translateY(0)",
            },
          }}
        >
          <Features />
        </Box>

        {/* Transition to Testimonials Section */}
        <Box
          ref={testimonialsRef}
          sx={{
            marginTop: { xs: 10, md: 10 },
            marginBottom: { xs: 10, md: 10 },
            opacity: 0,
            transform: "scale(0.8)", // Start with a smaller scale
            transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
            "&.animate-fade-in": {
              opacity: 1,
              transform: "scale(1)", // Scale up to normal size
            },
          }}
        >
          <Testimonial />
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
