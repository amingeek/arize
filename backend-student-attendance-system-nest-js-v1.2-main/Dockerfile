# استفاده از تصویر Node.js به عنوان پایه
FROM node:latest

# تنظیم محیط کار
WORKDIR /usr/src/app

# کپی کردن فایل‌های package.json و package-lock.json
COPY package*.json ./

# نصب وابستگی‌ها
RUN npm install --force 

# ایجاد ساختار دیتابیس توسط Prisma
RUN npx prisma generate

# کپی کردن کدها و فایل‌های پروژه
COPY . .

# پورتی که نست جی اس از آن استفاده می‌کند را اعلام می‌کنیم (پیش‌فرض 3000)
EXPOSE 3001

# دستوری برای اجرای برنامه Next.js
CMD ["npm", "start"]
