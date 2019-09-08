import React from 'react';
import styled from '@emotion/styled';

import { ITree } from '../../../models/tree/tree-base';
import { colors } from '../../../constants';

import UnstyledLink from '../../common/UnstyledLink';

const LabelContainer = styled('div')`
  display: inline-block;

  padding-top: 2px;
  padding-bottom: 2px;
  padding-right: 4px;
  padding-left: 4px;

  border: 1px solid ${colors.black};
  border-radius: 5px;

  cursor: pointer;
`;

interface LabelProps {
  labelTree: ITree;
}

class Label extends React.Component<LabelProps> {
  render() {
    const { labelTree } = this.props;

    return (
      <UnstyledLink to={`/tree/${labelTree.id}`}>
        <LabelContainer>{labelTree.data.title}</LabelContainer>
      </UnstyledLink>
    );
  }
}

export default Label;
