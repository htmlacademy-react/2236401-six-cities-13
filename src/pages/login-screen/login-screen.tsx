import { AppRoute, AuthorizationStatus, HeaderPage } from '../../const';
import Layout from '../../components/layout/layout';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Link, Navigate } from 'react-router-dom';
import { loginAction } from '../../store/api-actions';
import { toast } from 'react-toastify';
import { getAutorizationStatus } from '../../store/user-process/user-process.selectors';

function LoginScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({email: '', password: ''});

  function onChangeFormHandler (evt: ChangeEvent<HTMLInputElement>): void {
    const {name, value} = evt.target;
    setFormData({ ...formData, [name]: value});
  }

  const regexPassword = /^(?=.*\d)(?=.*[a-z])\S*$/i;
  const regexEmail = /^[\w]{1}[\w-\\.]*@[\w-]+\.[a-z]{2,4}$/i;

  const buttonIsDisabled = !regexEmail.test(formData.email) || !regexPassword.test(formData.password);

  const dispatch = useAppDispatch();


  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null
      && passwordRef.current !== null) {
      if (!regexPassword.test(passwordRef.current.value)) {
        toast.warn('The password must have at least one letter & one symbol without spaces');
        return;
      }
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  const hasAuthorization = useAppSelector(getAutorizationStatus) === AuthorizationStatus.Auth;

  if (hasAuthorization) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <Layout pageTitle = 'Registration'
      classNameContainer = 'page--gray page--login'
      classNameMain = 'page__main--login'
      headerPage = {HeaderPage.WithoutNav}
      hasFooter ={false}
    >
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form"
            action=""
            method="post"
            onSubmit={submitHandler}
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
                onChange={onChangeFormHandler}
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
                onChange={onChangeFormHandler}
              />
            </div>
            <button className="login__submit form__submit button"
              type="submit"
              disabled={buttonIsDisabled}
            >
              Sign in
            </button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to={AppRoute.Main}>
              <span>Amsterdam</span>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default LoginScreen;
