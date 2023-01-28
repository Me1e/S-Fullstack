import { AI_ADDRESS, AWS_ADDRESS } from '@/const';
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

export function Confirm() {
  const router = useRouter();

  const { title, color, desc, imageUrl, setImageUrl, parentId } =
    useGenerateStore();

  const RegenerateHandler = () => {
    fetch(`/api/posts/${parentId}`)
      .then((res) => res.json())
      .then((data) => {
        mutate(data);
      });
  };

  const editRequest = async (data) => {
    return fetch(`${AI_ADDRESS}/v2/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: data.image_url,
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
      }),
    }).then((res) => res.json());
  };

  const { mutate, isSuccess } = useMutation(editRequest, {
    onSuccess: (data) => {
      setImageUrl(data.images[0]);
    },
  });

  useEffect(() => {
    if (parentId) {
      // setImageUrl(undefined); // todo: 지원님께 여쭤보기
      // fetch(`/api/posts/${parentId}`)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     mutate(data);
      //   });
    }
  }, [mutate, parentId]);

  return (
    <ConfirmWrapper>
      <Header>
        <PrevButton onClick={router.back} />
        {parentId ? 'Redesign' : 'Generate'}
        <CloseButton onClick={() => router.push('/')} />
      </Header>
      <ImageWrapper>
        {isSuccess || !parentId ? (
          <Image
            src={`${AWS_ADDRESS}/${imageUrl}`}
            alt='Clothes image'
            width={267}
            height={267}
          />
        ) : (
          <>loading</>
        )}
      </ImageWrapper>
      <ButtonWrapper>
        {parentId ? (
          <RegenerateButton onClick={RegenerateHandler}>
            Regenerate
          </RegenerateButton>
        ) : (
          <></>
        )}
        <CompleteButton
          parentId={parentId ? parentId : undefined}
          onClick={() => router.push('/generate/last')}
        >
          Complete
        </CompleteButton>
      </ButtonWrapper>
    </ConfirmWrapper>
  );
}
