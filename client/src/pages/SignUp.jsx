import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Textbox from '../components/Textbox';
import Button from '../components/Button';
import { useSelector } from 'react-redux';
import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const SignUp = () => {
  const { user } = useSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();

  const submitHandler = async (data) => {
    setIsSubmitting(true);
    setError(null); // Reset error on new submission

    // Validate if passwords match
    if (data.password !== data.confirm_password) {
      setError('Passwords do not match!');
      setIsSubmitting(false);
      return;
    }

    // Basic password strength check (could be customized further)
    const passwordStrength = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
    if (!passwordStrength.test(data.password)) {
      setError(
        'Password must contain at least one uppercase letter, one number, and one special character.'
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        isAdmin: data.isAdmin,
        role: data.role,
        title: data.title,
      };

      const response = await axios.post(
        SERVER_URL + '/api/user/register',
        payload
      );

      if (response.status === 201) {
        alert('Registration Successful');
        navigate('/log-in'); // Redirect to login page after successful sign up
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Signup failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (user.isActive) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
        {/* Left Side */}
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

        {/* Right Side */}
        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
          >
            <div className="">
              <p className="text-blue-600 text-3xl font-bold text-center">
                Sign Up!
              </p>
              <p className="text-center text-base text-gray-700">
                We keep all your credentials safe.
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
              {/* Name Field */}
              <Textbox
                placeholder="John Doe"
                type="text"
                name="name"
                label="Full Name"
                className="w-full rounded-full"
                register={register('name', {
                  required: 'Full Name is required!',
                  minLength: {
                    value: 3,
                    message: 'Name should be at least 3 characters long',
                  },
                })}
                error={errors.name ? errors.name.message : ''}
              />

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
                    message: 'Please enter a valid email address',
                  },
                })}
                error={errors.email ? errors.email.message : ''}
              />

              {/* Password Field */}
              <Textbox
                placeholder="Your password"
                type="password"
                name="password"
                label="Password"
                className="w-full rounded-full"
                register={register('password', {
                  required: 'Password is required!',
                  minLength: {
                    value: 6,
                    message: 'Password should be at least 6 characters long',
                  },
                })}
                error={errors.password ? errors.password.message : ''}
              />

              {/* Confirm Password Field */}
              <Textbox
                placeholder="Confirm your password"
                type="password"
                name="confirm_password"
                label="Confirm Password"
                className="w-full rounded-full"
                register={register('confirm_password', {
                  required: 'Confirm Password is required!',
                })}
                error={
                  errors.confirm_password ? errors.confirm_password.message : ''
                }
              />

              {/* Role Field */}
              <Textbox
                placeholder="e.g. Developer"
                type="text"
                name="role"
                label="Role"
                className="w-full rounded-full"
                register={register('role', {
                  required: 'Role is required!',
                })}
                error={errors.role ? errors.role.message : ''}
              />

              {/* Title Field */}
              <Textbox
                placeholder="e.g. Designer"
                type="text"
                name="title"
                label="Title"
                className="w-full rounded-full"
                register={register('title', {
                  required: 'Title is required!',
                })}
                error={errors.title ? errors.title.message : ''}
              />

              {/* Admin Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isAdmin"
                  name="isAdmin"
                  {...register('isAdmin')}
                  className="form-checkbox"
                />
                <label htmlFor="isAdmin" className="text-sm text-gray-700">
                  Are you an Admin?
                </label>
              </div>

              <span className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer">
                Already Registered? <a href="/log-in">Go to Login</a>
              </span>

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

export default SignUp;
