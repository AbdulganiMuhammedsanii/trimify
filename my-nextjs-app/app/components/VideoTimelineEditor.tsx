// components/VideoTimelineEditor.tsx
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  FiUpload,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";
import {
  FaPlay,
  FaPause,
} from "react-icons/fa";
import {
  HiOutlineDownload,
} from "react-icons/hi";

const VideoTimelineEditor: React.FC = () => {
  const [ready, setReady] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [originalVideoURL, setOriginalVideoURL] = useState<string | null>(null);
  const [processedVideoURL, setProcessedVideoURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [trimRanges, setTrimRanges] = useState<{ start: number; end: number }[]>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState<{ index: number; type: "start" | "end" } | null>(null);
  const [currentPlayingRange, setCurrentPlayingRange] = useState<{ start: number; end: number } | null>(null);

  const ffmpeg = useRef<ReturnType<typeof createFFmpeg> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  /* Load FFmpeg on component mount */
  useEffect(() => {
    const loadFFmpeg = async () => {
      try {
        ffmpeg.current = createFFmpeg({ log: true });
        await ffmpeg.current.load();
        setReady(true);
      } catch (err) {
        console.error("Failed to load FFmpeg:", err);
        setError("Failed to load processing tools. Please try again later.");
      }
    };
    loadFFmpeg();
  }, []);

  /* Generate thumbnails from the video */
  const generateThumbnails = async (videoFile: File): Promise<string[]> => {
    const thumbnailUrls: string[] = [];
    const tempVideoURL = URL.createObjectURL(videoFile);

    // Create a temporary video element to capture thumbnails
    const tempVideo = document.createElement("video");
    tempVideo.src = tempVideoURL;
    tempVideo.crossOrigin = "anonymous";
    await new Promise<void>((resolve) => {
      tempVideo.onloadedmetadata = () => {
        resolve();
      };
    });

    const videoDuration = tempVideo.duration;
    const thumbnailCount = 10; // Number of thumbnails to generate

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      URL.revokeObjectURL(tempVideoURL);
      return thumbnailUrls;
    }

    canvas.width = 160;
    canvas.height = 90;

    for (let i = 0; i < thumbnailCount; i++) {
      const time = (i / (thumbnailCount - 1)) * videoDuration;
      tempVideo.currentTime = time;

      await new Promise<void>((resolve) => {
        tempVideo.onseeked = () => {
          ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
          thumbnailUrls.push(canvas.toDataURL());
          resolve();
        };
      });
    }

    URL.revokeObjectURL(tempVideoURL);
    return thumbnailUrls;
  };

  /* Handle video file upload */
  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setProcessing(true);
    setOriginalVideoURL(null);
    setProcessedVideoURL(null);
    setError(null);
    setThumbnails([]);
    setTrimRanges([]);
    setCurrentPlayingRange(null);

    try {
      if (!ffmpeg.current || !ffmpeg.current.isLoaded()) {
        throw new Error("FFmpeg is not loaded");
      }

      ffmpeg.current.FS("writeFile", "input.mp4", await fetchFile(file));

      const tempVideoURL = URL.createObjectURL(file);
      setOriginalVideoURL(tempVideoURL);

      // Generate thumbnails
      const generatedThumbnails = await generateThumbnails(file);
      setThumbnails(generatedThumbnails);

      if (videoRef.current) {
        videoRef.current.src = tempVideoURL;
        videoRef.current.onloadedmetadata = () => {
          const videoDuration = videoRef.current?.duration || 0;
          setDuration(videoDuration);
          setTrimRanges([{ start: 0, end: videoDuration }]);
          setProcessing(false);
        };
      }
    } catch (err: unknown) {
      console.error("FFmpeg processing error:", err);
      const errorMessage = err instanceof Error ? err.message : "An error occurred while uploading the video.";
      setError(errorMessage);
      setProcessing(false);
    }
  };

  /* Handle video trimming and stitching using FFmpeg */
  const handleProcessVideo = async () => {
    if (!ffmpeg.current || !ffmpeg.current.isLoaded()) {
      setError("FFmpeg is not loaded");
      return;
    }

    if (trimRanges.length === 0) {
      setError("No trim ranges defined.");
      return;
    }

    setProcessing(true);
    setError(null);
    setProcessedVideoURL(null);

    try {
      // Step 1: Extract each trim range as a separate segment
      const segmentFiles: string[] = [];
      for (let i = 0; i < trimRanges.length; i++) {
        const { start, end } = trimRanges[i];
        const duration = end - start;

        const outputName = `segment_${i}.mp4`;
        const args = [
          "-ss",
          start.toString(),
          "-i",
          "input.mp4",
          "-t",
          duration.toString(),
          "-c",
          "copy",
          outputName,
        ];

        await ffmpeg.current.run(...args);
        segmentFiles.push(outputName);
      }

      // Step 2: Create a concat list file
      let concatList = "";
      segmentFiles.forEach((file) => {
        concatList += `file '${file}'\n`;
      });
      const concatListBuffer = new TextEncoder().encode(concatList);
      ffmpeg.current.FS("writeFile", "concat_list.txt", concatListBuffer);

      // Step 3: Concatenate the segments
      await ffmpeg.current.run(
        "-f",
        "concat",
        "-safe",
        "0",
        "-i",
        "concat_list.txt",
        "-c",
        "copy",
        "output.mp4"
      );

      // Step 4: Read the concatenated video
      const data = ffmpeg.current.FS("readFile", "output.mp4");
      const newProcessedVideoURL = URL.createObjectURL(
        new Blob([data.buffer], { type: "video/mp4" })
      );

      setProcessedVideoURL(newProcessedVideoURL);
    } catch (err) {
      console.error("FFmpeg processing error:", err);
      const errorMessage = err instanceof Error ? err.message : "An error occurred while processing the video.";
      setError(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  /* Handle dragging of timeline handles */
  const handleMouseDown = (index: number, type: "start" | "end") => (
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    setIsDragging({ index, type });
  };

  /* Calculate and update trim range based on mouse position */
  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      if (!isDragging || !timelineRef.current) return;

      const { index, type } = isDragging;
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const mouseX = e.clientX - timelineRect.left;
      const percentage = Math.max(0, Math.min(1, mouseX / timelineRect.width));
      const newTime = percentage * duration;

      setTrimRanges((prevRanges) => {
        const newRanges = [...prevRanges];
        if (type === "start") {
          newRanges[index].start = Math.min(newTime, newRanges[index].end - 0.1); // Ensure at least 0.1s difference
        } else {
          newRanges[index].end = Math.max(newTime, newRanges[index].start + 0.1);
        }

        // Optional: Sort ranges by start time
        newRanges.sort((a, b) => a.start - b.start);

        return newRanges;
      });
    },
    [isDragging, duration]
  );

  /* Stop dragging */
  const handleMouseUp = useCallback((e: globalThis.MouseEvent) => {
    setIsDragging(null);
  }, []);

  /* Attach global mouse events during dragging */
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  /* Play or pause the video */
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  /* Handle clicking on a trim range to play from there */
  const handleRangeClick = (range: { start: number; end: number }) => () => {
    if (videoRef.current) {
      videoRef.current.currentTime = range.start;
      videoRef.current.play();
      setCurrentPlayingRange(range);
    }
  };

  /* Handle video time updates to pause at the end of the selected range */
  const handleTimeUpdate = () => {
    if (videoRef.current && currentPlayingRange) {
      if (videoRef.current.currentTime >= currentPlayingRange.end) {
        videoRef.current.pause();
        setCurrentPlayingRange(null);
      }
    }
  };

  /* Add a new trim range */
  const addTrimRange = () => {
    setTrimRanges((prevRanges) => [
      ...prevRanges,
      { start: 0, end: duration },
    ]);

    // Invalidate processedVideoURL
    if (processedVideoURL) {
      URL.revokeObjectURL(processedVideoURL);
      setProcessedVideoURL(null);
    }
  };

  /* Remove a trim range */
  const removeTrimRange = (index: number) => () => {
    setTrimRanges((prevRanges) => prevRanges.filter((_, i) => i !== index));

    // Reset currentPlayingRange if the removed range was playing
    if (currentPlayingRange && trimRanges[index] === currentPlayingRange) {
      setCurrentPlayingRange(null);
    }

    // Invalidate processedVideoURL
    if (processedVideoURL) {
      URL.revokeObjectURL(processedVideoURL);
      setProcessedVideoURL(null);
    }
  };

  /* Drag-and-Drop Setup using React Dropzone */
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        handleFileUpload(file);
      });
    },
    [handleFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
    multiple: false,
  });

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Video Timeline Editor
      </Typography>

      {/* Upload Area */}
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed",
          borderColor: isDragActive ? "primary.main" : "grey.500",
          borderRadius: "8px",
          padding: "40px 20px",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: isDragActive ? "grey.700" : "grey.800",
          transition: "background-color 0.3s, border-color 0.3s",
          color: "grey.300",
        }}
      >
        <input {...getInputProps()} />
        <FiUpload size={50} color={isDragActive ? "#2196f3" : "#FFFFFF"} />
        {isDragActive ? (
          <Typography variant="body1" sx={{ color: "primary.main", mt: 2 }}>
            Drop the video here...
          </Typography>
        ) : (
          <Typography variant="body1" sx={{ color: "#FFFFFF", mt: 2 }}>
            Drag & Drop a video here, or click to select
          </Typography>
        )}
      </Box>

      {/* Uploaded Video List */}
      {originalVideoURL && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Uploaded Video</Typography>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              mt: 2,
              backgroundColor: "grey.700",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "8px",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "80%",
              }}
            >
              {originalVideoURL.split("/").pop()}
            </Typography>
            <Tooltip title="Remove Video">
              <IconButton
                onClick={() => {
                  if (originalVideoURL) {
                    URL.revokeObjectURL(originalVideoURL);
                    setOriginalVideoURL(null);
                    setProcessedVideoURL(null);
                    setTrimRanges([]);
                    setThumbnails([]);
                    setCurrentPlayingRange(null);
                  }
                }}
                sx={{ color: "#FF6B6B" }}
              >
                <FiTrash2 size={24} />
              </IconButton>
            </Tooltip>
          </Paper>
        </Box>
      )}

      {/* Video Player */}
      {(processedVideoURL || originalVideoURL) && (
        <Box sx={{ mt: 4 }}>
          <Paper elevation={6} sx={{ p: 2, backgroundColor: "grey.800" }}>
            <Box sx={{ position: "relative" }}>
              <video
                ref={videoRef}
                src={processedVideoURL || originalVideoURL || undefined}
                controls
                onTimeUpdate={handleTimeUpdate}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  backgroundColor: "#000",
                }}
              />
              {/* Play/Pause Button Overlay */}
              <Tooltip title="Play/Pause">
                <IconButton
                  onClick={handlePlayPause}
                  sx={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "#FFFFFF",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.7)",
                    },
                  }}
                >
                  {videoRef.current?.paused ? <FaPlay /> : <FaPause />}
                </IconButton>
              </Tooltip>
            </Box>
          </Paper>
        </Box>
      )}

      {/* Trimming Timeline */}
      {(processedVideoURL || originalVideoURL) && (
        <Box sx={{ mt: 4 }}>
          <Paper elevation={6} sx={{ p: 2, backgroundColor: "grey.800" }}>
            <Typography variant="h6" gutterBottom>
              Trimming Timeline
            </Typography>
            <Box
              ref={timelineRef}
              sx={{
                position: "relative",
                height: "100px",
                backgroundColor: "grey.700",
                borderRadius: "8px",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              {/* Video Thumbnail Strip */}
              <Box sx={{ display: "flex", height: "100%" }}>
                {thumbnails.map((thumb, index) => (
                  <img
                    key={index}
                    src={thumb}
                    alt={`Thumbnail ${index + 1}`}
                    style={{ height: "100%", flexShrink: 0 }}
                  />
                ))}
              </Box>

              {/* Selected Range Highlights */}
              {trimRanges.map((range, index) => (
                <Box
                  key={index}
                  onClick={handleRangeClick(range)}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: `${(range.start / duration) * 100}%`,
                    width: `${((range.end - range.start) / duration) * 100}%`,
                    height: "100%",
                    backgroundColor:
                      currentPlayingRange === range
                        ? "rgba(255, 165, 0, 0.5)"
                        : "rgba(33, 150, 243, 0.3)",
                    transition: "background-color 0.3s",
                  }}
                ></Box>
              ))}

              {/* Trim Handles */}
              {trimRanges.map((range, index) => (
                <React.Fragment key={index}>
                  {/* Start Handle */}
                  <Box
                    onMouseDown={handleMouseDown(index, "start")}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: `${(range.start / duration) * 100}%`,
                      transform: "translateX(-50%)",
                      width: "10px",
                      height: "100%",
                      backgroundColor: "#FFFFFF",
                      borderLeft: "2px solid #2196f3",
                      borderRight: "2px solid #2196f3",
                      cursor: "col-resize",
                    }}
                  />

                  {/* End Handle */}
                  <Box
                    onMouseDown={handleMouseDown(index, "end")}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: `${(range.end / duration) * 100}%`,
                      transform: "translateX(-50%)",
                      width: "10px",
                      height: "100%",
                      backgroundColor: "#FFFFFF",
                      borderLeft: "2px solid #2196f3",
                      borderRight: "2px solid #2196f3",
                      cursor: "col-resize",
                    }}
                  />
                </React.Fragment>
              ))}
            </Box>
          </Paper>
        </Box>
      )}

      {/* Trim Ranges List */}
      {trimRanges.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Trim Ranges
          </Typography>
          <List>
            {trimRanges.map((range, index) => (
              <ListItem
                key={index}
                sx={{
                  backgroundColor: "grey.700",
                  borderRadius: "8px",
                  mb: 2,
                }}
                secondaryAction={
                  <Tooltip title="Remove Trim Range">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={removeTrimRange(index)}
                      sx={{ color: "#FF6B6B" }}
                    >
                      <FiTrash2 />
                    </IconButton>
                  </Tooltip>
                }
              >
                <ListItemText
                  primary={`Range ${index + 1}: ${range.start.toFixed(
                    2
                  )}s - ${range.end.toFixed(2)}s`}
                />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FiPlus />}
            onClick={addTrimRange}
            disabled={processing || trimRanges.length >= 10}
            sx={{ mt: 2 }}
          >
            Add Range
          </Button>
        </Box>
      )}

      {/* Process and Stitch Video Button */}
      {trimRanges.length > 0 && (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            variant="contained"
            color="success"
            startIcon={<HiOutlineDownload />}
            onClick={handleProcessVideo}
            disabled={processing || trimRanges.length === 0}
            sx={{ height: "50px", px: 4 }}
          >
            {processing ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Trim and Stitch Video"
            )}
          </Button>
        </Box>
      )}

      {/* Processed Video Display */}
      {processedVideoURL && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Processed Video
          </Typography>
          <Paper
            elevation={6}
            sx={{ p: 2, backgroundColor: "grey.800", borderRadius: "8px" }}
          >
            <video
              src={processedVideoURL}
              controls
              style={{
                width: "100%",
                borderRadius: "8px",
                backgroundColor: "#000",
              }}
            />
            <Box sx={{ mt: 2, textAlign: "right" }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<HiOutlineDownload />}
                href={processedVideoURL}
                download="edited_video.mp4"
              >
                Download Edited Video
              </Button>
            </Box>
          </Paper>
        </Box>
      )}

      {/* Error Snackbar */}
      {error && (
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#f44336",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Typography variant="body1">{error}</Typography>
          <IconButton
            size="small"
            onClick={() => setError(null)}
            sx={{ color: "#fff" }}
          >
            <FiTrash2 />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default VideoTimelineEditor;
