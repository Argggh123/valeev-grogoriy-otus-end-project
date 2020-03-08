import { useState, useCallback, useEffect } from 'react';
import { useHttp } from './http';

const storageData = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const { request } = useHttp();

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);
    localStorage.setItem(storageData, JSON.stringify({
      token: jwtToken,
      userId: id,
    }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageData);
  }, []);

  const authenticate = useCallback(async (token) => {
    try {
      const data = await request(`/api/auth/authorize`, 'POST', null, {
        Authorization: `Bearer ${token}`,
      });
      if (data) {
        console.log(data);
        setToken(data.token);
        setUserId(data.userId);
        return login(data.token, data.userId);
      }
      logout();
    } catch (e) {
      logout();
    }
  }, [request, login, logout]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageData));
    if (data && data.token) {
      authenticate(data.token).then(() => {
        setReady(true);
      });
    } else {
      setReady(true);
    }

  }, [authenticate]);

  return {
    login,
    logout,
    token,
    userId,
    ready,
  };
};
