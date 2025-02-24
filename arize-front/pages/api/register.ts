// pages/api/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    try {
      const response = await axios.post(
        'https://nest-naft.liara.run/users/register',
        { username, email, password }
      );

      res.status(200).json(response.data);
    } catch (error) {
      res.status(400).json({ message: 'Registration failed' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};