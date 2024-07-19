import React from 'react';
import { render } from '@testing-library/react';
import SeoTitle from './SeoTitle';

describe('SeoTitle', () => {
  it('renders the correct meta title', () => {
    render(<SeoTitle title="Test Meta Title" />);

    const metaTitleElement = document.querySelector('title');
  });
});
