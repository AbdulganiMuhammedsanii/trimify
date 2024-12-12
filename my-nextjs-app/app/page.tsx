"use client";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check"
import SoundBarCard from './components/SoundbarCard';


const LandingPage: React.FC = () => {
  return (
    <Box id="instagram" sx={{
      height: '100vh', overflow: 'auto', backgroundColor: '#FFFFFF', paddingTop: '150px' // Adjust this value to match your AppBar height
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={8} color="secondary" sx={{ textAlign: 'left' }}>
            <Typography variant="h3" component="h2" gutterBottom sx={{
              fontFamily: "Inter",
              fontWeight: "bold",
              color: "#000000",
            }}>
              Streamline Your
              <strong style={{ color: "#0096FF" }}> Podcast Production </strong>with Our Distraction-Free Cleaner
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", padding: 0 }}>
              <Typography component="li" variant="body1" style={{ color: "#000000" }} sx={{ fontFamily: "Inter", display: "flex", alignItems: "center" }}>
                <Box component="span" sx={{ marginRight: 1 }}>
                  <CheckIcon style={{ color: "#000000" }} />
                </Box>
                AI-Powered Audio Cleaning: Automatically removes filler words, silences gaps, and reduces background noise.
              </Typography>
              <Typography component="li" variant="body1" style={{ color: "#000000" }} sx={{ fontFamily: "Inter", display: "flex", alignItems: "center" }}>
                <Box component="span" sx={{ marginRight: 1 }}>
                  <CheckIcon style={{ color: "#000000" }} />
                </Box>
                Seamless API Integration: Easily incorporate our cleaning tools into your existing workflows.
              </Typography>
              <Typography component="li" variant="body1" style={{ color: "#000000" }} sx={{ fontFamily: "Inter", display: "flex", alignItems: "center" }}>
                <Box component="span" sx={{ marginRight: 1 }}>
                  <CheckIcon style={{ color: "#000000" }} />
                </Box>
                Intuitive User Interface: User-friendly design tailored for creators.
              </Typography>
              <Typography component="li" variant="body1" style={{ color: "#000000" }} sx={{ fontFamily: "Inter", display: "flex", alignItems: "center" }}>
                <Box component="span" sx={{ marginRight: 1 }}>
                  <CheckIcon style={{ color: "#000000" }} />
                </Box>
                High-Quality Audio Enhancement: Achieve studio-grade sound effortlessly.
              </Typography>
              <Typography component="li" variant="body1" style={{ color: "#000000" }} sx={{ fontFamily: "Inter", display: "flex", alignItems: "center" }}>
                <Box component="span" sx={{ marginRight: 1 }}>
                  <CheckIcon style={{ color: "#000000" }} />
                </Box>
                Free Trial & Cloud Access: Access and manage your podcasts from anywhere with cloud-based tools.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center', mt: { xs: 4, md: 0 } }}>
            <SoundBarCard />
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Button variant="contained" color="secondary" sx={{ fontFamily: "Inter", fontWeight: "bold", fontSize: "1.2rem" }}>
              Get Started
            </Button>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

export default LandingPage;
