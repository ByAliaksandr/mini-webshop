import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ShopPage } from './pages/ShopPage/ShopPage';
import styles from './App.module.scss';

export const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
