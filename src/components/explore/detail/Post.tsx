import { API_ADDRESS, AWS_ADDRESS } from '@/const';
import { useGenerateStore, useUserInfoStore } from '@/util/store';
import styled from '@emotion/styled';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdFavorite, MdOutlineFavoriteBorder, MdBrush } from 'react-icons/md';

const Container = styled.div`
  padding-top: 12px;
  margin-left: 20px;
  margin-right: 20px;
`;

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 14px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(183, 183, 183, 0.2) 0%,
      rgba(210, 216, 232, 0.125899) 10.73%,
      rgba(225, 227, 233, 0) 28.96%,
      rgba(105, 107, 116, 0) 80.83%,
      rgba(185, 188, 203, 0.0837246) 89.37%,
      rgba(156, 160, 174, 0.2) 100%
    );
  }
`;

const Img = styled(Image)`
  width: 100%;
  height: 100%;
`;

const ProfileContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileImage = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ProfileName = styled.div`
  color: #111a30;
  font-size: 14px;
  font-weight: 500;
  margin-left: 8px;
  background-color: #fff;
  border-radius: 5px;
  padding: 1px 2px;
`;

const Title = styled.div`
  margin-top: 22px;
  font-size: 20px;
  color: #08090c;
  padding-left: 10px;
  padding-right: 10px;
  font-weight: 600;
`;

const Caption = styled.div`
  margin-top: 20px;
  font-weight: 400;
  font-size: 16px;
  padding-left: 10px;
  padding-right: 10px;
`;

const ButtonsContainer = styled.div`
  margin-top: 26px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LikeButton = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 14px;
  height: 48px;
  border-color: #575d78;
  border-width: 1px;
  border-style: solid;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const RedsignButton = styled.div`
  padding-left: 25px;
  padding-right: 35px;
  border-radius: 14px;
  height: 48px;
  background-color: #111a30;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const FavoriteIcon = styled(MdFavorite)`
  width: 36px;
  height: 36px;
`;

const FavoriteText = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #111a30;
  margin-left: 4px;
  margin-right: 4px;
`;

const OutlineFavoriteIcon = styled(MdOutlineFavoriteBorder)`
  width: 36px;
  height: 36px;
`;

const BrushIcon = styled(MdBrush)`
  width: 19px;
  height: 19px;
`;

const RedesignText = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-left: 10px;
  color: #fff;
`;

const HorizontalLine = styled.div`
  margin-top: 36px;
  width: 100%;
  height: 6px;
  background-color: #f5f3f6;
`;

export type Post = {
  id: number;
  imageUrl?: string;
  title: string;
  color: string;
  desc: string;
  caption: string;
  likeCount: number;
};

export type User = {
  id?: number;
  name: string;
};

export default function Post({
  post,
  user,
  like,
}: {
  post: Post;
  user: User;
  like: boolean;
}) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id: userId } = useUserInfoStore();
  const route = useRouter();
  const { setTitle, setColor, setDesc, setImageUrl, setParentId } =
    useGenerateStore();

  const onClickLike = () => {
    if (loading) return;
    setLoading(true);

    axios
      .post(API_ADDRESS + '/posts/' + post.id + '/like', {
        userId: userId,
      })
      .then(() => {
        if (liked) {
          post.likeCount--;
        } else {
          post.likeCount++;
        }
        setLiked((prev) => !prev);
        setLoading(false);
      });
  };

  const redesignHandler = () => {
    setTitle(post.title);
    setColor(post.color);
    setDesc(post.desc);
    setParentId(post.id);
    setImageUrl(post.imageUrl);
    route.push('/generate/start');
  };

  useEffect(() => {
    setLiked(like);
  }, [like]);

  return (
    <Container>
      <ImageContainer>
        <Img
          src={post.imageUrl ? AWS_ADDRESS + '/' + post.imageUrl : ''}
          alt=''
          width={400}
          height={400}
        />
        <ProfileContainer>
          <ProfileImage
            src='https://t1.daumcdn.net/cfile/tistory/9931CB4B5D904D7607'
            alt=''
            width={40}
            height={40}
          />
          <ProfileName>{user.name}</ProfileName>
        </ProfileContainer>
      </ImageContainer>
      <Title>{post.title}</Title>
      {post.caption && <Caption>{post.caption}</Caption>}
      <ButtonsContainer>
        <LikeButton onClick={onClickLike}>
          {liked ? (
            <FavoriteIcon color='#9747FF' />
          ) : (
            <OutlineFavoriteIcon color='#111A30' />
          )}
          <FavoriteText>{post.likeCount}</FavoriteText>
        </LikeButton>
        <RedsignButton>
          <BrushIcon color='#fff' />
          <RedesignText onClick={redesignHandler}>Redesign</RedesignText>
        </RedsignButton>
      </ButtonsContainer>
      <HorizontalLine />
    </Container>
  );
}
