import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Drawer,
  useTheme,
  styled,
  Button,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Rating,
  IconButton,
  useMediaQuery,
  Chip,
} from '@mui/material';
import { FilterList, Close } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setFilters, clearFilters } from '../store/slices/productsSlice';
import ProductCard from '../components/ProductCard';

const FilterSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.background.paper,
  marginBottom: theme.spacing(2),
}));

const Products = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { items, filters } = useSelector((state: RootState) => state.products);

  // Get category from URL and set it as initial filter
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      dispatch(setFilters({ category }));
    }
  }, [searchParams, dispatch]);

  const FilterContent = () => (
    <Box sx={{ width: isMobile ? 280 : 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">Filters</Typography>
        {isMobile && (
          <IconButton onClick={() => setDrawerOpen(false)}>
            <Close />
          </IconButton>
        )}
      </Box>

      <FilterSection>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Price Range
        </Typography>
        <Slider
          value={filters.priceRange}
          onChange={(_, value) => dispatch(setFilters({ priceRange: value as [number, number] }))}
          valueLabelDisplay="auto"
          min={0}
          max={100000}
          step={1000}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography>₹{filters.priceRange[0]}</Typography>
          <Typography>₹{filters.priceRange[1]}</Typography>
        </Box>
      </FilterSection>

      <FilterSection>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Category
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.category === 'ac'}
                onChange={() => dispatch(setFilters({ category: 'ac' }))}
              />
            }
            label="Air Conditioners"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.category === 'fan'}
                onChange={() => dispatch(setFilters({ category: 'fan' }))}
              />
            }
            label="Fans"
          />
        </FormGroup>
      </FilterSection>

      <FilterSection>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Rating
        </Typography>
        {[4, 3, 2, 1].map((rating) => (
          <Box
            key={rating}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 1,
              cursor: 'pointer',
            }}
            onClick={() => dispatch(setFilters({ rating }))}
          >
            <Rating value={rating} readOnly size="small" />
            <Typography>& Up</Typography>
          </Box>
        ))}
      </FilterSection>

      <Button
        variant="outlined"
        fullWidth
        onClick={() => dispatch(clearFilters())}
        sx={{ mt: 2 }}
      >
        Clear Filters
      </Button>
    </Box>
  );

  const filteredProducts = items.filter((product) => {
    if (filters.category && product.category !== filters.category) return false;
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
    if (filters.rating && product.rating < filters.rating) return false;
    return true;
  });

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">
          {filters.category ? `${filters.category === 'ac' ? 'Air Conditioners' : 'Fans'}` : 'All Products'}
        </Typography>
        {isMobile && (
          <Button
            startIcon={<FilterList />}
            onClick={() => setDrawerOpen(true)}
          >
            Filters
          </Button>
        )}
      </Box>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '1fr 3fr' },
        gap: 4
      }}>
        {!isMobile && (
          <Box>
            <FilterContent />
          </Box>
        )}
        <Box>
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            {Object.entries(filters).map(([key, value]) => {
              if (!value || (Array.isArray(value) && value.length === 0)) return null;
              return (
                <Chip
                  key={key}
                  label={`${key}: ${value}`}
                  onDelete={() => dispatch(setFilters({ [key]: null }))}
                />
              );
            })}
          </Box>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 3
          }}>
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <Box key={product.id}>
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                </Box>
              ))}
            </AnimatePresence>
          </Box>
        </Box>
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterContent />
      </Drawer>
    </Container>
  );
};

export default Products; 