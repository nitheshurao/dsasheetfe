import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loader = ({ size = 80 }) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <CircularProgress size={size} />
  </Box>
);

export default Loader;
