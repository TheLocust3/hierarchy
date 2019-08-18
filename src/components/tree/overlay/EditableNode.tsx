import React from 'react';
import styled from '@emotion/styled';

import { colors, fonts } from '../../../constants';
import { Data } from '../../../models/tree/tree-base';
import TreeApi from '../../../api/tree-api';

import Divider from '../../common/Divider';
import ColumnLayout from '../../common/ColumnLayout';
import Button from '../../common/Button';
import EditableTextField from '../../common/EditableTextField';
import EditableTextArea from '../../common/EditableTextArea';

const Container = styled(ColumnLayout)`
  height: 500px;

  margin: 2.5%;
  margin-left: 5%;
  margin-right: 5%;

  text-align: left;
`;

const LeftColumn = styled('div')`
  width: 70%;
  height: 100%;

  margin-right: 5%;
`;

const RightColumn = styled('div')`
  width: 20%;

  margin-top: 5%;
  margin-bottom: 5%;

  padding-left: 5%;

  border-left: 1px solid ${colors.lightBlack};
`;

const Title = styled('h1')`
  margin-left: 2.5%;
  margin-right: 2.5%;
`;

const Body = styled('div')`
  margin-left: 5%;
  margin-right: 5%;
`;

const ActionTitle = styled('h3')`
  text-align: center;
`;

const ActionsInner = styled('div')`
  margin-left: 10%;
`;

interface EditableNodeProps {
  id: string;
  data: Data;
  updateData: (data: Data) => void;
}

class EditableNode extends React.Component<EditableNodeProps> {
  updateTitle(title: string) {
    const newData = { ...this.props.data, title: title };
    TreeApi.updateTree(this.props.id, newData).then((success) => {
      console.log(success);

      this.props.updateData(newData);
    });
  }

  updateBody(body: string) {
    const newData = { ...this.props.data, body: body };
    TreeApi.updateTree(this.props.id, { ...this.props.data, body: body }).then((success) => {
      console.log(success);

      this.props.updateData(newData);
    });
  }

  deleteNode() {
    TreeApi.deleteTree(this.props.id).then((success) => {
      console.log(success);

      window.location.reload();
    });
  }

  render() {
    const { id, data } = this.props;

    return (
      <Container>
        <LeftColumn>
          <Title>
            <EditableTextField
              onUnfocus={(value) => this.updateTitle(value)}
              fontSize="26px"
              fontFamily={fonts.title}
              backgroundColor={colors.nodeBackground}>
              {data.title}
            </EditableTextField>
          </Title>
          <Divider marginTop="3%" marginBottom="5%" />

          <Body>
            <EditableTextArea
              onUnfocus={(value) => this.updateBody(value)}
              fontSize="16px"
              fontFamily={fonts.body}
              backgroundColor={colors.nodeBackground}>
              {data.body}
            </EditableTextArea>
          </Body>
        </LeftColumn>

        <RightColumn>
          <ActionTitle>Actions</ActionTitle>

          <Divider marginTop="3%" marginBottom="5%" />

          <ActionsInner>
            <Button
              color={colors.viewBlue}
              hoverColor={colors.viewBlueHover}
              activeColor={colors.viewBlueActive}
              textColor="white"
              onClick={(event: any) => (window.location.href = `/tree/${id}`)}>
              Show
            </Button>

            <Button
              color={colors.deleteRed}
              hoverColor={colors.deleteRedHover}
              activeColor={colors.deleteRedActive}
              textColor="white"
              onClick={(event: any) => this.deleteNode()}>
              Delete
            </Button>
          </ActionsInner>
        </RightColumn>
      </Container>
    );
  }
}

export default EditableNode;
