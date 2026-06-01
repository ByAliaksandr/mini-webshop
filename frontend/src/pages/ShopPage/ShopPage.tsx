import { Header } from '../common/components/Header';
import { ProductGrid } from './components/ProductGrid/ProductGrid';
import { SearchFilter } from './components/SearchFilter';
import styles from './ShopPage.module.scss';
import { useProducts } from './hooks/useProducts';
import { useCategories } from './hooks/useCategories';

export const ShopPage = () => {
  const { products, loading, error, search, setSearch, selectedCategory, setSelectedCategory } =
    useProducts();

  const { categories } = useCategories();

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
