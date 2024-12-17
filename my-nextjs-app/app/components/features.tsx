import { VolumeUp } from "@mui/icons-material";
import { Box, Typography, Grid, Card, CardActionArea, CardContent, useTheme } from "@mui/material";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import BlockIcon from "@mui/icons-material/Block";
import React from 'react';

const Features: React.FC = () => {
  const [inView, setInView] = React.useState(false);

  const theme = useTheme(); // Access the current theme
  const featuresRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!featuresRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2, // Adjust this threshold as needed
      }
    );

    observer.observe(featuresRef.current);

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  return (
    <div>
      {/* Features Subsection */}
      <Box
        ref={featuresRef}
        sx={{
          marginBottom: { xs: 10, md: 15 },
          padding: { xs: "40px 20px", md: "60px 40px" },
          backgroundColor: theme.palette.background.paper,
          borderRadius: "12px",
          boxShadow: theme.shadows[3],
          textAlign: "center",
          opacity: inView ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: "Inter",
            fontWeight: "bold",
            color: theme.palette.secondary.main,
            marginBottom: { xs: 4, md: 6 },
          }}
        >
          Our Core Features
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Denoising Feature */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: theme.palette.background.default,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: theme.shadows[6],
                },
              }}
              elevation={3}
            >
              <CardActionArea>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "20px",
                  }}
                >
                  <VolumeUp
                    sx={{
                      fontSize: 60,
                      color: theme.palette.secondary.main,
                    }}
                  />
                </Box>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                      marginBottom: 2,
                    }}
                  >
                    Denoising
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontFamily: "Inter",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    Eliminate unwanted background noise to ensure crystal-clear audio quality.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Transcription Feature */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: theme.palette.background.default,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: theme.shadows[6],
                },
              }}
              elevation={3}
            >
              <CardActionArea>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "20px",
                  }}
                >
                  <SubtitlesIcon
                    sx={{
                      fontSize: 60,
                      color: theme.palette.secondary.main,
                    }}
                  />
                </Box>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                      marginBottom: 2,
                    }}
                  >
                    Transcription
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontFamily: "Inter",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    Convert your audio recordings into accurate and searchable text effortlessly.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Filler Word Removal Feature */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: theme.palette.background.default,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: theme.shadows[6],
                },
              }}
              elevation={3}
            >
              <CardActionArea>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "20px",
                  }}
                >
                  <BlockIcon
                    sx={{
                      fontSize: 60,
                      color: theme.palette.secondary.main,
                    }}
                  />
                </Box>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                      marginBottom: 2,
                    }}
                  >
                    Filler Word Removal
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontFamily: "Inter",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    Automatically detect and remove filler words to produce professional-sounding recordings.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Features;