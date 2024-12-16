"use client";
import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import {
  Box,
  Button,
  Typography,
  Snackbar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const VideoEditorContainer = styled(Box)(({ theme }) => ({
  maxWidth: 900,
  margin: '0 auto',
  padding: theme.spacing(4),
  backgroundColor: '#1E1E1E',
  color: '#FFFFFF',
  borderRadius: theme.spacing(2),
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#2196f3',
  color: '#FFFFFF',
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.spacing(1),
  fontWeight: 600,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#1976d2',
  },
  '&.Mui-disabled': {
    backgroundColor: '#4a4a4a',
    color: '#8a8a8a',
  },
}));

const TimelineContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: 200,
  backgroundColor: '#2a2a2a',
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  marginTop: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
}));

const TimelineTrack = styled(Box)({
  position: 'absolute',
  height: '100%',
  backgroundColor: 'rgba(33, 150, 243, 0.3)',
  zIndex: 5,
});

const TimelineHandle = styled(Box)(() => ({
  position: 'absolute',
  width: 20,
  height: '100%',
  backgroundColor: '#FFFFFF',
  cursor: 'col-resize',
  zIndex: 10,
  borderLeft: '2px solid #2196f3',
  borderRight: '2px solid #2196f3',
}));

const VideoThumbnailStrip = styled(Box)({
  display: 'flex',
  height: '100%',
  width: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
});

const VideoThumbnail = styled('img')({
  height: '100%',
  objectFit: 'cover',
  flexShrink: 0,
});

