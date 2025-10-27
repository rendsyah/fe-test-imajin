'use client';

import type React from 'react';

type AppAuthLayoutProps = {
  children: React.ReactNode;
};

const AppAuthLayout: React.FC<AppAuthLayoutProps> = ({ children }) => {
  return (
    <div className="p-6 sm:p-0">
      {/* MAIN CONTENT */}
      <div className="flex flex-col lg:flex-row w-full h-dvh justify-center sm:p-0">{children}</div>
    </div>
  );
};

export default AppAuthLayout;
