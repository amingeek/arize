// pages/protected.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login'); // اگر کاربر لاگین نکرده باشد، به صفحه‌ی لاگین هدایت شود
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return <p>در حال انتقال به صفحه‌ی لاگین...</p>; // یا یک اسپینر نمایش دهید
  }

  return (
    <div>
      <h1>صفحه‌ی محافظت‌شده</h1>
      <p>شما با موفقیت لاگین کرده‌اید!</p>
    </div>
  );
}