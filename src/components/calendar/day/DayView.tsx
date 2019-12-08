import React from 'react';
import moment, { Moment } from 'moment';
import styled from '@emotion/styled';

import { colors } from '../../../constants';

import DayViewInner from './DayViewInner';
import DayControls from './DayControls';

const Container = styled('div')`
  position: relative;

  width: 40vw;

  margin-left: 3%;
  margin-right: 3%;
`;

const DayContainer = styled('div')`
  overflow-y: scroll;

  border: 1px solid ${colors.lightBlack};
  border-radius: 5px;

  height: 85vh;

  padding-left: 1%;
  padding-right: 1%;
`;

interface DayViewProps {
  time: Moment;
}

interface DayViewState {
  time: Moment;
  viewingCurrentTime: boolean;
}

class DayView extends React.Component<DayViewProps, DayViewState> {
  constructor(props: DayViewProps) {
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

  componentWillReceiveProps(nextProps: DayViewProps) {
    if (this.state.viewingCurrentTime) {
      this.setState({
        time: nextProps.time
      });
    }
  }

  render() {
    const startOfDay = moment(this.state.time)
      .millisecond(0)
      .second(0)
      .minute(0)
      .hour(0);

    return (
      <Container>
        <DayControls
          next={() => {
            startOfDay.add(1, 'day');

            if (startOfDay.isSame(this.props.time, 'day')) {
              this.setState({ viewingCurrentTime: true, time: this.props.time });
            } else {
              this.setState({ viewingCurrentTime: false, time: startOfDay });
            }
          }}
          back={() => {
            startOfDay.subtract(1, 'day');

            if (startOfDay.isSame(this.props.time, 'day')) {
              this.setState({ viewingCurrentTime: true, time: this.props.time });
            } else {
              this.setState({ viewingCurrentTime: false, time: startOfDay });
            }
          }}
          today={() => this.setState({ viewingCurrentTime: true, time: this.props.time })}
        />

        <DayContainer>
          <DayViewInner time={this.state.time} />
        </DayContainer>
      </Container>
    );
  }
}

export default DayView;
