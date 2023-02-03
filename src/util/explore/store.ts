import { Sort } from '@/components/@Common/InfiniteScrollView/SortContainer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IExploreSortStore {
  sort: Sort;
  setSort: (data: Sort) => void;
}

export const useExploreSortStore = create(
  persist<IExploreSortStore>(
    (set) => ({
      sort: '인기순',
      setSort: (data) => {
        set((state) => ({ ...state, sort: data }));
      },
    }),
    {
      name: 'explore-sort-store',
    }
  )
);

interface IExploreScrollStore {
  scrollY: number;
  setScrollY: (data: number) => void;
}

export const useExploreScrollStore = create(
  persist<IExploreScrollStore>(
    (set) => ({
      scrollY: 0,
      setScrollY: (data) => {
        set((state) => ({ ...state, scrollY: data }));
      },
    }),
    {
      name: 'explore-scroll-store',
    }
  )
);

interface IExploreListStore {
  clothes: { id: number; image_url: string }[];
  setClothes: (data: { id: number; image_url: string }[]) => void;
}

export const useExploreListStore = create(
  persist<IExploreListStore>(
    (set) => ({
      clothes: [],
      setClothes: (data) => {
        set((state) => ({ ...state, clothes: data }));
      },
    }),
    {
      name: 'explore-list-store',
    }
  )
);

interface IExploreSearchingStateStore {
  searchingState: boolean;
  setSearchingState: (data: boolean) => void;
}

export const useExploreSearchingStateStore = create(
  persist<IExploreSearchingStateStore>(
    (set) => ({
      searchingState: false,
      setSearchingState: (data) => {
        set((state) => ({ ...state, searchingState: data }));
      },
    }),
    {
      name: 'explore-searching-state-store',
    }
  )
);

interface IExploreKeywordStore {
  keyword: string;
  setKeyword: (data: string) => void;
}

export const useExploreKeywordStore = create(
  persist<IExploreKeywordStore>(
    (set) => ({
      keyword: '',
      setKeyword: (data) => {
        set((state) => ({ ...state, keyword: data }));
      },
    }),
    {
      name: 'explore-keyword-store',
    }
  )
);

interface IExplorePageStore {
  page: number;
  setPage: (data: number) => void;
}

export const useExplorePageStore = create(
  persist<IExplorePageStore>(
    (set) => ({
      page: 1,
      setPage: (data: number) => {
        set((state) => ({ ...state, page: data }));
      },
    }),
    {
      name: 'explore-page-store',
    }
  )
);
