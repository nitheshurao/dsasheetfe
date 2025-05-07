import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import Navbar from '../components/Navbar';
import axios from '../services/api'; 
const Progress = () => {
  const [percentages, setPercentages] = useState({ EASY: 0, MEDIUM: 0, HARD: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/dsa/progress-report')
      .then(res => {
        setPercentages(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load progress report', err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>Progress Reports</Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Easy: {percentages.EASY}%
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Medium: {percentages.MEDIUM}%
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Hard: {percentages.HARD}%
            </Typography>
          </>
        )}

        <Box mt={6}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Dashboard. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Progress;
