import { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { getMovies } from 'api';
import { makeImagePath } from 'utils';

import type { FC } from 'react';
import type { IGetMoviesResult } from 'api';
import type { Variants } from 'framer-motion';

const Wrapper = styled.div`
  background: black;
`;

const Loading = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ $bgPhoto: string }>`
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
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  background-color: white;
  background-image: url(${props => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
`;

const rowVariants: Variants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const OFFSET = 6;

const Home: FC = () => {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ['movies', 'nowPlaying'],
    getMovies
  );

  const handleIndexIncrease = () => {
    if (leaving || !data) {
      return;
    }

    const totalMovies = data.results.length;
    const maxIndex = Math.ceil(totalMovies / OFFSET) - 1;

    toggleLeaving();
    setIndex(prev => (prev === maxIndex ? 0 : prev + 1));
  };

  const toggleLeaving = () => {
    setLeaving(prev => !prev);
  };

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Banner
        $bgPhoto={makeImagePath(data.results[0].backdrop_path)}
        onClick={handleIndexIncrease}
      >
        <Title>{data.results[0].title}</Title>
        <Overview>{data.results[0].overview}</Overview>
      </Banner>
      <Slider>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'tween', duration: 1 }}
            key={index}
          >
            {data.results
              .slice(1)
              .slice(OFFSET * index, OFFSET * index + OFFSET)
              .map(item => (
                <Box
                  key={item.id}
                  $bgPhoto={makeImagePath(item.backdrop_path, 'w500')}
                />
              ))}
          </Row>
        </AnimatePresence>
      </Slider>
    </Wrapper>
  );
};

export default Home;
