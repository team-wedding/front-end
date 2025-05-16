import { ReactNode } from 'react';

interface NoticeItemData {
  noticeId: number;
  title: ReactNode;
  content: ReactNode;
}

interface NoticeProps {
  items: NoticeItemData[];
  expandedIds: number[];
  toggleExpand: (noticeId: number) => void;
}

interface NoticeItemProps {
  item: NoticeItemData;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const NoticeItem = ({ item, isExpanded, onToggleExpand }: NoticeItemProps) => (
  <div className="my-2">
    <div
      onClick={onToggleExpand}
      className="p-2 rounded-2xl border bg-white shadow-sm cursor-pointer hover:ring-1 hover:ring-black"
    >
      <div className="flex justify-between items-center mx-3">
        <span className="text-xs font-medium">{item.title}</span>
        <i
          className={`bx bx-chevron-down transition-transform duration-300 text-lg ${
            isExpanded ? 'rotate-180' : ''
          }`}
        ></i>
      </div>

      {isExpanded && (
        <div className="my-8 text-sm" onClick={(e) => e.stopPropagation()}>
          {item.content}
        </div>
      )}
    </div>
  </div>
);

export const Notice = ({ items, expandedIds, toggleExpand }: NoticeProps) => (
  <div className="my-10">
    {items.map((item) => {
      const isExpanded = expandedIds.includes(item.noticeId);
      return (
        <NoticeItem
          key={item.noticeId}
          item={item}
          isExpanded={isExpanded}
          onToggleExpand={() => toggleExpand(item.noticeId)}
        />
      );
    })}
  </div>
);
