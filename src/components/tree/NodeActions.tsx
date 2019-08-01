import React from 'react';
import styled from '@emotion/styled';

import MaterialIcon from '../common/MaterialIcon'

import { colors } from '../../constants'

const ActionsContainer = styled('div')`
  position: absolute;
  width: 100%;
  height: 100%;

  text-align: left;

  opacity: 0;
  transition: opacity 0.4s;

  &:hover {
    opacity: 1;
    transition-delay: 0.5s;
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

class NodeActions extends React.Component<{}, {}> {
  render() {
    return (
      <ActionsContainer>
        <IconFrame>
          <MaterialIcon icon="edit" fontSize="15px" color={colors.actionPurple} />
        </IconFrame>

        <IconFrame>
          <MaterialIcon icon="delete" fontSize="15px" color={colors.deleteRed} />
        </IconFrame>
      </ActionsContainer>
    );
  }
}

export default NodeActions;
