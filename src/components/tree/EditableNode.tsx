import React from 'react';
import styled from '@emotion/styled';

import { Data } from '../../models/tree/tree-base';

import Divider from '../common/Divider';

const Container = styled('div')`
  margin: 2.5%;
  margin-left: 5%;
  margin-right: 5%;
`;

const Body = styled('div')`
  text-align: left;
  margin-left: 5%;
  margin-right: 5%;
`

interface EditableNodeProps {
  uuid: string;
  data: Data;
}

class EditableNode extends React.Component<EditableNodeProps> {

  render() {
    const { uuid, data } = this.props;

    return (
      <Container>
        <h1>{data.title}</h1>
        <Divider marginTop="3%" marginBottom="5%" />

        <Body>
          {data.body}
        </Body>
      </Container>
    );
  }
}

export default EditableNode;
