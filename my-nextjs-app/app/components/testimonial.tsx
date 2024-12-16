"use client"
import React from 'react';

import { Box, Typography, Grid, Paper, Avatar } from "@mui/material";

// Dummy data for demonstration
const testimonials = [
  {
    name: 'Alice Smith',
    content: 'This product has revolutionized how I produce my podcast. It\'s intuitive, efficient, and delivers on its promises!',
    avatar: 'A',
  },
  {
    name: 'Bob Johnson',
    content: 'A game-changer for any content creator. The noise cancellation feature has been a lifesaver for my recordings.',
    avatar: 'B',
  },
  {
    name: 'Cathy Brown',
    content: 'My team and I have been able to streamline our workflow significantly thanks to this tool. Highly recommend it!',
    avatar: 'C',
  },
];

const Testimonial: React.FC = () => {
  const [inView, setInView] = React.useState(false);
  const testimonialsRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!testimonialsRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
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
      ref={testimonialsRef}
      sx={{
        background: "linear-gradient(135deg, #E0F7FA 0%, #FFFFFF 100%)",
        borderRadius: '12px',
        padding: '60px 40px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 1s ease-out, transform 1s ease-out',
      }}
    >
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        sx={{
          textAlign: 'center',
          fontFamily: "Inter",
          fontWeight: 'bold',
          marginBottom: '40px',
          color: '#0096FF'
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
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 1s ease-out ${0.2 * index}s, transform 1s ease-out ${0.2 * index}s`,
            }}
          >
            <Paper
              elevation={4}
              sx={{
                padding: '30px',
                borderRadius: '12px',
                backgroundColor: '#FFFFFF',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <Grid container direction="column" alignItems="center">
                <Avatar
                  sx={{
                    bgcolor: '#0096FF',
                    width: 56,
                    height: 56,
                    mb: 3,
                    fontFamily: 'Inter',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
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
                    fontWeight: 'medium',
                    color: "#333",
                    mb: 2
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
                    color: "#0096FF"
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
