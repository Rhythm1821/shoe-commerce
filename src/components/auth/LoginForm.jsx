import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { postLoginDetails } from '@/utils/api-client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const LoginForm = ({type}) => {
  const router = useRouter()
  const [formData, setFormData] = useState({email: '',password: ''});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData,[name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await postLoginDetails(formData, type);
    const message = await response.json();

    if (response.status === 200) {
      console.log(message);
      router.push('/')
      return message;
    } else {
      console.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded shadow-md w-1/3 mx-auto text-gray-700">
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
      <h6 className="text-center mt-4 text-sm text-blue-600 hover:text-blue-900">Don't have an account? <a href={`/${type === 'buyer' ? 'register' : 'seller/register'}`}>Register here</a></h6>
    </form>
  );
};

export default LoginForm;
