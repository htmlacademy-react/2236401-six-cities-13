import Logo from '../logo/logo';
import { HeaderPage } from '../../const';
import HeaderNav from '../header-nav/header-nav';

type HeaderOffersProps = {
  headerPage: string;
}

function Header({headerPage}: HeaderOffersProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          {headerPage === HeaderPage.HasNav && <HeaderNav/>}
        </div>
      </div>
    </header>
  );
}

export default Header;
