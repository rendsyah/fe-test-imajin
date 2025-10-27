'use client';

import type React from 'react';
import type { Nullable, Session } from '@/types/commons.types';
import { createSafeContext } from '@/libs/utils/createSafeContext';

type AuthContextProps = Nullable<{
  session: Session;
  logout: () => void;
}>;

const [AuthContext, useAuth] = createSafeContext<AuthContextProps>('Auth');

const AuthProvider: React.FC<{ children: React.ReactNode; initialAuth: Session }> = ({
  children,
  initialAuth,
}) => {
  const logout = async () => {
    await fetch('/api/logout');
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ session: initialAuth, logout }}>{children}</AuthContext.Provider>
  );
};
export { useAuth, AuthProvider };
