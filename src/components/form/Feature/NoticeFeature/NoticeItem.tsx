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
  <div className="mb-4">
    <div
      onClick={onToggleExpand}
      className="p-3 rounded-md border bg-white shadow-md cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold">{item.title}</span>
        <i
          className={`bx bx-chevron-down transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        ></i>
      </div>
      {isExpanded && (
        <div className="pt-4 text-sm" onClick={(e) => e.stopPropagation()}>
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
  <div>
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
