import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../constants';
import { Data } from '../../models/tree/tree-base';
import { Viewport } from '../../models/viewport';

import LineTo from '../common/LineTo';

const NODE_WIDTH = 100;
const NODE_HEIGHT = 100;

const X_OFFSET = NODE_WIDTH / 2;
const Y_OFFSET = NODE_HEIGHT + 2; // adjusted for border

const NodeContainer = styled('div')`
  text-align: center;
  margin-bottom: 75px;
  min-width: 110px;
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
  data: Data;
  parentX?: number;
  parentY?: number;
  getXY: (x: number, y: number) => void;
  viewport: Viewport;
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

  renderLineUnlessRoot(viewport: Viewport, parentX?: number, parentY?: number) {
    if (parentX === undefined || parentY === undefined) return;

    return (
      <LineTo
        fromX={parentX + X_OFFSET - viewport.x}
        fromY={parentY + Y_OFFSET - viewport.y - 1}
        toX={this.state.x + X_OFFSET - viewport.x}
        toY={this.state.y - viewport.y - 1}
        viewport={this.props.viewport}
      />
    );
  }

  render() {
    const { data, parentX, parentY, getXY, viewport } = this.props;

    return (
      <NodeContainer>
        {this.renderLineUnlessRoot(viewport, parentX, parentY)}

        <NodeInner
          ref={(e: HTMLDivElement) => {
            if (e !== null) {
              const rect = e.getBoundingClientRect();
              getXY(rect.left, rect.top);
              this.updateXYState(rect.left, rect.top);
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
