'use client';

import type React from 'react';
import Checkout from './components/Checkout';
import useCheckout from './hooks/useCheckout';

const CheckoutView: React.FC = () => {
  const { loading, carts, total, onPlaceOrder } = useCheckout();

  return <Checkout loading={loading} carts={carts} total={total} onPlaceOrder={onPlaceOrder} />;
};

export default CheckoutView;
