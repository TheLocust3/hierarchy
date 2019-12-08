import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../../constants';

import Button from '../../common/Button';

const Controls = styled('div')`
  display: flex;
  justify-content: space-between;

  margin-bottom: 1%;
`;

interface DayControlsProps {
  next: () => void;
  back: () => void;
  today: () => void;
}

class DayControls extends React.Component<DayControlsProps> {
  render() {
    return (
      <Controls>
        <Button
          color={colors.themeMain}
          hoverColor={colors.themeMainHover}
          activeColor={colors.themeMainActive}
          textColor="white"
          width="35px"
          height="30px"
          fontSize="28px"
          onClick={() => this.props.back()}>
          &lsaquo;
        </Button>

        <Button
          color={colors.themeMain}
          hoverColor={colors.themeMainHover}
          activeColor={colors.themeMainActive}
          textColor="white"
          width="70px"
          height="30px"
          onClick={() => this.props.today()}>
          Today
        </Button>

        <Button
          color={colors.themeMain}
          hoverColor={colors.themeMainHover}
          activeColor={colors.themeMainActive}
          textColor="white"
          width="35px"
          height="30px"
          fontSize="28px"
          onClick={() => this.props.next()}>
          &rsaquo;
        </Button>
      </Controls>
    );
  }
}

export default DayControls;
