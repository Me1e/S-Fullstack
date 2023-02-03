import { BottomTabsNavigator } from '@/components/@Common/BottomTabsNavigator';
import { InfiniteClothesList } from '@/components/@Common/InfiniteScrollView';
import { Sort } from '@/components/@Common/InfiniteScrollView/SortContainer';
import { TopBar } from '@/components/explore/TopBar';
import { ForceCsr } from '@/components/ForceCsr';
import {
  useExploreKeywordStore,
  useExploreListStore,
  useExplorePageStore,
} from '@/util/explore/store';
import axios from 'axios';
import { useRef } from 'react';

export default function Explore() {
  const bottom = useRef(null);
  const { keyword, setKeyword } = useExploreKeywordStore();
  const { clothes, setClothes } = useExploreListStore();
  const { page, setPage } = useExplorePageStore();

  const onEndEditing = (value: string) => {
    setPage(1);
    setKeyword(value);
    setClothes([]);
  };

  const onClose = () => {
    setKeyword('');
    setClothes([]);
  };

  const getClothesList = (value: Sort) => {
    const params =
      value == '최신순' ? { page: page } : { page: page, sort_by: 'like' };

    if (keyword && keyword != '') Object.assign(params, { search: keyword });

    axios
      .get('/api/posts', {
        params: params,
      })
      .then((res) => {
        if (res.data.length > 0) {
          setClothes(clothes.concat(...res.data));
          setPage(page + 1);
        }
      });
  };

  return (
    <ForceCsr>
      <TopBar onEndEditing={onEndEditing} onClose={onClose} />
      <div style={{ height: '56px', backgroundColor: '#F9F9F9' }} />
      <InfiniteClothesList
        bottom={bottom}
        clothesList={clothes}
        getClothesList={getClothesList}
        dependencies={{ keyword, clothes, page }}
      />
      <div ref={bottom} />
      <div style={{ height: '120px', backgroundColor: '#F9F9F9' }} />
      <BottomTabsNavigator />
    </ForceCsr>
  );
}
