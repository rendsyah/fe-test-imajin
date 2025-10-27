'use client';

import type React from 'react';
import Home from './components/Home';
import useHome from './hooks/useHome';

const HomeView: React.FC = () => {
  const { loading, isFetching, products, meta, loadMore } = useHome();

  return (
    <Home
      loading={loading}
      isFetching={isFetching}
      products={products}
      meta={meta}
      loadMore={loadMore}
    />
  );
};

export default HomeView;
