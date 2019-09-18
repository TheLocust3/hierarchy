import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../constants';
import { Node } from '../../models/tree/tree-base';

import UnstyledLink from '../common/UnstyledLink';

const NodeContainer = styled('div')`
  display: inline-block;

  width: 175px;
  height: 20px;

  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 15px;
  padding-left: 15px;

  margin-bottom: 5px;

  border: 1px solid ${colors.lightBlack};
  border-radius: 5px;

  transition: background-color 250ms, border-color 250ms;

  &:hover {
    border-color: ${colors.black};
    background-color: ${colors.nodeBackgroundHover};
  }
`;

interface SpecialNodeProps {
  node: Node;
  to?: string;
}

class SpecialNode extends React.Component<SpecialNodeProps> {
  render() {
    const { node } = this.props;
    const to = this.props.to === undefined ? `/tree/${node.id}` : `/tree/${node.id}/list`;

    return (
      <UnstyledLink to={to}>
        <NodeContainer>
          <h5>{node.data.title}</h5>
        </NodeContainer>
      </UnstyledLink>
    );
  }
}

export default SpecialNode;
