import { create } from 'zustand';

interface Notice {
  noticeId: number;
  title: string;
  content: string;
  image: string | null;
}

interface NoticeStore {
  notices: Notice[];
  expandedIds: number[];
  maxNotices: number;
  addNotice: () => void;
  replaceNotice: (notice: Notice[]) => void;
  deleteNotice: (id: number) => void;
  updateNotice: (
    id: number,
    field: keyof Notice,
    value: string | File | null,
  ) => void;
  toggleExpand: (id: number) => void;
  reset: () => void;
}
const createNewNotice = (idGenerator = Date.now) => ({
  noticeId: idGenerator(),
  title: '',
  content: '',
  image: null,
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

  replaceNotice: (newNotice: Notice[]) =>
    set(() => ({
      notices: newNotice,
    })),

  deleteNotice: (id) =>
    set((state) => ({
      notices: state.notices.filter((notice) => notice.noticeId !== id),
      expandedIds: state.expandedIds.filter((expandedId) => expandedId !== id),
    })),

  updateNotice: (id, field, value) =>
    set((state) => ({
      notices: state.notices.map((notice) =>
        notice.noticeId === id ? { ...notice, [field]: value } : notice,
      ),
    })),
  reset: () =>
    set(() => ({
      notices: [createNewNotice()],
      expandedIds: [],
      maxNotices: 5,
    })),
  toggleExpand: (id) =>
    set((state) => ({
      expandedIds: state.expandedIds.includes(id)
        ? state.expandedIds.filter((expandedId) => expandedId !== id)
        : [...state.expandedIds, id],
    })),
}));

export default useNoticeStore;
