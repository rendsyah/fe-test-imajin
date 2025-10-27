import type React from 'react';
import { useAuth } from '@/contexts/auth.context';
import Link from 'next/link';
import Avatar from '../ui/avatar/Avatar';
import ShoppingCartIcon from '../icons/ShoppingCart';
import ButtonPrimary from '../ui/button/ButtonPrimary';

const AppNavbar: React.FC = () => {
  const { session, logout } = useAuth();

  return (
    <div className="w-full sticky bg-white border-b border-gray-200 top-0 z-999 p-6">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl tracking-wider">
          Marketplace
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/cart">
            <ShoppingCartIcon className="w-6 h-6" />
          </Link>
          <div className="cursor-pointer">
            {session.isLogin ? (
              <div onClick={logout}>
                <Avatar src={'/images/man.png'} />
              </div>
            ) : (
              <Link href="/login">
                <ButtonPrimary className="w-30">Login</ButtonPrimary>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppNavbar;
