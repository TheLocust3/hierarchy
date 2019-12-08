import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../constants';

interface ButtonComponentProps {
  color: string;
  hoverColor: string;
  activeColor: string;
  textColor: string;
  width: string;
  height: string;
  fontSize: string;
}

const ButtonComponent = styled('div')<ButtonComponentProps>`
  position: relative;
  display: flex;

  width: ${(props: ButtonComponentProps) => props.width};
  height: ${(props: ButtonComponentProps) => props.height};

  cursor: pointer;

  border: 1px solid ${colors.black};
  border-radius: 5px;

  color: ${(props: ButtonComponentProps) => props.textColor};
  font-size: ${(props: ButtonComponentProps) => props.fontSize};

  background-color: ${(props: ButtonComponentProps) => props.color};
  transition: background-color 0.4s;

  user-select: none;

  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props: ButtonComponentProps) => props.hoverColor};
  }

  &:active {
    background-color: ${(props: ButtonComponentProps) => props.activeColor};
  }
`;

interface ButtonProps {
  children: any;
  color: string;
  hoverColor: string;
  activeColor: string;
  textColor: string;
  onClick: (event: any) => void;
  width?: string;
  height?: string;
  fontSize?: string;
}

class Button extends React.Component<ButtonProps> {
  render() {
    const { children, color, hoverColor, activeColor, textColor, onClick } = this.props;
    const width = this.props.width === undefined ? '80px' : this.props.width;
    const height = this.props.height === undefined ? '25px' : this.props.height;
    const fontSize = this.props.fontSize === undefined ? '16px' : this.props.fontSize;

    return (
      <ButtonComponent
        color={color}
        hoverColor={hoverColor}
        activeColor={activeColor}
        textColor={textColor}
        onClick={(event) => onClick(event)}
        width={width}
        height={height}
        fontSize={fontSize}>
        {children}
      </ButtonComponent>
    );
  }
}

export default Button;
