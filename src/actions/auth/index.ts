'use server';

import type { Login, Register } from '@/types/auth.types';
import { redirect } from 'next/navigation';
import { setSession } from '@/libs/utils/session';
import { catchServerRoute } from '@/libs/utils/catch';
import { Routes } from '@/libs/constants/routes.const';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';

export const RegisterApi = async (data: Register) => {
  try {
    await externalAPI.post(Routes.AUTH_REGISTER, data);
    redirect('/login');
  } catch (error) {
    return await catchServerRoute(error);
  }
};

export const LoginApi = async (data: Login) => {
  try {
    const response = await externalAPI.post(Routes.AUTH_LOGIN, data);
    await setSession(response.data.data.access_token);
    redirect('/');
  } catch (error) {
    return await catchServerRoute(error);
  }
};
