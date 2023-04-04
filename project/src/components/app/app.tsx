import { Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import Home from '../../pages/home/home';
import Login from '../../pages/login/login';
import Property from '../../pages/property/property';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { AppRoute } from '../../const/const';
import { useAppDispatch } from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import { checkAuthAction } from '../../store/api-actions';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  return (
    <Suspense fallback={<LoadingScreen type="big" />}>
      <HelmetProvider>
        <HistoryRouter history={browserHistory}>
          <Routes>
            <Route path={AppRoute.Root} element={<Home />} />
            <Route path={AppRoute.Login} element={<Login />} />
            <Route path={AppRoute.Property} element={<Property />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </HistoryRouter>
      </HelmetProvider>
    </Suspense>
  );
};

export default App;
