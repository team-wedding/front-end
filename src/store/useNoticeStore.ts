import { create } from 'zustand';

interface Notice {
  id: number;
  title: string;
  content: string;
  image: string | null;
}

interface NoticeStore {
  notices: Notice[];
  expandedIds: number[];
  maxNotices: number;
  addNotice: () => void;
  deleteNotice: (id: number) => void;
  updateNotice: (
    id: number,
    field: keyof Notice,
    value: string | File | null,
  ) => void;
  toggleExpand: (id: number) => void;
}

const useNoticeStore = create<NoticeStore>((set) => ({
  notices: [{ id: Date.now(), title: '', content: '', image: null }],
  expandedIds: [],
  maxNotices: 5,
  addNotice: () =>
    set((state) => {
      if (state.notices.length < state.maxNotices) {
        return {
          notices: [
            ...state.notices,
            { id: Date.now(), title: '', content: '', image: null },
          ],
        };
      }
      return state;
    }),
  deleteNotice: (id) =>
    set((state) => ({
      notices: state.notices.filter((notice) => notice.id !== id),
      expandedIds: state.expandedIds.filter((expandedId) => expandedId !== id),
    })),
  updateNotice: (id, field, value) =>
    set((state) => ({
      notices: state.notices.map((notice) =>
        notice.id === id ? { ...notice, [field]: value } : notice,
      ),
    })),
  toggleExpand: (id) =>
    set((state) => ({
      expandedIds: state.expandedIds.includes(id)
        ? state.expandedIds.filter((expandedId) => expandedId !== id)
        : [...state.expandedIds, id],
    })),
}));

export default useNoticeStore;
