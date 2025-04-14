import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  styled,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { AcUnit, Air } from '@mui/icons-material';
import { Product } from '../store/slices/productsSlice';

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '200%',
    height: '200%',
    background: `radial-gradient(circle, ${theme.palette.primary.main}22 0%, transparent 50%)`,
    top: '-50%',
    left: '-50%',
    animation: 'rotate 30s linear infinite',
  },
  '@keyframes rotate': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}));

const FeatureCard = styled(motion.div)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(3),
  textAlign: 'center',
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

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Mock featured products (replace with actual data from your store)
  const featuredProducts: Product[] = [
    {
      id: '1',
      name: 'Premium AC 1.5 Ton',
      price: 35000,
      image: 'placeholder.jpg',
      rating: 4.5,
      reviews: 128,
      category: 'ac',
      colors: ['#ffffff', '#000000', '#silver'],
      features: ['Energy Efficient', '5 Star Rating', 'WiFi Enabled'],
      stock: 10,
      description: 'Premium 1.5 Ton Split AC with advanced cooling technology and smart features',
      sizes: ['1.5 Ton'],
    },
    {
      id: '2',
      name: 'Smart Fan 1200mm',
      price: 4500,
      image: 'placeholder.jpg',
      rating: 4.2,
      reviews: 95,
      category: 'fan',
      colors: ['#ffffff', '#black'],
      features: ['Remote Control', 'Energy Saving', '5 Speed Settings'],
      stock: 25,
      description: 'Smart ceiling fan with remote control and energy-efficient operation',
      sizes: ['1200mm'],
    },
    {
      id: '3',
      name: 'Inverter AC 2 Ton',
      price: 45000,
      image: 'placeholder.jpg',
      rating: 4.8,
      reviews: 156,
      category: 'ac',
      colors: ['#white', '#silver'],
      features: ['Inverter Technology', '5 Star Rating', 'Self Clean'],
      stock: 8,
      description: '2 Ton Inverter AC with advanced cooling and self-cleaning technology',
      sizes: ['2 Ton'],
    },
    {
      id: '4',
      name: 'Table Fan 400mm',
      price: 2500,
      image: 'placeholder.jpg',
      rating: 4.0,
      reviews: 78,
      category: 'fan',
      colors: ['#white', '#blue'],
      features: ['3 Speed Settings', 'Tilt Function', 'Energy Efficient'],
      stock: 30,
      description: 'Compact table fan with multiple speed settings and tilt function',
      sizes: ['400mm'],
    },
    {
      id: '5',
      name: 'Window AC 1 Ton',
      price: 28000,
      image: 'placeholder.jpg',
      rating: 4.3,
      reviews: 112,
      category: 'ac',
      colors: ['#white'],
      features: ['Easy Installation', '4 Star Rating', 'Auto Restart'],
      stock: 15,
      description: '1 Ton Window AC with easy installation and auto restart feature',
      sizes: ['1 Ton'],
    },
    {
      id: '6',
      name: 'Pedestal Fan 450mm',
      price: 3500,
      image: 'placeholder.jpg',
      rating: 4.1,
      reviews: 64,
      category: 'fan',
      colors: ['#white', '#black'],
      features: ['Oscillation', 'Remote Control', 'Timer Function'],
      stock: 20,
      description: 'Powerful pedestal fan with oscillation and remote control',
      sizes: ['450mm'],
    }
  ];

  return (
    <Box>
      <HeroSection>
        <Container>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            alignItems: 'center'
          }}>
            <Box>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Stay Cool & Comfortable
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
                  Discover our premium collection of ACs and Fans for the perfect cooling solution.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<AcUnit />}
                    onClick={() => navigate('/products?category=ac')}
                  >
                    Shop ACs
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Air />}
                    onClick={() => navigate('/products?category=fan')}
                  >
                    Shop Fans
                  </Button>
                </Box>
              </motion.div>
            </Box>
            <Box>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Add a hero image here */}
              </motion.div>
            </Box>
          </Box>
        </Container>
      </HeroSection>

      <Container sx={{ py: 8 }}>
        <Typography variant="h2" sx={{ mb: 4 }}>
          Why Choose Us?
        </Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
          gap: 4
        }}>
          {[
            {
              icon: '🌟',
              title: 'Premium Quality',
              description: 'Handpicked selection of top-rated cooling solutions',
            },
            {
              icon: '🚚',
              title: 'Fast Delivery',
              description: 'Free delivery within 24 hours',
            },
            {
              icon: '💎',
              title: 'Best Prices',
              description: 'Competitive prices with no compromise on quality',
            },
            {
              icon: '🛠️',
              title: 'Expert Support',
              description: '24/7 customer support and installation service',
            },
          ].map((feature, index) => (
            <Box key={index}>
              <FeatureCard
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Typography variant="h2" sx={{ mb: 2 }}>
                  {feature.icon}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </FeatureCard>
            </Box>
          ))}
        </Box>
      </Container>

      <Container sx={{ py: 8 }}>
        <Typography variant="h2" sx={{ mb: 4 }}>
          Featured Products
        </Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 4
        }}>
          {featuredProducts.map((product) => (
            <Box key={product.id}>
              <ProductCard product={product} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Home; 