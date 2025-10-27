import type React from 'react';
import type { Metadata } from 'next';
import CheckoutView from '@/views/checkout';

export const metadata: Metadata = {
  title: 'Checkout - Marketplace',
  description: 'Checkout page of Marketplace',
};

const CheckoutPage: React.FC = () => {
  return <CheckoutView />;
};

export default CheckoutPage;
