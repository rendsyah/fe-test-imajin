import type { ListCart } from '@/types/cart.types';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useInternal } from '@/hooks/useInternal';
import { Routes } from '@/libs/constants/routes.const';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import Notification from '@/components/ui/notification/Notification';

const useCheckout = () => {
  const [loading, setLoading] = useState(true);
  const [carts, setCarts] = useState<ListCart[]>([]);
  const [total, setTotal] = useState(0);

  const router = useRouter();
  const internal = useInternal();

  const onPlaceOrder = useCallback(async () => {
    localStorage.removeItem('checkout');
    const response = await internal(Routes.TRANSACTION, undefined, {
      method: 'POST',
      body: JSON.stringify({
        payment_id: 1,
        amount: +total,
        items: carts.map((item) => ({
          product_id: item.product_id,
          price: +item.product_price,
          quantity: item.quantity,
          amount: +item.amount,
        })),
      }),
    });

    if (response.status >= HttpStatus.BAD_REQUEST) {
      Notification({
        type: 'error',
        message: 'Failed',
        description: 'Failed place order',
      });
      return;
    }

    router.push('/');

    Notification({
      message: 'Success',
      description: 'Successfully place order',
    });
  }, [router, carts, total, internal]);

  useEffect(() => {
    const savedCart = localStorage.getItem('checkout');
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCarts(parsed);
      const totalAmount = parsed.reduce((acc: number, item: ListCart) => acc + +item.amount, 0);
      setTotal(totalAmount);
    }
    setLoading(false);
  }, []);

  return {
    loading,
    carts,
    total,
    onPlaceOrder,
  };
};

export default useCheckout;
