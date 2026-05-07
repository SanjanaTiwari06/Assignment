"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container, Paper, Typography, Button, Box, Avatar, Divider, Grid } from "@mui/material";
import Protected from "@/components/Protected";
import axios from "axios";

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/user/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };
    if (id) fetchUser();
  }, [id]);

  if (!user) return <Typography sx={{ p: 4 }}>Loading User Details...</Typography>;

  return (
    <Protected>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Button onClick={() => router.back()} sx={{ mb: 2 }}>Back to Users</Button>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar src={user.image} sx={{ width: 100, height: 100, mr: 3 }} />
            <Box>
              <Typography variant="h4">{user.firstName} {user.lastName}</Typography>
              <Typography color="text.secondary">{user.email}</Typography>
            </Box>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="primary">Company</Typography>
              <Typography variant="body1">{user.company.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="primary">Phone</Typography>
              <Typography variant="body1">{user.phone}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="primary">Address</Typography>
              <Typography variant="body1">{user.address.address}, {user.address.city}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Protected>
  );
}