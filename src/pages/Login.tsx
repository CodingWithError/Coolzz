import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Paper,
  Divider,
  useTheme,
  styled,
} from '@mui/material';
import { Google, Email } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/authSlice';

const LoginContainer = styled(Container)(({ theme }) => ({
  minHeight: 'calc(100vh - 64px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const LoginCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: 400,
  borderRadius: theme.shape.borderRadius * 2,
  background: theme.palette.background.paper,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const SocialButton = styled(Button)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  fontSize: '1rem',
}));

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, we'll use the admin email to show admin features
    const isAdmin = email === 'admin@example.com';
    dispatch(
      setUser({
        id: '1',
        email,
        name: isAdmin ? 'Admin User' : 'Regular User',
        role: isAdmin ? 'admin' : 'user',
      })
    );
    navigate('/');
  };

  const handleGoogleLogin = () => {
    // Implement Google sign-in logic here
    dispatch(
      setUser({
        id: '2',
        email: 'user@example.com',
        name: 'Google User',
        role: 'user',
      })
    );
    navigate('/');
  };

  return (
    <LoginContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%' }}
      >
        <LoginCard>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome Back
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Sign in to continue shopping
          </Typography>

          <SocialButton
            variant="outlined"
            startIcon={<Google />}
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </SocialButton>

          <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
            <Divider sx={{ flex: 1 }} />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mx: 2 }}
            >
              OR
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

          <form onSubmit={handleEmailLogin}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              startIcon={<Email />}
            >
              Sign in with Email
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Button
                color="primary"
                onClick={() => navigate('/register')}
                sx={{ textTransform: 'none' }}
              >
                Sign up
              </Button>
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 4,
              p: 2,
              borderRadius: 1,
              bgcolor: 'background.default',
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" color="text.secondary" gutterBottom>
              For demo purposes, use:
            </Typography>
            <Typography variant="body2" color="primary">
              admin@example.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              to access admin features
            </Typography>
          </Box>
        </LoginCard>
      </motion.div>
    </LoginContainer>
  );
};

export default Login; 