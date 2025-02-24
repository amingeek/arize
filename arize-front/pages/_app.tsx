// _app.tsx

import '@/styles/globals.css';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Login from '../components/Login';
import backgroundImage from '../public/login-bg.svg'; // اضافه کردن تصویر بک‌گراند

function MyApp({ Component, pageProps }: AppProps) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <Layout isLoggedIn={true} >
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} backgroundImage={backgroundImage} /> 
      )}
    </>
  );
}

export default MyApp;
