import React from 'react';
import Header from '../common/Header/Header';

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
  return (
    <div className="container">
      <Header text={title} leftButton={leftButton} rightButton={rightButton} />
      <div className="content">{children}</div>
    </div>
  );
};

export default PageLayout;
