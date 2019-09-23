import styled from '@emotion/styled';

interface SideMargin {
  margin?: string;
  marginLeft?: string;
  marginRight?: string;
}

const SideMargin = styled('div')<SideMargin>`
  margin-left: ${(props: SideMargin) =>
    props.marginLeft !== undefined
      ? props.marginLeft
      : props.margin !== undefined
      ? props.margin
      : '5%'};
  margin-right: ${(props: SideMargin) =>
    props.marginRight !== undefined
      ? props.marginRight
      : props.margin !== undefined
      ? props.margin
      : '5%'};
`;

export default SideMargin;
