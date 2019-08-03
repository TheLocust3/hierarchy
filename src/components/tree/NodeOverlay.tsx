import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../constants';
import { Data } from '../../models/tree/tree-base';

import MiddleCenter from '../common/MiddleCenter';
import { TreeOverlay } from '../../reducers/tree-reducer';

const Overlay = styled('div')`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  z-index: 10;
  transition: background-color 0.25s;
`

const OverlayContainer = styled('div')`
  display: block;
  width: 500px;
  min-height: 500px;

  border: 1px solid ${colors.black};
  border-radius: 10px;

  background-color: ${colors.nodeBackground}
`;

interface NodeOverlayProps {
  uuid: string;
  data: Data;
  currentOverlay: TreeOverlay;
}

class NodeOverlay extends React.Component<NodeOverlayProps> {

  render() {
    const { uuid, data, currentOverlay } = this.props;

    return (
      <Overlay
        style={{
          display: currentOverlay.uuid === uuid && currentOverlay.open ? "initial" : "none",
          backgroundColor: "rgba(0, 0, 0, 0.3)"
        }}
      >
        <MiddleCenter style={{ zIndex: 10 }}>
          <OverlayContainer onClick={(event) => event.stopPropagation()}>
              <h3>{data.title}</h3>

              <p>{data.body}</p>
          </OverlayContainer>
        </MiddleCenter>
      </Overlay>
    );
  }
}

export default NodeOverlay;
