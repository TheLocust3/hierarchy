import { injectGlobal } from 'emotion';

import { colors } from './constants';

injectGlobal`
    body {
        margin: 0;
        padding: 0;
        width: 100vw;
        height: 100vh;
        position: relative;
        color: ${colors.black};
        font-family: 'Roboto', sans-serif;
        font-weight: 100;
    }

    #root {
        margin: 0;
        padding: 0;
        width: 100vw;
        height: 100vh;
        position: relative;
        color: ${colors.black};
        font-family: 'Roboto', sans-serif;
        font-weight: 100;
    }

    h1, h2, h3, h4, h5 {
        font-family: 'Roboto Slab', serif;
        font-weight: 100;
        margin: 0;
    }

    p {
        margin: 0;
        font-size: 14px;
        font-weight: 100;
    }

    .react-datetime-picker__wrapper {
        border-radius: 5px;

        padding-top: 2px;
        padding-bottom: 2px;
        padding-left: 2px;
        padding-right: 2px;
    }
`;
