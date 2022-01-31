import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 50vw;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const [id, setId] = useState<string | null>(null);

  return (
    <Wrapper>
      <Grid>
        {['1', '2', '3', '4'].map(item => (
          <Box key={item} layoutId={item} onClick={() => setId(item)} />
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            initial={{ backgroundColor: `rgba(0, 0, 0, 0)` }}
            animate={{ backgroundColor: `rgba(0, 0, 0, 0.5)` }}
            exit={{ backgroundColor: `rgba(0, 0, 0, 0)` }}
            onClick={() => setId(null)}
          >
            <Box layoutId={id} style={{ width: 400, height: 200 }} />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
