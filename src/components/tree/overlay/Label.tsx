import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../../constants';
import LabelModel from '../../../models/label';

interface LabelContainerProps {
  clickable: boolean;
  backgroundColor?: string;
}

const LabelContainer = styled('div')<LabelContainerProps>`
  position: relative;

  display: inline-block;

  padding-top: 2px;
  padding-bottom: 2px;
  padding-right: 4px;
  padding-left: 4px;

  border: 1px solid ${colors.black};
  border-radius: 5px;

  transition: background-color 400ms, white 400ms;

  background-color: ${(props: LabelContainerProps) =>
    props.backgroundColor === undefined ? 'initial' : props.backgroundColor};

  &:hover {
    cursor: ${(props: LabelContainerProps) => (props.clickable ? 'pointer' : 'inherit')};

    color: ${(props: LabelContainerProps) => (props.clickable ? 'white' : 'initial')};
    background-color: ${(props: LabelContainerProps) =>
      props.clickable ? colors.deleteRed : 'initial'};
  }
`;

interface LabelProps {
  label: LabelModel;
  onClick?: () => void;
}

class Label extends React.Component<LabelProps> {
  render() {
    const { label } = this.props;
    const onClick = this.props.onClick === undefined ? () => {} : this.props.onClick;

    return (
      <LabelContainer
        clickable={this.props.onClick !== undefined}
        backgroundColor={label.color}
        onClick={onClick}>
        {label.title}
      </LabelContainer>
    );
  }
}

export default Label;
