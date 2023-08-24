import MemoLogo from '../logo/logo';
import { HeaderPage } from '../../const';
import MemoHeaderNav from '../header-nav/header-nav';
import React from 'react';

type HeaderOffersProps = {
  headerPage: string;
}

function Header({headerPage}: HeaderOffersProps): JSX.Element {
  return (
    <header className="header" data-testid="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <MemoLogo />
          </div>
          {headerPage === HeaderPage.HasNav && <MemoHeaderNav/>}
        </div>
      </div>
    </header>
  );
}

const MemoHeader = React.memo(Header);

export default MemoHeader;
