import React from 'react';
import moment, { Moment } from 'moment';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { TITLE } from '../../constants';

import Calendar from '../../components/calendar/Calendar';

interface CalendarState {
  time: Moment;
}

class CalendarView extends React.Component<{}, CalendarState> {
  constructor(props: {}) {
    super(props);

    this.state = { time: moment() };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: moment()
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval();
  }

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

          <Calendar time={this.state.time} view="WEEK" />
        </div>
      </div>
    );
  }
}

export default connect()(CalendarView);
