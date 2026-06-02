import { Header } from '../common/components/Header';
import { ProductGrid } from './components/ProductGrid/ProductGrid';
import { SearchFilter } from './components/SearchFilter';
import styles from './ShopPage.module.scss';
import { useProducts } from './hooks/useProducts';
import { useCategories } from './hooks/useCategories';
import { BasketButton } from './components/Basket/BasketButton';
import { useState } from 'react';
import { Basket } from './components/Basket/Basket';
import { BasketProvider } from './context/BasketProvider';

export const ShopPage = () => {
  const [basketOpen, setBasketOpen] = useState(false);

  const { products, loading, error, search, setSearch, selectedCategory, setSelectedCategory } =
    useProducts();

  const { categories } = useCategories();

  return (
    <BasketProvider>
      <div className={styles.page}>
        <Header rightSlot={<BasketButton onClick={() => setBasketOpen((val) => !val)} />}></Header>

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

        <Basket open={basketOpen} onClose={() => setBasketOpen(false)}></Basket>
      </div>
    </BasketProvider>
  );
};
