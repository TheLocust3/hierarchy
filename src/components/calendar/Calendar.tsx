import React from 'react';
import { Moment } from 'moment';

import DayView from './day/DayView';

interface DayViewProps {
  time: Moment;
  view: string;
}

class Calendar extends React.Component<DayViewProps> {
  render() {
    return this.renderView();
  }

  private renderView() {
    switch (this.props.view) {
      case 'DAY':
        return <DayView time={this.props.time} />;
      default:
        return <div />;
    }
  }
}

export default Calendar;
