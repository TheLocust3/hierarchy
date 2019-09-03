import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../constants';

import MaterialIcon from './MaterialIcon';

interface FABContainerProps {
  backgroundColor: string;
  backgroundColorHover: string;
}

const FABContainer = styled('div')<FABContainerProps>`
  position: fixed;
  bottom: 2%;
  right: 2%;

  width: 50px;
  height: 50px;

  background-color: ${(props: FABContainerProps) => props.backgroundColor};

  border-radius: 50%;

  transition: background-color 250ms;

  box-shadow: 1px 2px 5px ${colors.actionShadow};

  &:hover {
    cursor: pointer;
    background-color: ${(props: FABContainerProps) => props.backgroundColorHover};
  }
`;

const FABInner = styled('div')`
  padding-left: 7px;
  padding-top: 7px;
`;

interface FloatingActionButtonProps {
  icon: string;
  backgroundColor: string;
  backgroundColorHover: string;
  color: string;
  onClick: () => void;
}

class FloatingActionButton extends React.Component<FloatingActionButtonProps> {
  render() {
    const { icon, onClick, backgroundColor, backgroundColorHover, color } = this.props;

    return (
      <FABContainer
        backgroundColor={backgroundColor}
        backgroundColorHover={backgroundColorHover}
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();

          onClick();
        }}>
        <FABInner>
          <MaterialIcon icon={icon} fontSize="36px" color={color} />
        </FABInner>
      </FABContainer>
    );
  }
}

export default FloatingActionButton;
