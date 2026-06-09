import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCard } from './ProductCard';

const mockAddToBasket = jest.fn();

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

const renderCard = (basketQuantity = 0) =>
  render(
    <ProductCard
      product={baseProduct}
      basketQuantity={basketQuantity}
      addToBasket={mockAddToBasket}
    />
  );

describe('ProductCard', () => {
  beforeEach(() => {
    mockAddToBasket.mockClear();
  });

  it('render the product name', () => {
    renderCard();
    expect(screen.getByText('Product Name')).toBeInTheDocument();
  });

  it('show "Add to basket" button enabled when stock is positive', () => {
    renderCard();
    expect(screen.getByRole('button', { name: 'Add to basket' })).toBeEnabled();
  });

  it('show "Add to basket" button enabled when basket quantity is for a different product', () => {
    renderCard(0);
    expect(screen.getByRole('button', { name: 'Add to basket' })).toBeEnabled();
  });

  it('show "Add to basket" button disabled when stock is zero', () => {
    render(
      <ProductCard
        product={{ ...baseProduct, stock: 0 }}
        basketQuantity={0}
        addToBasket={mockAddToBasket}
      />
    );
    expect(screen.getByRole('button', { name: 'Add to basket' })).toBeDisabled();
  });

  it('show "Add to basket" button disabled when basket quantity equals stock', () => {
    renderCard(5);
    expect(screen.getByRole('button', { name: 'Add to basket' })).toBeDisabled();
  });

  it('call addToBasket when button is clicked', async () => {
    renderCard();
    const addButton = screen.getByRole('button', { name: 'Add to basket' });

    await userEvent.click(addButton);

    expect(mockAddToBasket).toHaveBeenCalledTimes(1);
    expect(mockAddToBasket).toHaveBeenCalledWith(baseProduct);
  });
});
