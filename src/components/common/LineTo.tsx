import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../constants';

const LineContainer = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const LineSVG = styled('svg')`
  width: 100%;
  height: 100%;
`;

interface LineToProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

class LineTo extends React.Component<LineToProps, {}> {
  render() {
    const { fromX, fromY, toX, toY } = this.props;

    return (
      <LineContainer>
        <LineSVG>
          <line
            x1={`${fromX}`}
            y1={`${fromY}`}
            x2={`${toX}`}
            y2={`${toY}`}
            stroke={`${colors.black}`}
            strokeWidth="0.75"
          />
        </LineSVG>
      </LineContainer>
    );
  }
}

export default LineTo;
