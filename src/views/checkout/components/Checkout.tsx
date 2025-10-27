import type React from 'react';
import type { ListCart } from '@/types/cart.types';
import Image from 'next/image';
import { formatRupiah } from '@/libs/utils/currency';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';

type CheckoutProps = {
  loading: boolean;
  carts: ListCart[];
  total: number;
  onPlaceOrder: () => void;
};

const Checkout: React.FC<CheckoutProps> = ({ loading, carts, total, onPlaceOrder }) => {
  if (loading) return <div>Loading...</div>;
  if (carts.length === 0) return <div>Empty Checkout</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 flex flex-col gap-4">
          {carts.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border p-4 rounded-lg">
              <Image
                src={item.product_image}
                alt={item.product_name}
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <div className="font-semibold">{item.product_name}</div>
                <div className="text-gray-600 text-sm">
                  {formatRupiah(item.product_price)} × {item.quantity}
                </div>
              </div>
              <div className="font-semibold text-primary">{formatRupiah(item.amount)}</div>
            </div>
          ))}
        </div>

        <div className="border rounded-lg p-6 h-fit sticky top-10 bg-white shadow-sm w-[400px]">
          <h2 className="text-lg font-semibold mb-4">Ringkasan Pesanan</h2>
          <div className="flex justify-between mb-2 text-sm">
            <span>Total Item</span>
            <span>{carts.length}</span>
          </div>
          <div className="flex justify-between mb-4 font-semibold">
            <span>Total Pembayaran</span>
            <span>{formatRupiah(total)}</span>
          </div>

          <ButtonPrimary onClick={onPlaceOrder} className="w-full">
            Buat Pesanan
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
