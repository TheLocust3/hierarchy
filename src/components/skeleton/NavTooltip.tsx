import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../constants';

const TooltipContainer = styled('div')`
  position: absolute;
  top: 17px;
  left: 75px;

  height: 20px;

  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 7px;

  font-family: 'Work Sans', sans-serif;
  font-weight: 200;
  background-color: ${colors.themeMainBackgroundDark};

  border-radius: 3px;

  visibility: hidden;
  opacity: 0;

  transition: visibility 500ms, opacity 500ms;

  color: white;

  z-index: 10;
`;

const Arrow = styled('div')`
  position: absolute;
  top: 0;
  left: -13px;

  width: 0;
  height: 0;

  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;

  border-right: 15px solid ${colors.themeMainBackgroundDark};
`;

interface NavTooltipProps {
  text: string;
  width: string;
}

class NavTooltip extends React.Component<NavTooltipProps> {
  render() {
    const { text, width } = this.props;

    return (
      <TooltipContainer style={{ width: width }}>
        {text}

        <Arrow />
      </TooltipContainer>
    );
  }
}

export default NavTooltip;
