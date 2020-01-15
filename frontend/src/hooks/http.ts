import { useCallback, useState } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const request = useCallback(async (
    url: string,
    method = 'GET',
    body: any,
    headers = {},
  ) => {
    setLoading(true);
    try {
      if (headers['Content-type'] === 'application/json' && body) {
        body = JSON.stringify(body);
      }
      const response = await fetch(url, { method, body, headers });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'что то пошло не так');
      }
      setLoading(false);
      return data;
    } catch (e) {
      setLoading(false);
      setError(e.message);
      throw e;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { loading, error, request, clearError };
};
