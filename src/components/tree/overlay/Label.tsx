import React from 'react';
import styled from '@emotion/styled';

import { ITree } from '../../../models/tree/tree-base';
import { colors } from '../../../constants';

const LabelContainer = styled('div')`
  display: inline-block;

  padding-top: 2px;
  padding-bottom: 2px;
  padding-right: 4px;
  padding-left: 4px;

  border: 1px solid ${colors.black};
  border-radius: 5px;

  transition: background-color 400ms, white 400ms;

  &:hover {
    cursor: pointer;

    color: white;
    background-color: ${colors.deleteRed};
  }
`;

interface LabelProps {
  labelTree: ITree;
  onClick: () => void;
}

class Label extends React.Component<LabelProps> {
  render() {
    const { labelTree, onClick } = this.props;

    return <LabelContainer onClick={onClick}>{labelTree.data.title}</LabelContainer>;
  }
}

export default Label;
