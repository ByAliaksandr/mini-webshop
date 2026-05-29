import { Dropdown } from '../../common/components/Dropdown';
import styles from './SearchFilter.module.scss';

type Props = {
  search: string;
  onSearchChange: (val: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (val: string) => void;
};

export const SearchFilter = ({
  search,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
}: Props) => {
  const categoryOptions = [
    { label: 'All categories', value: '' },
    ...categories.map((category) => ({ label: category, value: category })),
  ];

  return (
    <div className={styles.bar}>
      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          className={styles.searchInput}
          type="search"
          placeholder="Search products or brands…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search products"
        />
      </div>

      <div className={styles.categories}>
        <Dropdown options={categoryOptions} value={selectedCategory} onChange={onCategoryChange} />
      </div>
    </div>
  );
};
