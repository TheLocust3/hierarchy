import React from 'react';
import { css, keyframes } from 'emotion';
import styled from '@emotion/styled';

import { colors } from '../../constants';
import { TreeOverlay } from '../../reducers/tree-reducer';

import MaterialIcon from '../common/MaterialIcon';

const ActionsContainer = styled('div')`
  position: absolute;
  width: 100%;
  height: 100%;

  text-align: left;
`;

type TransitionInProps = {
  delay: string;
};

const transitionIn = keyframes`
  0% {
    transform: scale(0.95);
  }

  66% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
`;

const TransitionIn = styled('div')<TransitionInProps>`
  display: inline-block;
  opacity: 0;
  transition: opacity 0.4s;

  div:hover > & {
    opacity: 1;
    transition-delay: ${(props: TransitionInProps) => props.delay};

    animation: ${transitionIn} 0.3s ease-in-out;
    animation-delay: ${(props: TransitionInProps) => props.delay};
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

  transform: scale(1);
  background-color: white;
  box-shadow: 1px 2px 5px ${colors.actionShadow};
  transition: background-color 0.4s, transform 0.4s;

  &:hover {
    transform: scale(1.1);
    background-color: ${colors.actionHover};
  }
`;

const IconFrameRight = styled(IconFrame)`
  float: right;
  margin-left: 60px;
  margin-right: -17px;
  margin-top: -7px;
`;

const noHover = css`
  &:hover {
    opacity: 0 !important;
  }
`;

const AddButtonTransitionContainer = styled(TransitionIn)`
  position: absolute;
  bottom: -5px;
  left: 25px;
`;

const AddButton = styled('div')`
  position: relative;
  width: 50px;
  height: 20px;

  text-align: center;
  padding-right: 2px;
  padding-bottom: 4px;

  border: 1px solid ${colors.lightBlack};
  border-radius: 3px;
  box-shadow: 1px 2px 5px ${colors.actionShadow};

  transform: scale(1);
  background-color: ${colors.addGreen};
  transition: background-color 0.4s, transform 0.4s;

  &:hover {
    transform: scale(1.1);
    background-color: ${colors.addGreenHover};
  }
`;

interface NodeActionsProps {
  id: string;
  overlay: TreeOverlay;
  deleteNode: () => void;
  createLeaf: () => void;
}

class NodeActions extends React.Component<NodeActionsProps, {}> {
  render() {
    const { id, overlay, deleteNode, createLeaf } = this.props;

    return (
      <ActionsContainer className={overlay.open ? noHover : ''}>
        <TransitionIn delay="0.25s">
          <IconFrame
            onClick={(event) => {
              window.location.href = `/tree/${id}`;
              event.stopPropagation();
            }}>
            <MaterialIcon icon="visibility" fontSize="15px" color={colors.viewBlue} />
          </IconFrame>
        </TransitionIn>

        <TransitionIn delay="0.35s">
          <IconFrameRight
            onClick={(event) => {
              deleteNode();
              event.stopPropagation();
            }}>
            <MaterialIcon icon="delete" fontSize="15px" color={colors.deleteRed} />
          </IconFrameRight>
        </TransitionIn>

        <AddButtonTransitionContainer delay="0.45s">
          <AddButton
            onClick={(event) => {
              createLeaf();
              event.stopPropagation();
            }}>
            <MaterialIcon icon="add" fontSize="24px" color={'white'} />
          </AddButton>
        </AddButtonTransitionContainer>
      </ActionsContainer>
    );
  }
}

export default NodeActions;
