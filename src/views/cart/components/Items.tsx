import type React from 'react';
import type { ListCart } from '@/types/cart.types';
import Image from 'next/image';
import { formatRupiah } from '@/libs/utils/currency';

type ItemsProps = {
  item: ListCart;
  onAddQuantity: (id: string) => void;
  onReduceQuantity: (id: string) => void;
  onToggleSelect: (id: string) => void;
};

const Items: React.FC<ItemsProps> = ({ item, onAddQuantity, onReduceQuantity, onToggleSelect }) => {
  return (
    <div className="flex items-center gap-4 border p-4 rounded-lg">
      <input
        type="checkbox"
        checked={item.selected ?? false}
        onChange={() => onToggleSelect(item.id)}
        className="w-5 h-5 cursor-pointer"
      />

      <Image
        src={item.product_image}
        alt={item.product_name}
        width={80}
        height={80}
        className="w-20 h-20 object-cover rounded"
      />

      <div className="flex-1">
        <div className="font-semibold">{item.product_name}</div>
        <div className="text-gray-600 text-sm">{formatRupiah(item.product_price)}</div>
      </div>

      <div className="flex items-center justify-end gap-3 shrink-0 w-[120px]">
        <button
          onClick={() => onReduceQuantity(item.id)}
          className="w-8 h-8 border rounded-full text-sm flex items-center justify-center"
        >
          −
        </button>
        <span className="w-6 text-center">{item.quantity}</span>
        <button
          onClick={() => onAddQuantity(item.id)}
          className="w-8 h-8 border rounded-full text-sm flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Items;
