import type React from 'react';
import type { Metadata } from 'next';
import ProductView from '@/views/product';

export const metadata: Metadata = {
  title: 'Product - Marketplace',
  description: 'Product page of Marketplace',
};

const ProductPage: React.FC = () => {
  return <ProductView />;
};

export default ProductPage;
