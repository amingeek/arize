// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // ارسال درخواست به API Nest.js برای لاگین کاربر
      const response = await axios.post(
        'https://nest-naft.liara.run/users/login',
        {
          email,
          password,
        }
      );

      // اگر عملیات لاگین موفقیت‌آمیز بود
      res.status(200).json(response.data);
    } catch (error) {
      // اگر عملیات لاگین ناموفق بود
      res.status(401).json({ message: 'Login failed' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
