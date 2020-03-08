import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import MyMemesPage from './src/pages/MyMemesPage';
import DetailsPage from './src/pages/DetailsPage';
import CreatePage from './src/pages/CreatePage/CreatePage';
import AuthPage from './src/pages/AuthPage';
import AllMemes from './src/pages/AllMemes';

export const useRoutes = (isAuth: boolean) => {
  if (isAuth) {
    return (
      <Switch>
        <Route exac path={'/myMemes'}>
          <MyMemesPage />
        </Route>
        <Route exac path={'/create'}>
          <CreatePage />
        </Route>
        <Route path={'/detail/:id'}>
          <DetailsPage />
        </Route>
        <Route path={'/'}>
          <AllMemes />
        </Route>
        <Redirect to={'/'} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path={'/auth'}>
        <AuthPage />
      </Route>
      <Route path={'/detail/:id'}>
        <DetailsPage />
      </Route>
      <Route exac path={'/'}>
        <AllMemes />
      </Route>
      <Redirect to={'/'} />
    </Switch>
  );
};
