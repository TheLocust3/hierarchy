import React from 'react';
import styled from '@emotion/styled';

import { Data, ITree } from '../../models/tree/tree-base';
import Viewport from '../../models/viewport';
import Tree from '../../models/tree/tree';
import Leaf from '../../models/tree/leaf';
import { history } from '../../constants';

import NodeComponent from './NodeComponent';
import LeafComponent from './LeafComponent';

const TreeContainer = styled('div')`
  display: inline-block;
`;

const Nodes = styled('div')`
  display: flex;
`;

interface TreeProps {
  uuid: string;
  data: Data;
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
    const { uuid, data, nodes, parentX, parentY, viewport } = this.props;

    return (
      <TreeContainer>
        <NodeComponent
          uuid={uuid}
          data={data}
          parentX={parentX}
          parentY={parentY}
          getXY={(x: number, y: number) => this.updateXYState(x, y)}
          viewport={viewport}
          onClick={() => history.push(`/tree/${uuid}`)}
        />

        <Nodes>
          {nodes.map((node) => this.renderNode(node, viewport))}
        </Nodes>
      </TreeContainer>
    );
  }

  renderNode(node: ITree, viewport: Viewport): JSX.Element {
    switch (node.constructor) {
      case Tree:
        return (
          <div key={node.uuid}>
            <TreeComponent
              uuid={node.uuid}
              data={node.data}
              nodes={node.nodes}
              parentX={this.state.x}
              parentY={this.state.y}
              viewport={viewport}
            />
          </div>
        );
      case Leaf:
        return (
          <div key={node.uuid}>
            <LeafComponent
              uuid={node.uuid}
              data={node.data}
              parentX={this.state.x}
              parentY={this.state.y}
              viewport={viewport}
            />
          </div>
        );
      default:
        return <div />;
    }
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
