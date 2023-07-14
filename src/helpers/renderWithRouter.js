import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import ReceitasProvider from '../context/ReceitasProvider';

const renderWithRouter = (
  component,
  {
    location = ['/'],
    history = createMemoryHistory({ location }),
  } = {},
) => ({
  ...render(
    <ReceitasProvider>
      <Router history={ history }>
        {component}
      </Router>
    </ReceitasProvider>,
  ),
  history,
});
export default renderWithRouter;

// const withRouter = (component, history) => {
//   return (
//       <ReceitasProvider>
//         <Router history={ history }>
//           {component}
//         </Router>
//       </ReceitasProvider>,
//   )
// }

// export function renderWithRouter(
//   component,
//   {
//     initialEntries = ['/'],
//     history = createMemoryHistory({ initialEntries }),
//   } = {},
// ) {
//   return {
//     ...render(withRouter(component, history)),
//     history,
//   };
// }
