'use client';

import type React from 'react';
import type { Session } from '@/types/commons.types';
import { useEffect } from 'react';
import { useNetwork } from '@/contexts/network.context';
import { AuthProvider } from '@/contexts/auth.context';
import AppNavbar from './AppNavbar';
import Notification from '../ui/notification/Notification';

type AppMarketplaceLayoutProps = {
  session: Session;
  children: React.ReactNode;
};

const AppMarketplaceLayout: React.FC<AppMarketplaceLayoutProps> = ({ session, children }) => {
  const { isOnline, connectionRef } = useNetwork();

  useEffect(() => {
    const wasOnline = connectionRef.current;

    if (wasOnline !== null && wasOnline !== isOnline) {
      Notification({
        message: isOnline ? 'Connected to internet' : 'You are offline',
        description: isOnline
          ? 'Your network connection has been restored.'
          : 'Please check your connection and try again.',
        type: isOnline ? 'success' : 'error',
      });
    }

    connectionRef.current = isOnline;
  }, [isOnline, connectionRef]);

  return (
    <AuthProvider initialAuth={session}>
      <div className="flex flex-col min-h-dvh">
        {/* NAVBAR */}
        <AppNavbar />
        {/* MAIN CONTENT */}
        <main className="flex-1 max-w-7xl 2xl:max-w-screen-2xl mx-auto">{children}</main>
      </div>
    </AuthProvider>
  );
};

export default AppMarketplaceLayout;
