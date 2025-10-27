import type React from 'react';
import type { Metadata } from 'next';
import CartView from '@/views/cart';

export const metadata: Metadata = {
  title: 'Cart - Marketplace',
  description: 'Cart page of Marketplace',
};

const CartPage: React.FC = () => {
  return <CartView />;
};

export default CartPage;
