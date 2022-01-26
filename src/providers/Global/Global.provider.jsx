import React from 'react';

import ErrorMessageProvider from '@providers/ErrorMessage';
import { GlobalContextProvider } from '@providers/GlobalContext';

function GlobalProvider({ children }) {
  return (
    <>
      <GlobalContextProvider>
        <ErrorMessageProvider>
          { children }
        </ErrorMessageProvider>
      </GlobalContextProvider>
    </>
  );
}

export default GlobalProvider;
