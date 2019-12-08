import styled from '@emotion/styled';

interface SpacerProps {
  space: string;
}

const Spacer = styled('span')<SpacerProps>`
  margin-left: ${(props: SpacerProps) => props.space};
  margin-right: ${(props: SpacerProps) => props.space};
`;

export default Spacer;
