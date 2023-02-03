import Clothes from '@/components/@Common/InfiniteScrollView/Clothes';
import SortContainer, {
  Sort,
} from '@/components/@Common/InfiniteScrollView/SortContainer';
import { useObserver } from '@/components/@Common/InfiniteScrollView/useObserver';
import { AWS_ADDRESS } from '@/const';
import { useClosetScrollStore, useClosetSortStore } from '@/util/closet/store';
import { useUserInfoStore } from '@/util/store';
import styled from '@emotion/styled';
import axios from 'axios';
import { LegacyRef, useEffect, useRef, useState } from 'react';

export const ClothesContainer = styled.div`
  margin-left: 9.5px;
  margin-right: 9.5px;
  padding-top: 12px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const ClothesListWrapper = styled.div`
  background-color: #f9f9f9;
`;

export function ClothesList({ bottom }: { bottom: LegacyRef<HTMLElement> }) {
  const { sort, setSort } = useClosetSortStore();
  const page = useRef(1);
  const [clothes, setClothes] = useState<{ id: number; image_url: string }[]>(
    []
  );
  const { scrollY, setScrollY } = useClosetScrollStore();
  const { id: userId } = useUserInfoStore();

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, scrollY);
  }, []);

  const onClickSort = (value: Sort) => {
    page.current = 1;
    setSort(value);
    setClothes([]);
    getPosts(value);
  };

  const getPosts = (value: Sort) => {
    const params =
      value == '최신순'
        ? { page: page.current, user_id: userId }
        : { page: page.current, sort_by: 'like', user_id: userId };
    axios
      .get('/api/posts', {
        params: params,
      })
      .then((res) => {
        setClothes((prev) => prev.concat(...res.data));
        page.current += 1;
      });
  };

  const onIntersect = ([entry]) => entry.isIntersecting && getPosts(sort);

  useObserver({
    target: bottom,
    onIntersect,
  });

  return (
    <ClothesListWrapper>
      <SortContainer sort={sort} onChange={onClickSort} />
      <ClothesContainer>
        {clothes.map((v, i) => (
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
      </ClothesContainer>
    </ClothesListWrapper>
  );
}
