import { useState } from 'react';
import { Header } from '../common/components/Header';
import { ProductGrid } from './components/ProductGrid/ProductGrid';
import { SearchFilter } from './components/SearchFilter';
import styles from './ShopPage.module.scss';
import type { Product } from '../../interfaces/product.interfaces';

export const ShopPage = () => {
  // TODO: temporary usage
  const [categories] = useState<string[]>(['Audio', 'Laptops', 'Samsung']);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const [products, setProducts] = useState<Product[]>([
    {
      id: 34,
      name: 'Qwery',
      description: 'Qwery',
      price: 1249.99,
      category: 'asdf',
      brand: 'zxcv',
      stock: 4,
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // TODO: temporary usage end

  return (
    <div className={styles.page}>
      <Header rightSlot={<div>Basket</div>}></Header>

      <main className={styles.main}>
        <SearchFilter
          search={search}
          onSearchChange={setSearch}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <ProductGrid products={products} loading={loading} error={error}></ProductGrid>
      </main>
    </div>
  );
};
