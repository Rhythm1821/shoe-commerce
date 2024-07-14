import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const response = await fetch('/api/users/buyer/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Login successful');
      return data;
    } else {
      console.error('Login failed');
    }
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md w-1/3 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      <div className="mb-4">
        <Label htmlFor="email" className="block mb-1">
          Email
        </Label>
        <Input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="password" className="block mb-1">
          Password
        </Label>
        <Input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <Button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
