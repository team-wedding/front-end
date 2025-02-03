interface SectionTitleProps {
  subTitle: string;
  title: string;
}

const SectionTitle = ({ subTitle, title }: SectionTitleProps) => {
  return (
    <div className="column-center gap-2">
      <div className="sub-title">{subTitle}</div>
      <div className="title">{title}</div>
    </div>
  );
};

export default SectionTitle;
