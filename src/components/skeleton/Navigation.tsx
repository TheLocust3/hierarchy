import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../constants';

import Divider from '../common/Divider';
import Spacer from '../common/Spacer';
import NavItem from './NavItem';

const NavigationContainer = styled('div')`
  width: 100%;
  height: 100%;

  background-color: ${colors.themeMainBackground};
`;

const Bottom = styled('div')`
  position: absolute;
  bottom: 0;
`;

class Navigation extends React.Component<{}> {
  render() {
    return (
      <NavigationContainer>
        <br />

        <NavItem text="Home" to="/" icon="home" tooltipWidth={'50px'} />
        <Divider
          marginTop="0"
          marginBottom="0"
          marginLeft="10px"
          width="50px"
          color={colors.themeMainBackgroundLight}
        />

        <NavItem text="Trees" to="/tree" icon="device_hub" tooltipWidth={'45px'} />
        <Divider
          marginTop="0"
          marginBottom="0"
          marginLeft="10px"
          width="50px"
          color={colors.themeMainBackgroundLight}
        />

        <NavItem text="Lists" to="/lists" icon="list" tooltipWidth={'40px'} />
        <Divider
          marginTop="0"
          marginBottom="0"
          marginLeft="10px"
          width="50px"
          color={colors.themeMainBackgroundLight}
        />

        <Bottom>
          <Divider
            marginTop="0"
            marginBottom="0"
            marginLeft="10px"
            width="50px"
            color={colors.themeMainBackgroundLight}
          />

          <NavItem text="Settings" to="/settings" icon="person" tooltipWidth={'65px'} />

          <Divider
            marginTop="0"
            marginBottom="0"
            marginLeft="10px"
            width="50px"
            color={colors.themeMainBackgroundLight}
          />
          <NavItem text="Sign Out" to="/sign_out" icon="exit_to_app" tooltipWidth={'70px'} />

          <Spacer space="10px" />
        </Bottom>
      </NavigationContainer>
    );
  }
}

export default Navigation;
