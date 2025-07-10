interface InformationItemProps {
  messages: string[];
}

const InformationItem = ({ messages }: InformationItemProps) => {
  return (
    <>
      <div className="w-full mx-auto text-xs flex flex-col  gap-1 py-3">
        {messages.map((message, index) => (
          <div key={index} className="flex items-start gap-2 text-slate-500">
            <span>ⓘ</span>
            <span>{message}</span>
          </div>
        ))}
      </div>
      <div className="w-full h-px bg-slate-900/5 my-3"></div>
    </>
  );
};

export default InformationItem;
