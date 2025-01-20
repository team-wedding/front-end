import { create } from 'zustand';
import { accordionData, AccordionItemData } from '../constants/accordionData';
import { sectionData } from '../constants/sectionData';

interface AccordionState {
  items: AccordionItemData[];
  allItems: AccordionItemData[];
  initializeItems: (start: number, end: number) => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  getSections: () => React.ReactNode[];
}

export const useAccordionStore = create<AccordionState>((set, get) => ({
  items: [],
  allItems: accordionData,
  initializeItems: (start, end) => {
    set((state) => ({
      items: state.allItems.slice(start, end),
    }));
  },
  moveItem: (dragIndex, hoverIndex) =>
    set((state) => {
      const allItems = [...state.allItems];

      // 매핑 객체 생성: id -> index
      const itemIndexMap = allItems.reduce<Record<number, number>>(
        (map, item, index) => {
          map[item.id] = index;
          return map;
        },
        {},
      );

      // items에서의 dragIndex를 allItems에서의 index로 변환
      const draggedItem = state.items[dragIndex];
      const hoveredItem = state.items[hoverIndex];

      const actualDragIndex = itemIndexMap[draggedItem.id];
      const actualHoverIndex = itemIndexMap[hoveredItem.id];

      // 순서 변경
      const [movedItem] = allItems.splice(actualDragIndex, 1);
      allItems.splice(actualHoverIndex, 0, movedItem);

      return {
        allItems,
        items: allItems.slice(
          state.allItems.indexOf(state.items[0]),
          state.allItems.indexOf(state.items[state.items.length - 1]) + 1,
        ),
      };
    }),
  getSections: () => {
    const { allItems } = get();

    return allItems
      .map((item) =>
        sectionData.find((section) => section.feature === item.feature),
      )
      .filter(Boolean)
      .map((section) => section!.section);
  },
}));
