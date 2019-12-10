import React from 'react';
import moment, { Moment } from 'moment';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { TITLE } from '../../constants';
import { AppState, RouterMatch, RouterParams } from '../../types';
import { getCardsRootedAt } from '../../actions/list-actions';
import Column from '../../models/card/column';

import Calendar from '../../components/calendar/Calendar';

interface CalendarViewParams extends RouterParams {
  id: string;
}

interface CalendarProps {
  isReady: boolean;
  list: ReadonlyArray<Column>;
  match: RouterMatch<CalendarViewParams>;
  getCardsRootedAt: (id: string) => void;
}

interface CalendarState {
  time: Moment;
}

class CalendarView extends React.Component<CalendarProps, CalendarState> {
  constructor(props: CalendarProps) {
    super(props);

    this.state = { time: moment() };
  }

  componentDidMount() {
    this.props.getCardsRootedAt(this.props.match.params.id);

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
    console.log(this.props.list);

    return (
      <div>
        <Helmet>
          <title>{TITLE} - Calendar</title>
          <meta name="description" content="Index" />
        </Helmet>

        <div>
          <h1>Calendar</h1>
          <br />

          {this.props.isReady ? <Calendar time={this.state.time} view="DAY" /> : <span />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  list: state.list.list,
  isReady: state.list.isReady
});

export default connect(mapStateToProps, { getCardsRootedAt })(CalendarView);
