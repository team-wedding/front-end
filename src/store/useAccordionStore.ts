import { create } from 'zustand';
import React from 'react';
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

      // `items`에서의 dragIndex를 `allItems`에서의 index로 변환
      const draggedItem = state.items[dragIndex];
      const actualDragIndex = allItems.findIndex(
        (item) => item.id === draggedItem.id,
      );

      const hoveredItem = state.items[hoverIndex];
      const actualHoverIndex = allItems.findIndex(
        (item) => item.id === hoveredItem.id,
      );

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
