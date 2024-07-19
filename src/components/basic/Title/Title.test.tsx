// Title.test.tsx

import React from 'react';
import { render } from '@testing-library/react';
import Title from './Title';

describe('Title component', () => {
  it('renders with default props', () => {
    const { getByText } = render(<Title content="Default Title" component={'h2'} />);
    const titleElement = getByText('Default Title');
    expect(titleElement).toBeTruthy(); // Ensure the element is rendered
    expect(titleElement.tagName).toBe('H2'); // Assuming default variant is 'h2'
  });

  it('renders with custom content and props', () => {
    const { getByText } = render(
      <Title align="center" variant="h4" color="primary" content="Custom Title" />
    );
    const titleElement = getByText('Custom Title');
    expect(titleElement).toBeTruthy(); // Ensure the element is rendered
    expect(titleElement.tagName).toBe('H4'); 
  });
});
