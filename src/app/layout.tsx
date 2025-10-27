import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
import { QueryProvider } from '@/contexts/query.context';
import { NetworkProvider } from '@/contexts/network.context';
import { GlobalProvider } from '@/contexts/global.context';
import './globals.css';

const ModalFeedback = dynamic(() => import('@/components/ui/modal/ModalFeedback'));

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Marketplace',
  description: 'Page of Marketplace',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <QueryProvider>
          <GlobalProvider>
            <NetworkProvider>
              <ModalFeedback />
              <Toaster />
              {children}
            </NetworkProvider>
          </GlobalProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
