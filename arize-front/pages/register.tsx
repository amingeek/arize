// pages/register.tsx
import React, { useState, FormEvent } from 'react';
import axios from 'axios';

const RegisterPage: React.FC = () => {
  const [Username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/register', {
        Username,
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
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Roles</label>
          <div>
            <label>
              <input
                type="checkbox"
                value="admin"
                checked={roles.includes('admin')}
                onChange={handleRoleChange}
              />
              Admin
            </label>
            <label>
              <input
                type="checkbox"
                value="user"
                checked={roles.includes('user')}
                onChange={handleRoleChange}
              />
              User
            </label>
            {/* دیگر نقش‌ها ... */}
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
