import type React from 'react';
import type { Metadata } from 'next';
import RegisterView from '@/views/auth/register';

export const metadata: Metadata = {
  title: 'Register - Marketplace',
  description: 'Register page of Marketplace',
};

const RegisterPage: React.FC = () => {
  return <RegisterView />;
};

export default RegisterPage;
