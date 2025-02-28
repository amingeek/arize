// pages/api/getData.ts

import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // ایجاد اتصال به دیتابیس MySQL
    const connection = await mysql.createConnection({
      host: 'himalayas.liara.cloud',
      port: 30290, // پورت دیفالت برای MySQL معمولاً 3306 است، اگر پورت شما متفاوت است، اینجا تغییر دهید
      user: 'root',
      password: 'XSYrbTJ2bjpDtg5lE8liZTpx',
      database: 'admiring_varahamihira'
    });

    // اجرای کوئری برای دریافت اطلاعات از جدول NewPerson
    const [rows, fields] = await connection.execute<any[]>('SELECT face, firstName, lastName, nationalCode, studentId FROM NewPerson');

    // بستن اتصال با دیتابیس MySQL
    await connection.end();

    // ارسال اطلاعات به کلاینت
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
