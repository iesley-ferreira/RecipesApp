import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import ReceitasProvider from '../context/ReceitasProvider';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <ReceitasProvider>
        <Router history={ history }>
          {component}
        </Router>
      </ReceitasProvider>,
    ),
    history,
  });
};
export default renderWithRouter;
