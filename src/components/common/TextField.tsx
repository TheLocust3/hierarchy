import styled from '@emotion/styled';

import { colors, fonts } from '../../constants';

interface TextFieldProps {
  fontSize?: string;
  fontFamily?: string;
}

const TextField = styled('input')<TextFieldProps>`
  display: inline-block;
  width: 100%;

  font-size: ${(props: TextFieldProps) => (props.fontSize === undefined ? '14px' : props.fontSize)};
  font-family: ${(props: TextFieldProps) =>
    props.fontFamily === undefined ? fonts.body : props.fontFamily};

  padding-left: 7px;
  padding-right: 7px;
  padding-top: 5px;
  padding-bottom: 5px;

  border: 1px solid ${colors.lightBlack};
  border-radius: 2px;
`;

export default TextField;
