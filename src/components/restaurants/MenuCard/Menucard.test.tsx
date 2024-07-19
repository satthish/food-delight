import React from 'react';
import { render, screen } from '@testing-library/react';
import MenuCard from './MenuCard';

const mockData = {
  name: 'Test Menu Item',
  price: 12.34,
  description: 'This is a test description.',
};

describe('MenuCard', () => {
  it('renders correctly with given props', () => {
    render(<MenuCard {...mockData} />);

    expect(screen.queryByText(mockData.name)).not.toBeNull();
    expect(screen.queryByText(`$${mockData.price.toFixed(2)}`)).not.toBeNull();
    expect(screen.queryByText(mockData.description)).not.toBeNull();
  });

  it('formats price correctly', () => {
    const updatedMockData = {
      ...mockData,
      price: 5,
    };

    render(<MenuCard {...updatedMockData} />);

    expect(screen.queryByText('$5.00')).not.toBeNull();
  });
});
