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
            className={`w-full p-3 border-b text-label dark:text-label-dark text-xs font-light ${activeTab === index ? `border-b-2 border-label dark:border-label-dark font-semibold` : `border-border dark-border-border-dark text-label-secondary/60 dark:text-label-dark/60`}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 pb-40 px-4 bg-surface-muted dark:bg-surface-muted-dark">
        <div className="h-4"></div>
        {data[activeTab].content}
      </div>
    </div>
  );
};

export default Tab;
