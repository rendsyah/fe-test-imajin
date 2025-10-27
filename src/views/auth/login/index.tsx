'use client';

import type React from 'react';
import Link from 'next/link';
import Input from '@/components/ui/form/Input';
import EyeIcon from '@/components/icons/Eye';
import EyeSlashIcon from '@/components/icons/EyeSlash';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import useLogin from './hooks/useLogin';

const LoginView: React.FC = () => {
  const { form, showPassword, onShow, onSubmit } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="flex flex-col items-center gap-2 mb-5 sm:mb-8">
          <h1 className="text-2xl text-center font-bold mb-1">Welcome Back to Marketplace</h1>
          <span className="text-sm text-gray-500">
            Enter your credentials to access your account.
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="space-y-6">
            <div>
              <Input
                id="email"
                autoComplete="off"
                label="Email"
                placeholder="Enter Email"
                error={errors.user?.message}
                required
                {...register('user')}
              />
            </div>

            <div>
              <Input
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                icon={
                  <div className="text-black cursor-pointer" onClick={onShow}>
                    {showPassword ? (
                      <EyeIcon className="w-5 h-5" />
                    ) : (
                      <EyeSlashIcon className="w-5 h-5" />
                    )}
                  </div>
                }
                iconPosition="right"
                error={errors.password?.message}
                required
                {...register('password')}
              />
            </div>

            <ButtonPrimary type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
              Log in
            </ButtonPrimary>

            <div className="flex justify-center gap-1 text-sm text-gray-500">
              <span>Dont have an account?</span>
              <Link href="/register" className="text-primary">
                Register
              </Link>
            </div>

            <div>
              <p className="text-center text-sm text-gray-500">
                &copy; 2025 Marketplace. All Right Reserved
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
