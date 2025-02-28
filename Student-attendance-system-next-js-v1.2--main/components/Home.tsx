// components/Home.tsx

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // نمایش الرت نوتیف خوش‌آمدگویی
    toast.success('خوش آمدید به صفحه Home!');

    // دریافت اطلاعات کاربر از localStorage
    const token = localStorage.getItem('token');
    if (token) {
      const { user } = JSON.parse(token);
      setUser(user.name);
    }
  }, []);

  return (
    <div>
      {user && <h1>{`خوش آمدید ${user}!`}</h1>}
      {/* محتوای صفحه Home */}
    </div>
  );
};

export default Home;
