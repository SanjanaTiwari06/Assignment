"use client";
import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { 
  Box, TextField, Button, Typography, Paper, Container, CircularProgress, Alert 
} from "@mui/material";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [mounted, setMounted] = useState(false);
  
  const { login, loading } = useAuthStore();

  // Hydration fix: Page load hone ke baad hi UI dikhao
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ text: "", type: "" });

    const result = await login(username, password);
    
    if (result.success) {
      setMsg({ text: "Login Successful! Redirecting...", type: "success" });
      setTimeout(() => { window.location.href = "/dashboard"; }, 1500);
    } else {
      setMsg({ text: result.message, type: "error" });
    }
  };

  if (!mounted) return null;

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-100">
      <Container maxWidth="xs">
        <Paper elevation={10} className="p-8 rounded-2xl">
          <Typography variant="h4" className="text-center font-bold mb-6 text-blue-600">
            Sign In
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ py: 1.5, mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </form>

          {msg.text && (
            <Alert severity={msg.type} className="mt-4">
              {msg.text}
            </Alert>
          )}
        </Paper>
      </Container>
    </Box>
  );
}