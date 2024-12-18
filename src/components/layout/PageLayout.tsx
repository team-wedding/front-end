import React from 'react';
import Header from '../common/Header/Header';
import Footer from '../common/Footer/Footer';
import { useLocation } from 'react-router';

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
  const location = useLocation()

  return (
    <div className="container">
      <Header text={title} leftButton={leftButton} rightButton={rightButton} />
      <div className="content">{children}</div>
      {!location.pathname.match("/create") &&
        <div className="fixed bottom-0 left-0 w-full bg-white  h-14 flex justify-center">
          <Footer />
        </div>
      }
    </div>
  );
};

export default PageLayout;
