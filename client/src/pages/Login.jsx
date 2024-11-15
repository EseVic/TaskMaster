import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Textbox from '../components/Textbox';
import Button from '../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';
import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null); // For handling error messages
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Redirect if the user is already logged in
  useEffect(() => {
    if (user && user.isActive) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const submitHandler = async (data) => {
    setIsSubmitting(true);
    setError(null); // Clear any previous errors

    try {
      const response = await axios.post(SERVER_URL + '/api/user/login', {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        // Dispatch user credentials to redux store
        dispatch(setCredentials(response.data));

        // Redirect to dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      // Handle error (e.g., invalid credentials)
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
        {/* Left side */}
        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
            <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600">
              Manage all your tasks in one place!
            </span>
            <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
              <span>Cloud-Based</span>
              <span>Task Manager</span>
            </p>

            <div className="cell">
              <div className="circle rotate-in-up-left"></div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
          >
            <div className="">
              <p className="text-blue-600 text-3xl font-bold text-center">
                Welcome back!
              </p>
              <p className="text-center text-base text-gray-700">
                Keep all your credentials safe.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div
                role="alert"
                aria-live="assertive"
                className="text-red-600 text-center mb-4"
              >
                {error}
              </div>
            )}

            <div className="flex flex-col gap-y-5">
              {/* Email Field */}
              <Textbox
                placeholder="email@example.com"
                type="email"
                name="email"
                label="Email Address"
                className="w-full rounded-full"
                register={register('email', {
                  required: 'Email Address is required!',
                  pattern: {
                    value: /^[^@]+@[^@]+\.[^@]+$/,
                    message: 'Invalid email format',
                  },
                })}
                error={errors.email ? errors.email.message : ''}
              />
              {/* Password Field */}
              <Textbox
                placeholder="your password"
                type="password"
                name="password"
                label="Password"
                className="w-full rounded-full"
                register={register('password', {
                  required: 'Password is required!',
                })}
                error={errors.password ? errors.password.message : ''}
              />

              {/* Forgot Password Link */}
              <span className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer">
                Forgot Password?
              </span>
              {/* Sign Up Link */}
              <span className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer">
                Not Registered? <a href="/signup">Sign Up Now</a>
              </span>

              {/* Submit Button */}
              <Button
                type="submit"
                label={isSubmitting ? 'Submitting...' : 'Submit'}
                className="w-full h-10 bg-blue-700 text-white rounded-full"
                disabled={isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
