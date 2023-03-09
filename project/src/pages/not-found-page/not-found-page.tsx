import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

import Logo from '../../components/logo/logo';

const NotFound: React.FC = () => (
  <div className={styles.root}>
    <Helmet>
      <title>Six Cities. Not Found</title>
    </Helmet>
    <Logo type="header" />
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.text}>К сожалению, данная страница отстутвует</p>
    </div>
    <Link to="/">
      <button className={styles.button}>Нажмите для возврата на главную</button>
    </Link>
  </div>
);

export default NotFound;
