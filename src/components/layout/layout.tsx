import { Helmet } from 'react-helmet-async';
import MemoHeader from '../header/header';
import MemoFooter from '../footer/footer';
import { memo } from 'react';

type LayoutProps = {
  pageTitle?: string;
  classNameContainer?: string;
  classNameMain?: string;
  headerPage?: string;
  hasFooter?: boolean;
  children: React.ReactNode;
}


function Layout({pageTitle = '', classNameContainer = '', classNameMain = '', headerPage = '', hasFooter = true, children}: LayoutProps): JSX.Element {
  return (
    <div className={`page ${classNameContainer}`}>
      <Helmet>
        <title data-testid="title">{pageTitle} &#8211; Six cities</title>
      </Helmet>
      <MemoHeader headerPage={headerPage} />
      <main className={`page__main ${classNameMain}`}>
        {children}
      </main>
      {hasFooter && <MemoFooter />}
    </div>

  );
}

const MemoLayout = memo(Layout);

export default MemoLayout;
