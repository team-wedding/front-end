import React from 'react';
import Header from '../common/Header/Header';
import Footer from '../common/Footer/Footer';

type PageLayoutProps = {
  title?: string | React.ReactNode;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
  children?: React.ReactNode;
  customFooter?: React.ReactNode;
};

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  leftButton,
  rightButton,
  children,
  customFooter,
}) => {
  return (
    <div className="layout">
      <div className="layout-header">
        <Header
          text={title}
          leftButton={leftButton}
          rightButton={rightButton}
        />
      </div>

      <div className="layout-content">{children}</div>
      <div className="layout-footer">
        {customFooter ? customFooter : <Footer />}
      </div>
    </div>
  );
};

export default PageLayout;
