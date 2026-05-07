"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Container, Typography, Button, Box, Grid, Paper, 
  Chip, Rating, Divider, CircularProgress 
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from "axios";
import Protected from "@/components/Protected";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Product fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  if (!product) return <Typography align="center">Product not found!</Typography>;

  return (
    <Protected>
      <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => router.back()} 
          sx={{ mb: 3 }}
        >
          Back to Products
        </Button>

        <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, border: '1px solid #eee', borderRadius: 3 }}>
          <Grid container spacing={5}>
            {/* Left: Product Image */}
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src={product.thumbnail}
                alt={product.title}
                sx={{ 
                  width: '100%', 
                  borderRadius: 2, 
                  backgroundColor: '#f9f9f9',
                  objectFit: 'contain',
                  maxHeight: 400 
                }}
              />
            </Grid>

            {/* Right: Product Info */}
            <Grid item xs={12} md={6}>
              <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                {product.brand}
              </Typography>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                {product.title}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                <Rating value={product.rating} readOnly precision={0.5} />
                <Typography variant="body2" color="text.secondary">
                  ({product.rating} reviews)
                </Typography>
              </Box>

              <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
                ${product.price}
                <Typography component="span" variant="body1" sx={{ ml: 2, color: 'green' }}>
                  {product.discountPercentage}% OFF
                </Typography>
              </Typography>

              <Chip 
                label={product.availabilityStatus} 
                color={product.stock > 0 ? "success" : "error"} 
                variant="outlined" 
                sx={{ mb: 3 }}
              />

              <Typography variant="body1" paragraph color="text.secondary">
                {product.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  startIcon={<ShoppingCartIcon />}
                  sx={{ flexGrow: 1, py: 1.5 }}
                >
                  Add to Cart
                </Button>
                <Button variant="outlined" size="large">
                  Buy Now
                </Button>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle2">Category: {product.category}</Typography>
                <Typography variant="subtitle2">SKU: {product.sku}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Protected>
  );
}