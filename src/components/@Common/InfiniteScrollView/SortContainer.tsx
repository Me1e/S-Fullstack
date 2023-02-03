import styled from '@emotion/styled';
import { MdSort } from 'react-icons/md';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: 16px;
  padding-top: 17px;
  cursor: pointer;
`;

const Icon = styled(MdSort)`
  width: 18px;
  height: 18px;
`;

const Select = styled.select`
  font-size: 14px;
  font-weight: 600;
  color: #1c1b1f;
  margin-left: 8px;
  appearance: none;
  width: 40px;
  border-style: none;
  background-color: transparent;
`;

export type Sort = '인기순' | '최신순';

export default function SortContainer({
  sort,
  onChange,
}: {
  sort: Sort;
  onChange?: (v: Sort) => void;
}) {
  return (
    <Container>
      <Icon color='#1C1B1F' />
      <Select
        name='sort'
        id='sort-select'
        onChange={(e) => {
          onChange && onChange(e.target.value as Sort);
        }}
        defaultValue={sort}
      >
        <option value='인기순'>인기순</option>
        <option value='최신순'>최신순</option>
      </Select>
    </Container>
  );
}
