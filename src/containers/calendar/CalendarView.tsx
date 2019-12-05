import React from 'react';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { TITLE } from '../../constants';

import Calendar from '../../components/calendar/Calendar';

class CalendarView extends React.Component<{}> {
  render() {
    return (
      <div>
        <Helmet>
          <title>{TITLE} - Calendar</title>
          <meta name="description" content="Index" />
        </Helmet>

        <div>
          <h1>Calendar</h1>
          <br />

          <Calendar time={moment()} view="DAY" />
        </div>
      </div>
    );
  }
}

export default connect()(CalendarView);
