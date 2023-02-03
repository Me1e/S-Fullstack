import { BottomTabsNavigator } from '@/components/@Common/BottomTabsNavigator';
import ClothesListContainer from '@/components/explore/ClothesListContainer';
import { TopBar } from '@/components/explore/TopBar';
import { ForceCsr } from '@/components/ForceCsr';
import {
  useExploreKeywordStore,
  useExploreListStore,
  useExplorePageStore,
} from '@/util/explore/store';
import { useRef } from 'react';

export default function Explore() {
  const bottom = useRef(null);
  const { setKeyword } = useExploreKeywordStore();
  const { setClothes } = useExploreListStore();
  const { setPage } = useExplorePageStore();

  const onEndEditing = (value: string) => {
    setPage(1);
    setKeyword(value);
    setClothes([]);
  };

  const onClose = () => {
    setKeyword('');
    setClothes([]);
  };

  return (
    <ForceCsr>
      <TopBar onEndEditing={onEndEditing} onClose={onClose} />
      <div style={{ height: '56px', backgroundColor: '#F9F9F9' }} />
      <ClothesListContainer bottom={bottom} />
      <div style={{ height: '120px', backgroundColor: '#F9F9F9' }} />
      <div ref={bottom} />
      <BottomTabsNavigator />
    </ForceCsr>
  );
}
