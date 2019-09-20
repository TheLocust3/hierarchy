import React from 'react';

import { Data, ITree } from '../../models/tree/tree-base';
import Label from '../../models/label';
import Status from '../../models/status';
import Viewport from '../../models/viewport';
import { TreeOverlay } from '../../reducers/tree-reducer';

import NodeComponent from './NodeComponent';
import NodeOverlay from './overlay/NodeOverlay';

interface LeafProps {
  tree: ITree;
  allLabels: ReadonlyArray<Label>;
  allStatuses: ReadonlyArray<Status>;
  overlay: TreeOverlay;
  parentX: number;
  parentY: number;
  viewport: Viewport;
  setOverlay: (overlay: TreeOverlay) => void;
  updateNode: (id: string, data: Data) => void;
  deleteNode: (id: string) => void;
  createLeaf: (parentId: string) => void;
  createRelationship: (parentId: string, childId: string) => void;
  deleteRelationship: (parentId: string, childId: string) => void;
}

class LeafComponent extends React.Component<LeafProps> {
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
      <div>
        <NodeComponent
          tree={tree}
          parentX={parentX}
          parentY={parentY}
          viewport={viewport}
          overlay={overlay}
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
      </div>
    );
  }
}

export default LeafComponent;
