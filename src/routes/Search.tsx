import { useLocation } from 'react-router-dom';
import type { FC } from 'react';

const Search: FC = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');

  return <div></div>;
};

export default Search;
