import { useState } from 'react';
import { Header } from '../common/components/Header';
import { ProductGrid } from './components/ProductGrid/ProductGrid';
import { SearchFilter } from './components/SearchFilter';
import styles from './ShopPage.module.scss';

export const ShopPage = () => {
  // TODO: temporary usage
  const [categories] = useState<string[]>(['Audio', 'Laptops', 'Samsung']);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
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

        <ProductGrid></ProductGrid>
      </main>
    </div>
  );
};
