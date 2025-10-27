import type React from 'react';
import type { Products } from '@/types/product.types';
import { formatRupiah } from '@/libs/utils/currency';
import Image from 'next/image';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';

type DetailProductProps = {
  product: Products | null;
  quantity: number;
  onAddQuantity: () => void;
  onReduceQuantity: () => void;
  onAddToCart: () => void;
};

const DetailProduct: React.FC<DetailProductProps> = ({
  product,
  quantity,
  onAddQuantity,
  onReduceQuantity,
  onAddToCart,
}) => {
  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Image
        src={product.image}
        alt={product.name}
        width={600}
        height={400}
        className="w-full rounded object-cover"
      />
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-600">{product.description}</p>

        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold">{formatRupiah(product.price)}</div>
          <div className="flex items-center gap-1">
            <button onClick={onReduceQuantity} className="w-8 h-8 border rounded-full text-sm">
              −
            </button>
            <span className="w-10 text-center text-lg">{quantity}</span>
            <button onClick={onAddQuantity} className="w-8 h-8 border rounded-full text-sm">
              +
            </button>
          </div>
        </div>

        <div>
          <ButtonPrimary onClick={onAddToCart}>Add to Cart</ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
