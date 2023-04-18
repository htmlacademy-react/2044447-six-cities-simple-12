import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

import Home from '../../pages/home/home';
import Login from '../../pages/login/login';
import Property from '../../pages/property/property';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';
import { checkAuthAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

const App: React.FC = () => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const isLoading = authorizationStatus === AuthorizationStatus.Unknown;

  React.useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen type="big" />;
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Root} element={<Home />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Property} element={<Property />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HelmetProvider>
  );
};

export default App;
