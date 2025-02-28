import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { Button, TextField, Container, Paper, Typography, Box, FormControlLabel, Checkbox } from '@mui/material';
import Image from 'next/image';
import validator from 'validator';

interface LoginProps {
  onLoginSuccess: () => void;
  backgroundImage: string;
  redirect?: string;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, backgroundImage, redirect }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
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

      // Save token to localStorage یا sessionStorage
      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }

      setError('');

      toast.success('ورود موفقیت‌آمیز!');

      setTimeout(() => {
        onLoginSuccess();
        router.push(redirect || '/'); // هدایت به مسیر قبلی یا صفحه اصلی
      }, 1000);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'ورود ناموفق. لطفاً اطلاعات را بررسی کنید.';
      toast.error(errorMessage);
      setError(errorMessage);
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

    if (!validator.isEmail(email)) {
      toast.error('لطفاً یک ایمیل معتبر وارد کنید');
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
      <Image
        src={backgroundImage}
        layout="fill"
        objectFit="cover"
        alt="تصویر بک‌گراند"
        priority
      />
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
              <FormControlLabel
                control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                label="مرا به خاطر بسپار"
              />
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