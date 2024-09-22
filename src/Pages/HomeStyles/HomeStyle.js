// src/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    :root {
        --pk-deep-dark: #1E1E2E;
        --pk-dark: #2A2A40;
        --pk-charcoal: #444466;
        --pk-point: #7E37ED;
        --pk-point-hover: #9A5BFF;
        --pk-fold-point: #f06292;
        --pk-white: #FFFFFF;
        --pk-light-gray: #F5F5F5;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Arial', sans-serif;
        background-color: var(--pk-deep-dark);
        color: var(--pk-white);
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    button {
        cursor: pointer;
    }
`;

export default GlobalStyle;
