import React from 'react';
import styled from '@emotion/styled';

import { Data, ITree } from '../../models/tree/tree-base';
import Viewport from '../../models/viewport';
import Tree from '../../models/tree/tree';
import Leaf from '../../models/tree/leaf';

import NodeComponent from './NodeComponent';
import NodeOverlay from './overlay/NodeOverlay';
import LeafComponent from './LeafComponent';
import { TreeOverlay } from '../../reducers/tree-reducer';

const TreeContainer = styled('div')`
  display: inline-block;
`;

const Nodes = styled('div')`
  display: flex;
`;

interface TreeProps {
  id: string;
  data: Data;
  nodes: ReadonlyArray<ITree>;
  labelTrees: ReadonlyArray<ITree>;
  overlay: TreeOverlay;
  parentX?: number;
  parentY?: number;
  viewport: Viewport;
  setOverlay: (overlay: TreeOverlay) => void;
  updateNode: (id: string, data: Data) => void;
  deleteNode: (id: string) => void;
  createLeaf: (parentId: string) => void;
  createRelationship: (parentId: string, childId: string) => void;
  deleteRelationship: (parentId: string, childId: string) => void;
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
    window.addEventListener('click', () => {
      // TOOD: bind this only when id is selected
      if (this.props.overlay.id === this.props.id && this.props.overlay.open) {
        this.props.setOverlay({ id: this.props.id, open: false });
      }
    });
  }

  render() {
    const { id, data, nodes, labelTrees, overlay, parentX, parentY, viewport } = this.props;

    return (
      <TreeContainer>
        <NodeComponent
          id={id}
          data={data}
          overlay={overlay}
          parentX={parentX}
          parentY={parentY}
          getXY={(x: number, y: number) => this.updateXYState(x, y)}
          viewport={viewport}
          onClick={(event) => {
            if (!overlay.open) {
              this.props.setOverlay({ id: id, open: true });
              event.stopPropagation();
            }
          }}
          deleteNode={() => this.props.deleteNode(id)}
          createLeaf={() => this.props.createLeaf(id)}
        />

        <NodeOverlay
          id={id}
          data={data}
          labelTrees={labelTrees}
          currentOverlay={overlay}
          updateNode={(data: Data) => this.props.updateNode(id, data)}
          deleteNode={() => this.props.deleteNode(id)}
          addLabel={(labelId: string) => this.props.createRelationship(labelId, id)}
          deleteLabel={(labelId: string) => this.props.deleteRelationship(labelId, id)}
        />

        <Nodes>{nodes.map((node) => this.renderNode(node, viewport))}</Nodes>
      </TreeContainer>
    );
  }

  renderNode(node: ITree, viewport: Viewport): JSX.Element {
    switch (node.constructor) {
      case Tree:
        return (
          <div key={node.id}>
            <TreeComponent
              id={node.id}
              data={node.data}
              nodes={node.nodes}
              labelTrees={this.props.labelTrees}
              overlay={this.props.overlay}
              parentX={this.state.x}
              parentY={this.state.y}
              viewport={viewport}
              setOverlay={this.props.setOverlay}
              updateNode={this.props.updateNode}
              deleteNode={this.props.deleteNode}
              createLeaf={this.props.createLeaf}
              createRelationship={this.props.createRelationship}
              deleteRelationship={this.props.deleteRelationship}
            />
          </div>
        );
      case Leaf:
        return (
          <div key={node.id}>
            <LeafComponent
              id={node.id}
              data={node.data}
              labelTrees={this.props.labelTrees}
              overlay={this.props.overlay}
              parentX={this.state.x}
              parentY={this.state.y}
              viewport={viewport}
              setOverlay={this.props.setOverlay}
              updateNode={this.props.updateNode}
              deleteNode={this.props.deleteNode}
              createLeaf={this.props.createLeaf}
              createRelationship={this.props.createRelationship}
              deleteRelationship={this.props.deleteRelationship}
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
