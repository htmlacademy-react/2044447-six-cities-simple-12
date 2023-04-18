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
        Not found
      </h1>
      <p className={styles.text}>Unfortunately, nothing found</p>
    </div>
    <Link to="/">
      <button className={styles.button}>Click to return to home</button>
    </Link>
  </div>
);

export default NotFound;
