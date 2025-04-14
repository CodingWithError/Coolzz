import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Box,
  useTheme,
  styled,
} from '@mui/material';
import {
  ShoppingCart,
  AccountCircle,
  Menu as MenuIcon,
  AcUnit,
  Air,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { motion } from 'framer-motion';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(15, 14, 23, 0.8)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
}));

const NavButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '0%',
    height: '2px',
    bottom: 0,
    left: '50%',
    background: theme.palette.primary.main,
    transition: 'all 0.3s ease',
  },
  '&:hover::after': {
    width: '100%',
    left: '0%',
  },
}));

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate('/');
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      <StyledAppBar position="sticky">
        <Toolbar>
          <LogoContainer onClick={() => navigate('/')}>
            <AcUnit sx={{ color: theme.palette.primary.main }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
              CoolBreeze
            </Typography>
          </LogoContainer>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <NavButton
              color="inherit"
              startIcon={<AcUnit />}
              onClick={() => navigate('/products?category=ac')}
            >
              ACs
            </NavButton>
            <NavButton
              color="inherit"
              startIcon={<Air />}
              onClick={() => navigate('/products?category=fan')}
            >
              Fans
            </NavButton>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              color="inherit"
              onClick={() => navigate('/cart')}
            >
              <Badge badgeContent={items.length} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {user ? (
              <>
                <IconButton
                  onClick={handleMenu}
                  color="inherit"
                >
                  {user.avatar ? (
                    <Avatar src={user.avatar} sx={{ width: 32, height: 32 }} />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {user.role === 'admin' && (
                    <MenuItem onClick={() => {
                      handleClose();
                      navigate('/admin');
                    }}>
                      Admin Dashboard
                    </MenuItem>
                  )}
                  <MenuItem onClick={() => {
                    handleClose();
                    navigate('/profile');
                  }}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => {
                    handleClose();
                    navigate('/orders');
                  }}>
                    Orders
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                color="primary"
                variant="contained"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </StyledAppBar>
    </motion.div>
  );
};

export default Navbar; 