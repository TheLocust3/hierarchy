import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../../constants';
import { Data, ITree } from '../../../models/tree/tree-base';
import { TreeOverlay } from '../../../reducers/tree-reducer';

import MiddleCenter from '../../common/MiddleCenter';
import EditableNode from './EditableNode';

const Overlay = styled('div')`
  position: fixed; // a hack to allow the overlay to overflow past its parent
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  z-index: 10;
  transition: background-color 0.25s;
`;

const OverlayContainer = styled('div')`
  display: block;
  width: 600px;
  min-height: 500px;

  border: 1px solid ${colors.black};
  border-radius: 10px;

  background-color: ${colors.nodeBackground};
`;

interface NodeOverlayProps {
  id: string;
  data: Data;
  labelTrees: ReadonlyArray<ITree>;
  currentOverlay: TreeOverlay;
  updateNode: (data: Data) => void;
  deleteNode: () => void;
  addLabel: (labelId: string) => void;
}

class NodeOverlay extends React.Component<NodeOverlayProps> {
  render() {
    const { id, data, labelTrees, currentOverlay, updateNode, deleteNode, addLabel } = this.props;

    return (
      <Overlay
        style={{
          display: currentOverlay.id === id && currentOverlay.open ? 'initial' : 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }}>
        <MiddleCenter style={{ zIndex: 10 }}>
          <OverlayContainer onClick={(event) => event.stopPropagation()}>
            <EditableNode
              id={id}
              data={data}
              overlayOpen={currentOverlay.open}
              labelTrees={labelTrees}
              updateNode={updateNode}
              deleteNode={deleteNode}
              addLabel={addLabel}
            />
          </OverlayContainer>
        </MiddleCenter>
      </Overlay>
    );
  }
}

export default NodeOverlay;
