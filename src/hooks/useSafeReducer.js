import { useReducer, useEffect, useRef, useCallback } from 'react';

function useSafeReducer() {
  // setting up
  const [state, dispatcher] = useReducer(...arguments);
  let flag = useRef(true);

  // When unmount
  useEffect(
    () => () => {
      flag = false;
    },
    []
  );

  // return safe setter
  return [
    state,
    useCallback((data) => {
      if (flag) dispatcher(data);
    }, []),
  ];
}

export default useSafeReducer;
