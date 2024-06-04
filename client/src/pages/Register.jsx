import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRegisterMutation } from '../redux/slices/api/authApiSlice';
import leftimg from "../assets/angry.gif"

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    title: '',
    role: '',
  });

  const navigate = useNavigate();
  const [register, { isLoading, error }] = useRegisterMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await register(formData).unwrap();
      console.log('User registered:', response);
      navigate('/log-in');
    } catch (error) {
      console.error('Failed to register:', error);
    }
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#100C08]'>
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        {/* Left side */}
        <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700'>
              <span>Simplify Your</span>
              <span>Workflow</span>
            </p>
            <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600'>
              Your team without TaskShpere 😉
            </span>
            <div className='cell'>
            <img src={leftimg} alt
              =""/>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <form
            onSubmit={handleSubmit}
            className='form-container w-full md:w-[400px] flex flex-col gap-y-4 bg-[#030637] px-6 pt-8 pb-8 rounded-xl'
          >
            <div>
              <p className='text-blue-600 text-2xl font-bold text-center'>
                Register
              </p>
              <p className='text-center text-sm text-gray-400'>
                Keep all your credentials safe.
              </p>
            </div>

            <div className='flex flex-col gap-y-3'>
              <div>
                <label className='block text-white text-sm'>Name</label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='w-full p-2 rounded-xl bg-gray-700 text-white text-sm'
                />
              </div>
              <div>
                <label className='block text-white text-sm'>Email</label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='w-full p-2 rounded-xl bg-gray-700 text-white text-sm'
                />
              </div>
              <div>
                <label className='block text-white text-sm'>Password</label>
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className='w-full p-2 rounded-xl bg-gray-700 text-white text-sm'
                />
              </div>
              <div>
                <label className='block text-white text-sm'>Confirm Password</label>
                <input
                  type='password'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className='w-full p-2 rounded-xl bg-gray-700 text-white text-sm'
                />
              </div>
              <div>
                <label className='block text-white text-sm'>Title</label>
                <input
                  type='text'
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className='w-full p-2 rounded-xl bg-gray-700 text-white text-sm'
                />
              </div>
              <div>
                <label className='block text-white text-sm'>Role</label>
                <input
                  type='text'
                  name='role'
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className='w-full p-2 rounded-xl bg-gray-700 text-white text-sm'
                />
              </div>
              {error && (
                <div className='text-red-500 text-sm'>
                  {error?.data?.message || 'Registration failed'}
                </div>
              )}
              <button
                type='submit'
                className='w-full p-2 bg-[#2B2A4C] text-white rounded-full hover:black hover:bg-opacity-60'
                disabled={isLoading}
              >
                {isLoading ? 'Registering..🚀' : 'Register'}
              </button>
              <p className='text-white text-sm text-center'>
                Already have an account? <Link to='/log-in'><span className='text-white hover:text-blue-400'>Login</span></Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
