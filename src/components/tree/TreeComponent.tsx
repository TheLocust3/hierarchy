import React from 'react';
import styled from '@emotion/styled';

import { Data, ITree } from '../../models/tree/tree-base';
import Viewport from '../../models/viewport';
import Tree from '../../models/tree/tree';
import Leaf from '../../models/tree/leaf';

import NodeComponent from './NodeComponent';
import NodeOverlay from './NodeOverlay';
import LeafComponent from './LeafComponent';
import { TreeOverlay } from '../../reducers/tree-reducer';

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
  overlay: TreeOverlay;
  parentX?: number;
  parentY?: number;
  viewport: Viewport;
  setOverlay: (overlay: TreeOverlay) => void
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

  componentDidMount() {
    window.addEventListener('click', () => { // TOOD: bind this only when uuid is selected
      if (this.props.overlay.uuid === this.props.uuid && this.props.overlay.open) {
        this.props.setOverlay({ uuid: this.props.uuid, open: false })
      }
    });
  }

  render() {
    const { uuid, data, nodes, overlay, parentX, parentY, viewport } = this.props;

    return (
      <TreeContainer>
        <NodeComponent
          uuid={uuid}
          data={data}
          overlay={overlay}
          parentX={parentX}
          parentY={parentY}
          getXY={(x: number, y: number) => this.updateXYState(x, y)}
          viewport={viewport}
          onClick={(event) => {
            if (!overlay.open) {
              this.props.setOverlay({ uuid: uuid, open: true })
              event.stopPropagation()
            }
          }}
        />

        <NodeOverlay
          uuid={uuid}
          data={data}
          currentOverlay={overlay}
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
              overlay={this.props.overlay}
              parentX={this.state.x}
              parentY={this.state.y}
              viewport={viewport}
              setOverlay={this.props.setOverlay}
            />
          </div>
        );
      case Leaf:
        return (
          <div key={node.uuid}>
            <LeafComponent
              uuid={node.uuid}
              data={node.data}
              overlay={this.props.overlay}
              parentX={this.state.x}
              parentY={this.state.y}
              viewport={viewport}
              setOverlay={this.props.setOverlay}
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
