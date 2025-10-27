import type { ListCart } from '@/types/cart.types';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useInternal } from '@/hooks/useInternal';
import { Routes } from '@/libs/constants/routes.const';

const useCart = () => {
  const [loading, setLoading] = useState(true);
  const [carts, setCarts] = useState<ListCart[]>([]);

  const router = useRouter();
  const internal = useInternal();

  const totalSelected = carts
    .filter((item) => item.selected)
    .reduce((acc, cur) => acc + +cur.amount, 0);

  const onAddQuantity = useCallback((id: string) => {
    setCarts((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          const sumQTY = item.quantity + 1;
          return {
            ...item,
            quantity: sumQTY,
            amount: +item.product_price * sumQTY,
          };
        }
        return item;
      });
    });
  }, []);

  const onReduceQuantity = useCallback((id: string) => {
    setCarts((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          const newQTY = item.quantity > 1 ? item.quantity - 1 : 1;
          return {
            ...item,
            quantity: newQTY,
            amount: +item.product_price * newQTY,
          };
        }
        return item;
      });
    });
  }, []);

  const onToggleSelect = useCallback((id: string) => {
    setCarts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)),
    );
  }, []);

  const onCheckout = useCallback(() => {
    const selectedItems = carts.filter((item) => item.selected);
    localStorage.setItem('checkout', JSON.stringify(selectedItems));
    router.push('/checkout');
  }, [carts, router]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await internal(Routes.CARTS, { page: 1, limit: 20 });
        const json = await response.json();
        const data = json.data.items.map((item: ListCart) => ({
          ...item,
          selected: false,
        }));
        setCarts(data);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [internal]);

  return {
    loading,
    carts,
    totalSelected,
    onAddQuantity,
    onReduceQuantity,
    onToggleSelect,
    onCheckout,
  };
};

export default useCart;
