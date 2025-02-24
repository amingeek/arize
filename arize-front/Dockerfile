# استفاده از تصویر Node.js به عنوان پایه
FROM node:21.6.1

# تنظیم محیط کار
WORKDIR /usr/src/app

# کپی کردن فایل‌های package.json و package-lock.json
COPY package*.json ./

# نصب وابستگی‌ها
RUN npm install --force

# کپی کردن کدها و فایل‌های پروژه
COPY . .

# اجرای دستور build برای پروژه Next.js
RUN npm run build

# پورتی که Next.js از آن استفاده می‌کند را اعلام می‌کنیم (پیش‌فرض 3000)
EXPOSE 3000

# دستوری برای اجرای برنامه Next.js
CMD ["npm", "start"]