const VideoTimelineEditor: React.FC = () => {
  const [ready, setReady] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [originalVideoURL, setOriginalVideoURL] = useState<string | null>(null);
  const [processedVideoURL, setProcessedVideoURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [trimRange, setTrimRange] = useState<number[]>([0, 0]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [isResizing, setIsResizing] = useState<'start' | 'end' | null>(null);

  const ffmpeg = useRef<ReturnType<typeof createFFmpeg> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const loadFFmpeg = async () => {
      try {
        ffmpeg.current = createFFmpeg({ log: true });
        await ffmpeg.current.load();
        setReady(true);
      } catch (err) {
        console.error('Failed to load FFmpeg:', err);
        setError('Failed to load processing tools. Please try again later.');
      }
    };
    loadFFmpeg();
  }, []);

  const generateThumbnails = async (videoFile: File) => {
    if (!ffmpeg.current) return [];

    const thumbnailUrls: string[] = [];
    const tempVideoURL = URL.createObjectURL(videoFile);

    // Temporary video element to get duration
    const tempVideo = document.createElement('video');
    tempVideo.src = tempVideoURL;
    await new Promise(resolve => {
      tempVideo.onloadedmetadata = resolve;
    });

    const videoDuration = tempVideo.duration;
    const thumbnailCount = 10; // Number of thumbnails to generate

    for (let i = 0; i < thumbnailCount; i++) {
      const time = (i / (thumbnailCount - 1)) * videoDuration;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) continue;

      canvas.width = 160;
      canvas.height = 90;

      tempVideo.currentTime = time;
      await new Promise(resolve => {
        tempVideo.onseeked = () => {
          ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
          thumbnailUrls.push(canvas.toDataURL());
          resolve(null);
        };
      });
    }

    URL.revokeObjectURL(tempVideoURL);
    return thumbnailUrls;
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setProcessing(true);
    setOriginalVideoURL(null);
    setProcessedVideoURL(null);
    setError(null);
    setThumbnails([]);

    try {
      if (!ffmpeg.current || !ffmpeg.current.isLoaded()) {
        throw new Error('FFmpeg is not loaded');
      }

      ffmpeg.current.FS('writeFile', 'input.mp4', await fetchFile(file));

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
          setTrimRange([0, videoDuration]);
          URL.revokeObjectURL(tempVideoURL);
          setProcessing(false);
        };
      }
    } catch (err: unknown) {
      console.error('FFmpeg processing error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while uploading the video.';
      setError(errorMessage);
      setProcessing(false);
    }

    const handleProcessVideo = async () => {
      if (!ffmpeg.current || !ffmpeg.current.isLoaded()) {
        setError('FFmpeg is not loaded');
        return;
      }

      setProcessing(true);
      setError(null);
      setProcessedVideoURL(null);

      try {
        const [start, end] = trimRange;
        const args: string[] = [
          '-i', 'input.mp4',
          '-ss', start.toString(),
          '-to', end.toString(),
          '-c:v', 'libx264',
          '-c:a', 'aac',
          'output.mp4'
        ];

        await ffmpeg.current.run(...args);

        const processedData = ffmpeg.current.FS('readFile', 'output.mp4');
        const processedVideoURL = URL.createObjectURL(
          new Blob([processedData.buffer], { type: 'video/mp4' })
        );

        setProcessedVideoURL(processedVideoURL);
      } catch (err) {
        console.error('FFmpeg processing error:', err);
        const errorMessage = err instanceof Error ? err.message : 'An error occurred while processing the video.';
        setError(errorMessage);
      } finally {
        setProcessing(false);
      }
    };

    const handleMouseDown = (handle: 'start' | 'end') => (e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(handle);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isResizing || !timelineRef.current) return;

      const timelineRect = timelineRef.current.getBoundingClientRect();
      const mouseX = e.clientX - timelineRect.left;
      const percentage = Math.max(0, Math.min(1, mouseX / timelineRect.width));
      const newTime = percentage * duration;

      setTrimRange(prevRange => {
        const newRange = [...prevRange];
        const index = isResizing === 'start' ? 0 : 1;
        newRange[index] = newTime;

        // Ensure start is always less than end
        if (newRange[0] > newRange[1]) {
          newRange[0] = newRange[1];
        }

        return newRange;
      });
    };

    const handleMouseUp = () => {
      setIsResizing(null);
    };

    useEffect(() => {
      if (isResizing) {
        window.addEventListener('mousemove', handleMouseMove as unknown as EventListener);
        window.addEventListener('mouseup', handleMouseUp as unknown as EventListener);
      }

      return () => {
        window.removeEventListener('mousemove', handleMouseMove as unknown as EventListener);
        window.removeEventListener('mouseup', handleMouseUp as unknown as EventListener);
      };
    }, [isResizing, duration]);

    return (
      <VideoEditorContainer>
        <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
          <Typography variant="h4" sx={{ color: '#FFFFFF', textAlign: 'center' }}>
            Video Timeline Editor
          </Typography>

          {error && (
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={!!error}
              message={error}
              autoHideDuration={6000}
              onClose={() => setError(null)}
            />
          )}

          <PrimaryButton
            variant="contained"
            as="label"
            disabled={processing || !ready}
          >
            {ready ? 'Upload Video' : 'Loading...'}
            <input
              type="file"
              accept="video/*"
              hidden
              onChange={handleFileUpload}
            />
          </PrimaryButton>

          {originalVideoURL && (
            <Box width="100%" display="flex" flexDirection="column" alignItems="center">
              <video
                ref={videoRef}
                src={originalVideoURL}
                controls
                style={{
                  maxWidth: '100%',
                  maxHeight: 400,
                  borderRadius: '8px',
                  marginBottom: 16,
                }}
              />

              <TimelineContainer
                ref={timelineRef}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
              >
                {/* Video Thumbnail Strip */}
                <VideoThumbnailStrip>
                  {thumbnails.map((thumb, index) => (
                    <VideoThumbnail
                      key={index}
                      src={thumb}
                      alt={`Thumbnail ${index}`}
                    />
                  ))}
                </VideoThumbnailStrip>

                {/* Selected Range Highlight */}
                <TimelineTrack
                  sx={{
                    left: `${(trimRange[0] / duration) * 100}%`,
                    width: `${((trimRange[1] - trimRange[0]) / duration) * 100}%`,
                  }}
                />

                {/* Start Handle */}
                <TimelineHandle
                  onMouseDown={handleMouseDown('start')}
                  sx={{
                    left: `${(trimRange[0] / duration) * 100}%`,
                    transform: 'translateX(-50%)'
                  }}
                />

                {/* End Handle */}
                <TimelineHandle
                  onMouseDown={handleMouseDown('end')}
                  sx={{
                    left: `${(trimRange[1] / duration) * 100}%`,
                    transform: 'translateX(-50%)'
                  }}
                />
              </TimelineContainer>

              <Box mt={2} display="flex" justifyContent="space-between" width="100%" color="#888">
                <Typography>Start: {trimRange[0].toFixed(2)}s</Typography>
                <Typography>End: {trimRange[1].toFixed(2)}s</Typography>
              </Box>

              <PrimaryButton
                variant="contained"
                onClick={handleProcessVideo}
                disabled={processing}
                sx={{ mt: 3 }}
              >
                {processing ? 'Processing...' : 'Trim Video'}
              </PrimaryButton>
            </Box>
          )}

          {processedVideoURL && (
            <Box width="100%" textAlign="center" mt={4}>
              <Typography variant="h5" sx={{ color: '#FFFFFF', mb: 2 }}>
                Processed Video
              </Typography>
              <video
                src={processedVideoURL}
                controls
                style={{
                  maxWidth: '100%',
                  borderRadius: '8px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                }}
              />
              <Button
                variant="outlined"
                href={processedVideoURL}
                download="trimmed_video.mp4"
                sx={{ mt: 3, borderColor: '#2196f3', color: '#2196f3' }}
                component="a"
              >
                Download Trimmed Video
              </Button>
            </Box>
          )}
        </Box>
      </VideoEditorContainer>
    );
  };

  export default VideoTimelineEditor;