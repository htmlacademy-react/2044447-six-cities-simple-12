import React from 'react';
import { Vortex } from 'react-loader-spinner';
import styles from './loading-screen.module.css';

const LoadingScreen: React.FC = () => (
  <div className={styles.root}>
    <Vortex
      visible
      height="80"
      width="80"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={[
        '#417485',
        '#6d7fa8',
        '#4d5582',
        '#5398b8',
        '#5387b8',
        '#536ab8',
      ]}
    />
    <span>Loading...</span>
  </div>
);

export default LoadingScreen;
