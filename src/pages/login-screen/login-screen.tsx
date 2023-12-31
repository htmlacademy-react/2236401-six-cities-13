import { AppRoute, AuthorizationStatus, HeaderPage, Status, TRAVEL_CITIES } from '../../const';
import MemoLayout from '../../components/layout/layout';
import React, { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Link, Navigate } from 'react-router-dom';
import { loginAction } from '../../store/api-actions';
import { toast } from 'react-toastify';
import { getAuthorizationStatus, getUserStatus } from '../../store/user-process/user-process.selectors';
import { setActiveCity } from '../../store/offers/offers.slice';
import { getRandomArrayElement } from '../../utils';

const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])\S*$/i;
const REGEX_EMAIL = /^[\w]{1}[\w-\\.]*@[\w-]+\.[a-z]{2,4}$/i;

function LoginScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({email: '', password: ''});

  const handleFormChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    const {name, value} = evt.target;
    setFormData({ ...formData, [name]: value});
  };

  const isLoginStatusLoading = useAppSelector(getUserStatus) === Status.Loading;

  const buttonIsDisabled = !REGEX_EMAIL.test(formData.email)
    || !REGEX_PASSWORD.test(formData.password)
    || isLoginStatusLoading;

  const dispatch = useAppDispatch();

  const randomCity = getRandomArrayElement([...TRAVEL_CITIES]);

  const handleFormSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null
      && passwordRef.current !== null) {
      if (!REGEX_PASSWORD.test(passwordRef.current.value)) {
        toast.warn('The password must have at least one letter & one symbol without spaces');
        return;
      }
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  }, [dispatch, loginRef, passwordRef]);

  const hasAuthorization = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;

  if (hasAuthorization) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <MemoLayout pageTitle = 'Registration'
      classNameContainer = 'page--gray page--login'
      classNameMain = 'page__main--login'
      headerPage = {HeaderPage.WithoutNav}
      hasFooter ={false}
    >
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title" data-testid="titleElement">Sign in</h1>
          <form className="login__form form"
            action=""
            method="post"
            onSubmit={handleFormSubmit}
          >
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden" htmlFor="name">E-mail</label>
              <input className="login__input form__input"
                ref={loginRef}
                id="name"
                type="email"
                name="email"
                placeholder="Email"
                required
                onChange={handleFormChange}
                data-testid="loginElement"
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden" htmlFor="password">Password</label>
              <input className="login__input form__input"
                ref={passwordRef}
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={handleFormChange}
                data-testid="passwordElement"
              />
            </div>
            <button className="login__submit form__submit button"
              type="submit"
              disabled={buttonIsDisabled}
            >
              {isLoginStatusLoading ? 'In progress...' : 'Sign in'}
            </button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link className="locations__item-link"
              to={AppRoute.Main}
              data-testid='random-city-link'
              onClick={() => {
                dispatch(setActiveCity(randomCity));
              }}
            >
              <span>{randomCity}</span>
            </Link>
          </div>
        </section>
      </div>
    </MemoLayout>
  );
}

const MemoLoginScreen = React.memo(LoginScreen);

export default MemoLoginScreen;
