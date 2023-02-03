import { AWS_ADDRESS } from '@/const';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Post } from './Post';

const Container = styled.div`
  width: 100%;
  height: 120px;
  border-width: 1px;
  border-color: #dedcdf;
  border-style: solid;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  margin-bottom: 16px;
`;

const Img = styled(Image)`
  width: 118px;
  height: 118px;
`;

const TextContainer = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  color: #000;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 12px;
`;

const Caption = styled.div`
  color: #000;
  font-weight: 300;
  font-size: 12px;
  flex: 1;
  height: 10px;
`;

export default function ChildLink({ post }: { post: Post }) {
  const router = useRouter();
  return (
    <Container onClick={() => router.push('/explore/detail/' + post.id)}>
      <Img
        src={post.imageUrl ? AWS_ADDRESS + '/' + post.imageUrl : ''}
        alt=''
        width={120}
        height={120}
      />
      <TextContainer>
        <Title>{post.title}</Title>
        {post.caption && (
          <Caption>
            {post.caption.slice(0, 100) +
              (post.caption.length > 100 ? '...' : '')}
          </Caption>
        )}
      </TextContainer>
    </Container>
  );
}
