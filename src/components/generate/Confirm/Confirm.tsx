import { API_ADDRESS, AWS_ADDRESS } from '@/const';
import { useGenerateStore } from '@/util/store';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  ButtonWrapper,
  CloseButton,
  CompleteButton,
  ConfirmWrapper,
  Header,
  ImageWrapper,
  PrevButton,
  RegenerateButton,
} from './Confirm.styles';

import * as LottieData from '@/../public/ai-loading.json';
import Lottie from 'lottie-react';

export function Confirm() {
  const router = useRouter();

  const { title, color, desc, imageUrl, setImageUrl, parentId, resetAll } =
    useGenerateStore();

  const RegenerateHandler = () => {
    setImageUrl(undefined);
    fetch(`${API_ADDRESS}/posts/${parentId}`)
      .then((res) => res.json())
      .then((data) => {
        mutate(data);
      });
  };

  const editRequest = async (data) => {
    const req = {
      image: data.imageUrl,
      source: {
        title: data.title,
        color: data.color,
        desc: data.desc,
      },
      target: {
        title,
        color,
        desc,
      },
    };
    console.log(req);

    return fetch(`${API_ADDRESS}/ai`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    }).then((res) => res.json());
  };

  const { mutate, isSuccess, isLoading } = useMutation(editRequest, {
    onSuccess: (data) => {
      setImageUrl(data.images[0]);
    },
  });

  useEffect(() => {
    if (parentId) {
      setImageUrl(undefined); // todo: 지원님께 여쭤보기
      fetch(`${API_ADDRESS}/posts/${parentId}`)
        .then((res) => res.json())
        .then((data) => {
          mutate(data);
        });
    }
  }, [mutate, parentId]);

  return (
    <ConfirmWrapper>
      <Header>
        <PrevButton onClick={router.back} />
        {parentId ? 'Redesign' : 'Generate'}
        <CloseButton
          onClick={() => {
            resetAll();
            router.push('/');
          }}
        />
      </Header>
      <ImageWrapper>
        {imageUrl || !parentId ? (
          <Image
            src={`${AWS_ADDRESS}/${imageUrl}`}
            alt='Clothes image'
            width={267}
            height={267}
          />
        ) : (
          <Lottie animationData={LottieData} />
        )}
      </ImageWrapper>
      <ButtonWrapper>
        {parentId ? (
          <RegenerateButton
            disabled={imageUrl === undefined}
            onClick={RegenerateHandler}
          >
            Regenerate
          </RegenerateButton>
        ) : (
          <></>
        )}
        <CompleteButton
          disabled={imageUrl === undefined}
          parentId={parentId ? parentId : undefined}
          onClick={() => router.push('/generate/last')}
        >
          Complete
        </CompleteButton>
      </ButtonWrapper>
    </ConfirmWrapper>
  );
}
