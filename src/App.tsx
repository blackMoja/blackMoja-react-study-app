import { useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { ReactQueryDevtools } from 'react-query/devtools';
import Router from './Router';
import { lightTheme, darkTheme } from './theme';

import type { FunctionComponent } from 'react';

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

const App: FunctionComponent = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleDark = () => setIsDark(current => !current);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <button onClick={toggleDark}>Toggle Mode</button>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
};

export default App;
