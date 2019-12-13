import React from 'react';
import { Moment } from 'moment';
import styled from '@emotion/styled';

import { colors } from '../../../constants';

type BlockProps = {
  separators?: boolean;
};

const Block = styled('div')<BlockProps>`
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 5px;
  padding-right: 5px;

  height: 70px;

  margin-left: -1px;

  border-left: ${(props: BlockProps) =>
    props.separators ? `1px solid ${colors.lightestBlack}` : '0'};
  border-right: ${(props: BlockProps) =>
    props.separators ? `1px solid ${colors.lightestBlack}` : '0'};
`;

const Hour = styled('div')``;

interface HourBlockProps {
  time: Moment;
  compact?: boolean;
  separators?: boolean;
  onClick: () => void;
}

class HourBlock extends React.Component<HourBlockProps> {
  render() {
    return (
      <Block onClick={this.props.onClick} separators={this.props.separators}>
        <Hour>{this.props.compact ? '' : this.props.time.format('h A')}</Hour>
      </Block>
    );
  }
}

export default HourBlock;
