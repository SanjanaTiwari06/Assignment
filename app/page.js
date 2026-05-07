"use client";
import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { 
  Box, TextField, Button, Typography, Paper, Container, CircularProgress, Alert 
} from "@mui/material";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [mounted, setMounted] = useState(false);
  
  const { login, loading } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ text: "", type: "" });

    const result = await login(username, password);
    
    if (result.success) {
      setMsg({ text: "Success! Redirecting...", type: "success" });
      setTimeout(() => { window.location.href = "/dashboard"; }, 1500);
    } else {
      setMsg({ text: result.message, type: "error" });
    }
  };

  if (!mounted) return null;

  return (
    <Box className="min-h-screen bg-[#f8fafc] flex flex-col selection:bg-blue-100">
      
      {/* --- ELITE NAVBAR --- */}
      <nav className="fixed top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Typography variant="h5" className="font-black text-slate-900 tracking-tighter">
            PRO<span className="text-blue-600">AUTH.</span>
          </Typography>
          
          <div className="flex items-center gap-8">
            <Link href="/" className="hidden md:block text-slate-600 hover:text-blue-600 font-semibold transition-all">Platform</Link>
            <Link href="/" className="hidden md:block text-slate-600 hover:text-blue-600 font-semibold transition-all">Pricing</Link>
            <Link href="/login">
              <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- MAIN HERO SECTION --- */}
      <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-12 px-4 relative overflow-hidden">
        
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-xl text-center mb-12">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-50 border border-blue-100">
            <Typography className="text-blue-600 text-xs font-bold uppercase tracking-widest">
              Secure Authentication System
            </Typography>
          </div>
          <Typography variant="h1" className="text-5xl md:text-7xl font-[900] text-slate-900 tracking-tight leading-tight mb-6">
            Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Back</span>
          </Typography>
          <Typography className="text-slate-500 text-xl max-w-md mx-auto leading-relaxed">
            Please enter your account details to access your personalized dashboard.
          </Typography>
        </div>

        {/* --- LUXURY LOGIN CARD --- */}
        {/* <Container maxWidth="xs" className="relative z-10">
          <Paper 
            elevation={0} 
            className="p-10 rounded-[2.5rem] bg-white border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all hover:shadow-2xl hover:shadow-blue-100/50"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Username</label>
                <TextField
                  fullWidth
                  placeholder="Enter username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: '16px',
                      backgroundColor: '#f1f5f9',
                      border: 'none',
                      '& fieldset': { border: 'none' },
                      '&:hover': { backgroundColor: '#e2e8f0' },
                      '&.Mui-focused': { backgroundColor: '#fff', boxShadow: '0 0 0 2px #2563eb' }
                    } 
                  }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                <TextField
                  fullWidth
                  placeholder="••••••••"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: '16px',
                      backgroundColor: '#f1f5f9',
                      border: 'none',
                      '& fieldset': { border: 'none' },
                      '&:hover': { backgroundColor: '#e2e8f0' },
                      '&.Mui-focused': { backgroundColor: '#fff', boxShadow: '0 0 0 2px #2563eb' }
                    } 
                  }}
                />
              </div>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                className="py-4 rounded-2xl bg-slate-900 hover:bg-blue-600 font-bold text-lg shadow-xl shadow-slate-300 capitalize transition-all duration-300"
              >
                {loading ? <CircularProgress size={26} color="inherit" /> : "Sign In to Account"}
              </Button>
            </form>

            {msg.text && (
              <Alert 
                severity={msg.type} 
                className="mt-8 rounded-2xl font-medium border-none shadow-inner"
                sx={{ backgroundColor: msg.type === 'success' ? '#f0fdf4' : '#fef2f2' }}
              >
                {msg.text}
              </Alert>
            )}
          </Paper>
          
          <Typography className="text-center mt-8 text-slate-400 font-medium">
            New here? <span className="text-blue-600 cursor-pointer hover:underline">Create an account</span>
          </Typography>
        </Container> */}
      </main>

      <footer className="py-10 border-t border-slate-200/60 bg-white flex flex-col items-center">
        <Typography className="text-slate-400 text-sm font-semibold tracking-wide uppercase">
          © 2026 Developed by YourName
        </Typography>
      </footer>
    </Box>
  );
}