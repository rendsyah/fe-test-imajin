import type { Products } from '@/types/product.types';
import type { Meta } from '@/types/commons.types';
import { useCallback, useEffect, useState } from 'react';
import { useInternal } from '@/hooks/useInternal';
import { Routes } from '@/libs/constants/routes.const';

export const useHome = () => {
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [products, setProducts] = useState<Products[]>([]);
  const [meta, setMeta] = useState<Meta>({
    page: 1,
    limit: 20,
    getMore: true,
  });

  const internal = useInternal();

  const fetchProducts = useCallback(
    async (page: number) => {
      setIsFetching(true);
      try {
        const response = await internal(Routes.PRODUCTS, {
          page,
          limit: meta.limit,
        });
        const json = await response.json();

        setProducts((prev) => (page === 1 ? json.data.items : [...prev, ...json.data.items]));
        setMeta((prev) => ({
          ...prev,
          getMore: json.data.meta.getMore,
        }));
      } finally {
        setLoading(false);
        setIsFetching(false);
      }
    },
    [internal, meta.limit],
  );

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  const loadMore = () => {
    if (meta.getMore && !isFetching) {
      setMeta((prev) => ({ ...prev, page: prev.page + 1 }));
      fetchProducts(meta.page + 1);
    }
  };

  return {
    loading,
    isFetching,
    products,
    meta,
    loadMore,
  };
};

export default useHome;
