import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../../constants';

const Container = styled('div')`
  border-right: 1px solid ${colors.lightestBlack};

  padding-top: 21px;

  text-align: right;
`;

const Hour = styled('div')`
  position: relative;
  height: 70px;

  margin-top: 0.5vh;
  padding-bottom: 3px;
  padding-left: 5px;
  padding-right: 5px;
`;

const Divider = styled('span')`
  width: 30%;

  position: absolute;
  top: 1px;
  right: -1px;

  border-top: 1px solid ${colors.lightestBlack};
`;

const Inner = styled('div')`
  padding-top: 5px;
`;

class HoursHeader extends React.Component {
  render() {
    return (
      <Container>
        {_.range(24).map((hour) => (
          <Hour key={hour}>
            {/* if this isn't a sign of some bad code, I don't know what is. */}
            <Divider style={{ top: hour === 0 ? '-1px' : '1px' }} />

            <Inner>
              {moment()
                .hour(hour)
                .format('hA')}
            </Inner>
          </Hour>
        ))}
      </Container>
    );
  }
}

export default HoursHeader;
