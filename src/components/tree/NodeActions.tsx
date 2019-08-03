import React from 'react';
import { css } from 'emotion';
import styled from '@emotion/styled';

import { colors, history } from '../../constants'

import MaterialIcon from '../common/MaterialIcon'
import { TreeOverlay } from '../../reducers/tree-reducer';

const ActionsContainer = styled('div')`
  position: absolute;
  width: 100%;
  height: 100%;

  text-align: left;

  opacity: 0;
  transition: opacity 0.4s;

  &:hover {
    opacity: 1;
    transition-delay: 0.25s;
  }
`;

const IconFrame = styled('div')`
  position: relative;
  display: inline-block;

  margin-left: -7px;
  margin-right: 10px;
  margin-top: -7px;

  padding-left: 2px;
  padding-top: 2px;

  width: 18px;
  height: 18px;

  overflow: hidden;
  border: 1px solid ${colors.lightBlack};
  border-radius: 50%;

  background-color: white;
  box-shadow: 1px 2px 5px ${colors.actionShadow};
  transition: background-color 0.4s;

  &:hover {
    background-color: ${colors.actionHover};
  }
`

const IconFrameRight = styled(IconFrame)`
  float: right;
  margin-left: 10px;
  margin-right: -7px;
  margin-top: -7px;
`

const noHover = css`
  &:hover {
    opacity: 0 !important;
  }
`;

interface NodeActionsProps {
  uuid: string;
  onDelete: () => void;
  overlay: TreeOverlay;
}

class NodeActions extends React.Component<NodeActionsProps, {}> {
  render() {
    const { uuid, onDelete, overlay } = this.props;

    return (
      <ActionsContainer className={overlay.open ? noHover : ""}>
        <IconFrame onClick={(event) => {
            history.push(`/tree/${uuid}`)
            event.stopPropagation()
          }}>
          <MaterialIcon icon="visibility" fontSize="15px" color={colors.viewBlue} />
        </IconFrame>

        <IconFrameRight onClick={(event) => {
            onDelete()
            event.stopPropagation()
          }}>
          <MaterialIcon icon="delete" fontSize="15px" color={colors.deleteRed} />
        </IconFrameRight>

        <IconFrameRight onClick={(event) => {
          history.push(`/tree/${uuid}/edit`)
          event.stopPropagation()
        }}>
          <MaterialIcon icon="edit" fontSize="15px" color={colors.actionPurple} />
        </IconFrameRight>
      </ActionsContainer>
    );
  }
}

export default NodeActions;
