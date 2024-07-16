import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { postRegisterDetails } from '@/utils/api-client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const RegisterForm = ({ type }) => {
  const router = useRouter()
  const [formData, setFormData] = useState({username: '',email: '',password: '',confirmPassword: '', companyName: '', contactInfo: ''});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData,[name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData", formData);
    const res = await postRegisterDetails(formData, type)
    const { message } = await res.json();
    if (res.status === 201) {
      console.log(message);
      router.push('/')
      return message
    } else {
      console.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md w-1/3 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <div className="mb-4">
        <Label htmlFor="username" className="block mb-1">
          Username
        </Label>
        <Input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      {
        type === 'seller' && (
          <>
            <div className="mb-4">
              <Label htmlFor="companyName" className="block mb-1">
                Company Name
              </Label>
              <Input
                type="text"
                name="companyName"
                id="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="contactInfo" className="block mb-1">
                Contact Info
              </Label>
              <Input
                type="text"
                name="contactInfo"
                id="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </>
        )
      }

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

      <div className="mb-4">
        <Label htmlFor="confirmPassword" className="block mb-1">
          Confirm Password
        </Label>
        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <Button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Register
      </Button>
      <h6 className="text-center mt-4 text-sm text-blue-600 hover:text-blue-900">Already have an account? <a href={`/${type==='buyer' ? 'login' : 'seller/login'}`}>Login here</a></h6>
    </form>
  );
};

export default RegisterForm;
