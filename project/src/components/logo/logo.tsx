import React from 'react';
import { Link } from 'react-router-dom';

type LogoProps = {
  type: 'header' | 'footer';
};

const sizes = {
  header: {
    width: 81,
    height: 41,
  },
  footer: {
    width: 64,
    height: 33,
  },
};

const Logo: React.FC<LogoProps> = ({ type }) => {
  const size = sizes[type];
  return (
    <Link to="/" className={`${type}__logo-link`}>
      <img
        className={`${type}__logo`}
        src="img/logo.svg"
        alt="6 cities logo"
        width={size.width}
        height={size.height}
      />
    </Link>
  );
};
export default React.memo(Logo);
