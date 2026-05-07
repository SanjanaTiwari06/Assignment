"use client";
import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box, CircularProgress } from "@mui/material";
import Link from "next/link";
import Protected from "@/components/Protected";

export default function ProductsPage() {
  const { products, fetchProducts, loading } = useUserStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Protected>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Our Product</Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>
        ) : (
          <Grid container spacing={3}>
            {products.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.thumbnail}
                    alt={item.title}
                    sx={{ objectFit: "contain", p: 2 }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.price}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Link href={`/dashboard/Product/${item.id}`} passHref>
                      <Button fullWidth variant="outlined">View Details</Button>
                    </Link>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Protected>
  );
}
