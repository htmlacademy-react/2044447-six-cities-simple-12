import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';

const HeaderNav: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const info = useAppSelector((state) => state.informationUser);

  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );
  return (
    <nav className="header__nav">
      {authorizationStatus === AuthorizationStatus.Auth ? (
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link
              to={AppRoute.Root}
              className="header__nav-link header__nav-link--profile"
            >
              <div className="header__avatar-wrapper user__avatar-wrapper">
                <img
                  className="user__avatar"
                  src={info ? info.avatarUrl : ''}
                  width="54"
                  height="54"
                  alt="User avatar"
                />
              </div>
              <span className="header__user-name user__name">
                {info ? info.email : ''}
              </span>
              <span className="header__favorite-count">3</span>
            </Link>
          </li>
          <li className="header__nav-item">
            <a
              className="header__nav-link"
              href="/#"
              onClick={(event) => {
                event.preventDefault();
                dispatch(logoutAction());
              }}
            >
              <span className="header__signout">Sign out</span>
            </a>
          </li>
        </ul>
      ) : (
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <a
              className="header__nav-link header__nav-link--profile"
              href="/#"
              onClick={(event) => {
                event.preventDefault();
                navigate(AppRoute.Login);
              }}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper" />
              <span className="header__login">Sign in</span>
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default HeaderNav;
