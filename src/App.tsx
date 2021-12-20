import styled from 'styled-components';
import { motion } from 'framer-motion';

import type { FC } from 'react';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100vw;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const myVars = {
  start: {
    scale: 0,
  },
  end: {
    scale: 1,
    rotate: 360,
    transition: { type: 'spring', delay: 0.5 },
  },
};

const App: FC = () => {
  return (
    <Wrapper>
      <Box variants={myVars} initial="start" animate="end" />
    </Wrapper>
  );
};

export default App;
