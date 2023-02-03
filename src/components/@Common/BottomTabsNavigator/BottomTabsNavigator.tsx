import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { MdExplore, MdOutlineCheckroom } from 'react-icons/md';
import { IoAddOutline } from 'react-icons/io5';
import Link from 'next/link';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  background-color: #fff;
  border-top-right-radius: 32px;
  border-top-left-radius: 32px;
  width: 100%;
  /* max-width: 375px; */
  height: 80px;
  box-shadow: 0px -7px 9px rgba(145, 152, 208, 0.16);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const Explore = styled(MdExplore)`
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

const PlusContainer = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  position: relative;
  top: -35%;
  background-color: #fff;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px -7px 9px rgba(145, 152, 208, 0.16);

  &::before {
    content: '';
    width: 120px;
    height: 96px;
    display: block;
    position: absolute;
    background-color: #fff;
    transform: translateY(38%);
  }
`;

const PlusIconContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(
    142.67deg,
    #b7baff 9.35%,
    #5b60d1 29.47%,
    #383daa 48.87%,
    #2b0d52 81.34%,
    #a995c2 95.96%
  );
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlusIcon = styled(IoAddOutline)`
  width: 48px;
  height: 48px;
  cursor: pointer;
`;

const Closet = styled(MdOutlineCheckroom)`
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

export function BottomTabsNavigator() {
  const { pathname, push } = useRouter();
  return (
    <Container>
      <Link href={'/explore'}>
        <Explore
          color={pathname.indexOf('/explore') == 0 ? '#313851' : '#A9AFCD'}
        />
      </Link>
      <PlusContainer>
        <PlusIconContainer onClick={() => push('/generate/start')}>
          <PlusIcon color='#fff' />
        </PlusIconContainer>
      </PlusContainer>
      <Link href={'/closet'}>
        <Closet
          color={pathname.indexOf('/closet') == 0 ? '#313851' : '#A9AFCD'}
        />
      </Link>
    </Container>
  );
}
