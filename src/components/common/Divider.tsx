import styled from '@emotion/styled';

import { colors } from '../../constants';

type DividerProps = {
  marginTop: string;
  marginBottom: string;
}

const Divider = styled('div')<DividerProps>`
  width: 100%;
  height: 1px;

  border-top: 1px solid ${colors.lightBlack};
  border-bottom: 0px;
  border-right: 0px;
  border-left: 0px;

  margin-top: ${(props: DividerProps) => props.marginTop};
  margin-bottom: ${(props: DividerProps) => props.marginBottom};
`;

export default Divider;
