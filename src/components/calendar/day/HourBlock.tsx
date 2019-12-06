import React from 'react';
import { Moment } from 'moment';
import styled from '@emotion/styled';

const Block = styled('div')`
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 5px;
  padding-right: 5px;

  height: 70px;
`;

const Hour = styled('div')``;

interface HourBlockProps {
  time: Moment;
}

class HourBlock extends React.Component<HourBlockProps> {
  render() {
    return (
      <Block>
        <Hour>{this.props.time.format('h A')}</Hour>
      </Block>
    );
  }
}

export default HourBlock;
