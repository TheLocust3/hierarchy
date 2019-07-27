import { injectGlobal } from 'emotion';

import { colors } from './constants';

injectGlobal`
    body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        position: relative;
        color: ${colors.black};
        font-family: 'Roboto', sans-serif;
    }

    h1, h2, h3, h4, h5 {
        font-family: 'Roboto Slab', serif;
        margin: 0;
    }

    p {
        margin: 0;
        font-size: 14px;
    }
`;
