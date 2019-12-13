import React from 'react';
import moment, { Moment } from 'moment';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { TITLE } from '../../constants';
import { AppState, RouterMatch, RouterParams } from '../../types';
import { getLeaves } from '../../actions/tree-actions';
import { Node } from '../../models/tree/tree-base';

import Calendar from '../../components/calendar/Calendar';
import TimeSelect from '../../components/calendar/TimeSelect';

const PanelContainer = styled('div')`
  position: relative;
  display: flex;
`;

interface CalendarViewParams extends RouterParams {
  id: string;
}

interface CalendarProps {
  isReady: boolean;
  nodes: ReadonlyArray<Node>;
  match: RouterMatch<CalendarViewParams>;
  getLeaves: (id: string) => void;
}

interface CalendarState {
  time: Moment;
  startTime?: Moment;
}

class CalendarView extends React.Component<CalendarProps, CalendarState> {
  constructor(props: CalendarProps) {
    super(props);

    this.state = { time: moment() };
  }

  componentDidMount() {
    this.props.getLeaves(this.props.match.params.id);

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

          <PanelContainer>
            <Calendar
              time={this.state.time}
              view="DAY"
              onTimeSelect={(startTime: Moment) => this.setState({ startTime: startTime })}
            />

            {this.props.isReady ? (
              <TimeSelect nodes={this.props.nodes} startTime={this.state.startTime} />
            ) : (
              <span />
            )}
          </PanelContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  nodes: state.tree.leaves,
  isReady: state.tree.isReady
});

export default connect(mapStateToProps, { getLeaves })(CalendarView);
