import styled from '@emotion/styled';

interface SideMargin {
  margin: string;
}

const SideMargin = styled('div')<SideMargin>`
  margin-left: ${(props: SideMargin) => props.margin};
  margin-right: ${(props: SideMargin) => props.margin};
`;

export default SideMargin;
