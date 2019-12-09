import _ from 'lodash';
import React from 'react';
import moment, { Moment } from 'moment';
import styled from '@emotion/styled';

import { colors } from '../../../constants';

import DayHeader from './DayHeader';
import HourBlock from './HourBlock';
import HourDivider from './HourDivider';

const Day = styled('div')`
  position: relative;
  z-index: 1;

  padding-right: -1px;
`;

const HeaderContainer = styled('div')`
  position: fixed;

  background-color: white;
`;

const HoursContainer = styled('div')`
  position: relative;
  z-index: -1;

  padding-top: 1%;
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
  compact?: boolean;
  separators?: boolean;
  hideHourLine?: boolean;
}

class DayViewInner extends React.Component<DayViewProps> {
  private dayRef: React.RefObject<HTMLDivElement>;
  private dayHeaderRef: React.RefObject<HTMLDivElement>;
  private dayHeaderSpacerRef: React.RefObject<HTMLDivElement>;

  constructor(props: DayViewProps) {
    super(props);

    this.dayRef = React.createRef();
    this.dayHeaderRef = React.createRef();
    this.dayHeaderSpacerRef = React.createRef();
  }

  componentDidMount() {
    this.updateWidths();

    window.addEventListener('resize', () => this.updateWidths());
  }

  updateWidths() {
    if (this.dayRef === null || this.dayRef.current === null) return;
    if (this.dayHeaderRef === null || this.dayHeaderRef.current === null) return;
    if (this.dayHeaderSpacerRef === null || this.dayHeaderSpacerRef.current === null) return;

    const parentwidth = this.dayRef.current.getBoundingClientRect().width;
    this.dayHeaderRef.current.style.width = `${parentwidth - 1}px`;

    const headerHeight = this.dayHeaderRef.current.getBoundingClientRect().height;
    this.dayHeaderSpacerRef.current.style.height = `${headerHeight}px`;
  }

  render() {
    const startOfDay = moment(this.props.time)
      .millisecond(0)
      .second(0)
      .minute(0)
      .hour(0);

    return (
      <Day ref={this.dayRef}>
        <HeaderContainer ref={this.dayHeaderRef}>
          <DayHeader
            time={this.props.time}
            compact={this.props.compact}
            separators={this.props.separators}
          />
        </HeaderContainer>

        <div ref={this.dayHeaderSpacerRef} />

        <HoursContainer>
          {_.range(24).map((hour) => (
            <span key={hour}>
              <HourBlock
                time={moment(startOfDay).hour(hour)}
                compact={this.props.compact}
                separators={this.props.separators}
              />

              {hour !== 23 ? <HourDivider /> : <span />}
            </span>
          ))}
          {this.props.hideHourLine ? (
            <span />
          ) : (
            <CurrentHour
              percent={
                (this.props.time.hours() +
                  (this.props.time.minutes() + this.props.time.seconds() / 60) / 60) /
                24
              }
            />
          )}
        </HoursContainer>
      </Day>
    );
  }
}

export default DayViewInner;
