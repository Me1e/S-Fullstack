import { useExploreListStore, useExplorePageStore } from '@/util/explore/store';

export default function useResetClothesList() {
  const { setClothes } = useExploreListStore();
  const { setPage } = useExplorePageStore();

  return () => {
    setPage(1);
    setClothes([]);
  };
}
