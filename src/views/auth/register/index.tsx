'use client';

import type React from 'react';
import Link from 'next/link';
import Input from '@/components/ui/form/Input';
import EyeIcon from '@/components/icons/Eye';
import EyeSlashIcon from '@/components/icons/EyeSlash';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import useRegister from './hooks/useRegister';

const RegisterView: React.FC = () => {
  const { form, showPassword, onShow, onSubmit } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="flex flex-col md:items-center gap-2 mb-5 sm:mb-8">
          <h1 className="text-2xl font-bold mb-1">Create Your Account</h1>
          <span className="text-sm text-gray-500">
            Fill in your details to get started with Marketplace.
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <Input
                id="email"
                autoComplete="off"
                label="Email"
                placeholder="Enter Email"
                error={errors.email?.message}
                required
                {...register('email')}
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <Input
                id="name"
                label="Name"
                placeholder="Enter Name"
                error={errors.name?.message}
                required
                {...register('name')}
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <Input
                id="phone"
                label="Phone"
                placeholder="Enter Phone"
                error={errors.phone?.message}
                inputMode="numeric"
                required
                {...register('phone')}
              />
            </div>

            <div className="col-span-12">
              <Input
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                icon={
                  <div className="cursor-pointer" onClick={onShow}>
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

            <div className="col-span-12">
              <ButtonPrimary type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
                Register
              </ButtonPrimary>
            </div>

            <div className="col-span-12">
              <div className="flex justify-center gap-1 text-sm text-gray-500">
                <span>Already have an account?</span>
                <Link href="/login" className="text-primary">
                  Login
                </Link>
              </div>
            </div>

            <div className="col-span-12">
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

export default RegisterView;
