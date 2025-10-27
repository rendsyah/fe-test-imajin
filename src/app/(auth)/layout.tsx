import type React from 'react';
import AppAuthLayout from '@/components/layouts/AppAuth';

const AuthLayoutPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AppAuthLayout>{children}</AppAuthLayout>;
};

export default AuthLayoutPage;
