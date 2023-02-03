import { MdFavorite } from 'react-icons/md';
import { useUserInfoStore } from '@/util/store';
import { useQuery } from '@tanstack/react-query';
import { UserProps } from '../types';
import {
  AvatarExpanded,
  ExpandedUserInfoWrapper,
  InfoWrapper,
  UsernameExpanded,
} from './ExpandedUserInfo.style';
import { API_ADDRESS } from '@/const';

const ExpandedUserInfo = ({ username }: UserProps) => {
  const { id } = useUserInfoStore();

  const getLikes = async () => {
    return fetch(`${API_ADDRESS}/users/${id}/like`).then((res) => res.json());
  };

  const { data, isSuccess } = useQuery(
    [API_ADDRESS + '/users/:id/like'],
    getLikes
  );

  return (
    <ExpandedUserInfoWrapper>
      <AvatarExpanded
        src='https://t1.daumcdn.net/cfile/tistory/9931CB4B5D904D7607'
        alt=''
        width={90}
        height={90}
      />
      <UsernameExpanded>{username}</UsernameExpanded>
      <InfoWrapper>
        <MdFavorite
          color='#37258E'
          style={{
            width: '20',
            height: 'auto',
            position: 'relative',
            bottom: '-4',
            left: '-5',
          }}
        />
        {isSuccess ? data.likeCount : 0}
        <span>Likes</span>
      </InfoWrapper>
    </ExpandedUserInfoWrapper>
  );
};

export default ExpandedUserInfo;
