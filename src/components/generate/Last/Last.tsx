import { API_ADDRESS, AWS_ADDRESS } from '@/const';
import IPostPostReqDto from '@/types/PostPost.types';
import { useExploreListStore, useExplorePageStore } from '@/util/explore/store';
import { useGenerateStore, useUserInfoStore } from '@/util/store';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  CloseButton,
  LastWarpper,
  Header,
  PrevButton,
  ImageWrapper,
  TitleWrapper,
  Form,
  PostButton,
} from './Last.styles';
import { ILastFormValue } from './Last.types';

export function Last() {
  const router = useRouter();
  const { setPage } = useExplorePageStore();
  const { setClothes } = useExploreListStore();
  const [disable, setDisable] = useState(false);

  const { id } = useUserInfoStore();

  const { title, color, desc, imageUrl, parentId, setSelectImageUrls } =
    useGenerateStore();

  const postHandler = async (data: IPostPostReqDto) => {
    return fetch(`${API_ADDRESS}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  };

  const { mutate } = useMutation(postHandler, {
    onSuccess: (data) => {
      setPage(1);
      setClothes([]);
      setSelectImageUrls(undefined);
      router.push(`/explore/detail/${data.id}`);
    },
  });

  const { register, handleSubmit } = useForm<ILastFormValue>();

  const onSubmitHandler: SubmitHandler<ILastFormValue> = (data) => {
    setDisable(true);
    mutate({
      imageUrl,
      title,
      color,
      desc,
      parentId,
      caption: data.caption,
      userId: id,
    });
  };

  return (
    <LastWarpper>
      <Header>
        <PrevButton onClick={router.back} />
        {parentId ? 'Redesign' : 'Generate'}
        <CloseButton onClick={() => router.push('/')} />
      </Header>
      <ImageWrapper>
        <Image
          src={`${AWS_ADDRESS}/${imageUrl}`}
          alt='Clothes image'
          width={155}
          height={155}
        />
      </ImageWrapper>
      <TitleWrapper>{title}</TitleWrapper>
      <Form onSubmit={handleSubmit(onSubmitHandler)}>
        <textarea
          id='caption'
          placeholder='Write a catpion'
          {...register('caption')}
        />
        <PostButton disabled={disable}>Post</PostButton>
      </Form>
    </LastWarpper>
  );
}
