import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../../constants';
import { Data } from '../../../models/tree/tree-base';
import Label from '../../../models/label';
import Status from '../../../models/status';
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

  overlay: hidden;
`;

interface NodeOverlayProps {
  id: string;
  color?: string;
  data: Data;
  allLabels: ReadonlyArray<Label>;
  labels: ReadonlyArray<Label>;
  allStatuses: ReadonlyArray<Status>;
  status: Status | undefined;
  currentOverlay: TreeOverlay;
  updateNode: (data: Data) => void;
  deleteNode: () => void;
  addLabel: (labelId: string) => void;
  deleteLabel: (labelId: string) => void;
  setStatus: (oldStatusId: string, statusId: string) => void;
}

class NodeOverlay extends React.Component<NodeOverlayProps> {
  render() {
    const {
      id,
      color,
      data,
      allLabels,
      labels,
      allStatuses,
      status,
      currentOverlay,
      updateNode,
      deleteNode,
      addLabel,
      deleteLabel,
      setStatus
    } = this.props;

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
              color={color}
              data={data}
              allLabels={allLabels}
              labels={labels}
              allStatuses={allStatuses}
              status={status}
              overlayOpen={currentOverlay.open}
              updateNode={updateNode}
              deleteNode={deleteNode}
              addLabel={addLabel}
              deleteLabel={deleteLabel}
              setStatus={setStatus}
            />
          </OverlayContainer>
        </MiddleCenter>
      </Overlay>
    );
  }
}

export default NodeOverlay;
