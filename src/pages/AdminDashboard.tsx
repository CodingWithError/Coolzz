import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  useTheme,
  styled,
} from '@mui/material';
import {
  ShoppingCart,
  Inventory,
  LocalShipping,
  Edit,
  Delete,
  Add,
  TrendingUp,
  AttachMoney,
  People,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  background: theme.palette.background.paper,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const AdminDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const { user } = useSelector((state: RootState) => state.auth);

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  // Mock data
  const stats = [
    {
      title: 'Total Orders',
      value: '156',
      icon: ShoppingCart,
      color: theme.palette.primary.main,
    },
    {
      title: 'Revenue',
      value: '$4,28,900',
      icon: AttachMoney,
      color: theme.palette.success.main,
    },
    {
      title: 'Products',
      value: '45',
      icon: Inventory,
      color: theme.palette.warning.main,
    },
    {
      title: 'Customers',
      value: '1,245',
      icon: People,
      color: theme.palette.info.main,
    },
  ];

  const orders = [
    {
      id: '1',
      customer: 'John Doe',
      items: 3,
      total: '$45,000',
      status: 'Pending',
      date: '2024-03-15',
    },
    // Add more orders
  ];

  const products = [
    {
      id: '1',
      name: 'Premium AC 1.5 Ton',
      category: 'ac',
      price: '$35,000',
      stock: 10,
    },
    // Add more products
  ];

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <StatsCard>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <stat.icon sx={{ fontSize: 40, color: stat.color }} />
                <TrendingUp sx={{ color: theme.palette.success.main }} />
              </Box>
              <Typography variant="h4" gutterBottom>
                {stat.value}
              </Typography>
              <Typography color="text.secondary">
                {stat.title}
              </Typography>
            </StatsCard>
          </motion.div>
        ))}
      </Box>

      <Paper sx={{ borderRadius: theme.shape.borderRadius * 2 }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Orders" />
          <Tab label="Products" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>#{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={
                          order.status === 'Pending'
                            ? 'warning'
                            : order.status === 'Delivered'
                            ? 'success'
                            : 'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <IconButton size="small" color="primary">
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => {/* Handle add product */}}
            >
              Add Product
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>#{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={product.category.toUpperCase()}
                        size="small"
                        color={product.category === 'ac' ? 'primary' : 'secondary'}
                      />
                    </TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <IconButton size="small" color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default AdminDashboard; 