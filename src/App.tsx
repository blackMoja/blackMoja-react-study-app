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

const App: FC = () => {
  return (
    <Wrapper>
      {/* initial props : 애니메이션을 시작하는 방식을 명시하는 props = Element의 초기 상태 */}
      <Box
        transition={{ type: 'spring', bounce: 0.5 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
      />
    </Wrapper>
  );
};

export default App;
