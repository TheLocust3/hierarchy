import React from 'react';
import { Moment } from 'moment';

import DayView from './day/DayView';

interface DayViewProps {
  time: Moment;
  view: string;
  onTimeSelect: (startTime: Moment) => void;
}

class Calendar extends React.Component<DayViewProps> {
  render() {
    return <DayView time={this.props.time} onTimeSelect={this.props.onTimeSelect} />;
  }
}

export default Calendar;
