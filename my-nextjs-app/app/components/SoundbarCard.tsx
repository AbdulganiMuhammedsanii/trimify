"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Box } from '@mui/material';
import { styled } from '@mui/system';

interface WaveProps {
  height: string;
  delay: number;
}

const SoundWave = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  height: '100%',
}));

const Wave = styled(Box)<WaveProps>(({ height, delay }) => ({
  width: '8px',
  height: height,
  backgroundColor: "#0096FF",
  borderRadius: '2px',
  animation: `bounce 1s infinite ease-in-out`,
  animationDelay: `${delay}s`,

  '@keyframes bounce': {
    '0%, 100%': {
      transform: 'scaleY(1)',
    },
    '50%': {
      transform: 'scaleY(0.5)',
    },
  },
}));

const SoundbarCard: React.FC = () => {
  const waves = [
    '60px', '100px', '80px', '120px', '70px', '90px', '110px',
    '60px', '100px', '80px', '120px', '70px', '90px', '110px',
  ];
  const [delays, setDelays] = useState<number[]>([]);

  // Run this only on the client
  useEffect(() => {
    setDelays(waves.map(() => Math.random()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card elevation={3} sx={{ maxWidth: 800, padding: { xs: '32px', md: '50px' } }}>
      <CardContent>
        <SoundWave>
          {delays.length > 0
            ? waves.map((height, index) => (
              <Wave key={index} height={height} delay={delays[index]} />
            ))
            : waves.map((height, index) => (
              // Initial render without delay or with a default delay
              <Wave key={index} height={height} delay={0} />
            ))
          }
        </SoundWave>
      </CardContent>
    </Card>
  );
};

export default SoundbarCard;
