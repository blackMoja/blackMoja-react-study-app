import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getMovies } from 'api';
import { makeImagePath } from 'utils';

import type { FC } from 'react';
import type { IGetMoviesResult } from 'api';

const Wrapper = styled.div`
  background-color: black;
`;

const Loading = styled.div`
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Banner = styled.div<{ $bgPhoto?: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${props => props.$bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Home: FC = () => {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ['movies', 'nowPlaying'],
    getMovies
  );

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Banner $bgPhoto={makeImagePath(data.results[0].backdrop_path)}>
        <Title>{data.results[0].title}</Title>
        <Overview>{data.results[0].overview}</Overview>
      </Banner>
    </Wrapper>
  );
};

export default Home;
