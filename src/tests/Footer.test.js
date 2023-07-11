import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Footer from '../components/Footer';

describe('Teste do componente Footer', () => {
  it('testa se o componente é renderizado corretamente ', () => {
    renderWithRouter(<Footer />);

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();

    const imgs = screen.getAllByRole('img');
    expect(imgs.length).toBe(2);
  });

  it('testa se ao clicar no link de bebidas é redirecionado corretamente', () => {
    const { history } = renderWithRouter(<Footer />);

    const imgs = screen.getAllByRole('img');

    userEvent.click(imgs[0]);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/drinks');
  });

  it('testa se ao clicar no link de refeições é redirecionado corretamente', () => {
    const { history } = renderWithRouter(<Footer />);

    const imgs = screen.getAllByRole('img');

    userEvent.click(imgs[1]);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');
  });
});
