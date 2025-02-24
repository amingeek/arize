// pages/login.tsx
import { useState } from 'react';
import Login from '../components/Login';
import backgroundImage from '../public/login-bg.svg';

export default function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    window.location.href = '/protected'; // بعد از لاگین موفق، به صفحه‌ی محافظت‌شده هدایت شود
  };

  return (
    <Login onLoginSuccess={handleLoginSuccess} backgroundImage={backgroundImage} />
  );
}