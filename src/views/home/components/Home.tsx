import type React from 'react';
import type { Products } from '@/types/product.types';
import type { Meta } from '@/types/commons.types';
import { formatRupiah } from '@/libs/utils/currency';
import Link from 'next/link';
import Image from 'next/image';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';

type HomeProps = {
  loading: boolean;
  isFetching: boolean;
  products: Products[];
  meta: Meta;
  loadMore: () => void;
};

const Home: React.FC<HomeProps> = ({ loading, isFetching, products, meta, loadMore }) => {
  if (loading) return <div>Loading...</div>;
  if (products.length === 0) return <div>Empty Product</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Produk Terbaru</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.slug}`}>
            <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h3 className="font-semibold line-clamp-2 mb-1">{product.name}</h3>
              <p className="text-primary font-bold mb-3">{formatRupiah(product.price)}</p>
            </div>
          </Link>
        ))}
      </div>

      {meta.getMore && (
        <div className="flex justify-center  mt-8">
          <ButtonPrimary className="w-40" onClick={loadMore} disabled={isFetching}>
            {isFetching ? 'Loading...' : 'Load More'}
          </ButtonPrimary>
        </div>
      )}
    </div>
  );
};

export default Home;
