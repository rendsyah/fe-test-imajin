'use client';

import DetailProduct from './components/DetailProduct';
import useProduct from './hooks/useProduct';

const ProductView: React.FC = () => {
  const { product, quantity, onAddQuantity, onReduceQuantity, onAddToCart } = useProduct();

  return (
    <DetailProduct
      product={product}
      quantity={quantity}
      onAddQuantity={onAddQuantity}
      onReduceQuantity={onReduceQuantity}
      onAddToCart={onAddToCart}
    />
  );
};

export default ProductView;
