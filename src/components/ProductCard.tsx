import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  Chip,
  IconButton,
  styled,
} from '@mui/material';
import { ShoppingCart, Favorite } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { Product } from '../store/slices/productsSlice';

const StyledCard = styled(motion(Card))(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
}));

const PriceTag = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: -32,
  background: theme.palette.secondary.main,
  padding: '4px 32px',
  transform: 'rotate(45deg)',
  color: theme.palette.common.white,
  fontWeight: 'bold',
  zIndex: 1,
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(1),
  background: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  justifyContent: 'space-between',
  transform: 'translateY(100%)',
  transition: 'transform 0.3s ease-in-out',
  '.MuiCard-root:hover &': {
    transform: 'translateY(0)',
  },
}));

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <StyledCard
      onClick={() => navigate(`/product/${product.id}`)}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PriceTag>₹{product.price.toLocaleString()}</PriceTag>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'contain', p: 2 }}
      />
      <CardContent>
        <Typography variant="h6" noWrap>
          {product.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Rating value={product.rating} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            ({product.reviews})
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
          {product.colors.map((color) => (
            <Box
              key={color}
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                bgcolor: color,
                border: '2px solid white',
              }}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {product.features.slice(0, 2).map((feature) => (
            <Chip
              key={feature}
              label={feature}
              size="small"
              variant="outlined"
              sx={{ borderRadius: 1 }}
            />
          ))}
        </Box>
      </CardContent>
      <ActionButtons>
        <IconButton
          color="primary"
          onClick={handleAddToCart}
          sx={{ bgcolor: 'background.paper' }}
        >
          <ShoppingCart />
        </IconButton>
        <IconButton
          color="secondary"
          sx={{ bgcolor: 'background.paper' }}
        >
          <Favorite />
        </IconButton>
      </ActionButtons>
    </StyledCard>
  );
};

export default ProductCard; 