import { create } from 'zustand';

interface Notice {
  id: number;
  title: string;
  content: string;
  image: string;
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

const createNewNotice = (idGenerator = Date.now) => ({
  id: idGenerator(),
  title: '',
  content: '',
  image: '',
});

const useNoticeStore = create<NoticeStore>((set) => ({
  notices: [createNewNotice()],
  expandedIds: [],
  maxNotices: 5,

  addNotice: () =>
    set((state) => {
      if (state.notices.length >= state.maxNotices) return state;
      const newNotice = createNewNotice();
      return { notices: [...state.notices, newNotice] };
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
