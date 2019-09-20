import React from 'react';
import styled from '@emotion/styled';

import { Data, ITree } from '../../models/tree/tree-base';
import Viewport from '../../models/viewport';
import Tree from '../../models/tree/tree';
import Leaf from '../../models/tree/leaf';
import Label from '../../models/label';
import Status from '../../models/status';

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
  tree: ITree;
  allLabels: ReadonlyArray<Label>;
  allStatuses: ReadonlyArray<Status>;
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
      if (this.props.overlay.id === this.props.tree.id && this.props.overlay.open) {
        this.props.setOverlay({ id: this.props.tree.id, open: false });
      }
    });
  }

  render() {
    const { tree, allLabels, allStatuses, overlay, parentX, parentY, viewport } = this.props;
    const id = tree.id;
    const data = tree.data;

    return (
      <TreeContainer>
        <NodeComponent
          tree={tree}
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
          color={tree.color}
          data={data}
          allLabels={allLabels}
          labels={tree.findParentsByType('label').map((tree) => {
            return {
              id: tree.id,
              title: tree.data.title,
              createdAt: tree.createdAt,
              color: tree.color
            };
          })}
          status={
            tree.findParentsByType('status').map((tree) => {
              return {
                id: tree.id,
                title: tree.data.title,
                createdAt: tree.createdAt,
                color: tree.color
              };
            })[0] // TODO: catch errors on this bad boy
          }
          allStatuses={allStatuses}
          currentOverlay={overlay}
          updateNode={(data: Data) => this.props.updateNode(id, data)}
          deleteNode={() => this.props.deleteNode(id)}
          addLabel={(labelId: string) => this.props.createRelationship(labelId, id)}
          deleteLabel={(labelId: string) => this.props.deleteRelationship(labelId, id)}
          setStatus={(oldStatusId: string, statusId: string) => {
            if (oldStatusId !== '') {
              this.props.deleteRelationship(oldStatusId, id);
            }

            this.props.createRelationship(statusId, id);
          }}
        />

        <Nodes>{tree.children.map((node) => this.renderNode(node, viewport))}</Nodes>
      </TreeContainer>
    );
  }

  renderNode(node: ITree, viewport: Viewport): JSX.Element {
    switch (node.constructor) {
      case Tree:
        return (
          <div key={node.id}>
            <TreeComponent
              tree={node}
              allLabels={this.props.allLabels}
              allStatuses={this.props.allStatuses}
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
              tree={node}
              allLabels={this.props.allLabels}
              allStatuses={this.props.allStatuses}
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
