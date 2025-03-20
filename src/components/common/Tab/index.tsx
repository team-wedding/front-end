interface TabItem {
  label: string;
  content: JSX.Element;
}

interface TabProps {
  data: TabItem[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const Tab = ({ data, activeTab, setActiveTab }: TabProps) => {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex w-full justify-around">
        {data.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`w-full p-3 border-b-2 text-sm ${activeTab === index ? `border-[#565656] font-semibold` : `border-[#EBEBEB] text-[#BDBDBD]`}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 pb-40 px-3 bg-[#F2F2F7]">
        <div className="h-4"></div>
        {data[activeTab].content}
      </div>
    </div>
  );
};

export default Tab;
