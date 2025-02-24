import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { Button, TextField, Container, Paper, Typography, Box } from '@mui/material';
import Image from 'next/image';


interface LoginProps {
  onLoginSuccess: () => void;
  backgroundImage: string; // یا هر تایپ دلخواه دیگر مانند any
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, backgroundImage }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });

      console.log('Login successful', response.data);

      const { token, user } = response.data;

      // Save token to localStorage
      localStorage.setItem('token', token);

      setError('');

      toast.success('ورود موفقیت‌آمیز!');

      setTimeout(() => {
        onLoginSuccess();
        router.push('/');
      }, 1000);
    } catch (error: any) {
      console.error('Login failed', error.response?.data?.message || 'An error occurred');
      toast.error('ورود ناموفق. لطفاً اطلاعات را بررسی کنید.');
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('لطفاً تمامی فیلدها را پر کنید');
      return;
    }

    handleLogin();
  };

  return (
    <Box
      sx={{
        position: 'relative', // تعیین موقعیت نسبت به تصویر بک‌گراند
        height: '100vh',
        backgroundColor: 'rgb(245, 245, 245)', // Set background color here
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image src={backgroundImage} layout="fill" objectFit="cover" alt="تصویر بک‌گراند" />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative', // تعیین موقعیت نسبت به تصویر بک‌گراند
            zIndex: 1, // تعیین ترتیب لایه بالا
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
                  onChange={handleEmailChange}
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
                  onChange={handlePasswordChange}
                  fullWidth
                  variant="outlined"
                  style={{ marginBottom: '20px' }}
                  inputProps={{ style: { fontSize: 18 } }}
                />
              </div>
              <Button type="submit" fullWidth variant="contained" style={{ backgroundColor: 'blue', color: 'white' }}>
                ورود
              </Button>
            </Paper>
          </form>
          <ToastContainer position="bottom-right" />
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
