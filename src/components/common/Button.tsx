import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../constants';

import MiddleCenter from './MiddleCenter';

interface ButtonComponentProps {
  color: string;
  hoverColor: string;
  activeColor: string;
  textColor: string;
}

const ButtonComponent = styled('div')<ButtonComponentProps>`
  position: relative;

  width: 80px;
  height: 25px;

  margin-top: 10%;
  margin-bottom: 10%;

  cursor: pointer;

  border: 1px solid ${colors.black};
  border-radius: 5px;

  color: ${(props: ButtonComponentProps) => props.textColor};
  font-size: 16px;

  background-color: ${(props: ButtonComponentProps) => props.color};
  transition: background-color 0.4s;

  &:hover {
    background-color: ${(props: ButtonComponentProps) => props.hoverColor};
  }

  &:active {
    background-color: ${(props: ButtonComponentProps) => props.activeColor};
  }
`

interface ButtonProps {
  children: string;
  color: string;
  hoverColor: string;
  activeColor: string;
  textColor: string;
  onClick: (event: any) => void;
}

class Button extends React.Component<ButtonProps> {

  render() {
    const { children, color, hoverColor, activeColor, textColor, onClick } = this.props;

    return (
      <ButtonComponent
        color={color}
        hoverColor={hoverColor}
        activeColor={activeColor}
        textColor={textColor}
        onClick={(event) => onClick(event)}
      >
        <MiddleCenter>
          {children}
        </MiddleCenter>
      </ButtonComponent>
    );
  }
}

export default Button;
