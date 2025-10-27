'use client';

import type React from 'react';
import Cart from './components/Cart';
import useCart from './hooks/useCart';

const CartView: React.FC = () => {
  const {
    loading,
    carts,
    totalSelected,
    onAddQuantity,
    onReduceQuantity,
    onToggleSelect,
    onCheckout,
  } = useCart();

  return (
    <Cart
      loading={loading}
      carts={carts}
      totalSelected={totalSelected}
      onAddQuantity={onAddQuantity}
      onReduceQuantity={onReduceQuantity}
      onToggleSelect={onToggleSelect}
      onCheckout={onCheckout}
    />
  );
};

export default CartView;
