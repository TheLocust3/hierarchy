import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../constants';
import { Viewport } from '../../models/viewport';

const LineContainer = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: -1;
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
  viewport: Viewport;
}

class LineTo extends React.Component<LineToProps, {}> {
  lineRef: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    this.updateWidth(this.props);
  }

  componentWillReceiveProps(nextProps: LineToProps) {
    this.updateWidth(nextProps);
  }

  render() {
    const { fromX, fromY, toX, toY } = this.props;

    return (
      <LineContainer ref={this.lineRef}>
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

  updateWidth(props: LineToProps) {
    if (this.lineRef.current !== null) {
      this.lineRef.current.style.width = `${props.viewport.width}px`;
    }
  }
}

export default LineTo;
