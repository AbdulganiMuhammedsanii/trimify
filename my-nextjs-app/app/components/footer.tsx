"use client"
import { Box, Container, Grid, Typography } from "@mui/material";
/*  make sure to use @mui/material/Link to do the overloading of the variant and link shortcut stuff**/


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
            <Typography variant="body2" style={{ color: "#808080" }} sx={{ textDecorationColor: 'grey.100', display: 'block' }}>
              Private Policy
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="body2" style={{ color: "#808080" }} sx={{ display: 'block', textDecorationColor: 'grey.100' }}>
              Terms of Service
            </Typography>
            {/* Social media icons would go here */}
          </Grid>
        </Grid>
      </Container>
    </Box >

  );
};

export default footer;