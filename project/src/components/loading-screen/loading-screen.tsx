import React from 'react';
import { Vortex } from 'react-loader-spinner';
import styles from './loading-screen.module.css';

type LoadingProps = {
  type: 'small' | 'big';
};

const sizes = {
  small: {
    width: 15,
    height: 15,
    class: styles.small,
  },
  big: {
    width: 80,
    height: 80,
    class: styles.root,
  },
};

const LoadingScreen: React.FC<LoadingProps> = ({ type }) => {
  const size = sizes[type];

  return (
    <div className={size.class}>
      <Vortex
        visible
        height={size.height}
        width={size.width}
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
      {type === 'big' && <span>Loading...</span>}
    </div>
  );
};

export default LoadingScreen;
