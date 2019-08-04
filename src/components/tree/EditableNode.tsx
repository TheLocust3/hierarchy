import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../constants';
import { Data } from '../../models/tree/tree-base';

import Divider from '../common/Divider';
import ColumnLayout from '../common/ColumnLayout';

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
`

const ActionTitle = styled('h3')`
  text-align: center;
`;

const ActionsInner = styled('div')`
  margin-left: 5%;
`;

interface EditableNodeProps {
  uuid: string;
  data: Data;
}

class EditableNode extends React.Component<EditableNodeProps> {

  render() {
    const { uuid, data } = this.props;

    return (
      <Container>
        <LeftColumn>
          <Title>{data.title}</Title>
          <Divider marginTop="3%" marginBottom="5%" />

          <Body>
            {data.body}
          </Body>
        </LeftColumn>

        <RightColumn>
          <ActionTitle>Actions</ActionTitle>

          <Divider marginTop="3%" marginBottom="5%" />

          <ActionsInner>
            Test
          </ActionsInner>
        </RightColumn>
      </Container>
    );
  }
}

export default EditableNode;
