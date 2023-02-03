import { Sort } from '@/components/@Common/InfiniteScrollView/SortContainer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IClosetSortStore {
  sort: Sort;
  setSort: (data: Sort) => void;
}

export const useClosetSortStore = create(
  persist<IClosetSortStore>(
    (set) => ({
      sort: '인기순',
      setSort: (data) => {
        set((state) => ({ ...state, sort: data }));
      },
    }),
    {
      name: 'closet-sort-store',
    }
  )
);

interface IClosetScrollStore {
  scrollY: number;
  setScrollY: (data: number) => void;
}

export const useClosetScrollStore = create(
  persist<IClosetScrollStore>(
    (set) => ({
      scrollY: 0,
      setScrollY: (data) => {
        set((state) => ({ ...state, scrollY: data }));
      },
    }),
    {
      name: 'closet-scroll-store',
    }
  )
);
