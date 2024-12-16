"use client";
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import Footer from "./components/footer";
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
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenuOpen = () => {
    setMobileOpen(true);
  };

  const handleMenuClose = () => {
    setMobileOpen(false);
  };

  const drawerContent = (
    <Box
      sx={{
        width: 180,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to bottom right, #ffffff, #f0f0f0)",
        padding: "20px",
      }}
    >
      <Box
        component="img"
        src="/images/logo-transparent-png.png"
        alt="Logo"
        sx={{
          width: "60px",
          height: "auto",
          marginBottom: "20px",
        }}
      />
      <List sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/studio"
            onClick={handleMenuClose}
            sx={{
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <ListItemText
              primary="Studio"
              primaryTypographyProps={{
                fontFamily: "Inter",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#000000",
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/"
            onClick={handleMenuClose}
            sx={{
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <ListItemText
              primary="Features"
              primaryTypographyProps={{
                fontFamily: "Inter",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#000000",
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={handleMenuClose}
            sx={{
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <ListItemText
              primary="Pricing"
              primaryTypographyProps={{
                fontFamily: "Inter",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#000000",
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={handleMenuClose}
            sx={{
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <ListItemText
              primary="API"
              primaryTypographyProps={{
                fontFamily: "Inter",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#000000",
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <AppBar position='fixed' sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)", backgroundColor: "#fff" }}>
            <Toolbar>
              <Typography component={Link} href="/" variant="h6" sx={{ flexGrow: 1 }}>
                <Box
                  component="img"
                  src="/images/logo-transparent-png.png"
                  alt="Logo"
                  sx={{
                    width: { xs: "12%", md: "60px" },
                    height: "auto",
                  }}
                />
              </Typography>
              {/* Hamburger Menu for Mobile */}
              <IconButton
                edge="start"
                onClick={handleMenuOpen}
                sx={{
                  display: { xs: "block", md: "none" },
                  color: "#000000",
                }}
              >
                <MenuIcon />
              </IconButton>
              {/* Desktop Buttons */}
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Button
                  component={Link}
                  href="/studio"
                  style={{ color: "#000000" }}
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 700,
                    textTransform: "none",
                  }}
                >
                  Studio
                </Button>
                <Button
                  style={{ color: "#000000" }}
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 700,
                    textTransform: "none",
                  }}
                >
                  Features
                </Button>
                <Button
                  style={{ color: "#000000" }}
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 700,
                    textTransform: "none",
                  }}
                >
                  Pricing
                </Button>
                <Button
                  style={{ color: "#000000" }}
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 700,
                    textTransform: "none",
                  }}
                >
                  API
                </Button>
              </Box>
            </Toolbar>
          </AppBar>

          {/* Drawer for Mobile */}
          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                borderTopLeftRadius: "16px",
                borderBottomLeftRadius: "16px",
              },
            }}
          >
            {drawerContent}
          </Drawer>

          <Box sx={{ marginTop: "64px" }}>{children}</Box>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
