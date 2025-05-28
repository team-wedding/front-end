interface SectionTitleProps {
  subTitle: string;
  title: string;
  information?: React.ReactNode;
}

const SectionTitle = ({ subTitle, title, information }: SectionTitleProps) => {
  return (
    <div className="column-center gap-2">
      <div className="sub-title">{subTitle}</div>
      <div className="title">{title}</div>
      {information && (
        <span className="text-center mb-10 text-neutral-400 text-sm">
          {information}
        </span>
      )}
    </div>
  );
};

export default SectionTitle;
