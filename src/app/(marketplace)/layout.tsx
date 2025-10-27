import type React from 'react';
import { getSession } from '@/libs/utils/session';
import AppMarketplaceLayout from '@/components/layouts/AppMarketplace';

const MarketplaceLayoutPage: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const session = await getSession();

  return (
    <AppMarketplaceLayout
      session={{
        isLogin: session.isLogin,
        token: session.token,
      }}
    >
      {children}
    </AppMarketplaceLayout>
  );
};

export default MarketplaceLayoutPage;
