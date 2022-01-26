import React, { useContext } from 'react';

import useSafeReducer from '@hooks/useSafeReducer';
import parseDate from '@utils/parseDate';

const initial_global_context = {
  current: {},
  date: parseDate(new Date()),
  isDateChooserOpen: true,
  loading: false
};

const GlobalContext = React.createContext(null);

const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error('Can\'t use "useGlobalContext" without "GlobalContextProvider"');
  return context;
};

function GlobalContextProvider ({ children }) {
  const [state, dispatcher] = useSafeReducer((state, action) => {
    switch(action.type) {
      case 'SET_CURRENT':
        return {
          ...state,
          current: action.payload
        };
      case 'TOGGLE_DATE_CHOOSER':
        return {
          ...state,
          isDateChooserOpen: !state.isDateChooserOpen
        };
      case 'SET_DATE':
        return {
          ...state,
          date: action.payload
        };
      case 'SET_LOADING':
        return {
          ...state,
          loading: action.payload
        };
      default:
        return state;
    };
  }, initial_global_context);

  return (
    <GlobalContext.Provider value={{
      ...state,
      setCurrent: (item) => dispatcher({ type: 'SET_CURRENT', payload: item }),
      toggleDateChooser: () => dispatcher({ type: 'TOGGLE_DATE_CHOOSER' }),
      setDate: (date) => dispatcher({ type: 'SET_DATE', payload: date }),
      setLoading: (isLoading) => dispatcher({ type: 'SET_LOADING', payload: isLoading })
    }}>
      { children }
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalContextProvider, useGlobalContext };