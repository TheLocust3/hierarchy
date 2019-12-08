import _ from 'lodash';
import React from 'react';
import moment, { Moment } from 'moment';
import styled from '@emotion/styled';

import { colors } from '../../../constants';

import Spacer from '../../common/Spacer';
import DayHeader from './DayHeader';
import HourBlock from './HourBlock';
import HourDivider from './HourDivider';

const Day = styled('div')`
  position: relative;
  z-index: 1;

  border: 1px solid ${colors.lightBlack};
  border-radius: 5px;

  height: 85vh;

  overflow-y: scroll;
`;

const HeaderContainer = styled('div')`
  position: fixed;

  background-color: white;
  width: 39.2vw;

  padding-top: 0.5vh;

  margin-left: 0.4vw;
  margin-right: 0.4vw;
`;

const HoursContainer = styled('div')`
  position: relative;
  z-index: -1;

  padding-top: 1%;
  padding-left: 1%;
  padding-right: 1%;
`;

type CurrentHourProps = {
  percent: number;
};

const CurrentHour = styled('div')<CurrentHourProps>`
  border: 1px solid ${colors.deleteRed};
  border-left: 0px;
  border-right: 0px;
  border-bottom: 0px;

  width: 100%;

  position: absolute;
  top: ${(props: CurrentHourProps) => `${props.percent * 1847}px`};
`;

interface DayViewProps {
  time: Moment;
}

class DayViewInner extends React.Component<DayViewProps> {
  render() {
    const startOfDay = moment(this.props.time)
      .millisecond(0)
      .second(0)
      .minute(0)
      .hour(0);

    return (
      <Day>
        <HeaderContainer>
          <DayHeader time={this.props.time} />
        </HeaderContainer>

        <Spacer space="7.5vh" />

        <HoursContainer>
          {_.range(24).map((hour) => (
            <span key={hour}>
              <HourBlock time={moment(startOfDay).hour(hour)} />

              {hour !== 23 ? <HourDivider /> : <span />}
            </span>
          ))}

          <CurrentHour
            percent={
              (this.props.time.hours() +
                (this.props.time.minutes() + this.props.time.seconds() / 60) / 60) /
              24
            }
          />
        </HoursContainer>
      </Day>
    );
  }
}

export default DayViewInner;
