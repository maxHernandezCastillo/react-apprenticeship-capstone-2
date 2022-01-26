import React, { useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import useSafeReducer from '@hooks/useSafeReducer';
import ErrorMessageModal from '@components/ErrorMessageModal';

const ErrorMessageContext = React.createContext();

const initialErrorMessage = {
  isModalOpen: false,
  errorMessage: '',
};

function Portal({ children }) {
  let elemDiv = document.createElement('div');
  document.body.appendChild(elemDiv);

  // On unmounting
  useEffect(() => () => {
    document.body.removeChild(elemDiv);
  });

  return createPortal(children, elemDiv);
}

function ErrorMessageProvider({ children }) {
  let [modalState, dispatch] = useSafeReducer((isModalOpen, action) => {
    switch (action.type) {
      case 'SHOW_ERROR_MESSAGE':
        return {
          isModalOpen: true,
          errorMessage: action.payload.errorMessage,
        };
      case 'CLOSE_ERROR_MESSAGE':
        return {
          isModalOpen: false,
          errorMessage: '',
        };
      default:
        return isModalOpen;
    }
  }, initialErrorMessage);

  const reducers = useRef({
    showErrorMessage: (errorMessage) =>
      dispatch({
        type: 'SHOW_ERROR_MESSAGE',
        payload: { errorMessage: errorMessage },
      }),
    closeErrorMessage: () =>
      dispatch({ type: 'CLOSE_ERROR_MESSAGE', payload: null }),
  });

  return (
    <ErrorMessageContext.Provider
      value={{ ...reducers.current, errorMessage: modalState.errorMessage }}
    >
      {children}
      {modalState.isModalOpen ? (
        <Portal>
          <ErrorMessageModal />
        </Portal>
      ) : null}
    </ErrorMessageContext.Provider>
  );
}

function useErrorMessage() {
  return useContext(ErrorMessageContext);
}

export default ErrorMessageProvider;
export { useErrorMessage };
