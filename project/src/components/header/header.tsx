import React from 'react';
import Logo from '../logo/logo';
import HeaderNav from '../header-nav/header-nav';

type HeaderProps = {
  hasNav?: boolean;
};

const Header: React.FC<HeaderProps> = ({ hasNav = true }) => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Logo type="header" />
        </div>
        {hasNav && <HeaderNav />}
      </div>
    </div>
  </header>
);

export default Header;
