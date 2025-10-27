import type React from 'react';
import type { ListCart } from '@/types/cart.types';
import { formatRupiah } from '@/libs/utils/currency';
import Link from 'next/link';
import Items from './Items';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';

type CartProps = {
  loading: boolean;
  carts: ListCart[];
  totalSelected: number;
  onAddQuantity: (id: string) => void;
  onReduceQuantity: (id: string) => void;
  onToggleSelect: (id: string) => void;
  onCheckout: () => void;
};

const Cart: React.FC<CartProps> = ({
  loading,
  carts,
  totalSelected,
  onAddQuantity,
  onReduceQuantity,
  onToggleSelect,
  onCheckout,
}) => {
  if (loading) return <div>Loading...</div>;
  if (carts.length === 0) return <div>Empty Cart</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-6">Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 flex flex-col gap-4">
          {carts.map((item) => (
            <Items
              key={item.id}
              item={item}
              onAddQuantity={onAddQuantity}
              onReduceQuantity={onReduceQuantity}
              onToggleSelect={onToggleSelect}
            />
          ))}
        </div>

        <div className="border rounded-lg p-6 h-fit sticky top-10 bg-white shadow-sm w-[400px]">
          <div className="font-semibold text-lg mb-4">Summary</div>
          <div className="flex justify-between mb-2 text-sm">
            <span>Total:</span>
            <span>{formatRupiah(totalSelected)}</span>
          </div>
          <Link href="/checkout">
            <ButtonPrimary onClick={onCheckout} disabled={totalSelected === 0}>
              Checkout
            </ButtonPrimary>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
