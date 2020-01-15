import React from 'react';
import { useRoutes } from '../../routes';
import { useAuth } from '../hooks/auth';
import { AuthContext } from '../context/Auth';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';

const Layout = () => {
  const { login, token, userId, logout, ready } = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);

  if (!ready) {
    return <Loader />
  }
  return (
    <AuthContext.Provider value={{
      token,
      // @ts-ignore
      login,
      logout,
      userId,
      isAuth,
    }}>
      <Navbar isAuth={isAuth}/>
      <div className={'container'}>
      {routes}
    </div>
    </AuthContext.Provider>
  );
};

export default Layout;
