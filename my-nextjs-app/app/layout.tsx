"use client";
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import Footer from "./components/footer";


import "./globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import "@fontsource/inter"; // Defaults to weight 400


const theme = createTheme({
  palette: {
    primary: { main: "#FFFFFF" },
    secondary: { main: "#0096FF" },
  },
  typography: {
    fontFamily: "ITC Galliard Roman, Georgia, Inter, serif",
  },
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <AppBar position='fixed' sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}>
            <Toolbar>
              <Typography component={Link} href="/" variant="h6" sx={{ flexGrow: 1 }}>
                <Box
                  component="img"
                  src="/images/logo-transparent-png.png"
                  alt="Logo"
                  sx={{
                    width: { xs: "15%", md: "75px" },
                    height: "auto",
                  }}
                />
              </Typography>
              {/* Hamburger Menu for Mobile */}
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleMenuOpen}
                sx={{ display: { xs: "block", md: "none" } }} // Visible only on mobile
              >
                <MenuIcon />
              </IconButton>
              {/* Desktop Buttons */}
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Button style={{ color: "#000000" }} sx={{ fontFamily: "Inter", }}>
                  Features
                </Button>
                <Button style={{ color: "#000000" }} sx={{ fontFamily: "Inter", }}>
                  Pricing
                </Button>
                <Button style={{ color: "#000000" }} sx={{ fontFamily: "Inter", }}>
                  <strong>API</strong>
                </Button>

              </Box>
            </Toolbar>
          </AppBar>
          {/* Drawer for Mobile */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{
              display: { xs: "block", md: "none" },
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Soft shadow
              borderRadius: "8px", // Rounded corners
              padding: "10px", // Padding around the menu
            }}
          >

            <MenuItem onClick={handleMenuClose} color="inherit" component={Link} href="/" sx={{
              fontFamily: "Inter",
              fontSize: "1.1rem",
              color: "#000000",
              '&:hover': {
                backgroundColor: "#e0e0e0",
              },
            }}>
              <strong>Features</strong>
            </MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{
              fontFamily: "Inter",
              fontSize: "1.1rem",
              color: "#000000",
              '&:hover': {
                backgroundColor: "#e0e0e0",
              },
            }}>
              <strong>Pricing</strong>
            </MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{
              fontFamily: "Inter",
              fontSize: "1.1rem",
              color: "#000000",
              '&:hover': {
                backgroundColor: "#e0e0e0",
              },
            }}>
              <strong>API</strong>
            </MenuItem>

          </Menu>

          {children}
          <Footer />

        </ThemeProvider>
      </body>
    </html >
  );
}
