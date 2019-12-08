import React from 'react';
import { Moment } from 'moment';
import styled from '@emotion/styled';

import { colors } from '../../../constants';

import Spacer from '../../common/Spacer';

type HeaderProps = {
  separators?: boolean;
};

const Header = styled('div')<HeaderProps>`
  border: 1px solid ${colors.lightBlack};
  border-top: 0px;
  border-left-width: ${(props: HeaderProps) => (props.separators ? `1px` : '0')};
  border-right-width: ${(props: HeaderProps) => (props.separators ? `1px` : '0')};

  margin-left: -1px;
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
  separators?: boolean;
}

class DayHeader extends React.Component<DayHeaderProps> {
  render() {
    const time = this.props.time;

    return (
      <Header separators={this.props.separators}>
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
