import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Product } from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowBack } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ProductImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  borderRadius: theme.shape.borderRadius,
  objectFit: 'cover',
}));

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const product = useSelector((state: RootState) => 
    state.products.items.find(p => p.id === id)
  );

  if (!product) {
    return (
      <Container>
        <Typography variant="h4" sx={{ mt: 4 }}>
          Product not found
        </Typography>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back to Products
      </Button>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 4
      }}>
        <Box>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper elevation={3} sx={{ p: 2 }}>
              <ProductImage src={product.image} alt={product.name} />
            </Paper>
          </motion.div>
        </Box>

        <Box>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={product.rating} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({product.reviews} reviews)
                </Typography>
              </Box>

              <Typography variant="h5" color="primary" gutterBottom>
                ${product.price}
              </Typography>

              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Colors:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {product.colors.map((color) => (
                    <Chip
                      key={color}
                      label={color}
                      sx={{
                        backgroundColor: color,
                        color: 'white',
                        '& .MuiChip-label': {
                          color: 'white',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Features:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {product.features.map((feature) => (
                    <Chip key={feature} label={feature} />
                  ))}
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body1">
                  Stock: {product.stock} units
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  sx={{ ml: 'auto' }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Paper>
          </motion.div>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetail;