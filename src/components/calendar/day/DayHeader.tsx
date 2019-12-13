import React from 'react';
import { Moment } from 'moment';
import styled from '@emotion/styled';

import { colors } from '../../../constants';

import Spacer from '../../common/Spacer';
import SoftCenter from '../../common/SoftCenter';

type HeaderProps = {
  separators?: boolean;
};

const Header = styled('div')<HeaderProps>`
  border: 1px solid ${colors.lightBlack};
  border-top: 0px;
  border-left: 0px;
  border-right-width: ${(props: HeaderProps) => (props.separators ? `1px` : '0')};

  margin-right: -1px;
`;

const Date = styled('h2')`
  font-family: 'Roboto', sans-serif;
`;

const DateCompact = styled('h3')`
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
  compact?: boolean;
  separators?: boolean;
}

class DayHeader extends React.Component<DayHeaderProps> {
  render() {
    if (this.props.compact) {
      return this.renderCompact();
    } else {
      return this.renderNormal();
    }
  }

  private renderNormal() {
    const time = this.props.time;

    return (
      <Header>
        <Date>
          <Bolded>{time.format('MMMM Do')}</Bolded>, {time.format('YYYY')}
        </Date>

        <Spacer space="5px" />

        <Day>{time.format('dddd')}</Day>

        <Spacer space="5px" />
      </Header>
    );
  }

  private renderCompact() {
    const time = this.props.time;

    return (
      <Header separators={this.props.separators}>
        <SoftCenter>
          <DateCompact>
            <Bolded>{time.format('ddd D')}</Bolded>
          </DateCompact>

          <Spacer space="10px" />
        </SoftCenter>
      </Header>
    );
  }
}

export default DayHeader;
