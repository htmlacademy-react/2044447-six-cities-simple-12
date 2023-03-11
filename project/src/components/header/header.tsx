import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../logo/logo';
import { AppRoute } from '../../const/const';

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
        {hasNav && (
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  to={AppRoute.Login}
                  className="header__nav-link header__nav-link--profile"
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__user-name user__name">
                    Oliver.conner@gmail.com
                  </span>
                </Link>
              </li>
              <li className="header__nav-item">
                <a className="header__nav-link" href="#">
                  <span className="header__signout">Sign out</span>
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  </header>
);

export default Header;
