"use client"
import { Box, Container, Grid, Typography, Link } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const footer: React.FC = () => {
  return (
    <Box sx={{ py: 4, backgroundColor: 'primary.main', color: 'white' }}>
      <Container maxWidth="lg">
        <Grid container spacing={1} sx={{ justifyContent: { md: 'flex-start' }, alignItems: { md: 'flex-end' } }}>
          <Grid item xs={6} md={3}>
            <Typography variant="body2" style={{ color: "#808080" }} sx={{ textDecorationColor: 'grey.100', display: 'block' }}>
              All rights reserved © 2024 Trimify
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Link href="/privatepolicy" variant="body2" style={{ color: "#808080" }} sx={{ display: 'block', textDecorationColor: 'grey.100' }}>
              Private Policy
            </Link>
          </Grid>
          <Grid item xs={6} md={3}>
            <Link href="/tos" variant="body2" style={{ color: "#808080" }} sx={{ display: 'block', textDecorationColor: 'grey.100' }}>
              Terms of Service
            </Link>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <LinkedInIcon sx={{ width: 24, height: 24, color: '#808080', '&:hover': { color: '#0096FF' } }} />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <TwitterIcon sx={{ width: 24, height: 24, color: '#808080', '&:hover': { color: '#0096FF' } }} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <InstagramIcon sx={{ width: 24, height: 24, color: '#808080', '&:hover': { color: '#0096FF' } }} />
              </a>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default footer;