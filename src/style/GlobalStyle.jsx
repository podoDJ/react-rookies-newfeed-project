import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

:root {
  --color-bg: #FFF4E0;
  --color-text: #4D4D4D;
  --color-accent: #B46060;
  --color-box: #FFBF9B;
  --color-white: #FEFEFE;
}

  body {
    background-color: var(--color-bg);
  }
`;

export default GlobalStyle;
