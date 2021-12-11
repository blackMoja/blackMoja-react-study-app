import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import ToDoList from 'ToDoList';

import type { FC } from 'react';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const App: FC = () => {
  return (
    <>
      <GlobalStyle />
      <ToDoList />
    </>
  );
};

export default App;
