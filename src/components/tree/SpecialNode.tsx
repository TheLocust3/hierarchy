import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../constants';
import { Node } from '../../models/tree/tree-base';

import UnstyledLink from '../common/UnstyledLink';
import Background from '../common/Background';

const NodeContainer = styled('div')`
  position: relative;

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

  overflow: hidden;

  transition: border-color 250ms;

  &:hover {
    border-color: ${colors.black};
  }

  &:hover span {
    filter: brightness(95%);
    -webkit-filter: brightness(95%);
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
          <Background backgroundColor={node.data.color} />

          <h5>{node.data.title}</h5>
        </NodeContainer>
      </UnstyledLink>
    );
  }
}

export default SpecialNode;
