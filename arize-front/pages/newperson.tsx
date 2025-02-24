import React, { useState, FormEvent, ChangeEvent } from 'react';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { S3 } from 'aws-sdk';

const NewPersonForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [nationalCode, setNationalCode] = useState<string>('');
  const [studentId, setStudentId] = useState<string>('');

  const ACCESSKEY = '7pa7t646vv39t3ig';                    
  const SECRETKEY = '02816607-22a1-49b0-9aea-965eba800834';                    
  const ENDPOINT  = 'https://storage.iran.liara.space'; 
  const BUCKET    = 'nest';                   

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        toast.error('لطفاً یک فایل را انتخاب کنید');
        return;
      }
  
      if (!firstName || !lastName || !nationalCode || !studentId) {
        toast.error('لطفاً تمامی فیلدها را پر کنید');
        return;
      }
  
      const s3 = new S3({
        accessKeyId: ACCESSKEY,
        secretAccessKey: SECRETKEY,
        endpoint: ENDPOINT,
      });
  
      const params = {
        Bucket: BUCKET,
        Key: file.name,
        Body: file,
      };
  
      const response = await s3.upload(params).promise();
      const signedUrl = s3.getSignedUrl('getObject', {
        Bucket: BUCKET,
        Key: file.name,
        Expires: 3600,
      });
  
      // برای اینجا باید عملیات‌های مورد نیاز پس از آپلود فایل را انجام دهید، مانند ذخیره سازی نام فایل یا دریافت لینک فایل آپلود شده و نمایش آن در فرم
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file: ', error);
      toast.error('خطا در آپلود فایل: ');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName || !lastName || !nationalCode || !studentId) {
      toast.error('لطفاً تمامی فیلدها را پر کنید');
      return;
    }

    try {
      const formData = new FormData();

      if (file) {
        formData.append('file', file);
      }

      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('nationalCode', nationalCode);
      formData.append('studentId', studentId);

      const response = await axios.post('/api/new-person', formData);

      if (response.status === 200) {
        const data = response.data;
        console.log('Data saved successfully:', data);
        toast.success('اطلاعات با موفقیت ثبت شدند!');
      } else {
        console.error('Failed to save data:', response.statusText);
        toast.error('ثبت اطلاعات ناموفق بود. لطفاً مجدداً تلاش کنید.');
      }
    } catch (error) {
      console.error('Failed to save data:', error);
      toast.error('ثبت اطلاعات ناموفق بود. لطفاً مجدداً تلاش کنید.');
    }
  };

  const handleNumericInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // اگر ورودی غیر از عدد باشد، یک پیام هشدار نمایش داده می‌شود
    if (!/^\d$/.test(e.key)) {
      toast.error('لطفاً فقط عدد وارد کنید');
      e.preventDefault();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: '20px', maxWidth: '400px', width: '100%' }}>
          <Typography component="h1" variant="h5" sx={{ marginBottom: '20px' }}>
            صفحه شخص جدید
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ marginBottom: '20px' }}>
              <TextField
                fullWidth
                label="نام"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Box>
            <Box sx={{ marginBottom: '20px' }}>
              <TextField
                fullWidth
                label="نام خانوادگی"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Box>
            <Box sx={{ marginBottom: '20px' }}>
              <TextField
                fullWidth
                label="کد ملی"
                value={nationalCode}
                onChange={(e) => {
                  // فقط اعداد را قبول می‌کنیم
                  const value = e.target.value.replace(/[^\d]/g, '');
                  setNationalCode(value);
                }}
                onKeyPress={handleNumericInput}
              />
            </Box>
            <Box sx={{ marginBottom: '20px' }}>
              <TextField
                fullWidth
                label="شماره دانش‌آموزی"
                value={studentId}
                onChange={(e) => {
                  // فقط اعداد را قبول می‌کنیم
                  const value = e.target.value.replace(/[^\d]/g, '');
                  setStudentId(value);
                }}
                onKeyPress={handleNumericInput}
              />
            </Box>
            <Box sx={{ marginBottom: '20px' }}>
              <input
                type="file"
                onChange={handleFileChange}
                style={{ display: 'block' }}
                accept="image/*"
              />
              <p>آپلود عکس: {file?.name || 'هیچ فایلی انتخاب نشده است'}</p>
              <Typography variant="body2" sx={{ fontSize: 'small', color: 'red' }}>
                دقت کنید برای اپلود فایل عکس حتما از فرمت jpg استفاده کنید و اسم فایل رو کد ملی شخص بزارید 
              </Typography>
            </Box>
            <Button type="submit" fullWidth variant="contained" onClick={handleUpload}>
              آپلود
            </Button>
          </form>
        </Paper>
      </Box>

      <ToastContainer position="bottom-right" />
    </Container>
  );
};

export default NewPersonForm;
