import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { CSSProperties } from 'react';

const ClothesImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

export default function Clothes({
  url,
  id,
  style,
  onClick,
}: {
  url: string;
  id: number;
  style?: CSSProperties;
  onClick?: () => void;
}) {
  return (
    <Link href={'/explore/detail/' + id} onClick={onClick} style={style}>
      {true && (
        <ClothesImage
          src={url}
          alt=''
          style={{
            width: '100%',
            height: '100%',
            borderWidth: '1px',
            borderColor: '#F5F3F6',
            borderStyle: 'solid',
          }}
          width={100}
          height={200}
        />
      )}
    </Link>
  );
}
