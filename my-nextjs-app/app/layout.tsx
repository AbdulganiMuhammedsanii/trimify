// layout.tsx
"use client";

import React, { useState, useMemo, createContext, useContext, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  CssBaseline,
} from "@mui/material";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Footer from "./components/footer"; // Ensure correct casing
import { ThemeProvider, createTheme, PaletteMode } from "@mui/material/styles";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import "@fontsource/inter";

const ColorModeContext = createContext({ toggleColorMode: () => { } });

export const useColorMode = () => useContext(ColorModeContext);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mode, setMode] = useState<PaletteMode>("dark"); // Initialize as light

  // Function to determine initial theme based on data-theme attribute
  const getInitialMode = () => {
    if (typeof window !== "undefined") {
      const dataTheme = document.documentElement.getAttribute('data-theme');
      if (dataTheme === 'dark') return 'dark';
      if (dataTheme === 'light') return 'light';
      // Fallback to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return 'light'; // Default to light during SSR
  };

  // Initialize theme state based on the data-theme attribute
  useEffect(() => {
    const initialMode = getInitialMode();
    setMode(initialMode);
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          if (typeof window !== "undefined") {
            localStorage.setItem("preferredTheme", newMode);
            document.documentElement.setAttribute('data-theme', newMode);
          }
          return newMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#1976d2" }, // Adjusted for better contrast
          secondary: { main: "#0096FF" },
          background: {
            default: mode === "light" ? "#f5f5f5" : "#121212",
            paper: mode === "light" ? "#ffffff" : "#1E1E1E",
          },
          text: {
            primary: mode === "light" ? "#000000" : "#ffffff",
            secondary: mode === "light" ? "#808080" : "#B0B0B0",
          },
          divider: mode === "light" ? "#e0e0e0" : "#333333",
        },
        typography: {
          fontFamily: "ITC Galliard Roman, Georgia, Inter, serif",
        },
      }),
    [mode]
  );

  const handleMenuOpen = () => {
    setMobileOpen(true);
  };

  const handleMenuClose = () => {
    setMobileOpen(false);
  };

  const drawerContent = (
    <Box
      sx={{
        width: 240, // Adjusted width for better usability
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        background: mode === "light"
          ? "linear-gradient(to bottom right, #ffffff, #f0f0f0)"
          : "linear-gradient(to bottom right, #1E1E1E, #121212)",
      }}
    >
      {/* Close Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={handleMenuClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Logo */}
      <Box
        component="img"
        src="/images/logo-transparent-png.png"
        alt="Logo"
        sx={{
          width: "60px",
          height: "auto",
          marginBottom: "20px",
          alignSelf: "center", // Center the logo
        }}
      />

      {/* Navigation Links */}
      <List sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/studio"
            onClick={handleMenuClose}
            sx={{
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: mode === "light" ? "#e0e0e0" : "#333333",
              },
            }}
          >
            <ListItemText
              primary="Studio"
              primaryTypographyProps={{
                fontFamily: "Inter",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: mode === "light" ? "#000000" : "#ffffff",
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/features"
            onClick={handleMenuClose}
            sx={{
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: mode === "light" ? "#e0e0e0" : "#333333",
              },
            }}
          >
            <ListItemText
              primary="Features"
              primaryTypographyProps={{
                fontFamily: "Inter",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: mode === "light" ? "#000000" : "#ffffff",
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/api"
            onClick={handleMenuClose}
            sx={{
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: mode === "light" ? "#e0e0e0" : "#333333",
              },
            }}
          >
            <ListItemText
              primary="API"
              primaryTypographyProps={{
                fontFamily: "Inter",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: mode === "light" ? "#000000" : "#ffffff",
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
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{
                borderBottom: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                boxShadow: theme.shadows[4],
                // Removed the zIndex override to let MUI handle stacking
                // zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
            >
              <Toolbar>
                <Typography
                  component={Link}
                  href="/"
                  variant="h6"
                  sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
                >
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
                {/* Theme Toggle and Hamburger Menu for Mobile */}
                <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
                  <Tooltip title="Toggle light/dark theme">
                    <IconButton
                      onClick={colorMode.toggleColorMode}
                      color="inherit"
                    >
                      {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                  </Tooltip>
                  <IconButton
                    edge="end"
                    onClick={handleMenuOpen}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
                {/* Navigation Buttons for Desktop */}
                <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
                  <Button
                    component={Link}
                    href="/studio"
                    sx={{
                      color: theme.palette.text.primary,
                      fontFamily: "Inter",
                      fontWeight: 700,
                      textTransform: "none",
                    }}
                  >
                    Studio
                  </Button>
                  <Button
                    component={Link}
                    href="/features"
                    sx={{
                      color: theme.palette.text.primary,
                      fontFamily: "Inter",
                      fontWeight: 700,
                      textTransform: "none",
                    }}
                  >
                    Features
                  </Button>
                  <Button
                    component={Link}
                    href="/pricing"
                    sx={{
                      color: theme.palette.text.primary,
                      fontFamily: "Inter",
                      fontWeight: 700,
                      textTransform: "none",
                    }}
                  >
                    Pricing
                  </Button>
                  <Button
                    component={Link}
                    href="/api"
                    sx={{
                      color: theme.palette.text.primary,
                      fontFamily: "Inter",
                      fontWeight: 700,
                      textTransform: "none",
                    }}
                  >
                    API
                  </Button>
                  {/* Theme Toggle for Desktop */}
                  <Tooltip title="Toggle light/dark theme">
                    <IconButton
                      onClick={colorMode.toggleColorMode}
                      color="inherit"
                    >
                      {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                  </Tooltip>
                </Box>
              </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Drawer
              anchor="right"
              open={mobileOpen}
              onClose={handleMenuClose}
              variant="temporary" // Ensure the Drawer uses the temporary variant
              ModalProps={{
                keepMounted: true, // Better open performance on mobile
              }}
              PaperProps={{
                sx: {
                  width: 240,
                  backgroundColor: theme.palette.background.paper,
                  // Ensure Drawer overlays AppBar by default
                },
              }}
            >
              {drawerContent}
            </Drawer>

            {/* Main Content */}
            <Box sx={{ marginTop: "64px", flexGrow: 1, overflow: "auto" }}>
              {children}
              <Footer />
            </Box>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </body>
    </html>
  );
}
