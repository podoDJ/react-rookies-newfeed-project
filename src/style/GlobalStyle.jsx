import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

:root {
  --color-bg: #FFF4E0;
  --color-text: #4D4D4D;
  --color-accent: #B46060;
  --color-box: #FFBF9B;
  --color-white: #FEFEFE;
}

@font-face {
    font-family: 'CookieRun-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/CookieRun-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

  * {
    font-family: 'CookieRun-Regular';
  }

  body {
    background-color: var(--color-bg);
    font-family: 'CookieRun-Regular';
    // 제이 추가
    margin-top:100px;
  }
`;

export default GlobalStyle;
