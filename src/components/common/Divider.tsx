import styled from '@emotion/styled';

import { colors } from '../../constants';

type DividerProps = {
  marginTop: string;
  marginBottom: string;
  marginLeft?: string;
  marginRight?: string;
  width?: string;
  color?: string;
};

const Divider = styled('div')<DividerProps>`
  width: ${(props: DividerProps) => (props.width === undefined ? '100%' : props.width)};
  height: 1px;

  border-top: 1px solid
    ${(props: DividerProps) => (props.color === undefined ? colors.lightBlack : props.color)};
  border-bottom: 0px;
  border-right: 0px;
  border-left: 0px;

  margin-right: ${(props: DividerProps) =>
    props.marginRight === undefined ? 'initial' : props.marginRight};
  margin-left: ${(props: DividerProps) =>
    props.marginLeft === undefined ? 'initial' : props.marginLeft};
  margin-top: ${(props: DividerProps) => props.marginTop};
  margin-bottom: ${(props: DividerProps) => props.marginBottom};
`;

export default Divider;
