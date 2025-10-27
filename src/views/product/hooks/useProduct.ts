import type { Products } from '@/types/product.types';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useInternal } from '@/hooks/useInternal';
import { useAuth } from '@/contexts/auth.context';
import { Routes } from '@/libs/constants/routes.const';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import Notification from '@/components/ui/notification/Notification';

const useProduct = () => {
  const { session } = useAuth();

  const [product, setProduct] = useState<Products | null>(null);
  const [quantity, setQuantity] = useState(1);

  const params = useParams();
  const router = useRouter();
  const internal = useInternal();

  const onAddQuantity = useCallback(() => {
    setQuantity((prev) => prev + 1);
  }, []);

  const onReduceQuantity = useCallback(() => {
    setQuantity((prev) => {
      if (prev === 1) return 1;
      return prev - 1;
    });
  }, []);

  const onAddToCart = useCallback(async () => {
    if (!product) return;
    if (!session.isLogin) {
      router.push('/login');
      return;
    }

    const data = {
      product_id: product.id,
      quantity,
    };
    const response = await internal(Routes.CARTS, undefined, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.status >= HttpStatus.BAD_REQUEST) {
      Notification({
        type: 'error',
        message: 'Failed',
        description: 'Failed added to cart',
      });
      return;
    }

    router.push('/cart');

    Notification({
      message: 'Success',
      description: 'Successfully added to cart',
    });
  }, [product, quantity, router, internal, session.isLogin]);

  useEffect(() => {
    const fetchProduct = async () => {
      const URL = Routes.PRODUCTS_DETAIL + `/${params.slug}`;
      const response = await internal(URL);
      const json = await response.json();
      setProduct(json.data);
    };

    fetchProduct();
  }, [internal, params.slug]);

  return {
    product,
    quantity,
    onAddQuantity,
    onReduceQuantity,
    onAddToCart,
  };
};

export default useProduct;
