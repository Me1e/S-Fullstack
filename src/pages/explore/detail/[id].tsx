import { BottomTabsNavigator } from '@/components/@Common/BottomTabsNavigator';
import Child from '@/components/explore/detail/Child';
import DetailPageHeader from '@/components/explore/detail/Header';
import Parent from '@/components/explore/detail/Parent';
import Post, { Post as PostType } from '@/components/explore/detail/Post';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useGenerateStore, useUserInfoStore } from '@/util/store';
import { API_ADDRESS } from '@/const';

type PostRes = PostType & {
  parent: {
    id: number;
    imageUrl: string;
    title: string;
    color: string;
    desc: string;
    caption: string;
    parentId: number;
    userId: number;
    likeCount: number;
  };
  user: {
    id: number;
    name: string;
  };
};

export default function Detail() {
  const [post, setPost] = useState<PostRes>();
  const [child, setChild] = useState<PostType[]>([]);
  const [like, setLike] = useState<boolean>();
  const { id: userId } = useUserInfoStore();

  const { resetAll } = useGenerateStore();

  const { id } = useRouter().query;

  useEffect(() => {
    resetAll();
    if (id) {
      axios.get(API_ADDRESS + '/posts/' + id).then((res) => setPost(res.data));
      axios
        .get(API_ADDRESS + '/posts/' + id + '/children')
        .then((res) => setChild(res.data));
      axios
        .get(API_ADDRESS + '/posts/' + id + '/like?userId=' + userId)
        .then((res) => setLike(res.data.isLiked));
    }
  }, [id]);

  if (!post || like == undefined) return <div />;

  return (
    <>
      <DetailPageHeader />
      <div style={{ height: '56px' }} />
      <Post post={post} user={post.user} like={like} />
      {post.parent && <Parent post={post.parent} />}
      {child.length ? <Child postList={child} /> : <></>}
      <div style={{ height: 120 }} />
      <BottomTabsNavigator />
    </>
  );
}
