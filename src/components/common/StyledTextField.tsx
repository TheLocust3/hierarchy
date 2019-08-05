import styled from '@emotion/styled';

import { colors } from '../../constants';

type TextFieldProps = {
  fontSize: string;
  fontFamily: string;
  backgroundColor: string;
}

export const StyledTextField = styled('input')<TextFieldProps>`
  width: 100%;
  
  border: none;

  background-color: ${(props: TextFieldProps) => props.backgroundColor};
  color: ${colors.black};
  font-size: ${(props: TextFieldProps) => props.fontSize};
  font-family: ${(props: TextFieldProps) => props.fontFamily};

  &:focus {
    background-color: white;
  }
`;

export const StyledTextArea = styled('textarea')<TextFieldProps>`
  width: 100%;
  height: 300px;
  
  border: none;
  resize: none;

  background-color: ${(props: TextFieldProps) => props.backgroundColor};
  color: ${colors.black};
  font-size: ${(props: TextFieldProps) => props.fontSize};
  font-family: ${(props: TextFieldProps) => props.fontFamily};

  &:focus {
    background-color: white;
  }
`;
