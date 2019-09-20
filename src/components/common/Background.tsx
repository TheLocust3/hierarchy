import styled from '@emotion/styled';

import { colors } from '../../constants';

interface BackgroundProps {
  backgroundColor?: string;
}

const Background = styled('span')<BackgroundProps>`
  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  background-color: ${(props: BackgroundProps) =>
    props.backgroundColor === undefined ? colors.nodeBackground : props.backgroundColor};

  filter: brightness(100%);
  -webkit-filter: brightness(100%);

  transition: background-color 0.25s, filter 0.25s;

  z-index: -1;
`;

export default Background;
