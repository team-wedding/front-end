import React, { ReactNode } from 'react';

interface NoticeItemData {
  id: number;
  title: ReactNode;
  content: ReactNode;
}

interface NoticeProps {
  items: NoticeItemData[];
  expandedIds: number[];
  toggleExpand: (id: number) => void;
}

const NoticeItem: React.FC<{
  item: NoticeItemData;
  isExpanded: boolean;
  onToggleExpand: () => void;
}> = ({ item, isExpanded, onToggleExpand }) => (
  <div className="my-2">
    <div
      onClick={onToggleExpand}
      className="p-3 rounded-2xl border bg-white shadow-sm cursor-pointer hover:ring-1 hover:ring-black"
    >
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium">{item.title}</span>
        <i
          className={`bx bx-chevron-down transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        ></i>
      </div>
      {isExpanded && (
        <div className="py-4 text-sm" onClick={(e) => e.stopPropagation()}>
          {item.content}
        </div>
      )}
    </div>
  </div>
);

export const Notice: React.FC<NoticeProps> = ({
  items,
  expandedIds,
  toggleExpand,
}) => (
  <div className="my-10">
    {items.map((item) => {
      const isExpanded = expandedIds.includes(item.id);
      return (
        <NoticeItem
          key={item.id}
          item={item}
          isExpanded={isExpanded}
          onToggleExpand={() => toggleExpand(item.id)}
        />
      );
    })}
  </div>
);
