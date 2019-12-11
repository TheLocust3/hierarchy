import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../constants';
import { Node } from '../../models/tree/tree-base';

const Block = styled('div')`
  border: 1px solid ${colors.lightBlack};
  border-radius: 5px;

  width: 150px;

  padding-top: 1%;
  padding-bottom: 1%;
  padding-left: 2%;
  padding-right: 2%;

  cursor: pointer;

  transition: background-color 250ms, border-color 250ms;

  user-select: none;

  &:hover {
    border-color: ${colors.black};
    background-color: ${colors.nodeBackgroundHover};
  }
`;

interface NodePickerProps {
  node: Node;
}

class NodeBlock extends React.Component<NodePickerProps> {
  render() {
    return <Block>{this.props.node.data.title}</Block>;
  }
}

export default NodeBlock;
