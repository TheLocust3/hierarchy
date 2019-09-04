import styled from '@emotion/styled';

interface SpacerProps {
  space: string;
}

const Spacer = styled('div')<SpacerProps>`
  margin-top: ${(props: SpacerProps) => props.space};
  margin-bottom: ${(props: SpacerProps) => props.space};
`;

export default Spacer;
