import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Grid,
  Paper,
  Divider,
  useTheme,
  styled,
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  ShoppingCart,
  LocalShipping,
  Payment,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';

const CartItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}11, ${theme.palette.secondary.main}11)`,
    zIndex: -1,
  },
}));

const QuantityButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

const OrderSummary = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  background: theme.palette.background.paper,
  position: 'sticky',
  top: theme.spacing(2),
}));

const Cart = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  if (items.length === 0) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ShoppingCart sx={{ fontSize: 100, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Looks like you haven't added anything to your cart yet.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/products')}
          >
            Start Shopping
          </Button>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart ({items.length} items)
      </Typography>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
        gap: 4,
        alignItems: 'start'
      }}>
        <Box>
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <CartItem>
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: 'contain',
                      borderRadius: 1,
                      bgcolor: 'background.default',
                      p: 1,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      Color: {item.color}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ₹{item.price.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <QuantityButton
                      size="small"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      <Remove fontSize="small" />
                    </QuantityButton>
                    <Typography sx={{ minWidth: 40, textAlign: 'center' }}>
                      {item.quantity}
                    </Typography>
                    <QuantityButton
                      size="small"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <Add fontSize="small" />
                    </QuantityButton>
                  </Box>
                  <IconButton
                    color="error"
                    onClick={() => handleRemove(item.id)}
                  >
                    <Delete />
                  </IconButton>
                </CartItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>

        <Box>
          <OrderSummary>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ my: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography>₹{total.toLocaleString()}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Shipping</Typography>
                <Typography color="success.main">FREE</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Tax</Typography>
                <Typography>₹{(total * 0.18).toLocaleString()}</Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color="primary">
                ₹{(total * 1.18).toLocaleString()}
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={<Payment />}
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </Button>

            <Box sx={{ mt: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LocalShipping color="primary" fontSize="small" />
                <Typography variant="body2">
                  Free delivery on orders above ₹1000
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Payment color="primary" fontSize="small" />
                <Typography variant="body2">
                  Secure payment gateway
                </Typography>
              </Box>
            </Box>
          </OrderSummary>
        </Box>
      </Box>
    </Container>
  );
};

export default Cart; 