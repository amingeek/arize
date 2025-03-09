import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

const IndexPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // بررسی وضعیت لاگین
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        // اگر کاربر لاگین نکرده باشد، به صفحه چت‌بات هدایت می‌شود
        router.push('/chat');
      }
    }۷
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // حذف توکن از localStorage
    router.push('/chat'); // هدایت به صفحه چت‌بات پس از خروج
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>داشبورد</h1>
      <p>خوش آمدید! اینجا پنل کاربری شماست.</p>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        خروج
      </Button>
    </div>
  );
};

export default IndexPage;