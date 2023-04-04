import React from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './full-page-error.module.css';

import Logo from '../../components/logo/logo';
import { useAppDispatch } from '../../hooks';
import { fetchOffersAction } from '../../store/api-actions';

const FullPageError: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.root}>
      <Helmet>
        <title>Six Cities. Error</title>
      </Helmet>
      <Logo type="header" />
      <div className={styles.container}>
        <h1 className={styles.title}>
          <span>😕</span>
          <br />
          Oooops....
        </h1>
        <p className={styles.text}>
          Something was broken. We try to repair it!
        </p>
      </div>
      <button
        className={styles.button}
        onClick={() => {
          dispatch(fetchOffersAction());
        }}
      >
        Please, click here
      </button>
    </div>
  );
};

export default FullPageError;
