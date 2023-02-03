import useResetClothesList from '@/components/explore/useResetClothesList';
import { AWS_ADDRESS } from '@/const';
import {
  useExploreScrollStore,
  useExploreSortStore,
} from '@/util/explore/store';
import styled from '@emotion/styled';
import { LegacyRef, useEffect } from 'react';
import Clothes from './Clothes';
import SortContainer, { Sort } from './SortContainer';
import { useObserver } from './useObserver';

export const Container = styled.div`
  margin-left: 9.5px;
  margin-right: 9.5px;
  padding-top: 12px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const InfiniteScrollViewWrapper = styled.div`
  background-color: #f9f9f9;
`;

export function InfiniteClothesList({
  bottom,
  clothesList,
  getClothesList,
  dependencies,
}: {
  bottom: LegacyRef<HTMLElement>;
  clothesList: {
    id: number;
    image_url: string;
  }[];
  getClothesList: (value: Sort) => void;
  dependencies?;
}) {
  const { scrollY, setScrollY } = useExploreScrollStore();
  const { sort, setSort } = useExploreSortStore();
  const resetClothesList = useResetClothesList();

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, scrollY);
  }, []);

  const onClickSort = (value: Sort) => {
    setSort(value);
    resetClothesList();
    getClothesList(value);
  };

  const onIntersect = ([entry]) => entry.isIntersecting && getClothesList(sort);

  useObserver({
    target: bottom,
    onIntersect,
    dependencies: dependencies,
  });

  return (
    <InfiniteScrollViewWrapper>
      <SortContainer sort={sort} onChange={onClickSort} />
      <Container>
        {clothesList.map((v, i) => (
          <Clothes
            url={v.image_url ? AWS_ADDRESS + '/' + v.image_url : ''}
            id={v.id}
            onClick={() => setScrollY(window.scrollY)}
            key={i}
            style={{
              width: '50%',
              height: '50%',
              paddingLeft: '6.5px',
              paddingRight: '6.5px',
              marginBottom: '12px',
            }}
          />
        ))}
      </Container>
    </InfiniteScrollViewWrapper>
  );
}
