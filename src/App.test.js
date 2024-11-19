import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import addition from '../addition';

test("should add two numbers and return the sum", () => {
  expect(addition(4, 2)).toBe(2);
});
