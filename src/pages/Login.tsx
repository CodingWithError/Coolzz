import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  IconButton,
  useTheme,
  styled,
} from '@mui/material';
import { Google, Email } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/authSlice';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: 400,
  background: 'rgba(15, 14, 23, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}));

const GradientBorder = styled(Box)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  padding: '2px',
  borderRadius: theme.shape.borderRadius,
}));

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo, create a mock user
    dispatch(setUser({
      id: '1',
      email,
      name: email.split('@')[0],
      role: email === 'admin@example.com' ? 'admin' : 'user',
    }));
    navigate('/');
  };

  const handleGoogleLogin = () => {
    // Mock Google login
    dispatch(setUser({
      id: '2',
      email: 'user@gmail.com',
      name: 'Google User',
      role: 'user',
      avatar: 'https://via.placeholder.com/40',
    }));
    navigate('/');
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
        py: 4,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GradientBorder>
          <StyledPaper elevation={24}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 700,
                textAlign: 'center',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}
            >
              Sign in to continue shopping
            </Typography>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              onClick={handleGoogleLogin}
              sx={{ mb: 3 }}
            >
              Continue with Google
            </Button>

            <Box sx={{ position: 'relative', my: 3 }}>
              <Divider>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', px: 1 }}
                >
                  OR
                </Typography>
              </Divider>
            </Box>

            <form onSubmit={handleEmailLogin}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ mb: 3 }}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                startIcon={<Email />}
                sx={{ mb: 2 }}
              >
                Sign in with Email
              </Button>
            </form>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Button
                  color="primary"
                  onClick={() => navigate('/signup')}
                  sx={{ textTransform: 'none', fontWeight: 'bold' }}
                >
                  Sign up
                </Button>
              </Typography>
            </Box>

            <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                For demo purposes, use:
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  color: theme.palette.primary.main,
                  fontFamily: 'monospace',
                }}
              >
                admin@example.com
              </Typography>
              <Typography variant="caption" color="text.secondary">
                to access admin features
              </Typography>
            </Box>
          </StyledPaper>
        </GradientBorder>
      </motion.div>
    </Container>
  );
};

export default Login; 