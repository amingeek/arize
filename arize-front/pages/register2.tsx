import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/register', {
        username,
        email,
        password,
        roles,
      });

      console.log('User registered:', response.data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const roleName = e.target.value;
    if (e.target.checked) {
      setRoles((prevRoles) => [...prevRoles, roleName]);
    } else {
      setRoles((prevRoles) => prevRoles.filter((role) => role !== roleName));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          width: 370,
          margin: 'auto',
          marginTop: 13,
          marginBottom: 13,
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          borderRadius: 4,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>صفحه ثبت نام</h1>
        </div>
        <div>
          <label style={{ fontSize: 14 }}>نام کاربری</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: 8, fontSize: 14 }}
          />
        </div>
        <div>
          <label style={{ fontSize: 14 }}>ایمیل</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: 8, fontSize: 14 }}
          />
        </div>
        <div>
          <label style={{ fontSize: 14 }}>پسورد</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: 8, fontSize: 14 }}
          />
        </div>
        <div>
          <label style={{ fontSize: 14 }}>نقش‌ها</label>
          <div>
            <label>
              <input
                type="checkbox"
                value="admin"
                checked={roles.includes('admin')}
                onChange={handleRoleChange}
              />
              مدیر
            </label>
            <label>
              <input
                type="checkbox"
                value="user"
                checked={roles.includes('user')}
                onChange={handleRoleChange}
              />
              کاربر
            </label>
            {/* نقش‌های دیگر ... */}
          </div>
        </div>
        <button
          type="submit"
          style={{
            marginTop: 8,
            padding: 8,
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ثبت نام
        </button>
      </div>
    </form>
  );
};

export default RegisterPage;
