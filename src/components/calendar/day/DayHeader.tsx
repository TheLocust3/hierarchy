import React from 'react';
import { Moment } from 'moment';
import styled from '@emotion/styled';

import { colors } from '../../../constants';

import Spacer from '../../common/Spacer';

const Header = styled('div')`
  border: 1px solid ${colors.lightestBlack};
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;

  margin-bottom: 1%;
`;

const Date = styled('h2')`
  font-family: 'Roboto', sans-serif;
`;

const Bolded = styled('span')`
  font-weight: 300;
`;

const Day = styled('h3')`
  font-family: 'Roboto', sans-serif;
`;

interface DayHeaderProps {
  time: Moment;
}

class DayHeader extends React.Component<DayHeaderProps> {
  render() {
    const time = this.props.time;

    return (
      <Header>
        <Date>
          <Bolded>{time.format('MMMM Do')}</Bolded>, {time.format('YYYY')}
        </Date>

        <Spacer space="1%" />

        <Day>{time.format('dddd')}</Day>

        <Spacer space="1%" />
      </Header>
    );
  }
}

export default DayHeader;
