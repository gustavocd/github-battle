import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

it('renders home page without crashing', () => {
  const { getByText, getByRole } = render(<App />);
  expect(getByRole('battle')).toBeInTheDocument();
  expect(getByText('Github Battle: Battle your friends... and stuff.')).toBeInTheDocument();
});
