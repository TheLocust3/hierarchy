import React from 'react';
import { Moment } from 'moment';
import styled from '@emotion/styled';

import { Node } from '../../models/tree/tree-base';
import { colors } from '../../constants';

const Container = styled('div')`
  width: 45%;

  margin-right: 5%;

  border: 1px solid ${colors.lightBlack};
  border-radius: 5px;
`;

interface TimeSelectProps {
  nodes: ReadonlyArray<Node>;
  startTime?: Moment;
}

class TimeSelect extends React.Component<TimeSelectProps> {
  render() {
    return <Container></Container>;
  }
}

export default TimeSelect;
