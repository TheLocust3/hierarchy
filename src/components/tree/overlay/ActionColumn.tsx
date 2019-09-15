import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../../constants';

import Divider from '../../common/Divider';
import Button from '../../common/Button';
import Spacer from '../../common/Spacer';

const RightColumn = styled('div')`
  width: 20%;

  margin-top: 5%;
  margin-bottom: 5%;

  padding-left: 5%;

  border-left: 1px solid ${colors.lightBlack};
`;

const ActionTitle = styled('h3')`
  text-align: center;
`;

const ActionsInner = styled('div')`
  margin-left: 10%;
`;

interface ActionColumnProps {
  id: string;
  deleteNode: () => void;
}

class ActionColumn extends React.Component<ActionColumnProps> {
  render() {
    const { id } = this.props;

    return (
      <RightColumn>
        <ActionTitle>Actions</ActionTitle>

        <Divider marginTop="3%" marginBottom="5%" />

        <ActionsInner>
          <Spacer space="10%" />
          <Button
            color={colors.viewBlue}
            hoverColor={colors.viewBlueHover}
            activeColor={colors.viewBlueActive}
            textColor="white"
            onClick={(event: any) => (window.location.href = `/tree/${id}`)}>
            Tree View
          </Button>
          <Spacer space="10%" />

          <Button
            color={colors.listPurple}
            hoverColor={colors.listPurpleHover}
            activeColor={colors.listPurpleActive}
            textColor="white"
            onClick={(event: any) => (window.location.href = `/tree/${id}/list`)}>
            List View
          </Button>
          <Spacer space="10%" />

          <Button
            color={colors.deleteRed}
            hoverColor={colors.deleteRedHover}
            activeColor={colors.deleteRedActive}
            textColor="white"
            onClick={(event: any) => this.props.deleteNode()}>
            Delete
          </Button>
        </ActionsInner>
      </RightColumn>
    );
  }
}

export default ActionColumn;
