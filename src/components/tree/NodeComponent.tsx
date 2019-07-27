import React from 'react';
import styled from '@emotion/styled';

import { getAbsolutePosition } from '../../helpers';
import { colors } from '../../constants';
import { IData } from './Tree';

import LineTo from '../common/LineTo';

const NODE_WIDTH = 100;
const NODE_HEIGHT = 100;

const X_OFFSET = NODE_WIDTH / 2;
const Y_OFFSET = NODE_HEIGHT + 2; // adjusted for border

const NodeContainer = styled('div')`
  text-align: center;
  margin-bottom: 50px;
  min-width: 105px;
`;

const NodeInner = styled('div')`
  cursor: pointer;

  display: inline-block;
  width: ${NODE_WIDTH}px;
  height: ${NODE_HEIGHT}px;

  border: 1px solid ${colors.black};
  border-radius: 10px;
`;

interface LeafProps {
  data: IData;
  parentX?: number;
  parentY?: number;
  getXY: (x: number, y: number) => void;
}

interface LeafState {
  x: number;
  y: number;
}

class NodeComponent extends React.Component<LeafProps, LeafState> {
  constructor(props: LeafProps) {
    super(props);

    this.state = { x: 0, y: 0 };
  }

  renderLineUnlessRoot(parentX?: number, parentY?: number) {
    if (parentX === undefined || parentY === undefined) return;

    return (
      <LineTo
        fromX={parentX + X_OFFSET}
        fromY={parentY + Y_OFFSET}
        toX={this.state.x + X_OFFSET}
        toY={this.state.y}
      />
    );
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.forceUpdate());
  }

  render() {
    const { data, parentX, parentY, getXY } = this.props;

    return (
      <NodeContainer>
        {this.renderLineUnlessRoot(parentX, parentY)}

        <NodeInner
          ref={(e: HTMLDivElement) => {
            if (e !== null) {
              const pos = getAbsolutePosition(e);
              getXY(pos.x, pos.y);
              this.updateXYState(pos.x, pos.y);
            }
          }}>
          <h3>{data.title}</h3>

          <p>{data.body}</p>
        </NodeInner>
      </NodeContainer>
    );
  }

  updateXYState(x: number, y: number) {
    if (this.state.x !== x) {
      this.setState({
        x: x
      });
    }

    if (this.state.y !== y) {
      this.setState({
        y: y
      });
    }
  }
}

export default NodeComponent;
