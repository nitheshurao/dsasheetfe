import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Alert,
} from "@mui/material";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // toggle mode
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await axios.post(endpoint, payload);
      localStorage.setItem("dsaSheet", JSON.stringify(res.data));

      navigate("/dashboard");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        (isLogin ? "Login failed" : "Registration failed");
      setError(msg);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: '30vh' }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" fontSize={50} fontWeight={600} align="center" gutterBottom>
          {isLogin ? "Login" : "Register"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} mt={2}>
          {error && <Alert severity="error">{error}</Alert>}
          {!isLogin && (
            <TextField
              name="name"
              label="Full Name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
            />
          )}
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />
          <Button variant="contained" type="submit" fontSize={'larger'} fullWidth sx={{ mt: 2, }}>
            {isLogin ? "Login" : "Register"}
          </Button>

          <Box textAlign="center" mt={2}>
            <Button
              component="button"
              variant="body2"
              onClick={(e) => {
                setIsLogin(!isLogin);
                setError("");
              }}
            >
              {isLogin
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthPage;
