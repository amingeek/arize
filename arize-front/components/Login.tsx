import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { Button, TextField, Container, Paper, Typography, Box, Link } from '@mui/material';
import Image from 'next/image';
import { useAuth } from '../hooks/useAuth';

interface LoginProps {
  onLoginSuccess: () => void;
  backgroundImage: string;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, backgroundImage }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      login(token);

      toast.success('ورود موفقیت‌آمیز!');

      setTimeout(() => {
        onLoginSuccess();
        router.push('/');
      }, 1000);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'خطایی رخ داده است. لطفاً دوباره تلاش کنید.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    if (!email || !password) {
      toast.error('لطفاً تمامی فیلدها را پر کنید');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('لطفاً یک ایمیل معتبر وارد کنید');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    handleLogin();
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        backgroundColor: 'rgb(245, 245, 245)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image src={backgroundImage} layout="fill" objectFit="cover" alt="تصویر بک‌گراند" priority />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Paper elevation={3} sx={{ padding: '20px', width: '100%' }}>
              <div>
                {error && <p style={{ color: error.includes('successful') ? 'green' : 'red' }}>{error}</p>}
                <Typography component="h1" variant="h5" sx={{ marginBottom: '20px' }}>
                  صفحه ورود
                </Typography>
              </div>
              <div>
                <TextField
                  type="email"
                  label="ایمیل"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  variant="outlined"
                  style={{ marginBottom: '20px' }}
                  inputProps={{ style: { fontSize: 18 } }}
                />
              </div>
              <div>
                <TextField
                  type="password"
                  label="پسورد"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  variant="outlined"
                  style={{ marginBottom: '20px' }}
                  inputProps={{ style: { fontSize: 18 } }}
                />
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: 'blue', color: 'white' }}
                disabled={isLoading}
              >
                {isLoading ? 'در حال ورود...' : 'ورود'}
              </Button>
              <Typography variant="body2" sx={{ marginTop: '10px' }}>
                حساب کاربری ندارید؟{' '}
                <Link href="/register" style={{ color: 'blue', textDecoration: 'none' }}>
                  ثبت‌نام کنید
                </Link>
              </Typography>
            </Paper>
          </form>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Login;