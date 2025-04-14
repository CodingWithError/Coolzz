import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'fan' | 'ac';
  image: string;
  rating: number;
  reviews: number;
  colors: string[];
  sizes?: string[];
  features: string[];
  stock: number;
}

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  filters: {
    category: string | null;
    priceRange: [number, number];
    colors: string[];
    rating: number | null;
  };
}

// Initial products data
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Premium AC 1.5 Ton',
    price: 499.99,
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
    price: 89.99,
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
    price: 699.99,
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
    price: 49.99,
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
    price: 399.99,
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
    price: 69.99,
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

const initialState: ProductsState = {
  items: initialProducts,
  loading: false,
  error: null,
  filters: {
    category: null,
    priceRange: [0, 1000],
    colors: [],
    rating: null,
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setFilters: (state, action: PayloadAction<Partial<ProductsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { setProducts, setLoading, setError, setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer; 