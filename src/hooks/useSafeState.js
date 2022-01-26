import { useState, useEffect, useRef, useCallback } from 'react';

function useSafeState(init) {
  // setting up
  const [state, setState] = useState(init);
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
      if (flag) setState(data);
    }, []),
  ];
}

export default useSafeState;
