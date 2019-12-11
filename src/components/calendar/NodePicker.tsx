import React from 'react';
import styled from '@emotion/styled';

import { Node } from '../../models/tree/tree-base';

import NodeBlock from './NodeBlock';

const Container = styled('div')`
  height: 85vh;
  width: 45%;

  margin-top: 30px;
  padding-left: 3%;

  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const BlockContainer = styled('div')`
  margin-top: 2%;
  margin-bottom: 2%;
`;

interface NodePickerProps {
  nodes: ReadonlyArray<Node>;
}

class NodePicker extends React.Component<NodePickerProps> {
  render() {
    return (
      <Container>
        {this.props.nodes.map((node) => (
          <BlockContainer key={node.id}>
            <NodeBlock node={node} />
          </BlockContainer>
        ))}
      </Container>
    );
  }
}

export default NodePicker;
