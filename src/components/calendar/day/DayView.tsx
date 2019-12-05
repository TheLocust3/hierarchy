import React from 'react';
import { Moment } from 'moment';

import SideMargin from '../../common/SideMargin';
import DayHeader from './DayHeader';

interface DayViewProps {
  time: Moment;
}

class DayView extends React.Component<DayViewProps> {
  render() {
    return (
      <SideMargin margin={'3%'}>
        <DayHeader time={this.props.time} />
        Test
      </SideMargin>
    );
  }
}

export default DayView;
