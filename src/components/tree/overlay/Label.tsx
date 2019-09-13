import React from 'react';
import styled from '@emotion/styled';

import { ITree } from '../../../models/tree/tree-base';
import { colors } from '../../../constants';

interface LabelContainerProps {
  clickable: boolean;
}

const LabelContainer = styled('div')<LabelContainerProps>`
  display: inline-block;

  padding-top: 2px;
  padding-bottom: 2px;
  padding-right: 4px;
  padding-left: 4px;

  border: 1px solid ${colors.black};
  border-radius: 5px;

  transition: background-color 400ms, white 400ms;

  &:hover {
    cursor: ${(props: LabelContainerProps) => (props.clickable ? 'pointer' : 'inherit')};

    color: ${(props: LabelContainerProps) => (props.clickable ? 'white' : 'initial')};
    background-color: ${(props: LabelContainerProps) =>
      props.clickable ? colors.deleteRed : 'initial'};
  }
`;

interface LabelProps {
  labelTree: ITree;
  onClick?: () => void;
}

class Label extends React.Component<LabelProps> {
  render() {
    const { labelTree } = this.props;
    const onClick = this.props.onClick === undefined ? () => {} : this.props.onClick;

    return (
      <LabelContainer clickable={this.props.onClick !== undefined} onClick={onClick}>
        {labelTree.data.title}
      </LabelContainer>
    );
  }
}

export default Label;
