import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../constants';
import { Data } from '../../models/tree/tree-base';
import Viewport from '../../models/viewport';

import LineTo from '../common/LineTo';
import NodeActions from './NodeActions';
import { TreeOverlay } from '../../reducers/tree-reducer';

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
  position: relative;
  cursor: pointer;

  display: inline-block;
  width: ${NODE_WIDTH}px;
  height: ${NODE_HEIGHT}px;

  border: 1px solid ${colors.black};
  border-radius: 10px;

  background-color: ${colors.nodeBackground};
  transition: background-color 0.25s;

  &:hover {
    background-color: ${colors.nodeBackgroundHover};
  }
`;

interface NodeProps {
  id: string;
  data: Data;
  overlay: TreeOverlay;
  parentX?: number;
  parentY?: number;
  getXY?: (x: number, y: number) => void;
  viewport: Viewport;
  onClick: (event: any) => void;
  deleteNode: () => void;
  createLeaf: () => void;
}

interface NodeState {
  x: number;
  y: number;
}

class NodeComponent extends React.Component<NodeProps, NodeState> {
  constructor(props: NodeProps) {
    super(props);

    this.state = { x: 0, y: 0 };
  }

  renderLine(viewport: Viewport, parentX?: number, parentY?: number) {
    if (parentX == null || parentY == null) return; // root tree doesn't have any parents and no line

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
    const {
      id,
      data,
      parentX,
      parentY,
      viewport,
      onClick,
      overlay,
      deleteNode,
      createLeaf
    } = this.props;
    const getXY = this.props.getXY == null ? (x: number, y: number) => {} : this.props.getXY;

    return (
      <NodeContainer>
        {this.renderLine(viewport, parentX, parentY)}

        <NodeInner
          onClick={(event) => onClick(event)}
          ref={(e: HTMLDivElement) => {
            if (e !== null) {
              const rect = e.getBoundingClientRect();
              getXY(rect.left, rect.top);
              this.updateXYState(rect.left, rect.top);
            }
          }}>
          <NodeActions id={id} overlay={overlay} deleteNode={deleteNode} createLeaf={createLeaf} />
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
