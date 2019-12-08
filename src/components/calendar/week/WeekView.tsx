import _ from 'lodash';
import React from 'react';
import moment, { Moment } from 'moment';
import styled from '@emotion/styled';

import { colors } from '../../../constants';

import DayViewInner from '../day/DayViewInner';

const WeekContainer = styled('div')`
  display: flex;

  flex-direction: row;

  overflow-y: scroll;

  border: 1px solid ${colors.lightBlack};
  border-radius: 5px;

  height: 85vh;

  padding: -1px;
`;

const DayContainer = styled('span')`
  flex-grow: 1;

  padding-top: 2px;
`;

interface WeekViewProps {
  time: Moment;
}

interface WeekViewState {
  time: Moment;
  viewingCurrentTime: boolean;
}

class WeekView extends React.Component<WeekViewProps, WeekViewState> {
  constructor(props: WeekViewProps) {
    super(props);

    this.state = { time: props.time, viewingCurrentTime: true };
  }

  componentDidMount() {
    if (this.state.viewingCurrentTime) {
      this.setState({
        time: this.props.time
      });
    }
  }

  componentWillReceiveProps(nextProps: WeekViewProps) {
    if (this.state.viewingCurrentTime) {
      this.setState({
        time: nextProps.time
      });
    }
  }

  render() {
    const startOfWeek = moment(this.state.time)
      .millisecond(0)
      .second(0)
      .minute(0)
      .hour(0)
      .day(0);

    return (
      <WeekContainer>
        {_.range(7).map((day) => {
          return (
            <DayContainer key={day}>
              <DayViewInner time={moment(startOfWeek).day(day)} separators={day !== 6} compact />
            </DayContainer>
          );
        })}
      </WeekContainer>
    );
  }
}

export default WeekView;
