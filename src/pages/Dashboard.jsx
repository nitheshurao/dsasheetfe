import React from "react";
import { Typography, Container, Box } from "@mui/material";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const stored = JSON.parse(localStorage.getItem("dsaSheet"));
  const email = stored?.email;
  const name = email?.split("@")[0] || "User";

  return (
    <>
      <Navbar />
      <Container maxWidth="md"  sx={{ mt: 6 }}>
        <Typography variant="h4" fontWeight={500} fontSize={50} gutterBottom>
          Welcome {name}
        </Typography>
        <Typography variant="h4" fontWeight={400} fontSize={20} >Email: {email}</Typography>
        <Box mt={4}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Dashboard. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
