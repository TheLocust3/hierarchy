import React from 'react';
import styled from '@emotion/styled';
import uuid from 'uuid/v4';

import { IData, ITree } from './Tree';
import NodeComponent from './NodeComponent';
import { Viewport } from '../../containers/TreeView';

const TreeContainer = styled('div')`
  display: inline-block;
`;

const Nodes = styled('div')`
  display: flex;
`;

interface TreeProps {
  data: IData;
  nodes: ReadonlyArray<ITree>;
  parentX?: number;
  parentY?: number;
  viewport: Viewport;
}

interface TreeState {
  x: number;
  y: number;
}

class TreeComponent extends React.Component<TreeProps, TreeState> {
  constructor(props: TreeProps) {
    super(props);

    this.state = { x: 0, y: 0 };
  }

  render() {
    const { data, nodes, parentX, parentY, viewport } = this.props;

    return (
      <TreeContainer>
        <NodeComponent
          data={data}
          parentX={parentX}
          parentY={parentY}
          getXY={(x: number, y: number) => this.updateXYState(x, y)}
          viewport={viewport}
        />

        <Nodes>
          {nodes.map((node) => {
            return <div key={uuid()}>{node.render(this.state.x, this.state.y, viewport)}</div>;
          })}
        </Nodes>
      </TreeContainer>
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

export default TreeComponent;
