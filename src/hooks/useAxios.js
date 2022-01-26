import { useEffect } from 'react';
import axios from 'axios';

import { useErrorMessage } from '@providers/ErrorMessage';
import { useGlobalContext } from '@providers/GlobalContext';
import useSafeState from '@src/hooks/useSafeState';

const DEFAULT_CONFIG = {
  timeout: 10000, // default is `0` (no timeout)
  responseType: 'json',
  url: 'https://api.nasa.gov/planetary/apod',
};

const DEFAULT_RESPONSE = {
  data: {},
  status: -1,
  statusText: '',
  headers: {},
  config: {},
  request: {}
};

export default function useAxios(config, dependencies = [], delay=500, immediate=false) {
  const [timeoutId, setTimeoutId] = useSafeState(null);
  const [response, setResponse] = useSafeState(DEFAULT_RESPONSE);
  const {showErrorMessage} = useErrorMessage();
  const {loading, setLoading} = useGlobalContext();

  // To transform async requests to sync
  const send = async function () {
    setTimeoutId(null);
    if (immediate) return;

    setLoading(true);
    setResponse(DEFAULT_RESPONSE);
    try {
      setResponse(await axios(Object.assign(DEFAULT_CONFIG, config)));
    } catch (error) {
      setResponse(DEFAULT_RESPONSE);
      showErrorMessage(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    var callNow = immediate && !timeout;
    setTimeoutId(null);
    clearTimeout(timeoutId);

    setTimeoutId(setTimeout(send, delay));
    if (callNow) send();

    return () => clearTimeout(timeoutId);
  }, [...dependencies]);

  return { response, loading };
}