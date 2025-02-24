// index.tsx

import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

const IndexPage: React.FC = () => {
  const router = useRouter();

  //const handleLogout = () => {
    //localStorage.removeItem('token'); // حذف توکن از localStorage
    //router.reload(); // رفرش کردن صفحه برای به‌روزرسانی وضعیت لاگین
  //};

  return (
    <div>
      <h1>داشبورد</h1>
      
    </div>
  );
};

export default IndexPage;