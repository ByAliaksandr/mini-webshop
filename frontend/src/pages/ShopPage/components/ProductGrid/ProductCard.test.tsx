import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCard } from './ProductCard';
import type { BasketEntry } from '../../../../interfaces/basket.interfaces';

let mockEntries: BasketEntry[] = [];
const mockAddToBasket = jest.fn();

jest.mock('../../hooks/useBasket', () => ({
  useBasket: () => ({
    entries: mockEntries,
    totalItems: 0,
    totalPrice: 0,
    addToBasket: mockAddToBasket,
    removeFromBasket: jest.fn(),
    clearBasket: jest.fn(),
  }),
}));

const baseProduct = {
  id: 1,
  name: 'Product Name',
  description: 'Description',
  price: 9.99,
  category: 'Category',
  brand: 'Brand',
  stock: 5,
  imageUrl: 'imageUrl',
};

describe('ProductCard', () => {
  beforeEach(() => {
    mockAddToBasket.mockClear();
    mockEntries = [];
  });

  it('render the product name', () => {
    render(<ProductCard product={baseProduct}></ProductCard>);
    expect(screen.getByText('Product Name')).toBeInTheDocument();
  });

  it('show "Add to basket" button enabled when stock is positive', () => {
    render(<ProductCard product={baseProduct}></ProductCard>);
    expect(screen.getByRole('button', { name: 'Add to basket' })).toBeEnabled();
  });

  it('show "Add to basket" button enabled despite of other products in basket', () => {
    mockEntries = [{ product: { ...baseProduct, id: 99 }, quantity: 10 }];

    render(<ProductCard product={baseProduct}></ProductCard>);
    expect(screen.getByRole('button', { name: 'Add to basket' })).toBeEnabled();
  });

  it('show "Add to basket" button disabled when stock is zero', () => {
    render(<ProductCard product={{ ...baseProduct, stock: 0 }}></ProductCard>);
    expect(screen.getByRole('button', { name: 'Add to basket' })).toBeDisabled();
  });

  it('show "Add to basket" button disabled when basket quantity equals stock', () => {
    mockEntries = [{ product: baseProduct, quantity: 5 }];

    render(<ProductCard product={baseProduct}></ProductCard>);

    expect(screen.getByRole('button', { name: 'Add to basket' })).toBeDisabled();
  });

  it('call addToBasket when button is clicked', async () => {
    render(<ProductCard product={baseProduct}></ProductCard>);
    const addButton = screen.getByRole('button', { name: 'Add to basket' });

    await userEvent.click(addButton);

    expect(mockAddToBasket).toHaveBeenCalledTimes(1);
    expect(mockAddToBasket).toHaveBeenCalledWith(baseProduct);
  });
});
