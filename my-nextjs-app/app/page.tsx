"use client";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check"
import SoundBarCard from './components/SoundbarCard';


const LandingPage: React.FC = () => {
  return (
    <Box id="instagram" sx={{
      height: { xs: '80vh', md: '85vh' }, overflow: 'auto', backgroundColor: '#FFFFFF', paddingTop: '100px' // Adjust this value to match your AppBar height
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-start" sx={{ marginBottom: { xs: 4, md: 10 } }}>
          <Grid item xs={12} md={8} color="secondary" sx={{ marginBottom: { xs: 4 }, textAlign: 'left' }}>
            <Typography component="h2" gutterBottom sx={{
              fontSize: { xs: "2.25rem", md: "3.5rem" },
              fontFamily: "Inter",
              fontWeight: 'light',
              color: "#000000",
              marginBottom: 4,
            }}>
              Streamline Your
              <strong style={{ color: "#0096FF" }}> Podcast Production </strong>with Our Distraction-Free Cleaner
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", padding: 0 }}>
              <Typography component="li" variant="body1" style={{ color: "#000000" }} sx={{ fontFamily: "Inter", display: "flex", alignItems: "center" }}>
                <Box component="span" sx={{ marginRight: 1 }}>
                  <CheckIcon style={{ color: "#000000" }} />
                </Box>
                Automatically removes filler words, silences gaps, and reduces background noise.
              </Typography>
              <Typography component="li" variant="body1" style={{ color: "#000000" }} sx={{ fontFamily: "Inter", display: "flex", alignItems: "center" }}>
                <Box component="span" sx={{ marginRight: 1 }}>
                  <CheckIcon style={{ color: "#000000" }} />
                </Box>
                Access and manage your podcasts from anywhere with cloud-based tools.
              </Typography>
              <Typography component="li" variant="body1" style={{ color: "#000000" }} sx={{ fontFamily: "Inter", display: "flex", alignItems: "center" }}>
                <Box component="span" sx={{ marginRight: 1 }}>
                  <CheckIcon style={{ color: "#000000" }} />
                </Box>
                User-friendly design tailored for creators.
              </Typography>
              <Typography component="li" variant="body1" style={{ color: "#000000" }} sx={{ fontFamily: "Inter", display: "flex", alignItems: "center" }}>
                <Box component="span" sx={{ marginRight: 1 }}>
                  <CheckIcon style={{ color: "#000000" }} />
                </Box>
                Achieve studio-grade sound effortlessly.
              </Typography>
              <Typography component="li" variant="body1" style={{ color: "#000000" }} sx={{ fontFamily: "Inter", display: "flex", alignItems: "center" }}>
                <Box component="span" sx={{ marginRight: 1 }}>
                  <CheckIcon style={{ color: "#000000" }} />
                </Box>
                Seamless API Integration.
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
    </Box >
  );
}

export default LandingPage;
