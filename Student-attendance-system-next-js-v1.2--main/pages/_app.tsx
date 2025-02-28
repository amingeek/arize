import '@/styles/globals.css';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Login from '../components/Login';
import { useRouter } from 'next/router';
import ChatBot from '../components/ChatBot';


function MyApp({ Component, pageProps }: AppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // بررسی وضعیت لاگین
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // مسیرهایی که نیاز به لاگین دارند
  const protectedRoutes = ['/dashboard', '/profile']; // مسیرهای محافظت‌شده

  // بررسی آیا مسیر فعلی نیاز به لاگین دارد
  const isProtectedRoute = protectedRoutes.includes(router.pathname);

  return (
    <>
      {!isLoggedIn && isProtectedRoute ? (
        // اگر کاربر لاگین نکرده باشد و مسیر نیاز به لاگین داشته باشد، صفحه Login نمایش داده می‌شود
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        // در غیر این صورت، محتوای صفحه درخواستی نمایش داده می‌شود
        // <Layout isLoggedIn={isLoggedIn}>
        //   <Component {...pageProps} />
        // </Layout>

        <ChatBot>
          
        </ChatBot>
      )}
    </>
  );
}

export default MyApp;