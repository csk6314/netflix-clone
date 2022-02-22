import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { RecoilRoot } from 'recoil';
import { theme } from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { IDefaultTheme } from './styled';
const GlobalStyle = createGlobalStyle<{theme:IDefaultTheme}>`
  ${reset}
  *{
    box-sizing: border-box;
  }
  a {
  text-decoration:none;
  color:inherit;
  }
  body {
    color:${(props) => props.theme.white.darker};
    background-color: rgb(20,20,20);
    overflow-x: hidden;
  }
`;

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
