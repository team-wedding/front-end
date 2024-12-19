import React from 'react';
import Header from '../common/Header/Header';
import Footer from '../common/Footer/Footer';

type PageLayoutProps = {
  title?: string;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
  children?: React.ReactNode;
};

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  leftButton,
  rightButton,
  children,
}) => {
  const header =
    !location.pathname.match('/splash') &&
    !location.pathname.match('/login') &&
    !location.pathname.match('/signup');

  const footer = header && !location.pathname.match('/create');

  return (
    <div className="container">
      {header && (
        <div className="fixed top-0 w-full left-0 z-50 bg-white h-12 flex justify-center">
          <Header
            text={title}
            leftButton={leftButton}
            rightButton={rightButton}
          />
        </div>
      )}

      <div className="content">{children}</div>
      {footer && (
        <div className="fixed bottom-0 w-full left-0 bg-white  h-12 flex justify-center">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default PageLayout;
