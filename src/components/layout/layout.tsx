import { Helmet } from 'react-helmet-async';
import Header from '../header/header';
import Footer from '../footer/footer';

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
        <title>Six cities. {pageTitle}</title>
      </Helmet>
      <Header headerPage={headerPage} />
      <main className={`page__main ${classNameMain}`}>
        {children}
      </main>
      {hasFooter && <Footer />}
    </div>

  );
}

export default Layout;
