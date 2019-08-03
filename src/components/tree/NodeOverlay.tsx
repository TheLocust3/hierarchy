import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../constants';
import { Data } from '../../models/tree/tree-base';

import MiddleCenter from '../common/MiddleCenter';
import { TreeOverlay } from '../../reducers/tree-reducer';

const OverlayContainer = styled('div')`
  display: block;
  width: 500px;
  height: 500px;

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
      <MiddleCenter style={{ zIndex: 10, display: currentOverlay.uuid === uuid && currentOverlay.open ? "initial" : "none" }}>
        <OverlayContainer>
            <h3>{data.title}</h3>

            <p>{data.body}</p>
        </OverlayContainer>
      </MiddleCenter>
    );
  }
}

export default NodeOverlay;
