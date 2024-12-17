// components/Testimonial.tsx
"use client";

import React from "react";
import { Box, Typography, Grid, Paper, Avatar, useTheme } from "@mui/material";

// Dummy data for demonstration
const testimonials = [
  {
    name: "Alice Smith",
    content:
      "This product has revolutionized how I produce my podcast. It's intuitive, efficient, and delivers on its promises!",
    avatar: "A",
  },
  {
    name: "Bob Johnson",
    content:
      "A game-changer for any content creator. The noise cancellation feature has been a lifesaver for my recordings.",
    avatar: "B",
  },
  {
    name: "Cathy Brown",
    content:
      "My team and I have been able to streamline our workflow significantly thanks to this tool. Highly recommend it!",
    avatar: "C",
  },
];

const Testimonial: React.FC = () => {
  const testimonialsRef = React.useRef<HTMLDivElement | null>(null);
  const theme = useTheme(); // Access the current theme

  React.useEffect(() => {
    if (!testimonialsRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px",
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
      ref={testimonialsRef}
      sx={{
        background: theme.palette.mode === "light"
          ? `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`
          : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
        borderRadius: "12px",
        padding: { xs: "40px 20px", md: "60px 40px" },
        boxShadow: theme.shadows[3],
        position: "relative",
        overflow: "hidden",
        transition: "background 0.3s ease",
      }}
    >
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        sx={{
          textAlign: "center",
          fontFamily: "Inter",
          fontWeight: "bold",
          marginBottom: { xs: "30px", md: "40px" },
          color: theme.palette.secondary.main, // Theme-aware color
        }}
      >
        Testimonials
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((testimonial, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            sx={{
              // Removed opacity and transform for immediate rendering
              transition: `transform 0.3s, box-shadow 0.3s`,
            }}
          >
            <Paper
              elevation={4}
              sx={{
                padding: { xs: "20px", md: "30px" },
                borderRadius: "12px",
                backgroundColor: theme.palette.background.paper, // Theme-aware background
                boxShadow: theme.shadows[4],
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: theme.shadows[6], // Darker shadow on hover
                },
              }}
            >
              <Grid container direction="column" alignItems="center">
                <Avatar
                  sx={{
                    bgcolor: theme.palette.secondary.main, // Theme-aware avatar color
                    width: 56,
                    height: 56,
                    mb: 3,
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  {testimonial.avatar}
                </Avatar>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  align="center"
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: "medium",
                    color: theme.palette.text.primary, // Theme-aware text color
                    mb: 2,
                  }}
                >
                  {testimonial.content}
                </Typography>
                <Typography
                  variant="body2"
                  display="block"
                  gutterBottom
                  sx={{
                    fontFamily: "Inter",
                    color: theme.palette.secondary.main, // Theme-aware text color
                  }}
                >
                  - {testimonial.name}
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonial;
