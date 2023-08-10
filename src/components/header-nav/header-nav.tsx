import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';

function HeaderNav (): JSX.Element {

  const dispatch = useAppDispatch();

  const userStatus = useAppSelector((state) => state.authorizationStatus);
  const isLoggedIn = userStatus === AuthorizationStatus.Auth;

  const userInfo = useAppSelector((state) => state.userInfo);
  // console.log(userInfo)

  return (
    <nav className="header__nav">
      {isLoggedIn ?
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile"
              to={AppRoute.Favorites}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper">
                {userInfo?.avatarUrl
                  &&
                  <img src={userInfo?.avatarUrl}
                    width={20} height={20}
                    style={{borderRadius:'50%'}}
                  />}
              </div>
              <span className="header__user-name user__name">{userInfo?.email}</span>
              <span className="header__favorite-count">{3}</span>
            </Link>
          </li>
          <li className="header__nav-item">
            <Link
              className="header__nav-link"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
              }}
              to={AppRoute.Main}
            >
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        </ul>
        :
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>}
    </nav>
  );
}
export default HeaderNav;
