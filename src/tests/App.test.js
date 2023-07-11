import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

test('Farewell, front-end', () => {
  renderWithRouter(<App />);
});
