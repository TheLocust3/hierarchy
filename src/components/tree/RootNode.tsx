import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../constants';
import { Node } from '../../models/tree/tree-base';

import UnstyledLink from '../common/UnstyledLink';

const NodeContainer = styled('div')`
  display: inline-block;

  width: 150px;
  height: 100px;

  padding-top: 10px;
  padding-bottom: 5px;
  padding-right: 15px;
  padding-left: 15px;

  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 30px;

  border: 1px solid ${colors.lightBlack};
  border-radius: 5px;

  transition: background-color 250ms, border-color 250ms;

  &:hover {
    border-color: ${colors.black};
    background-color: ${colors.nodeBackgroundHover};
  }
`;

interface RootNodeProps {
  node: Node;
  to?: string;
}

class RootNode extends React.Component<RootNodeProps> {
  render() {
    const { node } = this.props;
    const to = this.props.to === undefined ? `/tree/${node.id}` : this.props.to;

    return (
      <UnstyledLink to={to}>
        <NodeContainer>
          <h4>{node.data.title}</h4>
        </NodeContainer>
      </UnstyledLink>
    );
  }
}

export default RootNode;
