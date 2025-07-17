import { create } from 'zustand';
import { accordionData, AccordionItemData } from '../constants/accordionData';
import { sectionData } from '../constants/sectionData';

interface OptionalOrder {
  order: number;
  feature: string;
  id: number;
}
interface AccordionState {
  items: AccordionItemData[];
  allItems: AccordionItemData[];
  optionalItems: OptionalOrder[];
  initializeItems: (start: number, end: number) => void;
  updateCompletionByFeature: (feature: string, isCompleted: boolean) => void;
  setOrderItems: () => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  setOptionalItems: (items: OptionalOrder[]) => void;
  getSections: () => React.ReactNode[];
  reset: () => void;
}

export const useAccordionStore = create<AccordionState>((set, get) => ({
  items: [],
  allItems: accordionData,
  optionalItems: accordionData.slice(7, 13).map((item) => ({
    order: item.id - 1,
    feature: item.feature,
    id: item.id,
  })),
  initializeItems: (start, end) => {
    set((state) => ({
      items: state.allItems.slice(start, end),
    }));
  },
  updateCompletionByFeature: (feature: string, isCompleted: boolean) => {
    const updatedItems = get().items.map((item) =>
      item.feature === feature ? { ...item, isCompleted } : item,
    );

    set(() => ({
      items: [...updatedItems],
      allItems: get().allItems.map((item) =>
        item.feature === feature ? { ...item, isCompleted } : item,
      ),
    }));
  },
  setOrderItems: () => {
    const { allItems, optionalItems, items } = get();
    const sortedOptionalItems = [...optionalItems].sort(
      (a, b) => a.order - b.order,
    );
    // 1. optionalItems에 해당하는 id만 따로 저장
    const optionalStartIndex = 7;
    const optionalItemIds = sortedOptionalItems.map((item) => item.id);

    // optionalItems의 id 순서에 맞춰 allItems 재정렬
    const idToItemMap = allItems.reduce<Record<number, AccordionItemData>>(
      (map, item) => {
        map[item.id] = item;
        return map;
      },
      {},
    );
    // const optionalItemIds = sortedOptionalItems.map((item) => item.id);

    // optionalItems 범위 내의 원소들 재정렬
    const reorderedItems = [...allItems];
    //let optionalStartIndex = 7;

    // optional 영역을 새로 채움
    for (let i = 0; i < optionalItemIds.length; i++) {
      const index = optionalStartIndex + i;
      reorderedItems[index] = idToItemMap[optionalItemIds[i]];
    }

    // 기존 items 범위 유지
    const startIdx = allItems.indexOf(items[0]);
    const endIdx = allItems.indexOf(items[items.length - 1]) + 1;

    set({
      allItems: reorderedItems,
      items: reorderedItems.slice(startIdx, endIdx),
      optionalItems: sortedOptionalItems,
    });
  },
  moveItem: (dragIndex, hoverIndex) =>
    set((state) => {
      const allItems = [...state.allItems];
      // const optionalItems = [...state.optionalItems];

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

      // ✅ optionalItems 업데이트 (7~13번 인덱스 범위 내에서만)
      const updatedOptionalItems = allItems.slice(7, 13).map((item, index) => ({
        order: index + 1,
        feature: item.feature,
        id: item.id,
      }));

      return {
        allItems,
        items: allItems.slice(
          state.allItems.indexOf(state.items[0]),
          state.allItems.indexOf(state.items[state.items.length - 1]) + 1,
        ),
        optionalItems: updatedOptionalItems,
      };
    }),
  setOptionalItems: (items) => set({ optionalItems: items }),
  getSections: () => {
    const { allItems } = get();
    return allItems
      .map((item) =>
        sectionData.find((section) => section.feature === item.feature),
      )
      .filter(Boolean)
      .map((section) => section!.section);
  },
  reset: () =>
    set(() => ({
      items: [],
      allItems: accordionData.map((item) => ({ ...item, isCompleted: false })),
      optionalItems: accordionData.slice(7, 13).map((item) => ({
        order: item.id - 1,
        feature: item.feature,
        id: item.id,
      })),
      isInitialized: false,
    })),
}));
