import Header from "@/components/common/Header/Header";

type PageLayoutProps = {
  title?: string | React.ReactNode;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
  children?: React.ReactNode;
  customHeader?: React.ReactNode | false;
  customFooter?: React.ReactNode | false;
};

const PageLayout = ({
  title,
  leftButton,
  rightButton,
  children,
  customHeader = (
    <Header text={title} leftButton={leftButton} rightButton={rightButton} />
  ),
  customFooter = <></>,
}: PageLayoutProps) => {
  return (
    <div className="layout">
      {customHeader && <div className="layout-header">{customHeader}</div>}

      <div className="layout-content">{children}</div>

      {customFooter && <div className="layout-footer">{customFooter}</div>}
    </div>
  );
};

export default PageLayout;
